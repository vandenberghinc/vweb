/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
class ZStack extends Element {
	
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
		super("ZStack", "div");
		
		// Set default styling
		this.style(ZStack.default_styling);
		
		// Add children.
		this.zstack_append(...children);
	}
	
	// Override append.
	append(...children) {
		return this.zstack_append(...children);
	}
	
}
