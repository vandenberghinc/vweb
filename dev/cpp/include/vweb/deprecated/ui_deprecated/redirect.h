/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_UI_REDIRECT_H
#define VWEB_UI_REDIRECT_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// Redirect.
// By default a redirect only happens when the current endpoint ...
// Does not match the redirect endpoint. This can be overwritten with forced().
struct Redirect {
    
// Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    String  m_url;
	Bool 	m_url_param = false;
    Bool    m_forced = false; // always redirect, even when on the same page.

// Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
    // Constructor.
    constexpr
    Redirect(const String& url) :
    m_url(url)
    {}
	
	// Constructor.
	constexpr
	Redirect(const URLParam& url_param) :
	m_url(url_param.key()),
	m_url_param(true)
	{}
    
    // ---------------------------------------------------------
    // Functions.
    
    // Set forced.
    constexpr
    auto&   forced(const Bool& to) {
        m_forced = to;
        return *this;
    }
    
    // ---------------------------------------------------------
    // To json.
    
    constexpr
    Json    json() const {
        return Json {
            {"type", "Redirect"},
            {"forced", m_forced},
			{"url_param", m_url_param},
            {"url", m_url},
        };
    }
    
};

// Is type.
template <typename Type>
struct is_Redirect { SICEBOOL value = false; };
template <>
struct is_Redirect<Redirect> { SICEBOOL value = true;  };

// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
using Redirect = vweb::ui::Redirect;
}

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

