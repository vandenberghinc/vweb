/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_SESSION_H
#define VWEB_SESSION_H

// Log to console when log level equals minimum.
vlib::Mutex log_mutex;
#define SESLOG(min_log_level, text) \
    log_mutex.lock(); \
    if (m_server->m_config.log_level >= min_log_level) {\
        print("[Session:", m_session_index, "] ", text); \
    } \
    log_mutex.unlock();

// Namespace vweb.
namespace vweb {

// ---------------------------------------------------------
// Session.

template <
    typename Server,
    bool IsHTTPS
>
struct SessionTemplate : public vlib::Thread<SessionTemplate<Server, IsHTTPS>> {
    
// Private.
private:

    // ---------------------------------------------------------
    // Private functions.
    

// Public.
public:
    
    // ---------------------------------------------------------
    // Definitions.
    
    using Socket = typename Server::socket_type;
    using Client = typename Server::client_type;
    using Connection = vlib::sockets::Socket<>::Connection;
    using Request = vlib::http::Request;
    using Response = vlib::http::Response;
    using Endpoint = EndpointTemplate<Server>;
    
    // ---------------------------------------------------------
    // Attributes.
    
    vlib::SharedMemory<Client> m_client;
    Int                 m_timeout = 60 * 2.5 * 1000;
    Bool                m_assigned = false;
    Bool                m_run_permission = true;
    Int                 m_session_index = 0;
    Connection          m_connection;
    Server*             m_server;
    
    // ---------------------------------------------------------
    // Attributes.
    
    // Get fd.
    constexpr
    auto&   client() {
        return *m_client;
    }
    
    // Is assigned.
    constexpr
    auto&   is_assigned() {
        return m_assigned;
    }
    
    // Get run permission.
    constexpr
    auto&   run_permission() {
        return m_run_permission;
    }
    
    // Is busy.
    constexpr
    Bool    is_busy() requires (IsHTTPS) {
        return *m_client != NULL;
    }
    constexpr
    Bool    is_busy() requires (!IsHTTPS) {
        return *m_client != 0;
    }
    
    // ---------------------------------------------------------
    // Functions.
    
    // Start thread.
    void*   run(void) {
        init();
        while (m_run_permission) {
            SESLOG(3, "Sleeping.");
            this->sleep();
            try {
                handle_client();
            } catch(Exception& e) {
                SESLOG(2, "Encountered an error while handling the client.");
                e.dump();
            }
            SESLOG(3, "Close client.");
            close();
            SESLOG(3, "Reset.");
            reset();
        }
        return NULL;
    }
    
    // Initialize.
    void    init() requires (IsHTTPS) {
        *m_client = NULL;
    }
    void    init() requires (!IsHTTPS) {
        *m_client = 0;
    }
    
    // Close the connection.
    void    close() {
        Socket::close(*m_client);
    }
    
    // Reset all attributes.
    void    reset() requires (IsHTTPS) {
        *m_client = NULL;
    }
    void    reset() requires (!IsHTTPS) {
        *m_client = 0;
    }
    
