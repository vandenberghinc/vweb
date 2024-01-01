/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_EVENT_H
#define VWEB_UI_EVENT_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// Events.

struct Event {
    
// Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    JArray  m_children;
    
    // ---------------------------------------------------------
    // Private functions.
    
    // Append to children.
    template <typename... Args> constexpr
    void append_h() {}
    template <typename... Children> constexpr
    void append_h(const SetVariable& child, Children&&... children) {
        m_children.append(child.json());
        append_h(children...);
    }
    template <typename... Children> constexpr
    void append_h(const ToggleVariable& child, Children&&... children) {
        m_children.append(child.json());
        append_h(children...);
    }
    template <typename... Children> constexpr
    void append_h(const Redirect& child, Children&&... children) {
        m_children.append(child.json());
        append_h(children...);
    }
    template <typename Type, typename... Children> requires (is_JavaScript<Type>::value) constexpr
    void append_h(const Type& child, Children&&... children) {
        m_children.append(child.json());
        append_h(children...);
    }
    template <typename Type, typename... Children> requires (is_Element<Type>::value) constexpr
    void append_h(const Type& child, Children&&... children) {
        if (child.type() != "GetElementById") {
            throw ElementError("vweb::Element", toString("Function is not supported for element \"", child.type(), "\"."));
        }
        m_children.append(JavaScript(child.js(false)).json());
        append_h(children...);
    }

// Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
    // Constructor.
    template <typename... Children> constexpr
    Event(Children&&... children)
    {
        append_h(children...);
    }
    
    // ---------------------------------------------------------
    // To json.
    
    constexpr
    Json  json() const {
        return Json {
            {"type", "Event"},
            {"children", m_children},
        };
    }
    
};

// Is type.
template <typename Type>
struct is_Event { SICEBOOL value = false; };
template <>
struct is_Event<Event> { SICEBOOL value = true;  };

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

