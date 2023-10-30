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
		"overflow-x": "auto",
		"align-items": "stretch", // required for lines divider.
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

		// Line numbers.
		this.lines = VElement()
			.color("inherit")
			.font("inherit")
			.white_space("pre")
			.min_width(0.5)
			.max_width(0.5);
			.margin(0, 10)
		if (this.line_numbers === false) {
			this.lines.hide();
		}

		// Line numbers divider.
		this.lines_divider = VElement()
			.background("currentColor");
		if (this.line_divider === false) {
			this.lines_divider.hide();
		}

		// Code pre.
		this.pre = CodePre(code)

		// Append code pre.
		this.append(this.lines, this.lines_divider, this.pre);

	}

	// Highlight code.
	highlight({
		code = null,			// only required if the code was not provided by the constructor.
		language = null,		// code language, precedes element attribute "language".
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

		// Highlight.
		this.pre.highlighted({
			code: code,
			language: this.language,
			animate: animate,
			delay: delay,
			duration: duration,
			tokenizer_args: tokenizer_args,
			_post_tokenized_callback: (tokens) => {

				// Set line numbers.
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
			while (code.length > 0 && this.code[this.code.length - 1] == "\n") {
				this.code = this.code.slice(-this.code.length, -1);
			}
			this.text(this.code);
		}

	}

	// Animate writing.
	animate_writing({delay = 25, duration = null}) {

		// Check highlighted code.
		if (this.highlighted_code == null) {
			throw Error(`The code must be highlighted first using "highlight()".`)
		}

		// Set delay based on duration.
		if (duration != null) {
			delay = duration / this.highlighted_code.length;
		}

		// Set the min height otherwise the height expands while scrolling while the writing is animated then this can created unwanted behviour when scrolling up.
		const computed = window.getComputedStyle(this);
		this.style.minHeight = `${parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom) + parseFloat(computed.lineHeight) * tokens.length}px`;
		
		// Reset content.
		this.innerHTML = "";

		// Add char.
		function add_char(index) {
			if (index < this.highlighted_code.length) {
				
				// Span opening.
				if (this.highlighted_code[index] == '<') {
					
					// Fins span open, close and code.
					let span_index;
					let span_open = "";
					let span_close = "";
					let span_code = "";
					let open = true;
					let first = true;
					for (span_index = index; span_index < this.highlighted_code.length; span_index++) {
						const char = this.highlighted_code[span_index];
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
								function add_span_code(index) {
									if (index < span_code.length) {
										added_span_code += span_code[index]
										let add = before;
										add += span_open;
										add += added_span_code;
										add += span_close;
										this.innerHTML = add;
										setTimeout(() => add_span_code(index + 1), delay);
									} else {
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
				}
				
				// Non span code.
				else {
					this.innerHTML += this.highlighted_code.charAt(index);
					setTimeout(() => add_char(index + 1), delay);
				}
			}
			
			// Non span code.
			else {
				this.innerHTML = this.highlighted_code;
			}
			
		}
		
		// Start animation.
		add_char(0);

		// Response.
		return this;
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
		const tokenizer = vhighlight.init_tokenizer(this.language, opts);
		if (tokenizer == null) {
			return this;
		}

		// Get the tokens.
		this.tokens = tokenizer.tokenize({code: code});

		// Build the html.
		this.highlighted_code = tokenizer.build_html(tokens);

		// Post tokenize callback.
		if (_post_tokenized_callback != null) {
			_post_tokenized_callback(this.tokens);
		}

		// Set code.
		// hide_loader();
		if (animate == true) {
			this.animate_writing();
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
