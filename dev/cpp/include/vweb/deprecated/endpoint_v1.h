/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 Daan van den Bergh.
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

/*  @docs {
 *  @chapter: endpoints
 *  @title: Endpoint
 *  @description:
 *      Website server endpoint.
 *
 *      <bullet> The alias `HTTPEndpoint` is defined for a server that uses a HTTP.
 *      <bullet> The alias `HTTPSEndpoint` is defined for a server that uses a HTTPS.
 } */
template <typename Server>
struct EndpointTemplate {
    
    // ---------------------------------------------------------
    // Structs & enums.
	
	// Callback.
	struct CallBack {
		
		// ---------------------------------------------------------
		// Type definitions.
		
		// Endpoint function.
		typedef vlib::http::Response (*CallBack1)();
		typedef vlib::http::Response (*CallBack2)(Server&, const Len&);
		typedef vlib::http::Response (*CallBack3)(Server&, const Json&);
		typedef vlib::http::Response (*CallBack4)(Server&, const Len&, const Json&);
		typedef vlib::http::Response (*CallBack5)(Server&, const Len&, const Json&, const Headers&);
		typedef vlib::http::Response (*CallBack6)(Server&, const Len&, const Json&, const Headers&, const vlib::Socket<>::Info&);
		typedef vlib::http::Response (*CallBack7)(Server&, const Len&, const vlib::http::Request&);
		
		// ---------------------------------------------------------
		// Attributes.
		
		CallBack1        m_callback_1;
		CallBack2        m_callback_2;
		CallBack3        m_callback_3;
		CallBack4        m_callback_4;
		CallBack5        m_callback_5;
		CallBack6        m_callback_6;
		CallBack7        m_callback_7;
		
		// ---------------------------------------------------------
		// Constructors.
		
		// Default.
		constexpr
		CallBack() = default;
		
		// Callback 1.
		constexpr
		CallBack(CallBack1&& callback) :
		m_callback_1(callback)
		{}
		
		// Callback 2.
		constexpr
		CallBack(CallBack2&& callback) :
		m_callback_2(callback)
		{}
		
		// Callback 3.
		constexpr
		CallBack(CallBack3&& callback) :
		m_callback_3(callback)
		{}
		
		// Callback 4.
		constexpr
		CallBack(CallBack4&& callback) :
		m_callback_4(callback)
		{}
		
		// Callback 5.
		constexpr
		CallBack(CallBack5&& callback) :
		m_callback_5(callback)
		{}
		
		// Callback 6.
		constexpr
		CallBack(CallBack6&& callback) :
		m_callback_6(callback)
		{}
		
		// Callback 7.
		constexpr
		CallBack(CallBack7&& callback) :
		m_callback_7(callback)
		{}
		
		
	};
    
    // Rate limit structure.
    struct RateLimit {
        Long    timestamp = 0;
        Int     count = 0;
        Len     ip = 0;
    };
    
    // Auth option.
    /*  @docs {
     *  @chapter: endpoints
     *  @title: Authentication
     *  @description:
     *      Endpoint Authentication Options.
     *  @show_code: true
     } */
    enum Auth {
        none = (1u << 0),
        authenticated = (1u << 1),
        signature = (1u << 2),
    };
    
    // Endpoint options.
    /*  @docs {
     *  @chapter: endpoints
     *  @title: Endpoint Options
     *  @description:
     *      Endpoint Options.
     *
     *      See <Link #vweb::EndpointTemplate::Auth>Endpoint::Auth</Link> for more info.
     *  @show_code: true
     } */
    struct Options {
        Int auth = Auth::none; // requires auth methods.
        Int rate_limit = -1; // rate limit, leave -1 to disable rate limiting.
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
    Array<RateLimit>    m_rate_limits;
    vlib::Mutex         m_mutex;
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Default.
    constexpr
    EndpointTemplate() = default;
    
