/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_SERVER_H
#define VWEB_SERVER_H

// Log to console when log level equals minimum.
#define SERVLOG(min_log_level, text) \
    log_mutex.lock(); \
    if (m_config.log_level >= min_log_level) {\
        print("[Server] ", text); \
    } \
    log_mutex.unlock(); \

// Namespace vweb.
namespace vweb {

// ---------------------------------------------------------
// Server.
//
// Index 0 of API keys and tokens indicate the type of key, 0 for an API key and 1 for a token.
// Index 1 till the index of ':' of API keys and tokens are used for the uid.
//

/* @docs {
    @chapter: server
    @title: Server
    @description:
        VWeb backend server.
    @usage:
        #include <vweb/vweb.h>
        vweb::Server server {...};
} */
template <
    typename Socket = vlib::tls::Server<
        vlib::sockets::family::ipv4,
        vlib::sockets::type::stream,
        vlib::sockets::protocol::undefined,
        1024,
        false,
        vlib::tls::version::v1_3
    >,
    typename Client = vlib::tls::Server<>::Client,
    bool IsHTTPS = true
>
struct ServerTemplate {

// Public.
public:

    // ---------------------------------------------------------
    // Exceptions.
    
    static excid_t parent_id;
    static excid_t smtp_undefined_err;
    
    // ---------------------------------------------------------
    // Type definitions.
    
    typedef Socket socket_type;
    typedef Client client_type;
    
    // ---------------------------------------------------------
    // Definitions.
    
    using   Session =   SessionTemplate<ServerTemplate, IsHTTPS>;
    using   SHA =       vlib::SHA256;
    using   Mutex =     vlib::Mutex;
    using   Response =  vlib::http::Response;
    using   Headers =   vlib::http::Headers;
    using   Endpoint =  EndpointTemplate<ServerTemplate>;
    
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
    };
    
    // 2FA struct.
    struct TwoFactorAuth {
        String  code;
        Len     expiration = 0;
    };
    
    // Array with a mutex.
    // template <typename Type>
    // struct MutexArray {
    //     Array<Type>*    arr = new Array<Type>;
    //     Mutex           mutex;
    //
    //     // Functions.
    //     constexpr ~MutexArray() { delete arr; }
    //     constexpr void lock() { return mutex.lock(); }
    //     constexpr void unlock() { return mutex.unlock(); }
    //     constexpr auto& operator ->() { return arr; }
    //     constexpr auto& operator ->() const { return arr; }
    // };
    
    // ---------------------------------------------------------
    // Attributes.
    // Requires public for "Session".
    
    ServerConfig        m_config;       // server configuration.
    Socket              m_sock;         // tls socket.
    Array<Session>      m_sessions;     // session threads.
    Array<Endpoint>     m_endpoints;    // all endpoint.
    Len                 m_max_uid;      // the maximum user id, including deleted users.
    String              m_hash_key;     // key used for hashing passwords and api keys.
    vlib::smtp::Client  m_smtp;         // the smtp client.
    
    // Mutexes.
    Mutex               m_mutex_add_del_uid;     // Mutex for adding / deleting an uid.
    
    // Default responses.
    Response    m_400 = Response(
        vlib::http::version::v1_1,
        400,
        {{"Connection", "close"}},
        "Bad request."
    );
    Response    m_401 = Response(
        vlib::http::version::v1_1,
        401,
        {{"Connection", "close"}, {"WWW-Authorization", "Bearer"}},
        "Unauthorized."
    );
    Response    m_401_invalid_format = Response(
        vlib::http::version::v1_1,
        401,
        {{"Connection", "close"}, {"WWW-Authorization", "Bearer"}},
        "Unauthorized [Invalid Authorization Format]."
    );
    Response    m_401_invalid_scheme = Response(
        vlib::http::version::v1_1,
        401,
        {{"Connection", "close"}, {"WWW-Authorization", "Bearer"}},
        "Unauthorized [Invalid Authorization Scheme]."
    );
    Response    m_404 = Response(
        vlib::http::version::v1_1,
        404,
        {{"Connection", "close"}},
        "Not Found."
    );
    Response    m_429 = Response(
        vlib::http::version::v1_1,
        429,
        {{"Connection", "close"}},
        "Too Many Requests."
    );
    Response    m_500 = Response(
        vlib::http::version::v1_1,
        500,
        {{"Connection", "close"}},
        "Internal Server Error."
    );
    
// Private.
private:

