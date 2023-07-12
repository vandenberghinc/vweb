/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// If.
class If extends Element {
	
	// Default styling.
	static default_styling = {};
	
	// Constructor.
	constructor(boolean, child_or_func) {
		
		// Initialize base class.
		super("If", "section");
		
		// Set default styling
		this.style(View.default_styling);
		
		// Execute.
		if (boolean) {

			// Is function.
			if (utils.is_func(child_or_func)) {
				child_or_func();
			}

			// Is child.
			else {
				this.append(child_or_func);
			}
		}
	}
	
}

// IfDeviceWith.
// @TODO update on resize etc.
class IfDeviceWith extends Element {
	
	// Default styling.
	static default_styling = {};
	
	// Constructor.
	constructor(comparison, value, child) {
		
		// Initialize base class.
		super("IfDeviceWith", "section");
		
		// Attributes.
		this.comparison = comparison;
		this.value = value;
		this.child = child;
		
		// Set default styling
		this.style(View.default_styling);
		
		// Add child.
		if (comparison(utils.get_device_width(), this.value)) {
			this.append(this.child);
		}
	}
	
}
