/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_ELEMENT_H
#define VWEB_UI_ELEMENT_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// Exceptions.

struct ElementError; CREATE_EXCEPTION(ElementError, "ElementError");

// ---------------------------------------------------------
// Enums.

// Animation.
namespace alignment {
    enum {
        leading = 1,
        center = 2,
        trailing = 3,
        justify = 4,
    };
    String tostr(const Int& alignment) {
        switch (alignment.value()) {
            case leading:
                return String("leading", 7);
            case center:
                return String("center", 6);
            case trailing:
                return String("trailing", 8);
            case justify:
                return String("justify", 7);
            default:
                throw ElementError("vweb::alignment", toString("Unknown alignment \"", alignment, "\"."));
        }
    }
}

// Animation.
namespace animations {
    enum {
        in = 1,
        out = 2,
    };
    String tostr(const Int& animation) {
        switch (animation.value()) {
            case in:
                return String("in", 2);
            case out:
                return String("out", 3);
            default:
                throw ElementError("vweb::animations", toString("Unknown animation \"", animation, "\"."));
        }
    }
}

// ---------------------------------------------------------
// Element.

/*  @docs {
    @chapter: views
    @title: Element
    @description:
        UI element.
    @warning:
        Using an `Element` object directly causes undefined behaviour when using copy or move constructors.
 } */
struct Element {
    
// Protected.
protected:
    
    // ---------------------------------------------------------
    // Attributes.
    
    String          m_type;
    String          m_tag;
    String          m_id;
    String          m_text;
    String          m_input; // input type.
    String          m_img; // image source.
    String          m_key; // key for variable of variable condition, and for retrieving values from the GetElement.
    JsonValue       m_value; // value for variable of variable condition, and for setting values from GetElement.
    Json            m_animations; // animation per key.
	Int			    m_columns = 1; // the amount of columns for an HStack.
    Array<String>   m_select_options; // options for a select input.
    String          m_href; // href attribute for elements.
    Json            m_style;
    Json            m_container_style; // style of the cointainer that some elements require.
    Json            m_attr; // element attributes for example used in iframe, only used for attributes that are not included in the attributes of Element, like m_href.
    JArray          m_on_click;
    JArray          m_children;
    String          m_meta_author; // meta author.
    String          m_meta_title; // meta title.
    String          m_meta_description; // meta description.
    String          m_meta_img; // meta image.
    String          m_meta_robots; // meta robots content.
    
    // ---------------------------------------------------------
    // Protected functions.
    
    // Set style.
    constexpr
    auto&   style(const Json& style) {
        m_style = style;
        return *this;
    }
    
    // Set attr.
    constexpr
    auto&   attr(const Json& attr) {
        m_attr = attr;
        return *this;
    }
    
    // Select options.
    constexpr
    auto&   select_options(const Array<String>& opts) {
        m_select_options = opts;
        return *this;
    }
    constexpr
    auto&   select_option() {
        return *this;
    }
    template <typename... Args> constexpr
    auto&   select_option(const String& opt, Args&&... args) {
        m_select_options.append(opt);
        return select_option(args...);
    }
    
    // Append children.
    template <typename... Args> constexpr
    void append_h(JArray&) {}
    template <typename Child, typename... Children> requires (is_If<Child>::value) constexpr
    void append_h(JArray& array, const Child& child, Children&&... children) {
        auto& j = child.json();
        if (j.is_defined()) {
            array.append(child.json());
        }
        append_h(array, children...);
    }
    template <typename Child, typename... Children> requires (!is_If<Child>::value) constexpr
    void append_h(JArray& array, const Child& child, Children&&... children) {
        array.append(child.json());
        append_h(array, children...);
    }
    
// Public.
public:
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Default constructor.
    constexpr
    Element() = default;
    
    // Constructor with children.
    constexpr
    Element(const String& type, const String& tag) :
    m_type(type),
    m_tag(tag)
    {}
    
    // ---------------------------------------------------------
    // Attriubtes.
    
    // Get id.
    constexpr auto& id() const { return m_id; }
    
    // Get type.
    constexpr auto& type() const { return m_type; }
    
    // Get key.
    constexpr auto& key() const { return m_key; }
    
    // Get style.
    constexpr auto& style() const { return m_style; }
    
    // ---------------------------------------------------------
    // Metadata functions.
    // Are only used on the main View that is passed to the Endpoint.
    
    // Get and set the main View's meta author.
    constexpr
    auto&   meta_author() const { return m_meta_author; }
    constexpr
    auto&   meta_author(const String& author) {
        m_meta_author = author;
        return *this;
    }
    
