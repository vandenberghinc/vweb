/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
let VWEB_ALL_ELEMENTS = [];
class Element {
constructor(type, tag) {
this.element_type = type;
this.element_tag = tag;
this.element_display = "block";
this.element = document.createElement(this.element_tag);
VWEB_ALL_ELEMENTS.push(this);
}
pad_numeric(value, padding = "px") {
if (utils.is_numeric(value)) {
return value + padding;
}
return value;
}
pad_percentage(value, padding = "%") {
if (utils.is_float(value) && value < 1.0) {
return (value * 100) + padding;
} else if (utils.is_numeric(value)) {
return value + padding;
}
return value;
}
edit_filter_wrapper(filter, type, to = null) {
 const pattern = new RegExp(`${type}\\([^)]*\\)\\s*`, "g");
 if (pattern.test(filter)) {
 if (to == null) {
return filter.replace(pattern, "");
 } else {
 return filter.replace(pattern, to);
 }
 } else if (to != null) {
 return `${filter} ${to}`;
 }
return value;
}
toggle_filter_wrapper(filter, type, to = null) {
 const pattern = new RegExp(`${type}\\([^)]*\\)\\s*`, "g");
 if (pattern.test(filter)) {
 return filter.replace(pattern, "");
 } else if (to != null) {
 return `${filter} ${to}`;
 }
return value;
}
append(...children) {
if (children.length === 0) {
return this;
}
for (let i = 0; i < children.length; i++) {
const child = children[i];
if (child) {
if (child.element != null) {
if (
child.element_type == "ForEach" ||
child.element_type == "If" ||
child.element_type == "IfDeviceWith"
) {
child.append_children_to(this.element);
} else {
this.element.appendChild(child.element);
}
}
else if (child instanceof Node) {
this.element.appendChild(child);
}
else if (utils.is_func(child)) {
child();
}
}
}
return this;
}
zstack_append(...children) {
if (children.length === 0) {
return this;
}
for (let i = 0; i < children.length; i++) {
const child = children[i];
if (child) {
if (child.element != null) {
child.element.style.position = "absolute";
if (
child.element_type == "ForEach" ||
child.element_type == "If" ||
child.element_type == "IfDeviceWith"
) {
child.append_children_to(this.element);
} else {
this.element.appendChild(child.element);
}
}
else if (child instanceof Node) {
child.element.style.position = "absolute";
this.element.appendChild(child);
}
else if (utils.is_func(child)) {
child();
}
}
}
return this;
}
append_to(parent) {
parent.appendChild(this.element);
return this;
}
append_children_to(parent) {
while (this.element.firstChild) {
parent.appendChild(this.element.firstChild)
}
return this;
}
remove_children() {
while (this.element.firstChild) {
this.element.removeChild(this.element.firstChild);
}
return this;
}
text(value) {
if (value == null) {
return this.element.textContent;
}
this.element.textContent = value;
return this;
}
value(val) {
if (val == null) {
return this.element.value;
}
this.element.value = val;
return this;
}
static elements_with_width_attribute = [
'canvas',
'embed',
'iframe',
'img',
'object',
'progress',
'video',
];
width(value) {
if (Element.elements_with_width_attribute.includes(this.element_tag)) {
this.element.width = value;
} else {
this.element.style.width = this.pad_numeric(value);
}
return this;
}
height(value) {
if (Element.elements_with_width_attribute.includes(this.element_tag)) {
this.element.height = value;
} else {
this.element.style.height = this.pad_numeric(value);
}
return this;
}
width_by_columns(columns) {
let margin_left = this.element.style.marginLeft;
 let margin_right = this.element.style.marginRight;
if (margin_left == null) {
margin_left = "0px";
}
if (margin_right == null) {
margin_right = "0px";
}
if (columns == null) {
columns = 1;
}
this.element.style.flexBasis = "calc(100% / " + columns + " - (" + margin_left + " + " + margin_right + "))";
this.element.style.overflow = "hidden";
return this;
}
frame(width, height) {
this.width(width);
this.height(height);
return this;
}
padding(...values) {
if (values.length === 1) {
this.element.style.padding = this.pad_numeric(values[0]);
} else if (values.length === 4) {
this.element.style.paddingTop = this.pad_numeric(values[0]);
this.element.style.paddingRight = this.pad_numeric(values[1]);
this.element.style.paddingBottom = this.pad_numeric(values[2]);
this.element.style.paddingLeft = this.pad_numeric(values[3]);
} else {
console.error("Invalid number of arguments for function \"padding()\".");
}
return this;
}
margin(...values) {
if (values.length === 1) {
this.element.style.margin = this.pad_numeric(values[0]);
} else if (values.length === 4) {
this.element.style.marginTop = this.pad_numeric(values[0]);
this.element.style.marginRight = this.pad_numeric(values[1]);
this.element.style.marginBottom = this.pad_numeric(values[2]);
this.element.style.marginLeft = this.pad_numeric(values[3]);
} else {
console.error("Invalid number of arguments for function \"margin()\".");
}
return this;
}
position(...values) {
if (values.length === 1) {
this.element.style.position = values[0];
} else if (values.length === 4) {
this.element.style.position = "absolute";
this.element.style.top = this.pad_numeric(values[0]);
this.element.style.right = this.pad_numeric(values[1]);
this.element.style.bottom = this.pad_numeric(values[2]);
this.element.style.left = this.pad_numeric(values[3]);
} else {
console.error("Invalid number of arguments for function \"position()\".");
}
return this;
}
stretch(value) {
if (value == true) {
this.element.style.flex = 1;
} else {
this.element.style.flex = 0;
}
return this;
}
wrap(value) {
if (value == true) {
this.element.style.whiteSpace = "wrap";
} else if (value == false) {
this.element.style.whiteSpace = "nowrap";
} else {
this.element.style.whiteSpace = value;
}
switch (this.element_tag) {
case "div":
if (value == true) {
this.element.style.flexFlow = "wrap";
} else if (value == false) {
this.element.style.flexFlow = "nowrap";
} else {
this.element.style.flexFlow = value;
}
break;
default:
if (value == true) {
this.element.style.textWrap = "wrap";
} else if (value == false) {
this.element.style.textWrap = "nowrap";
} else {
this.element.style.textWrap = value;
}
break;
}
return this;
}
z_index(value) {
this.element.style["z-index"] = value;
return this;
}
align(value) {
switch (this.element_type) {
case "HStack":
this.element.style.justifyContent = value;
return this;
case "VStack":
this.element.style.alignItems = value;
return this;
default:
this.element.style.textAlign = value;
return this;
}
}
leading() {
return this.align("start");
}
center() {
return this.align("center");
}
trailing() {
return this.align("end");
}
align_vertical(value) {
switch (this.element_type) {
case "HStack":
this.element.style.alignItems = value;
return this;
case "VStack":
this.element.style.justifyContent = value;
return this;
default:
this.element.style.textAlign = value;
return this;
}
}
leading_vertical() {
return this.align_vertical("start");
}
center_vertical() {
return this.align_vertical("center");
}
trailing_vertical() {
return this.align_vertical("end");
}
align_text(value) {
return this.text_align(value);
}
text_leading() {
return this.text_align("start");
}
text_center() {
return this.text_align("center");
}
text_trailing() {
return this.text_align("end");
}
align_height() {
return this.align_items("stretch");
}
border(...values) {
if (values.length === 1) {
this.element.style.border = value;
} else if (values.length === 2) {
this.element.style.border = this.pad_numeric(values[0]) + " solid " + values[1];
} else if (values.length === 3) {
this.element.style.border = this.pad_numeric(values[0]) + " ", values[1] + " " + values[2];
} else {
console.error("Invalid number of arguments for function \"border()\".");
}
return this;
}
shadow(...values) {
if (values.length === 1) {
this.element.style.boxShadow = this.pad_numeric(values[0]);
} else if (values.length === 4) {
this.element.style.boxShadow =
this.pad_numeric(values[0]) + " " +
this.pad_numeric(values[1]) + " " +
this.pad_numeric(values[2]) + " " +
values[3];
} else {
console.error("Invalid number of arguments for function \"shadow()\".");
}
return this;
}
drop_shadow(...values) {
if (values.length === 0) {
this.element.style.filter = "";
this.element.style["-webkit-filter"] = "";
} else if (values.length === 1) {
this.element.style.filter = "drop-shadow(" + this.pad_numeric(values[0]) + ") ";
this.element.style["-webkit-filter"] = this.element.style.filter;
} else if (values.length === 4) {
this.element.style.filter =
"drop-shadow(" +
this.pad_numeric(values[0]) + " " +
this.pad_numeric(values[1]) + " " +
this.pad_numeric(values[2]) + " " +
values[3] + ") ";
this.element.style["-webkit-filter"] = this.element.style.filter;
} else {
console.error("Invalid number of arguments for function \"drop_shadow()\".");
}
return this;
}
greyscale(value) {
if (value == null) {
this.element.style.filter = "";
this.element.style["-webkit-filter"] = "";
} else {
this.element.style.filter += "grayscale(" + this.pad_percentage(value, "") + ") ";
this.element.style["-webkit-filter"] += "grayscale(" + this.pad_percentage(value, "") + ") ";
}
return this;
}
opacity(value) {
this.element.style.opacity = value;
return this;
}
 toggle_opacity(value = 0.25) {
if (typeof this.element.style.opacity === "undefined" || this.element.style.opacity == "" || this.element.style.opacity == 1.0) {
this.element.style.opacity = value;
} else {
this.element.style.opacity = 1.0;
}
return this;
 }
blur(value) {
if (value == null) {
this.element.style.filter = this.edit_filter_wrapper(this.element.style.filter, "blur", value);
} else {
this.element.style.filter = this.edit_filter_wrapper(this.element.style.filter, "blur", "blur(" + this.pad_numeric(value) + ") ");
}
this.element.style["-webkit-filter"] = this.element.style.filter;
return this;
}
toggle_blur(value = 10) {
this.element.style.filter = this.toggle_filter_wrapper(this.element.style.filter, "blur", "blur(" + this.pad_numeric(value) + ") ");
this.element.style["-webkit-filter"] = this.element.style.filter;
return this;
}
background_blur(value) {
if (value == null) {
this.element.style.backdropFilter = this.edit_filter_wrapper(this.element.style.backdropFilter, "blur", value);
} else {
this.element.style.backdropFilter =this.edit_filter_wrapper(this.element.style.backdropFilter, "blur", "blur(" + this.pad_numeric(value) + ") ");
}
this.element.style["-webkit-backdrop-filter"] = this.element.style.backdropFilter;
return this;
}
toggle_background_blur(value = 10) {
this.element.style.backdropFilter = this.toggle_filter_wrapper(this.element.style.backdropFilter, "blur", "blur(" + this.pad_numeric(value) + ") ");
this.element.style["-webkit-backdrop-filter"] = this.element.style.backdropFilter;
return this;
}
brightness(value) {
if (value == null) {
this.element.style.filter = this.edit_filter_wrapper(this.element.style.filter, "brightness", value);
} else {
this.element.style.filter = this.edit_filter_wrapper(this.element.style.filter, "brightness", "brightness(" + this.pad_percentage(value, "%") + ") ");
}
this.element.style["-webkit-filter"] = this.element.style.filter;
return this;
}
toggle_brightness(value = 0.5) {
this.element.style.filter = this.toggle_filter_wrapper(this.element.style.filter, "brightness", "brightness(" + this.pad_percentage(value, "%") + ") ");
this.element.style["-webkit-filter"] = this.element.style.filter;
return this;
}
background_brightness(value) {
if (value == null) {
this.element.style.backdropFilter = this.edit_filter_wrapper(this.element.style.backdropFilter, "brightness", value);
} else {
this.element.style.backdropFilter = this.edit_filter_wrapper(this.element.style.backdropFilter, "brightness", "brightness(" + this.pad_percentage(value, "%") + ") ");
}
this.element.style["-webkit-backdrop-filter"] = this.element.style.backdropFilter;
return this;
}
toggle_background_brightness(value = 10) {
this.element.style.backdropFilter = this.toggle_filter_wrapper(this.element.style.backdropFilter, "brightness", "brightness(" + this.pad_percentage(value, "%") + ") ");
this.element.style["-webkit-backdrop-filter"] = this.element.style.backdropFilter;
return this;
}
 display(value) {
 if (value != null && value != "none") {
 this.element_display = value;
 }
 this.element.style.display = value;
 return this;
 }
 hide() {
 this.element.style.display = "none";
 return this;
 }
 show() {
 this.element.style.display = this.element_display;
 return this;
 }
 hidden(...args) {
 if (args.length === 0) {
 return this.element.style.display == "none" || typeof this.element.style.display === "undefined";
 }
 console.error("Function \"hidden()\" should not be used with arguments, use \"hide()\" and \"show()\" instead.");
 }
 toggle_visibility() {
if (this.hidden()) {
this.show();
} else {
this.hide();
}
return this;
 }
 
inner_html(value) {
if (value == null) {
return this.element.innerHTML;
}
this.element.innerHTML = value;
return this;
}
outer_html(value) {
if (value == null) {
return this.element.outerHTML;
}
this.element.outerHTML = value;
return this;
}
style(css_attr) {
if (css_attr == null) {
let dict = {};
for (let property in this.element.style) {
if (this.element.style.hasOwnProperty(property)) {
const key = this.element.style[property];
const value = this.element.style[key];
if (key !== '' && key !== undefined && typeof key !== 'function' &&
value !== '' && value !== undefined && typeof value !== 'function') {
dict[key] = value;
}
}
}
return dict;
}
for (let i in css_attr) {
const value = css_attr[i];
if (i == "display" && value != null && value != "none") {
this.element_display = value;
}
this.element.style[i] = value;
}
return this;
}
attributes(html_attr) {
for (let i in html_attr) {
this.element[i] = html_attr[i];
}
return this;
}
events(html_events) {
for (let i in html_events) {
this.element[i] = i[html_events];
}
return this;
}
media(media_query, true_handler, false_handler) {
const e = this;
function query_handler(query) {
if (query.matches) {
true_handler(e);
} else if (false_handler != null) {
false_handler(e);
}
}
const query_list = window.matchMedia(media_query);
query_handler(query_list); query_list.addListener(query_handler); return this;
}
toString() {
return this.element.outerHTML;
}
 
