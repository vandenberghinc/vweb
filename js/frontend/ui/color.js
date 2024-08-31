
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
    		this.start = this.hex_to_rgb(start);
    	} else {
    		throw new Error(`Invalid type "${typeof start}" for parameter "start", the valid types are "string" or "array".`);
    	}
    	if (Array.isArray(end)) {
    		this.end = this.array_to_rgba(end);
    	} else if (typeof end === "string") {
    		this.end = this.hex_to_rgb(end);
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

    // Hex to rgbA.
    hex_to_rgb(hex) {
    	const index = hex.indexOf("#")
    	if (index !== -1) {
    		hex = hex.substr(index + 1);
    	}
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        let a = 1;
        if (hex.length > 6) {
        	a = parseInt(hex.substring(6, 8)) / 100;
        }
        return { r, g, b, a };
    }

    // RGBA to string.
    rgba_to_str(r, g, b, a = 1) {
    	if (a === 1) {
			return `rgba(${r}, ${g}, ${b}, ${a})`;
		} else {
			return `rgb(${r}, ${g}, ${b})`;
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
    		return this.rgba_to_str(
				this.start.r,
				this.start.g,
				this.start.b,
				this.start.a,
			)
    	} else if (percent >= 1) {
    		return this.rgba_to_str(
				this.end.r,
				this.end.g,
				this.end.b,
				this.end.a,
			)
    	}
    	return this.rgba_to_str(
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