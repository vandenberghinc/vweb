/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_UI_GET_ELEMENT_H
#define VWEB_UI_GET_ELEMENT_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// Events.

struct GetElement {
    
    // Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    String  m_id;
    String  m_key;
    String  m_value;
    
    // Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
    // Constructor.
    constexpr
    GetElement(const String& id) :
    m_id(id)
    {}
    
    // ---------------------------------------------------------
    // Functions.
    
    // Get id.
    constexpr auto& id() const { return m_id; }
    
    // Get key.
    constexpr auto& key() const { return m_key; }
    
    // Get value (for Input).
    constexpr
    auto& value() {
        m_key = "value";
        return *this;
    }
    
    // Get text (for Text).
    constexpr
    auto& text() {
        m_key = "textContent";
        return *this;
    }
    
    // Set text (for Text).
    constexpr
    auto& text(const String& value) {
        m_key = "textContent";
        m_value = value;
        return *this;
    }
    
    // Set text to js (for Text).
    template <typename JavaScript> requires (is_JavaScript<JavaScript>::value) constexpr
    auto& text(const JavaScript& value) {
        m_key = "textContent";
        m_value = value.js();
        return *this;
    }
    
    // Select a value of the element.
    constexpr
    auto& operator [](const String& key) {
        m_key = key;
        return *this;
    }
    
    // ---------------------------------------------------------
    // To json.
    
    constexpr
    Json    json() const {
        return Json {
            {"type", "GetElement"},
            {"id", m_id},
            {"key", m_key},
            {"value", m_value},
        };
    }
    
    // To javascript code.
    // Does not end with ';'.
    constexpr
    String  js() const {
        if (m_value.is_defined()) {
            if (m_value.len() > 2 && m_value.first() == '$' && m_value.last() == '$') {
                return toString("document.getElementById('", m_id, "').", m_key, "=", CString(m_value.data() + 1, m_value.len() - 2));
            } else {
                return toString("document.getElementById('", m_id, "').", m_key, "='", m_value, "'");
            }
        } else {
            return toString("document.getElementById('", m_id, "').", m_key);
        }
    }
    
};

// Is type.
template <typename Type>
struct is_GetElement { SICEBOOL value = false; };
template <>
struct is_GetElement<GetElement>    { SICEBOOL value = true;  };

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

