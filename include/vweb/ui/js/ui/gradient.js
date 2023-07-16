/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Gradient.
class Gradient {
	
	// Constructor.
	constructor(...args) {
		if (args.length === 1) {
			this.gradient = args[0];
		} else {
			console.error("Invalid number of arguments for class \"Gradient()\".");
		}
	}

	// Cast to string.
	toString() {
		return this.gradient;
	}
	
};
