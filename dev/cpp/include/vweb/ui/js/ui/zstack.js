/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
@vweb_constructor_wrapper
@vweb_register_element
class ZStackElement extends CreateVElementClass({
	type: "ZStack",
	tag: "div",
	default_style: {
		// "position": "relative",
		"margin": "0px",
		"padding": "0px",
		"display": "grid",
		// "text-align": "start",
	},
}) {
	
	// Constructor.
	constructor(...children) {
		
		// Initialize base class.
		super();
		
		// Add children.
		this.zstack_append(...children);

	}
	
	// Override append.
	append(...children) {
		return this.zstack_append(...children);
	}
	
}