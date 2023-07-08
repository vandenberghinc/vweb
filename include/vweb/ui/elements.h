/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_ELEMENTS_H
#define VWEB_UI_ELEMENTS_H

// #include <libunwind.h>

// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// Derived elements.

namespace internal {
String	get_source() {
	
	// Using backtrace.
	int back = 4;
	void* callstack [back];
	int frames = ::backtrace(callstack, back);
	if (frames >= back) {
		Dl_info info;
		if (dladdr(callstack[back - 1], &info) && info.dli_sname != NULL) {
			char* demangled = abi::__cxa_demangle(info.dli_sname, NULL, NULL, NULL);
			String source = "unknown";
			if (demangled != NULL) {
				source = demangled;
				free(demangled);
			}
			return source;
		}
	}
	return "unknown";
	
	/* Using libunwind.
	unw_cursor_t cursor;
	unw_context_t context;
	unw_word_t ip;

	// Get the current context
	unw_getcontext(&context);
	
	// Initialize the cursor
	unw_init_local(&cursor, &context);

	// Step to the next frame (to the caller)
	unw_step(&cursor);

	// Get the IP (instruction pointer) of the caller frame
	unw_get_reg(&cursor, UNW_REG_IP, &ip);

	// Resolve the file information using the IP
	String source;
	source.resize(PATH_MAX);
	unw_word_t offset;
	if (unw_get_proc_name(&cursor, source.data(), PATH_MAX, &offset) == 0) {
		source.len() = vlib::len(source.data());
		return source;
	}
	source.reset();
	return source;
	 */
}
}

// Template for elements.
#define VWEB_ELEMENT_TEMPLATE(name, type, tag, style_dict) \
struct name : public Element { \
    static Json default_style;\
    \
    constexpr \
    name() : \
    Element(type, tag) \
    { \
        this->style(default_style); \
		this->source_file(internal::get_source()); \
    }\
    \
    template <typename Child, typename... Children> requires (!is_Element<Child>::value) constexpr \
    name(Child&& child, Children&&... children) : \
    Element(type, tag) \
    { \
        this->append_h(this->m_children, child, children...); \
        this->style(default_style); \
		this->source_file(internal::get_source()); \
    }\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(const Elmnt& obj) : \
    Element(obj) \
    {}\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(Elmnt&& obj) : \
    Element(obj) \
    {}\
}; \
Json name::default_style = style_dict; \
namespace shortcuts { \
using name = name; \
}

// Template for text elements.
#define VWEB_TEXT_ELEMENT_TEMPLATE(name, type, tag, style_dict, attr_dict) \
struct name : public Element { \
    static Json default_style;\
    constexpr \
    name() : \
    Element(type, tag) \
    { \
        this->style(default_style); \
        this->attr(attr_dict); \
		this->source_file(internal::get_source()); \
    }\
    constexpr \
    name(const String& text) : \
    Element(type, tag) \
    { \
        this->text(text.replace("\n", "<br>")); \
        this->style(default_style); \
        this->attr(attr_dict); \
		this->source_file(internal::get_source()); \
    }\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(const Elmnt& obj) : \
    Element(obj) \
    {}\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(Elmnt&& obj) : \
    Element(obj) \
    {}\
}; \
Json name::default_style = style_dict; \
namespace shortcuts { \
using name = name; \
}

// Template for input elements.
#define VWEB_INPUT_ELEMENT_TEMPLATE(name, type, tag, input_type, style_dict) \
struct name : public Element { \
    static Json default_style;\
    constexpr \
    name() : \
    Element(type, tag) \
    { \
        this->input(input_type); \
        this->style(default_style); \
		this->source_file(internal::get_source()); \
    }\
    constexpr \
    name(const String& text) : \
    Element(type, tag) \
    { \
        this->text(text); \
        this->input(input_type); \
        this->style(default_style); \
		this->source_file(internal::get_source()); \
    }\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(const Elmnt& obj) : \
    Element(obj) \
    {}\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(Elmnt&& obj) : \
    Element(obj) \
    {}\
}; \
Json name::default_style = style_dict; \
namespace shortcuts { \
using name = name; \
}