    // Get and set the main View's meta title.
    constexpr
    auto&   meta_title() const { return m_meta_title; }
    constexpr
    auto&   meta_title(const String& title) {
        m_meta_title = title;
        return *this;
    }
    
    // Get and set the main View's meta description.
    constexpr
    auto&   meta_description() const { return m_meta_description; }
    constexpr
    auto&   meta_description(const String& description) {
        m_meta_description = description;
        return *this;
    }
    
    // Get and set the main View's meta image.
    constexpr
    auto&   meta_image() const { return m_meta_img; }
    constexpr
    auto&   meta_image(const String& img) {
        m_meta_img = img;
        return *this;
    }
    
    // Get and set the main View's meta robots rules.
    constexpr
    auto&   meta_robots() const { return m_meta_robots; }
    constexpr
    auto&   meta_robots(const String& rules) {
        m_meta_robots = rules;
        return *this;
    }
    
    // ---------------------------------------------------------
    // Basic functions.
    
    // Set id.
    constexpr
    auto&   id(const String& x) {
        m_id = x;
        return *this;
    }
    
    // Set text.
    auto&   text(const String& text) {
        if (m_type == "GetElementById") {
            m_key = "textContent";
            m_value = text;
        } else {
            m_text = text;
        }
        return *this;
    }
    
    // Set input type.
    auto&   input(const String& type) {
        m_input = type;
        return *this;
    }
    
    // Set image source.
    auto&   image(const String& source) {
        m_img = source;
        return *this;
    }
    
    // Set key.
    auto&   key(const String& key) {
        m_key = key;
        return *this;
    }
    
    // Set value.
    auto&   value(const JsonValue& value) {
        if (m_type == "GetElementById") {
            m_key = "value";
            m_value = value;
        } else {
            m_value = value;
        }
        return *this;
    }
    
    // Set a style key and value.
    // Automatically checks if the style should be applied to the container or not.
    // WARNING: May cause undefined behaviour when used outside of Element.
    constexpr
    auto& auto_style(
        const String& key,
        const JsonValue& value,
        const Bool& overwrite = true,
        const char& joiner = ' '
    ) {
        if (m_type == "Image" || m_type == "ImageButton" || m_type == "GoogleMap") {
            if (!overwrite && m_container_style.contains(key)) {
                m_container_style[key].ass() += toString(joiner, ' ', value);
            } else {
                m_container_style[key]= value;
            }
        } else {
            if (!overwrite && m_style.contains(key)) {
                m_style[key].ass() += toString(joiner, ' ', value);
            } else {
                m_style[key]= value;
            }
        }
        return *this;
    }
    // Always assigns to the child style.
    constexpr
    auto& style(
        const String& key,
        const JsonValue& value,
        const Bool& overwrite = true,
        const char& joiner = ' '
    ) {
        if (!overwrite && m_style.contains(key)) {
            m_style[key].ass() += toString(joiner, ' ', value);
        } else {
            m_style[key]= value;
        }
        return *this;
    }
    
    // Remove style.
    constexpr
    auto&   remove_style(const String& key) {
        return style(key, "", true);
    }
    constexpr
    auto&   auto_remove_style(const String& key) {
        return auto_style(key, "", true);
    }
    
    // Set href.
    constexpr
    auto&   href(const String& value) {
        m_href = value;
        return *this;
    }
    
    // ---------------------------------------------------------
    // Get Element functions.
    
    // Get value.
    constexpr
    auto&   get_value() {
        m_key = "value";
        return *this;
    }
    
    // Get text.
    constexpr
    auto&   get_text() {
        m_key = "textContent";
        return *this;
    }
    
    // To javascript code.
    // Only applicable for GetElement family types.
    constexpr
    String  js(const Bool& pad = true) const {
        if (m_type != "GetElementById") {
            throw ElementError("vweb::Element", toString("Function is not supported for element \"", m_type, "\"."));
        }
        
        // Process value.
        // Changes start and end " to a '.
        // And removes ' when the text is js code ($).
        auto process_value = [](String value) {
            if (value.len() > 0 && value.first() == '"') {
                value.first() = '\'';
            }
            if (value.len() > 0 && value.last() == '"') {
                value.last() = '\'';
            }
            if (value.len() > 1 && value[1] == '$') {
                value.slice_r(2, value.len() - 2);
            }
            return value;
        };
        
        // Create js code.
        String js;
        if (pad) {
            js.append('$');
        }
        
        // Assign value to key.
        if (m_key.is_defined() && m_value.is_defined()) {
            String value = m_value.json();
            js.concats_r("document.getElementById('", m_id, "').", m_key, " = ", process_value(m_value.json()), "; ");
        }
        
        // Get key.
        // Do not add a semicolon since it is used in request bodies.
        else if (m_key.is_defined()) {
            js.concats_r("document.getElementById('", m_id, "').", m_key);
        }
        
        // Set styling by javascript.
        else {
            js.concats_r("e = document.getElementById('", m_id, "'); ");
            for (auto& index: m_style.indexes()) {
                js.concats_r("e.style['", m_style.key(index), "'] = ", process_value(m_style.value(index).json()), "; ");
            }
        }
        
        // Handler.
        if (pad) {
            js.append('$');
        }
        return js;
    }
    
