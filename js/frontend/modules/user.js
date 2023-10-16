/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// User module.
vweb.user = {};

// Reset all cached values.
vweb.user._reset = function() {
	this._uid = undefined;
	this._username = undefined;
	this._email = undefined;
	this._first_name = undefined;
	this._last_name = undefined;
	this._is_authenticated = undefined;
	this._is_activated = undefined;
}

// Get user id from cookie.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: UID
 *	@description: Get the user id of the authenticated user.
 *	@type: null, number
 *	@return: Returns the user id when the user is authenticated and `null` when the user is not authenticated.
 */
vweb.user.uid = function() {
	if (vweb.utils.cookies_parse_required()) {
		this._reset();
	}
	else if (this._uid !== undefined) {
		return this._uid;
	}
	this._uid = vweb.utils.cookie("UserID");
	if (this._uid == "-1") {
		this._uid = null;
	}
	else if (this._uid !== null) {
		this._uid = parseInt(this._uid);
		if (isNaN(this._uid)) {
			this._uid = null;
		}
	}
	return this._uid;
}

// Get username from cookie.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Username
 *	@description: Get the username of the authenticated user.
 *	@type: null, string
 *	@return: Returns the user's username when the user is authenticated and `null` when the user is not authenticated.
 */
vweb.user.username = function() {
	if (vweb.utils.cookies_parse_required()) {
		this._reset();
	}
	else if (this._username !== undefined) {
		return this._username;
	}
	this._username = vweb.utils.cookie("UserName");
	if (this._username == "") {
		this._username = null;
	}
	return this._username;
}

// Get email from cookie.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Email
 *	@description: Get the email of the authenticated user.
 *	@type: null, string
 *	@return: Returns the user's email when the user is authenticated and `null` when the user is not authenticated.
 */
vweb.user.email = function() {
	if (vweb.utils.cookies_parse_required()) {
		this._reset();
	}
	else if (this._email !== undefined) {
		return this._email;
	}
	this._email = vweb.utils.cookie("UserEmail");
	if (this._email == "") {
		this._email = null;
	}
	return this._email;
}

// Get first name from cookie.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: First Name
 *	@description: Get the first name of the authenticated user.
 *	@type: null, string
 *	@return: Returns the user's first name when the user is authenticated and `null` when the user is not authenticated.
 */
vweb.user.first_name = function() {
	if (vweb.utils.cookies_parse_required()) {
		this._reset();
	}
	else if (this._first_name !== undefined) {
		return this._first_name;
	}
	this._first_name = vweb.utils.cookie("UserFirstName");
	if (this._first_name == "") {
		this._first_name = null;
	}
	return this._first_name;
}

// Get last name from cookie.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Last Name
 *	@description: Get the last anme of the authenticated user.
 *	@type: null, string
 *	@return: Returns the user's last anme when the user is authenticated and `null` when the user is not authenticated.
 */
vweb.user.last_name = function() {
	if (vweb.utils.cookies_parse_required()) {
		this._reset();
	}
	else if (this._last_name !== undefined) {
		return this._last_name;
	}
	this._last_name = vweb.utils.cookie("UserLastName");
	if (this._last_name == "") {
		this._last_name = null;
	}
	return this._last_name;
}

// Get the is authenticated boolean.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Is Authenticated
 *	@description: Check if the current user is authenticated.
 *	@type: boolean
 *	@return: Returns a boolean indicating whether the current user is authenticated.
 */
vweb.user.is_authenticated = function() {
	if (vweb.utils.cookies_parse_required()) {
		this._reset();
	}
	else if (this._is_authenticated !== undefined) {
		return this._is_authenticated;
	}
	this._is_authenticated = this.uid() != null;
	return this._is_authenticated;
}

// Get the is user activated boolean.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Is Activated
 *	@description: Check if the current user is activated.
 *	@type: boolean
 *	@return: Returns a boolean indicating whether the current user is activated.
 */
