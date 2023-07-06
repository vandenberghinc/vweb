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
                throw ElementError("Unknown alignment \"", alignment, "\".");
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
                throw ElementError("Unknown animation \"", animation, "\".");
        }
    }
}

// ---------------------------------------------------------
// Shortcuts.

namespace shortcuts {
namespace alignment { using namespace vweb::ui::alignment; }
namespace animations { using namespace vweb::ui::animations; }
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
    String          m_key; // key for variable of variable condition, and for retrieving values from the GetElement.
    JsonValue       m_value; // value for variable of variable condition, and for setting values from GetElement.
    Json            m_animations; // animation per key.
	Int			    m_columns = 1; // the amount of columns for an HStack.
    Array<String>   m_select_options; // options for a select input.
    Json            m_style;
    Json            m_container_style; // style of the cointainer that some elements require.
    Json            m_attr; // element attributes.
    Json            m_events; // events like on click etc.
    JArray          m_children;
    String          m_meta_author; // meta author.
    String          m_meta_title; // meta title.
    String          m_meta_description; // meta description.
    String          m_meta_img; // meta image.
    String          m_meta_robots; // meta robots content.
	String          m_source_file; // source file where the constructor is called, used for warning.
	
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
	
	// Source file.
	constexpr
	auto& source_file(String source) {
		m_source_file = vlib::move(source);
		return *this;
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
	
	// Source file.
	constexpr auto& source_file() const { return m_source_file; }
    
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
        m_id = x.replace(' ', '_');
        m_attr["id"] = m_id;
        return *this;
    }
    
    // Set class.
    constexpr
    auto&   css_class(const String& value) {
        m_attr["class"] = value;
        return *this;
    }
    
    // Set text.
    constexpr
    auto&   text(const String& text) {
        if (m_type == "GetElementById") {
            m_key = "textContent";
            m_value = text;
        } else if (m_tag == "input") {
            m_attr["placeholder"] = text;
        } else {
            m_text = text;
        }
        return *this;
    }
    
    // Set input type.
    constexpr
    auto&   input(const String& type) {
        m_attr["type"] = type;
        return *this;
    }
    
    // Set image source.
    constexpr
    auto&   image(const String& source) {
        m_attr["src"] = source;
        return *this;
    }
    
    // Set key.
    constexpr
    auto&   key(const String& key) {
        m_key = key;
        return *this;
    }
    