    // Constructor from String.
    /*  @docs {
     *  @title: String Constructor
     *  @description:
     *      Constructor from a `String`.
     *
     *      The endpoint response may be cached for 86400 seconds.
     *  @parameter: {
     *      @name: method
     *      @description: The method string, e.g. [`GET`].
     *  }
     *  @parameter: {
     *      @name: endpoint
     *      @description: The endpoint suburl.
     *  }
     *  @parameter: {
     *      @name: content_type
     *      @description: The content type string, e.g. [`application/json`].
     *  }
     *  @parameter: {
     *      @name: data
     *      @description: The response body data.
     *  }
     *  @usage:
     *      ...
     *      return Endpoint {
     *          "GET",
     *          "/icons/js.js",
     *          "text/javascript",
     *          "console.log(\"Hello World!\");",
     *      };
     } */
    constexpr
    EndpointTemplate(
             const String& method,
             const String& endpoint,
             const String& content_type,
             const String& data
             ) :
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
    m_type(0),
    m_data(data),
    m_headers({
		{"Content-Type", content_type},
		{"Keep-Alive", "5"},
    })
    {
		if (vweb_production) {
			m_headers["Cache-Control"] = "max-age=86400";
		}
        clean_url();
    }
    /*  @docs {
     *  @title: String Constructor
     *  @description:
     *      Constructor from a `String`.
     *
     *      The endpoint response may be cached for 86400 seconds.
     *  @parameter: {
     *      @name: method
     *      @description: The method string, e.g. [`GET`].
     *  }
     *  @parameter: {
     *      @name: endpoint
     *      @description: The endpoint suburl.
     *  }
     *  @parameter: {
     *      @name: content_type
     *      @description: The content type string, e.g. [`application/json`].
     *  }
     *  @parameter: {
     *      @name: options
     *      @description:
     *          The endpoint options for rate limiting and authentication.
     *
     *          See <Link #vweb::EndpointTemplate::Options>Endpoint::Options</Link> for more info.
     *  }
     *  @parameter: {
     *      @name: data
     *      @description: The response body data.
     *  }
     *  @usage:
     *      ...
     *      return Endpoint {
     *          "GET",
     *          "/icons/js.js",
     *          "text/javascript",
     *          { .rate_limit = 10, .rate_limit_duration = 60, }
     *          "console.log(\"Hello World!\");",
     *      };
	 *	@funcs: 2
     } */
    constexpr
    EndpointTemplate(
             const String& method,
             const String& endpoint,
             const String& content_type,
             const Options& options,
             const String& data
             ) :
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(0),
    m_data(data),
    m_headers({
		{"Content-Type", content_type},
		{"Keep-Alive", "5"},
    })
    {
		if (vweb_production) {
			m_headers["Cache-Control"] = "max-age=86400";
		}
        clean_url();
    }
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        const Options& options,
        const Headers& headers,
        const String& data
    ) :
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(0),
    m_data(data),
    m_headers(headers)
    {
        m_headers["Content-Type"] = content_type;
		m_headers["Keep-Alive"] = "5";
        clean_url();
    }
    
