/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// If.
class If extends VElement {
	
	// Default vars.
	static s_type = "If";
	static s_tag = "section";

	// Default styling.
	static default_styling = {};
	
	// Constructor.
	// The first value of the args should be the true or false boolean ...
	// All others will be the children which will be visible when the boolean is true.
	constructor(...args) {
		
		// Initialize base class.
		super(If.s_type, If.s_tag, If.default_styling);
		
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

// Register custom type.
vweb.utils.register_custom_type(If);