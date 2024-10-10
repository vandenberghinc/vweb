// ---------------------------------------------------------
// Attr Functions

/**
 * @docs:
 * @title: Readonly
 * @desc: Specifies that the element is read-only, equivalent to the HTML attribute `readonly`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
readonly(): boolean;
readonly(value: boolean): this;
readonly(value?: boolean): boolean | this {
	if (value == null) { return super.readOnly; }
	if (!value) {
		super.removeAttribute("readOnly");
	} else {
		super.readOnly = value;
	}
	return this;
}

/**
 * @docs:
 * @title: Download
 * @desc: Specifies that the target will be downloaded when a user clicks on the hyperlink. The equivalent of HTML attribute `download`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
download(): string;
download(value: string | null): this;
download(value?: string): string | this {
	if (value == null) { return super.download; }
	if (!value) {
		super.removeAttribute("download");
	} else {
		super.download = value;
	}
	return this;
}

// ---------------------------------------------------------
// Automatically generated CSS functions. 
// Reference: https://www.w3schools.com/cssref/index.php. 

/**
 * @docs:
 * @title: Accent color
 * @desc: Specifies an accent color for user-interface controls. The equivalent of CSS attribute `accentColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
accent_color(): string;
accent_color(value: string): this;
accent_color(value?: string): string | this {
	if (value == null) { return this.style.accentColor; }
	this.style.accentColor = value;
	return this;
}

/**
 * @docs:
 * @title: Align Content
 * @desc: Specifies the alignment between the lines inside a flexible container when the items do not use all available space. 
 *        The equivalent of CSS attribute `alignContent`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
align_content(): string;
align_content(value: string): this;
align_content(value?: string): string | this {
	if (value == null) { return this.style.alignContent; }
	this.style.alignContent = value;
	this.style.msAlignContent = value;
	this.style.webkitAlignContent = value;
	this.style.MozAlignContent = value;
	this.style.OAlignContent = value;
	return this;
}

/**
 * @docs:
 * @title: Align Items
 * @desc: Specifies the alignment for items inside a flexible container, equivalent to the CSS attribute `alignItems`. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
align_items(): string;
align_items(value: string | null): this;
align_items(value?: string): string | this {
	if (value == null) { return this.style.alignItems; }
	this.style.alignItems = value;
	this.style.msAlignItems = value;
	this.style.webkitAlignItems = value;
	this.style.MozAlignItems = value;
	this.style.OAlignItems = value;
	return this;
}

/**
 * @docs:
 * @title: Align Self
 * @desc: Specifies the alignment for selected items inside a flexible container. The equivalent of CSS attribute `alignSelf`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
align_self(): string;
align_self(value: string): this;
align_self(value?: string): string | this {
	if (value == null) { return this.style.alignSelf; }
	this.style.alignSelf = value;
	this.style.msAlignSelf = value;
	this.style.webkitAlignSelf = value;
	this.style.MozAlignSelf = value;
	this.style.OAlignSelf = value;
	return this;
}

/**
 * @docs:
 * @title: All
 * @desc: Resets all properties (except unicode-bidi and direction). The equivalent of CSS attribute `all`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
all(): string;
all(value: string | null): this;
all(value?: string): string | this {
	if (value == null) { return this.style.all; }
	this.style.all = value;
	return this;
}

/**
 * @docs:
 * @title: Animation
 * @desc: A shorthand property for all the animation properties. 
 *        The equivalent of CSS attribute `animation`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
animation(): string;
animation(value: string): this;
animation(value?: string): string | this {
	if (value == null) { return this.style.animation; }
	this.style.animation = value;
	this.style.msAnimation = value;
	this.style.webkitAnimation = value;
	this.style.MozAnimation = value;
	this.style.OAnimation = value;
	return this;
}

/**
 * @docs:
 * @title: Animation Delay
 * @desc: Specifies a delay for the start of an animation, equivalent to the CSS attribute `animationDelay`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the instance of the element for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
animation_delay(): string;
animation_delay(value: string | number): this;
animation_delay(value?: string | number): string | this {
	if (value == null) { return this.style.animationDelay; }
	this.style.animationDelay = value;
	this.style.msAnimationDelay = value;
	this.style.webkitAnimationDelay = value;
	this.style.MozAnimationDelay = value;
	this.style.OAnimationDelay = value;
	return this;
}

/**
 * @docs:
 * @title: Animation Direction
 * @description: 
 *     Specifies whether an animation should be played forwards, backwards or in alternate cycles.
 *     The equivalent of CSS attribute `animationDirection`.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
animation_direction(): string;
animation_direction(value: string): this;
animation_direction(value?: string): string | this {
	if (value == null) { return this.style.animationDirection; }
	this.style.animationDirection = value;
	this.style.msAnimationDirection = value;
	this.style.webkitAnimationDirection = value;
	this.style.MozAnimationDirection = value;
	this.style.OAnimationDirection = value;
	return this;
}

/**
 * @docs:
 * @title: Animation Duration
 * @desc: Specifies how long an animation should take to complete one cycle. The equivalent of CSS attribute `animationDuration`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
animation_duration(): string;
animation_duration(value: string | number): this;
animation_duration(value?: string | number): string | this {
	if (value == null) { return this.style.animationDuration; }
	this.style.animationDuration = value;
	this.style.msAnimationDuration = value;
	this.style.webkitAnimationDuration = value;
	this.style.MozAnimationDuration = value;
	this.style.OAnimationDuration = value;
	return this;
}

/**
 * @docs:
 * @title: Animation Fill Mode
 * @desc: Specifies a style for the element when the animation is not playing, akin to the CSS `animation-fill-mode` property. 
 *        Use this method to set or retrieve the current fill mode value.
 * @param:
 *     @name: value
 *     @descr: The value to assign to the animation fill mode. Pass `null` to retrieve the current value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the instance of the element for chaining when a value is set. If `null` is passed, returns the current value of the animation fill mode.
 * @funcs: 2
 */
animation_fill_mode(): string;
animation_fill_mode(value: string | null): this;
animation_fill_mode(value?: string): string | this {
	if (value == null) { return this.style.animationFillMode; }
	this.style.animationFillMode = value;
	this.style.msAnimationFillMode = value;
	this.style.webkitAnimationFillMode = value;
	this.style.MozAnimationFillMode = value;
	this.style.OAnimationFillMode = value;
	return this;
}

/**
 * @docs:
 * @title: Animation Iteration Count
 * @desc: Specifies the number of times an animation should be played. The equivalent of CSS attribute `animationIterationCount`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
animation_iteration_count(): string;
animation_iteration_count(value: string | number): this;
animation_iteration_count(value?: string | number): string | this {
	if (value == null) { return this.style.animationIterationCount; }
	this.style.animationIterationCount = value;
	this.style.msAnimationIterationCount = value;
	this.style.webkitAnimationIterationCount = value;
	this.style.MozAnimationIterationCount = value;
	this.style.OAnimationIterationCount = value;
	return this;
}

/**
 * @docs:
 * @title: Animation Name
 * @desc: Specifies a name for the @keyframes animation, equivalent to the CSS attribute `animationName`. 
 *        When the parameter `value` is null, it retrieves the current attribute value.
 * @param:
 *     @name: value
 *     @descr: The value to assign for the animation name. Use null to retrieve the current value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the current animation name when `value` is null, otherwise returns the instance for chaining.
 * @funcs: 2
 */
animation_name(): string;
animation_name(value: string): this;
animation_name(value?: string): string | this {
	if (value == null) { return this.style.animationName; }
	this.style.animationName = value;
	this.style.msAnimationName = value;
	this.style.webkitAnimationName = value;
	this.style.MozAnimationName = value;
	this.style.OAnimationName = value;
	return this;
}

/**
 * @docs:
 * @title: Animation Play State
 * @desc: Specifies whether the animation is running or paused. 
 *        The equivalent of CSS attribute `animationPlayState`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
animation_play_state(): string;
animation_play_state(value: string): this;
animation_play_state(value?: string): string | this {
	if (value == null) { return this.style.animationPlayState; }
	this.style.animationPlayState = value;
	this.style.msAnimationPlayState = value;
	this.style.webkitAnimationPlayState = value;
	this.style.MozAnimationPlayState = value;
	this.style.OAnimationPlayState = value;
	return this;
}

/**
 * @docs:
 * @title: Animation Timing Function
 * @desc: Specifies the speed curve of an animation. The equivalent of CSS attribute `animationTimingFunction`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
animation_timing_function(): string;
animation_timing_function(value: string | null): this;
animation_timing_function(value?: string): string | this {
	if (value == null) { return this.style.animationTimingFunction; }
	this.style.animationTimingFunction = value;
	this.style.msAnimationTimingFunction = value;
	this.style.webkitAnimationTimingFunction = value;
	this.style.MozAnimationTimingFunction = value;
	this.style.OAnimationTimingFunction = value;
	return this;
}

/**
 * @docs:
 * @title: Aspect ratio
 * @desc: Specifies preferred aspect ratio of an element. The equivalent of CSS attribute `aspectRatio`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
aspect_ratio(): string;
aspect_ratio(value: string | null): this;
aspect_ratio(value?: string): this | string {
	if (value == null) { return this.style.aspectRatio; }
	this.style.aspectRatio = value;
	return this;
}

/**
 * @docs:
 * @title: Backdrop Filter
 * @desc: Defines a graphical effect to the area behind an element. The equivalent of CSS attribute `backdropFilter`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the instance of the element for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
backdrop_filter(): string;
backdrop_filter(value: string): this;
backdrop_filter(value?: string): string | this {
	if (value == null) { return this.style.backdropFilter; }
	this.style.backdropFilter = value;
	this.style.msBackdropFilter = value;
	this.style.webkitBackdropFilter = value;
	this.style.MozBackdropFilter = value;
	this.style.OBackdropFilter = value;
	return this;
}

/**
 * @docs:
 * @title: Backface Visibility
 * @desc: Defines whether or not the back face of an element should be visible when facing the user. 
 *        The equivalent of CSS attribute `backfaceVisibility`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
backface_visibility(): string;
backface_visibility(value: string): this;
backface_visibility(value?: string): string | this {
	if (value == null) { return this.style.backfaceVisibility; }
	this.style.backfaceVisibility = value;
	this.style.msBackfaceVisibility = value;
	this.style.webkitBackfaceVisibility = value;
	this.style.MozBackfaceVisibility = value;
	this.style.OBackfaceVisibility = value;
	return this;
}

/**
 * @docs:
 * @title: Background Attachment
 * @desc: Sets whether a background image scrolls with the rest of the page, or is fixed. 
 *        The equivalent of CSS attribute `backgroundAttachment`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
background_attachment(): string;
background_attachment(value: string | null): this;
background_attachment(value?: string): string | this {
	if (value == null) { return this.style.backgroundAttachment; }
	this.style.backgroundAttachment = value;
	return this;
}

/**
 * @docs:
 * @title: Background Blend Mode
 * @desc: Specifies the blending mode of each background layer (color/image). The equivalent of CSS attribute `backgroundBlendMode`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
background_blend_mode(): string;
background_blend_mode(value: string | null): this;
background_blend_mode(value?: string): string | this {
	if (value == null) { return this.style.backgroundBlendMode; }
	this.style.backgroundBlendMode = value;
	return this;
}

/**
 * @docs:
 * @title: Background Clip
 * @desc: Defines how far the background (color or image) should extend within an element. 
 *        The equivalent of CSS attribute `backgroundClip`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
background_clip(): string;
background_clip(value: string): this;
background_clip(value?: string): string | this {
	if (value == null) { return this.style.backgroundClip; }
	this.style.backgroundClip = value;
	this.style.msBackgroundClip = value;
	this.style.webkitBackgroundClip = value;
	this.style.MozBackgroundClip = value;
	this.style.OBackgroundClip = value;
	return this;
}

/**
 * @docs:
 * @title: Background Color
 * @desc: Specifies the background color of an element. The equivalent of CSS attribute `backgroundColor`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
background_color(): string;
background_color(value: string | null): this;
background_color(value?: string): string | this {
	if (value == null) { return this.style.backgroundColor; }
	this.style.backgroundColor = value;
	return this;
}

/**
 * @docs:
 * @title: Background Image
 * @desc: Specifies one or more background images for an element. 
 *        The equivalent of CSS attribute `backgroundImage`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
background_image(): string;
background_image(value: string): this;
background_image(value?: string): string | this {
	if (value == null) { return this.style.backgroundImage; }
	this.style.backgroundImage = value;
	return this;
}

/**
 * @docs:
 * @title: Background Origin
 * @desc: Specifies the origin position of a background image, equivalent to the CSS attribute `backgroundOrigin`. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign for the background origin. Leave `null` to retrieve the attribute's current value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @descr: Returns the instance of the element for chaining unless `value` is `null`, then the current attribute value is returned.
 * @funcs: 2
 */
background_origin(): string;
background_origin(value: string): this;
background_origin(value?: string): string | this {
	if (value == null) { return this.style.backgroundOrigin; }
	this.style.backgroundOrigin = value;
	this.style.msBackgroundOrigin = value;
	this.style.webkitBackgroundOrigin = value;
	this.style.MozBackgroundOrigin = value;
	this.style.OBackgroundOrigin = value;
	return this;
}

/**
 * @docs:
 * @title: Background Position
 * @desc: Specifies the position of a background image, equivalent to the CSS attribute `backgroundPosition`. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
background_position(): string;
background_position(value: string | null): this;
background_position(value?: string): string | this {
	if (value == null) { return this.style.backgroundPosition; }
	this.style.backgroundPosition = value;
	return this;
}

/**
 * @docs:
 * @title: Background Position X
 * @desc: Specifies the position of a background image on x-axis. 
 *        The equivalent of CSS attribute `backgroundPositionX`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
background_position_x(): string;
background_position_x(value: string | number): this;
background_position_x(value?: string | number): string | this {
	if (value == null) { return this.style.backgroundPositionX; }
	this.style.backgroundPositionX = value;
	return this;
}

/**
 * @docs:
 * @title: Background Position Y
 * @desc: Specifies the position of a background image on the y-axis, equivalent to the CSS attribute `backgroundPositionY`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
background_position_y(): string;
background_position_y(value: string | number): this;
background_position_y(value?: string | number): this | string {
	if (value == null) { return this.style.backgroundPositionY; }
	this.style.backgroundPositionY = value;
	return this;
}

/**
 * @docs:
 * @title: Background Repeat
 * @desc: Sets if/how a background image will be repeated. This corresponds to the CSS property `backgroundRepeat`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, in which case the attribute's value is returned.
 * @funcs: 2
 */
background_repeat(): string;
background_repeat(value: string): this;
background_repeat(value?: string): string | this {
	if (value == null) { return this.style.backgroundRepeat; }
	this.style.backgroundRepeat = value;
	return this;
}

/**
 * @docs:
 * @title: Background Size
 * @desc: Specifies the size of the background images. The equivalent of CSS attribute `backgroundSize`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
background_size(): string;
background_size(value: string | number): this;
background_size(value?: string | number): string | this {
	if (value == null) { return this.style.backgroundSize; }
	this.style.backgroundSize = this.pad_numeric(value);
	this.style.msBackgroundSize = this.pad_numeric(value);
	this.style.webkitBackgroundSize = this.pad_numeric(value);
	this.style.MozBackgroundSize = this.pad_numeric(value);
	this.style.OBackgroundSize = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Block size
 * @desc: Specifies the size of an element in block direction. 
 *        The equivalent of CSS attribute `blockSize`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
block_size(): string;
block_size(value: string | number): this;
block_size(value?: string | number): string | this {
    if (value == null) { return this.style.blockSize; }
    this.style.blockSize = this.pad_numeric(value);
    return this;
}

// A shorthand property for border-width, border-style and border-color.
// border(value) {
//     if (value == null) { return this.style.border; }
//     this.style.border = value;
//     return this;
// }

/**
 * @docs:
 * @title: Border Block
 * @desc: A shorthand property for border-block-width, border-block-style and border-block-color.
 *        The equivalent of CSS attribute `borderBlock`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_block(): string;
border_block(value: string | null): this | string;
border_block(value?: string): this | string {
	if (value == null) { return this.style.borderBlock; }
	this.style.borderBlock = value;
	return this;
}

/**
 * @docs:
 * @title: Border Block Color
 * @desc: Sets the color of the borders at start and end in the block direction. 
 *        The equivalent of CSS attribute `borderBlockColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
border_block_color(): string;
border_block_color(value: string | null): this;
border_block_color(value?: string): string | this {
	if (value == null) { return this.style.borderBlockColor; }
	this.style.borderBlockColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Block End Color
 * @desc: Sets the color of the border at the end in the block direction. The equivalent of CSS attribute `borderBlockEndColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_block_end_color(): string;
border_block_end_color(value: string | null): this;
border_block_end_color(value?: string): string | this {
	if (value == null) { return this.style.borderBlockEndColor; }
	this.style.borderBlockEndColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Block End Style
 * @desc: Sets the style of the border at the end in the block direction. 
 *        The equivalent of CSS attribute `borderBlockEndStyle`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
border_block_end_style(): string;
border_block_end_style(value: string): this;
border_block_end_style(value?: string): string | this {
	if (value == null) { return this.style.borderBlockEndStyle; }
	this.style.borderBlockEndStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Block End Width
 * @desc: Sets the width of the border at the end in the block direction. 
 *        The equivalent of CSS attribute `borderBlockEndWidth`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
border_block_end_width(): string;
border_block_end_width(value: string | number): this;
border_block_end_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderBlockEndWidth; }
	this.style.borderBlockEndWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Block Start Color
 * @desc: Sets the color of the border at the start in the block direction. 
 *        The equivalent of CSS attribute `borderBlockStartColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_block_start_color(): string;
border_block_start_color(value: string): this;
border_block_start_color(value?: string): string | this {
	if (value == null) { return this.style.borderBlockStartColor; }
	this.style.borderBlockStartColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Block Start Style
 * @desc: Sets the style of the border at the start in the block direction. 
 * The equivalent of CSS attribute `borderBlockStartStyle`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
border_block_start_style(): string;
border_block_start_style(value: string): this;
border_block_start_style(value?: string): string | this {
	if (value == null) { return this.style.borderBlockStartStyle; }
	this.style.borderBlockStartStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Block Start Width
 * @desc: Sets the width of the border at the start in the block direction. The equivalent of CSS attribute `borderBlockStartWidth`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_block_start_width(): string;
border_block_start_width(value: string | number): this;
border_block_start_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderBlockStartWidth; }
	this.style.borderBlockStartWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Block Style
 * @desc: Sets the style of the borders at start and end in the block direction. 
 *        The equivalent of CSS attribute `borderBlockStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_block_style(): string;
border_block_style(value: string): this;
border_block_style(value?: string): string | this {
	if (value == null) { return this.style.borderBlockStyle; }
	this.style.borderBlockStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Block Width
 * @desc: Sets the width of the borders at start and end in the block direction. 
 *        The equivalent of CSS attribute `borderBlockWidth`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_block_width(): string;
border_block_width(value: string | number): this;
border_block_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderBlockWidth; }
	this.style.borderBlockWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Bottom Color
 * @desc: Sets the color of the bottom border. The equivalent of CSS attribute `borderBottomColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_bottom_color(): string;
border_bottom_color(value: string): this;
border_bottom_color(value?: string): string | this {
	if (value == null) { return this.style.borderBottomColor; }
	this.style.borderBottomColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Bottom Left Radius
 * @desc: Defines the radius of the border of the bottom-left corner. 
 *        The equivalent of CSS attribute `borderBottomLeftRadius`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
border_bottom_left_radius(): string;
border_bottom_left_radius(value: string | number): this;
border_bottom_left_radius(value?: string | number): string | this {
	if (value == null) { return this.style.borderBottomLeftRadius; }
	this.style.borderBottomLeftRadius = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Bottom Right Radius
 * @desc: Defines the radius of the border of the bottom-right corner. 
 *        The equivalent of CSS attribute `borderBottomRightRadius`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
border_bottom_right_radius(): string;
border_bottom_right_radius(value: string | number): this;
border_bottom_right_radius(value?: string | number): string | this {
	if (value == null) { return this.style.borderBottomRightRadius; }
	this.style.borderBottomRightRadius = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Bottom Style
 * @desc: Sets the style of the bottom border, equivalent to the CSS attribute `borderBottomStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_bottom_style(): string;
border_bottom_style(value: string): this;
border_bottom_style(value?: string): string | this {
	if (value == null) { return this.style.borderBottomStyle; }
	this.style.borderBottomStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Bottom Width
 * @desc: Sets the width of the bottom border. The equivalent of CSS attribute `borderBottomWidth`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_bottom_width(): string;
border_bottom_width(value: string | number): this;
border_bottom_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderBottomWidth; }
	this.style.borderBottomWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Collapse
 * @desc: Sets whether table borders should collapse into a single border or be separated. 
 * The equivalent of CSS attribute `borderCollapse`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_collapse(): string;
border_collapse(value: string): this;
border_collapse(value?: string): string | this {
    if (value == null) { return this.style.borderCollapse; }
    this.style.borderCollapse = value;
    return this;
}

/**
 * @docs:
 * @title: Border Color
 * @desc: Sets the color of the four borders. This is equivalent to the CSS attribute `borderColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining. Unless parameter `value` is `null`, 
 *                  then the attribute's value is returned.
 * @funcs: 2
 */
border_color(): string;
border_color(value: string | null): this;
border_color(value?: string): string | this {
	if (value == null) { return this.style.borderColor; }
	this.style.borderColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Image
 * @desc: A shorthand property for all the border-image properties. 
 *        The equivalent of CSS attribute `borderImage`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_image(): string;
border_image(value: string): this;
border_image(value?: string): string | this {
	if (value == null) { return this.style.borderImage; }
	this.style.borderImage = value;
	this.style.msBorderImage = value;
	this.style.webkitBorderImage = value;
	this.style.MozBorderImage = value;
	this.style.OBorderImage = value;
	return this;
}

/**
 * @docs:
 * @title: Border image outset
 * @desc: Specifies the amount by which the border image area extends beyond the border box. The equivalent of CSS attribute `borderImageOutset`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_image_outset(): string;
border_image_outset(value: string | number): this;
border_image_outset(value?: string | number): string | this {
	if (value == null) { return this.style.borderImageOutset; }
	this.style.borderImageOutset = value;
	return this;
}

/**
 * @docs:
 * @title: Border Image Repeat
 * @desc: Specifies whether the border image should be repeated, rounded or stretched. 
 *        The equivalent of CSS attribute `borderImageRepeat`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_image_repeat(): string;
border_image_repeat(value: string | null): this;
border_image_repeat(value?: string): string | this {
	if (value == null) { return this.style.borderImageRepeat; }
	this.style.borderImageRepeat = value;
	return this;
}

/**
 * @docs:
 * @title: Border Image Slice
 * @desc: Specifies how to slice the border image, equivalent to the CSS attribute `borderImageSlice`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_image_slice(): string;
border_image_slice(value: string | number): this;
border_image_slice(value?: string | number): string | this {
	if (value == null) { return this.style.borderImageSlice; }
	this.style.borderImageSlice = value;
	return this;
}

/**
 * @docs:
 * @title: Border Image Source
 * @desc: Specifies the path to the image to be used as a border. 
 *        The equivalent of CSS attribute `borderImageSource`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_image_source(): string;
border_image_source(value: string | null): this;
border_image_source(value?: string): string | this {
	if (value == null) { return this.style.borderImageSource; }
	this.style.borderImageSource = value;
	return this;
}

/**
 * @docs:
 * @title: Border Image Width
 * @desc: Specifies the width of the border image, equivalent to the CSS attribute `borderImageWidth`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value if `value` is `null`, otherwise returns the instance for chaining.
 * @funcs: 2
 */
border_image_width(): string;
border_image_width(value: string | number): this;
border_image_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderImageWidth; }
	this.style.borderImageWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border inline
 * @desc: A shorthand property for border-inline-width, border-inline-style and border-inline-color. 
 *        The equivalent of CSS attribute `borderInline`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline(): string;
border_inline(value: string | number): this;
border_inline(value?: string | number): string | this {
	if (value == null) { return this.style.borderInline; }
	this.style.borderInline = value;
	return this;
}

