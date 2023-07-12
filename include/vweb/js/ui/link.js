/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Link.
class Link extends Element {
	
	// Default styling.
	static default_styling = {
		"font-family": "inherit",
		"color": "rgb(85, 108, 214)",
		"text-decoration": "underline",
		"text-underline-position": "auto",
		"cursor": "pointer",
	};
	
	// Constructor.
	constructor(text, href) {
		
		// Initialize base class.
		super("Link", "a");
		
		// Set default styling.
		this.style(Link.default_styling);
		
		// Set text.
		this.text(text);
		
		// Set href.
		this.href(href);
		
	}
		
}
