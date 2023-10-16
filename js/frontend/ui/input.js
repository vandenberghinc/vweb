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