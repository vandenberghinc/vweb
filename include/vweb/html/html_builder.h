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
// HTML Builder.

struct HTMLBuilder {

// Public.
public:
	
	// ---------------------------------------------------------
	// Attributes.
	
	static String 	pre_html; 	// html code that will be added after the <head> tag.
	static String 	google_tag;	// google tag id.
	
// Private.
private:
    
    // ---------------------------------------------------------
    // Attributes.
	
    String  m_post_js;              // the js code that will be executed at the bottom.
	JArray  m_conditions;	        // the condition elements that can be rebuild by js code.
    Len     m_generated_ids = 0;    // generated ids count.

// Public.
public:
	
    // ---------------------------------------------------------
    // Private functions.
	
	// Build headers.
    template <typename View> 
	String	build_headers(const View& view) {
		String data;
        
        // Default meta data.
        data << "<meta charset='utf-8'>" << "\n";
		data << "<meta name='viewport' content='width=device-width, initial-scale=1' />" << "\n";
        
        // Meta author.
		data << "<meta name='author' content='" << view.meta_author() << "' />" << "\n";
        
        // Meta title.
		data << "<title>" << view.meta_title() << "</title>" << "\n";
		data << "<meta property='og::title' content='" << view.meta_title() << "' />" << "\n";
		data << "<meta property='twitter::title' content='" << view.meta_title() << "' />" << "\n";
        
        // Meta description.
		data << "<meta name='description' content='" << view.meta_description() << "' />" << "\n";
		data << "<meta property='og::description' content='" << view.meta_description() << "' />" << "\n";
        
        // Meta image.
		data << "<meta property='og::image' content='" << view.meta_image() << "' />" << "\n";
        
        // Meta robots.
		data << "<meta name='robots' content='" << view.meta_robots().def("index, follow") << "'>" << "\n";
        
        // Favicon.
		data << "<link rel='icon' href='/favicon.ico' type='image/x-icon' />" << "\n";
		
		// Stylesheet.
		data << "<link rel=\"stylesheet\" href=\"/vweb/css.css\">" << "\n";
        
		return data;
	}
	
