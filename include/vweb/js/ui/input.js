/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Input.
class Input extends Element {
	
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
	constructor(text) {
		
		// Initialize base class.
		super("Input", "input");
		
		// Input type.
		this.type("text");
		
		// Set default styling
		this.style(Input.default_styling);
		
	}
	
}

// PasswordInput.
class PasswordInput extends Element {
	
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
		super("PasswordInput", "input");
		
		// Input type.
		this.type("password");
		
		// Set default styling
		this.style(PasswordInput.default_styling);
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// EmailInput.
class EmailInput extends Element {
	
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
		super("EmailInput", "input");
		
		// Input type.
		this.type("email");
		
		// Set default styling
		this.style(EmailInput.default_styling);
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// PhoneNumberInput.
class PhoneNumberInput extends Element {
	
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
		super("PhoneNumberInput", "input");
		
		// Input type.
		this.type("tel");
		
		// Set default styling
		this.style(PhoneNumberInput.default_styling);
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// InputBox.
class InputBox extends Element {
	
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
		super("InputBox", "textarea");
		
		// Set default styling
		this.style(InputBox.default_styling);
		
		// Set placeholder text.
		this.placeholder(placeholder);
		
	}
	
}

// SelectOptionInput.
class SelectOptionInput extends Element {
	
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
		super("SelectOptionInput", "select");
		
		// Set default styling
		this.style(SelectOptionInput.default_styling);
		
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
