/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
class ZStack extends VElement {
	
	// Default vars.
	static s_type = "ZStack";
	static s_tag = "div";

	// Default styling.
	static default_styling = {
		"position": "relative",
		"margin": "0px",
		"padding": "0px",
		"display": "grid",
		"text-align": "start",
	};
	
	// Constructor.
	constructor(...children) {
		
		// Initialize base class.
		super(ZStack.s_type, ZStack.s_tag, ZStack.default_styling);
		
		// Add children.
		this.zstack_append(...children);
	}
	
	// Override append.
	append(...children) {
		return this.zstack_append(...children);
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(ZStack);