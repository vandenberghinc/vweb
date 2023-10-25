/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// CodeBlock.
@vweb_constructor_wrapper
@vweb_register_element
class CodeBlockElement extends CreateVElementClass({
	type: "CodeBlock",
	tag: "code",
	default_style: {
		"margin": "0px 0px 0px 0px",
		"padding": "15px 20px 15px 20px",
		"color": "inherit",
		"text-align": "start",
		"white-space": "wrap",
		"font-family": "'Menlo', 'Consolas', monospace",
		"font-size": "13px",
		"font-weight": "500",
		"line-height": "18px",
		"border-radius": "15px",
		"color": "#FFFFFF",
		"background": "#262F3D",
	},
}) {
	
	// Constructor.
	constructor(code) {
		
		// Initialize base class.
		super();

		// Set code.
		if (code != null) {
			while (code.length > 0 && code[code.length - 1] == "\n") {
				code = code.slice(-code.length, -1);
			}
			this.text(code.replaceAll("<", "&lt;").replaceAll(">", "&gt;")); 
		}

	}

	// Set language.
	language(value) {
		this.attr("language", value);
		return this;
	}

	// Set show line numbers, true or !true.
	line_numbers(value) {
		this.attr("line_numbers", value);
		return this;
	}


	// Highlight code.
	highlight(options = {}) {
		options.element = this;
		vhighlight.tokenize(options);
		return this;
	}

}

// CodePre.
@vweb_constructor_wrapper
@vweb_register_element
class CodePreElement extends CreateVElementClass({
	type: "CodePre",
	tag: "pre",
	default_style: {
		"margin": "0px 0px 0px 0px",
		"padding": "15px 20px 15px 20px",
		"color": "inherit",
		"text-align": "start",
		"white-space": "pre",
		"font-family": "'Menlo', 'Consolas', monospace",
		"font-size": "13px",
		"font-weight": "500",
		"line-height": "18px",
		"border-radius": "15px",
		"color": "#FFFFFF",
		"background": "#262F3D",
	},
}) {
	
	// Constructor.
	constructor(code) {
		
		// Initialize base class.
		super();

		// Set code.
		if (code != null) {
			while (code.length > 0 && code[code.length - 1] == "\n") {
				code = code.slice(-code.length, -1);
			}
			this.text(code.replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
		}

	}

	// Highlight code.
	highlight(options = {}) {
		options.element = this;
		vhighlight.tokenize(options);
		return this;
	}

}

// CodeLine.
@vweb_constructor_wrapper
@vweb_register_element
class CodeLineElement extends CreateVElementClass({
	type: "CodeLine",
	tag: "span",
	default_style: {
		"font-family": "\"Menlo\", \"Consolas\", monospace",
		"font-size": "0.90em",
		"font-style": "italic",
		"background": "#000000",
		"color": "#FFFFFF",
		"border-radius": "10px",
		"padding": "2.5px 7.5px 2.5px 7.5px",
	},
}) {
	
	// Constructor.
	constructor(text, href) {
		
		// Initialize base class.
		super();
		
		// Set text.
		this.text(text);
		
	}
		
}
