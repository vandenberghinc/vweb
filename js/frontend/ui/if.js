/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// If.
@vweb_constructor_wrapper
@vweb_register_element
class IfElement extends CreateVElementClass({
	type: "If",
	tag: "section",
}) {

	// Constructor.
	// The first value of the args should be the true or false boolean ...
	// All others will be the children which will be visible when the boolean is true.
	constructor(...args) {
		
		// Initialize base class.
		super();

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
