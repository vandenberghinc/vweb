/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
class Scroller extends Element {
	
	// Default styling.
	static default_styling = {
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
	};
	
	// Constructor.
	constructor(...children) {
		
		// Initialize base class.
		super("Scroller", "div");
		
		// Set default styling
		this.style(Scroller.default_styling);
		
		// Add children.
		this.append(...children);
	}
	
}
