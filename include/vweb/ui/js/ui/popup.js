/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// RingLoader.
// - The width and height must be in pixels.
@vweb_constructor_wrapper
@vweb_register_element
class PopupElement extends VStackElement {
	constructor({
		title = "",
		text = "",
		no = "No",
		yes = "Yes",
		image = false,
		image_color = "white",
		content = [],
		on_no = () => {},
		on_yes = () => {},
		on_popup = () => {},
	}) {	

		// Initialize base class.
		super();

		// Mutex.
        this.mutex = new Mutex();

        // Handlers.
        this.on_no_handler = on_no;
        this.on_yes_handler = on_yes;
        this.on_popup_handler = on_popup;
        this.escape_handler = (event) => {
            if (event.key == "Escape") {
                this.close();
            }
        };

		// Image.
		this.image = ImageMask(image)
            .mask_color(image_color)
            .frame(35, 35)
            .position(-17.5, "calc(50% - 17.5px)", null, null);
        if (image === false) {
        	this.image.hide();
        }

        // Title.
        this.title = Title(title)
            .font_family("inherit")
            .font_weight(500)
            .font_size(34)
            .abs_parent(this)

        // Text.
        this.text = Text(text)
            .font_family("inherit")
            .font_size(16)
            .line_height(22)
            .max_width(300)
            .margin(15, 20, 0, 20)
            .wrap(true)
            .abs_parent(this)

        // No button.
        this.no_button = Button(no)
            .padding(10, 10, 10, 10)
            .stretch(true)
            .margin_right(5)
            .abs_parent(this)
            .on_click(() => {
            	this.close();
            })

        // Yes button.
        this.yes_button = Button(yes)
            .padding(10, 10, 10, 10)
            .stretch(true)
            .margin_left(5)
            .abs_parent(this)
            .on_click(() => {
            	this.hide();
	            document.body.removeEventListener("keydown", this.escape_handler);
	            this.on_yes_handler(this);
	            this.mutex.unlock();
            });

        // The buttons.
        this.buttons = HStack(this.no_button, this.yes_button)
	        .width("100%")
	        .margin_top(30)
	        .abs_parent(this)

       	// The custom content.
       	this.content = VStack(...content)
       		.abs_parent(this);

        // The content.
        this.widget = VStack(
	            this.image,
	            this.title,
	            this.text,
	            this.content,
	            this.buttons,
	        )
	        .position("relative")
	        .text_center()
	        .padding(40, 20, 20, 20)
	        .max_width(400)
	        .border_radius(10)
	        .background("black")
	        .border(1, "gray")
	        .box_shadow("0px 0px 10px #00000050")
	        .abs_parent(this)

		// Create content.
        this.append(this.widget)

	    // Styling.
	    this.hide()
	    this.position(0, 0, 0, 0)
	    // do not use background blur since that decreases the performance too much.
	    this.background("#00000060")
	    this.center()
	    this.center_vertical()
	    this.z_index(10000)
	}

	// Await the previous popup.
	async await() {
		await this.mutex.lock();
		this.mutex.unlock();
	}

	// Close the popup.
	close() {
		this.hide();
        document.body.removeEventListener("keydown", this.escape_handler);
        this.on_no_handler(this);
        this.mutex.unlock();
	}

	// Default popup function.
	async popup ({
        title = null,
        text = null,
        image = null,
        image_color = null,
        content = null,
        on_no = null,
        on_yes = null,
    } = {}) {

    	// Call on popup.
		this.on_popup_handler(this);

    	// Set args.
    	if (title !== null) {
    		this.title.text(title);
    	}
    	if (text !== null) {
    		this.text.text(text);
    	}
    	if (image !== null) {
    		this.image.src(image);
    		this.image.show();
    	}
    	if (image_color !== null) {
    		this.image.mask_color(image_color);
    	}
    	if (on_no !== null) {
    		this.on_no_handler = on_no;
    	}
    	if (on_yes !== null) {
    		this.on_yes_handler = on_yes;
    	}

    	// Await mutex.
        await this.mutex.lock();

        // Create content.
        if (content !== null) {
	        this.content.inner_html("");
	        this.content.append(...content);
	    }

        // Focus.
        this.show();
        this.focus();

        // Bind event listener close by escape.
        document.body.addEventListener("keydown", this.escape_handler); // for some reason on_key_down on main element is not catched.
	}
}
vweb.elements.register(Popup);