	// Constructor from View.
	/*  @docs {
	 *  @title: View Constructor
	 *  @description:
	 *      Constructor from a `View`.
	 *
	 *      The response body will be compressed.
	 *  @parameter: {
	 *      @name: endpoint
	 *      @description: The endpoint suburl.
	 *  }
	 *  @parameter: {
	 *      @name: view
	 *      @description: The `View` object.
	 *  }
	 *  @usage:
	 *      ...
	 *      return Endpoint {
	 *          "/",
	 *          View {
	 *              Title("Hello World!"),
	 *          }
	 *      };
	 } */
	constexpr
	EndpointTemplate(
			 const String& endpoint,
			 const ui::View& view
	) :
	m_method(vlib::http::method::get),
	m_endpoint(endpoint),
	m_content_type(vlib::http::content_type::html),
	m_headers({
		// {"Content-Type", vlib::http::content_type::to_str(m_content_type.value())},
		{"Keep-Alive", "5"},
		
		// Compress.
		{"Content-Encoding", "gzip"},
		{"Vary", "Accept-Encoding"},
		
		// Cache.
		// {"Cache-Control", "max-age=86400"},
		// {"Expires", "Thu, 01 Jan 1970 00:00:00 GMT"},
		
		// Dont cache for debugging.
		{"Cache-Control", "no-cache, no-store, must-revalidate"},
		{"Pragma", "no-cache"},
		{"Expires", "0"},
	}),
	m_data(vlib::compress(view.build()))
	{
		clean_url();
	}
	/*  @docs {
	 *  @title: View Constructor With Options
	 *  @description:
	 *      Constructor from a `View` with options.
	 *
	 *      The response body will be compressed.
	 *  @parameter: {
	 *      @name: endpoint
	 *      @description: The endpoint suburl.
	 *  }
	 *  @parameter: {
	 *      @name: options
	 *      @description:
	 *          The endpoint options for rate limiting and authentication.
	 *
	 *          See <Link #vweb::EndpointTemplate::Options>Endpoint::Options</Link> for more info.
	 *  }
	 *  @parameter: {
	 *      @name: view
	 *      @description: The `View` object.
	 *  }
	 *  @usage:
	 *      ...
	 *      return Endpoint {
	 *          "/",
	 *          { .auth = Endpoint::authenticated, }
	 *          View {
	 *              Title("Hello World!"),
	 *          }
	 *      };
	 *  @funcs: 3
	 } */
	constexpr
	EndpointTemplate(
			 const String& endpoint,
			 const Options& options,
			 const ui::View& view
	) :
	m_method(vlib::http::method::get),
	m_endpoint(endpoint),
	m_content_type(vlib::http::content_type::html),
	m_auth(options.auth),
	m_rate_limit(options.rate_limit),
	m_rate_limit_duration(options.rate_limit_duration),
	m_type(0),
	m_headers({
		// {"Content-Type", vlib::http::content_type::to_str(m_content_type.value())},
		{"Keep-Alive", "5"},
		
		// Compress.
		// {"Content-Encoding", "gzip"},
		// {"Vary", "Accept-Encoding"},
		
		// Cache.
		// {"Cache-Control", "max-age=86400"},
		// {"Expires", "Thu, 01 Jan 1970 00:00:00 GMT"},
		
		// Dont cache for debugging.
		{"Cache-Control", "no-cache, no-store, must-revalidate"},
		{"Pragma", "no-cache"},
		{"Expires", "0"},
	}),
	// m_data(vlib::compress(view.build()))
	m_data(view.build())
	{
		clean_url();
	}
	constexpr
	EndpointTemplate(
					 const String& method,
					 const String& endpoint,
					 const Options& options,
					 const ui::View& view
					 ) :
	m_method(vlib::http::method::from_str(method)),
	m_endpoint(endpoint),
	m_content_type(vlib::http::content_type::html),
	m_auth(options.auth),
	m_rate_limit(options.rate_limit),
	m_rate_limit_duration(options.rate_limit_duration),
	m_type(0),
	m_headers({
		// {"Content-Type", vlib::http::content_type::to_str(m_content_type.value())},
		{"Keep-Alive", "5"},
		
		// Compress.
		{"Content-Encoding", "gzip"},
		{"Vary", "Accept-Encoding"},
		
		// Cache.
		// {"Cache-Control", "max-age=86400"},
		// {"Expires", "Thu, 01 Jan 1970 00:00:00 GMT"},
		
		// Dont cache for debugging.
		{"Cache-Control", "no-cache, no-store, must-revalidate"},
		{"Pragma", "no-cache"},
		{"Expires", "0"},
	}),
	m_data(vlib::compress(view.build()))
	{
		clean_url();
	}
	constexpr
	EndpointTemplate(
		const String& method,
		const String& endpoint,
		const Options& options,
		const Headers& headers,
		const ui::View& view
	) :
	m_method(vlib::http::method::from_str(method)),
	m_endpoint(endpoint),
	m_content_type(vlib::http::content_type::html),
	m_auth(options.auth),
	m_rate_limit(options.rate_limit),
	m_rate_limit_duration(options.rate_limit_duration),
	m_type(0),
	m_headers(headers),
	m_data(vlib::compress(view.build()))
	{
		// m_headers["Content-Type"] = vlib::http::content_type::to_str(m_content_type.value());
		m_headers["Content-Encoding"] = "gzip";
		m_headers["Vary"] = "Accept-Encoding";
		m_headers["Keep-Alive"] = "5";
		clean_url();
	}
	
