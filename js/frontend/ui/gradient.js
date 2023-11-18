/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Gradient.
@constructor_wrapper(suffix="Type")
class GradientType {

	// Constructor.
	/*	@docs:
     *	@title: Gradient.
     *	@description: 
     *		Create a gradient object.
     *
     *		Can also be constructed with wrapper function `Gradient`.
     *	@return: 
     *		Returns the `GradientType` object.
     *	@parameter:
     *		@name: ...args
     *		@description: 
     *			The arguments can either be of length 1, containing the full gradient string `new GradientType ("linear-gradient(...)")`.
     *			Or the arguments can be as `new GradientType("linear", "black", "0%", "white", "100%")`.
     */ 
	constructor(...args) {
		if (args.length === 1) {
			this.gradient = args[0];
		}
		else if (args.length > 1) {
			this.type = args[0];
			this.colors = [];
			for (let i = 1; i < args.length; i++) {
				this.colors.push({
					color: args[i],
					stop: args[i + 1],
				})
				i++;
			}
		} else {
			console.error("Invalid number of arguments for class \"Gradient()\".");
		}
	}

	// Cast to string.
	toString() {
		if (this.gradient == null) {
			this.gradient = `${this.type}-gradient(`;
			for (let i = 0; i < this.colors.length; i++) {
				this.gradient += this.colors[i].color;
				this.gradient += " ";
				let stop = this.colors[i].stop;
				if (vweb.utils.is_numeric(stop) && stop <= 1.0) {
					stop = (stop * 100) + "%";
				}
				this.gradient += stop;
				if (i + 1 < this.colors.length) {
					this.gradient += ", ";
				}
			}
			this.gradient += ")";
			return this.gradient;
		}
		return this.gradient;
	}
	
};
