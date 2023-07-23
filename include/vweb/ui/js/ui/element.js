/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Element.
/*	@docs: {
 *	@chapter: UI
 *	@title: Element
 *	@description:
 *		Base class Element for derived classes.
 } */
class Element {
	
	// ---------------------------------------------------------
	// Constructors.
	
	constructor(type, tag) {
		this.element_type = type;
		this.element_tag = tag;
		this.element_display = "block";
		this.element = document.createElement(this.element_tag);
		vweb.elements.all_elements.push(this);
	}
	
	// ---------------------------------------------------------
	// vweb.utils.
	
	// Padd a numeric with px.
	pad_numeric(value, padding = "px") {
		if (vweb.utils.is_numeric(value)) {
			return value + padding;
		}
		return value;
	}

	// Padd a numeric percentage with %.
	// When the numeric is a float and between 0 and 1 it is also multiplied by 100.
	pad_percentage(value, padding = "%") {
		if (vweb.utils.is_float(value) && value < 1.0) {
			return (value * 100) + padding;
		} else if (vweb.utils.is_numeric(value)) {
			return value + padding;
		}
		return value;
	}

	// Edit a x() from a filter string.
	// Can also be used for similair string that use "x() y()".
	// When to is null the type will be removed.
	edit_filter_wrapper(filter, type, to = null) {
	    const pattern = new RegExp(`${type}\\([^)]*\\)\\s*`, "g");
	    if (pattern.test(filter)) {
	        if (to == null) {
				return filter.replace(pattern, "");
	        } else {
	        	return filter.replace(pattern, to);
	        }
	    } else if (to != null) {
	        return `${filter} ${to}`;
	    }
		return value;
	}

	// Toggle a x() from a filter string.
	// Can also be used for similair string that use "x() y()".
	// When the type is present the item will be removed, otherwise the to will be added.
	toggle_filter_wrapper(filter, type, to = null) {
	    const pattern = new RegExp(`${type}\\([^)]*\\)\\s*`, "g");
	    if (pattern.test(filter)) {
	        return filter.replace(pattern, "");
	    } else if (to != null) {
	        return `${filter} ${to}`;
	    }
		return value;
	}
	
	// ---------------------------------------------------------
	// Children functions.
	
