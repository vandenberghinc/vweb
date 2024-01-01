/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_ENDPOINT_H
#define VWEB_ENDPOINT_H


// Namespace vweb.
namespace vweb {

// Headers alias.
using Headers = vlib::http::Headers;

// ---------------------------------------------------------
// Endpoint.

/* @docs {
 @chapter: server
 @title: Endpoint
 @description:
 Website server endpoint.
 } */
template <typename Server>
struct EndpointTemplate {
    
    // ---------------------------------------------------------
    // Type definitions.
    
    // Endpoint function.
    typedef vlib::http::Response (*RestAPIFunc1)();
    typedef vlib::http::Response (*RestAPIFunc2)(Server&, const Len&);
    typedef vlib::http::Response (*RestAPIFunc3)(Server&, const Json&);
    typedef vlib::http::Response (*RestAPIFunc4)(Server&, const Len&, const Json&);
    typedef vlib::http::Response (*RestAPIFunc5)(Server&, const Len&, const Json&, const Headers&);
    
    // ---------------------------------------------------------
    // Static attributes.
    
    static const String html_template;
    
    // ---------------------------------------------------------
    // Structs & enums.
    
    // Rate limit structure.
    struct RateLimit {
        Long    timestamp = 0;
        Int     count = 0;
        Len     ip = 0;
    };
    
    // Auth option.
    enum Auth {
        none = (1u << 0),
        authenticated = (1u << 1),
        signature = (1u << 2),
    };
    
    // Endpoint options.
    struct Options {
        Int auth = Auth::none; // requires auth methods.
        Int rate_limit = -1; // rate limit.
        Int rate_limit_duration = 60; // rate limit duration in seconds.
    };
    
    // ---------------------------------------------------------
    // Attributes.
    
    Int                 m_method;
    String              m_endpoint;
    Int                 m_content_type;
    Int                 m_auth = Auth::none; // requires auth methods.
    Int                 m_rate_limit = -1; // rate limit.
    Int                 m_rate_limit_duration = 60; // rate limit duration in seconds.
    Int                 m_type = 0; // 0 when m_data is assigned, >= 1 when one of the m_restapi_func attributes are assigned.
    String              m_data;
    vlib::http::Headers m_headers;
    RestAPIFunc1        m_restapi_func_1;
    RestAPIFunc2        m_restapi_func_2;
    RestAPIFunc3        m_restapi_func_3;
    RestAPIFunc4        m_restapi_func_4;
    RestAPIFunc5        m_restapi_func_5;
    Array<RateLimit>    m_rate_limits;
    vlib::Mutex         m_mutex;
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Default.
    constexpr
    EndpointTemplate() = default;
    
