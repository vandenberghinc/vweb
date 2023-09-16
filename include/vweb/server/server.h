/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_SERVER_H
#define VWEB_SERVER_H

// Log to console when log level equals minimum.
// - Keep as macro so the "to_str" and "String" objects ...
//   wont get constructed if the log level is hidden.
#define SERVLOG(min_log_level, text) \
	log_mutex.lock(); \
	if (config.log_level >= min_log_level) {\
		print("[Server] ", text); \
	} \
	log_mutex.unlock();

// Namespace vweb.
namespace vweb {

// ---------------------------------------------------------
// Server.
//
// Index 0 of API keys and tokens indicate the type of key, 0 for an API key and 1 for a token.
// Index 1 till the index of ':' of API keys and tokens are used for the uid.
//

/*  @docs {
 *  @chapter: server
 *  @title: Server
 *  @description:
 *      VWeb backend server.
 *
 *      To enable HTTP and HTTPS you should define the port as -1 and define a tls certificate and key.
 *
 *		To change the content security policy, you need to edit key `Content-Security-Policy` of attribute `m_default_headers`. The attribute is a <type>Headers</type> type.
 *  @usage:
 *      #include <vweb/vweb.h>
 *      vweb::HTTPServer server {...};
 } */
struct Server {
    
    // Public.
public:
    
    // ---------------------------------------------------------
    // Exceptions.
    
    static excid_t smtp_undefined_err;
    
    // ---------------------------------------------------------
    // Definitions.
    
    using   SHA =       vlib::SHA256;
    using   Mutex =     vlib::Mutex;
    using   Response =  vlib::http::Response;
    using   Headers =   vlib::http::Headers;
    using   Endpoint =  EndpointTemplate<Server>;
    using   SMTPArgs =  vlib::smtp::Client::ConstructArgs;
    
    // ---------------------------------------------------------
    // Structs.
    
    // Token struct.
    struct Token {
        Len     expiration = 0;
        String  token;
    };
    
    // User struct.
    struct User {
        Len     uid = NPos::npos;
        String  first_name; // first name.
        String  last_name;  // last name.
        String  username;   // the users username.
        String  email;      // the users email.
        String  password;   // hashed password.
        String  api_key;    // hashed api key.
		
		// Get as json.
		constexpr
		Json	json() const {
			return Json {
				{"uid", uid},
				{"first_name", first_name},
				{"last_name", last_name},
				{"username", username},
				{"email", email},
				{"password", password},
				{"api_key", api_key},
			};
		}
    };
    
    // 2FA struct.
    struct TwoFactorAuth {
        String  code;
        Len     expiration = 0;
    };
	
    // ---------------------------------------------------------
    // Attributes.
    // Requires public for "Session".
    
    server::Config        		config;		            // server configuration.
    Array<Endpoint>     		m_endpoints;            // all endpoint.
    Len                 		m_max_uid;              // the maximum user id, including deleted users.
    String              		m_hash_key;             // key used for hashing passwords and api keys.
    SMTPArgs            		m_smtp;                 // the smtp client.
	backend::Backend<Server>	m_backend;
	
	// Stripe.
	Stripe						stripe;
    
    // Mutexes.
    Mutex               		m_mutex_add_del_uid;    // Mutex for adding / deleting an uid.
    Mutex               		m_mutex_smtp;           // Mutex for adding / deleting an uid.
    
    // Default headers.
    // These will be merged with the headers of each request.
    Headers     m_default_headers = {
        {"Vary", "Origin"},
        {"Referrer-Policy", "same-origin"},
        {"Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS"},
        {"X-XSS-Protection", "1; mode=block"},
        {"X-Content-Type-Options", "frame-ancestors 'none'; nosniff;"},
        {"X-Frame-Options", "DENY"},
        {"Strict-Transport-Security", "max-age=31536000"},
        {"Content-Security-Policy",
			String() <<
			"default-src 'self' *.google-analytics.com https://my.spline.design; "
			"img-src 'self' *.google-analytics.com raw.githubusercontent.com www.w3.org; "
			"script-src 'self' ajax.googleapis.com www.googletagmanager.com googletagmanager.com *.google-analytics.com raw.githubusercontent.com code.jquery.com; "
			"style-src 'self' 'unsafe-inline'; "
			"upgrade-insecure-requests; "
			"block-all-mixed-content;"
		},
    };
    
    // Default responses.
    Response    m_400 = Response {
        vlib::http::version::v1_1,
        400,
        {{"Connection", "close"}},
        "Bad request."
    };
    Response    m_401 = Response {
        vlib::http::version::v1_1,
        401,
        {{"Connection", "close"}, {"WWW-Authorization", "Bearer"}},
        "Unauthorized."
    };
    Response    m_401_invalid_format = Response {
        vlib::http::version::v1_1,
        401,
        {{"Connection", "close"}, {"WWW-Authorization", "Bearer"}},
        "Unauthorized [Invalid Authorization Format]."
    };
    Response    m_401_invalid_scheme = Response {
        vlib::http::version::v1_1,
        401,
        {{"Connection", "close"}, {"WWW-Authorization", "Bearer"}},
        "Unauthorized [Invalid Authorization Scheme]."
    };
    Response    m_404 = Response {
        vlib::http::version::v1_1,
        404,
        {{"Connection", "close"}},
        "Not Found."
    };
    Response    m_429 = Response {
        vlib::http::version::v1_1,
        429,
        {{"Connection", "close"}},
        "Too Many Requests."
    };
    Response    m_500 = Response {
        vlib::http::version::v1_1,
        500,
        {{"Connection", "close"}},
        "Internal Server Error."
    };
    
    // Mail content.
	String      m_2fa_mail = "{{2FA}}";
       /*(
		HTMLBuilder::build_mail
        ui::View {
            ui::VStack {
                
                ui::HStack {
                    ui::Image("https://raw.githubusercontent.com/vandenberghinc/public-storage/master/vandenberghinc/icon/triangle.png")
                        .width(28)
                        .height(28)
                        .margin_right(3)
						.alt("VInc"),
                    ui::Image("https://raw.githubusercontent.com/vandenberghinc/public-storage/master/vandenberghinc/icon/stroke.png")
                        .width(60)
                        .height(30)
						.alt("VInc"),
                }
                .margin_bottom(25),
                
                ui::VStack {
                    ui::VStack {
                        
                        ui::Title("Verification Required")
                            .font_size(42),
                        ui::Text("Please confirm your request with this 2FA code.")
                            .margin_top(15)
                            .margin_bottom(25),
                        
                        ui::HStack {
                            ui::VStack()
                                .width(5, 5)
                                .height(5, 5)
                                .margin(14, 10, 0, 0)
                                .border_radius("50%")
                                .background("#E8454E"),
                            ui::Text("Account: {{USERNAME}}")
                        }
                        .leading_text()
                        .width("100%"),
                        
                        ui::HStack {
                            ui::VStack()
                                .width(5, 5)
                                .height(5, 5)
                                .margin(14, 10, 0, 0)
                                .border_radius("50%")
                                .background("#E8454E"),
                            ui::Text("Date: {{DATE}}"),
                        }
                        .leading_text()
                        .width("100%"),
                        
                        ui::HStack {
                            ui::VStack()
                                .width(5, 5)
                                .height(5, 5)
                                .margin(14, 10, 0, 0)
                                .border_radius("50%")
                                .background("#E8454E"),
                            ui::Text("Device: {{DEVICE}}"),
                        }
                        .leading_text()
                        .width("100%"),
                        
                        ui::HStack {
                            ui::VStack()
                                .width(5, 5)
                                .height(5, 5)
                                .margin(14, 10, 0, 0)
                                .border_radius("50%")
                                .background("#E8454E"),
                            ui::Text("IP Address: {{IP}}"),
                        }
                        .leading_text()
                        .width("100%"),
                        
                        ui::Text("{{2FA}}")
                            .color("#E8454E")
                            .border_radius(10)
                            .padding(15)
                            .margin_top(35)
                            .margin_bottom(10)
                            .background("#F2F2F2")
                            .width("100%"),
                        
                        ui::Text("This code will be valid for 30 minutes.")
                            .font_size(15)
                            .font_style("italic"),
                        
                    }
                    .padding(50)
                    .border_top(4, "#E8454E")
                    .border_right(2, "#E8E8E8")
                    .border_left(2, "#E8E8E8")
                    .border_bottom(2, "#E8E8E8")
                }
                .background("#FFFFFF")
                .border_radius(5)
                .margin_bottom(25)
                .overflow("hidden")
                .max_width(500),
                
                ui::Text("Copyright © 2023 Van Den Bergh Inc")
                    .font_size(14)
            }
            .padding(50, 15, 50, 15)
            .center()
            // .vertical_center()
            .width("100%")
            // .height("100%")
         }
         .font_family("Helvetica")
         .color("#04060B")
         .padding(0)
         .background("#F2F2F2")
         .overflow("scroll")
         // .position("relative")
         // .width("100%")
         // .height("100%")
         .move()
    );*/
    
// Private.
private:
    
    // ---------------------------------------------------------
    // Utils.
	
    // Iterate a directories file paths.
    // With a handler for the file name.
    template <typename String, typename Func>
    void    iter_dir(const String& subpath, Func&& func) {
        Path path = config.database.join(subpath);
        DIR *dir;
        struct dirent* ent;
        if ((dir = ::opendir(path.c_str())) != NULL) {
            while ((ent = ::readdir(dir)) != NULL) {
                if (ent->d_type & DT_REG) {
                    func(ent->d_name);
                }
            }
            ::closedir(dir);
            free(ent);
        } else {
            throw vlib::ParseError("Unable to read the content of directory ", path, ".");
        }
    }
    
    // Get the max user id.
    Len     get_max_uid() {
        Len muid = 0, uid;
        iter_dir(".sys/users", [&](const char* name) {
            uid = Len::parse(name, vlib::len(name));
            if (uid > muid) {
                muid = uid;
            }
        });
        return muid;
    }
    
    // Check of the uid is within the max uid range.
    constexpr
    void    check_uid_within_range(const Len& uid) const {
        if (uid == NPos::npos) {
            throw vlib::UserDoesNotExistError("Undefined user id.");
        }
        else if (uid > m_max_uid) {
            throw vlib::UserDoesNotExistError("User id \"", uid, "\" does not exist.");
        }
    }
    
    // Generate an api key.
    String  sys_generate_api_key() const {
        return SHA::generate_key(32);
    }
    