    // ---------------------------------------------------------
    // Private functions.
    
    // Create static endpoints.
    void    create_static_endpoints(const Path& path) {
        static const Array<String> extensions = {"png", "jpg", "jpeg", "ico"};
        for (auto& child: path.paths()) {
            if (child.is_dir()) {
                create_static_endpoints(child);
            } else if (child.is_file() && extensions.contains(child.extension())) {
                m_endpoints.append(Endpoint(
                    "GET",
                    child.abs().slice(m_config.statics.len()),
                    "UNDEFINED",
                    child.load()
                ));
            }
        }
    }
    
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
            throw ParseError("vweb::Server", tostr("Unable to read the content of directory ", path, "."));
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
            throw UserDoesNotExistError("vweb::Server", "Undefined user id.");
        }
        else if (uid > m_max_uid) {
            throw UserDoesNotExistError("vweb::Server", toString("User id \"", uid, "\" does not exist."));
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
                    throw OpenError("vweb::Server", String() << "Unable to open file \"" << path << "\".");
                case vlib::file::error::read:
                    break;
                case vlib::file::error::write:
                    throw WriteError("vlib::Array", String() << "Unable to write to file \"" << path << "\".");
                default:
                    throw OpenError("vweb::Server", String() << "Unable to open file \"" << path << "\".");
            }
        }
        throw ReadError("vweb::Server", String() << "Unable to read file \"" << path << "\".");
        return {};
    }
    
    // Load system user data.
    User    sys_load_user(const Len& uid) const {
        String data = sys_load_data(toString(m_config.database, "/.sys/users/", uid));
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
    void    sys_save_user(const Len& uid, const User& user) {
        Path path = toString(m_config.database, "/.sys/users/", uid);
        path.save(toString(
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
        Path::save(toString(m_config.database, "/.sys/users/", uid), "D");
        String suid = uid.str();
        sys_save_uid_by_username(suid, "D");
        sys_save_uid_by_email(suid, "D");
    }
    
    // Load system user token.
    Token   sys_load_user_token(const Len& uid) const {
        String data = sys_load_data(toString(m_config.database, "/.sys/tokens/", uid));
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
            Path::save(toString(m_config.database, "/.sys/tokens/", uid), "D");
            return ;
        }
        String data;
        data.concats_r(token.expiration, ':', token.token, '\n');
        data.save(toString(m_config.database, "/.sys/tokens/", uid));
    }
    
    // Delete system user token.
    void    sys_delete_user_token(const Len& uid) const {
        Path::save(toString(m_config.database, "/.sys/tokens/", uid), "D");
    }
    
    // Save system uid by username.
    void    sys_save_uid_by_username(const String& uid, const String& username) const {
        uid.save(toString(m_config.database, "/.sys/usernames/", username));
    }
    
    // Save system uid by email.
    void    sys_save_uid_by_email(const String& uid, const String& email) const {
        uid.save(toString(m_config.database, "/.sys/emails/", email));
    }
    
    // Save system 2fa by uid.
    void    sys_save_2fa_by_uid(const String& uid, const TwoFactorAuth& auth) const {
        Path::save(
            toString(m_config.database, "/.sys/2fa/", uid),
            toString(auth.code, '\n', auth.expiration)
        );
    }
    
    // Load system 2fa by uid.
    TwoFactorAuth sys_load_2fa_by_uid(const String& uid) const {
        try {
            String data = String::load(toString(m_config.database, "/.sys/2fa/", uid));
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
        Path::remove(toString(m_config.database, "/.sys/2fa/", uid));
    }
    
    // Create token headers.
    void    create_token_cookie_h(Headers& headers, const String& token) {
        String origin = toString("https://", m_config.ip, ':', m_config.port);
        String expires = (Date::now() + (3600 * 1000)).str("%a, %d %b %Y %H:%M:%S %z");
        headers.append("Set-Cookie", toString("T=", token, "; Max-Age=3600; Path=/; Expires=", expires, "; SameSite=None; Secure; HttpOnly;"));
        headers["Origin"] = origin;
        headers["Vary"] = "Origin";
        headers["Referrer-Policy"] = "same-origin";
        headers["Connection"] = "close";
        headers["Cache-Control"] = "max-age=0, no-cache, no-store, must-revalidate, proxy-revalidate";
        headers["Access-Control-Allow-Origin"] = origin;
        headers["Access-Control-Allow-Credentials"] = "true";
        headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS";
        headers["X-XSS-Protection"] = "1; mode=block";
        headers["X-Content-Type-Options"] = "nosniff";
        headers["X-Frame-Options"] = "DENY";
        headers["Strict-Transport-Security"] = "max-age=31536000";
    }
    
    // Create user headers.
    // Needs to be public for "Session".
    public:
    void    create_user_cookie_h(Headers& headers, const Len& uid) {
        if (uid != NPos::npos && uid <= m_max_uid) {
            headers.append("Set-Cookie", toString(
                CString("UserID=", 7),
                uid,
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
            headers.append("Set-Cookie", toString(
                CString("UserActivated=", 14),
                is_activated(uid),
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
        } else {
            headers.append("Set-Cookie", toString(
                CString("UserID=-1", 9),
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
            headers.append("Set-Cookie", toString(
                CString("UserActivated=false", 19),
                CString("; Path=/; SameSite=None; Secure;", 32)
            ));
        }
    }
    private:
    
    // Create user headers.
    // Is only assigned when just authenticated.
    void    create_detailed_user_cookie_h(Headers& headers, const Len& uid) {
        User user = get_user(uid);
        headers.append("Set-Cookie", toString("UserName=", user.username, "; Path=/; SameSite=None; Secure;"));
        headers.append("Set-Cookie", toString("UserFirstName=", user.first_name,"; Path=/; SameSite=None; Secure;"));
        headers.append("Set-Cookie", toString("UserLastName=", user.last_name, "; Path=/; SameSite=None; Secure;"));
        headers.append("Set-Cookie", toString("UserEmail=", user.email, "; Path=/; SameSite=None; Secure;"));
    }
    
    // Reset headers.
    constexpr
    void    reset_headers_h(Headers& headers) {
        headers.append("Set-Cookie", "T=; Path=/; SameSite=None; Secure; HttpOnly;");
        headers.append("Set-Cookie", "UserID=-1; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserActivated=false; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "2FAUserID=-1; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserName=; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserFirstName=; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserLastName=; Path=/; SameSite=None; Secure;");
        headers.append("Set-Cookie", "UserEmail=; Path=/; SameSite=None; Secure;");
    }

// Public.
public:
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Default constructor.
    constexpr
    ServerTemplate() {}
    
    // Constructor from config.
    constexpr
    ServerTemplate(const ServerConfig& config) requires (IsHTTPS) :
    m_config(config),
    m_smtp(config.smtp)
    {
        if (m_config.ip == "*" || m_config.ip == "") {
            m_sock.construct(m_config.port.value(), m_config.cert, m_config.key, m_config.pass);
        } else {
            m_sock.construct(m_config.ip, m_config.port.value(), m_config.cert, m_config.key, m_config.pass);
        }
    }
    constexpr
    ServerTemplate(const ServerConfig& config) requires (!IsHTTPS) :
    m_config(config),
    m_smtp(config.smtp)
    {
        if (m_config.ip == "*" || m_config.ip == "") {
            m_sock.construct(m_config.port.value());
        } else {
            m_sock.construct(m_config.ip, m_config.port.value());
        }
    }

    // ---------------------------------------------------------
    // Thread.
    
    // Initialize.
    void    initialize() {
        
        // Check & create database.
        if (m_config.database.is_undefined()) {
            throw FileNotFoundError("vweb::Server", toString("The \"database\" attribute in the server config is undefined."));
        }
        if (!m_config.database.exists()) {
            throw FileNotFoundError("vweb::Server", toString("Database \"", m_config.database, "\" does not exist."));
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
        
    }
    
    // Start.
    void    start() {
        
        // Initialize.
        initialize();
        
        // Listen.
        m_sock.bind();
        m_sock.listen();
        SERVLOG(1, toString("Running on ", m_sock.str(), '.'))
        
        // Create session threads.
        m_sessions.resize(m_config.max_threads.value());
        m_sessions.len() = m_config.max_threads.value();
        for (auto& index: m_sessions.indexes()) {
            m_sessions[index].m_server = &(*this);
            m_sessions[index].start();
            m_sessions[index].m_session_index = (int) index;
        }
        
        // Start.
        while (true) {
            
            // Wait for available thread.
            ullong session_index = NPos::npos;
            while (true) {
                for (auto& index: m_sessions.indexes()) {
                    if (!m_sessions[index].is_busy()) {
                        session_index = index;
                        break;
                    }
                }
                if (session_index != NPos::npos) {
                    break;
                }
                vlib::sleep::usec(100);
            }
            
            // Wake thread.
            try {
                SERVLOG(3, "Accepting...");
                m_sessions[session_index].client() = m_sock.accept();
                SERVLOG(3, "Accepted.");
                SERVLOG(3, toString("Waking thread ", session_index, "."));
                m_sessions[session_index].wake();
            } catch (Exception& e) {
                e.dump();
            }
            
        }
        
        // Join sessions.
        SERVLOG(3, "Shutdown.");
        SERVLOG(3, "Joining sessions.");
        for (auto& session: m_sessions) {
            session.run_permission() = false;
        }
        for (auto& session: m_sessions) {
            session.join();
        }
        
        // Close.
        SERVLOG(3, "Closing socket.");
        m_sock.close();
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
        m_endpoints.append(endpoint);
        add_endpoints(endpoints...);
    }
    template <typename... Endpoints> constexpr
    void    add_endpoints(Endpoint&& endpoint, Endpoints&&... endpoints) {
        m_endpoints.append(endpoint);
        add_endpoints(endpoints...);
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
    
    // Socket.
    /*  @docs {
     *  @title: Socket
     *  @description: Get the underlying socket attribute.
     *  @attribute: true
     } */
    constexpr auto& sock() const { return m_sock; }
    
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
     *  @title: SMTP Client
     *  @description: Get the underlying smtp client attribute.
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
    Bool    username_exists(const String& username) {
        return Path::exists(toString(m_config.database, "/.sys/usernames/", username));
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
     *      Bool exists = server.email_exists("some@email.com");
     } */
    Bool    email_exists(const String& email) {
        return Path::exists(toString(m_config.database, "/.sys/emails/", email));
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
    Bool    is_activated(const Len& uid) {
        return !Path::exists(toString(m_config.database, "/.sys/unactivated/", uid));
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
    void    set_activated(const Len& uid, const Bool& activated) {
        if (activated) {
            Path::remove(toString(m_config.database, "/.sys/unactivated/", uid));
        } else {
            Path::touch(toString(m_config.database, "/.sys/unactivated/", uid));
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
     *      Len uid = server.create_user("myusername", "my@email.com", "HelloWorld!");
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
            throw DuplicateError(
                parent(parent_id),
                toString("Username \"", username, "\" already exists.")
            );
        }
        if (email_exists(email)) {
            throw DuplicateError(
                parent(parent_id),
                toString("Email \"", email, "\" already exists.")
            );
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
        sys_save_uid_by_email(suid, email);
        Path::touch(toString(m_config.database, "/.sys/unactivated/", suid));
        
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
    
    // Load user data.
    // Json    load_user(const Len& uid) const {
    //     check_uid_within_range(uid);
    //     return Json::parse(sys_load_data(toString(m_config.database, "/users/", uid)));
    // }
    
    // Save user data.
    // Function "save_user()" is not thread safe.
    // void    save_user(const Len& uid, const Json& data) const {
    //     check_uid_within_range(uid);
    //     data.save(toString(m_config.database, "/users/", uid));
    // }
    
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
        Path path = toString(m_config.database, "/.sys/usernames/", username);
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
     *      if ((uid = server.get_uid_by_email("my@email.com")) != NPos::npos) { ... }
     } */
    Len     get_uid_by_email(const String& email) const {
        if (email.is_undefined()) {
            return NPos::npos;
        }
        Path path = toString(m_config.database, "/.sys/emails/", email);
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
     *      User user = server.get_user_by_email("my@email.com");
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
     *      String api_key = server.generate_api_key("XXXXXX");
     } */
    String  generate_api_key(const Len& uid) {
        check_uid_within_range(uid);
        String api_key = toString('0', uid, ':', sys_generate_api_key());
        User user = sys_load_user(uid);
        user.api_key = SHA::hmac(m_hash_key, api_key);
        sys_save_user(uid, user);
        return api_key;
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
        String token = toString('1', uid, ':', sys_generate_api_key());
        sys_save_user_token(uid, Token {
            .expiration = Date::get_seconds() + 3600,
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
     *      Make sure the domains SPF and DKIM records are properly configured when sending attachments.
     *
     *      See `vlib::smtp::Client` and `vlib::smtp::Mail` for more info.
     *  @parameter: {
     *      @name: mail
     *      @description: The `vlib::smtp::Mail` object.
     *  }
     *  @usage:
     *      ...
     *      server.send_mail({
     *          .sender = {"Sender Name", "sender@email.com"},
     *          .recipients = {
     *              {"Recipient Name", "recipient1@email.com"},
     *              {"recipient2@email.com"},
     *          },
     *          .subject = "Example Mail",
     *          .body = "Hello World!",
     *          .attachments = {"/path/to/image.png "}
     *      });
     *  @funcs: 2
     } */
    void    send_mail(const vlib::smtp::Mail& mail) {
        m_smtp.send(mail);
    }
    void    send_mail(const Array<vlib::smtp::Mail>& mails) {
        m_smtp.send(mails);
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
    void    send_2fa(const Len& uid, const String& mail_body) {
        check_uid_within_range(uid);
        
        // Check smtp defined.
        if (m_smtp.is_undefined()) {
            throw InvalidUsageError(parent_id, smtp_undefined_err);
        }
        
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
        
        // Send mail.
        m_smtp.send({
            .sender = {m_smtp.email()},
            .recipients = {user.email},
            .subject = "Two Factor Authentication Code",
            .body = mail_body.replace("{{2FA}}", auth.code),
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
    // Default response functions.
    
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
     *          The requires params fields are `[email or username, password, code]`.
     *
     *          Field `code` is the 2FA code.
     *  }
     *  @return: Returns a response object.
     *  @usage:
     *      ...
     *      server.sign_in(...);
     } */
    Response sign_in(const Json& params) {
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
            
            // Get code.
            if (!vweb::get_param(response, params, code, "2fa", 3)) {
                return ServerTemplate::response(
                    vlib::http::status::forbidden,
                    Headers {
                        {"Set-Cookie", toString("2FAUserID=", uid, "; Path=/; SameSite=None; Secure;")}, // set 2FAUserID cookie so 2fa codes can be send.
                        {"Connection", "close"},
                    },
                    Json {
                        {"error", "2FA required."} // do not change this text, it can be used to detect 2fa requirement.
                    }
                );
            }
            
            // Get uid.
            if (email) {
                if ((uid = get_uid_by_email(*email)) == NPos::npos) {
                    return ServerTemplate::response(
                        vlib::http::status::unauthorized,
                        Json {{"error", "Unauthorized."}}
                    );
                }
            } else {
                if ((uid = get_uid(*username)) == NPos::npos) {
                    return ServerTemplate::response(
                        vlib::http::status::unauthorized,
                        Json {{"error", "Unauthorized."}}
                    );
                }
            }
            
            // Verify password.
            if (verify_password(uid, *password) && verify_2fa(uid, *code)) {
                
                // Generate token.
                String token = generate_token(uid);
                
                // Create headers.
                Headers headers;
                create_token_cookie_h(headers, token);
                create_user_cookie_h(headers, uid);
                create_detailed_user_cookie_h(headers, uid);
                
                // Response.
                return ServerTemplate::response(
                    vlib::http::status::success,
                    headers,
                    {
                        {"message", "Successfully signed in."},
                    }
                );
            }
     
        // Error.
        } catch (Exception& e) {
            if (m_config.log_level >= 1) {
                e.dump();
            }
            return ServerTemplate::response(
                vlib::http::status::internal_server_error,
                Json{{"error", e.err()}}
            );
        }
        
        // Invalid password.
        return m_401;
    }
    
    // Sign a user out and return a response.
    Response sign_out(const Len& uid) {
        try {
            
            // Delete token.
            sys_delete_user_token(uid);
            
            // Create headers.
            Headers headers {
                {"Connection", "close"},
            };
            reset_headers_h(headers);
            
            // Response.
            return ServerTemplate::response(
                vlib::http::status::success,
                headers,
                {{"message", "Successfully signed out."}}
            );
        
        // Error.
        } catch (Exception& e) {
            if (m_config.log_level >= 1) {
                e.dump();
            }
            return ServerTemplate::response(
                vlib::http::status::internal_server_error,
                Json{{"error", e.err()}}
            );
        }
    }
    
    // Sign up.
    // Required params: [first_name, last_name, username, email, password, verify_password].
    Response sign_up(const Json& params) {
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
                return ServerTemplate::response(
                    vlib::http::status::bad_request,
                    Json{{"error", "Passwords do not match."}}
                );
            }
            
            // Create.
            Len uid = create_user(*first_name, *last_name, *username, *email, *pass);
            
            // Create token.
            String token = generate_token(uid);
            
            // Create headers.
            Headers headers {
                {"Connection", "close"},
            };
            create_token_cookie_h(headers, token);
            create_user_cookie_h(headers, uid);
            create_detailed_user_cookie_h(headers, uid);
            
            // Response.
            return ServerTemplate::response(
                vlib::http::status::success,
                headers,
                {{"message", "Successfully signed up."}}
            );
            
        // Error.
        } catch (Exception& e) {
            if (m_config.log_level >= 1) {
                e.dump();
            }
            return ServerTemplate::response(
                vlib::http::status::internal_server_error,
                Json{{"error", e.err()}}
            );
        }
    }
    
    // ---------------------------------------------------------
    // Response.
    
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
    
};

// Aliases.
using HTTPServer = ServerTemplate<
    vlib::sockets::Socket<
        vlib::sockets::family::ipv4,
        vlib::sockets::type::stream,
        vlib::sockets::protocol::undefined,
        1024,
        false
    >,
    Int,
    false
>;
using HTTPSServer = ServerTemplate<
    vlib::tls::Server<
        vlib::sockets::family::ipv4,
        vlib::sockets::type::stream,
        vlib::sockets::protocol::undefined,
        1024,
        false,
        vlib::tls::version::v1_3
    >,
    vlib::tls::Server<>::Client,
    true
>;

// Exceptions.
template<> excid_t HTTPSServer::parent_id = add_parent("vweb::HTTPSServer");
template<> excid_t HTTPServer::parent_id = add_parent("vweb::HTTPServer");
template<> excid_t HTTPSServer::smtp_undefined_err = add_err("SMTP Client is undefined.");
template<> excid_t HTTPServer::smtp_undefined_err = add_err("SMTP Client is undefined.");

// Endpoint alias.
using HTTPEndpoint = HTTPServer::Endpoint;
using HTTPSEndpoint = HTTPSServer::Endpoint;

// Endpoint static variables.
template<> const String HTTPEndpoint::html_template = String::load(toString(Path(__FILE__).base(2), "/ui/template.html"));
template<> const String HTTPSEndpoint::html_template = String::load(toString(Path(__FILE__).base(2), "/ui/template.html"));

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

