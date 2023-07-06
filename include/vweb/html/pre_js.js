// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Vars.
// let CONDITIONS = {{CONDITIONS}};
let generated_ids = 0;
let elements = {};
let variables = {};

// =======================================================================
// Utils.

// Is string.
function is_string(value) {
	return typeof value === 'string' || value instanceof String;
}

// Generate an id.
function vweb_generate_id() {
	++generated_ids;
	return "js_e_" + generated_ids;
}

// Get an element.
function vweb_get_element(id) {
    let cached = elements[id];
    if (cached == null) {
        elements[id] = document.getElementById(id);
        return elements[id];
    }
    return cached;
}

// Get device width.
function vweb_get_device_width() {
	return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}

// Get endpoint sub url.
function vweb_get_endpoint() {
	endpoint = window.location.href.replace("https://", "").replace("http://", "");
	endpoint = endpoint.substr(endpoint.indexOf('/'), endpoint.length);
	return endpoint;
}

// Get a cookie value by name.
function vweb_get_cookie(name) {
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

// Get user id.
function vweb_get_uid() {
    const uid = vweb_get_cookie("UserID");
	if (uid == -1) {
		return null;
	}
	return uid;
}

// Get the is user activated boolean.
function vweb_get_user_activated() {
	if (vweb_get_cookie("UserActivated") == "true") {
		return true;
	}
	return false;
}

// Request.
function vweb_request(method, url, data, success_handler, error_handler) {
	if (!is_string(data)) {
		data = JSON.stringify(data);
	}
	$.ajax({
		url: url,
		data: data,
		type: method,
		credentials: "true",
		mimeType: "application/json",
		contentType: "application/json",
		dataType: "json",
		success: function (response, status, xhr) {
			success_handler(xhr.status, response);
		},
		error: function(xhr, status, error) {
			let response;
			try {
				response = JSON.parse(xhr.responseText);
			} catch (e) {
				response = {"status": status, "error": xhr.responseText};
			}
			error_handler(xhr.status, response)
		}
	})
}

// =======================================================================
// UI.

// Is variable / device condition.
function vweb_is_variable_condition(type) {
	return type == "IfVariableEq" ||
	type == "IfVariableNotEq" ||
	type == "IfVariableGreaterEq" ||
	type == "IfVariableGreater" ||
	type == "IfVariableLesserEq" ||
	type == "IfVariableLesser" ||
	type == "IfDeviceWidthEq" ||
	type == "IfDeviceWidthNotEq" ||
	type == "IfDeviceWidthGreaterEq" ||
	type == "IfDeviceWidthGreater" ||
	type == "IfDeviceWidthLesserEq" ||
	type == "IfDeviceWidthLesser" ||
	type == "IfEndpointEq" ||
	type == "IfEndpointNotEq" ||
	type == "IfAuthenticated" ||
	type == "IfUnauthenticated" ||
	type == "IfUserActivated" ||
	type == "IfUserUnactivated";
}

// Get the required visibily of an element by a variable / device condition.
function vweb_get_visibility_by_variable_condition(element, type) {
	
	// Variable conditions.
	if (type == "IfVariableEq") {
		if (variables[element["key"]] == element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfVariableNotEq") {
		if (variables[element["key"]] != element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfVariableGreaterEq") {
		if (variables[element["key"]] >= element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfVariableGreater") {
		if (variables[element["key"]] > element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfVariableLesserEq") {
		if (variables[element["key"]] <= element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfVariableLesser") {
		if (variables[element["key"]] < element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	
	// Device conditions.
	else if (type == "IfDeviceWidthEq") {
		if (vweb_get_device_width() == element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfDeviceWidthNotEq") {
		if (vweb_get_device_width() != element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfDeviceWidthGreaterEq") {
		if (vweb_get_device_width() >= element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfDeviceWidthGreater") {
		if (vweb_get_device_width() > element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfDeviceWidthLesserEq") {
		if (vweb_get_device_width() <= element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfDeviceWidthLesser") {
		if (vweb_get_device_width() < element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	
	// Endpoint conditions.
	else if (type == "IfEndpointEq") {
		if (vweb_get_endpoint() == element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfEndpointNotEq") {
		if (vweb_get_endpoint() != element["value"]) {
			return true;
		} else {
			return false;
		}
	}
	
	// Authenticated conditions.
	else if (type == "IfAuthenticated") {
		if (vweb_get_uid() != null) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfUnauthenticated") {
		if (vweb_get_uid() == null) {
			return true;
		} else {
			return false;
		}
	}
	
	// User activated conditions.
	else if (type == "IfUserActivated") {
		if (vweb_get_uid() != null && vweb_get_user_activated() == true) {
			return true;
		} else {
			return false;
		}
	}
	else if (type == "IfUserUnactivated") {
		if (vweb_get_uid() != null && vweb_get_user_activated() == false) {
			return true;
		} else {
			return false;
		}
	}
	
	// Unknown.
	else {
		console.log("[vweb_get_visibility_by_variable_condition] ERROR: Unknown variable condition type \"" + type, "\".");
	}
	return false;
}

// Rebuild the UI after an variable change.
// Mainly checks the variable conditions.
function vweb_rebuild() {
    CONDITIONS.forEach(function(element) {
        vweb_rebuild_element(element);
    });
}

// Rebuild an element.
// Mainly checks the variable conditions.
function vweb_rebuild_element(element, hidden = false) {
	
	// Vars.
    const type = element["type"];
    const id = element["id"];
	
	// Variable conditions.
	if (vweb_is_variable_condition(type)) {
		
		// Get element.
        let e = vweb_get_element(id);
        if (e == null) {
            console.log("[vweb_build_get_element] ERROR: Unable to get element \"" + id + "\".");
            console.log(element);
            return null;
        }
		
		// Set visibility.
        const visible = vweb_get_visibility_by_variable_condition(element, type);
        // console.log(type, " ", visible, " ", element["key"], " ", element["value"]);
		
		// Apply animation.
		// Should be called before vweb_rebuild_children, otherwise it might not show up.
		const animations = element["animations"];
		if (animations != null && animations.length > 0) {
			vweb_apply_animation(e, visible ? "in" : "out", animations);
		} else {
			if (visible) {
				e.style.display = "block";
			} else {
				e.style.display = "none";
			}
		}
		
		// Rebuild children.
        vweb_rebuild_children(element["children"], !visible);
		
	}
	
	// Get element.
	else if (type == "GetElementById") {
		if (!hidden) {
            vweb_build_get_element(element);
		}
	}
	
	// Redirect.
	else if (type == "Redirect") {
		if (!hidden && (element["forced"] == true || vweb_get_endpoint() != element["url"])) {
			window.location.href = element["url"];
		}
	}
	
	// Other elements.
	else {
        vweb_rebuild_children(element["children"], hidden);
	}
	
}

// Reuild an elements children.
function vweb_rebuild_children(children, hidden) {
	if (!hidden && children != null && children.length > 0) {
		children.forEach(function(child) {
            vweb_rebuild_element(child, hidden);
		});
	}
}

// Apply style dict to an element.
function vweb_apply_style(e, element, style) {
	for (const [key, value] of Object.entries(style)) {
		
		// Make margin calculations for the flex basis.
		if (key == "flex-basis") {
			let margin_left = e.style["margin-left"];
            let margin_right = e.style["margin-right"];
			if (margin_left == null) {
				margin_left = "0px";
			}
			if (margin_right == null) {
				margin_right = "0px";
			}
            
			// V3.
            let columns = element["columns"];
			if (columns == null) {
				columns = 1;
			}
            let spacing = margin_left + " + " + margin_right;
			e.style[key] = "calc(100% / " + columns + " - (" + spacing + "))";
		}
		
		// Add style.
		else {
			e.style[key] = value;
		}
	}
}

// Build an GetElement family element.
// Only when used outside events.
function vweb_build_get_element(element) {
	if (element != null) {
		
		// Vars.
		const id = element["id"];
        const key = element["key"];
        const value = element["value"];
        const style = element["style"];
		
		// Get element.
        let e = vweb_get_element(id);
		if (e == null) {
			console.log("[vweb_build_get_element] ERROR: Unable to get element \"" + id + "\".");
			return null;
		}
		
		// Set value.
		if (key != null && value != null) {
			e[key] = value
		}
		
		// Set style.
		else if (style != null) {
			vweb_apply_style(e, element, style);
		}
		
		// Error.
		else {
			console.log("[vweb_build_get_element] ERROR: None of the element attributes are assigned.");
		}
		
	}
}

// Apply an animation from the animations array.
// When mode is "show" the first animation is applied.
// When mode is "hide" the second animation applied when present, otherwise the first.
function vweb_apply_animation(e, mode, animations) {
	if (animations != null) {
        const animation = animations[mode];
		if (animation == null) {
			console.log("[vweb_apply_animation] ERROR: Unkown animation mode \"" + mode + "\".");
			return ;
		}
		if (mode == "in") {
			e.style.display = "block"
		}
		e.style["animation-duration"] = animation["duration"] + "s";
		e.style["animation-name"] = animation["animation"];
		if (mode == "out") {
			setTimeout(function() { e.style.display = "none" }, animation["duration"] * 1000);
		}
	}
}
