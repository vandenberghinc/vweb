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

// Is an even number.
vweb.utils.is_even = function(number) {
	return number % 2 === 0;
}

// Make immutable.
/* 	@docs:
 *	chapter: Client
 *	@title: Make Immutable
 *	@desc: 
 * 		Make all objects of an array or object immutable. All the nested objects of nested arrays or object will also be made immutable recursively.
 *	@param:
 *		@name: object
 *		@desc: The array or object to freeze.
 *		@type: array, object 
 */
vweb.utils.make_immutable = (object) => {
	if (Array.isArray(object)) {
		Object.freeze(object);
		for (let i = 0; i < object.length; i++) {
			if (object[i] !== null && typeof object[i] === "object") {
				object[i] = vweb.utils.make_immutable(object[i])
			}
		}
	}
	else if (object !== null && typeof object === "object") {
		Object.freeze(object);
		Object.keys(object).iterate((key) => {
			if (object[key] !== null && typeof object[key] === "object") {
				object[key] = vweb.utils.make_immutable(object[key])
			}
		})
	}
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

// Round to decimals.
vweb.utils.round = function(value, decimals) {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
}

// Get device width.
vweb.utils.device_width = function() {
	return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}

// Get device height.
vweb.utils.device_height = function() {
	return (window.innerHeight > 0) ? window.innerHeight : screen.height;
}

// Get the endpoint sub url of a full domain url.
// When parameter "url" is undefined it uses the current url.
vweb.utils.endpoint = function(url) {
	if (url == null) {
		return vweb.utils.endpoint(window.location.href);	
	} else {

		// strip http:// etc.
		let endpoint = url.replace("https://", "").replace("http://", "");

		// Remove domain.
		endpoint = endpoint.substr(endpoint.indexOf('/'), endpoint.length);

		// Strip query.
		let end;
		if ((end = endpoint.indexOf("?")) !== -1) {
			endpoint = endpoint.substr(0, end);
		}

		// Clean.
		endpoint = endpoint.replaceAll("//", "/");

		// Remove last slash.
		if (endpoint.length == 0) {
			return '/'
		} else {
			while (endpoint.length > 1 && endpoint[endpoint.length - 1] == '/') {
				endpoint = endpoint.substr(0, endpoint.length - 1);
			}
		}
		return endpoint;
	}
}

// Check if the cookies need to be parsed again.
vweb.utils.cookies_parse_required = function() {
	return document.cookie !== this._last_cookies;
}

// Get the cookies.
vweb.utils.cookies = function() {
	if (this.cookies_parse_required() === false) {
		return this._cookies;
	}

	// Attributes.
	this._cookies = {};
	this._last_cookies = document.cookie;

	// Vars.
	let is_key = true, is_str = null;
	let key = "", value = "";

	// Wrapper.
	const append = () => {
		if (key.length > 0) {
			this._cookies[key] = value;
		}
		value = "";
		key = "";
		is_key = true;
		is_str = null;
	}

	// Parse.
	for (let i = 0; i < document.cookie.length; i++) {
		const c = document.cookie.charAt(i);

		// Is key.
		if (is_key) {
			if (c === " " || c === "\t") {
				continue;
			}
			else if (c === "=") {
				is_key = false;
			} else {
				key += c;
			}
		}

		// Is value.
		else {

			// End of string.
			if (is_str != null && is_str === c) {
				value = value.substr(1, value.length - 1);
				append();
			}

			// End of cookie.
			else if (c === ";") {
				append();
			}

			// Append to value.
			else {
				// Start of string.
				if (value.length === 0 && (c === "\"" || c=== "'")) {
					is_str = c;
				}
				value += c;
			}
		}
	}
	append();
	return this._cookies;
}

// Get a cookie value by name.
vweb.utils.cookie = function(name) {
	return vweb.utils.cookies()[name];
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
	// for (const key in params) {
		// if (params.hasOwnProperty(key)) {
	Object.keys(params).iterate((key) => {
		const encodedKey = encodeURIComponent(key);
		const encodedValue = encodeURIComponent(params[key]);
		encodedParams.push(`${encodedKey}=${encodedValue}`);
	});
	return encodedParams.join('&');
}

// Copy text to the clipboard.
vweb.utils.copy_to_clipboard = async function(text) {
	return new Promise((resolve, reject) => {
		navigator.clipboard.writeText(text)
		.then((args) => {
			resolve(args)
		})
		.catch((err) => {
			reject(err)
		});
	});
}

// Request.
vweb.utils.request = function({
	method = "GET",			// method.
	url = null,				// url or endpoint.
	data = null,			// data or params.
	json = true, 			// json response.
	credentials = "true",
}) {
	if (data != null && !vweb.utils.is_string(data)) {
		data = JSON.stringify(data);
	}
	return new Promise((resolve, reject) => {
		$.ajax({
			type: method,
			url: url,
			data: data,
			dataType: json ? "json" : null,
			mimeType: json ? "application/json" : "text/plain",
			contentType: "application/json",
			credentials: credentials,
			async: true,
			success: function (data, _, xhr) {
				resolve(data, xhr.status, xhr);
			},
			error: function(xhr, status, e) {
				let response;
				try {
					response = JSON.parse(xhr.responseText);
					if (response.status === undefined) {
						response.status = xhr.status;
					}
				} catch (err) {
					response = {error: xhr.responseText == null ? e : xhr.responseText, status: xhr.status};
				}
				reject(response)
			}
		})
	});
}
// vweb.utils.request = function({
// 	method = "GET",
// 	url = null,
// 	data = null,
// 	async = true,
// 	success = null,
// 	error = null,
// 	before = null,
// }) {
// 	if (data != null && !vweb.utils.is_string(data)) {
// 		data = JSON.stringify(data);
// 	}
// 	if (before != null) {
// 		before();
// 	}
// 	return $.ajax({
// 		url: url,
// 		data: data,
// 		type: method,
// 		async: async,
// 		credentials: "true",
// 		mimeType: "application/json",
// 		contentType: "application/json",
// 		dataType: "json",
// 		success: function (response, status, xhr) {
// 			if (success == null) { return null; }
// 			return success(xhr.status, response);
// 		},
// 		error: function(xhr, status, e) {
// 			if (error == null) { return null; }
// 			let response;
// 			try {
// 				response = JSON.parse(xhr.responseText);
// 			} catch (e) {
// 				response = {"error": xhr.responseText == null ? e : xhr.responseText};
// 			}
// 			return error(xhr.status, response)
// 		}
// 	})
// }

// On content loaded.
vweb.utils.on_load = function(func) {
	document.addEventListener("DOMContentLoaded", async () => {
		let e = func();
		if (e instanceof Promise) {
			try {
				e = await e;
			} catch (err) {
				console.error(err);
				return null;
			}
		}
		if (e != null) {
			document.body.appendChild(e);
		}
	});
}

// Convert a unix timestamp in seconds or ms to the user's date format.
vweb.utils.unix_to_date = function(unix, mseconds = false) {
	const date = new Date(mseconds ? unix : unix * 1000);
	const lang = navigator.language || navigator.userLanguage;
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	let options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		timeZone: tz,
	};
	const date_format = new Intl.DateTimeFormat(lang, options).format(date);
	options = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: lang.toLowerCase().includes("en"),
		timeZone: tz,
	}
	const time_format = new Intl.DateTimeFormat(lang, options).format(date);
	return `${date_format} ${time_format}`;
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

