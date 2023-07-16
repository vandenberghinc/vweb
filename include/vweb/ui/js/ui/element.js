/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Element.
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
		if (children.length === 0) {
			return this;
		}
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child) {

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

				// Node element.
				else if (child instanceof Node) {
					this.element.appendChild(child);
				}

				// Execute function.
				else if (vweb.utils.is_func(child)) {
					child();
				}

			}
		}
		return this;
	}
	zstack_append(...children) {
		if (children.length === 0) {
			return this;
		}
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child) {

				// VWeb element.
				if (child.element != null) {
					child.element.style.position = "absolute";
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

				// Node element.
				else if (child instanceof Node) {
					child.element.style.position = "absolute";
					this.element.appendChild(child);
				}

				// Execute function.
				else if (vweb.utils.is_func(child)) {
					child();
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
	width(value) {
		if (value == null) {
			return this.element.offsetWidth;
		}
		if (Element.elements_with_width_attribute.includes(this.element_tag)) {
			this.element.width = value;
		} else {
			this.element.style.width = this.pad_numeric(value);
		}
		return this;
	}
	height(value) {
		if (value == null) {
			return this.element.offsetHeight;
		}
		if (Element.elements_with_width_attribute.includes(this.element_tag)) {
			this.element.height = value;
		} else {
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
		if (values.length === 1) {
			this.element.style.padding = this.pad_numeric(values[0]);
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
		if (values.length === 1) {
			this.element.style.margin = this.pad_numeric(values[0]);
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
		if (values.length === 1) {
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
				this.element.style.justifyContent = value;
				return this;
			case "VStack":
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
				this.element.style.alignItems = value;
				return this;
			case "VStack":
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
     *	@name: Color
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
     *	}: 
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
    hidden(...args) {
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
					const key = this.element.style[property];
					const value = this.element.style[key];
					if (key !== '' && key !== undefined && typeof key !== 'function' &&
						value !== '' && value !== undefined && typeof value !== 'function') {
						dict[key] = value;
					}
				}
			}
			return dict;
		}
		for (let i in css_attr) {
			const value = css_attr[i];
			if (i == "display" && value != null && value != "none") {
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
			this.element[i] = i[html_events];
		}
		return this;
	}

	// Specifies one or more classnames for an element (refers to a class in a style sheet).
    /*	@docs: {
     *	@name: Class
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
     *	}: 
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
		options = {duration: 300, easing: "ease-in-out"},
		on_finish = null,
	}) {
		const animation = this.element.animate(keyframes, options);
		if (on_finish !== null) {
			const e = this;
			animation.onfinish = function() {
				on_finish(e);
			}
		}
		return this;
	}

	// ---------------------------------------------------------
	// Events.

	// Script to be run when the element is being clicked
    on_click(value) {
    	this.element.style.cursor = "pointer";
    	this.element.onclick = value;
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
     *	@name: Accent color
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
     *	@name: Align content
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
        return this;
    }

    // Specifies the alignment for items inside a flexible container.
    /*	@docs: {
     *	@name: Align items
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
        return this;
    }

    // Specifies the alignment for selected items inside a flexible container.
    /*	@docs: {
     *	@name: Align self
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
        return this;
    }

    // Resets all properties (except unicode-bidi and direction).
    /*	@docs: {
     *	@name: All
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
     *	@name: Animation
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
        return this;
    }

    // Specifies a delay for the start of an animation.
    /*	@docs: {
     *	@name: Animation delay
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
        return this;
    }

    // Specifies whether an animation should be played forwards, backwards or in alternate cycles.
    /*	@docs: {
     *	@name: Animation direction
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
        return this;
    }

    // Specifies how long an animation should take to complete one cycle.
    /*	@docs: {
     *	@name: Animation duration
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
        return this;
    }

    // Specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
    /*	@docs: {
     *	@name: Animation fill mode
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
        return this;
    }

    // Specifies the number of times an animation should be played.
    /*	@docs: {
     *	@name: Animation iteration count
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
        return this;
    }

    // Specifies a name for the @keyframes animation.
    /*	@docs: {
     *	@name: Animation name
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
        return this;
    }

    // Specifies whether the animation is running or paused.
    /*	@docs: {
     *	@name: Animation play state
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
        return this;
    }

    // Specifies the speed curve of an animation.
    /*	@docs: {
     *	@name: Animation timing function
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
        return this;
    }

    // Specifies preferred aspect ratio of an element.
    /*	@docs: {
     *	@name: Aspect ratio
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
     *	@name: Backdrop filter
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
     *	@name: Backface visibility
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
        return this;
    }

    // A shorthand property for all the background-* properties.
    /*	@docs: {
     *	@name: Background
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
     *	@name: Background attachment
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
     *	@name: Background blend mode
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
     *	@name: Background clip
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
        return this;
    }

    // Specifies the background color of an element.
    /*	@docs: {
     *	@name: Background color
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
     *	@name: Background image
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
     *	@name: Background origin
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
        return this;
    }

    // Specifies the position of a background image.
    /*	@docs: {
     *	@name: Background position
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
     *	@name: Background position x
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
     *	@name: Background position y
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
     *	@name: Background repeat
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
     *	@name: Background size
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
        return this;
    }

    // Specifies the size of an element in block direction.
    /*	@docs: {
     *	@name: Block size
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
     *	@name: Border block
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
     *	@name: Border block color
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
     *	@name: Border block end color
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
     *	@name: Border block end style
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
     *	@name: Border block end width
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
     *	@name: Border block start color
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
     *	@name: Border block start style
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
     *	@name: Border block start width
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
     *	@name: Border block style
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
     *	@name: Border block width
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
     *	@name: Border bottom
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
     *	@name: Border bottom color
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
     *	@name: Border bottom left radius
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
     *	@name: Border bottom right radius
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
     *	@name: Border bottom style
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
     *	@name: Border bottom width
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
     *	@name: Border collapse
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
     *	@name: Border color
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
     *	@name: Border image
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
        return this;
    }

    // Specifies the amount by which the border image area extends beyond the border box.
    /*	@docs: {
     *	@name: Border image outset
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
     *	@name: Border image repeat
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
     *	@name: Border image slice
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
     *	@name: Border image source
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
     *	@name: Border image width
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
     *	@name: Border inline
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
     *	@name: Border inline color
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
     *	@name: Border inline end color
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
     *	@name: Border inline end style
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
     *	@name: Border inline end width
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
     *	@name: Border inline start color
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
     *	@name: Border inline start style
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
     *	@name: Border inline start width
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
     *	@name: Border inline style
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
     *	@name: Border inline width
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
     *	@name: Border left
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
     *	@name: Border left color
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
     *	@name: Border left style
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
     *	@name: Border left width
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
     *	@name: Border radius
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
        return this;
    }

    // A shorthand property for all the border-right-* properties.
    /*	@docs: {
     *	@name: Border right
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
     *	@name: Border right color
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
     *	@name: Border right style
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
     *	@name: Border right width
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
     *	@name: Border spacing
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
     *	@name: Border style
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
     *	@name: Border top
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
     *	@name: Border top color
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
     *	@name: Border top left radius
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
     *	@name: Border top right radius
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
     *	@name: Border top style
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
     *	@name: Border top width
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
     *	@name: Border width
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
     *	@name: Bottom
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
     *	@name: Box decoration break
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
     *	@name: Box reflect
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
     *	@name: Box shadow
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
        return this;
    }

    // Defines how the width and height of an element are calculated: should they include padding and borders, or not.
    /*	@docs: {
     *	@name: Box sizing
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
        return this;
    }

    // Specifies whether or not a page-, column-, or region-break should occur after the specified element.
    /*	@docs: {
     *	@name: Break after
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
     *	@name: Break before
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
     *	@name: Break inside
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
     *	@name: Caption side
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
     *	@name: Caret color
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
     *	@name: Clear
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
     *	@name: Clip
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
     *	@name: Column count
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
        return this;
    }

    // Specifies how to fill columns, balanced or not.
    /*	@docs: {
     *	@name: Column fill
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
     *	@name: Column gap
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
        return this;
    }

    // A shorthand property for all the column-rule-* properties.
    /*	@docs: {
     *	@name: Column rule
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
        return this;
    }

    // Specifies the color of the rule between columns.
    /*	@docs: {
     *	@name: Column rule color
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
        return this;
    }

    // Specifies the style of the rule between columns.
    /*	@docs: {
     *	@name: Column rule style
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
        return this;
    }

    // Specifies the width of the rule between columns.
    /*	@docs: {
     *	@name: Column rule width
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
        return this;
    }

    // Specifies how many columns an element should span across.
    /*	@docs: {
     *	@name: Column span
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
     *	@name: Column width
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
        return this;
    }

    // A shorthand property for column-width and column-count.
    /*	@docs: {
     *	@name: Columns
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
     *	@name: Content
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
     *	@name: Counter increment
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
     *	@name: Counter reset
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
     *	@name: Cursor
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
     *	@name: Direction
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
     *	@name: Empty cells
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
     *	@name: Filter
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
        return this;
    }

    // A shorthand property for the flex-grow, flex-shrink, and the flex-basis properties.
    /*	@docs: {
     *	@name: Flex
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
        return this;
    }

    // Specifies the initial length of a flexible item.
    /*	@docs: {
     *	@name: Flex basis
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
        return this;
    }

    // Specifies the direction of the flexible items.
    /*	@docs: {
     *	@name: Flex direction
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
        return this;
    }

    // A shorthand property for the flex-direction and the flex-wrap properties.
    /*	@docs: {
     *	@name: Flex flow
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
        return this;
    }

    // Specifies how much the item will grow relative to the rest.
    /*	@docs: {
     *	@name: Flex grow
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
        return this;
    }

    // Specifies how the item will shrink relative to the rest.
    /*	@docs: {
     *	@name: Flex shrink
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
        return this;
    }

    // Specifies whether the flexible items should wrap or not.
    /*	@docs: {
     *	@name: Flex wrap
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
        return this;
    }

    // Specifies whether an element should float to the left, right, or not at all.
    /*	@docs: {
     *	@name: Float
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
     *	@name: Font
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
     *	@name: Font family
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
     *	@name: Font feature settings
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
     *	@name: Font kerning
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
     *	@name: Font language override
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
     *	@name: Font size
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
     *	@name: Font size adjust
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
     *	@name: Font stretch
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
     *	@name: Font style
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
     *	@name: Font synthesis
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
     *	@name: Font variant
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
     *	@name: Font variant alternates
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
     *	@name: Font variant caps
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
     *	@name: Font variant east asian
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
     *	@name: Font variant ligatures
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
     *	@name: Font variant numeric
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
     *	@name: Font variant position
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
     *	@name: Font weight
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
     *	@name: Gap
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
     *	@name: Grid
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
     *	@name: Grid area
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
     *	@name: Grid auto columns
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
     *	@name: Grid auto flow
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
     *	@name: Grid auto rows
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
     *	@name: Grid column
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
     *	@name: Grid column end
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
     *	@name: Grid column gap
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
     *	@name: Grid column start
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
     *	@name: Grid gap
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
     *	@name: Grid row
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
     *	@name: Grid row end
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
     *	@name: Grid row gap
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
     *	@name: Grid row start
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
     *	@name: Grid template
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
     *	@name: Grid template areas
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
     *	@name: Grid template columns
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
     *	@name: Grid template rows
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
     *	@name: Hanging punctuation
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
     *	@name: Hyphens
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
     *	@name: Image rendering
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
     *	@name: Inline size
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
     *	@name: Inset
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
     *	@name: Inset block
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
     *	@name: Inset block end
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
     *	@name: Inset block start
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
     *	@name: Inset inline
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
     *	@name: Inset inline end
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
     *	@name: Inset inline start
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
     *	@name: Isolation
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
     *	@name: Justify content
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
        return this;
    }

    // Is set on the grid container. Specifies the alignment of grid items in the inline direction.
    /*	@docs: {
     *	@name: Justify items
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
     *	@name: Justify self
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
     *	@name: Left
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
     *	@name: Letter spacing
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
     *	@name: Line break
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
     *	@name: Line height
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
     *	@name: List style
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
     *	@name: List style image
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
     *	@name: List style position
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
     *	@name: List style type
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
     *	@name: Margin block
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
     *	@name: Margin block end
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
     *	@name: Margin block start
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
     *	@name: Margin bottom
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
     *	@name: Margin inline
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
     *	@name: Margin inline end
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
     *	@name: Margin inline start
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
     *	@name: Margin left
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
     *	@name: Margin right
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
     *	@name: Margin top
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
     *	@name: Mask
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
        return this;
    }

    // Specifies the mask area.
    /*	@docs: {
     *	@name: Mask clip
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
     *	@name: Mask composite
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
        return this;
    }

    // Specifies an image to be used as a mask layer for an element.
    /*	@docs: {
     *	@name: Mask image
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
     *	@name: Mask mode
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
     *	@name: Mask origin
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
     *	@name: Mask position
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
     *	@name: Mask repeat
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
     *	@name: Mask size
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
     *	@name: Mask type
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
     *	@name: Max height
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
     *	@name: Max width
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
     *	@name: Max block size
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
     *	@name: Max inline size
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
     *	@name: Min block size
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
     *	@name: Min inline size
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
     *	@name: Min height
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
     *	@name: Min width
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
     *	@name: Mix blend mode
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
     *	@name: Object fit
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
     *	@name: Object position
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
     *	@name: Offset
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
     *	@name: Offset anchor
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
     *	@name: Offset distance
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
     *	@name: Offset path
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
     *	@name: Offset rotate
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
     *	@name: Opacity
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
     *	@name: Order
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
        return this;
    }

    // Sets the minimum number of lines that must be left at the bottom of a page or column.
    /*	@docs: {
     *	@name: Orphans
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
     *	@name: Outline
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
     *	@name: Outline color
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
     *	@name: Outline offset
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
     *	@name: Outline style
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
     *	@name: Outline width
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
     *	@name: Overflow
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
     *	@name: Overflow anchor
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
     *	@name: Overflow wrap
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
     *	@name: Overflow x
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
     *	@name: Overflow y
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
     *	@name: Overscroll behavior
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
     *	@name: Overscroll behavior block
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
     *	@name: Overscroll behavior inline
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
     *	@name: Overscroll behavior x
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
     *	@name: Overscroll behavior y
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
     *	@name: Padding block
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
     *	@name: Padding block end
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
     *	@name: Padding block start
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
     *	@name: Padding bottom
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
     *	@name: Padding inline
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
     *	@name: Padding inline end
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
     *	@name: Padding inline start
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
     *	@name: Padding left
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
     *	@name: Padding right
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
     *	@name: Padding top
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
     *	@name: Page break after
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
     *	@name: Page break before
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
     *	@name: Page break inside
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
     *	@name: Paint order
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
     *	@name: Perspective
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
        return this;
    }

    // Defines at which position the user is looking at the 3D-positioned element.
    /*	@docs: {
     *	@name: Perspective origin
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
        return this;
    }

    // Specifies align-content and justify-content property values for flexbox and grid layouts.
    /*	@docs: {
     *	@name: Place content
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
     *	@name: Place items
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
     *	@name: Place self
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
     *	@name: Pointer events
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
     *	@name: Quotes
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
     *	@name: Resize
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
     *	@name: Right
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
     *	@name: Rotate
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
     *	@name: Row gap
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
     *	@name: Scale
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
     *	@name: Scroll behavior
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
     *	@name: Scroll margin
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
     *	@name: Scroll margin block
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
     *	@name: Scroll margin block end
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
     *	@name: Scroll margin block start
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
     *	@name: Scroll margin bottom
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
     *	@name: Scroll margin inline
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
     *	@name: Scroll margin inline end
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
     *	@name: Scroll margin inline start
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
     *	@name: Scroll margin left
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
     *	@name: Scroll margin right
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
     *	@name: Scroll margin top
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
     *	@name: Scroll padding
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
     *	@name: Scroll padding block
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
     *	@name: Scroll padding block end
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
     *	@name: Scroll padding block start
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
     *	@name: Scroll padding bottom
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
     *	@name: Scroll padding inline
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
     *	@name: Scroll padding inline end
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
     *	@name: Scroll padding inline start
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
     *	@name: Scroll padding left
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
     *	@name: Scroll padding right
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
     *	@name: Scroll padding top
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
     *	@name: Scroll snap align
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
     *	@name: Scroll snap stop
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
     *	@name: Scroll snap type
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
     *	@name: Scrollbar color
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
     *	@name: Tab size
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
     *	@name: Table layout
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
     *	@name: Text align
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
     *	@name: Text align last
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
     *	@name: Text combine upright
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
     *	@name: Text decoration
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
     *	@name: Text decoration color
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
     *	@name: Text decoration line
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
     *	@name: Text decoration style
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
     *	@name: Text decoration thickness
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
     *	@name: Text emphasis
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
     *	@name: Text indent
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
     *	@name: Text justify
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
     *	@name: Text orientation
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
     *	@name: Text overflow
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
     *	@name: Text shadow
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
     *	@name: Text transform
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
     *	@name: Text underline position
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
     *	@name: Top
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
     *	@name: Transform
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
        return this;
    }

    // Allows you to change the position on transformed elements.
    /*	@docs: {
     *	@name: Transform origin
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
        return this;
    }

    // Specifies how nested elements are rendered in 3D space.
    /*	@docs: {
     *	@name: Transform style
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
        return this;
    }

    // A shorthand property for all the transition-* properties.
    /*	@docs: {
     *	@name: Transition
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
        return this;
    }

    // Specifies when the transition effect will start.
    /*	@docs: {
     *	@name: Transition delay
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
        return this;
    }

    // Specifies how many seconds or milliseconds a transition effect takes to complete.
    /*	@docs: {
     *	@name: Transition duration
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
        return this;
    }

    // Specifies the name of the CSS property the transition effect is for.
    /*	@docs: {
     *	@name: Transition property
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
        return this;
    }

    // Specifies the speed curve of the transition effect.
    /*	@docs: {
     *	@name: Transition timing function
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
        return this;
    }

    // Specifies the position of an element.
    /*	@docs: {
     *	@name: Translate
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
     *	@name: Unicode bidi
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
     *	@name: User select
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
     *	@name: Visibility
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
     *	@name: White space
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
     *	@name: Widows
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
     *	@name: Word break
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
     *	@name: Word spacing
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
     *	@name: Word wrap
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
     *	@name: Writing mode
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
     *	@name: Accept
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
     *	@name: Accept charset
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
     *	@name: Action
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
     *	@name: Alt
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
     *	@name: Async
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
     *	@name: Auto complete
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
     *	@name: Auto focus
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
     *	@name: Auto play
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
     *	@name: Charset
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
     *	@name: Checked
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
     *	@name: Cite
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
    /*	@docs: {
     *	@name: Class
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
     *	}: 
     *	@inherit: false
     } */ 
    // class(value) {
    //     if (value == null) { return this.element.class; }
    // 	this.element.className = value;
    // 	return this;
    // }

    // Specifies the visible width of a text area.
    /*	@docs: {
     *	@name: Cols
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
     *	@name: Colspan
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
     *	@name: Content
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
     *	@name: Content editable
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
     *	@name: Controls
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
     *	@name: Coords
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
     *	@name: Data
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
     *	@name: Datetime
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
     *	@name: Default
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
     *	@name: Defer
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
     *	@name: Dir
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
     *	@name: Dirname
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
     *	@name: Disabled
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
     *	@name: Download
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
     *	@name: Draggable
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
     *	@name: Enctype
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
     *	@name: For
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
     *	@name: Form
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
     *	@name: Form action
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
     *	@name: Headers
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
     *	@name: High
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
     *	@name: Href
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
     *	@name: Href lang
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
     *	@name: Http equiv
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
     *	@name: Id
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
     *	@name: Is map
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
     *	@name: Kind
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
     *	@name: Label
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
     *	@name: Lang
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
     *	@name: List
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
     *	@name: Loop
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
     *	@name: Low
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
     *	@name: Max
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
     *	@name: Max length
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
     *	@name: Method
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
     *	@name: Min
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
     *	@name: Multiple
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
     *	@name: Muted
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
     *	@name: Name
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
     *	@name: No validate
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

    // Script to be run on abort.
    /*	@docs: {
     *	@name: On abort
     *	@description: 
     *		Script to be run on abort.
     *		The equivalent of HTML attribute `onabort`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_abort(value) {
        if (value == null) { return this.element.onabort; }
    	this.element.onabort = value;
    	return this;
    }

    // Script to be run after the document is printed.
    /*	@docs: {
     *	@name: On after print
     *	@description: 
     *		Script to be run after the document is printed.
     *		The equivalent of HTML attribute `onafterprint`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_after_print(value) {
        if (value == null) { return this.element.onafterprint; }
    	this.element.onafterprint = value;
    	return this;
    }

    // Script to be run before the document is printed.
    /*	@docs: {
     *	@name: On before print
     *	@description: 
     *		Script to be run before the document is printed.
     *		The equivalent of HTML attribute `onbeforeprint`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_before_print(value) {
        if (value == null) { return this.element.onbeforeprint; }
    	this.element.onbeforeprint = value;
    	return this;
    }

    // Script to be run when the document is about to be unloaded.
    /*	@docs: {
     *	@name: On before unload
     *	@description: 
     *		Script to be run when the document is about to be unloaded.
     *		The equivalent of HTML attribute `onbeforeunload`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_before_unload(value) {
        if (value == null) { return this.element.onbeforeunload; }
    	this.element.onbeforeunload = value;
    	return this;
    }

    // Script to be run when the element loses focus.
    /*	@docs: {
     *	@name: On blur
     *	@description: 
     *		Script to be run when the element loses focus.
     *		The equivalent of HTML attribute `onblur`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_blur(value) {
        if (value == null) { return this.element.onblur; }
    	this.element.onblur = value;
    	return this;
    }

    // Script to be run when a file is ready to start playing (when it has buffered enough to begin).
    /*	@docs: {
     *	@name: On canplay
     *	@description: 
     *		Script to be run when a file is ready to start playing (when it has buffered enough to begin).
     *		The equivalent of HTML attribute `oncanplay`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_canplay(value) {
        if (value == null) { return this.element.oncanplay; }
    	this.element.oncanplay = value;
    	return this;
    }

    // Script to be run when a file can be played all the way to the end without pausing for buffering.
    /*	@docs: {
     *	@name: On canplay through
     *	@description: 
     *		Script to be run when a file can be played all the way to the end without pausing for buffering.
     *		The equivalent of HTML attribute `oncanplaythrough`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_canplay_through(value) {
        if (value == null) { return this.element.oncanplaythrough; }
    	this.element.oncanplaythrough = value;
    	return this;
    }

    // Script to be run when the value of the element is changed.
    /*	@docs: {
     *	@name: On change
     *	@description: 
     *		Script to be run when the value of the element is changed.
     *		The equivalent of HTML attribute `onchange`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_change(value) {
        if (value == null) { return this.element.onchange; }
    	this.element.onchange = value;
    	return this;
    }

    // Script to be run when the element is being clicked.
    // on_click(value) {
    //     if (value == null) { return this.element.onclick; }
    // 	this.element.onclick = value;
    // 	return this;
    // }

    // Script to be run when a context menu is triggered.
    /*	@docs: {
     *	@name: On context menu
     *	@description: 
     *		Script to be run when a context menu is triggered.
     *		The equivalent of HTML attribute `oncontextmenu`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_context_menu(value) {
        if (value == null) { return this.element.oncontextmenu; }
    	this.element.oncontextmenu = value;
    	return this;
    }

    // Script to be run when the content of the element is being copied.
    /*	@docs: {
     *	@name: On copy
     *	@description: 
     *		Script to be run when the content of the element is being copied.
     *		The equivalent of HTML attribute `oncopy`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_copy(value) {
        if (value == null) { return this.element.oncopy; }
    	this.element.oncopy = value;
    	return this;
    }

    // Script to be run when the cue changes in a <track> element.
    /*	@docs: {
     *	@name: On cue change
     *	@description: 
     *		Script to be run when the cue changes in a <track> element.
     *		The equivalent of HTML attribute `oncuechange`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_cue_change(value) {
        if (value == null) { return this.element.oncuechange; }
    	this.element.oncuechange = value;
    	return this;
    }

    // Script to be run when the content of the element is being cut.
    /*	@docs: {
     *	@name: On cut
     *	@description: 
     *		Script to be run when the content of the element is being cut.
     *		The equivalent of HTML attribute `oncut`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_cut(value) {
        if (value == null) { return this.element.oncut; }
    	this.element.oncut = value;
    	return this;
    }

    // Script to be run when the element is being double-clicked.
    /*	@docs: {
     *	@name: On dbl click
     *	@description: 
     *		Script to be run when the element is being double-clicked.
     *		The equivalent of HTML attribute `ondblclick`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_dbl_click(value) {
        if (value == null) { return this.element.ondblclick; }
    	this.element.ondblclick = value;
    	return this;
    }

    // Script to be run when the element is being dragged.
    /*	@docs: {
     *	@name: On drag
     *	@description: 
     *		Script to be run when the element is being dragged.
     *		The equivalent of HTML attribute `ondrag`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag(value) {
        if (value == null) { return this.element.ondrag; }
    	this.element.ondrag = value;
    	return this;
    }

    // Script to be run at the end of a drag operation.
    /*	@docs: {
     *	@name: On drag end
     *	@description: 
     *		Script to be run at the end of a drag operation.
     *		The equivalent of HTML attribute `ondragend`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_end(value) {
        if (value == null) { return this.element.ondragend; }
    	this.element.ondragend = value;
    	return this;
    }

    // Script to be run when an element has been dragged to a valid drop target.
    /*	@docs: {
     *	@name: On drag enter
     *	@description: 
     *		Script to be run when an element has been dragged to a valid drop target.
     *		The equivalent of HTML attribute `ondragenter`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_enter(value) {
        if (value == null) { return this.element.ondragenter; }
    	this.element.ondragenter = value;
    	return this;
    }

    // Script to be run when an element leaves a valid drop target.
    /*	@docs: {
     *	@name: On drag leave
     *	@description: 
     *		Script to be run when an element leaves a valid drop target.
     *		The equivalent of HTML attribute `ondragleave`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_leave(value) {
        if (value == null) { return this.element.ondragleave; }
    	this.element.ondragleave = value;
    	return this;
    }

    // Script to be run when an element is being dragged over a valid drop target.
    /*	@docs: {
     *	@name: On drag over
     *	@description: 
     *		Script to be run when an element is being dragged over a valid drop target.
     *		The equivalent of HTML attribute `ondragover`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_over(value) {
        if (value == null) { return this.element.ondragover; }
    	this.element.ondragover = value;
    	return this;
    }

    // Script to be run at the start of a drag operation.
    /*	@docs: {
     *	@name: On drag start
     *	@description: 
     *		Script to be run at the start of a drag operation.
     *		The equivalent of HTML attribute `ondragstart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drag_start(value) {
        if (value == null) { return this.element.ondragstart; }
    	this.element.ondragstart = value;
    	return this;
    }

    // Script to be run when dragged element is being dropped.
    /*	@docs: {
     *	@name: On drop
     *	@description: 
     *		Script to be run when dragged element is being dropped.
     *		The equivalent of HTML attribute `ondrop`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_drop(value) {
        if (value == null) { return this.element.ondrop; }
    	this.element.ondrop = value;
    	return this;
    }

    // Script to be run when the length of the media changes.
    /*	@docs: {
     *	@name: On duration change
     *	@description: 
     *		Script to be run when the length of the media changes.
     *		The equivalent of HTML attribute `ondurationchange`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_duration_change(value) {
        if (value == null) { return this.element.ondurationchange; }
    	this.element.ondurationchange = value;
    	return this;
    }

    // Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects).
    /*	@docs: {
     *	@name: On emptied
     *	@description: 
     *		Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects).
     *		The equivalent of HTML attribute `onemptied`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_emptied(value) {
        if (value == null) { return this.element.onemptied; }
    	this.element.onemptied = value;
    	return this;
    }

    // Script to be run when the media has reach the end (a useful event for messages like "thanks for listening").
    /*	@docs: {
     *	@name: On ended
     *	@description: 
     *		Script to be run when the media has reach the end (a useful event for messages like "thanks for listening").
     *		The equivalent of HTML attribute `onended`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_ended(value) {
        if (value == null) { return this.element.onended; }
    	this.element.onended = value;
    	return this;
    }

    // Script to be run when an error occurs.
    /*	@docs: {
     *	@name: On error
     *	@description: 
     *		Script to be run when an error occurs.
     *		The equivalent of HTML attribute `onerror`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_error(value) {
        if (value == null) { return this.element.onerror; }
    	this.element.onerror = value;
    	return this;
    }

    // Script to be run when the element gets focus.
    /*	@docs: {
     *	@name: On focus
     *	@description: 
     *		Script to be run when the element gets focus.
     *		The equivalent of HTML attribute `onfocus`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_focus(value) {
        if (value == null) { return this.element.onfocus; }
    	this.element.onfocus = value;
    	return this;
    }

    // Script to be run when there has been changes to the anchor part of the a URL.
    /*	@docs: {
     *	@name: On hash change
     *	@description: 
     *		Script to be run when there has been changes to the anchor part of the a URL.
     *		The equivalent of HTML attribute `onhashchange`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_hash_change(value) {
        if (value == null) { return this.element.onhashchange; }
    	this.element.onhashchange = value;
    	return this;
    }

    // Script to be run when the element gets user input.
    /*	@docs: {
     *	@name: On input
     *	@description: 
     *		Script to be run when the element gets user input.
     *		The equivalent of HTML attribute `oninput`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_input(value) {
        if (value == null) { return this.element.oninput; }
    	this.element.oninput = value;
    	return this;
    }

    // Script to be run when the element is invalid.
    /*	@docs: {
     *	@name: On invalid
     *	@description: 
     *		Script to be run when the element is invalid.
     *		The equivalent of HTML attribute `oninvalid`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_invalid(value) {
        if (value == null) { return this.element.oninvalid; }
    	this.element.oninvalid = value;
    	return this;
    }

    // Script to be run when a user is pressing a key.
    /*	@docs: {
     *	@name: On key down
     *	@description: 
     *		Script to be run when a user is pressing a key.
     *		The equivalent of HTML attribute `onkeydown`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_key_down(value) {
        if (value == null) { return this.element.onkeydown; }
    	this.element.onkeydown = value;
    	return this;
    }

    // Script to be run when a user presses a key.
    /*	@docs: {
     *	@name: On key press
     *	@description: 
     *		Script to be run when a user presses a key.
     *		The equivalent of HTML attribute `onkeypress`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_key_press(value) {
        if (value == null) { return this.element.onkeypress; }
    	this.element.onkeypress = value;
    	return this;
    }

    // Script to be run when a user releases a key.
    /*	@docs: {
     *	@name: On key up
     *	@description: 
     *		Script to be run when a user releases a key.
     *		The equivalent of HTML attribute `onkeyup`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_key_up(value) {
        if (value == null) { return this.element.onkeyup; }
    	this.element.onkeyup = value;
    	return this;
    }

    // Script to be run when the element is finished loading.
    /*	@docs: {
     *	@name: On load
     *	@description: 
     *		Script to be run when the element is finished loading.
     *		The equivalent of HTML attribute `onload`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_load(value) {
        if (value == null) { return this.element.onload; }
    	this.element.onload = value;
    	return this;
    }

    // Script to be run when media data is loaded.
    /*	@docs: {
     *	@name: On loaded data
     *	@description: 
     *		Script to be run when media data is loaded.
     *		The equivalent of HTML attribute `onloadeddata`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_loaded_data(value) {
        if (value == null) { return this.element.onloadeddata; }
    	this.element.onloadeddata = value;
    	return this;
    }

    // Script to be run when meta data (like dimensions and duration) are loaded.
    /*	@docs: {
     *	@name: On loaded metadata
     *	@description: 
     *		Script to be run when meta data (like dimensions and duration) are loaded.
     *		The equivalent of HTML attribute `onloadedmetadata`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_loaded_metadata(value) {
        if (value == null) { return this.element.onloadedmetadata; }
    	this.element.onloadedmetadata = value;
    	return this;
    }

    // Script to be run just as the file begins to load before anything is actually loaded.
    /*	@docs: {
     *	@name: On load start
     *	@description: 
     *		Script to be run just as the file begins to load before anything is actually loaded.
     *		The equivalent of HTML attribute `onloadstart`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_load_start(value) {
        if (value == null) { return this.element.onloadstart; }
    	this.element.onloadstart = value;
    	return this;
    }

    // Script to be run when a mouse button is pressed down on an element.
    /*	@docs: {
     *	@name: On mouse down
     *	@description: 
     *		Script to be run when a mouse button is pressed down on an element.
     *		The equivalent of HTML attribute `onmousedown`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_down(value) {
        if (value == null) { return this.element.onmousedown; }
    	this.element.onmousedown = value;
    	return this;
    }

    // Script to be run as long as the  mouse pointer is moving over an element.
    /*	@docs: {
     *	@name: On mouse move
     *	@description: 
     *		Script to be run as long as the  mouse pointer is moving over an element.
     *		The equivalent of HTML attribute `onmousemove`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_move(value) {
        if (value == null) { return this.element.onmousemove; }
    	this.element.onmousemove = value;
    	return this;
    }

    // Script to be run when a mouse pointer moves out of an element.
    /*	@docs: {
     *	@name: On mouse out
     *	@description: 
     *		Script to be run when a mouse pointer moves out of an element.
     *		The equivalent of HTML attribute `onmouseout`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_out(value) {
        if (value == null) { return this.element.onmouseout; }
    	this.element.onmouseout = value;
    	return this;
    }

    // Script to be run when a mouse pointer moves over an element.
    /*	@docs: {
     *	@name: On mouse over
     *	@description: 
     *		Script to be run when a mouse pointer moves over an element.
     *		The equivalent of HTML attribute `onmouseover`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_over(value) {
        if (value == null) { return this.element.onmouseover; }
    	this.element.onmouseover = value;
    	return this;
    }

    // Script to be run when a mouse button is released over an element.
    /*	@docs: {
     *	@name: On mouse up
     *	@description: 
     *		Script to be run when a mouse button is released over an element.
     *		The equivalent of HTML attribute `onmouseup`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_up(value) {
        if (value == null) { return this.element.onmouseup; }
    	this.element.onmouseup = value;
    	return this;
    }

    // Script to be run when a mouse wheel is being scrolled over an element.
    /*	@docs: {
     *	@name: On mouse wheel
     *	@description: 
     *		Script to be run when a mouse wheel is being scrolled over an element.
     *		The equivalent of HTML attribute `onmousewheel`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_mouse_wheel(value) {
        if (value == null) { return this.element.onmousewheel; }
    	this.element.onmousewheel = value;
    	return this;
    }

    // Script to be run when the browser starts to work offline.
    /*	@docs: {
     *	@name: On offline
     *	@description: 
     *		Script to be run when the browser starts to work offline.
     *		The equivalent of HTML attribute `onoffline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_offline(value) {
        if (value == null) { return this.element.onoffline; }
    	this.element.onoffline = value;
    	return this;
    }

    // Script to be run when the browser starts to work online.
    /*	@docs: {
     *	@name: On online
     *	@description: 
     *		Script to be run when the browser starts to work online.
     *		The equivalent of HTML attribute `ononline`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_online(value) {
        if (value == null) { return this.element.ononline; }
    	this.element.ononline = value;
    	return this;
    }

    // Script to be run when a user navigates away from a page.
    /*	@docs: {
     *	@name: On page hide
     *	@description: 
     *		Script to be run when a user navigates away from a page.
     *		The equivalent of HTML attribute `onpagehide`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_page_hide(value) {
        if (value == null) { return this.element.onpagehide; }
    	this.element.onpagehide = value;
    	return this;
    }

    // Script to be run when a user navigates to a page.
    /*	@docs: {
     *	@name: On page show
     *	@description: 
     *		Script to be run when a user navigates to a page.
     *		The equivalent of HTML attribute `onpageshow`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_page_show(value) {
        if (value == null) { return this.element.onpageshow; }
    	this.element.onpageshow = value;
    	return this;
    }

    // Script to be run when the user pastes some content in an element.
    /*	@docs: {
     *	@name: On paste
     *	@description: 
     *		Script to be run when the user pastes some content in an element.
     *		The equivalent of HTML attribute `onpaste`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_paste(value) {
        if (value == null) { return this.element.onpaste; }
    	this.element.onpaste = value;
    	return this;
    }

    // Script to be run when the media is paused either by the user or programmatically.
    /*	@docs: {
     *	@name: On pause
     *	@description: 
     *		Script to be run when the media is paused either by the user or programmatically.
     *		The equivalent of HTML attribute `onpause`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_pause(value) {
        if (value == null) { return this.element.onpause; }
    	this.element.onpause = value;
    	return this;
    }

    // Script to be run when the media has started playing.
    /*	@docs: {
     *	@name: On play
     *	@description: 
     *		Script to be run when the media has started playing.
     *		The equivalent of HTML attribute `onplay`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_play(value) {
        if (value == null) { return this.element.onplay; }
    	this.element.onplay = value;
    	return this;
    }

    // Script to be run when the media has started playing.
    /*	@docs: {
     *	@name: On playing
     *	@description: 
     *		Script to be run when the media has started playing.
     *		The equivalent of HTML attribute `onplaying`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_playing(value) {
        if (value == null) { return this.element.onplaying; }
    	this.element.onplaying = value;
    	return this;
    }

    // Script to be run when the window's history changes.
    /*	@docs: {
     *	@name: On popstate
     *	@description: 
     *		Script to be run when the window's history changes.
     *		The equivalent of HTML attribute `onpopstate`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_popstate(value) {
        if (value == null) { return this.element.onpopstate; }
    	this.element.onpopstate = value;
    	return this;
    }

    // Script to be run when the browser is in the process of getting the media data.
    /*	@docs: {
     *	@name: Onprogress
     *	@description: 
     *		Script to be run when the browser is in the process of getting the media data.
     *		The equivalent of HTML attribute `onprogress`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    onprogress(value) {
        if (value == null) { return this.element.onprogress; }
    	this.element.onprogress = value;
    	return this;
    }

    // Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode).
    /*	@docs: {
     *	@name: On rate change
     *	@description: 
     *		Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode).
     *		The equivalent of HTML attribute `onratechange`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_rate_change(value) {
        if (value == null) { return this.element.onratechange; }
    	this.element.onratechange = value;
    	return this;
    }

    // Script to be run when a reset button in a form is clicked.
    /*	@docs: {
     *	@name: On reset
     *	@description: 
     *		Script to be run when a reset button in a form is clicked.
     *		The equivalent of HTML attribute `onreset`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_reset(value) {
        if (value == null) { return this.element.onreset; }
    	this.element.onreset = value;
    	return this;
    }

    // Script to be run when the browser window is being resized.
    /*	@docs: {
     *	@name: On resize
     *	@description: 
     *		Script to be run when the browser window is being resized.
     *		The equivalent of HTML attribute `onresize`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_resize(value) {
        if (value == null) { return this.element.onresize; }
    	this.element.onresize = value;
    	return this;
    }

    // Script to be run when an element's scrollbar is being scrolled.
    /*	@docs: {
     *	@name: On scroll
     *	@description: 
     *		Script to be run when an element's scrollbar is being scrolled.
     *		The equivalent of HTML attribute `onscroll`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_scroll(value) {
        if (value == null) { return this.element.onscroll; }
    	this.element.onscroll = value;
    	return this;
    }

    // Script to be run when the user writes something in a search field (for <input type="search">).
    /*	@docs: {
     *	@name: On search
     *	@description: 
     *		Script to be run when the user writes something in a search field (for <input type="search">).
     *		The equivalent of HTML attribute `onsearch`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_search(value) {
        if (value == null) { return this.element.onsearch; }
    	this.element.onsearch = value;
    	return this;
    }

    // Script to be run when the seeking attribute is set to false indicating that seeking has ended.
    /*	@docs: {
     *	@name: On seeked
     *	@description: 
     *		Script to be run when the seeking attribute is set to false indicating that seeking has ended.
     *		The equivalent of HTML attribute `onseeked`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_seeked(value) {
        if (value == null) { return this.element.onseeked; }
    	this.element.onseeked = value;
    	return this;
    }

    // Script to be run when the seeking attribute is set to true indicating that seeking is active.
    /*	@docs: {
     *	@name: On seeking
     *	@description: 
     *		Script to be run when the seeking attribute is set to true indicating that seeking is active.
     *		The equivalent of HTML attribute `onseeking`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_seeking(value) {
        if (value == null) { return this.element.onseeking; }
    	this.element.onseeking = value;
    	return this;
    }

    // Script to be run when the element gets selected.
    /*	@docs: {
     *	@name: On select
     *	@description: 
     *		Script to be run when the element gets selected.
     *		The equivalent of HTML attribute `onselect`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_select(value) {
        if (value == null) { return this.element.onselect; }
    	this.element.onselect = value;
    	return this;
    }

    // Script to be run when the browser is unable to fetch the media data for whatever reason.
    /*	@docs: {
     *	@name: On stalled
     *	@description: 
     *		Script to be run when the browser is unable to fetch the media data for whatever reason.
     *		The equivalent of HTML attribute `onstalled`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_stalled(value) {
        if (value == null) { return this.element.onstalled; }
    	this.element.onstalled = value;
    	return this;
    }

    // Script to be run when a Web Storage area is updated.
    /*	@docs: {
     *	@name: On storage
     *	@description: 
     *		Script to be run when a Web Storage area is updated.
     *		The equivalent of HTML attribute `onstorage`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_storage(value) {
        if (value == null) { return this.element.onstorage; }
    	this.element.onstorage = value;
    	return this;
    }

    // Script to be run when a form is submitted.
    /*	@docs: {
     *	@name: On submit
     *	@description: 
     *		Script to be run when a form is submitted.
     *		The equivalent of HTML attribute `onsubmit`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_submit(value) {
        if (value == null) { return this.element.onsubmit; }
    	this.element.onsubmit = value;
    	return this;
    }

    // Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason.
    /*	@docs: {
     *	@name: On suspend
     *	@description: 
     *		Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason.
     *		The equivalent of HTML attribute `onsuspend`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_suspend(value) {
        if (value == null) { return this.element.onsuspend; }
    	this.element.onsuspend = value;
    	return this;
    }

    // Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media).
    /*	@docs: {
     *	@name: On time update
     *	@description: 
     *		Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media).
     *		The equivalent of HTML attribute `ontimeupdate`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_time_update(value) {
        if (value == null) { return this.element.ontimeupdate; }
    	this.element.ontimeupdate = value;
    	return this;
    }

    // Script to be run when the user opens or closes the <details> element.
    /*	@docs: {
     *	@name: On toggle
     *	@description: 
     *		Script to be run when the user opens or closes the <details> element.
     *		The equivalent of HTML attribute `ontoggle`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_toggle(value) {
        if (value == null) { return this.element.ontoggle; }
    	this.element.ontoggle = value;
    	return this;
    }

    // Script to be run when a page has unloaded (or the browser window has been closed).
    /*	@docs: {
     *	@name: On unload
     *	@description: 
     *		Script to be run when a page has unloaded (or the browser window has been closed).
     *		The equivalent of HTML attribute `onunload`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_unload(value) {
        if (value == null) { return this.element.onunload; }
    	this.element.onunload = value;
    	return this;
    }

    // Script to be run each time the volume of a video/audio has been changed.
    /*	@docs: {
     *	@name: On volume change
     *	@description: 
     *		Script to be run each time the volume of a video/audio has been changed.
     *		The equivalent of HTML attribute `onvolumechange`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_volume_change(value) {
        if (value == null) { return this.element.onvolumechange; }
    	this.element.onvolumechange = value;
    	return this;
    }

    // Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data).
    /*	@docs: {
     *	@name: On waiting
     *	@description: 
     *		Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data).
     *		The equivalent of HTML attribute `onwaiting`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_waiting(value) {
        if (value == null) { return this.element.onwaiting; }
    	this.element.onwaiting = value;
    	return this;
    }

    // Script to be run when the mouse wheel rolls up or down over an element.
    /*	@docs: {
     *	@name: On wheel
     *	@description: 
     *		Script to be run when the mouse wheel rolls up or down over an element.
     *		The equivalent of HTML attribute `onwheel`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_wheel(value) {
        if (value == null) { return this.element.onwheel; }
    	this.element.onwheel = value;
    	return this;
    }

    // Specifies that the details should be visible (open) to the user.
    /*	@docs: {
     *	@name: Open
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
     *	@name: Optimum
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
     *	@name: Pattern
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
     *	@name: Placeholder
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
     *	@name: Poster
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
     *	@name: Preload
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
     *	@name: Readonly
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
     *	@name: Rel
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
     *	@name: Required
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
     *	@name: Reversed
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
     *	@name: Rows
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
     *	@name: Row span
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
     *	@name: Sandbox
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
     *	@name: Scope
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
     *	@name: Selected
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
     *	@name: Shape
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
     *	@name: Size
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
     *	@name: Sizes
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
     *	@name: Span
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
     *	@name: Spell check
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
     *	@name: Src
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
     *	@name: Src doc
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
     *	@name: Src lang
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
     *	@name: Rrsrc set
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
     *	@name: Start
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
     *	@name: Step
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
     *	@name: Tab index
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
     *	@name: Target
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
     *	@name: Title
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
     *	@name: Translate
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
     *	@name: Type
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
     *	@name: Use map
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
     *	@name: Value
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

    // Script to be run when the message is triggered.
    /*	@docs: {
     *	@name: On message
     *	@description: 
     *		Script to be run when the message is triggered.
     *		The equivalent of HTML attribute `onmessage`.
     *		
     *		Returns the attribute value when parameter `value` is `null`.
     *	@return: 
     *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
     *	@parameter: {
     *		@name: value
     *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
     *	}: 
     *	@inherit: false
     } */ 
    on_message(value) {
        if (value == null) { return this.element.onmessage; }
    	this.element.onmessage = value;
    	return this;
    }
	
};
