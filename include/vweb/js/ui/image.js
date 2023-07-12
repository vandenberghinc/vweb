/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Image.
class Image extends Element {
	
	// Default styling.
	static default_styling = {
		"margin": "0px",
		"padding": "0px",
		"object-fit": "cover",
	};
	
	// Constructor.
	constructor(src) {
		
		// Initialize base class.
		super("Image", "img");
		
		// Set default styling.
		this.style(Image.default_styling);
		
		// Set src.
		this.src(src);
	}
		
}

// ImageMask.
class ImageMask extends Element {
	
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
		super("ImageMask", "div");
		
		// Set default styling.
		this.style(ImageMask.default_styling);
		
		// Append child.
		this.append(
			new Element("ImageMaskChild", "div")
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

/*
// ImageMask.
class ImageMask extends Element {
	
	// Default styling.
	static default_styling = {
		"margin": "0px",
		"padding": "0px",
		"object-fit": "cover",
		// "display": "inline-block",
	};
	
	// Constructor.
	constructor(src) {
		
		// Initialize base class.
		super("ImageMask", "img");
		
		// Set default styling.
		this.style(ImageMask.default_styling);
		
		// Append child.
		this.src(src);
		// this.append(
		// 	new Element("ImageMaskChild", "div")
		// 	.width("100%")
		// 	.height("100%")
		// 	.background("black")
		// 	.mask("url('" + src + "') no-repeat center/contain")
		// );

	
		
}
(/)