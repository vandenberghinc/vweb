/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_SERVER_BACKEND_H
#define VWEB_SERVER_BACKEND_H

// Log to console when log level equals minimum.
// - Keep as macro so the "to_str" and "String" objects ...
//   wont get constructed if the log level is hidden.
#define BACKENDLOG(min_log_level, text) \
    log_mutex.lock(); \
    if (m_server->config.log_level >= min_log_level) {\
        print("[Backend] ", text); \
    } \
    log_mutex.unlock();

// Namespace vweb.
namespace vweb {

// Namespace backend.
namespace backend {

// ---------------------------------------------------------
// Backend.
// - The backend runs the http and https threads.
// - In order to use https and http, the port must be -1 and the ssl certificate must be defined.

template <typename Server>
struct Backend {
	
	// Private.
private:
	
	// ---------------------------------------------------------
	// Structures.
	
	// Connection structure.
	struct Connection {
		Int 					fd = -1;			// file descriptor, always assigned also on tls.
		SSL*					ctx = NULL;			// ssl context.
		uint					poll_index = 0;		// poll index for the backend.
		Bool 					connected = false;	// is connected.
		Bool 					not_serving = true;	// is not being served by a session.
		vlib::Socket<>::Info 	info;				// socket info.
		LLong					numeric_ip = 0;		// numeric ip for rate limiting.
		Long					expiration = 0;		// connection expiration time in seconds.
	};
	
	// ---------------------------------------------------------
	// Definitions.
	
	using   Sess =   Session<Server, Connection>;
	
	// ---------------------------------------------------------
	// Attributes.
	// Requires public for "Session".
	
	Server*		        		m_server;               	// pointer to the server
	Bool                		m_use_https = false;    	// Use https when certificates are defined.
	Array<Sess>					m_sessions;             	// session threads.
	vlib::Mutex         		m_mutex_select_session; 	// mutex for selecting an session.
	Array<Connection, uint> 	m_conns;					// array with connections.
	
	// ---------------------------------------------------------
	// Static attributes.
	
	SICE short	m_poll_err_event = POLLNVAL | POLLERR | POLLHUP | POLLPRI;
	
	// Public.
public:
	
	// ---------------------------------------------------------
	// Constructors.
	
	// Default constructor.
	constexpr
	Backend() {}
	
	// Constructor from config.
	constexpr
	Backend(const vweb::server::Config& config, Server* server) :
	m_server(server),
	m_use_https(m_server->config.port == -1 && m_server->config.cert.is_defined())
	{
		// Resize connections.
		m_conns.resize(m_server->config.max_connections.value());
		m_conns.len() = m_server->config.max_connections.value();
	}
	
	// ---------------------------------------------------------
	// Functions.
	
	// Start sessions.
	void    start_sessions() {
		m_sessions.resize(m_server->config.max_threads.value());
		m_sessions.len() = m_server->config.max_threads.value();
		for (auto& index: m_sessions.indexes()) {
			m_sessions[index].m_server = m_server;
			m_sessions[index].m_session_index = (int) index;
			m_sessions[index].m_busy = new Bool (false);
			m_sessions[index].start();
		}
	}
	
	// Select an session.
	ullong  select_session() {
		m_mutex_select_session.lock();
		ullong session_index = NPos::npos;
		while (true) {
			for (auto& index: m_sessions.indexes()) {
				if (!m_sessions[index].is_busy()) {
					BACKENDLOG(3, to_str("Session ", index, " is not busy."));
					*m_sessions[index].m_busy = true;
					session_index = index;
					break;
				}
			}
			if (session_index != NPos::npos) {
				break;
			}
			vlib::sleep::usec(100);
		}
		m_mutex_select_session.unlock();
		return session_index;
	}
	
	// Close sessions.
	void    close_sessions() {
		BACKENDLOG(3, "Shutdown.");
		BACKENDLOG(3, "Joining sessions.");
		for (auto& session: m_sessions) {
			session.run_permission() = false;
		}
		for (auto& session: m_sessions) {
			session.join();
		}
	}
	
	// Close a connection.
	void	close_connection(Connection& conn) {
		if (conn.ctx != NULL) {
			TLS::close(conn.ctx);
		} else if (conn.fd != -1) {
			TCP::close(conn.fd);
		}
		conn.connected = false;
		conn.not_serving = true;
		conn.fd = -1;
		conn.ctx = NULL;
		conn.poll_index = 0;
		conn.expiration = 0;
	};
	
