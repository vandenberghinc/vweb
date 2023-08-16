/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// HStack.
@vweb_constructor_wrapper
@vweb_register_element
class HStackElement extends CreateVElementClass({
	type: "HStack",
	tag: "div",
	default_style: {
		// "position": "relative",
		"margin": "0px",
		"padding": "0px",
		// "clear": "both",
		"overflow-x": "visible",
		"overflow-y": "visible",
		// "text-align": "start",
		"display": "flex",
		"flex-direction": "row",
		"align-items": "flex-start", // disable the auto extending of the childs height to the max child height.
		// "flex": "1", // disabled to support horizontal spacers in VStacks.
		"border": "0px",
	},
}) {

	// Constructor.
	constructor(...children) {
		
		// Initialize base class.
		super();
		
		// Add children.
		this.append(...children);
	}
	
}
