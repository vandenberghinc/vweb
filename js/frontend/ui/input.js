/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Input.
@constructor_wrapper
@register_element
class InputElement extends CreateVElementClass({
	type: "Input",
	tag: "input",
	default_style: {
		"margin": "0px 0px 0px 0px",
		"padding": "2.5px 5px 2.5px 5px",
		"height": "20px",
		"font": "inherit",
		"color": "inherit",
		"background": "none",
		"outline": "none",
		"border": "none",
		"border-radius": "10px",
		"text-align": "start",
		"white-space": "nowrap",
	},
	default_attributes: {
        "spellcheck": "false",
        "autocorrect": "off",
        "autocapitalize": "none",
	},
}) {
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super();

		// Input type.
		this.type("text");

		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// PasswordInput.
@constructor_wrapper
@register_element
class PasswordInputElement extends CreateVElementClass({
	type: "PasswordInput",
	tag: "input",
	default_style: {
		"margin": "0px 0px 0px 0px",
		"padding": "2.5px 5px 2.5px 5px",
		"height": "20px",
		"font": "inherit",
		"color": "inherit",
		"background": "none",
		"outline": "none",
		"border": "none",
		"border-radius": "10px",
		"text-align": "start",
		"white-space": "nowrap",
	},
}) {
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super();

		// Input type.
		this.type("password");
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// EmailInput.
@constructor_wrapper
@register_element
class EmailInputElement extends CreateVElementClass({
	type: "EmailInput",
	tag: "input",
	default_style: {
		"margin": "0px 0px 0px 0px",
		"padding": "2.5px 5px 2.5px 5px",
		"height": "20px",
		"font": "inherit",
		"color": "inherit",
		"background": "none",
		"outline": "none",
		"border": "none",
		"border-radius": "10px",
		"text-align": "start",
		"white-space": "nowrap",
	},
}) {
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super();

		// Input type.
		this.type("email");
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// PhoneNumberInput.
@constructor_wrapper
@register_element
class PhoneNumberInputElement extends CreateVElementClass({
	type: "PhoneNumberInput",
	tag: "input",
	default_style: {
		"margin": "0px 0px 0px 0px",
		"padding": "2.5px 5px 2.5px 5px",
		"height": "20px",
		"font": "inherit",
		"color": "inherit",
		"background": "none",
		"outline": "none",
		"border": "none",
		"border-radius": "10px",
		"text-align": "start",
		"white-space": "nowrap",
	},
}) {
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super();

		// Input type.
		this.type("tel");
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// InputBox.
@constructor_wrapper
@register_element
class InputBoxElement extends CreateVElementClass({
	type: "InputBox",
	tag: "textarea",
	default_style: {
		"margin": "0px 0px 0px 0px",
		"padding": "2.5px 5px 2.5px 5px",
		"height": "20px",
		"font": "inherit",
		"color": "inherit",
		"background": "none",
		"outline": "none",
		"border": "none",
		"border-radius": "10px",
		"text-align": "start",
		"white-space": "wrap",
		"resize": "none",
	},
}) {
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super();

		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// SelectOptionInput.
@constructor_wrapper
@register_element
class SelectOptionInputElement extends CreateVElementClass({
	type: "SelectOptionInput",
	tag: "select",
	default_style: {
		"margin": "0px 0px 0px 0px",
		"padding": "2.5px 5px 2.5px 5px",
		"height": "20px",
		"font": "inherit",
		"color": "inherit",
		"background": "none",
		"outline": "none",
		"border": "none",
		"border-radius": "10px",
		"text-align": "start",
		"white-space": "wrap",
		"resize": "none",
	},
}) {
	
	// Constructor.
	constructor() {
		
		// Initialize base class.
		super();

		// Add children.
		for (let i = 0; i < arguments.length; i++) {
			let e = document.createElement("option");
			e.style.font = "inherit";
			e.value = arguments[i];
			e.textContent = arguments[i];
			if (i == 0) {
				e.selected = true;
				// e.disabled = true;
			}
			this.append(e);
		}
		
	}
	
}

// Extended input.
@constructor_wrapper
@register_element
class ExtendedInputElement extends VStackElement {

	// Default styling.
	// static default_style = Object.assign({}, HStackElement.default_style, {
	static default_style = {
		...VStackElement.default_style,
		"color": "inherit",
		"font-size": "16px",
		// Custom.
		"--input-padding": "12px 6px",
		"--input-border-radius": "5px",
		"--input-border-color": "gray",
		"--image-mask-color": "#000",
		"--image-size": "20px",
		"--image-margin-right": "10px",
		"--image-margin-left": "5px",
		"--image-alt": "VWeb",
		"--focus-color": "#8EB8EB",
		"--missing-color": "#E8454E",
	};

	// Constructor.
	constructor({
		label = null,
		image = null,
		alt = "",
		placeholder = "Input",
		id = null,
		readonly = false,
		required = false,
		type = Input,
	} = {}) {

		// Initialize super.
		super();

		// Set id.
		if (id != null) {
			this.id(id);
		}

		// Attributes.
		this.element_type = "ExtendedInput";
		this._focus_color = ExtendedInputElement.default_style["--focus-color"];
		this._missing_color = ExtendedInputElement.default_style["--missing-color"];
		this._mask_color = ExtendedInputElement.default_style["--image-mask-color"];
		this._missing = false;

		// Set default styling.
		this.styles(ExtendedInputElement.default_style);

		// Title element.
		this.label = Text(label)
			.parent(this)
			.font_size("inherit")
			.margin(0, 0, 5, 0)
			.color("inherit")
			.width("fit-content")
			.ellipsis_overflow(true)
		if (label == null) {
			this.label.hide();
		}

		// Title element.
		this.image = ImageMask(image)
			.parent(this)
            .mask_color(this._mask_color)
            .frame(ExtendedInputElement.default_style["--image-size"], ExtendedInputElement.default_style["--image-size"])
            .margin(0)
            .margin_right(ExtendedInputElement.default_style["--image-margin-right"])
            .margin_left(ExtendedInputElement.default_style["--image-margin-left"])
            .alt(alt !== "" ? alt : ExtendedInputElement.default_style["--image-alt"]);
        if (image == null) {
			this.image.hide();
		}

		// Input element.
		this.input = type(placeholder)
			.parent(this)
			.color("inherit")
			.readonly(readonly)
			.font_size("inherit")
			.margin(0)
			.width("100%")
			.stretch(true)
			.outline("none")
			.line_height("1.0em")
			.box_shadow("none")
			.on_focus(() => {
				if (this._missing !== true) {
					this.container.outline(`1px solid ${this._focus_color}`)
					this.container.box_shadow(`0 0 0 3px ${this._focus_color}80`)
				}
			})
			.on_blur(() => {
				if (this._missing !== true) {
					this.container.outline("0px solid transparent")
					this.container.box_shadow(`0 0 0 0px transparent`)
				}
			})

		// The hstack container.
		this.container = HStack(this.image, this.input)
			.parent(this)
			.padding(ExtendedInputElement.default_style["--input-padding"])
			.border_radius(ExtendedInputElement.default_style["--input-border-radius"])
			.border_width(1)
			.border_style("solid")
			.border_color(ExtendedInputElement.default_style["--input-border-color"])
			.transition("outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out")
			.outline("0px solid transparent")
			.box_shadow(`0 0 0 0px transparent`)
			.width(100%)

		// The error message.
		this.error = Text("Incomplete field")
			.color(this._missing_color)
			.font_size("0.8em")
			.margin(5, 0, 0, 2.5)
			.padding(0)
			.hide()

		// Set id.
		if (id != null) {
			this.id(id);
		}

		// Set required.
		if (required) {
			this.required(required);
		}

		// Append.
		this.append(this.label, this.container, this.error);
	}

	// Get the styling attributes.
	// The values of the children that may have been changed by the custom funcs should be added.
	styles(style_dict) {
		if (style_dict == null) {
			let styles = super.styles();
			styles["--input-padding"] = this.input.padding();
			styles["--input-border-radius"] = this.input.border_radius();
			styles["--input-border-color"] = this.input.border_color();
			styles["--image-mask-color"] = this._mask_color;
			styles["--image-size"] = this.image.width();
			styles["--image-margin-right"] = this.image.margin_right();
			styles["--image-margin-left"] = this.image.margin_left();
			styles["--image-alt"] = this.image.alt() || "VWeb";
			styles["--focus-color"] = this._focus_color;
			styles["--missing-color"] = this._missing_color;
			return styles;
		} else {
			return super.styles(style_dict);
		}
	}

	// Set default since it inherits an element.
	set_default() {
		return super.set_default(ExtendedInputElement);
	}

	// Set the focus color.
	focus_color(val) {
		if (val == null) { return this._focus_color; }
		this._focus_color = val;
		return this;
	}

	// Set the missing color.
	missing_color(val) {
		if (val == null) { return this._missing_color; }
		this._missing_color = val;
		this.error.color(this._missing_color);
		return this;
	}

	// Set missing.
	missing(to = null, err = "Incomplete field") {
		if (to == null) { return this._missing; }
		else if (to === true) {
			this._missing = true;
			this.container.outline(`1px solid ${this._missing_color}`)
			this.container.box_shadow(`0 0 0 3px ${this._missing_color}80`)
			this.image.mask_color(this._missing_color)
			this.error.show();
			if (err) {
				this.error.text(err);
			}
		} else {
			this._missing = false;
			this.container.outline("0px solid transparent")
			this.container.box_shadow(`0 0 0 0px transparent`)
			this.image.mask_color(this._mask_color)
			this.error.hide();
		}
		return this;
	}

	// Submit the item, throws an error when the item is not defined.
	submit() {
		const value = this.value();
		if (value == null || value === "") {
			this.missing(true);
			throw Error("Fill in all the required fields.");
		}
		this.missing(false);
		return value;
	}

	// Set or get the mask color.
	mask_color(val) {
		if (val == null) { return this._mask_color; }
		this._mask_color = val;
		this.image.mask_color(this._mask_color);
		return this;
	}

	// ---------------------------------------------------------
	// Relay functions.

	text(val) { if (val == null) { return this.label.text(); } this.label.text(val); return this; }
	value(val) { if (val == null) { return this.input.value(); } this.input.value(val); return this; }
	required(val) { if (val == null) { return this.input.required(); } this.input.required(val); return this; }
	on_enter(val) { if (val == null) { return this.input.on_enter(); } this.input.on_enter(val); return this; }
	on_input(val) { if (val == null) { return this.input.on_input(); } this.input.on_input(val); return this; }
	border_radius(val) { if (val == null) { return this.container.border_radius(); } this.container.border_radius(val); return this; }
	border_color(val) { if (val == null) { return this.container.border_color(); } this.container.border_color(val); return this; }
	border_width(val) { if (val == null) { return this.container.border_width(); } this.container.border_width(val); return this; }
	border_style(val) { if (val == null) { return this.container.border_style(); } this.container.border_style(val); return this; }
	padding(...args) {
		if (args.length === 0 || (args.length === 1 && args[0] == null)) { return this.container.padding(); }
		this.container.padding(...args);
		return this;
	}
	border(...args) {
		if (args.length === 0 || (args.length === 1 && args[0] == null)) { return this.container.border(); }
		this.container.border(...args);
		return this;
	}
}


// Extended input.
@constructor_wrapper
@register_element
class ExtendedSelectElement extends VStackElement {

	// Default styling.
	// static default_style = Object.assign({}, HStackElement.default_style, {
	static default_style = {
		...VStackElement.default_style,
		"color": "inherit",
		"font-size": "16px",
		"background": "#FFFFFF",
		// Custom.
		"--input-padding": "12px 6px",
		"--input-border-radius": "5px",
		"--input-border-color": "gray",
		"--image-mask-color": "#000",
		"--image-size": "20px",
		"--image-margin-right": "10px",
		"--image-margin-left": "5px",
		"--image-alt": "VWeb",
		"--hover-bg": "#00000007",
		"--focus-color": "#8EB8EB",
		"--missing-color": "#E8454E",
	};

	// Constructor.
	constructor({
		label = null,
		image = null,
		alt = "",
		placeholder = "Placeholder",
		id = null,
		required = false,
		items = [{id: "option", text: "Option", image: null}],
	} = {}) {

		// Initialize super.
		super();

		// Arguments.
		if (Array.isArray(items)) {
			if (typeof items[0] === "string") {
				this.items = [];
				items.iterate((item) => {
					this.items.append({
						id: item,
						text: item,
					})
				});
			} else {
				this.items = items;
				this.items.iterate((item) => {
					if (item.text == null) {
						item.text = item.id;
					}
				})
			}
		} else if (typeof items === "object" && items != null) {
			this.items = [];
			Object.keys(items).iterate((key) => {
				if (typeof items[key] === "string") {
					this.items.append({
						id: key,
						text: items[key],
					});
				} else {
					this.items.append({
						id: key, 
						...items[key]
					});
				}
			})
		} else {
            throw Error(`Parameter "items" should be a defined value of type "array" or "object".`);
		}

		// Default attributes.
		this.element_type = "ExtendedSelect";

		// Attributes.
		this._focus_color = ExtendedSelectElement.default_style["--focus-color"];
		this._missing_color = ExtendedSelectElement.default_style["--missing-color"];
		this._mask_color = ExtendedSelectElement.default_style["--image-mask-color"];
		this._border_color = ExtendedSelectElement.default_style["--input-border-color"];
		this._hover_bg = ExtendedSelectElement.default_style["--hover-bg"]
		this._missing = false;

		// Set default styling.
		this.styles(ExtendedSelectElement.default_style);

		// Title element.
		this.label = Text(label)
			.parent(this)
			.font_size("inherit")
			.margin(0, 0, 5, 0)
			.color("inherit")
			.width("fit-content")
			.ellipsis_overflow(true)
		if (label == null) {
			this.label.hide();
		}

		// Title element.
		this.image = ImageMask(image)
			.parent(this)
            .mask_color(this._mask_color)
            .frame(ExtendedSelectElement.default_style["--image-size"], ExtendedSelectElement.default_style["--image-size"])
            .margin(0)
            .margin_right(ExtendedSelectElement.default_style["--image-margin-right"])
            .margin_left(ExtendedSelectElement.default_style["--image-margin-left"])
            .alt(alt !== "" ? alt : ExtendedSelectElement.default_style["--image-alt"]);
        if (image == null) {
			this.image.hide();
		}

		// Input element.
		this.input = Input(placeholder)
			.parent(this)
			.color("inherit")
			.readonly(true)
			.font_size("inherit")
			.margin(0)
			.width("100%")
			.stretch(true)
			.outline("none")
			.line_height("1.0em")
			.box_shadow("none")
			.cursor("pointer")
			// .on_focus(() => {
			// 	if (this._missing !== true) {
			// 		this.container.outline(`1px solid ${this._focus_color}`)
			// 		this.container.box_shadow(`0 0 0 3px ${this._focus_color}80`)
			// 	}
			// })
			// .on_blur(() => {
			// 	if (this._missing !== true) {
			// 		this.container.outline("0px solid transparent")
			// 		this.container.box_shadow(`0 0 0 0px transparent`)
			// 	}
			// })

		// The hstack container.
		this.container = HStack(this.image, this.input)
			.parent(this)
			.padding(ExtendedSelectElement.default_style["--input-padding"])
			.border_radius(ExtendedSelectElement.default_style["--input-border-radius"])
			.border_width(1)
			.border_style("solid")
			.border_color(this._border_color)
			.transition("outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out")
			.outline("0px solid transparent")
			.box_shadow(`0 0 0 0px transparent`)
			.width(100%)
			.on_click(() => {
				if (this.dropdown.is_hidden()) {
					this.expand();
				}
			})

		// The error message.
		this.error = Text("Incomplete field")
			.color(this._missing_color)
			.font_size("0.8em")
			.margin(5, 0, 0, 2.5)
			.padding(0)
			.hide()

		// The dropdown menu.
		this.dropdown = Scroller()
			.parent(this)
			.position(0, null, null, null)
			.background(ExtendedSelectElement.default_style["background"])
			.border_radius(ExtendedSelectElement.default_style["--input-border-radius"])
			.border_width(1)
			.border_style("solid")
			.border_color(this._border_color)
			.box_shadow("0px 0px 5px #00000050")
			.frame(100%, 100%)
			.z_index(10)
			.hide()

		// Append.
		this.append(this.label, this.container, this.error, this.dropdown);

		// Styling.
		this.position("relative")
		this.overflow("visible");

		// Set id.
		if (id != null) {
			this.id(id);
		}

		// Set required.
		if (required) {
			this.required(required);
		}

		// On dropdown close event by mouse down.
		this._on_dropdown_close = (event) => {
			let parent = event.target.parentElement;
			let stop = true;
			for (let i = 0; i < 4; i++) {
				if (parent == null) { break; }
				else if (parent === this.dropdown) {
					console.log(parent)
					stop = false; break;
				}
				parent = parent.parentElement;
			}
			if (stop) {
				this.dropdown.hide();
				window.removeEventListener("mousedown", this._on_dropdown_close)
			}
		}
	}

	// Get the styling attributes.
	// The values of the children that may have been changed by the custom funcs should be added.
	styles(style_dict) {
		if (style_dict == null) {
			let styles = super.styles();
			styles["--input-padding"] = this.input.padding();
			styles["--input-border-radius"] = this.input.border_radius();
			styles["--input-border-color"] = this._border_color;
			styles["--image-mask-color"] = this._mask_color;
			styles["--image-size"] = this.image.width();
			styles["--image-margin-right"] = this.image.margin_right();
			styles["--image-margin-left"] = this.image.margin_left();
			styles["--image-alt"] = this.image.alt() || "VWeb";
			styles["--focus-color"] = this._focus_color;
			styles["--missing-color"] = this._missing_color;
			return styles;
		} else {
			return super.styles(style_dict);
		}
	}

	// Set default since it inherits an element.
	set_default() {
		return super.set_default(ExtendedSelectElement);
	}

	// Set the focus color.
	focus_color(val) {
		if (val == null) { return this._focus_color; }
		this._focus_color = val;
		return this;
	}

	// Set the missing color.
	missing_color(val) {
		if (val == null) { return this._missing_color; }
		this._missing_color = val;
		this.error.color(this._missing_color);
		return this;
	}

	// Set missing.
	missing(to = null, err = "Incomplete field") {
		if (to == null) { return this._missing; }
		else if (to === true) {
			this._missing = true;
			this.container.outline(`1px solid ${this._missing_color}`)
			this.container.box_shadow(`0 0 0 3px ${this._missing_color}80`)
			this.image.mask_color(this._missing_color)
			this.error.show();
			if (err) {
				this.error.text(err);
			}
		} else {
			this._missing = false;
			this.container.outline("0px solid transparent")
			this.container.box_shadow(`0 0 0 0px transparent`)
			this.image.mask_color(this._mask_color)
			this.error.hide();
		}
		return this;
	}

	// Submit the item, throws an error when the item is not defined.
	submit() {
		const value = this.value();
		if (value == null || value === "") {
			this.missing(true);
			throw Error("Fill in all the required fields.");
		}
		this.missing(false);
		return value;
	}

	// Expand dropdown.
	expand() {

		// Add event listener.
		window.addEventListener("mousedown", this._on_dropdown_close);

		// Clear.
		this.dropdown.remove_children();

		// Set top.
		// this.dropdown.top(this.label.clientHeight + this.container.clientHeight + (this.label.is_hidden() ? 0 : 5) + 5)
		this.dropdown.top(this.label.clientHeight + (this.label.is_hidden() ? 0 : 5))

		// Search bar.
		const search = Input("Search")
			.color("inherit")
			.font_size("inherit")
			.margin(10)
			.padding(0)
			.width("calc(100% - 20px)")
			.outline("none")
			.box_shadow("none")
			.on_input((e, event) => {
				const query = e.value();
				if (query.length === 0) {
					content.inner_html("");
					this.items.iterate((item) => {
						content.append(item.stack);
					})
				} else {
					const results = vweb.utils.fuzzy_search({
						query, 
						targets: this.items, 
						limit: null,
						case_match: false,
						allow_exceeding_chars: true,
						key: ["id", "text"], 
					});
					console.log(results)
					content.inner_html("");
					results.iterate((item) => {
						content.append(item.stack);
					})
				}
			})

		// The content.
		const content = VStack()
			.frame(100%)
			.padding(5, 0)

		// Add children.
		let i = 0;
		let min_height;
		this.dropdown.items = [];
		this.items.iterate((item) => {

			// Image.
			let img;
			if (item.image != null) {
				img = ImageMask(item.image)
		            .mask_color(this._mask_color)
		            .frame(ExtendedSelectElement.default_style["--image-size"], ExtendedSelectElement.default_style["--image-size"])
		            .margin(0)
		            .margin_right(ExtendedSelectElement.default_style["--image-margin-right"])
		            .margin_left(ExtendedSelectElement.default_style["--image-margin-left"])
		            .alt(alt !== "" ? alt : ExtendedSelectElement.default_style["--image-alt"])
		            .pointer_events("none") // so target element of mouse down is easier.
		    }

		    // Text.
		    const text = Text(item.text)
		    	.color("inherit")
				.font_size("inherit")
				.white_space("pre")
				.margin(0)
				.width("100%")
				.stretch(true)
				.pointer_events("none") // so target element of mouse down is easier.

			// Stack.
			const stack = HStack(img, text)
				.width(100%)
				.padding(5, 10)
				.background("transparent")
				.transition("background 0.2 ease-in-out")
				.on_click(() => {
					this.dropdown.hide();
					this._value = item.id;
					this.input.value(item.text);
					if (this._on_change_callback != null) {
						this._on_change_callback(this, item.text);
					}
					window.removeEventListener("mousedown", this._on_dropdown_close)
				})
				.on_mouse_over((e) => e.background(this._hover_bg))
				.on_mouse_out((e) => e.background("transparent"))

			// Update the item with the stack for searches.
			item.stack = stack;

			// Append.
			content.append(stack);

			// Increment.
			++i;

		})

		// Show search bar or just show everything.
		if (this.items.length > 15) {
			this.dropdown.append(
				search,
				Divider()
					.margin(0)
					.background(this._border_color),
				content,
			);
		} else {
			this.dropdown.append(content);
		}

		// Show dropdown.
		this.dropdown.show();

		// Set min height.
		this.dropdown.min_height((this.dropdown.content.child(0).clientHeight + 10) * Math.min(this.items.length, 10) + 10)

		// Response.
		return this;
	}

	// Get or set the value, when it is being set it should be the id of one of the items otherwise nothing happens.
	value(val) {
		if (val == null) { return this._value; }
		this.items.iterate((item) => {
			if (item.id === val) {
				this._value = val;
				this.input.value(item.text);
				if (this._on_change_callback != null) {
					this._on_change_callback(this, val);
				}
			}
		})
		return this;
	}

	// Styling.
	mask_color(val) {
		if (val == null) { return this._mask_color; }
		this._mask_color = val;
		this.image.mask_color(this._mask_color);
		return this;
	}
	background(val) {
		if (val == null) { return this.background(); }
		this.background(val)
		this.dropdown.background(val)
		return this;
	}
	border_radius(val) {
		if (val == null) { return this.container.border_radius(); }
		this.container.border_radius(val);
		this.dropdown.border_radius(val);
		return this;
	}
	border_color(val) {
		if (val == null) { return this._border_color; }
		this._border_color = val;
		this.container.border_color(this._border_color);
		this.dropdown.border_color(this._border_color);
		return this;
	}
	border_width(val) {
		if (val == null) { return this.container.border_width(); }
		this.container.border_width(val);
		this.dropdown.border_width(val);
		return this;
	}
	border_style(val) {
		if (val == null) { return this.container.border_style(); }
		this.container.border_style(val);
		this.dropdown.border_style(val);
		return this;
	}
	padding(...args) {
		if (args.length === 0 || (args.length === 1 && args[0] == null)) { return this.container.padding(); }
		this.container.padding(...args);
		this.dropdown.padding(...args);
		return this;
	}
	border(...args) {
		if (args.length === 0 || (args.length === 1 && args[0] == null)) { return this.container.border(); }
		this.container.border(...args);
		this.dropdown.border(...args);
		return this;
	}

	// On change event.
	on_change(callback) {
		if (callback == null) { return this._on_change_callback; }
		this._on_change_callback = callback;
		return this;
	}

	// ---------------------------------------------------------
	// Relay functions.

	text(val) { if (val == null) { return this.label.text(); } this.label.text(val); return this; }
	required(val) { if (val == null) { return this.input.required(); } this.input.required(val); return this; }
}