/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_FOR_EACH_H
#define VWEB_UI_FOR_EACH_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// For Each.

struct ForEach {
    
    // Attributes.
    JArray  m_children;
    
    // Range.
    template <typename Range, typename Func> requires (vlib::is_Range<Range>::value)
    ForEach(const Range& obj, Func&& func) {
        for (auto& i: obj) {
            m_children.append(func(i).json());
        }
    }
    
    // Array.
    template <typename Array, typename Func> requires (vlib::is_Array<Array>::value)
    ForEach(const Array& obj, Func&& func) {
        for (auto& i: obj) {
            m_children.append(func(i).json());
        }
    }
    
    // As json.
    Json  json() const {
        return Json {
            {"type", "ForEach"},
            {"children", m_children},
        };
    }
    
};

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