	// Accept http thread.
	void*   accept_http() {
		
		// Construct the socket.
		TCP sock;
		Int port = 80;
		if (m_server->config.port != -1) {
			port = m_server->config.port;
		}
		if (m_server->config.ip == "*" || m_server->config.ip == "") {
			sock.construct(port);
		} else {
			sock.construct(m_server->config.ip, port);
		}
		
		// Listen.
		sock.bind();
		sock.listen();
		BACKENDLOG(1, to_str("Running http on ", sock.str(), '.'))
		
		// Add server socket to poll file descriptors.
		// struct pollfd pfd = {};
		// pfd.fd = sock.fd().value();
		// pfd.events = POLLIN;
		
		// Loop.
		while (true) {
			
			// Catch exceptions.
#if VWEB_CATCH_EXCEPTIONS == true
			try {
#endif
				
				// Poll.
				// int ready = ::poll(&pfd, 1, 1000);
				// if (ready < 0) {
				// 	BACKENDLOG(0, to_str("[Server::accept_http] Poll Error: ", ::strerror(errno)));
				// } else if (ready == 0) {
				// 	continue;
				// }
				//
				// // Accept new clients.
				// if (pfd.revents & POLLIN) {
					Int conn_fd = -1;
					
					// Accept.
					try {
						print("ACCEPTING");
						conn_fd = sock.accept();
						print("ACCEPTED");
					} catch(vlib::BrokenPipeError& e) {
						print("ACCEPT ERR #1");
						BACKENDLOG(0, "Broken HTTP server pipe, restarting listening socket.");
						sock.restart();
						sock.bind();
						sock.listen();
						// pfd.fd = sock.fd().value();
						continue;
					} catch(vlib::AcceptError& e) {
						print("ACCEPT ERR #2");
						e.dump();
						continue;
					} catch(vlib::TimeoutError& e) {
						print("ACCEPT ERR #3");
						continue;
					}
					
					// Success.
					if (conn_fd != -1) {
						
						// Find available client index.
						uint index = 0;
						for (auto& conn: m_conns) {
							if (!conn.connected) {
								break;
							}
							++index;
						}
						
						// Reached max clients.
						if (index == m_conns.len()) {
							TCP::close(conn_fd);
							BACKENDLOG(0, "Max clients reached, can no longer accept the new client.");
						}
						
						// Check blacklist.
						BACKENDLOG(1, to_str("Accepted HTTP file descriptor ", conn_fd, "."));
						vlib::Socket<>::Info conn_info = TCP::info(conn_fd);
						LLong conn_ip = conn_info.numeric_ip();
						if (!blacklist.verify(conn_ip)) {
							sock.close(conn_fd);
							BACKENDLOG(1, to_str(conn_info.ip, ": ", "Blocking blacklisted ip."));
						}
						
						// Add to connections.
						else {
							auto& conn = m_conns[index];
							conn.fd = conn_fd;
							conn.ctx = NULL;
							conn.connected = true;
							conn.not_serving = true;
							conn.info = vlib::move(conn_info);
							conn.numeric_ip = conn_ip;
							conn.poll_index = 0;
							conn.expiration = Date::get_seconds() + m_server->config.keep_alive.value();
						}
					}
				// }
				
				// Pipe error.
				// else if (pfd.revents & m_poll_err_event) {
				// 	BACKENDLOG(0, "Broken HTTP server pipe, restarting listening socket.");
				// 	sock.restart();
				// 	sock.bind();
				// 	sock.listen();
				// 	pfd.fd = sock.fd().value();
				// 	continue;
				// }
				
				// Catch exceptions.
#if VWEB_CATCH_EXCEPTIONS == true
			} catch (vlib::Exception& e) {
				e.dump();
			}
#endif
			
		}
		return NULL;
	}
	static
	void*   accept_http_thread(void* obj) {
		return ((Backend*) obj)->accept_http();
	}
	
