/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// HTTP response status.
// - Does not include all status codes.
/* 	@docs: {
 * 	@chapter: HTTP
 * 	@title: Status
 * 	@description: HTTP status codes.
 * 	@usage:
 * 		#include <vlib/sockets/http.h>
 * 		short success = vlib::http::status::success;
 * 	@show_code: true
 } */
const Status = {
	undefined: 							0,
	continue: 							100,
	switching_protocols: 				101,
	early_hints: 						103,
	success:							200,
	created: 							201,
	accepted: 							202,
	no_auth_info: 						203,
	no_content: 						204,
	reset_content: 						205,
	partial_content:					206,
	multiple_choices: 					300,
	moved_permanently: 					301,
	found: 								302,
	see_other: 							303,
	not_modified: 						304,
	temporary_redirect: 				307,
	permanent_redirect: 				308,
	bad_request: 						400,
	unauthorized: 						401,
	payment_required:					402,
	forbidden: 							403,
	not_found: 							404,
	method_not_allowed: 				405,
	not_acceptable:	 					406,
	proxy_auth_required: 				407,
	Requestimeout: 						408,
	conflict:		 					409,
	gone:			 					410,
	length_required:			 		411,
	precondition_failed:			 	412,
	payload_too_large:			 		413,
	uri_too_large:				 		414,
	unsupported_media_type:				415,
	range_not_statisfiable:	 			416,
	expectation_failed:					417,
	imateapot: 							418,
	unprocessable_entity: 				422,
	too_early: 							425,
	upgrade_required: 					426,
	precondition_required: 				428,
	too_many_requests: 					429,
	request_header_fields_too_large:	431,
	unavailable_for_legal_reasons:		451,
	internal_server_error: 				500,
	not_implemented: 					501,
	bad_gateway: 						502,
	service_unvailable: 				503,
	gateway_timeout: 					504,
	http_version_not_supported: 		505,
	variant_also_negotiates:			506,
	insufficient_storage:				507,
	loop_detected:						508,
	not_extended:						510,
	network_auth_required:				511,
    // Custom statuses.
    two_factor_auth_required:          601, // should not be changed, used by vweb js.
};

// ---------------------------------------------------------
// Exports.

module.exports = Status;
