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
		this.append(
			new VStack()
				.width("100%")
				.height("100%")
				.background("black")
				.mask("url('" + src + "') no-repeat center/contain")
		);
	}

	// Override background.
	background(value) {
		this.firstChild.style.background = value;
		return this;
	}

	// Override src.
	src(value) {
		this.firstElementChild.style.mask = "url('" + value + "') no-repeat center/contain";
		return this;
	}

	// Override mask.
	mask(value) {
		this.firstElementChild.style.mask = value;
		return this;
	}
		
}
