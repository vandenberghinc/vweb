/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Link.
@vweb_constructor_wrapper
@vweb_register_element
class LinkElement extends CreateVElementClass({
	type: "Link",
	tag: "a",
	default_style: {
		"font-family": "inherit",
		"color": "rgb(85, 108, 214)",
		"text-decoration": "underline",
		"text-underline-position": "auto",
		"cursor": "pointer",
	},
}) {
	
	// Constructor.
	constructor(text, href) {
		
		// Initialize base class.
		super();

		// Set text.
		this.text(text);
		
		// Set href.
		this.href(href);
		
	}
		
}
