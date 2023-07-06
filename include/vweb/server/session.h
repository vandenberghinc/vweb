/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

#ifndef VWEB_CATCH_EXCEPTIONS
#define VWEB_CATCH_EXCEPTIONS true
#endif

// Header.
#ifndef VWEB_SESSION_H
#define VWEB_SESSION_H

// Log to console when log level equals minimum.
// - Keep as macro so the "tostr" and "String" objects ...
//   wont get constructed if the log level is hidden.
vlib::Mutex log_mutex;
#define SESLOG(min_log_level, text) \
    log_mutex.lock(); \
    if (m_server->m_config.log_level >= min_log_level) {\
        print("[Session:", m_session_index, "] ", text); \
    } \
    log_mutex.unlock();

// Namespace vweb.
namespace vweb {

// Namespace backend.
namespace backend {

// Aliases for TCP and TLS.
using   TCP =    vlib::Socket<
	vlib::sockets::family::ipv4,
	vlib::sockets::type::stream,
	vlib::sockets::protocol::undefined,
	1024,
	false
>;
using   TLS =    vlib::tls::Server<
	vlib::sockets::family::ipv4,
	vlib::sockets::type::stream,
	vlib::sockets::protocol::undefined,
	1024,
	false,
	vlib::tls::version::v1_3
>;

// ---------------------------------------------------------
// Session.

template <typename Server, typename Connection>
struct Session : public vlib::Thread<Session<Server, Connection>> {
	
	// Private.
private:
	
	// ---------------------------------------------------------
	// Private functions.
	
	
	// Public.
public:
	
	// ---------------------------------------------------------
	// Definitions.
	
	// using Socket = typename Server::socket_type;
	using Request = vlib::http::Request;
	using Response = vlib::http::Response;
	using Endpoint = EndpointTemplate<Server>;
	
	// ---------------------------------------------------------
	// Attributes.
	
	Int                 m_timeout = 60 * 2.5 * 1000;
	Bool                m_run_permission = true;
	Int                 m_session_index = 0;
	Server*             m_server = nullptr;
	Bool*               m_busy = nullptr;
	Connection*			m_conn = nullptr;
	String              m_http_buffer; // buffer for http requests.
	
	// ---------------------------------------------------------
	// Constructors.
	
	// Destructor.
	~Session() {
		if (m_busy != nullptr) {
			delete m_busy;
		}
	}
	
	// ---------------------------------------------------------
	// Attributes.
	
	// Get run permission.
	constexpr
	auto&   run_permission() {
		return m_run_permission;
	}
	
	// Is busy.
	constexpr
	Bool    is_busy() {
		return *m_busy;
	}
	
	// ---------------------------------------------------------
	// Functions.
	
	// Start thread.
	void*   run(void) {
		
		// Set signal handlers.
		// ::signal(SIGPIPE, sigpipe_handler);
		
		// Start.
		while (m_run_permission) {
			
			// Sleep.
			SESLOG(4, "Sleeping.");
#if VWEB_CATCH_EXCEPTIONS == true
			try {
#endif
				this->sleep();
#if VWEB_CATCH_EXCEPTIONS == true
			} catch(vlib::Exception& e) {
				SESLOG(0, "Encountered an error while sleeping.");
				e.dump();
				continue;
			}
#endif
			
			// Handle.
			SESLOG(3, tostr("Handle file descriptor ", m_conn->fd, "."));
#if VWEB_CATCH_EXCEPTIONS == true
			try {
#endif
				handle_client();
#if VWEB_CATCH_EXCEPTIONS == true
			} catch(vlib::Exception& e) {
				SESLOG(0, "Encountered an error while handling the client.");
				e.dump();
			}
#endif
			
			// Reset.
			SESLOG(4, "Reset.");
			reset();
			
		}
		return NULL;
	}
	
	// Close the connection.
	void    close() {
		m_conn->connected = false;
		if (m_conn->ctx == NULL) {
			TCP::close(m_conn->fd);
		} else {
			TLS::close(m_conn->ctx);
			m_conn->ctx = NULL;
		}
		m_conn->fd = -1;
	}
	
