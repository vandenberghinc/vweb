/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Link.
class Link extends VElement {
	
	// Default vars.
	static s_type = "Link";
	static s_tag = "a";

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
		super(Link.s_type, Link.s_tag, Link.default_styling);
		
		// Set text.
		this.text(text);
		
		// Set href.
		this.href(href);
		
	}
		
}

// Register custom type.
vweb.utils.register_custom_type(Link);