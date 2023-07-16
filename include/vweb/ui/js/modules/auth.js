/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Auth module.
vweb.auth = {};

// Sign in.
vweb.auth.sign_in = function({
	email = "",
	username = "",
	password = "",
	code = "",
	success = null,
	error = null,
	before = null,
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/backend/auth/signin",
		data: {
			email: email,
			username: username,
			password: password,
			"2fa": code,
		},
		success: success,
		error: error,
		before: before,
	});
}

// Sign up.
vweb.auth.sign_up = function({
	username = "",
	email = "",
	first_name = "",
	last_name = "",
	password = "",
	verify_password = "",
	success = null,
	error = null,
	before = null
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/backend/auth/signup",
		data: {
			username: username,
			email: email,
			first_name: first_name,
			last_name: last_name,
			password: password,
			verify_password: verify_password,
		},
		success: success,
		error: error,
		before: before,
	});
}

// Sign out.
vweb.auth.sign_out = function({
	success = null, 
	error = null, 
	before = null
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/backend/auth/signout",
		success: success,
		error: error,
		before: before,
	});
}

// Send 2fa.
vweb.auth.send_2fa = function({
	email = "", 
	success = null, 
	error = null, 
	before = null
}) {
	return vweb.utils.request({
		method: "GET",
		url: "/backend/auth/2fa",
		data: {
			email:email,
		},
		success: success,
		error: error,
		before: before,
	});
}

// Forgot password.
vweb.auth.forgot_password = function({
	email = "",
	code = "",
	password = "",
	verify_password = "",
	success = null,
	error = null,
	before = null
}) {
	return vweb.utils.request({
		method: "GET",
		url: "/backend/auth/forgot_password",
		data: {
			email: email,
			"2fa": code,
			password: password,
			verify_password: verify_password,
		},
		success: success,
		error: error,
		before: before,
	});
}
