/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2024 Daan van den Bergh.
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// Imports.
import { Elements } from "../modules/elements";
import { Utils } from "../modules/utils";
import { Payments } from "../modules/paddle";
import { CreateVElementClass } from "./element";
// Extended input.
let RefundViewElement = (() => {
    var _a;
    let _classDecorators = [(_a = Elements).register.bind(_a)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = VStackElement;
    var RefundViewElement = _classThis = class extends _classSuper {
        // Constructor.
        constructor({ green = "green", red = "red", bg = "white", sub_bg = "gray", title_fg = "black", text_fg = "black", subtext_fg = "#6D6E77", theme_fg = "blue", theme_gradient = null, border_radius = 10, check_image = "/static/icons/check.sign.png", error_image = "/static/icons/warning.white.png", no_refundable_payments_image = "/static/icons/sad.png", auto_advance = true, // the `auto_advance` param for `Payments.create_refund()`.
         } = {}) {
            // Initialize super.
            super();
            // Attributes.
            this.element_type = "RefundView";
            // Set default styling.
            this.styles(ExtendedInputElement.default_style);
            // Args.
            if (theme_gradient == null) {
                theme_gradient = theme_fg;
            }
            // ---------------------------------------------------------
            // Attributes.
            this.all_payments = [];
            const _this_ = this;
            // ---------------------------------------------------------
            // Styling.
            this.width("100%");
            // ---------------------------------------------------------
            // Wrapper funcs.
            // Widget.
            function Widget(...children) {
                return VStack(...children)
                    .background(bg)
                    .padding(25)
                    .border_radius(border_radius)
                    .stretch(true);
            }
            // Widget Title.
            function WidgetTitle(text) {
                return Title(text)
                    .color(title_fg)
                    .font_size(20)
                    .flex_shrink(0)
                    .margin(0, 0, 5, 0)
                    .padding(0)
                    .wrap(false)
                    .overflow("hidden")
                    .text_overflow("ellipsis");
            }
            // Widget Text.
            function WidgetText(text) {
                return Text(text)
                    .color(text_fg)
                    .font_size(16)
                    .line_height(18)
                    .flex_shrink(0)
                    .margin(0, 0, 5, 0)
                    .padding(0)
                    .wrap(true);
            }
            // Circled Image.
            function CircledImage(src, background = green) {
                return ImageMask(src)
                    .padding(7.5)
                    .frame(30, 30)
                    .mask_color(bg)
                    .background(background)
                    .border_radius("50%");
            }
            // ---------------------------------------------------------
            // The refund view.
            this.menu_buttons = [];
            this.payments = Widget(HStack(ForEach([
                "Refundable",
                "Refunded",
                // "Request Refund"
            ], (item, index) => {
                const id = item.toLowerCase().replace(" ", "_");
                return VStack(WidgetText(item)
                    .id(id)
                    .font_size(12)
                    .color(index === 0 ? theme_gradient : title_fg)
                    // .text_decoration(index === 0 ? "underline" : "none")
                    // .text_decoration_color(index === 0 ? theme_fg : "none")
                    .padding(0)
                    .margin(0)
                    .exec((element) => {
                    _this_.menu_buttons.push(element);
                }))
                    .margin_right(15)
                    .border_radius(25)
                    .background(sub_bg)
                    .padding(5, 10)
                    .on_click(() => {
                    _this_.payments.show_view(id);
                });
            }))
                .margin_bottom(15), WidgetTitle("Refundable Payments")
                .margin(0)
                .assign_to_parent_as("title"), Divider()
                .margin(25, 0, 25, 0), 
            // Processing.
            VStack(WidgetTitle("Processing")
                .font_size(18), WidgetText("Retrieving all refundable payments, please wait.")
                .font_size(14)
                .margin(0, 0, 0, 0)
                .center(), RingLoader()
                .background(theme_fg)
                .frame(30, 30)
                .update()
                .margin_top(20))
                // .hide()
                .padding(10, 0, 10, 0)
                .center()
                .center_vertical()
                .frame("100%", "100%")
                .assign_to_parent_as("processing"), 
            // Processing.
            VStack(WidgetTitle("Error")
                .font_size(18), WidgetText("Encountered an error while retrieving the refundable payments.")
                .font_size(14)
                .margin(0, 0, 0, 0)
                .center(), CircledImage(error_image, red)
                .margin_top(20))
                .hide()
                .center()
                .center_vertical()
                .frame("100%", "100%")
                .assign_to_parent_as("error"), 
            // List refundable.
            VStack()
                .hide()
                .assign_to_parent_as("refundable")
                .extend({
                render: function () {
                    // Reset.
                    this.inner_html("");
                    // Add payments.
                    let index = 0;
                    let count = 0;
                    let last_divider;
                    _this_.all_payments.iterate((item) => {
                        if (item.refund != null) {
                            return null;
                        }
                        ++count;
                        const currency_symbol = Payments.get_currency_symbol(item.product.currency);
                        const error_element = WidgetText("Some error has occurred.")
                            .hide()
                            .margin_top(10)
                            .font_size(16)
                            .color(red)
                            .opacity(0)
                            .transition("opacity 0.2s ease-in-out")
                            .extend({
                            popup: function (text) {
                                if (text instanceof Error) {
                                    text = text.message;
                                }
                                else if (typeof text === "object" && text.error) {
                                    text = text.error;
                                }
                                this.text(text);
                                this.show();
                                setTimeout(() => this.opacity(1), 10);
                                return this;
                            },
                        });
                        this.append(HStack(item.product.icon == null ? null :
                            Image(item.product.icon)
                                .frame(30, 30)
                                .flex_shrink(0)
                                .margin(0, 25, 0, 0), VStack(WidgetTitle(item.product.name)
                            .font_size(16)
                            .margin(0, 10, 0, 0), WidgetText(item.product.description)
                            .color(subtext_fg)
                            .font_size(14)
                            .line_height(16)
                            .margin(10, 10, 0, 0)
                            .wrap(true)
                            .padding(0), WidgetText(`Quantity: ${item.quantity}`)
                            .color(subtext_fg)
                            .font_size(14)
                            .margin(0)
                            .margin_top(10)
                            .padding(0)
                            .flex_shrink(0)
                            .wrap(true), WidgetText(`Purchased at ${Utils.unix_to_date(item.timestamp)}.`)
                            .color(subtext_fg)
                            .font_size(14)
                            .margin(0)
                            .margin_top(10)
                            .padding(0)
                            .flex_shrink(0)
                            .wrap(true), error_element)
                            .stretch(true), VStack(VStack(WidgetTitle(`${currency_symbol} ${item.amount.toFixed(2)}`)
                            .font_size(16)
                            .margin(0)
                            .padding(0), WidgetText(`${currency_symbol} ${item.product.price} per item`)
                            .color(subtext_fg)
                            .font_size(12)
                            .margin(5, 0, 0, 0)
                            .padding(0)
                            .flex_shrink(0)
                            .wrap(false)
                            .overflow("hidden")
                            .text_overflow("ellipsis"))
                            .leading(), LoaderButton("Refund")
                            .max_width(120)
                            .width("100%")
                            .margin_top(20)
                            .padding(7.5, 15, 7.5, 15)
                            .font_size(14)
                            .loader
                            .frame(18, 18)
                            .update()
                            .parent()
                            .on_click((element) => {
                            console.log(item);
                            element.show_loader();
                            Payments.create_refund({ payment: item, auto_advance: auto_advance })
                                .then((response) => {
                                _this_.payments.render("refunded")
                                    .then(() => element.hide_loader())
                                    .catch(() => element.hide_loader());
                            }).catch((error) => {
                                error_element.popup(error);
                                element.hide_loader();
                            });
                        }))
                            .center()
                            .min_width(120)
                            .max_width(120)
                            .height("100%"))
                            .width("100%"), (last_divider = Divider()
                            .margin(20, 0, 20, 0)));
                        ++index;
                    });
                    if (last_divider != null) {
                        last_divider.remove();
                    }
                    // No payments.
                    if (count === 0) {
                        this.inner_html("");
                        this.append(VStack(WidgetTitle("No Refundable Payments")
                            .font_size(18), WidgetText("Unfortunately no refundable payments were found.")
                            // .color("#6D6E77")
                            .font_size(14)
                            .margin(0, 0, 0, 0)
                            .center(), CircledImage(no_refundable_payments_image, red)
                            .margin_top(20))
                            .padding(12.5, 0, 12.5, 0)
                            .center()
                            .center_vertical()
                            .frame("100%", "100%"));
                    }
                    // Handler.
                    return this;
                },
            }), 
            // List refunded.
            VStack()
                .hide()
                .assign_to_parent_as("refunded")
                .extend({
                render: function () {
                    /// Reset.
                    this.inner_html("");
                    // Add payments.
                    let index = 0;
                    let count = 0;
                    let last_divider;
                    _this_.all_payments.iterate((item) => {
                        if (item.refund == null) {
                            return null;
                        }
                        ++count;
                        const currency_symbol = Payments.get_currency_symbol(item.product.currency);
                        // Create refund info.
                        let refund_status, refund_failure;
                        switch (item.refund.status) {
                            case "succeeded":
                                refund_status = VStack(HStack(WidgetTitle("Refunded")
                                    .font_size(15)
                                    .margin(0), CircledImage(check_image, green)
                                    .frame(17.5, 17.5)
                                    .padding(4)
                                    .margin(0, 0, 0, 10))
                                    .center_vertical(), WidgetText(item.refund.description)
                                    .font_style("italic")
                                    .color(subtext_fg)
                                    .font_size(14)
                                    .line_height(14)
                                    .margin_top(10)
                                    .wrap(true))
                                    .center_vertical();
                                break;
                            case "canceled":
                                refund_status = VStack(HStack(WidgetTitle("Cancelled")
                                    .font_size(15)
                                    .margin(0), CircledImage(check_image, green)
                                    .frame(17.5, 17.5)
                                    .padding(4)
                                    .margin(0, 0, 0, 10))
                                    .center_vertical(), WidgetText(item.refund.description)
                                    .font_style("italic")
                                    .color(subtext_fg)
                                    .font_size(14)
                                    .line_height(14)
                                    .margin_top(10)
                                    .wrap(true))
                                    .center_vertical();
                                break;
                            case "processing":
                                refund_status = VStack(HStack(WidgetTitle("Processing")
                                    .font_size(15)
                                    .margin(0), RingLoader()
                                    .background(theme_fg)
                                    .frame(17.5, 17.5)
                                    .update()
                                    .margin_left(10))
                                    .center_vertical(), WidgetText(item.refund.description)
                                    .font_style("italic")
                                    .color(subtext_fg)
                                    .font_size(14)
                                    .line_height(14)
                                    .margin_top(10)
                                    .wrap(true))
                                    .center_vertical();
                                break;
                            case "failed":
                                refund_status = VStack(HStack(WidgetTitle("Failed")
                                    .font_size(15)
                                    .margin(0), CircledImage(error_image, red)
                                    .frame(17.5, 17.5)
                                    .padding(4)
                                    .margin(0, 0, 0, 10))
                                    .center_vertical(), WidgetText(item.refund.description)
                                    .font_style("italic")
                                    .color(subtext_fg)
                                    .font_size(14)
                                    .line_height(14)
                                    .margin_top(10)
                                    .wrap(true));
                                break;
                            case "requires_action":
                                refund_status = VStack(HStack(WidgetTitle("Requires Action")
                                    .font_size(15)
                                    .margin(0), CircledImage(error_image, red)
                                    .frame(17.5, 17.5)
                                    .padding(4)
                                    .margin(0, 0, 0, 10))
                                    .center_vertical(), WidgetText(item.refund.description)
                                    .font_style("italic")
                                    .color(subtext_fg)
                                    .font_size(14)
                                    .line_height(14)
                                    .margin_top(10)
                                    .wrap(true));
                                break;
                            default:
                                console.error("Unknown refund status: " + item.refund.status);
                                break;
                        }
                        // Append.
                        this.append(HStack(item.product.icon == null ? null :
                            Image(item.product.icon)
                                .frame(30, 30)
                                .flex_shrink(0)
                                .margin(0, 25, 0, 0), VStack(WidgetTitle(item.product.name)
                            .font_size(18)
                            .margin(0, 10, 0, 0), WidgetText(item.product.description)
                            .color(subtext_fg)
                            .font_size(14)
                            .line_height(16)
                            .margin(10, 10, 0, 0)
                            .wrap(true)
                            .padding(0), WidgetText(`Purchased at ${Utils.unix_to_date(item.timestamp)}.`)
                            .color(subtext_fg)
                            .font_size(14)
                            .margin(10, 0, 0, 0)
                            .padding(0)
                            .flex_shrink(0)
                            .wrap(true), refund_status
                            .margin_top(20))
                            .stretch(true), VStack(WidgetTitle(`${currency_symbol} ${item.amount.toFixed(2)}`)
                            .font_size(16)
                            .margin(0)
                            .padding(0), WidgetText(`${currency_symbol} ${item.product.price} per item`)
                            .color(subtext_fg)
                            .font_size(12)
                            .margin(5, 0, 0, 0)
                            .padding(0)
                            .flex_shrink(0)
                            .wrap(false)
                            .overflow("hidden")
                            .text_overflow("ellipsis")))
                            .width("100%"), (last_divider = Divider()
                            .margin(20, 0, 20, 0)));
                        ++index;
                    });
                    if (last_divider != null) {
                        last_divider.remove();
                    }
                    // No payments.
                    if (count === 0) {
                        this.inner_html("");
                        this.append(VStack(WidgetTitle("No Refunded Payments")
                            .font_size(18), WidgetText("No refunded payments were found.")
                            // .color("#6D6E77")
                            .font_size(14)
                            .margin(0, 0, 0, 0)
                            .center())
                            .padding(25, 0, 25, 0)
                            .center()
                            .center_vertical()
                            .frame("100%", "100%"));
                    }
                    // Handler.
                    return this;
                },
            }))
                .parent(this)
                .width("100%")
                .extend({
                show_view: function (id) {
                    const views = {
                        "processing": "Refundable Payments",
                        "error": "Refundable Payments",
                        "refundable": "Refundable Payments",
                        "refunded": "Refunded Payments",
                        // "request_refund": "Request Refund"
                    };
                    Object.keys(views).iterate((key) => {
                        if (key === id) {
                            this[key].show();
                            this.title.text(views[key]);
                        }
                        else {
                            this[key].hide();
                        }
                    });
                    _this_.menu_buttons.iterate((element) => {
                        if (element.id() === id) {
                            element.color(theme_gradient);
                            // element.text_decoration("underline")
                            // element.text_decoration_color(theme_fg)
                        }
                        else {
                            element.color(title_fg);
                            // element.text_decoration("none")
                            // element.text_decoration_color("none")
                        }
                    });
                },
                render: async function (show_view = "refundable") {
                    return new Promise((resolve) => {
                        // Fetch the refundable products.
                        Payments.get_refundable_payments()
                            .then((payments) => {
                            // Assign all payments.
                            _this_.all_payments = payments;
                            // Render.
                            this.refundable.render();
                            this.refunded.render();
                            // this.payments.request_refund.render();
                            // Show first view.
                            this.show_view(show_view);
                            resolve();
                        })
                            .catch((error) => {
                            console.error(error);
                            this.show_view("error");
                            resolve();
                        });
                    });
                }
            });
            // Render.
            this.payments.render();
            // ---------------------------------------------------------
            // Append.
            // Append.
            this.append(this.menu, this.payments);
        }
        // Set default since it inherits an element.
        set_default() {
            return super.set_default(ExtendedInputElement);
        }
    };
    __setFunctionName(_classThis, "RefundViewElement");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RefundViewElement = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    // Default styling.
    _classThis.default_style = {
        ...VStackElement.default_style,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RefundViewElement = _classThis;
})();
export { RefundViewElement };
export const RefundView = Elements.wrapper(RefundViewElement);
