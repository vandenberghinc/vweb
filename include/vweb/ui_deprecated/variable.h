/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_VARIABLE_H
#define VWEB_UI_VARIABLE_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// Variable.

// Variable Template.
#define VWEB_VARIABLE_TEMPLATE(type_name, type_str) \
struct type_name { \
    \
    Json    m_info; \
    Bool    m_use_json = true; \
    \
    constexpr \
    type_name(const String& name) : \
    m_info({ \
        {"type", type_str}, \
        {"key", name}, \
        {"value", vlib::null}, \
    }) \
    {} \
    \
    template <typename Type> requires ( \
        vlib::is_String<Type>::value || \
        vlib::is_Bool<Type>::value || \
        vlib::is_bool<Type>::value || \
        vlib::is_any_Numeric<Type>::value || \
        vlib::is_any_numeric<Type>::value \
    ) constexpr \
    type_name(const String& name, const Type& value) : \
    m_info({ \
        {"type", type_str}, \
        {"key", name}, \
        {"value", value}, \
    }) \
    {} \
    \
    constexpr \
    type_name(const String& name, const char* value) : \
    m_info({ \
        {"type", type_str}, \
        {"key", name}, \
        {"value", value}, \
    }) \
    {} \
    \
    constexpr \
    Json   json() const {  \
        return m_info;  \
    } \
    \
};

// Variable.
struct Variable; VWEB_VARIABLE_TEMPLATE(Variable, "Variable");
struct SetVariable; VWEB_VARIABLE_TEMPLATE(SetVariable, "SetVariable");
struct ToggleVariable; VWEB_VARIABLE_TEMPLATE(ToggleVariable, "ToggleVariable");

// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
using Variable = vweb::ui::Variable;
using SetVariable = vweb::ui::SetVariable;
using ToggleVariable = vweb::ui::ToggleVariable;
}

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

