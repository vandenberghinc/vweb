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
		const vstack = VStack()
			// .position(0, 0, 0, 0)
			.width("100%")
			.height("100%")
			.background("black")
		if (src != null) {
			vstack.mask("url('" + src + "') no-repeat center/contain");
		}
		// this.position("relative");
		this.append(vstack);

		// Set src.
		this.src(src);
	}

	// Image color.
	mask_color(value) {
		this.firstChild.style.background = value;
		return this;
	}

	// Override src.
	src(value) {
		this.firstChild.style.mask = "url('" + value + "') no-repeat center/contain";
		return this;
	}

	// Override mask.
	mask(value) {
		this.firstChild.style.mask = value;
		return this;
	}
		
}
