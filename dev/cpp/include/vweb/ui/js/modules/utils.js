/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Utils module.
vweb.utils = {};
	
// Is string.
vweb.utils.is_string = function(value) {
	return typeof value === 'string' || value instanceof String;
}

// Is numeric.
vweb.utils.is_numeric = function(value) {
  	return typeof value === 'number' && Number.isFinite(value);
}

// Is int.
vweb.utils.is_int = function(value) {
  	return typeof value === 'number' && Number.isInteger(value);
}

// Is float.
vweb.utils.is_float = function(value) {
  	return typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value);
}

// Is function.
vweb.utils.is_func = function(value) {
	return typeof value === 'function';
}

// Is array.
vweb.utils.is_array = function(value) {
	return Array.isArray(value);
}

// Is object.
vweb.utils.is_obj = function(value) {
	return typeof value === 'object';
}

// Equals.
// vweb.utils.eq = function(x, y) {
// 	return x == y;
// }
// vweb.utils.not_eq = function(x, y) {
// 	return x != y;
// }

// Greater than.
// vweb.utils.gt = function(x, y) {
// 	return x > y;
// }
// vweb.utils.gt_eq = function(x, y) {
// 	return x >= y;
// }

// Lesser than.
// vweb.utils.lt = function(x, y) {
// 	return x < y;
// }
// vweb.utils.lt_eq = function(x, y) {
// 	return x <= y;
// }

// Get device width.
vweb.utils.device_width = function() {
	return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}

// Get device height.
vweb.utils.device_height = function() {
	return (window.innerHeight > 0) ? window.innerHeight : screen.height;
}

// Get endpoint sub url.
vweb.utils.endpoint = function() {
	endpoint = window.location.href.replace("https://", "").replace("http://", "");
	endpoint = endpoint.substr(endpoint.indexOf('/'), endpoint.length);
	endpoint = endpoint.replaceAll("//", "/");
	if (endpoint.length == 0) {
		return '/'
	} else {
		while (endpoint.length > 1 && endpoint[endpoint.length - 1] == '/') {
			endpoint = endpoint.substr(0, endpoint.length - 1);
		}
	}
	return endpoint;
}

// Get a cookie value by name.
vweb.utils.cookie = function(name) {
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

// Get style name for vendor prefix.
// vweb.utils.get_vendor_prefix_property = function(property, style) {
// 	if (vweb.utils.vendor_prefix_cache[property]) {
// 		return vweb.utils.vendor_prefix_cache[property];
// 	}
// 	const vendors = ['webkit', 'moz', 'ms', 'o'];
// 	for (let i = 0; i < vendors.length; i++) {
// 		let vendor_property = "-";
// 		vendor_property += vendors[i];
// 		vendor_property += "-";
// 		vendor_property += property;
// 		if (property in style) {
// 			vweb.utils.vendor_prefix_cache[property] = vendor_property;
// 			return vendor_property;
// 		}
// 	}
// 	vweb.utils.vendor_prefix_cache[property] = property;
// 	return property;
// }

// Redirect.
vweb.utils.redirect = function(url, forced = false) {
	if (forced || vweb.utils.endpoint() != url) {
		window.location.href = url;
	}
}

// Delay.
vweb.utils.delay = function(mseconds, func) {
	setTimeout(() => func(), mseconds);
}

// URL param.
vweb.utils.url_param = function(name, def = null) {
	const params = new URLSearchParams(window.location.search);
	const param = params.get(name);
	if (param == null || param == "") {
		return def;
	}
	return param;
}

// Url encode.
vweb.utils.url_encode = function(params) {
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
vweb.utils.request = function({
	method = :GET,
	url = null,
	data = null,
	async = true,
	success = null,
	error = null,
	before = null,
}) {
	if (data != null && !vweb.utils.is_string(data)) {
		data = JSON.stringify(data);
	}
	if (before != null) {
		before();
	}
	$.ajax({
		url: url,
		data: data,
		type: method,
		async: async,
		credentials: "true",
		mimeType: "application/json",
		contentType: "application/json",
		dataType: "json",
		success: function (response, status, xhr) {
			if (success == null) { return null; }
			return success(xhr.status, response);
		},
		error: function(xhr, status, e) {
			if (error == null) { return null; }
			let response;
			try {
				response = JSON.parse(xhr.responseText);
			} catch (e) {
				response = {"error": xhr.responseText == null ? e : xhr.responseText};
			}
			return error(xhr.status, response)
		}
	})
}

// On content loaded.
vweb.utils.on_load = function(func) {
	document.addEventListener("DOMContentLoaded", function() {
		let e = func();
		if (e != null) {
			document.body.appendChild(e);
		}
	});
}

// Compress.
vweb.utils.compress = function(data, options = {level: 9}) {
	if (vweb.utils.is_array(data) || vweb.utils.is_obj(data)) {
		data = JSON.stringify(data);
	}
	return pako.gzip(data, options);
};

// Decompress.
// Valid types are: [string, array, object].
vweb.utils.decompress = function(data, type = "string") {
	let decompressed = pako.gzip(data, opts);
	if (type == "array" || type == "object") {
		return JSON.parse(decompressed);
	}
	return decompressed;
};
