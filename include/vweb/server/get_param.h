/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_GET_PARAM_H
#define VWEB_GET_PARAM_H

// Namespace vweb.
namespace vweb {

// Check param.
// Returns -1 when the parameter is not present.
// Returns -2 when the parameter type does not match the specified type.
// constexpr
// ullong get_param(
//     const Json& params,
//     const char* key,
//     uint len,
//     const short& type
// ) {
//     ullong index;
//     if ((index = params.find(key, len)) == NPos::npos) {
//         return -1;
//     } else if (type != params.value(index).type()) {
//         return -2;
//     }
//     return index;
// }

// Check and get parameter.
// Causes undefined behaviour for parameter "param" when parameter "params" goes out of scope.
constexpr
Bool get_param_h(
    JsonValue*& value,
    vlib::http::Response& response,
    const Json& params,
    const char* key,
    uint len,
    short type
) {
    ullong index;
    if ((index = params.find(key, len)) == NPos::npos) {
        response.reconstruct(
            vlib::http::version::v1_1,
            vlib::http::status::bad_request,
            {{"Connection", "close"}},
            Json {{"error", to_str("Define parameter \"", key, "\".")}}
        );
        return false;
    }
    value = &params.value(index);
    if (type != value->type()) {
        response.reconstruct(
            vlib::http::version::v1_1,
            vlib::http::status::bad_request,
            {{"Connection", "close"}},
            Json {{"error", to_str("Type for parameter \"", key, "\" should be \"", vlib::json::strtype(type), "\".")}}
        );
        return false;
    }
    return true;
}


// Check and get parameter.
/*  @docs {
 *  @chapter: server
 *  @title: Get Parameter
 *  @description:
 *      Get a parameter from the parameters json.
 *
 *      The parameter `param` should not be deleted.
 *  @warning:
 *      Causes undefined behaviour for parameter `param` when parameter `params` goes out of scope.
 *  @parameter: {
 *      @name: response
 *      @description: The HTTP response object that will be assigned when the parameter does not exist.
 *  }
 *  @parameter: {
 *      @name: params
 *      @description: The json params from the request.
 *  }
 *  @parameter: {
 *      @name: param
 *      @description: A pointer which will be assigned with the corresponding value of the parameters key.
 *  }
 *  @parameter: {
 *      @name: key
 *      @description: The parameter key to get.
 *  }
 *  @parameter: {
 *      @name: len
 *      @description: The length of the parameter key to get.
 *  }
 *  @return: Returns a boolean indicating whether the parameter exists or not. If the parameter does not exist, the `response` parameter will be assigned and can be returned as the HTTP response.
 *  @usage:
 *      ...
 *      vlib::http::Response response;
 *      String* myparam = nullptr;
 *      if (!vweb::get_param(response, params, myparam, "myparam", 7)) {
 *          return response;
 *      }
 *      ...
 *  @funcs: 8
 } */
constexpr
Bool get_param(
    vlib::http::Response& response,
    const Json& params,
    const Null*& param,
    const char* key,
    uint len
) {
    param = nullptr;
    JsonValue* value = nullptr;
    if (!get_param_h(value, response, params, key, len, vlib::json::null)) {
        return false;
    }
    param = &value->asn();
    return true;
}
constexpr
Bool get_param(
    vlib::http::Response& response,
    const Json& params,
    const char* key,
    Bool*& param,
    uint len
) {
    param = nullptr;
    JsonValue* value = nullptr;
    if (!get_param_h(value, response, params, key, len, vlib::json::boolean)) {
        return false;
    }
    param = &value->asb();
    return true;
}
template <typename Floating> requires (vlib::is_floating_Numeric<Floating>::value) constexpr
Bool get_param(
    vlib::http::Response& response,
    const Json& params,
    Floating*& param,
    const char* key,
    uint len
) {
    param = nullptr;
    JsonValue* value = nullptr;
    if (!get_param_h(value, response, params, key, len, vlib::json::floating)) {
        return false;
    }
    param = &value->asf();
    return true;
}
template <typename Integer> requires (vlib::is_any_integer_Numeric<Integer>::value && !vlib::is_Len<Integer>::value) constexpr
Bool get_param(
    vlib::http::Response& response,
    const Json& params,
    Integer*& param,
    const char* key,
    uint len
) {
    param = nullptr;
    JsonValue* value = nullptr;
    if (!get_param_h(value, response, params, key, len, vlib::json::integer)) {
        return false;
    }
    param = &value->asi();
    return true;
}
constexpr
Bool get_param(
    vlib::http::Response& response,
    const Json& params,
    Len*& param,
    const char* key,
    uint len
) {
    param = nullptr;
    JsonValue* value = nullptr;
    if (!get_param_h(value, response, params, key, len, vlib::json::len)) {
        return false;
    }
    param = &value->asl();
    return true;
}
constexpr
Bool get_param(
    vlib::http::Response& response,
    const Json& params,
    String*& param,
    const char* key,
    uint len
) {
    param = nullptr;
    JsonValue* value = nullptr;
    if (!get_param_h(value, response, params, key, len, vlib::json::string)) {
        return false;
    }
    param = &value->ass();
    if (param->is_undefined()) {
        response.reconstruct(
            vlib::http::version::v1_1,
            vlib::http::status::bad_request,
            {{"Connection", "close"}},
            Json {{"error", to_str("Define parameter \"", key, "\".")}}
        );
        return false;
    }
    return true;
}
constexpr
Bool get_param(
    vlib::http::Response& response,
    const Json& params,
    JArray*& param,
    const char* key,
    uint len
) {
    param = nullptr;
    JsonValue* value = nullptr;
    if (!get_param_h(value, response, params, key, len, vlib::json::array)) {
        return false;
    }
    param = &value->asa();
    return true;
}
constexpr
Bool get_param(
    vlib::http::Response& response,
    const Json& params,
    Json*& param,
    const char* key,
    uint len
) {
    param = nullptr;
    JsonValue* value = nullptr;
    if (!get_param_h(value, response, params, key, len, vlib::json::json)) {
        return false;
    }
    param = &value->asj();
    return true;
}

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