// Template for input select elements.
#define VWEB_INPUT_SELECT_ELEMENT_TEMPLATE(name, type, tag, style_dict) \
struct name : public Element { \
    static Json default_style;\
    template <typename... Args> constexpr \
    name(Args&&... args) : \
    Element(type, tag) \
    { \
        this->style(default_style); \
        this->select_option(args...); \
		this->source_file(internal::get_source()); \
    }\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(const Elmnt& obj) : \
    Element(obj) \
    {}\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(Elmnt&& obj) : \
    Element(obj) \
    {}\
}; \
Json name::default_style = style_dict; \
namespace shortcuts { \
using name = name; \
}

// Template for image elements.
#define VWEB_IMG_ELEMENT_TEMPLATE(name, type, tag, style_dict) \
struct name : public Element { \
    static Json default_style;\
    constexpr \
    name() : \
    Element(type, tag) \
    { \
        this->style(default_style); \
		this->source_file(internal::get_source()); \
    }\
    constexpr \
    name(const String& image) : \
    Element(type, tag) \
    { \
        this->image(image); \
        this->style(default_style); \
		this->source_file(internal::get_source()); \
    }\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(const Elmnt& obj) : \
    Element(obj) \
    {}\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(Elmnt&& obj) : \
    Element(obj) \
    {}\
}; \
Json name::default_style = style_dict; \
namespace shortcuts { \
using name = name; \
}

// Element without any args template.
#define VWEB_ELEMENT_NO_ARGS_TEMPLATE(name, type, tag, style_dict) \
struct name : public Element { \
    static Json default_style;\
    constexpr \
    name() : \
    Element(type, tag) \
    { \
        this->style(default_style); \
		this->source_file(internal::get_source()); \
    }\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(const Elmnt& obj) : \
    Element(obj) \
    {}\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(Elmnt&& obj) : \
    Element(obj) \
    {}\
}; \
Json name::default_style = style_dict; \
namespace shortcuts { \
using name = name; \
}

// Template for variable conditions.
#define VWEB_VARIABLE_CONDITION_TEMPLATE(name, type, condition_mode) \
struct name : public Element { \
    \
    template <typename Child> requires (condition_mode == 1) constexpr \
	name(const String& key, const JsonValue& value, const Child& child) : \
    Element(type, "div")\
    { \
        this->key(key); \
        this->value(value);\
        this->append_h(this->m_children, child); \
		this->source_file(internal::get_source()); \
    } \
    \
    template <typename Child> requires (condition_mode == 2) constexpr \
	name(const JsonValue& value, const Child& child) : \
    Element(type, "div")\
    { \
        this->value(value);\
        this->append_h(this->m_children, child); \
		this->source_file(internal::get_source()); \
    } \
    template <typename Child, typename... Children> requires (condition_mode == 3) constexpr \
	name(const Child& child, Children&&... children) : \
    Element(type, "div")\
    { \
        this->append_h(this->m_children, child, children...); \
		this->source_file(internal::get_source()); \
    } \
    \
    template <typename Type> requires (is_Element<Type>::value) constexpr \
	name(Type&& obj) : \
    Element(obj) \
    {}\
}; \
namespace shortcuts { \
using name = name; \
}

// Get Element template.
#define VWEB_GET_ELEMENT_TEMPLATE(name, type) \
struct name : public Element { \
    constexpr \
    name() : \
    Element(type, vlib::null) \
    { \
		this->source_file(internal::get_source()); \
	}\
    constexpr \
    name(const String& id) : \
    Element(type, vlib::null) \
    { \
        this->id(id); \
		this->source_file(internal::get_source()); \
    }\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(const Elmnt& obj) : \
    Element(obj) \
    {}\
    \
    template <typename Elmnt> requires (is_Element<Elmnt>::value) constexpr \
    name(Elmnt&& obj) : \
    Element(obj) \
    {}\
}; \
namespace shortcuts { \
using name = name; \
}
    
// View.
struct View;
VWEB_ELEMENT_TEMPLATE(View, "View", "div", Json({
    {"position", "absolute"},
    {"top", "0"},
    {"right", "0"},
    {"bottom", "0"},
    {"left", "0"},
    {"padding", "0px"},
    {"display", "block"},
    {"overflow", "hidden"},
    // {"overflow-x", "hidden"},
    {"overflow-y", "none"},
    {"background", "none"},
    {"display", "flex"}, // to support vertical spacers.
    {"align-content", "flex-start"}, // align items at start, do not stretch / space when inside HStack.
    {"flex-direction", "column"},
}));
    
