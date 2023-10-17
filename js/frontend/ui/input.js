/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Input.
@vweb_constructor_wrapper
@vweb_register_element
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
@vweb_constructor_wrapper
@vweb_register_element
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
@vweb_constructor_wrapper
@vweb_register_element
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
@vweb_constructor_wrapper
@vweb_register_element
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

// Labeled input.
@vweb_constructor_wrapper
@vweb_register_element
class LabeledInputElement extends VStackElement {

	// Default styling.
	// static default_style = Object.assign({}, HStackElement.default_style, {
	static default_style = {
		...VStackElement.default_style,
		"color": "inherit",
		"font-size": "16px",
		// Custom.
		"--input-padding": "12px",
		"--input-border-radius": "5px",
		"--input-border": "1px solid gray",
		"--focus-color": "#8EB8EB",
	};

	// Constructor.
	constructor({
		label = "Label",
		placeholder = "Input",
		readonly = false,
		type = Input,
	} = {}) {

		// Initialize super.
		super();

		// Attributes.
		this.base_element_type = "LabeledInput";
		this._focus_color = LabeledInputElement.default_style["--focus-color"];

		// Set default styling.
		this.styles(LabeledInputElement.default_style);

		// Title element.
		this.label = Text(label)
			.parent(this)
			.font_size("inherit")
			.margin_bottom(5)
			.color("inherit");

		// Input element.
		this.input = type(placeholder)
			.parent(this)
			.color("inherit")
			.readonly(readonly)
			.font_size("inherit")
			.padding(LabeledInputElement.default_style["--input-padding"])
			.margin(0)
			.border_radius(LabeledInputElement.default_style["--input-border-radius"])
			.border(LabeledInputElement.default_style["--input-border"])
			.width("100%")
			.stretch(true)
			.transition("outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out")
			.on_focus((element) => {
				element.outline(`1px solid ${this._focus_color}`)
				element.box_shadow(`0 0 0 4px ${this._focus_color}80`)
			})
			.on_blur((element) => {
				element.outline("none")
				element.box_shadow(`none`)
			})

		// Append.
		this.append(this.label, this.input);
	}

	// Get the styling attributes.
	// The values of the children that may have been changed by the custom funcs should be added.
	styles(style_dict) {
		if (style_dict == null) {
			let styles = super.styles();
			styles["--input-padding"] = this.input.padding();
			styles["--input-border-radius"] = this.input.border_radius();
			styles["--input-border"] = this.input.border();
			styles["--focus-color"] = this._focus_color;
			return styles;
		} else {
			return super.styles(style_dict);
		}
	}

	// Set default since it inherits an element.
	set_default() {
		return super.set_default(LabeledInputElement);
	}

	// Set the focus color.
	focus_color(val) {
		if (val == null) { return this._focus_color; }
		this._focus_color = val;
		return this;
	}

	// ---------------------------------------------------------
	// Relay functions.

	value(val) { if (val == null) { return this.input.value(); } this.input.value(val); return this; }
	text(val) { if (val == null) { return this.input.text(); } this.input.text(val); return this; }
	on_enter(val) { if (val == null) { return this.input.on_enter(); } this.input.on_enter(val); return this; }
	on_input(val) { if (val == null) { return this.input.on_input(); } this.input.on_input(val); return this; }
	border(val) { if (val == null) { return this.input.border(); } this.input.border(val); return this; }
	border_radius(val) { if (val == null) { return this.input.border_radius(); } this.input.border_radius(val); return this; }
	border_color(val) { if (val == null) { return this.input.border_color(); } this.input.border_color(val); return this; }
	border_width(val) { if (val == null) { return this.input.border_width(); } this.input.border_width(val); return this; }
	border_style(val) { if (val == null) { return this.input.border_style(); } this.input.border_style(val); return this; }
}

// Image input.
@vweb_constructor_wrapper
@vweb_register_element
class ImageInputElement extends HStackElement {

	// Default styling.
	// static default_style = Object.assign({}, HStackElement.default_style, {
	static default_style = {
		...HStackElement.default_style,
		"margin": "0px",
		"padding": "12px",
		"border-radius": "5px",
		"border": "1px solid gray",
		"color": "inherit",
		"font-size": "16px",
		// Custom.
		"--image-mask-color": "#000",
		"--image-size": "20px",
		"--image-margin-right": "10px",
		"--image-margin-left": "5px",
		"--image-alt": "VWeb",
		"--focus-color": "#8EB8EB",
	};

	// Constructor.
	constructor({
		image = "",
		placeholder = "Input",
		readonly = false,
		type = Input,
		alt = "",
	} = {}) {

		// Initialize super.
		super();

		// Attributes.
		this.base_element_type = "ImageInput";
		this._focus_color = ImageInputElement.default_style["--focus-color"];

		// Set default styling.
		this.styles(ImageInputElement.default_style);

		// Title element.
		this.image = ImageMask (image)
			.parent(this)
            .mask_color(ImageInputElement.default_style["--image-mask-color"])
            .frame(ImageInputElement.default_style["--image-size"], ImageInputElement.default_style["--image-size"])
            .margin(0, ImageInputElement.default_style["--image-margin-right"], 0, ImageInputElement.default_style["--image-margin-left"])
            .alt(alt !== "" ? alt : ImageInputElement.default_style["--image-alt"]);

		// Input element.
		this.input = type(placeholder)
			.parent(this)
			.color("inherit")
			.readonly(readonly)
			.font_size("inherit")
			.margin(0)
            .stretch(true)
			.on_focus((element) => {
				this.outline(`1px solid ${this._focus_color}`)
				this.box_shadow(`0 0 0 4px ${this._focus_color}80`)
			})
			.on_blur((element) => {
				this.outline("none")
				this.box_shadow(`none`)
			})

		// Transition.
		this.transition("outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out")
		
		// Append.
		this.append(this.image, this.input);
	}

	// Get the styling attributes.
	// The values of the children that may have been changed by the custom funcs should be added.
	styles(style_dict) {
		if (style_dict == null) {
			let styles = super.styles();
			styles["--image-mask-color"] = this.image.mask_color();
			styles["--image-size"] = this.image.width();
			styles["--image-margin-right"] = this.image.margin_right();
			styles["--image-margin-left"] = this.image.margin_left();
			styles["--image-alt"] = this.image.alt() || "VWeb";
			styles["--focus-color"] = this._focus_color;
			return styles;
		} else {
			return super.styles(style_dict);
		}
	}

	// Set default since it inherits HStackElement.
	set_default() {
		return super.set_default(ImageInputElement);
	}

	// Set the focus color.
	focus_color(val) {
		if (val == null) { return this._focus_color; }
		this._focus_color = val;
		return this;
	}

	// ---------------------------------------------------------
	// Relay functions.

	value(val) { if (val == null) { return this.input.value(); } this.input.value(val); return this; }
	text(val) { if (val == null) { return this.input.text(); } this.input.text(val); return this; }
	on_enter(val) { if (val == null) { return this.input.on_enter(); } this.input.on_enter(val); return this; }
	on_input(val) { if (val == null) { return this.input.on_input(); } this.input.on_input(val); return this; }
	mask_color(val) { if (val == null) { return this.image.mask_color(); } this.image.mask_color(val); return this; }

}

// InputBox.
@vweb_constructor_wrapper
@vweb_register_element
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
@vweb_constructor_wrapper
@vweb_register_element
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