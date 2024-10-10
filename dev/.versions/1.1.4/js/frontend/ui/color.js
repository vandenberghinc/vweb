
// Module.
vweb.colors = {};

// Hex module.
vweb.colors.hex = {

	// Get the brightness of a hex color (0.0 white 1.0 dark).
	get_brightness(color) {
		
		// Remove the hash symbol if present
		color = color.replace(/^#/, '');

		// Convert hex to RGB
		const bigint = parseInt(color, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		// Calculate perceived brightness using the relative luminance formula
		const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return brightness;
	},

	// Hex to rgbA.
	to_rgb(hex, as_array = false) {
		const index = hex.indexOf("#")
		if (index !== -1) {
			hex = hex.substr(index + 1);
		}
	    let r = parseInt(hex.substring(0, 2), 16);
	    let g = parseInt(hex.substring(2, 4), 16);
	    let b = parseInt(hex.substring(4, 6), 16);
	    let a = 1;
	    if (hex.length > 6) {
	    	a = parseInt(hex.substring(6, 8), 16) / 255;
	    }
	    if (as_array) {
	    	return [r, g, b, a];
	    }
	    return { r, g, b, a };
	},

	// Adjust brightness, darken or brighten a color.
	// param adjust is scaled in rgb [0...255]
	adjust_brightness(color, adjust = 0) {
		const rgba = this.to_rgb(color);
		rgba.r += adjust;
		rgba.g += adjust;
		rgba.b += adjust;
		return vweb.colors.rgba.to_hex(rgba.r, rgba.g, rgba.b, rgba.a);
	},

}
vweb.colors.hex.to_rgba = vweb.colors.hex.to_rgb;

// RGBA module.
vweb.colors.rgb = {

	// RGB(a) to hex.
	to_hex(r, g, b, a = 1) {
	    let hexR = parseInt(r).toString(16).padStart(2, '0');
	    let hexG = parseInt(g).toString(16).padStart(2, '0');
	    let hexB = parseInt(b).toString(16).padStart(2, '0');
	    let hexA = a == 1 ? "" : Math.round(a * 255).toString(16).padStart(2, '0');
	    return `#${hexR}${hexG}${hexB}${hexA}`;
	},

	// To object.
	to_obj(color) {
	    if (!color.startsWith("rgba(") && !color.startsWith("rgb(")) {
	        throw new Error("Invalid color format");
	    }
		const split = color.trim().split("(")[1].slice(0, -1).color.split(",")
		const obj = {r: null, g: null, b: null, a:1};
		const keys = Object.keys(obj);
		for (let i = 0; i < split.length; i++) {
			if (i === 3) {
				obj[keys[i]] = parseFloat(split[i].trim());
			} else {
				obj[keys[i]] = parseInt(split[i].trim());
			}
		}
		return obj;
	},

	// RGB(a) to string.
	to_str(r, g, b, a = 1) {
		if (a !== 1) {
			return `rgba(${r}, ${g}, ${b}, ${a})`;
		} else {
			return `rgb(${r}, ${g}, ${b})`;
		}
	},

	// Adjust brightness, darken or brighten a color.
	// param adjust is scaled in rgb [0...255]
	adjust_brightness(color, adjust = 0) {
		const rgba = this.to_obj(color);
		rgba.r += adjust;
		rgba.g += adjust;
		rgba.b += adjust;
		return this.to_str(rgba.r, rgba.g, rgba.b, rgba.a);
	},

}
vweb.colors.rgba = vweb.colors.rgb;

// Adjust brightness.
vweb.colors.adjust_brightness = (color, adjust = 0) => {
	if (color.startsWith("rgb")) {
        return vweb.colors.rgb.adjust_brightness(color, adjust);
    } else if (color.startsWith("#")) {
        return vweb.colors.hex.adjust_brightness(color, adjust);
    } else {
    	throw new Error("Invalid color format");
    }
}

// Set opacity.
vweb.colors.set_opacity = (color, opacity = 1.0) => {
	let rgb, type;
	if (color.startsWith("rgb")) {
		type = "rgb";
        rgb = vweb.colors.rgb.to_obj(color);
    } else if (color.startsWith("#")) {
    	type = "hex";
        rgb = vweb.colors.hex.to_rgb(color);
    } else {
    	throw new Error("Invalid color format");
    }
    rgb.a = opacity;
    if (false && type === "hex") {
    	return vweb.colors.rgb.to_hex(rgb.r, rgb.g, rgb.b, rgb.a);
    } else {
    	return vweb.colors.rgb.to_str(rgb.r, rgb.g, rgb.b, rgb.a);
    }
}

/*	@docs:
	@nav: Frontend
	@chapter: Styling
	@title: Color range
	@description: Used to create a range between two different colors. Can be initialized using alias function `ColorRange`.
	@param:
		@name: start
		@descr: The start color (lightest). May either be a HEX string or an rgb(a) array.
		@type: string, array
	@param:
		@name: end
		@descr: The end color (darkest). May either be a HEX string or an rgb(a) array.
		@type: string, array
 */
@constructor_wrapper(suffix="Class")
class ColorRangeClass {
    constructor(start, end) {
    	if (Array.isArray(start)) {
    		this.start = this.array_to_rgba(start);
    	} else if (typeof start === "string") {
    		this.start = vweb.colors.hex.to_rgb(start);
    	} else {
    		throw new Error(`Invalid type "${typeof start}" for parameter "start", the valid types are "string" or "array".`);
    	}
    	if (Array.isArray(end)) {
    		this.end = this.array_to_rgba(end);
    	} else if (typeof end === "string") {
    		this.end = vweb.colors.hex.to_rgb(end);
    	} else {
    		throw new Error(`Invalid type "${typeof end}" for parameter "end", the valid types are "string" or "array".`);
    	}
    }

    // Array to rgba.
    array_to_rgba(array) {
    	return {
			r: array[0],
			g: array[1],
			b: array[2],
			a: array.length === 3 ? [3] : 1,
		}
    }

    /*	@docs:
		@title: Interpolate
		@description: Interpolate between the start and end colors. When `percent` is 0 it will return the `start` color and when percent is `1` it will return the end color without computations.
		@param:
			@name: percent
			@descr: The percentage to interpolate from start to end, the valid range is `0.0` till `1.0`.
			@type: number
		@param:
			@name: alpha
			@descr: The alpha channel, the valid range is `0.0` till `1.0`.
			@type: number
			@default: 1
	 */
    interpolate(percent = 0.5, alpha = 1.0) {
    	if (percent <= 0) {
    		return vweb.colors.rgb.to_str(
				this.start.r,
				this.start.g,
				this.start.b,
				this.start.a,
			)
    	} else if (percent >= 1) {
    		return vweb.colors.rgb.to_str(
				this.end.r,
				this.end.g,
				this.end.b,
				this.end.a,
			)
    	}
    	return vweb.colors.rgba.to_str(
			Math.round(this.start.r + (this.end.r - this.start.r) * percent),
			Math.round(this.start.g + (this.end.g - this.start.g) * percent),
			Math.round(this.start.b + (this.end.b - this.start.b) * percent),
			alpha,
		)
    }

    // RGBA to hex.
    // rgb_to_hex(r, g, b, a = 1) {
    // 	const hex = [r, g, b].map(x => {
    //         const hex = x.toString(16);
    //         return hex.length === 1 ? '0' + hex : hex;
    //     })
    //     if (a != null && a < 1) {
    //     	let a = a / 100;
    //     	if (a < 10) {
    //     		hex.push("0" + a.toString())
    //     	} else {
    //     		hex.push(a.toString())
    //     	}
    //     }
    //     return '#' + hex.join('');
    // }
}