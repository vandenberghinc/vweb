/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
@vweb_constructor_wrapper
@vweb_register_element
class ScrollerElement extends CreateVElementClass({
	type: "Scoller",
	tag: "div",
	default_style: {
		"position": "relative",
		"margin": "0px",
		"padding": "0px",
		"clear": "both",
		"display": "flex",
		"overflow": "scroll",
		"flex-direction": "column",
		"text-align": "start",
		"scroll-behavior": "smooth",
		"overscroll-behavior": "none", // disable bounces.
		"height": "fit-content", // set height to max compared to parents non overflow, so scrolling can take effect.
		"align-content": "flex-start", // align items at start, do not stretch / space when inside HStack.
		"align-items": "flex-start", // align items at start, do not stretch / space when inside HStack.
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