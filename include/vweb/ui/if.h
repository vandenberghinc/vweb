/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_UI_IF_H
#define VWEB_UI_IF_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// If.

struct If {
    
// Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    Json  m_child;
    
// Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
    // Constructor.
    template <typename Child> constexpr
    If(const Bool& value, const Child& child) {
        if (value) {
            m_child = child.json();
        }
    }
    
    // ---------------------------------------------------------
    // To json.
    
    constexpr
    auto&  json() const {
        return m_child;
    }
    
};

// Is type.
template <typename Type>
struct is_If { SICEBOOL value = false; };
template <>
struct is_If<If> { SICEBOOL value = true;  };

// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
using If = vweb::ui::If;
}

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

