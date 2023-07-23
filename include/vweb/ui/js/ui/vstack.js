/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
class VStack extends VElement {
	
	// Default vars.
	static s_type = "VStack";
	static s_tag = "div";

	// Default styling.
	static default_styling = {
		"position": "relative",
		"margin": "0px",
		"padding": "0px",
		"clear": "both",
		"display": "flex", // to support vertical spacers.
		"overflow": "visible",
		// "flex": "1", // disabled to support horizontal spacers in VStacks.
		"align-content": "flex-start", // align items at start, do not stretch / space when inside HStack.
		"flex-direction": "column",
		"text-align": "start",
	};
	
	// Constructor.
	constructor(...children) {
		
		// Initialize base class.
		super(VStack.s_type, VStack.s_tag, VStack.default_styling);
		
		// Add children.
		this.append(...children);
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(VStack);