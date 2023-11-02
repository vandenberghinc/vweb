/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// All codeblocks using languages.
vweb.elements.language_codeblocks = [];

// CodeBlock.
@vweb_constructor_wrapper
@vweb_register_element
class CodeBlockElement extends CreateVElementClass({
	type: "CodeBlock",
	tag: "code",
	default_style: {
		"display": "flex",
		"flex-direction": "column",
		"margin": "0px 0px 0px 0px",
		"padding": "15px 20px 15px 20px",
		"color": "inherit",
		"text-align": "start",
		"white-space": "pre",
		"font-family": "'Menlo', 'Consolas', monospace",
		"font-size": "13px",
		"font-weight": "500",
		"line-height": "18px",
		"border-radius": "15px",
		"color": "#FFFFFF",
		"background": "#262F3D",
		"overflow": "auto visible",
		"width": "100%",
		"min-width": "100%",
		"--header-color": "inherit",
		"--header-border": "#00000010",
		"--header-background": "inherit",
		"--selected-language-color": "inherit",
	},
}) {
	
	// Constructor.
	constructor(code_or_opts = {
		code: "",						// the code, or an object with code per language.
		language: null,					// the language.
		line_numbers: false,			// enable line numbers.
		line_divider: true,				// enable the line divider, only an option when line numbers are enabled.
		animate: false,					// animate code writing.
		delay: 25,						// animation delay in milliseconds, only used when animatinos are enabled.
		duration: null,					// animation duration in milliseconds, only used when animatinos are enabled.
		already_highlighted: false,		// can be used to indicate the code is already highlighted.
		opts: {},						// special args of the language's tokenizer constructor.
	}) {
		
		// Initialize base class.
		super();

		// Attributes.
		let code = code_or_opts;
		this.language = null;
		this.line_numbers = false;
		this.line_divider = true;
		this.animate = false
		this.delay = 25
		this.duration = null
		this.already_highlighted = false;
		this.opts = {};
		if (typeof code_or_opts === "object") {
			if (code_or_opts.code !== undefined) { code = code_or_opts.code; }
			if (code_or_opts.language !== undefined) { this.language = code_or_opts.language; }
			if (code_or_opts.line_numbers !== undefined) { this.line_numbers = code_or_opts.line_numbers; }
			if (code_or_opts.line_divider !== undefined) { this.line_divider = code_or_opts.line_divider; }
			if (code_or_opts.already_highlighted !== undefined) { this.already_highlighted = code_or_opts.already_highlighted; }
			if (code_or_opts.animate !== undefined) { this.animate = code_or_opts.animate; }
			if (code_or_opts.delay !== undefined) { this.delay = code_or_opts.delay; }
			if (code_or_opts.duration !== undefined) { this.duration = code_or_opts.duration; }
			if (code_or_opts.opts !== undefined) { this.opts = code_or_opts.opts; }
		}

		// Code per language.
		if (typeof code === "object") {
			this.languages = Object.keys(code);
			this.languages_code = code;
		}

		// Create the header for when multiple languages are passed.
		if (this.languages !== undefined) {

			// Vars.
			const code_pres = {};
			const opacity_duration = 100;
			const height_duration = 400;
			const lang_font_size = 10;
			const _this = this;

			// Styling.
			this._selected_language_color = CodeBlockElement.default_style["--selected-language-color"];
			this._header_color = CodeBlockElement.default_style["--header-color"];
			this._header_border = CodeBlockElement.default_style["--header-border"];
			this._header_background = CodeBlockElement.default_style["--header-background"];
			let background = this._header_background;
			if (this._header_background == null || this._header_background === "inherit") {
				this._header_background = "inherit";
				background = this.background();
			}
			let header_color = this._header_color; // required for image masks.
			if (this._header_color == null || this._header_color === "inherit") {
				header_color = this.color();
			}

			// The header element.
			this.clipboard = ImageMask("https://raw.githubusercontent.com/vandenberghinc/public-storage/master/libris/copy.png")
				.parent(this)
				.frame(15, 15)
				.flex_shrink(0)
				.margin(null, null, null, 10)
				.mask_color(header_color)
				.transform("rotate(90deg)")
				.hover_brightness(0.8, 0.9)
				.on_click(async () => {
					vweb.utils.copy_to_clipboard(_this.pre.textContent)
					.then(() => {
						// RESPONSE_STATUS.success("Copied to clipboard");
					})
					.catch((error) => {
						console.error(error);
						// RESPONSE_STATUS.error("Failed to the code to the clipboard");
					})
				});
			this.arrow = ImageMask("https://raw.githubusercontent.com/vandenberghinc/public-storage/master/libris/arrow.png")
				.parent(this)
				.frame(8, 8)
				.flex_shrink(0)
				.mask_color(header_color)
				.transform("rotate(90deg)")
				.parent(this);
			this.header = HStack(
				Span("")
					.font_size(12)
					.line_height(12)
					.font_weight("bold")
					.assign_to_parent_as("title")
					.color("inherit")
					.wrap(false)
					.overflow("hidden")
					.text_overflow("ellipsis"),
				this.clipboard,
				VStack(
					HStack(
						Span()
							.color("inherit")
							.margin_right(5)
							.font_size(lang_font_size)
							.line_height(lang_font_size)
							.assign_to_parent_as("value"),
						this.arrow,
					)
						.opacity(1)
						.center_vertical()
						.transition(`opacity ${opacity_duration}ms ease-in-out`)
						.center()
						.hover_brightness(0.8, 0.9)
						.on_click(() => {
							this.header.popup()
						})
						.assign_to_parent_as("minimized"),
					VStack()
						.opacity(0)
						.max_height(lang_font_size)
						.max_width("none")
						.width("100%")
						.center()
						.overflow("hidden")
						.transition(`max-height ${height_duration}ms ease-in-out, max-width ${height_duration}ms ease-in-out, opacity ${opacity_duration}ms ease-in-out`)
						.assign_to_parent_as("maximized"),
				)
				.position(7.5, 7.5, null, null)
				.center_vertical()
				.padding(7.5, 10)
				.border_radius(15)
				.border(1, this._header_border)
				.background(background)
				.z_index(2)
				.transition(`min-width ${height_duration}ms ease-in-out`)
				.assign_to_parent_as("content")

				// .min_width("100%")
				// .min_height("100%")
				
			)
			.parent(this)
			.position("relative")
			.color(this._header_color)
			.height(42.5)
			.padding(7.5, 15)
			.center_vertical()
			.z_index(2)
			.border_bottom(`1px solid ${this._header_border}`)
			.background(background)
			.extend({
				selected: null,
				set_selected: function(val) {

					// Shortcuts.
					const minimized = this.content.minimized;
					const maximized = this.content.maximized;

					// Set vars.
					minimized.value.text(val);
					this.title.text(val)
					this.selected = val;
					_this.language = val;

					// Set initial max width of the maximized view for a smooth transition also on the first time.
					if (maximized.max_width() === "none") {
						const width_measurer = document.createElement("canvas").getContext("2d");
						width_measurer.font = window.getComputedStyle(minimized.value).font;
						const initial_width = width_measurer.measureText(this.selected).width;
						maximized.max_width(initial_width + 10 + 10 + 7.5 * 2);
					}
				},
				close_handler: function(event) {
					_this.header.close_popup();
				},
				close_popup: function() {

					// Shortcuts.
					const minimized = this.content.minimized;
					const maximized = this.content.maximized;

					// Get new width of the selected text.
					const width_measurer = document.createElement("canvas").getContext("2d");
					width_measurer.font = window.getComputedStyle(minimized.value).font;
					const width = width_measurer.measureText(minimized.value.textContent).width;

					// Set max frame.
					maximized.max_height(lang_font_size);
					maximized.max_width(width + 10 + 10);

					// Handle minimized.
					setTimeout(() => {
						minimized.show()
						setTimeout(() => {
							this.content.min_width(0)
							minimized.opacity(1)
						}, 25);
					}, height_duration - opacity_duration - 25 + 125)

					// Handle maximized opacity.
					setTimeout(() => {
						maximized.opacity(0)
					}, height_duration - opacity_duration - 200)

					// Handle maximized children.
					setTimeout(() => {
						maximized.inner_html("");
					}, height_duration)

					// Post.
					window.removeEventListener("mousedown", this.close_handler);
					// ACTIVE_LANG_POPUP = null;
				},
				popup: function() {

					// Shortcuts.
					const minimized = this.content.minimized;
					const maximized = this.content.maximized;

					// Already open.
					if (parseFloat(maximized.max_height()) !== lang_font_size) {
						return null;
					}

					// Close and set active language popup.
					// if (ACTIVE_LANG_POPUP != null) {
					// 	ACTIVE_LANG_POPUP.close_popup();
					// }
					// ACTIVE_LANG_POPUP = this;

					// Build element.
					maximized.inner_html("");
					const stack = VStack()
						.padding(0, 10)
					maximized.append(stack)
					let height = 0;
					let width = 0;
					_this.languages.iterate((lang) => {
						const span = Span(lang)
								.color(lang === this.selected ? _this._selected_language_color : _this._header_color)
								.font_size(lang_font_size + 1)
								.line_height(lang_font_size + 1)
								.margin(6, 0, 6, 0)
								.on_click(() => {
									this.select(lang)
									this.close_popup();
								})
						stack.append(span);
						width = Math.max(width, span.clientWidth);
						height += (lang_font_size + 1) + 6 * 2;
					});
					width += 20;

					// Add remove event listener.
					window.addEventListener("mousedown", this.close_handler);

					// Start animation.
					minimized.hide()
					maximized.max_width(width);
					maximized.max_height(height);
					setTimeout(() => maximized.opacity(1), 100);
				},
				select: function (id, recursive = true) {
					if (recursive) {
						localStorage.setItem("vweb_code_lang", id);
						vweb.elements.language_codeblocks.iterate((item) => item.header.select(id, false))
					} else {
						this.set_selected(id);
						_this.languages.iterate((lang) => {
							if (lang === id) {
								if (_this.already_highlighted) {
									_this.pre.innerHTML = _this.languages_code[lang];
								} else {
									_this.highlight({
										code: _this.languages_code[lang],
										language: lang,
										animate: _this.animate,
										delay: _this.delay,
										duration: _this.duration,
										opts: _this.opts,
									})
								}
							}
						})
					}
				}
			})
			// Add to all language code blocks so when a user changes the language it changes everywhere.
			vweb.elements.language_codeblocks.push(this);
		}

		// Select the default code language or the first code language.
		if (this.languages !== undefined) {
			const def = localStorage.getItem("vweb_code_lang");
			if (this.languages.includes(def)) {
				code = this.languages_code[def];
				this.language = def;
			} else {
				code = this.languages_code[this.languages[0]];
				this.language = this.languages[0];
			}
		}

		// Code pre.
		this.pre = CodePre(code)
			.color("inherit")
			.font("inherit")
			.min_width("100%")
			.background("none")
			.border_radius(0)
			.padding(0)
			.margin(0)
			.overflow("visible")
			.line_height("inherit")

		// Line numbers.
		this.lines = VElement()
			.color("var(--vhighlight-token-comment)")
			.font("inherit")
			.white_space("pre")
			.line_height("inherit")
			.flex_shrink(0)
			.hide()

		// Line numbers divider.
		this.lines_divider = VElement()
			.background("var(--vhighlight-token-comment)")
			.min_width(0.5)
			.max_width(0.5)
			.flex_shrink(0)
			.height("100%")
			.margin(0, 10)
			.hide()

		// The content.
		this.content = HStack(this.lines, this.lines_divider, this.pre)
			.padding(CodeBlockElement.default_style.padding)
			.padding_bottom(0)
			.flex_wrap("nowrap")
			.align_items("stretch"); // required for lines divider.

		// Append code pre.
		this.append(
			this.header,
			this.content,
		);

		// Set padding.
		this.padding(CodeBlockElement.default_style.padding)
		this.padding(null, 0, null, 0)

		// Select the default code language or the first code language.
		if (this.languages !== undefined) {
			this.header.select(this.language, false);
		}

	}

	// Get the styling attributes.
	// The values of the children that may have been changed by the custom funcs should be added.
	styles(style_dict) {
		if (style_dict == null) {
			let styles = super.styles();
			styles["--header-color"] = this._header_color;
			styles["--header-border"] = this._header_border;
			styles["--header-background"] = this._header_background;
			styles["--selected-language-color"] = this._selected_language_color;
			return styles;
		} else {
			return super.styles(style_dict);
		}
	}

	// Show.
    show() {
    	this.style.display = "flex";
    	return this;
    }

    // Select a language when multiple languages exist.
    select(language) {
    	if (this.languages === undefined) {
    		throw Error("This function is only allowed when the code block was defined with different code per language.");
    	}
    	this.header.select(language);
    	return this;
    }

    // Retrieve the selected language.
    selected() {
    	return this.language;
    }

    // Set the foreground color of the selected language.
	selected_language_color(value) {
		if (value === null) {
			return this._selected_language_color;
		}
		this._selected_language_color = value;
		return this;
	}

    // Set the foreground color of the header.
    header_color(value) {
		if (value === null) {
			return this._header_color;
		}
		this._header_color = value;
		this.clipboard.mask_color(this._header_color)
		this.arrow.mask_color(this._header_color)
		this.header.color(this._header_color)
		return this;
	}

	// Set the background color of the header borders.
	header_border_color(value) {
		if (value === null) {
			return this._header_border;
		}
		this._header_border = value;
		this.header.content.border(1, this._header_border)
		this.header.border_bottom(`1px solid ${this._header_border}`)
		return this;
	}

	// Set the background color of the header.
    header_background(value) {
		if (value === null) {
			return this._header_background;
		}
		this._header_background = value;
		this.header.background(this._header_background)
		this.header.content.background(this._header_background)
		return this;
	}

	// Highlight code.
	highlight({
		code = null,			// only required if the code was not provided by the constructor.
		language = null,		// code language, precedes element attribute "language".
		line_numbers = null,	// show line numbers.
		animate = null,			// animate code writing.
		delay = null,			// animation delay in milliseconds, only used when animatinos are enabled.
		duration = null,		// animation duration in milliseconds, only used when animatinos are enabled.
		opts = null,			// special args of the language's tokenizer constructor.
	} = {}) {

		// Update attributes.
		if (language == null) { language = this.language; }
		if (line_numbers == null) { line_numbers = this.line_numbers; }
		if (animate == null) { animate = this.animate; }
		if (delay == null) { delay = this.delay; }
		if (duration == null) { duration = this.duration; }
		if (opts == null) { opts = this.opts; }

		// Highlight.
		this.pre.highlight({
			code: code,
			language: language,
			animate: animate,
			delay: delay,
			duration: duration,
			opts: opts,
			_post_tokenized_callback: !line_numbers ? null : (tokens) => {

				// Set line numbers.
				this.lines.show();
				this.lines_divider.show();
				let html = "";
				for (var i = 0; i < tokens.length; i++) {
					html += `${(i + 1)}\n`;
				}
				this.lines.innerHTML = html;

			},
		})

		// Response.
		return this;
	}

}