	// Reset all attributes.
	void    reset() {
		m_conn->not_serving = true;
		m_conn->expiration = Date::get_seconds() + m_server->m_config.keep_alive.value();
		*m_busy = false;
		m_http_buffer.reset();
	}
	
	// Receive wrapper.
	auto    recv(Request& request, const Int& timeout) {
		if (m_conn->ctx == NULL) {
			return TCP::recv(request, m_http_buffer, m_conn->fd, timeout);
		} else {
			return TLS::recv(request, m_conn->ctx, timeout);
		}
	}
	
	// Send wrapper.
	auto    send(Response& response, const Int& timeout) {
		if (m_conn->ctx == NULL) {
			if (response.data().len() >= 1024 * 32) {
				return TCP::send_chunked(m_conn->fd, response, timeout);
			} else {
				return TCP::send(m_conn->fd, response, timeout);
			}
		} else {
			if (response.data().len() >= 1024 * 32) {
				return TLS::send_chunked(m_conn->ctx, response, timeout);
			} else {
				return TLS::send(m_conn->ctx, response, timeout);
			}
		}
	}
	
	// Handle a client.
	void    handle_client() {
#if VWEB_CATCH_EXCEPTIONS == true
		try {
#endif
			
			// Vars.
			Len uid = NPos::npos; // the user id.
			Int timeout = 50; // timeout.
			Bool close = false; // close connection after sending response.
			Bool authenticated = false; // is already authenticated within loop.
			Int requests = 0;
			String auth_key;
			ullong start_time = Date::get_mseconds();
			Response response;
			Request request;
			
			// Receive request.
			SESLOG(4, tostr(m_conn->info.ip, ": ", "Receiving."));
			try {
				recv(request, timeout);
			} catch (vlib::TimeoutError& e) {
				SESLOG(3, tostr(m_conn->info.ip, ": ", "Operation timed out."));
				return ;
			} catch (vlib::SocketClosedError& e) {
				this->close();
				SESLOG(3, tostr(m_conn->info.ip, ": ", "Peer has been closed."));
				return ;
			} catch (vlib::BrokenPipeError& e) {
				this->close();
				SESLOG(3, tostr(m_conn->info.ip, ": ", "Broken pipe."));
				return ;
			}
			SESLOG(4, tostr(m_conn->info.ip, ": ", "Received."));
			
			// Undefined request.
			if (request.method() == vlib::http::method::undefined) {
				SESLOG(2, tostr(m_conn->info.ip, ": ", "Bad request: undefined method."));
				response = m_server->m_400;
				close = true;
			}
			
			// Clean request url.
			String req_endpoint = request.endpoint();
			ullong pos;
			if ((pos = req_endpoint.find('?')) != NPos::npos) {
				req_endpoint.slice_r(0, pos);
			}
			while (req_endpoint.len() > 1 && req_endpoint.last() == '/') {
				--req_endpoint.len();
			}
			req_endpoint = vlib::url_decode(req_endpoint);
			
			// Iterate endpoints.
			if (response.is_undefined()) {
				for (auto& endpoint: m_server->m_endpoints) {
					if (
						endpoint.m_method == request.method() &&
						endpoint.m_endpoint == req_endpoint &&
						(
						 request.content_type() == vlib::http::content_type::undefined ||
						 endpoint.m_content_type == request.content_type()
						 )
						) {
							
							SESLOG(4, tostr(
											m_conn->info.ip, ": Processing ",
											vlib::http::method::tostr(request.method()), ' ',
											req_endpoint, ".")
								   );
							
							// Check rate limit.
							SESLOG(4, tostr(m_conn->info.ip, ": ", "Verifying rate limit."));
							if (!endpoint.verify_rate_limit(m_conn->numeric_ip)) {
								SESLOG(2, tostr(m_conn->info.ip, ": ", "Rate limit exceeded."));
								response = m_server->m_429;
								close = true;
								break;
							}
							
							// Retrieve the auth key when present and the beloning uid.
							// Always do this to set the user cookie even when the endpoint.
							// Does not require authentication.
							retrieve_auth_key(auth_key, uid, response, request);
							if (response.is_defined()) {
								close = true;
								break;
							}
							
							// Do authentication for an autheticated endpoint.
							if (endpoint.m_auth & Endpoint::authenticated && !authenticated) {
								SESLOG(4, tostr(m_conn->info.ip, ": ", "Doing authentication."));
								authenticated = do_authentication(uid, response, request, auth_key);
								if (response.is_defined()) {
									close = true;
									break;
								}
							}
							
							// HTML endpoint.
							if (endpoint.m_type == 0) {
								SESLOG(4, tostr(m_conn->info.ip, ": ", "View endpoint."));
								Headers headers = endpoint.m_headers;
								if (request.content_type() != vlib::http::content_type::undefined) {
									m_server->create_user_cookie(headers, uid);
								}
								response.reconstruct(vlib::http::version::v1_1, 200, headers, endpoint.m_data);
							}
							
							// Rest API endpoint.
							else {
								handle_restapi_endpoint(response, request, endpoint, uid);
							}
							break;
						}
				}
			}
			
			// Not found.
			if (response.is_undefined()) {
				close = true;
				response.reconstruct(vlib::http::version::v1_1, 404, {{"Connection", "close"}}, "Not Found.");
			}
			
			// Log.
			if (m_server->m_config.log_level > 0) {
				SESLOG(1, tostr(
								m_conn->info.ip, ": ",
								vlib::http::method::tostr(request.method()), ' ',
								req_endpoint,
								": ", response.status_desc(), "."
								));
			}
			SESLOG(3, tostr(m_conn->info.ip, ": ", "Response time ", Date::get_mseconds() - start_time, "ms."));
			
			// Set default headers.
			m_server->set_header_defaults(response.headers());
			
			// Check close by header "Connection".
			ullong header_index;
			if (
				(header_index = response.headers().find("Connection", 10)) != NPos::npos &&
				response.headers().value(header_index).eq("close", 5)
				) {
					close = true;
				}
			
			// Send response.
			SESLOG(4, tostr(m_conn->info.ip, ": ", "Send response."));
			send(response, m_timeout);
			++requests;
			
			// Check connection close.
			if (close) {
				SESLOG(4, tostr(m_conn->info.ip, ": ", "Close."));
				this->close();
			}
			
			// Catch exception.
			// Send internal server error response and close the connection.
#if VWEB_CATCH_EXCEPTIONS == true
		} catch (vlib::Exception& e) {
			e.dump();
			send(m_server->m_500, m_timeout);
			this->close();
		}
#endif
	}
	
