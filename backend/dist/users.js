"use strict";
/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ---------------------------------------------------------
// Imports.
const { vlib, vhighlight } = require("./vinc.js");
const utils = require("./utils.js");
const Mail = require('./plugins/mail.js');
const Status = require("./status.js");
const { FrontendError } = utils;
// ---------------------------------------------------------
// The server object.
/*  @docs:
    @nav: Backend
    @chapter: Server
    @title: Users
    @desc:
        The users class, accessable under `Server.users`.
    @param:
        @name: _server
        @ignore: true
*/
class Users {
    constructor(_server) {
        this.server = _server;
        // Attributes.
        this.avg_send_2fa_time = [];
    }
    // ---------------------------------------------------------
    // Utils.
    // Generate a code.
    _generate_code(length = 6) {
        const charset = "0123456789";
        let key = "";
        for (let i = 0; i < length; i++) {
            key += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return key;
    }
    // Generate a str.
    _generate_str(length = 32) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let key = "";
        for (let i = 0; i < length; i++) {
            key += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return key;
    }
    // Create a new uid.
    _generate_uid() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const uid = this._generate_str(16);
                if ((yield this.uid_exists(uid)) === false) {
                    return uid;
                }
            }
        });
    }
    // Generate an api key.
    _generate_api_key(uid) {
        return `0${uid}:${this._generate_str(64)}`;
    }
    // Generate a token.
    _generate_token(uid) {
        return `1${uid}:${this._generate_str(64)}`;
    }
    // Check a password and the verify password.
    _verify_new_pass(pass, verify_pass) {
        let error = null;
        if (pass !== verify_pass) {
            error = "Passwords do not match.";
            return { error, invalid_fields: { "password": error, "verify_password": error } };
        }
        else if (pass.length < 8) {
            error = "The password should at least include eight characters.";
            return { error, invalid_fields: { "password": error, "verify_password": error } };
        }
        else if (pass.toLowerCase() === pass) {
            error = "The password should at least include one capital letter.";
            return { error, invalid_fields: { "password": error, "verify_password": error } };
        }
        else if (pass.includes_numeric_char() === false && pass.includes_special_char() === false) {
            error = "The password should at least include one numeric or special character.";
            return { error, invalid_fields: { "password": error, "verify_password": error } };
        }
        return { error: null, invalid_fields: null };
    }
    // ---------------------------------------------------------
    // Authentication (private).
    // Generate a token by uid.
    _create_token(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this._generate_token(uid);
            yield this._tokens_db.save(uid, "token", {
                expiration: Date.now() + this.server.token_expiration * 1000,
                token: this.server._hmac(token),
                active: true,
            });
            return token;
        });
    }
    // Deactivate a token by uid.
    _deactivate_token(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._tokens_db.save(uid, "token", { active: false });
        });
    }
    // Generate a token by uid.
    _create_2fa_token(uid_or_email, expiration) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = this._generate_code(6);
            const doc = yield this._tokens_db.save(uid_or_email, "2fa", {
                expiration: Date.now() + expiration * 1000,
                code: code,
                active: true,
            });
            return code;
        });
    }
    // Deactivate a token by uid.
    _deactivate_2fa_token(uid_or_email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._tokens_db.save(uid_or_email, "2fa", { active: false });
        });
    }
    // Perform authentication on a request.
    // When the authentication has failed an args object for response.send will be returned.
    // On a successfull authentication `null` will be returned.
    _authenticate(stream) {
        return __awaiter(this, void 0, void 0, function* () {
            // // Get api key key from bearer.
            const authorization = stream.headers["authorization"];
            if (authorization !== undefined) {
                if (typeof authorization !== "string") {
                    return {
                        status: Status.bad_request,
                        data: "Invalid authorization header.",
                    };
                }
                if (!authorization.eq_first("Bearer ")) {
                    return {
                        status: Status.bad_request,
                        data: "Invalid authorization scheme, the authorization scheme must be \"Bearer\".",
                    };
                }
                let api_key = "";
                for (let i = 7; i < authorization.length; i++) {
                    const c = authorization[i];
                    if (c == " ") {
                        continue;
                    }
                    api_key += c;
                }
                let uid;
                try {
                    uid = yield this.get_uid_by_api_key(api_key);
                }
                catch (e) {
                    return {
                        status: Status.unauthorized,
                        data: "Unauthorized.",
                    };
                }
                if ((yield this.verify_api_key_by_uid(uid, api_key)) !== true) {
                    return {
                        status: Status.unauthorized,
                        data: "Unauthorized.",
                    };
                }
                stream.uid = uid;
                return null;
            }
            // Get token from cookies.
            else {
                if (stream.cookies.T == null || stream.cookies.T.value == null) {
                    return {
                        status: 302,
                        headers: { "Location": `/signin?next=${stream.endpoint}` },
                        data: "Permission denied.",
                    };
                }
                const token = stream.cookies.T.value;
                let uid;
                try {
                    uid = yield this.get_uid_by_api_key(token);
                }
                catch (e) {
                    return {
                        status: 302,
                        headers: { "Location": `/signin?next=${stream.endpoint}` },
                        data: "Permission denied.",
                    };
                }
                if ((yield this.verify_token_by_uid(uid, token)) !== true) {
                    return {
                        status: 302,
                        headers: { "Location": `/signin?next=${stream.endpoint}` },
                        data: "Permission denied.",
                    };
                }
                stream.uid = uid;
                return null;
            }
            // Authentication failed.
            return {
                status: 302,
                headers: { "Location": `/signin?next=${stream.endpoint}` },
                data: "Permission denied.",
            };
        });
    }
    // Sign a user in and return a response.
    _sign_in_response(stream, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate token.
            const token = yield this._create_token(uid);
            // Create headers.
            this._create_token_cookie(stream, token);
            yield this._create_user_cookie(stream, uid);
            yield this._create_detailed_user_cookie(stream, uid);
            // Response.
            stream.send({
                status: 200,
                data: { message: "Successfully signed in." }
            });
        });
    }
    // ---------------------------------------------------------
    // Cookies (private).
    // Create token headers.
    //  - Should be called when generating a token.
    _create_token_cookie(stream, token) {
        stream.set_header("Cache-Control", "max-age=0, no-cache, no-store, must-revalidate, proxy-revalidate");
        stream.set_header("Access-Control-Allow-Credentials", "true");
        let expires = new Date(new Date().getTime() + this.server.token_expiration * 1000);
        if (typeof token === "object") {
            token = token.token;
        }
        stream.set_cookie(`T=${token}; Max-Age=86400; Path=/; Expires=${expires.toUTCString()}; SameSite=None; ${this.server.https === undefined ? "" : "Secure"}; HttpOnly;`);
    }
    // Create user headers.
    //  - Should be called when a user is authenticated.
    _create_user_cookie(stream, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const secure = this.server.https === undefined ? "" : "Secure";
            if (typeof uid === "string") {
                stream.set_cookie(`UserID=${uid}; Path=/; SameSite=None; ${secure};`);
                const is_activated = this.server.enable_account_activation ? yield this.is_activated(uid) : true;
                stream.set_cookie(`UserActivated=${is_activated}; Path=/; SameSite=None; ${secure};`);
            }
            else {
                stream.set_cookie(`UserID=-1; Path=/; SameSite=None; ${secure};`);
                const is_activated = this.server.enable_account_activation ? false : true;
                stream.set_cookie(`UserActivated=${is_activated}; Path=/; SameSite=None; ${secure};`);
            }
        });
    }
    // Create user headers.
    //  - Should be called when a user has just signed in, signed up or changed their account.
    _create_detailed_user_cookie(stream, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const secure = this.server.https === undefined ? "" : "Secure";
            const user = yield this.get(uid);
            stream.set_cookie(`UserName=${user.username}; Path=/; SameSite=None; ${secure};`);
            stream.set_cookie(`UserFirstName=${user.first_name}; Path=/; SameSite=None; ${secure};`);
            stream.set_cookie(`UserLastName=${user.last_name}; Path=/; SameSite=None; ${secure};`);
            stream.set_cookie(`UserEmail=${user.email}; Path=/; SameSite=None; ${secure};`);
        });
    }
    // Reset all default cookies.
    // - Should be called when a user signs out.
    _reset_cookies(stream) {
        const secure = this.server.https === undefined ? "" : "Secure";
        stream.set_cookie(`T=; Path=/; SameSite=None; ${secure}; HttpOnly;`);
        stream.set_cookie(`UserID=-1; Path=/; SameSite=None; ${secure};`);
        stream.set_cookie(`UserActivated=false; Path=/; SameSite=None; ${secure};`);
        // stream.set_cookie(`2FAUserID=-1; Path=/; SameSite=None; ${secure};`);
        stream.set_cookie(`UserName=; Path=/; SameSite=None; ${secure};`);
        stream.set_cookie(`UserFirstName=; Path=/; SameSite=None; ${secure};`);
        stream.set_cookie(`UserLastName=; Path=/; SameSite=None; ${secure};`);
        stream.set_cookie(`UserEmail=; Path=/; SameSite=None; ${secure};`);
    }
    // ---------------------------------------------------------
    // Initialization (private).
    // Initialize.
    _initialize() {
        // Database collections.
        this._tokens_db = this.server.db.create_uid_collection("_tokens");
        this._users_db = this.server.db.create_uid_collection("_users");
        // Public database collections.
        this.public = this.server.db.create_uid_collection("_users_public");
        this.protected = this.server.db.create_uid_collection("_users_protected");
        this.private = this.server.db.create_uid_collection("_users_private");
        // ---------------------------------------------------------
        // Default auth endpoints.
        this.server.endpoint(
        // Send 2fa.
        {
            method: "GET",
            endpoint: "/vweb/auth/2fa",
            content_type: "application/json",
            rate_limit: "global",
            params: {
                email: "string",
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                // Get uid.
                let uid;
                if ((uid = yield this.get_uid_by_email(params.email)) == null) {
                    return stream.success({
                        data: { message: "A 2FA code was sent if the specified email exists." },
                    });
                }
                // Send.
                yield this.send_2fa({ uid: uid, stream });
                return stream.success({
                    data: { message: "A 2FA code was sent if the specified email exists." },
                });
            })
        }, 
        // Sign in.
        {
            method: "POST",
            endpoint: "/vweb/auth/signin",
            content_type: "application/json",
            rate_limit: {
                limit: 10,
                interval: 60,
                group: "vweb.auth"
            },
            callback: (stream) => __awaiter(this, void 0, void 0, function* () {
                // Get params.
                let email, email_err, username, username_err, password, uid, code;
                try {
                    email = stream.param("email");
                }
                catch (err) {
                    email_err = err;
                }
                try {
                    username = stream.param("username");
                }
                catch (err) {
                    username_err = err;
                }
                if (email_err && username_err) {
                    return stream.error({ status: Status.bad_request, data: { error: email_err.message } });
                }
                try {
                    password = stream.param("password");
                }
                catch (err) {
                    return stream.error({ status: Status.bad_request, data: { error: err.message } });
                }
                // Get uid.
                if (email) {
                    if ((uid = yield this.get_uid_by_email(email)) == null) {
                        return stream.error({
                            status: Status.unauthorized,
                            data: {
                                error: "Unauthorized.",
                                invalid_fields: {
                                    "email": "Invalid or unrecognized email",
                                    "password": "Invalid or unrecognized password",
                                },
                            }
                        });
                    }
                }
                else {
                    if ((uid = yield this.get_uid(username)) == null) {
                        return stream.error({
                            status: Status.unauthorized,
                            data: {
                                error: "Unauthorized.",
                                invalid_fields: {
                                    "username": "Invalid or unrecognized username",
                                    "password": "Invalid or unrecognized password",
                                },
                            }
                        });
                    }
                }
                // Verify password.
                if (yield this.verify_password(uid, password)) {
                    // Verify 2fa.
                    if (this.server.enable_2fa) {
                        // Get 2FA.
                        try {
                            code = stream.param("code");
                        }
                        catch (err) {
                            // Send 2fa and add to avg time tracking.
                            const start_time = Date.now();
                            yield this.send_2fa({ uid: uid, stream });
                            // Add to avg time tracking.
                            if (this.avg_send_2fa_time.length >= 10000) {
                                this.avg_send_2fa_time.shift();
                            }
                            this.avg_send_2fa_time.push(Date.now() - start_time);
                            // Send error.
                            return stream.send({
                                status: Status.two_factor_auth_required,
                                data: { error: "2FA required." }
                            });
                        }
                        // Verify 2FA.
                        const err = yield this.verify_2fa(uid, code);
                        if (err) {
                            return stream.send({
                                status: Status.unauthorized,
                                data: {
                                    error: "Invalid 2FA code.",
                                    invalid_fields: {
                                        "code": err,
                                    },
                                }
                            });
                        }
                    }
                    // Sign in.
                    return yield this._sign_in_response(stream, uid);
                }
                // Wait for the same time as it would time on avg to send a mail.
                if (this.avg_send_2fa_time.length >= 10) {
                    const sorted = [...this.avg_send_2fa_time].sort((a, b) => a - b);
                    const mid = Math.floor(sorted.length / 2);
                    if (sorted.length % 2 === 0) {
                        return (sorted[mid - 1] + sorted[mid]) / 2;
                    }
                    yield new Promise(resolve => setTimeout(resolve, sorted[mid]));
                }
                // Unauthorized.
                return stream.send({
                    status: Status.unauthorized,
                    data: {
                        error: "Unauthorized.",
                        invalid_fields: {
                            "username": "Invalid or unrecognized username",
                            "password": "Invalid or unrecognized password",
                        },
                    }
                });
            })
        }, 
        // Sign out.
        {
            method: "POST",
            endpoint: "/vweb/auth/signout",
            content_type: "application/json",
            authenticated: true,
            rate_limit: "global",
            callback: (stream) => __awaiter(this, void 0, void 0, function* () {
                // Delete token.
                yield this._deactivate_token(stream.uid);
                // Create headers.
                this._reset_cookies(stream);
                // Response.
                return stream.success({
                    data: { message: "Successfully signed out." },
                });
            })
        }, 
        // Sign up.
        {
            method: "POST",
            endpoint: "/vweb/auth/signup",
            content_type: "application/json",
            rate_limit: "global",
            params: {
                username: "string",
                first_name: "string",
                last_name: "string",
                email: "string",
                password: "string",
                verify_password: "string",
                phone_number: { type: "string", required: false },
                code: { type: "string", required: false },
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                // Verify password.
                const { error, invalid_fields } = this._verify_new_pass(params.password, params.verify_password);
                if (error) {
                    return stream.error({
                        status: Status.bad_request,
                        data: {
                            error,
                            invalid_fields,
                        }
                    });
                }
                // Verify username and email.
                if (yield this.username_exists(params.username)) {
                    const e = new Error(`Username "${params.username}" is already registered.`);
                    e.invalid_fields = { "username": "Username is already registered" };
                    throw e;
                }
                if (yield this.email_exists(params.email)) {
                    const e = new Error(`Email "${params.email}" is already registered.`);
                    e.invalid_fields = { "email": "Email is already registered" };
                    throw e;
                }
                // Verify 2fa.
                if (this.server.enable_2fa) {
                    // Send 2FA.
                    if (params.code == null || params.code == "") {
                        // Send 2fa and add to avg time tracking.
                        const start_time = Date.now();
                        yield this.send_2fa({ _email: params.email, _username: params.username, stream });
                        // Add to avg time tracking.
                        if (this.avg_send_2fa_time.length >= 10000) {
                            this.avg_send_2fa_time.shift();
                        }
                        this.avg_send_2fa_time.push(Date.now() - start_time);
                        // Send error.
                        return stream.send({
                            status: Status.two_factor_auth_required,
                            data: { error: "2FA required." }
                        });
                    }
                    // Verify 2FA.
                    const err = yield this.verify_2fa(params.email, params.code);
                    if (err) {
                        return stream.send({
                            status: Status.unauthorized,
                            data: {
                                error: "Invalid 2FA code.",
                                invalid_fields: {
                                    "code": err,
                                },
                            }
                        });
                    }
                }
                // Create.
                delete params.verify_password;
                delete params.code;
                params.is_activated = true; // already verified by 2fa or no 2fa is enabled.
                params._check_username_email = false; // already checked.
                let uid;
                try {
                    uid = yield this.create(params);
                }
                catch (err) {
                    return stream.error({ status: Status.bad_request, data: {
                            error: err.message,
                            invalid_fields: err.invalid_fields || {},
                        } });
                }
                // Sign in.
                return yield this._sign_in_response(stream, uid);
            })
        }, 
        // Activate account.
        {
            method: "POST",
            endpoint: "/vweb/auth/activate",
            content_type: "application/json",
            rate_limit: "global",
            params: {
                "code": "string",
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                // Vars.
                let uid = stream.uid;
                // Get uid by cookie.
                if (uid == null) {
                    uid = stream.cookies["UserID"].value;
                    if (uid === "null" || value === "-1") {
                        uid = null;
                    }
                }
                // Check uid.
                if (uid == null) {
                    return stream.error({ status: Status.forbidden, data: { error: "Permission denied." } });
                }
                // Verify.
                const err = yield this.verify_2fa(uid, params.code);
                if (err) {
                    return stream.error({ status: Status.forbidden, data: {
                            error: "Permission denied.",
                            invalid_fields: {
                                "code": err,
                            },
                        } });
                }
                // Set activated.
                yield this.set_activated(uid, true);
                // Response.
                yield this._create_user_cookie(stream, uid);
                return stream.success({ data: { message: "Successfully verified the 2FA code." } });
            })
        }, 
        // Forgot password.
        {
            method: "POST",
            endpoint: "/vweb/auth/forgot_password",
            content_type: "application/json",
            rate_limit: "global",
            params: {
                email: "string",
                code: "string",
                password: "string",
                verify_password: "string",
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                // Verify password.
                const { error, invalid_fields } = this._verify_new_pass(params.password, params.verify_password);
                if (error) {
                    return stream.error({
                        status: Status.bad_request,
                        data: {
                            error: error,
                            invalid_fields,
                        }
                    });
                }
                // Get uid.
                let uid;
                if ((uid = yield this.get_uid_by_email(params.email)) == null) {
                    return stream.error({ status: Status.forbidden, data: { error: "Invalid email." }, });
                }
                // Verify 2fa.
                const err = yield this.verify_2fa(uid, params.code);
                if (err) {
                    return stream.error({ status: Status.forbidden, data: {
                            error: "Invalid 2FA code.",
                            invalid_fields: {
                                "code": "Invalid code"
                            },
                        } });
                }
                // Set password.
                yield this.set_password(uid, params.password);
                // Sign in.
                return yield this._sign_in_response(stream, uid);
            })
        });
        // ---------------------------------------------------------
        // Default user endpoints.
        this.server.endpoint(
        // Get user.
        {
            method: "GET",
            endpoint: "/vweb/user",
            content_type: "application/json",
            authenticated: true,
            rate_limit: "global",
            params: {
                detailed: { type: "boolean", default: false },
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                const user = yield this.get(stream.uid, params.detailed);
                return stream.success({ data: user });
            })
        }, 
        // Set user.
        {
            method: "POST",
            endpoint: "/vweb/user",
            authenticated: true,
            rate_limit: "global",
            callback: (stream) => __awaiter(this, void 0, void 0, function* () {
                yield this.set(stream.uid, stream.params);
                yield this._create_detailed_user_cookie(stream, stream.uid);
                return stream.success({ data: { message: "Successfully updated your account." } });
            })
        }, 
        // Change password.
        {
            method: "POST",
            endpoint: "/vweb/user/change_password",
            authenticated: true,
            rate_limit: "global",
            params: {
                current_password: "string",
                password: "string",
                verify_password: "string",
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                // Verify old password.
                if ((yield this.verify_password(stream.uid, params.current_password)) !== true) {
                    return response.error({
                        status: Status.unauthorized,
                        data: {
                            error: "Incorrect password.",
                            invalid_fields: {
                                current_password: "Incorrect password.",
                            }
                        },
                    });
                }
                // Verify new password.
                const { error, invalid_fields } = this._verify_new_pass(params.password, params.verify_password);
                if (error) {
                    return stream.error({
                        status: Status.bad_request,
                        data: {
                            error: error,
                            invalid_fields,
                        }
                    });
                }
                // Set password.
                yield this.set_password(stream.uid, params.password);
                // Success.
                return stream.success({
                    status: Status.success,
                    data: { message: "Successfully updated your password." },
                });
            })
        }, 
        // Delete account.
        {
            method: "DELETE",
            endpoint: "/vweb/user",
            authenticated: true,
            rate_limit: "global",
            callback: (stream) => __awaiter(this, void 0, void 0, function* () {
                // Delete.
                yield this.delete(stream.uid);
                // Reset cookies.
                this._reset_cookies(stream);
                // Success.
                return stream.success({
                    status: Status.success,
                    data: { message: "Successfully deleted your account." },
                });
            })
        }, 
        // Generate api key.
        {
            method: "POST",
            endpoint: "/vweb/user/api_key",
            authenticated: true,
            rate_limit: "global",
            callback: (stream) => __awaiter(this, void 0, void 0, function* () {
                return stream.success({
                    data: {
                        "message": "Successfully generated an API key.",
                        "api_key": yield this.generate_api_key(stream.uid),
                    }
                });
            })
        }, 
        // Revoke api key.
        {
            method: "DELETE",
            endpoint: "/vweb/user/api_key",
            authenticated: true,
            rate_limit: "global",
            callback: (stream) => __awaiter(this, void 0, void 0, function* () {
                yield this.revoke_api_key(stream.uid);
                return stream.send({
                    status: Status.success,
                    data: { message: "Successfully revoked your API key." },
                });
            })
        }, 
        // Load data.
        {
            method: "GET",
            endpoint: "/vweb/user/data",
            authenticated: true,
            rate_limit: "global",
            params: {
                path: "string",
                default: { type: "string", default: null },
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                return stream.send({
                    status: Status.success,
                    data: yield this.public.load(stream.uid, params.path, { default: params.default })
                });
            })
        }, 
        // Save data.
        {
            method: "POST",
            endpoint: "/vweb/user/data",
            authenticated: true,
            rate_limit: "global",
            params: {
                path: "string",
                data: { type: undefined },
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                yield this.public.save(stream.uid, params.path, params.data);
                return stream.send({
                    status: Status.success,
                    data: { message: "Successfully saved." },
                });
            })
        }, 
        // Delete data.
        {
            method: "DELETE",
            endpoint: "/vweb/user/data",
            authenticated: true,
            rate_limit: "global",
            params: {
                path: "string",
                data: { type: undefined },
                recursive: { type: "string", default: false },
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                yield this.public.delete(stream.uid, params.path, params.recursive);
                return stream.send({
                    status: Status.success,
                    data: { message: "Successfully deleted." },
                });
            })
        }, 
        // Load proteced data.
        {
            method: "GET",
            endpoint: "/vweb/user/data/protected",
            authenticated: true,
            rate_limit: "global",
            params: {
                path: "string",
                default: { type: "string", default: null },
            },
            callback: (stream, params) => __awaiter(this, void 0, void 0, function* () {
                return stream.send({
                    status: Status.success,
                    data: yield this.protected.load(stream.uid, params.path, { default: params.default })
                });
            })
        });
        // ---------------------------------------------------------
        // Default support endpoints.
        this.server.endpoint(
        // Get PIN.
        {
            method: "GET",
            endpoint: "/vweb/support/pin",
            content_type: "application/json",
            authenticated: true,
            rate_limit: "global",
            callback: (stream) => __awaiter(this, void 0, void 0, function* () {
                // Sign in.
                const pin = yield this.get_support_pin(stream.uid);
                return stream.success({ data: {
                        message: "Successfully retrieved your support PIN.",
                        pin: pin,
                    } });
            })
        }, 
        // Support.
        // Supported params are: `support_pin`, `subject`, `summary`, `detailed`, `attachments`, `recipient` and `type`.
        {
            method: "POST",
            endpoint: "/vweb/support/submit",
            content_type: "application/json",
            rate_limit: "global",
            callback: (stream) => __awaiter(this, void 0, void 0, function* () {
                // Get params.
                let params = stream.params;
                // When unauthenticated get contact params.
                let user = null, email, first_name, last_name;
                if (stream.uid == null) {
                    try {
                        email = stream.param("email");
                        first_name = stream.param("first_name");
                        last_name = stream.param("last_name");
                    }
                    catch (err) {
                        return stream.error({ status: Status.bad_request, data: { error: err.message } });
                    }
                }
                else {
                    user = yield this.get(stream.uid);
                    email = user.email;
                    first_name = user.first_name;
                    last_name = user.last_name;
                }
                // Create mail body.
                let body = "";
                const subject = params.subject || (params.type == null ? "Support" : `Support ${params.type}`);
                body += `<h1>${subject}</h1>`;
                if (params.subject) {
                    delete params.subject;
                }
                if (params.type) {
                    body += `<span style='font-weight: bold'>Type</span>: ${params.type}<br>`;
                    delete params.type;
                }
                if (user) {
                    body += `<span style='font-weight: bold'>UID</span>: ${stream.uid}<br>`;
                    body += `<span style='font-weight: bold'>User</span>: ${user.username}<br>`;
                }
                body += `<span style='font-weight: bold'>Email</span>: ${email}<br>`;
                body += `<span style='font-weight: bold'>First Name</span>: ${first_name}<br>`;
                body += `<span style='font-weight: bold'>Last Name</span>: ${last_name}<br>`;
                if (stream.uid != null) {
                    const support_pin = yield this.get_support_pin(stream.uid);
                    body += `<span style='font-weight: bold'>Support PIN</span>: ${support_pin} <span style='color: green'>verified</span><br>`;
                }
                else if (params.support_pin) {
                    body += `<span style='font-weight: bold'>Support PIN</span>: ${params.support_pin} <span style='color: red'>not yet verified</span><br>`;
                    delete params.support_pin;
                }
                else {
                    body += `<span style='font-weight: bold'>Support PIN</span>: Unknown<br>`;
                }
                if (params.summary) {
                    body += `<br><span style='font-weight: bold'>Summary</span>:<br>${params.summary}<br>`;
                    delete params.summary;
                }
                if (params.detailed) {
                    body += `<br><span style='font-weight: bold'>Detailed</span>:<br>${params.detailed}<br>`;
                    delete params.detailed;
                }
                Object.keys(params).iterate((key) => {
                    if (key !== "attachments" && key !== "recipient") {
                        body += `<br><span style='font-weight: bold'>${key}</span>: ${params[key]}<br>`;
                    }
                });
                // Attachments.
                body += "<br>";
                let attachments = null;
                if (params.attachments) {
                    attachments = [];
                    Object.keys(params.attachments).iterate((key) => {
                        attachments.append({
                            filename: key,
                            content: Buffer.from(params.attachments[key], 'utf-8'),
                        });
                    });
                }
                // Send email.
                yield this.server.send_mail({
                    recipients: [params.recipient || this.server.smtp_sender],
                    subject: subject,
                    body: body,
                    attachments: attachments,
                });
                // Sign in.
                return stream.success({ data: { message: "Successfully sent your request." } });
            })
        });
    }
    // ---------------------------------------------------------
    // Users.
    // Check if a username exists.
    uid_exists(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._users_db.find(uid, { _path: "user" })) != null;
        });
    }
    // Check if a username exists.
    /*  @docs:
     *  @title: Username Exists
     *  @description: Check if a username exists.
     *  @type: boolean
     *  @return: Returns a boolean indicating whether the username exists or not.
     *  @parameter:
     *      @name: username
     *      @description: The username to check.
     *      @type: string
     *  @usage:
     *      ...
     *      const exists = await server.users.username_exists("someusername");
     */
    username_exists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._users_db.find(null, { _path: "user", username })) != null;
        });
    }
    // Check if an email exists.
    /*  @docs:
     *  @title: Email Exists
     *  @description: Check if a email exists.
     *  @type: boolean
     *  @return: Returns a boolean indicating whether the email exists or not.
     *  @parameter:
     *      @name: email
     *      @description: The email to check.
     *      @type: string
     *  @usage:
     *      ...
     *      const exists = await server.users.email_exists("some\@email.com");
     */
    email_exists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._users_db.find(null, { _path: "user", email })) != null;
        });
    }
    // Is activated.
    /*  @docs:
     *  @title: Is Activated
     *  @description: Check if a user account is activated.
     *  @return: Returns a boolean indicating whether the account is activated or not.
     *  @parameter:
     *      @name: uid
     *      @description: The id of the user.
     *      @type: string
     *      @cache: Users:uid:param
     *  @usage:
     *      ...
     *      const activated = await server.users.is_activated(0);
     */
    is_activated(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.get(uid)).is_activated == true;
        });
    }
    // Set activated.
    /*  @docs:
     *  @title: Set Activated
     *  @description: Set the activated status of a user account is activated.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: activated
     *      @description: The boolean with the new activated status.
     *      @type: boolean
     *  @usage:
     *      ...
     *      await server.users.set_activated(1, true);
     */
    set_activated(uid, is_activated) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.set(uid, { is_activated: is_activated });
        });
    }
    // Create a user.
    /*  @docs:
     *  @title: Create User
     *  @description:
     *      Create a user account.
     *
     *      Only the hashed password will be saved.
     *  @return: Returns the uid of the newly created user.
     *  @parameter:
     *      @name: first_name
     *      @description: The user's first name.
     *      @type: string
     *      @required: true
     *  @parameter:
     *      @name: last_name
     *      @description: The user's last name.
     *      @type: string
     *      @required: true
     *  @parameter:
     *      @name: username
     *      @description: The username of the new account.
     *      @type: string
     *      @required: true
     *  @parameter:
     *      @name: email
     *      @description: The email of the new account.
     *      @type: string
     *      @required: true
     *  @parameter:
     *      @name: password
     *      @description: The password of the new account.
     *      @type: string
     *      @required: true
     *  @parameter:
     *      @name: phone_number
     *      @description: The phone number of the user account.
     *      @type: string
     *  @parameter:
     *      @name: is_activated
     *      @description: A boolean indicating if the account should be set to activated or not, accounts created through the /vweb/api/signup endpoint are always immediately activated due to the required 2FA code. When called manually the default value of `!Server.enable_account_activation` will be used for parameter `is_activated`.
     *      @type: boolean
     *  @parameter:
     *      @name: _check_username_email
     *      @ignore: true
     *  @usage:
     *      ...
     *      const uid = await server.users.create{
     *          first_name: "John",
     *          last_name: "Doe",
     *          username: "johndoe",
     *          email: "johndoe\@email.com",
     *          password: "HelloWorld!"
     *      });
     */
    create(_a) {
        var arguments_1 = arguments;
        return __awaiter(this, arguments, void 0, function* ({ first_name, last_name, username, email, password, phone_number = "", is_activated = null, _check_username_email = false, }) {
            // Verify params.
            vlib.scheme.verify({
                object: arguments_1[0],
                check_unknown: true,
                scheme: {
                    first_name: "string",
                    last_name: "string",
                    username: "string",
                    email: "string",
                    password: "string",
                    phone_number: { type: "string", default: "" },
                    is_activated: { type: "boolean", required: false },
                    _check_username_email: { type: "boolean", required: false },
                }
            });
            // Check if username & email already exist.
            if (_check_username_email) {
                if (yield this.username_exists(username)) {
                    const e = new Error(`Username "${username}" is already registered.`);
                    e.invalid_fields = { "username": "Username is already registered" };
                    throw e;
                }
                if (yield this.email_exists(email)) {
                    const e = new Error(`Email "${email}" is already registered.`);
                    e.invalid_fields = { "email": "Email is already registered" };
                    throw e;
                }
            }
            // Generate a uid.
            const uid = yield this._generate_uid();
            // Create the user.
            yield this._users_db.save(uid, "user", {
                uid,
                first_name,
                last_name,
                username,
                email,
                password: this.server._hmac(password),
                phone_number,
                created: Date.now(),
                api_key: null,
                support_pin: this._generate_code(8),
                is_activated: is_activated !== null && is_activated !== void 0 ? is_activated : !this.server.enable_account_activation,
            });
            // Response.
            return uid;
        });
    }
    // Delete a user.
    /*  @docs:
     *  @title: Delete User
     *  @description: Delete a user account.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @usage:
     *      ...
     *      await server.users.delete(0);
     */
    delete(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._users_db.delete_all(uid);
            yield this._tokens_db.delete_all(uid);
            yield this.public.delete_all(uid);
            yield this.protected.delete_all(uid);
            yield this.private.delete_all(uid);
            if (this.server.payments !== undefined) {
                yield this.server.payments._delete_user(uid);
            }
            const res = this.server.on_delete_user({ uid });
            if (res instanceof Promise) {
                yield res;
            }
        });
    }
    // Set a user's first name.
    /*  @docs:
     *  @title: Set First Name
     *  @description:
     *      Set a user's first name
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: first_name
     *      @description: The new first name.
     *      @type: string
     *  @usage:
     *      ...
     *      await server.users.set_first_name(1, "John");
     */
    set_first_name(uid, first_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.get(uid);
            return yield this.set(uid, { first_name });
            ;
        });
    }
    // Set a user's last name.
    /*  @docs:
     *  @title: Set Last Name
     *  @description:
     *      Set a user's last name
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: last_name
     *      @description: The new last name.
     *      @type: string
     *  @usage:
     *      ...
     *      await server.users.set_last_name(1, "Doe");
     */
    set_last_name(uid, last_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.get(uid);
            return yield this.set(uid, { last_name });
            ;
        });
    }
    // Set a user's username.
    /*  @docs:
     *  @title: Set Username
     *  @description:
     *      Set a user's username
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: username
     *      @description: The new username.
     *      @type: string
     *  @usage:
     *      ...
     *      await server.users.set_username(1, "newusername");
     */
    set_username(uid, username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.username_exists(username)) {
                throw Error(`Username "${username}" already exists.`);
            }
            return yield this.set(uid, { username });
        });
    }
    // Set a user's email.
    /*  @docs:
     *  @title: Set Email
     *  @description:
     *      Set a user's email
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: email
     *      @description: The new email.
     *      @type: string
     *  @usage:
     *      ...
     *      await server.users.set_email(1, "new\@email.com");
     */
    set_email(uid, email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.email_exists(email)) {
                throw Error(`Email "${email}" already exists.`);
            }
            return yield this.set(uid, { email });
        });
    }
    // Set a user's password.
    /*  @docs:
     *  @title: Set Password
     *  @description:
     *      Set a user's password
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: password
     *      @description: The new password.
     *      @type: string
     *  @usage:
     *      ...
     *      await server.users.set_password(1, "XXXXXX");
     */
    set_password(uid, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.set(uid, { password: this.server._hmac(password) });
        });
    }
    // Update a user.
    /*  @docs:
     *  @title: Set user
     *  @description:
     *      Set a user's data
     *
     *      This function only updates the passed user attributes, unpresent attributes will not be deleted.
     *
     *      If the uid does not exist an `Error` will be thrown.
     *
     *      @note: The username can not be changed using this function, use `Server.set_username()` instead.
     *      @note: The email can not be changed using this function, use `Server.set_email()` instead.
     *      @note: The password can not be changed using this function, use `Server.set_password()` instead.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: user
     *      @description: The new user object.
     *      @type: object
     *  @parameter:
     *      @name: user
     *      @description: The new user object.
     *      @type: object
     *  @usage:
     *      ...
     *      await server.users.set(1, {first_name: "John", last_name: "Doe"});
     */
    set(uid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.uid != null) {
                delete data.uid; // since this may not be overwritten.
            }
            if (data.password != null) {
                delete data.password; // since this may not be overwritten using this func.
            }
            if (data.username != null) {
                delete data.username; // since this may not be overwritten using this func.
            }
            if (data.email != null) {
                delete data.email; // since this may not be overwritten using this func.
            }
            data = yield this._users_db.save(uid, "user", data);
            if (data == null) {
                throw new Error(`Unable to find a user by uid "${uid}".`);
            }
            return data;
        });
    }
    // Get user info by uid.
    /*  @docs:
     *  @title: Get User
     *  @description:
     *      Get a user by uid.
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: detailed
     *      @description: Also retrieve the detailed user data.
     *      @type: boolean
     *  @usage:
     *      ...
     *      const user = await server.users.get(0);
     */
    get(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._users_db.load(uid, "user");
            if (data == null) {
                throw new Error(`Unable to find a user by uid "${uid}".`);
            }
            return data;
        });
    }
    // Get user info by username.
    /*  @docs:
     *  @title: Get User By Username
     *  @description:
     *      Get a user by username.
     *
     *      If the username does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter:
     *      @name: username
     *      @description: The username of the user to fetch.
     *      @type: string
     *  @usage:
     *      ...
     *      const user = await server.users.get_by_username("myusername");
     */
    get_by_username(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._users_db.find(null, { _path: "user", username });
            if (data == null) {
                throw new Error(`Unable to find a user by username "${username}".`);
            }
            return data;
        });
    }
    // Get user info by email.
    /*  @docs:
     *  @title: Get User By Email
     *  @description:
     *      Get a user by email.
     *
     *      If the email does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter:
     *      @name: email
     *      @description: The email of the user to fetch.
     *      @type: string
     *  @usage:
     *      ...
     *      const user = await server.users.get_by_email("my\@email.com");
     */
    get_by_email(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._users_db.find(null, { _path: "user", email });
            if (data == null) {
                throw new Error(`Unable to find a user by email "${email}".`);
            }
            return data;
        });
    }
    // Get user info by api key.
    /*  @docs:
     *  @title: Get User By API Key
     *  @description:
     *      Get a user by API key.
     *
     *      If the API key does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter:
     *      @name: api_key
     *      @description: The API key of the user to fetch.
     *      @type: string
     *  @usage:
     *      ...
     *      const user = await server.users.get_by_api_key("XXXXXX");
     */
    get_by_api_key(api_key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._users_db.find(null, { _path: "user", api_key });
            if (data == null) {
                throw new Error(`Unable to find a user by api key "${api_key}".`);
            }
            return data;
        });
    }
    // Get user info by token.
    /*  @docs:
     *  @title: Get User By Token
     *  @description:
     *      Get a user by token.
     *
     *      If the token does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a User object.
     *  @parameter:
     *      @name: token
     *      @description: The authentication token of the user to fetch.
     *      @type: string
     *  @usage:
     *      ...
     *      const user = await server.users.get_by_token("XXXXXX");
     */
    get_by_token(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._tokens_db.find(null, { _path: "token", token });
            if (data == null) {
                throw new Error(`Unable to find a user by token "${token}".`);
            }
            return yield this.get(data.uid);
        });
    }
    // Get uid by username.
    /*  @docs:
     *  @title: Get UID
     *  @description: Get a uid by username.
     *  @return:
     *      Returns the uid of the username.
     *
     *      If the user does not exist `null` is returned.
     *  @parameter:
     *      @name: username
     *      @description: The username of the uid to fetch.
     *      @type: string
     *  @usage:
     *      ...
     *      let uid;
     *      if ((uid = await server.users.get_uid("myusername")) !== null) { ... }
     */
    get_uid(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.get_by_username(username)).uid;
            }
            catch (e) {
                return null;
            }
        });
    }
    // Get uid by username.
    /*  @docs:
     *  @title: Get UID By Email
     *  @description: Get a uid by username.
     *  @return:
     *      Returns the uid of the username.
     *
     *      If the user does not exist `null` is returned.
     *  @parameter:
     *      @name: username
     *      @description: The username of the uid to fetch.
     *      @type: string
     *  @usage:
     *      ...
     *      let uid;
     *      if ((uid = await server.users.get_uid_by_username("myuser")) !== null) { ... }
     */
    get_uid_by_username(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.get_by_username(username)).uid;
            }
            catch (e) {
                return null;
            }
        });
    }
    // Get uid by email.
    /*  @docs:
     *  @title: Get UID By Email
     *  @description: Get a uid by email.
     *  @return:
     *      Returns the uid of the email.
     *
     *      If the user does not exist `null` is returned.
     *  @parameter:
     *      @name: email
     *      @description: The email of the uid to fetch.
     *      @type: string
     *  @usage:
     *      ...
     *      let uid;
     *      if ((uid = await server.users.get_uid_by_email("my\@email.com")) !== null) { ... }
     */
    get_uid_by_email(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.get_by_email(email)).uid;
            }
            catch (e) {
                return null;
            }
        });
    }
    // Get uid by api key.
    /*  @docs:
     *  @title: Get UID By API Key
     *  @description: Get a uid by API key.
     *  @return:
     *      Returns the uid of the api key.
     *
     *      If the user does not exist `null` is returned.
     *  @parameter:
     *      @name: api_key
     *      @description: The API key of the uid to fetch.
     *      @type: string
     *  @usage:
     *      ...
     *      let uid;
     *      if ((uid = await server.users.get_uid_by_api_key("XXXXXXXXXX")) !== null) { ... }
     */
    get_uid_by_api_key(api_key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof api_key !== "string") {
                return null;
            }
            const pos = api_key.indexOf(":");
            if (pos === -1) {
                return null;
            }
            return api_key.substr(1, pos - 1);
        });
    }
    // Get uid by token.
    /*  @docs:
     *  @title: Get UID By Token
     *  @description: Get a uid by token.
     *  @return:
     *      Returns the uid of the token.
     *
     *      If the user does not exist `null` is returned.
     *  @parameter:
     *      @name: token
     *      @description: The token of the uid to fetch.
     *      @type: string
     *  @usage:
     *      ...
     *      let uid;
     *      if ((uid = await server.users.get_uid_by_token("XXXXXXXXXX")) !== null) { ... }
     */
    get_uid_by_token(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get_uid_by_api_key(token);
        });
    }
    // Get a user's support pin by uid.
    /*  @docs:
     *  @title: Get Support PIN
     *  @description:
     *      Get a user's support pin by uid.
     *  @return:
     *      Returns a User object.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @usage:
     *      ...
     *      const pin = await server.users.get_support_pin(1);
     */
    get_support_pin(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.get(uid)).support_pin;
        });
    }
    // Generate an api key by uid.
    /*  @docs:
     *  @title: Generate API Key
     *  @description:
     *      Generate an API key for a user.
     *
     *      Generating an API key overwrites all existing API keys.
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @return:
     *      Returns the API key string.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @usage:
     *      ...
     *      const api_key = await server.users.generate_api_key(0);
     */
    generate_api_key(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const api_key = this._generate_api_key(uid);
            yield this.set(uid, { api_key: this.server._hmac(api_key) });
            return api_key;
        });
    }
    // Revoke the API key of a user.
    /*  @docs:
     *  @title: Revoke API Key
     *  @description:
     *      Revoke the API key of a user.
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @usage:
     *      ...
     *      await server.users.revoke_api_key(0);
     */
    revoke_api_key(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.set(uid, { api_key: "" });
        });
    }
    // Verify a plaintext password.
    // Use async to keep it persistent with other functions.
    /*  @docs:
     *  @title: Verify Password
     *  @description:
     *      Verify a plaintext password.
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a boolean indicating whether the verification was successful.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: password
     *      @description: The plaintext password.
     *      @type: string
     *  @usage:
     *      ...
     *      const success = await server.users.verify_password(1, "XXXXXX");
     */
    verify_password(uid, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof uid !== "string") {
                return false;
            }
            try {
                const user = yield this.get(uid);
                return user.uid !== null && user.password === this.server._hmac(password);
            }
            catch (err) {
                return false;
            }
        });
    }
    // Verify a plaintext api key.
    // Use async to keep it persistent with other functions.
    /*  @docs:
     *  @title: Verify API Key
     *  @description:
     *      Verify an plaintext API key.
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a boolean indicating whether the verification was successful.
     *  @parameter:
     *      @name: api_key
     *      @description: The api key to verify.
     *      @type: string
     *  @usage:
     *      ...
     *      const success = await server.users.verify_api_key("XXXXXX");
     */
    verify_api_key(api_key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.verify_api_key_by_uid(yield this.get_uid_by_api_key(api_key), api_key);
        });
    }
    // Verify a plaintext api key by uid.
    // Use async to keep it persistent with other functions.
    /*  @docs:
     *  @title: Verify API Key By UID
     *  @description:
     *      Verify an plaintext API key by uid.
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a boolean indicating whether the verification was successful.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: api_key
     *      @description: The api key to verify.
     *      @type: string
     *  @usage:
     *      ...
     *      const success = await server.users.verify_api_key_by_uid(1, "XXXXXX");
     */
    verify_api_key_by_uid(uid, api_key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof uid !== "string") {
                return false;
            }
            try {
                const user = yield this.get(uid);
                return user.uid !== null && user.api_key.length > 0 && user.api_key == this.server._hmac(api_key);
            }
            catch (err) {
                return false;
            }
        });
    }
    // Verify a token.
    // Use async to keep it persistent with other functions.
    /*  @docs:
     *  @title: Verify Token
     *  @description:
     *      Verify an plaintext token.
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a boolean indicating whether the verification was successful.
     *  @parameter:
     *      @name: api_key
     *      @description: The token to verify.
     *      @type: string
     *  @usage:
     *      ...
     *      const success = await server.users.verify_token("XXXXXX");
     */
    verify_token(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.verify_token_by_uid(yield this.get_uid_by_api_key(token), token);
        });
    }
    // Verify a token by uid.
    // Use async to keep it persistent with other functions.
    /*  @docs:
     *  @title: Verify Token By UID.
     *  @description:
     *      Verify an plaintext token by uid.
     *
     *      If the uid does not exist an `Error` will be thrown.
     *  @return:
     *      Returns a boolean indicating whether the verification was successful.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: api_key
     *      @description: The token to verify.
     *      @type: string
     *  @usage:
     *      ...
     *      const success = await server.users.verify_token_by_uid(1, "XXXXXX");
     */
    verify_token_by_uid(uid, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof uid !== "string") {
                return false;
            }
            try {
                const correct_token = yield this._tokens_db.load(uid, "token");
                return (correct_token != null &&
                    correct_token.token != null &&
                    correct_token.active !== false &&
                    Date.now() < correct_token.expiration &&
                    correct_token.token == this.server._hmac(token));
            }
            catch (err) {
                return false;
            }
        });
    }
    // Verify a 2fa code.
    // Use async to keep it persistent with other functions.
    /*  @docs:
     *  @title: Verify 2FA Code
     *  @description:
     *      Verify a 2FA code by user id.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: code
     *      @description: The 2FA code.
     *      @type: string
     *  @return: Returns a boolean indicating whether the verification was successful or not.
     *  @usage:
     *      ...
     *      await server.users.verify_2fa(1, "123456");
     */
    verify_2fa(uid, code) {
        return __awaiter(this, void 0, void 0, function* () {
            // @warning: the `uid` parameter must also be allowed to be an email for sign ups.
            if (typeof uid !== "string") {
                return "Invalid UID.";
            }
            try {
                const auth = yield this._tokens_db.load(uid, "2fa");
                if (auth == null) {
                    return "Invalid 2FA code.";
                }
                const now = Date.now();
                if (now >= auth.expiration) {
                    yield this._deactivate_2fa_token(uid);
                    return "The 2FA code has expired.";
                }
                const status = (auth != null &&
                    auth.code != null &&
                    now < auth.expiration &&
                    auth.code == code &&
                    auth.active !== false);
                if (status === false) {
                    return "Invalid 2FA code.";
                }
                return null;
            }
            catch (err) {
                console.error("Encountered an error while validating the 2FA code.");
                console.error(err);
                return "Unknown error.";
            }
        });
    }
    // Send a 2fa code.
    /*  @docs:
     *  @title: Send 2FA Code
     *  @description:
     *      Send a 2FA code to a user by user id.
     *
     *      By default the 2FA code will be valid for 5 minutes.
     *
     *      The mail body will be generated using the `Server.on_2fa_mail({code, username, email, date, ip, device})` callback. When the callback is not defined an error will be thrown.
     *  @return:
     *      Returns a promise that will be resolved or rejected when the 2fa mail has been sent.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: stream
     *      @description: The stream object from the client request.
     *      @type: object
     *  @parameter:
     *      @name: expiration
     *      @description: The amount of seconds in which the code will expire.
     *      @type: number
     *  @usage:
     *      ...
     *      await server.users.send_2fa({uid: 0, stream});
     */
    send_2fa(_a) {
        return __awaiter(this, arguments, void 0, function* ({ uid, stream, expiration = 300, _device = null, _username = null, _email = null, }) {
            // Generate 2fa and get user email.
            let code;
            if (_username == null && _email == null) {
                code = yield this._create_2fa_token(uid, expiration);
                const user = yield this.get(uid);
                _username = user.username;
                _email = user.email;
            }
            else {
                code = yield this._create_2fa_token(_email, expiration);
            }
            // Get device.
            let device;
            if (_device === null) {
                device = stream.headers["user-agent"];
            }
            // Replace body.
            if (this.server.on_2fa_mail === undefined) {
                throw Error("Define server callback \"Server.on_2fa_mail\" to generate the HTML mail body.");
            }
            let mail = this.server.on_2fa_mail({
                code: code,
                username: _username,
                email: _email,
                date: new Date().toUTCString(),
                ip: stream.ip,
                device: device ? device : "Unknown",
            });
            let body = mail, subject = null;
            if (mail instanceof Mail.MailElement) {
                body = mail.html();
                subject = mail.subject();
            }
            // Send mail.
            return yield this.server.send_mail({
                recipients: [_email],
                subject: subject !== null && subject !== void 0 ? subject : "Two Factor Authentication Code",
                body,
            });
        });
    }
    // List all users.
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._users_db.list_query({ _path: "user" });
        });
    }
}
// ---------------------------------------------------------
// Exports.
module.exports = Users;