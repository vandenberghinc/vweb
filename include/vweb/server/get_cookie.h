/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_GET_COOKIE_H
#define VWEB_GET_COOKIE_H

// Namespace vweb.
namespace vweb {

// Check and get parameter.
/*  @docs {
 *  @chapter: server
 *  @title: Get Cookie Value
 *  @description:
 *      Get a cookie value by key.
 *  @parameter: {
 *      @name: cookie
 *      @description: The cookie string.
 *  }
 *  @parameter: {
 *      @name: key
 *      @description: The cookie key to get.
 *  }
 *  @return: Returns a string with the cookie text, when the key does not exist the string is undefined.
 *  @usage:
 *      ...
 *      String value = vweb::get_cookie(headers, "mykey");
 *  @funcs: 2
 } */
constexpr
String get_cookie(const String& cookie, const String& key) {
    ullong start, end;
    String full_key = to_str(key, '=');
    if ((start = cookie.find(full_key)) != NPos::npos) {
        if ((end = cookie.find(';', start)) != NPos::npos) {
            return String(cookie.data() + (start + full_key.len()), end - start);
        } else {
            return String(cookie.data() + (start + full_key.len()), cookie.len() - (start + full_key.len()));
        }
    }
    return {};
}
constexpr
String get_cookie(const vlib::http::Headers& headers, const String& key) {
    ullong index;
    if ((index = headers.find("Cookie", 6)) != NPos::npos) {
        return get_cookie(headers.value(index), key);
    }
    return {};
}

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