	// Get the authentication key and uid of the authentication key.
	// - Required for authentication but also for retrieving the uid.
	//   for a non authenticated endpoint.
	// - When the "response" parameter is defined after this function.
	//   It means a errors response has been defined and it should be sent to the client.
	void	retrieve_auth_key(
							  String& 		auth_key,
							  Len&			uid,
							  Response&		response,
							  const Request& 	request
							  ) {
		
		// Vars.
		ullong index;
		auth_key.reset();
		uid = NPos::npos;
		
		// Authenticate with bearer.
		if ((index = request.headers().find("Authorization", 13)) != NPos::npos) {
			
			// Get full key.
			String& authorization = request.headers().value(index);
			
			// Get authorization scheme & key.
			index = authorization.find(' ');
			if (index == NPos::npos) {
				SESLOG(2, tostr(m_conn->info.ip, ": ", "Invalid authorization header format."));
				response = m_server->m_401_invalid_format;
				return ;
			}
			
			// Check scheme.
			if (!authorization.eq(authorization.data(), index, "Bearer", 6)) {
				SESLOG(2, tostr(m_conn->info.ip, ": ", "Authorization type is not bearer."));
				response = m_server->m_401_invalid_scheme;
				return ;
			}
			
			// Set auth key.
			++index;
			auth_key = String(authorization.data() + index, authorization.len() - index);
			
		}
		
		// Authenticate with cookie.
		else if ((index = request.headers().find("Cookie", 6)) != NPos::npos) {
			
			// Parse the cookie value of key "T".
			String& cookie = request.headers().value(index);
			index = 0;
			ullong start_index = 0;
			for (auto& c: cookie) {
				switch (c) {
					case ' ':
					case ';':
						if (start_index != 0) {
							auth_key.reconstruct(cookie.data() + start_index, index - start_index);
							break;
						}
						++index;
						continue;
					case '=': {
						char prev = index >= 1 ? cookie[index - 1] : ' ';
						char prev_prev = index >= 2 ? cookie[index - 2] : ' ';
						if (prev == 'T' && (prev_prev == ' ' || prev_prev == ';')) {
							start_index = index + 1;
						}
						// fallthrough.
					}
					default:
						++index;
						continue;
				}
				break;
			}
			if (auth_key.is_undefined() && index == cookie.len() && start_index != 0) {
				auth_key.reconstruct(cookie.data() + start_index, index - start_index);
			}
			
		}
		
		// Set uid.
		if (auth_key.is_defined()) {
			ullong index = auth_key.find(':');
			if (index == NPos::npos) {
				SESLOG(2, tostr(m_conn->info.ip, ": ", "Invalid authentication key format."));
				response = m_server->m_401_invalid_format;
				return ;
			}
			uid = Len::parse(auth_key.data() + 1, index);
		}
		
	}
	
