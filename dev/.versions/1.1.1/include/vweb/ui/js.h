/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_JavaScript_H
#define VWEB_UI_JavaScript_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// JavaScript.

// Only '' strings can be used inside the js code, "" strings will cause a js error.
struct JavaScript {
    
    // Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    String  m_code;
    
// Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
    // Constructor.
    template <typename... Args> constexpr
    JavaScript(Args&&... args) :
    m_code(toString(args...))
    {}
    
    // ---------------------------------------------------------
    // Casts.
    
    // To json.
    constexpr
    Json   json() const {
        return Json {
            {"type", "JavaScript"},
            {"code", m_code},
        };
    }
    
    // To javascript code.
    constexpr
    String   js() const {
        String js;
        js.concats_r('$', m_code, '$');
        return js;
    }
    
    // To string in javascript code.
    constexpr
    operator String() const {
        return js();
    }
    
};

// Is type.
template <typename Type>
struct is_JavaScript { SICEBOOL value = false; };
template <>
struct is_JavaScript<JavaScript> { SICEBOOL value = true;  };

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

