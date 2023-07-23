/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// HStack.
class HStack extends VElement {
	
	// Default vars.
	static s_type = "HStack";
	static s_tag = "div";

	// Default styling.
	static default_styling = {
		"position": "relative",
		"margin": "0px",
		"padding": "0px",
		"clear": "both",
		"overflow-x": "visible",
		"overflow-y": "visible",
		"text-align": "start",
		"display": "flex",
		"flex-direction": "row",
		"align-items": "flex-start", // disable the auto extending of the childs height to the max child height.
		// "flex": "1", // disabled to support horizontal spacers in VStacks.
	};
	
	// Constructor.
	constructor(...children) {
		
		// Initialize base class.
		super(HStack.s_type, HStack.s_tag, HStack.default_styling);
		
		// Add children.
		this.append(...children);
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(HStack);