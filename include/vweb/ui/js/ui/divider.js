/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
class Divider extends VElement {
	
	// Default vars.
	static s_type = "Divider";
	static s_tag = "div";

	// Default styling.
	static default_styling = {
		"margin": "0px",
		"padding": "0px",
		"width": "100%",
		"height": "1px",
		"min-height": "1px",
		"background": "black",
	};
	
	// Constructor.
	constructor() {
		
		// Initialize base class.
		super(Divider.s_type, Divider.s_tag, Divider.default_styling);
		
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(Divider);