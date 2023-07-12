/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Static auth module.
class auth {
	
	// Sign in.
	static sign_in(params = {"email": "", "username": "", "password": "", "2fa": ""}) {
		return utils.request({
			method: "POST",
			url: "/backend/auth/signin",
			data: params,
			success: function(status, response) {
				return response;
			},
			error: function(status, response) {
				return response;
			}
		});
	}
	
	// Sign up.
	static sign_up(
		params = {
			"username": "",
			"email": "",
			"first_name": "",
			"last_name": "",
			"password": "",
			"verify_password": "",
		},
		success = null,
		error = null,
		before = null
	) {
		return utils.request({
			method: "POST",
			url: "/backend/auth/signup",
			data: params,
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Sign out.
	static sign_out(success = null, error = null, before = null) {
		return utils.request({
			method: "POST",
			url: "/backend/auth/signout",
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Activate account.
	static activate(params = {"2fa": ""}, success = null, error = null, before = null) {
		return utils.request({
			method: "POST",
			url: "/backend/auth/activate",
			data: params,
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Send 2fa.
	static send_2fa(params = {"email": ""}, success = null, error = null, before = null) {
		return utils.request({
			method: "GET",
			url: "/backend/auth/2fa",
			data: params,
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Forgot password.
	static forgot_password(params = {"email": "", "2fa": "", "password": "", "verify_password": ""}, success = null, error = null, before = null) {
		return utils.request({
			method: "GET",
			url: "/backend/auth/forgot_password",
			data: params,
			success: success,
			error: error,
			before: before,
		});
	}
	
		
}