// CodePre.
@vweb_constructor_wrapper
@vweb_register_element
class CodePreElement extends CreateVElementClass({
	type: "CodePre",
	tag: "pre",
	default_style: {
		"margin": "0px 0px 0px 0px",
		"padding": "15px 20px 15px 20px",
		"color": "inherit",
		"text-align": "start",
		"white-space": "pre",
		"font-family": "'Menlo', 'Consolas', monospace",
		"font-size": "13px",
		"font-weight": "500",
		"line-height": "16px",
		"border-radius": "15px",
		"color": "#FFFFFF",
		"background": "#262F3D",
		"tab-size": 4,
		"overflow": "scroll visible",
	},
}) {
	
	// Constructor.
	constructor(code) {
		
		// Initialize base class.
		super();

		// Attributes.
		this.code = code;
		this.tokens = null;

		// Set code.
		if (this.code != null) {
			while (this.code.length > 0 && this.code[this.code.length - 1] == "\n") {
				this.code = this.code.slice(-this.code.length, -1);
			}
			this.text(this.code);
		}

	}

	// Animate writing.
	// @note cant use attribute for highlighted code since that may be edited inside `highlight()` while the animation is still busy and otherwise highlight would need to be an sync func, but it has to return this, not a promise.
	async animate_writing({code = null, delay = 25, duration = null} = {}) {

		// Check highlighted code.
		if (code == null) {
			throw Error(`The code must be highlighted first using "highlight()".`)
		}

		// Cancel animation.
		await this.cancel_animation();

		// Start animation.
		this.innerHTML = "";
		this.allow_animation = true;
		this.animate_promise = new Promise((resolve) => {

			// Set delay based on duration.
			if (duration != null) {
				delay = duration / code.length;
			}

			// Set the min height otherwise the height expands while scrolling while the writing is animated then this can created unwanted behviour when scrolling up.
			const computed = window.getComputedStyle(this);
			this.style.minHeight = `${parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom) + parseFloat(computed.lineHeight) * this.tokens.length}px`;
			
			// Reset content.
			this.innerHTML = "";

			// Add char.
			const add_char = (index) => {

				// Stop.
				if (this.allow_animation !== true) {
					return resolve()
				}

				// Animation finished.
				else if (index >= code.length) {
					return resolve()
				}

				// Animate.
				else {
					
					// Span opening.
					if (code[index] == '<') {
						
						// Fins span open, close and code.
						let span_index;
						let span_open = "";
						let span_close = "";
						let span_code = "";
						let open = true;
						let first = true;
						let recusrive = false;
						for (span_index = index; span_index < code.length; span_index++) {
							if (this.allow_animation !== true) {
								return ;
							}
							const char = code[span_index];
							if (char == '<' || open) {
								open = true;
								if (first) {
									span_open += char;
								} else {
									span_close += char;
								}
								if (char == '>') {
									open = false;
									if (first) {
										first = false;
										continue;
									}
										
									// Animate span code writing.
									let before = this.innerHTML;
									let added_span_code = "";
									const add_span_code = (index) => {
										if (index < span_code.length) {
											added_span_code += span_code[index]
											let add = before;
											add += span_open;
											add += added_span_code;
											add += span_close;
											this.innerHTML = add;
											setTimeout(() => add_span_code(index + 1), delay);
										} else {
											recusrive = true;
											setTimeout(() => add_char(span_index + 1), delay);
										}
									}
									add_span_code(0)
									
									// Stop.
									break;
								}
							}
							
							// Add non span code.
							else {
								span_code += char;
							}
							
						}
						if (recusrive === false && span_index === code.length) {
							resolve()
						}
					}
					
					// Non span code.
					else {
						this.innerHTML += code.charAt(index);
						setTimeout(() => add_char(index + 1), delay);
					}
				}
			}
			
			// Start animation.
			add_char(0);

		})

		// Response.
		return this.promise;
	}

	// Cancel animation.
	async cancel_animation() {
		if (this.animate_promise != null) {
			this.allow_animation = false;
			await this.animate_promise;
			this.animate_promise = null;
		}
	}

	// Highlight.
	highlight({
		code = null,			// only required if the code was not provided by the constructor.
		language = null,		// code language, precedes element attribute "language".
		animate = false,		// animate code writing.
		delay = 25,				// animation delay in milliseconds, only used when animatinos are enabled.
		duration = null,		// animation duration in milliseconds, only used when animatinos are enabled.
		opts = {},				// special args of the language's tokenizer constructor.
		_post_tokenized_callback = null,
	} = {}) {

		// Vars.
		if (code != null) {
			this.code = code;
			while (this.code.length > 0 && this.code[this.code.length - 1] == "\n") {
				this.code = this.code.slice(-this.code.length, -1);
			}
			this.text(code);
		}
		if (language != null) {
			this.language = language;
		}

		// Stop when no language is defined.
		if (this.language === "" || this.language == null) {
			return this;
		}

		// Cancel previous animation.
		this.cancel_animation()
		.then(() => {

			// Get tokenizer.
			this.tokenizer = vhighlight.init_tokenizer(this.language, opts);
			if (this.tokenizer == null) {
				return this;
			}

			// Get the tokens.
			this.tokenizer.code = this.code;
			this.tokens = this.tokenizer.tokenize();

			// Build the html.
			const highlighted_code = this.tokenizer.build_html(this.tokens);

			// Post tokenize callback.
			if (_post_tokenized_callback != null) {
				_post_tokenized_callback(this.tokens);
			}

			// Set code.
			if (animate == true) {
				this.animate_writing({code: highlighted_code, delay, duration})
			} else {
				this.innerHTML = highlighted_code;
			}
		})
			
		// Response.
		return this;
	}



}

// CodeLine.
@vweb_constructor_wrapper
@vweb_register_element
class CodeLineElement extends CreateVElementClass({
	type: "CodeLine",
	tag: "span",
	default_style: {
		"font-family": "\"Menlo\", \"Consolas\", monospace",
		"font-size": "0.90em",
		"font-style": "italic",
		"background": "#000000",
		"color": "#FFFFFF",
		"border-radius": "10px",
		"padding": "2.5px 7.5px 2.5px 7.5px",
	},
}) {
	
	// Constructor.
	constructor(text, href) {
		
		// Initialize base class.
		super();
		
		// Set text.
		this.text(text);
		
	}
		
}