// SubView.
// struct SubView;
// VWEB_ELEMENT_TEMPLATE(SubView, "SubView", "div", Json({
//     {"position", "relative"},
//     {"margin", "0px"},
//     {"padding", "0px"},
//     {"clear", "both"},
//     {"display", "block"},
//     // {"overflow-x", "hidden"},
//     // {"overflow-y", "scroll"},
//     {"background", "none"},
// }));

// Scroller.
struct Scroller;
VWEB_ELEMENT_TEMPLATE(Scroller, "Scroller", "div", Json({
    {"position", "relative"},
    {"margin", "0px"},
    {"padding", "0px"},
    {"clear", "both"},
    {"display", "flex"},
    {"overflow", "scroll"},
    {"flex-direction", "column"},
    {"scroll-behavior", "smooth"},
    {"overscroll-behavior", "none"}, // disable bounces.
    {"height", "fit-content"}, // set height to max compared to parents non overflow, so scrolling take effect.
	
	{"align-content", "flex-start"}, // align items at start, do not stretch / space when inside HStack.
	{"align-items", "flex-start"}, // align items at start, do not stretch / space when inside HStack.
        
    // Hide scrollbar.
    {"-webkit-scrollbar::display", "none"}, // Chrome, Safari and Opera
    {"-ms-overflow-style", "none"}, // IE and Edge
    {"scrollbar-width", "none"}, // Firefox
    
}));

// VStack.
struct VStack;
VWEB_ELEMENT_TEMPLATE(VStack, "VStack", "div", Json({
    {"position", "relative"},
    {"margin", "0px"},
    {"padding", "0px"},
    {"clear", "both"},
    {"display", "flex"}, // to support vertical spacers.
    {"overflow", "visible"},
    // {"flex", "1"}, // disabled to support horizontal spacers in VStacks.
	{"align-content", "flex-start"}, // align items at start, do not stretch / space when inside HStack.
    {"flex-direction", "column"},
						
            
}));
            
// HStack.
struct HStack;
VWEB_ELEMENT_TEMPLATE(HStack, "HStack", "div", Json({
    {"position", "relative"},
    {"margin", "0px"},
    {"padding", "0px"},
    {"clear", "both"},
    {"overflow-x", "scroll"},
    {"overflow-y", "hidden"},
    {"display", "flex"},
	// {"flex", "1"}, // disabled to support horizontal spacers in VStacks.
    
    // Hide scrollbar.
    {"-webkit-scrollbar::display", "none"}, // Chrome, Safari and Opera
    {"-ms-overflow-style", "none"}, // IE and Edge
    {"scrollbar-width", "none"}, // Firefox
	
    
}));

// ZStack.
struct ZStack;
VWEB_ELEMENT_TEMPLATE(ZStack, "ZStack", "div", Json({
    {"position", "relative"},
    {"margin", "0px"},
    {"padding", "0px"},
    {"display", "block"},
}));

// Spacer.
struct Spacer;
VWEB_ELEMENT_TEMPLATE(Spacer, "Spacer", "div", Json({
    {"margin", "0px"},
    {"padding", "0px"},
    {"flex", "1"},
    {"flex-grow", "1"},
    {"background", "#00000000"},
    {"filter", "opacity(0)"},
    {"justify-content", "stretch"},
}));

// Divider.
struct Divider;
VWEB_ELEMENT_TEMPLATE(Divider, "Divider", "div", Json({
    {"margin", "0px"},
    {"padding", "0px"},
    {"width", "100%"},
    {"height", "1px"},
    {"background", "black"},
    // {"flex", "1"},
    // {"flex-grow", "1"},
}));

// Title.
struct Title;
VWEB_TEXT_ELEMENT_TEMPLATE(Title, "Title", "h1", Json({
    {"margin", "0px 0px 0px 0px"},
    {"color", "inherit"},
    {"white-space", "wrap"},
    {"text-align", "inherit"},
}), {});

