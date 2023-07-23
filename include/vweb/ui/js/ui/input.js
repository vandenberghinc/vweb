/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Input.
class Input extends VElement {
	
	// Default vars.
	static s_type = "Input";
	static s_tag = "input";

	// Default styling.
	static default_styling = {
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
	};
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super(Input.s_type, Input.s_tag, Input.default_styling);
		
		// Input type.
		this.type("text");

		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(Input);

// PasswordInput.
class PasswordInput extends VElement {
	
	// Default vars.
	static s_type = "PasswordInput";
	static s_tag = "input";

	// Default styling.
	static default_styling = {
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
	};
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super(PasswordInput.s_type, PasswordInput.s_tag, PasswordInput.default_styling);
		
		// Input type.
		this.type("password");
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(PasswordInput);

// EmailInput.
class EmailInput extends VElement {
	
	// Default vars.
	static s_type = "EmailInput";
	static s_tag = "input";

	// Default styling.
	static default_styling = {
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
	};
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super(EmailInput.s_type, EmailInput.s_tag, EmailInput.default_styling);
		
		// Input type.
		this.type("email");
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(EmailInput);

// PhoneNumberInput.
class PhoneNumberInput extends VElement {
	
	// Default vars.
	static s_type = "PhoneNumberInput";
	static s_tag = "input";

	// Default styling.
	static default_styling = {
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
	};
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super(PhoneNumberInput.s_type, PhoneNumberInput.s_tag, PhoneNumberInput.default_styling);

		// Input type.
		this.type("tel");
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(PhoneNumberInput);

// InputBox.
class InputBox extends VElement {
	
	// Default vars.
	static s_type = "InputBox";
	static s_tag = "textarea";

	// Default styling.
	static default_styling = {
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
	};
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super(InputBox.s_type, InputBox.s_tag, InputBox.default_styling);

		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(InputBox);

// SelectOptionInput.
class SelectOptionInput extends VElement {
	
	// Default vars.
	static s_type = "SelectOptionInput";
	static s_tag = "select";

	// Default styling.
	static default_styling = {
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
	};
	
	// Constructor.
	constructor(placeholder) {
		
		// Initialize base class.
		super(SelectOptionInput.s_type, SelectOptionInput.s_tag, SelectOptionInput.default_styling);
		
		// Add children.
		for (let i = 0; i < arguments.length; i++) {
			let e = document.createElement("option");
			if (i == 0) {
				e.selected = true;
				e.disabled = true;
			} else {
				e.value = arguments[i];
			}
			this.append(e);
		}
		
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(SelectOptionInput);