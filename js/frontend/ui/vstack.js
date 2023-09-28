/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
@vweb_constructor_wrapper
@vweb_register_element
class VStackElement extends CreateVElementClass({
	type: "VStack",
	tag: "div",
	default_style: {
		// "position": "relative",
		"margin": "0px",
		"padding": "0px",
		// "clear": "both",
		"display": "flex", // to support vertical spacers.
		"overflow": "visible",
		// "flex": "1", // disabled to support horizontal spacers in VStacks.
		"align-content": "flex-start", // align items at start, do not stretch / space when inside HStack.
		// "align-items": "flex-start", // otherwise the children automatically expand width to match the vstacks width.
		"flex-direction": "column",
		// "text-align": "start",
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