    // Load data and check for empty reads due to simultanous writings.
    // Make sure that the path is not a dir since that would always try to read till timeout.
    String  sys_load_data(const String& path, const Int& timeout = 5 * 1000) const {
        ullong end_time = Date::get_mseconds() + timeout.value();
        if (!Path::exists(path.c_str())) {
            return {};
        }
        while (end_time > Date::get_mseconds()) {
            String data;
            switch (vlib::load(path.c_str(), data.data(), data.len())) {
                case 0:
                    if (data.len() > 0) {
                        data.capacity() = data.len();
                        return data;
                    }
                case vlib::file::error::open:
                    throw vlib::OpenError("Unable to open file \"", path, "\".");
                case vlib::file::error::read:
                    break;
                case vlib::file::error::write:
                    throw vlib::WriteError("Unable to write to file \"", path, "\".");
                default:
                    throw vlib::OpenError("Unable to open file \"", path, "\".");
            }
        }
        throw vlib::ReadError("Unable to read file \"", path, "\".");
        return {};
    }
    
    // Load system user data.
    User    sys_load_user(const Len& uid) const {
        String data = sys_load_data(to_str(config.database, "/.sys/users/", uid));
        User user;
        if (!data.eq("D", 1)) {
            user.uid = uid;
            ullong index = 0, start_index = 0;
            short mode = 0;
            for (auto& c: data) {
                switch (c) {
                    case '\n':
                        switch (mode) {
                            case 0:
                                user.first_name.reconstruct(data.data() + start_index, index - start_index);
                                start_index = index + 1;
                                mode = 1;
                                break;
                            case 1:
                                user.last_name.reconstruct(data.data() + start_index, index - start_index);
                                start_index = index + 1;
                                mode = 2;
                                break;
                            case 2:
                                user.username.reconstruct(data.data() + start_index, index - start_index);
                                start_index = index + 1;
                                mode = 3;
                                break;
                            case 3:
                                user.email.reconstruct(data.data() + start_index, index - start_index);
                                start_index = index + 1;
                                mode = 4;
                                break;
                            case 4:
                                user.password.reconstruct(data.data() + start_index, index - start_index);
                                start_index = index + 1;
                                mode = 5;
                                break;
                            case 5:
                                user.api_key.reconstruct(data.data() + start_index, index - start_index);
                                start_index = index + 1;
                                mode = 0;
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                ++index;
            }
        }
        return user;
    }
    
    // Save system user data.
    void    sys_save_user(const Len& uid, const User& user) const {
        Path path = to_str(config.database, "/.sys/users/", uid);
        path.save(to_str(
                        user.first_name, '\n',
                        user.last_name, '\n',
                        user.username, '\n',
                        user.email, '\n',
                        user.password, '\n',
                        user.api_key, '\n'
                        ));
    }
    
    // Delete system user data.
    void    sys_delete_user(const Len& uid) const {
        Path::save(to_str(config.database, "/.sys/users/", uid), "D");
        String suid = uid.str();
        sys_save_uid_by_username(suid, "D");; // @todo contains an error the second arg is the username not the value to be saved.
        sys_save_uid_by_email(suid, "D"); // @todo contains an error the second arg is the username not the value to be saved.
    }
    
    // Load system user token.
    // @todo no longer in sync with js, js uses line by line as seperators. Make it as js does it.
    // @todo no longer in sync with js, js deletes all deleted files while cpp saves "D" to it. Make it as js does it.
    Token   sys_load_user_token(const Len& uid) const {
        String data = sys_load_data(to_str(config.database, "/.sys/tokens/", uid));
        if (!data.eq("D", 1)) {
            ullong index = 0, start_index = 0, delimiter_index = 0;
            for (auto& c: data) {
                switch (c) {
                    case ':':
                        delimiter_index = index;
                        break;
                    case '\n':
                        return Token{
                            .expiration = Len::parse(data.data() + start_index, delimiter_index),
                            .token = String(data.data() + (delimiter_index + 1), index - (delimiter_index + 1)),
                        };
                    default:
                        break;
                }
                ++index;
            }
        }
        return Token { .expiration = 0 };
    }
    
    // Save system user token.
    void    sys_save_user_token(const Len& uid, const Token& token) const {
        if (token.expiration == 0) {
            Path::save(to_str(config.database, "/.sys/tokens/", uid), "D");
            return ;
        }
        String data;
        data.concats_r(token.expiration, ':', token.token, '\n');
        data.save(to_str(config.database, "/.sys/tokens/", uid));
    }
    
    // Delete system user token.
    void    sys_delete_user_token(const Len& uid) const {
        Path::save(to_str(config.database, "/.sys/tokens/", uid), "D");
    }
    
    // Save / delete system uid by username.
    void    sys_save_uid_by_username(const String& uid, const String& username) const {
        uid.save(to_str(config.database, "/.sys/usernames/", username));
    }
	void    sys_delete_uid_by_username(const String& uid, const String& username) const {
		Path::remove(to_str(config.database, "/.sys/usernames/", username));
	}
    
    // Save / delete system uid by email.
    void    sys_save_uid_by_email(const String& uid, const String& email) const {
        uid.save(to_str(config.database, "/.sys/emails/", email));
    }
	void    sys_delete_uid_by_email(const String& uid, const String& email) const {
		Path::remove(to_str(config.database, "/.sys/emails/", email));
	}
    
    // Save system 2fa by uid.
    void    sys_save_user_2fa(const String& uid, const TwoFactorAuth& auth) const {
        Path::save(
                   to_str(config.database, "/.sys/2fa/", uid),
                   to_str(auth.code, '\n', auth.expiration)
                   );
    }
    
    // Load system 2fa by uid.
    TwoFactorAuth sys_load_user_2fa(const String& uid) const {
        try {
            String data = String::load(to_str(config.database, "/.sys/2fa/", uid));
            data.replace_end_r("\n");
            ullong pos;
            if ((pos = data.find('\n')) != NPos::npos) {
                return {
                    .code = data.slice(0, pos),
                    .expiration = Len::parse(data.data() + (pos + 1), data.len() - pos - 1),
                };
            }
            return {};
        } catch (...) {
            return {};
        }
    }
    
    // Delete system 2fa by uid.
    void    sys_delete_user_2fa(const String& uid) const {
        Path::remove(to_str(config.database, "/.sys/2fa/", uid));
    }
	
	// Sign a user in and return a response.
	Response sign_in_response(const Len& uid) {
	
		// Generate token.
		String token = generate_token(uid);
		
		// Create headers.
		Headers headers;
		create_token_cookie(headers, token);
		create_user_cookie(headers, uid);
		create_detailed_user_cookie(headers, uid);
			
		// Response.
		return Server::response(
			vlib::http::status::success,
			headers,
			{{"message", "Successfully signed in."}}
		);
		
	}
    
	// ---------------------------------------------------------
	// Default endpoints.
	
	// Add endpoint helper.
	void	add_endpoint_h(Endpoint&& endpoint) {
		
		// Check duplicates.
		for (auto& x: m_endpoints) {
			if (x.endpoint == endpoint.endpoint && x.method == endpoint.method) {
				throw vlib::DuplicateError("Endpoint \"", endpoint.endpoint, "\" already exists.");
			}
		}
		
		// Append.
		m_endpoints.append(vlib::move(endpoint.initialize()));
	}
	
	// Create default endpoints.
	void    create_default_endpoints() {
		
		// ---------------------------------------------------------
		// Static files.
		
		// Add vweb static files.
        JArray products;
        for (auto& i: config.stripe_products) {
            products.append(i.json());
        }
		Path include_base = Path(__FILE__).base(2);
		Array<vlib::Pack<String, String, Path, Json>> packs = {
			{"text/css", "/vweb/vweb.css", include_base.join("ui/css/vweb.css"), {}},
			{"text/css", "/vweb/vhighlight.css", include_base.join("ui/css/vhighlight.css"), {}},
			{"application/javascript", "/vweb/vweb.js", include_base.join("ui/js/vweb.js"), {
                {"STRIPE_PUBLISHABLE_KEY", config.stripe_publishable_key},
                {"STRIPE_PRODUCTS", products},
            }},
			
			// Deprecated.
			// {"application/javascript", "/vweb/pre_js.js", include_base.join("html/pre_js.js")},
			// {"application/javascript", "/vweb/post_js.js", include_base.join("html/post_js.js")},
		};
		for (auto& [content_type, endpoint, full_path, templates]: packs) {
			Code data = full_path.load();
			if (endpoint == "/vweb/vweb.js") {
				fill_vweb_decorators(data, full_path);
			}
            for (auto& [key, value]: templates.iterate()) {
                data.replace_r(*key, value->str());
            }
			add_endpoint_h({
				.method = "GET",
				.endpoint = endpoint,
				.content_type = content_type,
				.cache = vweb_production,
				.compress = false,
				.rate_limit = {
					.limit = 100,
					.duration = 60,
				},
				.data = data,
			});
		}
		
		// ---------------------------------------------------------
		// Default auth endpoints.
		
		// Send 2fa.
		add_endpoint_h({
			.method = "GET",
			.endpoint = "/backend/auth/2fa",
			.content_type  = "application/json",
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = Endpoint::CallBack([](
			   Server& server,
			   const Len&,
			   const Json& params,
			   const Headers& headers,
			   const vlib::Socket<>::Info& connection
			) {
				
				// Vars.
				vlib::http::Response response;
				String *email = nullptr;
				
				// Get params.
				if (!vweb::get_param(response, params, email, "email", 5)) {
					return response;
				}
				
				// Get uid.
				Len uid;
				if ((uid = server.get_uid_by_email(*email)) == NPos::npos) {
					return Server::response(
						vlib::http::status::success,
						Headers{{"Connection", "close"}},
						Json{{"message", "A 2FA code was sent if the specified email exists."}}
					);
				}
				
				// Send.
				server.send_2fa(uid, headers, connection.ip);
				return Server::response(
					vlib::http::status::success,
					Headers{{"Connection", "close"}},
					Json{{"message", "A 2FA code was sent if the specified email exists."}}
				);
				
			})
		});
		
		// Sign in.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/auth/signin",
			.content_type  = "application/json",
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](
			   Server& server,
			   const Len&,
			   const Json& params,
			   const Headers& headers,
			   const vlib::Socket<>::Info& connection
			) {
				
				// Vars.
				vlib::http::Response response;
				String *email = nullptr, *username = nullptr, *password = nullptr, *code = nullptr;
				Len uid;
				
				// Get params.
				if (
					(
					 !vweb::get_param(response, params, username, "username", 8) &&
					 !vweb::get_param(response, params, email, "email", 5)
					) ||
					!vweb::get_param(response, params, password, "password", 8)
				) {
					return response;
				}
				
				// Get uid.
				if (email) {
					if ((uid = server.get_uid_by_email(*email)) == NPos::npos) {
						return Server::response(
							vlib::http::status::unauthorized,
							Json {{"error", "Unauthorized."}}
						);
					}
				} else {
					if ((uid = server.get_uid(*username)) == NPos::npos) {
						return Server::response(
							vlib::http::status::unauthorized,
							Json {{"error", "Unauthorized."}}
						);
					}
				}
				
				// Verify password.
				if (server.verify_password(uid, *password)) {
					
					// Verify 2fa.
					if (server.config.enable_2fa) {
						if (!vweb::get_param(response, params, code, "2fa", 3) || code->is_undefined()) {
							server.send_2fa(uid, headers, connection.ip);
							return Server::response(
								vlib::http::status::two_factor_auth_required,
								Headers {
									{"Connection", "close"},
								},
								Json {
									{"error", "2FA required."} // do not change this text, it can be used to detect 2fa requirement.
								}
							);
						}
						if (!server.verify_2fa(uid, *code)) {
							return Server::response(
								vlib::http::status::unauthorized,
								Json {{"error", "Invalid 2FA code."}}
							);
						}
					}
					
					// Sign in.
					return server.sign_in_response(uid);
				}
				return Server::response(
					vlib::http::status::unauthorized,
					Json {{"error", "Unauthorized."}}
				);
			}
		});
		
