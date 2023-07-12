/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// RingLoader.
// - The width and height must be in pixels.
class RingLoader extends Element {
	
	// Default styling.
	static default_styling = {
		"width": "80px",
		"height": "80px",
		"background": "black",
	};
	
	// Constructor.
	constructor() {
		
		// Initialize base class.
		super("RingLoader", "div");
		
		// Set default styling.
		this.style(RingLoader.default_styling);
		
		// Set default.
		this.update();
		
	}
	
	// Update.
	// Needs to be called after initialing or changing the loader.
	update() {
		this.remove_children();
		const children_style = {
			"width": "calc(" + this.element.style.width + " * (64.0px / 80.0px))",
			"height": "calc(" + this.element.style.height + " * (64.0px / 80.0px))",
			"margin": "calc(" + this.element.style.width + " * (8.0px / 80.0px))",
			"border": "calc(" + this.element.style.width + " * (8.0px / 80.0px)) solid " + this.element.style.background,
			"border-color": this.element.style.background + " transparent transparent transparent",
		}
		for (let i = 0; i < 4; i++) {
			let e = document.createElement("div");
			for (let attr in children_style) {
				e.style[attr] = children_style[attr];
			}
			this.append(e);
		}
	}
		
}
