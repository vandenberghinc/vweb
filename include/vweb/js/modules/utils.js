/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// System functions.

// Static utils module.
class utils {
	
	// Is string.
	static is_string(value) {
		return typeof value === 'string' || value instanceof String;
	}
	
	// Is numeric.
	static is_numeric(value) {
	  return typeof value === 'number' && Number.isFinite(value);
	}

	// Is int.
	static is_int(value) {
	  return typeof value === 'number' && Number.isInteger(value);
	}

	// Is float.
	static is_float(value) {
	  return typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value);
	}

	// Is function.
	static is_func(value) {
		return typeof myVariable === 'function';
	}
	
	// Equals.
	static eq(x, y) {
		return x == y;
	}
	static not_eq(x, y) {
		return x != y;
	}
	
	// Greater than.
	static gt(x, y) {
		return x > y;
	}
	static gt_eq(x, y) {
		return x >= y;
	}
	
	// Lesser than.
	static lt(x, y) {
		return x < y;
	}
	static lt_eq(x, y) {
		return x <= y;
	}
	
	// Get device width.
	static get_device_width() {
		return (window.innerWidth > 0) ? window.innerWidth : screen.width;
	}
	
	// Get endpoint sub url.
	static get_endpoint() {
		endpoint = window.location.href.replace("https://", "").replace("http://", "");
		endpoint = endpoint.substr(endpoint.indexOf('/'), endpoint.length);
		return endpoint;
	}
	
	// Get a cookie value by name.
	static get_cookie(name) {
		let index = document.cookie.indexOf(name + "=");
		if (index == -1) {
			return null;
		}
		index += name.length + 1;
		const value = document.cookie.substr(index, document.cookie.length);
		if (value == null) { return null; }
		index = value.indexOf(';');
		if (index == -1) {
			return value;
		}
		return value.substr(0, index);
	}

	// Redirect.
	static redirect(url, forced = false) {
		if (forced || utils.get_endpoint() != url) {
			window.location.href = url;
		}
	}

	// Delay.
	static delay(mseconds, func) {
		setTimeout(mseconds, func);
	}
	
	// URL param.
	static get_url_param(name) {
		const params = new URLSearchParams(window.location.search);
		return params.get(name);
	}
	
	// Url encode.
	static url_encode(params) {
		const encodedParams = [];
		for (const key in params) {
			if (params.hasOwnProperty(key)) {
				const encodedKey = encodeURIComponent(key);
				const encodedValue = encodeURIComponent(params[key]);
				encodedParams.push(`${encodedKey}=${encodedValue}`);
			}
		}
		return encodedParams.join('&');
	}
	
	// Request.
	static request(params = {
		method: null,
		url: null,
		data: null,
		success: null,
		error: null,
		before: null,
	}) {
		if (params.data != null && !utils.is_string(params.data)) {
			params.data = JSON.stringify(params.data);
		}
		if (params.before != null) {
			params.before();
		}
		$.ajax({
			url: params.url,
			data: params.data,
			type: params.method,
			credentials: "true",
			mimeType: "application/json",
			contentType: "application/json",
			dataType: "json",
			success: function (response, status, xhr) {
				return params.success(xhr.status, response);
			},
			error: function(xhr, status, error) {
				let response;
				try {
					response = JSON.parse(xhr.responseText);
				} catch (e) {
					response = {"status": status, "error": xhr.responseText};
				}
				return params.error(xhr.status, response)
			}
		})
	}
	
	// On content loaded.
	static on_content_loaded(func) {
		document.addEventListener("DOMContentLoaded", func);
	}
	
};
