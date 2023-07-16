/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// User module.
vweb.user = {};

// Get user id from cookie.
vweb.user.uid = function() {
	const i = vweb.utils.get_cookie("UserID");
	if (i == -1) {
		return null;
	}
	return i;
}

// Get username from cookie.
vweb.user.username = function() {
	const i = vweb.utils.get_cookie("UserName");
	if (i == "") {
		return null;
	}
	return i;
}

// Get email from cookie.
vweb.user.email = function() {
	const i = vweb.utils.get_cookie("UserEmail");
	if (i == "") {
		return null;
	}
	return i;
}

// Get first name from cookie.
vweb.user.first_name = function() {
	const i = vweb.utils.get_cookie("UserFirstName");
	if (i == "") {
		return null;
	}
	return i;
}

// Get last name from cookie.
vweb.user.last_name = function() {
	const i = vweb.utils.get_cookie("UserLastName");
	if (i == "") {
		return null;
	}
	return i;
}

// Get the is authenticated boolean.
vweb.user.authenticated = function() {
	return vweb.user.uid() != null;
}

// Get the is user activated boolean.
vweb.user.activated = function() {
	if (vweb.utils.get_cookie("UserActivated") == "true") {
		return true;
	}
	return false;
}

// Get user.
vweb.user.get = function({
	success = null, 
	error = null, 
	before = null
}) {
	return vweb.utils.request({
		method: "GET",
		url: "/backend/user/",
		success: success,
		error: error,
		before: before,
	});
}

// Update user.
vweb.user.set = function({
	user, 
	success = null, 
	error = null, 
	before = null
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/backend/user/",
		data: user,
		success: success,
		error: error,
		before: before,
	});
}

// Activate account.
vweb.user.activate = function({
	code = "",
	success = null,
	error = null,
	before = null
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/backend/auth/activate",
		data: {
			"2fa": code,
		},
		success: success,
		error: error,
		before: before,
	});
}

// Change password.
vweb.user.change_password = function({
	current_password = "", 
	password = "", 
	verify_password = "",
	success = null,
	error = null,
	before = null
}) {
	return vweb.utils.request({
		method: "GET",
		url: "/backend/user/change_password",
		data: {
			current_password: current_password,
			password: password,
			verify_password: verify_password,
		},
		success: success,
		error: error,
		before: before,
	});
}

// Generate api key.
vweb.user.generate_api_key = function({
	success = null, 
	error = null, 
	before = null
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/backend/user/api_key",
		success: success,
		error: error,
		before: before,
	});
}

// Revoke api key.
vweb.user.revoke_api_key = function({
	success = null, 
	error = null, 
	before = null
}) {
	return vweb.utils.request({
		method: "DELETE",
		url: "/backend/user/api_key",
		success: success,
		error: error,
		before: before,
	});
}

// Load data from the users database.
vweb.user.load = function({
	path = "",
	success = null,
	error = null,
	before = null
}) {
	return vweb.utils.request({
		method: "GET",
		url: "/backend/user/data",
		data: {
			path: path,
		},
		success: success,
		error: error,
		before: before,
	});
}

// Save data to the users database.
vweb.user.save = function({
	path = "",
	data = {},
	success = null,
	error = null,
	before = null
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/backend/user/data",
		data: {
			path: path,
			data: data,
		},
		success: success,
		error: error,
		before: before,
	});
}