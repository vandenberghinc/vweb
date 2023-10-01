<p align="center">
<img src="https://github.com/vandenberghinc/vweb/blob/main/dev/media/icon/stroke.png?raw=true" alt="VWeb" width="500">
</p>  
Easily create websites or REST APIs in pure c++ with the library VWeb. Website views are built in a SwiftUI like manner. The backend can run on on HTTP only or on HTTP and HTTPS both.
<br><br>
<p align="center">
    <img src="https://img.shields.io/badge/version-{{VERSION}}-orange" alt="Bergh-Encryption">
    <img src="https://img.shields.io/badge/std-c++20-orange" alt="Bergh-Encryption">
    <img src="https://img.shields.io/badge/status-maintained-forestgreen" alt="Bergh-Encryption">
    <img src="https://img.shields.io/badge/dependencies-vlib-yellow" alt="Bergh-Encryption">
    <img src="https://img.shields.io/badge/OS-MacOS & Linux-blue" alt="Bergh-Encryption">
</p> 
<br><br>

## In Development.
This library is currently still in development.
<br><br>

## Documentation.
Full documentation at [Github Pages](https://vandenberghinc.github.io/vweb).

## Getting Started.

### Include.
Include the vweb library.
```cpp

// Include vlib.
#include <vlib/types.h>

// Include vweb.
#include <vweb/vweb.h>

// VWeb hortcuts.
using namespace vweb;
using namespace vweb::ui;

```

### Building A View Endpoint.
Create a function that returns an endpoint which can be used by the server.
```cpp

// Unauthenticated endpoint without rate limiting.
Endpoint my_view() {
    return Endpoint {
        "/view",    // the endpoint url.
        View {      // the content view.
            Title("Hello World!")
                .font_size(32),
            Text("Hello World!")
                .font_size(16),
        }
    }
}

// Authenticated view and rate limiting.
Endpoint my_auth_view() {
    return Endpoint {
        "/auth_view",                        // the endpoint url.
        Endpoint::Options {
            .auth = Endpoint::authenticated, // endpoint requires authentication.
            .rate_limit = 10,                // rate limit count for the duration.
            .rate_duration = 60,             // 60 seconds duration.
        },
        View {
            Title("Hello World!")
                .font_size(32),
            Text("Hello World!")
                .font_size(16),
        }
    };
}
```

### Building A REST API Endpoint.
Create a function that returns an endpoint which can be used by the server.
```cpp
Endpoint my_restapi_endpoint() {
    return Endpoint {
        "GET",                       // the HTTP method.
        "/backend/hello_world",      // the endpoint url.
        "application/json",          // the content type.
        [](Server& server, Json& params) {
            return server.response(
                vlib::http::status::success,
                Json {
                    {"message", "Hello World!"},
                }
            );
        }
    };
}
```

### Building The Backend Server.
Easily build the server backend. The backend can run either on HTTP or on HTTP and HTTPS both.
```cpp
// Main.
int main() {

    // Initialize server.
    Path base = Path(__FILE__).base();
    Server server ({
        .port = 8000,                            // the server port.
        .cert = base.join("certs/cert.pem"),     // path to the tls certificate.
        .key = base.join("certs/key.pem"),       // path to the tls key.
        .pass = "HelloWorld!",                   // password of the tls key.
        .statics = base.join("static"),          // path to the static directory.
        .database = base.join("database"),       // path to the database directory.
    });
    
    // Add endpoints.
    server.add_endpoints({
        my_view(),
        my_auth_view(),
        my_restapi_endpoint(),
    });
    
    // Start.
    server.start();
    return 0;
}

```

## Documentation Table.
 - [vweb::ui::Element](https://vandenberghinc.github.io/vweb#vweb::ui::Element)
 - [vweb::get_param](https://vandenberghinc.github.io/vweb#vweb::get_param)
 - [vweb::get_cookie](https://vandenberghinc.github.io/vweb#vweb::get_cookie)
 - [vweb::server::Config](https://vandenberghinc.github.io/vweb#vweb::server::Config)
     - [vweb::server::vweb::server::Config::load](https://vandenberghinc.github.io/vweb#vweb::server::Config::load)
 - [vweb::Server](https://vandenberghinc.github.io/vweb#vweb::Server)
     - [vweb::vweb::Server](https://vandenberghinc.github.io/vweb#vweb::Server::Server)
     - [vweb::vweb::Server::add_endpoints](https://vandenberghinc.github.io/vweb#vweb::Server::add_endpoints)
     - [vweb::vweb::Server::add_endpoints](https://vandenberghinc.github.io/vweb#vweb::Server::add_endpoints-0)
     - [vweb::vweb::Server::username_exists](https://vandenberghinc.github.io/vweb#vweb::Server::username_exists)
     - [vweb::vweb::Server::email_exists](https://vandenberghinc.github.io/vweb#vweb::Server::email_exists)
     - [vweb::vweb::Server::is_activated](https://vandenberghinc.github.io/vweb#vweb::Server::is_activated)
     - [vweb::vweb::Server::set_activated](https://vandenberghinc.github.io/vweb#vweb::Server::set_activated)
     - [vweb::vweb::Server::create_user](https://vandenberghinc.github.io/vweb#vweb::Server::create_user)
     - [vweb::vweb::Server::delete_user](https://vandenberghinc.github.io/vweb#vweb::Server::delete_user)
     - [vweb::vweb::Server::set_first_name](https://vandenberghinc.github.io/vweb#vweb::Server::set_first_name)
     - [vweb::vweb::Server::set_last_name](https://vandenberghinc.github.io/vweb#vweb::Server::set_last_name)
     - [vweb::vweb::Server::set_username](https://vandenberghinc.github.io/vweb#vweb::Server::set_username)
     - [vweb::vweb::Server::set_email](https://vandenberghinc.github.io/vweb#vweb::Server::set_email)
     - [vweb::vweb::Server::set_password](https://vandenberghinc.github.io/vweb#vweb::Server::set_password)
     - [vweb::vweb::Server::get_uid](https://vandenberghinc.github.io/vweb#vweb::Server::get_uid)
     - [vweb::vweb::Server::get_uid_by_email](https://vandenberghinc.github.io/vweb#vweb::Server::get_uid_by_email)
     - [vweb::vweb::Server::get_uid_by_api_key](https://vandenberghinc.github.io/vweb#vweb::Server::get_uid_by_api_key)
     - [vweb::vweb::Server::get_uid_by_token](https://vandenberghinc.github.io/vweb#vweb::Server::get_uid_by_token)
     - [vweb::vweb::Server::get_user](https://vandenberghinc.github.io/vweb#vweb::Server::get_user)
     - [vweb::vweb::Server::get_user_by_username](https://vandenberghinc.github.io/vweb#vweb::Server::get_user_by_username)
     - [vweb::vweb::Server::get_user_by_email](https://vandenberghinc.github.io/vweb#vweb::Server::get_user_by_email)
     - [vweb::vweb::Server::get_user_by_api_key](https://vandenberghinc.github.io/vweb#vweb::Server::get_user_by_api_key)
     - [vweb::vweb::Server::get_user_by_token](https://vandenberghinc.github.io/vweb#vweb::Server::get_user_by_token)
     - [vweb::vweb::Server::generate_api_key](https://vandenberghinc.github.io/vweb#vweb::Server::generate_api_key)
     - [vweb::vweb::Server::generate_token](https://vandenberghinc.github.io/vweb#vweb::Server::generate_token)
     - [vweb::vweb::Server::verify_password](https://vandenberghinc.github.io/vweb#vweb::Server::verify_password)
     - [vweb::vweb::Server::verify_api_key](https://vandenberghinc.github.io/vweb#vweb::Server::verify_api_key)
     - [vweb::vweb::Server::verify_token](https://vandenberghinc.github.io/vweb#vweb::Server::verify_token)
     - [vweb::vweb::Server::send_mail](https://vandenberghinc.github.io/vweb#vweb::Server::send_mail)
     - [vweb::vweb::Server::send_2fa](https://vandenberghinc.github.io/vweb#vweb::Server::send_2fa)
     - [vweb::vweb::Server::verify_2fa](https://vandenberghinc.github.io/vweb#vweb::Server::verify_2fa)
     - [vweb::vweb::Server::sign_in](https://vandenberghinc.github.io/vweb#vweb::Server::sign_in)
     - [vweb::vweb::Server::sign_in](https://vandenberghinc.github.io/vweb#vweb::Server::sign_in-0)
     - [vweb::vweb::Server::response](https://vandenberghinc.github.io/vweb#vweb::Server::response)
     - [vweb::vweb::Server::config](https://vandenberghinc.github.io/vweb#vweb::Server::config)
     - [vweb::vweb::Server::endpoints](https://vandenberghinc.github.io/vweb#vweb::Server::endpoints)
     - [vweb::vweb::Server::smtp](https://vandenberghinc.github.io/vweb#vweb::Server::smtp)
     - [vweb::vweb::Server::response_400](https://vandenberghinc.github.io/vweb#vweb::Server::response_400)
     - [vweb::vweb::Server::response_401](https://vandenberghinc.github.io/vweb#vweb::Server::response_401)
     - [vweb::vweb::Server::response_401_invalid_format](https://vandenberghinc.github.io/vweb#vweb::Server::response_401_invalid_format)
     - [vweb::vweb::Server::response_401_invalid_scheme](https://vandenberghinc.github.io/vweb#vweb::Server::response_401_invalid_scheme)
     - [vweb::vweb::Server::response_404](https://vandenberghinc.github.io/vweb#vweb::Server::response_404)
     - [vweb::vweb::Server::response_429](https://vandenberghinc.github.io/vweb#vweb::Server::response_429)
     - [vweb::vweb::Server::response_500](https://vandenberghinc.github.io/vweb#vweb::Server::response_500)
     - [vweb::vweb::Server::two_factor_auth_mail](https://vandenberghinc.github.io/vweb#vweb::Server::two_factor_auth_mail)
 - [vweb::EndpointTemplate](https://vandenberghinc.github.io/vweb#vweb::EndpointTemplate)
     - [vweb::vweb::EndpointTemplate::Auth](https://vandenberghinc.github.io/vweb#vweb::EndpointTemplate::Auth)
     - [vweb::vweb::EndpointTemplate::Options](https://vandenberghinc.github.io/vweb#vweb::EndpointTemplate::Options)
     - [vweb::vweb::EndpointTemplate](https://vandenberghinc.github.io/vweb#vweb::EndpointTemplate::EndpointTemplate)
     - [vweb::vweb::EndpointTemplate](https://vandenberghinc.github.io/vweb#vweb::EndpointTemplate::EndpointTemplate-0)
     - [vweb::vweb::EndpointTemplate](https://vandenberghinc.github.io/vweb#vweb::EndpointTemplate::EndpointTemplate-1)
     - [vweb::vweb::EndpointTemplate](https://vandenberghinc.github.io/vweb#vweb::EndpointTemplate::EndpointTemplate-2)
     - [vweb::vweb::EndpointTemplate](https://vandenberghinc.github.io/vweb#vweb::EndpointTemplate::EndpointTemplate-3)
     - [vweb::vweb::EndpointTemplate](https://vandenberghinc.github.io/vweb#vweb::EndpointTemplate::EndpointTemplate-4)
