/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
class View extends VElement {
	
	// Default vars.
	static s_type = "View";
	static s_tag = "div";

	// Default styling.
	static default_styling = {
		"position": "absolute",
		"top": "0",
		"right": "0",
		"bottom": "0",
		"left": "0",
		"padding": "0px",
		"display": "block",
		"overflow": "hidden",
		"overflow-y": "none",
		"background": "none",
		"display": "flex", // to support vertical spacers.
		"text-align": "start",
		"align-content": "flex-start", // align items at start, do not stretch / space when inside HStack.
		"flex-direction": "column",
	};
	
	// Constructor.
	constructor(...children) {
		
		// Initialize base class.
		super(View.s_type, View.s_tag, View.default_styling);
		
		// Add children.
		this.append(...children);
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(View);