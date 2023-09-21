/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Scroller.
// - Warning: Setting padding on element attribute "content" may cause undefined behaviour.
@vweb_constructor_wrapper
@vweb_register_element
class ScrollerElement extends CreateVElementClass({
    type: "Scoller",
    tag: "div",
    default_style: {
        "position": "relative", // is required for attribute "track" 
        "margin": "0px",
        "padding": "0px",
        // "clear": "both",
        "display": "flex", // to support vertical spacers.
        "overflow": "hidden",
        // "flex": "1", // disabled to support horizontal spacers in VStacks.
        "align-content": "flex-start", // align items at start, do not stretch / space when inside HStack.
        "flex-direction": "column",
        // "text-align": "start",
        "scroll-behavior": "smooth",
        "overscroll-behavior": "none", // disable bounces.
        "height": "fit-content", // set height to max compared to parents non overflow, so scrolling can take effect.
        "content-visibility": "auto", // improve rendering.
        "align-content": "flex-start", // align items at start, do not stretch / space when inside HStack.
        "align-items": "flex-start", // align items at start, do not stretch / space when inside HStack.

    },
}) {
    
    // Constructor.
    constructor(...children) {
        
        // Initialize base class.
        super();

        // Style.
        if (this.position() != "absolute") {
            this.position("relative"); // is required for attribute "track" 
        }
        super.overflow("hidden"); // should always be hidden to enable scrolling, and otherwise the thumb not be visible due to overflow width.
        this.styles({
            "content-visibility": "auto",
        })

        // Content.
        this.content = VStack(...children)
            .class("hide_scrollbar")
            .parent(this)
            .position("relative") // in case it has absolute children that should scroll, otherwise the content wont scroll without "relative".
            .frame("100%", "100%")
            .flex("1 1 0") // otherwise it expands its parent.
            .overflow("scroll")
            .styles({
                "content-visibility": "auto",
            })

        // Scroll bar.
        this.thumb = VStack()
            .parent(this)
            .position(0, 0, null, 0)
            .height(30)
            .border_radius(10)
            .overflow("visible") // for thumb shadow.
            .background_color("#CCCCCC")
            .opacity(0)
            .transition("opacity 0.3s linear")
            .box_shadow("0px 0px 5px #00000020")
        this.track = VStack(this.thumb)
            .parent(this)
            .position(5, 5, 5, null)
            .width(10)
            .background_color("transparent")
            .border_radius(10)
            .transition("background-color 0.3s linear")
            .assign("background_value", "#28292E")
            .overflow("visible")

        // Add children.
        super.append(this.content, this.track);

        // Keep append as raw.
        this.raw_append = super.append;

        // Set default delay.
        this.m_delay = 1000;

        // Overwrite track background functions to keep the background color.
        this.track.__background__ = this.track.background;
        this.track.__background_color__ = this.background_color;
        this.track.background = function(value) {
            if (value != null) {
                this.__background_value__ = value;
            }
            return this;
        }
        this.track.background_color = function(value) {
            if (value != null) {
                this.__background_value__ = value;
            }
            return this;
        }

        // Mouse enter event.
        this.track.addEventListener("mouseenter", (event) => {
            if (!this.is_scrollable()) {
                return null;
            }
            this.track.style.backgroundColor = this.track.__background_value__;
            clearTimeout(this.fadeout_timeout);
            this.thumb.style.opacity = 1; // keep as opacity for box shadow.
        })

        // Mouse leave event.
        this.track.addEventListener("mouseleave", (event) => {
            if (!this.is_scrollable()) {
                return null;
            }
            if (!this.thumb.dragging) {
                this.track.style.backgroundColor = "transparent";
                this.thumb.style.opacity = 0; // keep as opacity for box shadow.
            }
        })

        // Scroll event.
        this.content.addEventListener("scroll", (event) => {

            // Calculate thumb offset.
            const height = this.content.clientHeight; 
            const relative_height = this.track.clientHeight; //this.content.clientHeight;
            const thumb_height = this.thumb.clientHeight;
            const scroll_height = this.content.scrollHeight;
            const scroll_top = this.content.scrollTop;
            let relative_top;
            if (scroll_top >= scroll_height - height) {
                relative_top = relative_height - thumb_height;
            } else {
                relative_top = relative_height * (scroll_top / (scroll_height - height)) - thumb_height / 2;
                if (relative_top + thumb_height >= relative_height) {
                    relative_top = relative_height - thumb_height - 3;
                }
            }
            if (relative_top < 0) {
                relative_top = 0;
            }
            this.thumb.style.transform = `translateY(${relative_top}px)`;

            // Fade in.
            // this.track.style.backgroundColor = this.track.__background_value__;
            clearTimeout(this.fadeout_timeout);
            this.thumb.style.opacity = 1;

            // Fade out.
            clearTimeout(this.fadeout_timeout);
            this.fadeout_timeout = setTimeout(() => {
                this.track.style.backgroundColor = "transparent"; // also hide track so that when the user drags the thumb and the track becomes visible, the track and the thumb fade out simultaneously when the dragging ends.
                this.thumb.style.opacity = 0;
            }, this.m_delay)
        })

        // Set scroll by dragging thumb.
        let start_y, old_user_select;
        const mouse_up_handler = (event) => {

            // No longer dragging.
            this.thumb.dragging = false;

            // Restore user select.
            this.style.userSelect = old_user_select;

            // Remove handler.
            document.body.removeEventListener("mouseup", mouse_up_handler);

        };
        this.thumb.onmousedown = (event) => {

            // Not scrollable.
            if (!this.is_scrollable()) {
                return null;
            }

            // Set start y.
            start_y = this.content.getBoundingClientRect().top;

            // Set user select.
            // Should be set on "this" on "this.content" does not work correctly.
            old_user_select = this.content.style.userSelect;
            this.style.userSelect = "none";

            // Set dragging.
            this.thumb.dragging = true;

            // Show track.
            this.track.style.backgroundColor = this.track.__background_value__;
            clearTimeout(this.fadeout_timeout);
            this.thumb.style.opacity = 1; // keep as opacity for box shadow.

            // Add mouse up handler to body.
            document.body.addEventListener("mouseup", mouse_up_handler);

        }
        this.addEventListener("mousemove", (event) => {
            if (this.thumb.dragging) {

                // Vars.
                const y = Math.max(0, event.clientY - start_y);
                let y_percentage = utils.round(y / this.content.clientHeight, 2); // needs to be rounder otherwise it always remains at 0.9999 and never reaches the end. 
                const computed = window.getComputedStyle(this.content);
                const max_scroll_top = (
                    this.content.scrollHeight - 
                    this.content.clientHeight + 
                    parseFloat(computed.paddingTop) + 
                    parseFloat(computed.paddingBottom)
                );
                const scroll_top = Math.round(max_scroll_top * y_percentage);

                // Set the scroll top.
                this.content.scrollTop = scroll_top; // triggers on scroll which updates the thumb top.

            }
        });

        // Scroll by clicking on the track.
        this.track.onclick = (event) => {

            // Not scrollable.
            if (!this.is_scrollable()) {
                return null;
            }

            // Vars.
            const start_y = this.content.getBoundingClientRect().top;
            const y = Math.max(0, event.clientY - start_y);
            let y_percentage = utils.round(y / this.content.clientHeight, 2); // needs to be rounder otherwise it always remains at 0.9999 and never reaches the end. 
            const computed = window.getComputedStyle(this.content);
            const max_scroll_top = (
                this.content.scrollHeight - 
                this.content.clientHeight + 
                parseFloat(computed.paddingTop) + 
                parseFloat(computed.paddingBottom)
            );
            const scroll_top = Math.round(max_scroll_top * y_percentage);

            // Set the scroll top.
            this.content.scrollTop = scroll_top; // triggers on scroll which updates the thumb top.
        };

    }

    // Is scrollable.
    is_scrollable() {
        return this.content.scrollHeight > this.content.clientHeight || this.content.scrollWidth > this.content.clientWidth;
    }

    // Set remove children to content.
    remove_children() {
        this.content.remove_children();
        return this;
    }

    // By default append items to the content.
    append(...children) {
        this.content.append(...children);
        return this;
    }

    // Replace overflow.
    overflow(value) {
        if (value == null) {
            return this.content.overflow();
        }
        this.content.overflow(value);
        return this;
    }
    overflow_x(value) {
        if (value == null) {
            return this.content.overflow_x();
        }
        this.content.overflow_x(value);
        return this;
    }
    overflow_y(value) {
        if (value == null) {
            return this.content.overflow_y();
        }
        this.content.overflow_y(value);
        return this;
    }

    // Set the opactiy delay when finished scrolling.
    delay(msec) {
        if (msec == null) {
            return this.m_delay;
        }
        this.m_delay = msec;
        return this;
    }

    // Get the scroll top.
    scroll_top(value) {
        if (value == null) {
            return this.content.scrollTop;
        }
        this.content.scrollTop = value;
        return this;
    }

    // Get the scroll left.
    scroll_left(value) {
        if (value == null) {
            return this.content.scrollLeft;
        }
        this.content.scrollLeft = value;
        return this;
    }

    // Get the scroll height.
    scroll_height() {
        return this.content.scrollHeight;
    }

    // Get the scroll width.
    scroll_width() {
        return this.content.scrollWidth;
    }

    // Add a on scroll event.
    on_scroll(handler) {
        this.content.addEventListener("scroll", handler);
        return this;
    }
    remove_on_scroll(handler) {
        this.content.removeEventListener("scroll", handler);
        return this;
    }

    // Small wrapper to set scroll top without triggering a certain on scroll handler.
    set_scroll_top_without_event(top, handler) {
        this.remove_on_scroll(handler);
        this.scroll_top(top);
        this.on_scroll(handler);
    }

    // Small wrapper to set scroll left without triggering a certain on scroll handler.
    set_scroll_left_without_event(left, handler) {
        this.remove_on_scroll(handler);
        this.scroll_left(left);
        this.on_scroll(handler);
    }

    // Small wrapper to set scroll top / left without triggering a certain on scroll handler.
    set_scroll_position_without_event(top = null, left = null, handler) {
        this.remove_on_scroll(handler);
        if (top != null) {
            this.scroll_top(top);
        }
        if (left != null) {
            this.scroll_left(left);
        }
        this.on_scroll(handler);
    }
    
}

