/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// All vweb elements.
let VWEB_ALL_ELEMENTS = [];

// Element.
class Element {
	
	// ---------------------------------------------------------
	// Constructors.
	
	constructor(type, tag) {
		this.element_type = type;
		this.element_tag = tag;
		this.element_display = "block";
		this.element = document.createElement(this.element_tag);
		VWEB_ALL_ELEMENTS.push(this);
	}
	
	// ---------------------------------------------------------
	// Utils.
	
	// Padd a numeric with px.
	pad_numeric(value, padding = "px") {
		if (utils.is_numeric(value)) {
			return value + padding;
		}
		return value;
	}

	// Padd a numeric percentage with %.
	// When the numeric is a float and between 0 and 1 it is also multiplied by 100.
	pad_percentage(value, padding = "%") {
		if (utils.is_float(value) && value < 1.0) {
			return (value * 100) + padding;
		} else if (utils.is_numeric(value)) {
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
				else if (utils.is_func(child)) {
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
				else if (utils.is_func(child)) {
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
		if (Element.elements_with_width_attribute.includes(this.element_tag)) {
			this.element.width = value;
		} else {
			this.element.style.width = this.pad_numeric(value);
		}
		return this;
	}
	height(value) {
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

	// Border, 1 till 3 args.
	border(...values) {
		if (values.length === 1) {
			this.element.style.border = value;
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
	
	// Set attributes by dict.
	attributes(html_attr) {
		for (let i in html_attr) {
			this.element[i] = html_attr[i];
		}
		return this;
	}
	
	// Set events by dict.
	events(html_events) {
		for (let i in html_events) {
			this.element[i] = i[html_events];
		}
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
	// Cast functions.
	
	// Cast to string.
	toString() {
		return this.element.outerHTML;
	}
	
    // ---------------------------------------------------------
    // Automatically generated CSS functions. 
    // Reference: https://www.w3schools.com/cssref/index.php. 

    // Specifies an accent color for user-interface controls
    accent_color(value) {
        this.element.style.accentColor = value;
        return this;
    }

    // Specifies the alignment between the lines inside a flexible container when the items do not use all available space
    align_content(value) {
        this.element.style.alignContent = value;
        return this;
    }

    // Specifies the alignment for items inside a flexible container
    align_items(value) {
        this.element.style.alignItems = value;
        return this;
    }

    // Specifies the alignment for selected items inside a flexible container
    align_self(value) {
        this.element.style.alignSelf = value;
        return this;
    }

    // Resets all properties (except unicode-bidi and direction)
    all(value) {
        this.element.style.all = value;
        return this;
    }

    // A shorthand property for all the animation-* properties
    animation(value) {
        this.element.style.animation = value;
        return this;
    }

    // Specifies a delay for the start of an animation
    animation_delay(value) {
        this.element.style.animationDelay = value;
        return this;
    }

    // Specifies whether an animation should be played forwards, backwards or in alternate cycles
    animation_direction(value) {
        this.element.style.animationDirection = value;
        return this;
    }

    // Specifies how long an animation should take to complete one cycle
    animation_duration(value) {
        this.element.style.animationDuration = value;
        return this;
    }

    // Specifies a style for the element when the animation is not playing (before it starts, after it ends, or both)
    animation_fill_mode(value) {
        this.element.style.animationFillMode = value;
        return this;
    }

    // Specifies the number of times an animation should be played
    animation_iteration_count(value) {
        this.element.style.animationIterationCount = value;
        return this;
    }

    // Specifies a name for the @keyframes animation
    animation_name(value) {
        this.element.style.animationName = value;
        return this;
    }

    // Specifies whether the animation is running or paused
    animation_play_state(value) {
        this.element.style.animationPlayState = value;
        return this;
    }

    // Specifies the speed curve of an animation
    animation_timing_function(value) {
        this.element.style.animationTimingFunction = value;
        return this;
    }

    // Specifies preferred aspect ratio of an element
    aspect_ratio(value) {
        this.element.style.aspectRatio = value;
        return this;
    }

    // Defines a graphical effect to the area behind an element
    backdrop_filter(value) {
        this.element.style.backdropFilter = value;
        return this;
    }

    // Defines whether or not the back face of an element should be visible when facing the user
    backface_visibility(value) {
        this.element.style.backfaceVisibility = value;
        return this;
    }

    // A shorthand property for all the background-* properties
    background(value) {
        this.element.style.background = value;
        return this;
    }

    // Sets whether a background image scrolls with the rest of the page, or is fixed
    background_attachment(value) {
        this.element.style.backgroundAttachment = value;
        return this;
    }

    // Specifies the blending mode of each background layer (color/image)
    background_blend_mode(value) {
        this.element.style.backgroundBlendMode = value;
        return this;
    }

    // Defines how far the background (color or image) should extend within an element
    background_clip(value) {
        this.element.style.backgroundClip = value;
        return this;
    }

    // Specifies the background color of an element
    background_color(value) {
        this.element.style.backgroundColor = value;
        return this;
    }

    // Specifies one or more background images for an element
    background_image(value) {
        this.element.style.backgroundImage = value;
        return this;
    }

    // Specifies the origin position of a background image
    background_origin(value) {
        this.element.style.backgroundOrigin = value;
        return this;
    }

    // Specifies the position of a background image
    background_position(value) {
        this.element.style.backgroundPosition = value;
        return this;
    }

    // Specifies the position of a background image on x-axis
    background_position_x(value) {
        this.element.style.backgroundPositionX = value;
        return this;
    }

    // Specifies the position of a background image on y-axis
    background_position_y(value) {
        this.element.style.backgroundPositionY = value;
        return this;
    }

    // Sets if/how a background image will be repeated
    background_repeat(value) {
        this.element.style.backgroundRepeat = value;
        return this;
    }

    // Specifies the size of the background images
    background_size(value) {
        this.element.style.backgroundSize = this.pad_numeric(value);
        return this;
    }

    // Specifies the size of an element in block direction
    block_size(value) {
        this.element.style.blockSize = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for border-width, border-style and border-color
    // border(value) {
    //     this.element.style.border = value;
    //     return this;
    // }

    // A shorthand property for border-block-width, border-block-style and border-block-color
    border_block(value) {
        this.element.style.borderBlock = value;
        return this;
    }

    // Sets the color of the borders at start and end in the block direction
    border_block_color(value) {
        this.element.style.borderBlockColor = value;
        return this;
    }

    // Sets the color of the border at the end in the block direction
    border_block_end_color(value) {
        this.element.style.borderBlockEndColor = value;
        return this;
    }

    // Sets the style of the border at the end in the block direction
    border_block_end_style(value) {
        this.element.style.borderBlockEndStyle = value;
        return this;
    }

    // Sets the width of the border at the end in the block direction
    border_block_end_width(value) {
        this.element.style.borderBlockEndWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the border at the start in the block direction
    border_block_start_color(value) {
        this.element.style.borderBlockStartColor = value;
        return this;
    }

    // Sets the style of the border at the start in the block direction
    border_block_start_style(value) {
        this.element.style.borderBlockStartStyle = value;
        return this;
    }

    // Sets the width of the border at the start in the block direction
    border_block_start_width(value) {
        this.element.style.borderBlockStartWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the style of the borders at start and end in the block direction
    border_block_style(value) {
        this.element.style.borderBlockStyle = value;
        return this;
    }

    // Sets the width of the borders at start and end in the block direction
    border_block_width(value) {
        this.element.style.borderBlockWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for border-bottom-width, border-bottom-style and border-bottom-color
    border_bottom(value) {
        this.element.style.borderBottom = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the bottom border
    border_bottom_color(value) {
        this.element.style.borderBottomColor = value;
        return this;
    }

    // Defines the radius of the border of the bottom-left corner
    border_bottom_left_radius(value) {
        this.element.style.borderBottomLeftRadius = this.pad_numeric(value);
        return this;
    }

    // Defines the radius of the border of the bottom-right corner
    border_bottom_right_radius(value) {
        this.element.style.borderBottomRightRadius = this.pad_numeric(value);
        return this;
    }

    // Sets the style of the bottom border
    border_bottom_style(value) {
        this.element.style.borderBottomStyle = value;
        return this;
    }

    // Sets the width of the bottom border
    border_bottom_width(value) {
        this.element.style.borderBottomWidth = this.pad_numeric(value);
        return this;
    }

    // Sets whether table borders should collapse into a single border or be separated
    border_collapse(value) {
        this.element.style.borderCollapse = value;
        return this;
    }

    // Sets the color of the four borders
    border_color(value) {
        this.element.style.borderColor = value;
        return this;
    }

    // A shorthand property for all the border-image-* properties
    border_image(value) {
        this.element.style.borderImage = value;
        return this;
    }

    // Specifies the amount by which the border image area extends beyond the border box
    border_image_outset(value) {
        this.element.style.borderImageOutset = value;
        return this;
    }

    // Specifies whether the border image should be repeated, rounded or stretched
    border_image_repeat(value) {
        this.element.style.borderImageRepeat = value;
        return this;
    }

    // Specifies how to slice the border image
    border_image_slice(value) {
        this.element.style.borderImageSlice = value;
        return this;
    }

    // Specifies the path to the image to be used as a border
    border_image_source(value) {
        this.element.style.borderImageSource = value;
        return this;
    }

    // Specifies the width of the border image
    border_image_width(value) {
        this.element.style.borderImageWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for border-inline-width, border-inline-style and border-inline-color
    border_inline(value) {
        this.element.style.borderInline = value;
        return this;
    }

    // Sets the color of the borders at start and end in the inline direction
    border_inline_color(value) {
        this.element.style.borderInlineColor = value;
        return this;
    }

    // Sets the color of the border at the end in the inline direction
    border_inline_end_color(value) {
        this.element.style.borderInlineEndColor = value;
        return this;
    }

    // Sets the style of the border at the end in the inline direction
    border_inline_end_style(value) {
        this.element.style.borderInlineEndStyle = value;
        return this;
    }

    // Sets the width of the border at the end in the inline direction
    border_inline_end_width(value) {
        this.element.style.borderInlineEndWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the border at the start in the inline direction
    border_inline_start_color(value) {
        this.element.style.borderInlineStartColor = value;
        return this;
    }

    // Sets the style of the border at the start in the inline direction
    border_inline_start_style(value) {
        this.element.style.borderInlineStartStyle = value;
        return this;
    }

    // Sets the width of the border at the start in the inline direction
    border_inline_start_width(value) {
        this.element.style.borderInlineStartWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the style of the borders at start and end in the inline direction
    border_inline_style(value) {
        this.element.style.borderInlineStyle = value;
        return this;
    }

    // Sets the width of the borders at start and end in the inline direction
    border_inline_width(value) {
        this.element.style.borderInlineWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for all the border-left-* properties
    border_left(value) {
        this.element.style.borderLeft = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the left border
    border_left_color(value) {
        this.element.style.borderLeftColor = value;
        return this;
    }

    // Sets the style of the left border
    border_left_style(value) {
        this.element.style.borderLeftStyle = value;
        return this;
    }

    // Sets the width of the left border
    border_left_width(value) {
        this.element.style.borderLeftWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for the four border-*-radius properties
    border_radius(value) {
        this.element.style.borderRadius = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for all the border-right-* properties
    border_right(value) {
        this.element.style.borderRight = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the right border
    border_right_color(value) {
        this.element.style.borderRightColor = value;
        return this;
    }

    // Sets the style of the right border
    border_right_style(value) {
        this.element.style.borderRightStyle = value;
        return this;
    }

    // Sets the width of the right border
    border_right_width(value) {
        this.element.style.borderRightWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the distance between the borders of adjacent cells
    border_spacing(value) {
        this.element.style.borderSpacing = value;
        return this;
    }

    // Sets the style of the four borders
    border_style(value) {
        this.element.style.borderStyle = value;
        return this;
    }

    // A shorthand property for border-top-width, border-top-style and border-top-color
    border_top(value) {
        this.element.style.borderTop = this.pad_numeric(value);
        return this;
    }

    // Sets the color of the top border
    border_top_color(value) {
        this.element.style.borderTopColor = value;
        return this;
    }

    // Defines the radius of the border of the top-left corner
    border_top_left_radius(value) {
        this.element.style.borderTopLeftRadius = this.pad_numeric(value);
        return this;
    }

    // Defines the radius of the border of the top-right corner
    border_top_right_radius(value) {
        this.element.style.borderTopRightRadius = this.pad_numeric(value);
        return this;
    }

    // Sets the style of the top border
    border_top_style(value) {
        this.element.style.borderTopStyle = value;
        return this;
    }

    // Sets the width of the top border
    border_top_width(value) {
        this.element.style.borderTopWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the width of the four borders
    border_width(value) {
        this.element.style.borderWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the elements position, from the bottom of its parent element
    bottom(value) {
        this.element.style.bottom = this.pad_numeric(value);
        return this;
    }

    // Sets the behavior of the background and border of an element at page-break, or, for in-line elements, at line-break.
    box_decoration_break(value) {
        this.element.style.boxDecorationBreak = value;
        return this;
    }

    // The box-reflect property is used to create a reflection of an element.
    box_reflect(value) {
        this.element.style.boxReflect = value;
        return this;
    }

    // Attaches one or more shadows to an element
    box_shadow(value) {
        this.element.style.boxShadow = value;
        return this;
    }

    // Defines how the width and height of an element are calculated: should they include padding and borders, or not
    box_sizing(value) {
        this.element.style.boxSizing = value;
        return this;
    }

    // Specifies whether or not a page-, column-, or region-break should occur after the specified element
    break_after(value) {
        this.element.style.breakAfter = value;
        return this;
    }

    // Specifies whether or not a page-, column-, or region-break should occur before the specified element
    break_before(value) {
        this.element.style.breakBefore = value;
        return this;
    }

    // Specifies whether or not a page-, column-, or region-break should occur inside the specified element
    break_inside(value) {
        this.element.style.breakInside = value;
        return this;
    }

    // Specifies the placement of a table caption
    caption_side(value) {
        this.element.style.captionSide = value;
        return this;
    }

    // Specifies the color of the cursor (caret) in inputs, textareas, or any element that is editable
    caret_color(value) {
        this.element.style.caretColor = value;
        return this;
    }

    // Specifies what should happen with the element that is next to a floating element
    clear(value) {
        this.element.style.clear = value;
        return this;
    }

    // Clips an absolutely positioned element
    clip(value) {
        this.element.style.clip = value;
        return this;
    }

    // Sets the color of text
    color(value) {
        this.element.style.color = value;
        return this;
    }

    // Specifies the number of columns an element should be divided into
    column_count(value) {
        this.element.style.columnCount = value;
        return this;
    }

    // Specifies how to fill columns, balanced or not
    column_fill(value) {
        this.element.style.columnFill = value;
        return this;
    }

    // Specifies the gap between the columns
    column_gap(value) {
        this.element.style.columnGap = value;
        return this;
    }

    // A shorthand property for all the column-rule-* properties
    column_rule(value) {
        this.element.style.columnRule = value;
        return this;
    }

    // Specifies the color of the rule between columns
    column_rule_color(value) {
        this.element.style.columnRuleColor = value;
        return this;
    }

    // Specifies the style of the rule between columns
    column_rule_style(value) {
        this.element.style.columnRuleStyle = value;
        return this;
    }

    // Specifies the width of the rule between columns
    column_rule_width(value) {
        this.element.style.columnRuleWidth = this.pad_numeric(value);
        return this;
    }

    // Specifies how many columns an element should span across
    column_span(value) {
        this.element.style.columnSpan = value;
        return this;
    }

    // Specifies the column width
    column_width(value) {
        this.element.style.columnWidth = this.pad_numeric(value);
        return this;
    }

    // A shorthand property for column-width and column-count
    columns(value) {
        this.element.style.columns = value;
        return this;
    }

    // Used with the :before and :after pseudo-elements, to insert generated content
    content(value) {
        this.element.style.content = value;
        return this;
    }

    // Increases or decreases the value of one or more CSS counters
    counter_increment(value) {
        this.element.style.counterIncrement = value;
        return this;
    }

    // Creates or resets one or more CSS counters
    counter_reset(value) {
        this.element.style.counterReset = value;
        return this;
    }

    // Specifies the mouse cursor to be displayed when pointing over an element
    cursor(value) {
        this.element.style.cursor = value;
        return this;
    }

    // Specifies the text direction/writing direction
    direction(value) {
        this.element.style.direction = value;
        return this;
    }

    // Specifies how a certain HTML element should be displayed
    // display(value) {
    //     this.element.style.display = value;
    //     return this;
    // }

    // Specifies whether or not to display borders and background on empty cells in a table
    empty_cells(value) {
        this.element.style.emptyCells = value;
        return this;
    }

    // Defines effects (e.g. blurring or color shifting) on an element before the element is displayed
    filter(value) {
        this.element.style.filter = value;
        return this;
    }

    // A shorthand property for the flex-grow, flex-shrink, and the flex-basis properties
    flex(value) {
        this.element.style.flex = value;
        return this;
    }

    // Specifies the initial length of a flexible item
    flex_basis(value) {
        this.element.style.flexBasis = value;
        return this;
    }

    // Specifies the direction of the flexible items
    flex_direction(value) {
        this.element.style.flexDirection = value;
        return this;
    }

    // A shorthand property for the flex-direction and the flex-wrap properties
    flex_flow(value) {
        this.element.style.flexFlow = value;
        return this;
    }

    // Specifies how much the item will grow relative to the rest
    flex_grow(value) {
        this.element.style.flexGrow = value;
        return this;
    }

    // Specifies how the item will shrink relative to the rest
    flex_shrink(value) {
        this.element.style.flexShrink = value;
        return this;
    }

    // Specifies whether the flexible items should wrap or not
    flex_wrap(value) {
        this.element.style.flexWrap = value;
        return this;
    }

    // Specifies whether an element should float to the left, right, or not at all
    float(value) {
        this.element.style.float = value;
        return this;
    }

    // A shorthand property for the font-style, font-variant, font-weight, font-size/line-height, and the font-family properties
    font(value) {
        this.element.style.font = value;
        return this;
    }

    // Specifies the font family for text
    font_family(value) {
        this.element.style.fontFamily = value;
        return this;
    }

    // Allows control over advanced typographic features in OpenType fonts
    font_feature_settings(value) {
        this.element.style.fontFeatureSettings = value;
        return this;
    }

    // Controls the usage of the kerning information (how letters are spaced)
    font_kerning(value) {
        this.element.style.fontKerning = value;
        return this;
    }

    // Controls the usage of language-specific glyphs in a typeface
    font_language_override(value) {
        this.element.style.fontLanguageOverride = value;
        return this;
    }

    // Specifies the font size of text
    font_size(value) {
        this.element.style.fontSize = this.pad_numeric(value);
        return this;
    }

    // Preserves the readability of text when font fallback occurs
    font_size_adjust(value) {
        this.element.style.fontSizeAdjust = value;
        return this;
    }

    // Selects a normal, condensed, or expanded face from a font family
    font_stretch(value) {
        this.element.style.fontStretch = value;
        return this;
    }

    // Specifies the font style for text
    font_style(value) {
        this.element.style.fontStyle = value;
        return this;
    }

    // Controls which missing typefaces (bold or italic) may be synthesized by the browser
    font_synthesis(value) {
        this.element.style.fontSynthesis = value;
        return this;
    }

    // Specifies whether or not a text should be displayed in a small-caps font
    font_variant(value) {
        this.element.style.fontVariant = value;
        return this;
    }

    // Controls the usage of alternate glyphs associated to alternative names defined in @font-feature-values
    font_variant_alternates(value) {
        this.element.style.fontVariantAlternates = value;
        return this;
    }

    // Controls the usage of alternate glyphs for capital letters
    font_variant_caps(value) {
        this.element.style.fontVariantCaps = value;
        return this;
    }

    // Controls the usage of alternate glyphs for East Asian scripts (e.g Japanese and Chinese)
    font_variant_east_asian(value) {
        this.element.style.fontVariantEastAsian = value;
        return this;
    }

    // Controls which ligatures and contextual forms are used in textual content of the elements it applies to
    font_variant_ligatures(value) {
        this.element.style.fontVariantLigatures = value;
        return this;
    }

    // Controls the usage of alternate glyphs for numbers, fractions, and ordinal markers
    font_variant_numeric(value) {
        this.element.style.fontVariantNumeric = value;
        return this;
    }

    // Controls the usage of alternate glyphs of smaller size positioned as superscript or subscript regarding the baseline of the font
    font_variant_position(value) {
        this.element.style.fontVariantPosition = value;
        return this;
    }

    // Specifies the weight of a font
    font_weight(value) {
        this.element.style.fontWeight = value;
        return this;
    }

    // A shorthand property for the row-gap and the column-gap properties
    gap(value) {
        this.element.style.gap = value;
        return this;
    }

    // A shorthand property for the grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and the grid-auto-flow properties
    grid(value) {
        this.element.style.grid = value;
        return this;
    }

    // Either specifies a name for the grid item, or this property is a shorthand property for the grid-row-start, grid-column-start, grid-row-end, and grid-column-end properties
    grid_area(value) {
        this.element.style.gridArea = value;
        return this;
    }

    // Specifies a default column size
    grid_auto_columns(value) {
        this.element.style.gridAutoColumns = value;
        return this;
    }

    // Specifies how auto-placed items are inserted in the grid
    grid_auto_flow(value) {
        this.element.style.gridAutoFlow = value;
        return this;
    }

    // Specifies a default row size
    grid_auto_rows(value) {
        this.element.style.gridAutoRows = value;
        return this;
    }

    // A shorthand property for the grid-column-start and the grid-column-end properties
    grid_column(value) {
        this.element.style.gridColumn = value;
        return this;
    }

    // Specifies where to end the grid item
    grid_column_end(value) {
        this.element.style.gridColumnEnd = value;
        return this;
    }

    // Specifies the size of the gap between columns
    grid_column_gap(value) {
        this.element.style.gridColumnGap = value;
        return this;
    }

    // Specifies where to start the grid item
    grid_column_start(value) {
        this.element.style.gridColumnStart = value;
        return this;
    }

    // A shorthand property for the grid-row-gap and grid-column-gap properties
    grid_gap(value) {
        this.element.style.gridGap = value;
        return this;
    }

    // A shorthand property for the grid-row-start and the grid-row-end properties
    grid_row(value) {
        this.element.style.gridRow = value;
        return this;
    }

    // Specifies where to end the grid item
    grid_row_end(value) {
        this.element.style.gridRowEnd = value;
        return this;
    }

    // Specifies the size of the gap between rows
    grid_row_gap(value) {
        this.element.style.gridRowGap = value;
        return this;
    }

    // Specifies where to start the grid item
    grid_row_start(value) {
        this.element.style.gridRowStart = value;
        return this;
    }

    // A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties
    grid_template(value) {
        this.element.style.gridTemplate = value;
        return this;
    }

    // Specifies how to display columns and rows, using named grid items
    grid_template_areas(value) {
        this.element.style.gridTemplateAreas = value;
        return this;
    }

    // Specifies the size of the columns, and how many columns in a grid layout
    grid_template_columns(value) {
        this.element.style.gridTemplateColumns = value;
        return this;
    }

    // Specifies the size of the rows in a grid layout
    grid_template_rows(value) {
        this.element.style.gridTemplateRows = value;
        return this;
    }

    // Specifies whether a punctuation character may be placed outside the line box
    hanging_punctuation(value) {
        this.element.style.hangingPunctuation = value;
        return this;
    }

    // Sets the height of an element
    // height(value) {
    //     this.element.style.height = this.pad_numeric(value);
    //     return this;
    // }

    // Sets how to split words to improve the layout of paragraphs
    hyphens(value) {
        this.element.style.hyphens = value;
        return this;
    }

    // Specifies the type of algorithm to use for image scaling
    image_rendering(value) {
        this.element.style.imageRendering = value;
        return this;
    }

    // Specifies the size of an element in the inline direction
    inline_size(value) {
        this.element.style.inlineSize = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance between an element and the parent element
    inset(value) {
        this.element.style.inset = value;
        return this;
    }

    // Specifies the distance between an element and the parent element in the block direction
    inset_block(value) {
        this.element.style.insetBlock = value;
        return this;
    }

    // Specifies the distance between the end of an element and the parent element in the block direction
    inset_block_end(value) {
        this.element.style.insetBlockEnd = value;
        return this;
    }

    // Specifies the distance between the start of an element and the parent element in the block direction
    inset_block_start(value) {
        this.element.style.insetBlockStart = value;
        return this;
    }

    // Specifies the distance between an element and the parent element in the inline direction
    inset_inline(value) {
        this.element.style.insetInline = value;
        return this;
    }

    // Specifies the distance between the end of an element and the parent element in the inline direction
    inset_inline_end(value) {
        this.element.style.insetInlineEnd = value;
        return this;
    }

    // Specifies the distance between the start of an element and the parent element in the inline direction
    inset_inline_start(value) {
        this.element.style.insetInlineStart = value;
        return this;
    }

    // Defines whether an element must create a new stacking content
    isolation(value) {
        this.element.style.isolation = value;
        return this;
    }

    // Specifies the alignment between the items inside a flexible container when the items do not use all available space
    justify_content(value) {
        this.element.style.justifyContent = value;
        return this;
    }

    // Is set on the grid container. Specifies the alignment of grid items in the inline direction
    justify_items(value) {
        this.element.style.justifyItems = value;
        return this;
    }

    // Is set on the grid item. Specifies the alignment of the grid item in the inline direction
    justify_self(value) {
        this.element.style.justifySelf = value;
        return this;
    }

    // Specifies the left position of a positioned element
    left(value) {
        this.element.style.left = this.pad_numeric(value);
        return this;
    }

    // Increases or decreases the space between characters in a text
    letter_spacing(value) {
        this.element.style.letterSpacing = value;
        return this;
    }

    // Specifies how/if to break lines
    line_break(value) {
        this.element.style.lineBreak = value;
        return this;
    }

    // Sets the line height
    line_height(value) {
        this.element.style.lineHeight = this.pad_numeric(value);
        return this;
    }

    // Sets all the properties for a list in one declaration
    list_style(value) {
        this.element.style.listStyle = value;
        return this;
    }

    // Specifies an image as the list-item marker
    list_style_image(value) {
        this.element.style.listStyleImage = value;
        return this;
    }

    // Specifies the position of the list-item markers (bullet points)
    list_style_position(value) {
        this.element.style.listStylePosition = value;
        return this;
    }

    // Specifies the type of list-item marker
    list_style_type(value) {
        this.element.style.listStyleType = value;
        return this;
    }

    // Sets all the margin properties in one declaration
    // margin(value) {
    //     this.element.style.margin = value;
    //     return this;
    // }

    // Specifies the margin in the block direction
    margin_block(value) {
        this.element.style.marginBlock = value;
        return this;
    }

    // Specifies the margin at the end in the block direction
    margin_block_end(value) {
        this.element.style.marginBlockEnd = value;
        return this;
    }

    // Specifies the margin at the start in the block direction
    margin_block_start(value) {
        this.element.style.marginBlockStart = value;
        return this;
    }

    // Sets the bottom margin of an element
    margin_bottom(value) {
        this.element.style.marginBottom = this.pad_numeric(value);
        return this;
    }

    // Specifies the margin in the inline direction
    margin_inline(value) {
        this.element.style.marginInline = value;
        return this;
    }

    // Specifies the margin at the end in the inline direction
    margin_inline_end(value) {
        this.element.style.marginInlineEnd = value;
        return this;
    }

    // Specifies the margin at the start in the inline direction
    margin_inline_start(value) {
        this.element.style.marginInlineStart = value;
        return this;
    }

    // Sets the left margin of an element
    margin_left(value) {
        this.element.style.marginLeft = this.pad_numeric(value);
        return this;
    }

    // Sets the right margin of an element
    margin_right(value) {
        this.element.style.marginRight = this.pad_numeric(value);
        return this;
    }

    // Sets the top margin of an element
    margin_top(value) {
        this.element.style.marginTop = this.pad_numeric(value);
        return this;
    }

    // Hides parts of an element by masking or clipping an image at specific places
    mask(value) {
        this.element.style.mask = value;
        return this;
    }

    // Specifies the mask area
    mask_clip(value) {
        this.element.style.maskClip = value;
        return this;
    }

    // Represents a compositing operation used on the current mask layer with the mask layers below it
    mask_composite(value) {
        this.element.style.maskComposite = value;
        return this;
    }

    // Specifies an image to be used as a mask layer for an element
    mask_image(value) {
        this.element.style.maskImage = value;
        return this;
    }

    // Specifies whether the mask layer image is treated as a luminance mask or as an alpha mask
    mask_mode(value) {
        this.element.style.maskMode = value;
        return this;
    }

    // Specifies the origin position (the mask position area) of a mask layer image
    mask_origin(value) {
        this.element.style.maskOrigin = value;
        return this;
    }

    // Sets the starting position of a mask layer image (relative to the mask position area)
    mask_position(value) {
        this.element.style.maskPosition = value;
        return this;
    }

    // Specifies how the mask layer image is repeated
    mask_repeat(value) {
        this.element.style.maskRepeat = value;
        return this;
    }

    // Specifies the size of a mask layer image
    mask_size(value) {
        this.element.style.maskSize = this.pad_numeric(value);
        return this;
    }

    // Specifies whether an SVG <mask> element is treated as a luminance mask or as an alpha mask
    mask_type(value) {
        this.element.style.maskType = value;
        return this;
    }

    // Sets the maximum height of an element
    max_height(value) {
        this.element.style.maxHeight = this.pad_numeric(value);
        return this;
    }

    // Sets the maximum width of an element
    max_width(value) {
        this.element.style.maxWidth = this.pad_numeric(value);
        return this;
    }

    // Sets the maximum size of an element in the block direction
    max_block_size(value) {
        this.element.style.maxBlockSize = this.pad_numeric(value);
        return this;
    }

    // Sets the maximum size of an element in the inline direction
    max_inline_size(value) {
        this.element.style.maxInlineSize = this.pad_numeric(value);
        return this;
    }

    // Sets the minimum size of an element in the block direction
    min_block_size(value) {
        this.element.style.minBlockSize = this.pad_numeric(value);
        return this;
    }

    // Sets the minimum size of an element in the inline direction
    min_inline_size(value) {
        this.element.style.minInlineSize = this.pad_numeric(value);
        return this;
    }

    // Sets the minimum height of an element
    min_height(value) {
        this.element.style.minHeight = this.pad_numeric(value);
        return this;
    }

    // Sets the minimum width of an element
    min_width(value) {
        this.element.style.minWidth = this.pad_numeric(value);
        return this;
    }

    // Specifies how an element's content should blend with its direct parent background
    mix_blend_mode(value) {
        this.element.style.mixBlendMode = value;
        return this;
    }

    // Specifies how the contents of a replaced element should be fitted to the box established by its used height and width
    object_fit(value) {
        this.element.style.objectFit = value;
        return this;
    }

    // Specifies the alignment of the replaced element inside its box
    object_position(value) {
        this.element.style.objectPosition = value;
        return this;
    }

    // Is a shorthand, and specifies how to animate an element along a path
    offset(value) {
        this.element.style.offset = value;
        return this;
    }

    // Specifies a point on an element that is fixed to the path it is animated along
    offset_anchor(value) {
        this.element.style.offsetAnchor = value;
        return this;
    }

    // Specifies the position along a path where an animated element is placed
    offset_distance(value) {
        this.element.style.offsetDistance = value;
        return this;
    }

    // Specifies the path an element is animated along
    offset_path(value) {
        this.element.style.offsetPath = value;
        return this;
    }

    // Specifies rotation of an element as it is animated along a path
    offset_rotate(value) {
        this.element.style.offsetRotate = value;
        return this;
    }

    // Sets the opacity level for an element
    opacity(value) {
        this.element.style.opacity = value;
        return this;
    }

    // Sets the order of the flexible item, relative to the rest
    order(value) {
        this.element.style.order = value;
        return this;
    }

    // Sets the minimum number of lines that must be left at the bottom of a page or column
    orphans(value) {
        this.element.style.orphans = value;
        return this;
    }

    // A shorthand property for the outline-width, outline-style, and the outline-color properties
    outline(value) {
        this.element.style.outline = value;
        return this;
    }

    // Sets the color of an outline
    outline_color(value) {
        this.element.style.outlineColor = value;
        return this;
    }

    // Offsets an outline, and draws it beyond the border edge
    outline_offset(value) {
        this.element.style.outlineOffset = value;
        return this;
    }

    // Sets the style of an outline
    outline_style(value) {
        this.element.style.outlineStyle = value;
        return this;
    }

    // Sets the width of an outline
    outline_width(value) {
        this.element.style.outlineWidth = this.pad_numeric(value);
        return this;
    }

    // Specifies what happens if content overflows an element's box
    overflow(value) {
        this.element.style.overflow = value;
        return this;
    }

    // Specifies whether or not content in viewable area in a scrollable contianer should be pushed down when new content is loaded above
    overflow_anchor(value) {
        this.element.style.overflowAnchor = value;
        return this;
    }

    // Specifies whether or not the browser can break lines with long words, if they overflow the container
    overflow_wrap(value) {
        this.element.style.overflowWrap = value;
        return this;
    }

    // Specifies whether or not to clip the left/right edges of the content, if it overflows the element's content area
    overflow_x(value) {
        this.element.style.overflowX = value;
        return this;
    }

    // Specifies whether or not to clip the top/bottom edges of the content, if it overflows the element's content area
    overflow_y(value) {
        this.element.style.overflowY = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in x- and y-directions
    overscroll_behavior(value) {
        this.element.style.overscrollBehavior = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in the block direction
    overscroll_behavior_block(value) {
        this.element.style.overscrollBehaviorBlock = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in the inline direction
    overscroll_behavior_inline(value) {
        this.element.style.overscrollBehaviorInline = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in x-direction
    overscroll_behavior_x(value) {
        this.element.style.overscrollBehaviorX = value;
        return this;
    }

    // Specifies whether to have scroll chaining or overscroll affordance in y-directions
    overscroll_behavior_y(value) {
        this.element.style.overscrollBehaviorY = value;
        return this;
    }

    // A shorthand property for all the padding-* properties
    // padding(value) {
    //     this.element.style.padding = value;
    //     return this;
    // }

    // Specifies the padding in the block direction
    padding_block(value) {
        this.element.style.paddingBlock = value;
        return this;
    }

    // Specifies the padding at the end in the block direction
    padding_block_end(value) {
        this.element.style.paddingBlockEnd = value;
        return this;
    }

    // Specifies the padding at the start in the block direction
    padding_block_start(value) {
        this.element.style.paddingBlockStart = value;
        return this;
    }

    // Sets the bottom padding of an element
    padding_bottom(value) {
        this.element.style.paddingBottom = this.pad_numeric(value);
        return this;
    }

    // Specifies the padding in the inline direction
    padding_inline(value) {
        this.element.style.paddingInline = value;
        return this;
    }

    // Specifies the padding at the end in the inline direction
    padding_inline_end(value) {
        this.element.style.paddingInlineEnd = value;
        return this;
    }

    // Specifies the padding at the start in the inline direction
    padding_inline_start(value) {
        this.element.style.paddingInlineStart = value;
        return this;
    }

    // Sets the left padding of an element
    padding_left(value) {
        this.element.style.paddingLeft = this.pad_numeric(value);
        return this;
    }

    // Sets the right padding of an element
    padding_right(value) {
        this.element.style.paddingRight = this.pad_numeric(value);
        return this;
    }

    // Sets the top padding of an element
    padding_top(value) {
        this.element.style.paddingTop = this.pad_numeric(value);
        return this;
    }

    // Sets the page-break behavior after an element
    page_break_after(value) {
        this.element.style.pageBreakAfter = value;
        return this;
    }

    // Sets the page-break behavior before an element
    page_break_before(value) {
        this.element.style.pageBreakBefore = value;
        return this;
    }

    // Sets the page-break behavior inside an element
    page_break_inside(value) {
        this.element.style.pageBreakInside = value;
        return this;
    }

    // Sets the order of how an SVG element or text is painted.
    paint_order(value) {
        this.element.style.paintOrder = value;
        return this;
    }

    // Gives a 3D-positioned element some perspective
    perspective(value) {
        this.element.style.perspective = value;
        return this;
    }

    // Defines at which position the user is looking at the 3D-positioned element
    perspective_origin(value) {
        this.element.style.perspectiveOrigin = value;
        return this;
    }

    // Specifies align-content and justify-content property values for flexbox and grid layouts
    place_content(value) {
        this.element.style.placeContent = value;
        return this;
    }

    // Specifies align-items and justify-items property values for grid layouts
    place_items(value) {
        this.element.style.placeItems = value;
        return this;
    }

    // Specifies align-self and justify-self property values for grid layouts
    place_self(value) {
        this.element.style.placeSelf = value;
        return this;
    }

    // Defines whether or not an element reacts to pointer events
    pointer_events(value) {
        this.element.style.pointerEvents = value;
        return this;
    }

    // Specifies the type of positioning method used for an element (static, relative, absolute or fixed)
    // position(value) {
    //     this.element.style.position = value;
    //     return this;
    // }

    // Sets the type of quotation marks for embedded quotations
    quotes(value) {
        this.element.style.quotes = value;
        return this;
    }

    // Defines if (and how) an element is resizable by the user
    resize(value) {
        this.element.style.resize = value;
        return this;
    }

    // Specifies the right position of a positioned element
    right(value) {
        this.element.style.right = this.pad_numeric(value);
        return this;
    }

    // Specifies the rotation of an element
    rotate(value) {
        this.element.style.rotate = value;
        return this;
    }

    // Specifies the gap between the grid rows
    row_gap(value) {
        this.element.style.rowGap = value;
        return this;
    }

    // Specifies the size of an element by scaling up or down
    scale(value) {
        this.element.style.scale = value;
        return this;
    }

    // Specifies whether to smoothly animate the scroll position in a scrollable box, instead of a straight jump
    scroll_behavior(value) {
        this.element.style.scrollBehavior = value;
        return this;
    }

    // Specifies the margin between the snap position and the container
    scroll_margin(value) {
        this.element.style.scrollMargin = value;
        return this;
    }

    // Specifies the margin between the snap position and the container in the block direction
    scroll_margin_block(value) {
        this.element.style.scrollMarginBlock = value;
        return this;
    }

    // Specifies the end margin between the snap position and the container in the block direction
    scroll_margin_block_end(value) {
        this.element.style.scrollMarginBlockEnd = value;
        return this;
    }

    // Specifies the start margin between the snap position and the container in the block direction
    scroll_margin_block_start(value) {
        this.element.style.scrollMarginBlockStart = value;
        return this;
    }

    // Specifies the margin between the snap position on the bottom side and the container
    scroll_margin_bottom(value) {
        this.element.style.scrollMarginBottom = this.pad_numeric(value);
        return this;
    }

    // Specifies the margin between the snap position and the container in the inline direction
    scroll_margin_inline(value) {
        this.element.style.scrollMarginInline = value;
        return this;
    }

    // Specifies the end margin between the snap position and the container in the inline direction
    scroll_margin_inline_end(value) {
        this.element.style.scrollMarginInlineEnd = value;
        return this;
    }

    // Specifies the start margin between the snap position and the container in the inline direction
    scroll_margin_inline_start(value) {
        this.element.style.scrollMarginInlineStart = value;
        return this;
    }

    // Specifies the margin between the snap position on the left side and the container
    scroll_margin_left(value) {
        this.element.style.scrollMarginLeft = this.pad_numeric(value);
        return this;
    }

    // Specifies the margin between the snap position on the right side and the container
    scroll_margin_right(value) {
        this.element.style.scrollMarginRight = this.pad_numeric(value);
        return this;
    }

    // Specifies the margin between the snap position on the top side and the container
    scroll_margin_top(value) {
        this.element.style.scrollMarginTop = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance from the container to the snap position on the child elements
    scroll_padding(value) {
        this.element.style.scrollPadding = value;
        return this;
    }

    // Specifies the distance in block direction from the container to the snap position on the child elements
    scroll_padding_block(value) {
        this.element.style.scrollPaddingBlock = value;
        return this;
    }

    // Specifies the distance in block direction from the end of the container to the snap position on the child elements
    scroll_padding_block_end(value) {
        this.element.style.scrollPaddingBlockEnd = value;
        return this;
    }

    // Specifies the distance in block direction from the start of the container to the snap position on the child elements
    scroll_padding_block_start(value) {
        this.element.style.scrollPaddingBlockStart = value;
        return this;
    }

    // Specifies the distance from the bottom of the container to the snap position on the child elements
    scroll_padding_bottom(value) {
        this.element.style.scrollPaddingBottom = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance in inline direction from the container to the snap position on the child elements
    scroll_padding_inline(value) {
        this.element.style.scrollPaddingInline = value;
        return this;
    }

    // Specifies the distance in inline direction from the end of the container to the snap position on the child elements
    scroll_padding_inline_end(value) {
        this.element.style.scrollPaddingInlineEnd = value;
        return this;
    }

    // Specifies the distance in inline direction from the start of the container to the snap position on the child elements
    scroll_padding_inline_start(value) {
        this.element.style.scrollPaddingInlineStart = value;
        return this;
    }

    // Specifies the distance from the left side of the container to the snap position on the child elements
    scroll_padding_left(value) {
        this.element.style.scrollPaddingLeft = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance from the right side of the container to the snap position on the child elements
    scroll_padding_right(value) {
        this.element.style.scrollPaddingRight = this.pad_numeric(value);
        return this;
    }

    // Specifies the distance from the top of the container to the snap position on the child elements
    scroll_padding_top(value) {
        this.element.style.scrollPaddingTop = this.pad_numeric(value);
        return this;
    }

    // Specifies where to position elements when the user stops scrolling
    scroll_snap_align(value) {
        this.element.style.scrollSnapAlign = value;
        return this;
    }

    // Specifies scroll behaviour after fast swipe on trackpad or touch screen
    scroll_snap_stop(value) {
        this.element.style.scrollSnapStop = value;
        return this;
    }

    // Specifies how snap behaviour should be when scrolling
    scroll_snap_type(value) {
        this.element.style.scrollSnapType = value;
        return this;
    }

    // Specifies the color of the scrollbar of an element
    scrollbar_color(value) {
        this.element.style.scrollbarColor = value;
        return this;
    }

    // Specifies the width of a tab character
    tab_size(value) {
        this.element.style.tabSize = this.pad_numeric(value);
        return this;
    }

    // Defines the algorithm used to lay out table cells, rows, and columns
    table_layout(value) {
        this.element.style.tableLayout = value;
        return this;
    }

    // Specifies the horizontal alignment of text
    text_align(value) {
        this.element.style.textAlign = value;
        return this;
    }

    // Describes how the last line of a block or a line right before a forced line break is aligned when text-align is "justify"
    text_align_last(value) {
        this.element.style.textAlignLast = value;
        return this;
    }

    // Specifies the combination of multiple characters into the space of a single character
    text_combine_upright(value) {
        this.element.style.textCombineUpright = value;
        return this;
    }

    // Specifies the decoration added to text
    text_decoration(value) {
        this.element.style.textDecoration = value;
        return this;
    }

    // Specifies the color of the text-decoration
    text_decoration_color(value) {
        this.element.style.textDecorationColor = value;
        return this;
    }

    // Specifies the type of line in a text-decoration
    text_decoration_line(value) {
        this.element.style.textDecorationLine = value;
        return this;
    }

    // Specifies the style of the line in a text decoration
    text_decoration_style(value) {
        this.element.style.textDecorationStyle = value;
        return this;
    }

    // Specifies the thickness of the decoration line
    text_decoration_thickness(value) {
        this.element.style.textDecorationThickness = value;
        return this;
    }

    // Applies emphasis marks to text
    text_emphasis(value) {
        this.element.style.textEmphasis = value;
        return this;
    }

    // Specifies the indentation of the first line in a text-block
    text_indent(value) {
        this.element.style.textIndent = value;
        return this;
    }

    // Specifies the justification method used when text-align is "justify"
    text_justify(value) {
        this.element.style.textJustify = value;
        return this;
    }

    // Defines the orientation of characters in a line
    text_orientation(value) {
        this.element.style.textOrientation = value;
        return this;
    }

    // Specifies what should happen when text overflows the containing element
    text_overflow(value) {
        this.element.style.textOverflow = value;
        return this;
    }

    // Adds shadow to text
    text_shadow(value) {
        this.element.style.textShadow = value;
        return this;
    }

    // Controls the capitalization of text
    text_transform(value) {
        this.element.style.textTransform = value;
        return this;
    }

    // Specifies the position of the underline which is set using the text-decoration property
    text_underline_position(value) {
        this.element.style.textUnderlinePosition = value;
        return this;
    }

    // Specifies the top position of a positioned element
    top(value) {
        this.element.style.top = this.pad_numeric(value);
        return this;
    }

    // Applies a 2D or 3D transformation to an element
    transform(value) {
        this.element.style.transform = value;
        return this;
    }

    // Allows you to change the position on transformed elements
    transform_origin(value) {
        this.element.style.transformOrigin = value;
        return this;
    }

    // Specifies how nested elements are rendered in 3D space
    transform_style(value) {
        this.element.style.transformStyle = value;
        return this;
    }

    // A shorthand property for all the transition-* properties
    transition(value) {
        this.element.style.transition = value;
        return this;
    }

    // Specifies when the transition effect will start
    transition_delay(value) {
        this.element.style.transitionDelay = value;
        return this;
    }

    // Specifies how many seconds or milliseconds a transition effect takes to complete
    transition_duration(value) {
        this.element.style.transitionDuration = value;
        return this;
    }

    // Specifies the name of the CSS property the transition effect is for
    transition_property(value) {
        this.element.style.transitionProperty = value;
        return this;
    }

    // Specifies the speed curve of the transition effect
    transition_timing_function(value) {
        this.element.style.transitionTimingFunction = value;
        return this;
    }

    // Specifies the position of an element
    translate(value) {
        this.element.style.translate = value;
        return this;
    }

    // Used together with the direction property to set or return whether the text should be overridden to support multiple languages in the same document
    unicode_bidi(value) {
        this.element.style.unicodeBidi = value;
        return this;
    }

    // Specifies whether the text of an element can be selected
    user_select(value) {
        this.element.style.userSelect = value;
        return this;
    }

    // Sets the vertical alignment of an element
    // vertical_align(value) {
    //     this.element.style.verticalAlign = value;
    //     return this;
    // }

    // Specifies whether or not an element is visible
    visibility(value) {
        this.element.style.visibility = value;
        return this;
    }

    // Specifies how white-space inside an element is handled
    white_space(value) {
        this.element.style.whiteSpace = value;
        return this;
    }

    // Sets the minimum number of lines that must be left at the top of a page or column
    widows(value) {
        this.element.style.widows = value;
        return this;
    }

    // Sets the width of an element
    // width(value) {
    //     this.element.style.width = this.pad_numeric(value);
    //     return this;
    // }

    // Specifies how words should break when reaching the end of a line
    word_break(value) {
        this.element.style.wordBreak = value;
        return this;
    }

    // Increases or decreases the space between words in a text
    word_spacing(value) {
        this.element.style.wordSpacing = value;
        return this;
    }

    // Allows long, unbreakable words to be broken and wrap to the next line
    word_wrap(value) {
        this.element.style.wordWrap = value;
        return this;
    }

    // Specifies whether lines of text are laid out horizontally or vertically
    writing_mode(value) {
        this.element.style.writingMode = value;
        return this;
    }

    // ---------------------------------------------------------
    // Automatically generated HTML attribute functions. 
    // Reference: https://www.w3schools.com/tags/ref_attributes.asp. 

    // Specifies the types of files that the server accepts (only for type="file")
    accept(value) {
    	this.element.accept = value;
    	return this;
    }

    // Specifies the character encodings that are to be used for the form submission
    accept_charset(value) {
    	this.element.accept_charset = value;
    	return this;
    }

    // Specifies where to send the form-data when a form is submitted
    action(value) {
    	this.element.action = value;
    	return this;
    }

    // Specifies an alternate text when the original element fails to display
    alt(value) {
    	this.element.alt = value;
    	return this;
    }

    // Specifies that the script is executed asynchronously (only for external scripts)
    async(value) {
    	this.element.async = value;
    	return this;
    }

    // Specifies whether the <form> or the <input> element should have autocomplete enabled
    auto_complete(value) {
    	this.element.autocomplete = value;
    	return this;
    }

    // Specifies that the element should automatically get focus when the page loads
    auto_focus(value) {
    	this.element.autofocus = value;
    	return this;
    }

    // Specifies that the audio/video will start playing as soon as it is ready
    auto_play(value) {
    	this.element.autoplay = value;
    	return this;
    }

    // Specifies the character encoding
    charset(value) {
    	this.element.charset = value;
    	return this;
    }

    // Specifies that an <input> element should be pre-selected when the page loads (for type="checkbox" or type="radio")
    checked(value) {
    	this.element.checked = value;
    	return this;
    }

    // Specifies a URL which explains the quote/deleted/inserted text
    cite(value) {
    	this.element.cite = value;
    	return this;
    }

    // Specifies one or more classnames for an element (refers to a class in a style sheet)
    class(value) {
    	this.element.class = value;
    	return this;
    }

    // Specifies the visible width of a text area
    cols(value) {
    	this.element.cols = value;
    	return this;
    }

    // Specifies the number of columns a table cell should span
    colspan(value) {
    	this.element.colspan = value;
    	return this;
    }

    // Gives the value associated with the http-equiv or name attribute
    content(value) {
    	this.element.content = value;
    	return this;
    }

    // Specifies whether the content of an element is editable or not
    content_editable(value) {
    	this.element.contenteditable = value;
    	return this;
    }

    // Specifies that audio/video controls should be displayed (such as a play/pause button etc)
    controls(value) {
    	this.element.controls = value;
    	return this;
    }

    // Specifies the coordinates of the area
    coords(value) {
    	this.element.coords = value;
    	return this;
    }

    // Specifies the URL of the resource to be used by the object
    data(value) {
    	this.element.data = value;
    	return this;
    }

    // Specifies the date and time
    datetime(value) {
    	this.element.datetime = value;
    	return this;
    }

    // Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate
    default(value) {
    	this.element.default = value;
    	return this;
    }

    // Specifies that the script is executed when the page has finished parsing (only for external scripts)
    defer(value) {
    	this.element.defer = value;
    	return this;
    }

    // Specifies the text direction for the content in an element
    dir(value) {
    	this.element.dir = value;
    	return this;
    }

    // Specifies that the text direction will be submitted
    dirname(value) {
    	this.element.dirname = value;
    	return this;
    }

    // Specifies that the specified element/group of elements should be disabled
    disabled(value) {
    	this.element.disabled = value;
    	return this;
    }

    // Specifies that the target will be downloaded when a user clicks on the hyperlink
    download(value) {
    	this.element.download = value;
    	return this;
    }

    // Specifies whether an element is draggable or not
    draggable(value) {
    	this.element.draggable = value;
    	return this;
    }

    // Specifies how the form-data should be encoded when submitting it to the server (only for method="post")
    enctype(value) {
    	this.element.enctype = value;
    	return this;
    }

    // Specifies which form element(s) a label/calculation is bound to
    for(value) {
    	this.element.for = value;
    	return this;
    }

    // Specifies the name of the form the element belongs to
    form(value) {
    	this.element.form = value;
    	return this;
    }

    // Specifies where to send the form-data when a form is submitted. Only for type="submit"
    form_action(value) {
    	this.element.formaction = value;
    	return this;
    }

    // Specifies one or more headers cells a cell is related to
    headers(value) {
    	this.element.headers = value;
    	return this;
    }

    // Specifies the height of the element
    // height(value) {
    // 	this.element.height = this.pad_numeric(value);
    // 	return this;
    // }

    // Specifies that an element is not yet, or is no longer, relevant
    // hidden(value) {
    // 	this.element.hidden = value;
    // 	return this;
    // }

    // Specifies the range that is considered to be a high value
    high(value) {
    	this.element.high = value;
    	return this;
    }

    // Specifies the URL of the page the link goes to
    href(value) {
    	this.element.href = value;
    	return this;
    }

    // Specifies the language of the linked document
    href_lang(value) {
    	this.element.hreflang = value;
    	return this;
    }

    // Provides an HTTP header for the information/value of the content attribute
    http_equiv(value) {
    	this.element.http_equiv = value;
    	return this;
    }

    // Specifies a unique id for an element
    id(value) {
    	this.element.id = value;
    	return this;
    }

    // Specifies an image as a server-side image map
    is_map(value) {
    	this.element.ismap = value;
    	return this;
    }

    // Specifies the kind of text track
    kind(value) {
    	this.element.kind = value;
    	return this;
    }

    // Specifies the title of the text track
    label(value) {
    	this.element.label = value;
    	return this;
    }

    // Specifies the language of the element's content
    lang(value) {
    	this.element.lang = value;
    	return this;
    }

    // Refers to a <datalist> element that contains pre-defined options for an <input> element
    list(value) {
    	this.element.list = value;
    	return this;
    }

    // Specifies that the audio/video will start over again, every time it is finished
    loop(value) {
    	this.element.loop = value;
    	return this;
    }

    // Specifies the range that is considered to be a low value
    low(value) {
    	this.element.low = value;
    	return this;
    }

    // Specifies the maximum value
    max(value) {
    	this.element.max = value;
    	return this;
    }

    // Specifies the maximum number of characters allowed in an element
    max_length(value) {
    	this.element.maxlength = value;
    	return this;
    }

    // Specifies what media/device the linked document is optimized for
    // media(value) {
    // 	this.element.media = value;
    // 	return this;
    // }

    // Specifies the HTTP method to use when sending form-data
    method(value) {
    	this.element.method = value;
    	return this;
    }

    // Specifies a minimum value
    min(value) {
    	this.element.min = value;
    	return this;
    }

    // Specifies that a user can enter more than one value
    multiple(value) {
    	this.element.multiple = value;
    	return this;
    }

    // Specifies that the audio output of the video should be muted
    muted(value) {
    	this.element.muted = value;
    	return this;
    }

    // Specifies the name of the element
    name(value) {
    	this.element.name = value;
    	return this;
    }

    // Specifies that the form should not be validated when submitted
    no_validate(value) {
    	this.element.novalidate = value;
    	return this;
    }

    // Script to be run on abort
    on_abort(value) {
    	this.element.onabort = value;
    	return this;
    }

    // Script to be run after the document is printed
    on_after_print(value) {
    	this.element.onafterprint = value;
    	return this;
    }

    // Script to be run before the document is printed
    on_before_print(value) {
    	this.element.onbeforeprint = value;
    	return this;
    }

    // Script to be run when the document is about to be unloaded
    on_before_unload(value) {
    	this.element.onbeforeunload = value;
    	return this;
    }

    // Script to be run when the element loses focus
    on_blur(value) {
    	this.element.onblur = value;
    	return this;
    }

    // Script to be run when a file is ready to start playing (when it has buffered enough to begin)
    on_canplay(value) {
    	this.element.oncanplay = value;
    	return this;
    }

    // Script to be run when a file can be played all the way to the end without pausing for buffering
    on_canplay_through(value) {
    	this.element.oncanplaythrough = value;
    	return this;
    }

    // Script to be run when the value of the element is changed
    on_change(value) {
    	this.element.onchange = value;
    	return this;
    }

    // Script to be run when the element is being clicked
    on_click(value) {
    	this.element.onclick = value;
    	return this;
    }

    // Script to be run when a context menu is triggered
    on_context_menu(value) {
    	this.element.oncontextmenu = value;
    	return this;
    }

    // Script to be run when the content of the element is being copied
    on_copy(value) {
    	this.element.oncopy = value;
    	return this;
    }

    // Script to be run when the cue changes in a <track> element
    on_cue_change(value) {
    	this.element.oncuechange = value;
    	return this;
    }

    // Script to be run when the content of the element is being cut
    on_cut(value) {
    	this.element.oncut = value;
    	return this;
    }

    // Script to be run when the element is being double-clicked
    on_dbl_click(value) {
    	this.element.ondblclick = value;
    	return this;
    }

    // Script to be run when the element is being dragged
    on_drag(value) {
    	this.element.ondrag = value;
    	return this;
    }

    // Script to be run at the end of a drag operation
    on_drag_end(value) {
    	this.element.ondragend = value;
    	return this;
    }

    // Script to be run when an element has been dragged to a valid drop target
    on_drag_enter(value) {
    	this.element.ondragenter = value;
    	return this;
    }

    // Script to be run when an element leaves a valid drop target
    on_drag_leave(value) {
    	this.element.ondragleave = value;
    	return this;
    }

    // Script to be run when an element is being dragged over a valid drop target
    on_drag_over(value) {
    	this.element.ondragover = value;
    	return this;
    }

    // Script to be run at the start of a drag operation
    on_drag_start(value) {
    	this.element.ondragstart = value;
    	return this;
    }

    // Script to be run when dragged element is being dropped
    on_drop(value) {
    	this.element.ondrop = value;
    	return this;
    }

    // Script to be run when the length of the media changes
    on_duration_change(value) {
    	this.element.ondurationchange = value;
    	return this;
    }

    // Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)
    on_emptied(value) {
    	this.element.onemptied = value;
    	return this;
    }

    // Script to be run when the media has reach the end (a useful event for messages like "thanks for listening")
    on_ended(value) {
    	this.element.onended = value;
    	return this;
    }

    // Script to be run when an error occurs
    on_error(value) {
    	this.element.onerror = value;
    	return this;
    }

    // Script to be run when the element gets focus
    on_focus(value) {
    	this.element.onfocus = value;
    	return this;
    }

    // Script to be run when there has been changes to the anchor part of the a URL
    on_hash_change(value) {
    	this.element.onhashchange = value;
    	return this;
    }

    // Script to be run when the element gets user input
    on_input(value) {
    	this.element.oninput = value;
    	return this;
    }

    // Script to be run when the element is invalid
    on_invalid(value) {
    	this.element.oninvalid = value;
    	return this;
    }

    // Script to be run when a user is pressing a key
    on_key_down(value) {
    	this.element.onkeydown = value;
    	return this;
    }

    // Script to be run when a user presses a key
    on_key_press(value) {
    	this.element.onkeypress = value;
    	return this;
    }

    // Script to be run when a user releases a key
    on_key_up(value) {
    	this.element.onkeyup = value;
    	return this;
    }

    // Script to be run when the element is finished loading
    on_load(value) {
    	this.element.onload = value;
    	return this;
    }

    // Script to be run when media data is loaded
    on_loaded_data(value) {
    	this.element.onloadeddata = value;
    	return this;
    }

    // Script to be run when meta data (like dimensions and duration) are loaded
    on_loaded_metadata(value) {
    	this.element.onloadedmetadata = value;
    	return this;
    }

    // Script to be run just as the file begins to load before anything is actually loaded
    on_load_start(value) {
    	this.element.onloadstart = value;
    	return this;
    }

    // Script to be run when a mouse button is pressed down on an element
    on_mouse_down(value) {
    	this.element.onmousedown = value;
    	return this;
    }

    // Script to be run as long as the  mouse pointer is moving over an element
    on_mouse_move(value) {
    	this.element.onmousemove = value;
    	return this;
    }

    // Script to be run when a mouse pointer moves out of an element
    on_mouse_out(value) {
    	this.element.onmouseout = value;
    	return this;
    }

    // Script to be run when a mouse pointer moves over an element
    on_mouse_over(value) {
    	this.element.onmouseover = value;
    	return this;
    }

    // Script to be run when a mouse button is released over an element
    on_mouse_up(value) {
    	this.element.onmouseup = value;
    	return this;
    }

    // Script to be run when a mouse wheel is being scrolled over an element
    on_mouse_wheel(value) {
    	this.element.onmousewheel = value;
    	return this;
    }

    // Script to be run when the browser starts to work offline
    on_offline(value) {
    	this.element.onoffline = value;
    	return this;
    }

    // Script to be run when the browser starts to work online
    on_online(value) {
    	this.element.ononline = value;
    	return this;
    }

    // Script to be run when a user navigates away from a page
    on_page_hide(value) {
    	this.element.onpagehide = value;
    	return this;
    }

    // Script to be run when a user navigates to a page
    on_page_show(value) {
    	this.element.onpageshow = value;
    	return this;
    }

    // Script to be run when the user pastes some content in an element
    on_paste(value) {
    	this.element.onpaste = value;
    	return this;
    }

    // Script to be run when the media is paused either by the user or programmatically
    on_pause(value) {
    	this.element.onpause = value;
    	return this;
    }

    // Script to be run when the media has started playing
    on_play(value) {
    	this.element.onplay = value;
    	return this;
    }

    // Script to be run when the media has started playing
    on_playing(value) {
    	this.element.onplaying = value;
    	return this;
    }

    // Script to be run when the window's history changes.
    on_popstate(value) {
    	this.element.onpopstate = value;
    	return this;
    }

    // Script to be run when the browser is in the process of getting the media data
    onprogress(value) {
    	this.element.onprogress = value;
    	return this;
    }

    // Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode).
    on_rate_change(value) {
    	this.element.onratechange = value;
    	return this;
    }

    // Script to be run when a reset button in a form is clicked.
    on_reset(value) {
    	this.element.onreset = value;
    	return this;
    }

    // Script to be run when the browser window is being resized.
    on_resize(value) {
    	this.element.onresize = value;
    	return this;
    }

    // Script to be run when an element's scrollbar is being scrolled
    on_scroll(value) {
    	this.element.onscroll = value;
    	return this;
    }

    // Script to be run when the user writes something in a search field (for <input type="search">)
    on_search(value) {
    	this.element.onsearch = value;
    	return this;
    }

    // Script to be run when the seeking attribute is set to false indicating that seeking has ended
    on_seeked(value) {
    	this.element.onseeked = value;
    	return this;
    }

    // Script to be run when the seeking attribute is set to true indicating that seeking is active
    on_seeking(value) {
    	this.element.onseeking = value;
    	return this;
    }

    // Script to be run when the element gets selected
    on_select(value) {
    	this.element.onselect = value;
    	return this;
    }

    // Script to be run when the browser is unable to fetch the media data for whatever reason
    on_stalled(value) {
    	this.element.onstalled = value;
    	return this;
    }

    // Script to be run when a Web Storage area is updated
    on_storage(value) {
    	this.element.onstorage = value;
    	return this;
    }

    // Script to be run when a form is submitted
    on_submit(value) {
    	this.element.onsubmit = value;
    	return this;
    }

    // Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason
    on_suspend(value) {
    	this.element.onsuspend = value;
    	return this;
    }

    // Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)
    on_time_update(value) {
    	this.element.ontimeupdate = value;
    	return this;
    }

    // Script to be run when the user opens or closes the <details> element
    on_toggle(value) {
    	this.element.ontoggle = value;
    	return this;
    }

    // Script to be run when a page has unloaded (or the browser window has been closed)
    on_unload(value) {
    	this.element.onunload = value;
    	return this;
    }

    // Script to be run each time the volume of a video/audio has been changed
    on_volume_change(value) {
    	this.element.onvolumechange = value;
    	return this;
    }

    // Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)
    on_waiting(value) {
    	this.element.onwaiting = value;
    	return this;
    }

    // Script to be run when the mouse wheel rolls up or down over an element
    on_wheel(value) {
    	this.element.onwheel = value;
    	return this;
    }

    // Specifies that the details should be visible (open) to the user
    open(value) {
    	this.element.open = value;
    	return this;
    }

    // Specifies what value is the optimal value for the gauge
    optimum(value) {
    	this.element.optimum = value;
    	return this;
    }

    // Specifies a regular expression that an <input> element's value is checked against
    pattern(value) {
    	this.element.pattern = value;
    	return this;
    }

    // Specifies a short hint that describes the expected value of the element
    placeholder(value) {
    	this.element.placeholder = value;
    	return this;
    }

    // Specifies an image to be shown while the video is downloading, or until the user hits the play button
    poster(value) {
    	this.element.poster = value;
    	return this;
    }

    // Specifies if and how the author thinks the audio/video should be loaded when the page loads
    preload(value) {
    	this.element.preload = value;
    	return this;
    }

    // Specifies that the element is read-only
    readonly(value) {
    	this.element.readonly = value;
    	return this;
    }

    // Specifies the relationship between the current document and the linked document
    rel(value) {
    	this.element.rel = value;
    	return this;
    }

    // Specifies that the element must be filled out before submitting the form
    required(value) {
    	this.element.required = value;
    	return this;
    }

    // Specifies that the list order should be descending (9,8,7...)
    reversed(value) {
    	this.element.reversed = value;
    	return this;
    }

    // Specifies the visible number of lines in a text area
    rows(value) {
    	this.element.rows = value;
    	return this;
    }

    // Specifies the number of rows a table cell should span
    row_span(value) {
    	this.element.rowspan = value;
    	return this;
    }

    // Enables an extra set of restrictions for the content in an <iframe>
    sandbox(value) {
    	this.element.sandbox = value;
    	return this;
    }

    // Specifies whether a header cell is a header for a column, row, or group of columns or rows
    scope(value) {
    	this.element.scope = value;
    	return this;
    }

    // Specifies that an option should be pre-selected when the page loads
    selected(value) {
    	this.element.selected = value;
    	return this;
    }

    // Specifies the shape of the area
    shape(value) {
    	this.element.shape = value;
    	return this;
    }

    // Specifies the width, in characters (for <input>) or specifies the number of visible options (for <select>)
    size(value) {
    	this.element.size = value;
    	return this;
    }

    // Specifies the size of the linked resource
    sizes(value) {
    	this.element.sizes = value;
    	return this;
    }

    // Specifies the number of columns to span
    span(value) {
    	this.element.span = value;
    	return this;
    }

    // Specifies whether the element is to have its spelling and grammar checked or not
    spell_check(value) {
    	this.element.spellcheck = value;
    	return this;
    }

    // Specifies the URL of the media file
    src(value) {
    	this.element.src = value;
    	return this;
    }

    // Specifies the HTML content of the page to show in the <iframe>
    src_doc(value) {
    	this.element.srcdoc = value;
    	return this;
    }

    // Specifies the language of the track text data (required if kind="subtitles")
    src_lang(value) {
    	this.element.srclang = value;
    	return this;
    }

    // Specifies the URL of the image to use in different situations
    src_set(value) {
    	this.element.srcset = value;
    	return this;
    }

    // Specifies the start value of an ordered list
    start(value) {
    	this.element.start = value;
    	return this;
    }

    // Specifies the legal number intervals for an input field
    step(value) {
    	this.element.step = value;
    	return this;
    }

    // Specifies an inline CSS style for an element
    // style(value) {
    // 	this.element.style = value;
    // 	return this;
    // }

    // Specifies the tabbing order of an element
    tab_index(value) {
    	this.element.tabindex = value;
    	return this;
    }

    // Specifies the target for where to open the linked document or where to submit the form
    target(value) {
    	this.element.target = value;
    	return this;
    }

    // Specifies extra information about an element
    title(value) {
    	this.element.title = value;
    	return this;
    }

    // Specifies whether the content of an element should be translated or not
    translate(value) {
    	this.element.translate = value;
    	return this;
    }

    // Specifies the type of element
    type(value) {
    	this.element.type = value;
    	return this;
    }

    // Specifies an image as a client-side image map
    use_map(value) {
    	this.element.usemap = value;
    	return this;
    }

    // Specifies the value of the element
    value(value) {
    	this.element.value = value;
    	return this;
    }

    // Specifies the width of the element
    // width(value) {
    // 	this.element.width = this.pad_numeric(value);
    // 	return this;
    // }

    // Specifies how the text in a text area is to be wrapped when submitted in a form
    // wrap(value) {
    // 	this.element.wrap = value;
    // 	return this;
    // }

    // Script to be run when the message is triggered
    onmessage(value) {
    	this.element.onmessage = value;
    	return this;
    }
	
};
