/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Title.
class Title extends Element {
	
	// Default styling.
	static default_styling = {
		"margin": "0px 0px 0px 0px",
		"color": "inherit",
		"white-space": "wrap",
		"text-align": "inherit",
		"color": "green",
	};
	
	// Constructor.
	constructor(text) {
		
		// Initialize base class.
		super("Title", "h1");
		
		// Set default styling.
		this.style(Title.default_styling);
		
		// Set text.
		this.text(text);
	}
		
}
