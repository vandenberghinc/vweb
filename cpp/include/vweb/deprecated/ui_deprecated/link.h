/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_UI_LINK_H
#define VWEB_UI_LINK_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// Link.

struct Link {
    
// Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    String  m_text;
	String  m_url;
	Json	m_style = {
		{"font-family", "inherit"},
		{"color", "rgb(85, 108, 214)"},
		{"text-decoration", "underline"},
		{"text-underline-position", "auto"},
		{"cursor", "pointer"},
	};
    
// Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
    // Constructor.
    constexpr
    Link(const String& text, const String& url) :
    m_text(text),
	m_url(url)
	{}
    
	// ---------------------------------------------------------
	// Functions.
	
	// Set style.
	auto&	style(String key, String value) {
		m_style[move(key)] = move(value);
		return *this;
	}
	
	// Set color.
	auto&	color(String value) {
		m_style["color"] = move(value);
		return *this;
	}
	
	// Set text decoration.
	auto&	text_decoration(String value) {
		m_style["text-decoration"] = move(value);
		return *this;
	}
	
	// Set text underline position.
	auto&	text_underline_position(String value) {
		m_style["text-underline-position"] = move(value);
		return *this;
	}
	
    // ---------------------------------------------------------
    // Casts.
	
	// Concat.
	constexpr friend
	String operator + (const char* x, const Link& y) {
		return String(x) << y;
	}
	constexpr friend
	String operator <<(const char* x, const Link& y) {
		return String(x) << y;
	}
    
    // To string in javascript code.
    constexpr
    operator String() const {
		String str;
		str << "<a style='";
		for (auto& [key, value]: m_style.iterate()) {
			str << *key << ":" << value->ass() << ';';
		}
		str << "' href='" << m_url << "'>" <<
		m_text << "</a>";
		return str;
    }
    
};

// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
using Link = vweb::ui::Link;
}

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