	// Do authentication.
	// - Returns a boolean indicating wether the user is authenticated.
	// - When the "response" parameter is defined after this function.
	//   It means a errors response has been defined and it should be sent to the client.
	Bool    do_authentication(
							  Len& 		    uid, 		// the user id when the request is authenticated.
							  Response& 		response, 	// the response object for errors.
							  const Request& 	request, 	// the request object.
							  const String& 	auth_key 	// the auth key from "retrieve_auth_key()".
	) {
		
		// Not authenticated.
		if (auth_key.is_undefined()) {
			SESLOG(2, tostr(m_conn->info.ip, ": ", "No authentication provided on an authenticated endpoint."));
			response = m_server->m_401;
			return false;
		}
		
		// Check key.
		if (auth_key.len() == 0) {
			SESLOG(2, tostr(m_conn->info.ip, ": ", "Invalid authentication key format."));
			response = m_server->m_401_invalid_format;
			return false;
		}
		
		// The uid was not set by "retrieve_auth_key()".
		// This means the auth key was defined but has an invalid format.
		if (uid == NPos::npos) {
			SESLOG(2, tostr(m_conn->info.ip, ": ", "Invalid authentication key format."));
			response = m_server->m_401_invalid_format;
			return false;
		}
		
		// Api key.
		if (auth_key.first() == '0') {
			if (!m_server->verify_api_key(auth_key)) {
				SESLOG(2, tostr(m_conn->info.ip, ": ", "Incorrect API key."));
				response = m_server->m_401;
				uid = NPos::npos;
				return false;
			}
			return true;
		}
		
		// Token.
		else if (auth_key.first() == '1') {
			if (!m_server->verify_token(auth_key)) {
				SESLOG(2, tostr(m_conn->info.ip, ": ", "Incorrect token key."));
				response = m_server->m_401;
				uid = NPos::npos;
				return false;
			}
			return true;
		}
		
		// Invalid.
		else {
			SESLOG(2, tostr(m_conn->info.ip, ": ", "Invalid authentication key type."));
			response = m_server->m_401;
			uid = NPos::npos;
			return false;
		}
	}
	
