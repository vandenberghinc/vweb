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
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/vweb/backend/auth/signin",
		data: {
			email: email,
			username: username,
			password: password,
			"2fa": code,
		},
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
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/vweb/backend/auth/signup",
		data: {
			username: username,
			email: email,
			first_name: first_name,
			last_name: last_name,
			password: password,
			verify_password: verify_password,
		},
	});
}

// Sign out.
vweb.auth.sign_out = function() {
	return vweb.utils.request({
		method: "POST",
		url: "/vweb/backend/auth/signout",
	});
}

// Send 2fa.
vweb.auth.send_2fa = function(email = "") {
	return vweb.utils.request({
		method: "GET",
		url: "/vweb/backend/auth/2fa",
		data: {
			email:email,
		},
	});
}

// Forgot password.
vweb.auth.forgot_password = function({
	email = "",
	code = "",
	password = "",
	verify_password = "",
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/vweb/backend/auth/forgot_password",
		data: {
			email: email,
			"2fa": code,
			password: password,
			verify_password: verify_password,
		},
	});
}