		// Sign out.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/auth/signout",
			.content_type = "application/json",
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid) {
				
				// Delete token.
				server.sys_delete_user_token(uid);
				
				// Create headers.
				Headers headers {
					{"Connection", "close"},
				};
				server.reset_cookies(headers);
				
				// Response.
				return Server::response(
										vlib::http::status::success,
										headers,
										{{"message", "Successfully signed out."}}
										);
			}
		});
		
		// Sign up.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/auth/signup",
			.content_type  = "application/json",
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](
			   Server& server,
			   const Len&,
			   const Json& params,
			   const Headers& headers,
			   const vlib::Socket<>::Info& connection
			) {
				
				// Vars.
				vlib::http::Response response;
				String
				*first_name = nullptr,
				*last_name = nullptr,
				*username = nullptr,
				*email = nullptr,
				*pass = nullptr,
				*verify_pass = nullptr;
				
				// Get params.
				if (
					!vweb::get_param(response, params, username, "username", 8) ||
					!vweb::get_param(response, params, first_name, "first_name", 10) ||
					!vweb::get_param(response, params, last_name, "last_name", 9) ||
					!vweb::get_param(response, params, email, "email", 5) ||
					!vweb::get_param(response, params, pass, "password", 8) ||
					!vweb::get_param(response, params, verify_pass, "verify_password", 15)
				) {
					return response;
				}
				
				// Verify password.
				if (*pass != *verify_pass) {
					return Server::response(
						vlib::http::status::bad_request,
						Json{{"error", "Passwords do not match."}}
					);
				}
				
				// Create.
				Len uid = server.create_user(*first_name, *last_name, *username, *email, *pass);
				
				// Send 2fa code for activation.
				// if (server.config.enable_2fa) {
				server.send_2fa(uid, headers, connection.ip);
				// }
				
				// Sign in.
				return server.sign_in_response(uid);
				
			}
		});
		
		// Activate account.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/auth/activate",
			.content_type  = "application/json",
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid, const Json& params, const Headers& headers) {
				
				// Vars.
				Len l_uid = uid;
				
				// Get uid by cookie.
				if (l_uid == NPos::npos) {
					String value = vweb::get_cookie(headers, "2FAUserID");
					if (value.is_defined() && !value.eq("-1", 2)) {
						l_uid - value.as<Len>();
					}
				}
				
				// Check uid.
				if (l_uid == NPos::npos) {
					return Server::response(
											vlib::http::status::forbidden,
											Headers{{"Connection", "close"}},
											Json{{"error", "Permission denied."}}
											);
				}
				
				// Get param.
				vlib::http::Response response;
				String *code = nullptr;
				if (!vweb::get_param(response, params, code, "2fa", 3)) {
					return response;
				}
				
				// Verify.
				if (server.verify_2fa(l_uid, *code)) {
					
					// Set activated.
					server.set_activated(l_uid, true);
					
					// Response.
					Headers headers {
						{"Connection", "close"},
					};
					server.create_user_cookie(headers, l_uid);
					return Server::response(
											vlib::http::status::success,
											headers,
											Json{{"message", "Successfully verified the 2FA code."}}
											);
				}
				
				// Invalid code.
				else {
					return Server::response(
											vlib::http::status::forbidden,
											Headers{{"Connection", "close"}},
											Json{{"error", "Permission denied."}}
											);
				}
				
			}

		});
		
		// Forgot password.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/auth/forgot_password",
			.content_type  = "application/json",
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Json& params) {
				
				// Vars.
				vlib::http::Response response;
				String *email = nullptr, *code = nullptr, *pass = nullptr, *verify_pass = nullptr;
				
				// Get params.
				if (
					!vweb::get_param(response, params, email, "email", 5) ||
					!vweb::get_param(response, params, code, "2fa", 3) ||
					!vweb::get_param(response, params, pass, "password", 8) ||
					!vweb::get_param(response, params, verify_pass, "verify_password", 15)
				) {
					return response;
				}
				
				// Verify password.
				if (*pass != *verify_pass) {
					return Server::response(
						 vlib::http::status::bad_request,
						 Headers{{"Connection", "close"}},
						 Json{{"error", "Passwords do not match."}}
					 );
				}
				
				// Get uid.
				Len uid;
				if ((uid = server.get_uid_by_email(*email)) == NPos::npos) {
					return Server::response(
						 vlib::http::status::forbidden,
						 Headers{{"Connection", "close"}},
						 Json{{"error", "Permission denied."}}
					 );
				}
				
				// Verify 2fa.
				if (!server.verify_2fa(uid, *code)) {
					return Server::response(
						 vlib::http::status::forbidden,
						 Headers{{"Connection", "close"}},
						 Json{{"error", "Invalid 2FA code."}}
					 );
				}
				
				// Set password.
				server.set_password(uid, *pass);
				
				// Sign in.
				return server.sign_in_response(uid);
			}

		});
		
		// ---------------------------------------------------------
		// Default user endpoints.
		
		// Get user.
		add_endpoint_h({
			.method = "GET",
			.endpoint = "/backend/user",
			.content_type  = "application/json",
			.auth = Endpoint::authenticated,
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid) {
				return server.response(
					vlib::http::status::success,
					server.get_user(uid).json()
				);
			}
		});
		
		// Set user.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/user",
			.auth = Endpoint::authenticated,
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid, const Json& params) {
				server.set_user(uid, params);
				Headers headers;
				server.create_detailed_user_cookie(headers, uid);
				return server.response(
					vlib::http::status::success,
					headers,
					Json{{"message", "Successfully updated your account."}}
				);
			}
		});
		
		// Change password.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/user/change_password",
			.auth = Endpoint::authenticated,
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid, const Json& params) {
				
				// Vars.
				vlib::http::Response response;
				String
				*current_pass = nullptr,
				*pass = nullptr,
				*verify_pass = nullptr;
				
				// Get params.
				if (
					!vweb::get_param(response, params, current_pass, "current_password", 16) ||
					!vweb::get_param(response, params, pass, "password", 8) ||
					!vweb::get_param(response, params, verify_pass, "verify_password", 15)
				) {
					return response;
				}
				
				// Verify old password.
				if (!server.verify_password(uid, *current_pass)) {
					return Server::response(
						vlib::http::status::unauthorized,
						Json{{"error", "Incorrect password."}}
					);
				}
				
				// Verify new password.
				if (*pass != *verify_pass) {
					return Server::response(
						vlib::http::status::bad_request,
						Json{{"error", "Passwords do not match."}}
					);
				}
				
				// Set password.
				server.set_password(uid, *pass);
				
				// Success.
				return Server::response(
					vlib::http::status::success,
					Json{{"message", "Successfully updated your password."}}
				);
				
			}
		});
		
		// Generate api key.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/user/api_key",
			.auth = Endpoint::authenticated,
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid) {
				return server.response(
					vlib::http::status::success,
					Json{
						{"message", "Successfully generated an API key."},
						{"api_key", server.generate_api_key(uid)},
					}
				);
			}
		});
		
		// Revoke api key.
		add_endpoint_h({
			.method = "DELETE",
			.endpoint = "/backend/user/api_key",
			.auth = Endpoint::authenticated,
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid) {
				server.revoke_api_key(uid);
				return server.response(
					vlib::http::status::success,
					Json{{"message", "Successfully revoked your API key."}}
				);
			}
		});
		
		// Load data.
		add_endpoint_h({
			.method = "GET",
			.endpoint = "/backend/user/data",
			.auth = Endpoint::authenticated,
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid, const Json& params) {
				vlib::http::Response response;
				String *path;
				if (!vweb::get_param(response, params, path, "path", 4)) {
					return response;
				}
				return Server::response(
					vlib::http::status::success,
					server.load_user_data(uid, *path)
				);
			}
		});
		
		// Save data.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/user/data",
			.auth = Endpoint::authenticated,
			.rate_limit = {
				.limit = 10,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid, const Json& params) {
				vlib::http::Response response;
				String *path;
				Json *data = NULL;
				if (
					!vweb::get_param(response, params, path, "path", 4) ||
					!vweb::get_param(response, params, data, "data", 4)
				) {
					return response;
				}
				server.save_user_data(uid, *path, *data);
				return Server::response(
					vlib::http::status::success,
					Json{{"message", "Successfully saved."}}
				);
			}
		});
		
		// ---------------------------------------------------------
		// Default charge endpoints.
		
		// Charge.
		add_endpoint_h({
			.method = "POST",
			.endpoint = "/backend/payments/charge",
			.content_type  = "application/json",
			.rate_limit = {
				.limit = 25,
				.duration = 60,
			},
			.callback = [](Server& server, const Len& uid, const Json& params) {
				
				// Response.
				vlib::http::Response response;
				
				// Get params.
                String *return_url = NULL, *payment_type = NULL, *card_number = NULL;
                Int *card_exp_month = NULL, *card_exp_year = NULL, *card_cvc = NULL;
				JArray *products = NULL; // array with product ids.

                // Required params.
				if (!vweb::get_param(response, params, products, "products", 8) ||
                    !vweb::get_param(response, params, return_url, "return_url", 10) ||
                    !vweb::get_param(response, params, payment_type, "payment_type", 12)
                ) {
					return response;
				}

                // Optional params when payment method is card.
                if (
                    payment_type->eq("card", 4) &&
                    (
                        !vweb::get_param(response, params, card_number, "card_number", 11)// ||
                        // !vweb::get_param(response, params, card_exp_month, "card_exp_month", 14) ||
                        // !vweb::get_param(response, params, card_exp_year, "card_exp_year", 13) ||
                        // !vweb::get_param(response, params, card_cvc, "card_cvc", 8)
                    )
                ) {
                    return response;
                }

                // Get product ids.
                Array<String> product_ids;
                for (auto& i: *products) {
                    if (!i.iss()) {
                        return server.error(vlib::http::status::bad_request, "The product ids should be an array with strings.");
                    }
                    product_ids.append(move(i.ass()));
                }

                // Get / create customer id.
                String customer_id;
                if (uid == NPos::npos) {
                    customer_id = server.stripe.create_customer();
                } else {
                    return server.error(vlib::http::status::bad_request, "TODO fetch customer id."); // @TODO
                }

                // Create payment method.
                Stripe::PaymentMethod payment_method = server.stripe.create_payment_method(
                    *payment_type,
                    *card_number,
                    *card_exp_month,
                    *card_exp_year,
                    *card_cvc
                );
				
				// Success.
				return server.response(
					vlib::http::status::success,
					server.stripe.charge(
                        customer_id,
                        payment_method,
                        product_ids,
                        *return_url
                    )
				);
			}
		});	
	}
	
	// Get content type from file extension.
	String 	get_content_type(const String& extension) {
		static const Dict<String, String> mimes = {
			{ "html", "text/html" },
			{ "htm", "text/html" },
			{ "shtml", "text/html" },
			{ "css", "text/css" },
			{ "xml", "application/xml" },
			{ "gif", "image/gif" },
			{ "jpeg", "image/jpeg" },
			{ "jpg", "image/jpeg" },
			{ "js", "application/javascript" },
			{ "atom", "application/atom+xml" },
			{ "rss", "application/rss+xml" },
			{ "mml", "text/mathml" },
			{ "txt", "text/plain" },
			{ "jad", "text/vnd.sun.j2me.app-descriptor" },
			{ "wml", "text/vnd.wap.wml" },
			{ "htc", "text/x-component" },
			{ "png", "image/png" },
			{ "tif", "image/tiff" },
			{ "tiff", "image/tiff" },
			{ "wbmp", "image/vnd.wap.wbmp" },
			{ "ico", "image/x-icon" },
			{ "jng", "image/x-jng" },
			{ "bmp", "image/x-ms-bmp" },
			{ "svg", "image/svg+xml" },
			{ "svgz", "image/svg+xml" },
			{ "webp", "image/webp" },
			{ "woff", "font/woff" },
			{ "woff2", "font/woff2" },
			{ "jar", "application/java-archive" },
			{ "war", "application/java-archive" },
			{ "ear", "application/java-archive" },
			{ "json", "application/json" },
			{ "hqx", "application/mac-binhex40" },
			{ "doc", "application/msword" },
			{ "pdf", "application/pdf" },
			{ "ps", "application/postscript" },
			{ "eps", "application/postscript" },
			{ "ai", "application/postscript" },
			{ "rtf", "application/rtf" },
			{ "m3u8", "application/vnd.apple.mpegurl" },
			{ "xls", "application/vnd.ms-excel" },
			{ "eot", "application/vnd.ms-fontobject" },
			{ "ppt", "application/vnd.ms-powerpoint" },
			{ "wmlc", "application/vnd.wap.wmlc" },
			{ "kml", "application/vnd.google-earth.kml+xml" },
			{ "kmz", "application/vnd.google-earth.kmz" },
			{ "7z", "application/x-7z-compressed" },
			{ "cco", "application/x-cocoa" },
			{ "jardiff", "application/x-java-archive-diff" },
			{ "jnlp", "application/x-java-jnlp-file" },
			{ "run", "application/x-makeself" },
			{ "pl", "application/x-perl" },
			{ "pm", "application/x-perl" },
			{ "prc", "application/x-pilot" },
			{ "pdb", "application/x-pilot" },
			{ "rar", "application/x-rar-compressed" },
			{ "rpm", "application/x-redhat-package-manager" },
			{ "sea", "application/x-sea" },
			{ "swf", "application/x-shockwave-flash" },
			{ "sit", "application/x-stuffit" },
			{ "tcl", "application/x-tcl" },
			{ "tk", "application/x-tcl" },
			{ "der", "application/x-x509-ca-cert" },
			{ "pem", "application/x-x509-ca-cert" },
			{ "crt", "application/x-x509-ca-cert" },
			{ "xpi", "application/x-xpinstall" },
			{ "xhtml", "application/xhtml+xml" },
			{ "xspf", "application/xspf+xml" },
			{ "zip", "application/zip" },
			{ "bin", "application/octet-stream" },
			{ "exe", "application/octet-stream" },
			{ "dll", "application/octet-stream" },
			{ "deb", "application/octet-stream" },
			{ "dmg", "application/octet-stream" },
			{ "iso", "application/octet-stream" },
			{ "img", "application/octet-stream" },
			{ "msi", "application/octet-stream" },
			{ "msp", "application/octet-stream" },
			{ "msm", "application/octet-stream" },
			{ "docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
			{ "xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
			{ "pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
			{ "mid", "audio/midi" },
			{ "midi", "audio/midi" },
			{ "kar", "audio/midi" },
			{ "mp3", "audio/mpeg" },
			{ "ogg", "audio/ogg" },
			{ "m4a", "audio/x-m4a" },
			{ "ra", "audio/x-realaudio" },
			{ "3gpp", "video/3gpp" },
			{ "3gp", "video/3gpp" },
			{ "ts", "video/mp2t" },
			{ "mp4", "video/mp4" },
			{ "mpeg", "video/mpeg" },
			{ "mpg", "video/mpeg" },
			{ "mov", "video/quicktime" },
			{ "webm", "video/webm" },
			{ "flv", "video/x-flv" },
			{ "m4v", "video/x-m4v" },
			{ "mng", "video/x-mng" },
			{ "asx", "video/x-ms-asf" },
			{ "asf", "video/x-ms-asf" },
			{ "wmv", "video/x-ms-wmv" },
			{ "avi", "video/x-msvideo" },
		};
		ullong index = mimes.keys().find(extension);
		if (index == NPos::npos) { return "undefined"; }
		return mimes.value(index);
	}
	
	// Fill js decorators like "@vweb_constructor_wrapper".
	public:
	static
	void	fill_vweb_decorators(Code& data, const Path& path) {
		
		// Util func.
		auto increment_on_whitespace = [&](ullong& index) {
			while (true) {
				switch (data[index]) {
					case '\t':
					case '\n':
					case ' ':
						++index;
						continue;
					default:
						break;
				}
				break;
			}
		};
		
		// Fill some @vweb_constructor_wrapper.
		for (auto& decorator: {
			String("@vweb_constructor_wrapper"),
			String("@vweb_register_element"),
			
		}) {
			ullong pos = 0;
			while (true) {
				pos = data.find_code(decorator.c_str(), pos, NPos::npos, {.exclude_strings = true, .exclude_chars = true, .exclude_comments = true});
				if (pos == NPos::npos) { break; }
				
				// Find the end of the line.
				ullong post_start = data.find('\n', pos);
				if (post_start == NPos::npos) {
					++pos;
					continue;
				}
				
				// Remove the @.
				data = data.slice(0, pos).concat_r(data.data() + post_start, data.len() - post_start);
				
				// IMPORTANT: Variable "pos" should not be used after here, use "post_start" instead.
				// Find the start of the new line.
				// Skip the other decorators.
				post_start = pos;
				increment_on_whitespace(post_start);
				while (data[post_start] == '@') {
					post_start = data.find('\n', post_start);
					if (post_start == NPos::npos) {
						break;
					}
					increment_on_whitespace(post_start);
				}
				
				// Find the end first next line.
				ullong newline_end = data.find('\n', post_start);
				if (newline_end == NPos::npos) {
					++pos;
					continue;
				}
				
				// Get the first line.
				String first_line = String(data.data() + post_start, newline_end - post_start);
				first_line.trim_whitespace_r();
				
				// Only "const ... ;" and "class ... {}" are supported.
				short mode = 0;
				if (first_line.eq_first("const", 5)) {
					mode = 1;
				} else if (first_line.eq_first("class", 5)) {
					mode = 2;
				} else {
					throw vlib::InvalidUsageError("Found a \"", decorator, "\" decorator without a valid next line. Only \"const ...;\" and \"clas ... {}\" are valid next lines, skipping.");
				}
				String full_name = first_line.slice(5).trim_leading_whitespace_r();
				ullong delimiter = full_name.find_first(" \t{=");
				if (delimiter == NPos::npos) {
					++pos;
					continue;
				}
				full_name.slice_r(0, delimiter);
				
				// Create insert string.
				String insert;
				if (decorator == "@vweb_constructor_wrapper") {
					
					// Remove Element suffix.
					String name = full_name;
					if (full_name.eq_last("Element", 7)) {
						name.len() -= 7;
					} else if (full_name.eq_last("Type", 4)) {
						name.len() -= 4;
					} else {
						throw vlib::InvalidUsageError("The class must have a \"Element\" or \"Type\" suffix for decorator \"", decorator, "\".");
					}
					
					// Create insert.
					insert << "\nfunction " << name << "(...args){return new " << full_name << "(...args);}";
					
				}
				
				// Decorator: @vweb_register_element.
				else if (decorator ==  "@vweb_register_element") {
					insert << "\nvweb.elements.register(" << full_name << ");";
				}
				
				// Invalid.
				else {
					throw vlib::InvalidUsageError("Unknown decorator \"", decorator, "\".");
				}
				
				// Find the start index of where to create the new code.
				ullong insert_index = NPos::npos;
				
				// Find the closing ";".
				if (mode == 1) {
					insert_index = data.find(';', post_start);
					if (insert_index != NPos::npos) {
						++insert_index;
					}
				}
				
				// Iterate till the end of the opening "{".
				else if (mode == 2) {
					bool open = false;
					for (auto& i: data.iterate(post_start)) {
						if (!open && i.parentheses_depth() == 0 && i.brackets_depth() == 0 && i.curly_brackets_depth() == 1) {
							open = true;
						} else if (open && i.curly_brackets_depth() == 0) {
							insert_index = i.index + 1;
							break;
						}
					}
				}
				
				// Insert.
				if (insert_index == NPos::npos) {
					throw vlib::InvalidUsageError("Could not find the insert index of decorator \"", decorator, "\" at \"", path, "\".");
				}
				data = data.slice(0, insert_index).concat_r(insert).concat_r(data.data() + insert_index, data.len() - insert_index);
				++pos;
			}
		}
	}
	private:
	
	// Create static endpoints.
	void    create_static_endpoints(const Path& base, const Path& path) {
		if (!path.exists()) { return ; }
		
		// Load static files.
		for (auto& child: path.paths(true)) {
			if (child.is_file()) {
				String content_type = get_content_type(child.extension());
				String& extension = child.extension();
				Code data;
					
				// Javascript.
				if (extension == "js") {
					data = child.load();
					
					// Join lines like ["Hello World!" "\n"] to ["Hello World!\n"].
					data = vlib::JavaScript::join_strings(data);
					
					// Fill js vweb decorators.
					fill_vweb_decorators(data, path);
					
					// Trim js.
					if (vweb_production) {
						data = vlib::JavaScript::trim(data, {
							.newlines = true,
							.double_newlines = false,
							.whitespace = false,
							.comments = false,
						});
					}
				}
				
				// Load.
				else {
					data = child.load();
				}
				
				// Add.
				add_endpoint_h({
					.method = "GET",
					.endpoint = child.abs().slice(base.len()),
					.content_type = content_type,
					.compress = false,
					.data = data,
					.rate_limit = {
						.limit = 100,
						.duration = 60,
					},
				});
			}
		}
	}
	
	// Create a robots.txt.
	void	create_robots_txt() {
		// Robots txt.
		add_endpoint_h({
			.method = "GET",
			.endpoint = "/robots.txt",
			.content_type = "text/plain",
			.compress = false,
			.data = to_str("User-agent: *\nDisallow: \n\nSitemap: https://", config.domain, "/sitemap.xml"),
		});
	}
	
	// Create a sitemap.
	void	create_sitemap() {
		String sitemap;
		sitemap <<
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>" << '\n' <<
		"<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" << '\n';
		for (auto& endpoint: m_endpoints) {
			if (
				endpoint.content_type == vlib::http::content_type::html &&
				endpoint.endpoint != "robots.txt" &&
				endpoint.auth & Endpoint::Auth::none
			) {
				sitemap <<
				"<url>" << '\n' <<
				"	<loc>https://" << to_str(config.domain, "/", endpoint.endpoint).replace_r("//", "/") << "</loc>" << '\n' <<
				"</url>" << '\n';
			}
		}
		sitemap << "</urlset>" << '\n';
		add_endpoint_h({
			.method = "GET",
			.endpoint = "/sitemap.xml",
			.content_type = "application/xml",
			.compress = false,
			.data = sitemap,
		});
	}
	
    // Public.
public:
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Default constructor.
    Server() {}
    
    // Constructor from config.
    /*  @docs {
     *  @title: Constructor
     *  @description:
     *      Constructor from a `vweb::server::Config`.
     *  @parameter: {
     *      @name: config
     *      @description:
     *          The server config object.
     *
     *          See <type>vweb::server::Config</type> for more info.
     *  }
     *  @usage:
     *      vweb::HTTPServer server {
     *          ...
     *      };
     } */
    Server(const server::Config& config) :
    config(config),
    m_smtp(config.smtp),
	m_backend(config, &(*this)),
	stripe()
    {
    
		// Assign stripe.
		if (config.stripe_secret_key.is_defined()) {
			stripe.assign(config.stripe_secret_key, config.stripe_publishable_key);
		}
		
	}
    
    // Public.
public:
	
	// Initialize.
	void    initialize() {
		
		// Check & create database.
		if (config.database.is_undefined()) {
			throw vlib::FileNotFoundError("The \"database\" attribute in the server config is undefined.");
		}
		if (!config.database.exists()) {
			throw vlib::FileNotFoundError("Database \"", config.database, "\" does not exist.");
		}
		for (auto& name: {
			".sys",
			".sys/users",
			".sys/tokens",
			".sys/usernames",
			".sys/emails",
			".sys/keys",
			".sys/unactivated",
			".sys/2fa",
			"users",
		}) {
			Path path = config.database.join(name);
			if (!path.exists()) {
				path.mkdir();
			}
		}
		
		// Load keys.
		Path path = config.database.join(".sys/keys/keys");
		if (!path.exists()) {
			m_hash_key = SHA::generate_key(32);
			Json data {
				{"sha256", m_hash_key},
			};
			data.save(path);
		} else {
			Json data = Json::load(path);
			m_hash_key = data["sha256"].ass();
		}
		
		// Resize user arrays.
		m_max_uid = get_max_uid();
		
		// Create media endpoints.
		Array<String> static_names;
		if (config.statics.is_defined()) {
			for (auto& i: config.statics) {
				i.abs_r();
				static_names.append(i.full_name());
				create_static_endpoints(i.base(), i);
			}
		}
		
		// JS views.
		if (static_names.contains("views")) {
			const Path path = config.source.join("views");
			create_static_endpoints(path.base(), path);
		}
		if (static_names.contains("ui")) {
			const Path path = config.source.join("ui");
			create_static_endpoints(path.base(), path);
		}
		
		// Create sitemap when it does not exist.
		bool found_sitemap = false;
		for (auto& endpoint: m_endpoints) {
			if (endpoint.endpoint == "sitemap.xml") {
				found_sitemap = true;
				break;
			}
		}
		if (!found_sitemap) {
			create_sitemap();
		}
		
		// Create robots.txt when it does not exist.
		bool found_robots = false;
		for (auto& endpoint: m_endpoints) {
			if (endpoint.endpoint == "robots.txt") {
				found_robots = true;
				break;
			}
		}
		if (!found_robots) {
			create_robots_txt();
		}
		
		// Stripe.
		if (stripe.is_defined()) {
			stripe.products() = config.stripe_products;
			stripe.check_products();
		}
		
	}
    
    // Start.
    void    start() {
		initialize();
		m_backend.start();
    }
    
    // ---------------------------------------------------------
    // Endpoints.
    
	// Add endpoint.
	/*  @docs {
	 *  @title: Add Endpoint
	 *  @description: Add a endpoints to the server.
	 *  @parameter: {
	 *      @name: endpoint
	 *      @description: The endpoint to add.
	 *  }
	 *  @usage:
	 *      ...
	 *      server.add_endpoint(...);
	 } */
	constexpr
	void    add_endpoint(Endpoint&& endpoint) {
		
		// Add default endpoints.
		// Should be added before the users endpoints in case ...
		// The user adds an endpoint with the same url that is required by the api.
		if (m_endpoints.len() == 0) {
			create_default_endpoints();
		}
		
		// Concat.
		add_endpoint_h(vlib::move(endpoint));
	}
	
    // Add endpoints.
    /*  @docs {
     *  @title: Add Endpoints
     *  @description: Add one or multiple endpoints to the server.
     *  @parameter: {
     *      @name: endpoints
     *      @description: The endpoints to add.
     *  }
     *  @usage:
     *      ...
     *      server.add_endpoints(...);
     } */
    constexpr
    void    add_endpoints(Array<Endpoint>&& endpoints) {
		
		// Add default endpoints.
		// Should be added before the users endpoints in case ...
		// The user adds an endpoint with the same url that is required by the api.
		if (m_endpoints.len() == 0) {
			create_default_endpoints();
		}
		
		// Concat.
		for (auto& endpoint: endpoints) {
			add_endpoint_h(vlib::move(endpoint));
		}
    }
    
    // Add endpoint.
    constexpr
    void    add_endpoints() {}
    /*  @docs {
     *  @title: Add Endpoints
     *  @description: Add one or multiple endpoints to the server.
     *  @parameter: {
     *      @name: endpoint
     *      @description: The endpoint to add.
     *  }
     *  @usage:
     *      ...
     *      server.add_endpoints(...);
     } */
    template <typename... Endpoints> constexpr
    void    add_endpoints(Endpoint&& endpoint, Endpoints&&... endpoints) {
		
		// Add default endpoints.
		// Should be added before the users endpoints in case ...
		// The user adds an endpoint with the same url that is required by the api.
		if (m_endpoints.len() == 0) {
			create_default_endpoints();
		}
		
		// Append.
		add_endpoint_h(vlib::move(endpoint));
        add_endpoints(endpoints...);
		
    }
    
    // ---------------------------------------------------------
    // Users.
    
    // Check if a username exists.
    /*  @docs {
     *  @title: Username Exists
     *  @description: Check if a username exists.
     *  @return: Returns a boolean indicating whether the username exists or not.
     *  @parameter: {
     *      @name: username
     *      @description: The username to check.
     *  }
     *  @usage:
     *      ...
     *      Bool exists = server.username_exists("someusername");
     } */
    Bool    username_exists(const String& username) const {
        return Path::exists(to_str(config.database, "/.sys/usernames/", username));
    }
    
    // Check if an email exists.
    /*  @docs {
     *  @title: Email Exists
     *  @description: Check if a email exists.
     *  @return: Returns a boolean indicating whether the email exists or not.
     *  @parameter: {
     *      @name: email
     *      @description: The email to check.
     *  }
     *  @usage:
     *      ...
     *      Bool exists = server.email_exists("some\@email.com");
     } */
    Bool    email_exists(const String& email) const {
        return Path::exists(to_str(config.database, "/.sys/emails/", email));
    }
    
    // Check if a user account is activated.
    /*  @docs {
     *  @title: Is Activated
     *  @description: Check if a user account is activated.
     *  @return: Returns a boolean indicating whether the account is activated or not.
     *  @parameter: {
     *      @name: uid
     *      @description: The uid of the account to check.
     *  }
     *  @usage:
     *      ...
     *      Bool activated = server.is_activated(0);
     } */
    Bool    is_activated(const Len& uid) const {
        return !Path::exists(to_str(config.database, "/.sys/unactivated/", uid));
    }
    
    // Set the activated status of a user account is activated.
    /*  @docs {
     *  @title: Set Activated
     *  @description: Set the activated status of a user account is activated.
     *  @parameter: {
     *      @name: uid
     *      @description: The uid of the account.
     *  }
     *  @parameter: {
     *      @name: activated
     *      @description: The boolean with the new activated status.
     *  }
     *  @usage:
     *      ...
     *      server.set_activated(0, true);
     } */
    void    set_activated(const Len& uid, const Bool& activated) const {
        if (activated) {
            Path::remove(to_str(config.database, "/.sys/unactivated/", uid));
        } else {
            Path::touch(to_str(config.database, "/.sys/unactivated/", uid));
        }
    }
    
    // Create user.
    /*  @docs {
     *  @title: Create User
     *  @description: Create a user account.
     *  @return: Returns the uid of the newly created user.
     *  @parameter: {
     *      @name: first_name
     *      @description: The user's first name.
     *  }
     *  @parameter: {
     *      @name: last_name
     *      @description: The user's last name.
     *  }
     *  @parameter: {
     *      @name: username
     *      @description: The username of the new account.
     *  }
     *  @parameter: {
     *      @name: email
     *      @description: The email of the new account.
     *  }
     *  @parameter: {
     *      @name: password
     *      @description: The password of the new account.
     *  }
     *  @usage:
     *      ...
     *      Len uid = server.create_user("myusername", "my\@email.com", "HelloWorld!");
     } */
    Len    create_user(
		const String& first_name,
		const String& last_name,
		const String& username,
		const String& email,
		const String& password
	) {
        
        // Check if username & email already exist.
        if (username_exists(username)) {
            throw vlib::DuplicateError("Username \"", username, "\" already exists.");
        }
        if (email_exists(email)) {
            throw vlib::DuplicateError("Email \"", email, "\" already exists.");
        }
        
        // Add uid & resize user arrays.
        m_mutex_add_del_uid.lock();
        ++m_max_uid;
        Len uid = m_max_uid;
        m_mutex_add_del_uid.unlock();
        
        // Save sys data.
        sys_save_user(uid, User {
            .uid = uid,
            .first_name = first_name,
            .last_name = last_name,
            .username = username,
            .email = email,
            .password = SHA::hmac(m_hash_key, password),
            .api_key = "",
        });
        String suid = uid.str();
        sys_save_uid_by_username(suid, username);
        sys_save_uid_by_email(suid, email);
        Path::touch(to_str(config.database, "/.sys/unactivated/", suid));
		
		// Create user dir.
		Path::mkdir(to_str(config.database, "/users/", suid));
        
        // Return uid.
        return uid;
    }
    
    // Delete user.
    // The file paths should never be deleted.
    /*  @docs {
     *  @title: Delete User
     *  @description: Delete a user account.
     *  @parameter: {
     *      @name: uid
     *      @description: The user id of the account to delete.
     *  }
     *  @usage:
     *      ...
     *      server.delete_user(0);
     } */
    void    delete_user(const Len& uid) const {
        check_uid_within_range(uid);
        // save_user(uid, {});
        sys_delete_user(uid);
		
		// Delete user dir.
		Path::remove(to_str(config.database, "/users/", uid));
		
    }
    
    // Set a user's first name.
    /*  @docs {
     *  @title: Set First Name
     *  @description:
     *      Set a user's first name
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @parameter: {
     *      @name: uid
     *      @description: The user id.
     *  }
     *  @parameter: {
     *      @name: first_name
     *      @description: The new first name.
     *  }
     *  @usage:
     *      ...
     *      server.set_first_name(0, "Name");
     } */
    void    set_first_name(const Len& uid, const String& first_name) const {
        User user = get_user(uid);
        user.first_name = first_name;
        sys_save_user(uid, user);
    }
    
    // Set a user's last name.
    /*  @docs {
     *  @title: Set Last Name
     *  @description:
     *      Set a user's last name
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @parameter: {
     *      @name: uid
     *      @description: The user id.
     *  }
     *  @parameter: {
     *      @name: last_name
     *      @description: The new last name.
     *  }
     *  @usage:
     *      ...
     *      server.set_first_name(0, "Name");
     } */
    void    set_last_name(const Len& uid, const String& last_name) const {
        User user = get_user(uid);
        user.last_name = last_name;
        sys_save_user(uid, user);
    }
    
    // Set a user's username.
    /*  @docs {
     *  @title: Set Username
     *  @description:
     *      Set a user's username
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @parameter: {
     *      @name: uid
     *      @description: The user id.
     *  }
     *  @parameter: {
     *      @name: username
     *      @description: The new username.
     *  }
     *  @usage:
     *      ...
     *      server.set_username(0, "newusername");
     } */
    void    set_username(const Len& uid, const String& username) const {
		if (username_exists(username)) {
			throw vlib::DuplicateError("Username \"", username, "\" already exists.");
		}
        User user = get_user(uid);
        user.username = username;
        sys_save_user(uid, user);
        sys_save_uid_by_username(uid.str(), username);
    }
    
    // Set a user's email.
    /*  @docs {
     *  @title: Set Email
     *  @description:
     *      Set a user's email
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @parameter: {
     *      @name: uid
     *      @description: The user id.
     *  }
     *  @parameter: {
     *      @name: email
     *      @description: The new email.
     *  }
     *  @usage:
     *      ...
     *      server.set_email(0, "new\@email.com");
     } */
    void    set_email(const Len& uid, const String& email) const {
		if (email_exists(email)) {
			throw vlib::DuplicateError("Email \"", email, "\" already exists.");
		}
        User user = get_user(uid);
        user.email = email;
        sys_save_user(uid, user);
        sys_save_uid_by_email(uid.str(), email);
    }
    
    // Set a user's password.
    /*  @docs {
     *  @title: Set Password
     *  @description:
     *      Set a user's password
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @parameter: {
     *      @name: uid
     *      @description: The user id.
     *  }
     *  @parameter: {
     *      @name: password
     *      @description: The new password.
     *  }
     *  @usage:
     *      ...
     *      server.set_password(0, "XXXXXX");
     } */
    void    set_password(const Len& uid, const String& password) const {
        User user = get_user(uid);
        user.password = SHA::hmac(m_hash_key, password);
        sys_save_user(uid, user);
    }
	
	// Set a user's data.
	/*  @docs {
	 *  @title: Set user
	 *  @description:
	 *      Set a user's data
	 *
	 *      Does not update the user's id, key and password data.
	 *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
	 *  @parameter: {
	 *      @name: uid
	 *      @description: The user id.
	 *  }
	 *  @parameter: {
	 *      @name: user
	 *      @description: The new user object.
	 *  }
	 *  @usage:
	 *      ...
	 *      server.set_user(0, ...);
	 *	@funcs: 2
	 } */
	void    set_user(const Len& uid, const User& user) const {
		User current_user = get_user(uid);
		String old_username, old_email;
		
		// First name.
		if (user.first_name != current_user.first_name) {
			current_user.first_name = user.first_name;
		}
		
		// Last name.
		if (user.last_name != current_user.last_name) {
			current_user.last_name = user.last_name;
		}
		
		// Username.
		if (user.username != current_user.username) {
			if (username_exists(user.username)) {
				throw vlib::DuplicateError("Username \"", user.username, "\" already exists.");
			}
			old_username = move(current_user.username);
			current_user.username = user.username;
		}
		
		// Email.
		if (user.email != current_user.email) {
			if (email_exists(user.email)) {
				throw vlib::DuplicateError("Email \"", user.email, "\" already exists.");
			}
			old_email = move(current_user.email);
			current_user.email = user.email;
		}
		
		// Save.
		String suid = uid.str();
		sys_save_user(uid, current_user);
		if (old_username.is_defined()) {
			sys_save_uid_by_username(suid, current_user.username);
			sys_delete_uid_by_username(suid, old_username);
		}
		if (old_email.is_defined()) {
			sys_save_uid_by_email(suid, current_user.email);
			sys_delete_uid_by_email(suid, old_email);
		}
		
	}
	void    set_user(const Len& uid, const Json& user) const {
		User u;
		ullong index;
		if ((index = user.find("first_name", 10)) != NPos::npos && user.value(index).iss()) {
			u.first_name = user.value(index).ass();
		}
		if ((index = user.find("last_name", 9)) != NPos::npos && user.value(index).iss()) {
			u.last_name = user.value(index).ass();
		}
		if ((index = user.find("username", 8)) != NPos::npos && user.value(index).iss()) {
			u.username = user.value(index).ass();
		}
		if ((index = user.find("email", 5)) != NPos::npos && user.value(index).iss()) {
			u.email = user.value(index).ass();
		}
		return set_user(uid, u);
	}
    
	// Get uid by username.
    // Returns "NPos::npos" when the username does not exist.
    /*  @docs {
     *  @title: Get UID
     *  @description: Get a uid by username.
     *  @return:
     *      Returns the uid of the username.
     *
     *      If the user does not exist `NPos::npos` is returned.
     *  @parameter: {
     *      @name: username
     *      @description: The username of the uid to fetch.
     *  }
     *  @usage:
     *      ...
     *      Len uid;
     *      if ((uid = server.get_uid("myusername")) != NPos::npos) { ... }
     } */
    Len     get_uid(const String& username) const {
        if (username.is_undefined()) {
            return NPos::npos;
        }
        Path path = to_str(config.database, "/.sys/usernames/", username);
        if (path.exists()) {
            String data = sys_load_data(path);
            if (data.eq("D", 1)) {
                return NPos::npos;
            }
            return data.as<Len>();
        }
        return NPos::npos;
    }
    
    // Get uid by email.
    // Returns "NPos::npos" when the username does not exist.
    /*  @docs {
     *  @title: Get UID By Email
     *  @description: Get a uid by email.
     *  @return:
     *      Returns the uid of the email.
     *
     *      If the user does not exist `NPos::npos` is returned.
     *  @parameter: {
     *      @name: email
     *      @description: The email of the uid to fetch.
     *  }
     *  @usage:
     *      ...
     *      Len uid;
     *      if ((uid = server.get_uid_by_email("my\@email.com")) != NPos::npos) { ... }
     } */
    Len     get_uid_by_email(const String& email) const {
        if (email.is_undefined()) {
            return NPos::npos;
        }
        Path path = to_str(config.database, "/.sys/emails/", email);
        if (path.exists()) {
            String data = sys_load_data(path);
            if (data.eq("D", 1)) {
                return NPos::npos;
            }
            return data.as<Len>();
        }
        return NPos::npos;
    }
    
    // Get uid by api key.
    // Returns "NPos::npos" when the api key is invalid.
    /*  @docs {
     *  @title: Get UID By API Key
     *  @description: Get a uid by API key.
     *  @return:
     *      Returns the uid of the api key.
     *
     *      If the user does not exist `NPos::npos` is returned.
     *  @parameter: {
     *      @name: api_key
     *      @description: The API key of the uid to fetch.
     *  }
     *  @usage:
     *      ...
     *      Len uid;
     *      if ((uid = server.get_uid_by_api_key("XXXXXXXXXX")) != NPos::npos) { ... }
     } */
    constexpr
    Len     get_uid_by_api_key(const String& api_key) const {
        ullong pos;
        if ((pos = api_key.find(':')) != NPos::npos) {
            return Len::parse(api_key.data() + 1, pos);
        }
        return NPos::npos;
    }
    
    // Get uid by token.
    // Returns "NPos::npos" when the token is invalid.
    /*  @docs {
     *  @title: Get UID By Token
     *  @description: Get a uid by token.
     *  @return:
     *      Returns the uid of the token.
     *
     *      If the user does not exist `NPos::npos` is returned.
     *  @parameter: {
     *      @name: token
     *      @description: The token of the uid to fetch.
     *  }
     *  @usage:
     *      ...
     *      Len uid;
     *      if ((uid = server.get_uid_by_token("XXXXXXXXXX")) != NPos::npos) { ... }
     } */
    constexpr
    Len     get_uid_by_token(const String& token) const {
        return get_uid_by_api_key(token);
    }
    
    // Get user info by uid.
    /*  @docs {
     *  @title: Get User
     *  @description:
     *      Get a user by uid.
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter: {
     *      @name: uid
     *      @description: The uid of the user to fetch.
     *  }
     *  @usage:
     *      ...
     *      User user = server.get_user(0);
     } */
    User    get_user(const Len& uid) const {
        check_uid_within_range(uid);
        return sys_load_user(uid);
    }
    
    // Get user info by username.
    /*  @docs {
     *  @title: Get User By Username
     *  @description:
     *      Get a user by username.
     *
     *      If the username does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter: {
     *      @name: username
     *      @description: The username of the user to fetch.
     *  }
     *  @usage:
     *      ...
     *      User user = server.get_user_by_username("myusername");
     } */
    User    get_user_by_username(const String& username) const {
        return get_user(get_uid(username));
    }
    
    // Get user info by email.
    /*  @docs {
     *  @title: Get User By Email
     *  @description:
     *      Get a user by email.
     *
     *      If the email does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter: {
     *      @name: email
     *      @description: The email of the user to fetch.
     *  }
     *  @usage:
     *      ...
     *      User user = server.get_user_by_email("my\@email.com");
     } */
    User    get_user_by_email(const String& email) const {
        return get_user(get_uid_by_email(email));
    }
    
    // Get user info by api key.
    /*  @docs {
     *  @title: Get User By API Key
     *  @description:
     *      Get a user by API key.
     *
     *      If the API key does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter: {
     *      @name: api_key
     *      @description: The API key of the user to fetch.
     *  }
     *  @usage:
     *      ...
     *      User user = server.get_user_by_api_key("XXXXXX");
     } */
    User    get_user_by_api_key(const String& api_key) const {
        return get_user(get_uid_by_api_key(api_key));
    }
    
    // Get user info by token.
    /*  @docs {
     *  @title: Get User By Token
     *  @description:
     *      Get a user by token.
     *
     *      If the token does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter: {
     *      @name: token
     *      @description: The token of the user to fetch.
     *  }
     *  @usage:
     *      ...
     *      User user = server.get_user_by_token("XXXXXX");
     } */
    User    get_user_by_token(const String& token) const {
        return get_user(get_uid_by_token(token));
    }
	
	// Load user data.
	/*  @docs {
	 *  @title: Load user data
	 *  @description:
	 *      Load user data by subpath.
	 *
	 *		The subpath resides in the user's data directory.
	 *  @return:
	 *      Returns the loaded data.
	 *  @template: {
	 *      @name: Type
	 *      @description: The type to load. The type must have a `Type::load(const String&)` static function to load the data by the full path.
	 *  }
	 *  @parameter: {
	 *      @name: uid
	 *      @description: The uid of the user.
	 *  }
	 *  @parameter: {
	 *      @name: subpath
	 *      @description: The subpath to the file.
	 *  }
	 *  @usage:
	 *		...
	 *      Json data = server.load_user_data(0, "mydata");
	 *      String data = server.load_user_data<String>(0, "mystring");
	 } */
	template <typename Type = Json, typename... Air>
	Type	load_user_data(const Len& uid, const String& subpath) const {
		check_uid_within_range(uid);
		Path path = to_str(config.database, "/users/", uid, '/', subpath);
		if (!path.exists()) {
			return {};
		}
		return Type::load(path);
	}
	
	// Save user data.
	/*  @docs {
	 *  @title: Save user data
	 *  @description:
	 *      Save user data by subpath.
	 *
	 *		The subpath resides in the user's data directory.
	 *  @template: {
	 *      @name: Type
	 *      @description: The type to save. The type must have a `Type::save(const String&)` member function to load the data by the full path.
	 *  }
	 *  @parameter: {
	 *      @name: uid
	 *      @description: The uid of the user.
	 *  }
	 *  @parameter: {
	 *      @name: subpath
	 *      @description: The subpath to the file.
	 *  }
	 *  @parameter: {
	 *      @name: data
	 *      @description: The data to save.
	 *  }
	 *  @usage:
	 *		...
	 *      server.save_user_data<Json>(0, "mydata", {{"Hello", "World!"}});
	 *      server.save_user_data<String>(0, "mystring", "Hello World!");
	 } */
	template <typename Type = Json, typename... Air>
	void	save_user_data(const Len& uid, const String& subpath, const Type& data) const {
		check_uid_within_range(uid);
		data.save(to_str(config.database, "/users/", uid, '/', subpath));
	}
    
    // Generate an api key by uid.
    /*  @docs {
     *  @title: Generate API Key
     *  @description:
     *      Generate an API key for a user.
     *
     *      Generating an API key overwrites all existing API keys.
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns the API key string.
     *  @parameter: {
     *      @name: uid
     *      @description: The uid of the account to generate an API key for.
     *  }
     *  @usage:
     *      ...
     *      String api_key = server.generate_api_key(0);
     } */
    String  generate_api_key(const Len& uid) {
        check_uid_within_range(uid);
        String api_key = to_str('0', uid, ':', sys_generate_api_key());
        User user = sys_load_user(uid);
        user.api_key = SHA::hmac(m_hash_key, api_key);
        sys_save_user(uid, user);
        return api_key;
    }
	
	// Revoke the API key of a user.
	/*  @docs {
	 *  @title: Revoke API Key
	 *  @description:
	 *      Revoke the API key of a user.
	 *
	 *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
	 *  @parameter: {
	 *      @name: uid
	 *      @description: The uid of the account to revoke the API key for.
	 *  }
	 *  @usage:
	 *      ...
	 *      server.revoke_api_key(0);
	 } */
	void	revoke_api_key(const Len& uid) {
		check_uid_within_range(uid);
		User user = sys_load_user(uid);
		user.api_key = "";
		sys_save_user(uid, user);
	}
    
    // Generate a token by uid.
    // Function "generate_token()" is not thread safe.
    /*  @docs {
     *  @title: Generate Token
     *  @description:
     *      Generate a token for a user.
     *
     *      Generating a token overwrites all existing tokens.
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns the token string.
     *  @parameter: {
     *      @name: uid
     *      @description: The uid of the account to generate a token for.
     *  }
     *  @usage:
     *      ...
     *      String token = server.generate_token("XXXXXX");
     } */
    String  generate_token(const Len& uid) const {
        check_uid_within_range(uid);
        String token = to_str('1', uid, ':', sys_generate_api_key());
        sys_save_user_token(uid, Token {
            .expiration = Date::get_seconds() + 86400,
            .token = SHA::hmac(m_hash_key, token),
        });
        return token;
    }
    
    // Verify a plaintext password.
    /*  @docs {
     *  @title: Verify Password
     *  @description:
     *      Verify a plaintext password.
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns a boolean indicating whether the verification was successful.
     *  @parameter: {
     *      @name: uid
     *      @description: The uid of the account to verify.
     *  }
     *  @parameter: {
     *      @name: password
     *      @description: The plaintext password.
     *  }
     *  @usage:
     *      ...
     *      Bool success = server.verify_password(0, "XXXXXX");
     } */
    Bool    verify_password(const Len& uid, const String& password) const {
        check_uid_within_range(uid);
        User user = sys_load_user(uid);
        return user.uid != NPos::npos && user.password == SHA::hmac(m_hash_key, password);
    }
    
    // Verify a plaintext api key.
    /*  @docs {
     *  @title: Verify API Key
     *  @description:
     *      Verify an plaintext API key.
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns a boolean indicating whether the verification was successful.
     *  @parameter: {
     *      @name: api_key
     *      @description: The api key to verify.
     *  }
     *  @usage:
     *      ...
     *      Bool success = server.verify_api_key("XXXXXX");
     *      Bool success = server.verify_api_key(0, "XXXXXX");
     *  @funcs: 2
     } */
    Bool    verify_api_key(const String& api_key) const {
        ullong pos;
        if ((pos = api_key.find(':')) != NPos::npos) {
            return verify_api_key(Len::parse(api_key.data() + 1, pos), api_key);
        }
        return false;
    }
    Bool    verify_api_key(const Len& uid, const String& api_key) const {
        check_uid_within_range(uid);
        User user = sys_load_user(uid);
        return user.uid != NPos::npos && user.api_key.len() > 0 && user.api_key == SHA::hmac(m_hash_key, api_key);
    }
    
    // Verify a token.
    /*  @docs {
     *  @title: Verify Token
     *  @description:
     *      Verify an plaintext token.
     *
     *      If the uid does not exist an `UserDoesNotExistError` will be thrown.
     *  @return:
     *      Returns a boolean indicating whether the verification was successful.
     *  @parameter: {
     *      @name: api_key
     *      @description: The token to verify.
     *  }
     *  @usage:
     *      ...
     *      Bool success = server.verify_token("XXXXXX");
     *      Bool success = server.verify_token(0, "XXXXXX");
     *  @funcs: 2
     } */
    Bool    verify_token(const String& token) const {
        ullong pos;
        if ((pos = token.find(':')) != NPos::npos) {
            return verify_token(Len::parse(token.data() + 1, pos), token);
        }
        return false;
    }
    Bool    verify_token(const Len& uid, const String& token) const {
        check_uid_within_range(uid);
        Token correct_token = sys_load_user_token(uid);
        return Date::get_seconds() < correct_token.expiration &&
        correct_token.token == SHA::hmac(m_hash_key, token);
    }
    
    // Send a mail.
    /*  @docs {
     *  @title: Send Mail
     *  @description:
     *      Send one or multiple mails.
     *
     *      Make sure the domain's DNS records SPF and DKIM are properly configured when sending attachments.
     *
     *      See `vlib::smtp::Client` and `vlib::smtp::Mail` for more info.
     *  @parameter: {
     *      @name: mail
     *      @description: The `vlib::smtp::Mail` object.
     *  }
     *  @usage:
     *      ...
     *      server.send_mail({
     *          .sender = {"Sender Name", "sender\@email.com"},
     *          .recipients = {
     *              {"Recipient Name", "recipient1\@email.com"},
     *              {"recipient2\@email.com"},
     *          },
     *          .subject = "Example Mail",
     *          .body = "Hello World!",
     *          .attachments = {"/path/to/image.png "}
     *      });
     *  @funcs: 2
     } */
    void    send_mail(const vlib::smtp::Mail& mail) {
        send_mail(Array<vlib::smtp::Mail>{mail});
    }
    void    send_mail(const Array<vlib::smtp::Mail>& mails) {
        if (m_smtp.host.is_undefined()) {
            throw vlib::InvalidUsageError(smtp_undefined_err);
        }
        vlib::smtp::Client smtp(m_smtp);
        smtp.send(mails);
    }
    
    // Send a 2fa code.
    /*  @docs {
     *  @title: Send 2FA Code
     *  @description:
     *      Send a 2FA code to a user by user id.
     *  @parameter: {
     *      @name: uid
     *      @description: The user id.
     *  }
     *  @parameter: {
     *      @name: mail_body
     *      @description: The mail body in HTML. It should contain the string "{{2FA}}", which will be replaced with the generated 2FA code.
     *  }
     *  @usage:
     *      ...
     *      server.send_2fa(0, "<p>This is your {{2FA}} code.</p>");
     } */
    void    send_2fa(const Len& uid, const Headers& headers = {}, const String& ip = null) {
        check_uid_within_range(uid);
        
        // Generate 2fa.
        TwoFactorAuth auth {
            .expiration = Date::get_seconds() + 30 * 60,
        };
        Int i = 6;
        while (i-- >= 0) {
            auth.code.concats_r(vlib::random::generate<int>(0, 9));
        }
        sys_save_user_2fa(uid.str(), auth);
        
        // Get user email.
        User user = get_user(uid);
        
        // Get device.
        ullong index;
        String device;
        if ((index = headers.find("User-Agent", 10)) != NPos::npos) {
            device = headers.value(index);
        }
        
        // Replace body.
        String body = m_2fa_mail
            .replace("{{2FA}}", auth.code)
            .replace_r("{{USERNAME}}", user.username)
            .replace_r("{{DATE}}", Date::now().str("%a, %d %b %Y %H:%M:%S %z"))
            .replace_r("{{IP}}", ip.is_defined() ? ip : "Unknown")
            .replace_r("{{DEVICE}}", device.is_defined() ? device : "Unknown");
        
        // Send mail.
        send_mail({
            .sender = config.domain_name.is_defined() ? vlib::smtp::Address{config.domain_name, m_smtp.email} : vlib::smtp::Address{m_smtp.email},
            .recipients = {user.email},
            .subject = "Two Factor Authentication Code",
            .body = body,
        });
        
    }
    
    // Verify a 2fa code.
    /*  @docs {
     *  @title: Verify 2FA Code
     *  @description:
     *      Verify a 2FA code by user id.
     *  @parameter: {
     *      @name: uid
     *      @description: The user id.
     *  }
     *  @parameter: {
     *      @name: code
     *      @description: The 2FA code.
     *  }
     *  @return: Returns a boolean indicating whether the verification was successful or not.
     *  @usage:
     *      ...
     *      server.verify_2fa(0, "123456");
     } */
    Bool    verify_2fa(const Len& uid, const String& code) {
        check_uid_within_range(uid);
        String suid = uid.str();
        TwoFactorAuth auth = sys_load_user_2fa(suid);
        Bool status = auth.code.is_defined() && Date::get_seconds() < auth.expiration && auth.code == code;
        if (status) {
            sys_delete_user_2fa(suid);
        }
        return status;
    }
    
    // ---------------------------------------------------------
    // Headers.
    
    // Add header defaults.
    constexpr
    void    set_header_defaults(Headers& headers) {
        headers.concat_r(m_default_headers);
        headers["Origin"] = config.domain;
        headers["Access-Control-Allow-Origin"] = config.domain;
    }
    
    // Create token headers.
    //  - Should be called when generating a token.
    void    create_token_cookie(Headers& headers, const String& token) {
        headers["Cache-Control"] = "max-age=0, no-cache, no-store, must-revalidate, proxy-revalidate";
        headers["Access-Control-Allow-Credentials"] = "true";
        headers.append("Set-Cookie", to_str(
            "T=", token,
            "; Max-Age=86400; Path=/; Expires=",
            (Date::now() + (86400 * 1000)).str("%a, %d %b %Y %H:%M:%S %z"),
            "; SameSite=None; Secure; HttpOnly;"
        ));
    }
    
    // Create user headers.
    //  - Should be called when a user is authenticated.
    constexpr
    void    create_user_cookie(Headers& headers, const Len& uid) {
        if (uid != NPos::npos && uid <= m_max_uid) {
            headers.append("Set-Cookie", to_str(
                CString("UserID=", 7),
                uid,
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
            headers.append("Set-Cookie", to_str(
                CString("UserActivated=", 14),
				is_activated(uid), // config.enable_2fa ? is_activated(uid) : Bool(true),
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
        } else {
            headers.append("Set-Cookie", to_str(
                CString("UserID=-1", 9),
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
            headers.append("Set-Cookie", to_str(
                CString("UserActivated=", 14),
				false, // config.enable_2fa ? false : true,
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
        }
    }
    
    // Create user headers.
    //  - Should be called when a user has just signed in, signed up or changed their account.
    void    create_detailed_user_cookie(Headers& headers, const Len& uid) {
        User user = get_user(uid);
        headers.append("Set-Cookie", to_str("UserName=", user.username, "; Path=/; SameSite=None; Secure;"));
        headers.append("Set-Cookie", to_str("UserFirstName=", user.first_name,"; Path=/; SameSite=None; Secure;"));
        headers.append("Set-Cookie", to_str("UserLastName=", user.last_name, "; Path=/; SameSite=None; Secure;"));
        headers.append("Set-Cookie", to_str("UserEmail=", user.email, "; Path=/; SameSite=None; Secure;"));
    }
    
    // Reset all default cookies.
    // - Should be called when a user signs out.
    constexpr
    void    reset_cookies(Headers& headers) {
        headers.append("Set-Cookie", "T=; Path=/; SameSite=None; Secure; HttpOnly;");
        headers.append("Set-Cookie", "UserID=-1; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserActivated=false; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "2FAUserID=-1; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserName=; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserFirstName=; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserLastName=; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserEmail=; Path=/; SameSite=None; Secure;");
    }
    
    // ---------------------------------------------------------
    // Creating responses.
    
    // Response.
    /*  @docs {
     *  @title: Response
     *  @description:
     *      Create a HTTP response.
     *  @parameter: {
     *      @name: status
     *      @description: The status code.
     *  }
     *  @parameter: {
     *      @name: body
     *      @description: The json response body.
     *  }
     *  @return: Returns a response object.
     *  @fnucs: 5
     } */
    static inline
    Response response(const Int& status, const Json& body) {
        return Response(
                        vlib::http::version::v1_1,
                        status.value(),
                        {},
                        body
                        );
    }
    static inline
    Response response(const Int& status, const String& body) {
        return Response(
                        vlib::http::version::v1_1,
                        status.value(),
                        {},
                        body
                        );
    }
    static inline
    Response response(const Int& status, const Headers& headers) {
        return Response(
                        vlib::http::version::v1_1,
                        status.value(),
                        headers
                        );
    }
    static inline
    Response response(const Int& status, const Headers& headers, const Json& body) {
        return Response(
                        vlib::http::version::v1_1,
                        status.value(),
                        headers,
                        body
                        );
    }
    static inline
    Response response(const Int& status, const Headers& headers, const String& body) {
        return Response(
                        vlib::http::version::v1_1,
                        status.value(),
                        headers,
                        body
                        );
    }

    // Return a success response.
    static inline
    Response success(const Int& status, const String& message) {
        return Response(
            vlib::http::version::v1_1,
            status.value(),
            {{"message", message}}
        );
    }
    static inline
    Response success(const Int& status, const String& message, const Json& body) {
        return Response(
            vlib::http::version::v1_1,
            status.value(),
            {},
            body.concat(Json{{"message", message}})
        );
    }

    // Return an error response.
    static inline
    Response error(const Int& status, const String& message) {
        return Response(
            vlib::http::version::v1_1,
            status.value(),
            {{"error", message}}
        );
    }
    
    // ---------------------------------------------------------
    // Attributes.
    
    // Endpoints.
    /*  @docs {
     *  @title: Endpoints
     *  @description: Get the underlying endpoints attribute.
     *  @attribute: true
     } */
    constexpr auto& endpoints() { return m_endpoints; }
    constexpr auto& endpoints() const { return m_endpoints; }
    
    // SMTP.
    /*  @docs {
     *  @title: SMTP Client Config
     *  @description: Get the underlying smtp client config attribute.
     *  @attribute: true
     } */
    constexpr auto& smtp() const { return m_smtp; }
	
    // Response 400.
    /*  @docs {
     *  @title: Response 400
     *  @description: Get the underlying 400 response attribute.
     *  @attribute: true
     } */
    constexpr auto& response_400() { return m_400; }
    constexpr auto& response_400() const { return m_400; }
    
    // Response 401.
    /*  @docs {
     *  @title: Response 401
     *  @description: Get the underlying 401 response attribute.
     *  @attribute: true
     } */
    constexpr auto& response_401() { return m_401; }
    constexpr auto& response_401() const { return m_401; }
    
    // Response 401 Invalid Format.
    /*  @docs {
     *  @title: Response 401 Invalid Format
     *  @description: Get the underlying 401 invalid format response attribute.
     *  @attribute: true
     } */
    constexpr auto& response_401_invalid_format() { return m_401_invalid_format; }
    constexpr auto& response_401_invalid_format() const { return m_401_invalid_format; }
    
    // Response 401 Invalid Scheme.
    /*  @docs {
     *  @title: Response 401 Invalid Scheme
     *  @description: Get the underlying 401 invalid scheme response attribute.
     *  @attribute: true
     } */
    constexpr auto& response_401_invalid_scheme() { return m_401_invalid_scheme; }
    constexpr auto& response_401_invalid_scheme() const { return m_401_invalid_scheme; }
    
    // Response 404.
    /*  @docs {
     *  @title: Response 404
     *  @description: Get the underlying 404 response attribute.
     *  @attribute: true
     } */
    constexpr auto& response_404() { return m_404; }
    constexpr auto& response_404() const { return m_404; }
    
    // Response 429.
    /*  @docs {
     *  @title: Response 429
     *  @description: Get the underlying 429 response attribute.
     *  @attribute: true
     } */
    constexpr auto& response_429() { return m_429; }
    constexpr auto& response_429() const { return m_429; }
    
    // Response 500.
    /*  @docs {
     *  @title: Response 500
     *  @description: Get the underlying 500 response attribute.
     *  @attribute: true
     } */
    constexpr auto& response_500() { return m_500; }
    constexpr auto& response_500() const { return m_500; }
    
    // 2FA mail.
    /*  @docs {
     *  @title: 2FA mail
     *  @description: Get the underlying 2fa mail view attribute.
     *  @attribute: true
     } */
    constexpr auto& two_factor_auth_mail() { return m_2fa_mail; }
    constexpr auto& two_factor_auth_mail() const { return m_2fa_mail; }
    
};

// Exceptions.
excid_t Server::smtp_undefined_err = vlib::exceptions::add_err("SMTP Client is undefined.");

// Endpoint alias.
using Endpoint = Server::Endpoint;

// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
using Server = vweb::Server;
using Endpoint = vweb::Endpoint;
using Response = vweb::Response;
using Request = vweb::Request;
using Headers = vweb::Headers;
}

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.