// Fuzzy search.
/* 	@docs:
 * 	@title: Fuzzy Search
 * 	@description:
 *		Perform a fuzzy similairity match between a query and an array of targets.
 *	@type: number
 * 	@return:
 *		Returns an array with the targets sorted from best match to lowest match, unless parameter `get_matches` is enabled.
 * 	@param:
 * 		@name: query
 * 		@description: The search query.
 * 		@type: string
 * 	@param:
 * 		@name: targets
 * 		@description: 
 *			The target with target strings.
 *			When the nested items are objects then the parameter `key` should be defined to retrieve the query string.
 *			When the nested items are arrays then the first value of the array will be used as the query string.
 * 		@type: array[string, object, array]
 * 	@param:
 * 		@name: limit
 * 		@description: Limit the number of results. Define the limit as `null` or `-1` to set no limit.
 * 		@type: number
 * 	@param:
 * 		@name: case_match
 * 		@description:
 *			When the `case_match` flag is enabled the similairity match is capital sensitive.
 * 		@type: boolean
 * 	@param:
 * 		@name: allow_exceeding_chars
 * 		@description: 
 *			Allow matches where the single character count of the search query exceeds that of the single character count of the target.
 *			So when the query is "aa" and the target is "a" then no match will be given since the "a" count of the target (2) is higher than the "a" count of the query (1).
 * 		@type: boolean
 * 	@param:
 * 		@name: get_matches
 * 		@description:
 *			When the `get_matches` flag is enabled the function returns an array with nested arrays containing the similairity match `[similairity <number>, <target>]`.
 * 		@type: boolean
 * 	@param:
 * 		@name: key
 * 		@description: The key for the query string when the array's target items are objects. The key may also be an array with keys to use the best match of the key's value.
 * 		@type: string, array[string]
 * 	@param:
 * 		@name: nested_key
 * 		@description:
 *			When the target items are objects and the object may have nested children that also should be searched, then the `nested_key` parameter can be defined to define the key used for the nested children.
 *			The value for the nested key should also be an array of objects and use the same structure for parameter `key`, otherwise it will cause undefined behaviour.
 *			The nested key will be ignored if the nested key does not exist in a target object.
 * 		@type: string
 */