/**
 * @docs:
 * @title: Border Inline Color
 * @desc: Sets the color of the borders at start and end in the inline direction. 
 *        The equivalent of CSS attribute `borderInlineColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining, unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline_color(): string;
border_inline_color(value: string | null): this;
border_inline_color(value?: string): string | this {
	if (value == null) { return this.style.borderInlineColor; }
	this.style.borderInlineColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Inline End Color
 * @desc: Sets the color of the border at the end in the inline direction. 
 * The equivalent of CSS attribute `borderInlineEndColor`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline_end_color(): string;
border_inline_end_color(value: string | null): this;
border_inline_end_color(value?: string): string | this {
	if (value == null) { return this.style.borderInlineEndColor; }
	this.style.borderInlineEndColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Inline End Style
 * @desc: Sets the style of the border at the end in the inline direction. 
 *        The equivalent of CSS attribute `borderInlineEndStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline_end_style(): string;
border_inline_end_style(value: string): this;
border_inline_end_style(value?: string): string | this {
	if (value == null) { return this.style.borderInlineEndStyle; }
	this.style.borderInlineEndStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Inline End Width
 * @desc: Sets the width of the border at the end in the inline direction. 
 * The equivalent of CSS attribute `borderInlineEndWidth`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline_end_width(): string;
border_inline_end_width(value: string | number): this;
border_inline_end_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderInlineEndWidth; }
	this.style.borderInlineEndWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border inline start color
 * @desc: Sets the color of the border at the start in the inline direction. The equivalent of CSS attribute `borderInlineStartColor`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline_start_color(): string;
border_inline_start_color(value: string | null): this;
border_inline_start_color(value?: string): string | this {
	if (value == null) { return this.style.borderInlineStartColor; }
	this.style.borderInlineStartColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border inline start style
 * @desc: Sets the style of the border at the start in the inline direction.
 *        The equivalent of CSS attribute `borderInlineStartStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline_start_style(): string;
border_inline_start_style(value: string): this;
border_inline_start_style(value?: string): string | this {
	if (value == null) { return this.style.borderInlineStartStyle; }
	this.style.borderInlineStartStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Inline Start Width
 * @desc: Sets the width of the border at the start in the inline direction. 
 * The equivalent of CSS attribute `borderInlineStartWidth`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type number | null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline_start_width(): string;
border_inline_start_width(value: number): this;
border_inline_start_width(value?: number): string | this {
	if (value == null) { return this.style.borderInlineStartWidth; }
	this.style.borderInlineStartWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Inline Style
 * @desc: Sets the style of the borders at start and end in the inline direction. 
 * The equivalent of CSS attribute `borderInlineStyle`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline_style(): string;
border_inline_style(value: string | null): this;
border_inline_style(value?: string): string | this {
	if (value == null) { return this.style.borderInlineStyle; }
	this.style.borderInlineStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Inline Width
 * @desc: Sets the width of the borders at start and end in the inline direction. 
 *        The equivalent of CSS attribute `borderInlineWidth`. 
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_inline_width(): string;
border_inline_width(value: string | number | null): this | string {
	if (value == null) { return this.style.borderInlineWidth; }
	this.style.borderInlineWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Left Color
 * @desc: Sets the color of the left border. The equivalent of CSS attribute `borderLeftColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_left_color(): string;
border_left_color(value: string | null): this;
border_left_color(value?: string): string | this {
	if (value == null) { return this.style.borderLeftColor; }
	this.style.borderLeftColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Left Style
 * @desc: Sets the style of the left border. The equivalent of CSS attribute `borderLeftStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_left_style(): string;
border_left_style(value: string | null): this;
border_left_style(value?: string): string | this {
	if (value == null) { return this.style.borderLeftStyle; }
	this.style.borderLeftStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Left Width
 * @desc: Sets the width of the left border. The equivalent of CSS attribute `borderLeftWidth`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_left_width(): string;
border_left_width(value: string | number): this;
border_left_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderLeftWidth; }
	this.style.borderLeftWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border radius
 * @desc: A shorthand property for the four border-radius properties. The equivalent of CSS attribute `borderRadius`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_radius(): string;
border_radius(value: string | number): this;
border_radius(value?: string | number): string | this {
	if (value == null) { return this.style.borderRadius; }
	this.style.borderRadius = this.pad_numeric(value);
	this.style.msBorderRadius = this.pad_numeric(value);
	this.style.webkitBorderRadius = this.pad_numeric(value);
	this.style.MozBorderRadius = this.pad_numeric(value);
	this.style.OBorderRadius = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Right Color
 * @desc: Sets the color of the right border. This is equivalent to the CSS attribute `borderRightColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_right_color(): string;
border_right_color(value: string | null): this;
border_right_color(value?: string): string | this {
	if (value == null) { return this.style.borderRightColor; }
	this.style.borderRightColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Right Style
 * @desc: Sets the style of the right border. The equivalent of CSS attribute `borderRightStyle`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_right_style(): string;
border_right_style(value: string | null): this;
border_right_style(value?: string): string | this {
	if (value == null) { return this.style.borderRightStyle; }
	this.style.borderRightStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Right Width
 * @desc: Sets the width of the right border. The equivalent of CSS attribute `borderRightWidth`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_right_width(): string;
border_right_width(value: string | number): this;
border_right_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderRightWidth; }
	this.style.borderRightWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Spacing
 * @desc: Sets the distance between the borders of adjacent cells. 
 * The equivalent of CSS attribute `borderSpacing`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_spacing(): string;
border_spacing(value: string | number): this;
border_spacing(value?: string | number): string | this {
	if (value == null) { return this.style.borderSpacing; }
	this.style.borderSpacing = value;
	return this;
}

/**
 * @docs:
 * @title: Border Style
 * @desc: Sets the style of the four borders. The equivalent of CSS attribute `borderStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining, or the attribute's value if `value` is `null`.
 * @funcs: 2
 */
