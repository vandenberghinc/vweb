/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_SERVER_H
#define VWEB_SERVER_H

// Log to console when log level equals minimum.
// - Keep as macro so the "to_str" and "String" objects ...
//   wont get constructed if the log level is hidden.
#define SERVLOG(min_log_level, text) \
	log_mutex.lock(); \
	if (m_config.log_level >= min_log_level) {\
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
    
    server::Config        		m_config;               // server configuration.
    Array<Endpoint>     		m_endpoints;            // all endpoint.
    Len                 		m_max_uid;              // the maximum user id, including deleted users.
    String              		m_hash_key;             // key used for hashing passwords and api keys.
    SMTPArgs            		m_smtp;                 // the smtp client.
	backend::Backend<Server>	m_backend;
    
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
			"default-src 'self' *.google-analytics.com; "
			"img-src 'self' *.google-analytics.com raw.githubusercontent.com; "
			"script-src 'self' 'unsafe-inline' ajax.googleapis.com www.googletagmanager.com googletagmanager.com *.google-analytics.com raw.githubusercontent.com code.jquery.com; "
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
    String      m_2fa_mail = HTMLBuilder::build_mail
       (
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
    );
    
// Private.
private:
    
    // ---------------------------------------------------------
    // Utils.
	
    // Iterate a directories file paths.
    // With a handler for the file name.
    template <typename String, typename Func>
    void    iter_dir(const String& subpath, Func&& func) {
        Path path = m_config.database.join(subpath);
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
        String data = sys_load_data(to_str(m_config.database, "/.sys/users/", uid));
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
        Path path = to_str(m_config.database, "/.sys/users/", uid);
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
        Path::save(to_str(m_config.database, "/.sys/users/", uid), "D");
        String suid = uid.str();
        sys_save_uid_by_username(suid, "D");
        sys_save_uid_by_email(suid, "D");
    }
    
    // Load system user token.
    Token   sys_load_user_token(const Len& uid) const {
        String data = sys_load_data(to_str(m_config.database, "/.sys/tokens/", uid));
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
            Path::save(to_str(m_config.database, "/.sys/tokens/", uid), "D");
            return ;
        }
        String data;
        data.concats_r(token.expiration, ':', token.token, '\n');
        data.save(to_str(m_config.database, "/.sys/tokens/", uid));
    }
    
    // Delete system user token.
    void    sys_delete_user_token(const Len& uid) const {
        Path::save(to_str(m_config.database, "/.sys/tokens/", uid), "D");
    }
    
    // Save / delete system uid by username.
    void    sys_save_uid_by_username(const String& uid, const String& username) const {
        uid.save(to_str(m_config.database, "/.sys/usernames/", username));
    }
	void    sys_delete_uid_by_username(const String& uid, const String& username) const {
		Path::remove(to_str(m_config.database, "/.sys/usernames/", username));
	}
    
    // Save / delete system uid by email.
    void    sys_save_uid_by_email(const String& uid, const String& email) const {
        uid.save(to_str(m_config.database, "/.sys/emails/", email));
    }
	void    sys_delete_uid_by_email(const String& uid, const String& email) const {
		Path::remove(to_str(m_config.database, "/.sys/emails/", email));
	}
    
    // Save system 2fa by uid.
    void    sys_save_2fa_by_uid(const String& uid, const TwoFactorAuth& auth) const {
        Path::save(
                   to_str(m_config.database, "/.sys/2fa/", uid),
                   to_str(auth.code, '\n', auth.expiration)
                   );
    }
    
    // Load system 2fa by uid.
    TwoFactorAuth sys_load_2fa_by_uid(const String& uid) const {
        try {
            String data = String::load(to_str(m_config.database, "/.sys/2fa/", uid));
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
    void    sys_delete_2fa_by_uid(const String& uid) const {
        Path::remove(to_str(m_config.database, "/.sys/2fa/", uid));
    }
    
	// ---------------------------------------------------------
	// Default endpoints.
	
	// Create default endpoints.
	void    create_default_endpoints() {
		
		// ---------------------------------------------------------
		// Static files.
		
		// Add vweb static files.
		Path include_base = Path(__FILE__).base(2);
		Array<vlib::Pack<String, String, Path>> packs = {
			{"text/css", "/vweb/css.css", include_base.join("html/css.css")},
			{"application/javascript", "/vweb/vweb.js", include_base.join("js/vweb.js")},
			
			// Deprecated.
			{"application/javascript", "/vweb/pre_js.js", include_base.join("html/pre_js.js")},
			{"application/javascript", "/vweb/post_js.js", include_base.join("html/post_js.js")},
		};
		for (auto& [content_type, endpoint, full_path]: packs) {
			m_endpoints.append(Endpoint {
				"GET",
				endpoint,
				content_type,
				{
					.rate_limit = 100,
					.rate_limit_duration = 60,
				},
				full_path.load(),
			});
		}
		
		// ---------------------------------------------------------
		// Default auth endpoints.
		
		// Send 2fa.
		m_endpoints.append({
			"GET",
			"/backend/auth/2fa",
			"application/json",
			{
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](
			   Server& server,
			   const Len&,
			   const Json& params,
			   const Headers& headers,
			   const vlib::Socket<>::Info& connection
			) {
				return server.send_2fa_req(params, headers, connection.ip);
			}
		});
		
		// Sign in.
		m_endpoints.append({
			"POST",
			"/backend/auth/signin",
			"application/json",
			{
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](
			   Server& server,
			   const Len&,
			   const Json& params,
			   const Headers& headers,
			   const vlib::Socket<>::Info& connection
			) {
				return server.sign_in_req(params, headers, connection.ip);
			}
		});
		
		// Sign out.
		m_endpoints.append({
			"POST",
			"/backend/auth/signout",
			"application/json",
			{
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Len& uid) {
				return server.sign_out_req(uid);
			}
		});
		
		// Sign up.
		m_endpoints.append({
			"POST",
			"/backend/auth/signup",
			"application/json",
			{
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](
			   Server& server,
			   const Len&,
			   const Json& params,
			   const Headers& headers,
			   const vlib::Socket<>::Info& connection
			) {
				return server.sign_up_req(params, headers, connection.ip);
			}
		});
		
		// Activate account.
		m_endpoints.append({
			"POST",
			"/backend/auth/activate",
			"application/json",
			{
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Len& uid, const Json& params, const Headers& headers) {
				return server.activate_user_req(uid, params, headers);
			}

		});
		
		// Forgot password.
		m_endpoints.append({
			"POST",
			"/backend/auth/forgot_password",
			"application/json",
			{
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Json& params) {
				return server.forgot_password_req(params);
			}

		});
		
		// ---------------------------------------------------------
		// Default user endpoints.
		
		// Get user.
		m_endpoints.append({
			"GET",
			"/backend/user",
			"application/json",
			{
				.auth = Endpoint::authenticated,
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Len& uid) {
				return server.response(
					vlib::http::status::success,
					server.get_user(uid).json()
				);
			}
		});
		
		// Set user.
		m_endpoints.append({
			"POST",
			"/backend/user",
			"application/json",
			{
				.auth = Endpoint::authenticated,
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Len& uid, const Json& params) {
				server.set_user(uid, params);
				Headers headers;
				create_detailed_user_cookie(headers, uid);
				return server.response(
					vlib::http::status::success,
					headers,
					Json{{"message", "Successfully updated your account."}}
				);
			}
		});
		
		// Change password.
		m_endpoints.append({
			"POST",
			"/backend/user/change_password",
			"application/json",
			{
				.auth = Endpoint::authenticated,
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Len& uid, const Json& params) {
				return server.change_password_req(uid, params);
			}
		});
		
		// Generate api key.
		m_endpoints.append({
			"POST",
			"/backend/user/api_key",
			"application/json",
			{
				.auth = Endpoint::authenticated,
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Len& uid) {
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
		m_endpoints.append({
			"DELETE",
			"/backend/user/api_key",
			"application/json",
			{
				.auth = Endpoint::authenticated,
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Len& uid) {
				server.revoke_api_key(uid);
				return server.response(
					vlib::http::status::success,
					Json{{"message", "Successfully revoked your API key."}}
				);
			}
		});
		
		// Load data.
		m_endpoints.append({
			"GET",
			"/backend/user/data",
			"application/json",
			{
				.auth = Endpoint::authenticated,
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Len& uid, const Json& params) {
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
		m_endpoints.append({
			"POST",
			"/backend/user/data",
			"application/json",
			{
				.auth = Endpoint::authenticated,
				.rate_limit = 10,
				.rate_limit_duration = 60,
			},
			[](Server& server, const Len& uid, const Json& params) {
				vlib::http::Response response;
				String *path;
				Json *data;
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
		
	}
	
	// Create static endpoints.
	void    create_static_endpoints(const Path& path) {
		
		// Load static files.
		for (auto& child: path.paths()) {
			if (child.is_dir()) {
				create_static_endpoints(child);
			} else if (child.is_file()) {
				String content_type = "UNDEFINED";
				String& extension = child.extension();
				if (extension == "js") {
					content_type = "text/javascript";
				}
				m_endpoints.append(Endpoint(
					"GET",
					child.abs().slice(m_config.statics.len()),
					content_type,
					{
						.rate_limit = 100,
						.rate_limit_duration = 60,
					},
					child.load()
				));
			}
		}
		
	}
	
	// Create a robots.txt.
	void	create_robots_txt() {
		// Robots txt.
		m_endpoints.append(Endpoint {
			"GET",
			"/rob ots.txt",
			"text/plain",
			to_str("User-agent: *\nDisallow: \n\nSitemap: https://", m_config.domain, "/sitemap.xml"),
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
				endpoint.m_content_type == vlib::http::content_type::html &&
				endpoint.m_endpoint != "robots.txt" &&
				endpoint.m_auth & Endpoint::Auth::none
			) {
				sitemap <<
				"<url>" << '\n' <<
				"	<loc>https://" << to_str(m_config.domain, "/", endpoint.m_endpoint).replace_r("//", "/") << "</loc>" << '\n' <<
				"</url>" << '\n';
			}
		}
		sitemap << "</urlset>" << '\n';
		m_endpoints.append(Endpoint {
			"GET",
			"/sitemap.xml",
			"application/xml",
			sitemap,
		});
	}
	
	// ---------------------------------------------------------
	// Default request functions.
	
	// Sign a user in and return a response.
	/*  @docs {
	 *  @title: Direct Sign In Response
	 *  @description:
	 *      Signs a user in without authenticating and returns the correct response.
	 *  @warning:
	 *      This function should be used with caution since it creates an authentication token without any authentication checks.
	 *  @parameter: {
	 *      @name: uid
	 *      @description: The user id to sign in.
	 *  }
	 *  @return: Returns a response object.
	 *  @usage:
	 *      ...
	 *      return server.sign_in_req(0);
	 } */
	Response sign_in_req(const Len& uid) {
		try {
			
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
			
		} catch (vlib::Exception& e) {
			return Server::response(
				vlib::http::status::internal_server_error,
				Json{{"error", e.err()}}
			);
		}
		
	}
	
	// Sign a user in and return a response.
	// Required params: [username, password].
	/*  @docs {
	 *  @title: Sign In Response
	 *  @description:
	 *      Signs a user in and returns the correct response.
	 *
	 *      Requires a 2FA code. When no code is provided but the credentials were okay, the cookie 2FAUserID will be assigned.
	 *  @parameter: {
	 *      @name: params
	 *      @description:
	 *          The request parameters.
	 *
	 *          The required parameter fields are [`email` or `username`, `password`, `2fa`].
	 *
	 *          Field `2fa` is used for the 2FA code.
	 *  }
	 *  @return: Returns a response object.
	 *  @usage:
	 *		return Endpoint {
	 *			"POST",
	 *			"/backend/signin",
	 *			"application/json",
	 *			{
	 *				.rate_limit = 10,
	 *				.rate_limit_duration = 60,
	 *			},
	 *			[](
	 *				Server& server,
	 *				const Len&,
	 *				const Json& params,
	 *				const Headers& headers,
	 *				const vlib::Socket<>::Info& connection
	 *			) {
	 *				return server.sign_in_req(params, headers, connection.ip);
	 *			}
	 *		};
	 } */
	Response sign_in_req(const Json& params, const Headers& headers = {}, const String& ip = null) {
		try {
				
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
				if ((uid = get_uid_by_email(*email)) == NPos::npos) {
					return Server::response(
											vlib::http::status::unauthorized,
											Json {{"error", "Unauthorized."}}
											);
				}
			} else {
				if ((uid = get_uid(*username)) == NPos::npos) {
					return Server::response(
											vlib::http::status::unauthorized,
											Json {{"error", "Unauthorized."}}
											);
				}
			}
			
			// Verify password.
			if (verify_password(uid, *password)) {
				
				// Verify 2fa.
				if (m_config.enable_2fa) {
					if (!vweb::get_param(response, params, code, "2fa", 3) || code->is_undefined()) {
						send_2fa(uid, headers, ip);
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
					if (!verify_2fa(uid, *code)) {
						return Server::response(
												vlib::http::status::unauthorized,
												Json {{"error", "Invalid 2FA code."}}
												);
					}
				}
				
				// Sign in.
				return sign_in_req(uid);
			}
			return Server::response(
									vlib::http::status::unauthorized,
									Json {{"error", "Unauthorized."}}
									);
			
		} catch (vlib::Exception& e) {
			return Server::response(
				vlib::http::status::internal_server_error,
				Json{{"error", e.err()}}
			);
		}
	}
	
	// Sign a user out and return a response.
	/*  @docs {
	 *  @title: Sign out
	 *  @description:
	 *      Revoke the token of the currently signed in user.
	 *
	 *		The endpoint that calls this function should be authenticated.
	 *  @parameter: {
	 *      @name: uid
	 *      @description: The user id of the request.
	 *  }
	 *  @return: Returns a response object.
	 *  @usage:
	 *		return Endpoint {
	 *			"POST",
	 *			"/backend/signout",
	 *			"application/json",
	 *			{
	 *				.rate_limit = 10,
	 *				.rate_limit_duration = 60,
	 *			},
	 *			[](Server& server, const Len& uid) {
	 *				return server.sign_out_req(uid);
	 *			}
	 *		};
	 } */
	Response sign_out_req(const Len& uid) {
		try {
				
			// Delete token.
			sys_delete_user_token(uid);
			
			// Create headers.
			Headers headers {
				{"Connection", "close"},
			};
			reset_cookies(headers);
			
			// Response.
			return Server::response(
									vlib::http::status::success,
									headers,
									{{"message", "Successfully signed out."}}
									);
		} catch (vlib::Exception& e) {
			return Server::response(
				vlib::http::status::internal_server_error,
				Json{{"error", e.err()}}
			);
		}
	}
	
	// Sign up.
	/*  @docs {
	 *  @title: Sign Up
	 *  @description:
	 *      Sign up request.
	 *  @parameter: {
	 *      @name: params
	 *      @description:
	 *		The request parameters, the required parameters are [`first_name`, `last_name`, `username`, `email`, `password`, `verify_password`].
	 *  }
	 *  @parameter: {
	 *      @name: headers
	 *      @description: The request headers.
	 *  }
	 *  @parameter: {
	 *      @name: ip
	 *      @description: The request ip, used for the 2FA mail.
	 *  }
	 *  @return: Returns a response object.
	 *  @usage:
	 *      return Endpoint {
	 *      	"POST",
	 *      	"/backend/signup",
	 *      	"application/json",
	 *      	{
	 *      		.rate_limit = 10,
	 *      		.rate_limit_duration = 60,
	 *      	},
	 *      	[](
	 *      		Server& server,
	 *      		const Len&,
	 *      		const Json& params,
	 *      		const Headers& headers,
	 *      		const vlib::Socket<>::Info& connection
	 *      	) {
	 *      		return server.sign_up_req(params, headers, connection.ip);
	 *      	}
	 *      };
	 } */
	Response sign_up_req(const Json& params, const Headers& headers = {}, const String& ip = null) {
		try {
			
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
			Len uid = create_user(*first_name, *last_name, *username, *email, *pass);
			
			// Send 2fa code.
			if (m_config.enable_2fa) {
				send_2fa(uid, headers, ip);
			}
			
			// Sign in.
			return sign_in_req(uid);
		
		} catch (vlib::Exception& e) {
			return Server::response(
				vlib::http::status::internal_server_error,
				Json{{"error", e.err()}}
			);
		}
	}
	
	// Activate account after sign up.
	/*  @docs {
	 *  @title: Activate account
	 *  @description:
	 *      Activate account after a sign up / sign in.
	 *  @parameter: {
	 *      @name: uid
	 *      @description: The user id. When the uid is `NPos::npos` the uid from the cookie `2FAUserID` will be used.
	 *  }
	 *  @parameter: {
	 *      @name: params
	 *      @description: The request parameters, the required parameters are [`2fa`]. Parameter `2fa` should be the user's received 2fa code.
	 *  }
	 *  @parameter: {
	 *      @name: headers
	 *      @description: The request headers.
	 *  }
	 *  @return: Returns a response object.
	 *  @usage:
	 *      return Endpoint {
	 *      	"POST",
	 *      	"/backend/signup/activate",
	 *      	"application/json",
	 *      	{
	 *      		.rate_limit = 10,
	 *      		.rate_limit_duration = 60,
	 *      	},
	 *      	[](Server& server, const Len& uid, const Json& params, const Headers& headers) {
	 *      		return server.activate_user_req(uid, params, headers);
	 *      	}
	 *      };
	 } */
	Response activate_user_req(const Len& uid, const Json& params, const Headers& headers) {
		try {
				
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
			if (verify_2fa(l_uid, *code)) {
				
				// Set activated.
				set_activated(l_uid, true);
				
				// Response.
				Headers headers {
					{"Connection", "close"},
				};
				create_user_cookie(headers, l_uid);
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
		
		} catch (vlib::Exception& e) {
			return Server::response(
				vlib::http::status::internal_server_error,
				Json{{"error", e.err()}}
			);
		}
	}
	
	// Send 2fa request.
	/*  @docs {
	 *  @title: Send 2FA request
	 *  @description:
	 *      Send a 2FA to a user request.
	 *
	 *		For example used in forgot password handling.
	 *  @parameter: {
	 *      @name: params
	 *      @description: The request parameters, the required parameters are [`email`].
	 *  }
	 *  @parameter: {
	 *      @name: headers
	 *      @description: The request headers.
	 *  }
	 *  @parameter: {
	 *      @name: ip
	 *      @description: The request ip, used for the 2FA mail.
	 *  }
	 *  @return: Returns a response object.
	 *  @usage:
	 *		return Endpoint {
	 *			"POST",
	 *			"/backend/send_2fa",
	 *			"application/json",
	 *			{
	 *				.rate_limit = 10,
	 *				.rate_limit_duration = 60,
	 *			},
	 *			[](
	 *				Server& server,
	 *				const Len&,
	 *				const Json& params,
	 *				const Headers& headers,
	 *				const vlib::Socket<>::Info& connection
	 *			) {
	 *				return server.send_2fa_req(params, headers, connection.ip);
	 *			}
	 *		};
	 } */
	Response send_2fa_req(const Json& params, const Headers& headers = {}, const String& ip = null) {
		
		// Vars.
		vlib::http::Response response;
		String *email = nullptr;
		
		// Get params.
		if (!vweb::get_param(response, params, email, "email", 5)) {
			return response;
		}
		
		// Get uid.
		Len uid;
		if ((uid = get_uid_by_email(*email)) == NPos::npos) {
			return Server::response(
				vlib::http::status::success,
				Headers{{"Connection", "close"}},
				Json{{"message", "A 2FA code was sent if the specified email exists."}}
			);
		}
		
		// Send.
		send_2fa(uid, headers, ip);
		return Server::response(
			vlib::http::status::success,
			Headers{{"Connection", "close"}},
			Json{{"message", "A 2FA code was sent if the specified email exists."}}
		);
		
	}
	
	// Forgot password request.
	/*  @docs {
	 *  @title: Forgot password request
	 *  @description:
	 *      Forgot password request of a user.
	 *
	 *		Automatically signs in after a successfull password reset.
	 *  @parameter: {
	 *      @name: params
	 *      @description:
	 *      	The request parameters, the required parameters are [`email`, `2fa`, `password` and `verify_password`].
	 *  }
	 *  @return:
	 *      	Returns a response object.
	 *  @usage:
	 *      return Endpoint {
	 *      	"POST",
	 *      	"/backend/forgot_password",
	 *      	"application/json",
	 *      	{
	 *      		.rate_limit = 10,
	 *      		.rate_limit_duration = 60,
	 *      	},
	 *      	[](
	 *      		Server& server,
	 *      		const Len&,
	 *      		const Json& params
	 *      	) {
	 *      		return server.forgot_password_req(params);
	 *      	}
	 *      };
	 } */
	Response forgot_password_req(const Json& params) {
		
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
		if ((uid = get_uid_by_email(*email)) == NPos::npos) {
			return Server::response(
				 vlib::http::status::forbidden,
				 Headers{{"Connection", "close"}},
				 Json{{"error", "Permission denied."}}
			 );
		}
		
		// Verify 2fa.
		if (!verify_2fa(uid, *code)) {
			return Server::response(
				 vlib::http::status::forbidden,
				 Headers{{"Connection", "close"}},
				 Json{{"error", "Invalid 2FA code."}}
			 );
		}
		
		// Set password.
		set_password(uid, *pass);
		
		// Sign in.
		return sign_in_req(uid);
		
	}
	
	// Change password request.
	/*  @docs {
	 *  @title: Change password request
	 *  @description:
	 *      Change password request of a signed in user.
	 *
	 *		The endpoint that calls this function should be authenticated.
	 *  @parameter: {
	 *      @name: uid
	 *      @description: The user id to sign in.
	 *  }
	 *  @parameter: {
	 *      @name: params
	 *      @description:
	 *      	The request parameters, the required parameters are [`current_password`, `password` and `verify_password`].
	 *  }
	 *  @return:
	 *      	Returns a response object.
	 *  @usage:
	 *      return Endpoint {
	 *      	"POST",
	 *      	"/backend/user/password",
	 *      	"application/json",
	 *      	{
	 *      		.auth = Endpoint::authenticated,
	 *      		.rate_limit = 10,
	 *      		.rate_limit_duration = 60,
	 *      	},
	 *      	[](Server& server, const Len& uid, const Json& params) {
	 *      		return server.change_password_req(uid, params);
	 *      	}
	 *      };
	 } */
	Response change_password_req(const Len& uid, const Json& params) {
		
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
		if (!verify_password(uid, *current_pass)) {
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
		set_password(uid, *pass);
		
		// Success.
		return Server::response(
			vlib::http::status::success,
			Json{{"message", "Successfully updated your password."}}
		);
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
    m_config(config),
    m_smtp(config.smtp),
	m_backend(config, &(*this))
    {}
    
    // Public.
public:
	
	// Initialize.
	void    initialize() {
		
		// Check & create database.
		if (m_config.database.is_undefined()) {
			throw vlib::FileNotFoundError("The \"database\" attribute in the server config is undefined.");
		}
		if (!m_config.database.exists()) {
			throw vlib::FileNotFoundError("Database \"", m_config.database, "\" does not exist.");
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
			Path path = m_config.database.join(name);
			if (!path.exists()) {
				path.mkdir();
			}
		}
		
		// Load keys.
		Path path = m_config.database.join(".sys/keys/keys");
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
		if (m_config.statics.is_defined()) {
			m_config.statics.abs_r();
			create_static_endpoints(m_config.statics);
		}
		
		// Create sitemap when it does not exist.
		bool found_sitemap = false;
		for (auto& endpoint: m_endpoints) {
			if (endpoint.m_endpoint == "sitemap.xml") {
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
			if (endpoint.m_endpoint == "robots.txt") {
				found_robots = true;
				break;
			}
		}
		if (!found_robots) {
			create_robots_txt();
		}
		
	}
    
    // Start.
    void    start() {
		initialize();
		m_backend.start();
    }
    
    // ---------------------------------------------------------
    // Endpoints.
    
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
    void    add_endpoints(const Array<Endpoint>& endpoints) {
		
		// Add default endpoints.
		// Should be added before the users endpoints in case ...
		// The user adds an endpoint with the same url that is required by the api.
		if (m_endpoints.len() == 0) {
			create_default_endpoints();
		}
		
		// Check duplicates.
		for (auto& x: endpoints) {
			for (auto& y: m_endpoints) {
				if (x.m_endpoint == y.m_endpoint) {
					throw vlib::DuplicateError("Endpoint \"", y.m_endpoint, "\" already exists.");
				}
			}
		}
		
		// Concat.
        m_endpoints.concat_r(endpoints);
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
    void    add_endpoints(const Endpoint& endpoint, Endpoints&&... endpoints) {
		
		// Add default endpoints.
		// Should be added before the users endpoints in case ...
		// The user adds an endpoint with the same url that is required by the api.
		if (m_endpoints.len() == 0) {
			create_default_endpoints();
		}
		
		// Check duplicates.
		for (auto& y: m_endpoints) {
			if (endpoint.m_endpoint == y.m_endpoint) {
				throw vlib::DuplicateError("Endpoint \"", y.m_endpoint, "\" already exists.");
			}
		}
		
		// Append.
        m_endpoints.append(endpoint);
        add_endpoints(endpoints...);
		
    }
    template <typename... Endpoints> constexpr
    void    add_endpoints(Endpoint&& endpoint, Endpoints&&... endpoints) {
		
		// Add default endpoints.
		// Should be added before the users endpoints in case ...
		// The user adds an endpoint with the same url that is required by the api.
		if (m_endpoints.len() == 0) {
			create_default_endpoints();
		}
		
		// Check duplicates.
		for (auto& y: m_endpoints) {
			if (endpoint.m_endpoint == y.m_endpoint) {
				throw vlib::DuplicateError("Endpoint \"", y.m_endpoint, "\" already exists.");
			}
		}
		
		// Append.
        m_endpoints.append(endpoint);
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
        return Path::exists(to_str(m_config.database, "/.sys/usernames/", username));
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
        return Path::exists(to_str(m_config.database, "/.sys/emails/", email));
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
        return !Path::exists(to_str(m_config.database, "/.sys/unactivated/", uid));
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
            Path::remove(to_str(m_config.database, "/.sys/unactivated/", uid));
        } else {
            Path::touch(to_str(m_config.database, "/.sys/unactivated/", uid));
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
        Path::touch(to_str(m_config.database, "/.sys/unactivated/", suid));
        
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
		if ((index = user.find("first_name", 10)) != NPos::npos) {
			u.first_name = user.value(index).ass();
		}
		if ((index = user.find("last_name", 9)) != NPos::npos) {
			u.last_name = user.value(index).ass();
		}
		if ((index = user.find("username", 8)) != NPos::npos) {
			u.username = user.value(index).ass();
		}
		if ((index = user.find("email", 5)) != NPos::npos) {
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
        Path path = to_str(m_config.database, "/.sys/usernames/", username);
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
        Path path = to_str(m_config.database, "/.sys/emails/", email);
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
		Path path = to_str(m_config.database, "/users/", uid, '/', subpath);
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
		data.save(to_str(m_config.database, "/users/", uid, '/', subpath));
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
        sys_save_2fa_by_uid(uid.str(), auth);
        
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
            .sender = m_config.domain_name.is_defined() ? vlib::smtp::Address{m_config.domain_name, m_smtp.email} : vlib::smtp::Address{m_smtp.email},
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
        TwoFactorAuth auth = sys_load_2fa_by_uid(suid);
        Bool status = auth.code.is_defined() && Date::get_seconds() < auth.expiration && auth.code == code;
        if (status) {
            sys_delete_2fa_by_uid(suid);
        }
        return status;
    }
    
    // ---------------------------------------------------------
    // Headers.
    
    // Add header defaults.
    constexpr
    void    set_header_defaults(Headers& headers) {
        headers.concat_r(m_default_headers);
        headers["Origin"] = m_config.domain;
        headers["Access-Control-Allow-Origin"] = m_config.domain;
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
                m_config.enable_2fa ? is_activated(uid) : Bool(true),
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
        } else {
            headers.append("Set-Cookie", to_str(
                CString("UserID=-1", 9),
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
            headers.append("Set-Cookie", to_str(
                CString("UserActivated=", 14),
                m_config.enable_2fa ? false : true,
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
    
    // ---------------------------------------------------------
    // Attributes.
    
    // Config.
    /*  @docs {
     *  @title: Config
     *  @description: Get the underlying server config attribute.
     *  @attribute: true
     } */
    constexpr auto& config() const { return m_config; }
    
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
using Headers = vweb::Headers;
}

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.