// Scroller.
/*  @docs: {
    @title: Virtual Scroller
    @description: 
        The virtual scroller element.

        Can be initialed with function `VirtualScroller()`.
    
        After appending children you should call `render()` otherwise the children will only show up after a scroll event.

        The virtual scroller can work in two ways. 
         1) You must set a fixed height for every direct child.
         2) You call the member function `update_heights()` after any height involving edits are made and before you call member function `render()` for the first time.
    @warning: 
        1) Using content-visibility on the direct or nested children may cause undefined behaviour, it may cause elements to become hidden.
        2) Every element must have a fixed height, Unless you use `update_heights()`. Otherwise the rendering will throw an error. Any incorrect heights may cause undefined behaviour.
        3) Setting padding on element attribute "content" may cause undefined behaviour.
    @parameter: {
        @name: children
        @description: The elements children.
        @type: array[Node]
    }
 } */
@vweb_constructor_wrapper
@vweb_register_element
class VirtualScrollerElement extends ScrollerElement {
    
    // Constructor.
    constructor(...children) {
        
        // Initialize base class.
        super();

        // Virtual children.
        this.v_children = [];

        // Attributes.
        this.top_diff = 0;
        this.scroll_top_value = 0;
        this.last_v_children = 0;

        // Append children.
        this.append(...children);

        // The visible container with the scroll dimensions and positioned children inside.
        this.visible_container = VStack()
            .position("relative")
            .overflow_x("visible")
            .overflow_y("hidden")
            .styles({
                "content-visibility": "auto",
            })
        this.content.append(this.visible_container)

        // The height measurer.
        this.height_measurer = Span()
            .visibility("hidden")
        this.content.append(this.height_measurer)

        // Render.
        this.render(true);

        // Set scroll event listener.
        // @todo set_scroll_top_without event wont work with this new scroll event.
        this.content.addEventListener("scroll", () => this.render())

    }