vweb.user.is_activated = function() {
	if (vweb.utils.cookies_parse_required()) {
		this._reset();
	}
	else if (this._is_activated !== undefined) {
		return this._is_activated;
	}
	this._is_activated = vweb.utils.cookie("UserActivated") === "true";
	return this._is_activated;
}

// Get user.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Get
 *	@description: Get the authenticated user object.
 *	@type: Promise
 *	@return: Returns a promise with the authenticated user's object as promise and a request error on a failed request.
 */
vweb.user.get = function() {
	return vweb.utils.request({
		method: "GET",
		url: "/vweb/backend/user/",
	});
}

// Update user.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Set
 *	@description: Update the authenticated user object.
 *	@type: Promise
 *	@return: Returns a promise with the with a successfull update response and a request error on a failed request.
 */
vweb.user.set = function(user) {
	return vweb.utils.request({
		method: "POST",
		url: "/vweb/backend/user/",
		data: user,
	});
}

// Activate account.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Activate
 *	@description: Activate the authenticated user.
 *	@type: Promise
 *	@return: Returns a promise with the with a successfull update response and a request error on a failed request.
 */
vweb.user.activate = function(code = "") {
	return vweb.utils.request({
		method: "POST",
		url: "/vweb/backend/auth/activate",
		data: {
			"2fa": code,
		},
	});
}

// Change password.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Change Password
 *	@description: Change the password of the authenticated user.
 *	@type: Promise
 *	@return: Returns a promise with the with a successfull update response and a request error on a failed request.
 */
vweb.user.change_password = function({
	current_password = "", 
	password = "", 
	verify_password = "",
}) {
	return vweb.utils.request({
		method: "POST",
		url: "/vweb/backend/user/change_password",
		data: {
			current_password: current_password,
			password: password,
			verify_password: verify_password,
		},
	});
}

// Generate api key.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Generate API Key
 *	@description: Generate a new api key for the authenticated user.
 *	@type: Promise
 *	@return: Returns a promise with the with a successfull update response with the newly generated api key as attribute and a request error on a failed request.
 */
vweb.user.generate_api_key = function() {
	return vweb.utils.request({
		method: "POST",
		url: "/vweb/backend/user/api_key",
	});
}

// Revoke api key.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Revoke API Key
 *	@description: Revoke the api key of the authenticated user.
 *	@type: Promise
 *	@return: Returns a promise with the with a successfull update response and a request error on a failed request.
 */
vweb.user.revoke_api_key = function() {
	return vweb.utils.request({
		method: "DELETE",
		url: "/vweb/backend/user/api_key",
	});
}

// Load data from the users database.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Load Data
 *	@description: Load data from the authenticated user's database.
 *	@type: Promise
 *	@return: Returns a promise with the with a successfull update response with the loaded user's data and a request error on a failed request.
 */
vweb.user.load = function(path, def = "") {
	return vweb.utils.request({
		method: "GET",
		url: "/vweb/backend/user/data",
		data: {
			path: path,
			def: "",
		},
	});
}

// Save data to the users database.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Save Data
 *	@description: Save data to the authenticated user's database.
 *	@type: Promise
 *	@return: Returns a promise with the with a successfull update response and a request error on a failed request.
 */
vweb.user.save = function(path = "", data = {}) {
	return vweb.utils.request({
		method: "POST",
		url: "/vweb/backend/user/data",
		data: {
			path: path,
			data: data,
		},
	});
}

// Load protected data from the users database.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Load Protected Data
 *	@description: Load protected data from the authenticated user's database.
 *	@type: Promise
 *	@return: Returns a promise with the with a successfull update response with the loaded user's data and a request error on a failed request.
 */
vweb.user.load_protected = function(path, def = "") {
	return vweb.utils.request({
		method: "GET",
		url: "/vweb/backend/user/data/protected",
		data: {
			path: path,
			def: def,
		},
	});
}