// Text.
struct Text;
VWEB_TEXT_ELEMENT_TEMPLATE(Text, "Text", "p", Json({
    {"margin", "0px 0px 0px 0px"},
    {"padding", "2.5px"},
    {"color", "inherit"},
    {"text-align", "inherit"},
    {"white-space", "wrap"},
}), {});
    
// CodeBlock.
struct CodeBlock;
VWEB_TEXT_ELEMENT_TEMPLATE(CodeBlock, "CodeBlock", "pre", Json({
    {"margin", "0px 0px 0px 0px"},
    {"padding", "25px"},
    {"color", "inherit"},
    {"text-align", "start"},
    {"white-space", "wrap"},
    {"font-family", "'Menlo', 'Consolas', monospace"},
    {"font-size", "13px"},
    {"font-weight", "500"},
	{"line-height", "18px"},
    {"border-radius", "15px"},
    {"color", "#FFFFFF"},
    {"background", "#262F3D"},
    {"overflow", "scroll"},
}), {});

// Input.
struct Input;
VWEB_INPUT_ELEMENT_TEMPLATE(Input, "Input", "input", "text", Json({
    {"margin", "0px 0px 0px 0px"},
    {"padding", "2.5px 5px 2.5px 5px"},
    {"height", "20px"},
    {"font", "inherit"},
    {"color", "inherit"},
    {"background", "none"},
    {"outline", "none"},
    {"border", "none"},
    {"border-radius", "10px"},
    {"text-align", "start"},
    {"white-space", "nowrap"},
}));
struct PasswordInput;
VWEB_INPUT_ELEMENT_TEMPLATE(PasswordInput, "PasswordInput", "input", "password", Json({
    {"margin", "0px 0px 0px 0px"},
    {"padding", "2.5px 5px 2.5px 5px"},
    {"height", "20px"},
    {"font", "inherit"},
    {"color", "inherit"},
    {"background", "none"},
    {"outline", "none"},
    {"border", "none"},
    {"border-radius", "10px"},
    {"text-align", "start"},
    {"white-space", "nowrap"},
}));
struct EmailInput;
VWEB_INPUT_ELEMENT_TEMPLATE(EmailInput, "EmailInput", "input", "email", Json({
    {"margin", "0px 0px 0px 0px"},
    {"padding", "2.5px 5px 2.5px 5px"},
    {"height", "20px"},
    {"font", "inherit"},
    {"color", "inherit"},
    {"background", "none"},
    {"outline", "none"},
    {"border", "none"},
    {"border-radius", "10px"},
    {"text-align", "start"},
    {"white-space", "nowrap"},
}));        
struct PhoneNumberInput;
VWEB_INPUT_ELEMENT_TEMPLATE(PhoneNumberInput, "PhoneNumberInput", "input", "tel", Json({
    {"margin", "0px 0px 0px 0px"},
    {"padding", "2.5px 5px 2.5px 5px"},
    {"height", "20px"},
    {"font", "inherit"},
    {"color", "inherit"},
    {"background", "none"},
    {"outline", "none"},
    {"border", "none"},
    {"border-radius", "10px"},
    {"text-align", "start"},
    {"white-space", "nowrap"},
}));
struct InputBox;
VWEB_INPUT_ELEMENT_TEMPLATE(InputBox, "InputBox", "textarea", "email", Json({
    {"margin", "0px 0px 0px 0px"},
    {"padding", "2.5px 5px 2.5px 5px"},
    {"height", "20px"},
    {"font", "inherit"},
    {"color", "inherit"},
    {"background", "none"},
    {"outline", "none"},
    {"border", "none"},
    {"border-radius", "10px"},
    {"text-align", "start"},
    {"white-space", "wrap"},
    {"resize", "none"},
}));

// Select option input.
struct SelectOptionInput;
VWEB_INPUT_SELECT_ELEMENT_TEMPLATE(SelectOptionInput, "SelectOptionInput", "select", Json({
    {"margin", "0px 0px 0px 0px"},
    {"padding", "2.5px 5px 2.5px 5px"},
    {"height", "20px"}, // can cause the selected text not to show when used with height.
    {"font", "inherit"},
    {"color", "inherit"},
    {"background", "none"},
    {"outline", "none"},
    {"border", "none"},
    {"border-radius", "10px"},
    {"text-align", "start"},
    {"white-space", "nowrap"},
}));

