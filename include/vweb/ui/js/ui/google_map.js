/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// GoogleMap.
class GoogleMap extends VElement {
	
	// Default vars.
	static s_type = "GoogleMap";
	static s_tag = "iframe";

	// Default styling.
	static default_styling = {
		"border": "0",
	};
	
	// Default attributes.
	static default_attributes = {
		"width": "100%",
		"height": "100%",
		"frameborder": "0",
		"style": "border:0",
		"referrerpolicy": "no-referrer-when-downgrade",
		"allowfullscreen": "true",
	};
	
	// Constructor.
	constructor(location, mode = "place") {
		
		// Initialize base class.
		super(GoogleMap.s_type, GoogleMap.s_tag, GoogleMap.default_styling);
		
		// Set attributes.
		this.attributes(GoogleMap.default_attributes);
		
		// Set source.
		this.src("https://www.google.com/maps/embed/v1/" + mode + "?key=" + google_cloud_api_key + "&" + vweb.utils.url_encode({"q": location.replaceAll(' ', '+')}));
		
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

// Register custom type.
vweb.utils.register_custom_type(GoogleMap);