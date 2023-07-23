/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Canvas.
/*	@docs: {
 *	@chapter: UI
 *	@title: Canvas
 *	@description:
 *		Canvas element.
 *	@warning:
 *		This class is still experimental and may be subjec to future change.
 } */
class Canvas extends Element {
	
	// ---------------------------------------------------------
	// Constructors.
	
	constructor() {
		super("Canvas", "canvas");
		this.ctx_2d = this.element.getContext("2d");
	}

	// ---------------------------------------------------------
	// Utility functions.

	// Draw lines.
	draw_lines(ctx, points = [{x: 0, y: 0}], tension = null) {
		ctx.beginPath();
	    ctx.moveTo(points[0].x, points[0].y);
	    let t;
	    for (let i = 0; i < points.length - 1; i++) {
	    	if (points[i].tension != null) {
	    		t = points[i].tension;
	    	} else {
	    		t = (tension != null) ? tension : 0;
	    	}

	        let p0 = (i > 0) ? points[i - 1] : points[0];
	        let p1 = points[i];
	        let p2 = points[i + 1];
	        let p3 = (i != points.length - 2) ? points[i + 2] : p2;

	        let cp1x = p1.x + (p2.x - p0.x) / 6 * t;
	        let cp1y = p1.y + (p2.y - p0.y) / 6 * t;

	        let cp2x = p2.x - (p3.x - p1.x) / 6 * t;
	        let cp2y = p2.y - (p3.y - p1.y) / 6 * t;

	        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);

	    }
	}

	// Create gradient.
	create_gradient(ctx, gradient, start_x, start_y, end_x, end_y) {
		if (!(gradient instanceof Gradient)) {
			console.error("Invalid usage, parameter \"gradient\" should be type \"Gradient\".");
			return null;
		}
		let value;
		if (gradient.type == "linear") {
			value = ctx.createLinearGradient(start_x, start_y, end_x, end_y)
		} else if (gradient.type == "radial") {
			value = ctx.createRadialGradient(start_x, start_y, end_x, end_y) // @TODO.
		} else {
			value = ctx.createLinearGradient(start_x, start_y, end_x, end_y)
		}
		for (let i = 0; i < gradient.colors.length; i++) {
			let stop = gradient.colors[i].stop;
			if (vweb.utils.is_string(stop) && stop.includes("%")) {
				stop = parseFloat(stop.substr(0, stop.length - 1)) / 100;
			} else if (vweb.utils.is_string(stop) && stop.includes("px")) {
				stop = parseFloat(stop.substr(0, stop.length - 2));
			}
			value.addColorStop(stop, gradient.colors[i].color);
		}
		return value;
	}

	// ---------------------------------------------------------
	// Functions.

    // Create a line.
    /*	@docs: {
     *	@title: Line.
     *	@description: 
     *		Create a line, optionally curved and with custom styling.
     *	@return: 
     *		Returns the `Canvas` object.
     *	@parameter: {
     *		@name: points
     *		@description: The line points, an array with objects with `x` and `y` values.
     *	} 
     *	@parameter: {
     *		@name: tension
     *		@description: The smoothness of the line, use `null` or `0` for a straight line and {>0.0, 2.0} for a smooth line.
     *	} 
     *	@parameter: {
     *		@name: color
     *		@description: The line color.
     *	} 
     *	@parameter: {
     *		@name: fill
     *		@description: The fill color, supports a `Gradient` class. leave `null` to ignore.
     *	} 
     *	@parameter: {
     *		@name: scale
     *		@type: bool
     *		@description: When enabled all x and y coordinates are treated as a 0.0 till 1.0 scale in relation to the canvas' width and height.
     *	} 
     *	@parameter: {
     *		@name: dots
     *		@type: object
     *		@description: 
     *			Place dots at each coordinate, leave `null` to ignore.
     *			Fields:
     *			```{
     *				width: 0.01, // Dot width in pixels when `scale` is `false`, and dot width in percentage `{0.0,1.0}` when `scale` is `true`.
     *				color: "black", // Fill color.
     *			}```
     *	} 
     } */ 
    lines({
    	points = [{x: 0, y: 0}],
    	tension = null,
    	color = "black",
    	width = null,
    	fill = null,
    	scale = false,
    	dots = null,
    }) {

    	// Create context.
    	let ctx = this.ctx_2d;

    	// Scale.
    	if (scale) {
    		const width = this.width();
    		const height = this.height();
    		for (let i = 0; i < points.length; i++) {
    			points[i].x = width * points[i].x;
    			points[i].y = height * points[i].y;
    		}
    	}

    	// Draw.
    	this.draw_lines(ctx, points, tension);

	    // Stroke style.
	    if (width != null) {
	    	ctx.lineWidth = width;
	    }
	    if (color != null) {
	    	ctx.strokeStyle = color;
	    } else {
	    	ctx.strokeStyle = "transparent";
	    }
	    ctx.stroke();

	    // Fill style.
	    if (fill != null) {

	    	// Gradient.
	    	if (fill instanceof Gradient) {
				let minX = Infinity;
				let maxX = -Infinity;
				let minY = Infinity;
				let maxY = -Infinity;
				points.forEach((point) => {
				  minX = Math.min(minX, point.x);
				  maxX = Math.max(maxX, point.x);
				  minY = Math.min(minY, point.y);
				  maxY = Math.max(maxY, point.y);
				});
				ctx.fillStyle = this.create_gradient(ctx, fill, minX, minY, maxX, maxY);
	    	}

	    	// Default color.
	    	else {
	    		ctx.fillStyle = fill;
	    	}

	    	// Fill.
	    	ctx.fill();
	    }

	    // Draw dots.
    	if (dots != null) {
    		if (dots.width == null) {
    			if (scale) {
    				dots.width = 0.01;
    			} else {
    				dots.width = 5;
    			}
    		}
    		if (scale) {
    			dots.width = dots.width * this.width();
    		}
    		let is_gradient = false;
    		if (dots.color != null) {
    			if (dots.color instanceof Gradient) {
		    		is_gradient = true;
		    	} else {
		    		ctx.fillStyle = dots.color;
		    	}
    		}
    		for (let i = 0; i < points.length; i++) {
    			ctx.beginPath();
    			ctx.arc(points[i].x, points[i].y, dots.width, 0, 2 * Math.PI);
    			if (is_gradient) {
    				const gradient = this.create_gradient(ctx, dots.color, points[i].x - dots.width, points[i].y, points[i].x + dots.width, points[i].y);
    				ctx.fillStyle = gradient;
    			}
    			ctx.fill();
    			// ctx.fillRect(points[i].x - dots.width / 2, points[i].y - dots.width / 2, dots.width, dots.width);
    		}
    	}

    	return this;
    }

    // Remove all contexts.
    clear() {
    	this.ctx_2d.clearRect(0, 0, this.element.width, this.element.height);
    	return this;
    }
};
