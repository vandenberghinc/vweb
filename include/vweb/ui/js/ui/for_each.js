/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ForEach.
class ForEach extends VElement {
	
	// Default vars.
	static s_type = "ForEach";
	static s_tag = "section";

	// Default styling.
	static default_styling = {
		"border": "none",
		"outline": "none",
		"background": "transparent",
	};
	
	// Constructor.
	constructor(items, func) {
		
		// Initialize base class.
		super(ForEach.s_type, ForEach.s_tag, ForEach.default_styling);
		
		// Iterate.
		for (let i = 0; i < items.length; i++) {
			this.append(func(items[i]));
		}
		
	}
	
}

// Register custom type.
vweb.utils.register_custom_type(ForEach);