/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_ENDPOINT_H
#define VWEB_ENDPOINT_H


// Namespace vweb.
namespace vweb {

// Aliases.
using Response = vlib::http::Response;
using Request = vlib::http::Request;
using Headers = vlib::http::Headers;
using Method = vlib::http::Method;
using ContentType = vlib::http::ContentType;

template <typename T, typename U>
struct is_instance {
	static constexpr bool value = false;
	constexpr operator bool() { return value; }
};

template <typename T>
struct is_instance<T, T> {
	static constexpr bool value = true;
	constexpr operator bool() { return value; }
};

// template <typename T, typename U>
// constexpr bool is_instance = is_instance_h<T, U>::value;

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
		typedef Response (*CallBack1)();
		typedef Response (*CallBack2)(Server&, const Len&);
		typedef Response (*CallBack3)(Server&, const Json&);
		typedef Response (*CallBack4)(Server&, const Len&, const Json&);
		typedef Response (*CallBack5)(Server&, const Len&, const Json&, const Headers&);
		typedef Response (*CallBack6)(Server&, const Len&, const Json&, const Headers&, const vlib::Socket<>::Info&);
		typedef Response (*CallBack7)(Server&, const Len&, const Request&);
		
		// ---------------------------------------------------------
		// Attributes.
		
		Short			type = 0;
		CallBack1		callback_1;
		CallBack2       callback_2;
		CallBack3       callback_3;
		CallBack4       callback_4;
		CallBack5       callback_5;
		CallBack6       callback_6;
		CallBack7       callback_7;
		
		// ---------------------------------------------------------
		// Constructors.
		
		// Default.
		constexpr
		CallBack() = default;
		
		// Constructor.
		// It needs a wrapper because the lambda function will not be directly castable to the ...
		// Corresponding CallBackX function when not initialized as CallBack(...) inside an endpoint.
		template <typename Func> constexpr
		CallBack(Func&& callback)
		{
			init(callback);
		}
		
		// ---------------------------------------------------------
		// Functions.
		
		// Callback 1.
		constexpr
		void init(CallBack1&& callback) {
			type = 1;
			callback_1 = callback;
		}
		
		// Callback 2.
		constexpr
		void init(CallBack2&& callback) {
			type = 2;
			callback_2 = callback;
		}
		
		// Callback 3.
		constexpr
		void init(CallBack3&& callback) {
			type = 3;
			callback_3 = callback;
		}
		
		// Callback 4.
		constexpr
		void init(CallBack4&& callback) {
			type = 4;
			callback_4 = callback;
		}
		
		// Callback 5.
		constexpr
		void init(CallBack5&& callback) {
			type = 5;
			callback_5 = callback;
		}
		
		// Callback 6.
		constexpr
		void init(const CallBack6& callback) {
			type = 6;
			callback_6 = callback;
		}
		
		// Callback 7.
		constexpr
		void init(CallBack7&& callback) {
			type = 7;
			callback_7 = callback;
		}
		
	};
    
	// Rate limit settings.
	struct RateLimit {
		Short limit = -1; // rate limit.
		Short duration = 60; // rate limit duration in seconds.
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
     *      See <link #vweb::EndpointTemplate::Auth>Endpoint::Auth</link> for more info.
     *  @show_code: true
     } */
    struct Options {
        Int auth = Auth::none; // requires auth methods.
        Int rate_limit = -1; // rate limit, leave -1 to disable rate limiting.
        Int rate_limit_duration = 60; // rate limit duration in seconds.
    };
	
	// Rate limit structure.
	struct RateLimitingObject {
		Long    timestamp = 0;
		Int     count = 0;
		Len     ip = 0;
	};
    
    // ---------------------------------------------------------
    // Attributes.
    
    Method			method;
    String      	endpoint;
    ContentType		content_type;
	Int         	auth = Auth::none; // requires auth methods.
	RateLimit       rate_limit;
	Short			cache = 0; // 0 is no caching, cache = true / 1 is equal to cache = 86400. And anything above 1 will the use the value as max cache age.
	Bool			compress = true;
	Headers 		headers;
    String      	data; // used for direct data.
	View			view; // used for js views.
	CallBack		callback; // used for restapi / backend callbacks.
	
	// ---------------------------------------------------------
	// System attributes.
	// Should not be assigned by the user.
	
    Array<RateLimitingObject>    m_rate_limits;
    vlib::Mutex         m_mutex;
    
	// ---------------------------------------------------------
	// Functions.
    
	// Initialize
	constexpr
	auto&	initialize() {
		
		// Set content type.
		headers["Content-Type"] = content_type.str();
		
		// Set keep alive.
		headers["Keep-Alive"] = "5";
		
		// Set cache.
		if (cache == 1) {
			headers["Cache-Control"] = "max-age=86400";
		} else if (cache > 1) {
			headers["Cache-Control"] = to_str("max-age=", cache);
		}
		
		// Compress and assign view to data.
		if (compress && (data.is_defined() || view.is_defined())) {
			headers["Content-Encoding"] = "gzip";
			headers["Vary"] = "Accept-Encoding";
			if (data.is_defined()) {
				data = vlib::compress(data);
			} else {
				data = vlib::compress(view.build());
			}
		} else if (view.is_defined()) {
			data = view.build();
		}
		
		// Set method to get on views and raw data.
		if (data.is_defined() && method.is_undefined()) {
			method = vlib::http::method::get;
		}
		
		// Clean url.
		while (endpoint.len() > 1 && endpoint.last() == '/') {
			--endpoint.len();
		}
		if (endpoint.len() > 1 && endpoint.first() != '/') {
			endpoint = to_str('/', endpoint);
		}
		
		// Handler.
		return *this;
	}
	// constexpr
	// Endpoint	initialize() const {
	// 	return Endpoint(this).initialize();
	// }
	
	// Is callback.
	constexpr
	bool	is_callback() const {
		return callback.type != 0;
	}
	
	// Is html.
	constexpr
	bool	is_html() const {
		return data.is_defined();
	}
    
    // Verify rate limit.
    constexpr
    Bool    verify_rate_limit(const Len& ip) {
        
        // No rate limit.
        if (rate_limit.limit == -1) { return true; }
        
        // Vars.
        Int count;
        llong sec = Date::get_seconds();
        
        // Lock.
        m_mutex.lock();
        
        // Find ip.
		RateLimitingObject* item = NULL;
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
            item->timestamp = sec + rate_limit.duration.value();
            item->count = 1;
        } else if (sec > item->timestamp) {
            item->timestamp = sec + rate_limit.duration.value();
            item->count = 1;
        } else {
            ++item->count;
        }
        count = item->count;
        
        // Unlock.
        m_mutex.unlock();
        
        // Verify.
        if (count > rate_limit.limit) {
            return false;
        }
        return true;
    }
      
};


// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

