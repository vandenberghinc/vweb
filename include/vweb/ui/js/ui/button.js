/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Button.
class Button extends VElement {
	
	// Default vars.
	static s_type = "Button";
	static s_tag = "a";

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
		"onmousedown": function() { this.style.filter = "brightness(80%)"; },
		"onmouseover": function() { this.style.filter = "brightness(90%)"; },
		"onmouseup": function() { this.style.filter = "brightness(100%)"; },
		"onmouseout": function() { this.style.filter = "brightness(100%)"; },
	};
	
	// Constructor.
	constructor(text) {
		
		// Initialize base class.
		super(Button.s_type, Button.s_tag, Button.default_styling);
		
		// Set events.
		this.events(Button.default_events);
		
		// Set text.
		this.inner_html(text);
	}
		
}

// Register custom type.
vweb.utils.register_custom_type(Button);

// BorderButton.
// Supports a gradient color for the border combined with border radius.
// Warning: this class is still experimental and may be subject to future change.
class BorderButton extends VElement {
	
	// Default vars.
	static s_type = "BorderButton";
	static s_tag = "div";

	// Default styling.
	static default_styling = {
		"margin": "0px 0px 0px 0px",
		"display": "inline-block",
		"color": "inherit",
		"text-align": "center",
		"cursor": "pointer",
		"text-decoration": "none",
		"position": "relative",
		"z-index": 0,
		// Custom.
		"--child-color": "black",
		"--child-background": "black",
		"--child-border-width": "2px",
		"--child-border-radius": "10px",
		"--child-padding": "5px 10px 5px 10px",
	};

	// Default events.
	static default_events = {
		"onmousedown": function() { this.style.filter = "brightness(80%)"; },
		"onmouseover": function() { this.style.filter = "brightness(90%)"; },
		"onmouseup": function() { this.style.filter = "brightness(100%)"; },
		"onmouseout": function() { this.style.filter = "brightness(100%)"; },
	};
	
	// Constructor.
	constructor(text) {
		
		// Initialize base class.
		super(BorderButton.s_type, BorderButton.s_tag);
		
		// Set default styling.
		let styles = { ...BorderButton.default_styling };
		delete styles["--child-color"];
		delete styles["--child-background"];
		delete styles["--child-border-width"];
		delete styles["--child-padding"];
		delete styles["--child-background-image"];
		delete styles["--child-background-clip"];
		delete styles["--child-webkit-background-clip"];
		this.styles(styles);

		// Set events.
		this.events(BorderButton.default_events);

		// Border child.
		this.border_e = new VElement()
			.content("")
			.position("absolute")
			.z_index(-1)
			.inset(0)
			.padding(BorderButton.default_styling["--child-border-width"])
			.border_radius(BorderButton.default_styling["--child-border-radius"])
			.background(BorderButton.default_styling["--child-background"])
			.mask("linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)")
			.mask_composite("exclude")
			.styles({
				"-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
				"-webkit-mask-composite": "exclude", //"xor",
			})

		// Text child.
		// do not use a Text object since inheritance of text styling is required.
		this.text_e = new VElement("Div", "div")
			.color(BorderButton.default_styling["--child-color"])
			.append(text);
		if (BorderButton.default_styling["--child-color"] == "transparent") {
			this.text_e.element.style.backgroundImage = BorderButton.default_styling["--child-background-image"];
	    	this.text_e.element.style.backgroundClip = BorderButton.default_styling["--child-background-clip"];
	    	this.text_e.element.style["-webkit-background-clip"] = BorderButton.default_styling["--child-webkit-background-clip"];
	    }

	    // Append.
		this.append(this.border_e, this.text_e);
		
	}

	// Set the gradient color.
	gradient(value) {
		if (value == null) {
			return this.border_e.background();
		}
		this.border_e.background(value);
		return this;
	}

	// Set the border color.
	border_color(value) {
		if (value == null) {
			return this.border_e.background();
		}
		this.border_e.background(value);
		return this;
	}