	// Serve a rest api endpoint.
	void	handle_restapi_endpoint(
									Response& 		response,
									const Request& 	request,
									const Endpoint& endpoint,
									const Len& 		uid
									) {
		
		// Get parameters.
		SESLOG(4, tostr(m_conn->info.ip, ": ", "REST API endpoint."));
		Json params;
		ullong pos;
		
		// Parameters by query string.
		if (
			(pos = request.endpoint().find('?')) != NPos::npos &&
			pos + 1 < request.endpoint().len()
			) {
				String query = vlib::url_decode(request.endpoint().slice(pos + 1));
				
				// No data.
				if (query.len() == 0) {
					SESLOG(2, tostr(m_conn->info.ip, ": ", "Bad request: no query data while \"?\" is provided."));
					response = m_server->m_400;
					return ;
				}
				
				// By json.
				if (query.first() == '{') {
					params = Json::parse(query);
				}
				
				// By query string.
				else {
					SESLOG(2, tostr(m_conn->info.ip, ": ", "Bad request: parsing a query string is not supported, send as json instead."));
					response = m_server->m_400;
					return ;
				}
				
			}
		
		// Parameters by body.
		else {
#if VWEB_CATCH_EXCEPTIONS == true
			try {
#endif
				params = Json::parse(request.body());
#if VWEB_CATCH_EXCEPTIONS == true
			} catch (vlib::Exception& e) {
				SESLOG(2, tostr(m_conn->info.ip, ": ", "Bad request: failed to parse json body parameters."));
				response = m_server->m_400;
				return ;
			}
#endif
		}
		
		// Call endpoint.
		switch (endpoint.m_type.value()) {
				
				// Type 1.
			case 1:
#if VWEB_CATCH_EXCEPTIONS == true
				try {
#endif
					response = endpoint.m_restapi_func_1();
#if VWEB_CATCH_EXCEPTIONS == true
				} catch (vlib::Exception& e) {
					if (m_server->m_config.log_level >= 1) {
						e.dump();
					}
					response = m_server->response(
												  vlib::http::status::internal_server_error,
												  Headers{{"Connection", "close"}},
												  Json{{"error", e.err()}}
												  );
				}
#endif
				return ;
				
				// Type 2.
			case 2:
#if VWEB_CATCH_EXCEPTIONS == true
				try {
#endif
					response = endpoint.m_restapi_func_2(*m_server, uid);
#if VWEB_CATCH_EXCEPTIONS == true
				} catch (vlib::Exception& e) {
					if (m_server->m_config.log_level >= 1) {
						e.dump();
					}
					response = m_server->response(
												  vlib::http::status::internal_server_error,
												  Headers{{"Connection", "close"}},
												  Json{{"error", e.err()}}
												  );
				}
#endif
				return ;
				
				// Type 3.
			case 3:
#if VWEB_CATCH_EXCEPTIONS == true
				try {
#endif
					response = endpoint.m_restapi_func_3(*m_server, params);
#if VWEB_CATCH_EXCEPTIONS == true
				} catch (vlib::Exception& e) {
					if (m_server->m_config.log_level >= 1) {
						e.dump();
					}
					response = m_server->response(
												  vlib::http::status::internal_server_error,
												  Headers{{"Connection", "close"}},
												  Json{{"error", e.err()}}
												  );
				}
#endif
				return ;
				
				// Type 4.
			case 4:
#if VWEB_CATCH_EXCEPTIONS == true
				try {
#endif
					response = endpoint.m_restapi_func_4(*m_server, uid, params);
#if VWEB_CATCH_EXCEPTIONS == true
				} catch (vlib::Exception& e) {
					if (m_server->m_config.log_level >= 1) {
						e.dump();
					}
					response = m_server->response(
												  vlib::http::status::internal_server_error,
												  Headers{{"Connection", "close"}},
												  Json{{"error", e.err()}}
												  );
				}
#endif
				return ;
				
				// Type 5.
			case 5:
#if VWEB_CATCH_EXCEPTIONS == true
				try {
#endif
					response = endpoint.m_restapi_func_5(*m_server, uid, params, request.headers());
#if VWEB_CATCH_EXCEPTIONS == true
				} catch (vlib::Exception& e) {
					if (m_server->m_config.log_level >= 1) {
						e.dump();
					}
					response = m_server->response(
												  vlib::http::status::internal_server_error,
												  Headers{{"Connection", "close"}},
												  Json{{"error", e.err()}}
												  );
				}
#endif
				return ;
				
				// Type 6.
			case 6:
#if VWEB_CATCH_EXCEPTIONS == true
				try {
#endif
					response = endpoint.m_restapi_func_6(*m_server, uid, params, request.headers(), m_conn->info);
#if VWEB_CATCH_EXCEPTIONS == true
				} catch (vlib::Exception& e) {
					if (m_server->m_config.log_level >= 1) {
						e.dump();
					}
					response = m_server->response(
												  vlib::http::status::internal_server_error,
												  Headers{{"Connection", "close"}},
												  Json{{"error", e.err()}}
												  );
				}
#endif
				return ;
				
				// Invalid endpoint type.
			default:
				throw vlib::InvalidUsageError("Invalid endpoint type \"", endpoint.m_type, "\".");
		}
	}
};

// ---------------------------------------------------------
// End.

};         // End namespace backend.
};         // End namespace vweb.
#endif     // End header.