    // Replace overflow.
    overflow(value) {
        if (value == null) {
            return this.content.overflow();
        }
        this.content.overflow(value);
        this.visible_container.overflow_x(value.split(" ")[0]);
        return this;
    }
    overflow_x(value) {
        if (value == null) {
            return this.content.overflow_x();
        }
        this.content.overflow_x(value);
        this.visible_container.overflow_x(value);
        return this;
    }
    // keep overflow y on this.visible_container always hidden otherwise it may mess with expanding this.content and cause an infinite scroll event.

    // Set remove children to content.
    remove_children() {
        this.v_children = [];
        this.visible_container.min_height(0);
        this.visible_container.max_height(0);
        this.visible_container.inner_html("");
        return this;
    }

    // Render the visible content.
    render() {
        // Do not use a clearTimeout setTimout structure cause that will cause some elements to be appended too late on a very fast sroll.

        // Get scroll direction.
        const last_scroll_top = this.scroll_top_value;
        this.scroll_top_value = this.content.scrollTop;
        const last_v_children = this.last_v_children;
        this.last_v_children = this.v_children.length;
        let scrolling_down = true;
        if (this.scroll_top_value > last_scroll_top) {
            scrolling_down = true;
        } else if (this.scroll_top_value < last_scroll_top) {
            scrolling_down = false;
        }
        // Disable forced behaviour because when height edits are made it should also be updated, but this is easily forgotten by the user.
        // else if (!forced && this.last_v_children == last_v_children) {
        //     return null; // horizontal scroll.
        // }

        // Get the start and end y.
        const start_y = this.content.scrollTop;
        const end_y = start_y + this.content.offsetHeight + this.top_diff;

        // Iterate.
        let is_first = true;
        let is_visible = false; 
        let total_height = 0;
        let visible_height = 0;
        this.v_children.iterate((child) => {

            // Child vars.
            const height = child.v_height !== undefined ? child.v_height : this.get_height(child);
            if (height == 0) {
                return null; // no fixed height or no height.
            }
            const child_start_y = total_height;
            const child_end_y = total_height + height; // Adjust as needed
            total_height += height;

            // First item.
            if (is_first && child_end_y >= start_y) {
                child.transform(`translateY(${child_start_y}px)`); // also update when still visible but height changes may have been made to an element.
                visible_height += height;
                is_first = false;
                is_visible = true;
                if (!child.rendered) {
                    if (scrolling_down) {
                        this.visible_container.appendChild(child);
                    } else {
                        this.visible_container.insertBefore(child, this.visible_container.firstChild);
                    }
                    child.rendered = true;
                }
            }

            // Last visible element.
            else if (is_visible && child_start_y >= end_y) {
                child.transform(`translateY(${child_start_y - visible_height}px)`); // also update when still visible but height changes may have been made to an element.
                visible_height += height;
                is_visible = false;
                if (!child.rendered) {
                    if (scrolling_down) {
                        this.visible_container.appendChild(child);
                    } else {
                        this.visible_container.insertBefore(child, this.visible_container.firstChild);
                    }
                    child.rendered = true;
                }
            }

            // Visible elements.
            else if (is_visible) {
                child.transform(`translateY(${child_start_y - visible_height}px)`); // also update when still visible but height changes may have been made to an element.
                visible_height += height;
                if (!child.rendered) {
                    if (scrolling_down) {
                        this.visible_container.appendChild(child);
                    } else {
                        this.visible_container.insertBefore(child, this.visible_container.firstChild);
                    }
                    child.rendered = true;
                }
            }

            // Invisible elements.
            else if (child.rendered) {
                child.remove();
                child.rendered = false;
            }
        })

        // Set scroll dimension.
        this.visible_container.min_height(total_height);
        this.visible_container.max_height(total_height);

        // Return this.
        return this;
    }

