/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Image.
class Image extends VElement {
	
	// Default vars.
	static s_type = "Image";
	static s_tag = "img";

	// Default styling.
	static default_styling = {
		"margin": "0px",
		"padding": "0px",
		"object-fit": "cover",
	};
	
	// Constructor.
	constructor(src) {
		
		// Initialize base class.
		super(Image.s_type, Image.s_tag, Image.default_styling);
		
		// Set src.
		this.src(src);
	}
		
}

// Register custom type.
vweb.utils.register_custom_type(Image);

// ImageMask.
class ImageMask extends VElement {
	
	// Default vars.
	static s_type = "ImageMask";
	static s_tag = "div";

	// Default styling.
	static default_styling = {
		"margin": "0px",
		"padding": "0px",
		"object-fit": "cover",
		"display": "inline-block",
	};
	
	// Constructor.
	constructor(src) {
		
		// Initialize base class.
		super(ImageMask.s_type, ImageMask.s_tag, ImageMask.default_styling);
		
		// Append child.
		this.append(
			new VElement("ImageMaskChild", "div")
				.width("100%")
				.height("100%")
				.background("black")
				.mask("url('" + src + "') no-repeat center/contain")
		);
	}

	// Override background.
	background(value) {
		this.element.firstChild.style.background = value;
		return this;
	}

	// Override src.
	src(value) {
		this.element.firstElementChild.style.mask = "url('" + value + "') no-repeat center/contain";
		return this;
	}

	// Override mask.
	mask(value) {
		this.element.firstElementChild.style.mask = value;
		return this;
	}
		
}

// Register custom type.
vweb.utils.register_custom_type(ImageMask);