// Button.
struct Button;
VWEB_TEXT_ELEMENT_TEMPLATE(Button, "Button", "a", Json({
    {"margin", "0px 0px 0px"},
    {"padding", "5px 10px 5px 10px"},
    {"border-radius", "10px"},
    {"cursor", "pointer"},
    {"text-decoration", "none"},
    {"color", "inherit"},
    {"text-align", "center"},
    {"display", "grid"}, // for vertical align.
    {"align-items", "center"},
    {"white-space", "nowrap"},
}), Json({
    {"onmousedown", "this.style.filter = \"brightness(90%)\";"},
    {"onmouseover", "this.style.filter = \"brightness(95%)\";"},
    {"onmouseup", "this.style.filter = \"brightness(100%)\";"},
    {"onmouseout", "this.style.filter = \"brightness(100%)\";"},
}));

// Image.
struct Image;
VWEB_IMG_ELEMENT_TEMPLATE(Image, "Image", "img", Json({
    {"margin", "0px"},
    {"padding", "0px"},
    {"object-fit", "cover"},
}));

// Loaders.
struct RingLoader; VWEB_ELEMENT_NO_ARGS_TEMPLATE(RingLoader, "RingLoader", "div", Json({
    {"width", "80px"},
    {"height", "80px"},
    {"background", "black"},
}));
    
// Variable Conditions.
struct IfVariableEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfVariableEq, "IfVariableEq", 1);
struct IfVariableNotEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfVariableNotEq, "IfVariableNotEq", 1);
struct IfVariableGreaterEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfVariableGreaterEq, "IfVariableGreaterEq", 1);
struct IfVariableGreater; VWEB_VARIABLE_CONDITION_TEMPLATE(IfVariableGreater, "IfVariableGreater", 1);
struct IfVariableLesserEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfVariableLesserEq, "IfVariableLesserEq", 1);
struct IfVariableLesser; VWEB_VARIABLE_CONDITION_TEMPLATE(IfVariableLesser, "IfVariableLesser", 1);

// Device conditions.
struct IfDeviceWidthEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfDeviceWidthEq, "IfDeviceWidthEq", 2);
struct IfDeviceWidthNotEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfDeviceWidthNotEq, "IfDeviceWidthNotEq", 2);
struct IfDeviceWidthGreaterEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfDeviceWidthGreaterEq, "IfDeviceWidthGreaterEq", 2);
struct IfDeviceWidthGreater; VWEB_VARIABLE_CONDITION_TEMPLATE(IfDeviceWidthGreater, "IfDeviceWidthGreater", 2);
struct IfDeviceWidthLesserEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfDeviceWidthLesserEq, "IfDeviceWidthLesserEq", 2);
struct IfDeviceWidthLesser; VWEB_VARIABLE_CONDITION_TEMPLATE(IfDeviceWidthLesser, "IfDeviceWidthLesser", 2);

// Endpoint conditions.
struct IfEndpointEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfEndpointEq, "IfEndpointEq", 2);
struct IfEndpointNotEq; VWEB_VARIABLE_CONDITION_TEMPLATE(IfEndpointNotEq, "IfEndpointNotEq", 2);

// Authenticated conditions.
// Only checks if the cookie UserID is defined.
struct IfAuthenticated; VWEB_VARIABLE_CONDITION_TEMPLATE(IfAuthenticated, "IfAuthenticated", 3);
struct IfUnauthenticated; VWEB_VARIABLE_CONDITION_TEMPLATE(IfUnauthenticated, "IfUnauthenticated", 3);

// User activated conditions.
// Only checks if the cookie UserActivated is true.
struct IfUserActivated; VWEB_VARIABLE_CONDITION_TEMPLATE(IfUserActivated, "IfUserActivated", 3);
struct IfUserUnactivated; VWEB_VARIABLE_CONDITION_TEMPLATE(IfUserUnactivated, "IfUserUnactivated", 3);

// Get element.
struct GetElementById; VWEB_GET_ELEMENT_TEMPLATE(GetElementById, "GetElementById");

// ---------------------------------------------------------
// Instances.

// Is type.
template <typename Type>
struct is_GetElementById { SICEBOOL value = false; };
template <>
struct is_GetElementById<GetElementById>    { SICEBOOL value = true;  };

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