 accent_color(value) {
 this.element.style.accentColor = value;
 return this;
 }
 align_content(value) {
 this.element.style.alignContent = value;
 return this;
 }
 align_items(value) {
 this.element.style.alignItems = value;
 return this;
 }
 align_self(value) {
 this.element.style.alignSelf = value;
 return this;
 }
 all(value) {
 this.element.style.all = value;
 return this;
 }
 animation(value) {
 this.element.style.animation = value;
 return this;
 }
 animation_delay(value) {
 this.element.style.animationDelay = value;
 return this;
 }
 animation_direction(value) {
 this.element.style.animationDirection = value;
 return this;
 }
 animation_duration(value) {
 this.element.style.animationDuration = value;
 return this;
 }
 animation_fill_mode(value) {
 this.element.style.animationFillMode = value;
 return this;
 }
 animation_iteration_count(value) {
 this.element.style.animationIterationCount = value;
 return this;
 }
 animation_name(value) {
 this.element.style.animationName = value;
 return this;
 }
 animation_play_state(value) {
 this.element.style.animationPlayState = value;
 return this;
 }
 animation_timing_function(value) {
 this.element.style.animationTimingFunction = value;
 return this;
 }
 aspect_ratio(value) {
 this.element.style.aspectRatio = value;
 return this;
 }
 backdrop_filter(value) {
 this.element.style.backdropFilter = value;
 return this;
 }
 backface_visibility(value) {
 this.element.style.backfaceVisibility = value;
 return this;
 }
 background(value) {
 this.element.style.background = value;
 return this;
 }
 background_attachment(value) {
 this.element.style.backgroundAttachment = value;
 return this;
 }
 background_blend_mode(value) {
 this.element.style.backgroundBlendMode = value;
 return this;
 }
 background_clip(value) {
 this.element.style.backgroundClip = value;
 return this;
 }
 background_color(value) {
 this.element.style.backgroundColor = value;
 return this;
 }
 background_image(value) {
 this.element.style.backgroundImage = value;
 return this;
 }
 background_origin(value) {
 this.element.style.backgroundOrigin = value;
 return this;
 }
 background_position(value) {
 this.element.style.backgroundPosition = value;
 return this;
 }
 background_position_x(value) {
 this.element.style.backgroundPositionX = value;
 return this;
 }
 background_position_y(value) {
 this.element.style.backgroundPositionY = value;
 return this;
 }
 background_repeat(value) {
 this.element.style.backgroundRepeat = value;
 return this;
 }
 background_size(value) {
 this.element.style.backgroundSize = this.pad_numeric(value);
 return this;
 }
 block_size(value) {
 this.element.style.blockSize = this.pad_numeric(value);
 return this;
 }
 