	// Build element.
    String	build_element(
        Json& element,
        const Bool& visible = true,
        const Json& pre_style = {},
		const Bool& add_newlines = true
    ) {
		
		// Vars.
		String type = safe_get<String>(element, "type");
        String tag = safe_get<String>(element, "tag");
        String id = safe_get<String>(element, "id");
        String text = safe_get<String>(element, "text");
        Json attr = safe_get<Json>(element, "attr");
        Json style = safe_get<Json>(element, "style");
        Json animations = safe_get<Json>(element, "animations");
        JArray children = safe_get<JArray>(element, "children");
		String newline;
		if (add_newlines) {
			newline.append('\n');
		}
		
		// Create.
		String data;
		
        // ========================================================================
		// Set variable.
        
		if (type == "Variable" || type == "SetVariable") {
            data << "<script type='text/javascript'>" <<
            "variables['" << element["key"].ass() << "'] = " << element["value"].json() << ';' <<
            "</script>" << newline;
		}
        
        // ========================================================================
        // Variable condition.
		
		// Javascript conditions can only be used inside an event.
		else if (type.eq_first("IfJavaScript", 12)) {
			throw vlib::InvalidUsageError("Javascript conditions can only be used inside an Event.");
		}
        
		// Other variable conditions.
        else if (is_variable_condition(type)) {
            
            // Set id.
            if (id.is_undefined()) {
                id = to_str("cpp_e_", ++m_generated_ids);
                element["id"] = id; // to get the element by id for js.
                attr["id"] = id; // to assign id to div.
            }
            
            // Add to condition elements.
            m_conditions.append(element);
            
            // Opening.
            create_opening_html_tag(
                data,
                element,
                attr,
                style,
                pre_style,
                {{"display", "none"}}
            );
            
            // Always disable visibility since certain conditions such as device width ...
            // Can not be checked from cpp.
            // Therefore a vweb_rebuild() is called at the end of the js in the client side code.
            Bool element_visibility = false;
            
            // Build children.
            if (children.is_defined()) {
                data << build_elements(children, type, element_visibility);
            }
            
            // Apply animation.
            if (element_visibility && animations.is_defined()) {
                apply_animation(data, "in", animations);
            }
            
            // Close tag.
			data << "</" << tag << '>' << newline;
            
        }
        
        // ========================================================================
        // Redirect.
        
        else if (type == "Redirect") {
            
            // Perform.
            if (visible) {
				data << "<script type='text/javascript'>";
				if (element["url_param"].asb()) {
					data <<
					"const url_params = new URLSearchParams(window.location.search);"
					"const url_param = url_params.get('" << element["url"].ass() << "');"
					"if (" << element["forced"].asb() << " || vweb_get_endpoint() != url_param) {" <<
					"window.location.href = url_param;";
				} else {
					data <<
					"if (" << element["forced"].asb() << " || vweb_get_endpoint() != '" << element["url"].ass() << "') {" <<
					"window.location.href = '" << element["url"].ass() << "';";
				}
				data << "}" <<
				"</script>" << newline;
            }
        }
        
        // ========================================================================
        // JavaScript.
        
        else if (type == "JavaScript") {
            data << "<script type='text/javascript'>" <<
            element["code"].ass() <<
            "</script>" << newline;
        }
        
        // ========================================================================
        // Get element.
        
        else if (type == "GetElementById") {
            
            // Perform.
            if (visible) {
                
                // Open.
                const String e = to_str("elements['", id, "']");
                data << "<script type='text/javascript'>" <<
                "if (" << e << " == null) {" <<
                e << " = vweb_get_element('" << id << "');" <<
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
				
				// Add children.
				for (auto& child: children) {
					data << e << ".innerHTML += \"" << build_element(child.asj()).replace_r("\"", "&quot;") << "\";";
				}
                
                // Close.
                data << "</script>" << newline;
            }
			
			// Not visible so parse the children to html.
			else if (children.len() > 0) {
				String html_children;
				for (auto& child: children) {
					html_children << build_element(child.asj());
				}
				element["html_children"] = move(html_children);
			}
        }
        
        // ========================================================================
        // SelectOptionInput.
        
        else if (type == "SelectOptionInput") {
            
            // Opening.
            create_opening_html_tag(data, element, attr, style, pre_style);
            
            // Set options.
            int opt_index = 0;
            for (auto& opt: element["select_options"].asa()) {
                data << "<option";
                if (opt_index == 0) {
                    data << " selected=true disabled=true";
                    data << " value=''";
                } else {
                    data << " value='" << opt.ass() << '\'';
                }
                data << ">";
                data << "</option>";
                ++opt_index;
            };
            
            // Finalize.
            data << "</" << tag << ">" << newline;
            
        }
        
        // ========================================================================
        // Loaders.
        
        else if (type == "RingLoader") {
            
            // Get and check width and height.
            String& swidth = style["width"].ass();
            String& sheight = style["height"].ass();
            if (swidth.len() < 2 || swidth.rget(2) != 'p' || swidth.rget(1) != 'x') {
                throw vlib::InvalidUsageError("The width of a \"RingLoader\" must be in pixels.");
            }
            if (sheight.len() < 2 || sheight.rget(2) != 'p' || sheight.rget(1) != 'x') {
                throw vlib::InvalidUsageError("The height of a \"RingLoader\" must be in pixels.");
            }
            Float width = swidth.replace_end("px").as<Float>();
            Float height = sheight.replace_end("px").as<Float>();
            
            // Get background.
            String background = style["background"].ass();
            
            // Set class.
            if (attr.contains("class")) {
                attr["class"].ass() += " RingLoader";
            } else {
                attr["class"] = "RingLoader";
            }
            
            // Open.
            create_opening_html_tag(
                data,
                element,
                attr,
                style,
                pre_style.concat({
                    {"display", "inline-block"},
                    {"position", "relative"},
                }),
                {
                    {"background", "none"},
            });
            
            // Create children.
            Int inside_divs = 4;
            while (inside_divs-- >= 0) {
                data << "<div style='" <<
                "width: " << width * (64/80.0) << "px;" <<
                "height: " << height * (64/80.0) << "px;" <<
                "margin: " << width * (8/80.0) << "px;" <<
                "border: " << width * (8/80.0) << "px solid " << background << ";" <<
                "border-color: " << background << " transparent transparent transparent;" <<
                "' >" <<
                "</div>" << newline;
            }
            
            // Finalize.
            data << "</" << tag << ">" << newline;
            
        }
		
		// ========================================================================
		// Request.
		
		else if (type == "Request") {
			data << "<script type='text/javascript'>" <<
			build_request(element) <<
			"</script>" << newline;
		}
        
        // ========================================================================
        // Elements without a tag like ForEach etc.
		// - Make sure elements that without a tag should not be be build like this
		//   are matched before here.
        
        else if (tag == "") {
            data << build_elements(children, type, visible);
        }
            
        // ========================================================================
		// Other elements.
        
		else {
			
			// Opening.
            create_opening_html_tag(data, element, attr, style, pre_style);
			
			// Text.
			if (text.is_defined()) {
				data << text;
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
			data << "</" << tag << ">" << newline;
			
			// Warnings.
			if (vweb_seo_warnings) {
				if (type == "Image") {
					if (!attr.contains("alt", 3) && attr.contains("src", 3)) {
						print_warning("Warning: Found an Image element without a alt description [", attr["src"].ass(), "].");
					}
				}
			}
			
		}
		return data;
	}
    
    // Build elements.
    String  build_elements(
        JArray& elements,
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
            data << build_element(element.asj(), visible, pre_style);
        }
        return data;
    }
    