    // Constructor from String.
    constexpr
    EndpointTemplate(
             const String& method,
             const String& endpoint,
             const String& content_type,
             const String& data
             ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_type(0),
    m_data(data),
    m_headers({
        {"Keep-Alive", "timeout=1"},
        // {"Connection", "close"},
        {"Cache-Control", "max-age=86400"},
    })
    {
        clean_url();
    }
    constexpr
    EndpointTemplate(
             const String& method,
             const String& endpoint,
             const String& content_type,
             const Options& options,
             const String& data
             ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(0),
    m_data(data),
    m_headers({
        {"Keep-Alive", "timeout=1"},
        // {"Connection", "close"},
        {"Cache-Control", "max-age=86400"},
    })
    {
        clean_url();
    }
    
    // Constructor from View.
    template <typename Element> requires (ui::is_Element<Element>::value)constexpr
    EndpointTemplate(
             const String& method,
             const String& endpoint,
             const Element& view
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::html),
    m_headers({
        {"Keep-Alive", "timeout=1"},
        // {"Connection", "close"},
        // {"Content-Type", "application/html"},
        // {"Content-Encoding", "gzip"},
        // {"Vary", "Accept-Encoding"},
        // {"Cache-Control", "max-age=86400"},
        // {"Expires", "Thu, 01 Jan 1970 00:00:00 GMT"},
        // {"Last-Modified", "{now} GMT"},
        // {"Cache-Control", "max-age=0, no-cache, must-revalidate, proxy-revalidate"},
        {"Cache-Control", "no-cache, no-store, must-revalidate"},
        {"Pragma", "no-cache"},
        {"Expires", "0"},
    })
    {
        clean_url();
        fill_data(view);
    }
    template <typename Element> requires (ui::is_Element<Element>::value)constexpr
    EndpointTemplate(
             const String& method,
             const String& endpoint,
             const Options& options,
             const Element& view
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::html),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(0),
    m_headers({
        {"Keep-Alive", "timeout=1"},
        // {"Connection", "close"},
        // {"Content-Type", "application/html"},
        // {"Content-Encoding", "gzip"},
        // {"Vary", "Accept-Encoding"},
        // {"Cache-Control", "max-age=86400"},
        // {"Expires", "Thu, 01 Jan 1970 00:00:00 GMT"},
        // {"Last-Modified", "{now} GMT"},
        // {"Cache-Control", "max-age=0, no-cache, must-revalidate, proxy-revalidate"},
        {"Cache-Control", "no-cache, no-store, must-revalidate"},
        {"Pragma", "no-cache"},
        {"Expires", "0"},
    })
    {
        clean_url();
        fill_data(view);
    }
    
    // Constructor from function RestAPIFunc1 for rest api.
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        RestAPIFunc1&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_type(1),
    m_restapi_func_1(func)
    {
        clean_url();
    }
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        const Options& options,
        RestAPIFunc1&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(1),
    m_restapi_func_1(func)
    {
        clean_url();
    }
    
    // Constructor from function RestAPIFunc2 for rest api.
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        RestAPIFunc2&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_type(2),
    m_restapi_func_2(func)
    {
        clean_url();
    }
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        const Options& options,
        RestAPIFunc2&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(2),
    m_restapi_func_2(func)
    {
        clean_url();
    }
    
    // Constructor from function RestAPIFunc3 for rest api.
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        RestAPIFunc3&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_type(3),
    m_restapi_func_3(func)
    {
        clean_url();
    }
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        const Options& options,
        RestAPIFunc3&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(3),
    m_restapi_func_3(func)
    {
        clean_url();
    }
    
    // Constructor from function RestAPIFunc4 for rest api.
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        RestAPIFunc4&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_type(4),
    m_restapi_func_4(func)
    {
        clean_url();
    }
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        const Options& options,
        RestAPIFunc4&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(4),
    m_restapi_func_4(func)
    {
        clean_url();
    }
    
    // Constructor from function RestAPIFunc5 for rest api.
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        RestAPIFunc5&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_type(5),
    m_restapi_func_5(func)
    {
        clean_url();
    }
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        const Options& options,
        RestAPIFunc5&& func
    ) :
    m_method(vlib::http::method::fromstr(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::fromstr(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(5),
    m_restapi_func_5(func)
    {
        clean_url();
    }
    
    // ---------------------------------------------------------
    // Functions.
    
    // Clean url.
    constexpr
    void    clean_url() {
        while (m_endpoint.len() > 1 && m_endpoint.last() == '/') {
            --m_endpoint.len();
        }
    }
    
    // Verify rate limit.
    constexpr
    Bool    verify_rate_limit(const Len& ip) {
        
        // No rate limit.
        if (m_rate_limit == -1) { return true; }
        
        // Vars.
        Int count;
        llong sec = Date::get_seconds();
        
        // Lock.
        m_mutex.lock();
        
        // Find ip.
        RateLimit* item = NULL;
        for (auto& i: m_rate_limits) {
            if (i.ip == ip) {
                item = &i;
                break;
            }
        }
        if (item == NULL) {
            m_rate_limits.expand(1);
            ++m_rate_limits.len();
            item = &m_rate_limits.last();
        }
        
        // Check rate limit.
        if (item->timestamp == 0) {
            item->timestamp = sec;
            item->count = 1;
        } else if (sec > item->timestamp + m_rate_limit_duration.value()) {
            item->timestamp = sec;
            item->count = 1;
        } else {
            ++item->count;
        }
        count = item->count;
        
        // Unlock.
        m_mutex.unlock();
        
        // Verify.
        if (count > m_rate_limit) {
            return false;
        }
        return true;
    }
    
    // Fill data.
    template <typename Element> requires (ui::is_Element<Element>::value) constexpr
    void    fill_data(const Element& view) {
        m_data = html_template
            .replace("{{UI}}", view.json().dump(4))
            .replace_r("{{META_AUTHOR}}", view.meta_author().def(""))
            .replace_r("{{META_TITLE}}", view.meta_title().def("Hello World!"))
            .replace_r("{{META_DESCRIPTION}}", view.meta_description().def("Hello World!"))
            .replace_r("{{META_IMAGE}}", view.meta_image().def(""))
            .replace_r("{{META_ROBOTS}}", view.meta_robots().def("index, follow"));
        // @TODO remove data spaces and comments newlines etc.
    }
      
};


// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

