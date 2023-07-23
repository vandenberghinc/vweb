/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Title.
class Title extends VElement {
	
	// Default vars.
	static s_type = "Title";
	static s_tag = "h1";

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
		super(Title.s_type, Title.s_tag, Title.default_styling);
		
		// Set text.
		this.inner_html(text);
	}
		
}

// Register custom type.
vweb.utils.register_custom_type(Title);