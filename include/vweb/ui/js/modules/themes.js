/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Themes module.
vweb.themes = {};
vweb.themes.theme_elements = [];

// The theme should have one of the ids.
// When an element has a function called "update()", this will be called after applying the new style.
vweb.themes.set = function(theme_id) {
	vweb.themes.theme_elements.iterate((theme) => {
		if (theme.id === theme_id) {
			const e = theme.element;
			Object.keys(theme).iterate((key) => {
				if (key !== "id" && key !== "element") {
					if (e[key] === undefined) {
						console.error(`"${key}()" is not a valid function of type "${e.element_type}"`);
						return null;
					}
					if (Array.isArray(theme[key])) {
						e[key](...theme[key]);
					} else {
						e[key](theme[key]);
					}
				}
			})
			if (e.element_type === "RingLoader") {
				e.update(e);
			}
			if (typeof e.theme_update === "function") {
				e.theme_update(e);
			}
		}
	})

}