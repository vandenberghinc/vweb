/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Static user module.
class user {
	
	// Get user id.
	static uid() {
		const i = utils.get_cookie("UserID");
		console.log("UID: ", i);
		if (i == -1) {
			return null;
		}
		return i;
	}
	
	// Get the is authenticated boolean.
	static authenticated() {
		return user.uid()() != null;
	}
	
	// Get the is user activated boolean.
	static activated() {
		if (utils.get_cookie("UserActivated") == "true") {
			return true;
		}
		return false;
	}
	
	// Get user.
	static get(success = null, error = null, before = null) {
		return utils.request({
			method: "GET",
			url: "/backend/user/",
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Update user.
	static set(user, success = null, error = null, before = null) {
		return utils.request({
			method: "POST",
			url: "/backend/user/",
			data: user,
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Change password.
	static change_password(params = {"current_password": "", "password": "", "verify_password": ""}, success = null, error = null, before = null) {
		return utils.request({
			method: "GET",
			url: "/backend/user/change_password",
			data: params,
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Generate api key.
	static generate_api_key(success = null, error = null, before = null) {
		return utils.request({
			method: "POST",
			url: "/backend/user/api_key",
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Revoke api key.
	static revoke_api_key(success = null, error = null, before = null) {
		return utils.request({
			method: "DELETE",
			url: "/backend/user/api_key",
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Load data from the users database.
	static load(params = {"path": ""}, success = null, error = null, before = null) {
		return utils.request({
			method: "GET",
			url: "/backend/user/data",
			data: params,
			success: success,
			error: error,
			before: before,
		});
	}
	
	// Save data to the users database.
	static save(params = {"path": "", "data": {}}, success = null, error = null, before = null) {
		return utils.request({
			method: "POST",
			url: "/backend/user/data",
			data: params,
			success: success,
			error: error,
			before: before,
		});
	}
		
}