 border_block(value) {
 this.element.style.borderBlock = value;
 return this;
 }
 border_block_color(value) {
 this.element.style.borderBlockColor = value;
 return this;
 }
 border_block_end_color(value) {
 this.element.style.borderBlockEndColor = value;
 return this;
 }
 border_block_end_style(value) {
 this.element.style.borderBlockEndStyle = value;
 return this;
 }
 border_block_end_width(value) {
 this.element.style.borderBlockEndWidth = this.pad_numeric(value);
 return this;
 }
 border_block_start_color(value) {
 this.element.style.borderBlockStartColor = value;
 return this;
 }
 border_block_start_style(value) {
 this.element.style.borderBlockStartStyle = value;
 return this;
 }
 border_block_start_width(value) {
 this.element.style.borderBlockStartWidth = this.pad_numeric(value);
 return this;
 }
 border_block_style(value) {
 this.element.style.borderBlockStyle = value;
 return this;
 }
 border_block_width(value) {
 this.element.style.borderBlockWidth = this.pad_numeric(value);
 return this;
 }
 border_bottom(value) {
 this.element.style.borderBottom = this.pad_numeric(value);
 return this;
 }
 border_bottom_color(value) {
 this.element.style.borderBottomColor = value;
 return this;
 }
 border_bottom_left_radius(value) {
 this.element.style.borderBottomLeftRadius = this.pad_numeric(value);
 return this;
 }
 border_bottom_right_radius(value) {
 this.element.style.borderBottomRightRadius = this.pad_numeric(value);
 return this;
 }
 border_bottom_style(value) {
 this.element.style.borderBottomStyle = value;
 return this;
 }
 border_bottom_width(value) {
 this.element.style.borderBottomWidth = this.pad_numeric(value);
 return this;
 }
 border_collapse(value) {
 this.element.style.borderCollapse = value;
 return this;
 }
 border_color(value) {
 this.element.style.borderColor = value;
 return this;
 }
 border_image(value) {
 this.element.style.borderImage = value;
 return this;
 }
 border_image_outset(value) {
 this.element.style.borderImageOutset = value;
 return this;
 }
 border_image_repeat(value) {
 this.element.style.borderImageRepeat = value;
 return this;
 }
 border_image_slice(value) {
 this.element.style.borderImageSlice = value;
 return this;
 }
 border_image_source(value) {
 this.element.style.borderImageSource = value;
 return this;
 }
 border_image_width(value) {
 this.element.style.borderImageWidth = this.pad_numeric(value);
 return this;
 }
 border_inline(value) {
 this.element.style.borderInline = value;
 return this;
 }
 border_inline_color(value) {
 this.element.style.borderInlineColor = value;
 return this;
 }
 border_inline_end_color(value) {
 this.element.style.borderInlineEndColor = value;
 return this;
 }
 border_inline_end_style(value) {
 this.element.style.borderInlineEndStyle = value;
 return this;
 }
 border_inline_end_width(value) {
 this.element.style.borderInlineEndWidth = this.pad_numeric(value);
 return this;
 }
 border_inline_start_color(value) {
 this.element.style.borderInlineStartColor = value;
 return this;
 }
 border_inline_start_style(value) {
 this.element.style.borderInlineStartStyle = value;
 return this;
 }
 border_inline_start_width(value) {
 this.element.style.borderInlineStartWidth = this.pad_numeric(value);
 return this;
 }
 border_inline_style(value) {
 this.element.style.borderInlineStyle = value;
 return this;
 }
 border_inline_width(value) {
 this.element.style.borderInlineWidth = this.pad_numeric(value);
 return this;
 }
 border_left(value) {
 this.element.style.borderLeft = this.pad_numeric(value);
 return this;
 }
 border_left_color(value) {
 this.element.style.borderLeftColor = value;
 return this;
 }
 border_left_style(value) {
 this.element.style.borderLeftStyle = value;
 return this;
 }
 border_left_width(value) {
 this.element.style.borderLeftWidth = this.pad_numeric(value);
 return this;
 }
 border_radius(value) {
 this.element.style.borderRadius = this.pad_numeric(value);
 return this;
 }
 border_right(value) {
 this.element.style.borderRight = this.pad_numeric(value);
 return this;
 }
 border_right_color(value) {
 this.element.style.borderRightColor = value;
 return this;
 }
 border_right_style(value) {
 this.element.style.borderRightStyle = value;
 return this;
 }
 border_right_width(value) {
 this.element.style.borderRightWidth = this.pad_numeric(value);
 return this;
 }
 border_spacing(value) {
 this.element.style.borderSpacing = value;
 return this;
 }
 border_style(value) {
 this.element.style.borderStyle = value;
 return this;
 }
 border_top(value) {
 this.element.style.borderTop = this.pad_numeric(value);
 return this;
 }
 border_top_color(value) {
 this.element.style.borderTopColor = value;
 return this;
 }
 border_top_left_radius(value) {
 this.element.style.borderTopLeftRadius = this.pad_numeric(value);
 return this;
 }
 border_top_right_radius(value) {
 this.element.style.borderTopRightRadius = this.pad_numeric(value);
 return this;
 }
 border_top_style(value) {
 this.element.style.borderTopStyle = value;
 return this;
 }
 border_top_width(value) {
 this.element.style.borderTopWidth = this.pad_numeric(value);
 return this;
 }
 border_width(value) {
 this.element.style.borderWidth = this.pad_numeric(value);
 return this;
 }
 bottom(value) {
 this.element.style.bottom = this.pad_numeric(value);
 return this;
 }
 box_decoration_break(value) {
 this.element.style.boxDecorationBreak = value;
 return this;
 }
 box_reflect(value) {
 this.element.style.boxReflect = value;
 return this;
 }
 box_shadow(value) {
 this.element.style.boxShadow = value;
 return this;
 }
 box_sizing(value) {
 this.element.style.boxSizing = value;
 return this;
 }
 break_after(value) {
 this.element.style.breakAfter = value;
 return this;
 }
 break_before(value) {
 this.element.style.breakBefore = value;
 return this;
 }
 break_inside(value) {
 this.element.style.breakInside = value;
 return this;
 }
 caption_side(value) {
 this.element.style.captionSide = value;
 return this;
 }
 caret_color(value) {
 this.element.style.caretColor = value;
 return this;
 }
 clear(value) {
 this.element.style.clear = value;
 return this;
 }
 clip(value) {
 this.element.style.clip = value;
 return this;
 }
 color(value) {
 this.element.style.color = value;
 return this;
 }
 column_count(value) {
 this.element.style.columnCount = value;
 return this;
 }
 column_fill(value) {
 this.element.style.columnFill = value;
 return this;
 }
 column_gap(value) {
 this.element.style.columnGap = value;
 return this;
 }
 column_rule(value) {
 this.element.style.columnRule = value;
 return this;
 }
 column_rule_color(value) {
 this.element.style.columnRuleColor = value;
 return this;
 }
 column_rule_style(value) {
 this.element.style.columnRuleStyle = value;
 return this;
 }
 column_rule_width(value) {
 this.element.style.columnRuleWidth = this.pad_numeric(value);
 return this;
 }
 column_span(value) {
 this.element.style.columnSpan = value;
 return this;
 }
 column_width(value) {
 this.element.style.columnWidth = this.pad_numeric(value);
 return this;
 }
 columns(value) {
 this.element.style.columns = value;
 return this;
 }
 content(value) {
 this.element.style.content = value;
 return this;
 }
 counter_increment(value) {
 this.element.style.counterIncrement = value;
 return this;
 }
 counter_reset(value) {
 this.element.style.counterReset = value;
 return this;
 }
 cursor(value) {
 this.element.style.cursor = value;
 return this;
 }
 direction(value) {
 this.element.style.direction = value;
 return this;
 }
 
 empty_cells(value) {
 this.element.style.emptyCells = value;
 return this;
 }
 filter(value) {
 this.element.style.filter = value;
 return this;
 }
 flex(value) {
 this.element.style.flex = value;
 return this;
 }
 flex_basis(value) {
 this.element.style.flexBasis = value;
 return this;
 }
 flex_direction(value) {
 this.element.style.flexDirection = value;
 return this;
 }
 flex_flow(value) {
 this.element.style.flexFlow = value;
 return this;
 }
 flex_grow(value) {
 this.element.style.flexGrow = value;
 return this;
 }
 flex_shrink(value) {
 this.element.style.flexShrink = value;
 return this;
 }
 flex_wrap(value) {
 this.element.style.flexWrap = value;
 return this;
 }
 float(value) {
 this.element.style.float = value;
 return this;
 }
 font(value) {
 this.element.style.font = value;
 return this;
 }
 font_family(value) {
 this.element.style.fontFamily = value;
 return this;
 }
 font_feature_settings(value) {
 this.element.style.fontFeatureSettings = value;
 return this;
 }
 font_kerning(value) {
 this.element.style.fontKerning = value;
 return this;
 }
 font_language_override(value) {
 this.element.style.fontLanguageOverride = value;
 return this;
 }
 font_size(value) {
 this.element.style.fontSize = this.pad_numeric(value);
 return this;
 }
 font_size_adjust(value) {
 this.element.style.fontSizeAdjust = value;
 return this;
 }
 font_stretch(value) {
 this.element.style.fontStretch = value;
 return this;
 }
 font_style(value) {
 this.element.style.fontStyle = value;
 return this;
 }
 font_synthesis(value) {
 this.element.style.fontSynthesis = value;
 return this;
 }
 font_variant(value) {
 this.element.style.fontVariant = value;
 return this;
 }
 font_variant_alternates(value) {
 this.element.style.fontVariantAlternates = value;
 return this;
 }
 font_variant_caps(value) {
 this.element.style.fontVariantCaps = value;
 return this;
 }
 font_variant_east_asian(value) {
 this.element.style.fontVariantEastAsian = value;
 return this;
 }
 font_variant_ligatures(value) {
 this.element.style.fontVariantLigatures = value;
 return this;
 }
 font_variant_numeric(value) {
 this.element.style.fontVariantNumeric = value;
 return this;
 }
 font_variant_position(value) {
 this.element.style.fontVariantPosition = value;
 return this;
 }
 font_weight(value) {
 this.element.style.fontWeight = value;
 return this;
 }
 gap(value) {
 this.element.style.gap = value;
 return this;
 }
 grid(value) {
 this.element.style.grid = value;
 return this;
 }
 grid_area(value) {
 this.element.style.gridArea = value;
 return this;
 }
 grid_auto_columns(value) {
 this.element.style.gridAutoColumns = value;
 return this;
 }
 grid_auto_flow(value) {
 this.element.style.gridAutoFlow = value;
 return this;
 }
 grid_auto_rows(value) {
 this.element.style.gridAutoRows = value;
 return this;
 }
 grid_column(value) {
 this.element.style.gridColumn = value;
 return this;
 }
 grid_column_end(value) {
 this.element.style.gridColumnEnd = value;
 return this;
 }
 grid_column_gap(value) {
 this.element.style.gridColumnGap = value;
 return this;
 }
 grid_column_start(value) {
 this.element.style.gridColumnStart = value;
 return this;
 }
 grid_gap(value) {
 this.element.style.gridGap = value;
 return this;
 }
 grid_row(value) {
 this.element.style.gridRow = value;
 return this;
 }
 grid_row_end(value) {
 this.element.style.gridRowEnd = value;
 return this;
 }
 grid_row_gap(value) {
 this.element.style.gridRowGap = value;
 return this;
 }
 grid_row_start(value) {
 this.element.style.gridRowStart = value;
 return this;
 }
 grid_template(value) {
 this.element.style.gridTemplate = value;
 return this;
 }
 grid_template_areas(value) {
 this.element.style.gridTemplateAreas = value;
 return this;
 }
 grid_template_columns(value) {
 this.element.style.gridTemplateColumns = value;
 return this;
 }
 grid_template_rows(value) {
 this.element.style.gridTemplateRows = value;
 return this;
 }
 hanging_punctuation(value) {
 this.element.style.hangingPunctuation = value;
 return this;
 }
 