    // Constructor from View.
    /*  @docs {
     *  @title: View Constructor
     *  @description:
     *      Constructor from a `View`.
     *
     *      The response body will be compressed.
     *  @parameter: {
     *      @name: endpoint
     *      @description: The endpoint suburl.
     *  }
     *  @parameter: {
     *      @name: view
     *      @description: The `View` object.
     *  }
     *  @usage:
     *      ...
     *      return Endpoint {
     *          "/",
     *          View {
     *              Title("Hello World!"),
     *          }
     *      };
     } */
  //   constexpr
  //   EndpointTemplate(
  //            const String& endpoint,
  //            const ui::Element& view
  //   ) :
  //   m_method(vlib::http::method::get),
  //   m_endpoint(endpoint),
  //   m_content_type(vlib::http::content_type::html),
  //   m_headers({
		// // {"Content-Type", vlib::http::content_type::to_str(m_content_type.value())},
		// {"Keep-Alive", "5"},
  //       
  //       // Compress.
  //       {"Content-Encoding", "gzip"},
  //       {"Vary", "Accept-Encoding"},
  //       
  //       // Cache.
  //       // {"Cache-Control", "max-age=86400"},
  //       // {"Expires", "Thu, 01 Jan 1970 00:00:00 GMT"},
  //       
  //       // Dont cache for debugging.
  //       {"Cache-Control", "no-cache, no-store, must-revalidate"},
  //       {"Pragma", "no-cache"},
  //       {"Expires", "0"},
  //   })
  //   {
  //       clean_url();
  //       fill_data(view);
  //   }
    /*  @docs {
     *  @title: View Constructor With Options
     *  @description:
     *      Constructor from a `View` with options.
     *
     *      The response body will be compressed.
     *  @parameter: {
     *      @name: endpoint
     *      @description: The endpoint suburl.
     *  }
     *  @parameter: {
     *      @name: options
     *      @description:
     *          The endpoint options for rate limiting and authentication.
     *
     *          See <Link #vweb::EndpointTemplate::Options>Endpoint::Options</Link> for more info.
     *  }
     *  @parameter: {
     *      @name: view
     *      @description: The `View` object.
     *  }
     *  @usage:
     *      ...
     *      return Endpoint {
     *          "/",
     *          { .auth = Endpoint::authenticated, }
     *          View {
     *              Title("Hello World!"),
     *          }
     *      };
     *  @funcs: 3
     } */
  //   constexpr
  //   EndpointTemplate(
  //            const String& endpoint,
  //            const Options& options,
  //            const ui::Element& view
  //   ) :
  //   m_method(vlib::http::method::get),
  //   m_endpoint(endpoint),
  //   m_content_type(vlib::http::content_type::html),
  //   m_auth(options.auth),
  //   m_rate_limit(options.rate_limit),
  //   m_rate_limit_duration(options.rate_limit_duration),
  //   m_type(0),
  //   m_headers({
		// // {"Content-Type", vlib::http::content_type::to_str(m_content_type.value())},
		// {"Keep-Alive", "5"},
  //
  //       // Compress.
  //       {"Content-Encoding", "gzip"},
  //       {"Vary", "Accept-Encoding"},
  //
  //       // Cache.
  //       // {"Cache-Control", "max-age=86400"},
  //       // {"Expires", "Thu, 01 Jan 1970 00:00:00 GMT"},
  //
  //       // Dont cache for debugging.
  //       {"Cache-Control", "no-cache, no-store, must-revalidate"},
  //       {"Pragma", "no-cache"},
  //       {"Expires", "0"},
  //   })
  //   {
  //       clean_url();
  //       fill_data(view);
  //   }
  //   constexpr
  //   EndpointTemplate(
  //                    const String& method,
  //                    const String& endpoint,
  //                    const Options& options,
  //                    const ui::Element& view
  //                    ) :
  //   m_method(vlib::http::method::from_str(method)),
  //   m_endpoint(endpoint),
  //   m_content_type(vlib::http::content_type::html),
  //   m_auth(options.auth),
  //   m_rate_limit(options.rate_limit),
  //   m_rate_limit_duration(options.rate_limit_duration),
  //   m_type(0),
  //   m_headers({
		// // {"Content-Type", vlib::http::content_type::to_str(m_content_type.value())},
		// {"Keep-Alive", "5"},
  //
  //       // Compress.
  //       {"Content-Encoding", "gzip"},
  //       {"Vary", "Accept-Encoding"},
  //
  //       // Cache.
  //       // {"Cache-Control", "max-age=86400"},
  //       // {"Expires", "Thu, 01 Jan 1970 00:00:00 GMT"},
  //
  //       // Dont cache for debugging.
  //       {"Cache-Control", "no-cache, no-store, must-revalidate"},
  //       {"Pragma", "no-cache"},
  //       {"Expires", "0"},
  //   })
  //   {
  //       clean_url();
  //       fill_data(view);
  //   }
  //   constexpr
  //   EndpointTemplate(
  //       const String& method,
  //       const String& endpoint,
  //       const Options& options,
  //       const Headers& headers,
  //       const ui::Element& view
  //   ) :
  //   m_method(vlib::http::method::from_str(method)),
  //   m_endpoint(endpoint),
  //   m_content_type(vlib::http::content_type::html),
  //   m_auth(options.auth),
  //   m_rate_limit(options.rate_limit),
  //   m_rate_limit_duration(options.rate_limit_duration),
  //   m_type(0),
  //   m_headers(headers)
  //   {
		// // m_headers["Content-Type"] = vlib::http::content_type::to_str(m_content_type.value());
  //       m_headers["Content-Encoding"] = "gzip";
  //       m_headers["Vary"] = "Accept-Encoding";
		// m_headers["Keep-Alive"] = "5";
  //       clean_url();
  //       fill_data(view);
  //   }
    
