/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Image.
@constructor_wrapper
@register_element
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
	constructor(src, alt) {
		
		// Initialize base class.
		super();

		// Safari does not render images correctly for custom elements.
		if (vweb.is_safari) {
			this.attachShadow({ mode: 'open' });
			this._img = document.createElement("img");
			this._img.style.objectFit = "cover";
			this._img.style.width = "100%";
			this._img.style.height = "100%";
			this.shadowRoot.appendChild(this._img);
			this.position("relative"); // for img width height 100%
			this.overflow("hidden"); // for border radius.
		}
	
		// Set src.
		this.src(src);

		// Set alt.
		if (alt != null) {
			this.alt(alt);
		}
	}

	// Source, purely for safari.
	src(value) {
		if (this._img === undefined) {
			return super.src(value);
		}
		if (value == null) {
			return this._img.src;
		}
		this._img.src = src;
		return this;
	}

	// Alt, purely for safari.
	alt(value) {
		if (this._img === undefined) {
			return super.alt(value);
		}
		if (value == null) {
			return this._img.alt;
		}
		this._img.alt = value;
		return this;
	}

	// Completed, purely for safari.
	completed(value) {
		if (this._img === undefined) {
			return super.completed;
		}
		return this._img.completed;
	}

	// Source, purely for safari.
	src(value) {
		if (this._img === undefined) {
			return super.src(value);
		}
		if (value == null) {
			return this._img.src;
		}
		this._img.src = value;
		return this;
	}

	// Height, purely for safari.
	height(value) {
		if (this._img === undefined) {
			return super.height(value);
		}
		if (value == null) {
			return this._img.height;
		}
		if (typeof value !== "number") {
			this._img.style.height = value;
		} else {
			this._img.style.height = this.pad_numeric(value, "px");
			this._img.height = value;
		}
		return this;
	}
	min_height(value) {
		if (this._img === undefined) {
			return super.min_height(value);
		}
		if (value == null) {
			return this._img.style.minHeight;
		}
		this._img.style.minHeight = this.pad_numeric(value, "px");
		return this;
	}
	max_height(value) {
		if (this._img === undefined) {
			return super.max_height(value);
		}
		if (value == null) {
			return this._img.style.maxHeight;
		}
		this._img.style.maxHeight = this.pad_numeric(value, "px");
		return this;
	}

	// Width, purely for safari.
	width(value) {
		if (this._img === undefined || typeof value !== "number") {
			return super.width(value);
		}
		if (value == null) {
			return this._img.width;
		}
		if (typeof value !== "number") {
			this._img.style.width = value;
		} else {
			this._img.style.width = this.pad_numeric(value, "px");
			this._img.width = value;
		}
		return this;
	}
	min_width(value) {
		if (this._img === undefined) {
			return super.min_width(value);
		}
		if (value == null) {
			return this._img.style.minWidth;
		}
		this._img.style.minWidth = this.pad_numeric(value, "px");
		return this;
	}
	max_width(value) {
		if (this._img === undefined) {
			return super.max_width(value);
		}
		if (value == null) {
			return this._img.style.maxWidth;
		}
		this._img.style.maxWidth = this.pad_numeric(value, "px");
		return this;
	}

	// Loading "eager" or "lazy", purely for safari.
	loading(value) {
		if (this._img === undefined) {
			if (value == null) {
				return this.loading;
			}
			this.loading = value;
			return this;
		}
		if (value == null) {
			return this._img.loading;
		}
		this._img.loading = value;
		return this;
	}		
}

// ImageMask.
@constructor_wrapper
@register_element
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