 hyphens(value) {
 this.element.style.hyphens = value;
 return this;
 }
 image_rendering(value) {
 this.element.style.imageRendering = value;
 return this;
 }
 inline_size(value) {
 this.element.style.inlineSize = this.pad_numeric(value);
 return this;
 }
 inset(value) {
 this.element.style.inset = value;
 return this;
 }
 inset_block(value) {
 this.element.style.insetBlock = value;
 return this;
 }
 inset_block_end(value) {
 this.element.style.insetBlockEnd = value;
 return this;
 }
 inset_block_start(value) {
 this.element.style.insetBlockStart = value;
 return this;
 }
 inset_inline(value) {
 this.element.style.insetInline = value;
 return this;
 }
 inset_inline_end(value) {
 this.element.style.insetInlineEnd = value;
 return this;
 }
 inset_inline_start(value) {
 this.element.style.insetInlineStart = value;
 return this;
 }
 isolation(value) {
 this.element.style.isolation = value;
 return this;
 }
 justify_content(value) {
 this.element.style.justifyContent = value;
 return this;
 }
 justify_items(value) {
 this.element.style.justifyItems = value;
 return this;
 }
 justify_self(value) {
 this.element.style.justifySelf = value;
 return this;
 }
 left(value) {
 this.element.style.left = this.pad_numeric(value);
 return this;
 }
 letter_spacing(value) {
 this.element.style.letterSpacing = value;
 return this;
 }
 line_break(value) {
 this.element.style.lineBreak = value;
 return this;
 }
 line_height(value) {
 this.element.style.lineHeight = this.pad_numeric(value);
 return this;
 }
 list_style(value) {
 this.element.style.listStyle = value;
 return this;
 }
 list_style_image(value) {
 this.element.style.listStyleImage = value;
 return this;
 }
 list_style_position(value) {
 this.element.style.listStylePosition = value;
 return this;
 }
 list_style_type(value) {
 this.element.style.listStyleType = value;
 return this;
 }
 
 margin_block(value) {
 this.element.style.marginBlock = value;
 return this;
 }
 margin_block_end(value) {
 this.element.style.marginBlockEnd = value;
 return this;
 }
 margin_block_start(value) {
 this.element.style.marginBlockStart = value;
 return this;
 }
 margin_bottom(value) {
 this.element.style.marginBottom = this.pad_numeric(value);
 return this;
 }
 margin_inline(value) {
 this.element.style.marginInline = value;
 return this;
 }
 margin_inline_end(value) {
 this.element.style.marginInlineEnd = value;
 return this;
 }
 margin_inline_start(value) {
 this.element.style.marginInlineStart = value;
 return this;
 }
 margin_left(value) {
 this.element.style.marginLeft = this.pad_numeric(value);
 return this;
 }
 margin_right(value) {
 this.element.style.marginRight = this.pad_numeric(value);
 return this;
 }
 margin_top(value) {
 this.element.style.marginTop = this.pad_numeric(value);
 return this;
 }
 mask(value) {
 this.element.style.mask = value;
 return this;
 }
 mask_clip(value) {
 this.element.style.maskClip = value;
 return this;
 }
 mask_composite(value) {
 this.element.style.maskComposite = value;
 return this;
 }
 mask_image(value) {
 this.element.style.maskImage = value;
 return this;
 }
 mask_mode(value) {
 this.element.style.maskMode = value;
 return this;
 }
 mask_origin(value) {
 this.element.style.maskOrigin = value;
 return this;
 }
 mask_position(value) {
 this.element.style.maskPosition = value;
 return this;
 }
 mask_repeat(value) {
 this.element.style.maskRepeat = value;
 return this;
 }
 mask_size(value) {
 this.element.style.maskSize = this.pad_numeric(value);
 return this;
 }
 mask_type(value) {
 this.element.style.maskType = value;
 return this;
 }
 max_height(value) {
 this.element.style.maxHeight = this.pad_numeric(value);
 return this;
 }
 max_width(value) {
 this.element.style.maxWidth = this.pad_numeric(value);
 return this;
 }
 max_block_size(value) {
 this.element.style.maxBlockSize = this.pad_numeric(value);
 return this;
 }
 max_inline_size(value) {
 this.element.style.maxInlineSize = this.pad_numeric(value);
 return this;
 }
 min_block_size(value) {
 this.element.style.minBlockSize = this.pad_numeric(value);
 return this;
 }
 min_inline_size(value) {
 this.element.style.minInlineSize = this.pad_numeric(value);
 return this;
 }
 min_height(value) {
 this.element.style.minHeight = this.pad_numeric(value);
 return this;
 }
 min_width(value) {
 this.element.style.minWidth = this.pad_numeric(value);
 return this;
 }
 mix_blend_mode(value) {
 this.element.style.mixBlendMode = value;
 return this;
 }
 object_fit(value) {
 this.element.style.objectFit = value;
 return this;
 }
 object_position(value) {
 this.element.style.objectPosition = value;
 return this;
 }
 offset(value) {
 this.element.style.offset = value;
 return this;
 }
 offset_anchor(value) {
 this.element.style.offsetAnchor = value;
 return this;
 }
 offset_distance(value) {
 this.element.style.offsetDistance = value;
 return this;
 }
 offset_path(value) {
 this.element.style.offsetPath = value;
 return this;
 }
 offset_rotate(value) {
 this.element.style.offsetRotate = value;
 return this;
 }
 opacity(value) {
 this.element.style.opacity = value;
 return this;
 }
 order(value) {
 this.element.style.order = value;
 return this;
 }
 orphans(value) {
 this.element.style.orphans = value;
 return this;
 }
 outline(value) {
 this.element.style.outline = value;
 return this;
 }
 outline_color(value) {
 this.element.style.outlineColor = value;
 return this;
 }
 outline_offset(value) {
 this.element.style.outlineOffset = value;
 return this;
 }
 outline_style(value) {
 this.element.style.outlineStyle = value;
 return this;
 }
 outline_width(value) {
 this.element.style.outlineWidth = this.pad_numeric(value);
 return this;
 }
 overflow(value) {
 this.element.style.overflow = value;
 return this;
 }
 overflow_anchor(value) {
 this.element.style.overflowAnchor = value;
 return this;
 }
 overflow_wrap(value) {
 this.element.style.overflowWrap = value;
 return this;
 }
 overflow_x(value) {
 this.element.style.overflowX = value;
 return this;
 }
 overflow_y(value) {
 this.element.style.overflowY = value;
 return this;
 }
 overscroll_behavior(value) {
 this.element.style.overscrollBehavior = value;
 return this;
 }
 overscroll_behavior_block(value) {
 this.element.style.overscrollBehaviorBlock = value;
 return this;
 }
 overscroll_behavior_inline(value) {
 this.element.style.overscrollBehaviorInline = value;
 return this;
 }
 overscroll_behavior_x(value) {
 this.element.style.overscrollBehaviorX = value;
 return this;
 }
 overscroll_behavior_y(value) {
 this.element.style.overscrollBehaviorY = value;
 return this;
 }
 
 padding_block(value) {
 this.element.style.paddingBlock = value;
 return this;
 }
 padding_block_end(value) {
 this.element.style.paddingBlockEnd = value;
 return this;
 }
 padding_block_start(value) {
 this.element.style.paddingBlockStart = value;
 return this;
 }
 padding_bottom(value) {
 this.element.style.paddingBottom = this.pad_numeric(value);
 return this;
 }
 padding_inline(value) {
 this.element.style.paddingInline = value;
 return this;
 }
 padding_inline_end(value) {
 this.element.style.paddingInlineEnd = value;
 return this;
 }
 padding_inline_start(value) {
 this.element.style.paddingInlineStart = value;
 return this;
 }
 padding_left(value) {
 this.element.style.paddingLeft = this.pad_numeric(value);
 return this;
 }
 padding_right(value) {
 this.element.style.paddingRight = this.pad_numeric(value);
 return this;
 }
 padding_top(value) {
 this.element.style.paddingTop = this.pad_numeric(value);
 return this;
 }
 page_break_after(value) {
 this.element.style.pageBreakAfter = value;
 return this;
 }
 page_break_before(value) {
 this.element.style.pageBreakBefore = value;
 return this;
 }
 page_break_inside(value) {
 this.element.style.pageBreakInside = value;
 return this;
 }
 paint_order(value) {
 this.element.style.paintOrder = value;
 return this;
 }
 perspective(value) {
 this.element.style.perspective = value;
 return this;
 }
 perspective_origin(value) {
 this.element.style.perspectiveOrigin = value;
 return this;
 }
 place_content(value) {
 this.element.style.placeContent = value;
 return this;
 }
 place_items(value) {
 this.element.style.placeItems = value;
 return this;
 }
 place_self(value) {
 this.element.style.placeSelf = value;
 return this;
 }
 pointer_events(value) {
 this.element.style.pointerEvents = value;
 return this;
 }
 