border_style(): string;
border_style(value: string): this;
border_style(value?: string): string | this {
	if (value == null) { return this.style.borderStyle; }
	this.style.borderStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Top Color
 * @desc: Sets the color of the top border. The equivalent of CSS attribute `borderTopColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining, unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_top_color(): string;
border_top_color(value: string | null): this;
border_top_color(value?: string): string | this {
	if (value == null) { return this.style.borderTopColor; }
	this.style.borderTopColor = value;
	return this;
}

/**
 * @docs:
 * @title: Border Top Left Radius
 * @desc: Defines the radius of the border of the top-left corner. The equivalent of CSS attribute `borderTopLeftRadius`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_top_left_radius(): string;
border_top_left_radius(value: string | number): this;
border_top_left_radius(value?: string | number): string | this {
	if (value == null) { return this.style.borderTopLeftRadius; }
	this.style.borderTopLeftRadius = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Top Right Radius
 * @desc: Defines the radius of the border of the top-right corner. 
 *        The equivalent of CSS attribute `borderTopRightRadius`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value if `value` is `null`, otherwise returns the instance for chaining.
 * @funcs: 2
 */
border_top_right_radius(): string;
border_top_right_radius(value: string | number): this;
border_top_right_radius(value?: string | number): string | this {
	if (value == null) { return this.style.borderTopRightRadius; }
	this.style.borderTopRightRadius = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Top Style
 * @desc: Sets the style of the top border. The equivalent of CSS attribute `borderTopStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
border_top_style(): string;
border_top_style(value: string): this;
border_top_style(value?: string): string | this {
	if (value == null) { return this.style.borderTopStyle; }
	this.style.borderTopStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Border Top Width
 * @desc: Sets the width of the top border, equivalent to the CSS attribute `borderTopWidth`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value if `value` is `null`, otherwise returns the instance for chaining.
 * @funcs: 2
 */
border_top_width(): string;
border_top_width(value: string | number): this;
border_top_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderTopWidth; }
	this.style.borderTopWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Border Width
 * @desc: Sets the width of the four borders, equivalent to the CSS attribute `borderWidth`. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining, unless the parameter `value` is `null`, 
 *                  then the attribute's value is returned.
 * @funcs: 2
 */
border_width(): string;
border_width(value: string | number): this;
border_width(value?: string | number): string | this {
	if (value == null) { return this.style.borderWidth; }
	this.style.borderWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Bottom
 * @desc: Sets the elements position, from the bottom of its parent element. 
 *        The equivalent of CSS attribute `bottom`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
bottom(): string;
bottom(value: string | number): this;
bottom(value?: string | number): string | this {
	if (value == null) { return this.style.bottom; }
	this.style.bottom = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Box decoration break
 * @desc: Sets the behavior of the background and border of an element at page-break, or, for in-line elements, at line-break. The equivalent of CSS attribute `boxDecorationBreak`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string | undefined
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, in which case the attribute's value is returned.
 * @funcs: 2
 */
box_decoration_break(): string | undefined;
box_decoration_break(value: string | null): this;
box_decoration_break(value?: string): string | this {
	if (value == null) { return this.style.boxDecorationBreak; }
	this.style.boxDecorationBreak = value;
	return this;
}

/**
 * @docs:
 * @title: Box reflect
 * @desc: The box-reflect property is used to create a reflection of an element. 
 *        The equivalent of CSS attribute `boxReflect`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
box_reflect(): string;
box_reflect(value: string): this;
box_reflect(value?: string): string | this {
	if (value == null) { return this.style.boxReflect; }
	this.style.boxReflect = value;
	return this;
}

/**
 * @docs:
 * @title: Box shadow
 * @desc: Attaches one or more shadows to an element. The equivalent of CSS attribute `boxShadow`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, 
 *                  then the attribute's value is returned.
 * @funcs: 2
 */
box_shadow(): string;
box_shadow(value: string | null): this;
box_shadow(value?: string): string | this {
	if (value == null) { return this.style.boxShadow; }
	this.style.boxShadow = value;
	this.style.msBoxShadow = value;
	this.style.webkitBoxShadow = value;
	this.style.MozBoxShadow = value;
	this.style.OBoxShadow = value;
	return this;
}

/**
 * @docs:
 * @title: Box sizing
 * @desc: Defines how the width and height of an element are calculated: should they include padding and borders, or not. The equivalent of CSS attribute `boxSizing`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
box_sizing(): string;
box_sizing(value: string): this;
box_sizing(value?: string): string | this {
	if (value == null) { return this.style.boxSizing; }
	this.style.boxSizing = value;
	this.style.msBoxSizing = value;
	this.style.webkitBoxSizing = value;
	this.style.MozBoxSizing = value;
	this.style.OBoxSizing = value;
	return this;
}

/**
 * @docs:
 * @title: Break After
 * @desc: Specifies whether or not a page-, column-, or region-break should occur after the specified element. The equivalent of CSS attribute `breakAfter`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
break_after(): string | this;
break_after(value: string): this;
break_after(value?: string): string | this {
	if (value == null) { return this.style.breakAfter; }
	this.style.breakAfter = value;
	return this;
}

/**
 * @docs:
 * @title: Break Before
 * @description: 
 *     Specifies whether or not a page-, column-, or region-break should occur before the specified element.
 *     The equivalent of CSS attribute `breakBefore`.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
break_before(): string;
break_before(value: string | null): this;
break_before(value?: string = null): string | this {
	if (value == null) { return this.style.breakBefore; }
	this.style.breakBefore = value;
	return this;
}

/**
 * @docs:
 * @title: Break Inside
 * @desc: Specifies whether or not a page-, column-, or region-break should occur inside the specified element. The equivalent of CSS attribute `breakInside`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
break_inside(): string | null;
break_inside(value: string): this;
break_inside(value?: string): string | this {
	if (value == null) { return this.style.breakInside; }
	this.style.breakInside = value;
	return this;
}

/**
 * @docs:
 * @title: Caption Side
 * @desc: Specifies the placement of a table caption. The equivalent of CSS attribute `captionSide`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
caption_side(): string;
caption_side(value: string): this;
caption_side(value?: string): string | this {
	if (value == null) { return this.style.captionSide; }
	this.style.captionSide = value;
	return this;
}

/**
 * @docs:
 * @title: Caret color
 * @desc: Specifies the color of the cursor (caret) in inputs, textareas, or any element that is editable. 
 *        The equivalent of CSS attribute `caretColor`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
caret_color(): string;
caret_color(value: string): this;
caret_color(value?: string): string | this {
	if (value == null) { return this.style.caretColor; }
	this.style.caretColor = value;
	return this;
}

/**
 * @docs:
 * @title: Clear
 * @desc: Specifies what should happen with the element that is next to a floating element. 
 *        The equivalent of CSS attribute `clear`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
clear(): string;
clear(value: string | null): this;
clear(value?: string): string | this {
	if (value == null) { return this.style.clear; }
	this.style.clear = value;
	return this;
}

/**
 * @docs:
 * @title: Clip
 * @desc: Clips an absolutely positioned element. The equivalent of CSS attribute `clip`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
clip(): string;
clip(value: string | null): this;
clip(value?: string): string | this {
    if (value == null) { return this.style.clip; }
    this.style.clip = value;
    return this;
}

// Sets the color of text.
// color(value) {
//     if (value == null) { return this.style.color; }
//     this.style.color = value;
//     return this;
// }

/**
 * @docs:
 * @title: Column Count
 * @desc: Specifies the number of columns an element should be divided into. 
 *        The equivalent of CSS attribute `columnCount`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number, null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
column_count(): number;
column_count(value: number): this;
column_count(value?: number): this | number {
	if (value == null) { return this.style.columnCount; }
	this.style.columnCount = value;
	this.style.msColumnCount = value;
	this.style.webkitColumnCount = value;
	this.style.MozColumnCount = value;
	this.style.OColumnCount = value;
	return this;
}

/**
 * @docs:
 * @title: Column Fill
 * @description: 
 *     Specifies how to fill columns, balanced or not. 
 *     The equivalent of CSS attribute `columnFill`. 
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
column_fill(): string;
column_fill(value: string): this;
column_fill(value?: string): string | this {
	if (value == null) { return this.style.columnFill; }
	this.style.columnFill = value;
	return this;
}

/**
 * @docs:
 * @title: Column Gap
 * @desc: Specifies the gap between the columns. The equivalent of CSS attribute `columnGap`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
column_gap(): string;
column_gap(value: string | number): this;
column_gap(value?: string | number): string | this {
	if (value == null) { return this.style.columnGap; }
	this.style.columnGap = value;
	this.style.msColumnGap = value;
	this.style.webkitColumnGap = value;
	this.style.MozColumnGap = value;
	this.style.OColumnGap = value;
	return this;
}

/**
 * @docs:
 * @title: Column Rule
 * @description: 
 *     A shorthand property for all the column-rule properties.
 *     The equivalent of CSS attribute `columnRule`.
 *		
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
column_rule(): string;
column_rule(value: string): this;
column_rule(value?: string): string | this {
	if (value == null) { return this.style.columnRule; }
	this.style.columnRule = value;
	this.style.msColumnRule = value;
	this.style.webkitColumnRule = value;
	this.style.MozColumnRule = value;
	this.style.OColumnRule = value;
	return this;
}

/**
 * @docs:
 * @title: Column Rule Color
 * @desc: Specifies the color of the rule between columns. This is equivalent to the CSS attribute `columnRuleColor`. 
 *         Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
column_rule_color(): string;
column_rule_color(value: string): this;
column_rule_color(value?: string): string | this {
    if (value == null) { return this.style.columnRuleColor; }
    this.style.columnRuleColor = value;
    this.style.msColumnRuleColor = value;
    this.style.webkitColumnRuleColor = value;
    this.style.MozColumnRuleColor = value;
    this.style.OColumnRuleColor = value;
    return this;
}

/**
 * @docs:
 * @title: Column Rule Style
 * @desc: Specifies the style of the rule between columns, equivalent to the CSS attribute `columnRuleStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, in which case the attribute's value is returned.
 * @funcs: 2
 */
column_rule_style(): string;
column_rule_style(value: string | null): this;
column_rule_style(value?: string): this | string {
	if (value == null) { return this.style.columnRuleStyle; }
	this.style.columnRuleStyle = value;
	this.style.msColumnRuleStyle = value;
	this.style.webkitColumnRuleStyle = value;
	this.style.MozColumnRuleStyle = value;
	this.style.OColumnRuleStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Column Rule Width
 * @desc: Specifies the width of the rule between columns. This is equivalent to the CSS attribute `columnRuleWidth`. 
 *         Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, in which case the attribute's value is returned.
 * @funcs: 2
 */
column_rule_width(): string;
column_rule_width(value: string | number): this;
column_rule_width(value?: string | number): string | this {
	if (value == null) { return this.style.columnRuleWidth; }
	this.style.columnRuleWidth = this.pad_numeric(value);
	this.style.msColumnRuleWidth = this.pad_numeric(value);
	this.style.webkitColumnRuleWidth = this.pad_numeric(value);
	this.style.MozColumnRuleWidth = this.pad_numeric(value);
	this.style.OColumnRuleWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Column Span
 * @desc: Specifies how many columns an element should span across. 
 *        The equivalent of CSS attribute `columnSpan`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number, null
 * @return:
 *     @type: this | number
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
column_span(): number;
column_span(value: number): this;
column_span(value?: number): this | number {
	if (value == null) { return this.style.columnSpan; }
	this.style.columnSpan = value;
	return this;
}

/**
 * @docs:
 * @title: Column Width
 * @desc: Specifies the column width, equivalent to the CSS attribute `columnWidth`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
column_width(): string;
column_width(value: string | number): this;
column_width(value?: string | number): string | this {
	if (value == null) { return this.style.columnWidth; }
	this.style.columnWidth = this.pad_numeric(value);
	this.style.msColumnWidth = this.pad_numeric(value);
	this.style.webkitColumnWidth = this.pad_numeric(value);
	this.style.MozColumnWidth = this.pad_numeric(value);
	this.style.OColumnWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Columns
 * @desc: A shorthand property for column-width and column-count. The equivalent of CSS attribute `columns`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
columns(): string;
columns(value: string | number): this;
columns(value?: string | number): string | this {
	if (value == null) { return this.style.columns; }
	this.style.columns = value;
	return this;
}

/**
 * @docs:
 * @title: Content
 * @desc: Used with the :before and :after pseudo-elements, to insert generated content. The equivalent of CSS attribute `content`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
content(): string;
content(value: string | number): this;
content(value?: string | number): string | this {
	if (value == null) {
		return this.style.content ?? "";
	}
	this.style.content = value.toString();
	return this;
}

/**
 * @docs:
 * @title: Counter Increment
 * @desc: Increases or decreases the value of one or more CSS counters. 
 *        The equivalent of CSS attribute `counterIncrement`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
counter_increment(): string;
counter_increment(value: string | number): this;
counter_increment(value?: string | number): string | this {
	if (value == null) { return this.style.counterIncrement; }
	this.style.counterIncrement = value;
	return this;
}

/**
 * @docs:
 * @title: Counter reset
 * @desc: Creates or resets one or more CSS counters. The equivalent of CSS attribute `counterReset`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
counter_reset(): string;
counter_reset(value: string): this;
counter_reset(value?: string): string | this {
	if (value == null) { return this.style.counterReset; }
	this.style.counterReset = value;
	return this;
}

/**
 * @docs:
 * @title: Cursor
 * @desc: Specifies the mouse cursor to be displayed when pointing over an element. 
 *        The equivalent of CSS attribute `cursor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining, unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
cursor(): string;
cursor(value: string | null): this;
cursor(value?: string): string | this {
	if (value == null) { return this.style.cursor; }
	this.style.cursor = value;
	return this;
}

/**
 * @docs:
 * @title: Direction
 * @desc: Specifies the text direction/writing direction. The equivalent of CSS attribute `direction`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
direction(): string;
direction(value: string): this;
direction(value?: string): string | this {
    if (value == null) { return this.style.direction; }
    this.style.direction = value;
    return this;
}

// Specifies how a certain HTML element should be displayed.
// display(value) {
//     if (value == null) { return this.style.display; }
//     this.style.display = value;
//     return this;
// }

/**
 * @docs:
 * @title: Empty Cells
 * @desc: Specifies whether or not to display borders and background on empty cells in a table. The equivalent of CSS attribute `emptyCells`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this, string | null
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
empty_cells(): string | null;
empty_cells(value: string): this;
empty_cells(value?: string): string | this {
	if (value == null) { return this.style.emptyCells; }
	this.style.emptyCells = value;
	return this;
}

/**
 * @docs:
 * @title: Filter
 * @desc: 
 * Defines effects (e.g. blurring or color shifting) on an element before the element is displayed.
 * The equivalent of CSS attribute `filter`.
 * 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
filter(): string;
filter(value: string): this;
filter(value?: string): string | this {
	if (value == null) { return this.style.filter; }
	this.style.filter = value;
	this.style.msFilter = value;
	this.style.webkitFilter = value;
	this.style.MozFilter = value;
	this.style.OFilter = value;
	return this;
}

/**
 * @docs:
 * @title: Flex
 * @description: 
 *     A shorthand property for the flex-grow, flex-shrink, and the flex-basis properties.
 *     The equivalent of CSS attribute `flex`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
flex(): string;
flex(value: string | null): this;
flex(value?: string): string | this {
	if (value == null) { return this.style.flex; }
	this.style.flex = value;
	this.style.msFlex = value;
	this.style.webkitFlex = value;
	this.style.MozFlex = value;
	this.style.OFlex = value;
	return this;
}

/**
 * @docs:
 * @title: Flex Basis
 * @desc: Specifies the initial length of a flexible item. The equivalent of CSS attribute `flexBasis`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
flex_basis(): string;
flex_basis(value: string | number): this;
flex_basis(value?: string | number): string | this {
	if (value == null) { return this.style.flexBasis; }
	this.style.flexBasis = value;
	this.style.msFlexBasis = value;
	this.style.webkitFlexBasis = value;
	this.style.MozFlexBasis = value;
	this.style.OFlexBasis = value;
	return this;
}

/**
 * @docs:
 * @title: Flex Direction
 * @desc: Specifies the direction of the flexible items. This is the equivalent of the CSS attribute `flexDirection`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining. If `value` is `null`, returns the current attribute's value.
 * @funcs: 2
 */
flex_direction(): string;
flex_direction(value: string | null): this;
flex_direction(value?: string): string | this {
	if (value == null) { return this.style.flexDirection; }
	this.style.flexDirection = value;
	this.style.msFlexDirection = value;
	this.style.webkitFlexDirection = value;
	this.style.MozFlexDirection = value;
	this.style.OFlexDirection = value;
	return this;
}

/**
 * @docs:
 * @title: Flex Flow
 * @desc: A shorthand property for the flex-direction and the flex-wrap properties. 
 *        The equivalent of CSS attribute `flexFlow`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
flex_flow(): string;
flex_flow(value: string): this;
flex_flow(value?: string): string | this {
	if (value == null) { return this.style.flexFlow; }
	this.style.flexFlow = value;
	this.style.msFlexFlow = value;
	this.style.webkitFlexFlow = value;
	this.style.MozFlexFlow = value;
	this.style.OFlexFlow = value;
	return this;
}

/**
 * @docs:
 * @title: Flex Grow
 * @desc: Specifies how much the item will grow relative to the rest. The equivalent of CSS attribute `flexGrow`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number, null
 * @return:
 *     @type: number | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
flex_grow(): number;
flex_grow(value: number): this;
flex_grow(value?: number): number | this {
	if (value == null) { return this.style.flexGrow; }
	this.style.flexGrow = value;
	this.style.msFlexGrow = value;
	this.style.webkitFlexGrow = value;
	this.style.MozFlexGrow = value;
	this.style.OFlexGrow = value;
	return this;
}

/**
 * @docs:
 * @title: Flex Shrink
 * @desc: Specifies how the item will shrink relative to the rest. 
 *        The equivalent of CSS attribute `flexShrink`. 
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number, null
 * @return:
 *     @type: number | this
 *     @description: Returns the attribute value when parameter `value` is `null`. 
 *                   Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
flex_shrink(): number | null;
flex_shrink(value: number): this;
flex_shrink(value?: number): number | this {
	if (value == null) { return this.style.flexShrink; }
	this.style.flexShrink = value;
	this.style.msFlexShrink = value;
	this.style.webkitFlexShrink = value;
	this.style.MozFlexShrink = value;
	this.style.OFlexShrink = value;
	return this;
}

/**
 * @docs:
 * @title: Flex Wrap
 * @desc: Specifies whether the flexible items should wrap or not. The equivalent of CSS attribute `flexWrap`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
flex_wrap(): string;
flex_wrap(value: string): this;
flex_wrap(value?: string): string | this {
	if (value == null) { return this.style.flexWrap; }
	this.style.flexWrap = value;
	this.style.msFlexWrap = value;
	this.style.webkitFlexWrap = value;
	this.style.MozFlexWrap = value;
	this.style.OFlexWrap = value;
	return this;
}

/**
 * @docs:
 * @title: Float
 * @desc: Specifies whether an element should float to the left, right, or not at all. 
 *        The equivalent of CSS attribute `float`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
float(): string;
float(value: string): this;
float(value?: string): string | this {
	if (value == null) { return this.style.float; }
	this.style.float = value;
	return this;
}

/**
 * @docs:
 * @title: Font
 * @desc: A shorthand property for the font-style, font-variant, font-weight, font-size/line-height, and the font-family properties. 
 *        The equivalent of CSS attribute `font`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the instance of the element for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font(): string;
font(value: string): this;
font(value?: string): string | this {
	if (value == null) { return this.style.font; }
	this.style.font = value;
	return this;
}

/**
 * @docs:
 * @title: Font Family
 * @desc: Specifies the font family for text. This is the equivalent of the CSS attribute `fontFamily`. 
 *         Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining, or the attribute's value if `value` is `null`.
 * @funcs: 2
 */
font_family(): string;
font_family(value: string | null): this | string;
font_family(value?: string): this | string {
	if (value == null) { return this.style.fontFamily; }
	this.style.fontFamily = value;
	return this;
}

/**
 * @docs:
 * @title: Font Feature Settings
 * @desc: Allows control over advanced typographic features in OpenType fonts. The equivalent of CSS attribute `fontFeatureSettings`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_feature_settings(): string;
font_feature_settings(value: string | null): this;
font_feature_settings(value?: string): string | this {
	if (value == null) { return this.style.fontFeatureSettings; }
	this.style.fontFeatureSettings = value;
	return this;
}

/**
 * @docs:
 * @title: Font Kerning
 * @desc: Controls the usage of the kerning information (how letters are spaced). The equivalent of CSS attribute `fontKerning`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_kerning(): string;
font_kerning(value: string | null): this;
font_kerning(value?: string): string | this {
	if (value == null) { return this.style.fontKerning; }
	this.style.fontKerning = value;
	return this;
}

/**
 * @docs:
 * @title: Font Language Override
 * @description: 
 *     Controls the usage of language-specific glyphs in a typeface.
 *     The equivalent of CSS attribute `fontLanguageOverride`.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value if `value` is `null`, otherwise returns the instance for chaining.
 * @funcs: 2
 */
font_language_override(): string;
font_language_override(value: string): this;
font_language_override(value?: string): string | this {
	if (value == null) { return this.style.fontLanguageOverride; }
	this.style.fontLanguageOverride = value;
	return this;
}

/**
 * @docs:
 * @title: Font size
 * @desc: Specifies the font size of text. The equivalent of CSS attribute `fontSize`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_size(): string;
font_size(value: string | number): this;
font_size(value?: string | number): string | this {
	if (value == null) { return this.style.fontSize; }
	this.style.fontSize = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Font Size Adjust
 * @desc: Preserves the readability of text when font fallback occurs. The equivalent of CSS attribute `fontSizeAdjust`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_size_adjust(): string;
font_size_adjust(value: string): this;
font_size_adjust(value?: string): string | this {
	if (value == null) { return this.style.fontSizeAdjust; }
	this.style.fontSizeAdjust = value;
	return this;
}

/**
 * @docs:
 * @title: Font Stretch
 * @desc: Selects a normal, condensed, or expanded face from a font family. 
 *        The equivalent of CSS attribute `fontStretch`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining, unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_stretch(): string;
font_stretch(value: string): this;
font_stretch(value?: string): string | this {
	if (value == null) { return this.style.fontStretch; }
	this.style.fontStretch = value;
	return this;
}

/**
 * @docs:
 * @title: Font Style
 * @desc: Specifies the font style for text. The equivalent of CSS attribute `fontStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_style(): string;
font_style(value: string): this;
font_style(value?: string): string | this {
	if (value == null) { return this.style.fontStyle; }
	this.style.fontStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Font synthesis
 * @desc: Controls which missing typefaces (bold or italic) may be synthesized by the browser. The equivalent of CSS attribute `fontSynthesis`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_synthesis(): string;
font_synthesis(value: string): this;
font_synthesis(value?: string): string | this {
	if (value == null) { return this.style.fontSynthesis; }
	this.style.fontSynthesis = value;
	return this;
}

/**
 * @docs:
 * @title: Font Variant
 * @desc: Specifies whether or not a text should be displayed in a small-caps font. The equivalent of CSS attribute `fontVariant`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_variant(): string;
font_variant(value: string): this;
font_variant(value?: string): string | this {
	if (value == null) { return this.style.fontVariant; }
	this.style.fontVariant = value;
	return this;
}

/**
 * @docs:
 * @title: Font variant alternates
 * @desc: Controls the usage of alternate glyphs associated to alternative names defined in @font-feature-values. 
 *        The equivalent of CSS attribute `fontVariantAlternates`. 
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
font_variant_alternates(): string;
font_variant_alternates(value: string): this;
font_variant_alternates(value?: string): string | this {
    if (value == null) { return this.style.fontVariantAlternates; }
    this.style.fontVariantAlternates = value;
    return this;
}

/**
 * @docs:
 * @title: Font Variant Caps
 * @desc: Controls the usage of alternate glyphs for capital letters. The equivalent of CSS attribute `fontVariantCaps`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_variant_caps(): string;
font_variant_caps(value: string): this;
font_variant_caps(value?: string): string | this {
	if (value == null) { return this.style.fontVariantCaps; }
	this.style.fontVariantCaps = value;
	return this;
}

/**
 * @docs:
 * @title: Font Variant East Asian
 * @desc: Controls the usage of alternate glyphs for East Asian scripts (e.g Japanese and Chinese).
 *        The equivalent of CSS attribute `fontVariantEastAsian`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
font_variant_east_asian(): string;
font_variant_east_asian(value: string): this;
font_variant_east_asian(value?: string): string | this {
	if (value == null) { return this.style.fontVariantEastAsian; }
	this.style.fontVariantEastAsian = value;
	return this;
}

/**
 * @docs:
 * @title: Font Variant Ligatures
 * @desc: Controls which ligatures and contextual forms are used in textual content of the elements it applies to. The equivalent of CSS attribute `fontVariantLigatures`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_variant_ligatures(): string;
font_variant_ligatures(value: string | null): this;
font_variant_ligatures(value?: string): string | this {
	if (value == null) { return this.style.fontVariantLigatures; }
	this.style.fontVariantLigatures = value;
	return this;
}

/**
 * @docs:
 * @title: Font Variant Numeric
 * @description: 
 * 		Controls the usage of alternate glyphs for numbers, fractions, and ordinal markers.
 * 		The equivalent of CSS attribute `fontVariantNumeric`.
 *		
 * 		Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_variant_numeric(): string;
font_variant_numeric(value: string | null): this;
font_variant_numeric(value?: string): string | this {
	if (value == null) { return this.style.fontVariantNumeric; }
	this.style.fontVariantNumeric = value;
	return this;
}

/**
 * @docs:
 * @title: Font Variant Position
 * @description: 
 *     Controls the usage of alternate glyphs of smaller size positioned as superscript or subscript regarding the baseline of the font.
 *     The equivalent of CSS attribute `fontVariantPosition`.
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
font_variant_position(): string;
font_variant_position(value: string): this;
font_variant_position(value?: string): string | this {
	if (value == null) { return this.style.fontVariantPosition; }
	this.style.fontVariantPosition = value;
	return this;
}

/**
 * @docs:
 * @title: Font Weight
 * @desc: Specifies the weight of a font, equivalent to the CSS attribute `fontWeight`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value if `value` is `null`, otherwise returns the instance for chaining.
 * @funcs: 2
 */
font_weight(): string;
font_weight(value: string | number): this;
font_weight(value?: string | number): string | this {
	if (value == null) { return this.style.fontWeight; }
	this.style.fontWeight = value;
	return this;
}

/**
 * @docs:
 * @title: Gap
 * @desc: A shorthand property for the row-gap and the column-gap properties. The equivalent of CSS attribute `gap`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
gap(): string;
gap(value: string | number): this;
gap(value?: string | number): string | this {
	if (value == null) { return this.style.gap; }
	this.style.gap = value;
	return this;
}

/**
 * @docs:
 * @title: Grid
 * @desc: A shorthand property for the grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and the grid-auto-flow properties. The equivalent of CSS attribute `grid`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
grid(): string;
grid(value: string): this;
grid(value?: string): string | this {
	if (value == null) { return this.style.grid; }
	this.style.grid = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Area
 * @desc: Either specifies a name for the grid item, or serves as a shorthand for grid-row-start, grid-column-start, grid-row-end, and grid-column-end properties. 
 *        The equivalent of CSS attribute `gridArea`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless `value` is `null`, in which case the attribute's value is returned.
 * @funcs: 2
 */
grid_area(): string;
grid_area(value: string | null): this;
grid_area(value?: string): string | this {
	if (value == null) { return this.style.gridArea; }
	this.style.gridArea = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Auto Columns
 * @desc: Specifies a default column size, equivalent to the CSS attribute `gridAutoColumns`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_auto_columns(): string;
grid_auto_columns(value: string | number): this;
grid_auto_columns(value?: string | number): string | this {
	if (value == null) { return this.style.gridAutoColumns; }
	this.style.gridAutoColumns = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Auto Flow
 * @desc: Specifies how auto-placed items are inserted in the grid. The equivalent of CSS attribute `gridAutoFlow`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
grid_auto_flow(): string;
grid_auto_flow(value: string): this;
grid_auto_flow(value?: string): string | this {
	if (value == null) { return this.style.gridAutoFlow; }
	this.style.gridAutoFlow = value;
	return this;
}

/**
 * @docs:
 * @title: Grid auto rows
 * @desc: Specifies a default row size, equivalent to the CSS attribute `gridAutoRows`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_auto_rows(): string;
grid_auto_rows(value: string | number): this;
grid_auto_rows(value?: string | number): string | this {
	if (value == null) { return this.style.gridAutoRows; }
	this.style.gridAutoRows = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Column
 * @description: 
 *     A shorthand property for the grid-column-start and the grid-column-end properties.
 *     The equivalent of CSS attribute `gridColumn`.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_column(): string;
grid_column(value: string): this;
grid_column(value?: string): string | this {
	if (value == null) { return this.style.gridColumn; }
	this.style.gridColumn = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Column End
 * @desc: Specifies where to end the grid item. The equivalent of CSS attribute `gridColumnEnd`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_column_end(): string;
grid_column_end(value: string | number): this;
grid_column_end(value?: string | number): string | this {
	if (value == null) { return this.style.gridColumnEnd; }
	this.style.gridColumnEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Column Gap
 * @desc: Specifies the size of the gap between columns. The equivalent of CSS attribute `gridColumnGap`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_column_gap(): string;
grid_column_gap(value: string | number): this;
grid_column_gap(value?: string | number): this | string {
	if (value == null) { return this.style.gridColumnGap; }
	this.style.gridColumnGap = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Column Start
 * @desc: Specifies where to start the grid item. This is the equivalent of the CSS attribute `gridColumnStart`. 
 *         Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the current value of the grid column start when `null` is passed, otherwise returns the instance for chaining.
 * @funcs: 2
 */
grid_column_start(): string;
grid_column_start(value: string | number): this;
grid_column_start(value?: string | number): string | this {
	if (value == null) { return this.style.gridColumnStart; }
	this.style.gridColumnStart = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Gap
 * @desc: A shorthand property for the grid-row-gap and grid-column-gap properties. 
 *        The equivalent of CSS attribute `gridGap`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_gap(): string;
grid_gap(value: string | number): this;
grid_gap(value?: string | number): string | this {
	if (value == null) { return this.style.gridGap; }
	this.style.gridGap = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Row
 * @description: 
 * A shorthand property for the grid-row-start and the grid-row-end properties.
 * The equivalent of CSS attribute `gridRow`.
 * 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_row(): string;
grid_row(value: string): this;
grid_row(value?: string): string | this {
	if (value == null) { return this.style.gridRow; }
	this.style.gridRow = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Row End
 * @desc: Specifies where to end the grid item. The equivalent of CSS attribute `gridRowEnd`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_row_end(): string;
grid_row_end(value: string): this;
grid_row_end(value?: string): string | this {
	if (value == null) { return this.style.gridRowEnd; }
	this.style.gridRowEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Row Gap
 * @desc: Specifies the size of the gap between rows. The equivalent of CSS attribute `gridRowGap`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_row_gap(): string;
grid_row_gap(value: string | number): this;
grid_row_gap(value?: string | number): string | this {
	if (value == null) { return this.style.gridRowGap; }
	this.style.gridRowGap = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Row Start
 * @desc: Specifies where to start the grid item, equivalent to CSS attribute `gridRowStart`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_row_start(): string;
grid_row_start(value: string | number): this;
grid_row_start(value?: string | number): string | this {
	if (value == null) { return this.style.gridRowStart; }
	this.style.gridRowStart = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Template
 * @desc: A shorthand property for the grid-template-rows, grid-template-columns and grid-areas properties. 
 *        The equivalent of CSS attribute `gridTemplate`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_template(): string;
grid_template(value: string): this;
grid_template(value?: string): string | this {
	if (value == null) { return this.style.gridTemplate; }
	this.style.gridTemplate = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Template Areas
 * @desc: Specifies how to display columns and rows, using named grid items. The equivalent of CSS attribute `gridTemplateAreas`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_template_areas(): string;
grid_template_areas(value: string): this;
grid_template_areas(value?: string): string | this {
	if (value == null) { return this.style.gridTemplateAreas; }
	this.style.gridTemplateAreas = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Template Columns
 * @desc: Specifies the size of the columns and how many columns in a grid layout. 
 *        The equivalent of CSS attribute `gridTemplateColumns`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_template_columns(): string;
grid_template_columns(value: string | null): this;
grid_template_columns(value?: string = null): string | this {
	if (value == null) { return this.style.gridTemplateColumns; }
	this.style.gridTemplateColumns = value;
	return this;
}

/**
 * @docs:
 * @title: Grid Template Rows
 * @desc: Specifies the size of the rows in a grid layout, equivalent to the CSS attribute `gridTemplateRows`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
grid_template_rows(): string;
grid_template_rows(value: string | number): this;
grid_template_rows(value?: string | number): string | this {
	if (value == null) { return this.style.gridTemplateRows; }
	this.style.gridTemplateRows = value;
	return this;
}

/**
 * @docs:
 * @title: Hanging punctuation
 * @desc: Specifies whether a punctuation character may be placed outside the line box. The equivalent of CSS attribute `hangingPunctuation`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
hanging_punctuation(): string;
hanging_punctuation(value: string): this;
hanging_punctuation(value?: string): string | this {
	if (value == null) { return this.style.hangingPunctuation; }
	this.style.hangingPunctuation = value;
	return this;
}

// Sets the height of an element.
// height(value) {
//     if (value == null) { return this.style.height; }
//     this.style.height = this.pad_numeric(value);
//     return this;
// }

/**
 * @docs:
 * @title: Hyphens
 * @desc: Sets how to split words to improve the layout of paragraphs. The equivalent of CSS attribute `hyphens`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
hyphens(): string;
hyphens(value: string | null): this | string;
hyphens(value?: string): this | string {
	if (value == null) { return this.style.hyphens; }
	this.style.hyphens = value;
	return this;
}

/**
 * @docs:
 * @title: Image Rendering
 * @desc: Specifies the type of algorithm to use for image scaling. The equivalent of CSS attribute `imageRendering`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
image_rendering(): string;
image_rendering(value: string | null): this;
image_rendering(value?: string): string | this {
	if (value == null) { return this.style.imageRendering; }
	this.style.imageRendering = value;
	return this;
}

/**
 * @docs:
 * @title: Inline Size
 * @desc: Specifies the size of an element in the inline direction. 
 *        The equivalent of CSS attribute `inlineSize`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
inline_size(): string;
inline_size(value: string | number): this;
inline_size(value?: string | number): string | this {
	if (value == null) { return this.style.inlineSize; }
	this.style.inlineSize = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Inset
 * @desc: Specifies the distance between an element and the parent element. 
 *        The equivalent of CSS attribute `inset`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining, unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
inset(): string;
inset(value: string | number): this;
inset(value?: string | number): string | this {
	if (value == null) { return this.style.inset; }
	this.style.inset = value;
	return this;
}

/**
 * @docs:
 * @title: Inset Block
 * @desc: Specifies the distance between an element and the parent element in the block direction. 
 *        The equivalent of CSS attribute `insetBlock`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string | undefined
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
inset_block(): string | undefined;
inset_block(value: string | number): this;
inset_block(value?: string | number): string | this | undefined {
	if (value == null) { return this.style.insetBlock; }
	this.style.insetBlock = value;
	return this;
}

/**
 * @docs:
 * @title: Inset Block End
 * @desc: Specifies the distance between the end of an element and the parent element in the block direction.
 *        The equivalent of CSS attribute `insetBlockEnd`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
inset_block_end(): string | null;
inset_block_end(value: string | number): this;
inset_block_end(value?: string | number): string | this | null {
	if (value == null) { return this.style.insetBlockEnd; }
	this.style.insetBlockEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Inset Block Start
 * @desc: Specifies the distance between the start of an element and the parent element in the block direction. 
 *        The equivalent of CSS attribute `insetBlockStart`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
inset_block_start(): string;
inset_block_start(value: string | number): this;
inset_block_start(value?: string | number): string | this {
    if (value == null) { return this.style.insetBlockStart; }
    this.style.insetBlockStart = value;
    return this;
}

/**
 * @docs:
 * @title: Inset inline
 * @desc: Specifies the distance between an element and the parent element in the inline direction. 
 *        The equivalent of CSS attribute `insetInline`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
inset_inline(): string;
inset_inline(value: string | number): this;
inset_inline(value?: string | number): this | string {
	if (value == null) { return this.style.insetInline; }
	this.style.insetInline = value;
	return this;
}

/**
 * @docs:
 * @title: Inset Inline End
 * @desc: Specifies the distance between the end of an element and the parent element in the inline direction.
 *        The equivalent of CSS attribute `insetInlineEnd`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
inset_inline_end(): string;
inset_inline_end(value: string | number): this;
inset_inline_end(value?: string | number): string | this {
	if (value == null) { return this.style.insetInlineEnd; }
	this.style.insetInlineEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Inset Inline Start
 * @desc: Specifies the distance between the start of an element and the parent element in the inline direction. 
 *        The equivalent of CSS attribute `insetInlineStart`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
inset_inline_start(): string;
inset_inline_start(value: string | number): this;
inset_inline_start(value?: string | number): this | string {
	if (value == null) { return this.style.insetInlineStart; }
	this.style.insetInlineStart = value;
	return this;
}

/**
 * @docs:
 * @title: Isolation
 * @description: 
 *     Defines whether an element must create a new stacking content.
 *     The equivalent of CSS attribute `isolation`. 
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
isolation(): string;
isolation(value: string): this;
isolation(value?: string): string | this {
	if (value == null) { return this.style.isolation; }
	this.style.isolation = value;
	return this;
}

/**
 * @docs:
 * @title: Justify Content
 * @desc: Specifies the alignment between the items inside a flexible container when the items do not use all available space. The equivalent of CSS attribute `justifyContent`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
justify_content(): string;
justify_content(value: string | null): this;
justify_content(value?: string): string | this {
    if (value == null) { return this.style.justifyContent; }
    this.style.justifyContent = value;
    this.style.msJustifyContent = value;
    this.style.webkitJustifyContent = value;
    this.style.MozJustifyContent = value;
    this.style.OJustifyContent = value;
    return this;
}

/**
 * @docs:
 * @title: Justify Items
 * @desc: Sets the alignment of grid items in the inline direction on the grid container.
 * The equivalent of the CSS attribute `justify-items`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining, unless `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
justify_items(): string;
justify_items(value: string | null): this;
justify_items(value?: string): string | this {
	if (value == null) { return this.style.justifyItems; }
	this.style.justifyItems = value;
	return this;
}

/**
 * @docs:
 * @title: Justify Self
 * @desc: Sets the alignment of the grid item in the inline direction. This corresponds to the CSS attribute `justify-self`. 
 *          When the parameter `value` is `null`, it retrieves the current attribute value.
 * @param:
 *     @name: value
 *     @descr: The value to assign for alignment. Passing `null` retrieves the current value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the current alignment value if `value` is `null`, otherwise returns the instance for chaining.
 * @funcs: 2
 */
justify_self(): string;
justify_self(value: string | null): this;
justify_self(value?: string): string | this {
	if (value == null) { return this.style.justifySelf; }
	this.style.justifySelf = value;
	return this;
}

/**
 * @docs:
 * @title: Left
 * @desc: Specifies the left position of a positioned element. The equivalent of CSS attribute `left`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
left(): string;
left(value: string | number): this;
left(value?: string | number): string | this {
	if (value == null) { return this.style.left; }
	this.style.left = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Letter spacing
 * @desc: Increases or decreases the space between characters in a text. 
 *        The equivalent of CSS attribute `letterSpacing`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
letter_spacing(): string;
letter_spacing(value: string | number): this;
letter_spacing(value?: string | number): string | this {
    if (value == null) { return this.style.letterSpacing; }
    this.style.letterSpacing = value;
    return this;
}

/**
 * @docs:
 * @title: Line Break
 * @desc: Specifies how/if to break lines. The equivalent of CSS attribute `lineBreak`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
line_break(): string;
line_break(value: string | null): this;
line_break(value?: string): string | this {
	if (value == null) { return this.style.lineBreak; }
	this.style.lineBreak = value;
	return this;
}

/**
 * @docs:
 * @title: Line Height
 * @desc: Sets the line height, equivalent to the CSS attribute `lineHeight`. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
line_height(): string;
line_height(value: string | number): this;
line_height(value?: string | number): string | this {
	if (value == null) { return this.style.lineHeight; }
	this.style.lineHeight = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: List Style
 * @desc: Sets all the properties for a list in one declaration. The equivalent of CSS attribute `listStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
list_style(): string;
list_style(value: string | null): this;
list_style(value?: string): string | this {
	if (value == null) { return this.style.listStyle; }
	this.style.listStyle = value;
	return this;
}

/**
 * @docs:
 * @title: List style image
 * @desc: Specifies an image as the list-item marker. The equivalent of CSS attribute `listStyleImage`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
list_style_image(): string;
list_style_image(value: string): this;
list_style_image(value?: string): string | this {
	if (value == null) { return this.style.listStyleImage; }
	this.style.listStyleImage = value;
	return this;
}

/**
 * @docs:
 * @title: List Style Position
 * @desc: Specifies the position of the list-item markers (bullet points). 
 *        The equivalent of CSS attribute `listStylePosition`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
list_style_position(): string;
list_style_position(value: string): this;
list_style_position(value?: string): string | this {
	if (value == null) { return this.style.listStylePosition; }
	this.style.listStylePosition = value;
	return this;
}

/**
 * @docs:
 * @title: List style type
 * @desc: Specifies the type of list-item marker. The equivalent of CSS attribute `listStyleType`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
list_style_type(): string;
list_style_type(value: string | null): this;
list_style_type(value?: string): string | this {
    if (value == null) { return this.style.listStyleType; }
    this.style.listStyleType = value;
    return this;
}

// Sets all the margin properties in one declaration.
// margin(value) {
//     if (value == null) { return this.style.margin; }
//     this.style.margin = value;
//     return this;
// }

/**
 * @docs:
 * @title: Margin Block
 * @desc: Specifies the margin in the block direction. 
 *        The equivalent of CSS attribute `marginBlock`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
margin_block(): string;
margin_block(value: string | number | null): this | string {
	if (value == null) { return this.style.marginBlock; }
	this.style.marginBlock = value;
	return this;
}

/**
 * @docs:
 * @title: Margin Block End
 * @desc: Specifies the margin at the end in the block direction. 
 *        The equivalent of CSS attribute `marginBlockEnd`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
margin_block_end(): string;
margin_block_end(value: string | number): this;
margin_block_end(value?: string | number): string | this {
	if (value == null) { return this.style.marginBlockEnd; }
	this.style.marginBlockEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Margin Block Start
 * @desc: Specifies the margin at the start in the block direction. 
 *        The equivalent of CSS attribute `marginBlockStart`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
margin_block_start(): string;
margin_block_start(value: string | number): this;
margin_block_start(value?: string | number): this | string {
	if (value == null) { return this.style.marginBlockStart; }
	this.style.marginBlockStart = value;
	return this;
}

/**
 * @docs:
 * @title: Margin Inline
 * @desc: Specifies the margin in the inline direction. The equivalent of CSS attribute `marginInline`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
margin_inline(): string;
margin_inline(value: string | number): this;
margin_inline(value?: string | number): string | this {
	if (value == null) { return this.style.marginInline; }
	this.style.marginInline = value;
	return this;
}

/**
 * @docs:
 * @title: Margin Inline End
 * @desc: Specifies the margin at the end in the inline direction. This is the equivalent of the CSS attribute `marginInlineEnd`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
margin_inline_end(): string;
margin_inline_end(value: string | number): this;
margin_inline_end(value?: string | number): string | this {
	if (value == null) { return this.style.marginInlineEnd; }
	this.style.marginInlineEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Margin Inline Start
 * @desc: Specifies the margin at the start in the inline direction. 
 *        The equivalent of CSS attribute `marginInlineStart`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
margin_inline_start(): string;
margin_inline_start(value: string | number): this;
margin_inline_start(value?: string | number): string | this {
	if (value == null) { return this.style.marginInlineStart; }
	this.style.marginInlineStart = value;
	return this;
}

/**
 * @docs:
 * @title: Mask
 * @desc: Hides parts of an element by masking or clipping an image at specific places. 
 *        The equivalent of CSS attribute `mask`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask(): string;
mask(value: string): this;
mask(value?: string): string | this {
	if (value == null) { return this.style.mask; }
	this.style.mask = value;
	this.style.msMask = value;
	this.style.webkitMask = value;
	this.style.MozMask = value;
	this.style.OMask = value;
	return this;
}

/**
 * @docs:
 * @title: Mask clip
 * @desc: Specifies the mask area. The equivalent of CSS attribute `maskClip`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask_clip(): string;
mask_clip(value: string): this;
mask_clip(value?: string): string | this {
	if (value == null) { return this.style.maskClip; }
	this.style.maskClip = value;
	return this;
}

/**
 * @docs:
 * @title: Mask Composite
 * @desc: Represents a compositing operation used on the current mask layer with the mask layers below it. 
 *        The equivalent of CSS attribute `maskComposite`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask_composite(): string;
mask_composite(value: string): this;
mask_composite(value?: string): string | this {
	if (value == null) { return this.style.maskComposite; }
	this.style.maskComposite = value;
	this.style.msMaskComposite = value;
	this.style.webkitMaskComposite = value;
	this.style.MozMaskComposite = value;
	this.style.OMaskComposite = value;
	return this;
}

/**
 * @docs:
 * @title: Mask Image
 * @desc: Specifies an image to be used as a mask layer for an element. 
 *        The equivalent of CSS attribute `maskImage`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask_image(): string;
mask_image(value: string): this;
mask_image(value?: string): string | this {
	if (value == null) { return this.style.maskImage; }
	this.style.maskImage = value;
	this.style.msMaskImage = value;
	this.style.webkitMaskImage = value;
	this.style.MozMaskImage = value;
	this.style.OMaskImage = value;
	return this;
}

/**
 * @docs:
 * @title: Mask Mode
 * @description: 
 *     Specifies whether the mask layer image is treated as a luminance mask or as an alpha mask.
 *     The equivalent of CSS attribute `maskMode`.
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask_mode(): string;
mask_mode(value: string): this;
mask_mode(value?: string): string | this {
    if (value == null) { return this.style.maskMode; }
    this.style.maskMode = value;
    return this;
}

/**
 * @docs:
 * @title: Mask origin
 * @desc: Specifies the origin position (the mask position area) of a mask layer image. The equivalent of CSS attribute `maskOrigin`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask_origin(): string;
mask_origin(value: string): this;
mask_origin(value?: string): string | this {
	if (value == null) { return this.style.maskOrigin; }
	this.style.maskOrigin = value;
	return this;
}

/**
 * @docs:
 * @title: Mask Position
 * @desc: Sets the starting position of a mask layer image (relative to the mask position area).
 *        The equivalent of CSS attribute `maskPosition`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask_position(): string;
mask_position(value: string): this;
mask_position(value?: string): string | this {
	if (value == null) { return this.style.maskPosition; }
	this.style.maskPosition = value;
	return this;
}

/**
 * @docs:
 * @title: Mask Repeat
 * @desc: Specifies how the mask layer image is repeated. The equivalent of CSS attribute `maskRepeat`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask_repeat(): string;
mask_repeat(value: string): this;
mask_repeat(value?: string): string | this {
	if (value == null) { return this.style.maskRepeat; }
	this.style.maskRepeat = value;
	return this;
}

/**
 * @docs:
 * @title: Mask Size
 * @desc: Specifies the size of a mask layer image. The equivalent of CSS attribute `maskSize`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask_size(): string;
mask_size(value: string | number | null): this | string {
	if (value == null) { return this.style.maskSize; }
	this.style.maskSize = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Mask type
 * @desc: Specifies whether an SVG <mask> element is treated as a luminance mask or as an alpha mask. 
 *        The equivalent of CSS attribute `maskType`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mask_type(): string;
mask_type(value: string): this;
mask_type(value?: string): string | this {
	if (value == null) { return this.style.maskType; }
	this.style.maskType = value;
	return this;
}

/**
 * @docs:
 * @title: Max height
 * @desc: Sets the maximum height of an element. This is the equivalent of the CSS attribute `maxHeight`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @descr: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
max_height(): string;
max_height(value: string | number): this;
max_height(value?: string | number): this | string {
	if (value == null) { return this.style.maxHeight; }
	this.style.maxHeight = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Max Width
 * @desc: Sets the maximum width of an element. The equivalent of CSS attribute `maxWidth`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
max_width(): string;
max_width(value: string | number): this;
max_width(value?: string | number): string | this {
	if (value == null) { return this.style.maxWidth; }
	this.style.maxWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Max Block Size
 * @desc: Sets the maximum size of an element in the block direction. 
 * The equivalent of CSS attribute `maxBlockSize`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
max_block_size(): string;
max_block_size(value: string | number): this;
max_block_size(value?: string | number): this | string {
	if (value == null) { return this.style.maxBlockSize; }
	this.style.maxBlockSize = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Max inline size
 * @desc: Sets the maximum size of an element in the inline direction. 
 *        The equivalent of CSS attribute `maxInlineSize`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: this | string | number
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
max_inline_size(): string | number;
max_inline_size(value: string | number): this;
max_inline_size(value?: string | number): string | number | this {
	if (value == null) { return this.style.maxInlineSize; }
	this.style.maxInlineSize = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Min Block Size
 * @desc: Sets the minimum size of an element in the block direction. The equivalent of CSS attribute `minBlockSize`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number, null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
min_block_size(): number;
min_block_size(value: number): this;
min_block_size(value?: number): this | number {
	if (value == null) { return this.style.minBlockSize; }
	this.style.minBlockSize = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Min Inline Size
 * @desc: Sets the minimum size of an element in the inline direction. The equivalent of CSS attribute `minInlineSize`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
min_inline_size(): string;
min_inline_size(value: string | number): this;
min_inline_size(value?: string | number): string | this {
    if (value == null) { return this.style.minInlineSize; }
    this.style.minInlineSize = this.pad_numeric(value);
    return this;
}

/**
 * @docs:
 * @title: Mix Blend Mode
 * @desc: Specifies how an element's content should blend with its direct parent background, equivalent to the CSS attribute `mixBlendMode`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
mix_blend_mode(): string;
mix_blend_mode(value: string | null): this;
mix_blend_mode(value?: string): string | this {
	if (value == null) { return this.style.mixBlendMode; }
	this.style.mixBlendMode = value;
	return this;
}

/**
 * @docs:
 * @title: Object fit
 * @desc: Specifies how the contents of a replaced element should be fitted to the box established by its used height and width. 
 *        The equivalent of CSS attribute `objectFit`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
object_fit(): string;
object_fit(value: string): this;
object_fit(value?: string): string | this {
	if (value == null) { return this.style.objectFit; }
	this.style.objectFit = value;
	return this;
}

/**
 * @docs:
 * @title: Object position
 * @desc: Specifies the alignment of the replaced element inside its box. The equivalent of CSS attribute `objectPosition`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
object_position(): string;
object_position(value: string | null): this;
object_position(value?: string): string | this {
	if (value == null) { return this.style.objectPosition; }
	this.style.objectPosition = value;
	return this;
}

/**
 * @docs:
 * @title: Offset
 * @desc: Is a shorthand, and specifies how to animate an element along a path. The equivalent of CSS attribute `offset`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
offset(): string;
offset(value: string | number): this;
offset(value?: string | number): this | string {
	if (value == null) { return this.style.offset; }
	this.style.offset = value;
	return this;
}

/**
 * @docs:
 * @title: Offset Anchor
 * @desc: Specifies a point on an element that is fixed to the path it is animated along. The equivalent of CSS attribute `offsetAnchor`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
offset_anchor(): string;
offset_anchor(value: string | null): this;
offset_anchor(value?: string): string | this {
	if (value == null) { return this.style.offsetAnchor; }
	this.style.offsetAnchor = value;
	return this;
}

/**
 * @docs:
 * @title: Offset distance
 * @desc: Specifies the position along a path where an animated element is placed. 
 *        The equivalent of CSS attribute `offsetDistance`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
offset_distance(): string;
offset_distance(value: string | number): this;
offset_distance(value?: string | number): string | this {
	if (value == null) { return this.style.offsetDistance; }
	this.style.offsetDistance = value;
	return this;
}

/**
 * @docs:
 * @title: Offset Path
 * @desc: Specifies the path an element is animated along. 
 *        The equivalent of CSS attribute `offsetPath`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
offset_path(): string;
offset_path(value: string | null): this;
offset_path(value?: string): string | this {
	if (value == null) { return this.style.offsetPath; }
	this.style.offsetPath = value;
	return this;
}

/**
 * @docs:
 * @title: Offset Rotate
 * @desc: Specifies rotation of an element as it is animated along a path. 
 *        The equivalent of CSS attribute `offsetRotate`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
offset_rotate(): string;
offset_rotate(value: string | number): this;
offset_rotate(value?: string | number): string | this {
	if (value == null) { return this.style.offsetRotate; }
	this.style.offsetRotate = value;
	return this;
}

// Sets the opacity level for an element.
// opacity(value) {
//     if (value == null) { return this.style.opacity; }
//     this.style.opacity = value;
//     return this;
// }

/**
 * @docs:
 * @title: Order
 * @desc: Sets the order of the flexible item, relative to the rest. The equivalent of CSS attribute `order`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
order(): string | null;
order(value: string | number): this;
order(value?: string | number): string | this | null {
	if (value == null) { return this.style.order; }
	this.style.order = value;
	this.style.msOrder = value;
	this.style.webkitOrder = value;
	this.style.MozOrder = value;
	this.style.OOrder = value;
	return this;
}

/**
 * @docs:
 * @title: Orphans
 * @desc: Sets the minimum number of lines that must be left at the bottom of a page or column. 
 *        The equivalent of CSS attribute `orphans`. Returns the attribute value when parameter 
 *        `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number | null
 * @return:
 *     @type: this | number | undefined
 *     @description Returns the `Element` object for chaining. If `value` is `null`, the attribute's value is returned.
 * @funcs: 2
 */
orphans(): number | undefined;
orphans(value: number): this;
orphans(value?: number): this | number | undefined {
	if (value == null) { return this.style.orphans; }
	this.style.orphans = value;
	return this;
}

/**
 * @docs:
 * @title: Outline
 * @desc: A shorthand property for the outline-width, outline-style, and the outline-color properties. 
 *        The equivalent of CSS attribute `outline`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
outline(): string;
outline(value: string): this;
outline(value?: string): string | this {
	if (value == null) { return this.style.outline; }
	this.style.outline = value;
	return this;
}

/**
 * @docs:
 * @title: Outline Color
 * @desc: Sets the color of an outline. This is the equivalent of the CSS attribute `outlineColor`. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless the parameter `value` is `null`, 
 *                  in which case the attribute's value is returned.
 * @funcs: 2
 */
outline_color(): string;
outline_color(value: string | null): this;
outline_color(value?: string): string | this {
	if (value == null) { return this.style.outlineColor; }
	this.style.outlineColor = value;
	return this;
}

/**
 * @docs:
 * @title: Outline Offset
 * @desc: Offsets an outline, and draws it beyond the border edge. The equivalent of CSS attribute `outlineOffset`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
outline_offset(): string;
outline_offset(value: string | number): this;
outline_offset(value?: string | number): string | this {
	if (value == null) { return this.style.outlineOffset; }
	this.style.outlineOffset = value;
	return this;
}

/**
 * @docs:
 * @title: Outline Style
 * @desc: Sets the style of an outline. The equivalent of CSS attribute `outlineStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
outline_style(): string;
outline_style(value: string | null): this;
outline_style(value?: string): string | this {
	if (value == null) { return this.style.outlineStyle; }
	this.style.outlineStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Outline Width
 * @desc: Sets the width of an outline, equivalent to the CSS attribute `outlineWidth`.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
outline_width(): string;
outline_width(value: string | number | null): this;
outline_width(value?: string | number): string | this {
	if (value == null) { return this.style.outlineWidth; }
	this.style.outlineWidth = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Overflow
 * @desc: Specifies what happens if content overflows an element's box. 
 *        The equivalent of CSS attribute `overflow`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
overflow(): string;
overflow(value: string | null): this;
overflow(value?: string): string | this {
	if (value == null) { return this.style.overflow; }
	this.style.overflow = value;
	return this;
}

/**
 * @docs:
 * @title: Overflow Anchor
 * @desc: Specifies whether or not content in viewable area in a scrollable container should be pushed down when new content is loaded above. 
 *        The equivalent of CSS attribute `overflowAnchor`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
overflow_anchor(): string;
overflow_anchor(value: string): this;
overflow_anchor(value?: string): string | this {
	if (value == null) { return this.style.overflowAnchor; }
	this.style.overflowAnchor = value;
	return this;
}

/**
 * @docs:
 * @title: Overflow Wrap
 * @desc: Specifies whether or not the browser can break lines with long words, if they overflow the container. The equivalent of CSS attribute `overflowWrap`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
overflow_wrap(): string;
overflow_wrap(value: string): this;
overflow_wrap(value?: string): string | this {
	if (value == null) { return this.style.overflowWrap; }
	this.style.overflowWrap = value;
	return this;
}

/**
 * @docs:
 * @title: Overflow x
 * @desc: Specifies whether or not to clip the left/right edges of the content, if it overflows the element's content area. 
 *        The equivalent of CSS attribute `overflowX`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
overflow_x(): string;
overflow_x(value: string): this;
overflow_x(value?: string): string | this {
	if (value == null) { return this.style.overflowX; }
	this.style.overflowX = value;
	return this;
}

/**
 * @docs:
 * @title: Overflow Y
 * @desc: Specifies whether or not to clip the top/bottom edges of the content, if it overflows the element's content area. 
 *        The equivalent of CSS attribute `overflowY`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
overflow_y(): string;
overflow_y(value: string): this;
overflow_y(value?: string): string | this {
	if (value == null) { return this.style.overflowY; }
	this.style.overflowY = value;
	return this;
}

/**
 * @docs:
 * @title: Overscroll behavior
 * @desc: Specifies whether to have scroll chaining or overscroll affordance in x- and y-directions. The equivalent of CSS attribute `overscrollBehavior`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
overscroll_behavior(): string;
overscroll_behavior(value: string | null): this;
overscroll_behavior(value?: string): string | this {
	if (value == null) { return this.style.overscrollBehavior; }
	this.style.overscrollBehavior = value;
	return this;
}

/**
 * @docs:
 * @title: Overscroll behavior block
 * @desc: Specifies whether to have scroll chaining or overscroll affordance in the block direction.
 *        The equivalent of CSS attribute `overscrollBehaviorBlock`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
overscroll_behavior_block(): string;
overscroll_behavior_block(value: string): this;
overscroll_behavior_block(value?: string): string | this {
    if (value == null) { return this.style.overscrollBehaviorBlock; }
    this.style.overscrollBehaviorBlock = value;
    return this;
}

/**
 * @docs:
 * @title: Overscroll Behavior Inline
 * @desc: Specifies whether to have scroll chaining or overscroll affordance in the inline direction. 
 *        The equivalent of CSS attribute `overscrollBehaviorInline`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining. If `value` is `null`, returns the attribute's value.
 * @funcs: 2
 */
overscroll_behavior_inline(): string;
overscroll_behavior_inline(value: string): this;
overscroll_behavior_inline(value?: string): string | this {
	if (value == null) { return this.style.overscrollBehaviorInline; }
	this.style.overscrollBehaviorInline = value;
	return this;
}

/**
 * @docs:
 * @title: Overscroll Behavior X
 * @description: 
 *     Specifies whether to have scroll chaining or overscroll affordance in x-direction.
 *     The equivalent of CSS attribute `overscrollBehaviorX`.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
overscroll_behavior_x(): string;
overscroll_behavior_x(value: string | null): this;
overscroll_behavior_x(value?: string): string | this {
	if (value == null) { return this.style.overscrollBehaviorX; }
	this.style.overscrollBehaviorX = value;
	return this;
}

/**
 * @docs:
 * @title: Overscroll behavior y
 * @desc: 
 *     Specifies whether to have scroll chaining or overscroll affordance in y-directions.
 *     The equivalent of CSS attribute `overscrollBehaviorY`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the `Element` object for chaining.
 * @funcs: 2
 */
overscroll_behavior_y(): string;
overscroll_behavior_y(value: string): this;
overscroll_behavior_y(value?: string): string | this {
	if (value == null) { return this.style.overscrollBehaviorY; }
	this.style.overscrollBehaviorY = value;
	return this;
}

// A shorthand property for all the padding properties.
// padding(value) {
//     if (value == null) { return this.style.padding; }
//     this.style.padding = value;
//     return this;
// }

/**
 * @docs:
 * @title: Padding Block
 * @desc: Specifies the padding in the block direction. The equivalent of CSS attribute `paddingBlock`. 
 *         Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string | undefined
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
padding_block(): string | undefined;
padding_block(value: string | number): this;
padding_block(value?: string | number): string | this | undefined {
	if (value == null) { return this.style.paddingBlock; }
	this.style.paddingBlock = value;
	return this;
}

/**
 * @docs:
 * @title: Padding Block End
 * @desc: Specifies the padding at the end in the block direction. The equivalent of CSS attribute `paddingBlockEnd`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
padding_block_end(): string;
padding_block_end(value: string | number): this;
padding_block_end(value?: string | number): string | this {
	if (value == null) { return this.style.paddingBlockEnd; }
	this.style.paddingBlockEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Padding Block Start
 * @desc: Specifies the padding at the start in the block direction. 
 *        The equivalent of CSS attribute `paddingBlockStart`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
padding_block_start(): string;
padding_block_start(value: string | number): this;
padding_block_start(value?: string | number): string | this {
	if (value == null) { return this.style.paddingBlockStart; }
	this.style.paddingBlockStart = value;
	return this;
}

/**
 * @docs:
 * @title: Padding Inline
 * @desc: Specifies the padding in the inline direction. The equivalent of CSS attribute `paddingInline`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
padding_inline(): string | null;
padding_inline(value: string | number): this;
padding_inline(value?: string | number): string | this | null {
	if (value == null) { return this.style.paddingInline; }
	this.style.paddingInline = value;
	return this;
}

/**
 * @docs:
 * @title: Padding Inline End
 * @desc: Specifies the padding at the end in the inline direction. 
 *        The equivalent of CSS attribute `paddingInlineEnd`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
padding_inline_end(): string;
padding_inline_end(value: string | number): this;
padding_inline_end(value?: string | number): string | this {
	if (value == null) { return this.style.paddingInlineEnd; }
	this.style.paddingInlineEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Padding Inline Start
 * @desc: Specifies the padding at the start in the inline direction. The equivalent of CSS attribute `paddingInlineStart`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining, or the attribute's value if `value` is `null`.
 * @funcs: 2
 */
padding_inline_start(): string;
padding_inline_start(value: string | number): this;
padding_inline_start(value?: string | number): string | this {
	if (value == null) { return this.style.paddingInlineStart; }
	this.style.paddingInlineStart = value;
	return this;
}

/**
 * @docs:
 * @title: Page break after
 * @desc: Sets the page-break behavior after an element. The equivalent of CSS attribute `pageBreakAfter`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
page_break_after(): string;
page_break_after(value: string | null): this;
page_break_after(value?: string): string | this {
	if (value == null) { return this.style.pageBreakAfter; }
	this.style.pageBreakAfter = value;
	return this;
}

/**
 * @docs:
 * @title: Page break before
 * @desc: Sets the page-break behavior before an element. The equivalent of CSS attribute `pageBreakBefore`.
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
page_break_before(): string;
page_break_before(value: string): this;
page_break_before(value?: string): string | this {
	if (value == null) { return this.style.pageBreakBefore; }
	this.style.pageBreakBefore = value;
	return this;
}

/**
 * @docs:
 * @title: Page Break Inside
 * @desc: Sets the page-break behavior inside an element. The equivalent of CSS attribute `pageBreakInside`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
page_break_inside(): string;
page_break_inside(value: string): this;
page_break_inside(value?: string): string | this {
	if (value == null) { return this.style.pageBreakInside; }
	this.style.pageBreakInside = value;
	return this;
}

/**
 * @docs:
 * @title: Paint Order
 * @desc: Sets the order of how an SVG element or text is painted. The equivalent of CSS attribute `paintOrder`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
paint_order(): string;
paint_order(value: string): this;
paint_order(value?: string): string | this {
	if (value == null) { return this.style.paintOrder; }
	this.style.paintOrder = value;
	return this;
}

/**
 * @docs:
 * @title: Perspective
 * @desc: Gives a 3D-positioned element some perspective. The equivalent of CSS attribute `perspective`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
perspective(): string;
perspective(value: string | number): this;
perspective(value?: string | number): string | this {
	if (value == null) { return this.style.perspective; }
	this.style.perspective = value;
	this.style.msPerspective = value;
	this.style.webkitPerspective = value;
	this.style.MozPerspective = value;
	this.style.OPerspective = value;
	return this;
}

/**
 * @docs:
 * @title: Perspective origin
 * @desc: Defines at which position the user is looking at the 3D-positioned element. The equivalent of CSS attribute `perspectiveOrigin`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
perspective_origin(): string;
perspective_origin(value: string | null): this;
perspective_origin(value?: string): string | this {
	if (value == null) { return this.style.perspectiveOrigin; }
	this.style.perspectiveOrigin = value;
	this.style.msPerspectiveOrigin = value;
	this.style.webkitPerspectiveOrigin = value;
	this.style.MozPerspectiveOrigin = value;
	this.style.OPerspectiveOrigin = value;
	return this;
}

/**
 * @docs:
 * @title: Place Content
 * @desc: Specifies align-content and justify-content property values for flexbox and grid layouts.
 *        The equivalent of CSS attribute `placeContent`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
place_content(): string | null;
place_content(value: string): this;
place_content(value?: string): string | this {
    if (value == null) { return this.style.placeContent; }
    this.style.placeContent = value;
    return this;
}

/**
 * @docs:
 * @title: Place items
 * @desc: Specifies align-items and justify-items property values for grid layouts. The equivalent of CSS attribute `placeItems`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
place_items(): string;
place_items(value: string): this;
place_items(value?: string): string | this {
	if (value == null) { return this.style.placeItems; }
	this.style.placeItems = value;
	return this;
}

/**
 * @docs:
 * @title: Place Self
 * @desc: Specifies align-self and justify-self property values for grid layouts. 
 *        The equivalent of CSS attribute `placeSelf`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. 
 *                  Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
place_self(): string;
place_self(value: string | null): this;
place_self(value?: string): string | this {
	if (value == null) { return this.style.placeSelf; }
	this.style.placeSelf = value;
	return this;
}

/**
 * @docs:
 * @title: Pointer events
 * @desc: Defines whether or not an element reacts to pointer events, equivalent to the CSS attribute `pointerEvents`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
pointer_events(): string;
pointer_events(value: string | null): this;
pointer_events(value?: string): string | this {
	if (value == null) { return this.style.pointerEvents; }
	this.style.pointerEvents = value;
	return this;
}

// Specifies the type of positioning method used for an element (static, relative, absolute or fixed).
// position(value) {
//     if (value == null) { return this.style.position; }
//     this.style.position = value;
//     return this;
// }

/**
 * @docs:
 * @title: Quotes
 * @desc: Sets the type of quotation marks for embedded quotations. The equivalent of CSS attribute `quotes`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
quotes(): string;
quotes(value: string | null): this;
quotes(value?: string): string | this {
	if (value == null) { return this.style.quotes; }
	this.style.quotes = value;
	return this;
}

/**
 * @docs:
 * @title: Resize
 * @desc: Defines if (and how) an element is resizable by the user. 
 *        The equivalent of CSS attribute `resize`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
resize(): string;
resize(value: string): this;
resize(value?: string): string | this {
	if (value == null) { return this.style.resize; }
	this.style.resize = value;
	return this;
}

/**
 * @docs:
 * @title: Right
 * @desc: Specifies the right position of a positioned element. The equivalent of CSS attribute `right`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type number, string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
right(): string;
right(value: number | string): this;
right(value?: number | string): string | this {
	if (value == null) { return this.style.right; }
	this.style.right = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Row Gap
 * @desc: Specifies the gap between the grid rows. The equivalent of CSS attribute `rowGap`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
row_gap(): string;
row_gap(value: string | number): this;
row_gap(value?: string | number): string | this {
	if (value == null) { return this.style.rowGap; }
	this.style.rowGap = value;
	return this;
}

/**
 * @docs:
 * @title: Scale
 * @desc: Specifies the size of an element by scaling up or down. The equivalent of CSS attribute `scale`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number | null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scale(): number;
scale(value: number): this;
scale(value?: number): this | number {
	if (value == null) { return this.style.scale; }
	this.style.scale = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll Behavior
 * @desc: Specifies whether to smoothly animate the scroll position in a scrollable box, instead of a straight jump. 
 *        The equivalent of CSS attribute `scrollBehavior`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_behavior(): string;
scroll_behavior(value: string): this;
scroll_behavior(value?: string): string | this {
	if (value == null) { return this.style.scrollBehavior; }
	this.style.scrollBehavior = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll Margin
 * @desc: Specifies the margin between the snap position and the container. 
 *        The equivalent of CSS attribute `scrollMargin`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_margin(): string;
scroll_margin(value: string | number): this;
scroll_margin(value?: string | number): string | this {
	if (value == null) { return this.style.scrollMargin; }
	this.style.scrollMargin = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll Margin Block
 * @desc: Specifies the margin between the snap position and the container in the block direction. 
 *        The equivalent of CSS attribute `scrollMarginBlock`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
scroll_margin_block(): string;
scroll_margin_block(value: string | number): this;
scroll_margin_block(value?: string | number): string | this {
	if (value == null) { return this.style.scrollMarginBlock; }
	this.style.scrollMarginBlock = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll margin block end
 * @desc: Specifies the end margin between the snap position and the container in the block direction.
 * The equivalent of CSS attribute `scrollMarginBlockEnd`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this, string | null
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_margin_block_end(): string | null;
scroll_margin_block_end(value: string | number): this;
scroll_margin_block_end(value?: string | number): string | null | this {
	if (value == null) { return this.style.scrollMarginBlockEnd; }
	this.style.scrollMarginBlockEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll margin block start
 * @desc: Specifies the start margin between the snap position and the container in the block direction.
 *        The equivalent of CSS attribute `scrollMarginBlockStart`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
scroll_margin_block_start(): string;
scroll_margin_block_start(value: string | number): this;
scroll_margin_block_start(value?: string | number): string | this {
	if (value == null) { return this.style.scrollMarginBlockStart; }
	this.style.scrollMarginBlockStart = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll margin bottom
 * @desc: Specifies the margin between the snap position on the bottom side and the container.
 * The equivalent of CSS attribute `scrollMarginBottom`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_margin_bottom(): string;
scroll_margin_bottom(value: string | number): this;
scroll_margin_bottom(value?: string | number): string | this {
	if (value == null) { return this.style.scrollMarginBottom; }
	this.style.scrollMarginBottom = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Scroll Margin Inline
 * @desc: Specifies the margin between the snap position and the container in the inline direction.
 *        The equivalent of CSS attribute `scrollMarginInline`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_margin_inline(): string;
scroll_margin_inline(value: string | number): this;
scroll_margin_inline(value?: string | number): string | this {
	if (value == null) { return this.style.scrollMarginInline; }
	this.style.scrollMarginInline = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll margin inline end
 * @desc: Specifies the end margin between the snap position and the container in the inline direction.
 *        The equivalent of CSS attribute `scrollMarginInlineEnd`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_margin_inline_end(): string;
scroll_margin_inline_end(value: string | number): this;
scroll_margin_inline_end(value?: string | number): this | string {
	if (value == null) { return this.style.scrollMarginInlineEnd; }
	this.style.scrollMarginInlineEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll margin inline start
 * @desc: Specifies the start margin between the snap position and the container in the inline direction. 
 *        The equivalent of CSS attribute `scrollMarginInlineStart`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_margin_inline_start(): string;
scroll_margin_inline_start(value: string | null): this;
scroll_margin_inline_start(value?: string): string | this {
	if (value == null) { return this.style.scrollMarginInlineStart; }
	this.style.scrollMarginInlineStart = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll Margin Left
 * @desc: Specifies the margin between the snap position on the left side and the container. 
 *        The equivalent of CSS attribute `scrollMarginLeft`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_margin_left(): string;
scroll_margin_left(value: string | number | null): this;
scroll_margin_left(value?: string | number): string | this {
	if (value == null) { return this.style.scrollMarginLeft; }
	this.style.scrollMarginLeft = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Scroll Margin Right
 * @desc: Specifies the margin between the snap position on the right side and the container.
 *        The equivalent of CSS attribute `scrollMarginRight`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_margin_right(): string;
scroll_margin_right(value: string | number | null): this | string {
	if (value == null) { return this.style.scrollMarginRight; }
	this.style.scrollMarginRight = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Scroll Margin Top
 * @desc: Specifies the margin between the snap position on the top side and the container.
 *        The equivalent of CSS attribute `scrollMarginTop`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @descr: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_margin_top(): string;
scroll_margin_top(value: string | number): this;
scroll_margin_top(value?: string | number): string | this {
	if (value == null) { return this.style.scrollMarginTop; }
	this.style.scrollMarginTop = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Scroll Padding
 * @desc: Specifies the distance from the container to the snap position on the child elements. 
 *        The equivalent of CSS attribute `scrollPadding`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, 
 *                  then the attribute's value is returned.
 * @funcs: 2
 */
scroll_padding(): string;
scroll_padding(value: string | number): this;
scroll_padding(value?: string | number): this | string {
	if (value == null) { return this.style.scrollPadding; }
	this.style.scrollPadding = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll padding block
 * @desc: Specifies the distance in block direction from the container to the snap position on the child elements. 
 *        The equivalent of CSS attribute `scrollPaddingBlock`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
scroll_padding_block(): string;
scroll_padding_block(value: string | number): this;
scroll_padding_block(value?: string | number): string | this {
	if (value == null) { return this.style.scrollPaddingBlock; }
	this.style.scrollPaddingBlock = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll Padding Block End
 * @desc: Specifies the distance in block direction from the end of the container to the snap position on the child elements. 
 *        The equivalent of CSS attribute `scrollPaddingBlockEnd`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_padding_block_end(): string;
scroll_padding_block_end(value: string | number): this;
scroll_padding_block_end(value?: string | number): string | this {
	if (value == null) { return this.style.scrollPaddingBlockEnd; }
	this.style.scrollPaddingBlockEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll padding block start
 * @desc: Specifies the distance in block direction from the start of the container to the snap position on the child elements. The equivalent of CSS attribute `scrollPaddingBlockStart`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_padding_block_start(): string;
scroll_padding_block_start(value: string | number): this;
scroll_padding_block_start(value?: string | number): string | this {
	if (value == null) { return this.style.scrollPaddingBlockStart; }
	this.style.scrollPaddingBlockStart = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll Padding Bottom
 * @desc: Specifies the distance from the bottom of the container to the snap position on the child elements.
 *        The equivalent of CSS attribute `scrollPaddingBottom`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_padding_bottom(): string;
scroll_padding_bottom(value: string | number): this;
scroll_padding_bottom(value?: string | number): string | this {
	if (value == null) { return this.style.scrollPaddingBottom; }
	this.style.scrollPaddingBottom = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Scroll Padding Inline
 * @desc: Specifies the distance in inline direction from the container to the snap position on the child elements.
 *        The equivalent of CSS attribute `scrollPaddingInline`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
scroll_padding_inline(): string;
scroll_padding_inline(value: string | number): this;
scroll_padding_inline(value?: string | number): string | this {
    if (value == null) { return this.style.scrollPaddingInline; }
    this.style.scrollPaddingInline = value;
    return this;
}

/**
 * @docs:
 * @title: Scroll padding inline end
 * @desc: Specifies the distance in inline direction from the end of the container to the snap position on the child elements.
 *        The equivalent of CSS attribute `scrollPaddingInlineEnd`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_padding_inline_end(): string;
scroll_padding_inline_end(value: string | number): this;
scroll_padding_inline_end(value?: string | number): string | this {
	if (value == null) { return this.style.scrollPaddingInlineEnd; }
	this.style.scrollPaddingInlineEnd = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll padding inline start
 * @desc: Specifies the distance in inline direction from the start of the container to the snap position on the child elements.
 *        The equivalent of CSS attribute `scrollPaddingInlineStart`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: this | string | undefined
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_padding_inline_start(): string | undefined;
scroll_padding_inline_start(value: string | number): this;
scroll_padding_inline_start(value?: string | number): this | string | undefined {
	if (value == null) { return this.style.scrollPaddingInlineStart; }
	this.style.scrollPaddingInlineStart = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll Padding Left
 * @desc: Specifies the distance from the left side of the container to the snap position on the child elements.
 * The equivalent of CSS attribute `scrollPaddingLeft`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_padding_left(): string;
scroll_padding_left(value: string | number): this;
scroll_padding_left(value?: string | number): string | this {
	if (value == null) { return this.style.scrollPaddingLeft; }
	this.style.scrollPaddingLeft = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Scroll Padding Right
 * @desc: Specifies the distance from the right side of the container to the snap position on the child elements.
 * The equivalent of CSS attribute `scrollPaddingRight`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_padding_right(): string;
scroll_padding_right(value: string | number): this;
scroll_padding_right(value?: string | number): string | this {
	if (value == null) { return this.style.scrollPaddingRight; }
	this.style.scrollPaddingRight = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Scroll Padding Top
 * @desc: Specifies the distance from the top of the container to the snap position on the child elements. 
 *        The equivalent of CSS attribute `scrollPaddingTop`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_padding_top(): string;
scroll_padding_top(value: string | number): this;
scroll_padding_top(value?: string | number): string | this {
	if (value == null) { return this.style.scrollPaddingTop; }
	this.style.scrollPaddingTop = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Scroll Snap Align
 * @desc: Specifies where to position elements when the user stops scrolling. 
 *        The equivalent of CSS attribute `scrollSnapAlign`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_snap_align(): string;
scroll_snap_align(value: string): this;
scroll_snap_align(value?: string): string | this {
	if (value == null) { return this.style.scrollSnapAlign; }
	this.style.scrollSnapAlign = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll Snap Stop
 * @desc: Specifies scroll behaviour after fast swipe on trackpad or touch screen. 
 *        The equivalent of CSS attribute `scrollSnapStop`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_snap_stop(): string;
scroll_snap_stop(value: string): this;
scroll_snap_stop(value?: string): string | this {
	if (value == null) { return this.style.scrollSnapStop; }
	this.style.scrollSnapStop = value;
	return this;
}

/**
 * @docs:
 * @title: Scroll Snap Type
 * @desc: Specifies how snap behaviour should be when scrolling. The equivalent of CSS attribute `scrollSnapType`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scroll_snap_type(): string;
scroll_snap_type(value: string): this;
scroll_snap_type(value?: string): string | this {
	if (value == null) { return this.style.scrollSnapType; }
	this.style.scrollSnapType = value;
	return this;
}

/**
 * @docs:
 * @title: Scrollbar color
 * @desc: Specifies the color of the scrollbar of an element. The equivalent of CSS attribute `scrollbarColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scrollbar_color(): string;
scrollbar_color(value: string): this;
scrollbar_color(value?: string): string | this {
	if (value == null) { return this.style.scrollbarColor; }
	this.style.scrollbarColor = value;
	return this;
}

/**
 * @docs:
 * @title: Tab Size
 * @desc: Specifies the width of a tab character, equivalent to the CSS attribute `tabSize`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the instance of the element for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
tab_size(): string;
tab_size(value: string | number): this;
tab_size(value?: string | number): string | this {
	if (value == null) { return this.style.tabSize; }
	this.style.tabSize = value;
	this.style.msTabSize = value;
	this.style.webkitTabSize = value;
	this.style.MozTabSize = value;
	this.style.OTabSize = value;
	return this;
}

/**
 * @docs:
 * @title: Table Layout
 * @desc: Defines the algorithm used to lay out table cells, rows, and columns. 
 *        The equivalent of CSS attribute `tableLayout`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
table_layout(): string;
table_layout(value: string): this;
table_layout(value?: string): string | this {
	if (value == null) { return this.style.tableLayout; }
	this.style.tableLayout = value;
	return this;
}

/**
 * @docs:
 * @title: Text Align
 * @desc: Specifies the horizontal alignment of text, equivalent to the CSS `textAlign` attribute. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign for text alignment. Leave `null` to retrieve the current attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the current value of `textAlign` if no argument is provided; otherwise returns the instance for chaining.
 * @funcs: 2
 */
text_align(): string;
text_align(value: string): this;
text_align(value?: string): string | this {
	if (value == null) { return this.style.textAlign; }
	this.style.textAlign = value;
	return this;
}

/**
 * @docs:
 * @title: Text Align Last
 * @desc: Describes how the last line of a block or a line right before a forced line break is aligned when text-align is "justify". 
 *        The equivalent of CSS attribute `textAlignLast`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_align_last(): string;
text_align_last(value: string): this;
text_align_last(value?: string): string | this {
	if (value == null) { return this.style.textAlignLast; }
	this.style.textAlignLast = value;
	return this;
}

/**
 * @docs:
 * @title: Text Combine Upright
 * @desc: Specifies the combination of multiple characters into the space of a single character.
 *        The equivalent of CSS attribute `textCombineUpright`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_combine_upright(): string;
text_combine_upright(value: string): this;
text_combine_upright(value?: string): string | this {
	if (value == null) { return this.style.textCombineUpright; }
	this.style.textCombineUpright = value;
	return this;
}

/**
 * @docs:
 * @title: Text Decoration
 * @desc: Specifies the decoration added to text. The equivalent of CSS attribute `textDecoration`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_decoration(): string;
text_decoration(value: string): this;
text_decoration(value?: string): string | this {
	if (value == null) { return this.style.textDecoration; }
	this.style.textDecoration = value;
	return this;
}

/**
 * @docs:
 * @title: Text Decoration Color
 * @desc: Specifies the color of the text-decoration. The equivalent of CSS attribute `textDecorationColor`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_decoration_color(): string;
text_decoration_color(value: string): this;
text_decoration_color(value?: string): this | string {
	if (value == null) { return this.style.textDecorationColor; }
	this.style.textDecorationColor = value;
	return this;
}

/**
 * @docs:
 * @title: Text Decoration Line
 * @desc: Specifies the type of line in a text-decoration. The equivalent of CSS attribute `textDecorationLine`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_decoration_line(): string;
text_decoration_line(value: string): this;
text_decoration_line(value?: string): string | this {
	if (value == null) { return this.style.textDecorationLine; }
	this.style.textDecorationLine = value;
	return this;
}

/**
 * @docs:
 * @title: Text Decoration Style
 * @desc: Specifies the style of the line in a text decoration, equivalent to the CSS attribute `textDecorationStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_decoration_style(): string;
text_decoration_style(value: string): this;
text_decoration_style(value?: string): string | this {
	if (value == null) { return this.style.textDecorationStyle; }
	this.style.textDecorationStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Text Decoration Thickness
 * @desc: Specifies the thickness of the decoration line. The equivalent of CSS attribute `textDecorationThickness`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_decoration_thickness(): string;
text_decoration_thickness(value: string | number): this;
text_decoration_thickness(value?: string | number): string | this {
	if (value == null) { return this.style.textDecorationThickness; }
	this.style.textDecorationThickness = value;
	return this;
}

/**
 * @docs:
 * @title: Text Emphasis
 * @desc: Applies emphasis marks to text, equivalent to the CSS attribute `textEmphasis`. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_emphasis(): string;
text_emphasis(value: string): this;
text_emphasis(value?: string): string | this {
	if (value == null) { return this.style.textEmphasis; }
	this.style.textEmphasis = value;
	return this;
}

/**
 * @docs:
 * @title: Text Indent
 * @desc: Specifies the indentation of the first line in a text-block, equivalent to the CSS `textIndent` property. 
 *        Retrieves the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign for the text indent. Pass `null` to retrieve the current value.
 *     @type: string, number, null
 * @return:
 *     @type: this, string | null
 *     @description Returns the instance of the element for chaining when a value is set. If `null` is passed, returns the current text indent value.
 * @funcs: 2
 */
text_indent(): string | null;
text_indent(value: string | number): this;
text_indent(value?: string | number): string | this {
    if (value == null) { return this.style.textIndent; }
    this.style.textIndent = value;
    return this;
}

/**
 * @docs:
 * @title: Text Justify
 * @desc: Specifies the justification method used when text-align is "justify". The equivalent of CSS attribute `textJustify`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_justify(): string;
text_justify(value: string): this;
text_justify(value?: string): string | this {
	if (value == null) { return this.style.textJustify; }
	this.style.textJustify = value;
	return this;
}

/**
 * @docs:
 * @title: Text Orientation
 * @desc: Defines the orientation of characters in a line, equivalent to the CSS attribute `textOrientation`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_orientation(): string;
text_orientation(value: string): this;
text_orientation(value?: string): string | this {
	if (value == null) { return this.style.textOrientation; }
	this.style.textOrientation = value;
	return this;
}

/**
 * @docs:
 * @title: Text Overflow
 * @desc: Specifies what should happen when text overflows the containing element. The equivalent of CSS attribute `textOverflow`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_overflow(): string;
text_overflow(value: string): this;
text_overflow(value?: string): string | this {
	if (value == null) { return this.style.textOverflow; }
	this.style.textOverflow = value;
	return this;
}

/**
 * @docs:
 * @title: Text Shadow
 * @desc: Adds shadow to text. The equivalent of CSS attribute `textShadow`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_shadow(): string;
text_shadow(value: string): this;
text_shadow(value?: string): string | this {
	if (value == null) { return this.style.textShadow; }
	this.style.textShadow = value;
	return this;
}

/**
 * @docs:
 * @title: Text Transform
 * @desc: Controls the capitalization of text. The equivalent of CSS attribute `textTransform`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_transform(): string;
text_transform(value: string): this;
text_transform(value?: string): string | this {
	if (value == null) { return this.style.textTransform; }
	this.style.textTransform = value;
	return this;
}

/**
 * @docs:
 * @title: Text Underline Position
 * @desc: Specifies the position of the underline which is set using the text-decoration property. 
 *        The equivalent of CSS attribute `textUnderlinePosition`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
text_underline_position(): string;
text_underline_position(value: string): this;
text_underline_position(value?: string): string | this {
	if (value == null) { return this.style.textUnderlinePosition; }
	this.style.textUnderlinePosition = value;
	return this;
}

/**
 * @docs:
 * @title: Top
 * @desc: Specifies the top position of a positioned element. The equivalent of CSS attribute `top`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
top(): string;
top(value: string | number): this;
top(value?: string | number): string | this {
	if (value == null) { return this.style.top; }
	this.style.top = this.pad_numeric(value);
	return this;
}

/**
 * @docs:
 * @title: Transform
 * @desc: Applies a 2D or 3D transformation to an element. The equivalent of CSS attribute `transform`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
transform(): string;
transform(value: string): this;
transform(value?: string): string | this {
	if (value == null) { return this.style.transform; }
	this.style.transform = value;
	this.style.msTransform = value;
	this.style.webkitTransform = value;
	this.style.MozTransform = value;
	this.style.OTransform = value;
	return this;
}

/**
 * @docs:
 * @title: Transform Origin
 * @desc: Allows you to change the position on transformed elements. The equivalent of CSS attribute `transformOrigin`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
transform_origin(): string;
transform_origin(value: string | null): this;
transform_origin(value?: string): string | this {
	if (value == null) { return this.style.transformOrigin; }
	this.style.transformOrigin = value;
	this.style.msTransformOrigin = value;
	this.style.webkitTransformOrigin = value;
	this.style.MozTransformOrigin = value;
	this.style.OTransformOrigin = value;
	return this;
}

/**
 * @docs:
 * @title: Transform Style
 * @desc: Specifies how nested elements are rendered in 3D space. 
 *        The equivalent of CSS attribute `transformStyle`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
transform_style(): string;
transform_style(value: string): this;
transform_style(value?: string): string | this {
	if (value == null) { return this.style.transformStyle; }
	this.style.transformStyle = value;
	this.style.msTransformStyle = value;
	this.style.webkitTransformStyle = value;
	this.style.MozTransformStyle = value;
	this.style.OTransformStyle = value;
	return this;
}

/**
 * @docs:
 * @title: Transition
 * @desc: A shorthand property for all the transition properties. The equivalent of CSS attribute `transition`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
transition(): string;
transition(value: string): this;
transition(value?: string): string | this {
	if (value == null) { return this.style.transition; }
	this.style.transition = value;
	this.style.msTransition = value;
	this.style.webkitTransition = value;
	this.style.MozTransition = value;
	this.style.OTransition = value;
	return this;
}

/**
 * @docs:
 * @title: Transition Delay
 * @desc: Specifies when the transition effect will start. This corresponds to the CSS attribute `transitionDelay`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
transition_delay(): string;
transition_delay(value: string | number): this;
transition_delay(value?: string | number): string | this {
	if (value == null) { return this.style.transitionDelay; }
	this.style.transitionDelay = value;
	this.style.msTransitionDelay = value;
	this.style.webkitTransitionDelay = value;
	this.style.MozTransitionDelay = value;
	this.style.OTransitionDelay = value;
	return this;
}

/**
 * @docs:
 * @title: Transition Duration
 * @desc: Specifies how many seconds or milliseconds a transition effect takes to complete. 
 *        The equivalent of CSS attribute `transitionDuration`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | number | null
 * @return:
 *     @type: this | string | undefined
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
transition_duration(): string | undefined;
transition_duration(value: string | number): this;
transition_duration(value?: string | number): string | this | undefined {
	if (value == null) { return this.style.transitionDuration; }
	this.style.transitionDuration = value;
	this.style.msTransitionDuration = value;
	this.style.webkitTransitionDuration = value;
	this.style.MozTransitionDuration = value;
	this.style.OTransitionDuration = value;
	return this;
}

/**
 * @docs:
 * @title: Transition Property
 * @desc: Specifies the name of the CSS property the transition effect is for. 
 *        The equivalent of CSS attribute `transitionProperty`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
transition_property(): string;
transition_property(value: string | null): this;
transition_property(value?: string): string | this {
	if (value == null) { return this.style.transitionProperty; }
	this.style.transitionProperty = value;
	this.style.msTransitionProperty = value;
	this.style.webkitTransitionProperty = value;
	this.style.MozTransitionProperty = value;
	this.style.OTransitionProperty = value;
	return this;
}

/**
 * @docs:
 * @title: Transition Timing Function
 * @desc: Specifies the speed curve of the transition effect. 
 *        The equivalent of CSS attribute `transitionTimingFunction`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the instance of the element for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
transition_timing_function(): string;
transition_timing_function(value: string | null): this;
transition_timing_function(value?: string): string | this {
	if (value == null) { return this.style.transitionTimingFunction; }
	this.style.transitionTimingFunction = value;
	this.style.msTransitionTimingFunction = value;
	this.style.webkitTransitionTimingFunction = value;
	this.style.MozTransitionTimingFunction = value;
	this.style.OTransitionTimingFunction = value;
	return this;
}

/**
 * @docs:
 * @title: Translate
 * @desc: Specifies the position of an element. The equivalent of CSS attribute `translate`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description: Returns the attribute's value if `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
translate(): string | null;
translate(value: string | number): this;
translate(value?: string | number): string | this {
	if (value == null) { return this.style.translate; }
	this.style.translate = value;
	return this;
}

/**
 * @docs:
 * @title: Unicode Bidi
 * @desc: 
 *     Used together with the direction property to set or return whether the text should be overridden to support multiple languages in the same document.
 *     The equivalent of CSS attribute `unicodeBidi`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
unicode_bidi(): string;
unicode_bidi(value: string | null): this;
unicode_bidi(value?: string = null): string | this {
	if (value == null) { return this.style.unicodeBidi; }
	this.style.unicodeBidi = value;
	return this;
}

/**
 * @docs:
 * @title: User Select
 * @description: 
 *     Specifies whether the text of an element can be selected.
 *     The equivalent of CSS attribute `userSelect`.
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
user_select(): string;
user_select(value: string): this;
user_select(value?: string): string | this {
	if (value == null) { return this.style.userSelect; }
	this.style.userSelect = value;
	this.style.msUserSelect = value;
	this.style.webkitUserSelect = value;
	this.style.MozUserSelect = value;
	this.style.OUserSelect = value;
	return this;
}

// Sets the vertical alignment of an element.
// vertical_align(value) {
//     if (value == null) { return this.style.verticalAlign; }
//     this.style.verticalAlign = value;
//     return this;
// }

/**
 * @docs:
 * @title: Visibility
 * @desc: Specifies whether or not an element is visible. The equivalent of CSS attribute `visibility`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
visibility(): string;
visibility(value: string | null): this;
visibility(value?: string): string | this {
	if (value == null) { return this.style.visibility; }
	this.style.visibility = value;
	return this;
}

/**
 * @docs:
 * @title: White space
 * @desc: Specifies how white-space inside an element is handled. The equivalent of CSS attribute `whiteSpace`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
white_space(): string;
white_space(value: string | null): this;
white_space(value?: string): string | this {
	if (value == null) { return this.style.whiteSpace; }
	this.style.whiteSpace = value;
	return this;
}

/**
 * @docs:
 * @title: Widows
 * @desc: Sets the minimum number of lines that must be left at the top of a page or column. 
 *        The equivalent of CSS attribute `widows`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
widows(): string;
widows(value: string | number): this;
widows(value?: string | number): string | this {
	if (value == null) { return this.style.widows; }
	this.style.widows = value;
	return this;
}

// Sets the width of an element.
// width(value) {
//     if (value == null) { return this.style.width; }
//     this.style.width = this.pad_numeric(value);
//     return this;
// }

/**
 * @docs:
 * @title: Word break
 * @desc: Specifies how words should break when reaching the end of a line. 
 *        The equivalent of CSS attribute `wordBreak`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
word_break(): string;
word_break(value: string | null): this;
word_break(value?: string): string | this {
	if (value == null) { return this.style.wordBreak; }
	this.style.wordBreak = value;
	return this;
}

/**
 * @docs:
 * @title: Word spacing
 * @desc: Increases or decreases the space between words in a text. The equivalent of CSS attribute `wordSpacing`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
word_spacing(): string;
word_spacing(value: string | number): this;
word_spacing(value?: string | number): string | this {
	if (value == null) { return this.style.wordSpacing; }
	this.style.wordSpacing = value;
	return this;
}

/**
 * @docs:
 * @title: Word wrap
 * @desc: Allows long, unbreakable words to be broken and wrap to the next line. The equivalent of CSS attribute `wordWrap`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
word_wrap(): string;
word_wrap(value: string | null): this;
word_wrap(value?: string): string | this {
	if (value == null) { return this.style.wordWrap; }
	this.style.wordWrap = value;
	return this;
}

/**
 * @docs:
 * @title: Writing mode
 * @desc: Specifies whether lines of text are laid out horizontally or vertically. The equivalent of CSS attribute `writingMode`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
writing_mode(): string;
writing_mode(value: string): this;
writing_mode(value?: string): string | this {
	if (value == null) { return this.style.writingMode; }
	this.style.writingMode = value;
	return this;
}

// ---------------------------------------------------------
// Automatically generated HTML attribute functions. 
// Reference: https://www.w3schools.com/tags/ref_attributes.asp. 

/**
 * @docs:
 * @title: Accept
 * @desc: Specifies the types of files that the server accepts (only for type="file"). The equivalent of HTML attribute `accept`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
accept(): string;
accept(value: string | null): this;
accept(value?: string): string | this {
    if (value == null) { return super.accept; }
    super.accept = value;
    return this;
}

/**
 * @docs:
 * @title: Accept Charset
 * @desc: Specifies the character encodings that are to be used for the form submission. 
 *        The equivalent of HTML attribute `accept_charset`. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
accept_charset(): string;
accept_charset(value: string): this;
accept_charset(value?: string): string | this {
    if (value == null) { return super.accept_charset; }
    super.accept_charset = value;
    return this;
}

/**
 * @docs:
 * @title: Action
 * @desc: Specifies where to send the form-data when a form is submitted. 
 *        The equivalent of HTML attribute `action`. 
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the attribute value when parameter `value` is `null`. Otherwise, returns the instance of the element for chaining.
 * @funcs: 2
 */
action(): string;
action(value: string | null): this;
action(value?: string): string | this {
	if (value == null) { return super.action; }
	super.action = value;
	return this;
}

/**
 * @docs:
 * @title: Async
 * @desc: Specifies that the script is executed asynchronously (only for external scripts). 
 *        The equivalent of HTML attribute `async`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
async(): boolean;
async(value: boolean): this;
async(value?: boolean): boolean | this {
	if (value == null) { return super.async; }
	super.async = value;
	return this;
}

/**
 * @docs:
 * @title: Auto complete
 * @desc: Specifies whether the <form> or the <input> element should have autocomplete enabled. 
 *        The equivalent of HTML attribute `autocomplete`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
auto_complete(): string;
auto_complete(value: string | null): this;
auto_complete(value?: string): string | this {
	if (value == null) { return super.autocomplete; }
	super.autocomplete = value;
	return this;
}

/**
 * @docs:
 * @title: Auto Focus
 * @desc: Specifies that the element should automatically get focus when the page loads. 
 *        The equivalent of HTML attribute `autofocus`. 
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
auto_focus(): string;
auto_focus(value: string | null): this;
auto_focus(value?: string): string | this {
	if (value == null) { return super.autofocus; }
	super.autofocus = value;
	return this;
}

/**
 * @docs:
 * @title: Auto Play
 * @desc: Specifies that the audio/video will start playing as soon as it is ready. 
 *        The equivalent of HTML attribute `autoplay`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
auto_play(): boolean;
auto_play(value: boolean): this;
auto_play(value?: boolean): this | boolean {
	if (value == null) { return super.autoplay; }
	super.autoplay = value;
	return this;
}

/**
 * @docs:
 * @title: Charset
 * @desc: Specifies the character encoding, equivalent to the HTML attribute `charset`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
charset(): string;
charset(value: string | null): this;
charset(value?: string): this | string {
	if (value == null) { return super.charset; }
	super.charset = value;
	return this;
}

/**
 * @docs:
 * @title: Checked
 * @desc: Specifies that an \<input> element should be pre-selected when the page loads (for type="checkbox" or type="radio"). The equivalent of HTML attribute `checked`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
checked(): boolean;
checked(value: boolean): this;
checked(value?: boolean): this | boolean {
	if (value == null) { return super.checked; }
	super.checked = value;
	return this;
}

/**
 * @docs:
 * @title: Cite
 * @desc: Specifies a URL which explains the quote/deleted/inserted text. The equivalent of HTML attribute `cite`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this, string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
cite(): string;
cite(value: string | null): this;
cite(value?: string): string | this {
	if (value == null) { return super.cite; }
	super.cite = value;
	return this;
}

// Specifies one or more classnames for an element (refers to a class in a style sheet).
// class(value) {
//     if (value == null) { return super.class; }
// 	super.class = value;
// 	return this;
// }

/**
 * @docs:
 * @title: Cols
 * @desc: Specifies the visible width of a text area, equivalent to the HTML attribute `cols`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number, null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object for chaining, unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
cols(): number;
cols(value: number): this;
cols(value?: number): this | number {
	if (value == null) { return super.cols; }
	super.cols = value;
	return this;
}

/**
 * @docs:
 * @title: Colspan
 * @desc: Specifies the number of columns a table cell should span. The equivalent of HTML attribute `colspan`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number | null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
colspan(): number;
colspan(value: number): this;
colspan(value?: number): this | number {
    if (value == null) { return super.colspan; }
    super.colspan = value;
    return this;
}

/**
 * @docs:
 * @title: Content
 * @desc: Retrieves or sets the value associated with the http-equiv or name attribute. 
 *        When `value` is `null`, the current attribute value is returned. 
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: string | this
 *     @description: Returns the current attribute value if `value` is `null`, otherwise returns the instance for chaining.
 * @funcs: 2
 */
content(): string;
content(value: string | number): this;
content(value?: string | number): string | this {
    if (value == null) { return super.content; }
    super.content = value;
    return this;
}

/**
 * @docs:
 * @title: Content editable
 * @desc: Specifies whether the content of an element is editable or not. 
 *        The equivalent of HTML attribute `contenteditable`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: boolean | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
content_editable(): boolean;
content_editable(value: boolean): this;
content_editable(value?: boolean): boolean | this {
	if (value == null) { return super.contenteditable; }
	super.contenteditable = value;
	return this;
}

/**
 * @docs:
 * @title: Controls
 * @desc: Specifies that audio/video controls should be displayed (such as a play/pause button etc). The equivalent of HTML attribute `controls`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
controls(): boolean;
controls(value: boolean): this;
controls(value?: boolean): this | boolean {
	if (value == null) { return super.controls; }
	super.controls = value;
	return this;
}

/**
 * @docs:
 * @title: Coords
 * @desc: Specifies the coordinates of the area, equivalent to the HTML attribute `coords`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining, or the attribute's value if `value` is `null`.
 * @funcs: 2
 */
coords(): string;
coords(value: string): this;
coords(value?: string): string | this {
	if (value == null) { return super.coords; }
	super.coords = value;
	return this;
}

/**
 * @docs:
 * @title: Data
 * @desc: Specifies the URL of the resource to be used by the object. 
 *        The equivalent of HTML attribute `data`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
data(): string;
data(value: string | number): this;
data(value?: string | number): this | string {
	if (value == null) { return super.data; }
	super.data = value;
	return this;
}

/**
 * @docs:
 * @title: Datetime
 * @desc: Specifies the date and time. The equivalent of HTML attribute `datetime`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
datetime(): string;
datetime(value: string | number): this;
datetime(value?: string | number): string | this {
    if (value == null) { return super.datetime; }
    super.datetime = value;
    return this;
}

/**
 * @docs:
 * @title: Default
 * @desc: Specifies that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate. The equivalent of HTML attribute `default`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
default(): string;
default(value: string | number): this;
default(value?: string | number): string | this {
	if (value == null) { return super.default; }
	super.default = value;
	return this;
}

/**
 * @docs:
 * @title: Defer
 * @desc: Specifies that the script is executed when the page has finished parsing (only for external scripts). 
 *        The equivalent of HTML attribute `defer`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
defer(): string;
defer(value: string | null): this;
defer(value?: string): this | string {
	if (value == null) { return super.defer; }
	super.defer = value;
	return this;
}

/**
 * @docs:
 * @title: Dir
 * @desc: Specifies the text direction for the content in an element. The equivalent of HTML attribute `dir`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: string | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
dir(): string;
dir(value: string): this;
dir(value?: string): string | this {
	if (value == null) { return super.dir; }
	super.dir = value;
	return this;
}

/**
 * @docs:
 * @title: Dirname
 * @desc: Specifies that the text direction will be submitted. The equivalent of HTML attribute `dirname`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this, string
 *     @description: Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
dirname(): string;
dirname(value: string | null): this;
dirname(value?: string): string | this {
    if (value == null) { return super.dirname; }
    super.dirname = value;
    return this;
}

/**
 * @docs:
 * @title: Disabled
 * @desc: Specifies that the specified element/group of elements should be disabled. 
 *        The equivalent of HTML attribute `disabled`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
disabled(): boolean;
disabled(value: boolean): this;
disabled(value?: boolean): boolean | this {
	if (value == null) { return super.disabled; }
	super.disabled = value;
	return this;
}

/**
 * @docs:
 * @title: Draggable
 * @desc: Specifies whether an element is draggable or not. The equivalent of HTML attribute `draggable`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: boolean | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
draggable(): boolean;
draggable(value: boolean): this;
draggable(value?: boolean): boolean | this {
	if (value == null) { return super.draggable; }
	super.draggable = value;
	return this;
}

/**
 * @docs:
 * @title: Enctype
 * @desc: Specifies how the form-data should be encoded when submitting it to the server (only for method="post"). 
 *        The equivalent of HTML attribute `enctype`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
enctype(): string;
enctype(value: string | null): this;
enctype(value?: string): string | this {
    if (value == null) { return super.enctype; }
    super.enctype = value;
    return this;
}

/**
 * @docs:
 * @title: For
 * @desc: Specifies which form element(s) a label/calculation is bound to. 
 *        The equivalent of HTML attribute `for`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
for(): string;
for(value: string | null): this;
for(value?: string): string | this {
	if (value == null) { return super.for; }
	super.for = value;
	return this;
}

/**
 * @docs:
 * @title: Form
 * @desc: Specifies the name of the form the element belongs to. The equivalent of HTML attribute `form`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object when a value is set. If `null`, returns the attribute's value.
 * @funcs: 2
 */
form(): string;
form(value: string | null): this;
form(value?: string): this | string {
	if (value == null) { return super.form; }
	super.form = value;
	return this;
}

/**
 * @docs:
 * @title: Form Action
 * @desc: Specifies where to send the form-data when a form is submitted. Only for type="submit". 
 *        The equivalent of HTML attribute `formaction`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
form_action(): string;
form_action(value: string): this;
form_action(value?: string): string | this {
	if (value == null) { return super.formaction; }
	super.formaction = value;
	return this;
}

/**
 * @docs:
 * @title: Headers
 * @desc: Specifies one or more headers cells a cell is related to. 
 *        The equivalent of HTML attribute `headers`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
headers(): string;
headers(value: string | null): this;
headers(value?: string): this | string {
	if (value == null) { return super.headers; }
	super.headers = value;
	return this;
}

// Specifies the height of the element.
// height(value) {
//     if (value == null) { return super.height; }
// 	super.height = this.pad_numeric(value);
// 	return this;
// }

// Specifies that an element is not yet, or is no longer, relevant.
// hidden(value) {
//     if (value == null) { return super.hidden; }
// 	super.hidden = value;
// 	return this;
// }

/**
 * @docs:
 * @title: High
 * @desc: Specifies the range that is considered to be a high value. The equivalent of HTML attribute `high`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
high(): string | null;
high(value: string | number): this;
high(value?: string | number): string | this {
	if (value == null) { return super.high; }
	super.high = value;
	return this;
}

/**
 * @docs:
 * @title: Href
 * @desc: Specifies the URL of the page the link goes to. The equivalent of HTML attribute `href`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
href(): string;
href(value: string | null): this;
href(value?: string): string | this {
	if (value == null) { return super.href; }
	super.href = value;
	return this;
}

/**
 * @docs:
 * @title: Href lang
 * @desc: Specifies the language of the linked document. The equivalent of HTML attribute `hreflang`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
href_lang(): string;
href_lang(value: string | null): this;
href_lang(value?: string): string | this {
    if (value == null) { return super.hreflang; }
    super.hreflang = value;
    return this;
}

/**
 * @docs:
 * @title: Http Equiv
 * @desc: Provides an HTTP header for the information/value of the content attribute. 
 *        The equivalent of HTML attribute `http_equiv`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining, unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
http_equiv(): string;
http_equiv(value: string | number): this;
http_equiv(value?: string | number): this | string {
	if (value == null) { return super.http_equiv; }
	super.http_equiv = value;
	return this;
}

/**
 * @docs:
 * @title: Id
 * @desc: Specifies a unique id for an element, equivalent to the HTML attribute `id`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
id(): string;
id(value: string | null): this;
id(value?: string): string | this {
	if (value == null) { return super.id; }
	super.id = value;
	return this;
}

/**
 * @docs:
 * @title: Is Map
 * @desc: Specifies an image as a server-side image map. The equivalent of HTML attribute `ismap`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type boolean, null
 * @return:
 *     @type: this, boolean
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
is_map(): boolean;
is_map(value: boolean): this;
is_map(value?: boolean): boolean | this {
	if (value == null) { return super.ismap; }
	super.ismap = value;
	return this;
}

/**
 * @docs:
 * @title: Kind
 * @desc: Specifies the kind of text track. The equivalent of HTML attribute `kind`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
kind(): string;
kind(value: string): this;
kind(value?: string): string | this {
	if (value == null) { return super.kind; }
	super.kind = value;
	return this;
}

/**
 * @docs:
 * @title: Label
 * @desc: Specifies the title of the text track, equivalent to the HTML attribute `label`. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
label(): string;
label(value: string | null): this;
label(value?: string): string | this {
    if (value == null) { return super.label; }
    super.label = value;
    return this;
}

/**
 * @docs:
 * @title: Lang
 * @desc: Specifies the language of the element's content, equivalent to the HTML attribute `lang`. 
 *        Returns the attribute value when the parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
lang(): string;
lang(value: string): this;
lang(value?: string): string | this {
	if (value == null) { return super.lang; }
	super.lang = value;
	return this;
}

/**
 * @docs:
 * @title: List
 * @desc: Refers to a <datalist> element that contains pre-defined options for an <input> element. 
 *        The equivalent of HTML attribute `list`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this, string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
list(): string;
list(value: string | null): this;
list(value?: string): string | this {
    if (value == null) { return super.list; }
    super.list = value;
    return this;
}

/**
 * @docs:
 * @title: Loop
 * @desc: Specifies that the audio/video will start over again, every time it is finished. 
 *        The equivalent of HTML attribute `loop`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
loop(): boolean;
loop(value: boolean): this;
loop(value?: boolean): this | boolean {
	if (value == null) { return super.loop; }
	super.loop = value;
	return this;
}

/**
 * @docs:
 * @title: Low
 * @desc: Specifies the range that is considered to be a low value. The equivalent of HTML attribute `low`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string | null
 *     @descr: Returns the `Element` object for chaining. If `value` is `null`, the attribute's value is returned.
 * @funcs: 2
 */
low(): string | null;
low(value: string | number): this;
low(value?: string | number): string | this | null {
	if (value == null) { return super.low; }
	super.low = value;
	return this;
}

/**
 * @docs:
 * @title: Max
 * @desc: Specifies the maximum value, equivalent to the HTML attribute `max`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, in which case the attribute's value is returned.
 * @funcs: 2
 */
max(): string | null;
max(value: string | number): this;
max(value?: string | number): string | this | null {
	if (value == null) { return super.max; }
	super.max = value;
	return this;
}

/**
 * @docs:
 * @title: Max Length
 * @desc: Specifies the maximum number of characters allowed in an element. The equivalent of HTML attribute `maxlength`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number | null
 * @return:
 *     @type: this | number | null
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
max_length(): number | null;
max_length(value: number): this;
max_length(value?: number): this | number | null {
	if (value == null) { return super.maxlength; }
	super.maxlength = value;
	return this;
}

// Specifies what media/device the linked document is optimized for.
// media(value) {
//     if (value == null) { return super.media; }
// 	super.media = value;
// 	return this;
// }

/**
 * @docs:
 * @title: Method
 * @desc: Specifies the HTTP method to use when sending form-data. The equivalent of HTML attribute `method`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
method(): string;
method(value: string | null): this;
method(value?: string): this | string {
    if (value == null) { return super.method; }
    super.method = value;
    return this;
}

/**
 * @docs:
 * @title: Min
 * @desc: Specifies a minimum value, equivalent to the HTML attribute `min`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
min(): string | null;
min(value: string | number): this;
min(value?: string | number): string | this | null {
	if (value == null) { return super.min; }
	super.min = value;
	return this;
}

/**
 * @docs:
 * @title: Multiple
 * @desc: Specifies that a user can enter more than one value. The equivalent of HTML attribute `multiple`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | boolean | null
 * @return:
 *     @type: this | string | null
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
multiple(): string | null;
multiple(value: string | boolean): this;
multiple(value?: string | boolean): string | this {
	if (value == null) { return super.multiple; }
	super.multiple = value;
	return this;
}

/**
 * @docs:
 * @title: Muted
 * @desc: Specifies that the audio output of the video should be muted. 
 *        The equivalent of HTML attribute `muted`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type boolean, null
 * @return:
 *     @type: this, boolean
 *     @description: Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
muted(): boolean;
muted(value: boolean): this;
muted(value?: boolean): boolean | this {
	if (value == null) { return super.muted; }
	super.muted = value;
	return this;
}

// Specifies the name of the element.
// name(value) {
//     if (value == null) { return super.name; }
// 	super.name = value;
// 	return this;
// }

/**
 * @docs:
 * @title: No validate
 * @desc: Specifies that the form should not be validated when submitted. The equivalent of HTML attribute `novalidate`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
no_validate(): boolean;
no_validate(value: boolean | null): this;
no_validate(value?: boolean): this | boolean {
	if (value == null) { return super.novalidate; }
	super.novalidate = value;
	return this;
}

/**
 * @docs:
 * @title: Open
 * @desc: Specifies that the details should be visible (open) to the user. 
 *        The equivalent of HTML attribute `open`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type boolean, null
 * @return:
 *     @type: this | boolean
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
open(): boolean;
open(value: boolean): this;
open(value?: boolean): boolean | this {
	if (value == null) { return super.open; }
	super.open = value;
	return this;
}

/**
 * @docs:
 * @title: Optimum
 * @desc: Specifies what value is the optimal value for the gauge. The equivalent of HTML attribute `optimum`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number, null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
optimum(): number;
optimum(value: number | null): this;
optimum(value?: number): this | number {
	if (value == null) { return super.optimum; }
	super.optimum = value;
	return this;
}

/**
 * @docs:
 * @title: Pattern
 * @desc: Specifies a regular expression that an <input> element's value is checked against. 
 *        The equivalent of HTML attribute `pattern`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
pattern(): string;
pattern(value: string): this;
pattern(value?: string): string | this {
    if (value == null) { return super.pattern; }
    super.pattern = value;
    return this;
}

/**
 * @docs:
 * @title: Placeholder
 * @desc: Specifies a short hint that describes the expected value of the element. 
 *        The equivalent of HTML attribute `placeholder`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
placeholder(): string;
placeholder(value: string | null): this;
placeholder(value?: string): string | this {
    if (value == null) { return super.placeholder; }
    super.placeholder = value;
    return this;
}

/**
 * @docs:
 * @title: Poster
 * @desc: Specifies an image to be shown while the video is downloading, or until the user hits the play button. 
 *        The equivalent of HTML attribute `poster`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
poster(): string;
poster(value: string | null): this;
poster(value?: string): string | this {
	if (value == null) { return super.poster; }
	super.poster = value;
	return this;
}

/**
 * @docs:
 * @title: Preload
 * @desc: Specifies if and how the author thinks the audio/video should be loaded when the page loads. 
 *        The equivalent of HTML attribute `preload`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
preload(): string;
preload(value: string | null): this;
preload(value?: string): string | this {
	if (value == null) { return super.preload; }
	super.preload = value;
	return this;
}

/**
 * @docs:
 * @title: Rel
 * @desc: Specifies the relationship between the current document and the linked document. 
 *        The equivalent of HTML attribute `rel`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this, string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
rel(): string;
rel(value: string | null): this;
rel(value?: string): string | this {
	if (value == null) { return super.rel; }
	super.rel = value;
	return this;
}

/**
 * @docs:
 * @title: Required
 * @desc: Specifies that the element must be filled out before submitting the form. The equivalent of HTML attribute `required`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description: Returns the `Element` object when a value is assigned. Returns the attribute's value when `value` is `null`.
 * @funcs: 2
 */
required(): boolean;
required(value: boolean): this;
required(value?: boolean): boolean | this {
    if (value == null) { return super.required; }
    super.required = value;
    return this;
}

/**
 * @docs:
 * @title: Reversed
 * @desc: Specifies that the list order should be descending (9,8,7...). This is the equivalent of the HTML attribute `reversed`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description: Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
reversed(): boolean;
reversed(value: boolean): this;
reversed(value?: boolean): this | boolean {
	if (value == null) { return super.reversed; }
	super.reversed = value;
	return this;
}

/**
 * @docs:
 * @title: Rows
 * @desc: Specifies the visible number of lines in a text area. 
 *        The equivalent of HTML attribute `rows`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number, null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object for chaining, unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
rows(): number;
rows(value: number): this;
rows(value?: number): number | this {
	if (value == null) { return super.rows; }
	super.rows = value;
	return this;
}

/**
 * @docs:
 * @title: Row Span
 * @desc: Specifies the number of rows a table cell should span. 
 *        The equivalent of HTML attribute `rowspan`. 
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type number, null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, 
 *                  then the attribute's value is returned.
 * @funcs: 2
 */
row_span(): number;
row_span(value: number): this;
row_span(value?: number): this | number {
	if (value == null) { return super.rowspan; }
	super.rowspan = value;
	return this;
}

/**
 * @docs:
 * @title: Sandbox
 * @desc: Enables an extra set of restrictions for the content in an <iframe>. The equivalent of HTML attribute `sandbox`. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
sandbox(): string;
sandbox(value: string | null): this;
sandbox(value?: string): string | this {
	if (value == null) { return super.sandbox; }
	super.sandbox = value;
	return this;
}

/**
 * @docs:
 * @title: Scope
 * @desc: Specifies whether a header cell is a header for a column, row, or group of columns or rows. 
 *        The equivalent of HTML attribute `scope`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
scope(): string;
scope(value: string): this;
scope(value?: string): string | this {
    if (value == null) { return super.scope; }
    super.scope = value;
    return this;
}

/**
 * @docs:
 * @title: Selected
 * @desc: Specifies that an option should be pre-selected when the page loads. The equivalent of HTML attribute `selected`. 
 *         Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
selected(): boolean;
selected(value: boolean): this;
selected(value?: boolean): boolean | this {
	if (value == null) { return super.selected; }
	super.selected = value;
	return this;
}

/**
 * @docs:
 * @title: Shape
 * @desc: Specifies the shape of the area. The equivalent of HTML attribute `shape`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
shape(): string;
shape(value: string | null): this;
shape(value?: string): string | this {
    if (value == null) { return super.shape; }
    super.shape = value;
    return this;
}

/**
 * @docs:
 * @title: Size
 * @desc: Specifies the width, in characters (for <input>) or specifies the number of visible options (for <select>). 
 *        The equivalent of HTML attribute `size`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number | null
 * @return:
 *     @type: number | this
 *     @description: Returns the attribute's value when `value` is `null`, otherwise returns the instance of the element for chaining.
 * @funcs: 2
 */
size(): number;
size(value: number): this;
size(value?: number): number | this {
    if (value == null) { return super.size; }
    super.size = value;
    return this;
}

/**
 * @docs:
 * @title: Sizes
 * @desc: Specifies the size of the linked resource. The equivalent of HTML attribute `sizes`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
sizes(): string;
sizes(value: string | number): this;
sizes(value?: string | number): string | this {
	if (value == null) { return super.sizes; }
	super.sizes = value;
	return this;
}

/**
 * @docs:
 * @title: Span
 * @desc: Specifies the number of columns to span. The equivalent of HTML attribute `span`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type number, null
 * @return:
 *     @type: this | number
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
span(): number;
span(value: number | null): this;
span(value?: number): this | number {
	if (value == null) { return super.span; }
	super.span = value;
	return this;
}

/**
 * @docs:
 * @title: Spell Check
 * @desc: Specifies whether the element is to have its spelling and grammar checked or not. 
 *        The equivalent of HTML attribute `spellcheck`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: boolean, null
 * @return:
 *     @type: this | boolean
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
spell_check(): boolean;
spell_check(value: boolean): this;
spell_check(value?: boolean): boolean | this {
	if (value == null) { return super.spellcheck; }
	super.spellcheck = value;
	return this;
}

/**
 * @docs:
 * @title: Src
 * @desc: Specifies the URL of the media file, equivalent to the HTML attribute `src`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
src(): string;
src(value: string): this;
src(value?: string): string | this {
	if (value == null) { return super.src; }
	super.src = value;
	return this;
}

/**
 * @docs:
 * @title: Src doc
 * @desc: Specifies the HTML content of the page to show in the <iframe>. The equivalent of HTML attribute `srcdoc`.
 *         Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
src_doc(): string;
src_doc(value: string): this;
src_doc(value?: string): string | this {
	if (value == null) { return super.srcdoc; }
	super.srcdoc = value;
	return this;
}

/**
 * @docs:
 * @title: Src lang
 * @desc: Specifies the language of the track text data (required if kind="subtitles"). The equivalent of HTML attribute `srclang`. 
 *          Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
src_lang(): string;
src_lang(value: string): this;
src_lang(value?: string): string | this {
	if (value == null) { return super.srclang; }
	super.srclang = value;
	return this;
}

/**
 * @docs:
 * @title: Rrsrc set
 * @desc: Specifies the URL of the image to use in different situations. 
 *        The equivalent of HTML attribute `srcset`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
rrsrc_set(): string;
rrsrc_set(value: string | null): this;
rrsrc_set(value?: string): this | string {
	if (value == null) { return super.srcset; }
	super.srcset = value;
	return this;
}

/**
 * @docs:
 * @title: Start
 * @desc: Specifies the start value of an ordered list. The equivalent of HTML attribute `start`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type number, null
 * @return:
 *     @type: number | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
start(): number;
start(value: number): this;
start(value?: number): number | this {
	if (value == null) { return super.start; }
	super.start = value;
	return this;
}

/**
 * @docs:
 * @title: Step
 * @desc: Specifies the legal number intervals for an input field. The equivalent of HTML attribute `step`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number, null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
step(): number;
step(value: number): this;
step(value?: number): this | number {
	if (value == null) { return super.step; }
	super.step = value;
	return this;
}

// Specifies an inline CSS style for an element.
// style(value) {
//     if (value == null) { return super.style; }
// 	super.style = value;
// 	return this;
// }

/**
 * @docs:
 * @title: Tab index
 * @desc: Specifies the tabbing order of an element, equivalent to the HTML attribute `tabindex`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: number | null
 * @return:
 *     @type: this | number
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, in which case the attribute's value is returned.
 * @funcs: 2
 */
tab_index(): number;
tab_index(value: number): this;
tab_index(value?: number): this | number {
	if (value == null) { return super.tabindex; }
	super.tabindex = value;
	return this;
}

/**
 * @docs:
 * @title: Target
 * @desc: Specifies the target for where to open the linked document or where to submit the form. 
 *        The equivalent of HTML attribute `target`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
target(): string;
target(value: string): this;
target(value?: string): string | this {
	if (value == null) { return super.target; }
	super.target = value;
	return this;
}

/**
 * @docs:
 * @title: Title
 * @desc: Specifies extra information about an element, equivalent to the HTML attribute `title`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description: Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
title(): string;
title(value: string | null): this;
title(value?: string): this | string {
	if (value == null) { return super.title; }
	super.title = value;
	return this;
}

/**
 * @docs:
 * @title: Translate
 * @desc: Specifies whether the content of an element should be translated or not. 
 *        The equivalent of HTML attribute `translate`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, boolean, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
translate(): string;
translate(value: string | boolean): this;
translate(value?: string | boolean): string | this {
	if (value == null) { return super.translate; }
	super.translate = value;
	return this;
}

/**
 * @docs:
 * @title: Type
 * @desc: Specifies the type of element, equivalent to the HTML attribute `type`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
type(): string;
type(value: string): this;
type(value?: string): string | this {
	if (value == null) { return super.type; }
	super.type = value;
	return this;
}

/**
 * @docs:
 * @title: Use Map
 * @desc: Specifies an image as a client-side image map, equivalent to the HTML attribute `usemap`.
 *         Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
use_map(): string;
use_map(value: string | null): this;
use_map(value?: string): string | this {
	if (value == null) { return super.usemap; }
	super.usemap = value;
	return this;
}

/**
 * @docs:
 * @title: Value
 * @desc: Specifies the value of the element, equivalent to the HTML attribute `value`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: string, number, null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining unless `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
value(): string;
value(value: string | number): this;
value(value?: string | number): string | this {
	if (value == null) { return super.value; }
	super.value = value;
	return this;
}

/**
 * @docs:
 * @title: On after print
 * @desc: Script to be run after the document is printed. The equivalent of HTML attribute `onafterprint`. 
 *        The first parameter of the callback is the `Element` object. 
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute after printing. It receives the `Element` object and the event.
 *     @type: function | null
 * @return:
 *     @type: this | function
 *     @description Returns the `Element` object unless the parameter `callback` is `null`, then the attribute's value is returned.
 */
on_after_print(): (this: Element, event: Event) => void | null;
on_after_print(callback: ((element: Element, event: Event) => void) | null): this;
on_after_print(callback?: ((element: Element, event: Event) => void) | null): this | ((this: Element, event: Event) => void) | null {
	if (callback == null) { return this.onafterprint; }
	const e = this;
	this.onafterprint = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On before print
 * @desc: Script to be run before the document is printed. The equivalent of HTML attribute `onbeforeprint`.
 * @param:
 *     @name: callback
 *     @descr: The function to be executed before printing, receiving the `Element` object as the first parameter.
 *     @type: function | null
 * @return:
 *     @type: this | function
 *     @description Returns the instance of the element for chaining unless parameter `callback` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_before_print(callback: ((element: Element, event: Event) => void) | null): this;
on_before_print(): ((element: Element, event: Event) => void) | null;
on_before_print(callback?: ((element: Element, event: Event) => void) | null): this | ((element: Element, event: Event) => void) | null {
	if (callback == null) { return this.onbeforeprint; }
	const e = this;
	this.onbeforeprint = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Before Unload
 * @desc: Script to be run when the document is about to be unloaded. 
 *        This is the equivalent of the HTML attribute `onbeforeunload`. 
 *        The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: callback
 *     @description: The callback function to execute before unloading the document.
 *     @type: Function | null
 * @return:
 *     @type: this | Function
 *     @description: Returns the `Element` object. Unless parameter `callback` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_before_unload(): Function;
on_before_unload(callback: Function | null): this;
on_before_unload(callback?: Function): Function | this {
	if (callback == null) { return this.onbeforeunload; }
	const e = this;
	this.onbeforeunload = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On error
 * @desc: Script to be run when an error occurs. The equivalent of HTML attribute `onerror`. 
 *        The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when an error occurs.
 *     @type: function
 * @return:
 *     @type: this | undefined
 *     @description Returns the instance of the element for chaining. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_error(callback: ((element: Element, error: any) => void) | null): this | undefined {
	if (callback == null) { return this.onerror; }
	const e = this;
	this.onerror = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On hash change
 * @desc: 
 *     Script to be run when there has been changes to the anchor part of a URL.
 *     The equivalent of HTML attribute `onhashchange`.
 *     
 *     The first parameter of the callback is the `Element` object.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on hash change.
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining. If parameter `value` is `null`, the attribute's value is returned.
 */
on_hash_change(callback: (element: Element, event: Event) => void): this;
on_hash_change(value: null): string | null;
on_hash_change(value?: null | ((element: Element, event: Event) => void)): this | string | null {
    if (value == null) { return this.onhashchange; }
    const e = this;
    this.onhashchange = (t) => value(e, t);
    return this;
}

// Fires after the page is finished loading.
/*	DEPRC docs:
 *	@title: On load
 *	@description: 
 *		Fires after the page is finished loading.
 *		The equivalent of HTML attribute `onload`.
 *		
 *		The first parameter of the callback is the `Element` object.
 *		
 *		Returns the attribute value when parameter `value` is `null`.
 *	@return: 
 *		Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 *	@parameter:
 *		@name: value
 *		@description: The value to assign. Leave `null` to retrieve the attribute's value.
 *	@inherit: false
 */ 
// on_load(callback) {
// 	if (callback == null) { return this.onload; }
// 	const e = this;
// 	this.onload = (t) => callback(e, t);
// 	return this;
// }

/**
 * @docs:
 * @title: On message
 * @desc: 
 *     Script to be run when the message is triggered.
 *     The equivalent of HTML attribute `onmessage`.
 *     
 *     The first parameter of the callback is the `Element` object.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: Function | null
 * @return:
 *     @type: this | Function | null
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_message(): Function | null;
on_message(callback: Function): this;
on_message(callback?: Function): Function | null | this {
    if (callback == null) { return this.onmessage; }
    const e = this;
    this.onmessage = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Offline
 * @desc: Script to be run when the browser starts to work offline. The equivalent of HTML attribute `onoffline`. 
 *        The first parameter of the callback is the `Element` object. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: Function | null
 * @return:
 *     @type: this | Function
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_offline(callback: Function | null): this;
on_offline(): Function | null;
on_offline(callback?: Function): this | Function | null {
	if (callback == null) { return this.onoffline; }
	const e = this;
	this.onoffline = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On online
 * @desc: Script to be run when the browser starts to work online. 
 *        The equivalent of HTML attribute `ononline`. 
 *        The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: function | null
 * @return:
 *     @type: this | function | null
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_online(): ((element: Element, event: Event) => void) | null;
on_online(callback: (element: Element, event: Event) => void): this;
on_online(callback?: (element: Element, event: Event) => void | null): this | null {
	if (callback == null) { return this.ononline; }
	const e = this;
	this.ononline = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On page hide
 * @desc: 
 *     Script to be run when a user navigates away from a page.
 *     The equivalent of HTML attribute `onpagehide`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: function | null
 * @return:
 *     @type: this | function
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_page_hide(callback: (element: Element, event: Event) => void): this;
on_page_hide(callback: null): ((element: Element, event: Event) => void) | null;
on_page_hide(callback?: (element: Element, event: Event) => void | null): this | ((element: Element, event: Event) => void) | null {
	if (callback == null) { return this.onpagehide; }
	const e = this;
	this.onpagehide = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On page show
 * @desc: 
 *     Script to be run when a user navigates to a page.
 *     The equivalent of HTML attribute `onpageshow`.
 *     The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: function | null
 * @return:
 *     @type: function | this
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_page_show(): (event: Event) => void | null;
on_page_show(callback: (element: this, event: Event) => void): this;
on_page_show(callback?: (element: this, event: Event) => void | null): (event: Event) => void | null | this {
    if (callback == null) { return this.onpageshow; }
    const e = this;
    this.onpageshow = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Popstate
 * @desc: Script to be run when the window's history changes. The equivalent of HTML attribute `onpopstate`. 
 *        The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on popstate event.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object. Unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_popstate(callback: (element: Element, event: PopStateEvent) => void): this;
on_popstate(callback: null): any;
on_popstate(callback?: (element: Element, event: PopStateEvent) => void | null): this | any {
    if (callback == null) { return this.onpopstate; }
    const e = this;
    this.onpopstate = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Storage
 * @desc: Script to be run when a Web Storage area is updated. 
 *        The equivalent of HTML attribute `onstorage`. 
 *        The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: callback
 *     @descr: The function to be executed when storage is updated.
 *     @type: function
 * @return:
 *     @type: this | Event
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_storage(callback: (element: Element, event: Event) => void): this;
on_storage(value: null): (Event | undefined);
on_storage(value?: null | ((element: Element, event: Event) => void)): this | Event | undefined {
    if (value == null) { return this.onstorage; }
    const e = this;
    this.onstorage = (t) => value(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Unload
 * @desc: Fires once a page has unloaded (or the browser window has been closed). 
 *        The equivalent of HTML attribute `onunload`. 
 * @param:
 *     @name: callback
 *     @descr: The function to call when the unload event occurs.
 *     @type: function
 * @return:
 *     @type: this | string | null
 *     @description Returns the instance of the element for chaining. 
 *                  If the parameter `callback` is `null`, returns the current attribute value.
 * @funcs: 2
 */
on_unload(): string | null;
on_un_load(callback: (element: Element, event: Event) => void): this;
on_unload(callback?: (element: Element, event: Event) => void | null): string | null | this {
    if (callback == null) { return this.onunload; }
    const e = this;
    this.onunload = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Blur
 * @desc: Fires the moment that the element loses focus, similar to the HTML attribute `onblur`. 
 *        The first parameter of the callback is the `Element` object. 
 * @param:
 *     @name: callback
 *     @descr: The function to call when the element loses focus.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object unless the parameter `callback` is `null`, 
 *                  then the attribute's value is returned.
 * @funcs: 2
 */
on_blur(): any;
on_blur(callback: (element: Element, event: Event) => void): this;
on_blur(callback?: (element: Element, event: Event) => void | null): this | any {
	if (callback == null) { return this.onblur; }
	const e = this;
	this.onblur = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Change
 * @desc: Fires the moment when the value of the element is changed. The equivalent of HTML attribute `onchange`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the value changes, receiving the `Element` object and the event as parameters.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object for chaining. If `callback` is `null`, returns the current `onchange` value.
 * @funcs: 2
 */
on_change(callback: (element: this, event: Event) => void): this;
on_change(callback: null): any;
on_change(callback?: (element: this, event: Event) => void | null): this | any {
    if (callback == null) { return this.onchange; }
    const e = this;
    this.onchange = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Focus
 * @desc: Fires the moment when the element gets focus. This is the equivalent of the HTML attribute `onfocus`. 
 *        The first parameter of the callback is the `Element` object. 
 * @param:
 *     @name: callback
 *     @descr: The function to be called when the element gets focus.
 *     @type: function | null
 * @return:
 *     @type: this | Element
 *     @description Returns the `Element` object unless the parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_focus(): Element;
on_focus(callback: (element: this, event: FocusEvent) => void): this;
on_focus(callback?: (element: this, event: FocusEvent) => void | null): this | Element {
    if (callback == null) { return this.onfocus; }
    const e = this;
    this.onfocus = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Input
 * @desc: 
 *     Script to be run when an element gets user input.
 *     The equivalent of HTML attribute `oninput`. 
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to call when user input is detected.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object for chaining, or the attribute's value if the parameter is `null`.
 */
on_input(callback: (element: Element, event: Event) => void): this;
on_input(callback?: null): any;
on_input(callback?: (element: Element, event: Event) => void | null): this | any {
	if (callback == null) { return this.oninput; }
	const e = this;
	this.oninput = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Input
 * @desc: Script to be run before an element gets user input. The equivalent of HTML attribute `onbeforeinput`.
 * @param:
 *     @name: callback
 *     @description: The function to execute before user input. Receives the `Element` object and the event as parameters.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description: Returns the `Element` object for chaining. If `callback` is `null`, returns the current value of `onbeforeinput`.
 */
on_before_input(callback: (element: Element, event: Event) => void): this;
on_before_input(callback: null): any;
on_before_input(callback?: (element: Element, event: Event) => void | null): this | any {
	if (callback == null) { return this.onbeforeinput; }
	const e = this;
	this.onbeforeinput = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Invalid
 * @desc: Script to be run when an element is invalid. The equivalent of HTML attribute `oninvalid`. 
 *        The first parameter of the callback is the `Element` object. 
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: function | null
 * @return:
 *     @type: this | function
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_invalid(): (element: Element, t: Event) => void | null;
on_invalid(callback: (element: Element, t: Event) => void): this;
on_invalid(callback?: (element: Element, t: Event) => void | null): this | ((element: Element, t: Event) => void) | null {
	if (callback == null) { return this.oninvalid; }
	const e = this;
	this.oninvalid = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Reset
 * @desc: Fires when the Reset button in a form is clicked. The equivalent of HTML attribute `onreset`.
 *         The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the Reset button is clicked.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_reset(callback: (element: this, event: Event) => void): this;
on_reset(callback?: null): any;
on_reset(callback?: (element: this, event: Event) => void | null): this | any {
    if (callback == null) { return this.onreset; }
    const e = this;
    this.onreset = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On search
 * @desc: Fires when the user writes something in a search field (for <input="search">).
 *        The equivalent of HTML attribute `onsearch`. The first parameter of the callback is the `Element` object.
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the search event is triggered.
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining. Unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_search(callback: (element: Element, event: Event) => void): this;
on_search(callback: null): string | null;
on_search(callback?: (element: Element, event: Event) => void | null): this | string | null {
    if (callback == null) { return this.onsearch; }
    const e = this;
    this.onsearch = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Select
 * @desc: Fires after some text has been selected in an element. The equivalent of HTML attribute `onselect`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when text is selected. It receives the `Element` object as the first parameter.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_select(): any;
on_select(callback: (element: Element, text: string) => void): this;
on_select(callback?: (element: Element, text: string) => void): any {
    if (callback == null) { return this.onselect; }
    const e = this;
    this.onselect = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Submit
 * @desc: Fires when a form is submitted, similar to the HTML attribute `onsubmit`. 
 *        The first parameter of the callback is the `Element` object. 
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on form submission. 
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | string | null
 *     @description Returns the instance of the element for chaining. If `callback` is null, returns the current `onsubmit` attribute value.
 * @funcs: 2
 */
on_submit(): string | null;
on_submit(callback: (element: Element, event: Event) => void): this;
on_submit(callback?: (element: Element, event: Event) => void | null): string | null | this {
    if (callback == null) { return this.onsubmit; }
    const e = this;
    this.onsubmit = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Key Down
 * @desc: Fires when a user is pressing a key. The equivalent of HTML attribute `onkeydown`. 
 * The first parameter of the callback is the `Element` object. 
 * Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when the key is pressed.
 *     @type: Function
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining. If the parameter `callback` is `null`, the current attribute's value is returned.
 * @funcs: 2
 */
on_key_down(): string | null;
on_key_down(callback: (element: Element, event: KeyboardEvent) => void): this;
on_key_down(callback?: (element: Element, event: KeyboardEvent) => void): string | null | this {
	if (callback == null) { return this.onkeydown; }
	const e = this;
	this.onkeydown = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Key Press
 * @desc: Fires when a user presses a key, similar to the HTML `onkeypress` attribute.
 * The first parameter of the callback is the `Element` object, allowing for dynamic handling of key events.
 * @param:
 *     @name: callback
 *     @descr: The function to call when a key is pressed. Receives the `Element` and event as parameters.
 *     @type: function
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining. If `callback` is `null`, the current attribute value is returned.
 */
on_key_press(callback: (element: Element, event: KeyboardEvent) => void): this;
on_key_press(callback: null): string | null;
on_key_press(callback?: (element: Element, event: KeyboardEvent) => void | null): this | string | null {
	if (callback == null) { return this.onkeypress; }
	const e = this;
	this.onkeypress = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Key Up
 * @desc: Fires when a user releases a key, similar to the HTML attribute `onkeyup`. 
 *        The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the key is released. 
 *              Leave `null` to retrieve the current attribute's value.
 *     @type: function | null
 * @return:
 *     @type: this | string
 *     @description Returns the `Element` object for chaining, unless `callback` is `null`, 
 *                  in which case the current attribute's value is returned.
 */
on_key_up(): string;
on_key_up(callback: (element: Element, event: KeyboardEvent) => void): this;
on_key_up(callback?: (element: Element, event: KeyboardEvent) => void | null): string | this {
    if (callback == null) { return this.onkeyup; }
    const e = this;
    this.onkeyup = (t) => callback(e, t);
    return this;
}

// Fires on a mouse click on the element.
// on_click(callback) {
//     if (callback == null) { return this.onclick; }
// 	const e = this;
// 	this.onclick = (t) => callback(e, t);
// 	return this;
// }

/**
 * @docs:
 * @title: On dbl click
 * @desc: Fires on a mouse double-click on the element. The equivalent of HTML attribute `ondblclick`. 
 *        The first parameter of the callback is the `Element` object. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to execute on double-click. Receives the `Element` and the event as parameters.
 *     @type: function
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining. If `callback` is null, returns the current attribute value.
 * @funcs: 2
 */
on_dbl_click(callback: (element: Element, event: MouseEvent) => void): this;
on_dbl_click(callback: null): string | null;
on_dbl_click(callback?: (element: Element, event: MouseEvent) => void | null): this | string | null {
	if (callback == null) { return this.ondblclick; }
	const e = this;
	this.ondblclick = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Mouse Down
 * @desc: Fires when a mouse button is pressed down on an element. The equivalent of HTML attribute `onmousedown`. 
 *        The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to execute when the mouse button is pressed down.
 *     @type: (element: Element, event: MouseEvent) => void
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining. If the parameter `callback` is `null`, then the attribute's value is returned.
 */
on_mouse_down(callback: (element: Element, event: MouseEvent) => void): this;
on_mouse_down(callback: null): string | null;
on_mouse_down(callback?: (element: Element, event: MouseEvent) => void | null): this | string | null {
	if (callback == null) { return this.onmousedown; }
	const e = this;
	this.onmousedown = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Mouse Move
 * @desc: Fires when the mouse pointer is moving while it is over an element. 
 *        The equivalent of HTML attribute `onmousemove`. Invokes the callback with the element and event.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the mouse moves over the element.
 *     @type: (element: Element, event: MouseEvent) => void
 * @return:
 *     @type: this | MouseEvent
 *     @description Returns the instance of the element for chaining. Unless parameter `callback` is `null`, then the event is returned.
 * @funcs: 2
 */
on_mouse_move(callback: (element: Element, event: MouseEvent) => void): this;
on_mouse_move(callback: null): MouseEvent | this;
on_mouse_move(callback?: (element: Element, event: MouseEvent) => void | null): this | MouseEvent {
	if (callback == null) { return this.onmousemove; }
	const e = this;
	this.onmousemove = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On mouse out
 * @desc: Fires when the mouse pointer moves out of an element. The equivalent of HTML attribute `onmouseout`. 
 *         The first parameter of the callback is the `Element` object. 
 *         Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @description: The callback function to execute when the mouse moves out.
 *     @type: (element: Element, event: MouseEvent) => void
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining, or the attribute's value if the callback is `null`.
 */
on_mouse_out(callback: (element: Element, event: MouseEvent) => void): this;
on_mouse_out(callback: null): string | null;
on_mouse_out(callback?: (element: Element, event: MouseEvent) => void | null): this | string | null {
	if (callback == null) { return this.onmouseout; }
	const e = this;
	this.onmouseout = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Mouse Over
 * @desc: Fires when the mouse pointer moves over an element, similar to the HTML `onmouseover` attribute.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when the mouse is over the element.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the instance of the element for chaining. If `callback` is null, returns the current `onmouseover` attribute value.
 * @funcs: 2
 */
on_mouse_over(): any;
on_mouse_over(callback: (element: Element, event: MouseEvent) => void): this;
on_mouse_over(callback?: (element: Element, event: MouseEvent) => void): this | any {
	if (callback == null) { return this.onmouseover; }
	const e = this;
	this.onmouseover = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Mouse Up
 * @desc: Fires when a mouse button is released over an element. The equivalent of HTML attribute `onmouseup`.
 *         The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when the mouse button is released.
 *     @type: function
 * @return:
 *     @type: this | Function
 *     @description Returns the `Element` object for chaining. If `callback` is `null`, returns the current `onmouseup` value.
 * @funcs: 2
 */
on_mouse_up(): Function | this;
on_mouse_up(callback: (element: Element, event: MouseEvent) => void): this;
on_mouse_up(callback?: (element: Element, event: MouseEvent) => void): Function | this {
	if (callback == null) { return this.onmouseup; }
	const e = this;
	this.onmouseup = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Mouse Wheel
 * @desc: Deprecated. Use the onwheel attribute instead. This function simulates the onmousewheel HTML attribute.
 * The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on mouse wheel events.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object. Unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_mouse_wheel(): any;
on_mouse_wheel(callback: (element: Element, event: Event) => void): this;
on_mouse_wheel(callback?: (element: Element, event: Event) => void): this | any {
	if (callback == null) { return this.onmousewheel; }
	const e = this;
	this.onmousewheel = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Wheel
 * @desc: Fires when the mouse wheel rolls up or down over an element. The equivalent of HTML attribute `onwheel`. 
 *        The first parameter of the callback is the `Element` object. 
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on wheel event.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the instance of the element for chaining. Unless parameter `callback` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_wheel(): any;
on_wheel(callback: (element: Element, event: WheelEvent) => void): this;
on_wheel(callback?: (element: Element, event: WheelEvent) => void): this | any {
    if (callback == null) { return this.onwheel; }
    const e = this;
    this.onwheel = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Drag
 * @desc: Script to be run when an element is dragged. The equivalent of HTML attribute `ondrag`. 
 *        The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when the element is dragged.
 *     @type: function
 * @return:
 *     @type: this | Function | null
 *     @description Returns the instance of the element for chaining unless the parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_drag(callback: (element: Element, event: Event) => void): this;
on_drag(callback: null): ((element: Element, event: Event) => void) | null;
on_drag(callback?: (element: Element, event: Event) => void | null): this | ((element: Element, event: Event) => void) | null {
	if (callback == null) { return this.ondrag; }
	const e = this;
	this.ondrag = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Drag End
 * @desc: Script to be run at the end of a drag operation. The equivalent of HTML attribute `ondragend`. 
 *        The first parameter of the callback is the `Element` object. 
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute at the end of the drag operation.
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | Event
 *     @description Returns the `Element` object unless the parameter `value` is `null`, in which case the attribute's value is returned.
 */
on_drag_end(callback: (element: Element, event: Event) => void): this;
on_drag_end(callback: null): Event | this;
on_drag_end(callback?: (element: Element, event: Event) => void | null): this | Event {
	if (callback == null) { return this.ondragend; }
	const e = this;
	this.ondragend = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Drag Enter
 * @desc: 
 *     Script to be run when an element has been dragged to a valid drop target.
 *     The equivalent of HTML attribute `ondragenter`.
 *     
 *     The first parameter of the callback is the `Element` object.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to execute when the drag enters the target.
 *     @type: (element: Element, event: DragEvent) => void
 * @return:
 *     @type: this | ((element: Element, event: DragEvent) => void) | null
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_drag_enter(callback?: (element: Element, event: DragEvent) => void): this | ((element: Element, event: DragEvent) => void) | null {
	if (callback == null) { return this.ondragenter; }
	const e = this;
	this.ondragenter = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On drag leave
 * @desc: 
 *     Script to be run when an element leaves a valid drop target.
 *     The equivalent of HTML attribute `ondragleave`.
 *     
 *     The first parameter of the callback is the `Element` object.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: function | null
 * @return:
 *     @type: this | function | null
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_drag_leave(): ((t: Event) => void) | null;
on_drag_leave(callback: (element: Element, event: Event) => void): this;
on_drag_leave(callback?: (element: Element, event: Event) => void | null): this | ((t: Event) => void) | null {
    if (callback == null) { return this.ondragleave; }
    const e = this;
    this.ondragleave = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On drag over
 * @desc: 
 *     Script to be run when an element is being dragged over a valid drop target.
 *     The equivalent of HTML attribute `ondragover`.
 * @param:
 *     @name: callback
 *     @descr: The function to execute when the drag over event occurs.
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | Element
 *     @description Returns the `Element` object. Unless parameter `callback` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_drag_over(): Element;
on_drag_over(callback: (element: Element, event: Event) => void): this;
on_drag_over(callback?: (element: Element, event: Event) => void): this | Element {
	if (callback == null) { return this.ondragover; }
	const e = this;
	this.ondragover = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Drag Start
 * @desc: Script to be run at the start of a drag operation. The equivalent of HTML attribute `ondragstart`. 
 *        The first parameter of the callback is the `Element` object. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the drag starts.
 *     @type: function
 * @return:
 *     @type: this | EventListener
 *     @description Returns the `Element` object for chaining unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_drag_start(callback: (element: Element, event: Event) => void): this;
on_drag_start(callback: null): EventListener | null;
on_drag_start(callback?: (element: Element, event: Event) => void | null): this | EventListener | null {
	if (callback == null) { return this.ondragstart; }
	const e = this;
	this.ondragstart = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On drop
 * @desc: Script to be run when dragged element is being dropped. The equivalent of HTML attribute `ondrop`. The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: Function | null
 * @return:
 *     @type: Function | this
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_drop(): Function | null;
on_drop(callback: Function): this;
on_drop(callback?: Function): Function | this {
	if (callback == null) { return this.ondrop; }
	const e = this;
	this.ondrop = (t) => callback(e, t);
	return this;
}

// Script to be run when an element's scrollbar is being scrolled.
// on_scroll(callback) {
//     if (callback == null) { return this.onscroll; }
// 	const e = this;
// 	this.onscroll = (t) => callback(e, t);
// 	return this;
// }

/**
 * @docs:
 * @title: On Copy
 * @desc: Fires when the user copies the content of an element. The equivalent of HTML attribute `oncopy`. 
 *        The first parameter of the callback is the `Element` object. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to be called when the copy event occurs.
 *     @type: function
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_copy(callback: (element: Element, event: Event) => void): this;
on_copy(value: null): string | null;
on_copy(value?: null | ((element: Element, event: Event) => void)): this | string | null {
	if (value == null) { return this.oncopy; }
	const e = this;
	this.oncopy = (t) => value(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Cut
 * @desc: Fires when the user cuts the content of an element, equivalent to the HTML attribute `oncut`.
 *        The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the cut event occurs.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object unless the parameter `callback` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_cut(): any;
on_cut(callback: (element: Element, event: Event) => void): this;
on_cut(callback?: (element: Element, event: Event) => void): any | this {
	if (callback == null) { return this.oncut; }
	const e = this;
	this.oncut = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Paste
 * @desc: Fires when the user pastes some content in an element. The equivalent of HTML attribute `onpaste`. 
 *        The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the paste event occurs.
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | string | null
 *     @description Returns the `Element` object for chaining. If `callback` is `null`, returns the current `onpaste` attribute value.
 */
on_paste(callback: (element: Element, event: Event) => void): this;
on_paste(callback: null): string | null;
on_paste(callback?: (element: Element, event: Event) => void | null): this | string | null {
	if (callback == null) { return this.onpaste; }
	const e = this;
	this.onpaste = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Abort
 * @desc: Script to be run on abort, equivalent to the HTML attribute `onabort`. 
 *        The first parameter of the callback is the `Element` object. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on abort event.
 *     @type: function
 * @return:
 *     @type: this | EventListener
 *     @description Returns the instance of the element for chaining. Unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_abort(callback: ((element: Element, event: Event) => void) | null): this | EventListener {
    if (callback == null) { return this.onabort; }
    const e = this;
    this.onabort = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Can Play
 * @desc: Script to be run when a file is ready to start playing (when it has buffered enough to begin). 
 *        The equivalent of HTML attribute `oncanplay`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when the event occurs.
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | (Element | null)
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_canplay(callback: (element: Element, event: Event) => void): this;
on_canplay(callback?: null): (Element | null);
on_canplay(callback?: (element: Element, event: Event) => void | null): this | (Element | null) {
	if (callback == null) { return this.oncanplay; }
	const e = this;
	this.oncanplay = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Can Play Through
 * @desc: Script to be run when a file can be played all the way to the end without pausing for buffering. 
 *        The equivalent of HTML attribute `oncanplaythrough`.
 * @param:
 *     @name: callback
 *     @description: The callback function to execute when the event occurs.
 *     @type: Function
 * @return:
 *     @type: this | Event
 *     @description: Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_canplay_through(callback: Function): this;
on_canplay_through(): Event | null;
on_canplay_through(callback?: Function): this | Event | null {
    if (callback == null) { return this.oncanplaythrough; }
    const e = this;
    this.oncanplaythrough = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Cue Change
 * @desc: Script to be run when the cue changes in a <track> element. 
 *        The equivalent of HTML attribute `oncuechange`. 
 *        The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the cue changes.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the instance of the element for chaining. 
 *                  Unless the parameter `callback` is `null`, then the attribute's value is returned.
 */
on_cue_change(callback: ((element: Element, cue: any) => void) | null): this | any {
	if (callback == null) { return this.oncuechange; }
	const e = this;
	this.oncuechange = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Duration Change
 * @desc: Script to be run when the length of the media changes. The equivalent of HTML attribute `ondurationchange`. 
 *        The first parameter of the callback is the `Element` object. 
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on duration change.
 *     @type: function
 * @return:
 *     @type: this | Function
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_duration_change(callback: (element: Element, time: Event) => void): this;
on_duration_change(callback: null): Function | this;
on_duration_change(callback?: (element: Element, time: Event) => void | null): this | Function {
	if (callback == null) { return this.ondurationchange; }
	const e = this;
	this.ondurationchange = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Emptied
 * @desc: Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects).
 *        The equivalent of HTML attribute `onemptied`. The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: callback
 *     @description: The callback function to execute when the event occurs.
 *     @type: function | null
 * @return:
 *     @type: this | Element
 *     @description: Returns the `Element` object. Unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_emptied(callback: ((element: Element, event: Event) => void) | null): this | Element {
	if (callback == null) { return this.onemptied; }
	const e = this;
	this.onemptied = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On ended
 * @desc: 
 *     Script to be run when the media has reach the end (a useful event for messages like "thanks for listening").
 *     The equivalent of HTML attribute `onended`.
 * @param:
 *     @name: callback
 *     @descr: The function to call when the media ends. Leave `null` to retrieve the current callback.
 *     @type: function | null
 * @return:
 *     @type: this | function
 *     @description Returns the instance of the element for chaining. Unless parameter `callback` is `null`, then the current callback function is returned.
 */
on_ended(): (e: Element, t: any) => void | null;
on_ended(callback: (e: Element, t: any) => void): this;
on_ended(callback?: (e: Element, t: any) => void | null): this | ((e: Element, t: any) => void) | null {
    if (callback == null) { return this.onended; }
    const e = this;
    this.onended = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Error
 * @desc: Script to be run when an error occurs while loading the file, similar to HTML's `onerror` attribute. 
 *        The first parameter of the callback is the `Element` object. Returns the attribute value if `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on error. It receives the `Element` object and the error event.
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | (Element | null)
 *     @description Returns the instance of the element for chaining, unless `callback` is `null`, then the current `onerror` attribute value is returned.
 */
on_error(callback: (element: Element, event: Event) => void): this;
on_error(callback: null): (Element | null);
on_error(callback?: (element: Element, event: Event) => void | null): this | (Element | null) {
    if (callback == null) { return this.onerror; }
    const e = this;
    this.onerror = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Loaded Data
 * @desc: Script to be run when media data is loaded. The equivalent of HTML attribute `onloadeddata`. 
 *        Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function that receives the `Element` object and the event.
 *     @type: function
 * @return:
 *     @type: this | Event
 *     @description Returns the `Element` object unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_loaded_data(callback: (element: Element, event: Event) => void): this;
on_loaded_data(callback: null): Event | null;
on_loaded_data(callback?: (element: Element, event: Event) => void | null): this | Event | null {
    if (callback == null) { return this.onloadeddata; }
    const e = this;
    this.onloadeddata = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On loaded metadata
 * @desc: Script to be run when meta data (like dimensions and duration) are loaded. 
 *        The equivalent of HTML attribute `onloadedmetadata`. 
 *        The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: callback
 *     @descr: A function to be executed when metadata is loaded.
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object. Unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_loaded_metadata(callback: (element: Element, event: Event) => void): this;
on_loaded_metadata(callback: null): any;
on_loaded_metadata(callback?: (element: Element, event: Event) => void | null): this | any {
	if (callback == null) { return this.onloadedmetadata; }
	const e = this;
	this.onloadedmetadata = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On load start
 * @desc: 
 *     Script to be run just as the file begins to load before anything is actually loaded.
 *     The equivalent of HTML attribute `onloadstart`.
 *     
 *     The first parameter of the callback is the `Element` object.
 *     
 *     Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: function | null
 * @return:
 *     @type: this | function | null
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_load_start(): ((t: Event) => void) | null;
on_load_start(callback: (element: Element, event: Event) => void): this;
on_load_start(callback?: (element: Element, event: Event) => void | null): this | ((t: Event) => void) | null {
	if (callback == null) { return this.onloadstart; }
	const e = this;
	this.onloadstart = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Pause
 * @desc: Script to be run when the media is paused either by the user or programmatically. The equivalent of HTML attribute `onpause`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when the media is paused. Leave `null` to retrieve the current attribute's value.
 *     @type: function | null
 * @return:
 *     @type: this | function
 *     @description Returns the instance of the element for chaining unless the parameter is `null`, then the current attribute's value is returned.
 */
on_pause(callback: ((element: Element, event: Event) => void) | null): this | ((element: Element, event: Event) => void) {
	if (callback == null) { return this.onpause; }
	const e = this;
	this.onpause = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Play
 * @desc: Script to be run when the media is ready to start playing. The equivalent of HTML attribute `onplay`. 
 *        The first parameter of the callback is the `Element` object. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to be executed when the media starts playing.
 *     @type: function | null
 * @return:
 *     @type: this | Function
 *     @description Returns the `Element` object. Unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_play(): Function;
on_play(callback: (element: Element, event: Event) => void): this;
on_play(callback?: (element: Element, event: Event) => void | null): Function | this {
    if (callback == null) { return this.onplay; }
    const e = this;
    this.onplay = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Playing
 * @desc: Script to be run when the media actually has started playing. This is the equivalent of the HTML attribute `onplaying`.
 * @param:
 *     @name: callback
 *     @descr: The function to execute when the media starts playing. It receives the `Element` object as the first parameter.
 *     @type: function | null
 * @return:
 *     @type: this | function
 *     @description Returns the instance of the element for chaining. If `null` is passed, it returns the current `onplaying` callback.
 */
on_playing(callback?: ((element: Element, time: any) => void) | null): this | ((element: Element, time: any) => void) | null {
    if (callback == null) { return this.onplaying; }
    const e = this;
    this.onplaying = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: Onprogress
 * @desc: 
 *     Script to be run when the browser is in the process of getting the media data.
 *     The equivalent of HTML attribute `onprogress`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The function to be executed when the media data is being loaded.
 *     @type: (element: Element, event: Event) => void
 * @return:
 *     @type: this | ((element: Element, event: Event) => void) | null
 *     @description Returns the `Element` object. Unless parameter `callback` is `null`, then the attribute's value is returned.
 */
onprogress(callback: ((element: Element, event: Event) => void) | null): this | ((element: Element, event: Event) => void) | null {
    if (callback == null) { return this.onprogress; }
    const e = this;
    this.onprogress = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Rate Change
 * @desc: Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode). 
 *        The equivalent of HTML attribute `onratechange`. Returns the attribute value when parameter `value` is `null`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on rate change.
 *     @type: function
 * @return:
 *     @type: this | Function
 *     @description Returns the `Element` object unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_rate_change(callback: (element: Element, rate: number) => void): this;
on_rate_change(callback?: null): Function | this;
on_rate_change(callback?: (element: Element, rate: number) => void | null): this | Function {
	if (callback == null) { return this.onratechange; }
	const e = this;
	this.onratechange = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On seeked
 * @desc: 
 *     Script to be run when the seeking attribute is set to false indicating that seeking has ended.
 *     The equivalent of HTML attribute `onseeked`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when seeking ends.
 *     @type: (element: Element, time: any) => void
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_seeked(callback: (element: Element, time: any) => void): this;
on_seeked(value: null): any;
on_seeked(value?: null | ((element: Element, time: any) => void)): this | any {
	if (value == null) { return this.onseeked; }
	const e = this;
	this.onseeked = (t) => value(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Seeking
 * @desc: Script to be run when the seeking attribute is set to true indicating that seeking is active. 
 *        The equivalent of HTML attribute `onseeking`. 
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when seeking occurs.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the instance of the element for chaining. Unless parameter `callback` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_seeking(): any;
on_seeking(callback: (element: Element, time: any) => void): this;
on_seeking(callback?: (element: Element, time: any) => void): any {
    if (callback == null) { return this.onseeking; }
    const e = this;
    this.onseeking = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Stalled
 * @desc: Script to be run when the browser is unable to fetch the media data for whatever reason. This is the equivalent of the HTML attribute `onstalled`. The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: value
 *     @description: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: function | null
 * @return:
 *     @type: this | function | null
 *     @description: Returns the `Element` object unless parameter `value` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_stalled(): (event: Event) => void | null;
on_stalled(callback: (element: Element, event: Event) => void): this;
on_stalled(callback?: (element: Element, event: Event) => void | null): this | ((event: Event) => void) | null {
	if (callback == null) { return this.onstalled; }
	const e = this;
	this.onstalled = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Suspend
 * @desc: Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason. The equivalent of HTML attribute `onsuspend`.
 * @param:
 *     @name: callback
 *     @descr: The function to be executed when the suspend event occurs. The first parameter of the callback is the `Element` object.
 *     @type: Function | null
 * @return:
 *     @type: this | Function
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_suspend(callback: Function | null): this;
on_suspend(): Function | null;
on_suspend(callback?: Function): this | Function | null {
	if (callback == null) { return this.onsuspend; }
	const e = this;
	this.onsuspend = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Time Update
 * @desc: Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media). The equivalent of HTML attribute `ontimeupdate`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when the time updates. The first parameter of the callback is the `Element` object.
 *     @type: function
 * @return:
 *     @type: this | Function
 *     @description Returns the `Element` object. Unless parameter `callback` is `null`, then the attribute's value is returned.
 */
on_time_update(callback: (element: Element, time: number) => void): this;
on_time_update(callback: null): Function | this;
on_time_update(callback?: (element: Element, time: number) => void | null): this | Function {
	if (callback == null) { return this.ontimeupdate; }
	const e = this;
	this.ontimeupdate = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On Volume Change
 * @desc: Script to be run each time the volume is changed which includes setting the volume to "mute". 
 *        The equivalent of HTML attribute `onvolumechange`. The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute on volume change.
 *     @type: function | null
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object for chaining unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_volume_change(callback: ((element: Element, event: Event) => void) | null): this | any {
    if (callback == null) { return this.onvolumechange; }
    const e = this;
    this.onvolumechange = (t) => callback(e, t);
    return this;
}

/**
 * @docs:
 * @title: On Waiting
 * @desc: Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data). The equivalent of HTML attribute `onwaiting`.
 * @param:
 *     @name: callback
 *     @descr: The callback function to execute when the media is waiting.
 *     @type: function
 * @return:
 *     @type: this | any
 *     @description Returns the `Element` object unless parameter `callback` is `null`, then the attribute's value is returned.
 * @funcs: 2
 */
on_waiting(): any;
on_waiting(callback: (element: Element, time: any) => void): this;
on_waiting(callback?: (element: Element, time: any) => void): this | any {
	if (callback == null) { return this.onwaiting; }
	const e = this;
	this.onwaiting = (t) => callback(e, t);
	return this;
}

/**
 * @docs:
 * @title: On toggle
 * @desc: Fires when the user opens or closes the <details> element. 
 *        The equivalent of HTML attribute `ontoggle`. 
 *        The first parameter of the callback is the `Element` object.
 * @param:
 *     @name: value
 *     @descr: The value to assign. Leave `null` to retrieve the attribute's value.
 *     @type: function | null
 * @return:
 *     @type: this | function
 *     @description Returns the `Element` object. Unless parameter `value` is `null`, then the attribute's value is returned.
 */
on_toggle(callback: ((element: Element, toggle: Event) => void) | null): this | ((element: Element, toggle: Event) => void) {
    if (callback == null) { return this.ontoggle; }
    const e = this;
    this.ontoggle = (t) => callback(e, t);
    return this;
}
