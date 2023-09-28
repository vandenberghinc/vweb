/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Media query.
// DEPRECATED.
// Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries.
class MediaQuery {
	
	// Constructor.
	constructor() {
		this.query = "";
	}

	// Add end.
	add_end() {
		if (this.query != "") {
			this.query += " and ";
		}
	}

    // Media feature any_hover.
    any_hover(value) {
    	this.add_and();
    	this.query += "(any-hover: " + value + ")";
    	return this;
    }

    // Media feature any_pointer.
    any_pointer(value) {
    	this.add_and();
    	this.query += "(any-pointer: " + value + ")";
    	return this;
    }

    // Media feature aspect_ratio.
    aspect_ratio(value) {
    	this.add_and();
    	this.query += "(aspect-ratio: " + value + ")";
    	return this;
    }

    // Media feature color.
    color(value) {
    	this.add_and();
    	this.query += "(color: " + value + ")";
    	return this;
    }

    // Media feature color_gamut.
    color_gamut(value) {
    	this.add_and();
    	this.query += "(color-gamut: " + value + ")";
    	return this;
    }

    // Media feature color_index.
    color_index(value) {
    	this.add_and();
    	this.query += "(color-index: " + value + ")";
    	return this;
    }

    // Media feature display_mode.
    display_mode(value) {
    	this.add_and();
    	this.query += "(display-mode: " + value + ")";
    	return this;
    }

    // Media feature dynamic_range.
    dynamic_range(value) {
    	this.add_and();
    	this.query += "(dynamic-range: " + value + ")";
    	return this;
    }

    // Media feature forced_colors.
    forced_colors(value) {
    	this.add_and();
    	this.query += "(forced-colors: " + value + ")";
    	return this;
    }

    // Media feature grid.
    grid(value) {
    	this.add_and();
    	this.query += "(grid: " + value + ")";
    	return this;
    }

    // Media feature height.
    height(value) {
    	this.add_and();
    	this.query += "(height: " + value + ")";
    	return this;
    }

    // Media feature hover.
    hover(value) {
    	this.add_and();
    	this.query += "(hover: " + value + ")";
    	return this;
    }

    // Media feature inverted_colors.
    inverted_colors(value) {
    	this.add_and();
    	this.query += "(inverted-colors: " + value + ")";
    	return this;
    }

    // Media feature monochrome.
    monochrome(value) {
    	this.add_and();
    	this.query += "(monochrome: " + value + ")";
    	return this;
    }

    // Media feature orientation.
    orientation(value) {
    	this.add_and();
    	this.query += "(orientation: " + value + ")";
    	return this;
    }

    // Media feature overflow_block.
    overflow_block(value) {
    	this.add_and();
    	this.query += "(overflow-block: " + value + ")";
    	return this;
    }

    // Media feature overflow_inline.
    overflow_inline(value) {
    	this.add_and();
    	this.query += "(overflow-inline: " + value + ")";
    	return this;
    }

    // Media feature pointer.
    pointer(value) {
    	this.add_and();
    	this.query += "(pointer: " + value + ")";
    	return this;
    }

    // Media feature prefers_color_scheme.
    prefers_color_scheme(value) {
    	this.add_and();
    	this.query += "(prefers-color-scheme: " + value + ")";
    	return this;
    }

    // Media feature prefers_contrast.
    prefers_contrast(value) {
    	this.add_and();
    	this.query += "(prefers-contrast: " + value + ")";
    	return this;
    }

    // Media feature prefers_reduced_motion.
    prefers_reduced_motion(value) {
    	this.add_and();
    	this.query += "(prefers-reduced-motion: " + value + ")";
    	return this;
    }

    // Media feature prefers_reduced_transparency .
    prefers_reduced_transparency (value) {
    	this.add_and();
    	this.query += "(prefers-reduced-transparency : " + value + ")";
    	return this;
    }

    // Media feature resolution.
    resolution(value) {
    	this.add_and();
    	this.query += "(resolution: " + value + ")";
    	return this;
    }

    // Media feature scripting.
    scripting(value) {
    	this.add_and();
    	this.query += "(scripting: " + value + ")";
    	return this;
    }

    // Media feature update.
    update(value) {
    	this.add_and();
    	this.query += "(update: " + value + ")";
    	return this;
    }

    // Media feature video_dynamic_range.
    video_dynamic_range(value) {
    	this.add_and();
    	this.query += "(video-dynamic-range: " + value + ")";
    	return this;
    }

    // Media feature width.
    width(value) {
    	this.add_and();
    	this.query += "(width: " + value + ")";
    	return this;
    }

    // Media feature min_width.
    min_width(value) {
    	this.add_and();
    	this.query += "(min-width: " + value + ")";
    	return this;
    }

    // Media feature max_width.
    max_width(value) {
    	this.add_and();
    	this.query += "(max-width: " + value + ")";
    	return this;
    }
		
}