	// Optionally add quotes to a string value but not to other types.
	constexpr
	String	add_quotes_when_str(const JsonValue& val) {
		switch (val.type()) {
			case vlib::json::types::string:
				return String() << '\'' << val.ass() << '\'';
			default:
				return val.str();
		}
	}
	
	// Get the condition operator of a condition element.
	constexpr
	String	get_condition_operator(const char* data, const ullong len) {
		if (vlib::array<char>::eq(data, len, "Eq", 2)) {
			return "==";
		} else if (vlib::array<char>::eq(data, len, "NotEq", 5)) {
			return "!=";
		} else if (vlib::array<char>::eq(data, len, "GreaterEq", 9)) {
			return ">=";
		} else if (vlib::array<char>::eq(data, len, "Greater", 7)) {
			return ">";
		} else if (vlib::array<char>::eq(data, len, "LesserEq", 8)) {
			return "<=";
		} else if (vlib::array<char>::eq(data, len, "Lesser", 6)) {
			return "<";
		} else {
			throw vlib::InvalidUsageError("Unknown condition ending \"", data, "\".");
		}
	}
	
    // Build event.
    // Returns js code for the event, not inside a script tag.
    // All ' characters will be escaped.
    constexpr
    String  build_event(JArray& event) {
        
        // Vars.
        String data;
        Bool do_rebuild = false;
        
        // Iterate children.
        for (auto& i: event) {
            
            // Vars.
            Json& child = i.asj();
            String child_type = safe_get<String>(child, "type");
            
            // ========================================================================
            // Set variable.
            
            if (child_type == "SetVariable") {
                do_rebuild = true;
                data << "variables['" << child["key"].ass() << "']=" <<
                child["value"].json() << ';';
            }
            
            // ========================================================================
            // Toggle variable.
            
            else if (child_type == "ToggleVariable") {
                do_rebuild = true;
                data << "variables['" << child["key"].ass() << "']= !" <<
                "variables['" << child["key"].ass() << "']" << ';';
            }
			
			// ========================================================================
			// Javascript conditions.
			
			else if (child_type.eq_first("IfJavaScript", 12)) {
				data <<
				"if (" << child["key"].ass() <<
				' ' << get_condition_operator(child_type.data() + 12, child_type.len() - 12) << ' '
				<< add_quotes_when_str(child["value"]) << ") {" <<
				build_event(child["children"].asa()) <<
				"};";
			}
            
            // ========================================================================
            // Redirect.
            
            else if (child_type == "Redirect") {
				if (child["url_param"].asb()) {
					data <<
					"const url_params = new URLSearchParams(window.location.search);"
					"const url_param = url_params.get('" << child["url"].ass() << "');"
					"if (" << child["forced"].asb() << " || vweb_get_endpoint() != url_param) {" <<
					"window.location.href = url_param;";
				} else {
					data <<
					"if (" << child["forced"].asb() << " || vweb_get_endpoint() != '" << child["url"].ass() << "') {" <<
					"window.location.href = '" << child["url"].ass() << "';";
				}
                data << "}";
            }
            
            // ========================================================================
            // JavaScript.
            
            else if (child_type == "JavaScript") {
                data << child["code"].ass();
				if (data.len() > 0 && data.last() != ';') {
					data << ';';
				}
            }
            
            // ========================================================================
            // Request.
            
            else if (child_type == "Request") {
                data << build_request(child);
            }
            
            // ========================================================================
            // Event.
            
            else if (child_type == "Event") {
                data << build_event(child["children"].asa());
            }
            
            // ========================================================================
            // Delay.
            
            else if (child_type == "Delay") {
                data << "setTimeout(() => {" <<
                build_event(child["children"].asa()) <<
                "}, " << child["delay"].asi() << ");";
            }
            
            // ========================================================================
            // Response Status.
            
            else if (
                child_type == "IfResponseStatusEq" ||
                child_type == "IfResponseStatusNotEq" ||
                child_type == "IfResponseStatusGreater" ||
                child_type == "IfResponseStatusGreaterEq" ||
                child_type == "IfResponseStatusLesser" ||
                child_type == "IfResponseStatusLesserEq"
            ) {
                do_rebuild = true;
                data << "if (status" << child["operator"].ass() << child["value"].json() << "){" <<
                build_event(child["event"].asa()) <<
                "}";
            }
            
            // ========================================================================
            // Invalid.
            
            else {
                throw vlib::InvalidUsageError("Element type \"", child_type, "\" is not allowed inside an \"Event\" element.");
            }
            
            
        }
        
        // Add rebuild.
        if (do_rebuild) {
			if (data.len() == 0 || data.last() != ';') {
				data << ';';
			}
            data << "vweb_rebuild();";
        }
        
        // Handler.
        return data;
    }
	
