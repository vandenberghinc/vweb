/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_HTML_H
#define VWEB_HTML_H


// Namespace vweb.
namespace vweb {

// ---------------------------------------------------------
// HTML.

struct HTML {

// Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
	
	String				m_html; 		// the html code.
    String              m_js;           // the js code that will be executed at the bottom.
	Array<Json>			m_conditions;	// the variable conditions.
    
    // ---------------------------------------------------------
    // Private functions.
	
	// Build html from view.
	void	build(const ui::View& view) {
		m_html <<
		"<!DOCTYPE html><html>" <<
		build_headers(view) <<
		"<style>" << Path(__FILE__).base().join("css.css") << "</style>" <<
		"<<script type='text/javascript'>" << Path(__FILE__).base().join("css.css") << "</script>" <<
		"<body>" << build_element(view.json()) << "</body>" <<
		"</html>";
	}
	
	// Build headers.
	String	build_headers(const ui::View& view) {
		String data;
		data << "<head>";
		data << "</head>";
		return data;
	}
	
	// Build element.
    String	build_element(
        const Json& element,
        const Bool& visible = true,
        const Json& pre_style = {}
    ) {
		
		// Vars.
		String& type = element["type"].ass();
		String& tag = element["tag"].ass();
        String& id = element["id"].ass();
		String& text = element["text"].ass();
        Json& style = element["style"].asj();
        Json& animations = element["animations"].asj();
        JArray& children = element["children"].asa();
		
		// Create.
		String data;
		
        // ========================================================================
		// Set variable.
        
		if (type == "Variable" || type == "SetVariable") {
            m_js << "variables." << element["key"].ass() << " = " << element["value"].json() << ';';
		}
        
        // ========================================================================
        // Variable condition.
        
        else if (is_variable_condition(type)) {
            
            // Get visibility.
            Bool element_visibility = true;
            
            // Opening.
            create_opening_html_tag(
                data,
                element,
                pre_style.concat({
                    {"display", element_visibility ? "block" : "none"}
                }));
            
            // Build children.
            if (children.is_defined()) {
                data << build_elements(children, type, element_visibility);
            }
            
            // Apply animation.
            if (element_visibility && animations.is_defined()) {
                apply_animation(data, "in", animations);
            }
            
            // Close tag.
            data << "</" << tag << ">";
            
        }
        
        // ========================================================================
        // Redirect.
        
        else if (type == "Redirect") {
            if (visible) {
                data << "<script type='text/javascript'>" <<
                "if (" << element["forced"].asb() << " || get_endpoint() != '" << element["url"].ass() << "') {" <<
                "window.location.href = '" << element["url"].ass() << "';" <<
                "}" <<
                "</script>";
            }
        }
        
        // ========================================================================
        // JavaScript.
        
        else if (type == "JavaScript") {
            data << "<script type='text/javascript'>" <<
            element["code"].ass() <<
            "</script>";
        }
        
        // ========================================================================
        // Get element.
        
        else if (type == "GetElementById") {
            if (visible) {
                
                // Open.
                const String e = toString("elements['", id, "']");
                data << "<script type='text/javascript'>" <<
                "if (" << e << " == null) {" <<
                e << " = document.getElementById('" << id << "');" <<
                "}";
                
                // Set key and value.
                if (!element["key"].isn() && !element["key"].isn()) {
                    data << e << "[" << element["key"].str() << "] = " << element["key"].json() << ";";
                }
                
                // Set style.
                for (auto& index: style.indexes()) {
                    data << e << ".style['" << style.key(index) << "'] = " <<
                    style.value(index).json() << ";";
                }
                
                // Close.
                data << "</script>";
            }
        }
        
        // ========================================================================
        // SelectOptionInput.
        
        else if (type == "SelectOptionInput") {
            
            // Opening.
            create_opening_html_tag(data, element, pre_style);
            
            // Set options.
            int opt_index = 0;
            for (auto& opt: element["select_options"].asa()) {
                data << "<option";
                if (opt_index == 0) {
                    data << " selected=true disabled=true";
                }
                data << " value='" << opt.ass() << '\'';
                data << ">";
                data << "</option>";
                ++opt_index;
            };
            
            // Finalize.
            data << "</" << tag << ">";
            
        }
            
        // ========================================================================
		// Other elements.
        
		else {
			
			// Opening.
            create_opening_html_tag(data, element, pre_style);
			
			// Text.
			if (text.is_defined()) {
				data << text;
			}
            
            // Loader.
            if (type == "Loader") {
                print("@TODO LOADER");
            }
            
            // Build children.
            if (children.is_defined()) {
                data << build_elements(children, type, visible);
            }
            
            // Apply animation.
            if (animations.is_defined()) {
                apply_animation(data, "in", animations);
            }
			
			// Finalize.
			data << "</" << tag << ">";
			
		}
		return data;
	}
    
