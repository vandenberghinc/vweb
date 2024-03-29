/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Themes class.
/* 	@docs:
	@nav: Frontend
    @chapter: Themes
    @note: The `ThemesClass` is also initializable under function `Themes`.
	@desc:
		A themes class to efficiently style the site using themes.

		The constructor arguments must be a theme style per theme name. Every theme variable should exist in all themes or it may cause undefined behaviour. The theme name that is passed first will be the active theme by default.
		```
		Theme("main-theme", {
			light: {
				text_fg: "#000000",
			},
			dark: {
				text_fg: "#FFFFFF",
			},
		})
		```

		When theme attributes are retrieved, by default they will be the active theme's attribute as a css variable. So this can be passed to an element.
		However, some element functions do not accept css variables, in this case the `value()` function can be used to retrieve the raw value. Do not forget to apply an `on_theme_update()` callback on the elements where you use this.
 */
@constructor_wrapper(suffix="Class")
class ThemesClass {
	constructor(id, themes = {}) {

		// Attributes.
		this.active_id = null;
		this.active = null;
		this._themes = [];
		this._attrs = [];
		this._css_vars = {};
		this._id = id;

		// Assign themes.
		Object.keys(themes).iterate((theme) => {

			// Initialize.
			const theme_style = themes[theme];
			this._themes.append(theme);
			this[theme] = theme_style;

			// Activate first theme.
			if (this.active_id === null) {
				this.active_id = theme;
				this.active = theme_style;
				Object.keys(this.active).iterate((id) => {
					document.documentElement.style.setProperty(`--${this._id}_${id}`, this.active[id]);
				});
			}

			// Initialize attr funcs.
			Object.keys(theme_style).iterate((id) => {
				if (this._attrs.includes(id) === false) {
					// if (theme_style[id] instanceof String) {
					// 	theme_style[id] = theme_style[id].toString();
					// }
					// if (typeof theme_style[id] === "object" || Array.isArray(theme_style[id])) {
					// 	Object.defineProperty(this, id, {
					// 		get: function() {
					// 			return this.active[id];
					// 		},
					// 		enumerable: true,
					// 		configurable: true,
					// 	});
					// } else {
					if (typeof theme_style[id] === "string" && (theme_style[id].indexOf("linear-gradient") !== -1 || theme_style[id].indexOf("radial-gradient") !== -1)) {
						theme_style[id] = new String(theme_style[id]);
						theme_style[id]._is_gradient = true;
						this._css_vars[id] = new String(`var(--${this._id}_${id})`);
						this._css_vars[id]._is_gradient = true;
					} else {
						this._css_vars[id] = `var(--${this._id}_${id})`;
					}
					Object.defineProperty(this, id, {
						get: function() {
							return this._css_vars[id];
						},
						enumerable: true,
						configurable: true,
					});
					// }
					this._attrs.append(id);
				}
			})
		})
	}

	get id() {
		return `${this._id}.${this.active_id}`
	}

	// Initialize by cached.
	initialize() {
		const cached = localStorage.getItem(this._id);
		if (this._themes.includes(cached)) {
			this.activate(cached);
		}
		return this;
	}

	// Get raw value.
	value(id) {
		return this.active[id];
	}

	// Activate a theme.
	activate(id, apply_theme_update = true) {
		if (this._themes.includes(id) === false) {
			throw Error(`Theme "${id}" does not exist.`);
		}
		this.active_id = id;
		this.active = this[id];
		Object.keys(this.active).iterate((id) => {
			document.documentElement.style.setProperty(`--${this._id}_${id}`, this.active[id]);
		});
		if (this._on_activate_callback != null) {
			this._on_activate_callback(this, this.active_id);
		}
		if (apply_theme_update) {
			vweb.themes.apply_theme_update();
		}
		localStorage.setItem(this._id, this.active_id);
		return this;
	}

	// Set an on activate callback.
	on_activate(callback) {
		if (callback == null) { return this._on_activate_callback; }
		this._on_activate_callback = callback;
		return this;
	}
}