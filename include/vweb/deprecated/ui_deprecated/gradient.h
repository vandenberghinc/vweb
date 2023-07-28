/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_UI_GRADIENT_H
#define VWEB_UI_GRADIENT_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// Gradient.

template <short type> requires (type == 0 || type == 1)
struct Gradient {
    
    // Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
    
    String          m_degree;
    Array<String>   m_colors;
    
    // Public.
public:
    
    // ---------------------------------------------------------
    // Constructor.
    
    // Default constructor.
    constexpr
    Gradient() = default;
    
    // Constructor with degree.
    template <typename... Args> constexpr
    Gradient(const Int& degree, Args&&... args) :
    m_degree(to_str(degree, "deg"))
    {
        add_color(args...);
    }
    
    // Constructor without.
    // The percentage is a percentage float from 0.0 till 1.0.
    template <typename... Args> constexpr
    Gradient(const String& color, const Float& percentage, Args&&... args) :
    m_degree("0deg")
    {
        add_color(color, percentage, args...);
    }
    
    // ---------------------------------------------------------
    // Functions.
    
    // Add a color to the gradient.
    // The percentage is a percentage float from 0.0 till 1.0.
    constexpr
    auto&   add_color() { return *this; }
    template <typename... Args> constexpr
    auto&   add_color(const String& color, const Float& percentage, Args&&... args) {
        m_colors.append(to_str(color, ' ', pad_numeric(percentage * 100, "%")));
        return add_color(args...);
    }
    // template <typename... Args> constexpr
    // auto&   add_color(const String& color, Args&&... args) {
    //     m_colors.append(color);
    //     return add_color(args...);
    // }
    
    // ---------------------------------------------------------
    // Casts.
    
    // To style value.
    constexpr
    String   style() const {
        String x;
        switch (type) {
            case 0: // linear.
                x.concats_r("linear-gradient");
                break;
            case 1: // radial.
                x.concats_r("radial-gradient");
                break;
        }
        x.concats_r("(", m_degree, ", ");
        for (auto& color: m_colors) {
            x.concats_r(color, ", ");
        }
        if (m_colors.len() > 0) {
            x.len() -= 2;
        }
        x.concats_r(")");
        return x;
    }
    
    // To string in javascript code.
    constexpr
    operator String() const {
        return style();
    }
    
};

// Aliases.
using LinearGradient = Gradient<0>;
using RadialGradient = Gradient<1>;

// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
using LinearGradient = vweb::ui::LinearGradient;
using RadialGradient = vweb::ui::RadialGradient;
}

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