    // ---------------------------------------------------------
    // Text styling.
    
    // Font.
    constexpr
    auto&   font(const String& value) {
        m_style["font"] = value;
        return *this;
    }
    
    // Font family.
    constexpr
    auto&   font_family(const String& value) {
        m_style["font-family"] = value;
        return *this;
    }
    
    // Font weight.
    constexpr
    auto&   font_weight(const Int& value) {
        m_style["font-weight"] = value;
        return *this;
    }
    
    // Font style.
    constexpr
    auto&   font_style(const String& value) {
        m_style["font-style"] = value;
        return *this;
    }
    
    // Letter spacing.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   letter_spacing(const Type& value) {
        m_style["letter-spacing"] = pad_numeric(value, "px");
        return *this;
    }
    
    // Font style.
    constexpr
    auto&   color(const String& value) {
        m_style["color"] = value;
        return *this;
    }
    constexpr
    auto&   color(const LinearGradient& value) {
        m_style["background"] = String(value);
        m_style["-webkit-background-clip"] = "text";
        m_style["-webkit-text-fill-color"] = "transparent";
        return *this;
    }
    constexpr
    auto&   color(const RadialGradient& value) {
        m_style["background"] = String(value);
        m_style["-webkit-background-clip"] = "text";
        m_style["-webkit-text-fill-color"] = "transparent";
        return *this;
    }
    
    // Font shadow.
    constexpr
    auto&   font_shadow(
        const Int& horizontal,
        const Int& vertical,
        const String& color
    ) {
        style("text-shadow", toString(horizontal, "px ", vertical, "px ", color), false, ',');
        return *this;
    }
    constexpr
    auto&   font_shadow(
        const Int& horizontal,
        const Int& vertical,
        const Int& blur,
        const String& color
    ) {
        style("text-shadow", toString(horizontal, "px ", vertical, "px ", blur, "px ", color), false, ',');
        return *this;
    }
    
    // Font size.
    constexpr
    auto&   font_size(const Int& value) {
        m_style["font-size"] = toString(value, "px");
        return *this;
    }
    constexpr
    auto&   font_size(const String& value) {
        m_style["font-size"] = value;
        return *this;
    }
    
    // Line height.
    constexpr
    auto&   line_height(const Int& value) {
        m_style["line-height"] = toString(value, "px");
        return *this;
    }
    constexpr
    auto&   line_height(const String& value) {
        m_style["line-height"] = value;
        return *this;
    }
    
    // Text decoriation.
    constexpr
    auto&   text_decoration(const String& value) {
        m_style["text-decoration"] = value;
        return *this;
    }
    
    // ---------------------------------------------------------
    // Color styling.
    
    // Background.
    constexpr
    auto&   background(const String& value) {
        m_style["background"] = value;
        return *this;
    }
    
    // Border.
    VWEB_NUMERIC_TYPE constexpr
    auto&   border(const Type& value, const String& style, const String& color) {
        auto_style("border", toString(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border(const Type& value, const String& color) {
        auto_style("border", toString(value, "px solid ", color));
        return *this;
    }
    constexpr
    auto&   border(const String& value) {
        auto_style("border", value);
        return *this;
    }
    
    // Border top.
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_top(const Type& value, const String& style, const String& color) {
        auto_style("border-top", toString(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_top(const Type& value, const String& color) {
        auto_style("border-top", toString(value, "px solid ", color));
        return *this;
    }
    constexpr
    auto&   border_top(const String& value) {
        auto_style("border-top", value);
        return *this;
    }
    
    // Border right.
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_right(const Type& value, const String& style, const String& color) {
        auto_style("border-right", toString(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_right(const Type& value, const String& color) {
        auto_style("border-right", toString(value, "px solid ", color));
        return *this;
    }
    constexpr
    auto&   border_right(const String& value) {
        auto_style("border-right", value);
        return *this;
    }
    
    // Border bottom.
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_bottom(const Type& value, const String& style, const String& color) {
        auto_style("border-bottom", toString(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_bottom(const Type& value, const String& color) {
        auto_style("border-bottom", toString(value, "px solid ", color));
        return *this;
    }
    constexpr
    auto&   border_bottom(const String& value) {
        auto_style("border-bottom", value);
        return *this;
    }
    
    // Border left.
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_left(const Type& value, const String& style, const String& color) {
        auto_style("border-left", toString(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_left(const Type& value, const String& color) {
        auto_style("border-left", toString(value, "px solid ", color));
        return *this;
    }
    constexpr
    auto&   border_left(const String& value) {
        auto_style("border-left", value);
        return *this;
    }
    
    // Border color.
    constexpr
    auto&   border_color(const String& value) {
        auto_style("border-color", value);
        return *this;
    }
    
    // Border style.
    constexpr
    auto&   border_style(const String& value) {
        auto_style("border-style", value);
        return *this;
    }
    
    // Border width.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   border_width(const Type& value) {
        auto_style("border-width", pad_numeric(value, "px"));
        return *this;
    }
    
    // Border radius.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   border_radius(const Type& value) {
        auto_style("border-radius", pad_numeric(value, "px"));
        return *this;
    }
    
    // Shadow.
    constexpr
    auto&   shadow(
        const Int& horizontal,
        const Int& vertical,
        const String& color
    ) {
        auto_style("box-shadow", toString(horizontal, "px ", vertical, "px ", color), false, ',');
        return *this;
    }
    constexpr
    auto&   shadow(
        const Int& horizontal,
        const Int& vertical,
        const Int& blur,
        const String& color
    ) {
        auto_style("box-shadow", toString(horizontal, "px ", vertical, "px ", blur, "px ", color), false, ',');
        return *this;
    }
    constexpr
    auto&   shadow(const String& value) {
        auto_style("box-shadow", value, false, ',');
        return *this;
    }
    
    // Drop Shadow.
    // Used for png images, etc.
    constexpr
    auto&   drop_shadow(
        const Int& horizontal,
        const Int& vertical,
        const String& color
    ) {
        style("filter", toString("drop-shadow(", horizontal, "px ", vertical, "px ", color, ")"), false, ' ');
        return *this;
    }
    constexpr
    auto&   drop_shadow(
        const Int& horizontal,
        const Int& vertical,
        const Int& blur,
        const String& color
    ) {
        style("filter", toString("drop-shadow(", horizontal, "px ", vertical, "px ", blur, "px ", color, ")"), false, ' ');
        return *this;
    }
    
    // Blur.
    VWEB_NUMERIC_TYPE constexpr
    auto&   blur(const Type& value) {
        if (m_style.contains("filter")) {
            m_style["filter"].ass() += toString(" blur(", value, "px", ")");
        } else {
            m_style["filter"] = toString("blur(", value, "px", ")");
        }
        if (m_type == "Image" || m_type == "ImageButton") {
            m_style["margin"] = toString("-", value * 2, "px");
            m_style["width"] = toString("110%");
            m_style["height"] = toString("110%");
            m_container_style["overflow"] = "hidden";
        }
        return *this;
    }
    
    // Background blur.
    VWEB_NUMERIC_TYPE constexpr
    auto&   background_blur(const Type& value) {
        style("backdrop-filter", toString("blur(", value, "px", ")"), false, ' ');
        style("-webkit-backdrop-filter", toString("blur(", value, "px", ")"), false, ' ');
        return *this;
    }
    
    // Greyscale.
    constexpr
    auto&   greyscale(const Float& value = 1.0) {
        auto_style("filter", toString("grayscale(", value * 100, ")"), false, ' ');
        return *this;
    }
    
    // Opacity.
	// Does not work if no background is assigned.
    VWEB_NUMERIC_TYPE constexpr
    auto&   opacity(const Type& value) {
        style("filter", toString("opacity(", value, "%", ")"), false, ' ');
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   background_opacity(const Type& value) {
        style("backdrop-filter", toString("opacity(", value, "%", ")"), false, ' ');
        style("-webkit-backdrop-filter", toString("opacity(", value, "%", ")"), false, ' ');
        return *this;
    }
    
    // Brightness.
	// Does not work if no background is assigned.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   brightness(const Type& value) {
        style("filter", toString("brightness(", pad_numeric(value, "%"), ")"), false, ' ');
        return *this;
    }
    
    // Fade out.
    VWEB_NUMERIC_TYPE constexpr
    auto&   fade_out_top(const Type& size = 5) {
        auto_style("mask-image", toString("linear-gradient(0deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        auto_style("-webkit-mask-image", toString("linear-gradient(0deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   fade_out_right(const Type& size = 5) {
        auto_style("mask-image", toString("linear-gradient(90deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        auto_style("-webkit-mask-image", toString("linear-gradient(90deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        print(m_style);
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   fade_out_bottom(const Type& size = 5) {
        auto_style("mask-image", toString("linear-gradient(180deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        auto_style("-webkit-mask-image", toString("linear-gradient(180deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   fade_out_left(const Type& size = 5) {
        auto_style("mask-image", toString("linear-gradient(270deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        auto_style("-webkit-mask-image", toString("linear-gradient(270deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        return *this;
    }
    
    // ---------------------------------------------------------
    // Positional styling.
    
    // Width.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   width(const Type& value) {
        auto_style("width", pad_numeric(value, "px"));
        return *this;
    }
    
    // Min & max idth.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   width(const Type& min, const Type& max) {
        auto_style("min-width", pad_numeric(min, "px"));
        auto_style("max-width", pad_numeric(max, "px"));
        return *this;
    }
    
    // Min width.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   min_width(const Type& value) {
        auto_style("min-width", pad_numeric(value, "px"));
        return *this;
    }
    
    // Max width.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   max_width(const Type& value) {
        auto_style("max-width", pad_numeric(value, "px"));
        return *this;
    }
    
    // Height.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   height(const Type& value) {
        auto_style("height", pad_numeric(value, "px"));
        return *this;
    }
    
    // Min & max height.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   height(const Type& min, const Type& max) {
        auto_style("max-height", pad_numeric(min, "px"));
        auto_style("max-height", pad_numeric(max, "px"));
        return *this;
    }
    
    // Min height.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   min_height(const Type& value) {
        auto_style("min-height", pad_numeric(value, "px"));
        return *this;
    }
    
    // Max height.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   max_height(const Type& value) {
        auto_style("max-height", pad_numeric(value, "px"));
        return *this;
    }
    
    // Position.
    constexpr
    auto&   position(const String& value) {
        auto_style("position", value);
        return *this;
    }
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   position(const Type& top, const Type& right, const Type& bottom, const Type& left) {
        auto_style("position", "absolute");
        auto_style("top", pad_numeric(top, "px"));
        auto_style("right", pad_numeric(right, "px"));
        auto_style("bottom", pad_numeric(bottom, "px"));
        auto_style("left", pad_numeric(left, "px"));
        return *this;
    }
    
    // Top.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   top(const Type& value) {
        auto_style("top", pad_numeric(value, "px"));
        return *this;
    }
    
    // Right.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   right(const Type& value) {
        auto_style("right", pad_numeric(value, "px"));
        return *this;
    }
    
    // Bottom.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   bottom(const Type& value) {
        auto_style("bottom", pad_numeric(value, "px"));
        return *this;
    }
    
    // Left.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   left(const Type& value) {
        auto_style("left", pad_numeric(value, "px"));
        return *this;
    }
    
    // Margin.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   margin(const Type& value) {
        // Do not assign to margin since this would break support for "flex_basis".
        // Since "flex_basis" requires the margin-left and margin-right for js calculations.
        auto_style("margin-top", pad_numeric(value, "px"));
        auto_style("margin-right", pad_numeric(value, "px"));
        auto_style("margin-left", pad_numeric(value, "px"));
        auto_style("margin-bottom", pad_numeric(value, "px"));
        return *this;
    }
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   margin(const Type& top, const Type& right, const Type& bottom, const Type& left) {
        // Do not assign to margin since this would break support for "flex_basis".
        // Since "flex_basis" requires the margin-left and margin-right for js calculations.
        auto_style("margin-top", pad_numeric(top, "px"));
        auto_style("margin-right", pad_numeric(right, "px"));
        auto_style("margin-left", pad_numeric(left, "px"));
        auto_style("margin-bottom", pad_numeric(bottom, "px"));
        return *this;
    }
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   margin_top(const Type& value) {
        auto_style("margin-top", pad_numeric(value, "px"));
        return *this;
    }
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   margin_right(const Type& value) {
        auto_style("margin-right", pad_numeric(value, "px"));
        return *this;
    }
    
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   margin_bottom(const Type& value) {
        auto_style("margin-bottom", pad_numeric(value, "px"));
        return *this;
    }
    
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   margin_left(const Type& value) {
        auto_style("margin-left", pad_numeric(value, "px"));
        return *this;
    }
    
    // Padding.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   padding(const Type& value) {
        auto_style("padding", pad_numeric(value, "px"));
        return *this;
    }
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   padding(const Type& top, const Type& right, const Type& bottom, const Type& left) {
        auto_style("padding", toString(pad_numeric(top, "px"), " ", pad_numeric(right, "px"), " ", pad_numeric(bottom, "px"), " ", pad_numeric(left, "px")));
        return *this;
    }
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   padding_top(const Type& value) {
        auto_style("padding-top", pad_numeric(value, "px"));
        return *this;
    }
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   padding_right(const Type& value) {
        auto_style("padding-right", pad_numeric(value, "px"));
        return *this;
    }
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   padding_bottom(const Type& value) {
        auto_style("padding-bottom", pad_numeric(value, "px"));
        return *this;
    }
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   padding_left(const Type& value) {
        auto_style("padding-left", pad_numeric(value, "px"));
        return *this;
    }
    
    // Stretch (width).
    template <typename Type> requires (vlib::is_Bool<Type>::value || vlib::is_bool<Type>::value) constexpr
    auto&   stretch(const Type& value) {
        if (m_type == "Image" || m_type == "ImageButton") {
            if (value) {
                m_container_style["flex"] = 1;
                m_style["flex"] = 1;
            } else {
                m_container_style["flex"] = 0;
                m_style["flex"] = 0;
            }
        } else {
            if (value) {
                m_style["flex"] = 1;
                m_style["flex-grow"] = 1;
            } else {
                m_style["flex"] = 0;
                m_style["flex-grow"] = 0;
            }
        }
        return *this;
    }
    
    // Wrap.
    constexpr
    auto&   wrap(const Bool& value) {
        if (value) {
            m_style["white-space"] = "wrap";
        } else {
            m_style["white-space"] = "nowrap";
        }
        if (m_tag == "div") {
            if (value) {
                m_style["flex-flow"] = "wrap";
            } else {
                m_style["flex-flow"] = "nowrap";
            }
        } else {
            if (value) {
                m_style["text-wrap"] = "wrap";
            } else {
                m_style["text-wrap"] = "nowrap";
            }
        }
        return *this;
    }
		
	// Width by wrapped columns.
	// Is only used when on a HStack when "wrap(true)" is assigned.
	// Has a bug for 5 columns.
	constexpr
	auto&	width_by_columns(const Int& columns) {
		m_columns = columns;
		// is automatically calculated by js template with the columns value.
		auto_style("flex-basis", "X");
		// overflow needs to be set to hidden since it can cause the flex box ...
		// calculations by the js template to fail.
		auto_style("overflow", "hidden");	
		return *this;		
	}
	
    // Align.
    constexpr
    auto&   align(const Int& position) {
        if (m_tag == "div") {
            m_style["display"] = "grid";
            switch (position.value()) {
                case alignment::leading:
                    m_style["text-align"] = "start";
                    m_style["justify-items"] = "start";
                    break;
                case alignment::center:
                    m_style["text-align"] = "center";
                    m_style["justify-items"] = "center";
                    break;
                case alignment::trailing:
                    m_style["text-align"] = "end";
                    m_style["justify-items"] = "end";
                    break;
                case alignment::justify:
                    m_style["text-align"] = "justify";
                    m_style["justify-items"] = "justify";
                    break;
                default:
                    throw ElementError("vweb::ui::Element", toString("Invalid alignment \"", position, "\"."));
            }
        }
        else {
            switch (position.value()) {
                case alignment::leading:
                    m_style["text-align"] = "start";
                    break;
                case alignment::center:
                    m_style["text-align"] = "center";
                    break;
                case alignment::trailing:
                    m_style["text-align"] = "end";
                    break;
                case alignment::justify:
                    m_style["text-align"] = "justify";
                    break;
                default:
                    throw ElementError("vweb::ui::Element", toString("Invalid alignment \"", position, "\"."));
            }
        }
        return *this;
    }
    constexpr
    auto&   align(const String& position) {
        if (m_tag == "div") {
            m_style["display"] = "grid";
            if (position == "leading") {
                m_style["text-align"] = "start";
                m_style["justify-items"] = "start";
            } else if (position == "center") {
                m_style["text-align"] = "center";
                m_style["justify-items"] = "center";
            } else if (position == "trailing") {
                m_style["text-align"] = "end";
                m_style["justify-items"] = "end";
            } else if (position == "justify") {
                m_style["text-align"] = "justify";
                m_style["justify-items"] = "justify";
            } else {
                throw ElementError("vweb::ui::Element", toString("Invalid alignment \"", position, "\"."));
            }
        }
        else {
            if (position == "leading") {
                m_style["text-align"] = "start";
            } else if (position == "center") {
                m_style["text-align"] = "center";
            } else if (position == "trailing") {
                m_style["text-align"] = "end";
            } else if (position == "justify") {
                m_style["text-align"] = "justify";
            } else {
                throw ElementError("vweb::ui::Element", toString("Invalid alignment \"", position, "\"."));
            }
        }
        return *this;
    }
    constexpr
    auto&   leading() {
        return align(alignment::leading);
    }
    constexpr
    auto&   center() {
        return align(alignment::center);
    }
    constexpr
    auto&   trailing() {
        return align(alignment::trailing);
    }
    
    // Align text only.
    constexpr
    auto&   align_text(const Int& position) {
        switch (position.value()) {
            case alignment::leading:
                m_style["text-align"] = "start";
                break;
            case alignment::center:
                m_style["text-align"] = "center";
                break;
            case alignment::trailing:
                m_style["text-align"] = "end";
                break;
            case alignment::justify:
                m_style["text-align"] = "justify";
                break;
            default:
                throw ElementError("vweb::ui::Element", toString("Invalid alignment \"", position, "\"."));
        }
        return *this;
    }
    auto&   align_text(const String& position) {
        if (position == "leading") {
            m_style["text-align"] = "start";
        } else if (position == "center") {
            m_style["text-align"] = "center";
        } else if (position == "trailing") {
            m_style["text-align"] = "end";
        } else if (position == "justify") {
            m_style["text-align"] = "justify";
        } else {
            throw ElementError("vweb::ui::Element", toString("Invalid alignment \"", position, "\"."));
        }
        return *this;
    }
    constexpr
    auto&   leading_text() {
        return align_text(alignment::leading);
    }
    constexpr
    auto&   center_text() {
        return align_text(alignment::center);
    }
    constexpr
    auto&   trailing_text() {
        return align_text(alignment::trailing);
    }
    
    // Vertical align.
    auto&   vertical_align(const Int& position) {
        m_style["display"] = "grid";
        switch (position.value()) {
            case alignment::leading:
                m_style["align-content"] = "flex-start";
                m_style["align-items"] = "start";
                break;
            case alignment::center:
                m_style["align-content"] = "none";
                m_style["align-items"] = "center";
                break;
            case alignment::trailing:
                m_style["align-content"] = "flex-end";
                m_style["align-items"] = "end";
                break;
            case alignment::justify:
                m_style["align-content"] = "none";
                m_style["align-items"] = "justify";
                break;
            default:
                throw ElementError("vweb::ui::Element", toString("Invalid alignment \"", position, "\"."));
        }
        return *this;
    }
    auto&   vertical_align(const String& position) {
        m_style["display"] = "grid";
        if (position == "leading") {
            m_style["align-items"] = "start";
        } else if (position == "center") {
            m_style["align-items"] = "center";
        } else if (position == "trailing") {
            m_style["align-items"] = "end";
        } else if (position == "justify") {
            m_style["align-items"] = "justify";
        } else {
            throw ElementError("vweb::ui::Element", toString("Invalid alignment \"", position, "\"."));
        }
        return *this;
    }
    constexpr
    auto&   vertical_leading() {
        return vertical_align(alignment::leading);
    }
    constexpr
    auto&   vertical_center() {
        return vertical_align(alignment::center);
    }
    constexpr
    auto&   vertical_trailing() {
        return vertical_align(alignment::trailing);
    }
    
    // Z Index.
    VWEB_NUMERIC_TYPE constexpr
    auto&   z_index(const Type& value) {
        auto_style("z-index", value);
        return *this;
    }
    
    // ---------------------------------------------------------
    // Other styling.
    
    // Cursor.
    constexpr
    auto&   cursor(const String& value) {
        auto_style("cursor", value);
        return *this;
    }
    
    // Overflow.
    constexpr
    auto&   overflow(const String& value) {
        auto_style("overflow", value);
        return *this;
    }
    
    // Background image.
    constexpr
    auto&   background_image(const String& value) {
        auto_style("background-image", toString("url(", value, ")"));
        auto_style("background-repeat", "no-repeat");
        auto_style("background-size", "cover");
        auto_style("background-position", "center");
        return *this;
    }
    
    // Scale.
    constexpr
    auto&   scale(const Float& value) {
        auto_style("transform", toString("scale(", value, ")"), false, ' ');
        return *this;
    }
    
    // ---------------------------------------------------------
    // Animations.
        
    // Animate.
    // Valid animation modes: [in, out].
    VWEB_NUMERIC_TYPE constexpr
    auto&   animate(const Int& mode, const String& animation, const Type& duration = 1) {
        m_animations[animations::tostr(mode)] = Json{
            {"animation", animation},
            {"duration", duration},
        };
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   animate(const String& mode, const String& animation, const Type& duration = 1) {
        m_animations[mode] = Json{
            {"animation", animation},
            {"duration", duration},
        };
        return *this;
    }
    
    // Scroll behaviour.
    constexpr
    auto&   scroll_behaviour(const String& mode) {
        auto_style("scroll-behavior", mode);
        return *this;
    }
            
    // ---------------------------------------------------------
    // Events.
    
    // On click.
    template <typename Type> constexpr
    auto&   on_click(const Type& e) {
        cursor("pointer");
        auto json = e.json();
        if (json.value("type", 4) == "Event") {
            m_on_click.concat_r(json.value("children", 8).asa());
        }
        else {
            m_on_click.append(json);
        }
        return *this;
    }
    
    // ---------------------------------------------------------
    // Utility functions.
    
    template <typename Child, typename... Children> constexpr
    void append(const Child& child, Children&&... children) {
        m_children.append(child.json());
        append_h(m_children, children...);
    }
    
    
    // To json array.
    constexpr
    Json  json() const {
        
        // Get element only requires a few keys.
        if (m_type == "GetElementById") {
            return Json {
                {"type", m_type},
                {"id", m_id.replace(' ', '_')},
                {"key", m_key},
                {"value", m_value},
				{"columns", m_columns},
                {"href", m_href},
                {"style", m_style},
                {"attr", m_attr},
            };
        }
            
        // Image container for blur effects, otherwise the borders are transparent.
        else if (m_type == "Image" || m_type == "ImageButton") {
            return Json {
                {"type", "Container"},
                {"tag", "div"},
                {"style", m_container_style},
                {"children", JArray {
                    Json {
                        {"type", m_type},
                        {"tag", m_tag},
                        {"id", m_id.replace(' ', '_')},
                        {"text", m_text},
                        {"input", m_input},
                        {"image", m_img},
                        {"animations", (m_animations.is_defined() ? (JsonValue) m_animations : (JsonValue) vlib::null)},
						{"columns", m_columns},
                        {"href", m_href},
                        {"style",
                            Json{
                                {"width", "100%"},
                                {"height", "100%"},
                            }.concat(m_style)
                        },
                        {"attr", m_attr},
                        {"on_click", m_on_click},
                        {"children", m_children},
                    },
                }}
            };
        }
        
        // Container for GoogleMap.
        else if (m_type == "GoogleMap") {
            return Json {
                {"type", "Container"},
                {"tag", "div"},
                {"style", m_container_style},
                {"children", JArray {
                    Json {
                        {"type", m_type},
                        {"tag", m_tag},
                        {"id", m_id.replace(' ', '_')},
                        {"animations", (m_animations.is_defined() ? (JsonValue) m_animations : (JsonValue) vlib::null)},
                        {"columns", m_columns},
                        {"style", m_style},
                        {"attr", m_attr},
                        {"on_click", m_on_click},
                        {"children", m_children},
                    },
                }}
            };
        }
        
        // Other elements.
        return Json {
            {"type", m_type},
            {"tag", m_tag},
            {"id", m_id.replace(' ', '_')},
            {"text", m_text},
            {"input", m_input},
            {"image", m_img},
            {"key", m_key},
            {"value", m_value},
            {"animations", (m_animations.is_defined() ? (JsonValue) m_animations : (JsonValue) vlib::null)},
			{"columns", m_columns},
            {"select_options", m_select_options},
            {"href", m_href},
            {"style", m_style},
            {"attr", m_attr},
            {"on_click", m_on_click},
            {"children", m_children},
        };
    }
    
    // Move.
    // Should be called when moving a element into another element.
    // Otherwise the source element may be added as a child to the destination element.
    auto&& move() {
        return (Element&&) *this;
    }
    
};

// Is type.
template <typename Type>
struct is_Element { SICEBOOL value = false; };
template <>
struct is_Element<Element>    { SICEBOOL value = true;  };

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

