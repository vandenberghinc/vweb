/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ForEach.
class ForEach extends Element {
	
	// Default styling.
	static default_styling = {
		"border": "none",
		"outline": "none",
		"background": "transparent",
	};
	
	// Constructor.
	constructor(items, func) {
		
		// Initialize base class.
		super("ForEach", "section");
		
		// Set default styling
		this.style(Divider.default_styling);
		
		// Iterate.
		for (let i = 0; i < items.length; i++) {
			this.append(func(items[i]));
		}
		
	}
	
}
