/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_URLPARAM_H
#define VWEB_UI_URLPARAM_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// JavaScript.

// Only '' strings can be used inside the js code, "" strings will cause a js error.
struct URLParam {
    
    // Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    String  m_key;
    
// Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
	// Constructor.
	constexpr URLParam() = default;
    // Constructor.
    constexpr
    URLParam(String key) :
    m_key(move(key))
    {}
	
	// ---------------------------------------------------------
	// Functions.
	
	// Key.
	constexpr auto& key() { return m_key; }
	constexpr auto& key() const { return m_key; }
    
};


// Is type.
template <typename Type>
struct is_URLParam { SICEBOOL value = false; };
template <>
struct is_URLParam<URLParam> { SICEBOOL value = true;  };

// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
using URLParam = vweb::ui::URLParam;
}

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.