    // Update heights.
    update_heights() {
        this.v_children.iterate((child) => {
            child.v_height = this.get_height(child, false);
        })
    }

    // Update height of a certain child.
    update_height(child) {
        child.v_height = this.get_height(child, false);
    }

    // Get the height of an element.
    get_height(element, fixed = true) {
        let height;

        // Get fixed height.
        if (fixed) {
            height = parseFloat(element.style.height);
            if (isNaN(height)) {
                console.error("Every element in the virtual scroller must have a fixed height, ignoring element: " + element);
                element.style.display = "none";
                return 0;
            }
        }

        // Append to document and get height.
        // Does not require fixed heights but is slow.
        else {
            element.rendered = false; // set rendered to false because this will remove the child from this.visible_container when it was rendered.
            this.height_measurer.appendChild(element);
            height = element.offsetHeight;
            this.height_measurer.removeChild(element);
        }

        // Add margin.
        const margin_top = parseFloat(element.style.marginTop);
        if (!isNaN(margin_top)) {
            height += margin_top;
        }
        const margin_bottom = parseFloat(element.style.marginBottom);
        if (!isNaN(margin_bottom)) {
            height += margin_bottom;
        }

        // Handler.
        return height;
    }

    // Custom append function.
    append(...children) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child != null) {

                // VWeb element.
                if (child.element_type != null) {
                    if (
                        child.element_type == "ForEach" ||
                        child.element_type == "If" ||
                        child.element_type == "IfDeviceWith"
                    ) {
                        child.append_children_to(this);
                    } else {
                        this.v_children.push(child);
                    }
                }

                // Execute function.
                else if (vweb.utils.is_func(child)) {
                    this.append(child());
                }

                // Node element.
                else if (child instanceof Node) {
                    this.v_children.push(child);
                }

                // Append text.
                else if (vweb.utils.is_string(child)) {
                    this.v_children.push(document.createTextNode(child));   
                }
            }
        }
        return this;
    }
}