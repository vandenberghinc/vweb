/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Image.
@vweb_constructor_wrapper
@vweb_register_element
class ImageElement extends CreateVElementClass({
	type: "Image",
	tag: "img",
	default_style: {
		"margin": "0px",
		"padding": "0px",
		"object-fit": "cover",
	},
}) {
	
	// Constructor.
	constructor(src) {
		
		// Initialize base class.
		super();
	
		// Set src.
		this.src(src);
	}
		
}

// ImageMask.
@vweb_constructor_wrapper
@vweb_register_element
class ImageMaskElement extends CreateVElementClass({
	type: "ImageMask",
	tag: "div",
	default_style: {
		"margin": "0px",
		"padding": "0px",
		"object-fit": "cover",
		"display": "inline-block",
	},
}) {
	
	// Constructor.
	constructor(src) {
		
		// Initialize base class.
		super();
	
		// Append child.
		this.mask_child = VStack()
			// .position(0, 0, 0, 0)
			.width("100%")
			.height("100%")
			.background("black")
		if (src != null) {
			this.mask_child.mask("url('" + src + "') no-repeat center/contain");
		}
		// this.position("relative");
		this.append(this.mask_child);

		// Set src.
		this.src(src);
	}

	// Image color.
	mask_color(value) {
		if (value == null) {
			return this.mask_child.style.background;
		}
		this.mask_child.style.background = value;
		return this;
	}

	// Override src.
	src(value) {
		if (value == null) {
			return this._src;
		}
		this.mask_child.mask("url('" + value + "') no-repeat center/contain");
		this._src = value;
		return this;
	}

	// Override mask.
	mask(value) {
		if (value == null) {
			return this.mask_child.mask();
		}
		this.mask_child.mask(value);
		return this;
	}
		
}
