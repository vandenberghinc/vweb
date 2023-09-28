/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ForEach.
@vweb_constructor_wrapper
@vweb_register_element
class ForEachElement extends CreateVElementClass({
	type: "ForEach",
	tag: "section",
	default_style: {
		"border": "none",
		"outline": "none",
		"background": "transparent",
	},
}) {
	
	// Constructor.
	constructor(items, func) {
		
		// Initialize base class.
		super();
		
		// Iterate.
		for (let i = 0; i < items.length; i++) {
			this.append(func(items[i], i));
		}
		
	}
	
}