 quotes(value) {
 this.element.style.quotes = value;
 return this;
 }
 resize(value) {
 this.element.style.resize = value;
 return this;
 }
 right(value) {
 this.element.style.right = this.pad_numeric(value);
 return this;
 }
 rotate(value) {
 this.element.style.rotate = value;
 return this;
 }
 row_gap(value) {
 this.element.style.rowGap = value;
 return this;
 }
 scale(value) {
 this.element.style.scale = value;
 return this;
 }
 scroll_behavior(value) {
 this.element.style.scrollBehavior = value;
 return this;
 }
 scroll_margin(value) {
 this.element.style.scrollMargin = value;
 return this;
 }
 scroll_margin_block(value) {
 this.element.style.scrollMarginBlock = value;
 return this;
 }
 scroll_margin_block_end(value) {
 this.element.style.scrollMarginBlockEnd = value;
 return this;
 }
 scroll_margin_block_start(value) {
 this.element.style.scrollMarginBlockStart = value;
 return this;
 }
 scroll_margin_bottom(value) {
 this.element.style.scrollMarginBottom = this.pad_numeric(value);
 return this;
 }
 scroll_margin_inline(value) {
 this.element.style.scrollMarginInline = value;
 return this;
 }
 scroll_margin_inline_end(value) {
 this.element.style.scrollMarginInlineEnd = value;
 return this;
 }
 scroll_margin_inline_start(value) {
 this.element.style.scrollMarginInlineStart = value;
 return this;
 }
 scroll_margin_left(value) {
 this.element.style.scrollMarginLeft = this.pad_numeric(value);
 return this;
 }
 scroll_margin_right(value) {
 this.element.style.scrollMarginRight = this.pad_numeric(value);
 return this;
 }
 scroll_margin_top(value) {
 this.element.style.scrollMarginTop = this.pad_numeric(value);
 return this;
 }
 scroll_padding(value) {
 this.element.style.scrollPadding = value;
 return this;
 }
 scroll_padding_block(value) {
 this.element.style.scrollPaddingBlock = value;
 return this;
 }
 scroll_padding_block_end(value) {
 this.element.style.scrollPaddingBlockEnd = value;
 return this;
 }
 scroll_padding_block_start(value) {
 this.element.style.scrollPaddingBlockStart = value;
 return this;
 }
 scroll_padding_bottom(value) {
 this.element.style.scrollPaddingBottom = this.pad_numeric(value);
 return this;
 }
 scroll_padding_inline(value) {
 this.element.style.scrollPaddingInline = value;
 return this;
 }
 scroll_padding_inline_end(value) {
 this.element.style.scrollPaddingInlineEnd = value;
 return this;
 }
 scroll_padding_inline_start(value) {
 this.element.style.scrollPaddingInlineStart = value;
 return this;
 }
 scroll_padding_left(value) {
 this.element.style.scrollPaddingLeft = this.pad_numeric(value);
 return this;
 }
 scroll_padding_right(value) {
 this.element.style.scrollPaddingRight = this.pad_numeric(value);
 return this;
 }
 scroll_padding_top(value) {
 this.element.style.scrollPaddingTop = this.pad_numeric(value);
 return this;
 }
 scroll_snap_align(value) {
 this.element.style.scrollSnapAlign = value;
 return this;
 }
 scroll_snap_stop(value) {
 this.element.style.scrollSnapStop = value;
 return this;
 }
 scroll_snap_type(value) {
 this.element.style.scrollSnapType = value;
 return this;
 }
 scrollbar_color(value) {
 this.element.style.scrollbarColor = value;
 return this;
 }
 tab_size(value) {
 this.element.style.tabSize = this.pad_numeric(value);
 return this;
 }
 table_layout(value) {
 this.element.style.tableLayout = value;
 return this;
 }
 text_align(value) {
 this.element.style.textAlign = value;
 return this;
 }
 text_align_last(value) {
 this.element.style.textAlignLast = value;
 return this;
 }
 text_combine_upright(value) {
 this.element.style.textCombineUpright = value;
 return this;
 }
 text_decoration(value) {
 this.element.style.textDecoration = value;
 return this;
 }
 text_decoration_color(value) {
 this.element.style.textDecorationColor = value;
 return this;
 }
 text_decoration_line(value) {
 this.element.style.textDecorationLine = value;
 return this;
 }
 text_decoration_style(value) {
 this.element.style.textDecorationStyle = value;
 return this;
 }
 text_decoration_thickness(value) {
 this.element.style.textDecorationThickness = value;
 return this;
 }
 text_emphasis(value) {
 this.element.style.textEmphasis = value;
 return this;
 }
 text_indent(value) {
 this.element.style.textIndent = value;
 return this;
 }
 text_justify(value) {
 this.element.style.textJustify = value;
 return this;
 }
 text_orientation(value) {
 this.element.style.textOrientation = value;
 return this;
 }
 text_overflow(value) {
 this.element.style.textOverflow = value;
 return this;
 }
 text_shadow(value) {
 this.element.style.textShadow = value;
 return this;
 }
 text_transform(value) {
 this.element.style.textTransform = value;
 return this;
 }
 text_underline_position(value) {
 this.element.style.textUnderlinePosition = value;
 return this;
 }
 top(value) {
 this.element.style.top = this.pad_numeric(value);
 return this;
 }
 transform(value) {
 this.element.style.transform = value;
 return this;
 }
 transform_origin(value) {
 this.element.style.transformOrigin = value;
 return this;
 }
 transform_style(value) {
 this.element.style.transformStyle = value;
 return this;
 }
 transition(value) {
 this.element.style.transition = value;
 return this;
 }
 transition_delay(value) {
 this.element.style.transitionDelay = value;
 return this;
 }
 transition_duration(value) {
 this.element.style.transitionDuration = value;
 return this;
 }
 transition_property(value) {
 this.element.style.transitionProperty = value;
 return this;
 }
 transition_timing_function(value) {
 this.element.style.transitionTimingFunction = value;
 return this;
 }
 translate(value) {
 this.element.style.translate = value;
 return this;
 }
 unicode_bidi(value) {
 this.element.style.unicodeBidi = value;
 return this;
 }
 user_select(value) {
 this.element.style.userSelect = value;
 return this;
 }
 
 visibility(value) {
 this.element.style.visibility = value;
 return this;
 }
 white_space(value) {
 this.element.style.whiteSpace = value;
 return this;
 }
 widows(value) {
 this.element.style.widows = value;
 return this;
 }
 
 word_break(value) {
 this.element.style.wordBreak = value;
 return this;
 }
 word_spacing(value) {
 this.element.style.wordSpacing = value;
 return this;
 }
 word_wrap(value) {
 this.element.style.wordWrap = value;
 return this;
 }
 writing_mode(value) {
 this.element.style.writingMode = value;
 return this;
 }
 
 accept(value) {
 this.element.accept = value;
 return this;
 }
 accept_charset(value) {
 this.element.accept_charset = value;
 return this;
 }
 action(value) {
 this.element.action = value;
 return this;
 }
 alt(value) {
 this.element.alt = value;
 return this;
 }
 async(value) {
 this.element.async = value;
 return this;
 }
 auto_complete(value) {
 this.element.autocomplete = value;
 return this;
 }
 auto_focus(value) {
 this.element.autofocus = value;
 return this;
 }
 auto_play(value) {
 this.element.autoplay = value;
 return this;
 }
 charset(value) {
 this.element.charset = value;
 return this;
 }
 checked(value) {
 this.element.checked = value;
 return this;
 }
 cite(value) {
 this.element.cite = value;
 return this;
 }
 class(value) {
 this.element.class = value;
 return this;
 }
 cols(value) {
 this.element.cols = value;
 return this;
 }
 colspan(value) {
 this.element.colspan = value;
 return this;
 }
 content(value) {
 this.element.content = value;
 return this;
 }
 content_editable(value) {
 this.element.contenteditable = value;
 return this;
 }
 controls(value) {
 this.element.controls = value;
 return this;
 }
 coords(value) {
 this.element.coords = value;
 return this;
 }
 data(value) {
 this.element.data = value;
 return this;
 }
 datetime(value) {
 this.element.datetime = value;
 return this;
 }
 default(value) {
 this.element.default = value;
 return this;
 }
 defer(value) {
 this.element.defer = value;
 return this;
 }
 dir(value) {
 this.element.dir = value;
 return this;
 }
 dirname(value) {
 this.element.dirname = value;
 return this;
 }
 disabled(value) {
 this.element.disabled = value;
 return this;
 }
 download(value) {
 this.element.download = value;
 return this;
 }
 draggable(value) {
 this.element.draggable = value;
 return this;
 }
 enctype(value) {
 this.element.enctype = value;
 return this;
 }
 for(value) {
 this.element.for = value;
 return this;
 }
 form(value) {
 this.element.form = value;
 return this;
 }
 form_action(value) {
 this.element.formaction = value;
 return this;
 }
 headers(value) {
 this.element.headers = value;
 return this;
 }
 
 
 high(value) {
 this.element.high = value;
 return this;
 }
 href(value) {
 this.element.href = value;
 return this;
 }
 href_lang(value) {
 this.element.hreflang = value;
 return this;
 }
 http_equiv(value) {
 this.element.http_equiv = value;
 return this;
 }
 id(value) {
 this.element.id = value;
 return this;
 }
 is_map(value) {
 this.element.ismap = value;
 return this;
 }
 kind(value) {
 this.element.kind = value;
 return this;
 }
 label(value) {
 this.element.label = value;
 return this;
 }
 lang(value) {
 this.element.lang = value;
 return this;
 }
 list(value) {
 this.element.list = value;
 return this;
 }
 loop(value) {
 this.element.loop = value;
 return this;
 }
 low(value) {
 this.element.low = value;
 return this;
 }
 max(value) {
 this.element.max = value;
 return this;
 }
 max_length(value) {
 this.element.maxlength = value;
 return this;
 }
 
