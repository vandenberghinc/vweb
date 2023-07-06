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

template <int EventType> requires (EventType >= 0 && EventType <= 1)
struct EventTemplate {
    
// Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    Int     m_delay;
    JArray  m_children;
    
    // ---------------------------------------------------------
    // Private functions.
    
    // Append to children.
    template <typename... Args> constexpr
    void append_h() {}
    template <typename Child, typename... Children>
    void append_h(const Child& child, Children&&... children) {
        const Json json = child.json();
        static const Array<String> allowed_types = {
            "Event",
            "Delay",
            "SetVariable",
            "ToggleVariable",
            "Redirect",
            "JavaScript",
            "GetElementById",
            "IfResponseStatusEq",
            "IfResponseStatusNotEq",
            "IfResponseStatusGreater",
            "IfResponseStatusGreaterEq",
            "IfResponseStatusLesser",
            "IfResponseStatusLesserEq",
        };
        if (allowed_types.contains(json["type"].ass())) {
            if (json["type"].ass() == "GetElementById") {
                m_children.append(JavaScript(json["js"]).json());
            } else {
                m_children.append(json);
            }
            append_h(children...);
            return ;
        }
        throw ElementError("An \"Event\" can not have \"", json["type"].ass(), "\" children.");
    }

// Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
    // Constructor.
    template <typename... Children> requires (EventType == 0) constexpr
    EventTemplate(Children&&... children)
    {
        append_h(children...);
    }
    
    // Delay constructor.
    template <typename... Children> requires (EventType == 1) constexpr
    EventTemplate(const Int& ms_delay, Children&&... children) :
    m_delay(ms_delay)
    {
        append_h(children...);
    }
    
    // ---------------------------------------------------------
    // To json.
    
    constexpr
    Json  json() const requires (EventType == 0) {
        return Json {
            {"type", "Event"},
            {"children", m_children},
        };
    }
    constexpr
    Json  json() const requires (EventType == 1) {
        return Json {
            {"type", "Delay"},
            {"delay", m_delay},
            {"children", m_children},
        };
    }
    
};

// Aliases.
using Event = EventTemplate<0>;
using Delay = EventTemplate<1>;

// Is type.
template <typename Type>
struct is_Event { SICEBOOL value = false; };
template <> struct is_Event<Event> { SICEBOOL value = true;  };
template <> struct is_Event<Delay> { SICEBOOL value = true;  };


// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
using Event = vweb::ui::Event;
using Delay = vweb::ui::Delay;
}

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