	// Set the border width.
	border_width(value) {
		if (value == null) {
			return this.border_e.border_radius();
		}
		this.border_e.padding(value);
		return this;
	}

	// Set the border radius.
	border_radius(value) {
		if (value == null) {
			return this.border_e.border_radius();
		}
		super.border_radius(value);
		this.border_e.border_radius(value);
		return this;
	}

	// Set color of child text so the background of the parent can be set when using a gradient color.
	color(value) {
		if (value == null) {
			return this.text_e.color();
		}
		this.text_e.color(value);
		return this;
	}

	// Get the styling attributes.
	// The values of the children that may have been changed by the custom funcs should be added.
	style(style_dict) {
		if (style_dict == null) {
			let styles = super.styles(null);
			styles["--child-background"] = this.border_e.background();
			styles["--child-border-width"] = this.border_e.padding();
			styles["--child-border-radius"] = this.border_e.border_radius();
			styles["--child-color"] = this.text_e.color();
			styles["--child-background-image"] = this.text_e.element.style.backgroundImage;
			styles["--child-background-clip"] = this.text_e.element.style.backgroundClip;
			styles["--child-webkit-background-clip"] = this.text_e.element.style["-webkit-background-clip"];
			return styles;
		} else {
			return super.styles(style_dict);
		}
	}
		
}

// Register custom type.
vweb.utils.register_custom_type(BorderButton);

// Loader button.
// Warning: you should not use function "LoaderButton.loader.hide() / LoaderButton.loader.show()" use "LoaderButton.hide_loader() / LoaderButton.show_loader()" instead.
// Warning: This class is still experimental and may be subject to future change.
class LoaderButton extends HStack {

	// Default vars.
	static s_type = "BorderButton";
	static s_tag = "div";

	// Default styling.
	static default_styling = {
		"margin": "0px",
		"padding": "12.5px 10px 12.5px 10px",
		"border-radius": "25px",
		"cursor": "pointer",
		"background": "black",
		"color": "inherit",
		"font-size": "16px",
		// Custom.
		"--loader-width": "25px",
		"--loader-height": "25px",
		"--loader-margin-right": "15px",
		"--loader-margin-top": "-2px",
	};

	// Constructor.
	constructor(text = "", loader = new RingLoader()) {
		super();

		// Set default styling.
		this.styles(LoaderButton.default_styling);

		// Set style.
		this.wrap(false);
		this.center();
		this.center_vertical()

		// Children.
		this.loader = loader
			.width(LoaderButton.default_styling["--loader-width"])
			.height(LoaderButton.default_styling["--loader-height"])
			.margin_right(LoaderButton.default_styling["--loader-margin-right"])
			.margin_top(LoaderButton.default_styling["--loader-margin-top"])
			.background(THEME.button_txt)
			.update()
			.hide();
		this.loader.parent(this);
		this.text_e = new VElement("Div", "div") // use div to inherit text styles.
			.text(text)
			.margin(0)
			.padding(0);
		this.text_e.parent(this);
		this.padding_e = new VStack()
			.padding(0)
			.margin(0)
			.height(1)
			.width(25);
		this.padding_e.parent(this);

		// Add children.
		this.append(this.loader, this.text_e);

	}

	// Show the loader.
	show_loader() {
		this.padding_e.width(this.loader.element.style.width);
		this.append(this.padding_e);
		this.loader.update();
		this.loader.show();
		return this;
	}

	// Hide the loader.
	hide_loader() {
		this.loader.hide();
		this.remove_child(this.padding_e);
		return this;
	}

	// Get the styling attributes.
	// The values of the children that may have been changed by the custom funcs should be added.
	style(style_dict) {
		if (style_dict == null) {
			let styles = super.styles();
			styles["--loader-width"] = this.loader.width();
			styles["--loader-height"] = this.loader.height();
			styles["--loader-margin-right"] = this.loader.margin_right();
			styles["--loader-margin-top"] = this.loader.margin_top();
			return styles;
		} else {
			return super.styles(style_dict);
		}
	}

}

// Register custom type.
vweb.utils.register_custom_type(LoaderButton);