 method(value) {
 this.element.method = value;
 return this;
 }
 min(value) {
 this.element.min = value;
 return this;
 }
 multiple(value) {
 this.element.multiple = value;
 return this;
 }
 muted(value) {
 this.element.muted = value;
 return this;
 }
 name(value) {
 this.element.name = value;
 return this;
 }
 no_validate(value) {
 this.element.novalidate = value;
 return this;
 }
 on_abort(value) {
 this.element.onabort = value;
 return this;
 }
 on_after_print(value) {
 this.element.onafterprint = value;
 return this;
 }
 on_before_print(value) {
 this.element.onbeforeprint = value;
 return this;
 }
 on_before_unload(value) {
 this.element.onbeforeunload = value;
 return this;
 }
 on_blur(value) {
 this.element.onblur = value;
 return this;
 }
 on_canplay(value) {
 this.element.oncanplay = value;
 return this;
 }
 on_canplay_through(value) {
 this.element.oncanplaythrough = value;
 return this;
 }
 on_change(value) {
 this.element.onchange = value;
 return this;
 }
 on_click(value) {
 this.element.onclick = value;
 return this;
 }
 on_context_menu(value) {
 this.element.oncontextmenu = value;
 return this;
 }
 on_copy(value) {
 this.element.oncopy = value;
 return this;
 }
 on_cue_change(value) {
 this.element.oncuechange = value;
 return this;
 }
 on_cut(value) {
 this.element.oncut = value;
 return this;
 }
 on_dbl_click(value) {
 this.element.ondblclick = value;
 return this;
 }
 on_drag(value) {
 this.element.ondrag = value;
 return this;
 }
 on_drag_end(value) {
 this.element.ondragend = value;
 return this;
 }
 on_drag_enter(value) {
 this.element.ondragenter = value;
 return this;
 }
 on_drag_leave(value) {
 this.element.ondragleave = value;
 return this;
 }
 on_drag_over(value) {
 this.element.ondragover = value;
 return this;
 }
 on_drag_start(value) {
 this.element.ondragstart = value;
 return this;
 }
 on_drop(value) {
 this.element.ondrop = value;
 return this;
 }
 on_duration_change(value) {
 this.element.ondurationchange = value;
 return this;
 }
 on_emptied(value) {
 this.element.onemptied = value;
 return this;
 }
 on_ended(value) {
 this.element.onended = value;
 return this;
 }
 on_error(value) {
 this.element.onerror = value;
 return this;
 }
 on_focus(value) {
 this.element.onfocus = value;
 return this;
 }
 on_hash_change(value) {
 this.element.onhashchange = value;
 return this;
 }
 on_input(value) {
 this.element.oninput = value;
 return this;
 }
 on_invalid(value) {
 this.element.oninvalid = value;
 return this;
 }
 on_key_down(value) {
 this.element.onkeydown = value;
 return this;
 }
 on_key_press(value) {
 this.element.onkeypress = value;
 return this;
 }
 on_key_up(value) {
 this.element.onkeyup = value;
 return this;
 }
 on_load(value) {
 this.element.onload = value;
 return this;
 }
 on_loaded_data(value) {
 this.element.onloadeddata = value;
 return this;
 }
 on_loaded_metadata(value) {
 this.element.onloadedmetadata = value;
 return this;
 }
 on_load_start(value) {
 this.element.onloadstart = value;
 return this;
 }
 on_mouse_down(value) {
 this.element.onmousedown = value;
 return this;
 }
 on_mouse_move(value) {
 this.element.onmousemove = value;
 return this;
 }
 on_mouse_out(value) {
 this.element.onmouseout = value;
 return this;
 }
 on_mouse_over(value) {
 this.element.onmouseover = value;
 return this;
 }
 on_mouse_up(value) {
 this.element.onmouseup = value;
 return this;
 }
 on_mouse_wheel(value) {
 this.element.onmousewheel = value;
 return this;
 }
 on_offline(value) {
 this.element.onoffline = value;
 return this;
 }
 on_online(value) {
 this.element.ononline = value;
 return this;
 }
 on_page_hide(value) {
 this.element.onpagehide = value;
 return this;
 }
 on_page_show(value) {
 this.element.onpageshow = value;
 return this;
 }
 on_paste(value) {
 this.element.onpaste = value;
 return this;
 }
 on_pause(value) {
 this.element.onpause = value;
 return this;
 }
 on_play(value) {
 this.element.onplay = value;
 return this;
 }
 on_playing(value) {
 this.element.onplaying = value;
 return this;
 }
 on_popstate(value) {
 this.element.onpopstate = value;
 return this;
 }
 onprogress(value) {
 this.element.onprogress = value;
 return this;
 }
 on_rate_change(value) {
 this.element.onratechange = value;
 return this;
 }
 on_reset(value) {
 this.element.onreset = value;
 return this;
 }
 on_resize(value) {
 this.element.onresize = value;
 return this;
 }
 on_scroll(value) {
 this.element.onscroll = value;
 return this;
 }
 on_search(value) {
 this.element.onsearch = value;
 return this;
 }
 on_seeked(value) {
 this.element.onseeked = value;
 return this;
 }
 on_seeking(value) {
 this.element.onseeking = value;
 return this;
 }
 on_select(value) {
 this.element.onselect = value;
 return this;
 }
 on_stalled(value) {
 this.element.onstalled = value;
 return this;
 }
 on_storage(value) {
 this.element.onstorage = value;
 return this;
 }
 on_submit(value) {
 this.element.onsubmit = value;
 return this;
 }
 on_suspend(value) {
 this.element.onsuspend = value;
 return this;
 }
 on_time_update(value) {
 this.element.ontimeupdate = value;
 return this;
 }
 on_toggle(value) {
 this.element.ontoggle = value;
 return this;
 }
 on_unload(value) {
 this.element.onunload = value;
 return this;
 }
 on_volume_change(value) {
 this.element.onvolumechange = value;
 return this;
 }
 on_waiting(value) {
 this.element.onwaiting = value;
 return this;
 }
 on_wheel(value) {
 this.element.onwheel = value;
 return this;
 }
 open(value) {
 this.element.open = value;
 return this;
 }
 optimum(value) {
 this.element.optimum = value;
 return this;
 }
 pattern(value) {
 this.element.pattern = value;
 return this;
 }
 placeholder(value) {
 this.element.placeholder = value;
 return this;
 }
 poster(value) {
 this.element.poster = value;
 return this;
 }
 preload(value) {
 this.element.preload = value;
 return this;
 }
 readonly(value) {
 this.element.readonly = value;
 return this;
 }
 rel(value) {
 this.element.rel = value;
 return this;
 }
 required(value) {
 this.element.required = value;
 return this;
 }
 reversed(value) {
 this.element.reversed = value;
 return this;
 }
 rows(value) {
 this.element.rows = value;
 return this;
 }
 row_span(value) {
 this.element.rowspan = value;
 return this;
 }
 sandbox(value) {
 this.element.sandbox = value;
 return this;
 }
 scope(value) {
 this.element.scope = value;
 return this;
 }
 selected(value) {
 this.element.selected = value;
 return this;
 }
 shape(value) {
 this.element.shape = value;
 return this;
 }
 size(value) {
 this.element.size = value;
 return this;
 }
 sizes(value) {
 this.element.sizes = value;
 return this;
 }
 span(value) {
 this.element.span = value;
 return this;
 }
 spell_check(value) {
 this.element.spellcheck = value;
 return this;
 }
 src(value) {
 this.element.src = value;
 return this;
 }
 src_doc(value) {
 this.element.srcdoc = value;
 return this;
 }
 src_lang(value) {
 this.element.srclang = value;
 return this;
 }
 src_set(value) {
 this.element.srcset = value;
 return this;
 }
 start(value) {
 this.element.start = value;
 return this;
 }
 step(value) {
 this.element.step = value;
 return this;
 }
 
