/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ForEach.
@constructor_wrapper
@register_element
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
		if (Array.isArray(items)) {
			for (let i = 0; i < items.length; i++) {
				this.append(func(items[i], i));
			}
		} else if (typeof items === "object") {
			let index = 0;
			Object.keys(items).iterate((key) => {
				this.append(func(key, items[key], index));
				++index;
			})
		} else {
			throw Error(`Parameter "items" has an invalid value type, the valid value types are "array" or "object".`);
		}
		
	}
	
}