    // Set value.
    constexpr
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
        char joiner = ' '
    ) {
        if (m_type == "Image" || m_type == "GoogleMap") {
            if (!overwrite && m_container_style.contains(key)) {
                m_container_style[key].ass() += tostr(joiner, ' ', value);
            } else {
                m_container_style[key]= value;
            }
        } else {
            if (!overwrite && m_style.contains(key)) {
                m_style[key].ass() += tostr(joiner, ' ', value);
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
        char joiner = ' '
    ) {
        if (!overwrite && m_style.contains(key)) {
            m_style[key].ass() += tostr(joiner, ' ', value);
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
        m_attr["href"] = value;
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
            throw ElementError("Function is not supported for element \"", m_type, "\".");
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
            js.concats_r("vweb_get_element('", m_id, "').", m_key, " = ", process_value(m_value.json()), "; ");
        }
        
        // Get key.
        // Do not add a semicolon since it is used in request bodies.
        else if (m_key.is_defined()) {
            js.concats_r("vweb_get_element('", m_id, "').", m_key);
        }
        
        // Set styling by javascript.
        else {
            js.concats_r("e = vweb_get_element('", m_id, "'); ");
            for (auto& index: m_style.indexes()) {
                js.concats_r("e.style['", m_style.key(index), "'] = ", process_value(m_style.value(index).json()), "; ");
            }
        }
        
        // Replace.
        js.replace_r("'", "&quot;");
        js.replace_r("\"", "&quot;");
        
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
	
	// Text decoration color.
	constexpr
	auto&   text_decoration_color(const String& value) {
		m_style["text-decoration-color"] = value;
		return *this;
	}
    
    // Font shadow.
    constexpr
    auto&   font_shadow(
        const Int& horizontal,
        const Int& vertical,
        const String& color
    ) {
        style("text-shadow", tostr(horizontal, "px ", vertical, "px ", color), false, ',');
        return *this;
    }
    constexpr
    auto&   font_shadow(
        const Int& horizontal,
        const Int& vertical,
        const Int& blur,
        const String& color
    ) {
        style("text-shadow", tostr(horizontal, "px ", vertical, "px ", blur, "px ", color), false, ',');
        return *this;
    }
    
    // Font size.
    constexpr
    auto&   font_size(const Int& value) {
        m_style["font-size"] = tostr(value, "px");
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
        m_style["line-height"] = tostr(value, "px");
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
        auto_style("border", tostr(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border(const Type& value, const String& color) {
        auto_style("border", tostr(value, "px solid ", color));
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
        auto_style("border-top", tostr(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_top(const Type& value, const String& color) {
        auto_style("border-top", tostr(value, "px solid ", color));
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
        auto_style("border-right", tostr(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_right(const Type& value, const String& color) {
        auto_style("border-right", tostr(value, "px solid ", color));
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
        auto_style("border-bottom", tostr(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_bottom(const Type& value, const String& color) {
        auto_style("border-bottom", tostr(value, "px solid ", color));
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
        auto_style("border-left", tostr(value, "px ", style, ' ', color));
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   border_left(const Type& value, const String& color) {
        auto_style("border-left", tostr(value, "px solid ", color));
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
        auto_style("box-shadow", tostr(horizontal, "px ", vertical, "px ", color), false, ',');
        return *this;
    }
    constexpr
    auto&   shadow(
        const Int& horizontal,
        const Int& vertical,
        const Int& blur,
        const String& color
    ) {
        auto_style("box-shadow", tostr(horizontal, "px ", vertical, "px ", blur, "px ", color), false, ',');
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
        style("filter", tostr("drop-shadow(", horizontal, "px ", vertical, "px ", color, ")"), false, ' ');
        return *this;
    }
    constexpr
    auto&   drop_shadow(
        const Int& horizontal,
        const Int& vertical,
        const Int& blur,
        const String& color
    ) {
        style("filter", tostr("drop-shadow(", horizontal, "px ", vertical, "px ", blur, "px ", color, ")"), false, ' ');
        return *this;
    }
    
    // Blur.
    VWEB_NUMERIC_TYPE constexpr
    auto&   blur(const Type& value) {
        if (m_style.contains("filter")) {
            m_style["filter"].ass() += tostr(" blur(", value, "px", ")");
        } else {
            m_style["filter"] = tostr("blur(", value, "px", ")");
        }
        if (m_type == "Image") {
            m_style["margin"] = tostr("-", value * 2, "px");
            m_style["width"] = tostr("110%");
            m_style["height"] = tostr("110%");
            m_container_style["overflow"] = "hidden";
        }
        return *this;
    }
    
    // Background blur.
    VWEB_NUMERIC_TYPE constexpr
    auto&   background_blur(const Type& value) {
        style("backdrop-filter", tostr("blur(", value, "px", ")"), false, ' ');
        style("-webkit-backdrop-filter", tostr("blur(", value, "px", ")"), false, ' ');
        return *this;
    }
    
    // Greyscale.
    constexpr
    auto&   greyscale(const Float& value = 1.0) {
        auto_style("filter", tostr("grayscale(", value * 100, ")"), false, ' ');
        return *this;
    }
    
    // Opacity.
	// Does not work if no background is assigned.
    VWEB_NUMERIC_TYPE constexpr
    auto&   opacity(const Type& value) {
        style("filter", tostr("opacity(", value, "%", ")"), false, ' ');
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   background_opacity(const Type& value) {
        style("backdrop-filter", tostr("opacity(", value, "%", ")"), false, ' ');
        style("-webkit-backdrop-filter", tostr("opacity(", value, "%", ")"), false, ' ');
        return *this;
    }
    
    // Brightness.
	// Does not work if no background is assigned.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   brightness(const Type& value) {
        style("filter", tostr("brightness(", pad_numeric(value, "%"), ")"), false, ' ');
        return *this;
    }
    
    // Fade out.
    VWEB_NUMERIC_TYPE constexpr
    auto&   fade_out_top(const Type& size = 5) {
        auto_style("mask-image", tostr("linear-gradient(0deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        auto_style("-webkit-mask-image", tostr("linear-gradient(0deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   fade_out_right(const Type& size = 5) {
        auto_style("mask-image", tostr("linear-gradient(90deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        auto_style("-webkit-mask-image", tostr("linear-gradient(90deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   fade_out_bottom(const Type& size = 5) {
        auto_style("mask-image", tostr("linear-gradient(180deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        auto_style("-webkit-mask-image", tostr("linear-gradient(180deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        return *this;
    }
    VWEB_NUMERIC_TYPE constexpr
    auto&   fade_out_left(const Type& size = 5) {
        auto_style("mask-image", tostr("linear-gradient(270deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        auto_style("-webkit-mask-image", tostr("linear-gradient(270deg, #000 ", 100.0 - size, "%, transparent)"), false, ',');
        return *this;
    }
    
    // ---------------------------------------------------------
    // Positional styling.
    
    // Width.
    VWEB_NUMERIC_STRING_F_TYPE constexpr
    auto&   width(const Type& value) {
        auto_style("width", pad_numeric(value, "px"));
        if (m_type == "Image") {
            m_attr["width"] = pad_numeric(value, "").remove_r('%').replace_r("px", "").replace_r("em", "");
        }
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
        if (m_type == "Image") {
            m_attr["height"] = pad_numeric(value, "").remove_r('%').replace_r("px", "").replace_r("em", "");
        }
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
        auto_style("padding", tostr(pad_numeric(top, "px"), " ", pad_numeric(right, "px"), " ", pad_numeric(bottom, "px"), " ", pad_numeric(left, "px")));
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
        if (m_type == "Image") {
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
    auto&   align(const String& position) {
		if (m_tag == "div") {
			if (m_type == "HStack") {
				if (position == "leading") {
					m_style["justify-content"] = "start";
				} else if (position == "center") {
					m_style["justify-content"] = "center";
				} else if (position == "trailing") {
					m_style["justify-content"] = "end";
				} else if (position == "justify") {
					m_style["justify-content"] = "justify";
				} else {
					m_style["justify-content"] = position;
				}
			} else {
				if (position == "leading") {
					m_style["align-items"] = "start";
				} else if (position == "center") {
					m_style["align-items"] = "center";
				} else if (position == "trailing") {
					m_style["align-items"] = "end";
				} else if (position == "justify") {
					m_style["align-items"] = "justify";
				} else {
					m_style["align-items"] = position;
				}
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
				m_style["text-align"] = position;
			}
		}
		return *this;
    }
	constexpr
	auto&   align(const Int& position) {
		return align(alignment::tostr(position));
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
                throw ElementError("Invalid alignment \"", position, "\".");
        }
        return *this;
    }
    constexpr
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
            throw ElementError("Invalid alignment \"", position, "\".");
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
    constexpr
    auto&   vertical_align(const String& position) {
		if (m_type == "HStack") {
			if (position == "leading") {
				m_style["align-items"] = "flex-start";
			} else if (position == "center") {
				m_style["align-items"] = "center";
			} else if (position == "trailing") {
				m_style["align-items"] = "flex-end";
			} else if (position == "justify") {
				m_style["align-items"] = "justify";
			} else {
				m_style["align-items"] = position;
			}
		} else {
			if (position == "leading") {
				m_style["justify-content"] = "flex-start";
			} else if (position == "center") {
				m_style["justify-content"] = "center";
			} else if (position == "trailing") {
				m_style["justify-content"] = "flex-end";
			} else if (position == "justify") {
				m_style["justify-content"] = "justify";
			} else {
				m_style["justify-content"] = position;
			}
		}
		return *this;
    }
	constexpr
	auto&   vertical_align(const Int& position) {
		return vertical_align(alignment::tostr(position));
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
	
	// Align items.
	constexpr
	auto&   align_items(const String& position) {
		m_style["align-items"] = position;
		return *this;
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
        auto_style("background-image", tostr("url(", value, ")"));
        auto_style("background-repeat", "no-repeat");
        auto_style("background-size", "cover");
        auto_style("background-position", "center");
        return *this;
    }
    
    // Scale.
    constexpr
    auto&   scale(const Float& value) {
        auto_style("transform", tostr("scale(", value, ")"), false, ' ');
        return *this;
    }
    
    // Display.
    constexpr
    auto&   display(const String& value) {
        auto_style("display", value);
        return *this;
    }
	
	// ---------------------------------------------------------
	// HTML attributes.
	
	// Set an image alt's attribute.
	constexpr
	auto&   alt(String value) {
		m_attr["alt"] = vlib::move(value);
		return *this;
	}
	
	// Make an item read only.
	constexpr
	auto&	read_only(const Bool& to = true) {
		if (to) {
			m_attr["readonly"] = true;
		} else {
			ullong index = m_attr.find("readonly");
			if (index != NPos::npos) {
				m_attr.pop(index);
			}
		}
		return *this;
	}
    
    // ---------------------------------------------------------
    // Animations.
        
    // Animate.
    // Valid animation modes: [in, out].
    auto&   animate(const String& mode, const String& animation, const Float& duration = 1) {
        static const Array<String> animations = {
            "SlideRight",
            "SlideLeft",
        };
        if (!animations.contains(animation)) {
            throw vlib::InvalidUsageError("Animation \"", animation, "\" does not exist.");
        }
        m_animations[mode] = Json{
            {"animation", animation},
            {"duration", duration},
        };
        return *this;
    }
    auto&   animate(const Int& mode, const String& animation, const Float& duration = 1) {
        animate(animations::tostr(mode), animation, duration);
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
        Json json = e.json();
        if (json.value("type", 4) == "Event") {
            m_events["onclick"] = json.value("children", 8).asa();
        }
        else {
            m_events["onclick"] = JArray{ json };
        }
        return *this;
    }
    
    // ---------------------------------------------------------
    // Utility functions.
    
    template <typename Child, typename... Children> constexpr
    void    append(const Child& child, Children&&... children) {
        m_children.append(child.json());
        append_h(m_children, children...);
    }
    
    // Move.
    // Should be called when moving a element into another element.
    // Otherwise the source element may be added as a child to the destination element.
    constexpr
    auto&&  move() {
        return (Element&&) *this;
    }
    
    // To json array.
    constexpr
    Json    json() const {
        
        // Get element only requires a few keys.
        if (m_type == "GetElementById") {
            return Json {
                {"type", m_type},
                {"id", m_id},
                {"key", m_key},
                {"value", m_value},
				{"columns", m_columns},
                {"style", m_style},
                {"attr", m_attr},
                {"js", js(false)},
            };
        }
            
        // Image container for blur effects, otherwise the borders are transparent.
        else if (m_type == "Image") {
            return Json {
                {"type", "Container"},
                {"tag", "div"},
                {"style", m_container_style},
                {"children", JArray {
                    Json {
                        {"type", m_type},
                        {"tag", m_tag},
                        {"id", m_id},
                        {"text", m_text},
                        {"animations", m_animations},
						{"columns", m_columns},
                        {"style",
                            m_style.concat(Json{
                                // {"position", "absolute"},
                                // {"top", "0"},
                                // {"right", "0"},
                                // {"bottom", "0"},
                                // {"left", "0"},
                                {"width", "100%"},
                                {"height", "100%"},
                            })
                        },
                        {"attr", m_attr},
                        {"events", m_events},
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
                        {"id", m_id},
                        {"animations", m_animations},
                        {"columns", m_columns},
                        {"style", m_style},
                        {"attr", m_attr},
                        {"events", m_events},
                        {"children", m_children},
                    },
                }}
            };
        }
        
        // Other elements.
        return Json {
            {"type", m_type},
            {"tag", m_tag},
            {"id", m_id},
            {"text", m_text},
            {"key", m_key},
            {"value", m_value},
            {"animations", m_animations},
			{"columns", m_columns},
            {"select_options", m_select_options},
            {"style", m_style},
            {"attr", m_attr},
            {"events", m_events},
            {"children", m_children},
        };
    }
    
    // To html.
    String  html() {
        return HTMLBuilder::build(*this);
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

