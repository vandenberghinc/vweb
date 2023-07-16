/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
const vweb={}
class Element{
constructor(type,tag){
this.element_type=type;
this.element_tag=tag;
this.element_display="block";
this.element=document.createElement(this.element_tag);
vweb.elements.all_elements.push(this);
}
pad_numeric(value,padding="px"){
if(vweb.utils.is_numeric(value)){
return value+padding;
}
return value;
}
pad_percentage(value,padding="%"){
if(vweb.utils.is_float(value)&& value<1.0){
return(value*100)+padding;
}else if(vweb.utils.is_numeric(value)){
return value+padding;
}
return value;
}
edit_filter_wrapper(filter,type,to=null){
const pattern=new RegExp(`${type}\\([^)]*\\)\\s*`,"g");
if(pattern.test(filter)){
if(to==null){
return filter.replace(pattern,"");
}else{
return filter.replace(pattern,to);
}
}else if(to!=null){
return `${filter} ${to}`;
}
return value;
}
toggle_filter_wrapper(filter,type,to=null){
const pattern=new RegExp(`${type}\\([^)]*\\)\\s*`,"g");
if(pattern.test(filter)){
return filter.replace(pattern,"");
}else if(to!=null){
return `${filter} ${to}`;
}
return value;
}
append(...children){
if(children.length===0){
return this;
}
for(let i=0;i<children.length;i++){
const child=children[i];
if(child){
if(child.element!=null){
if(
child.element_type=="ForEach" ||
child.element_type=="If" ||
child.element_type=="IfDeviceWith"
){
child.append_children_to(this.element);
}else{
this.element.appendChild(child.element);
}
}
else if(child instanceof Node){
this.element.appendChild(child);
}
else if(vweb.utils.is_func(child)){
child();
}
}
}
return this;
}
zstack_append(...children){
if(children.length===0){
return this;
}
for(let i=0;i<children.length;i++){
const child=children[i];
if(child){
if(child.element!=null){
child.element.style.position="absolute";
if(
child.element_type=="ForEach" ||
child.element_type=="If" ||
child.element_type=="IfDeviceWith"
){
child.append_children_to(this.element);
}else{
this.element.appendChild(child.element);
}
}
else if(child instanceof Node){
child.element.style.position="absolute";
this.element.appendChild(child);
}
else if(vweb.utils.is_func(child)){
child();
}
}
}
return this;
}
append_to(parent){
parent.appendChild(this.element);
return this;
}
append_children_to(parent){
while(this.element.firstChild){
parent.appendChild(this.element.firstChild)
}
return this;
}
remove_children(){
while(this.element.firstChild){
this.element.removeChild(this.element.firstChild);
}
return this;
}
text(value){
if(value==null){
return this.element.textContent;
}
this.element.textContent=value;
return this;
}
value(val){
if(val==null){
return this.element.value;
}
this.element.value=val;
return this;
}
static elements_with_width_attribute=[
'canvas',
'embed',
'iframe',
'img',
'object',
'progress',
'video',
];
width(value){
if(value==null){
return this.element.offsetWidth;
}
if(Element.elements_with_width_attribute.includes(this.element_tag)){
this.element.width=value;
}else{
this.element.style.width=this.pad_numeric(value);
}
return this;
}
height(value){
if(value==null){
return this.element.offsetHeight;
}
if(Element.elements_with_width_attribute.includes(this.element_tag)){
this.element.height=value;
}else{
this.element.style.height=this.pad_numeric(value);
}
return this;
}
width_by_columns(columns){
let margin_left=this.element.style.marginLeft;
let margin_right=this.element.style.marginRight;
if(margin_left==null){
margin_left="0px";
}
if(margin_right==null){
margin_right="0px";
}
if(columns==null){
columns=1;
}
this.element.style.flexBasis="calc(100% / "+columns+" - ("+margin_left+" + "+margin_right+"))";
this.element.style.overflow="hidden";
return this;
}
x(){
return this.element.offsetLeft;
}
y(){
return this.element.offsetTop;
}
frame(width,height){
this.width(width);
this.height(height);
return this;
}
padding(...values){
if(values.length===1){
this.element.style.padding=this.pad_numeric(values[0]);
}else if(values.length===4){
this.element.style.paddingTop=this.pad_numeric(values[0]);
this.element.style.paddingRight=this.pad_numeric(values[1]);
this.element.style.paddingBottom=this.pad_numeric(values[2]);
this.element.style.paddingLeft=this.pad_numeric(values[3]);
}else{
console.error("Invalid number of arguments for function \"padding()\".");
}
return this;
}
margin(...values){
if(values.length===1){
this.element.style.margin=this.pad_numeric(values[0]);
}else if(values.length===4){
this.element.style.marginTop=this.pad_numeric(values[0]);
this.element.style.marginRight=this.pad_numeric(values[1]);
this.element.style.marginBottom=this.pad_numeric(values[2]);
this.element.style.marginLeft=this.pad_numeric(values[3]);
}else{
console.error("Invalid number of arguments for function \"margin()\".");
}
return this;
}
position(...values){
if(values.length===1){
this.element.style.position=values[0];
}else if(values.length===4){
this.element.style.position="absolute";
this.element.style.top=this.pad_numeric(values[0]);
this.element.style.right=this.pad_numeric(values[1]);
this.element.style.bottom=this.pad_numeric(values[2]);
this.element.style.left=this.pad_numeric(values[3]);
}else{
console.error("Invalid number of arguments for function \"position()\".");
}
return this;
}
stretch(value){
if(value==true){
this.element.style.flex=1;
}else{
this.element.style.flex=0;
}
return this;
}
wrap(value){
if(value==true){
this.element.style.whiteSpace="wrap";
}else if(value==false){
this.element.style.whiteSpace="nowrap";
}else{
this.element.style.whiteSpace=value;
}
switch(this.element_tag){
case "div":
if(value==true){
this.element.style.flexFlow="wrap";
}else if(value==false){
this.element.style.flexFlow="nowrap";
}else{
this.element.style.flexFlow=value;
}
break;
default:
if(value==true){
this.element.style.textWrap="wrap";
}else if(value==false){
this.element.style.textWrap="nowrap";
}else{
this.element.style.textWrap=value;
}
break;
}
return this;
}
z_index(value){
this.element.style["z-index"]=value;
return this;
}
align(value){
switch(this.element_type){
case "HStack":
this.element.style.justifyContent=value;
return this;
case "VStack":
this.element.style.alignItems=value;
return this;
default:
this.element.style.textAlign=value;
return this;
}
}
leading(){
return this.align("start");
}
center(){
return this.align("center");
}
trailing(){
return this.align("end");
}
align_vertical(value){
switch(this.element_type){
case "HStack":
this.element.style.alignItems=value;
return this;
case "VStack":
this.element.style.justifyContent=value;
return this;
default:
this.element.style.textAlign=value;
return this;
}
}
leading_vertical(){
return this.align_vertical("start");
}
center_vertical(){
return this.align_vertical("center");
}
trailing_vertical(){
return this.align_vertical("end");
}
align_text(value){
return this.text_align(value);
}
text_leading(){
return this.text_align("start");
}
text_center(){
return this.text_align("center");
}
text_trailing(){
return this.text_align("end");
}
align_height(){
return this.align_items("stretch");
}
color(value){
if(value==null){return this.element.style.color;}
if(value instanceof Gradient){
this.element.style.backgroundImage=value.gradient;
this.element.style.backgroundClip="text";
this.element.style["-webkit-background-clip"]="text";
this.element.style.color="transparent";
}else{
this.element.style.color=value;
}
return this;
}
border(...values){
if(values.length===1){
this.element.style.border=values[0];
}else if(values.length===2){
this.element.style.border=this.pad_numeric(values[0])+" solid "+values[1];
}else if(values.length===3){
this.element.style.border=this.pad_numeric(values[0])+" ",values[1]+" "+values[2];
}else{
console.error("Invalid number of arguments for function \"border()\".");
}
return this;
}
shadow(...values){
if(values.length===1){
this.element.style.boxShadow=this.pad_numeric(values[0]);
}else if(values.length===4){
this.element.style.boxShadow=
this.pad_numeric(values[0])+" "+
this.pad_numeric(values[1])+" "+
this.pad_numeric(values[2])+" "+
values[3];
}else{
console.error("Invalid number of arguments for function \"shadow()\".");
}
return this;
}
drop_shadow(...values){
if(values.length===0){
this.element.style.filter="";
this.element.style["-webkit-filter"]="";
}else if(values.length===1){
this.element.style.filter="drop-shadow("+this.pad_numeric(values[0])+") ";
this.element.style["-webkit-filter"]=this.element.style.filter;
}else if(values.length===4){
this.element.style.filter=
"drop-shadow("+
this.pad_numeric(values[0])+" "+
this.pad_numeric(values[1])+" "+
this.pad_numeric(values[2])+" "+
values[3]+") ";
this.element.style["-webkit-filter"]=this.element.style.filter;
}else{
console.error("Invalid number of arguments for function \"drop_shadow()\".");
}
return this;
}
greyscale(value){
if(value==null){
this.element.style.filter="";
this.element.style["-webkit-filter"]="";
}else{
this.element.style.filter+="grayscale("+this.pad_percentage(value,"")+") ";
this.element.style["-webkit-filter"]+="grayscale("+this.pad_percentage(value,"")+") ";
}
return this;
}
opacity(value){
this.element.style.opacity=value;
return this;
}
toggle_opacity(value=0.25){
if(typeof this.element.style.opacity==="undefined" || this.element.style.opacity=="" || this.element.style.opacity==1.0){
this.element.style.opacity=value;
}else{
this.element.style.opacity=1.0;
}
return this;
}
blur(value){
if(value==null){
this.element.style.filter=this.edit_filter_wrapper(this.element.style.filter,"blur",value);
}else{
this.element.style.filter=this.edit_filter_wrapper(this.element.style.filter,"blur","blur("+this.pad_numeric(value)+") ");
}
this.element.style["-webkit-filter"]=this.element.style.filter;
return this;
}
toggle_blur(value=10){
this.element.style.filter=this.toggle_filter_wrapper(this.element.style.filter,"blur","blur("+this.pad_numeric(value)+") ");
this.element.style["-webkit-filter"]=this.element.style.filter;
return this;
}
background_blur(value){
if(value==null){
this.element.style.backdropFilter=this.edit_filter_wrapper(this.element.style.backdropFilter,"blur",value);
}else{
this.element.style.backdropFilter=this.edit_filter_wrapper(this.element.style.backdropFilter,"blur","blur("+this.pad_numeric(value)+") ");
}
this.element.style["-webkit-backdrop-filter"]=this.element.style.backdropFilter;
return this;
}
toggle_background_blur(value=10){
this.element.style.backdropFilter=this.toggle_filter_wrapper(this.element.style.backdropFilter,"blur","blur("+this.pad_numeric(value)+") ");
this.element.style["-webkit-backdrop-filter"]=this.element.style.backdropFilter;
return this;
}
brightness(value){
if(value==null){
this.element.style.filter=this.edit_filter_wrapper(this.element.style.filter,"brightness",value);
}else{
this.element.style.filter=this.edit_filter_wrapper(this.element.style.filter,"brightness","brightness("+this.pad_percentage(value,"%")+") ");
}
this.element.style["-webkit-filter"]=this.element.style.filter;
return this;
}
toggle_brightness(value=0.5){
this.element.style.filter=this.toggle_filter_wrapper(this.element.style.filter,"brightness","brightness("+this.pad_percentage(value,"%")+") ");
this.element.style["-webkit-filter"]=this.element.style.filter;
return this;
}
background_brightness(value){
if(value==null){
this.element.style.backdropFilter=this.edit_filter_wrapper(this.element.style.backdropFilter,"brightness",value);
}else{
this.element.style.backdropFilter=this.edit_filter_wrapper(this.element.style.backdropFilter,"brightness","brightness("+this.pad_percentage(value,"%")+") ");
}
this.element.style["-webkit-backdrop-filter"]=this.element.style.backdropFilter;
return this;
}
toggle_background_brightness(value=10){
this.element.style.backdropFilter=this.toggle_filter_wrapper(this.element.style.backdropFilter,"brightness","brightness("+this.pad_percentage(value,"%")+") ");
this.element.style["-webkit-backdrop-filter"]=this.element.style.backdropFilter;
return this;
}
display(value){
if(value!=null && value!="none"){
this.element_display=value;
}
this.element.style.display=value;
return this;
}
hide(){
this.element.style.display="none";
return this;
}
show(){
this.element.style.display=this.element_display;
return this;
}
hidden(...args){
if(args.length===0){
return this.element.style.display=="none" || typeof this.element.style.display==="undefined";
}
console.error("Function \"hidden()\" should not be used with arguments, use \"hide()\" and \"show()\" instead.");
}
toggle_visibility(){
if(this.hidden()){
this.show();
}else{
this.hide();
}
return this;
}
inner_html(value){
if(value==null){
return this.element.innerHTML;
}
this.element.innerHTML=value;
return this;
}
outer_html(value){
if(value==null){
return this.element.outerHTML;
}
this.element.outerHTML=value;
return this;
}
style(css_attr){
if(css_attr==null){
let dict={};
for(let property in this.element.style){
if(this.element.style.hasOwnProperty(property)){
const key=this.element.style[property];
const value=this.element.style[key];
if(key!=='' && key!==undefined && typeof key!=='function' &&
value!=='' && value!==undefined && typeof value!=='function'){
dict[key]=value;
}
}
}
return dict;
}
for(let i in css_attr){
const value=css_attr[i];
if(i=="display" && value!=null && value!="none"){
this.element_display=value;
}
this.element.style[i]=value;
}
return this;
}
attribute(key,value=null){
if(value==null){
return this.element[key];
}
this.element[key]=value;
return this;
}
attributes(html_attr){
for(let i in html_attr){
this.element[i]=html_attr[i];
}
return this;
}
event(key,value=null){
if(value==null){
return this.element[key];
}
this.element[key]=value;
return this;
}
events(html_events){
for(let i in html_events){
this.element[i]=i[html_events];
}
return this;
}
class(value){
if(value==null){return this.element.class;}
this.element.className=value;
return this;
}
media(media_query,true_handler,false_handler){
const e=this;
function query_handler(query){
if(query.matches){
true_handler(e);
}else if(false_handler!=null){
false_handler(e);
}
}
const query_list=window.matchMedia(media_query);
query_handler(query_list);query_list.addListener(query_handler);return this;
}
animate({
keyframes=[],
options={duration: 300,easing: "ease-in-out"},
on_finish=null,
}){
const animation=this.element.animate(keyframes,options);
if(on_finish!==null){
const e=this;
animation.onfinish=function(){
on_finish(e);
}
}
return this;
}
on_click(value){
this.element.style.cursor="pointer";
this.element.onclick=value;
return this;
}
toString(){
return this.element.outerHTML;
}
accent_color(value){
if(value==null){return this.element.style.accentColor;}
this.element.style.accentColor=value;
return this;
}
align_content(value){
if(value==null){return this.element.style.alignContent;}
this.element.style.alignContent=value;
return this;
}
align_items(value){
if(value==null){return this.element.style.alignItems;}
this.element.style.alignItems=value;
return this;
}
align_self(value){
if(value==null){return this.element.style.alignSelf;}
this.element.style.alignSelf=value;
return this;
}
all(value){
if(value==null){return this.element.style.all;}
this.element.style.all=value;
return this;
}
animation(value){
if(value==null){return this.element.style.animation;}
this.element.style.animation=value;
return this;
}
animation_delay(value){
if(value==null){return this.element.style.animationDelay;}
this.element.style.animationDelay=value;
return this;
}
animation_direction(value){
if(value==null){return this.element.style.animationDirection;}
this.element.style.animationDirection=value;
return this;
}
animation_duration(value){
if(value==null){return this.element.style.animationDuration;}
this.element.style.animationDuration=value;
return this;
}
animation_fill_mode(value){
if(value==null){return this.element.style.animationFillMode;}
this.element.style.animationFillMode=value;
return this;
}
animation_iteration_count(value){
if(value==null){return this.element.style.animationIterationCount;}
this.element.style.animationIterationCount=value;
return this;
}
animation_name(value){
if(value==null){return this.element.style.animationName;}
this.element.style.animationName=value;
return this;
}
animation_play_state(value){
if(value==null){return this.element.style.animationPlayState;}
this.element.style.animationPlayState=value;
return this;
}
animation_timing_function(value){
if(value==null){return this.element.style.animationTimingFunction;}
this.element.style.animationTimingFunction=value;
return this;
}
aspect_ratio(value){
if(value==null){return this.element.style.aspectRatio;}
this.element.style.aspectRatio=value;
return this;
}
backdrop_filter(value){
if(value==null){return this.element.style.backdropFilter;}
this.element.style.backdropFilter=value;
return this;
}
backface_visibility(value){
if(value==null){return this.element.style.backfaceVisibility;}
this.element.style.backfaceVisibility=value;
return this;
}
background(value){
if(value==null){return this.element.style.background;}
this.element.style.background=value;
return this;
}
background_attachment(value){
if(value==null){return this.element.style.backgroundAttachment;}
this.element.style.backgroundAttachment=value;
return this;
}
background_blend_mode(value){
if(value==null){return this.element.style.backgroundBlendMode;}
this.element.style.backgroundBlendMode=value;
return this;
}
background_clip(value){
if(value==null){return this.element.style.backgroundClip;}
this.element.style.backgroundClip=value;
return this;
}
background_color(value){
if(value==null){return this.element.style.backgroundColor;}
this.element.style.backgroundColor=value;
return this;
}
background_image(value){
if(value==null){return this.element.style.backgroundImage;}
this.element.style.backgroundImage=value;
return this;
}
background_origin(value){
if(value==null){return this.element.style.backgroundOrigin;}
this.element.style.backgroundOrigin=value;
return this;
}
background_position(value){
if(value==null){return this.element.style.backgroundPosition;}
this.element.style.backgroundPosition=value;
return this;
}
background_position_x(value){
if(value==null){return this.element.style.backgroundPositionX;}
this.element.style.backgroundPositionX=value;
return this;
}
background_position_y(value){
if(value==null){return this.element.style.backgroundPositionY;}
this.element.style.backgroundPositionY=value;
return this;
}
background_repeat(value){
if(value==null){return this.element.style.backgroundRepeat;}
this.element.style.backgroundRepeat=value;
return this;
}
background_size(value){
if(value==null){return this.element.style.backgroundSize;}
this.element.style.backgroundSize=this.pad_numeric(value);
return this;
}
block_size(value){
if(value==null){return this.element.style.blockSize;}
this.element.style.blockSize=this.pad_numeric(value);
return this;
}
border_block(value){
if(value==null){return this.element.style.borderBlock;}
this.element.style.borderBlock=value;
return this;
}
border_block_color(value){
if(value==null){return this.element.style.borderBlockColor;}
this.element.style.borderBlockColor=value;
return this;
}
border_block_end_color(value){
if(value==null){return this.element.style.borderBlockEndColor;}
this.element.style.borderBlockEndColor=value;
return this;
}
border_block_end_style(value){
if(value==null){return this.element.style.borderBlockEndStyle;}
this.element.style.borderBlockEndStyle=value;
return this;
}
border_block_end_width(value){
if(value==null){return this.element.style.borderBlockEndWidth;}
this.element.style.borderBlockEndWidth=this.pad_numeric(value);
return this;
}
border_block_start_color(value){
if(value==null){return this.element.style.borderBlockStartColor;}
this.element.style.borderBlockStartColor=value;
return this;
}
border_block_start_style(value){
if(value==null){return this.element.style.borderBlockStartStyle;}
this.element.style.borderBlockStartStyle=value;
return this;
}
border_block_start_width(value){
if(value==null){return this.element.style.borderBlockStartWidth;}
this.element.style.borderBlockStartWidth=this.pad_numeric(value);
return this;
}
border_block_style(value){
if(value==null){return this.element.style.borderBlockStyle;}
this.element.style.borderBlockStyle=value;
return this;
}
border_block_width(value){
if(value==null){return this.element.style.borderBlockWidth;}
this.element.style.borderBlockWidth=this.pad_numeric(value);
return this;
}
border_bottom(value){
if(value==null){return this.element.style.borderBottom;}
this.element.style.borderBottom=this.pad_numeric(value);
return this;
}
border_bottom_color(value){
if(value==null){return this.element.style.borderBottomColor;}
this.element.style.borderBottomColor=value;
return this;
}
border_bottom_left_radius(value){
if(value==null){return this.element.style.borderBottomLeftRadius;}
this.element.style.borderBottomLeftRadius=this.pad_numeric(value);
return this;
}
border_bottom_right_radius(value){
if(value==null){return this.element.style.borderBottomRightRadius;}
this.element.style.borderBottomRightRadius=this.pad_numeric(value);
return this;
}
border_bottom_style(value){
if(value==null){return this.element.style.borderBottomStyle;}
this.element.style.borderBottomStyle=value;
return this;
}
border_bottom_width(value){
if(value==null){return this.element.style.borderBottomWidth;}
this.element.style.borderBottomWidth=this.pad_numeric(value);
return this;
}
border_collapse(value){
if(value==null){return this.element.style.borderCollapse;}
this.element.style.borderCollapse=value;
return this;
}
border_color(value){
if(value==null){return this.element.style.borderColor;}
this.element.style.borderColor=value;
return this;
}
border_image(value){
if(value==null){return this.element.style.borderImage;}
this.element.style.borderImage=value;
return this;
}
border_image_outset(value){
if(value==null){return this.element.style.borderImageOutset;}
this.element.style.borderImageOutset=value;
return this;
}
border_image_repeat(value){
if(value==null){return this.element.style.borderImageRepeat;}
this.element.style.borderImageRepeat=value;
return this;
}
border_image_slice(value){
if(value==null){return this.element.style.borderImageSlice;}
this.element.style.borderImageSlice=value;
return this;
}
border_image_source(value){
if(value==null){return this.element.style.borderImageSource;}
this.element.style.borderImageSource=value;
return this;
}
border_image_width(value){
if(value==null){return this.element.style.borderImageWidth;}
this.element.style.borderImageWidth=this.pad_numeric(value);
return this;
}
border_inline(value){
if(value==null){return this.element.style.borderInline;}
this.element.style.borderInline=value;
return this;
}
border_inline_color(value){
if(value==null){return this.element.style.borderInlineColor;}
this.element.style.borderInlineColor=value;
return this;
}
border_inline_end_color(value){
if(value==null){return this.element.style.borderInlineEndColor;}
this.element.style.borderInlineEndColor=value;
return this;
}
border_inline_end_style(value){
if(value==null){return this.element.style.borderInlineEndStyle;}
this.element.style.borderInlineEndStyle=value;
return this;
}
border_inline_end_width(value){
if(value==null){return this.element.style.borderInlineEndWidth;}
this.element.style.borderInlineEndWidth=this.pad_numeric(value);
return this;
}
border_inline_start_color(value){
if(value==null){return this.element.style.borderInlineStartColor;}
this.element.style.borderInlineStartColor=value;
return this;
}
border_inline_start_style(value){
if(value==null){return this.element.style.borderInlineStartStyle;}
this.element.style.borderInlineStartStyle=value;
return this;
}
border_inline_start_width(value){
if(value==null){return this.element.style.borderInlineStartWidth;}
this.element.style.borderInlineStartWidth=this.pad_numeric(value);
return this;
}
border_inline_style(value){
if(value==null){return this.element.style.borderInlineStyle;}
this.element.style.borderInlineStyle=value;
return this;
}
border_inline_width(value){
if(value==null){return this.element.style.borderInlineWidth;}
this.element.style.borderInlineWidth=this.pad_numeric(value);
return this;
}
border_left(value){
if(value==null){return this.element.style.borderLeft;}
this.element.style.borderLeft=this.pad_numeric(value);
return this;
}
border_left_color(value){
if(value==null){return this.element.style.borderLeftColor;}
this.element.style.borderLeftColor=value;
return this;
}
border_left_style(value){
if(value==null){return this.element.style.borderLeftStyle;}
this.element.style.borderLeftStyle=value;
return this;
}
border_left_width(value){
if(value==null){return this.element.style.borderLeftWidth;}
this.element.style.borderLeftWidth=this.pad_numeric(value);
return this;
}
border_radius(value){
if(value==null){return this.element.style.borderRadius;}
this.element.style.borderRadius=this.pad_numeric(value);
return this;
}
border_right(value){
if(value==null){return this.element.style.borderRight;}
this.element.style.borderRight=this.pad_numeric(value);
return this;
}
border_right_color(value){
if(value==null){return this.element.style.borderRightColor;}
this.element.style.borderRightColor=value;
return this;
}
border_right_style(value){
if(value==null){return this.element.style.borderRightStyle;}
this.element.style.borderRightStyle=value;
return this;
}
border_right_width(value){
if(value==null){return this.element.style.borderRightWidth;}
this.element.style.borderRightWidth=this.pad_numeric(value);
return this;
}
border_spacing(value){
if(value==null){return this.element.style.borderSpacing;}
this.element.style.borderSpacing=value;
return this;
}
border_style(value){
if(value==null){return this.element.style.borderStyle;}
this.element.style.borderStyle=value;
return this;
}
border_top(value){
if(value==null){return this.element.style.borderTop;}
this.element.style.borderTop=this.pad_numeric(value);
return this;
}
border_top_color(value){
if(value==null){return this.element.style.borderTopColor;}
this.element.style.borderTopColor=value;
return this;
}
border_top_left_radius(value){
if(value==null){return this.element.style.borderTopLeftRadius;}
this.element.style.borderTopLeftRadius=this.pad_numeric(value);
return this;
}
border_top_right_radius(value){
if(value==null){return this.element.style.borderTopRightRadius;}
this.element.style.borderTopRightRadius=this.pad_numeric(value);
return this;
}
border_top_style(value){
if(value==null){return this.element.style.borderTopStyle;}
this.element.style.borderTopStyle=value;
return this;
}
border_top_width(value){
if(value==null){return this.element.style.borderTopWidth;}
this.element.style.borderTopWidth=this.pad_numeric(value);
return this;
}
border_width(value){
if(value==null){return this.element.style.borderWidth;}
this.element.style.borderWidth=this.pad_numeric(value);
return this;
}
bottom(value){
if(value==null){return this.element.style.bottom;}
this.element.style.bottom=this.pad_numeric(value);
return this;
}
box_decoration_break(value){
if(value==null){return this.element.style.boxDecorationBreak;}
this.element.style.boxDecorationBreak=value;
return this;
}
box_reflect(value){
if(value==null){return this.element.style.boxReflect;}
this.element.style.boxReflect=value;
return this;
}
box_shadow(value){
if(value==null){return this.element.style.boxShadow;}
this.element.style.boxShadow=value;
return this;
}
box_sizing(value){
if(value==null){return this.element.style.boxSizing;}
this.element.style.boxSizing=value;
return this;
}
break_after(value){
if(value==null){return this.element.style.breakAfter;}
this.element.style.breakAfter=value;
return this;
}
break_before(value){
if(value==null){return this.element.style.breakBefore;}
this.element.style.breakBefore=value;
return this;
}
break_inside(value){
if(value==null){return this.element.style.breakInside;}
this.element.style.breakInside=value;
return this;
}
caption_side(value){
if(value==null){return this.element.style.captionSide;}
this.element.style.captionSide=value;
return this;
}
caret_color(value){
if(value==null){return this.element.style.caretColor;}
this.element.style.caretColor=value;
return this;
}
clear(value){
if(value==null){return this.element.style.clear;}
this.element.style.clear=value;
return this;
}
clip(value){
if(value==null){return this.element.style.clip;}
this.element.style.clip=value;
return this;
}
column_count(value){
if(value==null){return this.element.style.columnCount;}
this.element.style.columnCount=value;
return this;
}
column_fill(value){
if(value==null){return this.element.style.columnFill;}
this.element.style.columnFill=value;
return this;
}
column_gap(value){
if(value==null){return this.element.style.columnGap;}
this.element.style.columnGap=value;
return this;
}
column_rule(value){
if(value==null){return this.element.style.columnRule;}
this.element.style.columnRule=value;
return this;
}
column_rule_color(value){
if(value==null){return this.element.style.columnRuleColor;}
this.element.style.columnRuleColor=value;
return this;
}
column_rule_style(value){
if(value==null){return this.element.style.columnRuleStyle;}
this.element.style.columnRuleStyle=value;
return this;
}
column_rule_width(value){
if(value==null){return this.element.style.columnRuleWidth;}
this.element.style.columnRuleWidth=this.pad_numeric(value);
return this;
}
column_span(value){
if(value==null){return this.element.style.columnSpan;}
this.element.style.columnSpan=value;
return this;
}
column_width(value){
if(value==null){return this.element.style.columnWidth;}
this.element.style.columnWidth=this.pad_numeric(value);
return this;
}
columns(value){
if(value==null){return this.element.style.columns;}
this.element.style.columns=value;
return this;
}
content(value){
if(value==null){return this.element.style.content;}
this.element.style.content=value;
return this;
}
counter_increment(value){
if(value==null){return this.element.style.counterIncrement;}
this.element.style.counterIncrement=value;
return this;
}
counter_reset(value){
if(value==null){return this.element.style.counterReset;}
this.element.style.counterReset=value;
return this;
}
cursor(value){
if(value==null){return this.element.style.cursor;}
this.element.style.cursor=value;
return this;
}
direction(value){
if(value==null){return this.element.style.direction;}
this.element.style.direction=value;
return this;
}
empty_cells(value){
if(value==null){return this.element.style.emptyCells;}
this.element.style.emptyCells=value;
return this;
}
filter(value){
if(value==null){return this.element.style.filter;}
this.element.style.filter=value;
return this;
}
flex(value){
if(value==null){return this.element.style.flex;}
this.element.style.flex=value;
return this;
}
flex_basis(value){
if(value==null){return this.element.style.flexBasis;}
this.element.style.flexBasis=value;
return this;
}
flex_direction(value){
if(value==null){return this.element.style.flexDirection;}
this.element.style.flexDirection=value;
return this;
}
flex_flow(value){
if(value==null){return this.element.style.flexFlow;}
this.element.style.flexFlow=value;
return this;
}
flex_grow(value){
if(value==null){return this.element.style.flexGrow;}
this.element.style.flexGrow=value;
return this;
}
flex_shrink(value){
if(value==null){return this.element.style.flexShrink;}
this.element.style.flexShrink=value;
return this;
}
flex_wrap(value){
if(value==null){return this.element.style.flexWrap;}
this.element.style.flexWrap=value;
return this;
}
float(value){
if(value==null){return this.element.style.float;}
this.element.style.float=value;
return this;
}
font(value){
if(value==null){return this.element.style.font;}
this.element.style.font=value;
return this;
}
font_family(value){
if(value==null){return this.element.style.fontFamily;}
this.element.style.fontFamily=value;
return this;
}
font_feature_settings(value){
if(value==null){return this.element.style.fontFeatureSettings;}
this.element.style.fontFeatureSettings=value;
return this;
}
font_kerning(value){
if(value==null){return this.element.style.fontKerning;}
this.element.style.fontKerning=value;
return this;
}
font_language_override(value){
if(value==null){return this.element.style.fontLanguageOverride;}
this.element.style.fontLanguageOverride=value;
return this;
}
font_size(value){
if(value==null){return this.element.style.fontSize;}
this.element.style.fontSize=this.pad_numeric(value);
return this;
}
font_size_adjust(value){
if(value==null){return this.element.style.fontSizeAdjust;}
this.element.style.fontSizeAdjust=value;
return this;
}
font_stretch(value){
if(value==null){return this.element.style.fontStretch;}
this.element.style.fontStretch=value;
return this;
}
font_style(value){
if(value==null){return this.element.style.fontStyle;}
this.element.style.fontStyle=value;
return this;
}
font_synthesis(value){
if(value==null){return this.element.style.fontSynthesis;}
this.element.style.fontSynthesis=value;
return this;
}
font_variant(value){
if(value==null){return this.element.style.fontVariant;}
this.element.style.fontVariant=value;
return this;
}
font_variant_alternates(value){
if(value==null){return this.element.style.fontVariantAlternates;}
this.element.style.fontVariantAlternates=value;
return this;
}
font_variant_caps(value){
if(value==null){return this.element.style.fontVariantCaps;}
this.element.style.fontVariantCaps=value;
return this;
}
font_variant_east_asian(value){
if(value==null){return this.element.style.fontVariantEastAsian;}
this.element.style.fontVariantEastAsian=value;
return this;
}
font_variant_ligatures(value){
if(value==null){return this.element.style.fontVariantLigatures;}
this.element.style.fontVariantLigatures=value;
return this;
}
font_variant_numeric(value){
if(value==null){return this.element.style.fontVariantNumeric;}
this.element.style.fontVariantNumeric=value;
return this;
}
font_variant_position(value){
if(value==null){return this.element.style.fontVariantPosition;}
this.element.style.fontVariantPosition=value;
return this;
}
font_weight(value){
if(value==null){return this.element.style.fontWeight;}
this.element.style.fontWeight=value;
return this;
}
gap(value){
if(value==null){return this.element.style.gap;}
this.element.style.gap=value;
return this;
}
grid(value){
if(value==null){return this.element.style.grid;}
this.element.style.grid=value;
return this;
}
grid_area(value){
if(value==null){return this.element.style.gridArea;}
this.element.style.gridArea=value;
return this;
}
grid_auto_columns(value){
if(value==null){return this.element.style.gridAutoColumns;}
this.element.style.gridAutoColumns=value;
return this;
}
grid_auto_flow(value){
if(value==null){return this.element.style.gridAutoFlow;}
this.element.style.gridAutoFlow=value;
return this;
}
grid_auto_rows(value){
if(value==null){return this.element.style.gridAutoRows;}
this.element.style.gridAutoRows=value;
return this;
}
grid_column(value){
if(value==null){return this.element.style.gridColumn;}
this.element.style.gridColumn=value;
return this;
}
grid_column_end(value){
if(value==null){return this.element.style.gridColumnEnd;}
this.element.style.gridColumnEnd=value;
return this;
}
grid_column_gap(value){
if(value==null){return this.element.style.gridColumnGap;}
this.element.style.gridColumnGap=value;
return this;
}
grid_column_start(value){
if(value==null){return this.element.style.gridColumnStart;}
this.element.style.gridColumnStart=value;
return this;
}
grid_gap(value){
if(value==null){return this.element.style.gridGap;}
this.element.style.gridGap=value;
return this;
}
grid_row(value){
if(value==null){return this.element.style.gridRow;}
this.element.style.gridRow=value;
return this;
}
grid_row_end(value){
if(value==null){return this.element.style.gridRowEnd;}
this.element.style.gridRowEnd=value;
return this;
}
grid_row_gap(value){
if(value==null){return this.element.style.gridRowGap;}
this.element.style.gridRowGap=value;
return this;
}
grid_row_start(value){
if(value==null){return this.element.style.gridRowStart;}
this.element.style.gridRowStart=value;
return this;
}
grid_template(value){
if(value==null){return this.element.style.gridTemplate;}
this.element.style.gridTemplate=value;
return this;
}
grid_template_areas(value){
if(value==null){return this.element.style.gridTemplateAreas;}
this.element.style.gridTemplateAreas=value;
return this;
}
grid_template_columns(value){
if(value==null){return this.element.style.gridTemplateColumns;}
this.element.style.gridTemplateColumns=value;
return this;
}
grid_template_rows(value){
if(value==null){return this.element.style.gridTemplateRows;}
this.element.style.gridTemplateRows=value;
return this;
}
hanging_punctuation(value){
if(value==null){return this.element.style.hangingPunctuation;}
this.element.style.hangingPunctuation=value;
return this;
}
hyphens(value){
if(value==null){return this.element.style.hyphens;}
this.element.style.hyphens=value;
return this;
}
image_rendering(value){
if(value==null){return this.element.style.imageRendering;}
this.element.style.imageRendering=value;
return this;
}
inline_size(value){
if(value==null){return this.element.style.inlineSize;}
this.element.style.inlineSize=this.pad_numeric(value);
return this;
}
inset(value){
if(value==null){return this.element.style.inset;}
this.element.style.inset=value;
return this;
}
inset_block(value){
if(value==null){return this.element.style.insetBlock;}
this.element.style.insetBlock=value;
return this;
}
inset_block_end(value){
if(value==null){return this.element.style.insetBlockEnd;}
this.element.style.insetBlockEnd=value;
return this;
}
inset_block_start(value){
if(value==null){return this.element.style.insetBlockStart;}
this.element.style.insetBlockStart=value;
return this;
}
inset_inline(value){
if(value==null){return this.element.style.insetInline;}
this.element.style.insetInline=value;
return this;
}
inset_inline_end(value){
if(value==null){return this.element.style.insetInlineEnd;}
this.element.style.insetInlineEnd=value;
return this;
}
inset_inline_start(value){
if(value==null){return this.element.style.insetInlineStart;}
this.element.style.insetInlineStart=value;
return this;
}
isolation(value){
if(value==null){return this.element.style.isolation;}
this.element.style.isolation=value;
return this;
}
justify_content(value){
if(value==null){return this.element.style.justifyContent;}
this.element.style.justifyContent=value;
return this;
}
justify_items(value){
if(value==null){return this.element.style.justifyItems;}
this.element.style.justifyItems=value;
return this;
}
justify_self(value){
if(value==null){return this.element.style.justifySelf;}
this.element.style.justifySelf=value;
return this;
}
left(value){
if(value==null){return this.element.style.left;}
this.element.style.left=this.pad_numeric(value);
return this;
}
letter_spacing(value){
if(value==null){return this.element.style.letterSpacing;}
this.element.style.letterSpacing=value;
return this;
}
line_break(value){
if(value==null){return this.element.style.lineBreak;}
this.element.style.lineBreak=value;
return this;
}
line_height(value){
if(value==null){return this.element.style.lineHeight;}
this.element.style.lineHeight=this.pad_numeric(value);
return this;
}
list_style(value){
if(value==null){return this.element.style.listStyle;}
this.element.style.listStyle=value;
return this;
}
list_style_image(value){
if(value==null){return this.element.style.listStyleImage;}
this.element.style.listStyleImage=value;
return this;
}
list_style_position(value){
if(value==null){return this.element.style.listStylePosition;}
this.element.style.listStylePosition=value;
return this;
}
list_style_type(value){
if(value==null){return this.element.style.listStyleType;}
this.element.style.listStyleType=value;
return this;
}
margin_block(value){
if(value==null){return this.element.style.marginBlock;}
this.element.style.marginBlock=value;
return this;
}
margin_block_end(value){
if(value==null){return this.element.style.marginBlockEnd;}
this.element.style.marginBlockEnd=value;
return this;
}
margin_block_start(value){
if(value==null){return this.element.style.marginBlockStart;}
this.element.style.marginBlockStart=value;
return this;
}
margin_bottom(value){
if(value==null){return this.element.style.marginBottom;}
this.element.style.marginBottom=this.pad_numeric(value);
return this;
}
margin_inline(value){
if(value==null){return this.element.style.marginInline;}
this.element.style.marginInline=value;
return this;
}
margin_inline_end(value){
if(value==null){return this.element.style.marginInlineEnd;}
this.element.style.marginInlineEnd=value;
return this;
}
margin_inline_start(value){
if(value==null){return this.element.style.marginInlineStart;}
this.element.style.marginInlineStart=value;
return this;
}
margin_left(value){
if(value==null){return this.element.style.marginLeft;}
this.element.style.marginLeft=this.pad_numeric(value);
return this;
}
margin_right(value){
if(value==null){return this.element.style.marginRight;}
this.element.style.marginRight=this.pad_numeric(value);
return this;
}
margin_top(value){
if(value==null){return this.element.style.marginTop;}
this.element.style.marginTop=this.pad_numeric(value);
return this;
}
mask(value){
if(value==null){return this.element.style.mask;}
this.element.style.mask=value;
return this;
}
mask_clip(value){
if(value==null){return this.element.style.maskClip;}
this.element.style.maskClip=value;
return this;
}
mask_composite(value){
if(value==null){return this.element.style.maskComposite;}
this.element.style.maskComposite=value;
return this;
}
mask_image(value){
if(value==null){return this.element.style.maskImage;}
this.element.style.maskImage=value;
return this;
}
mask_mode(value){
if(value==null){return this.element.style.maskMode;}
this.element.style.maskMode=value;
return this;
}
mask_origin(value){
if(value==null){return this.element.style.maskOrigin;}
this.element.style.maskOrigin=value;
return this;
}
mask_position(value){
if(value==null){return this.element.style.maskPosition;}
this.element.style.maskPosition=value;
return this;
}
mask_repeat(value){
if(value==null){return this.element.style.maskRepeat;}
this.element.style.maskRepeat=value;
return this;
}
mask_size(value){
if(value==null){return this.element.style.maskSize;}
this.element.style.maskSize=this.pad_numeric(value);
return this;
}
mask_type(value){
if(value==null){return this.element.style.maskType;}
this.element.style.maskType=value;
return this;
}
max_height(value){
if(value==null){return this.element.style.maxHeight;}
this.element.style.maxHeight=this.pad_numeric(value);
return this;
}
max_width(value){
if(value==null){return this.element.style.maxWidth;}
this.element.style.maxWidth=this.pad_numeric(value);
return this;
}
max_block_size(value){
if(value==null){return this.element.style.maxBlockSize;}
this.element.style.maxBlockSize=this.pad_numeric(value);
return this;
}
max_inline_size(value){
if(value==null){return this.element.style.maxInlineSize;}
this.element.style.maxInlineSize=this.pad_numeric(value);
return this;
}
min_block_size(value){
if(value==null){return this.element.style.minBlockSize;}
this.element.style.minBlockSize=this.pad_numeric(value);
return this;
}
min_inline_size(value){
if(value==null){return this.element.style.minInlineSize;}
this.element.style.minInlineSize=this.pad_numeric(value);
return this;
}
min_height(value){
if(value==null){return this.element.style.minHeight;}
this.element.style.minHeight=this.pad_numeric(value);
return this;
}
min_width(value){
if(value==null){return this.element.style.minWidth;}
this.element.style.minWidth=this.pad_numeric(value);
return this;
}
mix_blend_mode(value){
if(value==null){return this.element.style.mixBlendMode;}
this.element.style.mixBlendMode=value;
return this;
}
object_fit(value){
if(value==null){return this.element.style.objectFit;}
this.element.style.objectFit=value;
return this;
}
object_position(value){
if(value==null){return this.element.style.objectPosition;}
this.element.style.objectPosition=value;
return this;
}
offset(value){
if(value==null){return this.element.style.offset;}
this.element.style.offset=value;
return this;
}
offset_anchor(value){
if(value==null){return this.element.style.offsetAnchor;}
this.element.style.offsetAnchor=value;
return this;
}
offset_distance(value){
if(value==null){return this.element.style.offsetDistance;}
this.element.style.offsetDistance=value;
return this;
}
offset_path(value){
if(value==null){return this.element.style.offsetPath;}
this.element.style.offsetPath=value;
return this;
}
offset_rotate(value){
if(value==null){return this.element.style.offsetRotate;}
this.element.style.offsetRotate=value;
return this;
}
opacity(value){
if(value==null){return this.element.style.opacity;}
this.element.style.opacity=value;
return this;
}
order(value){
if(value==null){return this.element.style.order;}
this.element.style.order=value;
return this;
}
orphans(value){
if(value==null){return this.element.style.orphans;}
this.element.style.orphans=value;
return this;
}
outline(value){
if(value==null){return this.element.style.outline;}
this.element.style.outline=value;
return this;
}
outline_color(value){
if(value==null){return this.element.style.outlineColor;}
this.element.style.outlineColor=value;
return this;
}
outline_offset(value){
if(value==null){return this.element.style.outlineOffset;}
this.element.style.outlineOffset=value;
return this;
}
outline_style(value){
if(value==null){return this.element.style.outlineStyle;}
this.element.style.outlineStyle=value;
return this;
}
outline_width(value){
if(value==null){return this.element.style.outlineWidth;}
this.element.style.outlineWidth=this.pad_numeric(value);
return this;
}
overflow(value){
if(value==null){return this.element.style.overflow;}
this.element.style.overflow=value;
return this;
}
overflow_anchor(value){
if(value==null){return this.element.style.overflowAnchor;}
this.element.style.overflowAnchor=value;
return this;
}
overflow_wrap(value){
if(value==null){return this.element.style.overflowWrap;}
this.element.style.overflowWrap=value;
return this;
}
overflow_x(value){
if(value==null){return this.element.style.overflowX;}
this.element.style.overflowX=value;
return this;
}
overflow_y(value){
if(value==null){return this.element.style.overflowY;}
this.element.style.overflowY=value;
return this;
}
overscroll_behavior(value){
if(value==null){return this.element.style.overscrollBehavior;}
this.element.style.overscrollBehavior=value;
return this;
}
overscroll_behavior_block(value){
if(value==null){return this.element.style.overscrollBehaviorBlock;}
this.element.style.overscrollBehaviorBlock=value;
return this;
}
overscroll_behavior_inline(value){
if(value==null){return this.element.style.overscrollBehaviorInline;}
this.element.style.overscrollBehaviorInline=value;
return this;
}
overscroll_behavior_x(value){
if(value==null){return this.element.style.overscrollBehaviorX;}
this.element.style.overscrollBehaviorX=value;
return this;
}
overscroll_behavior_y(value){
if(value==null){return this.element.style.overscrollBehaviorY;}
this.element.style.overscrollBehaviorY=value;
return this;
}
padding_block(value){
if(value==null){return this.element.style.paddingBlock;}
this.element.style.paddingBlock=value;
return this;
}
padding_block_end(value){
if(value==null){return this.element.style.paddingBlockEnd;}
this.element.style.paddingBlockEnd=value;
return this;
}
padding_block_start(value){
if(value==null){return this.element.style.paddingBlockStart;}
this.element.style.paddingBlockStart=value;
return this;
}
padding_bottom(value){
if(value==null){return this.element.style.paddingBottom;}
this.element.style.paddingBottom=this.pad_numeric(value);
return this;
}
padding_inline(value){
if(value==null){return this.element.style.paddingInline;}
this.element.style.paddingInline=value;
return this;
}
padding_inline_end(value){
if(value==null){return this.element.style.paddingInlineEnd;}
this.element.style.paddingInlineEnd=value;
return this;
}
padding_inline_start(value){
if(value==null){return this.element.style.paddingInlineStart;}
this.element.style.paddingInlineStart=value;
return this;
}
padding_left(value){
if(value==null){return this.element.style.paddingLeft;}
this.element.style.paddingLeft=this.pad_numeric(value);
return this;
}
padding_right(value){
if(value==null){return this.element.style.paddingRight;}
this.element.style.paddingRight=this.pad_numeric(value);
return this;
}
padding_top(value){
if(value==null){return this.element.style.paddingTop;}
this.element.style.paddingTop=this.pad_numeric(value);
return this;
}
page_break_after(value){
if(value==null){return this.element.style.pageBreakAfter;}
this.element.style.pageBreakAfter=value;
return this;
}
page_break_before(value){
if(value==null){return this.element.style.pageBreakBefore;}
this.element.style.pageBreakBefore=value;
return this;
}
page_break_inside(value){
if(value==null){return this.element.style.pageBreakInside;}
this.element.style.pageBreakInside=value;
return this;
}
paint_order(value){
if(value==null){return this.element.style.paintOrder;}
this.element.style.paintOrder=value;
return this;
}
perspective(value){
if(value==null){return this.element.style.perspective;}
this.element.style.perspective=value;
return this;
}
perspective_origin(value){
if(value==null){return this.element.style.perspectiveOrigin;}
this.element.style.perspectiveOrigin=value;
return this;
}
place_content(value){
if(value==null){return this.element.style.placeContent;}
this.element.style.placeContent=value;
return this;
}
place_items(value){
if(value==null){return this.element.style.placeItems;}
this.element.style.placeItems=value;
return this;
}
place_self(value){
if(value==null){return this.element.style.placeSelf;}
this.element.style.placeSelf=value;
return this;
}
pointer_events(value){
if(value==null){return this.element.style.pointerEvents;}
this.element.style.pointerEvents=value;
return this;
}
quotes(value){
if(value==null){return this.element.style.quotes;}
this.element.style.quotes=value;
return this;
}
resize(value){
if(value==null){return this.element.style.resize;}
this.element.style.resize=value;
return this;
}
right(value){
if(value==null){return this.element.style.right;}
this.element.style.right=this.pad_numeric(value);
return this;
}
rotate(value){
if(value==null){return this.element.style.rotate;}
this.element.style.rotate=value;
return this;
}
row_gap(value){
if(value==null){return this.element.style.rowGap;}
this.element.style.rowGap=value;
return this;
}
scale(value){
if(value==null){return this.element.style.scale;}
this.element.style.scale=value;
return this;
}
scroll_behavior(value){
if(value==null){return this.element.style.scrollBehavior;}
this.element.style.scrollBehavior=value;
return this;
}
scroll_margin(value){
if(value==null){return this.element.style.scrollMargin;}
this.element.style.scrollMargin=value;
return this;
}
scroll_margin_block(value){
if(value==null){return this.element.style.scrollMarginBlock;}
this.element.style.scrollMarginBlock=value;
return this;
}
scroll_margin_block_end(value){
if(value==null){return this.element.style.scrollMarginBlockEnd;}
this.element.style.scrollMarginBlockEnd=value;
return this;
}
scroll_margin_block_start(value){
if(value==null){return this.element.style.scrollMarginBlockStart;}
this.element.style.scrollMarginBlockStart=value;
return this;
}
scroll_margin_bottom(value){
if(value==null){return this.element.style.scrollMarginBottom;}
this.element.style.scrollMarginBottom=this.pad_numeric(value);
return this;
}
scroll_margin_inline(value){
if(value==null){return this.element.style.scrollMarginInline;}
this.element.style.scrollMarginInline=value;
return this;
}
scroll_margin_inline_end(value){
if(value==null){return this.element.style.scrollMarginInlineEnd;}
this.element.style.scrollMarginInlineEnd=value;
return this;
}
scroll_margin_inline_start(value){
if(value==null){return this.element.style.scrollMarginInlineStart;}
this.element.style.scrollMarginInlineStart=value;
return this;
}
scroll_margin_left(value){
if(value==null){return this.element.style.scrollMarginLeft;}
this.element.style.scrollMarginLeft=this.pad_numeric(value);
return this;
}
scroll_margin_right(value){
if(value==null){return this.element.style.scrollMarginRight;}
this.element.style.scrollMarginRight=this.pad_numeric(value);
return this;
}
scroll_margin_top(value){
if(value==null){return this.element.style.scrollMarginTop;}
this.element.style.scrollMarginTop=this.pad_numeric(value);
return this;
}
scroll_padding(value){
if(value==null){return this.element.style.scrollPadding;}
this.element.style.scrollPadding=value;
return this;
}
scroll_padding_block(value){
if(value==null){return this.element.style.scrollPaddingBlock;}
this.element.style.scrollPaddingBlock=value;
return this;
}
scroll_padding_block_end(value){
if(value==null){return this.element.style.scrollPaddingBlockEnd;}
this.element.style.scrollPaddingBlockEnd=value;
return this;
}
scroll_padding_block_start(value){
if(value==null){return this.element.style.scrollPaddingBlockStart;}
this.element.style.scrollPaddingBlockStart=value;
return this;
}
scroll_padding_bottom(value){
if(value==null){return this.element.style.scrollPaddingBottom;}
this.element.style.scrollPaddingBottom=this.pad_numeric(value);
return this;
}
scroll_padding_inline(value){
if(value==null){return this.element.style.scrollPaddingInline;}
this.element.style.scrollPaddingInline=value;
return this;
}
scroll_padding_inline_end(value){
if(value==null){return this.element.style.scrollPaddingInlineEnd;}
this.element.style.scrollPaddingInlineEnd=value;
return this;
}
scroll_padding_inline_start(value){
if(value==null){return this.element.style.scrollPaddingInlineStart;}
this.element.style.scrollPaddingInlineStart=value;
return this;
}
scroll_padding_left(value){
if(value==null){return this.element.style.scrollPaddingLeft;}
this.element.style.scrollPaddingLeft=this.pad_numeric(value);
return this;
}
scroll_padding_right(value){
if(value==null){return this.element.style.scrollPaddingRight;}
this.element.style.scrollPaddingRight=this.pad_numeric(value);
return this;
}
scroll_padding_top(value){
if(value==null){return this.element.style.scrollPaddingTop;}
this.element.style.scrollPaddingTop=this.pad_numeric(value);
return this;
}
scroll_snap_align(value){
if(value==null){return this.element.style.scrollSnapAlign;}
this.element.style.scrollSnapAlign=value;
return this;
}
scroll_snap_stop(value){
if(value==null){return this.element.style.scrollSnapStop;}
this.element.style.scrollSnapStop=value;
return this;
}
scroll_snap_type(value){
if(value==null){return this.element.style.scrollSnapType;}
this.element.style.scrollSnapType=value;
return this;
}
scrollbar_color(value){
if(value==null){return this.element.style.scrollbarColor;}
this.element.style.scrollbarColor=value;
return this;
}
tab_size(value){
if(value==null){return this.element.style.tabSize;}
this.element.style.tabSize=this.pad_numeric(value);
return this;
}
table_layout(value){
if(value==null){return this.element.style.tableLayout;}
this.element.style.tableLayout=value;
return this;
}
text_align(value){
if(value==null){return this.element.style.textAlign;}
this.element.style.textAlign=value;
return this;
}
text_align_last(value){
if(value==null){return this.element.style.textAlignLast;}
this.element.style.textAlignLast=value;
return this;
}
text_combine_upright(value){
if(value==null){return this.element.style.textCombineUpright;}
this.element.style.textCombineUpright=value;
return this;
}
text_decoration(value){
if(value==null){return this.element.style.textDecoration;}
this.element.style.textDecoration=value;
return this;
}
text_decoration_color(value){
if(value==null){return this.element.style.textDecorationColor;}
this.element.style.textDecorationColor=value;
return this;
}
text_decoration_line(value){
if(value==null){return this.element.style.textDecorationLine;}
this.element.style.textDecorationLine=value;
return this;
}
text_decoration_style(value){
if(value==null){return this.element.style.textDecorationStyle;}
this.element.style.textDecorationStyle=value;
return this;
}
text_decoration_thickness(value){
if(value==null){return this.element.style.textDecorationThickness;}
this.element.style.textDecorationThickness=value;
return this;
}
text_emphasis(value){
if(value==null){return this.element.style.textEmphasis;}
this.element.style.textEmphasis=value;
return this;
}
text_indent(value){
if(value==null){return this.element.style.textIndent;}
this.element.style.textIndent=value;
return this;
}
text_justify(value){
if(value==null){return this.element.style.textJustify;}
this.element.style.textJustify=value;
return this;
}
text_orientation(value){
if(value==null){return this.element.style.textOrientation;}
this.element.style.textOrientation=value;
return this;
}
text_overflow(value){
if(value==null){return this.element.style.textOverflow;}
this.element.style.textOverflow=value;
return this;
}
text_shadow(value){
if(value==null){return this.element.style.textShadow;}
this.element.style.textShadow=value;
return this;
}
text_transform(value){
if(value==null){return this.element.style.textTransform;}
this.element.style.textTransform=value;
return this;
}
text_underline_position(value){
if(value==null){return this.element.style.textUnderlinePosition;}
this.element.style.textUnderlinePosition=value;
return this;
}
top(value){
if(value==null){return this.element.style.top;}
this.element.style.top=this.pad_numeric(value);
return this;
}
transform(value){
if(value==null){return this.element.style.transform;}
this.element.style.transform=value;
return this;
}
transform_origin(value){
if(value==null){return this.element.style.transformOrigin;}
this.element.style.transformOrigin=value;
return this;
}
transform_style(value){
if(value==null){return this.element.style.transformStyle;}
this.element.style.transformStyle=value;
return this;
}
transition(value){
if(value==null){return this.element.style.transition;}
this.element.style.transition=value;
return this;
}
transition_delay(value){
if(value==null){return this.element.style.transitionDelay;}
this.element.style.transitionDelay=value;
return this;
}
transition_duration(value){
if(value==null){return this.element.style.transitionDuration;}
this.element.style.transitionDuration=value;
return this;
}
transition_property(value){
if(value==null){return this.element.style.transitionProperty;}
this.element.style.transitionProperty=value;
return this;
}
transition_timing_function(value){
if(value==null){return this.element.style.transitionTimingFunction;}
this.element.style.transitionTimingFunction=value;
return this;
}
translate(value){
if(value==null){return this.element.style.translate;}
this.element.style.translate=value;
return this;
}
unicode_bidi(value){
if(value==null){return this.element.style.unicodeBidi;}
this.element.style.unicodeBidi=value;
return this;
}
user_select(value){
if(value==null){return this.element.style.userSelect;}
this.element.style.userSelect=value;
return this;
}
visibility(value){
if(value==null){return this.element.style.visibility;}
this.element.style.visibility=value;
return this;
}
white_space(value){
if(value==null){return this.element.style.whiteSpace;}
this.element.style.whiteSpace=value;
return this;
}
widows(value){
if(value==null){return this.element.style.widows;}
this.element.style.widows=value;
return this;
}
word_break(value){
if(value==null){return this.element.style.wordBreak;}
this.element.style.wordBreak=value;
return this;
}
word_spacing(value){
if(value==null){return this.element.style.wordSpacing;}
this.element.style.wordSpacing=value;
return this;
}
word_wrap(value){
if(value==null){return this.element.style.wordWrap;}
this.element.style.wordWrap=value;
return this;
}
writing_mode(value){
if(value==null){return this.element.style.writingMode;}
this.element.style.writingMode=value;
return this;
}
accept(value){
if(value==null){return this.element.accept;}
this.element.accept=value;
return this;
}
accept_charset(value){
if(value==null){return this.element.accept_charset;}
this.element.accept_charset=value;
return this;
}
action(value){
if(value==null){return this.element.action;}
this.element.action=value;
return this;
}
alt(value){
if(value==null){return this.element.alt;}
this.element.alt=value;
return this;
}
async(value){
if(value==null){return this.element.async;}
this.element.async=value;
return this;
}
auto_complete(value){
if(value==null){return this.element.autocomplete;}
this.element.autocomplete=value;
return this;
}
auto_focus(value){
if(value==null){return this.element.autofocus;}
this.element.autofocus=value;
return this;
}
auto_play(value){
if(value==null){return this.element.autoplay;}
this.element.autoplay=value;
return this;
}
charset(value){
if(value==null){return this.element.charset;}
this.element.charset=value;
return this;
}
checked(value){
if(value==null){return this.element.checked;}
this.element.checked=value;
return this;
}
cite(value){
if(value==null){return this.element.cite;}
this.element.cite=value;
return this;
}
cols(value){
if(value==null){return this.element.cols;}
this.element.cols=value;
return this;
}
colspan(value){
if(value==null){return this.element.colspan;}
this.element.colspan=value;
return this;
}
content(value){
if(value==null){return this.element.content;}
this.element.content=value;
return this;
}
content_editable(value){
if(value==null){return this.element.contenteditable;}
this.element.contenteditable=value;
return this;
}
controls(value){
if(value==null){return this.element.controls;}
this.element.controls=value;
return this;
}
coords(value){
if(value==null){return this.element.coords;}
this.element.coords=value;
return this;
}
data(value){
if(value==null){return this.element.data;}
this.element.data=value;
return this;
}
datetime(value){
if(value==null){return this.element.datetime;}
this.element.datetime=value;
return this;
}
default(value){
if(value==null){return this.element.default;}
this.element.default=value;
return this;
}
defer(value){
if(value==null){return this.element.defer;}
this.element.defer=value;
return this;
}
dir(value){
if(value==null){return this.element.dir;}
this.element.dir=value;
return this;
}
dirname(value){
if(value==null){return this.element.dirname;}
this.element.dirname=value;
return this;
}
disabled(value){
if(value==null){return this.element.disabled;}
this.element.disabled=value;
return this;
}
download(value){
if(value==null){return this.element.download;}
this.element.download=value;
return this;
}
draggable(value){
if(value==null){return this.element.draggable;}
this.element.draggable=value;
return this;
}
enctype(value){
if(value==null){return this.element.enctype;}
this.element.enctype=value;
return this;
}
for(value){
if(value==null){return this.element.for;}
this.element.for=value;
return this;
}
form(value){
if(value==null){return this.element.form;}
this.element.form=value;
return this;
}
form_action(value){
if(value==null){return this.element.formaction;}
this.element.formaction=value;
return this;
}
headers(value){
if(value==null){return this.element.headers;}
this.element.headers=value;
return this;
}
high(value){
if(value==null){return this.element.high;}
this.element.high=value;
return this;
}
href(value){
if(value==null){return this.element.href;}
this.element.href=value;
return this;
}
href_lang(value){
if(value==null){return this.element.hreflang;}
this.element.hreflang=value;
return this;
}
http_equiv(value){
if(value==null){return this.element.http_equiv;}
this.element.http_equiv=value;
return this;
}
id(value){
if(value==null){return this.element.id;}
this.element.id=value;
return this;
}
is_map(value){
if(value==null){return this.element.ismap;}
this.element.ismap=value;
return this;
}
kind(value){
if(value==null){return this.element.kind;}
this.element.kind=value;
return this;
}
label(value){
if(value==null){return this.element.label;}
this.element.label=value;
return this;
}
lang(value){
if(value==null){return this.element.lang;}
this.element.lang=value;
return this;
}
list(value){
if(value==null){return this.element.list;}
this.element.list=value;
return this;
}
loop(value){
if(value==null){return this.element.loop;}
this.element.loop=value;
return this;
}
low(value){
if(value==null){return this.element.low;}
this.element.low=value;
return this;
}
max(value){
if(value==null){return this.element.max;}
this.element.max=value;
return this;
}
max_length(value){
if(value==null){return this.element.maxlength;}
this.element.maxlength=value;
return this;
}
method(value){
if(value==null){return this.element.method;}
this.element.method=value;
return this;
}
min(value){
if(value==null){return this.element.min;}
this.element.min=value;
return this;
}
multiple(value){
if(value==null){return this.element.multiple;}
this.element.multiple=value;
return this;
}
muted(value){
if(value==null){return this.element.muted;}
this.element.muted=value;
return this;
}
name(value){
if(value==null){return this.element.name;}
this.element.name=value;
return this;
}
no_validate(value){
if(value==null){return this.element.novalidate;}
this.element.novalidate=value;
return this;
}
on_abort(value){
if(value==null){return this.element.onabort;}
this.element.onabort=value;
return this;
}
on_after_print(value){
if(value==null){return this.element.onafterprint;}
this.element.onafterprint=value;
return this;
}
on_before_print(value){
if(value==null){return this.element.onbeforeprint;}
this.element.onbeforeprint=value;
return this;
}
on_before_unload(value){
if(value==null){return this.element.onbeforeunload;}
this.element.onbeforeunload=value;
return this;
}
on_blur(value){
if(value==null){return this.element.onblur;}
this.element.onblur=value;
return this;
}
on_canplay(value){
if(value==null){return this.element.oncanplay;}
this.element.oncanplay=value;
return this;
}
on_canplay_through(value){
if(value==null){return this.element.oncanplaythrough;}
this.element.oncanplaythrough=value;
return this;
}
on_change(value){
if(value==null){return this.element.onchange;}
this.element.onchange=value;
return this;
}
on_context_menu(value){
if(value==null){return this.element.oncontextmenu;}
this.element.oncontextmenu=value;
return this;
}
on_copy(value){
if(value==null){return this.element.oncopy;}
this.element.oncopy=value;
return this;
}
on_cue_change(value){
if(value==null){return this.element.oncuechange;}
this.element.oncuechange=value;
return this;
}
on_cut(value){
if(value==null){return this.element.oncut;}
this.element.oncut=value;
return this;
}
on_dbl_click(value){
if(value==null){return this.element.ondblclick;}
this.element.ondblclick=value;
return this;
}
on_drag(value){
if(value==null){return this.element.ondrag;}
this.element.ondrag=value;
return this;
}
on_drag_end(value){
if(value==null){return this.element.ondragend;}
this.element.ondragend=value;
return this;
}
on_drag_enter(value){
if(value==null){return this.element.ondragenter;}
this.element.ondragenter=value;
return this;
}
on_drag_leave(value){
if(value==null){return this.element.ondragleave;}
this.element.ondragleave=value;
return this;
}
on_drag_over(value){
if(value==null){return this.element.ondragover;}
this.element.ondragover=value;
return this;
}
on_drag_start(value){
if(value==null){return this.element.ondragstart;}
this.element.ondragstart=value;
return this;
}
on_drop(value){
if(value==null){return this.element.ondrop;}
this.element.ondrop=value;
return this;
}
on_duration_change(value){
if(value==null){return this.element.ondurationchange;}
this.element.ondurationchange=value;
return this;
}
on_emptied(value){
if(value==null){return this.element.onemptied;}
this.element.onemptied=value;
return this;
}
on_ended(value){
if(value==null){return this.element.onended;}
this.element.onended=value;
return this;
}
on_error(value){
if(value==null){return this.element.onerror;}
this.element.onerror=value;
return this;
}
on_focus(value){
if(value==null){return this.element.onfocus;}
this.element.onfocus=value;
return this;
}
on_hash_change(value){
if(value==null){return this.element.onhashchange;}
this.element.onhashchange=value;
return this;
}
on_input(value){
if(value==null){return this.element.oninput;}
this.element.oninput=value;
return this;
}
on_invalid(value){
if(value==null){return this.element.oninvalid;}
this.element.oninvalid=value;
return this;
}
on_key_down(value){
if(value==null){return this.element.onkeydown;}
this.element.onkeydown=value;
return this;
}
on_key_press(value){
if(value==null){return this.element.onkeypress;}
this.element.onkeypress=value;
return this;
}
on_key_up(value){
if(value==null){return this.element.onkeyup;}
this.element.onkeyup=value;
return this;
}
on_load(value){
if(value==null){return this.element.onload;}
this.element.onload=value;
return this;
}
on_loaded_data(value){
if(value==null){return this.element.onloadeddata;}
this.element.onloadeddata=value;
return this;
}
on_loaded_metadata(value){
if(value==null){return this.element.onloadedmetadata;}
this.element.onloadedmetadata=value;
return this;
}
on_load_start(value){
if(value==null){return this.element.onloadstart;}
this.element.onloadstart=value;
return this;
}
on_mouse_down(value){
if(value==null){return this.element.onmousedown;}
this.element.onmousedown=value;
return this;
}
on_mouse_move(value){
if(value==null){return this.element.onmousemove;}
this.element.onmousemove=value;
return this;
}
on_mouse_out(value){
if(value==null){return this.element.onmouseout;}
this.element.onmouseout=value;
return this;
}
on_mouse_over(value){
if(value==null){return this.element.onmouseover;}
this.element.onmouseover=value;
return this;
}
on_mouse_up(value){
if(value==null){return this.element.onmouseup;}
this.element.onmouseup=value;
return this;
}
on_mouse_wheel(value){
if(value==null){return this.element.onmousewheel;}
this.element.onmousewheel=value;
return this;
}
on_offline(value){
if(value==null){return this.element.onoffline;}
this.element.onoffline=value;
return this;
}
on_online(value){
if(value==null){return this.element.ononline;}
this.element.ononline=value;
return this;
}
on_page_hide(value){
if(value==null){return this.element.onpagehide;}
this.element.onpagehide=value;
return this;
}
on_page_show(value){
if(value==null){return this.element.onpageshow;}
this.element.onpageshow=value;
return this;
}
on_paste(value){
if(value==null){return this.element.onpaste;}
this.element.onpaste=value;
return this;
}
on_pause(value){
if(value==null){return this.element.onpause;}
this.element.onpause=value;
return this;
}
on_play(value){
if(value==null){return this.element.onplay;}
this.element.onplay=value;
return this;
}
on_playing(value){
if(value==null){return this.element.onplaying;}
this.element.onplaying=value;
return this;
}
on_popstate(value){
if(value==null){return this.element.onpopstate;}
this.element.onpopstate=value;
return this;
}
onprogress(value){
if(value==null){return this.element.onprogress;}
this.element.onprogress=value;
return this;
}
on_rate_change(value){
if(value==null){return this.element.onratechange;}
this.element.onratechange=value;
return this;
}
on_reset(value){
if(value==null){return this.element.onreset;}
this.element.onreset=value;
return this;
}
on_resize(value){
if(value==null){return this.element.onresize;}
this.element.onresize=value;
return this;
}
on_scroll(value){
if(value==null){return this.element.onscroll;}
this.element.onscroll=value;
return this;
}
on_search(value){
if(value==null){return this.element.onsearch;}
this.element.onsearch=value;
return this;
}
on_seeked(value){
if(value==null){return this.element.onseeked;}
this.element.onseeked=value;
return this;
}
on_seeking(value){
if(value==null){return this.element.onseeking;}
this.element.onseeking=value;
return this;
}
on_select(value){
if(value==null){return this.element.onselect;}
this.element.onselect=value;
return this;
}
on_stalled(value){
if(value==null){return this.element.onstalled;}
this.element.onstalled=value;
return this;
}
on_storage(value){
if(value==null){return this.element.onstorage;}
this.element.onstorage=value;
return this;
}
on_submit(value){
if(value==null){return this.element.onsubmit;}
this.element.onsubmit=value;
return this;
}
on_suspend(value){
if(value==null){return this.element.onsuspend;}
this.element.onsuspend=value;
return this;
}
on_time_update(value){
if(value==null){return this.element.ontimeupdate;}
this.element.ontimeupdate=value;
return this;
}
on_toggle(value){
if(value==null){return this.element.ontoggle;}
this.element.ontoggle=value;
return this;
}
on_unload(value){
if(value==null){return this.element.onunload;}
this.element.onunload=value;
return this;
}
on_volume_change(value){
if(value==null){return this.element.onvolumechange;}
this.element.onvolumechange=value;
return this;
}
on_waiting(value){
if(value==null){return this.element.onwaiting;}
this.element.onwaiting=value;
return this;
}
on_wheel(value){
if(value==null){return this.element.onwheel;}
this.element.onwheel=value;
return this;
}
open(value){
if(value==null){return this.element.open;}
this.element.open=value;
return this;
}
optimum(value){
if(value==null){return this.element.optimum;}
this.element.optimum=value;
return this;
}
pattern(value){
if(value==null){return this.element.pattern;}
this.element.pattern=value;
return this;
}
placeholder(value){
if(value==null){return this.element.placeholder;}
this.element.placeholder=value;
return this;
}
poster(value){
if(value==null){return this.element.poster;}
this.element.poster=value;
return this;
}
preload(value){
if(value==null){return this.element.preload;}
this.element.preload=value;
return this;
}
readonly(value){
if(value==null){return this.element.readonly;}
this.element.readonly=value;
return this;
}
rel(value){
if(value==null){return this.element.rel;}
this.element.rel=value;
return this;
}
required(value){
if(value==null){return this.element.required;}
this.element.required=value;
return this;
}
reversed(value){
if(value==null){return this.element.reversed;}
this.element.reversed=value;
return this;
}
rows(value){
if(value==null){return this.element.rows;}
this.element.rows=value;
return this;
}
row_span(value){
if(value==null){return this.element.rowspan;}
this.element.rowspan=value;
return this;
}
sandbox(value){
if(value==null){return this.element.sandbox;}
this.element.sandbox=value;
return this;
}
scope(value){
if(value==null){return this.element.scope;}
this.element.scope=value;
return this;
}
selected(value){
if(value==null){return this.element.selected;}
this.element.selected=value;
return this;
}
shape(value){
if(value==null){return this.element.shape;}
this.element.shape=value;
return this;
}
size(value){
if(value==null){return this.element.size;}
this.element.size=value;
return this;
}
sizes(value){
if(value==null){return this.element.sizes;}
this.element.sizes=value;
return this;
}
span(value){
if(value==null){return this.element.span;}
this.element.span=value;
return this;
}
spell_check(value){
if(value==null){return this.element.spellcheck;}
this.element.spellcheck=value;
return this;
}
src(value){
if(value==null){return this.element.src;}
this.element.src=value;
return this;
}
src_doc(value){
if(value==null){return this.element.srcdoc;}
this.element.srcdoc=value;
return this;
}
src_lang(value){
if(value==null){return this.element.srclang;}
this.element.srclang=value;
return this;
}
rrsrc_set(value){
if(value==null){return this.element.srcset;}
this.element.srcset=value;
return this;
}
start(value){
if(value==null){return this.element.start;}
this.element.start=value;
return this;
}
step(value){
if(value==null){return this.element.step;}
this.element.step=value;
return this;
}
tab_index(value){
if(value==null){return this.element.tabindex;}
this.element.tabindex=value;
return this;
}
target(value){
if(value==null){return this.element.target;}
this.element.target=value;
return this;
}
title(value){
if(value==null){return this.element.title;}
this.element.title=value;
return this;
}
translate(value){
if(value==null){return this.element.translate;}
this.element.translate=value;
return this;
}
type(value){
if(value==null){return this.element.type;}
this.element.type=value;
return this;
}
use_map(value){
if(value==null){return this.element.usemap;}
this.element.usemap=value;
return this;
}
value(value){
if(value==null){return this.element.value;}
this.element.value=value;
return this;
}
on_message(value){
if(value==null){return this.element.onmessage;}
this.element.onmessage=value;
return this;
}
};
class RingLoader extends Element{
static default_styling={
"width": "80px",
"height": "80px",
"background": "black",
};
constructor(){
super("RingLoader","div");
this.style(RingLoader.default_styling);
this.update();
}
update(){
this.remove_children();
const children_style={
"width": "calc("+this.element.style.width+" * (64.0px / 80.0px))",
"height": "calc("+this.element.style.height+" * (64.0px / 80.0px))",
"margin": "calc("+this.element.style.width+" * (8.0px / 80.0px))",
"border": "calc("+this.element.style.width+" * (8.0px / 80.0px)) solid "+this.element.style.background,
"border-color": this.element.style.background+" transparent transparent transparent",
}
for(let i=0;i<4;i++){
let e=document.createElement("div");
for(let attr in children_style){
e.style[attr]=children_style[attr];
}
this.append(e);
}
}
}
class Divider extends Element{
static default_styling={
"margin": "0px",
"padding": "0px",
"width": "100%",
"height": "1px",
"min-height": "1px",
"background": "black",
};
constructor(){
super("Divider","div");
this.style(Divider.default_styling);
}
}
class Scroller extends Element{
static default_styling={
"position": "relative",
"margin": "0px",
"padding": "0px",
"clear": "both",
"display": "flex",
"overflow": "scroll",
"flex-direction": "column",
"text-align": "start",
"scroll-behavior": "smooth",
"overscroll-behavior": "none","height": "fit-content","align-content": "flex-start","align-items": "flex-start",};
constructor(...children){
super("Scroller","div");
this.style(Scroller.default_styling);
this.append(...children);
}
}
class HStack extends Element{
static default_styling={
"position": "relative",
"margin": "0px",
"padding": "0px",
"clear": "both",
"overflow-x": "visible",
"overflow-y": "visible",
"text-align": "start",
"display": "flex",
"flex-direction": "row",
"align-items": "flex-start",};
constructor(...children){
super("HStack","div");
this.style(HStack.default_styling);
this.append(...children);
}
}
class Gradient{
constructor(...args){
if(args.length===1){
this.gradient=args[0];
}else{
console.error("Invalid number of arguments for class \"Gradient()\".");
}
}
toString(){
return this.gradient;
}
};
class Spacer extends Element{
static default_styling={
"margin": "0px",
"padding": "0px",
"flex": "1",
"flex-grow": "1",
"background": "#00000000",
"filter": "opacity(0)",
"justify-content": "stretch",
};
constructor(){
super("Spacer","div");
this.style(Spacer.default_styling);
}
}
class ForEach extends Element{
static default_styling={
"border": "none",
"outline": "none",
"background": "transparent",
};
constructor(items,func){
super("ForEach","section");
this.style(Divider.default_styling);
for(let i=0;i<items.length;i++){
this.append(func(items[i]));
}
}
}
class CodeBlock extends Element{
static default_styling={
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
constructor(code){
super("CodeBlock","code");
this.style(CodeBlock.default_styling);
if(code!=null){
while(code.length>0 && code[code.length-1]=="\n"){
code=code.slice(-code.length,-1);
}
this.text(code.replaceAll("<","&lt;").replaceAll(">","&gt;"));
}
}
language(value){
this.element.setAttribute("language",value);
return this;
}
line_numbers(value){
this.element.setAttribute("line_numbers",value);
return this;
}
highlight(){
vhighlight.highlight(this.element);
return this;
}
}
class CodeLine extends Element{
static default_styling={
"font-family": "\"Menlo\", \"Consolas\", monospace",
"font-size": "inherit",
"font-style": "italic",
"background": "#000000",
"color": "#FFFFFF",
"border-radius": "10px",
"padding": "5px 7.5px 5px 7.5px",
};
constructor(text,href){
super("CodeLine","span");
this.style(CodeLine.default_styling);
this.text(text);
}
}
class Link extends Element{
static default_styling={
"font-family": "inherit",
"color": "rgb(85, 108, 214)",
"text-decoration": "underline",
"text-underline-position": "auto",
"cursor": "pointer",
};
constructor(text,href){
super("Link","a");
this.style(Link.default_styling);
this.text(text);
this.href(href);
}
}
class VStack extends Element{
static default_styling={
"position": "relative",
"margin": "0px",
"padding": "0px",
"clear": "both",
"display": "flex","overflow": "visible",
"align-content": "flex-start","flex-direction": "column",
"text-align": "start",
};
constructor(...children){
super("VStack","div");
this.style(VStack.default_styling);
this.append(...children);
}
}
class ZStack extends Element{
static default_styling={
"position": "relative",
"margin": "0px",
"padding": "0px",
"display": "block",
"text-align": "start",
};
constructor(...children){
super("ZStack","div");
this.style(ZStack.default_styling);
this.zstack_append(...children);
}
append(...children){
return this.zstack_append(...children);
}
}
class Title extends Element{
static default_styling={
"margin": "0px 0px 0px 0px",
"color": "inherit",
"white-space": "wrap",
"text-align": "inherit",
"color": "green",
};
constructor(text){
super("Title","h1");
this.style(Title.default_styling);
this.inner_html(text);
}
}
class If extends Element{
static default_styling={};
constructor(boolean,child_or_func){
super("If","section");
this.style(View.default_styling);
if(boolean){
if(vweb.utils.is_func(child_or_func)){
child_or_func();
}
else{
this.append(child_or_func);
}
}
}
}
class IfDeviceWith extends Element{
static default_styling={};
constructor(comparison,value,child){
super("IfDeviceWith","section");
this.comparison=comparison;
this.value=value;
this.child=child;
this.style(View.default_styling);
if(comparison(vweb.utils.get_device_width(),this.value)){
this.append(this.child);
}
}
}
class Image extends Element{
static default_styling={
"margin": "0px",
"padding": "0px",
"object-fit": "cover",
};
constructor(src){
super("Image","img");
this.style(Image.default_styling);
this.src(src);
}
}
class ImageMask extends Element{
static default_styling={
"margin": "0px",
"padding": "0px",
"object-fit": "cover",
"display": "inline-block",
};
constructor(src){
super("ImageMask","div");
this.style(ImageMask.default_styling);
this.append(
new Element("ImageMaskChild","div")
.width("100%")
.height("100%")
.background("black")
.mask("url('"+src+"') no-repeat center/contain")
);
}
background(value){
this.element.firstChild.style.background=value;
return this;
}
src(value){
this.element.firstElementChild.style.mask="url('"+value+"') no-repeat center/contain";
return this;
}
mask(value){
this.element.firstElementChild.style.mask=value;
return this;
}
}
class MediaQuery{
constructor(){
this.query="";
}
add_end(){
if(this.query!=""){
this.query+=" and ";
}
}
any_hover(value){
this.add_and();
this.query+="(any-hover: "+value+")";
return this;
}
any_pointer(value){
this.add_and();
this.query+="(any-pointer: "+value+")";
return this;
}
aspect_ratio(value){
this.add_and();
this.query+="(aspect-ratio: "+value+")";
return this;
}
color(value){
this.add_and();
this.query+="(color: "+value+")";
return this;
}
color_gamut(value){
this.add_and();
this.query+="(color-gamut: "+value+")";
return this;
}
color_index(value){
this.add_and();
this.query+="(color-index: "+value+")";
return this;
}
display_mode(value){
this.add_and();
this.query+="(display-mode: "+value+")";
return this;
}
dynamic_range(value){
this.add_and();
this.query+="(dynamic-range: "+value+")";
return this;
}
forced_colors(value){
this.add_and();
this.query+="(forced-colors: "+value+")";
return this;
}
grid(value){
this.add_and();
this.query+="(grid: "+value+")";
return this;
}
height(value){
this.add_and();
this.query+="(height: "+value+")";
return this;
}
hover(value){
this.add_and();
this.query+="(hover: "+value+")";
return this;
}
inverted_colors(value){
this.add_and();
this.query+="(inverted-colors: "+value+")";
return this;
}
monochrome(value){
this.add_and();
this.query+="(monochrome: "+value+")";
return this;
}
orientation(value){
this.add_and();
this.query+="(orientation: "+value+")";
return this;
}
overflow_block(value){
this.add_and();
this.query+="(overflow-block: "+value+")";
return this;
}
overflow_inline(value){
this.add_and();
this.query+="(overflow-inline: "+value+")";
return this;
}
pointer(value){
this.add_and();
this.query+="(pointer: "+value+")";
return this;
}
prefers_color_scheme(value){
this.add_and();
this.query+="(prefers-color-scheme: "+value+")";
return this;
}
prefers_contrast(value){
this.add_and();
this.query+="(prefers-contrast: "+value+")";
return this;
}
prefers_reduced_motion(value){
this.add_and();
this.query+="(prefers-reduced-motion: "+value+")";
return this;
}
prefers_reduced_transparency(value){
this.add_and();
this.query+="(prefers-reduced-transparency : "+value+")";
return this;
}
resolution(value){
this.add_and();
this.query+="(resolution: "+value+")";
return this;
}
scripting(value){
this.add_and();
this.query+="(scripting: "+value+")";
return this;
}
update(value){
this.add_and();
this.query+="(update: "+value+")";
return this;
}
video_dynamic_range(value){
this.add_and();
this.query+="(video-dynamic-range: "+value+")";
return this;
}
width(value){
this.add_and();
this.query+="(width: "+value+")";
return this;
}
min_width(value){
this.add_and();
this.query+="(min-width: "+value+")";
return this;
}
max_width(value){
this.add_and();
this.query+="(max-width: "+value+")";
return this;
}
}
class Button extends Element{
static default_styling={
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
static default_events={
"onmousedown": "this.style.filter = \"brightness(90%)\";",
"onmouseover": "this.style.filter = \"brightness(95%)\";",
"onmouseup": "this.style.filter = \"brightness(100%)\";",
"onmouseout": "this.style.filter = \"brightness(100%)\";",
};
constructor(text){
super("Button","a");
this.style(Button.default_styling);
this.events(Button.default_events);
this.inner_html(text);
}
}
class View extends Element{
static default_styling={
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
"display": "flex","text-align": "start",
"align-content": "flex-start","flex-direction": "column",
};
constructor(...children){
super("View","div");
this.style(View.default_styling);
this.append(...children);
}
}
class GoogleMap extends Element{
static default_styling={
"border": "0",
};
static default_attributes={
"width": "100%",
"height": "100%",
"frameborder": "0",
"style": "border:0",
"referrerpolicy": "no-referrer-when-downgrade",
"allowfullscreen": "true",
};
constructor(location,mode="place"){
super("GoogleMap","iframe");
this.style(GoogleMap.default_styling);
this.attributes(GoogleMap.default_attributes);
this.src("https://www.google.com/maps/embed/v1/"+mode+"?key="+google_cloud_api_key+"&"+vweb.utils.url_encode({"q": location.replaceAll(' ','+')}));
}
update(){
this.remove_children();
const children_style={
"width": "calc("+this.element.style.width+" * (64.0px / 80.0px))",
"height": "calc("+this.element.style.height+" * (64.0px / 80.0px))",
"margin": "calc("+this.element.style.width+" * (8.0px / 80.0px))",
"border": "calc("+this.element.style.width+" * (8.0px / 80.0px)) solid "+this.element.style.background,
"border-color": this.element.style.background+" transparent transparent transparent",
}
for(let i=0;i<4;i++){
let e=document.createElement("div");
for(let attr in children_style){
e.style[attr]=children_style[attr];
}
this.append(e);
}
}
}
class Text extends Element{
static default_styling={
"margin": "0px 0px 0px 0px",
"padding": "2.5px",
"padding": "2.5px",
"font-size": "20px",
"color": "inherit",
"text-align": "inherit",
"white-space": "wrap",
};
constructor(text){
super("Text","p");
this.style(Text.default_styling);
this.inner_html(text);
}
}
class Input extends Element{
static default_styling={
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
constructor(placeholder){
super("Input","input");
this.type("text");
this.style(Input.default_styling);
this.placeholder(placeholder);
}
}
class PasswordInput extends Element{
static default_styling={
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
constructor(placeholder){
super("PasswordInput","input");
this.type("password");
this.style(PasswordInput.default_styling);
this.placeholder(placeholder);
}
}
class EmailInput extends Element{
static default_styling={
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
constructor(placeholder){
super("EmailInput","input");
this.type("email");
this.style(EmailInput.default_styling);
this.placeholder(placeholder);
}
}
class PhoneNumberInput extends Element{
static default_styling={
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
constructor(placeholder){
super("PhoneNumberInput","input");
this.type("tel");
this.style(PhoneNumberInput.default_styling);
this.placeholder(placeholder);
}
}
class InputBox extends Element{
static default_styling={
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
constructor(placeholder){
super("InputBox","textarea");
this.style(InputBox.default_styling);
this.placeholder(placeholder);
}
}
class SelectOptionInput extends Element{
static default_styling={
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
constructor(placeholder){
super("SelectOptionInput","select");
this.style(SelectOptionInput.default_styling);
for(let i=0;i<arguments.length;i++){
let e=document.createElement("option");
if(i==0){
e.selected=true;
e.disabled=true;
}else{
e.value=arguments[i];
}
this.append(e);
}
}
}
const vhighlight={};
vhighlight.highlight=function(element){
const language=element.getAttribute("language");
if(language==""){
return;
}
const code=element.textContent;
element.innerHTML="";
element.style.display='flex';
element.style.justifyContent="center";
element.style.alignItems="center";
let loader=document.createElement("div");
loader.className="vhighlight_loader";
for(let i=0;i<4;i++){
let child=document.createElement("div");
child.style.border="4px solid "+element.style.color;
child.style.borderColor=element.style.color+" transparent transparent transparent";
loader.appendChild(child);
}
element.appendChild(loader);
setTimeout(()=>{
if(element.style.fontFamily==""){
element.style.fontFamily="'Menlo', 'Consolas', monospace";
}
let highlighted_code;
if(language=="cpp"){
highlighted_code=vhighlight.cpp.highlight(code);
}else if(language=="markdown"){
highlighted_code=vhighlight.md.highlight(code);
}else if(language=="js"){
highlighted_code=vhighlight.js.highlight(code);
}else if(language=="python"){
highlighted_code=vhighlight.python.highlight(code);
}else{
console.error("Unsupported language \""+language+"\" for syntax highlighting.");
element.innerHTML="<p style='color: red;'>Error: Unsupported language \""+language+"\" for syntax highlighting.</p>";
return;
}
if(element.getAttribute('line_numbers')!="true"){
let code_pre=document.createElement("pre");
code_pre.style.padding="0px";
code_pre.style.margin="0px";
code_pre.style.whiteSpace="pre";
code_pre.style.overflowX="auto";
code_pre.innerHTML=highlighted_code;
element.style.justifyContent="start";
element.style.alignItems="stretch";
element.innerHTML="";
element.appendChild(code_pre);
return;
}
element.style.alignItems='stretch';
if(element.style.height==='undefined' || element.style.height=="100%"){
element.style.height='auto';
}
if(element.style.tabSize==='undefined'){
element.style.tabSize='4';
}
if(element.style.lineHeight==""){
element.style.lineHeight='16px';}
const pre=document.createElement('pre');
pre.textContent=code;
pre.style.whiteSpace='pre';
pre.style.overflow='visible';
pre.style.lineHeight=element.style.lineHeight;
document.body.appendChild(pre);
const pre_height=pre.clientHeight;
const line_height=parseFloat(element.style.lineHeight);
document.body.removeChild(pre);
const lines=Math.floor(pre_height/line_height);
let line_div=document.createElement("div");
line_div.style.display="flex";
line_div.style.padding='0px';
line_div.style.margin='0px';
let line_numbers=document.createElement("pre");
line_numbers.style.padding='0px';
line_numbers.style.margin='0px';
for(var i=0;i<lines;i++){
let span=document.createElement("span");
span.className="token_line_number";
span.textContent=(i+1)+"\n";
line_numbers.appendChild(span);
}
let divider=document.createElement("div");
divider.className="token_line_number_divider";
divider.style.minWidth="0.5px";
divider.style.width="0.5px";
divider.style.padding='0px';
divider.style.margin="0px 10px 0px 10px";
let code_pre=document.createElement("pre");
code_pre.style.padding="0px";
code_pre.style.margin="0px";
code_pre.style.whiteSpace="pre";
code_pre.style.overflowX="auto";
code_pre.innerHTML=highlighted_code;
element.style.height="auto";
element.style.justifyContent="start";
element.style.alignItems="stretch";
element.innerHTML="";
element.appendChild(line_numbers);
element.appendChild(divider);
element.appendChild(code_pre);
},50);
}
vhighlight.js={};
vhighlight.js.keywords=[
"break",
"case",
"catch",
"class",
"const",
"continue",
"debugger",
"default",
"delete",
"do",
"else",
"export",
"extends",
"finally",
"for",
"function",
"if",
"import",
"in",
"instanceof",
"let",
"new",
"of",
"return",
"super",
"switch",
"this",
"throw",
"try",
"typeof",
"var",
"void",
"while",
"with",
"yield",
"prototype",
"true",
"false",
"null",
"static",
"=>",
];
vhighlight.js.type_def_keywords=[
"class",
"extends",
];
vhighlight.js.func_def_keywords=[
'function',
'static',
'async',
'get',
'set',
'constructor',
];
vhighlight.js.type_keywords=[
"extends",
];
vhighlight.js.exclude_span="(?!(?:[^<]|<(?!/?span[^>]*>))*?<\\/span>)";vhighlight.js.html_open="(?<!<[^>]*)";vhighlight.js.html_close="(?![^<]*>)";
vhighlight.js.comment_regex=/(\/\/.*|\/\*[\s\S]*?\*\/)(?!\S)/g;
vhighlight.js.keyword_regex=new RegExp(`${vhighlight.js.exclude_span}\\b(${vhighlight.js.keywords.join('|')})\\b`,'gm');
vhighlight.js.string_regex=new RegExp(`(${vhighlight.js.exclude_span}${vhighlight.js.html_open})(['"\`/]{1})(.*?)\\2${vhighlight.js.html_close}`,'gms');
vhighlight.js.numeric_regex=new RegExp(`${vhighlight.js.exclude_span}\\b-?\\d+(?:\\.\\d+)?\\b`,'g');
vhighlight.js.type_def_regex=new RegExp(`${vhighlight.js.exclude_span}\\b(${vhighlight.js.type_def_keywords.join('|')})(\\s+[A-Za-z_][A-Za-z0-9_]+)(\\s*[\\(|{|\\s+])`,'gm');
vhighlight.js.prototype_type_def_regex=new RegExp(`${vhighlight.js.exclude_span}\\b([A-Za-z_][A-Za-z0-9_]+)(\\s*=\\s*function\\s*\\()`,'gm');
vhighlight.js.anonymous_prototype_type_def_regex=new RegExp(`${vhighlight.js.exclude_span}\\b([A-Za-z_][A-Za-z0-9_]+)(\\s*=\\s*\\([^()]*\\))`,'gm')
vhighlight.js.type_def_body_regex=new RegExp(`${vhighlight.js.exclude_span}(\\b${vhighlight.js.type_def_keywords.join('|')}\\b)([^{]+)\\s*\\{`,'gm');
vhighlight.js.outside_class_func_def_regex=new RegExp(`${vhighlight.js.exclude_span}${vhighlight.js.html_open}\\b(${vhighlight.js.func_def_keywords.join('\\s+|')}\\s+)(\\s*[A-Za-z_][A-Za-z0-9_]+)(\\s*\\([^{}]*{)${vhighlight.js.html_close}`,'gm');
vhighlight.js.inside_class_func_def_regex=new RegExp(`${vhighlight.js.exclude_span}(^|${vhighlight.js.func_def_keywords.join('\\s+|')}\\s+)(\\s*[A-Za-z_][A-Za-z0-9_]+)(\\s*\\([^{}]*{)`,'gm');
vhighlight.js.nameless_func_def_regex=new RegExp(`${vhighlight.js.exclude_span}\\b(function\\s*)(\\([^\\)]*\\))\\s*{`,'gm');
vhighlight.js.nameless_func_def_regex_2=new RegExp(`${vhighlight.js.exclude_span}\\b(function\\s*)(\\()`,'gm');
vhighlight.js.anonymous_func_def_regex=new RegExp(`${vhighlight.js.exclude_span}(\\([^\\(\\)]*\\)\\s*=&gt;\\s*{)`,'gm');
vhighlight.js.call_regex=new RegExp(`${vhighlight.js.exclude_span}\\b([A-Za-z0-9_]+)(\\s*\\()`,'gm');
vhighlight.js.parentheses_regex=new RegExp(`${vhighlight.js.exclude_span}(\\b[A-Za-z0-9_]+\\s*\\()`,'g');
vhighlight.js.parameter_regex=new RegExp(`${vhighlight.js.exclude_span}(^|,)(\\s*[A-Za-z0-9_]+\\b)(?=\\s*[=,$]*)`,'gm');
vhighlight.js.highlight=function(code,is_class=false,reformat=true){
if(reformat){
code=code.replaceAll("<","&lt;");
code=code.replaceAll(">","&gt;");
}
if(!is_class){
code=code.replace(vhighlight.js.comment_regex,'<span class="token_comment">$&</span>');
code=code.replace(vhighlight.js.string_regex,'<span class="token_string">$&</span>');
}
code=code.replace(vhighlight.js.prototype_type_def_regex,'<span class="token_type_def">$1</span>$2');code=code.replace(vhighlight.js.anonymous_prototype_type_def_regex,'<span class="token_type_def">$1</span>$2');
function replace_parameters(regex,replacement=null){
let match;
while((match=regex.exec(code))!==null){
const head=vhighlight.utils.slice_parentheses(code,match.index);
if(head!=null){
code=vhighlight.utils.replace_by_index(code,head.start,head.end,head.data.replace(vhighlight.js.parameter_regex,"$1<span class='token_parameter'>$2</span>"));
regex.lastIndex=head.end+1;
}
}
}
replace_parameters(vhighlight.js.anonymous_func_def_regex);
replace_parameters(vhighlight.js.nameless_func_def_regex,"<span class='token_keyword'>$1</span>$2");
code=code.replace(vhighlight.js.nameless_func_def_regex_2,'<span class="token_keyword">$1</span>$2');
if(!is_class){
let match;
const regex=vhighlight.js.type_def_body_regex;
while((match=regex.exec(code))!==null){
const body=vhighlight.utils.slice_curly_brackets(code,match.index);
if(body!=null){
code=vhighlight.utils.replace_by_index(code,body.start,body.end,vhighlight.js.highlight(body.data,true,false));
regex.lastIndex=body.end+1;
}
}
}
if(is_class){
replace_parameters(vhighlight.js.inside_class_func_def_regex);
}else{
replace_parameters(vhighlight.js.outside_class_func_def_regex);
}
code=code.replace(vhighlight.js.type_def_regex,'<span class="token_keyword">$1</span><span class="token_type_def">$2</span>$3');if(is_class){
code=code.replace(vhighlight.js.inside_class_func_def_regex,'<span class="token_keyword">$1</span><span class="token_type_def">$2</span>$3');}else{
code=code.replace(vhighlight.js.outside_class_func_def_regex,'<span class="token_keyword">$1</span><span class="token_type_def">$2</span>$3');}
code=code.replace(vhighlight.js.keyword_regex,'<span class="token_keyword">$&</span>');code=code.replace(vhighlight.js.call_regex,'<span class="token_type">$1</span>$2');
code=code.replace(vhighlight.js.numeric_regex,'<span class="token_numeric">$&</span>');
return code;
}
vhighlight.cpp={};
vhighlight.cpp.keywords=[
"alignas",
"alignof",
"and",
"and_eq",
"asm",
"atomic_cancel",
"atomic_commit",
"atomic_noexcept",
"auto",
"bitand",
"bitor",
"bool",
"break",
"case",
"catch",
"char",
"char8_t",
"char16_t",
"char32_t",
"class",
"compl",
"concept",
"const",
"consteval",
"constexpr",
"constinit",
"const_cast",
"continue",
"co_await",
"co_return",
"co_yield",
"decltype",
"default",
"delete",
"do",
"double",
"dynamic_cast",
"else",
"enum",
"explicit",
"export",
"extern",
"false",
"float",
"for",
"friend",
"goto",
"if",
"inline",
"int",
"long",
"mutable",
"namespace",
"new",
"noexcept",
"not",
"not_eq",
"nullptr",
"operator",
"or",
"or_eq",
"private",
"protected",
"public",
"reflexpr",
"register",
"reinterpret_cast",
"requires",
"return",
"short",
"signed",
"sizeof",
"static",
"static_assert",
"static_cast",
"struct",
"switch",
"synchronized",
"template",
"this",
"thread_local",
"throw",
"true",
"try",
"typedef",
"typeid",
"typename",
"union",
"unsigned",
"using",
"virtual",
"void",
"volatile",
"wchar_t",
"while",
"xor",
"xor_eq",
];
vhighlight.cpp.typedef_keywords=[
"namespace",
"struct",
"class",
"enum",
"union",
];
vhighlight.cpp.exclude_span="(?!(?:[^<]|<(?!/?span[^>]*>))*?<\\/span>)";vhighlight.cpp.template_params="(?:&lt;(?:[^&]|&[^g]|&g[^t])*?&gt;)?";vhighlight.cpp.html_open="(?<!<[^>]*)";vhighlight.cpp.html_close="(?![^<]*>)";
vhighlight.cpp.comment_regex=/(\/\/.*|\/\*[\s\S]*?\*\/)(?!\S)/g;
vhighlight.cpp.string_regex=new RegExp(`${vhighlight.cpp.exclude_span}${vhighlight.cpp.html_open}(["'])(?:\\\\.|(?![\\1])[^\\\\\\n])*?\\1${vhighlight.cpp.html_close}`,'g');
vhighlight.cpp.sys_include_regex=new RegExp(`${vhighlight.cpp.exclude_span}(\\s*#[A-Za-z0-9_]*\\s*)(&lt;[\\s\\S]*?&gt;)`,'g');
vhighlight.cpp.bool_regex=new RegExp(`${vhighlight.cpp.exclude_span}\\b(true|false)\\b`,'g');
vhighlight.cpp.numeric_regex=new RegExp(`${vhighlight.cpp.exclude_span}\\b-?\\d+(?:\\.\\d+)?\\b`,'g');
vhighlight.cpp.keyword_regex=new RegExp(`${vhighlight.cpp.exclude_span}${vhighlight.cpp.html_open}\\b(${vhighlight.cpp.keywords.join('|')})\\b${vhighlight.cpp.html_close}`,'g');
vhighlight.cpp.typedef_regex=new RegExp(`${vhighlight.cpp.exclude_span}\\b(${vhighlight.cpp.typedef_keywords.join('|')})\\b(\\s*[A-Za-z0-9_]*)\\b(.*{)`,'g');
vhighlight.cpp.preprocessor_regex=new RegExp(`${vhighlight.cpp.exclude_span}(\\s*#(?:[\\s\\S]*?(?=(?<!\\\\)\\n)))`,'g');
vhighlight.cpp.func_regex=new RegExp(`${vhighlight.cpp.exclude_span}(\\w+)\\s*${vhighlight.cpp.template_params}\\s*(\\w+\\s*\\([\\s\\S]*)[{|;]`,"g");
vhighlight.cpp.param_type_regex=new RegExp(`${vhighlight.cpp.exclude_span}([\\n,(]\\s*)(${vhighlight.cpp.keywords.join('\\s+|') + '\\s+'})*([A-Za-z0-9_|:]*${vhighlight.cpp.template_params})`,'g');
vhighlight.cpp.constructor_regex=new RegExp(`${vhighlight.cpp.exclude_span}([A-Za-z0-9_]+${vhighlight.cpp.template_params}\\s+)([A-Za-z0-9_]+)(\\s*[\\(|\\{])`,'g');
vhighlight.cpp.call_regex=new RegExp(`${vhighlight.cpp.exclude_span}\\b([A-Za-z0-9_]+${vhighlight.cpp.template_params})(\\s*[\\(\\{])`,'g');
vhighlight.cpp.type_regex=new RegExp(`${vhighlight.cpp.exclude_span}${vhighlight.cpp.html_open}(?<=\\b)(${vhighlight.cpp.keywords.join('\\s+|') + '\\s+'})*([A-Za-z0-9_]+${vhighlight.cpp.template_params})([&*]*\\s+(?!&gt;|&lt;)[A-Za-z0-9_&*]+)${vhighlight.cpp.html_close}`,'gm');
vhighlight.cpp.namespace_regex=new RegExp(`${vhighlight.cpp.exclude_span}([A-Za-z0-9_]*)(::)([A-Za-z0-9_]+${vhighlight.cpp.template_params})`,'g');
vhighlight.cpp.recorrect_regex=/(<span class="token_type">[^$2|<]*)(,|::|&lt;|&gt;)([^<]*<\/span>)/g;
vhighlight.cpp.highlight=function(code,is_func=false,reformat=true){
if(reformat){code=code.replaceAll("<","&lt;");
code=code.replaceAll(">","&gt;");
}
if(!is_func){code=code.replace(vhighlight.cpp.comment_regex,'<span class="token_comment">$&</span>');code=code.replace(vhighlight.cpp.string_regex,'<span class="token_string">$&</span>');}
let code_blocks=[];
if(!is_func){
let match;
const regex=vhighlight.cpp.func_regex;
while((match=regex.exec(code))!==null){
let func_type="";
let func_name="";
let func_params="";
let func_code="";
let end_index=0;
let pstart=0;
let pend=0;
let bstart=0;
let bend=0;
let depth=0;
let last_space=match.index;
for(let index=match.index;index<code.length;index++){
if(pstart==0 &&(code[index]==" " || code[index]=="\t")&& code[index+1]!="(" && code[index+1]!=" "){
last_space=index;
}
if(pend==0){
if(code[index]=="("){
if(depth==0){
pstart=index;
}
depth++;
}
else if(code[index]==")"){
depth--;
}
if(pstart!=0 && depth==0){
pend=index+1;
depth=0;
func_type=code.substr(match.index,last_space-match.index).trim();
func_name=code.substr(last_space+1,pstart-last_space-1).trim();
func_params=code.substr(pstart,pend-pstart);
if(func_name=="requires"){
break;
}
}
}
else if(bstart==0 && code[index]==";"){
end_index=index+1;
break;
}
else{
if(code[index]=="{"){
if(depth==0){
bstart=index;
}
depth++;
}
else if(code[index]=="}"){
depth--;
}
if(bstart!=0 && depth==0){
bend=index+1;
end_index=index+1;
depth=0;
func_code=code.substr(bstart,bend-bstart).trim();
break;
}
}
}
if(func_name=="requires"){
let highlighted=vhighlight.cpp.highlight_params(func_params);
code_blocks.push(highlighted);
let codeblock_id="{{CODEBLOCK_";
codeblock_id+=code_blocks.length-1;
codeblock_id+="}}";
let replaced=code.substr(0,pstart);
replaced+=codeblock_id;
replaced+=code.substr(pend,code.length-end_index);
code=replaced;
regex.lastIndex=match.index+1;
regex.lastIndex=pend+1;
continue;
}
let highlighted="";
if(vhighlight.cpp.keywords.includes(func_type)){
highlighted+="<span class='token_keyword'>";
}else{
highlighted+="<span class='token_type'>";
}
highlighted+=func_type;
highlighted+="</span>";
highlighted+=" ";
highlighted+="<span class='token_type_def'>";
highlighted+=func_name;
highlighted+="</span>";
highlighted+=vhighlight.cpp.highlight_params(func_params);
if(bend!=0){
highlighted+=" ";
highlighted+=this.highlight(func_code,true,false);
}else{
highlighted+=";";
}
code_blocks.push(highlighted);
let codeblock_id="{{CODEBLOCK_";
codeblock_id+=code_blocks.length-1;
codeblock_id+="}}";
code=vhighlight.utils.replace_by_index(code,match.index,end_index,codeblock_id);
regex.lastIndex=match.index+1;
}
}
code=code.replace(vhighlight.cpp.sys_include_regex,'$1<span class="token_string">$2</span>');code=code.replace(vhighlight.cpp.numeric_regex,'<span class="token_numeric">$&</span>');
code=code.replace(vhighlight.cpp.bool_regex,'<span class="token_bool">$&</span>');
code=code.replace(vhighlight.cpp.typedef_regex,'<span class="token_keyword">$1</span><span class="token_type_def">$2</span>$3');
code=code.replace(vhighlight.cpp.namespace_regex,'<span class="token_type">$1</span>$2<span class="token_type">$3</span>');code=code.replace(vhighlight.cpp.preprocessor_regex,'<span class="token_preprocessor">$&</span>');code=code.replace(vhighlight.cpp.keyword_regex,'<span class="token_keyword">$&</span>');
if(is_func){
code=code.replace(vhighlight.cpp.constructor_regex,'<span class="token_type">$1</span><span class="type_no">$2</span>$3');code=code.replace(vhighlight.cpp.call_regex,'<span class="token_type">$1</span>$2');
}
code=code.replace(vhighlight.cpp.type_regex,'$1<span class="token_type">$2</span>$3');
for(let i=0;i<code_blocks.length;i++){
code=code.replace("{{CODEBLOCK_"+i+"}}",code_blocks[i]);
}
let replaced=true;
while(replaced){
replaced=false;
code=code.replace(vhighlight.cpp.recorrect_regex,function(match,p1,p2,p3){
replaced=true;
return `${p1}</span>${p2}<span class="token_type">${p3}`;
});
}
return code;
}
vhighlight.cpp.highlight_params=function(code){
code=code.replace(vhighlight.cpp.comment_regex,'<span class="token_comment">$&</span>');code=code.replace(vhighlight.cpp.typedef_regex,'<span class="token_keyword">$1</span><span class="token_type_def">$2</span>$3');code=code.replace(vhighlight.cpp.string_regex,'<span class="token_string">$&</span>');code=code.replace(vhighlight.cpp.numeric_regex,'<span class="token_numeric">$&</span>');
code=code.replace(vhighlight.cpp.bool_regex,'<span class="token_bool">$&</span>');
code=code.replace(vhighlight.cpp.param_type_regex,'$1$2<span class="token_type">$3</span>');code=code.replace(vhighlight.cpp.namespace_regex,'<span class="token_type">$1</span>$2<span class="token_type">$3</span>');code=code.replace(vhighlight.cpp.preprocessor_regex,'<span class="token_keyword">$&</span>');code=code.replace(vhighlight.cpp.keyword_regex,'<span class="token_keyword">$&</span>');
code=code.replace(vhighlight.cpp.call_regex,'<span class="token_type">$1</span>$2');
return code;
}
vhighlight.utils={};
vhighlight.utils.replace_by_index=function(str,start,end,substr){
let replaced=str.substr(0,start);
replaced+=substr;
replaced+=str.substr(end,str.length-end);
return replaced;
}
vhighlight.utils.slice_template=function(code,start_index,start_char,end_char,include=false){
let depth=0;
let start=-1;
let end=-1;
let sliced="";
let string_char=null;
for(let index=start_index;index<code.length;index++){
if(string_char==null &&(code[index]=='"' || code[index]=="'" || code[index]=='`')){
string_char=code[index];
}
else if(string_char!=null && code[index]==string_char){
string_char=null;
}
else if(string_char==null){
if(code[index]==start_char){
if(depth==0){
start=index;
}
++depth;
}else if(code[index]==end_char){
--depth;
if(depth==0){
if(include){
end=index+1;
}else{
end=index;
++start;
}
if(start==end){return null;}
return{
"start": start,
"end": end,
"data": code.substr(start,end-start),
}
}
}
}
}
return null;
}
vhighlight.utils.slice_curly_brackets=function(code,start_index,include=false){
return vhighlight.utils.slice_template(code,start_index,'{','}',include);
}
vhighlight.utils.slice_parentheses=function(code,start_index,include=false){
return vhighlight.utils.slice_template(code,start_index,'(',')',include);
}
vhighlight.python={};
vhighlight.python.keywords=[
"and",
"as",
"assert",
"break",
"class",
"continue",
"def",
"del",
"elif",
"else",
"except",
"finally",
"for",
"from",
"global",
"if",
"import",
"in",
"is",
"lambda",
"not",
"or",
"pass",
"raise",
"return",
"try",
"while",
"with",
"yield",
"self",
"True",
"False",
"None",
];
vhighlight.python.exclude_span="(?!(?:[^<]|<(?!/?span[^>]*>))*?<\\/span>)";
vhighlight.python.comment_regex=new RegExp(`${vhighlight.python.exclude_span}^(\\s*#.*)`,'gm');
vhighlight.python.keyword_regex=new RegExp(`${vhighlight.python.exclude_span}\\b(${vhighlight.python.keywords.join('|')})\\b`,'gm');
vhighlight.python.multi_line_string_regex=new RegExp(`(${vhighlight.python.exclude_span})(['"]{3})(.*?)\\2`,'gms');
vhighlight.python.string_regex=new RegExp(`(${vhighlight.python.exclude_span})(['"]{1})(.*?)\\2`,'gms');
vhighlight.python.numeric_regex=new RegExp(`${vhighlight.python.exclude_span}\\b(\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)\\b`,'gm');
vhighlight.python.type_def_regex=new RegExp(`${vhighlight.python.exclude_span}\\b(def|class|lambda)(\\s+[A-Za-z_][A-Za-z0-9_]*)(\\s*\\()`,'gm');
vhighlight.python.call_regex=new RegExp(`${vhighlight.python.exclude_span}\\b([A-Za-z0-9_]+)(\\()`,'gm');
vhighlight.python.call_parentheses_regex=new RegExp(`${vhighlight.python.exclude_span}(\\b[A-Za-z0-9_]+\\s*\\()`,'g');
vhighlight.python.def_parentheses_regex=new RegExp(`${vhighlight.python.exclude_span}(\\s*\\bdef\\s+[A-Za-z0-9_]+\\s*\\()`,'g');
vhighlight.python.call_parameter_regex=new RegExp(`${vhighlight.python.exclude_span}(^|,)(\\s*[A-Za-z0-9_]+\\b)(?=\\s*[=$])`,'gm');
vhighlight.python.def_parameter_regex=new RegExp(`${vhighlight.python.exclude_span}(^|,)(\\s*[A-Za-z0-9_]+\\b)(?=\\s*[=,$])`,'gm');
vhighlight.python.highlight=function(code){
code=code.replaceAll("<","&lt;");
code=code.replaceAll(">","&gt;");
code=code.replace(vhighlight.python.comment_regex,'<span class="token_comment">$&</span>');
code=code.replace(vhighlight.python.multi_line_string_regex,'<span class="token_string">$&</span>');code=code.replace(vhighlight.python.string_regex,'<span class="token_string">$&</span>');
function replace_parameter_names(func_regex,replace_regex,replace_with){
let match;
const regex=func_regex;
while((match=regex.exec(code))!==null){
let result=vhighlight.utils.slice_parentheses(code,match.index,false);
if(result!=null){
code=vhighlight.utils.replace_by_index(code,result.start,result.end,result.data.replace(replace_regex,replace_with));
regex.lastIndex=result.start+1;
}
}
}
replace_parameter_names(vhighlight.python.call_parentheses_regex,vhighlight.python.call_parameter_regex,"$1<span class='token_parameter'>$2</span>");
replace_parameter_names(vhighlight.python.def_parentheses_regex,vhighlight.python.def_parameter_regex,"$1<span class='token_parameter'>$2</span>");
code=code.replace(vhighlight.python.type_def_regex,'<span class="token_keyword">$1</span><span class="token_type_def">$2</span>$3');code=code.replace(vhighlight.python.call_regex,'<span class="token_type">$1</span>$2');code=code.replace(vhighlight.python.keyword_regex,'<span class="token_keyword">$&</span>');
code=code.replace(vhighlight.python.numeric_regex,'<span class="token_numeric">$&</span>');
return code;
}
vhighlight.md={};
vhighlight.md.codeblock_languages=[
"cpp",
"md",
];
vhighlight.md.exclude_span="(?!(?:[^<]|<(?!/?span[^>]*>))*?<\\/span>)";
vhighlight.md.heading_regex=new RegExp(`${vhighlight.md.exclude_span}(^\\s*#{1,6}\\s*)(.*)(\\n|$)`,'gm');
vhighlight.md.bold_regex=new RegExp(`${vhighlight.md.exclude_span}(^|\\s)(\\*|_)(\\*|_)(.*?)(\\*|_)(\\*|_)`,"gm");
vhighlight.md.italic_regex=new RegExp(`${vhighlight.md.exclude_span}(^|\\s)([*_])(.*?)\\2(\\s|$)`,"gm");
vhighlight.md.ul_regex=new RegExp(`${vhighlight.md.exclude_span}^(\\s*[-+*]\\s*)(.*)`,"gm");
vhighlight.md.ol_regex=new RegExp(`${vhighlight.md.exclude_span}^(\\s*\\d+)(.+)$`,"gm");
vhighlight.md.link_regex=new RegExp(`${vhighlight.md.exclude_span}\\[([^\\]]+)\\]\\(([^\\)]+)\\)`,"gm");
vhighlight.md.image_regex=new RegExp(`${vhighlight.md.exclude_span}!\\[([^\\]]+)\\]\\(([^\\)]+)\\)`,"gm");
vhighlight.md.codeline_regex=/(?<!`)(`{1})([^`]*?)\1(?!`)/gm;
vhighlight.md.codeblock_regex=new RegExp(`${vhighlight.md.exclude_span}\`\`\`((?:${vhighlight.md.codeblock_languages.join('|')})*)([^\`]*)\`\`\``,"gm");
vhighlight.md.highlight=function(code){
code=code.replaceAll("<","&lt;");
code=code.replaceAll(">","&gt;");
code=code.replace(vhighlight.md.heading_regex,'<span class="token_preprocessor">$1</span><b>$2</b>$3');
code=code.replace(vhighlight.md.bold_regex,'<span class="token_bold">$&</span>');code=code.replace(vhighlight.md.italic_regex,'<span class="token_italic">$&</span>');code=code.replace(vhighlight.md.ul_regex,'<span class="token_preprocessor">$1</span>$2');
code=code.replace(vhighlight.md.ol_regex,'<span class="token_preprocessor">$1</span>$2');
code=code.replace(vhighlight.md.image_regex,'<span class="token_string">!</span><span class="token_preprocessor">[</span><span class="token_string">$1</span><span class="token_preprocessor">]</span><span class="token_string">($2)</span>');code=code.replace(vhighlight.md.link_regex,'<span class="token_preprocessor">[</span><span class="token_string">$1</span><span class="token_preprocessor">]</span><span class="token_string">($2)</span>');
code=code.replace(vhighlight.md.codeblock_regex,(match,m1,m2)=>{if(m1==""){
return `<div class='token_codeblock'>\`\`\`${m2}\`\`\`</div>`
}else if(m1=="cpp"){
return `<div class='token_codeblock'>\`\`\`${m1}${cpp.highlight(m2)}\`\`\`</div>`
}else{
return `<div class='token_codeblock'>\`\`\`${m1}${m2}\`\`\`</div>`
}
});
code=code.replace(vhighlight.md.codeline_regex,'<span class="token_codeline">$&</span>');
return code;
}
vweb.elements={};
vweb.elements.all_elements=[];
vweb.elements.get=function(id){
for(let i=0;i<vweb.elements.all_elements.length;i++){
const item=vweb.elements.all_elements[i];
if(item.element.id==id){
return item;
}
}
return null;
}
vweb.elements.get_by_id=function(id){
return vweb.elements.get(id)
}
vweb.google={}
vweb.google.init_gtag=function(google_tag){
window.dataLayer=window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config',google_tag);
}
vweb.user={};
vweb.user.uid=function(){
const i=vweb.utils.get_cookie("UserID");
if(i==-1){
return null;
}
return i;
}
vweb.user.username=function(){
const i=vweb.utils.get_cookie("UserName");
if(i==""){
return null;
}
return i;
}
vweb.user.email=function(){
const i=vweb.utils.get_cookie("UserEmail");
if(i==""){
return null;
}
return i;
}
vweb.user.first_name=function(){
const i=vweb.utils.get_cookie("UserFirstName");
if(i==""){
return null;
}
return i;
}
vweb.user.last_name=function(){
const i=vweb.utils.get_cookie("UserLastName");
if(i==""){
return null;
}
return i;
}
vweb.user.authenticated=function(){
return vweb.user.uid()!=null;
}
vweb.user.activated=function(){
if(vweb.utils.get_cookie("UserActivated")=="true"){
return true;
}
return false;
}
vweb.user.get=function({
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "GET",
url: "/backend/user/",
success: success,
error: error,
before: before,
});
}
vweb.user.set=function({
user,
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "POST",
url: "/backend/user/",
data: user,
success: success,
error: error,
before: before,
});
}
vweb.user.activate=function({
code="",
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "POST",
url: "/backend/auth/activate",
data:{
"2fa": code,
},
success: success,
error: error,
before: before,
});
}
vweb.user.change_password=function({
current_password="",
password="",
verify_password="",
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "GET",
url: "/backend/user/change_password",
data:{
current_password: current_password,
password: password,
verify_password: verify_password,
},
success: success,
error: error,
before: before,
});
}
vweb.user.generate_api_key=function({
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "POST",
url: "/backend/user/api_key",
success: success,
error: error,
before: before,
});
}
vweb.user.revoke_api_key=function({
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "DELETE",
url: "/backend/user/api_key",
success: success,
error: error,
before: before,
});
}
vweb.user.load=function({
path="",
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "GET",
url: "/backend/user/data",
data:{
path: path,
},
success: success,
error: error,
before: before,
});
}
vweb.user.save=function({
path="",
data={},
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "POST",
url: "/backend/user/data",
data:{
path: path,
data: data,
},
success: success,
error: error,
before: before,
});
}
vweb.auth={};
vweb.auth.sign_in=function({
email="",
username="",
password="",
code="",
success=null,
error=null,
before=null,
}){
return vweb.utils.request({
method: "POST",
url: "/backend/auth/signin",
data:{
email: email,
username: username,
password: password,
"2fa": code,
},
success: success,
error: error,
before: before,
});
}
vweb.auth.sign_up=function({
username="",
email="",
first_name="",
last_name="",
password="",
verify_password="",
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "POST",
url: "/backend/auth/signup",
data:{
username: username,
email: email,
first_name: first_name,
last_name: last_name,
password: password,
verify_password: verify_password,
},
success: success,
error: error,
before: before,
});
}
vweb.auth.sign_out=function({
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "POST",
url: "/backend/auth/signout",
success: success,
error: error,
before: before,
});
}
vweb.auth.send_2fa=function({
email="",
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "GET",
url: "/backend/auth/2fa",
data:{
email:email,
},
success: success,
error: error,
before: before,
});
}
vweb.auth.forgot_password=function({
email="",
code="",
password="",
verify_password="",
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method: "GET",
url: "/backend/auth/forgot_password",
data:{
email: email,
"2fa": code,
password: password,
verify_password: verify_password,
},
success: success,
error: error,
before: before,
});
}
vweb.utils={};
vweb.utils.is_string=function(value){
return typeof value==='string' || value instanceof String;
}
vweb.utils.is_numeric=function(value){
return typeof value==='number' && Number.isFinite(value);
}
vweb.utils.is_int=function(value){
return typeof value==='number' && Number.isInteger(value);
}
vweb.utils.is_float=function(value){
return typeof value==='number' &&!Number.isNaN(value)&&!Number.isInteger(value);
}
vweb.utils.is_func=function(value){
return typeof myVariable==='function';
}
vweb.utils.eq=function(x,y){
return x==y;
}
vweb.utils.not_eq=function(x,y){
return x!=y;
}
vweb.utils.gt=function(x,y){
return x>y;
}
vweb.utils.gt_eq=function(x,y){
return x>=y;
}
vweb.utils.lt=function(x,y){
return x<y;
}
vweb.utils.lt_eq=function(x,y){
return x<=y;
}
vweb.utils.get_device_width=function(){
return(window.innerWidth>0)? window.innerWidth : screen.width;
}
vweb.utils.get_endpoint=function(){
endpoint=window.location.href.replace("https://","").replace("http://","");
endpoint=endpoint.substr(endpoint.indexOf('/'),endpoint.length);
return endpoint;
}
vweb.utils.get_cookie=function(name){
let index=document.cookie.indexOf(name+"=");
if(index==-1){
return null;
}
index+=name.length+1;
const value=document.cookie.substr(index,document.cookie.length);
if(value==null){return null;}
index=value.indexOf(';');
if(index==-1){
return value;
}
return value.substr(0,index);
}
vweb.utils.redirect=function(url,forced=false){
if(forced || vweb.utils.get_endpoint()!=url){
window.location.href=url;
}
}
vweb.utils.delay=function(mseconds,func){
setTimeout(()=>func(),mseconds);
}
vweb.utils.url_param=function(name,def=null){
const params=new URLSearchParams(window.location.search);
const param=params.get(name);
if(param==null || param==""){
return def;
}
return param;
}
vweb.utils.url_encode=function(params){
const encodedParams=[];
for(const key in params){
if(params.hasOwnProperty(key)){
const encodedKey=encodeURIComponent(key);
const encodedValue=encodeURIComponent(params[key]);
encodedParams.push(`${encodedKey}=${encodedValue}`);
}
}
return encodedParams.join('&');
}
vweb.utils.request=function({
method=null,
url=null,
data=null,
success=null,
error=null,
before=null,
}){
if(data!=null &&!vweb.utils.is_string(data)){
data=JSON.stringify(data);
}
if(before!=null){
before();
}
$.ajax({
url: url,
data: data,
type: method,
credentials: "true",
mimeType: "application/json",
contentType: "application/json",
dataType: "json",
success: function(response,status,xhr){
if(success==null){return null;}
return success(xhr.status,response);
},
error: function(xhr,status,e){
if(error==null){return null;}
let response;
try{
response=JSON.parse(xhr.responseText);
}catch(e){
response={"error": xhr.responseText==null ? e : xhr.responseText};
}
return error(xhr.status,response)
}
})
}
vweb.utils.on_load=function(func){
document.addEventListener("DOMContentLoaded",function(){
let e=func();
if(e!=null){
document.body.appendChild(e.element);
}
});
}