    // Handle a client.
    void    handle_client() {
        try {
            SESLOG(3, "Handling client.");

            // Vars.
            m_connection = m_server->m_sock.info(*m_client); // connection info.
            Len numeric_ip = Socket::template get_ip<Len>(*m_client); // numerical ip for rate limiting.
            Len uid = NPos::npos; // the user id.
            Int keep_alive = m_timeout; // keep alive for server side.
            Bool close = false; // close connection after sending response.
            Bool authenticated = false; // is already authenticated within loop.
            
            // Loop to keep connection alive.
            while (true) {
                
                // Vars.
                ullong start_time = Date::get_mseconds();
                Response response;
                Request request;
                
                // Receive request.
                SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Receiving."));
                try {
                    Socket::recv(request, *m_client, keep_alive);
                } catch (TimeoutError& e) {
                    SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Operation timed out."));
                    return ;
                } catch (SocketClosedError& e) {
                    SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Peer has been closed."));
                    return ;
                } catch (BrokenPipeError& e) {
                    SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Broken pipe."));
                    return ;
                }
                SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Received."));
                
                // Undefined request.
                if (request.method() == vlib::http::method::undefined) {
                    if (Socket::is_connected(*m_client) && !Socket::is_broken(*m_client)) {
                        SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Bad request: undefined method."));
                        response = m_server->m_400;
                        close = true;
                    } else {
                        break;
                    }
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
             
                            // Check rate limit.
                            SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Verifying rate limit."));
                            if (!endpoint.verify_rate_limit(numeric_ip)) {
                                SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Rate limit exceeded."));
                                response = m_server->m_429;
                                break;
                            }
                             
                            // Do authentication for an autheticated endpoint.
                            if (endpoint.m_auth & Endpoint::authenticated && !authenticated) {
                                SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Doing authentication."));
                                authenticated = do_authentication(uid, response, request);
                                if (response.is_defined()) {
                                    break;
                                }
                            }
                                
                            // Do authentication to get the user id even when auth is not required for an endpoint.
                            else if (!authenticated) {
                                SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Retrieving user id."));
                                authenticated = do_authentication(uid, response, request);
                            }
                            
                            
                            // View endpoint.
                            if (endpoint.m_type == 0) {
                                SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "View endpoint."));
                                Headers headers = endpoint.m_headers;
                                m_server->create_user_cookie_h(headers, uid);
                                response.reconstruct(vlib::http::version::v1_1, 200, headers, endpoint.m_data);
                            }
                            
                            // Rest API endpoint.
                            else {
                                
                                // Get parameters.
                                SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "REST API endpoint."));
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
                                            SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Bad request: no query data while \"?\" is provided."));
                                            response = m_server->m_400;
                                            break;
                                        }
                                        
                                        // By json.
                                        if (query.first() == '{') {
                                            params = Json::parse(query);
                                        }
                                        
                                        // By query string.
                                        else {
                                            SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Bad request: parsing a query string is not supported, send as json instead."));
                                            response = m_server->m_400;
                                            break;
                                        }
                                        
                                    }
                                
                                // Parameters by body.
                                else {
                                    try {
                                        params = Json::parse(request.body());
                                    } catch (Exception& e) {
                                        SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Bad request: failed to parse json body parameters."));
                                        response = m_server->m_400;
                                        break;
                                    }
                                }
                                
                                // Call endpoint.
                                switch (endpoint.m_type.value()) {
                                    case 1:
                                        try {
                                            response = endpoint.m_restapi_func_1();
                                        } catch (Exception& e) {
                                            if (m_server->m_config.log_level >= 1) {
                                                e.dump();
                                            }
                                            response = m_server->response(
                                                vlib::http::status::internal_server_error,
                                                Headers{{"Connection", "close"}},
                                                Json{{"error", e.err()}}
                                            );
                                        }
                                        break;
                                    case 2:
                                        try {
                                            response = endpoint.m_restapi_func_2(*m_server, uid);
                                        } catch (Exception& e) {
                                            if (m_server->m_config.log_level >= 1) {
                                                e.dump();
                                            }
                                            response = m_server->response(
                                                vlib::http::status::internal_server_error,
                                                Headers{{"Connection", "close"}},
                                                Json{{"error", e.err()}}
                                            );
                                        }
                                        break;
                                    case 3:
                                        try {
                                            response = endpoint.m_restapi_func_3(*m_server, params);
                                        } catch (Exception& e) {
                                            if (m_server->m_config.log_level >= 1) {
                                                e.dump();
                                            }
                                            response = m_server->response(
                                                vlib::http::status::internal_server_error,
                                                Headers{{"Connection", "close"}},
                                                Json{{"error", e.err()}}
                                            );
                                        }
                                        break;
                                    case 4:
                                        try {
                                            response = endpoint.m_restapi_func_4(*m_server, uid, params);
                                        } catch (Exception& e) {
                                            if (m_server->m_config.log_level >= 1) {
                                                e.dump();
                                            }
                                            response = m_server->response(
                                                vlib::http::status::internal_server_error,
                                                Headers{{"Connection", "close"}},
                                                Json{{"error", e.err()}}
                                            );
                                        }
                                        break;
                                    case 5:
                                        try {
                                            response = endpoint.m_restapi_func_5(*m_server, uid, params, request.headers());
                                        } catch (Exception& e) {
                                            if (m_server->m_config.log_level >= 1) {
                                                e.dump();
                                            }
                                            response = m_server->response(
                                                vlib::http::status::internal_server_error,
                                                Headers{{"Connection", "close"}},
                                                Json{{"error", e.err()}}
                                            );
                                        }
                                        break;
                                    default:
                                        throw InvalidUsageError("vweb::Session", toString("Invalid endpoint type \"", endpoint.m_type, "\"."));
                                }
                                
                                // Set connection close header.
                                if (response.headers().find("Connection", 10) == NPos::npos) {
                                    close = true;
                                }
                                
                            }
                            break;
                        }
                    }
                }
                
                // Send response.
                if (response.is_undefined()) {
                    response.reconstruct(vlib::http::version::v1_1, 404, {{"Connection", "close"}}, "Not Found.");
                    if (m_server->m_config.log_level > 0) {
                        SESLOG(1, toString(
                            m_connection.ip, ':', m_connection.port, ": ",
                            vlib::http::method::tostr(request.method()), ' ',
                            req_endpoint,
                            ": Not Found."
                        ));
                    }
                } else if (m_server->m_config.log_level > 0) {
                    SESLOG(1, toString(
                        m_connection.ip, ':', m_connection.port, ": ",
                        vlib::http::method::tostr(request.method()), ' ',
                        req_endpoint,
                        ": ", response.status_desc(), "."
                    ));
                }
                SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Response time ", Date::get_mseconds() - start_time, "ms."));
                
                // Set keep alive variable.
                ullong index = response.headers().find("Keep-Alive", 10);
                if (index != NPos::npos) {
                    String& s = response.headers().value(index);
                    if ((index = s.find('=')) != NPos::npos) {
                        ++index;
                        ullong end_index;
                        if ((end_index = s.find(' ', index)) != NPos::npos) {
                            keep_alive = Int::parse(s.data() + index, end_index - index) * 1000;
                        } else {
                            keep_alive = Int::parse(s.data() + index, s.len() - index) * 1000;
                        }
                    }
                }
                
                // Send request.
                SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Send response."));
                Socket::send(*m_client, response, m_timeout);
                
                // Check connection close.
                if (close) {
                    SESLOG(3, toString(m_connection.ip, ':', m_connection.port, ": ", "Close."));
                    break;
                }
                
            }
        } catch (Exception& e) {
            e.dump();
            Socket::send(*m_client, m_server->m_500, m_timeout);
        }
    }
    
    // Do authentication.
    // Returns a boolean indicating wether the user is authenticated.
    Bool    do_authentication(
      Len& uid, // the user id when the request is authenticated.
      Response& response, // the response object for errors.
      const Request& request // the request object.
    ) {
        
        // Vars.
        String auth_key;
        ullong index;
        
        // Authenticate with bearer.
        if ((index = request.headers().find("Authorization", 13)) != NPos::npos) {
            
            // Get full key.
            String& authorization = request.headers().value(index);
            
            // Get authorization scheme & key.
            index = authorization.find(' ');
            if (index == NPos::npos) {
                SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Invalid authorization header format."));
                response = m_server->m_401_invalid_format;
                return false;
            }
            String scheme = String(authorization.data(), index);
            ++index;
            auth_key = String(authorization.data() + index, authorization.len() - index);
            
            // Check scheme.
            if (!scheme.eq("Bearer", 6)) {
                SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Authorization type is not bearer."));
                response = m_server->m_401_invalid_scheme;
                return false;
            }
            
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
        
        // Not authenticated.
        if (auth_key.is_undefined()) {
            SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "No authentication provided on an authenticated endpoint."));
            response = m_server->m_401;
            return false;
        }
        
        // Check key.
        if (auth_key.len() == 0) {
            SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Invalid authentication key format."));
            response = m_server->m_401_invalid_format;
            return false;
        }
        
        // Get uid.
        index = auth_key.find(':');
        if (index == NPos::npos) {
            SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Invalid authentication key format."));
            response = m_server->m_401_invalid_format;
            return false;
        }
        uid = Len::parse(auth_key.data() + 1, index);
        
        // Api key.
        if (auth_key.first() == '0') {
            if (!m_server->verify_api_key(auth_key)) {
                SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Incorrect API key."));
                response = m_server->m_401;
                uid = NPos::npos;
                return false;
            }
            return true;
        }
        
        // Token.
        else if (auth_key.first() == '1') {
            if (!m_server->verify_token(auth_key)) {
                SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Incorrect token key."));
                response = m_server->m_401;
                uid = NPos::npos;
                return false;
            }
            return true;
        }
        
        // Invalid.
        else {
            SESLOG(2, toString(m_connection.ip, ':', m_connection.port, ": ", "Invalid authentication key type."));
            response = m_server->m_401;
            uid = NPos::npos;
            return false;
        }
    }
};

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