	// Accept https thread.
	void*   accept_https() {
		
		// Construct the socket.
		TLS sock;
		Int port = 443;
		if (m_server->config.port != -1) { // https is disabled if the port is enabled but okay.
			port = m_server->config.port;
		}
		if (m_server->config.ip == "*" || m_server->config.ip == "") {
			sock.construct(
				port,
				m_server->config.cert,
				m_server->config.key,
				m_server->config.pass,
				m_server->config.ca_bundle
			);
		} else {
			sock.construct(
				m_server->config.ip,
				port,
				m_server->config.cert,
				m_server->config.key,
				m_server->config.pass,
				m_server->config.ca_bundle
			);
		}
		
		// Listen.
		sock.bind();
		sock.listen();
		BACKENDLOG(1, to_str("Running https on ", sock.str(), '.'))
		
		// Add server socket to poll file descriptors.
		struct pollfd pfd = {};
		pfd.fd = sock.sock().fd().value();
		pfd.events = POLLIN;
		
		// Loop.
		while (true) {
			
			// Catch exceptions.
#if VWEB_CATCH_EXCEPTIONS == true
			try {
#endif
				
				// Poll.
				int ready = ::poll(&pfd, 1, 1000);
				if (ready < 0) {
					BACKENDLOG(0, to_str("[Server::accept_https] Poll Error: ", ::strerror(errno)));
				} else if (ready == 0) {
					continue;
				}
				
				// Accept new clients.
				if (pfd.revents & POLLIN) {
					TLS::Client ctx = NULL;
					
					// Accept.
					try {
						ctx = sock.accept();
					} catch(vlib::BrokenPipeError& e) {
						BACKENDLOG(0, "Broken HTTPS server pipe, restarting listening socket.");
						sock.restart();
						sock.bind();
						sock.listen();
						pfd.fd = sock.sock().fd().value();
						continue;
					} catch(vlib::AcceptError& e) {
						e.dump();
					}
					
					// Success.
					if (ctx != NULL) {
						
						// Find available client index.
						uint index = 0;
						for (auto& conn: m_conns) {
							if (!conn.connected) {
								break;
							}
							++index;
						}
						
						// Reached max clients.
						if (index == m_conns.len()) {
							TLS::close(ctx);
							BACKENDLOG(0, "Max clients reached, can no longer accept the new client.");
						}
						
						// Check blacklist.
						try {
							Int conn_fd = SSL_get_fd(ctx);
							BACKENDLOG(1, to_str("Accepted HTTPS file descriptor ", conn_fd, "."));
							vlib::Socket<>::Info conn_info = TCP::info(conn_fd);
							LLong conn_ip = conn_info.numeric_ip();
							if (!blacklist.verify(conn_ip)) {
								sock.close(ctx);
								BACKENDLOG(1, to_str(conn_info.ip, ": ", "Blocking blacklisted ip."));
							}
							
							// Add to connections.
							else {
								auto& conn = m_conns[index];
								conn.fd = conn_fd;
								conn.ctx = ctx;
								conn.connected = true;
								conn.not_serving = true;
								conn.info = vlib::move(conn_info);
								conn.numeric_ip = conn_ip;
								conn.poll_index = 0;
								conn.expiration = Date::get_seconds() + m_server->config.keep_alive.value();
							}
						} catch(vlib::Exception& e) {
							TLS::close(ctx);
							e.dump();
						}
					}
				}
				
				// Pipe error.
				else if (pfd.revents & m_poll_err_event) {
					BACKENDLOG(0, "Broken HTTPS server pipe, restarting listening socket.");
					sock.restart();
					sock.bind();
					sock.listen();
					pfd.fd = sock.sock().fd().value();
					continue;
				}
				
				// Catch exceptions.
#if VWEB_CATCH_EXCEPTIONS == true
			} catch (vlib::Exception& e) {
				e.dump();
			}
#endif
			
		}
		return NULL;
	}
	static
	void*   accept_https_thread(void* obj) {
	    return ((Backend*) obj)->accept_https();
	}
	