	// Build a request js code.
	constexpr
	String	build_request(const Json& block) {
		return String() <<
		build_event(block["pre_event"].asa()) <<
		"vweb_request('" << block["method"].ass() << "', '" << block["endpoint"].ass() << "', " <<
		block["body"].asj().dump(0).replace("\"$", "").replace("$\"", "") << ", " <<
		"function(status, response) {" <<
		build_event(block["success_event"].asa()) <<
		"}, " <<
		"function(status, response) {" <<
		build_event(block["error_event"].asa()) <<
		"}" <<
		");";
	}
    
    // Build animation.
    constexpr
    void    apply_animation(String& data, const String& mode, const Json& animation) {
        
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
		// type == "IfJavaScriptEq" ||
		// type == "IfJavaScriptNotEq" ||
		// type == "IfJavaScriptGreaterEq" ||
		// type == "IfJavaScriptGreater" ||
		// type == "IfJavaScriptLesserEq" ||
		// type == "IfJavaScriptLesser" ||
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
    void    create_opening_html_tag(
        String& data,
        Json& element,
        Json& attr, // should not be const so that non existing keys will be null.
        Json& style, // should not be const so that non existing keys will be null.
        const Json& pre_style = {},
        const Json& post_style = {}
    ) {
        
        // Replace value.
        auto replace_value = [](const String& value) {
            return value.replace("'", "&quot;").replace_r("\"", "&quot;");
        };
        
        // Vars.
        String tag = safe_get<String>(element, "tag");
        Json events = safe_get<Json>(element, "events");
        
        // Open.
        data << "<" << tag << ' ';
        
        // Add attributes.
        // Needs to be before style to style class elements differently.
        for (auto& index: attr.indexes()) {
            data << attr.key(index) << "='" << replace_value(attr.value(index).str()) << "' ";
        }
        
        // Add style.
        data << "style='";
        for (auto& index: pre_style.indexes()) {
            data << pre_style.key(index) << ':' << replace_value(pre_style.value(index).str()) << ';';
        }
        for (auto& index: style.indexes()) {
            String& key = style.key(index);
            auto& value = style.value(index);
            
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
            else if (!value.isn()) {
                data << key << ':' << replace_value(value.str()) << ';';
            }
            
        }
        for (auto& index: post_style.indexes()) {
            data << post_style.key(index) << ':' << replace_value(post_style.value(index).str()) << ';';
        }
        data << "' ";
        
        // Add events.
        for (auto& index: events.indexes()) {
            String& key = events.key(index);
            JArray& event = events.value(index).asa();
            data << key << "='" << replace_value(build_event(event)) << "' ";
        }
        
        // Close.
        data << ">";
    }
    
    // Filter the rebuild elements and drop all the unnecessary elements.
    // Remove nested variable conditions since those are already seperetely added to ...
    // The m_conditions attribute, and the id attributes can not assigned.
    constexpr
    JArray  filter_conditions(
        const JArray& conditions,
        const Bool& allow_conditions = true
    ) {
        
        // Iterate.
        JArray filtered;
        for (auto& i: conditions) {
            
            // Vars.
            Json element = i.asj();
            String& type = element["type"].ass();
            auto& children = element["children"];
            
            // Conditions.
            if (allow_conditions && is_variable_condition(type)) {
                element["children"] = filter_conditions(children.asa(), false);
                filtered.append(element);
            }
            
            // Allow certain types that may be rebuild when the condition expression changes.
            else if (
                type == "GetElementById" ||
                type == "Redirect"
            ) {
                if (children.isa()) {
                    element["children"] = filter_conditions(children.asa(), false);
                }
                filtered.append(element);
            }
            
        }
        
        // Handler.
        return filtered;
        
    }
    
    // Safely get a json value.
    // Always creates a copy.
    template <typename Type>
    Type    safe_get(const Json& data, const String& key) const {
        ullong index = data.find(key);
        if (index == NPos::npos) {
            return Type();
        }
        return data.value(index).get<Type>();
    }
    
    

// Public.
public:
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Constructor.
    constexpr
	HTMLBuilder() = default;
    
    // ---------------------------------------------------------
    // Functions.
    
    // Build html from view.
    template <typename View> static
    String    build(const View& view) {
		
		// Html builder.
        HTMLBuilder html;
		
		// Warnings.
		if (vweb_seo_warnings) {
			
			// No meta title.
			if (view.meta_title().is_undefined()) {
				print_warning("Warning: Found a View without a meta title in \"", view.source_file(), "\".");
			}
			
			// No meta description.
			if (view.meta_description().is_undefined()) {
				print_warning("Warning: Found a View without a meta description in \"", view.source_file(), "\".");
			}
			
		}
        
        // Build headers.
        String headers = html.build_headers(view);
        
        // Build body.
        Json element = view.json();
        String body = html.build_element(element);
        
        // Create.
		String data;
		data <<
        "<!DOCTYPE html><html>" <<
		
		// Headers.
		"<head>" << headers << "</head>\n";
		
		// Google tag.
		if (google_tag.is_defined()) {
			data <<
			"<!-- Google tag (gtag.js) -->" <<
			"<script async src='https://www.googletagmanager.com/gtag/js?id=" << google_tag << "'></script>" <<
			"<script>" <<
			" window.dataLayer = window.dataLayer || [];" <<
			" function gtag(){dataLayer.push(arguments);}" <<
			" gtag('js', new Date());" <<
			" gtag('config', '" << google_tag << "');" <<
			"</script>";
		}
		
		// Set the CONDITIONS variable.
		// should be called after building the body.
		// Filter out all the elemnts that will not be used in a rebuild.
		data <<"<script type='text/javascript'>let CONDITIONS = " << Json::dump(html.filter_conditions(html.m_conditions), 0) << "</script>";
		
		// JS Includes.
		data << "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js'></script>" <<
		"<script src='/vweb/pre_js.js'></script>";
		
		// Pre html.
		data << pre_html;
		
		// Body.
		data << "<body id='body'>" << body << "</body>\n";
		
		// Post JS.
		data << "<script src='/vweb/post_js.js'></script>" <<
		"<script type='text/javascript'>" << html.m_post_js << ";vweb_rebuild();</script>\n"; // rebuild to set variable conditions.
		
		// End.
		data << "</html>";
		return data;
    }
    
    // Build html for a mail from view.
    // No javascript is allowed so some things may act different.
    template <typename View> static
    String    build_mail(const View& view) {
        HTMLBuilder html;
        
        // Build body.
        Json element = view.json();
        String body = html.build_element(element);
        
        // Load css.
        String css = Path(__FILE__).base().join("css.css").load();
        
        // Create.
        return String() <<
        "<!DOCTYPE html><html>" <<
        "<head>" <<
        "<meta name='viewport' content='width=device-width, initial-scale=1' />" <<
        "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />" <<
        "</head>" <<
        "<style>" << css << "</style>\n" <<
        "<body id='body'>" << body << "</body>\n" <<
        "</html>";
        
    }

};

// Static attributes.
String HTMLBuilder::pre_html = "";
String HTMLBuilder::google_tag = "";

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

