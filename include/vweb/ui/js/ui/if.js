/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// If.
class If extends Element {
	
	// Default styling.
	static default_styling = {};
	
	// Constructor.
	// The first value of the args should be the true or false boolean ...
	// All others will be the children which will be visible when the boolean is true.
	constructor(...args) {
		
		// Initialize base class.
		super("If", "section");
		
		// Set default styling
		this.style(View.default_styling);
		
		// Execute.
		if (args[0] == true) {
			for (let i = 0; i < args.length; i++) {

				// Is function.
				if (vweb.utils.is_func(args[i])) {
					args[i]();
				}

				// Is child.
				else {
					this.append(args[i]);
				}
			}
		}
	}
	
}

// IfDeviceWith.
// Deprecated: use Element.media instead.
// @TODO update on resize etc.
// class IfDeviceWith extends Element {
	
// 	// Default styling.
// 	static default_styling = {};
	
// 	// Constructor.
// 	// The first value of the args should be the true or false boolean ...
// 	// All others will be the children which will be visible when the boolean is true.
// 	constructor(comparison, value, child) {
		
// 		// Initialize base class.
// 		super("IfDeviceWith", "section");
		
// 		// Attributes.
// 		this.comparison = comparison;
// 		this.value = value;
// 		this.child = child;
		
// 		// Set default styling
// 		this.style(View.default_styling);
		
// 		// Add child.
// 		if (comparison(vweb.utils.device_width(), this.value)) {
// 			this.append(this.child);
// 		}
// 	}
	
// }
