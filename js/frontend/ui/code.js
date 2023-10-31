/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// CodeBlock.
@vweb_constructor_wrapper
@vweb_register_element
class CodeBlockElement extends CreateVElementClass({
	type: "CodeBlock",
	tag: "code",
	default_style: {
		"display": "flex",
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
		"align-items": "stretch", // required for lines divider.
		"width": "100%",
		"min-width": "100%",
	},
}) {
	
	// Constructor.
	constructor(code_or_opts = {
		code: "",
		language: null,
		line_numbers: false,
		line_divider: true,
	}) {
		
		// Initialize base class.
		super();

		// Attributes.
		let code = code_or_opts;
		this.language = null;
		this.line_numbers = false;
		if (typeof code_or_opts.code === "object") {
			if (code_or_opts.code !== undefined) { code = code_or_opts.code; }
			if (code_or_opts.language !== undefined) { this.language = code_or_opts.language; }
			if (code_or_opts.line_numbers !== undefined) { this.line_numbers = code_or_opts.line_numbers; }
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

		// Append code pre.
		this.append(this.lines, this.lines_divider, this.pre);
		this.flex_wrap("nowrap")

	}

	// Show.
    show() {
    	this.style.display = "flex";
    	return this;
    }

	// Highlight code.
	highlight({
		code = null,			// only required if the code was not provided by the constructor.
		language = null,		// code language, precedes element attribute "language".
		line_numbers = false,	// show line numbers.
		animate = false,		// animate code writing.
		delay = 25,				// animation delay in milliseconds, only used when animatinos are enabled.
		duration = null,		// animation duration in milliseconds, only used when animatinos are enabled.
		opts = {},				// special args of the language's tokenizer constructor.
		_post_tokenized_callback = null,
	}) {

		// Update attributes.
		if (language != null) {
			this.language = language;
		}
		if (line_numbers != null) {
			this.line_numbers = line_numbers;
		}

		// Highlight.
		this.pre.highlight({
			code: code,
			language: this.language,
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

		// Await animation.
		if (this.animate_promise != null) {
			this.innerHTML = "";
			this.allow_animation = false;
			await this.animate_promise.catch(() => {});
			this.animate_promise = null;
		}

		// Start animation.
		this.allow_animation = true;
		this.animate_promise = new Promise((resolve, reject) => {

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
					return reject()
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

	// Highlight.
	highlight({
		code = null,			// only required if the code was not provided by the constructor.
		language = null,		// code language, precedes element attribute "language".
		animate = false,		// animate code writing.
		delay = 25,				// animation delay in milliseconds, only used when animatinos are enabled.
		duration = null,		// animation duration in milliseconds, only used when animatinos are enabled.
		opts = {},				// special args of the language's tokenizer constructor.
		_post_tokenized_callback = null,
	}) {

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
		// hide_loader();
		if (animate == true) {
			this.animate_writing({code: highlighted_code, delay, duration});
		} else {
			this.innerHTML = highlighted_code;
		}
			
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
