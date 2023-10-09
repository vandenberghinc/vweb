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
		"flex:": "1 1 auto", // prevent children from exceeding its max width, @warning do not remove this cause it can produce some nasty overflow bugs, so if you want to remove it create an function to optionally remove it.
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