    // Constructor from function RestAPIFunc1 for rest api.
    /*  @docs {
     *  @title: REST API Constructor
     *  @description:
     *      Constructor for a REST API endpoint.
     *
     *      Uncatched exceptions inside the REST API function will automatically be catched and return an internal server error response, with the error of the exception.
     *  @parameter: {
     *      @name: method
     *      @description: The method string, e.g. [`GET`].
     *  }
     *  @parameter: {
     *      @name: endpoint
     *      @description: The endpoint suburl.
     *  }
     *  @parameter: {
     *      @name: content_type
     *      @description: The content type string, e.g. [`application/json`].
     *  }
     *  @parameter: {
     *      @name: func
     *      @description:
     *          The restapi function.
     *
     *          The function should always return a `vlib::http::Response` object.
     *
     *          The following parameter combinations are possible for a REST API function.
     *          The parameter `const Len& uid` will be `NPos::npos` when the user is not authenticated.
     *          ```();
     *          (Server& server, const Len& uid);
     *          (Server& server, const Json& params);
     *          (Server& server, const Len& uid, const Json& params);
     *          (Server& server, const Len& uid, const Json& params, const Headers& headers);
     *          (Server& server, const Len& uid, const Json& params, const Headers& headers, const vlib::Socket<>::Connection& connection);```
	 *          (Server& server, const Len& uid, const vlib::http::Request& request);```
     *  }
     *  @usage:
     *      ...
     *      return Endpoint {
     *          "GET",
     *          "/backend/hello_world",
     *          "application/json",
     *          []() {
     *              return Server::response(
     *                  vlib::http::status::success,
     *                  Json {{"message", "Hello World!"}}
     *              );
     *          }
     *      };
     } */
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        RestAPIFunc1&& func
    ) :
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
    m_type(1),
    m_restapi_func_1(func)
    {
        clean_url();
    }
    /*  @docs {
     *  @title: REST API Constructor
     *  @description:
     *      Constructor for a REST API endpoint with options.
     *
     *      Uncatched exceptions inside the REST API function will automatically be catched and return an internal server error response, with the error of the exception.
     *  @parameter: {
     *      @name: method
     *      @description: The method string, e.g. [`GET`].
     *  }
     *  @parameter: {
     *      @name: endpoint
     *      @description: The endpoint suburl.
     *  }
     *  @parameter: {
     *      @name: content_type
     *      @description: The content type string, e.g. [`application/json`].
     *  }
     *  @parameter: {
     *      @name: options
     *      @description:
     *          The endpoint options for rate limiting and authentication.
     *
     *          See <Link #vweb::EndpointTemplate::Options>Endpoint::Options</Link> for more info.
     *  }
     *  @parameter: {
     *      @name: func
     *      @description:
     *          The restapi function.
     *
     *          The function should always return a `vlib::http::Response` object.
     *
     *          The following parameter combinations are possible for a REST API function.
     *          The parameter `const Len& uid` will be `NPos::npos` when the user is not authenticated.
     *          ```();
     *          (Server& server, const Len& uid);
     *          (Server& server, const Json& params);
     *          (Server& server, const Len& uid, const Json& params);
     *          (Server& server, const Len& uid, const Json& params, const Headers& headers);
     *          (Server& server, const Len& uid, const Json& params, const Headers& headers, const vlib::Socket<>::Connection& connection);```
	 *          (Server& server, const Len& uid, const vlib::http::Request& request);```
     *  }
     *  @usage:
     *      ...
     *      return Endpoint {
     *          "GET",
     *          "/backend/hello_world",
     *          "application/json",
     *          { .rate_limit = 10, .rate_limit_duration = 60, }
     *          []() {
     *              return Server::response(
     *                  vlib::http::status::success,
     *                  Json {{"message", "Hello World!"}}
     *              );
     *          }
     *      };
     } */
    constexpr
    EndpointTemplate(
        const String& method,
        const String& endpoint,
        const String& content_type,
        const Options& options,
        RestAPIFunc1&& func
    ) :
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
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
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
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
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
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
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
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
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
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
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
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
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
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
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
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
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(5),
    m_restapi_func_5(func)
    {
        clean_url();
    }
    
    // Constructor from function RestAPIFunc6 for rest api.
    constexpr
    EndpointTemplate(
                     const String& method,
                     const String& endpoint,
                     const String& content_type,
                     RestAPIFunc6&& func
                     ) :
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
    m_type(6),
    m_restapi_func_6(func)
    {
        clean_url();
    }
    constexpr
    EndpointTemplate(
                     const String& method,
                     const String& endpoint,
                     const String& content_type,
                     const Options& options,
                     RestAPIFunc6&& func
                     ) :
    m_method(vlib::http::method::from_str(method)),
    m_endpoint(endpoint),
    m_content_type(vlib::http::content_type::from_str(content_type)),
    m_auth(options.auth),
    m_rate_limit(options.rate_limit),
    m_rate_limit_duration(options.rate_limit_duration),
    m_type(6),
    m_restapi_func_6(func)
    {
        clean_url();
    }
	
	// Constructor from function RestAPIFunc6 for rest api.
	constexpr
	EndpointTemplate(
					 const String& method,
					 const String& endpoint,
					 const String& content_type,
					 RestAPIFunc7&& func
					 ) :
	m_method(vlib::http::method::from_str(method)),
	m_endpoint(endpoint),
	m_content_type(vlib::http::content_type::from_str(content_type)),
	m_type(7),
	m_restapi_func_7(func)
	{
		clean_url();
	}
	constexpr
	EndpointTemplate(
					 const String& method,
					 const String& endpoint,
					 const String& content_type,
					 const Options& options,
					 RestAPIFunc7&& func
					 ) :
	m_method(vlib::http::method::from_str(method)),
	m_endpoint(endpoint),
	m_content_type(vlib::http::content_type::from_str(content_type)),
	m_auth(options.auth),
	m_rate_limit(options.rate_limit),
	m_rate_limit_duration(options.rate_limit_duration),
	m_type(7),
	m_restapi_func_7(func)
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
            item->ip = ip;
        }
        
        // Check rate limit.
        if (item->timestamp == 0) {
            item->timestamp = sec + m_rate_limit_duration.value();
            item->count = 1;
        } else if (sec > item->timestamp) {
            item->timestamp = sec + m_rate_limit_duration.value();
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
    // constexpr
    // void    fill_data(const ui::Element& view) {
    //     m_data = HTMLBuilder::build(view);
    //     m_data = vlib::compress(m_data);
    // }
      
};


// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

