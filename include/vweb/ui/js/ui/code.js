/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// CodeBlock.
class CodeBlock extends Element {
	
	// Default styling.
	static default_styling = {
		"margin": "0px 0px 0px 0px",
		"padding": "15px 20px 15px 20px",
		"color": "inherit",
		"text-align": "start",
		"white-space": "wrap",
		"font-family": "'Menlo', 'Consolas', monospace",
		"font-size": "13px",
		"font-weight": "500",
		"line-height": "18px",
		"border-radius": "15px",
		"color": "#FFFFFF",
		"background": "#262F3D",
	};
	
	// Constructor.
	constructor(code) {
		
		// Initialize base class.
		super("CodeBlock", "code");
		
		// Set default styling
		this.style(CodeBlock.default_styling);

		// Set code.
		if (code != null) {
			while (code.length > 0 && code[code.length - 1] == "\n") {
				code = code.slice(-code.length, -1);
			}
			this.text(code.replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
		}

		// Zero arguments, may be to set default styling.
		// if (args.length !== 0) {
			
		// 	// Set langauge.
		// 	if (args.length === 2) {
		// 		this.attribute("language", args[0]);
		// 	}

		// 	// Set text.
		// 	if (args.length === 1) {
		// 		this.text(args[0].replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
		// 	} else if (args.length === 2) {
		// 		this.text(args[1].replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
		// 	} else {
		// 		console.error("Invalid number of arguments for function \"CodeBlock()\".");
		// 	}

		// }
	}

	// Set language.
	language(value) {
		this.element.setAttribute("language", value);
		return this;
	}

	// Set show line numbers, true or !true.
	line_numbers(value) {
		this.element.setAttribute("line_numbers", value);
		return this;
	}


	// Highlight code.
	highlight() {
		vhighlight.highlight(this.element);
		return this;
	}

	
}

// CodeLine.
class CodeLine extends Element {
	
	// Default styling.
	static default_styling = {
		"font-family": "\"Menlo\", \"Consolas\", monospace",
		"font-size": "inherit",
		"font-style": "italic",
		"background": "#000000",
		"color": "#FFFFFF",
		"border-radius": "10px",
		"padding": "5px 7.5px 5px 7.5px",
	};
	
	// Constructor.
	constructor(text, href) {
		
		// Initialize base class.
		super("CodeLine", "span");
		
		// Set default styling.
		this.style(CodeLine.default_styling);
		
		// Set text.
		this.text(text);
		
	}
		
}