vweb.utils.fuzzy_search = ({
	query, 
	targets = [], 
	limit = 25,
	case_match = false,
	allow_exceeding_chars = true,
	get_matches = false,
	key = null, 
	nested_key = null,
}) => {

	// Checks.
	if (query == null) {
		throw Error("Define parameter \"query\".");
	}

	// Vars.
	const is_obj = targets.length > 0 && typeof targets[0] === "object";
	const is_array = targets.length > 0 && Array.isArray(targets[0]);
	if (is_obj && key == null) { key = "query"; }
	const is_key_array = Array.isArray(key);
	const results = [];
	if (case_match === false) { query = query.toLowerCase(); }

	// Calculate the similairities.
	const calc_sims = (targets = []) => {
		for (let i = 0; i < targets.length; i++) {
			let match;
			if (is_array) {
				if (targets[i] == null) { continue; }
				match = vweb.utils.fuzzy_match(
					query, 
					case_match ? targets[i] : targets[i].toLowerCase(),
					allow_exceeding_chars
				);
			} else if (is_obj) {
				const target = targets[i];
				if (is_key_array) {
					let min_match = null;
					for (let k = 0; k < key.length; k++) {
						if (target[key[k]] == null) { continue; }
						match = vweb.utils.fuzzy_match(
							query, 
							case_match ? target[key[k]] : target[key[k]].toLowerCase(),
							allow_exceeding_chars
						);
						if (match != null && (min_match === null || match < min_match)) {
							min_match = match;
						}
					}
					match = min_match;
				} else {
					if (target[key] == null) { continue; }
					match = vweb.utils.fuzzy_match(
						query,
						case_match ? target[key] : target[key].toLowerCase(),
						allow_exceeding_chars
					);
				}
				if (nested_key !== null && target[nested_key] != null) {
					calc_sims(target[nested_key]);
				}
			} else {
				match = vweb.utils.fuzzy_match(
					query,
					case_match ? targets[i][0] : targets[i][0].toLowerCase(),
					allow_exceeding_chars
				);
			}
			if (match !== null) {
				results.push([match, targets[i]]);
			}
		}
	}

	// Calculate the similairities.
	calc_sims(targets);

	// Sort the results.
	results.sort((a, b) => b[0] - a[0]);

	// Limit the results.
	if (limit !== null && limit >= 0 && results.length > limit) {
		results.length = limit;
	}

	// Convert the results to targets only.
	if (get_matches === false) {
		let converted = [];
		results.iterate((item) => {
			converted.push(item[1]);
		})
		return converted;
	}

	// Return the results.
	return results;
}