    // Build elements.
    constexpr
    String  build_elements(
        const JArray& elements,
        const String& parent_type,
        const Bool& visible = true
    ) {
        
        // Vars.
        String data;
        
        // Pre style.
        Json pre_style;
        if (parent_type == "ZStack") {
            pre_style["position"] = "absolute";
        }
        
        // Iterate.
        for (auto& element: elements) {
            build_element(element.asj(), visible, pre_style);
        }
        return data;
    }
    
    // Build event.
    // Returns js code for the event, not inside a script tag.
    constexpr
    String  build_event() {
        String data;
        return data;
    }
    
    // Build animation.
    constexpr
    void    apply_animation(
        String& data,
        const String& mode,
        const Json& animation
    ) {
        
    }
    
    // Is variable condition.
    constexpr
    Bool    is_variable_condition(const String& type) {
        return type == "IfVariableEq" ||
        type == "IfVariableNotEq" ||
        type == "IfVariableGreaterEq" ||
        type == "IfVariableGreater" ||
        type == "IfVariableLesserEq" ||
        type == "IfVariableLesser" ||
        type == "IfDeviceWidthEq" ||
        type == "IfDeviceWidthNotEq" ||
        type == "IfDeviceWidthGreaterEq" ||
        type == "IfDeviceWidthGreater" ||
        type == "IfDeviceWidthLesserEq" ||
        type == "IfDeviceWidthLesser" ||
        type == "IfEndpointEq" ||
        type == "IfEndpointNotEq" ||
        type == "IfAuthenticated" ||
        type == "IfUnauthenticated" ||
        type == "IfUserActivated" ||
        type == "IfUserUnactivated";
    }
    
    // Create opening html tag.
    constexpr
    void    create_opening_html_tag(
        String& data,
        const Json& element,
        const Json& pre_style
    ) {
        
        // Vars.
        const String& tag = element["tag"].ass();
        const Json& style = element["style"].asj();
        const Json& attr = element["attr"].asj();
        const JArray& on_click = element["on_click"].asa();
        
        // Open.
        data << "<" << tag;
        
        // Add style.
        data << " style='";
        for (auto& index: pre_style.indexes()) {
            data << pre_style.key(index) << ':' << pre_style.value(index).str() << ';';
        }
        for (auto& index: style.indexes()) {
            String& key = style.key(index);
            
            // Make margin calculations for the flex basis.
            if (key == "flex-basis") {
                auto& margin_left = style["margin-left"];
                auto& margin_right = style["margin-right"];
                if (margin_left.isn()) {
                    margin_left = "0px";
                }
                if (margin_right.isn()) {
                    margin_right = "0px";
                }
                auto& columns = element["columns"];
                if (columns.isn()) {
                    columns = 1;
                }
                data << key << ':' << "calc(100% / " << columns.str() << " - (" << margin_left.str() << " + " << margin_right.str() << "))" << ';';
                
            }
            
            // Default.
            else {
                data << key << ':' << style.value(index).str() << ';';
            }
        }
        data << "' ";
        
        // Add attributes.
        for (auto& index: attr.indexes()) {
            data << attr.key(index) << "='" << attr.value(index).str() << "' ";
        }
        
        // Add events.
        
        // Close.
        data << ">";
    }
    
    // Insert style.
    constexpr
    void    insert_style(String& data, const String& style) {
        ullong pos;
        if ((pos = data.find("style='")) != NPos::npos) {
            pos += 7 + 1;
            String new_data = data.slice(0, pos);
            new_data.concat_r(style);
            new_data.concat_r(data.data() + pos, data.len() - pos);
            print("Inserted style: ", new_data);
            data.swap(new_data);
        }
        throw InvalidUsageError("vweb::HTML", "Style is not defined.");
    }
    
    

// Public.
public:
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Constructor.
    constexpr
	HTML() = default;
	
	// Constructor.
	constexpr
	HTML(const ui::View& view)
	{
		
	}
    
    // ---------------------------------------------------------
    // Functions.

};

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

