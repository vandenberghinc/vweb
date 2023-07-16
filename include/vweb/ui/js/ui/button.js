/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Text.
class Button extends Element {
	
	// Default styling.
	static default_styling = {
		"margin": "0px 0px 0px",
		"padding": "5px 10px 5px 10px",
		"border-radius": "10px",
		"cursor": "pointer",
		"text-decoration": "none",
		"color": "inherit",
		"text-align": "center",
		"display": "grid",
		"align-items": "center",
		"white-space": "nowrap",
	};
	
	// Default events.
	static default_events = {
		"onmousedown": "this.style.filter = \"brightness(90%)\";",
		"onmouseover": "this.style.filter = \"brightness(95%)\";",
		"onmouseup": "this.style.filter = \"brightness(100%)\";",
		"onmouseout": "this.style.filter = \"brightness(100%)\";",
	};
	
	// Constructor.
	constructor(text) {
		
		// Initialize base class.
		super("Button", "a");
		
		// Set default styling.
		this.style(Button.default_styling);
		
		// Set events.
		this.events(Button.default_events);
		
		// Set text.
		this.inner_html(text);
	}
		
}
