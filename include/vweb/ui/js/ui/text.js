/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Text.
class Text extends Element {
	
	// Default styling.
	static default_styling = {
		"margin": "0px 0px 0px 0px",
		"padding": "2.5px",
		"padding": "2.5px",
		"font-size": "20px",
		"color": "inherit",
		"text-align": "inherit",
		"white-space": "wrap",
	};
	
	// Constructor.
	constructor(text) {
		
		// Initialize base class.
		super("Text", "p");
		
		// Set default styling.
		this.style(Text.default_styling);
		
		// Set text.
		this.inner_html(text);
	}
		
}
