/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// CodeBlock.
class CodeBlock extends Element {
	
	// Default styling.
	static default_styling = {
		"margin": "0px 0px 0px 0px",
		"padding": "25px",
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
		"overflow": "scroll",
	};
	
	// Constructor.
	constructor(text) {
		
		// Initialize base class.
		super("CodeBlock", "pre");
		
		// Set default styling
		this.style(CodeBlock.default_styling);
		
		// Set text.
		this.text(text);
	}
	
}

// CodeLine.
class CodeLine extends Element {
	
	// Default styling.
	static default_styling = {
		"font-family": "\"Menlo\", \"Consolas\", monospace",
		"font-size": "15px",
		"font-style": "italic",
		"background": "#000000",
		"color": "#FFFFFF",
		"border-radius": "10px",
		"padding": "5px 7.5px 5px 7.5px",
	};
	
	// Constructor.
	constructor(text, href) {
		
		// Initialize base class.
		super("CodeLine", "span");
		
		// Set default styling.
		this.style(CodeBlock.default_styling);
		
		// Set text.
		this.text(text);
		
	}
	
	// Cast to string.
	toString() {
		return this.element.outerHTML;
	}
		
}