 tab_index(value) {
 this.element.tabindex = value;
 return this;
 }
 target(value) {
 this.element.target = value;
 return this;
 }
 title(value) {
 this.element.title = value;
 return this;
 }
 translate(value) {
 this.element.translate = value;
 return this;
 }
 type(value) {
 this.element.type = value;
 return this;
 }
 use_map(value) {
 this.element.usemap = value;
 return this;
 }
 value(value) {
 this.element.value = value;
 return this;
 }
 
 
 onmessage(value) {
 this.element.onmessage = value;
 return this;
 }
};
class RingLoader extends Element {
static default_styling = {
"width": "80px",
"height": "80px",
"background": "black",
};
constructor() {
super("RingLoader", "div");
this.style(RingLoader.default_styling);
this.update();
}
update() {
this.remove_children();
const children_style = {
"width": "calc(" + this.element.style.width + " * (64.0px / 80.0px))",
"height": "calc(" + this.element.style.height + " * (64.0px / 80.0px))",
"margin": "calc(" + this.element.style.width + " * (8.0px / 80.0px))",
"border": "calc(" + this.element.style.width + " * (8.0px / 80.0px)) solid " + this.element.style.background,
"border-color": this.element.style.background + " transparent transparent transparent",
}
for (let i = 0; i < 4; i++) {
let e = document.createElement("div");
for (let attr in children_style) {
e.style[attr] = children_style[attr];
}
this.append(e);
}
}
}
class Divider extends Element {
static default_styling = {
"margin": "0px",
"padding": "0px",
"width": "100%",
"height": "1px",
"min-height": "1px",
"background": "black",
};
constructor() {
super("Divider", "div");
this.style(Divider.default_styling);
}
}
class Scroller extends Element {
static default_styling = {
"position": "relative",
"margin": "0px",
"padding": "0px",
"clear": "both",
"display": "flex",
"overflow": "scroll",
"flex-direction": "column",
"text-align": "start",
"scroll-behavior": "smooth",
"overscroll-behavior": "none", "height": "fit-content", "align-content": "flex-start", "align-items": "flex-start", };
constructor(...children) {
super("Scroller", "div");
this.style(Scroller.default_styling);
this.append(...children);
}
}
class HStack extends Element {
static default_styling = {
"position": "relative",
"margin": "0px",
"padding": "0px",
"clear": "both",
"overflow-x": "visible",
"overflow-y": "visible",
"text-align": "start",
"display": "flex",
"flex-direction": "row",
"align-items": "flex-start", };
constructor(...children) {
super("HStack", "div");
this.style(HStack.default_styling);
this.append(...children);
}
}
class Spacer extends Element {
static default_styling = {
"margin": "0px",
"padding": "0px",
"flex": "1",
"flex-grow": "1",
"background": "#00000000",
"filter": "opacity(0)",
"justify-content": "stretch",
};
constructor() {
super("Spacer", "div");
this.style(Spacer.default_styling);
}
}
class ForEach extends Element {
static default_styling = {
"border": "none",
"outline": "none",
"background": "transparent",
};
constructor(items, func) {
super("ForEach", "section");
this.style(Divider.default_styling);
for (let i = 0; i < items.length; i++) {
this.append(func(items[i]));
}
}
}
class CodeBlock extends Element {
static default_styling = {
"margin": "0px 0px 0px 0px",
"padding": "25px",
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
"overflow": "scroll",
};
constructor(text) {
super("CodeBlock", "pre");
this.style(CodeBlock.default_styling);
this.text(text);
}
}
class CodeLine extends Element {
static default_styling = {
"font-family": "\"Menlo\", \"Consolas\", monospace",
"font-size": "15px",
"font-style": "italic",
"background": "#000000",
"color": "#FFFFFF",
"border-radius": "10px",
"padding": "5px 7.5px 5px 7.5px",
};
constructor(text, href) {
super("CodeLine", "span");
this.style(CodeBlock.default_styling);
this.text(text);
}
toString() {
return this.element.outerHTML;
}
}
class Link extends Element {
static default_styling = {
"font-family": "inherit",
"color": "rgb(85, 108, 214)",
"text-decoration": "underline",
"text-underline-position": "auto",
"cursor": "pointer",
};
constructor(text, href) {
super("Link", "a");
this.style(Link.default_styling);
this.text(text);
this.href(href);
}
}
class VStack extends Element {
static default_styling = {
"position": "relative",
"margin": "0px",
"padding": "0px",
"clear": "both",
"display": "flex", "overflow": "visible",
"align-content": "flex-start", "flex-direction": "column",
"text-align": "start",
};
constructor(...children) {
super("VStack", "div");
this.style(VStack.default_styling);
this.append(...children);
}
}
class ZStack extends Element {
static default_styling = {
"position": "relative",
"margin": "0px",
"padding": "0px",
"display": "block",
"text-align": "start",
};
constructor(...children) {
super("ZStack", "div");
this.style(ZStack.default_styling);
this.zstack_append(...children);
}
append(...children) {
return this.zstack_append(...children);
}
}
class Title extends Element {
static default_styling = {
"margin": "0px 0px 0px 0px",
"color": "inherit",
"white-space": "wrap",
"text-align": "inherit",
"color": "green",
};
constructor(text) {
super("Title", "h1");
this.style(Title.default_styling);
this.text(text);
}
}
class If extends Element {
static default_styling = {};
constructor(boolean, child_or_func) {
super("If", "section");
this.style(View.default_styling);
if (boolean) {
if (utils.is_func(child_or_func)) {
child_or_func();
}
else {
this.append(child_or_func);
}
}
}
}
class IfDeviceWith extends Element {
static default_styling = {};
constructor(comparison, value, child) {
super("IfDeviceWith", "section");
this.comparison = comparison;
this.value = value;
this.child = child;
this.style(View.default_styling);
if (comparison(utils.get_device_width(), this.value)) {
this.append(this.child);
}
}
}
class Image extends Element {
static default_styling = {
"margin": "0px",
"padding": "0px",
"object-fit": "cover",
};
constructor(src) {
super("Image", "img");
this.style(Image.default_styling);
this.src(src);
}
}
class ImageMask extends Element {
static default_styling = {
"margin": "0px",
"padding": "0px",
"object-fit": "cover",
"display": "inline-block",
};
constructor(src) {
super("ImageMask", "div");
this.style(ImageMask.default_styling);
this.append(
new Element("ImageMaskChild", "div")
.width("100%")
.height("100%")
.background("black")
.mask("url('" + src + "') no-repeat center/contain")
);
}
background(value) {
this.element.firstChild.style.background = value;
return this;
}
src(value) {
this.element.firstElementChild.style.mask = "url('" + value + "') no-repeat center/contain";
return this;
}
mask(value) {
this.element.firstElementChild.style.mask = value;
return this;
}
}
class MediaQuery {
constructor() {
this.query = "";
}
add_end() {
if (this.query != "") {
this.query += " and ";
}
}
 any_hover(value) {
 this.add_and();
 this.query += "(any-hover: " + value + ")";
 return this;
 }
 any_pointer(value) {
 this.add_and();
 this.query += "(any-pointer: " + value + ")";
 return this;
 }
 aspect_ratio(value) {
 this.add_and();
 this.query += "(aspect-ratio: " + value + ")";
 return this;
 }
 color(value) {
 this.add_and();
 this.query += "(color: " + value + ")";
 return this;
 }
 color_gamut(value) {
 this.add_and();
 this.query += "(color-gamut: " + value + ")";
 return this;
 }
 color_index(value) {
 this.add_and();
 this.query += "(color-index: " + value + ")";
 return this;
 }
 display_mode(value) {
 this.add_and();
 this.query += "(display-mode: " + value + ")";
 return this;
 }
 dynamic_range(value) {
 this.add_and();
 this.query += "(dynamic-range: " + value + ")";
 return this;
 }
 forced_colors(value) {
 this.add_and();
 this.query += "(forced-colors: " + value + ")";
 return this;
 }
 grid(value) {
 this.add_and();
 this.query += "(grid: " + value + ")";
 return this;
 }
 height(value) {
 this.add_and();
 this.query += "(height: " + value + ")";
 return this;
 }
 hover(value) {
 this.add_and();
 this.query += "(hover: " + value + ")";
 return this;
 }
 inverted_colors(value) {
 this.add_and();
 this.query += "(inverted-colors: " + value + ")";
 return this;
 }
 monochrome(value) {
 this.add_and();
 this.query += "(monochrome: " + value + ")";
 return this;
 }
 orientation(value) {
 this.add_and();
 this.query += "(orientation: " + value + ")";
 return this;
 }
 overflow_block(value) {
 this.add_and();
 this.query += "(overflow-block: " + value + ")";
 return this;
 }
 overflow_inline(value) {
 this.add_and();
 this.query += "(overflow-inline: " + value + ")";
 return this;
 }
 pointer(value) {
 this.add_and();
 this.query += "(pointer: " + value + ")";
 return this;
 }
 prefers_color_scheme(value) {
 this.add_and();
 this.query += "(prefers-color-scheme: " + value + ")";
 return this;
 }
 prefers_contrast(value) {
 this.add_and();
 this.query += "(prefers-contrast: " + value + ")";
 return this;
 }
 prefers_reduced_motion(value) {
 this.add_and();
 this.query += "(prefers-reduced-motion: " + value + ")";
 return this;
 }
 prefers_reduced_transparency (value) {
 this.add_and();
 this.query += "(prefers-reduced-transparency : " + value + ")";
 return this;
 }
 resolution(value) {
 this.add_and();
 this.query += "(resolution: " + value + ")";
 return this;
 }
 scripting(value) {
 this.add_and();
 this.query += "(scripting: " + value + ")";
 return this;
 }
 update(value) {
 this.add_and();
 this.query += "(update: " + value + ")";
 return this;
 }
 video_dynamic_range(value) {
 this.add_and();
 this.query += "(video-dynamic-range: " + value + ")";
 return this;
 }
 width(value) {
 this.add_and();
 this.query += "(width: " + value + ")";
 return this;
 }
 min_width(value) {
 this.add_and();
 this.query += "(min-width: " + value + ")";
 return this;
 }
 max_width(value) {
 this.add_and();
 this.query += "(max-width: " + value + ")";
 return this;
 }
}
class Button extends Element {
static default_styling = {
"margin": "0px 0px 0px",
"padding": "5px 10px 5px 10px",
"border-radius": "10px",
"cursor": "pointer",
"text-decoration": "none",
"color": "inherit",
"text-align": "center",
"display": "grid",
"align-items": "center",
"white-space": "nowrap",
};
static default_events = {
"onmousedown": "this.style.filter = \"brightness(90%)\";",
"onmouseover": "this.style.filter = \"brightness(95%)\";",
"onmouseup": "this.style.filter = \"brightness(100%)\";",
"onmouseout": "this.style.filter = \"brightness(100%)\";",
};
constructor(text) {
super("Button", "a");
this.style(Button.default_styling);
this.events(Button.default_events);
this.text(text);
}
}
class View extends Element {
static default_styling = {
"position": "absolute",
"top": "0",
"right": "0",
"bottom": "0",
"left": "0",
"padding": "0px",
"display": "block",
"overflow": "hidden",
"overflow-y": "none",
"background": "none",
"display": "flex", "text-align": "start",
"align-content": "flex-start", "flex-direction": "column",
};
constructor(...children) {
super("View", "div");
this.style(View.default_styling);
this.append(...children);
}
}
class GoogleMap extends Element {
static default_styling = {
"border": "0",
};
static default_attributes = {
"width": "100%",
"height": "100%",
"frameborder": "0",
"style": "border:0",
"referrerpolicy": "no-referrer-when-downgrade",
"allowfullscreen": "true",
};
constructor(location, mode = "place") {
super("GoogleMap", "iframe");
this.style(GoogleMap.default_styling);
this.attributes(GoogleMap.default_attributes);
this.src("https://www.google.com/maps/embed/v1/" + mode + "?key=" + google_cloud_api_key + "&" + utils.url_encode({"q": location.replaceAll(' ', '+')}));
}
update() {
this.remove_children();
const children_style = {
"width": "calc(" + this.element.style.width + " * (64.0px / 80.0px))",
"height": "calc(" + this.element.style.height + " * (64.0px / 80.0px))",
"margin": "calc(" + this.element.style.width + " * (8.0px / 80.0px))",
"border": "calc(" + this.element.style.width + " * (8.0px / 80.0px)) solid " + this.element.style.background,
"border-color": this.element.style.background + " transparent transparent transparent",
}
for (let i = 0; i < 4; i++) {
let e = document.createElement("div");
for (let attr in children_style) {
e.style[attr] = children_style[attr];
}
this.append(e);
}
}
}
class Text extends Element {
static default_styling = {
"margin": "0px 0px 0px 0px",
"padding": "2.5px",
"color": "inherit",
"text-align": "inherit",
"white-space": "wrap",
};
constructor(text) {
super("Text", "p");
this.style(Text.default_styling);
this.text(text);
}
}
class Input extends Element {
static default_styling = {
"margin": "0px 0px 0px 0px",
"padding": "2.5px 5px 2.5px 5px",
"height": "20px",
"font": "inherit",
"color": "inherit",
"background": "none",
"outline": "none",
"border": "none",
"border-radius": "10px",
"text-align": "start",
"white-space": "nowrap",
};
constructor(text) {
super("Input", "input");
this.type("text");
this.style(Input.default_styling);
}
}
class PasswordInput extends Element {
static default_styling = {
"margin": "0px 0px 0px 0px",
"padding": "2.5px 5px 2.5px 5px",
"height": "20px",
"font": "inherit",
"color": "inherit",
"background": "none",
"outline": "none",
"border": "none",
"border-radius": "10px",
"text-align": "start",
"white-space": "nowrap",
};
constructor(placeholder) {
super("PasswordInput", "input");
this.type("password");
this.style(PasswordInput.default_styling);
this.placeholder(placeholder);
}
}
class EmailInput extends Element {
static default_styling = {
"margin": "0px 0px 0px 0px",
"padding": "2.5px 5px 2.5px 5px",
"height": "20px",
"font": "inherit",
"color": "inherit",
"background": "none",
"outline": "none",
"border": "none",
"border-radius": "10px",
"text-align": "start",
"white-space": "nowrap",
};
constructor(placeholder) {
super("EmailInput", "input");
this.type("email");
this.style(EmailInput.default_styling);
this.placeholder(placeholder);
}
}
class PhoneNumberInput extends Element {
static default_styling = {
"margin": "0px 0px 0px 0px",
"padding": "2.5px 5px 2.5px 5px",
"height": "20px",
"font": "inherit",
"color": "inherit",
"background": "none",
"outline": "none",
"border": "none",
"border-radius": "10px",
"text-align": "start",
"white-space": "nowrap",
};
constructor(placeholder) {
super("PhoneNumberInput", "input");
this.type("tel");
this.style(PhoneNumberInput.default_styling);
this.placeholder(placeholder);
}
}
class InputBox extends Element {
static default_styling = {
"margin": "0px 0px 0px 0px",
"padding": "2.5px 5px 2.5px 5px",
"height": "20px",
"font": "inherit",
"color": "inherit",
"background": "none",
"outline": "none",
"border": "none",
"border-radius": "10px",
"text-align": "start",
"white-space": "wrap",
"resize": "none",
};
constructor(placeholder) {
super("InputBox", "textarea");
this.style(InputBox.default_styling);
this.placeholder(placeholder);
}
}
class SelectOptionInput extends Element {
static default_styling = {
"margin": "0px 0px 0px 0px",
"padding": "2.5px 5px 2.5px 5px",
"height": "20px",
"font": "inherit",
"color": "inherit",
"background": "none",
"outline": "none",
"border": "none",
"border-radius": "10px",
"text-align": "start",
"white-space": "wrap",
"resize": "none",
};
constructor(placeholder) {
super("SelectOptionInput", "select");
this.style(SelectOptionInput.default_styling);
for (let i = 0; i < arguments.length; i++) {
let e = document.createElement("option");
if (i == 0) {
e.selected = true;
e.disabled = true;
} else {
e.value = arguments[i];
}
this.append(e);
}
}
}
class elements {
static get(id) {
for (let i = 0; i < VWEB_ALL_ELEMENTS.length; i++) {
const item = VWEB_ALL_ELEMENTS[i];
if (item.element.id == id) {
return item;
}
}
return null;
}
static get_by_id(id) {
return elements.get(id)
}
};
class user {
static uid() {
const i = utils.get_cookie("UserID");
console.log("UID: ", i);
if (i == -1) {
return null;
}
return i;
}
static authenticated() {
return user.uid()() != null;
}
static activated() {
if (utils.get_cookie("UserActivated") == "true") {
return true;
}
return false;
}
static get(success = null, error = null, before = null) {
return utils.request({
method: "GET",
url: "/backend/user/",
success: success,
error: error,
before: before,
});
}
static set(user, success = null, error = null, before = null) {
return utils.request({
method: "POST",
url: "/backend/user/",
data: user,
success: success,
error: error,
before: before,
});
}
static change_password(params = {"current_password": "", "password": "", "verify_password": ""}, success = null, error = null, before = null) {
return utils.request({
method: "GET",
url: "/backend/user/change_password",
data: params,
success: success,
error: error,
before: before,
});
}
static generate_api_key(success = null, error = null, before = null) {
return utils.request({
method: "POST",
url: "/backend/user/api_key",
success: success,
error: error,
before: before,
});
}
static revoke_api_key(success = null, error = null, before = null) {
return utils.request({
method: "DELETE",
url: "/backend/user/api_key",
success: success,
error: error,
before: before,
});
}
static load(params = {"path": ""}, success = null, error = null, before = null) {
return utils.request({
method: "GET",
url: "/backend/user/data",
data: params,
success: success,
error: error,
before: before,
});
}
static save(params = {"path": "", "data": {}}, success = null, error = null, before = null) {
return utils.request({
method: "POST",
url: "/backend/user/data",
data: params,
success: success,
error: error,
before: before,
});
}
}
class auth {
static sign_in(params = {"email": "", "username": "", "password": "", "2fa": ""}) {
return utils.request({
method: "POST",
url: "/backend/auth/signin",
data: params,
success: function(status, response) {
return response;
},
error: function(status, response) {
return response;
}
});
}
static sign_up(
params = {
"username": "",
"email": "",
"first_name": "",
"last_name": "",
"password": "",
"verify_password": "",
},
success = null,
error = null,
before = null
) {
return utils.request({
method: "POST",
url: "/backend/auth/signup",
data: params,
success: success,
error: error,
before: before,
});
}
static sign_out(success = null, error = null, before = null) {
return utils.request({
method: "POST",
url: "/backend/auth/signout",
success: success,
error: error,
before: before,
});
}
static activate(params = {"2fa": ""}, success = null, error = null, before = null) {
return utils.request({
method: "POST",
url: "/backend/auth/activate",
data: params,
success: success,
error: error,
before: before,
});
}
static send_2fa(params = {"email": ""}, success = null, error = null, before = null) {
return utils.request({
method: "GET",
url: "/backend/auth/2fa",
data: params,
success: success,
error: error,
before: before,
});
}
static forgot_password(params = {"email": "", "2fa": "", "password": "", "verify_password": ""}, success = null, error = null, before = null) {
return utils.request({
method: "GET",
url: "/backend/auth/forgot_password",
data: params,
success: success,
error: error,
before: before,
});
}
}
class utils {
static is_string(value) {
return typeof value === 'string' || value instanceof String;
}
static is_numeric(value) {
 return typeof value === 'number' && Number.isFinite(value);
}
static is_int(value) {
 return typeof value === 'number' && Number.isInteger(value);
}
static is_float(value) {
 return typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value);
}
static is_func(value) {
return typeof myVariable === 'function';
}
static eq(x, y) {
return x == y;
}
static not_eq(x, y) {
return x != y;
}
static gt(x, y) {
return x > y;
}
static gt_eq(x, y) {
return x >= y;
}
static lt(x, y) {
return x < y;
}
static lt_eq(x, y) {
return x <= y;
}
static get_device_width() {
return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}
static get_endpoint() {
endpoint = window.location.href.replace("https://", "").replace("http://", "");
endpoint = endpoint.substr(endpoint.indexOf('/'), endpoint.length);
return endpoint;
}
static get_cookie(name) {
let index = document.cookie.indexOf(name + "=");
if (index == -1) {
return null;
}
index += name.length + 1;
const value = document.cookie.substr(index, document.cookie.length);
if (value == null) { return null; }
index = value.indexOf(';');
if (index == -1) {
return value;
}
return value.substr(0, index);
}
static redirect(url, forced = false) {
if (forced || utils.get_endpoint() != url) {
window.location.href = url;
}
}
static delay(mseconds, func) {
setTimeout(mseconds, func);
}
static get_url_param(name) {
const params = new URLSearchParams(window.location.search);
return params.get(name);
}
static url_encode(params) {
const encodedParams = [];
for (const key in params) {
if (params.hasOwnProperty(key)) {
const encodedKey = encodeURIComponent(key);
const encodedValue = encodeURIComponent(params[key]);
encodedParams.push(`${encodedKey}=${encodedValue}`);
}
}
return encodedParams.join('&');
}
static request(params = {
method: null,
url: null,
data: null,
success: null,
error: null,
before: null,
}) {
if (params.data != null && !utils.is_string(params.data)) {
params.data = JSON.stringify(params.data);
}
if (params.before != null) {
params.before();
}
$.ajax({
url: params.url,
data: params.data,
type: params.method,
credentials: "true",
mimeType: "application/json",
contentType: "application/json",
dataType: "json",
success: function (response, status, xhr) {
return params.success(xhr.status, response);
},
error: function(xhr, status, error) {
let response;
try {
response = JSON.parse(xhr.responseText);
} catch (e) {
response = {"status": status, "error": xhr.responseText};
}
return params.error(xhr.status, response)
}
})
}
static on_content_loaded(func) {
document.addEventListener("DOMContentLoaded", func);
}
};