	// Append child elements.
	// Can be called with multiple arguments.
	// A direct HTML Node is also accepted.
	// A function is also accepted and will be executed.
	append(...children) {
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child != null) {

				// VWeb element.
				if (child.element != null) {
					if (
						child.element_type == "ForEach" ||
						child.element_type == "If" ||
						child.element_type == "IfDeviceWith"
					) {
						child.append_children_to(this.element);
					} else {
						this.element.appendChild(child.element);
					}
				}

				// Execute function.
				else if (vweb.utils.is_func(child)) {
					this.append(child());
				}

				// Node element.
				else if (child instanceof Node) {
					this.element.appendChild(child);
				}

				// Append text.
				else if (vweb.utils.is_string(child)) {
					this.element.appendChild(document.createTextNode(child));	
				}

				// else {
				// 	console.log("UNKOWN CHILD: ", child);
				// }

			}
		}
		return this;
	}
	zstack_append(...children) {
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child != null) {

				// VWeb element.
				if (child.element != null) {
					// child.element.style.position = "absolute";
					child.element.style.gridArea = "1 / 1 / 2 / 2";
					if (
						child.element_type == "ForEach" ||
						child.element_type == "If" ||
						child.element_type == "IfDeviceWith"
					) {
						child.append_children_to(this.element);
					} else {
						this.element.appendChild(child.element);
					}
				}

				// Execute function.
				else if (vweb.utils.is_func(child)) {
					this.append(child());
				}

				// Node element.
				else if (child instanceof Node) {
					// child.element.style.position = "absolute";
					child.element.style.gridArea = "1 / 1 / 2 / 2";
					this.element.appendChild(child);
				}

				// Append text.
				else if (vweb.utils.is_string(child)) {
					this.element.appendChild(document.createTextNode(child));	
				}

			}
		}
		return this;
	}

	// Append to parent element.
	append_to(parent) {
		parent.appendChild(this.element);
		return this;
	}

	// Append the children to parent element.
	append_children_to(parent) {
		while (this.element.firstChild) {
			parent.appendChild(this.element.firstChild)
		}
		return this;
	}

	// Remove child.
	// Can either be a Node object an Element derived object or an id.
	remove_child(child) {
		if (child.element != null) {
			this.element.removeChild(child.element);
		} else if (child instanceof Node) {
			this.element.removeChild(child);
		} else if (vweb.utils.is_string(child)) {
			this.element.removeChild(document.getElementById(child));
		} else {
			console.error("Invalid parameter type for function \"remove_child()\".");
		}
		return this;
	}

	// Remove children.
	remove_children() {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}
		return this;
	}

	// ---------------------------------------------------------
	// Text attribute functions.
	
	// Set or get the text.
	// Leave value "null" to get the text.
	text(value) {
		if (value == null) {
			return this.element.textContent;	
		}
		this.element.textContent = value;
		return this;
	}

	// Set or get the value.
	// Leave value "null" to get the value.
	value(val) {
		if (val == null) {
			return this.element.value;	
		}
		this.element.value = val;
		return this;
	}

	// ---------------------------------------------------------
	// Framing functions.
	
	// Specify the width or height of the element
	// Returns the offset width or height when the param value is null.
	static elements_with_width_attribute = [
		'canvas',
		'embed',
		'iframe',
		'img',
		'object',
		'progress',
		'video',
	];
	width(value, check_attribute = true) {
		if (check_attribute && Element.elements_with_width_attribute.includes(this.element_tag)) {
			if (value == null) {
				return this.element.width;
			}
			this.element.width = value;
		} else {
			if (value == null) {
				return this.element.style.width;
			}
			this.element.style.width = this.pad_numeric(value);
		}
		return this;
	}
	height(value) {
		if (Element.elements_with_width_attribute.includes(this.element_tag)) {
			if (value == null) {
				return this.element.height;
			}
			this.element.height = value;
		} else {
			if (value == null) {
				return this.element.style.height;
			}
			this.element.style.height = this.pad_numeric(value);
		}
		return this;
	}

	// Set width by columns for HStack children.
	width_by_columns(columns) {
		let margin_left = this.element.style.marginLeft;
        let margin_right = this.element.style.marginRight;
		if (margin_left == null) {
			margin_left = "0px";
		}
		if (margin_right == null) {
			margin_right = "0px";
		}
		if (columns == null) {
			columns = 1;
		}
		this.element.style.flexBasis = "calc(100% / " + columns + " - (" + margin_left + " + " + margin_right + "))";
		// overflow needs to be set to hidden since it can cause the flex box ...
		// calculations by the js template to fail.
		this.element.style.overflow = "hidden";
		return this;
	}

	// Get the offset width and height.
	offset_width() {
		return this.element.offsetWidth;
	}
	offset_height() {
		return this.element.offsetHeight;
	}

	// Get the x and y offset
	x() {
		return this.element.offsetLeft;
	}
	y() {
		return this.element.offsetTop;
	}

	// Frame.
	frame(width, height) {
		this.width(width);
		this.height(height);
		return this;
	}

	// Padding, 1 or 4 args.
	padding(...values) {
		if (values.length === 0) {
			return this.element.style.padding;
		} else if (values.length === 1) {
			this.element.style.padding = this.pad_numeric(values[0]);
		} else if (values.length === 2) {	
			this.element.style.paddingTop = this.pad_numeric(values[0]);
			this.element.style.paddingRight = this.pad_numeric(values[1]);
			this.element.style.paddingBottom = this.pad_numeric(values[0]);
			this.element.style.paddingLeft = this.pad_numeric(values[1]);
		} else if (values.length === 4) {
			this.element.style.paddingTop = this.pad_numeric(values[0]);
			this.element.style.paddingRight = this.pad_numeric(values[1]);
			this.element.style.paddingBottom = this.pad_numeric(values[2]);
			this.element.style.paddingLeft = this.pad_numeric(values[3]);
		} else {
			console.error("Invalid number of arguments for function \"padding()\".");
		}
		return this;
	}
	
	// Margin, 1 or 4 args.
	margin(...values) {
		if (values.length === 0) {
			return this.element.style.margin;
		} else if (values.length === 1) {
			this.element.style.margin = this.pad_numeric(values[0]);
		} else if (values.length === 2) {		
			this.element.style.marginTop = this.pad_numeric(values[0]);
			this.element.style.marginRight = this.pad_numeric(values[1]);
			this.element.style.marginBottom = this.pad_numeric(values[0]);
			this.element.style.marginLeft = this.pad_numeric(values[1]);
		} else if (values.length === 4) {
			this.element.style.marginTop = this.pad_numeric(values[0]);
			this.element.style.marginRight = this.pad_numeric(values[1]);
			this.element.style.marginBottom = this.pad_numeric(values[2]);
			this.element.style.marginLeft = this.pad_numeric(values[3]);
		} else {
			console.error("Invalid number of arguments for function \"margin()\".");
		}
		return this;
	}
	
	// Position, 1 or 4 args.
	position(...values) {
		if (values.length === 0) {
			return this.element.style.position;
		} else if (values.length === 1) {
			this.element.style.position = values[0];
		} else if (values.length === 4) {
			this.element.style.position = "absolute";
			this.element.style.top = this.pad_numeric(values[0]);
			this.element.style.right = this.pad_numeric(values[1]);
			this.element.style.bottom = this.pad_numeric(values[2]);
			this.element.style.left = this.pad_numeric(values[3]);
		} else {
			console.error("Invalid number of arguments for function \"position()\".");
		}
		return this;
	}

	// Stretch (flex).
	stretch(value) {
		if (value == true) {
			this.element.style.flex = 1;
		} else {
			this.element.style.flex = 0;
		}
		return this;
	}

	// Wrap.
	wrap(value) {
		if (value == true) {
			this.element.style.whiteSpace = "wrap";
		} else if (value == false) {
			this.element.style.whiteSpace = "nowrap";
		} else {
			this.element.style.whiteSpace = value;
		}
		switch (this.element_tag) {
			case "div":
				if (value == true) {
					this.element.style.flexFlow = "wrap";
				} else if (value == false) {
					this.element.style.flexFlow = "nowrap";
				} else {
					this.element.style.flexFlow = value;
				}
				break;
			default:
				if (value == true) {
					this.element.style.textWrap = "wrap";
				} else if (value == false) {
					this.element.style.textWrap = "nowrap";
				} else {
					this.element.style.textWrap = value;
				}
				break;
		}
		return this;
	}

	// Z Index.
	z_index(value) {
		this.element.style["z-index"] = value;
		return this;
	}

	// ---------------------------------------------------------
	// Alignment functions.
	
	// Alignment.
	align(value) {
		switch (this.element_type) {
			case "HStack":
			case "ZStack":
				this.element.style.justifyContent = value;
				return this;
			case "VStack":
			case "Scroller":
				this.element.style.alignItems = value;
				return this;
			default:
				this.element.style.textAlign = value;
				return this;
		}
	}
	leading() {
		return this.align("start");
	}
	center() {
		return this.align("center");
	}
	trailing() {
		return this.align("end");
	}
	
	// Align.
	align_vertical(value) {
		switch (this.element_type) {
			case "HStack":
			case "ZStack":
				this.element.style.alignItems = value;
				return this;
			case "VStack":
			case "Scroller":
				this.element.style.justifyContent = value;
				return this;
			default:
				this.element.style.textAlign = value;
				return this;
		}
	}
	leading_vertical() {
		return this.align_vertical("start");
	}
	center_vertical() {
		return this.align_vertical("center");
	}
	trailing_vertical() {
		return this.align_vertical("end");
	}
	
	// Text align shortcuts.
	align_text(value) {
		return this.text_align(value);
	}
	text_leading() {
		return this.text_align("start");
	}
	text_center() {
		return this.text_align("center");
	}
	text_trailing() {
		return this.text_align("end");
	}

	// Align items by height inside a hstack.
	align_height() {
		return this.align_items("stretch");
	}
	
	// ---------------------------------------------------------
	// Styling functions.

	/*	@docs: {
     *	@title: Color
     *	@description: 
     *		Sets the color of text, also supports a `Gradient` element.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. 
     *		Unless parameter `value` is `null`, then the attribute's value is returned. 
     *		When the value is `null` and the color has been set using a `Gradient`, `transparent` will be returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	} 
     *	@inherit: false
     } */ 
    color(value) {
        if (value == null) { return this.element.style.color; }
        if (value instanceof Gradient) {
        	this.element.style.backgroundImage = value.gradient;
        	this.element.style.backgroundClip = "text";
        	this.element.style["-webkit-background-clip"] = "text";
        	this.element.style.color = "transparent";
        } else {
        	this.element.style.color = value;
        }
        return this;
    }

	// Border, 1 till 3 args.
	border(...values) {
		if (values.length === 1) {
			this.element.style.border = values[0];
		} else if (values.length === 2) {
			this.element.style.border = this.pad_numeric(values[0]) + " solid " + values[1];
		} else if (values.length === 3) {
			this.element.style.border = this.pad_numeric(values[0]) + " ", values[1] + " " + values[2];
		} else {
			console.error("Invalid number of arguments for function \"border()\".");
		}
		return this;
	}

	// Adds shadow to the object, 1 or 4 args.
	shadow(...values) {
		if (values.length === 1) {
			this.element.style.boxShadow = this.pad_numeric(values[0]);
		} else if (values.length === 4) {
			this.element.style.boxShadow =
				this.pad_numeric(values[0]) + " " +
				this.pad_numeric(values[1]) + " " +
				this.pad_numeric(values[2]) + " " +
				values[3];
		} else {
			console.error("Invalid number of arguments for function \"shadow()\".");
		}
		return this;
	}

	// Adds drop shadow to the object, 0 or 4 args.
	drop_shadow(...values) {
		if (values.length === 0) {
			this.element.style.filter = "";
			this.element.style["-webkit-filter"] = "";
		} else if (values.length === 1) {
			this.element.style.filter = "drop-shadow(" + this.pad_numeric(values[0]) + ") ";
			this.element.style["-webkit-filter"] = this.element.style.filter;
		} else if (values.length === 4) {
			this.element.style.filter =
				"drop-shadow(" + 
				this.pad_numeric(values[0]) + " " +
				this.pad_numeric(values[1]) + " " +
				this.pad_numeric(values[2]) + " " +
				values[3] + ") ";
			this.element.style["-webkit-filter"] = this.element.style.filter;
		} else {
			console.error("Invalid number of arguments for function \"drop_shadow()\".");
		}
		return this;
	}

	// Greyscale.
	greyscale(value) {
		if (value == null) {
			this.element.style.filter = "";
			this.element.style["-webkit-filter"] = "";
		} else {
			this.element.style.filter += "grayscale(" + this.pad_percentage(value, "") + ") ";
			this.element.style["-webkit-filter"] += "grayscale(" + this.pad_percentage(value, "") + ") ";
		}
		return this;
	}

	// Opacity.
	opacity(value) {
		this.element.style.opacity = value;
		return this;
	}

	// Toggle opacity.
	// Can be used to darken and normalize a view.
    toggle_opacity(value = 0.25) {
		if (typeof this.element.style.opacity === "undefined" || this.element.style.opacity == "" || this.element.style.opacity == 1.0) {
			this.element.style.opacity = value;
		} else {
			this.element.style.opacity = 1.0;
		}
		return this;
    }

	// Blur.
	blur(value) {
		if (value == null) {
			this.element.style.filter = this.edit_filter_wrapper(this.element.style.filter, "blur", value);
		} else {
			this.element.style.filter = this.edit_filter_wrapper(this.element.style.filter, "blur", "blur(" + this.pad_numeric(value) + ") ");
		}
		this.element.style["-webkit-filter"] = this.element.style.filter;
		return this;
	}

	// Toggle blur.
	toggle_blur(value = 10) {
		this.element.style.filter = this.toggle_filter_wrapper(this.element.style.filter, "blur", "blur(" + this.pad_numeric(value) + ") ");
		this.element.style["-webkit-filter"] = this.element.style.filter;
		return this;
	}
	
	// Background blur.
	background_blur(value) {
		if (value == null) {
			this.element.style.backdropFilter = this.edit_filter_wrapper(this.element.style.backdropFilter, "blur", value);
		} else {
			this.element.style.backdropFilter =this.edit_filter_wrapper(this.element.style.backdropFilter, "blur", "blur(" + this.pad_numeric(value) + ") ");
		}
		this.element.style["-webkit-backdrop-filter"] = this.element.style.backdropFilter;
		return this;
	}

	// Toggle background blur.
	toggle_background_blur(value = 10) {
		this.element.style.backdropFilter = this.toggle_filter_wrapper(this.element.style.backdropFilter, "blur", "blur(" + this.pad_numeric(value) + ") ");
		this.element.style["-webkit-backdrop-filter"] = this.element.style.backdropFilter;
		return this;
	}

	// Brightness.
	brightness(value) {
		if (value == null) {
			this.element.style.filter = this.edit_filter_wrapper(this.element.style.filter, "brightness", value);
		} else {
			this.element.style.filter = this.edit_filter_wrapper(this.element.style.filter, "brightness", "brightness(" + this.pad_percentage(value, "%") + ") ");
		}
		this.element.style["-webkit-filter"] = this.element.style.filter;
		return this;
	}

	// Toggle brightness.
	toggle_brightness(value = 0.5) {
		this.element.style.filter = this.toggle_filter_wrapper(this.element.style.filter, "brightness", "brightness(" + this.pad_percentage(value, "%") + ") ");
		this.element.style["-webkit-filter"] = this.element.style.filter;
		return this;
	}

	// Background brightness.
	background_brightness(value) {
		if (value == null) {
			this.element.style.backdropFilter = this.edit_filter_wrapper(this.element.style.backdropFilter, "brightness", value);
		} else {
			this.element.style.backdropFilter = this.edit_filter_wrapper(this.element.style.backdropFilter, "brightness", "brightness(" + this.pad_percentage(value, "%") + ") ");
		}
		this.element.style["-webkit-backdrop-filter"] = this.element.style.backdropFilter;
		return this;
	}

	// Toggle brightness.
	toggle_background_brightness(value = 10) {
		this.element.style.backdropFilter = this.toggle_filter_wrapper(this.element.style.backdropFilter, "brightness", "brightness(" + this.pad_percentage(value, "%") + ") ");
		this.element.style["-webkit-backdrop-filter"] = this.element.style.backdropFilter;
		return this;
	}

	// ---------------------------------------------------------
	// Visibility functions.

	// Specifies how a certain HTML element should be displayed
    display(value) {
    	if (value != null && value != "none") {
    		this.element_display = value;
    	}
        this.element.style.display = value;
        return this;
    }

    // Hide the element.
    hide() {
    	this.element.style.display = "none";
    	return this;
    }

    // Show.
    show() {
    	this.element.style.display = this.element_display;
    	return this;
    }

    // Specify if the element is hidden.
    // Should not be used with an argument, rather use hide() and show().
    // When no argument is passed it returns the visibility boolean.
    is_hidden(...args) {
    	if (args.length === 0) {
    		return this.element.style.display == "none" || typeof this.element.style.display === "undefined";
    	}
    	console.error("Function \"hidden()\" should not be used with arguments, use \"hide()\" and \"show()\" instead.");
    }

    // Toggle visibility.
    toggle_visibility() {
		if (this.hidden()) {
			this.show();
		} else {
			this.hide();
		}
		return this;
    }

    // ---------------------------------------------------------
	// General attribute functions.
	
	// Inner html.
	inner_html(value) {
		if (value == null) {
			return this.element.innerHTML;
		}
		this.element.innerHTML = value;
		return this;
	}

	// Outer html.
	outer_html(value) {
		if (value == null) {
			return this.element.outerHTML;
		}
		this.element.outerHTML = value;
		return this;
	}
	
	// Style dictionary.
	// - Returns the css attributes when param css_attr is null.
	style(css_attr) {
		if (css_attr == null) {
			let dict = {};
			for (let property in this.element.style) {
				if (this.element.style.hasOwnProperty(property)) {

					// Custom css styles will be a direct key instead of the string index.
					// if (property[0] == "-") { 
					if (!(/^\d+$/).test(property) && this.element.style[property] != '' && typeof this.element.style[property] !== 'function') { 
						// console.log(property);
						dict[property] = this.element.style[property];
					}

					// Default styles will be an index string instead of the key.
					else { 
						const key = this.element.style[property];
						const value = this.element.style[key];
						if (
							key !== '' && key !== undefined && typeof key !== 'function' &&
							value !== '' && value !== undefined && typeof value !== 'function'
						) {
							dict[key] = value;
						}
					}

				}
			}
			return dict;
		}
		for (const i in css_attr) {
			const value = css_attr[i];
			if (i === "display" && value != null && value !== "none") {
				this.element_display = value;
			}
			this.element.style[i] = value;
		}	
		return this;
	}
	
	// Get or set a single attribute.
	// leave value null to get the attribute.
	attribute(key, value = null) {
		if (value == null) {
			return this.element[key];
		}
		this.element[key] = value;
		return this;
	}

	// Set attributes by dict.
	attributes(html_attr) {
		for (let i in html_attr) {
			this.element[i] = html_attr[i];
		}
		return this;
	}
	
	// Get or set a single events.
	// leave value null to get the events.
	event(key, value = null) {
		if (value == null) {
			return this.element[key];
		}
		this.element[key] = value;
		return this;
	}

	// Set events by dict.
	events(html_events) {
		for (let i in html_events) {
			this.element[i] = html_events[i];
		}
		return this;
	}

	// Specifies one or more classnames for an element (refers to a class in a style sheet).
    /*	@docs: {
     *	@title: Class
     *	@description: 
     *		Specifies one or more classnames for an element (refers to a class in a style sheet).
     *		The equivalent of HTML attribute `class`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	} 
     *	@inherit: false
     } */ 
    class(value) {
        if (value == null) { return this.element.class; }
    	this.element.className = value;
    	return this;
    }

	// ---------------------------------------------------------
	// Media query functions.

	// Media query.
	media(media_query, true_handler, false_handler) {
		const e = this;
		function query_handler(query) {
			if (query.matches) {
				true_handler(e);
			} else if (false_handler != null) {
				false_handler(e);
			}
		}
		const query_list = window.matchMedia(media_query);
		query_handler(query_list); // Initialize the style based on the initial media query state
		query_list.addListener(query_handler); // Update the style when the media query state changes
		return this;
	}

	// ---------------------------------------------------------
	// Default html element functions.

	// Animate.
	animate({
		keyframes = [], 
		easing = "ease-in-out",
		delay = 0,
		duration = 1000,
		repeat = false,
		on_finish = null,
	}) {
		const e = this;

		// Keep a single keyframe state for delays.
		function keep_state(index) {
			e.element.animate(
				[
					keyframes[index],
					keyframes[index],
				], 
				{
					duration: delay,
				}
			);
		}

		// Do an animation.
		function do_animation(index) {

			// Animate.
			if (index + 1 < keyframes.length) {
				const from = keyframes[index];
				const to = keyframes[index + 1];
				e.element.animate(
					[
						from, 
						to,
					], 
					{
						duration: from.duration || duration,
						// easing: from.easing || easing,
					}
				);
				if (to.delay != null && to.delay > 0) {
					setTimeout(() => keep_state(index + 1), from.duration || duration);
					setTimeout(() => do_animation(index + 1), (from.duration || duration) + (to.delay || 0));
				} else {
					setTimeout(() => do_animation(index + 1), from.duration || duration);
				}
			}

			// Repeat when finished.
			else if (repeat) {

				// Keep last state till delay.
				if (delay > 0) {
					keep_state(keyframes.length - 1);
					setTimeout(() => do_animation(0), delay);

				}

				// No delay.
				else {
					const delay = keyframes[keyframes.length - 1].duration || duration;
					setTimeout(() => do_animation(0), delay);
				}

			}

			// Finished.
			else if (on_finish != null) {
				on_finish(e);
			}
		};

		// Start.
		setTimeout(() => do_animation(0), delay || 0);
		return this;

		// ============================================
		// v1.
		/*

		// Use default animation when the keyframes do not contain key "duration" or "delay".
		const default_animation = true;
		for (let i = 0; i < keyframes.length; i++) {
			if (keyframes[i].duration != null || keyframes[i].delay != null) {
				default_animation = false;
				break;
			}
		}

		// Default animation.
		if (default_animation) {
			if (options.iterations == "infinite") {
				options.iterations = Infinity;
			}
			if (options.iterations == "infinite") {
				options.iterations = Infinity;
			}
			const animation = this.element.animate(keyframes, options);
			if (on_finish !== null) {
				const e = this;
				animation.onfinish = function() {
					on_finish(e);
				}
			}
			return this;
		}

		// const { keyframes, options: animationOptions, on_finish } = options;

		// List of properties that require the "px" unit
  		const padded_properties = [
			"top",
			"left",
			"right",
			"bottom",
			"width",
			"height",
			"margin",
			"margin-top",
			"margin-bottom",
			"margin-left",
			"margin-right",
			"padding",
			"padding-top",
			"padding-bottom",
			"padding-left",
			"padding-right",
			"border-width",
			"border-top-width",
			"border-bottom-width",
			"border-left-width",
			"border-right-width",
			"border-radius",
  		];

    	const animate_frame = (index) => {
	        if (index >= keyframes.length) {
	            if (options.iterations === "infinite") {
	                // Repeat the animation if iterations are set to "infinite"
	                requestAnimationFrame(() => animate_frame(0));
	            } else if (typeof options.iterations === "number" && options.iterations > 1) {
	                // Repeat the animation a finite number of times
	                requestAnimationFrame(() => animate_frame(0));
	                options.iterations--;
	            } else if (on_finish) {
	                // Animation finished, call the on_finish callback
	                on_finish();
	            }
	            return;
	        }

	        const keyframe = keyframes[index];
	        const next_keyframe = keyframes[index + 1] || keyframes[0];

	        const duration = keyframe.duration || options.duration || 1000; // Default duration if not provided
	        const delay = keyframe.delay || options.delay || 0; // Default duration if not provided
	        const start_time = Date.now();

	        const animate_step = () => {
	            const elapsed = Date.now() - start_time;
	            const delay_progress = delay == 0 ? 1 : Math.min(elapsed / delay, 1);
	            const progress = duration == 0 ? 1 : Math.min((elapsed - delay) / duration, 1);

	            if (delay_progress >= 1) {
		            for (let property in keyframe) {
		            	const from = keyframe[property];
		            	const to = next_keyframe[property];

		            	// Apply "px" unit to properties that require it.
		            	if (padded_properties.includes(property)) {
		            		let padding;
		            		if (vweb.utils.is_string(from)) {
		            			if (from.includes("px")) {
		            				from = parseFloat(from.substr(0, from.length - 2));
		            				padding = "px";
		            			} else if (from.includes("%")) {
		            				from = parseFloat(from.substr(0, from.length - 1));
		            				padding = "%";
		            			}
		            		} else {
		            			padding = "px";
		            		}
			                const current = (to - from) * progress + from;
							this.element.style[property] = current + padding;
						}

						// Apply non-numeric animation directly.
						else if (progress >= 1){
							this.element.style[property] = to;
						}

		            }
		         }

	            if (delay_progress < 1 || progress < 1) {
	                requestAnimationFrame(animate_step);
	            } else {
	                requestAnimationFrame(() => animate_frame(index + 1));
	            }
	        };

	        animate_step();
	    };

	    animate_frame(0);

		return this;
		*/
	}

	// ---------------------------------------------------------
	// Events.

	// Script to be run when the element is being clicked
    on_click(value) {
    	this.element.style.cursor = "pointer";
    	this.element.onclick = value;
    	return this;
    }

    // Script to be run when the browser window is being resized.
    /*	@docs: {
     *	@title: On resize
     *	@description: 
     *		Script to be run when the browser window is being resized.
     *		
     *		The first parameter of the callback is the `Element` object.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_window_resize({callback, once = false, delay = 25}) {
        if (callback == null) { return window.onresize; }
    	const e = this;
    	window.addEventListener('resize', () => {
    		if (once && e.on_window_resize_timer != null) {
    			clearTimeout(e.on_window_resize_timer)
    		}
    		e.on_window_resize_timer = setTimeout(() => callback(e), delay);
    	});
    	return this;
    }

    // Custom on attachment drop event.
    on_attachment_drop({handler, compress = false}) {
    	this.on_drag_over(function(e) {
			e.preventDefault();
			e.dataTransfer.dropEffect = "copy";
		});
		this.on_drop(function(e) {
			e.preventDefault();
			const files = e.dataTransfer.files;
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const reader = new FileReader();
				reader.onload = (event) => {
					if (compress == true) {
						handler(file.name, vweb.utils.compress(event.target.result), file);
					} else {
						handler(file.name, event.target.result, file);
					}
				};
				reader.readAsText(file);
			}
		});
		return this;
    }

    // Event when a element appears to the user.
    on_appear({callback, repeat = false}) {
    	let is_called = false;
    	const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !is_called) {
					if (callback != null) {
						const e = this;
						callback(e);
					}
					if (!repeat) {
						observer.unobserve(entry.target);
					}
					is_called = true;
				} else if (!entry.isIntersecting) {
					is_called = false;
				}
			});
		});
		observer.observe(this.element);
		return this;
    }

    // ---------------------------------------------------------
	// Pseudo element styles.

	// Style the before object.
	// Returns style object of the pseudo-element.
	before() {
		const pseudo = getComputedStyle(this.element, '::before');
		const e = new Element();
		e.element = pseudo;
		return e;
	}

	// Style the after object.
	// Returns style object of the pseudo-element.
	after() {
		const pseudo = getComputedStyle(this.element, '::after');
		const e = new Element();
		e.element = pseudo;
		return e;
	}

	// ---------------------------------------------------------
	// Other functions.

	// Get the children.
	children() {
		return this.element.children;
	}

	// Get the first child.
	first_child() {
		return this.element.firstChild;
	}

	// Get the last child.
	last_child() {
		return this.element.lastChild;
	}

	// ---------------------------------------------------------
	// Custom functions for some derived classes.

	// Get or set the parent element.
	// Only assigned when this is a child element of a specific Element derived class, such as LoaderButton.
	parent(value) {
		if (value == null) {
			return this.parent_e;
		}
		this.parent_e = value;
		return this;
	}

	// ---------------------------------------------------------
	// Cast functions.
	
	// Cast to string.
	toString() {
		return this.element.outerHTML;
		// The outer html is not defined if the element is not added to the body.
		// const serializer = new XMLSerializer();
		// const html = serializer.serializeToString(this.element);
		// console.log(html);
		// return html;
	}

    // ---------------------------------------------------------
    // Automatically generated CSS functions. 
    // Reference: https://www.w3schools.com/cssref/index.php. 

    // Specifies an accent color for user-interface controls.
    /*	@docs: {
     *	@title: Accent color
     *	@description: 
     *		Specifies an accent color for user-interface controls.
     *		The equivalent of CSS attribute `accentColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    accent_color(value) {
        if (value == null) { return this.element.style.accentColor; }
        this.element.style.accentColor = value;
        return this;
    }

    // Specifies the alignment between the lines inside a flexible container when the items do not use all available space.
    /*	@docs: {
     *	@title: Align content
     *	@description: 
     *		Specifies the alignment between the lines inside a flexible container when the items do not use all available space.
     *		The equivalent of CSS attribute `alignContent`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    align_content(value) {
        if (value == null) { return this.element.style.alignContent; }
        this.element.style.alignContent = value;
        this.element.style.msAlignContent = value;
        this.element.style.webkitAlignContent = value;
        this.element.style.MozAlignContent = value;
        this.element.style.OAlignContent = value;
        return this;
    }

    // Specifies the alignment for items inside a flexible container.
    /*	@docs: {
     *	@title: Align items
     *	@description: 
     *		Specifies the alignment for items inside a flexible container.
     *		The equivalent of CSS attribute `alignItems`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    align_items(value) {
        if (value == null) { return this.element.style.alignItems; }
        this.element.style.alignItems = value;
        this.element.style.msAlignItems = value;
        this.element.style.webkitAlignItems = value;
        this.element.style.MozAlignItems = value;
        this.element.style.OAlignItems = value;
        return this;
    }

    // Specifies the alignment for selected items inside a flexible container.
    /*	@docs: {
     *	@title: Align self
     *	@description: 
     *		Specifies the alignment for selected items inside a flexible container.
     *		The equivalent of CSS attribute `alignSelf`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    align_self(value) {
        if (value == null) { return this.element.style.alignSelf; }
        this.element.style.alignSelf = value;
        this.element.style.msAlignSelf = value;
        this.element.style.webkitAlignSelf = value;
        this.element.style.MozAlignSelf = value;
        this.element.style.OAlignSelf = value;
        return this;
    }

    // Resets all properties (except unicode-bidi and direction).
    /*	@docs: {
     *	@title: All
     *	@description: 
     *		Resets all properties (except unicode-bidi and direction).
     *		The equivalent of CSS attribute `all`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    all(value) {
        if (value == null) { return this.element.style.all; }
        this.element.style.all = value;
        return this;
    }

    // A shorthand property for all the animation-* properties.
    /*	@docs: {
     *	@title: Animation
     *	@description: 
     *		A shorthand property for all the animation-* properties.
     *		The equivalent of CSS attribute `animation`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    animation(value) {
        if (value == null) { return this.element.style.animation; }
        this.element.style.animation = value;
        this.element.style.msAnimation = value;
        this.element.style.webkitAnimation = value;
        this.element.style.MozAnimation = value;
        this.element.style.OAnimation = value;
        return this;
    }

    // Specifies a delay for the start of an animation.
    /*	@docs: {
     *	@title: Animation delay
     *	@description: 
     *		Specifies a delay for the start of an animation.
     *		The equivalent of CSS attribute `animationDelay`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    animation_delay(value) {
        if (value == null) { return this.element.style.animationDelay; }
        this.element.style.animationDelay = value;
        this.element.style.msAnimationDelay = value;
        this.element.style.webkitAnimationDelay = value;
        this.element.style.MozAnimationDelay = value;
        this.element.style.OAnimationDelay = value;
        return this;
    }

    // Specifies whether an animation should be played forwards, backwards or in alternate cycles.
    /*	@docs: {
     *	@title: Animation direction
     *	@description: 
     *		Specifies whether an animation should be played forwards, backwards or in alternate cycles.
     *		The equivalent of CSS attribute `animationDirection`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    animation_direction(value) {
        if (value == null) { return this.element.style.animationDirection; }
        this.element.style.animationDirection = value;
        this.element.style.msAnimationDirection = value;
        this.element.style.webkitAnimationDirection = value;
        this.element.style.MozAnimationDirection = value;
        this.element.style.OAnimationDirection = value;
        return this;
    }

    // Specifies how long an animation should take to complete one cycle.
    /*	@docs: {
     *	@title: Animation duration
     *	@description: 
     *		Specifies how long an animation should take to complete one cycle.
     *		The equivalent of CSS attribute `animationDuration`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    animation_duration(value) {
        if (value == null) { return this.element.style.animationDuration; }
        this.element.style.animationDuration = value;
        this.element.style.msAnimationDuration = value;
        this.element.style.webkitAnimationDuration = value;
        this.element.style.MozAnimationDuration = value;
        this.element.style.OAnimationDuration = value;
        return this;
    }

    // Specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
    /*	@docs: {
     *	@title: Animation fill mode
     *	@description: 
     *		Specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
     *		The equivalent of CSS attribute `animationFillMode`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    animation_fill_mode(value) {
        if (value == null) { return this.element.style.animationFillMode; }
        this.element.style.animationFillMode = value;
        this.element.style.msAnimationFillMode = value;
        this.element.style.webkitAnimationFillMode = value;
        this.element.style.MozAnimationFillMode = value;
        this.element.style.OAnimationFillMode = value;
        return this;
    }

    // Specifies the number of times an animation should be played.
    /*	@docs: {
     *	@title: Animation iteration count
     *	@description: 
     *		Specifies the number of times an animation should be played.
     *		The equivalent of CSS attribute `animationIterationCount`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    animation_iteration_count(value) {
        if (value == null) { return this.element.style.animationIterationCount; }
        this.element.style.animationIterationCount = value;
        this.element.style.msAnimationIterationCount = value;
        this.element.style.webkitAnimationIterationCount = value;
        this.element.style.MozAnimationIterationCount = value;
        this.element.style.OAnimationIterationCount = value;
        return this;
    }

    // Specifies a name for the @keyframes animation.
    /*	@docs: {
     *	@title: Animation name
     *	@description: 
     *		Specifies a name for the @keyframes animation.
     *		The equivalent of CSS attribute `animationName`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    animation_name(value) {
        if (value == null) { return this.element.style.animationName; }
        this.element.style.animationName = value;
        this.element.style.msAnimationName = value;
        this.element.style.webkitAnimationName = value;
        this.element.style.MozAnimationName = value;
        this.element.style.OAnimationName = value;
        return this;
    }

    // Specifies whether the animation is running or paused.
    /*	@docs: {
     *	@title: Animation play state
     *	@description: 
     *		Specifies whether the animation is running or paused.
     *		The equivalent of CSS attribute `animationPlayState`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    animation_play_state(value) {
        if (value == null) { return this.element.style.animationPlayState; }
        this.element.style.animationPlayState = value;
        this.element.style.msAnimationPlayState = value;
        this.element.style.webkitAnimationPlayState = value;
        this.element.style.MozAnimationPlayState = value;
        this.element.style.OAnimationPlayState = value;
        return this;
    }

    // Specifies the speed curve of an animation.
    /*	@docs: {
     *	@title: Animation timing function
     *	@description: 
     *		Specifies the speed curve of an animation.
     *		The equivalent of CSS attribute `animationTimingFunction`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    animation_timing_function(value) {
        if (value == null) { return this.element.style.animationTimingFunction; }
        this.element.style.animationTimingFunction = value;
        this.element.style.msAnimationTimingFunction = value;
        this.element.style.webkitAnimationTimingFunction = value;
        this.element.style.MozAnimationTimingFunction = value;
        this.element.style.OAnimationTimingFunction = value;
        return this;
    }

    // Specifies preferred aspect ratio of an element.
    /*	@docs: {
     *	@title: Aspect ratio
     *	@description: 
     *		Specifies preferred aspect ratio of an element.
     *		The equivalent of CSS attribute `aspectRatio`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    aspect_ratio(value) {
        if (value == null) { return this.element.style.aspectRatio; }
        this.element.style.aspectRatio = value;
        return this;
    }

    // Defines a graphical effect to the area behind an element.
    /*	@docs: {
     *	@title: Backdrop filter
     *	@description: 
     *		Defines a graphical effect to the area behind an element.
     *		The equivalent of CSS attribute `backdropFilter`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    backdrop_filter(value) {
        if (value == null) { return this.element.style.backdropFilter; }
        this.element.style.backdropFilter = value;
        return this;
    }

    // Defines whether or not the back face of an element should be visible when facing the user.
    /*	@docs: {
     *	@title: Backface visibility
     *	@description: 
     *		Defines whether or not the back face of an element should be visible when facing the user.
     *		The equivalent of CSS attribute `backfaceVisibility`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    backface_visibility(value) {
        if (value == null) { return this.element.style.backfaceVisibility; }
        this.element.style.backfaceVisibility = value;
        this.element.style.msBackfaceVisibility = value;
        this.element.style.webkitBackfaceVisibility = value;
        this.element.style.MozBackfaceVisibility = value;
        this.element.style.OBackfaceVisibility = value;
        return this;
    }

    // A shorthand property for all the background-* properties.
    /*	@docs: {
     *	@title: Background
     *	@description: 
     *		A shorthand property for all the background-* properties.
     *		The equivalent of CSS attribute `background`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background(value) {
        if (value == null) { return this.element.style.background; }
        this.element.style.background = value;
        return this;
    }

    // Sets whether a background image scrolls with the rest of the page, or is fixed.
    /*	@docs: {
     *	@title: Background attachment
     *	@description: 
     *		Sets whether a background image scrolls with the rest of the page, or is fixed.
     *		The equivalent of CSS attribute `backgroundAttachment`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_attachment(value) {
        if (value == null) { return this.element.style.backgroundAttachment; }
        this.element.style.backgroundAttachment = value;
        return this;
    }

    // Specifies the blending mode of each background layer (color/image).
    /*	@docs: {
     *	@title: Background blend mode
     *	@description: 
     *		Specifies the blending mode of each background layer (color/image).
     *		The equivalent of CSS attribute `backgroundBlendMode`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_blend_mode(value) {
        if (value == null) { return this.element.style.backgroundBlendMode; }
        this.element.style.backgroundBlendMode = value;
        return this;
    }

    // Defines how far the background (color or image) should extend within an element.
    /*	@docs: {
     *	@title: Background clip
     *	@description: 
     *		Defines how far the background (color or image) should extend within an element.
     *		The equivalent of CSS attribute `backgroundClip`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_clip(value) {
        if (value == null) { return this.element.style.backgroundClip; }
        this.element.style.backgroundClip = value;
        this.element.style.msBackgroundClip = value;
        this.element.style.webkitBackgroundClip = value;
        this.element.style.MozBackgroundClip = value;
        this.element.style.OBackgroundClip = value;
        return this;
    }

    // Specifies the background color of an element.
    /*	@docs: {
     *	@title: Background color
     *	@description: 
     *		Specifies the background color of an element.
     *		The equivalent of CSS attribute `backgroundColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_color(value) {
        if (value == null) { return this.element.style.backgroundColor; }
        this.element.style.backgroundColor = value;
        return this;
    }

    // Specifies one or more background images for an element.
    /*	@docs: {
     *	@title: Background image
     *	@description: 
     *		Specifies one or more background images for an element.
     *		The equivalent of CSS attribute `backgroundImage`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_image(value) {
        if (value == null) { return this.element.style.backgroundImage; }
        this.element.style.backgroundImage = value;
        return this;
    }

    // Specifies the origin position of a background image.
    /*	@docs: {
     *	@title: Background origin
     *	@description: 
     *		Specifies the origin position of a background image.
     *		The equivalent of CSS attribute `backgroundOrigin`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_origin(value) {
        if (value == null) { return this.element.style.backgroundOrigin; }
        this.element.style.backgroundOrigin = value;
        this.element.style.msBackgroundOrigin = value;
        this.element.style.webkitBackgroundOrigin = value;
        this.element.style.MozBackgroundOrigin = value;
        this.element.style.OBackgroundOrigin = value;
        return this;
    }

    // Specifies the position of a background image.
    /*	@docs: {
     *	@title: Background position
     *	@description: 
     *		Specifies the position of a background image.
     *		The equivalent of CSS attribute `backgroundPosition`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_position(value) {
        if (value == null) { return this.element.style.backgroundPosition; }
        this.element.style.backgroundPosition = value;
        return this;
    }

    // Specifies the position of a background image on x-axis.
    /*	@docs: {
     *	@title: Background position x
     *	@description: 
     *		Specifies the position of a background image on x-axis.
     *		The equivalent of CSS attribute `backgroundPositionX`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_position_x(value) {
        if (value == null) { return this.element.style.backgroundPositionX; }
        this.element.style.backgroundPositionX = value;
        return this;
    }

    // Specifies the position of a background image on y-axis.
    /*	@docs: {
     *	@title: Background position y
     *	@description: 
     *		Specifies the position of a background image on y-axis.
     *		The equivalent of CSS attribute `backgroundPositionY`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_position_y(value) {
        if (value == null) { return this.element.style.backgroundPositionY; }
        this.element.style.backgroundPositionY = value;
        return this;
    }

    // Sets if/how a background image will be repeated.
    /*	@docs: {
     *	@title: Background repeat
     *	@description: 
     *		Sets if/how a background image will be repeated.
     *		The equivalent of CSS attribute `backgroundRepeat`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_repeat(value) {
        if (value == null) { return this.element.style.backgroundRepeat; }
        this.element.style.backgroundRepeat = value;
        return this;
    }

    // Specifies the size of the background images.
    /*	@docs: {
     *	@title: Background size
     *	@description: 
     *		Specifies the size of the background images.
     *		The equivalent of CSS attribute `backgroundSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    background_size(value) {
        if (value == null) { return this.element.style.backgroundSize; }
        this.element.style.backgroundSize = this.pad_numeric(value);
        this.element.style.msBackgroundSize = this.pad_numeric(value);
        this.element.style.webkitBackgroundSize = this.pad_numeric(value);
        this.element.style.MozBackgroundSize = this.pad_numeric(value);
        this.element.style.OBackgroundSize = this.pad_numeric(value);
        return this;
    }

    // Specifies the size of an element in block direction.
    /*	@docs: {
     *	@title: Block size
     *	@description: 
     *		Specifies the size of an element in block direction.
     *		The equivalent of CSS attribute `blockSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    block_size(value) {
        if (value == null) { return this.element.style.blockSize; }
        this.element.style.blockSize = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for border-width, border-style and border-color.
    // border(value) {
    //     if (value == null) { return this.element.style.border; }
    //     this.element.style.border = value;
    //     return this;
    // }

    // A shorthand property for border-block-width, border-block-style and border-block-color.
    /*	@docs: {
     *	@title: Border block
     *	@description: 
     *		A shorthand property for border-block-width, border-block-style and border-block-color.
     *		The equivalent of CSS attribute `borderBlock`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block(value) {
        if (value == null) { return this.element.style.borderBlock; }
        this.element.style.borderBlock = value;
        return this;
    }

    // Sets the color of the borders at start and end in the block direction.
    /*	@docs: {
     *	@title: Border block color
     *	@description: 
     *		Sets the color of the borders at start and end in the block direction.
     *		The equivalent of CSS attribute `borderBlockColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block_color(value) {
        if (value == null) { return this.element.style.borderBlockColor; }
        this.element.style.borderBlockColor = value;
        return this;
    }

    // Sets the color of the border at the end in the block direction.
    /*	@docs: {
     *	@title: Border block end color
     *	@description: 
     *		Sets the color of the border at the end in the block direction.
     *		The equivalent of CSS attribute `borderBlockEndColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block_end_color(value) {
        if (value == null) { return this.element.style.borderBlockEndColor; }
        this.element.style.borderBlockEndColor = value;
        return this;
    }

    // Sets the style of the border at the end in the block direction.
    /*	@docs: {
     *	@title: Border block end style
     *	@description: 
     *		Sets the style of the border at the end in the block direction.
     *		The equivalent of CSS attribute `borderBlockEndStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block_end_style(value) {
        if (value == null) { return this.element.style.borderBlockEndStyle; }
        this.element.style.borderBlockEndStyle = value;
        return this;
    }

    // Sets the width of the border at the end in the block direction.
    /*	@docs: {
     *	@title: Border block end width
     *	@description: 
     *		Sets the width of the border at the end in the block direction.
     *		The equivalent of CSS attribute `borderBlockEndWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block_end_width(value) {
        if (value == null) { return this.element.style.borderBlockEndWidth; }
        this.element.style.borderBlockEndWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the border at the start in the block direction.
    /*	@docs: {
     *	@title: Border block start color
     *	@description: 
     *		Sets the color of the border at the start in the block direction.
     *		The equivalent of CSS attribute `borderBlockStartColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block_start_color(value) {
        if (value == null) { return this.element.style.borderBlockStartColor; }
        this.element.style.borderBlockStartColor = value;
        return this;
    }

    // Sets the style of the border at the start in the block direction.
    /*	@docs: {
     *	@title: Border block start style
     *	@description: 
     *		Sets the style of the border at the start in the block direction.
     *		The equivalent of CSS attribute `borderBlockStartStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block_start_style(value) {
        if (value == null) { return this.element.style.borderBlockStartStyle; }
        this.element.style.borderBlockStartStyle = value;
        return this;
    }

    // Sets the width of the border at the start in the block direction.
    /*	@docs: {
     *	@title: Border block start width
     *	@description: 
     *		Sets the width of the border at the start in the block direction.
     *		The equivalent of CSS attribute `borderBlockStartWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block_start_width(value) {
        if (value == null) { return this.element.style.borderBlockStartWidth; }
        this.element.style.borderBlockStartWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the style of the borders at start and end in the block direction.
    /*	@docs: {
     *	@title: Border block style
     *	@description: 
     *		Sets the style of the borders at start and end in the block direction.
     *		The equivalent of CSS attribute `borderBlockStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block_style(value) {
        if (value == null) { return this.element.style.borderBlockStyle; }
        this.element.style.borderBlockStyle = value;
        return this;
    }

    // Sets the width of the borders at start and end in the block direction.
    /*	@docs: {
     *	@title: Border block width
     *	@description: 
     *		Sets the width of the borders at start and end in the block direction.
     *		The equivalent of CSS attribute `borderBlockWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_block_width(value) {
        if (value == null) { return this.element.style.borderBlockWidth; }
        this.element.style.borderBlockWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for border-bottom-width, border-bottom-style and border-bottom-color.
    /*	@docs: {
     *	@title: Border bottom
     *	@description: 
     *		A shorthand property for border-bottom-width, border-bottom-style and border-bottom-color.
     *		The equivalent of CSS attribute `borderBottom`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_bottom(value) {
        if (value == null) { return this.element.style.borderBottom; }
        this.element.style.borderBottom = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the bottom border.
    /*	@docs: {
     *	@title: Border bottom color
     *	@description: 
     *		Sets the color of the bottom border.
     *		The equivalent of CSS attribute `borderBottomColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_bottom_color(value) {
        if (value == null) { return this.element.style.borderBottomColor; }
        this.element.style.borderBottomColor = value;
        return this;
    }

    // Defines the radius of the border of the bottom-left corner.
    /*	@docs: {
     *	@title: Border bottom left radius
     *	@description: 
     *		Defines the radius of the border of the bottom-left corner.
     *		The equivalent of CSS attribute `borderBottomLeftRadius`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_bottom_left_radius(value) {
        if (value == null) { return this.element.style.borderBottomLeftRadius; }
        this.element.style.borderBottomLeftRadius = this.pad_numeric(value);
        return this;
    }

    // Defines the radius of the border of the bottom-right corner.
    /*	@docs: {
     *	@title: Border bottom right radius
     *	@description: 
     *		Defines the radius of the border of the bottom-right corner.
     *		The equivalent of CSS attribute `borderBottomRightRadius`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_bottom_right_radius(value) {
        if (value == null) { return this.element.style.borderBottomRightRadius; }
        this.element.style.borderBottomRightRadius = this.pad_numeric(value);
        return this;
    }

    // Sets the style of the bottom border.
    /*	@docs: {
     *	@title: Border bottom style
     *	@description: 
     *		Sets the style of the bottom border.
     *		The equivalent of CSS attribute `borderBottomStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_bottom_style(value) {
        if (value == null) { return this.element.style.borderBottomStyle; }
        this.element.style.borderBottomStyle = value;
        return this;
    }

    // Sets the width of the bottom border.
    /*	@docs: {
     *	@title: Border bottom width
     *	@description: 
     *		Sets the width of the bottom border.
     *		The equivalent of CSS attribute `borderBottomWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_bottom_width(value) {
        if (value == null) { return this.element.style.borderBottomWidth; }
        this.element.style.borderBottomWidth = this.pad_numeric(value);
        return this;
    }

    // Sets whether table borders should collapse into a single border or be separated.
    /*	@docs: {
     *	@title: Border collapse
     *	@description: 
     *		Sets whether table borders should collapse into a single border or be separated.
     *		The equivalent of CSS attribute `borderCollapse`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_collapse(value) {
        if (value == null) { return this.element.style.borderCollapse; }
        this.element.style.borderCollapse = value;
        return this;
    }

    // Sets the color of the four borders.
    /*	@docs: {
     *	@title: Border color
     *	@description: 
     *		Sets the color of the four borders.
     *		The equivalent of CSS attribute `borderColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_color(value) {
        if (value == null) { return this.element.style.borderColor; }
        this.element.style.borderColor = value;
        return this;
    }

    // A shorthand property for all the border-image-* properties.
    /*	@docs: {
     *	@title: Border image
     *	@description: 
     *		A shorthand property for all the border-image-* properties.
     *		The equivalent of CSS attribute `borderImage`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_image(value) {
        if (value == null) { return this.element.style.borderImage; }
        this.element.style.borderImage = value;
        this.element.style.msBorderImage = value;
        this.element.style.webkitBorderImage = value;
        this.element.style.MozBorderImage = value;
        this.element.style.OBorderImage = value;
        return this;
    }

    // Specifies the amount by which the border image area extends beyond the border box.
    /*	@docs: {
     *	@title: Border image outset
     *	@description: 
     *		Specifies the amount by which the border image area extends beyond the border box.
     *		The equivalent of CSS attribute `borderImageOutset`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_image_outset(value) {
        if (value == null) { return this.element.style.borderImageOutset; }
        this.element.style.borderImageOutset = value;
        return this;
    }

    // Specifies whether the border image should be repeated, rounded or stretched.
    /*	@docs: {
     *	@title: Border image repeat
     *	@description: 
     *		Specifies whether the border image should be repeated, rounded or stretched.
     *		The equivalent of CSS attribute `borderImageRepeat`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_image_repeat(value) {
        if (value == null) { return this.element.style.borderImageRepeat; }
        this.element.style.borderImageRepeat = value;
        return this;
    }

    // Specifies how to slice the border image.
    /*	@docs: {
     *	@title: Border image slice
     *	@description: 
     *		Specifies how to slice the border image.
     *		The equivalent of CSS attribute `borderImageSlice`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_image_slice(value) {
        if (value == null) { return this.element.style.borderImageSlice; }
        this.element.style.borderImageSlice = value;
        return this;
    }

    // Specifies the path to the image to be used as a border.
    /*	@docs: {
     *	@title: Border image source
     *	@description: 
     *		Specifies the path to the image to be used as a border.
     *		The equivalent of CSS attribute `borderImageSource`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_image_source(value) {
        if (value == null) { return this.element.style.borderImageSource; }
        this.element.style.borderImageSource = value;
        return this;
    }

    // Specifies the width of the border image.
    /*	@docs: {
     *	@title: Border image width
     *	@description: 
     *		Specifies the width of the border image.
     *		The equivalent of CSS attribute `borderImageWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_image_width(value) {
        if (value == null) { return this.element.style.borderImageWidth; }
        this.element.style.borderImageWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for border-inline-width, border-inline-style and border-inline-color.
    /*	@docs: {
     *	@title: Border inline
     *	@description: 
     *		A shorthand property for border-inline-width, border-inline-style and border-inline-color.
     *		The equivalent of CSS attribute `borderInline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline(value) {
        if (value == null) { return this.element.style.borderInline; }
        this.element.style.borderInline = value;
        return this;
    }

    // Sets the color of the borders at start and end in the inline direction.
    /*	@docs: {
     *	@title: Border inline color
     *	@description: 
     *		Sets the color of the borders at start and end in the inline direction.
     *		The equivalent of CSS attribute `borderInlineColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline_color(value) {
        if (value == null) { return this.element.style.borderInlineColor; }
        this.element.style.borderInlineColor = value;
        return this;
    }

    // Sets the color of the border at the end in the inline direction.
    /*	@docs: {
     *	@title: Border inline end color
     *	@description: 
     *		Sets the color of the border at the end in the inline direction.
     *		The equivalent of CSS attribute `borderInlineEndColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline_end_color(value) {
        if (value == null) { return this.element.style.borderInlineEndColor; }
        this.element.style.borderInlineEndColor = value;
        return this;
    }

    // Sets the style of the border at the end in the inline direction.
    /*	@docs: {
     *	@title: Border inline end style
     *	@description: 
     *		Sets the style of the border at the end in the inline direction.
     *		The equivalent of CSS attribute `borderInlineEndStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline_end_style(value) {
        if (value == null) { return this.element.style.borderInlineEndStyle; }
        this.element.style.borderInlineEndStyle = value;
        return this;
    }

    // Sets the width of the border at the end in the inline direction.
    /*	@docs: {
     *	@title: Border inline end width
     *	@description: 
     *		Sets the width of the border at the end in the inline direction.
     *		The equivalent of CSS attribute `borderInlineEndWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline_end_width(value) {
        if (value == null) { return this.element.style.borderInlineEndWidth; }
        this.element.style.borderInlineEndWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the border at the start in the inline direction.
    /*	@docs: {
     *	@title: Border inline start color
     *	@description: 
     *		Sets the color of the border at the start in the inline direction.
     *		The equivalent of CSS attribute `borderInlineStartColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline_start_color(value) {
        if (value == null) { return this.element.style.borderInlineStartColor; }
        this.element.style.borderInlineStartColor = value;
        return this;
    }

    // Sets the style of the border at the start in the inline direction.
    /*	@docs: {
     *	@title: Border inline start style
     *	@description: 
     *		Sets the style of the border at the start in the inline direction.
     *		The equivalent of CSS attribute `borderInlineStartStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline_start_style(value) {
        if (value == null) { return this.element.style.borderInlineStartStyle; }
        this.element.style.borderInlineStartStyle = value;
        return this;
    }

    // Sets the width of the border at the start in the inline direction.
    /*	@docs: {
     *	@title: Border inline start width
     *	@description: 
     *		Sets the width of the border at the start in the inline direction.
     *		The equivalent of CSS attribute `borderInlineStartWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline_start_width(value) {
        if (value == null) { return this.element.style.borderInlineStartWidth; }
        this.element.style.borderInlineStartWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the style of the borders at start and end in the inline direction.
    /*	@docs: {
     *	@title: Border inline style
     *	@description: 
     *		Sets the style of the borders at start and end in the inline direction.
     *		The equivalent of CSS attribute `borderInlineStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline_style(value) {
        if (value == null) { return this.element.style.borderInlineStyle; }
        this.element.style.borderInlineStyle = value;
        return this;
    }

    // Sets the width of the borders at start and end in the inline direction.
    /*	@docs: {
     *	@title: Border inline width
     *	@description: 
     *		Sets the width of the borders at start and end in the inline direction.
     *		The equivalent of CSS attribute `borderInlineWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_inline_width(value) {
        if (value == null) { return this.element.style.borderInlineWidth; }
        this.element.style.borderInlineWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for all the border-left-* properties.
    /*	@docs: {
     *	@title: Border left
     *	@description: 
     *		A shorthand property for all the border-left-* properties.
     *		The equivalent of CSS attribute `borderLeft`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_left(value) {
        if (value == null) { return this.element.style.borderLeft; }
        this.element.style.borderLeft = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the left border.
    /*	@docs: {
     *	@title: Border left color
     *	@description: 
     *		Sets the color of the left border.
     *		The equivalent of CSS attribute `borderLeftColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_left_color(value) {
        if (value == null) { return this.element.style.borderLeftColor; }
        this.element.style.borderLeftColor = value;
        return this;
    }

    // Sets the style of the left border.
    /*	@docs: {
     *	@title: Border left style
     *	@description: 
     *		Sets the style of the left border.
     *		The equivalent of CSS attribute `borderLeftStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_left_style(value) {
        if (value == null) { return this.element.style.borderLeftStyle; }
        this.element.style.borderLeftStyle = value;
        return this;
    }

    // Sets the width of the left border.
    /*	@docs: {
     *	@title: Border left width
     *	@description: 
     *		Sets the width of the left border.
     *		The equivalent of CSS attribute `borderLeftWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_left_width(value) {
        if (value == null) { return this.element.style.borderLeftWidth; }
        this.element.style.borderLeftWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for the four border-*-radius properties.
    /*	@docs: {
     *	@title: Border radius
     *	@description: 
     *		A shorthand property for the four border-*-radius properties.
     *		The equivalent of CSS attribute `borderRadius`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_radius(value) {
        if (value == null) { return this.element.style.borderRadius; }
        this.element.style.borderRadius = this.pad_numeric(value);
        this.element.style.msBorderRadius = this.pad_numeric(value);
        this.element.style.webkitBorderRadius = this.pad_numeric(value);
        this.element.style.MozBorderRadius = this.pad_numeric(value);
        this.element.style.OBorderRadius = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for all the border-right-* properties.
    /*	@docs: {
     *	@title: Border right
     *	@description: 
     *		A shorthand property for all the border-right-* properties.
     *		The equivalent of CSS attribute `borderRight`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_right(value) {
        if (value == null) { return this.element.style.borderRight; }
        this.element.style.borderRight = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the right border.
    /*	@docs: {
     *	@title: Border right color
     *	@description: 
     *		Sets the color of the right border.
     *		The equivalent of CSS attribute `borderRightColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_right_color(value) {
        if (value == null) { return this.element.style.borderRightColor; }
        this.element.style.borderRightColor = value;
        return this;
    }

    // Sets the style of the right border.
    /*	@docs: {
     *	@title: Border right style
     *	@description: 
     *		Sets the style of the right border.
     *		The equivalent of CSS attribute `borderRightStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_right_style(value) {
        if (value == null) { return this.element.style.borderRightStyle; }
        this.element.style.borderRightStyle = value;
        return this;
    }

    // Sets the width of the right border.
    /*	@docs: {
     *	@title: Border right width
     *	@description: 
     *		Sets the width of the right border.
     *		The equivalent of CSS attribute `borderRightWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_right_width(value) {
        if (value == null) { return this.element.style.borderRightWidth; }
        this.element.style.borderRightWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the distance between the borders of adjacent cells.
    /*	@docs: {
     *	@title: Border spacing
     *	@description: 
     *		Sets the distance between the borders of adjacent cells.
     *		The equivalent of CSS attribute `borderSpacing`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_spacing(value) {
        if (value == null) { return this.element.style.borderSpacing; }
        this.element.style.borderSpacing = value;
        return this;
    }

    // Sets the style of the four borders.
    /*	@docs: {
     *	@title: Border style
     *	@description: 
     *		Sets the style of the four borders.
     *		The equivalent of CSS attribute `borderStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_style(value) {
        if (value == null) { return this.element.style.borderStyle; }
        this.element.style.borderStyle = value;
        return this;
    }

    // A shorthand property for border-top-width, border-top-style and border-top-color.
    /*	@docs: {
     *	@title: Border top
     *	@description: 
     *		A shorthand property for border-top-width, border-top-style and border-top-color.
     *		The equivalent of CSS attribute `borderTop`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_top(value) {
        if (value == null) { return this.element.style.borderTop; }
        this.element.style.borderTop = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the top border.
    /*	@docs: {
     *	@title: Border top color
     *	@description: 
     *		Sets the color of the top border.
     *		The equivalent of CSS attribute `borderTopColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_top_color(value) {
        if (value == null) { return this.element.style.borderTopColor; }
        this.element.style.borderTopColor = value;
        return this;
    }

    // Defines the radius of the border of the top-left corner.
    /*	@docs: {
     *	@title: Border top left radius
     *	@description: 
     *		Defines the radius of the border of the top-left corner.
     *		The equivalent of CSS attribute `borderTopLeftRadius`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_top_left_radius(value) {
        if (value == null) { return this.element.style.borderTopLeftRadius; }
        this.element.style.borderTopLeftRadius = this.pad_numeric(value);
        return this;
    }

    // Defines the radius of the border of the top-right corner.
    /*	@docs: {
     *	@title: Border top right radius
     *	@description: 
     *		Defines the radius of the border of the top-right corner.
     *		The equivalent of CSS attribute `borderTopRightRadius`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_top_right_radius(value) {
        if (value == null) { return this.element.style.borderTopRightRadius; }
        this.element.style.borderTopRightRadius = this.pad_numeric(value);
        return this;
    }

    // Sets the style of the top border.
    /*	@docs: {
     *	@title: Border top style
     *	@description: 
     *		Sets the style of the top border.
     *		The equivalent of CSS attribute `borderTopStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_top_style(value) {
        if (value == null) { return this.element.style.borderTopStyle; }
        this.element.style.borderTopStyle = value;
        return this;
    }

    // Sets the width of the top border.
    /*	@docs: {
     *	@title: Border top width
     *	@description: 
     *		Sets the width of the top border.
     *		The equivalent of CSS attribute `borderTopWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_top_width(value) {
        if (value == null) { return this.element.style.borderTopWidth; }
        this.element.style.borderTopWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the width of the four borders.
    /*	@docs: {
     *	@title: Border width
     *	@description: 
     *		Sets the width of the four borders.
     *		The equivalent of CSS attribute `borderWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    border_width(value) {
        if (value == null) { return this.element.style.borderWidth; }
        this.element.style.borderWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the elements position, from the bottom of its parent element.
    /*	@docs: {
     *	@title: Bottom
     *	@description: 
     *		Sets the elements position, from the bottom of its parent element.
     *		The equivalent of CSS attribute `bottom`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    bottom(value) {
        if (value == null) { return this.element.style.bottom; }
        this.element.style.bottom = this.pad_numeric(value);
        return this;
    }

    // Sets the behavior of the background and border of an element at page-break, or, for in-line elements, at line-break.
    /*	@docs: {
     *	@title: Box decoration break
     *	@description: 
     *		Sets the behavior of the background and border of an element at page-break, or, for in-line elements, at line-break.
     *		The equivalent of CSS attribute `boxDecorationBreak`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    box_decoration_break(value) {
        if (value == null) { return this.element.style.boxDecorationBreak; }
        this.element.style.boxDecorationBreak = value;
        return this;
    }

    // The box-reflect property is used to create a reflection of an element.
    /*	@docs: {
     *	@title: Box reflect
     *	@description: 
     *		The box-reflect property is used to create a reflection of an element.
     *		The equivalent of CSS attribute `boxReflect`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    box_reflect(value) {
        if (value == null) { return this.element.style.boxReflect; }
        this.element.style.boxReflect = value;
        return this;
    }

    // Attaches one or more shadows to an element.
    /*	@docs: {
     *	@title: Box shadow
     *	@description: 
     *		Attaches one or more shadows to an element.
     *		The equivalent of CSS attribute `boxShadow`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    box_shadow(value) {
        if (value == null) { return this.element.style.boxShadow; }
        this.element.style.boxShadow = value;
        this.element.style.msBoxShadow = value;
        this.element.style.webkitBoxShadow = value;
        this.element.style.MozBoxShadow = value;
        this.element.style.OBoxShadow = value;
        return this;
    }

    // Defines how the width and height of an element are calculated: should they include padding and borders, or not.
    /*	@docs: {
     *	@title: Box sizing
     *	@description: 
     *		Defines how the width and height of an element are calculated: should they include padding and borders, or not.
     *		The equivalent of CSS attribute `boxSizing`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    box_sizing(value) {
        if (value == null) { return this.element.style.boxSizing; }
        this.element.style.boxSizing = value;
        this.element.style.msBoxSizing = value;
        this.element.style.webkitBoxSizing = value;
        this.element.style.MozBoxSizing = value;
        this.element.style.OBoxSizing = value;
        return this;
    }

    // Specifies whether or not a page-, column-, or region-break should occur after the specified element.
    /*	@docs: {
     *	@title: Break after
     *	@description: 
     *		Specifies whether or not a page-, column-, or region-break should occur after the specified element.
     *		The equivalent of CSS attribute `breakAfter`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    break_after(value) {
        if (value == null) { return this.element.style.breakAfter; }
        this.element.style.breakAfter = value;
        return this;
    }

    // Specifies whether or not a page-, column-, or region-break should occur before the specified element.
    /*	@docs: {
     *	@title: Break before
     *	@description: 
     *		Specifies whether or not a page-, column-, or region-break should occur before the specified element.
     *		The equivalent of CSS attribute `breakBefore`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    break_before(value) {
        if (value == null) { return this.element.style.breakBefore; }
        this.element.style.breakBefore = value;
        return this;
    }

    // Specifies whether or not a page-, column-, or region-break should occur inside the specified element.
    /*	@docs: {
     *	@title: Break inside
     *	@description: 
     *		Specifies whether or not a page-, column-, or region-break should occur inside the specified element.
     *		The equivalent of CSS attribute `breakInside`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    break_inside(value) {
        if (value == null) { return this.element.style.breakInside; }
        this.element.style.breakInside = value;
        return this;
    }

    // Specifies the placement of a table caption.
    /*	@docs: {
     *	@title: Caption side
     *	@description: 
     *		Specifies the placement of a table caption.
     *		The equivalent of CSS attribute `captionSide`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    caption_side(value) {
        if (value == null) { return this.element.style.captionSide; }
        this.element.style.captionSide = value;
        return this;
    }

    // Specifies the color of the cursor (caret) in inputs, textareas, or any element that is editable.
    /*	@docs: {
     *	@title: Caret color
     *	@description: 
     *		Specifies the color of the cursor (caret) in inputs, textareas, or any element that is editable.
     *		The equivalent of CSS attribute `caretColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    caret_color(value) {
        if (value == null) { return this.element.style.caretColor; }
        this.element.style.caretColor = value;
        return this;
    }

    // Specifies what should happen with the element that is next to a floating element.
    /*	@docs: {
     *	@title: Clear
     *	@description: 
     *		Specifies what should happen with the element that is next to a floating element.
     *		The equivalent of CSS attribute `clear`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    clear(value) {
        if (value == null) { return this.element.style.clear; }
        this.element.style.clear = value;
        return this;
    }

    // Clips an absolutely positioned element.
    /*	@docs: {
     *	@title: Clip
     *	@description: 
     *		Clips an absolutely positioned element.
     *		The equivalent of CSS attribute `clip`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    clip(value) {
        if (value == null) { return this.element.style.clip; }
        this.element.style.clip = value;
        return this;
    }

    // Sets the color of text.
    // color(value) {
    //     if (value == null) { return this.element.style.color; }
    //     this.element.style.color = value;
    //     return this;
    // }

    // Specifies the number of columns an element should be divided into.
    /*	@docs: {
     *	@title: Column count
     *	@description: 
     *		Specifies the number of columns an element should be divided into.
     *		The equivalent of CSS attribute `columnCount`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    column_count(value) {
        if (value == null) { return this.element.style.columnCount; }
        this.element.style.columnCount = value;
        this.element.style.msColumnCount = value;
        this.element.style.webkitColumnCount = value;
        this.element.style.MozColumnCount = value;
        this.element.style.OColumnCount = value;
        return this;
    }

    // Specifies how to fill columns, balanced or not.
    /*	@docs: {
     *	@title: Column fill
     *	@description: 
     *		Specifies how to fill columns, balanced or not.
     *		The equivalent of CSS attribute `columnFill`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    column_fill(value) {
        if (value == null) { return this.element.style.columnFill; }
        this.element.style.columnFill = value;
        return this;
    }

    // Specifies the gap between the columns.
    /*	@docs: {
     *	@title: Column gap
     *	@description: 
     *		Specifies the gap between the columns.
     *		The equivalent of CSS attribute `columnGap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    column_gap(value) {
        if (value == null) { return this.element.style.columnGap; }
        this.element.style.columnGap = value;
        this.element.style.msColumnGap = value;
        this.element.style.webkitColumnGap = value;
        this.element.style.MozColumnGap = value;
        this.element.style.OColumnGap = value;
        return this;
    }

    // A shorthand property for all the column-rule-* properties.
    /*	@docs: {
     *	@title: Column rule
     *	@description: 
     *		A shorthand property for all the column-rule-* properties.
     *		The equivalent of CSS attribute `columnRule`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    column_rule(value) {
        if (value == null) { return this.element.style.columnRule; }
        this.element.style.columnRule = value;
        this.element.style.msColumnRule = value;
        this.element.style.webkitColumnRule = value;
        this.element.style.MozColumnRule = value;
        this.element.style.OColumnRule = value;
        return this;
    }

    // Specifies the color of the rule between columns.
    /*	@docs: {
     *	@title: Column rule color
     *	@description: 
     *		Specifies the color of the rule between columns.
     *		The equivalent of CSS attribute `columnRuleColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    column_rule_color(value) {
        if (value == null) { return this.element.style.columnRuleColor; }
        this.element.style.columnRuleColor = value;
        this.element.style.msColumnRuleColor = value;
        this.element.style.webkitColumnRuleColor = value;
        this.element.style.MozColumnRuleColor = value;
        this.element.style.OColumnRuleColor = value;
        return this;
    }

    // Specifies the style of the rule between columns.
    /*	@docs: {
     *	@title: Column rule style
     *	@description: 
     *		Specifies the style of the rule between columns.
     *		The equivalent of CSS attribute `columnRuleStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    column_rule_style(value) {
        if (value == null) { return this.element.style.columnRuleStyle; }
        this.element.style.columnRuleStyle = value;
        this.element.style.msColumnRuleStyle = value;
        this.element.style.webkitColumnRuleStyle = value;
        this.element.style.MozColumnRuleStyle = value;
        this.element.style.OColumnRuleStyle = value;
        return this;
    }

    // Specifies the width of the rule between columns.
    /*	@docs: {
     *	@title: Column rule width
     *	@description: 
     *		Specifies the width of the rule between columns.
     *		The equivalent of CSS attribute `columnRuleWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    column_rule_width(value) {
        if (value == null) { return this.element.style.columnRuleWidth; }
        this.element.style.columnRuleWidth = this.pad_numeric(value);
        this.element.style.msColumnRuleWidth = this.pad_numeric(value);
        this.element.style.webkitColumnRuleWidth = this.pad_numeric(value);
        this.element.style.MozColumnRuleWidth = this.pad_numeric(value);
        this.element.style.OColumnRuleWidth = this.pad_numeric(value);
        return this;
    }

    // Specifies how many columns an element should span across.
    /*	@docs: {
     *	@title: Column span
     *	@description: 
     *		Specifies how many columns an element should span across.
     *		The equivalent of CSS attribute `columnSpan`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    column_span(value) {
        if (value == null) { return this.element.style.columnSpan; }
        this.element.style.columnSpan = value;
        return this;
    }

    // Specifies the column width.
    /*	@docs: {
     *	@title: Column width
     *	@description: 
     *		Specifies the column width.
     *		The equivalent of CSS attribute `columnWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    column_width(value) {
        if (value == null) { return this.element.style.columnWidth; }
        this.element.style.columnWidth = this.pad_numeric(value);
        this.element.style.msColumnWidth = this.pad_numeric(value);
        this.element.style.webkitColumnWidth = this.pad_numeric(value);
        this.element.style.MozColumnWidth = this.pad_numeric(value);
        this.element.style.OColumnWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for column-width and column-count.
    /*	@docs: {
     *	@title: Columns
     *	@description: 
     *		A shorthand property for column-width and column-count.
     *		The equivalent of CSS attribute `columns`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    columns(value) {
        if (value == null) { return this.element.style.columns; }
        this.element.style.columns = value;
        return this;
    }

    // Used with the :before and :after pseudo-elements, to insert generated content.
    /*	@docs: {
     *	@title: Content
     *	@description: 
     *		Used with the :before and :after pseudo-elements, to insert generated content.
     *		The equivalent of CSS attribute `content`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    content(value) {
        if (value == null) { return this.element.style.content; }
        this.element.style.content = value;
        return this;
    }

    // Increases or decreases the value of one or more CSS counters.
    /*	@docs: {
     *	@title: Counter increment
     *	@description: 
     *		Increases or decreases the value of one or more CSS counters.
     *		The equivalent of CSS attribute `counterIncrement`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    counter_increment(value) {
        if (value == null) { return this.element.style.counterIncrement; }
        this.element.style.counterIncrement = value;
        return this;
    }

    // Creates or resets one or more CSS counters.
    /*	@docs: {
     *	@title: Counter reset
     *	@description: 
     *		Creates or resets one or more CSS counters.
     *		The equivalent of CSS attribute `counterReset`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    counter_reset(value) {
        if (value == null) { return this.element.style.counterReset; }
        this.element.style.counterReset = value;
        return this;
    }

    // Specifies the mouse cursor to be displayed when pointing over an element.
    /*	@docs: {
     *	@title: Cursor
     *	@description: 
     *		Specifies the mouse cursor to be displayed when pointing over an element.
     *		The equivalent of CSS attribute `cursor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    cursor(value) {
        if (value == null) { return this.element.style.cursor; }
        this.element.style.cursor = value;
        return this;
    }

    // Specifies the text direction/writing direction.
    /*	@docs: {
     *	@title: Direction
     *	@description: 
     *		Specifies the text direction/writing direction.
     *		The equivalent of CSS attribute `direction`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    direction(value) {
        if (value == null) { return this.element.style.direction; }
        this.element.style.direction = value;
        return this;
    }

    // Specifies how a certain HTML element should be displayed.
    // display(value) {
    //     if (value == null) { return this.element.style.display; }
    //     this.element.style.display = value;
    //     return this;
    // }

    // Specifies whether or not to display borders and background on empty cells in a table.
    /*	@docs: {
     *	@title: Empty cells
     *	@description: 
     *		Specifies whether or not to display borders and background on empty cells in a table.
     *		The equivalent of CSS attribute `emptyCells`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    empty_cells(value) {
        if (value == null) { return this.element.style.emptyCells; }
        this.element.style.emptyCells = value;
        return this;
    }

    // Defines effects (e.g. blurring or color shifting) on an element before the element is displayed.
    /*	@docs: {
     *	@title: Filter
     *	@description: 
     *		Defines effects (e.g. blurring or color shifting) on an element before the element is displayed.
     *		The equivalent of CSS attribute `filter`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    filter(value) {
        if (value == null) { return this.element.style.filter; }
        this.element.style.filter = value;
        this.element.style.msFilter = value;
        this.element.style.webkitFilter = value;
        this.element.style.MozFilter = value;
        this.element.style.OFilter = value;
        return this;
    }

    // A shorthand property for the flex-grow, flex-shrink, and the flex-basis properties.
    /*	@docs: {
     *	@title: Flex
     *	@description: 
     *		A shorthand property for the flex-grow, flex-shrink, and the flex-basis properties.
     *		The equivalent of CSS attribute `flex`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    flex(value) {
        if (value == null) { return this.element.style.flex; }
        this.element.style.flex = value;
        this.element.style.msFlex = value;
        this.element.style.webkitFlex = value;
        this.element.style.MozFlex = value;
        this.element.style.OFlex = value;
        return this;
    }

    // Specifies the initial length of a flexible item.
    /*	@docs: {
     *	@title: Flex basis
     *	@description: 
     *		Specifies the initial length of a flexible item.
     *		The equivalent of CSS attribute `flexBasis`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    flex_basis(value) {
        if (value == null) { return this.element.style.flexBasis; }
        this.element.style.flexBasis = value;
        this.element.style.msFlexBasis = value;
        this.element.style.webkitFlexBasis = value;
        this.element.style.MozFlexBasis = value;
        this.element.style.OFlexBasis = value;
        return this;
    }

    // Specifies the direction of the flexible items.
    /*	@docs: {
     *	@title: Flex direction
     *	@description: 
     *		Specifies the direction of the flexible items.
     *		The equivalent of CSS attribute `flexDirection`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    flex_direction(value) {
        if (value == null) { return this.element.style.flexDirection; }
        this.element.style.flexDirection = value;
        this.element.style.msFlexDirection = value;
        this.element.style.webkitFlexDirection = value;
        this.element.style.MozFlexDirection = value;
        this.element.style.OFlexDirection = value;
        return this;
    }

    // A shorthand property for the flex-direction and the flex-wrap properties.
    /*	@docs: {
     *	@title: Flex flow
     *	@description: 
     *		A shorthand property for the flex-direction and the flex-wrap properties.
     *		The equivalent of CSS attribute `flexFlow`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    flex_flow(value) {
        if (value == null) { return this.element.style.flexFlow; }
        this.element.style.flexFlow = value;
        this.element.style.msFlexFlow = value;
        this.element.style.webkitFlexFlow = value;
        this.element.style.MozFlexFlow = value;
        this.element.style.OFlexFlow = value;
        return this;
    }

    // Specifies how much the item will grow relative to the rest.
    /*	@docs: {
     *	@title: Flex grow
     *	@description: 
     *		Specifies how much the item will grow relative to the rest.
     *		The equivalent of CSS attribute `flexGrow`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    flex_grow(value) {
        if (value == null) { return this.element.style.flexGrow; }
        this.element.style.flexGrow = value;
        this.element.style.msFlexGrow = value;
        this.element.style.webkitFlexGrow = value;
        this.element.style.MozFlexGrow = value;
        this.element.style.OFlexGrow = value;
        return this;
    }

    // Specifies how the item will shrink relative to the rest.
    /*	@docs: {
     *	@title: Flex shrink
     *	@description: 
     *		Specifies how the item will shrink relative to the rest.
     *		The equivalent of CSS attribute `flexShrink`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    flex_shrink(value) {
        if (value == null) { return this.element.style.flexShrink; }
        this.element.style.flexShrink = value;
        this.element.style.msFlexShrink = value;
        this.element.style.webkitFlexShrink = value;
        this.element.style.MozFlexShrink = value;
        this.element.style.OFlexShrink = value;
        return this;
    }

    // Specifies whether the flexible items should wrap or not.
    /*	@docs: {
     *	@title: Flex wrap
     *	@description: 
     *		Specifies whether the flexible items should wrap or not.
     *		The equivalent of CSS attribute `flexWrap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    flex_wrap(value) {
        if (value == null) { return this.element.style.flexWrap; }
        this.element.style.flexWrap = value;
        this.element.style.msFlexWrap = value;
        this.element.style.webkitFlexWrap = value;
        this.element.style.MozFlexWrap = value;
        this.element.style.OFlexWrap = value;
        return this;
    }

    // Specifies whether an element should float to the left, right, or not at all.
    /*	@docs: {
     *	@title: Float
     *	@description: 
     *		Specifies whether an element should float to the left, right, or not at all.
     *		The equivalent of CSS attribute `float`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    float(value) {
        if (value == null) { return this.element.style.float; }
        this.element.style.float = value;
        return this;
    }

    // A shorthand property for the font-style, font-variant, font-weight, font-size/line-height, and the font-family properties.
    /*	@docs: {
     *	@title: Font
     *	@description: 
     *		A shorthand property for the font-style, font-variant, font-weight, font-size/line-height, and the font-family properties.
     *		The equivalent of CSS attribute `font`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font(value) {
        if (value == null) { return this.element.style.font; }
        this.element.style.font = value;
        return this;
    }

    // Specifies the font family for text.
    /*	@docs: {
     *	@title: Font family
     *	@description: 
     *		Specifies the font family for text.
     *		The equivalent of CSS attribute `fontFamily`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_family(value) {
        if (value == null) { return this.element.style.fontFamily; }
        this.element.style.fontFamily = value;
        return this;
    }

    // Allows control over advanced typographic features in OpenType fonts.
    /*	@docs: {
     *	@title: Font feature settings
     *	@description: 
     *		Allows control over advanced typographic features in OpenType fonts.
     *		The equivalent of CSS attribute `fontFeatureSettings`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_feature_settings(value) {
        if (value == null) { return this.element.style.fontFeatureSettings; }
        this.element.style.fontFeatureSettings = value;
        return this;
    }

    // Controls the usage of the kerning information (how letters are spaced).
    /*	@docs: {
     *	@title: Font kerning
     *	@description: 
     *		Controls the usage of the kerning information (how letters are spaced).
     *		The equivalent of CSS attribute `fontKerning`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_kerning(value) {
        if (value == null) { return this.element.style.fontKerning; }
        this.element.style.fontKerning = value;
        return this;
    }

    // Controls the usage of language-specific glyphs in a typeface.
    /*	@docs: {
     *	@title: Font language override
     *	@description: 
     *		Controls the usage of language-specific glyphs in a typeface.
     *		The equivalent of CSS attribute `fontLanguageOverride`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_language_override(value) {
        if (value == null) { return this.element.style.fontLanguageOverride; }
        this.element.style.fontLanguageOverride = value;
        return this;
    }

    // Specifies the font size of text.
    /*	@docs: {
     *	@title: Font size
     *	@description: 
     *		Specifies the font size of text.
     *		The equivalent of CSS attribute `fontSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_size(value) {
        if (value == null) { return this.element.style.fontSize; }
        this.element.style.fontSize = this.pad_numeric(value);
        return this;
    }

    // Preserves the readability of text when font fallback occurs.
    /*	@docs: {
     *	@title: Font size adjust
     *	@description: 
     *		Preserves the readability of text when font fallback occurs.
     *		The equivalent of CSS attribute `fontSizeAdjust`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_size_adjust(value) {
        if (value == null) { return this.element.style.fontSizeAdjust; }
        this.element.style.fontSizeAdjust = value;
        return this;
    }

    // Selects a normal, condensed, or expanded face from a font family.
    /*	@docs: {
     *	@title: Font stretch
     *	@description: 
     *		Selects a normal, condensed, or expanded face from a font family.
     *		The equivalent of CSS attribute `fontStretch`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_stretch(value) {
        if (value == null) { return this.element.style.fontStretch; }
        this.element.style.fontStretch = value;
        return this;
    }

    // Specifies the font style for text.
    /*	@docs: {
     *	@title: Font style
     *	@description: 
     *		Specifies the font style for text.
     *		The equivalent of CSS attribute `fontStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_style(value) {
        if (value == null) { return this.element.style.fontStyle; }
        this.element.style.fontStyle = value;
        return this;
    }

    // Controls which missing typefaces (bold or italic) may be synthesized by the browser.
    /*	@docs: {
     *	@title: Font synthesis
     *	@description: 
     *		Controls which missing typefaces (bold or italic) may be synthesized by the browser.
     *		The equivalent of CSS attribute `fontSynthesis`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_synthesis(value) {
        if (value == null) { return this.element.style.fontSynthesis; }
        this.element.style.fontSynthesis = value;
        return this;
    }

    // Specifies whether or not a text should be displayed in a small-caps font.
    /*	@docs: {
     *	@title: Font variant
     *	@description: 
     *		Specifies whether or not a text should be displayed in a small-caps font.
     *		The equivalent of CSS attribute `fontVariant`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_variant(value) {
        if (value == null) { return this.element.style.fontVariant; }
        this.element.style.fontVariant = value;
        return this;
    }

    // Controls the usage of alternate glyphs associated to alternative names defined in @font-feature-values.
    /*	@docs: {
     *	@title: Font variant alternates
     *	@description: 
     *		Controls the usage of alternate glyphs associated to alternative names defined in @font-feature-values.
     *		The equivalent of CSS attribute `fontVariantAlternates`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_variant_alternates(value) {
        if (value == null) { return this.element.style.fontVariantAlternates; }
        this.element.style.fontVariantAlternates = value;
        return this;
    }

    // Controls the usage of alternate glyphs for capital letters.
    /*	@docs: {
     *	@title: Font variant caps
     *	@description: 
     *		Controls the usage of alternate glyphs for capital letters.
     *		The equivalent of CSS attribute `fontVariantCaps`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_variant_caps(value) {
        if (value == null) { return this.element.style.fontVariantCaps; }
        this.element.style.fontVariantCaps = value;
        return this;
    }

    // Controls the usage of alternate glyphs for East Asian scripts (e.g Japanese and Chinese).
    /*	@docs: {
     *	@title: Font variant east asian
     *	@description: 
     *		Controls the usage of alternate glyphs for East Asian scripts (e.g Japanese and Chinese).
     *		The equivalent of CSS attribute `fontVariantEastAsian`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_variant_east_asian(value) {
        if (value == null) { return this.element.style.fontVariantEastAsian; }
        this.element.style.fontVariantEastAsian = value;
        return this;
    }

    // Controls which ligatures and contextual forms are used in textual content of the elements it applies to.
    /*	@docs: {
     *	@title: Font variant ligatures
     *	@description: 
     *		Controls which ligatures and contextual forms are used in textual content of the elements it applies to.
     *		The equivalent of CSS attribute `fontVariantLigatures`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_variant_ligatures(value) {
        if (value == null) { return this.element.style.fontVariantLigatures; }
        this.element.style.fontVariantLigatures = value;
        return this;
    }

    // Controls the usage of alternate glyphs for numbers, fractions, and ordinal markers.
    /*	@docs: {
     *	@title: Font variant numeric
     *	@description: 
     *		Controls the usage of alternate glyphs for numbers, fractions, and ordinal markers.
     *		The equivalent of CSS attribute `fontVariantNumeric`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_variant_numeric(value) {
        if (value == null) { return this.element.style.fontVariantNumeric; }
        this.element.style.fontVariantNumeric = value;
        return this;
    }

    // Controls the usage of alternate glyphs of smaller size positioned as superscript or subscript regarding the baseline of the font.
    /*	@docs: {
     *	@title: Font variant position
     *	@description: 
     *		Controls the usage of alternate glyphs of smaller size positioned as superscript or subscript regarding the baseline of the font.
     *		The equivalent of CSS attribute `fontVariantPosition`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_variant_position(value) {
        if (value == null) { return this.element.style.fontVariantPosition; }
        this.element.style.fontVariantPosition = value;
        return this;
    }

    // Specifies the weight of a font.
    /*	@docs: {
     *	@title: Font weight
     *	@description: 
     *		Specifies the weight of a font.
     *		The equivalent of CSS attribute `fontWeight`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    font_weight(value) {
        if (value == null) { return this.element.style.fontWeight; }
        this.element.style.fontWeight = value;
        return this;
    }

    // A shorthand property for the row-gap and the column-gap properties.
    /*	@docs: {
     *	@title: Gap
     *	@description: 
     *		A shorthand property for the row-gap and the column-gap properties.
     *		The equivalent of CSS attribute `gap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    gap(value) {
        if (value == null) { return this.element.style.gap; }
        this.element.style.gap = value;
        return this;
    }

    // A shorthand property for the grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and the grid-auto-flow properties.
    /*	@docs: {
     *	@title: Grid
     *	@description: 
     *		A shorthand property for the grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and the grid-auto-flow properties.
     *		The equivalent of CSS attribute `grid`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid(value) {
        if (value == null) { return this.element.style.grid; }
        this.element.style.grid = value;
        return this;
    }

    // Either specifies a name for the grid item, or this property is a shorthand property for the grid-row-start, grid-column-start, grid-row-end, and grid-column-end properties.
    /*	@docs: {
     *	@title: Grid area
     *	@description: 
     *		Either specifies a name for the grid item, or this property is a shorthand property for the grid-row-start, grid-column-start, grid-row-end, and grid-column-end properties.
     *		The equivalent of CSS attribute `gridArea`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_area(value) {
        if (value == null) { return this.element.style.gridArea; }
        this.element.style.gridArea = value;
        return this;
    }

    // Specifies a default column size.
    /*	@docs: {
     *	@title: Grid auto columns
     *	@description: 
     *		Specifies a default column size.
     *		The equivalent of CSS attribute `gridAutoColumns`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_auto_columns(value) {
        if (value == null) { return this.element.style.gridAutoColumns; }
        this.element.style.gridAutoColumns = value;
        return this;
    }

    // Specifies how auto-placed items are inserted in the grid.
    /*	@docs: {
     *	@title: Grid auto flow
     *	@description: 
     *		Specifies how auto-placed items are inserted in the grid.
     *		The equivalent of CSS attribute `gridAutoFlow`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_auto_flow(value) {
        if (value == null) { return this.element.style.gridAutoFlow; }
        this.element.style.gridAutoFlow = value;
        return this;
    }

    // Specifies a default row size.
    /*	@docs: {
     *	@title: Grid auto rows
     *	@description: 
     *		Specifies a default row size.
     *		The equivalent of CSS attribute `gridAutoRows`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_auto_rows(value) {
        if (value == null) { return this.element.style.gridAutoRows; }
        this.element.style.gridAutoRows = value;
        return this;
    }

    // A shorthand property for the grid-column-start and the grid-column-end properties.
    /*	@docs: {
     *	@title: Grid column
     *	@description: 
     *		A shorthand property for the grid-column-start and the grid-column-end properties.
     *		The equivalent of CSS attribute `gridColumn`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_column(value) {
        if (value == null) { return this.element.style.gridColumn; }
        this.element.style.gridColumn = value;
        return this;
    }

    // Specifies where to end the grid item.
    /*	@docs: {
     *	@title: Grid column end
     *	@description: 
     *		Specifies where to end the grid item.
     *		The equivalent of CSS attribute `gridColumnEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_column_end(value) {
        if (value == null) { return this.element.style.gridColumnEnd; }
        this.element.style.gridColumnEnd = value;
        return this;
    }

    // Specifies the size of the gap between columns.
    /*	@docs: {
     *	@title: Grid column gap
     *	@description: 
     *		Specifies the size of the gap between columns.
     *		The equivalent of CSS attribute `gridColumnGap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_column_gap(value) {
        if (value == null) { return this.element.style.gridColumnGap; }
        this.element.style.gridColumnGap = value;
        return this;
    }

    // Specifies where to start the grid item.
    /*	@docs: {
     *	@title: Grid column start
     *	@description: 
     *		Specifies where to start the grid item.
     *		The equivalent of CSS attribute `gridColumnStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_column_start(value) {
        if (value == null) { return this.element.style.gridColumnStart; }
        this.element.style.gridColumnStart = value;
        return this;
    }

    // A shorthand property for the grid-row-gap and grid-column-gap properties.
    /*	@docs: {
     *	@title: Grid gap
     *	@description: 
     *		A shorthand property for the grid-row-gap and grid-column-gap properties.
     *		The equivalent of CSS attribute `gridGap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_gap(value) {
        if (value == null) { return this.element.style.gridGap; }
        this.element.style.gridGap = value;
        return this;
    }

    // A shorthand property for the grid-row-start and the grid-row-end properties.
    /*	@docs: {
     *	@title: Grid row
     *	@description: 
     *		A shorthand property for the grid-row-start and the grid-row-end properties.
     *		The equivalent of CSS attribute `gridRow`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_row(value) {
        if (value == null) { return this.element.style.gridRow; }
        this.element.style.gridRow = value;
        return this;
    }

    // Specifies where to end the grid item.
    /*	@docs: {
     *	@title: Grid row end
     *	@description: 
     *		Specifies where to end the grid item.
     *		The equivalent of CSS attribute `gridRowEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_row_end(value) {
        if (value == null) { return this.element.style.gridRowEnd; }
        this.element.style.gridRowEnd = value;
        return this;
    }

    // Specifies the size of the gap between rows.
    /*	@docs: {
     *	@title: Grid row gap
     *	@description: 
     *		Specifies the size of the gap between rows.
     *		The equivalent of CSS attribute `gridRowGap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_row_gap(value) {
        if (value == null) { return this.element.style.gridRowGap; }
        this.element.style.gridRowGap = value;
        return this;
    }

    // Specifies where to start the grid item.
    /*	@docs: {
     *	@title: Grid row start
     *	@description: 
     *		Specifies where to start the grid item.
     *		The equivalent of CSS attribute `gridRowStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_row_start(value) {
        if (value == null) { return this.element.style.gridRowStart; }
        this.element.style.gridRowStart = value;
        return this;
    }

    // A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties.
    /*	@docs: {
     *	@title: Grid template
     *	@description: 
     *		A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties.
     *		The equivalent of CSS attribute `gridTemplate`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_template(value) {
        if (value == null) { return this.element.style.gridTemplate; }
        this.element.style.gridTemplate = value;
        return this;
    }

    // Specifies how to display columns and rows, using named grid items.
    /*	@docs: {
     *	@title: Grid template areas
     *	@description: 
     *		Specifies how to display columns and rows, using named grid items.
     *		The equivalent of CSS attribute `gridTemplateAreas`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_template_areas(value) {
        if (value == null) { return this.element.style.gridTemplateAreas; }
        this.element.style.gridTemplateAreas = value;
        return this;
    }

    // Specifies the size of the columns, and how many columns in a grid layout.
    /*	@docs: {
     *	@title: Grid template columns
     *	@description: 
     *		Specifies the size of the columns, and how many columns in a grid layout.
     *		The equivalent of CSS attribute `gridTemplateColumns`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_template_columns(value) {
        if (value == null) { return this.element.style.gridTemplateColumns; }
        this.element.style.gridTemplateColumns = value;
        return this;
    }

    // Specifies the size of the rows in a grid layout.
    /*	@docs: {
     *	@title: Grid template rows
     *	@description: 
     *		Specifies the size of the rows in a grid layout.
     *		The equivalent of CSS attribute `gridTemplateRows`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    grid_template_rows(value) {
        if (value == null) { return this.element.style.gridTemplateRows; }
        this.element.style.gridTemplateRows = value;
        return this;
    }

    // Specifies whether a punctuation character may be placed outside the line box.
    /*	@docs: {
     *	@title: Hanging punctuation
     *	@description: 
     *		Specifies whether a punctuation character may be placed outside the line box.
     *		The equivalent of CSS attribute `hangingPunctuation`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    hanging_punctuation(value) {
        if (value == null) { return this.element.style.hangingPunctuation; }
        this.element.style.hangingPunctuation = value;
        return this;
    }

    // Sets the height of an element.
    // height(value) {
    //     if (value == null) { return this.element.style.height; }
    //     this.element.style.height = this.pad_numeric(value);
    //     return this;
    // }

    // Sets how to split words to improve the layout of paragraphs.
    /*	@docs: {
     *	@title: Hyphens
     *	@description: 
     *		Sets how to split words to improve the layout of paragraphs.
     *		The equivalent of CSS attribute `hyphens`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    hyphens(value) {
        if (value == null) { return this.element.style.hyphens; }
        this.element.style.hyphens = value;
        return this;
    }

    // Specifies the type of algorithm to use for image scaling.
    /*	@docs: {
     *	@title: Image rendering
     *	@description: 
     *		Specifies the type of algorithm to use for image scaling.
     *		The equivalent of CSS attribute `imageRendering`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    image_rendering(value) {
        if (value == null) { return this.element.style.imageRendering; }
        this.element.style.imageRendering = value;
        return this;
    }

    // Specifies the size of an element in the inline direction.
    /*	@docs: {
     *	@title: Inline size
     *	@description: 
     *		Specifies the size of an element in the inline direction.
     *		The equivalent of CSS attribute `inlineSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    inline_size(value) {
        if (value == null) { return this.element.style.inlineSize; }
        this.element.style.inlineSize = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance between an element and the parent element.
    /*	@docs: {
     *	@title: Inset
     *	@description: 
     *		Specifies the distance between an element and the parent element.
     *		The equivalent of CSS attribute `inset`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    inset(value) {
        if (value == null) { return this.element.style.inset; }
        this.element.style.inset = value;
        return this;
    }

    // Specifies the distance between an element and the parent element in the block direction.
    /*	@docs: {
     *	@title: Inset block
     *	@description: 
     *		Specifies the distance between an element and the parent element in the block direction.
     *		The equivalent of CSS attribute `insetBlock`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    inset_block(value) {
        if (value == null) { return this.element.style.insetBlock; }
        this.element.style.insetBlock = value;
        return this;
    }

    // Specifies the distance between the end of an element and the parent element in the block direction.
    /*	@docs: {
     *	@title: Inset block end
     *	@description: 
     *		Specifies the distance between the end of an element and the parent element in the block direction.
     *		The equivalent of CSS attribute `insetBlockEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    inset_block_end(value) {
        if (value == null) { return this.element.style.insetBlockEnd; }
        this.element.style.insetBlockEnd = value;
        return this;
    }

    // Specifies the distance between the start of an element and the parent element in the block direction.
    /*	@docs: {
     *	@title: Inset block start
     *	@description: 
     *		Specifies the distance between the start of an element and the parent element in the block direction.
     *		The equivalent of CSS attribute `insetBlockStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    inset_block_start(value) {
        if (value == null) { return this.element.style.insetBlockStart; }
        this.element.style.insetBlockStart = value;
        return this;
    }

    // Specifies the distance between an element and the parent element in the inline direction.
    /*	@docs: {
     *	@title: Inset inline
     *	@description: 
     *		Specifies the distance between an element and the parent element in the inline direction.
     *		The equivalent of CSS attribute `insetInline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    inset_inline(value) {
        if (value == null) { return this.element.style.insetInline; }
        this.element.style.insetInline = value;
        return this;
    }

    // Specifies the distance between the end of an element and the parent element in the inline direction.
    /*	@docs: {
     *	@title: Inset inline end
     *	@description: 
     *		Specifies the distance between the end of an element and the parent element in the inline direction.
     *		The equivalent of CSS attribute `insetInlineEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    inset_inline_end(value) {
        if (value == null) { return this.element.style.insetInlineEnd; }
        this.element.style.insetInlineEnd = value;
        return this;
    }

    // Specifies the distance between the start of an element and the parent element in the inline direction.
    /*	@docs: {
     *	@title: Inset inline start
     *	@description: 
     *		Specifies the distance between the start of an element and the parent element in the inline direction.
     *		The equivalent of CSS attribute `insetInlineStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    inset_inline_start(value) {
        if (value == null) { return this.element.style.insetInlineStart; }
        this.element.style.insetInlineStart = value;
        return this;
    }

    // Defines whether an element must create a new stacking content.
    /*	@docs: {
     *	@title: Isolation
     *	@description: 
     *		Defines whether an element must create a new stacking content.
     *		The equivalent of CSS attribute `isolation`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    isolation(value) {
        if (value == null) { return this.element.style.isolation; }
        this.element.style.isolation = value;
        return this;
    }

    // Specifies the alignment between the items inside a flexible container when the items do not use all available space.
    /*	@docs: {
     *	@title: Justify content
     *	@description: 
     *		Specifies the alignment between the items inside a flexible container when the items do not use all available space.
     *		The equivalent of CSS attribute `justifyContent`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    justify_content(value) {
        if (value == null) { return this.element.style.justifyContent; }
        this.element.style.justifyContent = value;
        this.element.style.msJustifyContent = value;
        this.element.style.webkitJustifyContent = value;
        this.element.style.MozJustifyContent = value;
        this.element.style.OJustifyContent = value;
        return this;
    }

    // Is set on the grid container. Specifies the alignment of grid items in the inline direction.
    /*	@docs: {
     *	@title: Justify items
     *	@description: 
     *		Is set on the grid container. Specifies the alignment of grid items in the inline direction.
     *		The equivalent of CSS attribute `justifyItems`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    justify_items(value) {
        if (value == null) { return this.element.style.justifyItems; }
        this.element.style.justifyItems = value;
        return this;
    }

    // Is set on the grid item. Specifies the alignment of the grid item in the inline direction.
    /*	@docs: {
     *	@title: Justify self
     *	@description: 
     *		Is set on the grid item. Specifies the alignment of the grid item in the inline direction.
     *		The equivalent of CSS attribute `justifySelf`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    justify_self(value) {
        if (value == null) { return this.element.style.justifySelf; }
        this.element.style.justifySelf = value;
        return this;
    }

    // Specifies the left position of a positioned element.
    /*	@docs: {
     *	@title: Left
     *	@description: 
     *		Specifies the left position of a positioned element.
     *		The equivalent of CSS attribute `left`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    left(value) {
        if (value == null) { return this.element.style.left; }
        this.element.style.left = this.pad_numeric(value);
        return this;
    }

    // Increases or decreases the space between characters in a text.
    /*	@docs: {
     *	@title: Letter spacing
     *	@description: 
     *		Increases or decreases the space between characters in a text.
     *		The equivalent of CSS attribute `letterSpacing`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    letter_spacing(value) {
        if (value == null) { return this.element.style.letterSpacing; }
        this.element.style.letterSpacing = value;
        return this;
    }

    // Specifies how/if to break lines.
    /*	@docs: {
     *	@title: Line break
     *	@description: 
     *		Specifies how/if to break lines.
     *		The equivalent of CSS attribute `lineBreak`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    line_break(value) {
        if (value == null) { return this.element.style.lineBreak; }
        this.element.style.lineBreak = value;
        return this;
    }

    // Sets the line height.
    /*	@docs: {
     *	@title: Line height
     *	@description: 
     *		Sets the line height.
     *		The equivalent of CSS attribute `lineHeight`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    line_height(value) {
        if (value == null) { return this.element.style.lineHeight; }
        this.element.style.lineHeight = this.pad_numeric(value);
        return this;
    }

    // Sets all the properties for a list in one declaration.
    /*	@docs: {
     *	@title: List style
     *	@description: 
     *		Sets all the properties for a list in one declaration.
     *		The equivalent of CSS attribute `listStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    list_style(value) {
        if (value == null) { return this.element.style.listStyle; }
        this.element.style.listStyle = value;
        return this;
    }

    // Specifies an image as the list-item marker.
    /*	@docs: {
     *	@title: List style image
     *	@description: 
     *		Specifies an image as the list-item marker.
     *		The equivalent of CSS attribute `listStyleImage`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    list_style_image(value) {
        if (value == null) { return this.element.style.listStyleImage; }
        this.element.style.listStyleImage = value;
        return this;
    }

    // Specifies the position of the list-item markers (bullet points).
    /*	@docs: {
     *	@title: List style position
     *	@description: 
     *		Specifies the position of the list-item markers (bullet points).
     *		The equivalent of CSS attribute `listStylePosition`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    list_style_position(value) {
        if (value == null) { return this.element.style.listStylePosition; }
        this.element.style.listStylePosition = value;
        return this;
    }

    // Specifies the type of list-item marker.
    /*	@docs: {
     *	@title: List style type
     *	@description: 
     *		Specifies the type of list-item marker.
     *		The equivalent of CSS attribute `listStyleType`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    list_style_type(value) {
        if (value == null) { return this.element.style.listStyleType; }
        this.element.style.listStyleType = value;
        return this;
    }

    // Sets all the margin properties in one declaration.
    // margin(value) {
    //     if (value == null) { return this.element.style.margin; }
    //     this.element.style.margin = value;
    //     return this;
    // }

    // Specifies the margin in the block direction.
    /*	@docs: {
     *	@title: Margin block
     *	@description: 
     *		Specifies the margin in the block direction.
     *		The equivalent of CSS attribute `marginBlock`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_block(value) {
        if (value == null) { return this.element.style.marginBlock; }
        this.element.style.marginBlock = value;
        return this;
    }

    // Specifies the margin at the end in the block direction.
    /*	@docs: {
     *	@title: Margin block end
     *	@description: 
     *		Specifies the margin at the end in the block direction.
     *		The equivalent of CSS attribute `marginBlockEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_block_end(value) {
        if (value == null) { return this.element.style.marginBlockEnd; }
        this.element.style.marginBlockEnd = value;
        return this;
    }

    // Specifies the margin at the start in the block direction.
    /*	@docs: {
     *	@title: Margin block start
     *	@description: 
     *		Specifies the margin at the start in the block direction.
     *		The equivalent of CSS attribute `marginBlockStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_block_start(value) {
        if (value == null) { return this.element.style.marginBlockStart; }
        this.element.style.marginBlockStart = value;
        return this;
    }

    // Sets the bottom margin of an element.
    /*	@docs: {
     *	@title: Margin bottom
     *	@description: 
     *		Sets the bottom margin of an element.
     *		The equivalent of CSS attribute `marginBottom`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_bottom(value) {
        if (value == null) { return this.element.style.marginBottom; }
        this.element.style.marginBottom = this.pad_numeric(value);
        return this;
    }

    // Specifies the margin in the inline direction.
    /*	@docs: {
     *	@title: Margin inline
     *	@description: 
     *		Specifies the margin in the inline direction.
     *		The equivalent of CSS attribute `marginInline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_inline(value) {
        if (value == null) { return this.element.style.marginInline; }
        this.element.style.marginInline = value;
        return this;
    }

    // Specifies the margin at the end in the inline direction.
    /*	@docs: {
     *	@title: Margin inline end
     *	@description: 
     *		Specifies the margin at the end in the inline direction.
     *		The equivalent of CSS attribute `marginInlineEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_inline_end(value) {
        if (value == null) { return this.element.style.marginInlineEnd; }
        this.element.style.marginInlineEnd = value;
        return this;
    }

    // Specifies the margin at the start in the inline direction.
    /*	@docs: {
     *	@title: Margin inline start
     *	@description: 
     *		Specifies the margin at the start in the inline direction.
     *		The equivalent of CSS attribute `marginInlineStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_inline_start(value) {
        if (value == null) { return this.element.style.marginInlineStart; }
        this.element.style.marginInlineStart = value;
        return this;
    }

    // Sets the left margin of an element.
    /*	@docs: {
     *	@title: Margin left
     *	@description: 
     *		Sets the left margin of an element.
     *		The equivalent of CSS attribute `marginLeft`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_left(value) {
        if (value == null) { return this.element.style.marginLeft; }
        this.element.style.marginLeft = this.pad_numeric(value);
        return this;
    }

    // Sets the right margin of an element.
    /*	@docs: {
     *	@title: Margin right
     *	@description: 
     *		Sets the right margin of an element.
     *		The equivalent of CSS attribute `marginRight`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_right(value) {
        if (value == null) { return this.element.style.marginRight; }
        this.element.style.marginRight = this.pad_numeric(value);
        return this;
    }

    // Sets the top margin of an element.
    /*	@docs: {
     *	@title: Margin top
     *	@description: 
     *		Sets the top margin of an element.
     *		The equivalent of CSS attribute `marginTop`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    margin_top(value) {
        if (value == null) { return this.element.style.marginTop; }
        this.element.style.marginTop = this.pad_numeric(value);
        return this;
    }

    // Hides parts of an element by masking or clipping an image at specific places.
    /*	@docs: {
     *	@title: Mask
     *	@description: 
     *		Hides parts of an element by masking or clipping an image at specific places.
     *		The equivalent of CSS attribute `mask`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask(value) {
        if (value == null) { return this.element.style.mask; }
        this.element.style.mask = value;
        this.element.style.msMask = value;
        this.element.style.webkitMask = value;
        this.element.style.MozMask = value;
        this.element.style.OMask = value;
        return this;
    }

    // Specifies the mask area.
    /*	@docs: {
     *	@title: Mask clip
     *	@description: 
     *		Specifies the mask area.
     *		The equivalent of CSS attribute `maskClip`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask_clip(value) {
        if (value == null) { return this.element.style.maskClip; }
        this.element.style.maskClip = value;
        return this;
    }

    // Represents a compositing operation used on the current mask layer with the mask layers below it.
    /*	@docs: {
     *	@title: Mask composite
     *	@description: 
     *		Represents a compositing operation used on the current mask layer with the mask layers below it.
     *		The equivalent of CSS attribute `maskComposite`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask_composite(value) {
        if (value == null) { return this.element.style.maskComposite; }
        this.element.style.maskComposite = value;
        this.element.style.msMaskComposite = value;
        this.element.style.webkitMaskComposite = value;
        this.element.style.MozMaskComposite = value;
        this.element.style.OMaskComposite = value;
        return this;
    }

    // Specifies an image to be used as a mask layer for an element.
    /*	@docs: {
     *	@title: Mask image
     *	@description: 
     *		Specifies an image to be used as a mask layer for an element.
     *		The equivalent of CSS attribute `maskImage`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask_image(value) {
        if (value == null) { return this.element.style.maskImage; }
        this.element.style.maskImage = value;
        return this;
    }

    // Specifies whether the mask layer image is treated as a luminance mask or as an alpha mask.
    /*	@docs: {
     *	@title: Mask mode
     *	@description: 
     *		Specifies whether the mask layer image is treated as a luminance mask or as an alpha mask.
     *		The equivalent of CSS attribute `maskMode`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask_mode(value) {
        if (value == null) { return this.element.style.maskMode; }
        this.element.style.maskMode = value;
        return this;
    }

    // Specifies the origin position (the mask position area) of a mask layer image.
    /*	@docs: {
     *	@title: Mask origin
     *	@description: 
     *		Specifies the origin position (the mask position area) of a mask layer image.
     *		The equivalent of CSS attribute `maskOrigin`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask_origin(value) {
        if (value == null) { return this.element.style.maskOrigin; }
        this.element.style.maskOrigin = value;
        return this;
    }

    // Sets the starting position of a mask layer image (relative to the mask position area).
    /*	@docs: {
     *	@title: Mask position
     *	@description: 
     *		Sets the starting position of a mask layer image (relative to the mask position area).
     *		The equivalent of CSS attribute `maskPosition`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask_position(value) {
        if (value == null) { return this.element.style.maskPosition; }
        this.element.style.maskPosition = value;
        return this;
    }

    // Specifies how the mask layer image is repeated.
    /*	@docs: {
     *	@title: Mask repeat
     *	@description: 
     *		Specifies how the mask layer image is repeated.
     *		The equivalent of CSS attribute `maskRepeat`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask_repeat(value) {
        if (value == null) { return this.element.style.maskRepeat; }
        this.element.style.maskRepeat = value;
        return this;
    }

    // Specifies the size of a mask layer image.
    /*	@docs: {
     *	@title: Mask size
     *	@description: 
     *		Specifies the size of a mask layer image.
     *		The equivalent of CSS attribute `maskSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask_size(value) {
        if (value == null) { return this.element.style.maskSize; }
        this.element.style.maskSize = this.pad_numeric(value);
        return this;
    }

    // Specifies whether an SVG <mask> element is treated as a luminance mask or as an alpha mask.
    /*	@docs: {
     *	@title: Mask type
     *	@description: 
     *		Specifies whether an SVG <mask> element is treated as a luminance mask or as an alpha mask.
     *		The equivalent of CSS attribute `maskType`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mask_type(value) {
        if (value == null) { return this.element.style.maskType; }
        this.element.style.maskType = value;
        return this;
    }

    // Sets the maximum height of an element.
    /*	@docs: {
     *	@title: Max height
     *	@description: 
     *		Sets the maximum height of an element.
     *		The equivalent of CSS attribute `maxHeight`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    max_height(value) {
        if (value == null) { return this.element.style.maxHeight; }
        this.element.style.maxHeight = this.pad_numeric(value);
        return this;
    }

    // Sets the maximum width of an element.
    /*	@docs: {
     *	@title: Max width
     *	@description: 
     *		Sets the maximum width of an element.
     *		The equivalent of CSS attribute `maxWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    max_width(value) {
        if (value == null) { return this.element.style.maxWidth; }
        this.element.style.maxWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the maximum size of an element in the block direction.
    /*	@docs: {
     *	@title: Max block size
     *	@description: 
     *		Sets the maximum size of an element in the block direction.
     *		The equivalent of CSS attribute `maxBlockSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    max_block_size(value) {
        if (value == null) { return this.element.style.maxBlockSize; }
        this.element.style.maxBlockSize = this.pad_numeric(value);
        return this;
    }

    // Sets the maximum size of an element in the inline direction.
    /*	@docs: {
     *	@title: Max inline size
     *	@description: 
     *		Sets the maximum size of an element in the inline direction.
     *		The equivalent of CSS attribute `maxInlineSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    max_inline_size(value) {
        if (value == null) { return this.element.style.maxInlineSize; }
        this.element.style.maxInlineSize = this.pad_numeric(value);
        return this;
    }

    // Sets the minimum size of an element in the block direction.
    /*	@docs: {
     *	@title: Min block size
     *	@description: 
     *		Sets the minimum size of an element in the block direction.
     *		The equivalent of CSS attribute `minBlockSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    min_block_size(value) {
        if (value == null) { return this.element.style.minBlockSize; }
        this.element.style.minBlockSize = this.pad_numeric(value);
        return this;
    }

    // Sets the minimum size of an element in the inline direction.
    /*	@docs: {
     *	@title: Min inline size
     *	@description: 
     *		Sets the minimum size of an element in the inline direction.
     *		The equivalent of CSS attribute `minInlineSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    min_inline_size(value) {
        if (value == null) { return this.element.style.minInlineSize; }
        this.element.style.minInlineSize = this.pad_numeric(value);
        return this;
    }

    // Sets the minimum height of an element.
    /*	@docs: {
     *	@title: Min height
     *	@description: 
     *		Sets the minimum height of an element.
     *		The equivalent of CSS attribute `minHeight`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    min_height(value) {
        if (value == null) { return this.element.style.minHeight; }
        this.element.style.minHeight = this.pad_numeric(value);
        return this;
    }

    // Sets the minimum width of an element.
    /*	@docs: {
     *	@title: Min width
     *	@description: 
     *		Sets the minimum width of an element.
     *		The equivalent of CSS attribute `minWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    min_width(value) {
        if (value == null) { return this.element.style.minWidth; }
        this.element.style.minWidth = this.pad_numeric(value);
        return this;
    }

    // Specifies how an element's content should blend with its direct parent background.
    /*	@docs: {
     *	@title: Mix blend mode
     *	@description: 
     *		Specifies how an element's content should blend with its direct parent background.
     *		The equivalent of CSS attribute `mixBlendMode`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    mix_blend_mode(value) {
        if (value == null) { return this.element.style.mixBlendMode; }
        this.element.style.mixBlendMode = value;
        return this;
    }

    // Specifies how the contents of a replaced element should be fitted to the box established by its used height and width.
    /*	@docs: {
     *	@title: Object fit
     *	@description: 
     *		Specifies how the contents of a replaced element should be fitted to the box established by its used height and width.
     *		The equivalent of CSS attribute `objectFit`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    object_fit(value) {
        if (value == null) { return this.element.style.objectFit; }
        this.element.style.objectFit = value;
        return this;
    }

    // Specifies the alignment of the replaced element inside its box.
    /*	@docs: {
     *	@title: Object position
     *	@description: 
     *		Specifies the alignment of the replaced element inside its box.
     *		The equivalent of CSS attribute `objectPosition`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    object_position(value) {
        if (value == null) { return this.element.style.objectPosition; }
        this.element.style.objectPosition = value;
        return this;
    }

    // Is a shorthand, and specifies how to animate an element along a path.
    /*	@docs: {
     *	@title: Offset
     *	@description: 
     *		Is a shorthand, and specifies how to animate an element along a path.
     *		The equivalent of CSS attribute `offset`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    offset(value) {
        if (value == null) { return this.element.style.offset; }
        this.element.style.offset = value;
        return this;
    }

    // Specifies a point on an element that is fixed to the path it is animated along.
    /*	@docs: {
     *	@title: Offset anchor
     *	@description: 
     *		Specifies a point on an element that is fixed to the path it is animated along.
     *		The equivalent of CSS attribute `offsetAnchor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    offset_anchor(value) {
        if (value == null) { return this.element.style.offsetAnchor; }
        this.element.style.offsetAnchor = value;
        return this;
    }

    // Specifies the position along a path where an animated element is placed.
    /*	@docs: {
     *	@title: Offset distance
     *	@description: 
     *		Specifies the position along a path where an animated element is placed.
     *		The equivalent of CSS attribute `offsetDistance`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    offset_distance(value) {
        if (value == null) { return this.element.style.offsetDistance; }
        this.element.style.offsetDistance = value;
        return this;
    }

    // Specifies the path an element is animated along.
    /*	@docs: {
     *	@title: Offset path
     *	@description: 
     *		Specifies the path an element is animated along.
     *		The equivalent of CSS attribute `offsetPath`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    offset_path(value) {
        if (value == null) { return this.element.style.offsetPath; }
        this.element.style.offsetPath = value;
        return this;
    }

    // Specifies rotation of an element as it is animated along a path.
    /*	@docs: {
     *	@title: Offset rotate
     *	@description: 
     *		Specifies rotation of an element as it is animated along a path.
     *		The equivalent of CSS attribute `offsetRotate`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    offset_rotate(value) {
        if (value == null) { return this.element.style.offsetRotate; }
        this.element.style.offsetRotate = value;
        return this;
    }

    // Sets the opacity level for an element.
    /*	@docs: {
     *	@title: Opacity
     *	@description: 
     *		Sets the opacity level for an element.
     *		The equivalent of CSS attribute `opacity`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    opacity(value) {
        if (value == null) { return this.element.style.opacity; }
        this.element.style.opacity = value;
        return this;
    }

    // Sets the order of the flexible item, relative to the rest.
    /*	@docs: {
     *	@title: Order
     *	@description: 
     *		Sets the order of the flexible item, relative to the rest.
     *		The equivalent of CSS attribute `order`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    order(value) {
        if (value == null) { return this.element.style.order; }
        this.element.style.order = value;
        this.element.style.msOrder = value;
        this.element.style.webkitOrder = value;
        this.element.style.MozOrder = value;
        this.element.style.OOrder = value;
        return this;
    }

    // Sets the minimum number of lines that must be left at the bottom of a page or column.
    /*	@docs: {
     *	@title: Orphans
     *	@description: 
     *		Sets the minimum number of lines that must be left at the bottom of a page or column.
     *		The equivalent of CSS attribute `orphans`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    orphans(value) {
        if (value == null) { return this.element.style.orphans; }
        this.element.style.orphans = value;
        return this;
    }

    // A shorthand property for the outline-width, outline-style, and the outline-color properties.
    /*	@docs: {
     *	@title: Outline
     *	@description: 
     *		A shorthand property for the outline-width, outline-style, and the outline-color properties.
     *		The equivalent of CSS attribute `outline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    outline(value) {
        if (value == null) { return this.element.style.outline; }
        this.element.style.outline = value;
        return this;
    }

    // Sets the color of an outline.
    /*	@docs: {
     *	@title: Outline color
     *	@description: 
     *		Sets the color of an outline.
     *		The equivalent of CSS attribute `outlineColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    outline_color(value) {
        if (value == null) { return this.element.style.outlineColor; }
        this.element.style.outlineColor = value;
        return this;
    }

    // Offsets an outline, and draws it beyond the border edge.
    /*	@docs: {
     *	@title: Outline offset
     *	@description: 
     *		Offsets an outline, and draws it beyond the border edge.
     *		The equivalent of CSS attribute `outlineOffset`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    outline_offset(value) {
        if (value == null) { return this.element.style.outlineOffset; }
        this.element.style.outlineOffset = value;
        return this;
    }

    // Sets the style of an outline.
    /*	@docs: {
     *	@title: Outline style
     *	@description: 
     *		Sets the style of an outline.
     *		The equivalent of CSS attribute `outlineStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    outline_style(value) {
        if (value == null) { return this.element.style.outlineStyle; }
        this.element.style.outlineStyle = value;
        return this;
    }

    // Sets the width of an outline.
    /*	@docs: {
     *	@title: Outline width
     *	@description: 
     *		Sets the width of an outline.
     *		The equivalent of CSS attribute `outlineWidth`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    outline_width(value) {
        if (value == null) { return this.element.style.outlineWidth; }
        this.element.style.outlineWidth = this.pad_numeric(value);
        return this;
    }

    // Specifies what happens if content overflows an element's box.
    /*	@docs: {
     *	@title: Overflow
     *	@description: 
     *		Specifies what happens if content overflows an element's box.
     *		The equivalent of CSS attribute `overflow`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overflow(value) {
        if (value == null) { return this.element.style.overflow; }
        this.element.style.overflow = value;
        return this;
    }

    // Specifies whether or not content in viewable area in a scrollable contianer should be pushed down when new content is loaded above.
    /*	@docs: {
     *	@title: Overflow anchor
     *	@description: 
     *		Specifies whether or not content in viewable area in a scrollable contianer should be pushed down when new content is loaded above.
     *		The equivalent of CSS attribute `overflowAnchor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overflow_anchor(value) {
        if (value == null) { return this.element.style.overflowAnchor; }
        this.element.style.overflowAnchor = value;
        return this;
    }

    // Specifies whether or not the browser can break lines with long words, if they overflow the container.
    /*	@docs: {
     *	@title: Overflow wrap
     *	@description: 
     *		Specifies whether or not the browser can break lines with long words, if they overflow the container.
     *		The equivalent of CSS attribute `overflowWrap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overflow_wrap(value) {
        if (value == null) { return this.element.style.overflowWrap; }
        this.element.style.overflowWrap = value;
        return this;
    }

    // Specifies whether or not to clip the left/right edges of the content, if it overflows the element's content area.
    /*	@docs: {
     *	@title: Overflow x
     *	@description: 
     *		Specifies whether or not to clip the left/right edges of the content, if it overflows the element's content area.
     *		The equivalent of CSS attribute `overflowX`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overflow_x(value) {
        if (value == null) { return this.element.style.overflowX; }
        this.element.style.overflowX = value;
        return this;
    }

    // Specifies whether or not to clip the top/bottom edges of the content, if it overflows the element's content area.
    /*	@docs: {
     *	@title: Overflow y
     *	@description: 
     *		Specifies whether or not to clip the top/bottom edges of the content, if it overflows the element's content area.
     *		The equivalent of CSS attribute `overflowY`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overflow_y(value) {
        if (value == null) { return this.element.style.overflowY; }
        this.element.style.overflowY = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in x- and y-directions.
    /*	@docs: {
     *	@title: Overscroll behavior
     *	@description: 
     *		Specifies whether to have scroll chaining or overscroll affordance in x- and y-directions.
     *		The equivalent of CSS attribute `overscrollBehavior`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overscroll_behavior(value) {
        if (value == null) { return this.element.style.overscrollBehavior; }
        this.element.style.overscrollBehavior = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in the block direction.
    /*	@docs: {
     *	@title: Overscroll behavior block
     *	@description: 
     *		Specifies whether to have scroll chaining or overscroll affordance in the block direction.
     *		The equivalent of CSS attribute `overscrollBehaviorBlock`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overscroll_behavior_block(value) {
        if (value == null) { return this.element.style.overscrollBehaviorBlock; }
        this.element.style.overscrollBehaviorBlock = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in the inline direction.
    /*	@docs: {
     *	@title: Overscroll behavior inline
     *	@description: 
     *		Specifies whether to have scroll chaining or overscroll affordance in the inline direction.
     *		The equivalent of CSS attribute `overscrollBehaviorInline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overscroll_behavior_inline(value) {
        if (value == null) { return this.element.style.overscrollBehaviorInline; }
        this.element.style.overscrollBehaviorInline = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in x-direction.
    /*	@docs: {
     *	@title: Overscroll behavior x
     *	@description: 
     *		Specifies whether to have scroll chaining or overscroll affordance in x-direction.
     *		The equivalent of CSS attribute `overscrollBehaviorX`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overscroll_behavior_x(value) {
        if (value == null) { return this.element.style.overscrollBehaviorX; }
        this.element.style.overscrollBehaviorX = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in y-directions.
    /*	@docs: {
     *	@title: Overscroll behavior y
     *	@description: 
     *		Specifies whether to have scroll chaining or overscroll affordance in y-directions.
     *		The equivalent of CSS attribute `overscrollBehaviorY`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    overscroll_behavior_y(value) {
        if (value == null) { return this.element.style.overscrollBehaviorY; }
        this.element.style.overscrollBehaviorY = value;
        return this;
    }

    // A shorthand property for all the padding-* properties.
    // padding(value) {
    //     if (value == null) { return this.element.style.padding; }
    //     this.element.style.padding = value;
    //     return this;
    // }

    // Specifies the padding in the block direction.
    /*	@docs: {
     *	@title: Padding block
     *	@description: 
     *		Specifies the padding in the block direction.
     *		The equivalent of CSS attribute `paddingBlock`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_block(value) {
        if (value == null) { return this.element.style.paddingBlock; }
        this.element.style.paddingBlock = value;
        return this;
    }

    // Specifies the padding at the end in the block direction.
    /*	@docs: {
     *	@title: Padding block end
     *	@description: 
     *		Specifies the padding at the end in the block direction.
     *		The equivalent of CSS attribute `paddingBlockEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_block_end(value) {
        if (value == null) { return this.element.style.paddingBlockEnd; }
        this.element.style.paddingBlockEnd = value;
        return this;
    }

    // Specifies the padding at the start in the block direction.
    /*	@docs: {
     *	@title: Padding block start
     *	@description: 
     *		Specifies the padding at the start in the block direction.
     *		The equivalent of CSS attribute `paddingBlockStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_block_start(value) {
        if (value == null) { return this.element.style.paddingBlockStart; }
        this.element.style.paddingBlockStart = value;
        return this;
    }

    // Sets the bottom padding of an element.
    /*	@docs: {
     *	@title: Padding bottom
     *	@description: 
     *		Sets the bottom padding of an element.
     *		The equivalent of CSS attribute `paddingBottom`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_bottom(value) {
        if (value == null) { return this.element.style.paddingBottom; }
        this.element.style.paddingBottom = this.pad_numeric(value);
        return this;
    }

    // Specifies the padding in the inline direction.
    /*	@docs: {
     *	@title: Padding inline
     *	@description: 
     *		Specifies the padding in the inline direction.
     *		The equivalent of CSS attribute `paddingInline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_inline(value) {
        if (value == null) { return this.element.style.paddingInline; }
        this.element.style.paddingInline = value;
        return this;
    }

    // Specifies the padding at the end in the inline direction.
    /*	@docs: {
     *	@title: Padding inline end
     *	@description: 
     *		Specifies the padding at the end in the inline direction.
     *		The equivalent of CSS attribute `paddingInlineEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_inline_end(value) {
        if (value == null) { return this.element.style.paddingInlineEnd; }
        this.element.style.paddingInlineEnd = value;
        return this;
    }

    // Specifies the padding at the start in the inline direction.
    /*	@docs: {
     *	@title: Padding inline start
     *	@description: 
     *		Specifies the padding at the start in the inline direction.
     *		The equivalent of CSS attribute `paddingInlineStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_inline_start(value) {
        if (value == null) { return this.element.style.paddingInlineStart; }
        this.element.style.paddingInlineStart = value;
        return this;
    }

    // Sets the left padding of an element.
    /*	@docs: {
     *	@title: Padding left
     *	@description: 
     *		Sets the left padding of an element.
     *		The equivalent of CSS attribute `paddingLeft`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_left(value) {
        if (value == null) { return this.element.style.paddingLeft; }
        this.element.style.paddingLeft = this.pad_numeric(value);
        return this;
    }

    // Sets the right padding of an element.
    /*	@docs: {
     *	@title: Padding right
     *	@description: 
     *		Sets the right padding of an element.
     *		The equivalent of CSS attribute `paddingRight`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_right(value) {
        if (value == null) { return this.element.style.paddingRight; }
        this.element.style.paddingRight = this.pad_numeric(value);
        return this;
    }

    // Sets the top padding of an element.
    /*	@docs: {
     *	@title: Padding top
     *	@description: 
     *		Sets the top padding of an element.
     *		The equivalent of CSS attribute `paddingTop`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    padding_top(value) {
        if (value == null) { return this.element.style.paddingTop; }
        this.element.style.paddingTop = this.pad_numeric(value);
        return this;
    }

    // Sets the page-break behavior after an element.
    /*	@docs: {
     *	@title: Page break after
     *	@description: 
     *		Sets the page-break behavior after an element.
     *		The equivalent of CSS attribute `pageBreakAfter`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    page_break_after(value) {
        if (value == null) { return this.element.style.pageBreakAfter; }
        this.element.style.pageBreakAfter = value;
        return this;
    }

    // Sets the page-break behavior before an element.
    /*	@docs: {
     *	@title: Page break before
     *	@description: 
     *		Sets the page-break behavior before an element.
     *		The equivalent of CSS attribute `pageBreakBefore`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    page_break_before(value) {
        if (value == null) { return this.element.style.pageBreakBefore; }
        this.element.style.pageBreakBefore = value;
        return this;
    }

    // Sets the page-break behavior inside an element.
    /*	@docs: {
     *	@title: Page break inside
     *	@description: 
     *		Sets the page-break behavior inside an element.
     *		The equivalent of CSS attribute `pageBreakInside`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    page_break_inside(value) {
        if (value == null) { return this.element.style.pageBreakInside; }
        this.element.style.pageBreakInside = value;
        return this;
    }

    // Sets the order of how an SVG element or text is painted.
    /*	@docs: {
     *	@title: Paint order
     *	@description: 
     *		Sets the order of how an SVG element or text is painted.
     *		The equivalent of CSS attribute `paintOrder`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    paint_order(value) {
        if (value == null) { return this.element.style.paintOrder; }
        this.element.style.paintOrder = value;
        return this;
    }

    // Gives a 3D-positioned element some perspective.
    /*	@docs: {
     *	@title: Perspective
     *	@description: 
     *		Gives a 3D-positioned element some perspective.
     *		The equivalent of CSS attribute `perspective`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    perspective(value) {
        if (value == null) { return this.element.style.perspective; }
        this.element.style.perspective = value;
        this.element.style.msPerspective = value;
        this.element.style.webkitPerspective = value;
        this.element.style.MozPerspective = value;
        this.element.style.OPerspective = value;
        return this;
    }

    // Defines at which position the user is looking at the 3D-positioned element.
    /*	@docs: {
     *	@title: Perspective origin
     *	@description: 
     *		Defines at which position the user is looking at the 3D-positioned element.
     *		The equivalent of CSS attribute `perspectiveOrigin`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    perspective_origin(value) {
        if (value == null) { return this.element.style.perspectiveOrigin; }
        this.element.style.perspectiveOrigin = value;
        this.element.style.msPerspectiveOrigin = value;
        this.element.style.webkitPerspectiveOrigin = value;
        this.element.style.MozPerspectiveOrigin = value;
        this.element.style.OPerspectiveOrigin = value;
        return this;
    }

    // Specifies align-content and justify-content property values for flexbox and grid layouts.
    /*	@docs: {
     *	@title: Place content
     *	@description: 
     *		Specifies align-content and justify-content property values for flexbox and grid layouts.
     *		The equivalent of CSS attribute `placeContent`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    place_content(value) {
        if (value == null) { return this.element.style.placeContent; }
        this.element.style.placeContent = value;
        return this;
    }

    // Specifies align-items and justify-items property values for grid layouts.
    /*	@docs: {
     *	@title: Place items
     *	@description: 
     *		Specifies align-items and justify-items property values for grid layouts.
     *		The equivalent of CSS attribute `placeItems`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    place_items(value) {
        if (value == null) { return this.element.style.placeItems; }
        this.element.style.placeItems = value;
        return this;
    }

    // Specifies align-self and justify-self property values for grid layouts.
    /*	@docs: {
     *	@title: Place self
     *	@description: 
     *		Specifies align-self and justify-self property values for grid layouts.
     *		The equivalent of CSS attribute `placeSelf`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    place_self(value) {
        if (value == null) { return this.element.style.placeSelf; }
        this.element.style.placeSelf = value;
        return this;
    }

    // Defines whether or not an element reacts to pointer events.
    /*	@docs: {
     *	@title: Pointer events
     *	@description: 
     *		Defines whether or not an element reacts to pointer events.
     *		The equivalent of CSS attribute `pointerEvents`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    pointer_events(value) {
        if (value == null) { return this.element.style.pointerEvents; }
        this.element.style.pointerEvents = value;
        return this;
    }

    // Specifies the type of positioning method used for an element (static, relative, absolute or fixed).
    // position(value) {
    //     if (value == null) { return this.element.style.position; }
    //     this.element.style.position = value;
    //     return this;
    // }

    // Sets the type of quotation marks for embedded quotations.
    /*	@docs: {
     *	@title: Quotes
     *	@description: 
     *		Sets the type of quotation marks for embedded quotations.
     *		The equivalent of CSS attribute `quotes`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    quotes(value) {
        if (value == null) { return this.element.style.quotes; }
        this.element.style.quotes = value;
        return this;
    }

    // Defines if (and how) an element is resizable by the user.
    /*	@docs: {
     *	@title: Resize
     *	@description: 
     *		Defines if (and how) an element is resizable by the user.
     *		The equivalent of CSS attribute `resize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    resize(value) {
        if (value == null) { return this.element.style.resize; }
        this.element.style.resize = value;
        return this;
    }

    // Specifies the right position of a positioned element.
    /*	@docs: {
     *	@title: Right
     *	@description: 
     *		Specifies the right position of a positioned element.
     *		The equivalent of CSS attribute `right`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    right(value) {
        if (value == null) { return this.element.style.right; }
        this.element.style.right = this.pad_numeric(value);
        return this;
    }

    // Specifies the rotation of an element.
    /*	@docs: {
     *	@title: Rotate
     *	@description: 
     *		Specifies the rotation of an element.
     *		The equivalent of CSS attribute `rotate`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    rotate(value) {
        if (value == null) { return this.element.style.rotate; }
        this.element.style.rotate = value;
        return this;
    }

    // Specifies the gap between the grid rows.
    /*	@docs: {
     *	@title: Row gap
     *	@description: 
     *		Specifies the gap between the grid rows.
     *		The equivalent of CSS attribute `rowGap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    row_gap(value) {
        if (value == null) { return this.element.style.rowGap; }
        this.element.style.rowGap = value;
        return this;
    }

    // Specifies the size of an element by scaling up or down.
    /*	@docs: {
     *	@title: Scale
     *	@description: 
     *		Specifies the size of an element by scaling up or down.
     *		The equivalent of CSS attribute `scale`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scale(value) {
        if (value == null) { return this.element.style.scale; }
        this.element.style.scale = value;
        return this;
    }

    // Specifies whether to smoothly animate the scroll position in a scrollable box, instead of a straight jump.
    /*	@docs: {
     *	@title: Scroll behavior
     *	@description: 
     *		Specifies whether to smoothly animate the scroll position in a scrollable box, instead of a straight jump.
     *		The equivalent of CSS attribute `scrollBehavior`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_behavior(value) {
        if (value == null) { return this.element.style.scrollBehavior; }
        this.element.style.scrollBehavior = value;
        return this;
    }

    // Specifies the margin between the snap position and the container.
    /*	@docs: {
     *	@title: Scroll margin
     *	@description: 
     *		Specifies the margin between the snap position and the container.
     *		The equivalent of CSS attribute `scrollMargin`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin(value) {
        if (value == null) { return this.element.style.scrollMargin; }
        this.element.style.scrollMargin = value;
        return this;
    }

    // Specifies the margin between the snap position and the container in the block direction.
    /*	@docs: {
     *	@title: Scroll margin block
     *	@description: 
     *		Specifies the margin between the snap position and the container in the block direction.
     *		The equivalent of CSS attribute `scrollMarginBlock`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_block(value) {
        if (value == null) { return this.element.style.scrollMarginBlock; }
        this.element.style.scrollMarginBlock = value;
        return this;
    }

    // Specifies the end margin between the snap position and the container in the block direction.
    /*	@docs: {
     *	@title: Scroll margin block end
     *	@description: 
     *		Specifies the end margin between the snap position and the container in the block direction.
     *		The equivalent of CSS attribute `scrollMarginBlockEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_block_end(value) {
        if (value == null) { return this.element.style.scrollMarginBlockEnd; }
        this.element.style.scrollMarginBlockEnd = value;
        return this;
    }

    // Specifies the start margin between the snap position and the container in the block direction.
    /*	@docs: {
     *	@title: Scroll margin block start
     *	@description: 
     *		Specifies the start margin between the snap position and the container in the block direction.
     *		The equivalent of CSS attribute `scrollMarginBlockStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_block_start(value) {
        if (value == null) { return this.element.style.scrollMarginBlockStart; }
        this.element.style.scrollMarginBlockStart = value;
        return this;
    }

    // Specifies the margin between the snap position on the bottom side and the container.
    /*	@docs: {
     *	@title: Scroll margin bottom
     *	@description: 
     *		Specifies the margin between the snap position on the bottom side and the container.
     *		The equivalent of CSS attribute `scrollMarginBottom`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_bottom(value) {
        if (value == null) { return this.element.style.scrollMarginBottom; }
        this.element.style.scrollMarginBottom = this.pad_numeric(value);
        return this;
    }

    // Specifies the margin between the snap position and the container in the inline direction.
    /*	@docs: {
     *	@title: Scroll margin inline
     *	@description: 
     *		Specifies the margin between the snap position and the container in the inline direction.
     *		The equivalent of CSS attribute `scrollMarginInline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_inline(value) {
        if (value == null) { return this.element.style.scrollMarginInline; }
        this.element.style.scrollMarginInline = value;
        return this;
    }

    // Specifies the end margin between the snap position and the container in the inline direction.
    /*	@docs: {
     *	@title: Scroll margin inline end
     *	@description: 
     *		Specifies the end margin between the snap position and the container in the inline direction.
     *		The equivalent of CSS attribute `scrollMarginInlineEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_inline_end(value) {
        if (value == null) { return this.element.style.scrollMarginInlineEnd; }
        this.element.style.scrollMarginInlineEnd = value;
        return this;
    }

    // Specifies the start margin between the snap position and the container in the inline direction.
    /*	@docs: {
     *	@title: Scroll margin inline start
     *	@description: 
     *		Specifies the start margin between the snap position and the container in the inline direction.
     *		The equivalent of CSS attribute `scrollMarginInlineStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_inline_start(value) {
        if (value == null) { return this.element.style.scrollMarginInlineStart; }
        this.element.style.scrollMarginInlineStart = value;
        return this;
    }

    // Specifies the margin between the snap position on the left side and the container.
    /*	@docs: {
     *	@title: Scroll margin left
     *	@description: 
     *		Specifies the margin between the snap position on the left side and the container.
     *		The equivalent of CSS attribute `scrollMarginLeft`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_left(value) {
        if (value == null) { return this.element.style.scrollMarginLeft; }
        this.element.style.scrollMarginLeft = this.pad_numeric(value);
        return this;
    }

    // Specifies the margin between the snap position on the right side and the container.
    /*	@docs: {
     *	@title: Scroll margin right
     *	@description: 
     *		Specifies the margin between the snap position on the right side and the container.
     *		The equivalent of CSS attribute `scrollMarginRight`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_right(value) {
        if (value == null) { return this.element.style.scrollMarginRight; }
        this.element.style.scrollMarginRight = this.pad_numeric(value);
        return this;
    }

    // Specifies the margin between the snap position on the top side and the container.
    /*	@docs: {
     *	@title: Scroll margin top
     *	@description: 
     *		Specifies the margin between the snap position on the top side and the container.
     *		The equivalent of CSS attribute `scrollMarginTop`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_margin_top(value) {
        if (value == null) { return this.element.style.scrollMarginTop; }
        this.element.style.scrollMarginTop = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance from the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding
     *	@description: 
     *		Specifies the distance from the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPadding`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding(value) {
        if (value == null) { return this.element.style.scrollPadding; }
        this.element.style.scrollPadding = value;
        return this;
    }

    // Specifies the distance in block direction from the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding block
     *	@description: 
     *		Specifies the distance in block direction from the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingBlock`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_block(value) {
        if (value == null) { return this.element.style.scrollPaddingBlock; }
        this.element.style.scrollPaddingBlock = value;
        return this;
    }

    // Specifies the distance in block direction from the end of the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding block end
     *	@description: 
     *		Specifies the distance in block direction from the end of the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingBlockEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_block_end(value) {
        if (value == null) { return this.element.style.scrollPaddingBlockEnd; }
        this.element.style.scrollPaddingBlockEnd = value;
        return this;
    }

    // Specifies the distance in block direction from the start of the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding block start
     *	@description: 
     *		Specifies the distance in block direction from the start of the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingBlockStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_block_start(value) {
        if (value == null) { return this.element.style.scrollPaddingBlockStart; }
        this.element.style.scrollPaddingBlockStart = value;
        return this;
    }

    // Specifies the distance from the bottom of the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding bottom
     *	@description: 
     *		Specifies the distance from the bottom of the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingBottom`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_bottom(value) {
        if (value == null) { return this.element.style.scrollPaddingBottom; }
        this.element.style.scrollPaddingBottom = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance in inline direction from the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding inline
     *	@description: 
     *		Specifies the distance in inline direction from the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingInline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_inline(value) {
        if (value == null) { return this.element.style.scrollPaddingInline; }
        this.element.style.scrollPaddingInline = value;
        return this;
    }

    // Specifies the distance in inline direction from the end of the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding inline end
     *	@description: 
     *		Specifies the distance in inline direction from the end of the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingInlineEnd`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_inline_end(value) {
        if (value == null) { return this.element.style.scrollPaddingInlineEnd; }
        this.element.style.scrollPaddingInlineEnd = value;
        return this;
    }

    // Specifies the distance in inline direction from the start of the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding inline start
     *	@description: 
     *		Specifies the distance in inline direction from the start of the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingInlineStart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_inline_start(value) {
        if (value == null) { return this.element.style.scrollPaddingInlineStart; }
        this.element.style.scrollPaddingInlineStart = value;
        return this;
    }

    // Specifies the distance from the left side of the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding left
     *	@description: 
     *		Specifies the distance from the left side of the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingLeft`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_left(value) {
        if (value == null) { return this.element.style.scrollPaddingLeft; }
        this.element.style.scrollPaddingLeft = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance from the right side of the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding right
     *	@description: 
     *		Specifies the distance from the right side of the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingRight`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_right(value) {
        if (value == null) { return this.element.style.scrollPaddingRight; }
        this.element.style.scrollPaddingRight = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance from the top of the container to the snap position on the child elements.
    /*	@docs: {
     *	@title: Scroll padding top
     *	@description: 
     *		Specifies the distance from the top of the container to the snap position on the child elements.
     *		The equivalent of CSS attribute `scrollPaddingTop`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_padding_top(value) {
        if (value == null) { return this.element.style.scrollPaddingTop; }
        this.element.style.scrollPaddingTop = this.pad_numeric(value);
        return this;
    }

    // Specifies where to position elements when the user stops scrolling.
    /*	@docs: {
     *	@title: Scroll snap align
     *	@description: 
     *		Specifies where to position elements when the user stops scrolling.
     *		The equivalent of CSS attribute `scrollSnapAlign`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_snap_align(value) {
        if (value == null) { return this.element.style.scrollSnapAlign; }
        this.element.style.scrollSnapAlign = value;
        return this;
    }

    // Specifies scroll behaviour after fast swipe on trackpad or touch screen.
    /*	@docs: {
     *	@title: Scroll snap stop
     *	@description: 
     *		Specifies scroll behaviour after fast swipe on trackpad or touch screen.
     *		The equivalent of CSS attribute `scrollSnapStop`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_snap_stop(value) {
        if (value == null) { return this.element.style.scrollSnapStop; }
        this.element.style.scrollSnapStop = value;
        return this;
    }

    // Specifies how snap behaviour should be when scrolling.
    /*	@docs: {
     *	@title: Scroll snap type
     *	@description: 
     *		Specifies how snap behaviour should be when scrolling.
     *		The equivalent of CSS attribute `scrollSnapType`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scroll_snap_type(value) {
        if (value == null) { return this.element.style.scrollSnapType; }
        this.element.style.scrollSnapType = value;
        return this;
    }

    // Specifies the color of the scrollbar of an element.
    /*	@docs: {
     *	@title: Scrollbar color
     *	@description: 
     *		Specifies the color of the scrollbar of an element.
     *		The equivalent of CSS attribute `scrollbarColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scrollbar_color(value) {
        if (value == null) { return this.element.style.scrollbarColor; }
        this.element.style.scrollbarColor = value;
        return this;
    }

    // Specifies the width of a tab character.
    /*	@docs: {
     *	@title: Tab size
     *	@description: 
     *		Specifies the width of a tab character.
     *		The equivalent of CSS attribute `tabSize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    tab_size(value) {
        if (value == null) { return this.element.style.tabSize; }
        this.element.style.tabSize = this.pad_numeric(value);
        return this;
    }

    // Defines the algorithm used to lay out table cells, rows, and columns.
    /*	@docs: {
     *	@title: Table layout
     *	@description: 
     *		Defines the algorithm used to lay out table cells, rows, and columns.
     *		The equivalent of CSS attribute `tableLayout`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    table_layout(value) {
        if (value == null) { return this.element.style.tableLayout; }
        this.element.style.tableLayout = value;
        return this;
    }

    // Specifies the horizontal alignment of text.
    /*	@docs: {
     *	@title: Text align
     *	@description: 
     *		Specifies the horizontal alignment of text.
     *		The equivalent of CSS attribute `textAlign`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_align(value) {
        if (value == null) { return this.element.style.textAlign; }
        this.element.style.textAlign = value;
        return this;
    }

    // Describes how the last line of a block or a line right before a forced line break is aligned when text-align is "justify".
    /*	@docs: {
     *	@title: Text align last
     *	@description: 
     *		Describes how the last line of a block or a line right before a forced line break is aligned when text-align is "justify".
     *		The equivalent of CSS attribute `textAlignLast`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_align_last(value) {
        if (value == null) { return this.element.style.textAlignLast; }
        this.element.style.textAlignLast = value;
        return this;
    }

    // Specifies the combination of multiple characters into the space of a single character.
    /*	@docs: {
     *	@title: Text combine upright
     *	@description: 
     *		Specifies the combination of multiple characters into the space of a single character.
     *		The equivalent of CSS attribute `textCombineUpright`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_combine_upright(value) {
        if (value == null) { return this.element.style.textCombineUpright; }
        this.element.style.textCombineUpright = value;
        return this;
    }

    // Specifies the decoration added to text.
    /*	@docs: {
     *	@title: Text decoration
     *	@description: 
     *		Specifies the decoration added to text.
     *		The equivalent of CSS attribute `textDecoration`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_decoration(value) {
        if (value == null) { return this.element.style.textDecoration; }
        this.element.style.textDecoration = value;
        return this;
    }

    // Specifies the color of the text-decoration.
    /*	@docs: {
     *	@title: Text decoration color
     *	@description: 
     *		Specifies the color of the text-decoration.
     *		The equivalent of CSS attribute `textDecorationColor`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_decoration_color(value) {
        if (value == null) { return this.element.style.textDecorationColor; }
        this.element.style.textDecorationColor = value;
        return this;
    }

    // Specifies the type of line in a text-decoration.
    /*	@docs: {
     *	@title: Text decoration line
     *	@description: 
     *		Specifies the type of line in a text-decoration.
     *		The equivalent of CSS attribute `textDecorationLine`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_decoration_line(value) {
        if (value == null) { return this.element.style.textDecorationLine; }
        this.element.style.textDecorationLine = value;
        return this;
    }

    // Specifies the style of the line in a text decoration.
    /*	@docs: {
     *	@title: Text decoration style
     *	@description: 
     *		Specifies the style of the line in a text decoration.
     *		The equivalent of CSS attribute `textDecorationStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_decoration_style(value) {
        if (value == null) { return this.element.style.textDecorationStyle; }
        this.element.style.textDecorationStyle = value;
        return this;
    }

    // Specifies the thickness of the decoration line.
    /*	@docs: {
     *	@title: Text decoration thickness
     *	@description: 
     *		Specifies the thickness of the decoration line.
     *		The equivalent of CSS attribute `textDecorationThickness`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_decoration_thickness(value) {
        if (value == null) { return this.element.style.textDecorationThickness; }
        this.element.style.textDecorationThickness = value;
        return this;
    }

    // Applies emphasis marks to text.
    /*	@docs: {
     *	@title: Text emphasis
     *	@description: 
     *		Applies emphasis marks to text.
     *		The equivalent of CSS attribute `textEmphasis`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_emphasis(value) {
        if (value == null) { return this.element.style.textEmphasis; }
        this.element.style.textEmphasis = value;
        return this;
    }

    // Specifies the indentation of the first line in a text-block.
    /*	@docs: {
     *	@title: Text indent
     *	@description: 
     *		Specifies the indentation of the first line in a text-block.
     *		The equivalent of CSS attribute `textIndent`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_indent(value) {
        if (value == null) { return this.element.style.textIndent; }
        this.element.style.textIndent = value;
        return this;
    }

    // Specifies the justification method used when text-align is "justify".
    /*	@docs: {
     *	@title: Text justify
     *	@description: 
     *		Specifies the justification method used when text-align is "justify".
     *		The equivalent of CSS attribute `textJustify`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_justify(value) {
        if (value == null) { return this.element.style.textJustify; }
        this.element.style.textJustify = value;
        return this;
    }

    // Defines the orientation of characters in a line.
    /*	@docs: {
     *	@title: Text orientation
     *	@description: 
     *		Defines the orientation of characters in a line.
     *		The equivalent of CSS attribute `textOrientation`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_orientation(value) {
        if (value == null) { return this.element.style.textOrientation; }
        this.element.style.textOrientation = value;
        return this;
    }

    // Specifies what should happen when text overflows the containing element.
    /*	@docs: {
     *	@title: Text overflow
     *	@description: 
     *		Specifies what should happen when text overflows the containing element.
     *		The equivalent of CSS attribute `textOverflow`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_overflow(value) {
        if (value == null) { return this.element.style.textOverflow; }
        this.element.style.textOverflow = value;
        return this;
    }

    // Adds shadow to text.
    /*	@docs: {
     *	@title: Text shadow
     *	@description: 
     *		Adds shadow to text.
     *		The equivalent of CSS attribute `textShadow`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_shadow(value) {
        if (value == null) { return this.element.style.textShadow; }
        this.element.style.textShadow = value;
        return this;
    }

    // Controls the capitalization of text.
    /*	@docs: {
     *	@title: Text transform
     *	@description: 
     *		Controls the capitalization of text.
     *		The equivalent of CSS attribute `textTransform`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_transform(value) {
        if (value == null) { return this.element.style.textTransform; }
        this.element.style.textTransform = value;
        return this;
    }

    // Specifies the position of the underline which is set using the text-decoration property.
    /*	@docs: {
     *	@title: Text underline position
     *	@description: 
     *		Specifies the position of the underline which is set using the text-decoration property.
     *		The equivalent of CSS attribute `textUnderlinePosition`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    text_underline_position(value) {
        if (value == null) { return this.element.style.textUnderlinePosition; }
        this.element.style.textUnderlinePosition = value;
        return this;
    }

    // Specifies the top position of a positioned element.
    /*	@docs: {
     *	@title: Top
     *	@description: 
     *		Specifies the top position of a positioned element.
     *		The equivalent of CSS attribute `top`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    top(value) {
        if (value == null) { return this.element.style.top; }
        this.element.style.top = this.pad_numeric(value);
        return this;
    }

    // Applies a 2D or 3D transformation to an element.
    /*	@docs: {
     *	@title: Transform
     *	@description: 
     *		Applies a 2D or 3D transformation to an element.
     *		The equivalent of CSS attribute `transform`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    transform(value) {
        if (value == null) { return this.element.style.transform; }
        this.element.style.transform = value;
        this.element.style.msTransform = value;
        this.element.style.webkitTransform = value;
        this.element.style.MozTransform = value;
        this.element.style.OTransform = value;
        return this;
    }

    // Allows you to change the position on transformed elements.
    /*	@docs: {
     *	@title: Transform origin
     *	@description: 
     *		Allows you to change the position on transformed elements.
     *		The equivalent of CSS attribute `transformOrigin`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    transform_origin(value) {
        if (value == null) { return this.element.style.transformOrigin; }
        this.element.style.transformOrigin = value;
        this.element.style.msTransformOrigin = value;
        this.element.style.webkitTransformOrigin = value;
        this.element.style.MozTransformOrigin = value;
        this.element.style.OTransformOrigin = value;
        return this;
    }

    // Specifies how nested elements are rendered in 3D space.
    /*	@docs: {
     *	@title: Transform style
     *	@description: 
     *		Specifies how nested elements are rendered in 3D space.
     *		The equivalent of CSS attribute `transformStyle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    transform_style(value) {
        if (value == null) { return this.element.style.transformStyle; }
        this.element.style.transformStyle = value;
        this.element.style.msTransformStyle = value;
        this.element.style.webkitTransformStyle = value;
        this.element.style.MozTransformStyle = value;
        this.element.style.OTransformStyle = value;
        return this;
    }

    // A shorthand property for all the transition-* properties.
    /*	@docs: {
     *	@title: Transition
     *	@description: 
     *		A shorthand property for all the transition-* properties.
     *		The equivalent of CSS attribute `transition`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    transition(value) {
        if (value == null) { return this.element.style.transition; }
        this.element.style.transition = value;
        this.element.style.msTransition = value;
        this.element.style.webkitTransition = value;
        this.element.style.MozTransition = value;
        this.element.style.OTransition = value;
        return this;
    }

    // Specifies when the transition effect will start.
    /*	@docs: {
     *	@title: Transition delay
     *	@description: 
     *		Specifies when the transition effect will start.
     *		The equivalent of CSS attribute `transitionDelay`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    transition_delay(value) {
        if (value == null) { return this.element.style.transitionDelay; }
        this.element.style.transitionDelay = value;
        this.element.style.msTransitionDelay = value;
        this.element.style.webkitTransitionDelay = value;
        this.element.style.MozTransitionDelay = value;
        this.element.style.OTransitionDelay = value;
        return this;
    }

    // Specifies how many seconds or milliseconds a transition effect takes to complete.
    /*	@docs: {
     *	@title: Transition duration
     *	@description: 
     *		Specifies how many seconds or milliseconds a transition effect takes to complete.
     *		The equivalent of CSS attribute `transitionDuration`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    transition_duration(value) {
        if (value == null) { return this.element.style.transitionDuration; }
        this.element.style.transitionDuration = value;
        this.element.style.msTransitionDuration = value;
        this.element.style.webkitTransitionDuration = value;
        this.element.style.MozTransitionDuration = value;
        this.element.style.OTransitionDuration = value;
        return this;
    }

    // Specifies the name of the CSS property the transition effect is for.
    /*	@docs: {
     *	@title: Transition property
     *	@description: 
     *		Specifies the name of the CSS property the transition effect is for.
     *		The equivalent of CSS attribute `transitionProperty`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    transition_property(value) {
        if (value == null) { return this.element.style.transitionProperty; }
        this.element.style.transitionProperty = value;
        this.element.style.msTransitionProperty = value;
        this.element.style.webkitTransitionProperty = value;
        this.element.style.MozTransitionProperty = value;
        this.element.style.OTransitionProperty = value;
        return this;
    }

    // Specifies the speed curve of the transition effect.
    /*	@docs: {
     *	@title: Transition timing function
     *	@description: 
     *		Specifies the speed curve of the transition effect.
     *		The equivalent of CSS attribute `transitionTimingFunction`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    transition_timing_function(value) {
        if (value == null) { return this.element.style.transitionTimingFunction; }
        this.element.style.transitionTimingFunction = value;
        this.element.style.msTransitionTimingFunction = value;
        this.element.style.webkitTransitionTimingFunction = value;
        this.element.style.MozTransitionTimingFunction = value;
        this.element.style.OTransitionTimingFunction = value;
        return this;
    }

    // Specifies the position of an element.
    /*	@docs: {
     *	@title: Translate
     *	@description: 
     *		Specifies the position of an element.
     *		The equivalent of CSS attribute `translate`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    translate(value) {
        if (value == null) { return this.element.style.translate; }
        this.element.style.translate = value;
        return this;
    }

    // Used together with the direction property to set or return whether the text should be overridden to support multiple languages in the same document.
    /*	@docs: {
     *	@title: Unicode bidi
     *	@description: 
     *		Used together with the direction property to set or return whether the text should be overridden to support multiple languages in the same document.
     *		The equivalent of CSS attribute `unicodeBidi`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    unicode_bidi(value) {
        if (value == null) { return this.element.style.unicodeBidi; }
        this.element.style.unicodeBidi = value;
        return this;
    }

    // Specifies whether the text of an element can be selected.
    /*	@docs: {
     *	@title: User select
     *	@description: 
     *		Specifies whether the text of an element can be selected.
     *		The equivalent of CSS attribute `userSelect`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    user_select(value) {
        if (value == null) { return this.element.style.userSelect; }
        this.element.style.userSelect = value;
        this.element.style.msUserSelect = value;
        this.element.style.webkitUserSelect = value;
        this.element.style.MozUserSelect = value;
        this.element.style.OUserSelect = value;
        return this;
    }

    // Sets the vertical alignment of an element.
    // vertical_align(value) {
    //     if (value == null) { return this.element.style.verticalAlign; }
    //     this.element.style.verticalAlign = value;
    //     return this;
    // }

    // Specifies whether or not an element is visible.
    /*	@docs: {
     *	@title: Visibility
     *	@description: 
     *		Specifies whether or not an element is visible.
     *		The equivalent of CSS attribute `visibility`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    visibility(value) {
        if (value == null) { return this.element.style.visibility; }
        this.element.style.visibility = value;
        return this;
    }

    // Specifies how white-space inside an element is handled.
    /*	@docs: {
     *	@title: White space
     *	@description: 
     *		Specifies how white-space inside an element is handled.
     *		The equivalent of CSS attribute `whiteSpace`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    white_space(value) {
        if (value == null) { return this.element.style.whiteSpace; }
        this.element.style.whiteSpace = value;
        return this;
    }

    // Sets the minimum number of lines that must be left at the top of a page or column.
    /*	@docs: {
     *	@title: Widows
     *	@description: 
     *		Sets the minimum number of lines that must be left at the top of a page or column.
     *		The equivalent of CSS attribute `widows`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    widows(value) {
        if (value == null) { return this.element.style.widows; }
        this.element.style.widows = value;
        return this;
    }

    // Sets the width of an element.
    // width(value) {
    //     if (value == null) { return this.element.style.width; }
    //     this.element.style.width = this.pad_numeric(value);
    //     return this;
    // }

    // Specifies how words should break when reaching the end of a line.
    /*	@docs: {
     *	@title: Word break
     *	@description: 
     *		Specifies how words should break when reaching the end of a line.
     *		The equivalent of CSS attribute `wordBreak`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    word_break(value) {
        if (value == null) { return this.element.style.wordBreak; }
        this.element.style.wordBreak = value;
        return this;
    }

    // Increases or decreases the space between words in a text.
    /*	@docs: {
     *	@title: Word spacing
     *	@description: 
     *		Increases or decreases the space between words in a text.
     *		The equivalent of CSS attribute `wordSpacing`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    word_spacing(value) {
        if (value == null) { return this.element.style.wordSpacing; }
        this.element.style.wordSpacing = value;
        return this;
    }

    // Allows long, unbreakable words to be broken and wrap to the next line.
    /*	@docs: {
     *	@title: Word wrap
     *	@description: 
     *		Allows long, unbreakable words to be broken and wrap to the next line.
     *		The equivalent of CSS attribute `wordWrap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    word_wrap(value) {
        if (value == null) { return this.element.style.wordWrap; }
        this.element.style.wordWrap = value;
        return this;
    }

    // Specifies whether lines of text are laid out horizontally or vertically.
    /*	@docs: {
     *	@title: Writing mode
     *	@description: 
     *		Specifies whether lines of text are laid out horizontally or vertically.
     *		The equivalent of CSS attribute `writingMode`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    writing_mode(value) {
        if (value == null) { return this.element.style.writingMode; }
        this.element.style.writingMode = value;
        return this;
    }

    // ---------------------------------------------------------
    // Automatically generated HTML attribute functions. 
    // Reference: https://www.w3schools.com/tags/ref_attributes.asp. 

    // Specifies the types of files that the server accepts (only for type="file").
    /*	@docs: {
     *	@title: Accept
     *	@description: 
     *		Specifies the types of files that the server accepts (only for type="file").
     *		The equivalent of HTML attribute `accept`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    accept(value) {
        if (value == null) { return this.element.accept; }
    	this.element.accept = value;
    	return this;
    }

    // Specifies the character encodings that are to be used for the form submission.
    /*	@docs: {
     *	@title: Accept charset
     *	@description: 
     *		Specifies the character encodings that are to be used for the form submission.
     *		The equivalent of HTML attribute `accept_charset`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    accept_charset(value) {
        if (value == null) { return this.element.accept_charset; }
    	this.element.accept_charset = value;
    	return this;
    }

    // Specifies where to send the form-data when a form is submitted.
    /*	@docs: {
     *	@title: Action
     *	@description: 
     *		Specifies where to send the form-data when a form is submitted.
     *		The equivalent of HTML attribute `action`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    action(value) {
        if (value == null) { return this.element.action; }
    	this.element.action = value;
    	return this;
    }

    // Specifies an alternate text when the original element fails to display.
    /*	@docs: {
     *	@title: Alt
     *	@description: 
     *		Specifies an alternate text when the original element fails to display.
     *		The equivalent of HTML attribute `alt`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    alt(value) {
        if (value == null) { return this.element.alt; }
    	this.element.alt = value;
    	return this;
    }

    // Specifies that the script is executed asynchronously (only for external scripts).
    /*	@docs: {
     *	@title: Async
     *	@description: 
     *		Specifies that the script is executed asynchronously (only for external scripts).
     *		The equivalent of HTML attribute `async`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    async(value) {
        if (value == null) { return this.element.async; }
    	this.element.async = value;
    	return this;
    }

    // Specifies whether the <form> or the <input> element should have autocomplete enabled.
    /*	@docs: {
     *	@title: Auto complete
     *	@description: 
     *		Specifies whether the <form> or the <input> element should have autocomplete enabled.
     *		The equivalent of HTML attribute `autocomplete`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    auto_complete(value) {
        if (value == null) { return this.element.autocomplete; }
    	this.element.autocomplete = value;
    	return this;
    }

    // Specifies that the element should automatically get focus when the page loads.
    /*	@docs: {
     *	@title: Auto focus
     *	@description: 
     *		Specifies that the element should automatically get focus when the page loads.
     *		The equivalent of HTML attribute `autofocus`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    auto_focus(value) {
        if (value == null) { return this.element.autofocus; }
    	this.element.autofocus = value;
    	return this;
    }

    // Specifies that the audio/video will start playing as soon as it is ready.
    /*	@docs: {
     *	@title: Auto play
     *	@description: 
     *		Specifies that the audio/video will start playing as soon as it is ready.
     *		The equivalent of HTML attribute `autoplay`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    auto_play(value) {
        if (value == null) { return this.element.autoplay; }
    	this.element.autoplay = value;
    	return this;
    }

    // Specifies the character encoding.
    /*	@docs: {
     *	@title: Charset
     *	@description: 
     *		Specifies the character encoding.
     *		The equivalent of HTML attribute `charset`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    charset(value) {
        if (value == null) { return this.element.charset; }
    	this.element.charset = value;
    	return this;
    }

    // Specifies that an <input> element should be pre-selected when the page loads (for type="checkbox" or type="radio").
    /*	@docs: {
     *	@title: Checked
     *	@description: 
     *		Specifies that an <input> element should be pre-selected when the page loads (for type="checkbox" or type="radio").
     *		The equivalent of HTML attribute `checked`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    checked(value) {
        if (value == null) { return this.element.checked; }
    	this.element.checked = value;
    	return this;
    }

    // Specifies a URL which explains the quote/deleted/inserted text.
    /*	@docs: {
     *	@title: Cite
     *	@description: 
     *		Specifies a URL which explains the quote/deleted/inserted text.
     *		The equivalent of HTML attribute `cite`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    cite(value) {
        if (value == null) { return this.element.cite; }
    	this.element.cite = value;
    	return this;
    }

    // Specifies one or more classnames for an element (refers to a class in a style sheet).
    // class(value) {
    //     if (value == null) { return this.element.class; }
    // 	this.element.class = value;
    // 	return this;
    // }

    // Specifies the visible width of a text area.
    /*	@docs: {
     *	@title: Cols
     *	@description: 
     *		Specifies the visible width of a text area.
     *		The equivalent of HTML attribute `cols`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    cols(value) {
        if (value == null) { return this.element.cols; }
    	this.element.cols = value;
    	return this;
    }

    // Specifies the number of columns a table cell should span.
    /*	@docs: {
     *	@title: Colspan
     *	@description: 
     *		Specifies the number of columns a table cell should span.
     *		The equivalent of HTML attribute `colspan`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    colspan(value) {
        if (value == null) { return this.element.colspan; }
    	this.element.colspan = value;
    	return this;
    }

    // Gives the value associated with the http-equiv or name attribute.
    /*	@docs: {
     *	@title: Content
     *	@description: 
     *		Gives the value associated with the http-equiv or name attribute.
     *		The equivalent of HTML attribute `content`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    content(value) {
        if (value == null) { return this.element.content; }
    	this.element.content = value;
    	return this;
    }

    // Specifies whether the content of an element is editable or not.
    /*	@docs: {
     *	@title: Content editable
     *	@description: 
     *		Specifies whether the content of an element is editable or not.
     *		The equivalent of HTML attribute `contenteditable`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    content_editable(value) {
        if (value == null) { return this.element.contenteditable; }
    	this.element.contenteditable = value;
    	return this;
    }

    // Specifies that audio/video controls should be displayed (such as a play/pause button etc).
    /*	@docs: {
     *	@title: Controls
     *	@description: 
     *		Specifies that audio/video controls should be displayed (such as a play/pause button etc).
     *		The equivalent of HTML attribute `controls`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    controls(value) {
        if (value == null) { return this.element.controls; }
    	this.element.controls = value;
    	return this;
    }

    // Specifies the coordinates of the area.
    /*	@docs: {
     *	@title: Coords
     *	@description: 
     *		Specifies the coordinates of the area.
     *		The equivalent of HTML attribute `coords`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    coords(value) {
        if (value == null) { return this.element.coords; }
    	this.element.coords = value;
    	return this;
    }

    // Specifies the URL of the resource to be used by the object.
    /*	@docs: {
     *	@title: Data
     *	@description: 
     *		Specifies the URL of the resource to be used by the object.
     *		The equivalent of HTML attribute `data`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    data(value) {
        if (value == null) { return this.element.data; }
    	this.element.data = value;
    	return this;
    }

    // Specifies the date and time.
    /*	@docs: {
     *	@title: Datetime
     *	@description: 
     *		Specifies the date and time.
     *		The equivalent of HTML attribute `datetime`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    datetime(value) {
        if (value == null) { return this.element.datetime; }
    	this.element.datetime = value;
    	return this;
    }

    // Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate.
    /*	@docs: {
     *	@title: Default
     *	@description: 
     *		Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate.
     *		The equivalent of HTML attribute `default`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    default(value) {
        if (value == null) { return this.element.default; }
    	this.element.default = value;
    	return this;
    }

    // Specifies that the script is executed when the page has finished parsing (only for external scripts).
    /*	@docs: {
     *	@title: Defer
     *	@description: 
     *		Specifies that the script is executed when the page has finished parsing (only for external scripts).
     *		The equivalent of HTML attribute `defer`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    defer(value) {
        if (value == null) { return this.element.defer; }
    	this.element.defer = value;
    	return this;
    }

    // Specifies the text direction for the content in an element.
    /*	@docs: {
     *	@title: Dir
     *	@description: 
     *		Specifies the text direction for the content in an element.
     *		The equivalent of HTML attribute `dir`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    dir(value) {
        if (value == null) { return this.element.dir; }
    	this.element.dir = value;
    	return this;
    }

    // Specifies that the text direction will be submitted.
    /*	@docs: {
     *	@title: Dirname
     *	@description: 
     *		Specifies that the text direction will be submitted.
     *		The equivalent of HTML attribute `dirname`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    dirname(value) {
        if (value == null) { return this.element.dirname; }
    	this.element.dirname = value;
    	return this;
    }

    // Specifies that the specified element/group of elements should be disabled.
    /*	@docs: {
     *	@title: Disabled
     *	@description: 
     *		Specifies that the specified element/group of elements should be disabled.
     *		The equivalent of HTML attribute `disabled`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    disabled(value) {
        if (value == null) { return this.element.disabled; }
    	this.element.disabled = value;
    	return this;
    }

    // Specifies that the target will be downloaded when a user clicks on the hyperlink.
    /*	@docs: {
     *	@title: Download
     *	@description: 
     *		Specifies that the target will be downloaded when a user clicks on the hyperlink.
     *		The equivalent of HTML attribute `download`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    download(value) {
        if (value == null) { return this.element.download; }
    	this.element.download = value;
    	return this;
    }

    // Specifies whether an element is draggable or not.
    /*	@docs: {
     *	@title: Draggable
     *	@description: 
     *		Specifies whether an element is draggable or not.
     *		The equivalent of HTML attribute `draggable`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    draggable(value) {
        if (value == null) { return this.element.draggable; }
    	this.element.draggable = value;
    	return this;
    }

    // Specifies how the form-data should be encoded when submitting it to the server (only for method="post").
    /*	@docs: {
     *	@title: Enctype
     *	@description: 
     *		Specifies how the form-data should be encoded when submitting it to the server (only for method="post").
     *		The equivalent of HTML attribute `enctype`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    enctype(value) {
        if (value == null) { return this.element.enctype; }
    	this.element.enctype = value;
    	return this;
    }

    // Specifies which form element(s) a label/calculation is bound to.
    /*	@docs: {
     *	@title: For
     *	@description: 
     *		Specifies which form element(s) a label/calculation is bound to.
     *		The equivalent of HTML attribute `for`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    for(value) {
        if (value == null) { return this.element.for; }
    	this.element.for = value;
    	return this;
    }

    // Specifies the name of the form the element belongs to.
    /*	@docs: {
     *	@title: Form
     *	@description: 
     *		Specifies the name of the form the element belongs to.
     *		The equivalent of HTML attribute `form`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    form(value) {
        if (value == null) { return this.element.form; }
    	this.element.form = value;
    	return this;
    }

    // Specifies where to send the form-data when a form is submitted. Only for type="submit".
    /*	@docs: {
     *	@title: Form action
     *	@description: 
     *		Specifies where to send the form-data when a form is submitted. Only for type="submit".
     *		The equivalent of HTML attribute `formaction`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    form_action(value) {
        if (value == null) { return this.element.formaction; }
    	this.element.formaction = value;
    	return this;
    }

    // Specifies one or more headers cells a cell is related to.
    /*	@docs: {
     *	@title: Headers
     *	@description: 
     *		Specifies one or more headers cells a cell is related to.
     *		The equivalent of HTML attribute `headers`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    headers(value) {
        if (value == null) { return this.element.headers; }
    	this.element.headers = value;
    	return this;
    }

    // Specifies the height of the element.
    // height(value) {
    //     if (value == null) { return this.element.height; }
    // 	this.element.height = this.pad_numeric(value);
    // 	return this;
    // }

    // Specifies that an element is not yet, or is no longer, relevant.
    // hidden(value) {
    //     if (value == null) { return this.element.hidden; }
    // 	this.element.hidden = value;
    // 	return this;
    // }

    // Specifies the range that is considered to be a high value.
    /*	@docs: {
     *	@title: High
     *	@description: 
     *		Specifies the range that is considered to be a high value.
     *		The equivalent of HTML attribute `high`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    high(value) {
        if (value == null) { return this.element.high; }
    	this.element.high = value;
    	return this;
    }

    // Specifies the URL of the page the link goes to.
    /*	@docs: {
     *	@title: Href
     *	@description: 
     *		Specifies the URL of the page the link goes to.
     *		The equivalent of HTML attribute `href`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    href(value) {
        if (value == null) { return this.element.href; }
    	this.element.href = value;
    	return this;
    }

    // Specifies the language of the linked document.
    /*	@docs: {
     *	@title: Href lang
     *	@description: 
     *		Specifies the language of the linked document.
     *		The equivalent of HTML attribute `hreflang`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    href_lang(value) {
        if (value == null) { return this.element.hreflang; }
    	this.element.hreflang = value;
    	return this;
    }

    // Provides an HTTP header for the information/value of the content attribute.
    /*	@docs: {
     *	@title: Http equiv
     *	@description: 
     *		Provides an HTTP header for the information/value of the content attribute.
     *		The equivalent of HTML attribute `http_equiv`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    http_equiv(value) {
        if (value == null) { return this.element.http_equiv; }
    	this.element.http_equiv = value;
    	return this;
    }

    // Specifies a unique id for an element.
    /*	@docs: {
     *	@title: Id
     *	@description: 
     *		Specifies a unique id for an element.
     *		The equivalent of HTML attribute `id`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    id(value) {
        if (value == null) { return this.element.id; }
    	this.element.id = value;
    	return this;
    }

    // Specifies an image as a server-side image map.
    /*	@docs: {
     *	@title: Is map
     *	@description: 
     *		Specifies an image as a server-side image map.
     *		The equivalent of HTML attribute `ismap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    is_map(value) {
        if (value == null) { return this.element.ismap; }
    	this.element.ismap = value;
    	return this;
    }

    // Specifies the kind of text track.
    /*	@docs: {
     *	@title: Kind
     *	@description: 
     *		Specifies the kind of text track.
     *		The equivalent of HTML attribute `kind`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    kind(value) {
        if (value == null) { return this.element.kind; }
    	this.element.kind = value;
    	return this;
    }

    // Specifies the title of the text track.
    /*	@docs: {
     *	@title: Label
     *	@description: 
     *		Specifies the title of the text track.
     *		The equivalent of HTML attribute `label`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    label(value) {
        if (value == null) { return this.element.label; }
    	this.element.label = value;
    	return this;
    }

    // Specifies the language of the element's content.
    /*	@docs: {
     *	@title: Lang
     *	@description: 
     *		Specifies the language of the element's content.
     *		The equivalent of HTML attribute `lang`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    lang(value) {
        if (value == null) { return this.element.lang; }
    	this.element.lang = value;
    	return this;
    }

    // Refers to a <datalist> element that contains pre-defined options for an <input> element.
    /*	@docs: {
     *	@title: List
     *	@description: 
     *		Refers to a <datalist> element that contains pre-defined options for an <input> element.
     *		The equivalent of HTML attribute `list`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    list(value) {
        if (value == null) { return this.element.list; }
    	this.element.list = value;
    	return this;
    }

    // Specifies that the audio/video will start over again, every time it is finished.
    /*	@docs: {
     *	@title: Loop
     *	@description: 
     *		Specifies that the audio/video will start over again, every time it is finished.
     *		The equivalent of HTML attribute `loop`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    loop(value) {
        if (value == null) { return this.element.loop; }
    	this.element.loop = value;
    	return this;
    }

    // Specifies the range that is considered to be a low value.
    /*	@docs: {
     *	@title: Low
     *	@description: 
     *		Specifies the range that is considered to be a low value.
     *		The equivalent of HTML attribute `low`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    low(value) {
        if (value == null) { return this.element.low; }
    	this.element.low = value;
    	return this;
    }

    // Specifies the maximum value.
    /*	@docs: {
     *	@title: Max
     *	@description: 
     *		Specifies the maximum value.
     *		The equivalent of HTML attribute `max`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    max(value) {
        if (value == null) { return this.element.max; }
    	this.element.max = value;
    	return this;
    }

    // Specifies the maximum number of characters allowed in an element.
    /*	@docs: {
     *	@title: Max length
     *	@description: 
     *		Specifies the maximum number of characters allowed in an element.
     *		The equivalent of HTML attribute `maxlength`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    max_length(value) {
        if (value == null) { return this.element.maxlength; }
    	this.element.maxlength = value;
    	return this;
    }

    // Specifies what media/device the linked document is optimized for.
    // media(value) {
    //     if (value == null) { return this.element.media; }
    // 	this.element.media = value;
    // 	return this;
    // }

    // Specifies the HTTP method to use when sending form-data.
    /*	@docs: {
     *	@title: Method
     *	@description: 
     *		Specifies the HTTP method to use when sending form-data.
     *		The equivalent of HTML attribute `method`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    method(value) {
        if (value == null) { return this.element.method; }
    	this.element.method = value;
    	return this;
    }

    // Specifies a minimum value.
    /*	@docs: {
     *	@title: Min
     *	@description: 
     *		Specifies a minimum value.
     *		The equivalent of HTML attribute `min`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    min(value) {
        if (value == null) { return this.element.min; }
    	this.element.min = value;
    	return this;
    }

    // Specifies that a user can enter more than one value.
    /*	@docs: {
     *	@title: Multiple
     *	@description: 
     *		Specifies that a user can enter more than one value.
     *		The equivalent of HTML attribute `multiple`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    multiple(value) {
        if (value == null) { return this.element.multiple; }
    	this.element.multiple = value;
    	return this;
    }

    // Specifies that the audio output of the video should be muted.
    /*	@docs: {
     *	@title: Muted
     *	@description: 
     *		Specifies that the audio output of the video should be muted.
     *		The equivalent of HTML attribute `muted`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    muted(value) {
        if (value == null) { return this.element.muted; }
    	this.element.muted = value;
    	return this;
    }

    // Specifies the name of the element.
    /*	@docs: {
     *	@title: Name
     *	@description: 
     *		Specifies the name of the element.
     *		The equivalent of HTML attribute `name`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    name(value) {
        if (value == null) { return this.element.name; }
    	this.element.name = value;
    	return this;
    }

    // Specifies that the form should not be validated when submitted.
    /*	@docs: {
     *	@title: No validate
     *	@description: 
     *		Specifies that the form should not be validated when submitted.
     *		The equivalent of HTML attribute `novalidate`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    no_validate(value) {
        if (value == null) { return this.element.novalidate; }
    	this.element.novalidate = value;
    	return this;
    }

    // Specifies that the details should be visible (open) to the user.
    /*	@docs: {
     *	@title: Open
     *	@description: 
     *		Specifies that the details should be visible (open) to the user.
     *		The equivalent of HTML attribute `open`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    open(value) {
        if (value == null) { return this.element.open; }
    	this.element.open = value;
    	return this;
    }

    // Specifies what value is the optimal value for the gauge.
    /*	@docs: {
     *	@title: Optimum
     *	@description: 
     *		Specifies what value is the optimal value for the gauge.
     *		The equivalent of HTML attribute `optimum`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    optimum(value) {
        if (value == null) { return this.element.optimum; }
    	this.element.optimum = value;
    	return this;
    }

    // Specifies a regular expression that an <input> element's value is checked against.
    /*	@docs: {
     *	@title: Pattern
     *	@description: 
     *		Specifies a regular expression that an <input> element's value is checked against.
     *		The equivalent of HTML attribute `pattern`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    pattern(value) {
        if (value == null) { return this.element.pattern; }
    	this.element.pattern = value;
    	return this;
    }

    // Specifies a short hint that describes the expected value of the element.
    /*	@docs: {
     *	@title: Placeholder
     *	@description: 
     *		Specifies a short hint that describes the expected value of the element.
     *		The equivalent of HTML attribute `placeholder`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    placeholder(value) {
        if (value == null) { return this.element.placeholder; }
    	this.element.placeholder = value;
    	return this;
    }

    // Specifies an image to be shown while the video is downloading, or until the user hits the play button.
    /*	@docs: {
     *	@title: Poster
     *	@description: 
     *		Specifies an image to be shown while the video is downloading, or until the user hits the play button.
     *		The equivalent of HTML attribute `poster`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    poster(value) {
        if (value == null) { return this.element.poster; }
    	this.element.poster = value;
    	return this;
    }

    // Specifies if and how the author thinks the audio/video should be loaded when the page loads.
    /*	@docs: {
     *	@title: Preload
     *	@description: 
     *		Specifies if and how the author thinks the audio/video should be loaded when the page loads.
     *		The equivalent of HTML attribute `preload`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    preload(value) {
        if (value == null) { return this.element.preload; }
    	this.element.preload = value;
    	return this;
    }

    // Specifies that the element is read-only.
    /*	@docs: {
     *	@title: Readonly
     *	@description: 
     *		Specifies that the element is read-only.
     *		The equivalent of HTML attribute `readonly`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    readonly(value) {
        if (value == null) { return this.element.readonly; }
    	this.element.readonly = value;
    	return this;
    }

    // Specifies the relationship between the current document and the linked document.
    /*	@docs: {
     *	@title: Rel
     *	@description: 
     *		Specifies the relationship between the current document and the linked document.
     *		The equivalent of HTML attribute `rel`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    rel(value) {
        if (value == null) { return this.element.rel; }
    	this.element.rel = value;
    	return this;
    }

    // Specifies that the element must be filled out before submitting the form.
    /*	@docs: {
     *	@title: Required
     *	@description: 
     *		Specifies that the element must be filled out before submitting the form.
     *		The equivalent of HTML attribute `required`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    required(value) {
        if (value == null) { return this.element.required; }
    	this.element.required = value;
    	return this;
    }

    // Specifies that the list order should be descending (9,8,7...).
    /*	@docs: {
     *	@title: Reversed
     *	@description: 
     *		Specifies that the list order should be descending (9,8,7...).
     *		The equivalent of HTML attribute `reversed`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    reversed(value) {
        if (value == null) { return this.element.reversed; }
    	this.element.reversed = value;
    	return this;
    }

    // Specifies the visible number of lines in a text area.
    /*	@docs: {
     *	@title: Rows
     *	@description: 
     *		Specifies the visible number of lines in a text area.
     *		The equivalent of HTML attribute `rows`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    rows(value) {
        if (value == null) { return this.element.rows; }
    	this.element.rows = value;
    	return this;
    }

    // Specifies the number of rows a table cell should span.
    /*	@docs: {
     *	@title: Row span
     *	@description: 
     *		Specifies the number of rows a table cell should span.
     *		The equivalent of HTML attribute `rowspan`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    row_span(value) {
        if (value == null) { return this.element.rowspan; }
    	this.element.rowspan = value;
    	return this;
    }

    // Enables an extra set of restrictions for the content in an <iframe>.
    /*	@docs: {
     *	@title: Sandbox
     *	@description: 
     *		Enables an extra set of restrictions for the content in an <iframe>.
     *		The equivalent of HTML attribute `sandbox`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    sandbox(value) {
        if (value == null) { return this.element.sandbox; }
    	this.element.sandbox = value;
    	return this;
    }

    // Specifies whether a header cell is a header for a column, row, or group of columns or rows.
    /*	@docs: {
     *	@title: Scope
     *	@description: 
     *		Specifies whether a header cell is a header for a column, row, or group of columns or rows.
     *		The equivalent of HTML attribute `scope`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    scope(value) {
        if (value == null) { return this.element.scope; }
    	this.element.scope = value;
    	return this;
    }

    // Specifies that an option should be pre-selected when the page loads.
    /*	@docs: {
     *	@title: Selected
     *	@description: 
     *		Specifies that an option should be pre-selected when the page loads.
     *		The equivalent of HTML attribute `selected`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    selected(value) {
        if (value == null) { return this.element.selected; }
    	this.element.selected = value;
    	return this;
    }

    // Specifies the shape of the area.
    /*	@docs: {
     *	@title: Shape
     *	@description: 
     *		Specifies the shape of the area.
     *		The equivalent of HTML attribute `shape`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    shape(value) {
        if (value == null) { return this.element.shape; }
    	this.element.shape = value;
    	return this;
    }

    // Specifies the width, in characters (for <input>) or specifies the number of visible options (for <select>).
    /*	@docs: {
     *	@title: Size
     *	@description: 
     *		Specifies the width, in characters (for <input>) or specifies the number of visible options (for <select>).
     *		The equivalent of HTML attribute `size`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    size(value) {
        if (value == null) { return this.element.size; }
    	this.element.size = value;
    	return this;
    }

    // Specifies the size of the linked resource.
    /*	@docs: {
     *	@title: Sizes
     *	@description: 
     *		Specifies the size of the linked resource.
     *		The equivalent of HTML attribute `sizes`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    sizes(value) {
        if (value == null) { return this.element.sizes; }
    	this.element.sizes = value;
    	return this;
    }

    // Specifies the number of columns to span.
    /*	@docs: {
     *	@title: Span
     *	@description: 
     *		Specifies the number of columns to span.
     *		The equivalent of HTML attribute `span`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    span(value) {
        if (value == null) { return this.element.span; }
    	this.element.span = value;
    	return this;
    }

    // Specifies whether the element is to have its spelling and grammar checked or not.
    /*	@docs: {
     *	@title: Spell check
     *	@description: 
     *		Specifies whether the element is to have its spelling and grammar checked or not.
     *		The equivalent of HTML attribute `spellcheck`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    spell_check(value) {
        if (value == null) { return this.element.spellcheck; }
    	this.element.spellcheck = value;
    	return this;
    }

    // Specifies the URL of the media file.
    /*	@docs: {
     *	@title: Src
     *	@description: 
     *		Specifies the URL of the media file.
     *		The equivalent of HTML attribute `src`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    src(value) {
        if (value == null) { return this.element.src; }
    	this.element.src = value;
    	return this;
    }

    // Specifies the HTML content of the page to show in the <iframe>.
    /*	@docs: {
     *	@title: Src doc
     *	@description: 
     *		Specifies the HTML content of the page to show in the <iframe>.
     *		The equivalent of HTML attribute `srcdoc`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    src_doc(value) {
        if (value == null) { return this.element.srcdoc; }
    	this.element.srcdoc = value;
    	return this;
    }

    // Specifies the language of the track text data (required if kind="subtitles").
    /*	@docs: {
     *	@title: Src lang
     *	@description: 
     *		Specifies the language of the track text data (required if kind="subtitles").
     *		The equivalent of HTML attribute `srclang`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    src_lang(value) {
        if (value == null) { return this.element.srclang; }
    	this.element.srclang = value;
    	return this;
    }

    // Specifies the URL of the image to use in different situations.
    /*	@docs: {
     *	@title: Rrsrc set
     *	@description: 
     *		Specifies the URL of the image to use in different situations.
     *		The equivalent of HTML attribute `srcset`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    rrsrc_set(value) {
        if (value == null) { return this.element.srcset; }
    	this.element.srcset = value;
    	return this;
    }

    // Specifies the start value of an ordered list.
    /*	@docs: {
     *	@title: Start
     *	@description: 
     *		Specifies the start value of an ordered list.
     *		The equivalent of HTML attribute `start`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    start(value) {
        if (value == null) { return this.element.start; }
    	this.element.start = value;
    	return this;
    }

    // Specifies the legal number intervals for an input field.
    /*	@docs: {
     *	@title: Step
     *	@description: 
     *		Specifies the legal number intervals for an input field.
     *		The equivalent of HTML attribute `step`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    step(value) {
        if (value == null) { return this.element.step; }
    	this.element.step = value;
    	return this;
    }

    // Specifies an inline CSS style for an element.
    // style(value) {
    //     if (value == null) { return this.element.style; }
    // 	this.element.style = value;
    // 	return this;
    // }

    // Specifies the tabbing order of an element.
    /*	@docs: {
     *	@title: Tab index
     *	@description: 
     *		Specifies the tabbing order of an element.
     *		The equivalent of HTML attribute `tabindex`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    tab_index(value) {
        if (value == null) { return this.element.tabindex; }
    	this.element.tabindex = value;
    	return this;
    }

    // Specifies the target for where to open the linked document or where to submit the form.
    /*	@docs: {
     *	@title: Target
     *	@description: 
     *		Specifies the target for where to open the linked document or where to submit the form.
     *		The equivalent of HTML attribute `target`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    target(value) {
        if (value == null) { return this.element.target; }
    	this.element.target = value;
    	return this;
    }

    // Specifies extra information about an element.
    /*	@docs: {
     *	@title: Title
     *	@description: 
     *		Specifies extra information about an element.
     *		The equivalent of HTML attribute `title`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    title(value) {
        if (value == null) { return this.element.title; }
    	this.element.title = value;
    	return this;
    }

    // Specifies whether the content of an element should be translated or not.
    /*	@docs: {
     *	@title: Translate
     *	@description: 
     *		Specifies whether the content of an element should be translated or not.
     *		The equivalent of HTML attribute `translate`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    translate(value) {
        if (value == null) { return this.element.translate; }
    	this.element.translate = value;
    	return this;
    }

    // Specifies the type of element.
    /*	@docs: {
     *	@title: Type
     *	@description: 
     *		Specifies the type of element.
     *		The equivalent of HTML attribute `type`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    type(value) {
        if (value == null) { return this.element.type; }
    	this.element.type = value;
    	return this;
    }

    // Specifies an image as a client-side image map.
    /*	@docs: {
     *	@title: Use map
     *	@description: 
     *		Specifies an image as a client-side image map.
     *		The equivalent of HTML attribute `usemap`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    use_map(value) {
        if (value == null) { return this.element.usemap; }
    	this.element.usemap = value;
    	return this;
    }

    // Specifies the value of the element.
    /*	@docs: {
     *	@title: Value
     *	@description: 
     *		Specifies the value of the element.
     *		The equivalent of HTML attribute `value`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    value(value) {
        if (value == null) { return this.element.value; }
    	this.element.value = value;
    	return this;
    }

    // Specifies the width of the element.
    // width(value) {
    //     if (value == null) { return this.element.width; }
    // 	this.element.width = this.pad_numeric(value);
    // 	return this;
    // }

    // Specifies how the text in a text area is to be wrapped when submitted in a form.
    // wrap(value) {
    //     if (value == null) { return this.element.wrap; }
    // 	this.element.wrap = value;
    // 	return this;
    // }

    // Script to be run after the document is printed.
    /*	@docs: {
     *	@title: On after print
     *	@description: 
     *		Script to be run after the document is printed.
     *		The equivalent of HTML attribute `onafterprint`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_after_print(callback) {
        if (callback == null) { return this.element.onafterprint; }
    	const e = this;
    	this.element.onafterprint = () => callback(e);
    	return this;
    }

    // Script to be run before the document is printed.
    /*	@docs: {
     *	@title: On before print
     *	@description: 
     *		Script to be run before the document is printed.
     *		The equivalent of HTML attribute `onbeforeprint`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_before_print(callback) {
        if (callback == null) { return this.element.onbeforeprint; }
    	const e = this;
    	this.element.onbeforeprint = () => callback(e);
    	return this;
    }

    // Script to be run when the document is about to be unloaded.
    /*	@docs: {
     *	@title: On before unload
     *	@description: 
     *		Script to be run when the document is about to be unloaded.
     *		The equivalent of HTML attribute `onbeforeunload`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_before_unload(callback) {
        if (callback == null) { return this.element.onbeforeunload; }
    	const e = this;
    	this.element.onbeforeunload = () => callback(e);
    	return this;
    }

    // Script to be run when an error occurs.
    /*	@docs: {
     *	@title: On error
     *	@description: 
     *		Script to be run when an error occurs.
     *		The equivalent of HTML attribute `onerror`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_error(callback) {
        if (callback == null) { return this.element.onerror; }
    	const e = this;
    	this.element.onerror = () => callback(e);
    	return this;
    }

    // Script to be run when there has been changes to the anchor part of the a URL.
    /*	@docs: {
     *	@title: On hash change
     *	@description: 
     *		Script to be run when there has been changes to the anchor part of the a URL.
     *		The equivalent of HTML attribute `onhashchange`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_hash_change(callback) {
        if (callback == null) { return this.element.onhashchange; }
    	const e = this;
    	this.element.onhashchange = () => callback(e);
    	return this;
    }

    // Fires after the page is finished loading.
    /*	@docs: {
     *	@title: On load
     *	@description: 
     *		Fires after the page is finished loading.
     *		The equivalent of HTML attribute `onload`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_load(callback) {
        if (callback == null) { return this.element.onload; }
    	const e = this;
    	this.element.onload = () => callback(e);
    	return this;
    }

    // Script to be run when the message is triggered.
    /*	@docs: {
     *	@title: On message
     *	@description: 
     *		Script to be run when the message is triggered.
     *		The equivalent of HTML attribute `onmessage`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_message(callback) {
        if (callback == null) { return this.element.onmessage; }
    	const e = this;
    	this.element.onmessage = () => callback(e);
    	return this;
    }

    // Script to be run when the browser starts to work offline.
    /*	@docs: {
     *	@title: On offline
     *	@description: 
     *		Script to be run when the browser starts to work offline.
     *		The equivalent of HTML attribute `onoffline`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_offline(callback) {
        if (callback == null) { return this.element.onoffline; }
    	const e = this;
    	this.element.onoffline = () => callback(e);
    	return this;
    }

    // Script to be run when the browser starts to work online.
    /*	@docs: {
     *	@title: On online
     *	@description: 
     *		Script to be run when the browser starts to work online.
     *		The equivalent of HTML attribute `ononline`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_online(callback) {
        if (callback == null) { return this.element.ononline; }
    	const e = this;
    	this.element.ononline = () => callback(e);
    	return this;
    }

    // Script to be run when a user navigates away from a page.
    /*	@docs: {
     *	@title: On page hide
     *	@description: 
     *		Script to be run when a user navigates away from a page.
     *		The equivalent of HTML attribute `onpagehide`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_page_hide(callback) {
        if (callback == null) { return this.element.onpagehide; }
    	const e = this;
    	this.element.onpagehide = () => callback(e);
    	return this;
    }

    // Script to be run when a user navigates to a page.
    /*	@docs: {
     *	@title: On page show
     *	@description: 
     *		Script to be run when a user navigates to a page.
     *		The equivalent of HTML attribute `onpageshow`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_page_show(callback) {
        if (callback == null) { return this.element.onpageshow; }
    	const e = this;
    	this.element.onpageshow = () => callback(e);
    	return this;
    }

    // Script to be run when the window's history changes.
    /*	@docs: {
     *	@title: On popstate
     *	@description: 
     *		Script to be run when the window's history changes.
     *		The equivalent of HTML attribute `onpopstate`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_popstate(callback) {
        if (callback == null) { return this.element.onpopstate; }
    	const e = this;
    	this.element.onpopstate = () => callback(e);
    	return this;
    }

    // Fires when the browser window is resized.
    /*	@docs: {
     *	@title: On resize
     *	@description: 
     *		Fires when the browser window is resized.
     *		The equivalent of HTML attribute `onresize`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_resize(callback) {
        if (callback == null) { return this.element.onresize; }
    	const e = this;
    	this.element.onresize = () => callback(e);
    	return this;
    }

    // Script to be run when a Web Storage area is updated.
    /*	@docs: {
     *	@title: On storage
     *	@description: 
     *		Script to be run when a Web Storage area is updated.
     *		The equivalent of HTML attribute `onstorage`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_storage(callback) {
        if (callback == null) { return this.element.onstorage; }
    	const e = this;
    	this.element.onstorage = () => callback(e);
    	return this;
    }

    // Fires once a page has unloaded (or the browser window has been closed).
    /*	@docs: {
     *	@title: On unload
     *	@description: 
     *		Fires once a page has unloaded (or the browser window has been closed).
     *		The equivalent of HTML attribute `onunload`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_unload(callback) {
        if (callback == null) { return this.element.onunload; }
    	const e = this;
    	this.element.onunload = () => callback(e);
    	return this;
    }

    // Fires the moment that the element loses focus.
    /*	@docs: {
     *	@title: On blur
     *	@description: 
     *		Fires the moment that the element loses focus.
     *		The equivalent of HTML attribute `onblur`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_blur(callback) {
        if (callback == null) { return this.element.onblur; }
    	const e = this;
    	this.element.onblur = () => callback(e);
    	return this;
    }

    // Fires the moment when the value of the element is changed.
    /*	@docs: {
     *	@title: On change
     *	@description: 
     *		Fires the moment when the value of the element is changed.
     *		The equivalent of HTML attribute `onchange`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_change(callback) {
        if (callback == null) { return this.element.onchange; }
    	const e = this;
    	this.element.onchange = () => callback(e);
    	return this;
    }

    // Script to be run when a context menu is triggered.
    /*	@docs: {
     *	@title: On context menu
     *	@description: 
     *		Script to be run when a context menu is triggered.
     *		The equivalent of HTML attribute `oncontextmenu`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_context_menu(callback) {
        if (callback == null) { return this.element.oncontextmenu; }
    	const e = this;
    	this.element.oncontextmenu = () => callback(e);
    	return this;
    }

    // Fires the moment when the element gets focus.
    /*	@docs: {
     *	@title: On focus
     *	@description: 
     *		Fires the moment when the element gets focus.
     *		The equivalent of HTML attribute `onfocus`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_focus(callback) {
        if (callback == null) { return this.element.onfocus; }
    	const e = this;
    	this.element.onfocus = () => callback(e);
    	return this;
    }

    // Script to be run when an element gets user input.
    /*	@docs: {
     *	@title: On input
     *	@description: 
     *		Script to be run when an element gets user input.
     *		The equivalent of HTML attribute `oninput`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_input(callback) {
        if (callback == null) { return this.element.oninput; }
    	const e = this;
    	this.element.oninput = () => callback(e);
    	return this;
    }

    // Script to be run when an element is invalid.
    /*	@docs: {
     *	@title: On invalid
     *	@description: 
     *		Script to be run when an element is invalid.
     *		The equivalent of HTML attribute `oninvalid`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_invalid(callback) {
        if (callback == null) { return this.element.oninvalid; }
    	const e = this;
    	this.element.oninvalid = () => callback(e);
    	return this;
    }

    // Fires when the Reset button in a form is clicked.
    /*	@docs: {
     *	@title: On reset
     *	@description: 
     *		Fires when the Reset button in a form is clicked.
     *		The equivalent of HTML attribute `onreset`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_reset(callback) {
        if (callback == null) { return this.element.onreset; }
    	const e = this;
    	this.element.onreset = () => callback(e);
    	return this;
    }

    // Fires when the user writes something in a search field (for <input="search">).
    /*	@docs: {
     *	@title: On search
     *	@description: 
     *		Fires when the user writes something in a search field (for <input="search">).
     *		The equivalent of HTML attribute `onsearch`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_search(callback) {
        if (callback == null) { return this.element.onsearch; }
    	const e = this;
    	this.element.onsearch = () => callback(e);
    	return this;
    }

    // Fires after some text has been selected in an element.
    /*	@docs: {
     *	@title: On select
     *	@description: 
     *		Fires after some text has been selected in an element.
     *		The equivalent of HTML attribute `onselect`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_select(callback) {
        if (callback == null) { return this.element.onselect; }
    	const e = this;
    	this.element.onselect = () => callback(e);
    	return this;
    }

    // Fires when a form is submitted.
    /*	@docs: {
     *	@title: On submit
     *	@description: 
     *		Fires when a form is submitted.
     *		The equivalent of HTML attribute `onsubmit`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_submit(callback) {
        if (callback == null) { return this.element.onsubmit; }
    	const e = this;
    	this.element.onsubmit = () => callback(e);
    	return this;
    }

    // Fires when a user is pressing a key.
    /*	@docs: {
     *	@title: On key down
     *	@description: 
     *		Fires when a user is pressing a key.
     *		The equivalent of HTML attribute `onkeydown`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_key_down(callback) {
        if (callback == null) { return this.element.onkeydown; }
    	const e = this;
    	this.element.onkeydown = () => callback(e);
    	return this;
    }

    // Fires when a user presses a key.
    /*	@docs: {
     *	@title: On key press
     *	@description: 
     *		Fires when a user presses a key.
     *		The equivalent of HTML attribute `onkeypress`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_key_press(callback) {
        if (callback == null) { return this.element.onkeypress; }
    	const e = this;
    	this.element.onkeypress = () => callback(e);
    	return this;
    }

    // Fires when a user releases a key.
    /*	@docs: {
     *	@title: On key up
     *	@description: 
     *		Fires when a user releases a key.
     *		The equivalent of HTML attribute `onkeyup`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_key_up(callback) {
        if (callback == null) { return this.element.onkeyup; }
    	const e = this;
    	this.element.onkeyup = () => callback(e);
    	return this;
    }

    // Fires on a mouse click on the element.
    // on_click(callback) {
    //     if (callback == null) { return this.element.onclick; }
    // 	const e = this;
    // 	this.element.onclick = () => callback(e);
    // 	return this;
    // }

    // Fires on a mouse double-click on the element.
    /*	@docs: {
     *	@title: On dbl click
     *	@description: 
     *		Fires on a mouse double-click on the element.
     *		The equivalent of HTML attribute `ondblclick`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_dbl_click(callback) {
        if (callback == null) { return this.element.ondblclick; }
    	const e = this;
    	this.element.ondblclick = () => callback(e);
    	return this;
    }

    // Fires when a mouse button is pressed down on an element.
    /*	@docs: {
     *	@title: On mouse down
     *	@description: 
     *		Fires when a mouse button is pressed down on an element.
     *		The equivalent of HTML attribute `onmousedown`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_down(callback) {
        if (callback == null) { return this.element.onmousedown; }
    	const e = this;
    	this.element.onmousedown = () => callback(e);
    	return this;
    }

    // Fires when the mouse pointer is moving while it is over an element.
    /*	@docs: {
     *	@title: On mouse move
     *	@description: 
     *		Fires when the mouse pointer is moving while it is over an element.
     *		The equivalent of HTML attribute `onmousemove`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_move(callback) {
        if (callback == null) { return this.element.onmousemove; }
    	const e = this;
    	this.element.onmousemove = () => callback(e);
    	return this;
    }

    // Fires when the mouse pointer moves out of an element.
    /*	@docs: {
     *	@title: On mouse out
     *	@description: 
     *		Fires when the mouse pointer moves out of an element.
     *		The equivalent of HTML attribute `onmouseout`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_out(callback) {
        if (callback == null) { return this.element.onmouseout; }
    	const e = this;
    	this.element.onmouseout = () => callback(e);
    	return this;
    }

    // Fires when the mouse pointer moves over an element.
    /*	@docs: {
     *	@title: On mouse over
     *	@description: 
     *		Fires when the mouse pointer moves over an element.
     *		The equivalent of HTML attribute `onmouseover`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_over(callback) {
        if (callback == null) { return this.element.onmouseover; }
    	const e = this;
    	this.element.onmouseover = () => callback(e);
    	return this;
    }

    // Fires when a mouse button is released over an element.
    /*	@docs: {
     *	@title: On mouse up
     *	@description: 
     *		Fires when a mouse button is released over an element.
     *		The equivalent of HTML attribute `onmouseup`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_up(callback) {
        if (callback == null) { return this.element.onmouseup; }
    	const e = this;
    	this.element.onmouseup = () => callback(e);
    	return this;
    }

    // Deprecated. Use the onwheel attribute instead.
    /*	@docs: {
     *	@title: On mouse wheel
     *	@description: 
     *		Deprecated. Use the onwheel attribute instead.
     *		The equivalent of HTML attribute `onmousewheel`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_wheel(callback) {
        if (callback == null) { return this.element.onmousewheel; }
    	const e = this;
    	this.element.onmousewheel = () => callback(e);
    	return this;
    }

    // Fires when the mouse wheel rolls up or down over an element.
    /*	@docs: {
     *	@title: On wheel
     *	@description: 
     *		Fires when the mouse wheel rolls up or down over an element.
     *		The equivalent of HTML attribute `onwheel`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_wheel(callback) {
        if (callback == null) { return this.element.onwheel; }
    	const e = this;
    	this.element.onwheel = () => callback(e);
    	return this;
    }

    // Script to be run when an element is dragged.
    /*	@docs: {
     *	@title: On drag
     *	@description: 
     *		Script to be run when an element is dragged.
     *		The equivalent of HTML attribute `ondrag`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag(callback) {
        if (callback == null) { return this.element.ondrag; }
    	const e = this;
    	this.element.ondrag = () => callback(e);
    	return this;
    }

    // Script to be run at the end of a drag operation.
    /*	@docs: {
     *	@title: On drag end
     *	@description: 
     *		Script to be run at the end of a drag operation.
     *		The equivalent of HTML attribute `ondragend`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_end(callback) {
        if (callback == null) { return this.element.ondragend; }
    	const e = this;
    	this.element.ondragend = () => callback(e);
    	return this;
    }

    // Script to be run when an element has been dragged to a valid drop target.
    /*	@docs: {
     *	@title: On drag enter
     *	@description: 
     *		Script to be run when an element has been dragged to a valid drop target.
     *		The equivalent of HTML attribute `ondragenter`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_enter(callback) {
        if (callback == null) { return this.element.ondragenter; }
    	const e = this;
    	this.element.ondragenter = () => callback(e);
    	return this;
    }

    // Script to be run when an element leaves a valid drop target.
    /*	@docs: {
     *	@title: On drag leave
     *	@description: 
     *		Script to be run when an element leaves a valid drop target.
     *		The equivalent of HTML attribute `ondragleave`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_leave(callback) {
        if (callback == null) { return this.element.ondragleave; }
    	const e = this;
    	this.element.ondragleave = () => callback(e);
    	return this;
    }

    // Script to be run when an element is being dragged over a valid drop target.
    /*	@docs: {
     *	@title: On drag over
     *	@description: 
     *		Script to be run when an element is being dragged over a valid drop target.
     *		The equivalent of HTML attribute `ondragover`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_over(callback) {
        if (callback == null) { return this.element.ondragover; }
    	const e = this;
    	this.element.ondragover = () => callback(e);
    	return this;
    }

    // Script to be run at the start of a drag operation.
    /*	@docs: {
     *	@title: On drag start
     *	@description: 
     *		Script to be run at the start of a drag operation.
     *		The equivalent of HTML attribute `ondragstart`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_start(callback) {
        if (callback == null) { return this.element.ondragstart; }
    	const e = this;
    	this.element.ondragstart = () => callback(e);
    	return this;
    }

    // Script to be run when dragged element is being dropped.
    /*	@docs: {
     *	@title: On drop
     *	@description: 
     *		Script to be run when dragged element is being dropped.
     *		The equivalent of HTML attribute `ondrop`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drop(callback) {
        if (callback == null) { return this.element.ondrop; }
    	const e = this;
    	this.element.ondrop = () => callback(e);
    	return this;
    }

    // Script to be run when an element's scrollbar is being scrolled.
    /*	@docs: {
     *	@title: On scroll
     *	@description: 
     *		Script to be run when an element's scrollbar is being scrolled.
     *		The equivalent of HTML attribute `onscroll`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_scroll(callback) {
        if (callback == null) { return this.element.onscroll; }
    	const e = this;
    	this.element.onscroll = () => callback(e);
    	return this;
    }

    // Fires when the user copies the content of an element.
    /*	@docs: {
     *	@title: On copy
     *	@description: 
     *		Fires when the user copies the content of an element.
     *		The equivalent of HTML attribute `oncopy`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_copy(callback) {
        if (callback == null) { return this.element.oncopy; }
    	const e = this;
    	this.element.oncopy = () => callback(e);
    	return this;
    }

    // Fires when the user cuts the content of an element.
    /*	@docs: {
     *	@title: On cut
     *	@description: 
     *		Fires when the user cuts the content of an element.
     *		The equivalent of HTML attribute `oncut`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_cut(callback) {
        if (callback == null) { return this.element.oncut; }
    	const e = this;
    	this.element.oncut = () => callback(e);
    	return this;
    }

    // Fires when the user pastes some content in an element.
    /*	@docs: {
     *	@title: On paste
     *	@description: 
     *		Fires when the user pastes some content in an element.
     *		The equivalent of HTML attribute `onpaste`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_paste(callback) {
        if (callback == null) { return this.element.onpaste; }
    	const e = this;
    	this.element.onpaste = () => callback(e);
    	return this;
    }

    // Script to be run on abort.
    /*	@docs: {
     *	@title: On abort
     *	@description: 
     *		Script to be run on abort.
     *		The equivalent of HTML attribute `onabort`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_abort(callback) {
        if (callback == null) { return this.element.onabort; }
    	const e = this;
    	this.element.onabort = () => callback(e);
    	return this;
    }

    // Script to be run when a file is ready to start playing (when it has buffered enough to begin).
    /*	@docs: {
     *	@title: On canplay
     *	@description: 
     *		Script to be run when a file is ready to start playing (when it has buffered enough to begin).
     *		The equivalent of HTML attribute `oncanplay`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_canplay(callback) {
        if (callback == null) { return this.element.oncanplay; }
    	const e = this;
    	this.element.oncanplay = () => callback(e);
    	return this;
    }

    // Script to be run when a file can be played all the way to the end without pausing for buffering.
    /*	@docs: {
     *	@title: On canplay through
     *	@description: 
     *		Script to be run when a file can be played all the way to the end without pausing for buffering.
     *		The equivalent of HTML attribute `oncanplaythrough`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_canplay_through(callback) {
        if (callback == null) { return this.element.oncanplaythrough; }
    	const e = this;
    	this.element.oncanplaythrough = () => callback(e);
    	return this;
    }

    // Script to be run when the cue changes in a <track> element.
    /*	@docs: {
     *	@title: On cue change
     *	@description: 
     *		Script to be run when the cue changes in a <track> element.
     *		The equivalent of HTML attribute `oncuechange`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_cue_change(callback) {
        if (callback == null) { return this.element.oncuechange; }
    	const e = this;
    	this.element.oncuechange = () => callback(e);
    	return this;
    }

    // Script to be run when the length of the media changes.
    /*	@docs: {
     *	@title: On duration change
     *	@description: 
     *		Script to be run when the length of the media changes.
     *		The equivalent of HTML attribute `ondurationchange`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_duration_change(callback) {
        if (callback == null) { return this.element.ondurationchange; }
    	const e = this;
    	this.element.ondurationchange = () => callback(e);
    	return this;
    }

    // Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects).
    /*	@docs: {
     *	@title: On emptied
     *	@description: 
     *		Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects).
     *		The equivalent of HTML attribute `onemptied`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_emptied(callback) {
        if (callback == null) { return this.element.onemptied; }
    	const e = this;
    	this.element.onemptied = () => callback(e);
    	return this;
    }

    // Script to be run when the media has reach the end (a useful event for messages like "thanks for listening").
    /*	@docs: {
     *	@title: On ended
     *	@description: 
     *		Script to be run when the media has reach the end (a useful event for messages like "thanks for listening").
     *		The equivalent of HTML attribute `onended`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_ended(callback) {
        if (callback == null) { return this.element.onended; }
    	const e = this;
    	this.element.onended = () => callback(e);
    	return this;
    }

    // Script to be run when an error occurs when the file is being loaded.
    /*	@docs: {
     *	@title: On error
     *	@description: 
     *		Script to be run when an error occurs when the file is being loaded.
     *		The equivalent of HTML attribute `onerror`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_error(callback) {
        if (callback == null) { return this.element.onerror; }
    	const e = this;
    	this.element.onerror = () => callback(e);
    	return this;
    }

    // Script to be run when media data is loaded.
    /*	@docs: {
     *	@title: On loaded data
     *	@description: 
     *		Script to be run when media data is loaded.
     *		The equivalent of HTML attribute `onloadeddata`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_loaded_data(callback) {
        if (callback == null) { return this.element.onloadeddata; }
    	const e = this;
    	this.element.onloadeddata = () => callback(e);
    	return this;
    }

    // Script to be run when meta data (like dimensions and duration) are loaded.
    /*	@docs: {
     *	@title: On loaded metadata
     *	@description: 
     *		Script to be run when meta data (like dimensions and duration) are loaded.
     *		The equivalent of HTML attribute `onloadedmetadata`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_loaded_metadata(callback) {
        if (callback == null) { return this.element.onloadedmetadata; }
    	const e = this;
    	this.element.onloadedmetadata = () => callback(e);
    	return this;
    }

    // Script to be run just as the file begins to load before anything is actually loaded.
    /*	@docs: {
     *	@title: On load start
     *	@description: 
     *		Script to be run just as the file begins to load before anything is actually loaded.
     *		The equivalent of HTML attribute `onloadstart`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_load_start(callback) {
        if (callback == null) { return this.element.onloadstart; }
    	const e = this;
    	this.element.onloadstart = () => callback(e);
    	return this;
    }

    // Script to be run when the media is paused either by the user or programmatically.
    /*	@docs: {
     *	@title: On pause
     *	@description: 
     *		Script to be run when the media is paused either by the user or programmatically.
     *		The equivalent of HTML attribute `onpause`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_pause(callback) {
        if (callback == null) { return this.element.onpause; }
    	const e = this;
    	this.element.onpause = () => callback(e);
    	return this;
    }

    // Script to be run when the media is ready to start playing.
    /*	@docs: {
     *	@title: On play
     *	@description: 
     *		Script to be run when the media is ready to start playing.
     *		The equivalent of HTML attribute `onplay`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_play(callback) {
        if (callback == null) { return this.element.onplay; }
    	const e = this;
    	this.element.onplay = () => callback(e);
    	return this;
    }

    // Script to be run when the media actually has started playing.
    /*	@docs: {
     *	@title: On playing
     *	@description: 
     *		Script to be run when the media actually has started playing.
     *		The equivalent of HTML attribute `onplaying`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_playing(callback) {
        if (callback == null) { return this.element.onplaying; }
    	const e = this;
    	this.element.onplaying = () => callback(e);
    	return this;
    }

    // Script to be run when the browser is in the process of getting the media data.
    /*	@docs: {
     *	@title: Onprogress
     *	@description: 
     *		Script to be run when the browser is in the process of getting the media data.
     *		The equivalent of HTML attribute `onprogress`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    onprogress(callback) {
        if (callback == null) { return this.element.onprogress; }
    	const e = this;
    	this.element.onprogress = () => callback(e);
    	return this;
    }

    // Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode).
    /*	@docs: {
     *	@title: On rate change
     *	@description: 
     *		Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode).
     *		The equivalent of HTML attribute `onratechange`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_rate_change(callback) {
        if (callback == null) { return this.element.onratechange; }
    	const e = this;
    	this.element.onratechange = () => callback(e);
    	return this;
    }

    // Script to be run when the seeking attribute is set to false indicating that seeking has ended.
    /*	@docs: {
     *	@title: On seeked
     *	@description: 
     *		Script to be run when the seeking attribute is set to false indicating that seeking has ended.
     *		The equivalent of HTML attribute `onseeked`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_seeked(callback) {
        if (callback == null) { return this.element.onseeked; }
    	const e = this;
    	this.element.onseeked = () => callback(e);
    	return this;
    }

    // Script to be run when the seeking attribute is set to true indicating that seeking is active.
    /*	@docs: {
     *	@title: On seeking
     *	@description: 
     *		Script to be run when the seeking attribute is set to true indicating that seeking is active.
     *		The equivalent of HTML attribute `onseeking`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_seeking(callback) {
        if (callback == null) { return this.element.onseeking; }
    	const e = this;
    	this.element.onseeking = () => callback(e);
    	return this;
    }

    // Script to be run when the browser is unable to fetch the media data for whatever reason.
    /*	@docs: {
     *	@title: On stalled
     *	@description: 
     *		Script to be run when the browser is unable to fetch the media data for whatever reason.
     *		The equivalent of HTML attribute `onstalled`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_stalled(callback) {
        if (callback == null) { return this.element.onstalled; }
    	const e = this;
    	this.element.onstalled = () => callback(e);
    	return this;
    }

    // Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason.
    /*	@docs: {
     *	@title: On suspend
     *	@description: 
     *		Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason.
     *		The equivalent of HTML attribute `onsuspend`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_suspend(callback) {
        if (callback == null) { return this.element.onsuspend; }
    	const e = this;
    	this.element.onsuspend = () => callback(e);
    	return this;
    }

    // Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media).
    /*	@docs: {
     *	@title: On time update
     *	@description: 
     *		Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media).
     *		The equivalent of HTML attribute `ontimeupdate`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_time_update(callback) {
        if (callback == null) { return this.element.ontimeupdate; }
    	const e = this;
    	this.element.ontimeupdate = () => callback(e);
    	return this;
    }

    // Script to be run each time the volume is changed which (includes setting the volume to "mute").
    /*	@docs: {
     *	@title: On volume change
     *	@description: 
     *		Script to be run each time the volume is changed which (includes setting the volume to "mute").
     *		The equivalent of HTML attribute `onvolumechange`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_volume_change(callback) {
        if (callback == null) { return this.element.onvolumechange; }
    	const e = this;
    	this.element.onvolumechange = () => callback(e);
    	return this;
    }

    // Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data).
    /*	@docs: {
     *	@title: On waiting
     *	@description: 
     *		Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data).
     *		The equivalent of HTML attribute `onwaiting`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_waiting(callback) {
        if (callback == null) { return this.element.onwaiting; }
    	const e = this;
    	this.element.onwaiting = () => callback(e);
    	return this;
    }

    // Fires when the user opens or closes the <details> element.
    /*	@docs: {
     *	@title: On toggle
     *	@description: 
     *		Fires when the user opens or closes the <details> element.
     *		The equivalent of HTML attribute `ontoggle`.
     *		
     *		The first parameter of the callback is the `Element` object.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_toggle(callback) {
        if (callback == null) { return this.element.ontoggle; }
    	const e = this;
    	this.element.ontoggle = () => callback(e);
    	return this;
    }

};