	// Handle connections thread.
	void	handle_connections() {
		
		// Vars.
		llong peek = 0;
		ullong conn_index = 0;
		Long seconds = 0;
		
		// Poll file descriptors.
		Array<struct pollfd, uint> pfds;
		pfds.fill_r(m_server->config.max_connections, {});
		
		// Loop.
		while (true) {
#if VWEB_CATCH_EXCEPTIONS == true
			try {
#endif
				
				// Create pfds.
				pfds.len() = 1; // server is already added.
				for (auto& conn: m_conns) {
					if (conn.connected && conn.not_serving) {
						
						// Add.
						conn.poll_index = pfds.len();
						auto& pfd = pfds.data()[pfds.len()]; // to ignore index error.
						pfd.fd = conn.fd.value();
						pfd.events = POLLIN;
						++pfds.len();
					}
					
					// Reset poll index.
					else {
						conn.poll_index = 0;
					}
				}
				
				// Poll.
				int ready = ::poll(pfds.data(), pfds.len(), 5); // timeout must be short for new connections that are active but old ones may be inactive.
				if (ready < 0) {
					
					// Interrupted system call.
					// May be caused if one of the clients abruptly disconnects.
					// Which happens if a client clears their browser history and cookies.
					// So iterate the connections and close the ones with errors.
					if (errno == EINTR) {
						conn_index = 0;
						for (auto& conn: m_conns) {
							if (conn.not_serving && conn.poll_index != 0 && pfds[conn.poll_index].revents & m_poll_err_event) {
								BACKENDLOG(0, to_str("Closing connection ", conn_index, " by poll err EINTR."));
								close_connection(conn);
							}
							++conn_index;
						}
					}
					
					// Real error.
					else {
						BACKENDLOG(0, to_str("Poll error [", ::strerror(errno), "]."));
					}
					
				// No file descriptors ready so skip to next loop.
				} else if (ready == 0) {
					continue;
				}
				
				// Check connections.
				peek = 0;
				conn_index = 0;
				seconds = Date::get_seconds();
				for (auto& conn: m_conns) {
					++conn_index;
					
					// Handle connected clients.
					if (conn.connected && conn.not_serving && conn.poll_index != 0) {
						auto& pfd = pfds[conn.poll_index];
						
						// Check ssl context and fd.
						// Sometimes when a session wakes up the ssl context is deallocated.
						if (conn.ctx == NULL && conn.fd == -1) {
							BACKENDLOG(0, to_str("Closing connection ", conn_index, " by deallocated connection context."));
							close_connection(conn);
							continue;
						}
						
						// Incoming data.
						else if (pfd.revents & POLLIN) {
							
							// Socket has been closed by peer.
							if ((peek = TCP::peek(conn.fd)) == 0) {
								BACKENDLOG(0, to_str("Closing connection ", conn_index, " by closed peer."));
								close_connection(conn);
								continue;
							}
							
							// Incoming data.
							else if (peek > 0) {
								conn.not_serving = false;
								ullong session_index = select_session();
								BACKENDLOG(0, to_str("Waking thread ", session_index, "."));
								m_sessions[session_index].m_conn = &conn;
								m_sessions[session_index].wake();
							}
							
						}
						
						// Socket closed or broken.
						else if (pfd.revents & m_poll_err_event) {
							BACKENDLOG(0, to_str("Closing connection ", conn_index, " by poll err."));
							close_connection(conn);
							continue;
						}
						
					}
					
					// Check expiration.
					if (conn.not_serving && conn.expiration != 0 && seconds >= conn.expiration) {
						BACKENDLOG(0, to_str("Closing connection ", conn_index, " by keep alive expiration."));
						close_connection(conn);
						continue;
					}
					
				}
				
				// Catch exceptions.
#if VWEB_CATCH_EXCEPTIONS == true
			} catch (vlib::Exception& e) {
				e.dump();
			}
#endif
		}
	}
	
	// Start.
	void    start() {
		
		// Start session threads.
		start_sessions();
		
		// Accept http connections.
		pthread_t accept_http_tid = {};
		if (pthread_create(&accept_http_tid, NULL, &accept_http_thread, (void*) &*this) != 0) {
			throw vlib::StartError("Failed to start the HTTP accept thread.");
		}
		
		// Accept https connections.
		if (m_use_https) {
			pthread_t accept_https_tid = {};
			if (pthread_create(&accept_https_tid, NULL, &accept_https_thread, (void*) &*this) != 0) {
				throw vlib::StartError("Failed to start the HTTPS accept thread.");
			}
		}
		
		// Handle connections.
		handle_connections();
		
		// Close and join sessions.
		close_sessions();
		
	}
	
	
};

// ---------------------------------------------------------
// End.

};         // End namespace backend.
};         // End namespace vweb.
#endif     // End header.

