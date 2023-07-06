/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_UTILS_H
#define VWEB_UI_UTILS_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// Template types.
#define VWEB_NUMERIC_TYPE template <typename Type> requires (vlib::is_any_numeric<Type>::value || vlib::is_any_Numeric<Type>::value)
#define VWEB_STRING_TYPE template <typename Type> requires (vlib::is_String<Type>::value)
#define VWEB_STRING_F_TYPE template <typename Type> requires (vlib::is_forwardable<Type, String>::value)
#define VWEB_NUMERIC_STRING_TYPE template <typename Type> requires (vlib::is_any_numeric<Type>::value || vlib::is_any_Numeric<Type>::value || vlib::is_String<Type>::value)
#define VWEB_NUMERIC_STRING_F_TYPE template <typename Type> requires (vlib::is_any_numeric<Type>::value || vlib::is_any_Numeric<Type>::value || vlib::is_String<Type>::value || vlib::is_forwardable<Type, String>::value)

// Pad a numeric and add a string raw.
VWEB_NUMERIC_TYPE constexpr
String  pad_numeric(const Type& value, const String& padding) {
    return tostr(value, padding);
}
VWEB_STRING_TYPE constexpr
auto& pad_numeric(const Type& value, const String&) {
    return value;
}
VWEB_STRING_F_TYPE constexpr
String pad_numeric(const Type& value, const String&) {
    return value;
}

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