// Fuzzy match.
// Inspired by https://github.com/farzher/fuzzysort/blob/master/fuzzysort.js#L450.
/* 	@docs:
 * 	@title: Fuzzy Match
 * 	@description:
 *		Perform a fuzzy similairity match between a query and a target.
 *	@type: number
 * 	@return:
 *		Returns a floating number indicating the similairity a lower value represents a better match.
 * 	@param:
 * 		@name: search
 * 		@description: The search query.
 * 		@type: string
 * 	@param:
 * 		@name: target
 * 		@description: The target string.
 * 		@type: string
 * 	@param:
 * 		@name: allow_exceeding_chars
 * 		@description: 
 *			Allow matches where the single character count of the search query exceeds that of the single character count of the target.
 *			So when the query is "aa" and the target is "a" then no match will be given since the "a" count of the target (2) is higher than the "a" count of the query (1).
 *			The function returns `null` when this flag is enabled and detected.
 * 		@type: boolean
 */
vweb.utils.fuzzy_match = (search, target, allow_exceeding_chars = true) => {

	// Check exceeding chars.
	if (allow_exceeding_chars === false) {
	
		// Exceeding length.
	    if (search.length > target.length) {
	        return null;
	    }

	    // Create the target count.
	    let text_count = {};
	    for (let i = 0; i < target.length; i++) {
	        const c = target.charAt(i);
	        if (text_count[c] == null) {
	            text_count[c] = 1;
	        } else {
	            ++text_count[c];
	        }
	    }

	    // Create the query count.
	    let query_count = {};
	    for (let i = 0; i < search.length; i++) {
	        const c = search.charAt(i);
	        if (query_count[c] == null) {
	            query_count[c] = 1;
	        } else {
	            ++query_count[c];
	        }
	        if (text_count[c] == null || query_count[c] > text_count[c]) {
	            return null;
	        }
	    }
	}

	// Wrappers.
    const get_search_code = (index) => {
        if (index >= 0 && index < search.length) {
            return search.charCodeAt(index);
        }
        return -1;
    };
    const get_target_code = (index) => {
        if (index >= 0 && index < target.length) {
            return target.charCodeAt(index);
        }
        return -1;
    };
    var prepareBeginningIndexes = (target) => {
        var targetLen = target.length
        var beginningIndexes = []; var beginningIndexesLen = 0
        var wasUpper = false
        var wasAlphanum = false
        for(var i = 0; i < targetLen; ++i) {
            var targetCode = target.charCodeAt(i)
            var isUpper = targetCode>=65&&targetCode<=90
            var isAlphanum = isUpper || targetCode>=97&&targetCode<=122 || targetCode>=48&&targetCode<=57
            var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum
            wasUpper = isUpper
            wasAlphanum = isAlphanum
            if(isBeginning) beginningIndexes[beginningIndexesLen++] = i
        }
        return beginningIndexes
    }
    var prepareNextBeginningIndexes = (target) => {
        var targetLen = target.length
        var beginningIndexes = prepareBeginningIndexes(target)
        var nextBeginningIndexes = []; // new Array(targetLen)     sparse array is too slow
        var lastIsBeginning = beginningIndexes[0]
        var lastIsBeginningI = 0
        for(var i = 0; i < targetLen; ++i) {
            if(lastIsBeginning > i) {
                nextBeginningIndexes[i] = lastIsBeginning
            } else {
                lastIsBeginning = beginningIndexes[++lastIsBeginningI]
                nextBeginningIndexes[i] = lastIsBeginning===undefined ? targetLen : lastIsBeginning
            }
        }
        return nextBeginningIndexes
    }

    // Vars.
    let searchI = 0;
    let searchLen = search.length;
    let searchCode = get_search_code(searchI);
    let searchLower = search.toLowerCase();
    let targetI = 0;
    let targetLen = target.length;
    let targetCode = get_target_code(targetI);
    let targetLower = target.toLowerCase();
    let matchesSimple = [];
    let matchesSimpleLen = 0;
    let successStrict = false
    let matchesStrict = [];
    let matchesStrictLen = 0

    // very basic fuzzy match; to remove non-matching targets ASAP!
    // walk through target. find sequential matches.
    // if all chars aren't found then exit
    for(;;) {
        var isMatch = searchCode === get_target_code(targetI)
        if(isMatch) {
            matchesSimple[matchesSimpleLen++] = targetI
            ++searchI;
            if(searchI === searchLen) break
            searchCode = get_search_code(searchI)
        }
        ++targetI;
        if(targetI >= targetLen) {
            return null
        } // Failed to find searchI
    }

    searchI = 0
    targetI = 0

    // var nextBeginningIndexes = prepared._nextBeginningIndexes
    // if(nextBeginningIndexes === NULL) nextBeginningIndexes = prepared._nextBeginningIndexes = prepareNextBeginningIndexes(prepared.target)
    nextBeginningIndexes = prepareNextBeginningIndexes(target);
    var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1];
    // const nextBeginningIndexes = [0];

    // Our target string successfully matched all characters in sequence!
    // Let's try a more advanced and strict test to improve the score
    // only count it as a match if it's consecutive or a beginning character!
    var backtrackCount = 0
    if(targetI !== targetLen) {
        for(;;) {
            if(targetI >= targetLen) {

                // We failed to find a good spot for this search char, go back to the previous search char and force it forward
                if(searchI <= 0) break // We failed to push chars forward for a better match

                ++backtrackCount; if(backtrackCount > 200) break // exponential backtracking is taking too long, just give up and return a bad match

                --searchI
                var lastMatch = matchesStrict[--matchesStrictLen]
                targetI = nextBeginningIndexes[lastMatch]

            } else {
                var isMatch = get_search_code(searchI) === get_target_code(targetI)
                if(isMatch) {
                    matchesStrict[matchesStrictLen++] = targetI
                    ++searchI; if(searchI === searchLen) { successStrict = true; break }
                    ++targetI
                } else {
                    targetI = nextBeginningIndexes[targetI]
                }
            }
        }
    }

    // check if it's a substring match
    var substringIndex = targetLower.indexOf(searchLower, matchesSimple[0]); // perf: this is slow
    var isSubstring = ~substringIndex;
    if(isSubstring && !successStrict) { // rewrite the indexes from basic to the substring
        for(var i=0; i<matchesSimpleLen; ++i) {
            matchesSimple[i] = substringIndex+i
        }
    }
    var isSubstringBeginning = false;
    if(isSubstring) {
        isSubstringBeginning = nextBeginningIndexes[substringIndex-1] === substringIndex
    }


    // tally up the score & keep track of matches for highlighting later
    {
        if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen }
        else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen }

        var score = 0

        var extraMatchGroupCount = 0
        for(var i = 1; i < searchLen; ++i) {
            if(matchesBest[i] - matchesBest[i-1] !== 1) {
                score -= matchesBest[i]; 
                ++extraMatchGroupCount
            }
        }
        var unmatchedDistance = matchesBest[searchLen-1] - matchesBest[0] - (searchLen-1)

        score -= (12+unmatchedDistance) * extraMatchGroupCount // penality for more groups

        if(matchesBest[0] !== 0) score -= matchesBest[0]*matchesBest[0]*.2 // penality for not starting near the beginning

        if(!successStrict) {
            score *= 1000
        } else {
        
            // successStrict on a target with too many beginning indexes loses points for being a bad target
            var uniqueBeginningIndexes = 1
            for(var i = nextBeginningIndexes[0]; i < targetLen; i=nextBeginningIndexes[i]) {
                ++uniqueBeginningIndexes
            }

            if(uniqueBeginningIndexes > 24) score *= (uniqueBeginningIndexes-24)*10 // quite arbitrary numbers here ...
        }

        if(isSubstring)          score /= 1+searchLen*searchLen*1; // bonus for being a full substring
        if(isSubstringBeginning) score /= 1+searchLen*searchLen*1; // bonus for substring starting on a beginningIndex

        score -= targetLen - searchLen; // penality for longer targets
        // prepared.score = score

        // for(var i = 0; i < matchesBestLen; ++i) prepared._indexes[i] = matchesBest[i]
        // prepared._indexes.len = matchesBestLen
        return score
    }
}
