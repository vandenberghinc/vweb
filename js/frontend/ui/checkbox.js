// Extended input.
@constructor_wrapper
@register_element
class CheckBoxElement extends VStackElement {

	// Default styling.
	// static default_style = Object.assign({}, HStackElement.default_style, {
	static default_style = {
		...VStackElement.default_style,
		"color": "inherit",
		"font-size": "16px",
		// Custom.
		"--circle-border-color": "gray",
		"--circle-inner-bg": "#FFFFFF",
		"--focus-color": "#8EB8EB",
		"--missing-color": "#E8454E",
	};

	// Constructor.
	constructor({
		text = "",
		required = false,
		id = null,
	}) {

		// Initialize super.
		super();

		// Attributes.
		this.element_type = "CheckBox";
		this._border_color = CheckBoxElement.default_style["--circle-border-color"];
		this._inner_bg = CheckBoxElement.default_style["--circle-inner-bg"];
		this._focus_color = CheckBoxElement.default_style["--focus-color"];
		this._missing_color = CheckBoxElement.default_style["--missing-color"];
		this._missing = false;

		// Set default styling.
		this.styles(CheckBoxElement.default_style);

		// Circle element.
		const _this = this;
		this.circle = VStack(
				VStack()
				.assign_to_parent_as("inner")
				.border_radius(50%)
				.frame(35%, 35%)
				.background(this._inner_bg)
				.flex_shrink(0)
			)
			.assign_to_parent_as("circle")
			.flex_shrink(0)
			.border_width(1)
			.border_style("solid")
			.border_color(this._border_color)
			.border_radius(50%)
			.frame(15, 15)
			.margin(2.5, 10, 0, 0)
			.background("transparent")
			.box_shadow(`0 0 0 0px transparent`)
			.transition("background 0.3s ease-in-out, box-shadow 0.2s ease-in-out")
			.center()
			.center_vertical()
			.on_mouse_over((e) => e.box_shadow(`0 0 0 2px ${this._border_color}`))
			.on_mouse_out((e) => e.box_shadow(`0 0 0 0px transparent`))
			.on_click((e) => e.toggle())
			.extend({
				enabled: false,
				toggle: function() {
					return this.value(!this.enabled);
				},
				value: function(to = null) { 
					if (to == null) { return this.enabled; }
					else if (to === true) {
						this.enabled = true;
						this.background(_this._focus_color);
						_this.missing(false);
					} else {
						this.enabled = false;
						this.background("transparent");
					}
					return this;
				},
			})

		// Text element.
		this.text = Text(text)
			.font_size("inherit")
			.color("inherit")
			.padding(0)
			.margin(0)

		// The content.
		this.content = HStack(this.circle, this.text)
			.width(100%)

		// The error message.
		this.error = Text("Incomplete field")
			.color(this._missing_color)
			.font_size("0.8em")
			.margin(5, 0, 0, 2.5)
			.padding(0)
			.hide()

		// Append.
		this.append(this.content, this.error);

		// Set id.
		if (id != null) {
			this.id(id);
		}

		// Set required.
		if (required) {
			this.required(required);
		}
	}

	// Set the focus color.
	border_color(val) {
		if (val == null) { return this._border_color; }
		this._border_color = val;
		this.circle.border_color(this._border_color);
		return this;
	}

	// Set the focus color.
	inner_bg(val) {
		if (val == null) { return this._inner_bg; }
		this._inner_bg = val;
		this.circle.inner.background(this._inner_bg);
		return this;
	}

	// Get the styling attributes.
	// The values of the children that may have been changed by the custom funcs should be added.
	styles(style_dict) {
		if (style_dict == null) {
			let styles = super.styles();
			styles["--circle-inner-bg"] = this._inner_bg;
			styles["--circle-border-color"] = this._border_color;
			styles["--focus-color"] = this._focus_color;
			styles["--missing-color"] = this._missing_color;
			return styles;
		} else {
			return super.styles(style_dict);
		}
	}

	// Set default since it inherits an element.
	set_default() {
		return super.set_default(ExtendedInputElement);
	}

	// Toggle value.
	toggle() {
		this.circle.toggle();
		return this;
	}

	// Get or set the value.
	value(to = null) { 
		if (to == null) { return this.circle.enabled; }
		this.circle.value(to);
		return this;
	}

	// Get or set the value.
	required(to = null) { 
		if (to == null) { return this._required; }
		this._required = to;
		return this;
	}

	// Set the focus color.
	focus_color(val) {
		if (val == null) { return this._focus_color; }
		this._focus_color = val;
		return this;
	}

	// Set the missing color.
	missing_color(val) {
		if (val == null) { return this._missing_color; }
		this._missing_color = val;
		return this;
	}

	// Set missing.
	missing(to = true) {
		if (to == null) { return this._missing; }
		else if (to === true) {
			this._missing = true;
			this.circle.outline(`1px solid ${this._missing_color}`)
			this.circle.box_shadow(`0 0 0 3px ${this._missing_color}80`)
			this.error.color(this._missing_color);
			this.error.show();
		} else {
			this._missing = false;
			this.circle.outline("0px solid transparent")
			this.circle.box_shadow(`0 0 0 0px transparent`)
			this.error.hide();
		}
		return this;
	}

	// Submit the item, throws an error when the item is not enabled.
	submit() {
		const value = this.value();
		if (value !== true) {
			this.missing(true);
			throw Error("Fill in all the required fields.");
		}
		this.missing(false);
		return value;
	}
}