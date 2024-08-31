

// Extended input.
@constructor_wrapper
@register_element
class FormElement extends VStackElement {

	// Default styling.
	// static default_style = Object.assign({}, HStackElement.default_style, {
	static default_style = {
		...VStackElement.default_style,
	};

	// Constructor.
	constructor(...children) {

		// Initialize super.
		super();

		// Attributes.
		this.element_type = "Form";
		
		// Set default styling.
		this.styles(FormElement.default_style);

		// Attributes.
		this._button = undefined;
		this.fields = {};
		this._on_submit = (data) => {};
		// this._on_submit_error = (error) => {}; // by default rethrow error.

		// Set the on append callback.
		const _this = this;
		this._on_append_callback = function(child) {
			
			// Initialize field.
			if (child.element_type === "ExtendedInput" || child.element_type === "ExtendedSelect" || child.element_type === "CheckBox") {
				const id = child.id();
				if (id != null && id !== "") {
					_this.fields[id] = child;
					child.on_input(() => {
						if (child.missing() === true) {
							child.missing(false);
						}
					})
					child.on_enter(() => _this.submit())
				}
			}

			// Initialize button.
			else if (/*_this._button === undefined &&*/ (child.element_type === "Button" || child.element_type === "LoaderButton") && child.on_click() == null) { //  && child.attr("submit_button") != "false"
				if (_this._button !== undefined) {
					_this._button.on_click(() => {})
				}
				_this.button(child);
			}

			// Parse children.
			if (child.children != null) {
				for (let i = 0; i < child.children.length; i++) {
					_this._on_append_callback(child.children[i]);
				}
			}
		};

		// Append.
		this.append(...children);
	}

	// Submit all input elements and get the data inside an object.
	// When a required input is not filled in then an error is thrown.
	// An object will be returned with each input's id as the key and the input's value as value.
	// When an input field does not have an assigned id it will be skipped.
	// Only supported extended input elements like `ExtendedInput`.
	data() {
		const params = {};
	    let error;
	    const ids = Object.keys(this.fields);
	    for (let i = 0; i < ids.length; i++) {
	    	try {
	    		const id = ids[i];
	    		const element = this.fields[id];
		    	if (element.required() !== true) {
		    		params[id] = element.value();
		    	} else {
		    		params[id] = element.submit();
		    	}
		    } catch(e) {
	            error = e;
	        }
	    }
	    if (error) {
	    	throw error;
	    }
	    return params;
	}

	// Submit.
	async submit() {

		// Init.
		if (this._button === undefined) {
			throw Error("No submit button has been found, add a button to the form or attach a button using \"Form.button()\".");
		}
		if (this._button.show_loader !== undefined) {
			this._button.show_loader();
		}

		// Submit.
		try {
			const data = this.data();
			if (this._on_submit !== undefined) {
				const res = this._on_submit(this, data);
				if (res instanceof Promise) {
					await res;
				}
			}
			if (this._button.hide_loader !== undefined) {
				this._button.hide_loader();
			}
		}

		// Handle rror.
		catch (error) {

			// Defined callback.
			if (this._on_submit_error !== undefined) {
				const res = this._on_submit_error(this, error);
				if (res instanceof Promise) {
					await res;
				}
				if (this._button.hide_loader !== undefined) {
					this._button.hide_loader();
				}
			}

			// No callback so rethrow.
			else {
				if (this._button.hide_loader !== undefined) {
					this._button.hide_loader();
				}
				throw error;
			}
		}
	}

	// Set the submit button, by default the last button without a defined callback is used as the submit button.
	button(element_or_id) {
		if (element_or_id == null) { return this._button; }
		if (typeof element_or_id === "string") {
			element_or_id = document.getElementById(element_or_id);
			if (element_or_id == null) {
				throw Error(`Unable to find element "${element_or_id}".`);
			}
		}
		this._button = element_or_id;
		const _this = this;
		this._button.on_click(() => {
			_this.submit().catch(console.error)
		})
		return this;
	}

	// Set the on submit callback, the params for the callback are `(element, data) => {}`.
	on_submit(callback) {
		this._on_submit = callback;
		return this;
	}

	// Set the on submit error callback, the params for the callback are `(element, error) => {}`.
	on_submit_error(callback) {
		this._on_submit_error = callback;
		return this;
	}

}