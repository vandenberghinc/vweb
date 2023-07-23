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
if(vweb.utils.is_float(value)&&value<1.0){
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
for(let i=0;i<children.length;i++){
const child=children[i];
if(child!=null){
if(child.element!=null){
if(
child.element_type=="ForEach"||
child.element_type=="If"||
child.element_type=="IfDeviceWith"
){
child.append_children_to(this.element);
}else{
this.element.appendChild(child.element);
}
}
else if(vweb.utils.is_func(child)){
this.append(child());
}
else if(child instanceof Node){
this.element.appendChild(child);
}
else if(vweb.utils.is_string(child)){
this.element.appendChild(document.createTextNode(child));
}
}
}
return this;
}
zstack_append(...children){
for(let i=0;i<children.length;i++){
const child=children[i];
if(child!=null){
if(child.element!=null){
child.element.style.gridArea="1 / 1 / 2 / 2";
if(
child.element_type=="ForEach"||
child.element_type=="If"||
child.element_type=="IfDeviceWith"
){
child.append_children_to(this.element);
}else{
this.element.appendChild(child.element);
}
}
else if(vweb.utils.is_func(child)){
this.append(child());
}
else if(child instanceof Node){
child.element.style.gridArea="1 / 1 / 2 / 2";
this.element.appendChild(child);
}
else if(vweb.utils.is_string(child)){
this.element.appendChild(document.createTextNode(child));
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
remove_child(child){
if(child.element!=null){
this.element.removeChild(child.element);
}else if(child instanceof Node){
this.element.removeChild(child);
}else if(vweb.utils.is_string(child)){
this.element.removeChild(document.getElementById(child));
}else{
console.error("Invalid parameter type for function \"remove_child()\".");
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
width(value,check_attribute=true){
if(check_attribute&&Element.elements_with_width_attribute.includes(this.element_tag)){
if(value==null){
return this.element.width;
}
this.element.width=value;
}else{
if(value==null){
return this.element.style.width;
}
this.element.style.width=this.pad_numeric(value);
}
return this;
}
height(value){
if(Element.elements_with_width_attribute.includes(this.element_tag)){
if(value==null){
return this.element.height;
}
this.element.height=value;
}else{
if(value==null){
return this.element.style.height;
}
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
offset_width(){
return this.element.offsetWidth;
}
offset_height(){
return this.element.offsetHeight;
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
if(values.length===0){
return this.element.style.padding;
}else if(values.length===1){
this.element.style.padding=this.pad_numeric(values[0]);
}else if(values.length===2){
this.element.style.paddingTop=this.pad_numeric(values[0]);
this.element.style.paddingRight=this.pad_numeric(values[1]);
this.element.style.paddingBottom=this.pad_numeric(values[0]);
this.element.style.paddingLeft=this.pad_numeric(values[1]);
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
if(values.length===0){
return this.element.style.margin;
}else if(values.length===1){
this.element.style.margin=this.pad_numeric(values[0]);
}else if(values.length===2){
this.element.style.marginTop=this.pad_numeric(values[0]);
this.element.style.marginRight=this.pad_numeric(values[1]);
this.element.style.marginBottom=this.pad_numeric(values[0]);
this.element.style.marginLeft=this.pad_numeric(values[1]);
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
if(values.length===0){
return this.element.style.position;
}else if(values.length===1){
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
case "ZStack":
this.element.style.justifyContent=value;
return this;
case "VStack":
case "Scroller":
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
case "ZStack":
this.element.style.alignItems=value;
return this;
case "VStack":
case "Scroller":
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
if(typeof this.element.style.opacity==="undefined"||this.element.style.opacity==""||this.element.style.opacity==1.0){
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
if(value!=null&&value!="none"){
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
is_hidden(...args){
if(args.length===0){
return this.element.style.display=="none"||typeof this.element.style.display==="undefined";
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
if(!(/^\d+$/).test(property)&&this.element.style[property]!=''&&typeof this.element.style[property]!=='function'){
dict[property]=this.element.style[property];
}
else{
const key=this.element.style[property];
const value=this.element.style[key];
if(
key!==''&&key!==undefined&&typeof key!=='function'&&
value!==''&&value!==undefined&&typeof value!=='function'
){
dict[key]=value;
}
}
}
}
return dict;
}
for(const i in css_attr){
const value=css_attr[i];
if(i==="display"&&value!=null&&value!=="none"){
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
this.element[i]=html_events[i];
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
easing="ease-in-out",
delay=0,
duration=1000,
repeat=false,
on_finish=null,
}){
const e=this;
function keep_state(index){
e.element.animate(
[
keyframes[index],
keyframes[index],
],
{
duration:delay,
}
);
}
function do_animation(index){
if(index+1<keyframes.length){
const from=keyframes[index];
const to=keyframes[index+1];
e.element.animate(
[
from,
to,
],
{
duration:from.duration||duration,
}
);
if(to.delay!=null&&to.delay>0){
setTimeout(()=>keep_state(index+1),from.duration||duration);
setTimeout(()=>do_animation(index+1),(from.duration||duration)+(to.delay||0));
}else{
setTimeout(()=>do_animation(index+1),from.duration||duration);
}
}
else if(repeat){
if(delay>0){
keep_state(keyframes.length-1);
setTimeout(()=>do_animation(0),delay);
}
else{
const delay=keyframes[keyframes.length-1].duration||duration;
setTimeout(()=>do_animation(0),delay);
}
}
else if(on_finish!=null){
on_finish(e);
}
};
setTimeout(()=>do_animation(0),delay||0);
return this;
}
on_click(value){
this.element.style.cursor="pointer";
this.element.onclick=value;
return this;
}
on_window_resize({callback,once=false,delay=25}){
if(callback==null){return window.onresize;}
const e=this;
window.addEventListener('resize',()=>{
if(once&&e.on_window_resize_timer!=null){
clearTimeout(e.on_window_resize_timer)
}
e.on_window_resize_timer=setTimeout(()=>callback(e),delay);
});
return this;
}
on_attachment_drop({handler,compress=false}){
this.on_drag_over(function(e){
e.preventDefault();
e.dataTransfer.dropEffect="copy";
});
this.on_drop(function(e){
e.preventDefault();
const files=e.dataTransfer.files;
for(let i=0;i<files.length;i++){
const file=files[i];
const reader=new FileReader();
reader.onload=(event)=>{
if(compress==true){
handler(file.name,vweb.utils.compress(event.target.result),file);
}else{
handler(file.name,event.target.result,file);
}
};
reader.readAsText(file);
}
});
return this;
}
on_appear({callback,repeat=false}){
let is_called=false;
const observer=new IntersectionObserver((entries,observer)=>{
entries.forEach(entry=>{
if(entry.isIntersecting&&!is_called){
if(callback!=null){
const e=this;
callback(e);
}
if(!repeat){
observer.unobserve(entry.target);
}
is_called=true;
}else if(!entry.isIntersecting){
is_called=false;
}
});
});
observer.observe(this.element);
return this;
}
before(){
const pseudo=getComputedStyle(this.element,'::before');
const e=new Element();
e.element=pseudo;
return e;
}
after(){
const pseudo=getComputedStyle(this.element,'::after');
const e=new Element();
e.element=pseudo;
return e;
}
children(){
return this.element.children;
}
first_child(){
return this.element.firstChild;
}
last_child(){
return this.element.lastChild;
}
parent(value){
if(value==null){
return this.parent_e;
}
this.parent_e=value;
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
this.element.style.msAlignContent=value;
this.element.style.webkitAlignContent=value;
this.element.style.MozAlignContent=value;
this.element.style.OAlignContent=value;
return this;
}
align_items(value){
if(value==null){return this.element.style.alignItems;}
this.element.style.alignItems=value;
this.element.style.msAlignItems=value;
this.element.style.webkitAlignItems=value;
this.element.style.MozAlignItems=value;
this.element.style.OAlignItems=value;
return this;
}
align_self(value){
if(value==null){return this.element.style.alignSelf;}
this.element.style.alignSelf=value;
this.element.style.msAlignSelf=value;
this.element.style.webkitAlignSelf=value;
this.element.style.MozAlignSelf=value;
this.element.style.OAlignSelf=value;
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
this.element.style.msAnimation=value;
this.element.style.webkitAnimation=value;
this.element.style.MozAnimation=value;
this.element.style.OAnimation=value;
return this;
}
animation_delay(value){
if(value==null){return this.element.style.animationDelay;}
this.element.style.animationDelay=value;
this.element.style.msAnimationDelay=value;
this.element.style.webkitAnimationDelay=value;
this.element.style.MozAnimationDelay=value;
this.element.style.OAnimationDelay=value;
return this;
}
animation_direction(value){
if(value==null){return this.element.style.animationDirection;}
this.element.style.animationDirection=value;
this.element.style.msAnimationDirection=value;
this.element.style.webkitAnimationDirection=value;
this.element.style.MozAnimationDirection=value;
this.element.style.OAnimationDirection=value;
return this;
}
animation_duration(value){
if(value==null){return this.element.style.animationDuration;}
this.element.style.animationDuration=value;
this.element.style.msAnimationDuration=value;
this.element.style.webkitAnimationDuration=value;
this.element.style.MozAnimationDuration=value;
this.element.style.OAnimationDuration=value;
return this;
}
animation_fill_mode(value){
if(value==null){return this.element.style.animationFillMode;}
this.element.style.animationFillMode=value;
this.element.style.msAnimationFillMode=value;
this.element.style.webkitAnimationFillMode=value;
this.element.style.MozAnimationFillMode=value;
this.element.style.OAnimationFillMode=value;
return this;
}
animation_iteration_count(value){
if(value==null){return this.element.style.animationIterationCount;}
this.element.style.animationIterationCount=value;
this.element.style.msAnimationIterationCount=value;
this.element.style.webkitAnimationIterationCount=value;
this.element.style.MozAnimationIterationCount=value;
this.element.style.OAnimationIterationCount=value;
return this;
}
animation_name(value){
if(value==null){return this.element.style.animationName;}
this.element.style.animationName=value;
this.element.style.msAnimationName=value;
this.element.style.webkitAnimationName=value;
this.element.style.MozAnimationName=value;
this.element.style.OAnimationName=value;
return this;
}
animation_play_state(value){
if(value==null){return this.element.style.animationPlayState;}
this.element.style.animationPlayState=value;
this.element.style.msAnimationPlayState=value;
this.element.style.webkitAnimationPlayState=value;
this.element.style.MozAnimationPlayState=value;
this.element.style.OAnimationPlayState=value;
return this;
}
animation_timing_function(value){
if(value==null){return this.element.style.animationTimingFunction;}
this.element.style.animationTimingFunction=value;
this.element.style.msAnimationTimingFunction=value;
this.element.style.webkitAnimationTimingFunction=value;
this.element.style.MozAnimationTimingFunction=value;
this.element.style.OAnimationTimingFunction=value;
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
this.element.style.msBackfaceVisibility=value;
this.element.style.webkitBackfaceVisibility=value;
this.element.style.MozBackfaceVisibility=value;
this.element.style.OBackfaceVisibility=value;
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
this.element.style.msBackgroundClip=value;
this.element.style.webkitBackgroundClip=value;
this.element.style.MozBackgroundClip=value;
this.element.style.OBackgroundClip=value;
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
this.element.style.msBackgroundOrigin=value;
this.element.style.webkitBackgroundOrigin=value;
this.element.style.MozBackgroundOrigin=value;
this.element.style.OBackgroundOrigin=value;
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
this.element.style.msBackgroundSize=this.pad_numeric(value);
this.element.style.webkitBackgroundSize=this.pad_numeric(value);
this.element.style.MozBackgroundSize=this.pad_numeric(value);
this.element.style.OBackgroundSize=this.pad_numeric(value);
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
this.element.style.msBorderImage=value;
this.element.style.webkitBorderImage=value;
this.element.style.MozBorderImage=value;
this.element.style.OBorderImage=value;
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
this.element.style.msBorderRadius=this.pad_numeric(value);
this.element.style.webkitBorderRadius=this.pad_numeric(value);
this.element.style.MozBorderRadius=this.pad_numeric(value);
this.element.style.OBorderRadius=this.pad_numeric(value);
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
this.element.style.msBoxShadow=value;
this.element.style.webkitBoxShadow=value;
this.element.style.MozBoxShadow=value;
this.element.style.OBoxShadow=value;
return this;
}
box_sizing(value){
if(value==null){return this.element.style.boxSizing;}
this.element.style.boxSizing=value;
this.element.style.msBoxSizing=value;
this.element.style.webkitBoxSizing=value;
this.element.style.MozBoxSizing=value;
this.element.style.OBoxSizing=value;
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
this.element.style.msColumnCount=value;
this.element.style.webkitColumnCount=value;
this.element.style.MozColumnCount=value;
this.element.style.OColumnCount=value;
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
this.element.style.msColumnGap=value;
this.element.style.webkitColumnGap=value;
this.element.style.MozColumnGap=value;
this.element.style.OColumnGap=value;
return this;
}
column_rule(value){
if(value==null){return this.element.style.columnRule;}
this.element.style.columnRule=value;
this.element.style.msColumnRule=value;
this.element.style.webkitColumnRule=value;
this.element.style.MozColumnRule=value;
this.element.style.OColumnRule=value;
return this;
}
column_rule_color(value){
if(value==null){return this.element.style.columnRuleColor;}
this.element.style.columnRuleColor=value;
this.element.style.msColumnRuleColor=value;
this.element.style.webkitColumnRuleColor=value;
this.element.style.MozColumnRuleColor=value;
this.element.style.OColumnRuleColor=value;
return this;
}
column_rule_style(value){
if(value==null){return this.element.style.columnRuleStyle;}
this.element.style.columnRuleStyle=value;
this.element.style.msColumnRuleStyle=value;
this.element.style.webkitColumnRuleStyle=value;
this.element.style.MozColumnRuleStyle=value;
this.element.style.OColumnRuleStyle=value;
return this;
}
column_rule_width(value){
if(value==null){return this.element.style.columnRuleWidth;}
this.element.style.columnRuleWidth=this.pad_numeric(value);
this.element.style.msColumnRuleWidth=this.pad_numeric(value);
this.element.style.webkitColumnRuleWidth=this.pad_numeric(value);
this.element.style.MozColumnRuleWidth=this.pad_numeric(value);
this.element.style.OColumnRuleWidth=this.pad_numeric(value);
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
this.element.style.msColumnWidth=this.pad_numeric(value);
this.element.style.webkitColumnWidth=this.pad_numeric(value);
this.element.style.MozColumnWidth=this.pad_numeric(value);
this.element.style.OColumnWidth=this.pad_numeric(value);
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
this.element.style.msFilter=value;
this.element.style.webkitFilter=value;
this.element.style.MozFilter=value;
this.element.style.OFilter=value;
return this;
}
flex(value){
if(value==null){return this.element.style.flex;}
this.element.style.flex=value;
this.element.style.msFlex=value;
this.element.style.webkitFlex=value;
this.element.style.MozFlex=value;
this.element.style.OFlex=value;
return this;
}
flex_basis(value){
if(value==null){return this.element.style.flexBasis;}
this.element.style.flexBasis=value;
this.element.style.msFlexBasis=value;
this.element.style.webkitFlexBasis=value;
this.element.style.MozFlexBasis=value;
this.element.style.OFlexBasis=value;
return this;
}
flex_direction(value){
if(value==null){return this.element.style.flexDirection;}
this.element.style.flexDirection=value;
this.element.style.msFlexDirection=value;
this.element.style.webkitFlexDirection=value;
this.element.style.MozFlexDirection=value;
this.element.style.OFlexDirection=value;
return this;
}
flex_flow(value){
if(value==null){return this.element.style.flexFlow;}
this.element.style.flexFlow=value;
this.element.style.msFlexFlow=value;
this.element.style.webkitFlexFlow=value;
this.element.style.MozFlexFlow=value;
this.element.style.OFlexFlow=value;
return this;
}
flex_grow(value){
if(value==null){return this.element.style.flexGrow;}
this.element.style.flexGrow=value;
this.element.style.msFlexGrow=value;
this.element.style.webkitFlexGrow=value;
this.element.style.MozFlexGrow=value;
this.element.style.OFlexGrow=value;
return this;
}
flex_shrink(value){
if(value==null){return this.element.style.flexShrink;}
this.element.style.flexShrink=value;
this.element.style.msFlexShrink=value;
this.element.style.webkitFlexShrink=value;
this.element.style.MozFlexShrink=value;
this.element.style.OFlexShrink=value;
return this;
}
flex_wrap(value){
if(value==null){return this.element.style.flexWrap;}
this.element.style.flexWrap=value;
this.element.style.msFlexWrap=value;
this.element.style.webkitFlexWrap=value;
this.element.style.MozFlexWrap=value;
this.element.style.OFlexWrap=value;
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
this.element.style.msJustifyContent=value;
this.element.style.webkitJustifyContent=value;
this.element.style.MozJustifyContent=value;
this.element.style.OJustifyContent=value;
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
this.element.style.msMask=value;
this.element.style.webkitMask=value;
this.element.style.MozMask=value;
this.element.style.OMask=value;
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
this.element.style.msMaskComposite=value;
this.element.style.webkitMaskComposite=value;
this.element.style.MozMaskComposite=value;
this.element.style.OMaskComposite=value;
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
this.element.style.msOrder=value;
this.element.style.webkitOrder=value;
this.element.style.MozOrder=value;
this.element.style.OOrder=value;
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
this.element.style.msPerspective=value;
this.element.style.webkitPerspective=value;
this.element.style.MozPerspective=value;
this.element.style.OPerspective=value;
return this;
}
perspective_origin(value){
if(value==null){return this.element.style.perspectiveOrigin;}
this.element.style.perspectiveOrigin=value;
this.element.style.msPerspectiveOrigin=value;
this.element.style.webkitPerspectiveOrigin=value;
this.element.style.MozPerspectiveOrigin=value;
this.element.style.OPerspectiveOrigin=value;
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
this.element.style.msTransform=value;
this.element.style.webkitTransform=value;
this.element.style.MozTransform=value;
this.element.style.OTransform=value;
return this;
}
transform_origin(value){
if(value==null){return this.element.style.transformOrigin;}
this.element.style.transformOrigin=value;
this.element.style.msTransformOrigin=value;
this.element.style.webkitTransformOrigin=value;
this.element.style.MozTransformOrigin=value;
this.element.style.OTransformOrigin=value;
return this;
}
transform_style(value){
if(value==null){return this.element.style.transformStyle;}
this.element.style.transformStyle=value;
this.element.style.msTransformStyle=value;
this.element.style.webkitTransformStyle=value;
this.element.style.MozTransformStyle=value;
this.element.style.OTransformStyle=value;
return this;
}
transition(value){
if(value==null){return this.element.style.transition;}
this.element.style.transition=value;
this.element.style.msTransition=value;
this.element.style.webkitTransition=value;
this.element.style.MozTransition=value;
this.element.style.OTransition=value;
return this;
}
transition_delay(value){
if(value==null){return this.element.style.transitionDelay;}
this.element.style.transitionDelay=value;
this.element.style.msTransitionDelay=value;
this.element.style.webkitTransitionDelay=value;
this.element.style.MozTransitionDelay=value;
this.element.style.OTransitionDelay=value;
return this;
}
transition_duration(value){
if(value==null){return this.element.style.transitionDuration;}
this.element.style.transitionDuration=value;
this.element.style.msTransitionDuration=value;
this.element.style.webkitTransitionDuration=value;
this.element.style.MozTransitionDuration=value;
this.element.style.OTransitionDuration=value;
return this;
}
transition_property(value){
if(value==null){return this.element.style.transitionProperty;}
this.element.style.transitionProperty=value;
this.element.style.msTransitionProperty=value;
this.element.style.webkitTransitionProperty=value;
this.element.style.MozTransitionProperty=value;
this.element.style.OTransitionProperty=value;
return this;
}
transition_timing_function(value){
if(value==null){return this.element.style.transitionTimingFunction;}
this.element.style.transitionTimingFunction=value;
this.element.style.msTransitionTimingFunction=value;
this.element.style.webkitTransitionTimingFunction=value;
this.element.style.MozTransitionTimingFunction=value;
this.element.style.OTransitionTimingFunction=value;
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
this.element.style.msUserSelect=value;
this.element.style.webkitUserSelect=value;
this.element.style.MozUserSelect=value;
this.element.style.OUserSelect=value;
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
on_after_print(callback){
if(callback==null){return this.element.onafterprint;}
const e=this;
this.element.onafterprint=()=>callback(e);
return this;
}
on_before_print(callback){
if(callback==null){return this.element.onbeforeprint;}
const e=this;
this.element.onbeforeprint=()=>callback(e);
return this;
}
on_before_unload(callback){
if(callback==null){return this.element.onbeforeunload;}
const e=this;
this.element.onbeforeunload=()=>callback(e);
return this;
}
on_error(callback){
if(callback==null){return this.element.onerror;}
const e=this;
this.element.onerror=()=>callback(e);
return this;
}
on_hash_change(callback){
if(callback==null){return this.element.onhashchange;}
const e=this;
this.element.onhashchange=()=>callback(e);
return this;
}
on_load(callback){
if(callback==null){return this.element.onload;}
const e=this;
this.element.onload=()=>callback(e);
return this;
}
on_message(callback){
if(callback==null){return this.element.onmessage;}
const e=this;
this.element.onmessage=()=>callback(e);
return this;
}
on_offline(callback){
if(callback==null){return this.element.onoffline;}
const e=this;
this.element.onoffline=()=>callback(e);
return this;
}
on_online(callback){
if(callback==null){return this.element.ononline;}
const e=this;
this.element.ononline=()=>callback(e);
return this;
}
on_page_hide(callback){
if(callback==null){return this.element.onpagehide;}
const e=this;
this.element.onpagehide=()=>callback(e);
return this;
}
on_page_show(callback){
if(callback==null){return this.element.onpageshow;}
const e=this;
this.element.onpageshow=()=>callback(e);
return this;
}
on_popstate(callback){
if(callback==null){return this.element.onpopstate;}
const e=this;
this.element.onpopstate=()=>callback(e);
return this;
}
on_resize(callback){
if(callback==null){return this.element.onresize;}
const e=this;
this.element.onresize=()=>callback(e);
return this;
}
on_storage(callback){
if(callback==null){return this.element.onstorage;}
const e=this;
this.element.onstorage=()=>callback(e);
return this;
}
on_unload(callback){
if(callback==null){return this.element.onunload;}
const e=this;
this.element.onunload=()=>callback(e);
return this;
}
on_blur(callback){
if(callback==null){return this.element.onblur;}
const e=this;
this.element.onblur=()=>callback(e);
return this;
}
on_change(callback){
if(callback==null){return this.element.onchange;}
const e=this;
this.element.onchange=()=>callback(e);
return this;
}
on_context_menu(callback){
if(callback==null){return this.element.oncontextmenu;}
const e=this;
this.element.oncontextmenu=()=>callback(e);
return this;
}
on_focus(callback){
if(callback==null){return this.element.onfocus;}
const e=this;
this.element.onfocus=()=>callback(e);
return this;
}
on_input(callback){
if(callback==null){return this.element.oninput;}
const e=this;
this.element.oninput=()=>callback(e);
return this;
}
on_invalid(callback){
if(callback==null){return this.element.oninvalid;}
const e=this;
this.element.oninvalid=()=>callback(e);
return this;
}
on_reset(callback){
if(callback==null){return this.element.onreset;}
const e=this;
this.element.onreset=()=>callback(e);
return this;
}
on_search(callback){
if(callback==null){return this.element.onsearch;}
const e=this;
this.element.onsearch=()=>callback(e);
return this;
}
on_select(callback){
if(callback==null){return this.element.onselect;}
const e=this;
this.element.onselect=()=>callback(e);
return this;
}
on_submit(callback){
if(callback==null){return this.element.onsubmit;}
const e=this;
this.element.onsubmit=()=>callback(e);
return this;
}
on_key_down(callback){
if(callback==null){return this.element.onkeydown;}
const e=this;
this.element.onkeydown=()=>callback(e);
return this;
}
on_key_press(callback){
if(callback==null){return this.element.onkeypress;}
const e=this;
this.element.onkeypress=()=>callback(e);
return this;
}
on_key_up(callback){
if(callback==null){return this.element.onkeyup;}
const e=this;
this.element.onkeyup=()=>callback(e);
return this;
}
on_dbl_click(callback){
if(callback==null){return this.element.ondblclick;}
const e=this;
this.element.ondblclick=()=>callback(e);
return this;
}
on_mouse_down(callback){
if(callback==null){return this.element.onmousedown;}
const e=this;
this.element.onmousedown=()=>callback(e);
return this;
}
on_mouse_move(callback){
if(callback==null){return this.element.onmousemove;}
const e=this;
this.element.onmousemove=()=>callback(e);
return this;
}
on_mouse_out(callback){
if(callback==null){return this.element.onmouseout;}
const e=this;
this.element.onmouseout=()=>callback(e);
return this;
}
on_mouse_over(callback){
if(callback==null){return this.element.onmouseover;}
const e=this;
this.element.onmouseover=()=>callback(e);
return this;
}
on_mouse_up(callback){
if(callback==null){return this.element.onmouseup;}
const e=this;
this.element.onmouseup=()=>callback(e);
return this;
}
on_mouse_wheel(callback){
if(callback==null){return this.element.onmousewheel;}
const e=this;
this.element.onmousewheel=()=>callback(e);
return this;
}
on_wheel(callback){
if(callback==null){return this.element.onwheel;}
const e=this;
this.element.onwheel=()=>callback(e);
return this;
}
on_drag(callback){
if(callback==null){return this.element.ondrag;}
const e=this;
this.element.ondrag=()=>callback(e);
return this;
}
on_drag_end(callback){
if(callback==null){return this.element.ondragend;}
const e=this;
this.element.ondragend=()=>callback(e);
return this;
}
on_drag_enter(callback){
if(callback==null){return this.element.ondragenter;}
const e=this;
this.element.ondragenter=()=>callback(e);
return this;
}
on_drag_leave(callback){
if(callback==null){return this.element.ondragleave;}
const e=this;
this.element.ondragleave=()=>callback(e);
return this;
}
on_drag_over(callback){
if(callback==null){return this.element.ondragover;}
const e=this;
this.element.ondragover=()=>callback(e);
return this;
}
on_drag_start(callback){
if(callback==null){return this.element.ondragstart;}
const e=this;
this.element.ondragstart=()=>callback(e);
return this;
}
on_drop(callback){
if(callback==null){return this.element.ondrop;}
const e=this;
this.element.ondrop=()=>callback(e);
return this;
}
on_scroll(callback){
if(callback==null){return this.element.onscroll;}
const e=this;
this.element.onscroll=()=>callback(e);
return this;
}
on_copy(callback){
if(callback==null){return this.element.oncopy;}
const e=this;
this.element.oncopy=()=>callback(e);
return this;
}
on_cut(callback){
if(callback==null){return this.element.oncut;}
const e=this;
this.element.oncut=()=>callback(e);
return this;
}
on_paste(callback){
if(callback==null){return this.element.onpaste;}
const e=this;
this.element.onpaste=()=>callback(e);
return this;
}
on_abort(callback){
if(callback==null){return this.element.onabort;}
const e=this;
this.element.onabort=()=>callback(e);
return this;
}
on_canplay(callback){
if(callback==null){return this.element.oncanplay;}
const e=this;
this.element.oncanplay=()=>callback(e);
return this;
}
on_canplay_through(callback){
if(callback==null){return this.element.oncanplaythrough;}
const e=this;
this.element.oncanplaythrough=()=>callback(e);
return this;
}
on_cue_change(callback){
if(callback==null){return this.element.oncuechange;}
const e=this;
this.element.oncuechange=()=>callback(e);
return this;
}
on_duration_change(callback){
if(callback==null){return this.element.ondurationchange;}
const e=this;
this.element.ondurationchange=()=>callback(e);
return this;
}
on_emptied(callback){
if(callback==null){return this.element.onemptied;}
const e=this;
this.element.onemptied=()=>callback(e);
return this;
}
on_ended(callback){
if(callback==null){return this.element.onended;}
const e=this;
this.element.onended=()=>callback(e);
return this;
}
on_error(callback){
if(callback==null){return this.element.onerror;}
const e=this;
this.element.onerror=()=>callback(e);
return this;
}
on_loaded_data(callback){
if(callback==null){return this.element.onloadeddata;}
const e=this;
this.element.onloadeddata=()=>callback(e);
return this;
}
on_loaded_metadata(callback){
if(callback==null){return this.element.onloadedmetadata;}
const e=this;
this.element.onloadedmetadata=()=>callback(e);
return this;
}
on_load_start(callback){
if(callback==null){return this.element.onloadstart;}
const e=this;
this.element.onloadstart=()=>callback(e);
return this;
}
on_pause(callback){
if(callback==null){return this.element.onpause;}
const e=this;
this.element.onpause=()=>callback(e);
return this;
}
on_play(callback){
if(callback==null){return this.element.onplay;}
const e=this;
this.element.onplay=()=>callback(e);
return this;
}
on_playing(callback){
if(callback==null){return this.element.onplaying;}
const e=this;
this.element.onplaying=()=>callback(e);
return this;
}
onprogress(callback){
if(callback==null){return this.element.onprogress;}
const e=this;
this.element.onprogress=()=>callback(e);
return this;
}
on_rate_change(callback){
if(callback==null){return this.element.onratechange;}
const e=this;
this.element.onratechange=()=>callback(e);
return this;
}
on_seeked(callback){
if(callback==null){return this.element.onseeked;}
const e=this;
this.element.onseeked=()=>callback(e);
return this;
}
on_seeking(callback){
if(callback==null){return this.element.onseeking;}
const e=this;
this.element.onseeking=()=>callback(e);
return this;
}
on_stalled(callback){
if(callback==null){return this.element.onstalled;}
const e=this;
this.element.onstalled=()=>callback(e);
return this;
}
on_suspend(callback){
if(callback==null){return this.element.onsuspend;}
const e=this;
this.element.onsuspend=()=>callback(e);
return this;
}
on_time_update(callback){
if(callback==null){return this.element.ontimeupdate;}
const e=this;
this.element.ontimeupdate=()=>callback(e);
return this;
}
on_volume_change(callback){
if(callback==null){return this.element.onvolumechange;}
const e=this;
this.element.onvolumechange=()=>callback(e);
return this;
}
on_waiting(callback){
if(callback==null){return this.element.onwaiting;}
const e=this;
this.element.onwaiting=()=>callback(e);
return this;
}
on_toggle(callback){
if(callback==null){return this.element.ontoggle;}
const e=this;
this.element.ontoggle=()=>callback(e);
return this;
}
};
class RingLoader extends Element{
static default_styling={
"width":"80px",
"height":"80px",
"--child-background":"black",
"display":"inline-block",
"position":"relative",
};
constructor(){
super("RingLoader","div");
this.style(RingLoader.default_styling);
this.update();
}
background(value){
if(value==null){return tthis.element.style["--child-background"];}
this.element.style["--child-background"]=value;
return this;
}
update(){
this.remove_children();
const width=parseFloat(this.element.style.width.replace("px",""));
const height=parseFloat(this.element.style.height.replace("px",""));
const background=this.element.style["--child-background"];
const children_style={
"box-sizing":"border-box",
"display":"block",
"position":"absolute",
"width":`${width * (64.0 / 80.0)}px`,
"height":`${height * (64.0 / 80.0)}px`,
"margin":`${width * (8.0 / 80.0)}px`,
"border":`${width * (8.0 / 80.0)}px solid ${background}`,
"border-color":`${background} transparent transparent transparent`,
"border-radius":"50%",
"animation":"RingLoader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
};
for(let i=0;i<4;i++){
let e=document.createElement("div");
for(let attr in children_style){
e.style[attr]=children_style[attr];
}
if(i==1){
e.style.animationDelay="-0.45s";
}else if(i==2){
e.style.animationDelay="-0.3s";
}else if(i==3){
e.style.animationDelay="-0.15s";
}
this.append(e);
}
return this;
}
}
class Divider extends Element{
static default_styling={
"margin":"0px",
"padding":"0px",
"width":"100%",
"height":"1px",
"min-height":"1px",
"background":"black",
};
constructor(){
super("Divider","div");
this.style(Divider.default_styling);
}
}
class Scroller extends Element{
static default_styling={
"position":"relative",
"margin":"0px",
"padding":"0px",
"clear":"both",
"display":"flex",
"overflow":"scroll",
"flex-direction":"column",
"text-align":"start",
"scroll-behavior":"smooth",
"overscroll-behavior":"none","height":"fit-content","align-content":"flex-start","align-items":"flex-start",};
constructor(...children){
super("Scroller","div");
this.style(Scroller.default_styling);
this.append(...children);
}
}
class HStack extends Element{
static default_styling={
"position":"relative",
"margin":"0px",
"padding":"0px",
"clear":"both",
"overflow-x":"visible",
"overflow-y":"visible",
"text-align":"start",
"display":"flex",
"flex-direction":"row",
"align-items":"flex-start",};
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
}
else if(args.length>1){
this.type=args[0];
this.colors=[];
for(let i=1;i<args.length;i++){
this.colors.push({
color:args[i],
stop:args[i+1],
})
i++;
}
}else{
console.error("Invalid number of arguments for class \"Gradient()\".");
}
}
toString(){
if(this.gradient==null){
this.gradient=`${this.type}-gradient(`;
for(let i=0;i<this.colors.length;i++){
this.gradient+=this.colors[i].color;
this.gradient+=" ";
let stop=this.colors[i].stop;
if(vweb.utils.is_numeric(stop)&&stop<=1.0){
stop=(stop*100)+"%";
}
this.gradient+=stop;
if(i+1<this.colors.length){
this.gradient+=", ";
}
}
this.gradient+=")";
return this.gradient;
}
return this.gradient;
}
};
class Spacer extends Element{
static default_styling={
"margin":"0px",
"padding":"0px",
"flex":"1",
"flex-grow":"1",
"background":"#00000000",
"filter":"opacity(0)",
"justify-content":"stretch",
};
constructor(){
super("Spacer","div");
this.style(Spacer.default_styling);
}
}
class ForEach extends Element{
static default_styling={
"border":"none",
"outline":"none",
"background":"transparent",
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
"margin":"0px 0px 0px 0px",
"padding":"15px 20px 15px 20px",
"color":"inherit",
"text-align":"start",
"white-space":"wrap",
"font-family":"'Menlo', 'Consolas', monospace",
"font-size":"13px",
"font-weight":"500",
"line-height":"18px",
"border-radius":"15px",
"color":"#FFFFFF",
"background":"#262F3D",
};
constructor(code){
super("CodeBlock","code");
this.style(CodeBlock.default_styling);
if(code!=null){
while(code.length>0&&code[code.length-1]=="\n"){
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
highlight(options={}){
options.element=this.element;
vhighlight.highlight(options);
return this;
}
}
class CodeLine extends Element{
static default_styling={
"font-family":"\"Menlo\", \"Consolas\", monospace",
"font-size":"inherit",
"font-style":"italic",
"background":"#000000",
"color":"#FFFFFF",
"border-radius":"10px",
"padding":"5px 7.5px 5px 7.5px",
};
constructor(text,href){
super("CodeLine","span");
this.style(CodeLine.default_styling);
this.text(text);
}
}
class Link extends Element{
static default_styling={
"font-family":"inherit",
"color":"rgb(85, 108, 214)",
"text-decoration":"underline",
"text-underline-position":"auto",
"cursor":"pointer",
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
"position":"relative",
"margin":"0px",
"padding":"0px",
"clear":"both",
"display":"flex","overflow":"visible",
"align-content":"flex-start","flex-direction":"column",
"text-align":"start",
};
constructor(...children){
super("VStack","div");
this.style(VStack.default_styling);
this.append(...children);
}
}
class ZStack extends Element{
static default_styling={
"position":"relative",
"margin":"0px",
"padding":"0px",
"display":"grid",
"text-align":"start",
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
"margin":"0px 0px 0px 0px",
"color":"inherit",
"white-space":"wrap",
"text-align":"inherit",
"color":"green",
};
constructor(text){
super("Title","h1");
this.style(Title.default_styling);
this.inner_html(text);
}
}
class If extends Element{
static default_styling={};
constructor(...args){
super("If","section");
this.style(View.default_styling);
if(args[0]==true){
for(let i=0;i<args.length;i++){
if(vweb.utils.is_func(args[i])){
args[i]();
}
else{
this.append(args[i]);
}
}
}
}
}
class Canvas extends Element{
constructor(){
super("Canvas","canvas");
this.ctx_2d=this.element.getContext("2d");
}
draw_lines(ctx,points=[{x:0,y:0}],tension=null){
ctx.beginPath();
ctx.moveTo(points[0].x,points[0].y);
let t;
for(let i=0;i<points.length-1;i++){
if(points[i].tension!=null){
t=points[i].tension;
}else{
t=(tension!=null)? tension:0;
}
let p0=(i>0)? points[i-1]:points[0];
let p1=points[i];
let p2=points[i+1];
let p3=(i!=points.length-2)? points[i+2]:p2;
let cp1x=p1.x+(p2.x-p0.x)/6*t;
let cp1y=p1.y+(p2.y-p0.y)/6*t;
let cp2x=p2.x-(p3.x-p1.x)/6*t;
let cp2y=p2.y-(p3.y-p1.y)/6*t;
ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,p2.x,p2.y);
}
}
create_gradient(ctx,gradient,start_x,start_y,end_x,end_y){
if(!(gradient instanceof Gradient)){
console.error("Invalid usage, parameter \"gradient\" should be type \"Gradient\".");
return null;
}
let value;
if(gradient.type=="linear"){
value=ctx.createLinearGradient(start_x,start_y,end_x,end_y)
}else if(gradient.type=="radial"){
value=ctx.createRadialGradient(start_x,start_y,end_x,end_y)}else{
value=ctx.createLinearGradient(start_x,start_y,end_x,end_y)
}
for(let i=0;i<gradient.colors.length;i++){
let stop=gradient.colors[i].stop;
if(vweb.utils.is_string(stop)&&stop.includes("%")){
stop=parseFloat(stop.substr(0,stop.length-1))/100;
}else if(vweb.utils.is_string(stop)&&stop.includes("px")){
stop=parseFloat(stop.substr(0,stop.length-2));
}
value.addColorStop(stop,gradient.colors[i].color);
}
return value;
}
lines({
points=[{x:0,y:0}],
tension=null,
color="black",
width=null,
fill=null,
scale=false,
dots=null,
}){
let ctx=this.ctx_2d;
if(scale){
const width=this.width();
const height=this.height();
for(let i=0;i<points.length;i++){
points[i].x=width*points[i].x;
points[i].y=height*points[i].y;
}
}
this.draw_lines(ctx,points,tension);
if(width!=null){
ctx.lineWidth=width;
}
if(color!=null){
ctx.strokeStyle=color;
}else{
ctx.strokeStyle="transparent";
}
ctx.stroke();
if(fill!=null){
if(fill instanceof Gradient){
let minX=Infinity;
let maxX=-Infinity;
let minY=Infinity;
let maxY=-Infinity;
points.forEach((point)=>{
minX=Math.min(minX,point.x);
maxX=Math.max(maxX,point.x);
minY=Math.min(minY,point.y);
maxY=Math.max(maxY,point.y);
});
ctx.fillStyle=this.create_gradient(ctx,fill,minX,minY,maxX,maxY);
}
else{
ctx.fillStyle=fill;
}
ctx.fill();
}
if(dots!=null){
if(dots.width==null){
if(scale){
dots.width=0.01;
}else{
dots.width=5;
}
}
if(scale){
dots.width=dots.width*this.width();
}
let is_gradient=false;
if(dots.color!=null){
if(dots.color instanceof Gradient){
is_gradient=true;
}else{
ctx.fillStyle=dots.color;
}
}
for(let i=0;i<points.length;i++){
ctx.beginPath();
ctx.arc(points[i].x,points[i].y,dots.width,0,2*Math.PI);
if(is_gradient){
const gradient=this.create_gradient(ctx,dots.color,points[i].x-dots.width,points[i].y,points[i].x+dots.width,points[i].y);
ctx.fillStyle=gradient;
}
ctx.fill();
}
}
return this;
}
clear(){
this.ctx_2d.clearRect(0,0,this.element.width,this.element.height);
return this;
}
};
class Image extends Element{
static default_styling={
"margin":"0px",
"padding":"0px",
"object-fit":"cover",
};
constructor(src){
super("Image","img");
this.style(Image.default_styling);
this.src(src);
}
}
class ImageMask extends Element{
static default_styling={
"margin":"0px",
"padding":"0px",
"object-fit":"cover",
"display":"inline-block",
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
"margin":"0px 0px 0px",
"padding":"5px 10px 5px 10px",
"border-radius":"10px",
"cursor":"pointer",
"text-decoration":"none",
"color":"inherit",
"text-align":"center",
"display":"grid",
"align-items":"center",
"white-space":"nowrap",
};
static default_events={
"onmousedown":function(){this.style.filter="brightness(80%)";},
"onmouseover":function(){this.style.filter="brightness(90%)";},
"onmouseup":function(){this.style.filter="brightness(100%)";},
"onmouseout":function(){this.style.filter="brightness(100%)";},
};
constructor(text){
super("Button","a");
this.style(Button.default_styling);
this.events(Button.default_events);
this.inner_html(text);
}
}
class BorderButton extends Element{
static default_styling={
"margin":"0px 0px 0px 0px",
"display":"inline-block",
"color":"inherit",
"text-align":"center",
"cursor":"pointer",
"text-decoration":"none",
"position":"relative",
"z-index":0,
"--child-color":"black",
"--child-background":"black",
"--child-border-width":"2px",
"--child-border-radius":"10px",
"--child-padding":"5px 10px 5px 10px",
};
static default_events={
"onmousedown":function(){this.style.filter="brightness(80%)";},
"onmouseover":function(){this.style.filter="brightness(90%)";},
"onmouseup":function(){this.style.filter="brightness(100%)";},
"onmouseout":function(){this.style.filter="brightness(100%)";},
};
constructor(text){
super("Button","div");
let styles={...BorderButton.default_styling};
delete styles["--child-color"];
delete styles["--child-background"];
delete styles["--child-border-width"];
delete styles["--child-padding"];
delete styles["--child-background-image"];
delete styles["--child-background-clip"];
delete styles["--child-webkit-background-clip"];
this.style(styles);
this.events(BorderButton.default_events);
this.border_e=new Element()
.content("")
.position("absolute")
.z_index(-1)
.inset(0)
.padding(BorderButton.default_styling["--child-border-width"])
.border_radius(BorderButton.default_styling["--child-border-radius"])
.background(BorderButton.default_styling["--child-background"])
.mask("linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)")
.mask_composite("exclude")
.style({
"-webkit-mask":"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
"-webkit-mask-composite":"exclude",})
this.text_e=new Element("Div","div")
.color(BorderButton.default_styling["--child-color"])
.append(text);
if(BorderButton.default_styling["--child-color"]=="transparent"){
this.text_e.element.style.backgroundImage=BorderButton.default_styling["--child-background-image"];
this.text_e.element.style.backgroundClip=BorderButton.default_styling["--child-background-clip"];
this.text_e.element.style["-webkit-background-clip"]=BorderButton.default_styling["--child-webkit-background-clip"];
}
this.append(this.border_e,this.text_e);
}
gradient(value){
if(value==null){
return this.border_e.background();
}
this.border_e.background(value);
return this;
}
border_color(value){
if(value==null){
return this.border_e.background();
}
this.border_e.background(value);
return this;
}
border_width(value){
if(value==null){
return this.border_e.border_radius();
}
this.border_e.padding(value);
return this;
}
border_radius(value){
if(value==null){
return this.border_e.border_radius();
}
super.border_radius(value);
this.border_e.border_radius(value);
return this;
}
color(value){
if(value==null){
return this.text_e.color();
}
this.text_e.color(value);
return this;
}
style(style_dict){
if(style_dict==null){
let styles=super.style(null);
styles["--child-background"]=this.border_e.background();
styles["--child-border-width"]=this.border_e.padding();
styles["--child-border-radius"]=this.border_e.border_radius();
styles["--child-color"]=this.text_e.color();
styles["--child-background-image"]=this.text_e.element.style.backgroundImage;
styles["--child-background-clip"]=this.text_e.element.style.backgroundClip;
styles["--child-webkit-background-clip"]=this.text_e.element.style["-webkit-background-clip"];
return styles;
}else{
return super.style(style_dict);
}
}
}
class LoaderButton extends HStack{
static default_styling={
"margin":"0px",
"padding":"12.5px 10px 12.5px 10px",
"border-radius":"25px",
"cursor":"pointer",
"background":"black",
"color":"inherit",
"font-size":"16px",
"--loader-width":"25px",
"--loader-height":"25px",
"--loader-margin-right":"15px",
"--loader-margin-top":"-2px",
};
constructor(text="",loader=new RingLoader()){
super();
this.style(LoaderButton.default_styling);
this.wrap(false);
this.center();
this.center_vertical()
this.loader=loader
.width(LoaderButton.default_styling["--loader-width"])
.height(LoaderButton.default_styling["--loader-height"])
.margin_right(LoaderButton.default_styling["--loader-margin-right"])
.margin_top(LoaderButton.default_styling["--loader-margin-top"])
.background(THEME.button_txt)
.update()
.hide();
this.loader.parent(this);
this.text_e=new Element("Div","div").text(text)
.margin(0)
.padding(0);
this.text_e.parent(this);
this.padding_e=new VStack()
.padding(0)
.margin(0)
.height(1)
.width(25);
this.padding_e.parent(this);
this.append(this.loader,this.text_e);
}
show_loader(){
this.padding_e.width(this.loader.element.style.width);
this.append(this.padding_e);
this.loader.update();
this.loader.show();
return this;
}
hide_loader(){
this.loader.hide();
this.remove_child(this.padding_e);
return this;
}
style(style_dict){
if(style_dict==null){
let styles=super.style();
styles["--loader-width"]=this.loader.width();
styles["--loader-height"]=this.loader.height();
styles["--loader-margin-right"]=this.loader.margin_right();
styles["--loader-margin-top"]=this.loader.margin_top();
return styles;
}else{
return super.style(style_dict);
}
}
}
class View extends Element{
static default_styling={
"position":"absolute",
"top":"0",
"right":"0",
"bottom":"0",
"left":"0",
"padding":"0px",
"display":"block",
"overflow":"hidden",
"overflow-y":"none",
"background":"none",
"display":"flex","text-align":"start",
"align-content":"flex-start","flex-direction":"column",
};
constructor(...children){
super("View","div");
this.style(View.default_styling);
this.append(...children);
}
}
class GoogleMap extends Element{
static default_styling={
"border":"0",
};
static default_attributes={
"width":"100%",
"height":"100%",
"frameborder":"0",
"style":"border:0",
"referrerpolicy":"no-referrer-when-downgrade",
"allowfullscreen":"true",
};
constructor(location,mode="place"){
super("GoogleMap","iframe");
this.style(GoogleMap.default_styling);
this.attributes(GoogleMap.default_attributes);
this.src("https://www.google.com/maps/embed/v1/"+mode+"?key="+google_cloud_api_key+"&"+vweb.utils.url_encode({"q":location.replaceAll(' ','+')}));
}
update(){
this.remove_children();
const children_style={
"width":"calc("+this.element.style.width+" * (64.0px / 80.0px))",
"height":"calc("+this.element.style.height+" * (64.0px / 80.0px))",
"margin":"calc("+this.element.style.width+" * (8.0px / 80.0px))",
"border":"calc("+this.element.style.width+" * (8.0px / 80.0px)) solid "+this.element.style.background,
"border-color":this.element.style.background+" transparent transparent transparent",
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
"margin":"0px 0px 0px 0px",
"padding":"2.5px",
"padding":"2.5px",
"font-size":"20px",
"color":"inherit",
"text-align":"inherit",
"white-space":"wrap",
};
constructor(text){
super("Text","p");
this.style(Text.default_styling);
this.inner_html(text);
}
}
class Input extends Element{
static default_styling={
"margin":"0px 0px 0px 0px",
"padding":"2.5px 5px 2.5px 5px",
"height":"20px",
"font":"inherit",
"color":"inherit",
"background":"none",
"outline":"none",
"border":"none",
"border-radius":"10px",
"text-align":"start",
"white-space":"nowrap",
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
"margin":"0px 0px 0px 0px",
"padding":"2.5px 5px 2.5px 5px",
"height":"20px",
"font":"inherit",
"color":"inherit",
"background":"none",
"outline":"none",
"border":"none",
"border-radius":"10px",
"text-align":"start",
"white-space":"nowrap",
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
"margin":"0px 0px 0px 0px",
"padding":"2.5px 5px 2.5px 5px",
"height":"20px",
"font":"inherit",
"color":"inherit",
"background":"none",
"outline":"none",
"border":"none",
"border-radius":"10px",
"text-align":"start",
"white-space":"nowrap",
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
"margin":"0px 0px 0px 0px",
"padding":"2.5px 5px 2.5px 5px",
"height":"20px",
"font":"inherit",
"color":"inherit",
"background":"none",
"outline":"none",
"border":"none",
"border-radius":"10px",
"text-align":"start",
"white-space":"nowrap",
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
"margin":"0px 0px 0px 0px",
"padding":"2.5px 5px 2.5px 5px",
"height":"20px",
"font":"inherit",
"color":"inherit",
"background":"none",
"outline":"none",
"border":"none",
"border-radius":"10px",
"text-align":"start",
"white-space":"wrap",
"resize":"none",
};
constructor(placeholder){
super("InputBox","textarea");
this.style(InputBox.default_styling);
this.placeholder(placeholder);
}
}
class SelectOptionInput extends Element{
static default_styling={
"margin":"0px 0px 0px 0px",
"padding":"2.5px 5px 2.5px 5px",
"height":"20px",
"font":"inherit",
"color":"inherit",
"background":"none",
"outline":"none",
"border":"none",
"border-radius":"10px",
"text-align":"start",
"white-space":"wrap",
"resize":"none",
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
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={})}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,i=286,n=30,s=15,r=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),o=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);e(d);const _=new Array(60);e(_);const f=new Array(512);e(f);const c=new Array(256);e(c);const u=new Array(29);e(u);const w=new Array(n);function m(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}let b,g,p;function k(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(w);const v=t=>t<256?f[t]:f[256+(t>>>7)],y=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},x=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,y(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},z=(t,e,a)=>{x(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const i=new Array(16);let n,r,o=0;for(n=1;n<=s;n++)o=o+a[n-1]<<1,i[n]=o;for(r=0;r<=e;r++){let e=t[2*r+1];0!==e&&(t[2*r]=A(i[e]++,e))}},R=t=>{let e;for(e=0;e<i;e++)t.dyn_ltree[2*e]=0;for(e=0;e<n;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.sym_next=t.matches=0},Z=t=>{t.bi_valid>8?y(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},U=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},S=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&U(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!U(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i},D=(t,e,i)=>{let n,s,l,h,d=0;if(0!==t.sym_next)do{n=255&t.pending_buf[t.sym_buf+d++],n+=(255&t.pending_buf[t.sym_buf+d++])<<8,s=t.pending_buf[t.sym_buf+d++],0===n?z(t,s,e):(l=c[s],z(t,l+a+1,e),h=r[l],0!==h&&(s-=u[l],x(t,s,h)),n--,l=v(n),z(t,l,i),h=o[l],0!==h&&(n-=w[l],x(t,n,h)))}while(d<t.sym_next);z(t,256,e)},T=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,r=e.stat_desc.elems;let o,l,h,d=-1;for(t.heap_len=0,t.heap_max=573,o=0;o<r;o++)0!==a[2*o]?(t.heap[++t.heap_len]=d=o,t.depth[o]=0):a[2*o+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=d<2?++d:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,n&&(t.static_len-=i[2*h+1]);for(e.max_code=d,o=t.heap_len>>1;o>=1;o--)S(t,a,o);h=r;do{o=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),l=t.heap[1],t.heap[--t.heap_max]=o,t.heap[--t.heap_max]=l,a[2*h]=a[2*o]+a[2*l],t.depth[h]=(t.depth[o]>=t.depth[l]?t.depth[o]:t.depth[l])+1,a[2*o+1]=a[2*l+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,o=e.stat_desc.extra_bits,l=e.stat_desc.extra_base,h=e.stat_desc.max_length;let d,_,f,c,u,w,m=0;for(c=0;c<=s;c++)t.bl_count[c]=0;for(a[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=a[2*a[2*_+1]+1]+1,c>h&&(c=h,m++),a[2*_+1]=c,_>i||(t.bl_count[c]++,u=0,_>=l&&(u=o[_-l]),w=a[2*_],t.opt_len+=w*(c+u),r&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==m){do{for(c=h-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[h]--,m-=2}while(m>0);for(c=h;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>i||(a[2*f+1]!==c&&(t.opt_len+=(c-a[2*f+1])*a[2*f],a[2*f+1]=c),_--)}})(t,e),E(a,d,t.bl_count)},O=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++o<l&&n===r||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):o<=10?t.bl_tree[34]++:t.bl_tree[36]++,o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4))},I=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++o<l&&n===r)){if(o<h)do{z(t,n,t.bl_tree)}while(0!=--o);else 0!==n?(n!==s&&(z(t,n,t.bl_tree),o--),z(t,16,t.bl_tree),x(t,o-3,2)):o<=10?(z(t,17,t.bl_tree),x(t,o-3,3)):(z(t,18,t.bl_tree),x(t,o-11,7));o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4)}};let F=!1;const L=(t,e,a,i)=>{x(t,0+(i?1:0),3),Z(t),y(t,a),y(t,~a),a&&t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a};var N=(t,e,i,n)=>{let s,r,o=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),T(t,t.l_desc),T(t,t.d_desc),o=(t=>{let e;for(O(t,t.dyn_ltree,t.l_desc.max_code),O(t,t.dyn_dtree,t.d_desc.max_code),T(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),s=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=s&&(s=r)):s=r=i+5,i+4<=s&&-1!==e?L(t,e,i,n):4===t.strategy||r===s?(x(t,2+(n?1:0),3),D(t,d,_)):(x(t,4+(n?1:0),3),((t,e,a,i)=>{let n;for(x(t,e-257,5),x(t,a-1,5),x(t,i-4,4),n=0;n<i;n++)x(t,t.bl_tree[2*h[n]+1],3);I(t,t.dyn_ltree,e-1),I(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,o+1),D(t,t.dyn_ltree,t.dyn_dtree)),R(t),n&&Z(t)},B={_tr_init:t=>{F||((()=>{let t,e,a,h,k;const v=new Array(16);for(a=0,h=0;h<28;h++)for(u[h]=a,t=0;t<1<<r[h];t++)c[a++]=h;for(c[a-1]=h,k=0,h=0;h<16;h++)for(w[h]=k,t=0;t<1<<o[h];t++)f[k++]=h;for(k>>=7;h<n;h++)for(w[h]=k<<7,t=0;t<1<<o[h]-7;t++)f[256+k++]=h;for(e=0;e<=s;e++)v[e]=0;for(t=0;t<=143;)d[2*t+1]=8,t++,v[8]++;for(;t<=255;)d[2*t+1]=9,t++,v[9]++;for(;t<=279;)d[2*t+1]=7,t++,v[7]++;for(;t<=287;)d[2*t+1]=8,t++,v[8]++;for(E(d,287,v),t=0;t<n;t++)_[2*t+1]=5,_[2*t]=A(t,5);b=new m(d,r,257,i,s),g=new m(_,o,0,n,s),p=new m(new Array(0),l,0,19,7)})(),F=!0),t.l_desc=new k(t.dyn_ltree,b),t.d_desc=new k(t.dyn_dtree,g),t.bl_desc=new k(t.bl_tree,p),t.bi_buf=0,t.bi_valid=0,R(t)},_tr_stored_block:L,_tr_flush_block:N,_tr_tally:(t,e,i)=>(t.pending_buf[t.sym_buf+t.sym_next++]=e,t.pending_buf[t.sym_buf+t.sym_next++]=e>>8,t.pending_buf[t.sym_buf+t.sym_next++]=i,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(c[i]+a+1)]++,t.dyn_dtree[2*v(e)]++),t.sym_next===t.sym_end),_tr_align:t=>{x(t,2,3),z(t,256,d),(t=>{16===t.bi_valid?(y(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var C=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const M=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var H=(t,e,a,i)=>{const n=M,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},j={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},K={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:P,_tr_stored_block:Y,_tr_flush_block:G,_tr_tally:X,_tr_align:W}=B,{Z_NO_FLUSH:q,Z_PARTIAL_FLUSH:J,Z_FULL_FLUSH:Q,Z_FINISH:V,Z_BLOCK:$,Z_OK:tt,Z_STREAM_END:et,Z_STREAM_ERROR:at,Z_DATA_ERROR:it,Z_BUF_ERROR:nt,Z_DEFAULT_COMPRESSION:st,Z_FILTERED:rt,Z_HUFFMAN_ONLY:ot,Z_RLE:lt,Z_FIXED:ht,Z_DEFAULT_STRATEGY:dt,Z_UNKNOWN:_t,Z_DEFLATED:ft}=K,ct=258,ut=262,wt=42,mt=113,bt=666,gt=(t,e)=>(t.msg=j[e],e),pt=t=>2*t-(t>4?9:0),kt=t=>{let e=t.length;for(;--e>=0;)t[e]=0},vt=t=>{let e,a,i,n=t.w_size;e=t.hash_size,i=e;do{a=t.head[--i],t.head[i]=a>=n?a-n:0}while(--e);e=n,i=e;do{a=t.prev[--i],t.prev[i]=a>=n?a-n:0}while(--e)};let yt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const xt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},zt=(t,e)=>{G(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,xt(t.strm)},At=(t,e)=>{t.pending_buf[t.pending++]=e},Et=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Rt=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=C(t.adler,e,n,a):2===t.state.wrap&&(t.adler=H(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},Zt=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,o=t.nice_match;const l=t.strstart>t.w_size-ut?t.strstart-(t.w_size-ut):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+ct;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=ct-(f-s),s=f-ct,i>r){if(t.match_start=e,r=i,i>=o)break;c=h[s+r-1],u=h[s+r]}}}while((e=_[e&d])>l&&0!=--n);return r<=t.lookahead?r:t.lookahead},Ut=t=>{const e=t.w_size;let a,i,n;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ut)&&(t.window.set(t.window.subarray(e,e+e-i),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,t.insert>t.strstart&&(t.insert=t.strstart),vt(t),i+=e),0===t.strm.avail_in)break;if(a=Rt(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=a,t.lookahead+t.insert>=3)for(n=t.strstart-t.insert,t.ins_h=t.window[n],t.ins_h=yt(t,t.ins_h,t.window[n+1]);t.insert&&(t.ins_h=yt(t,t.ins_h,t.window[n+3-1]),t.prev[n&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=n,n++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ut&&0!==t.strm.avail_in)},St=(t,e)=>{let a,i,n,s=t.pending_buf_size-5>t.w_size?t.w_size:t.pending_buf_size-5,r=0,o=t.strm.avail_in;do{if(a=65535,n=t.bi_valid+42>>3,t.strm.avail_out<n)break;if(n=t.strm.avail_out-n,i=t.strstart-t.block_start,a>i+t.strm.avail_in&&(a=i+t.strm.avail_in),a>n&&(a=n),a<s&&(0===a&&e!==V||e===q||a!==i+t.strm.avail_in))break;r=e===V&&a===i+t.strm.avail_in?1:0,Y(t,0,0,r),t.pending_buf[t.pending-4]=a,t.pending_buf[t.pending-3]=a>>8,t.pending_buf[t.pending-2]=~a,t.pending_buf[t.pending-1]=~a>>8,xt(t.strm),i&&(i>a&&(i=a),t.strm.output.set(t.window.subarray(t.block_start,t.block_start+i),t.strm.next_out),t.strm.next_out+=i,t.strm.avail_out-=i,t.strm.total_out+=i,t.block_start+=i,a-=i),a&&(Rt(t.strm,t.strm.output,t.strm.next_out,a),t.strm.next_out+=a,t.strm.avail_out-=a,t.strm.total_out+=a)}while(0===r);return o-=t.strm.avail_in,o&&(o>=t.w_size?(t.matches=2,t.window.set(t.strm.input.subarray(t.strm.next_in-t.w_size,t.strm.next_in),0),t.strstart=t.w_size,t.insert=t.strstart):(t.window_size-t.strstart<=o&&(t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,t.insert>t.strstart&&(t.insert=t.strstart)),t.window.set(t.strm.input.subarray(t.strm.next_in-o,t.strm.next_in),t.strstart),t.strstart+=o,t.insert+=o>t.w_size-t.insert?t.w_size-t.insert:o),t.block_start=t.strstart),t.high_water<t.strstart&&(t.high_water=t.strstart),r?4:e!==q&&e!==V&&0===t.strm.avail_in&&t.strstart===t.block_start?2:(n=t.window_size-t.strstart,t.strm.avail_in>n&&t.block_start>=t.w_size&&(t.block_start-=t.w_size,t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,n+=t.w_size,t.insert>t.strstart&&(t.insert=t.strstart)),n>t.strm.avail_in&&(n=t.strm.avail_in),n&&(Rt(t.strm,t.window,t.strstart,n),t.strstart+=n,t.insert+=n>t.w_size-t.insert?t.w_size-t.insert:n),t.high_water<t.strstart&&(t.high_water=t.strstart),n=t.bi_valid+42>>3,n=t.pending_buf_size-n>65535?65535:t.pending_buf_size-n,s=n>t.w_size?t.w_size:n,i=t.strstart-t.block_start,(i>=s||(i||e===V)&&e!==q&&0===t.strm.avail_in&&i<=n)&&(a=i>n?n:i,r=e===V&&0===t.strm.avail_in&&a===i?1:0,Y(t,t.block_start,a,r),t.block_start+=a,xt(t.strm)),r?3:1)},Dt=(t,e)=>{let a,i;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a)),t.match_length>=3)if(i=X(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=yt(t,t.ins_h,t.window[t.strstart+1]);else i=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2},Tt=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a),t.match_length<=5&&(t.strategy===rt||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=X(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(zt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=X(t,0,t.window[t.strstart-1]),i&&zt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=X(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2};function Ot(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}const It=[new Ot(0,0,0,0,St),new Ot(4,4,8,4,Dt),new Ot(4,5,16,8,Dt),new Ot(4,6,32,32,Dt),new Ot(4,4,16,16,Tt),new Ot(8,16,32,32,Tt),new Ot(8,16,128,128,Tt),new Ot(8,32,128,256,Tt),new Ot(32,128,258,1024,Tt),new Ot(32,258,258,4096,Tt)];function Ft(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ft,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),kt(this.dyn_ltree),kt(this.dyn_dtree),kt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),kt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),kt(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Lt=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.status!==wt&&57!==e.status&&69!==e.status&&73!==e.status&&91!==e.status&&103!==e.status&&e.status!==mt&&e.status!==bt?1:0},Nt=t=>{if(Lt(t))return gt(t,at);t.total_in=t.total_out=0,t.data_type=_t;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=2===e.wrap?57:e.wrap?wt:mt,t.adler=2===e.wrap?0:1,e.last_flush=-2,P(e),tt},Bt=t=>{const e=Nt(t);var a;return e===tt&&((a=t.state).window_size=2*a.w_size,kt(a.head),a.max_lazy_match=It[a.level].max_lazy,a.good_match=It[a.level].good_length,a.nice_match=It[a.level].nice_length,a.max_chain_length=It[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ct=(t,e,a,i,n,s)=>{if(!t)return at;let r=1;if(e===st&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==ft||i<8||i>15||e<0||e>9||s<0||s>ht||8===i&&1!==r)return gt(t,at);8===i&&(i=9);const o=new Ft;return t.state=o,o.strm=t,o.status=wt,o.wrap=r,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.sym_buf=o.lit_bufsize,o.sym_end=3*(o.lit_bufsize-1),o.level=e,o.strategy=s,o.method=a,Bt(t)};var Mt={deflateInit:(t,e)=>Ct(t,e,ft,15,8,dt),deflateInit2:Ct,deflateReset:Bt,deflateResetKeep:Nt,deflateSetHeader:(t,e)=>Lt(t)||2!==t.state.wrap?at:(t.state.gzhead=e,tt),deflate:(t,e)=>{if(Lt(t)||e>$||e<0)return t?gt(t,at):at;const a=t.state;if(!t.output||0!==t.avail_in&&!t.input||a.status===bt&&e!==V)return gt(t,0===t.avail_out?nt:at);const i=a.last_flush;if(a.last_flush=e,0!==a.pending){if(xt(t),0===t.avail_out)return a.last_flush=-1,tt}else if(0===t.avail_in&&pt(e)<=pt(i)&&e!==V)return gt(t,nt);if(a.status===bt&&0!==t.avail_in)return gt(t,nt);if(a.status===wt&&0===a.wrap&&(a.status=mt),a.status===wt){let e=ft+(a.w_bits-8<<4)<<8,i=-1;if(i=a.strategy>=ot||a.level<2?0:a.level<6?1:6===a.level?2:3,e|=i<<6,0!==a.strstart&&(e|=32),e+=31-e%31,Et(a,e),0!==a.strstart&&(Et(a,t.adler>>>16),Et(a,65535&t.adler)),t.adler=1,a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(57===a.status)if(t.adler=0,At(a,31),At(a,139),At(a,8),a.gzhead)At(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(a.gzhead.extra?4:0)+(a.gzhead.name?8:0)+(a.gzhead.comment?16:0)),At(a,255&a.gzhead.time),At(a,a.gzhead.time>>8&255),At(a,a.gzhead.time>>16&255),At(a,a.gzhead.time>>24&255),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,255&a.gzhead.os),a.gzhead.extra&&a.gzhead.extra.length&&(At(a,255&a.gzhead.extra.length),At(a,a.gzhead.extra.length>>8&255)),a.gzhead.hcrc&&(t.adler=H(t.adler,a.pending_buf,a.pending,0)),a.gzindex=0,a.status=69;else if(At(a,0),At(a,0),At(a,0),At(a,0),At(a,0),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,3),a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt;if(69===a.status){if(a.gzhead.extra){let e=a.pending,i=(65535&a.gzhead.extra.length)-a.gzindex;for(;a.pending+i>a.pending_buf_size;){let n=a.pending_buf_size-a.pending;if(a.pending_buf.set(a.gzhead.extra.subarray(a.gzindex,a.gzindex+n),a.pending),a.pending=a.pending_buf_size,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex+=n,xt(t),0!==a.pending)return a.last_flush=-1,tt;e=0,i-=n}let n=new Uint8Array(a.gzhead.extra);a.pending_buf.set(n.subarray(a.gzindex,a.gzindex+i),a.pending),a.pending+=i,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex=0}a.status=73}if(73===a.status){if(a.gzhead.name){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.name.length?255&a.gzhead.name.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),a.gzindex=0}a.status=91}if(91===a.status){if(a.gzhead.comment){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.comment.length?255&a.gzhead.comment.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i))}a.status=103}if(103===a.status){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size&&(xt(t),0!==a.pending))return a.last_flush=-1,tt;At(a,255&t.adler),At(a,t.adler>>8&255),t.adler=0}if(a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(0!==t.avail_in||0!==a.lookahead||e!==q&&a.status!==bt){let i=0===a.level?St(a,e):a.strategy===ot?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Ut(t),0===t.lookahead)){if(e===q)return 1;break}if(t.match_length=0,a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):a.strategy===lt?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=ct){if(Ut(t),t.lookahead<=ct&&e===q)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+ct;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=ct-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=X(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):It[a.level].func(a,e);if(3!==i&&4!==i||(a.status=bt),1===i||3===i)return 0===t.avail_out&&(a.last_flush=-1),tt;if(2===i&&(e===J?W(a):e!==$&&(Y(a,0,0,!1),e===Q&&(kt(a.head),0===a.lookahead&&(a.strstart=0,a.block_start=0,a.insert=0))),xt(t),0===t.avail_out))return a.last_flush=-1,tt}return e!==V?tt:a.wrap<=0?et:(2===a.wrap?(At(a,255&t.adler),At(a,t.adler>>8&255),At(a,t.adler>>16&255),At(a,t.adler>>24&255),At(a,255&t.total_in),At(a,t.total_in>>8&255),At(a,t.total_in>>16&255),At(a,t.total_in>>24&255)):(Et(a,t.adler>>>16),Et(a,65535&t.adler)),xt(t),a.wrap>0&&(a.wrap=-a.wrap),0!==a.pending?tt:et)},deflateEnd:t=>{if(Lt(t))return at;const e=t.state.status;return t.state=null,e===mt?gt(t,it):tt},deflateSetDictionary:(t,e)=>{let a=e.length;if(Lt(t))return at;const i=t.state,n=i.wrap;if(2===n||1===n&&i.status!==wt||i.lookahead)return at;if(1===n&&(t.adler=C(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(kt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size}const s=t.avail_in,r=t.next_in,o=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Ut(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=yt(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++}while(--e);i.strstart=t,i.lookahead=2,Ut(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=o,t.avail_in=s,i.wrap=n,tt},deflateInfo:"pako deflate (from Nodeca project)"};const Ht=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var jt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Ht(a,e)&&(t[e]=a[e])}}return t},Kt=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length}return a};let Pt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Pt=!1}const Yt=new Uint8Array(256);for(let t=0;t<256;t++)Yt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Yt[254]=Yt[254]=1;var Gt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,i,n,s,r=t.length,o=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),o+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(o),s=0,n=0;s<o;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},Xt=(t,e)=>{const a=e||t.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(t.subarray(0,e));let i,n;const s=new Array(2*a);for(n=0,i=0;i<a;){let e=t[i++];if(e<128){s[n++]=e;continue}let r=Yt[e];if(r>4)s[n++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<a;)e=e<<6|63&t[i++],r--;r>1?s[n++]=65533:e<65536?s[n++]=e:(e-=65536,s[n++]=55296|e>>10&1023,s[n++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Pt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,n)},Wt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Yt[t[a]]>e?a:e};var qt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Jt=Object.prototype.toString,{Z_NO_FLUSH:Qt,Z_SYNC_FLUSH:Vt,Z_FULL_FLUSH:$t,Z_FINISH:te,Z_OK:ee,Z_STREAM_END:ae,Z_DEFAULT_COMPRESSION:ie,Z_DEFAULT_STRATEGY:ne,Z_DEFLATED:se}=K;function re(t){this.options=jt({level:ie,method:se,chunkSize:16384,windowBits:15,memLevel:8,strategy:ne},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=Mt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==ee)throw new Error(j[a]);if(e.header&&Mt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Gt(e.dictionary):"[object ArrayBuffer]"===Jt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Mt.deflateSetDictionary(this.strm,t),a!==ee)throw new Error(j[a]);this._dict_set=!0}}function oe(t,e){const a=new re(e);if(a.push(t,!0),a.err)throw a.msg||j[a.err];return a.result}re.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?te:Qt,"string"==typeof t?a.input=Gt(t):"[object ArrayBuffer]"===Jt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===Vt||s===$t)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=Mt.deflate(a,s),n===ae)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=Mt.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===ee;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},re.prototype.onData=function(t){this.chunks.push(t)},re.prototype.onEnd=function(t){t===ee&&(this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var le={Deflate:re,deflate:oe,deflateRaw:function(t,e){return(e=e||{}).raw=!0,oe(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,oe(t,e)},constants:K};const he=16209;var de=function(t,e){let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),o=E.dmax,l=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,m=(1<<E.lenbits)-1,b=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=u[f&m];e:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,0===p)A[n++]=65535&g;else{if(!(16&p)){if(0==(64&p)){g=u[(65535&g)+(f&(1<<p)-1)];continue e}if(32&p){E.mode=16191;break t}t.msg="invalid literal/length code",E.mode=he;break t}k=65535&g,p&=15,p&&(c<p&&(f+=z[a++]<<c,c+=8),k+=f&(1<<p)-1,f>>>=p,c-=p),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=w[f&b];a:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,!(16&p)){if(0==(64&p)){g=w[(65535&g)+(f&(1<<p)-1)];continue a}t.msg="invalid distance code",E.mode=he;break t}if(v=65535&g,p&=15,c<p&&(f+=z[a++]<<c,c+=8,c<p&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<p)-1,v>o){t.msg="invalid distance too far back",E.mode=he;break t}if(f>>>=p,c-=p,p=n-s,v>p){if(p=v-p,p>h&&E.sane){t.msg="invalid distance too far back",E.mode=he;break t}if(y=0,x=_,0===d){if(y+=l-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}else if(d<p){if(y+=l+d-p,p-=d,p<k){k-=p;do{A[n++]=_[y++]}while(--p);if(y=0,d<k){p=d,k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}}else if(y+=d-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]))}else{y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]))}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c};const _e=15,fe=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),ce=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),ue=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),we=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var me=(t,e,a,i,n,s,r,o)=>{const l=o.bits;let h,d,_,f,c,u,w=0,m=0,b=0,g=0,p=0,k=0,v=0,y=0,x=0,z=0,A=null;const E=new Uint16Array(16),R=new Uint16Array(16);let Z,U,S,D=null;for(w=0;w<=_e;w++)E[w]=0;for(m=0;m<i;m++)E[e[a+m]]++;for(p=l,g=_e;g>=1&&0===E[g];g--);if(p>g&&(p=g),0===g)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(b=1;b<g&&0===E[b];b++);for(p<b&&(p=b),y=1,w=1;w<=_e;w++)if(y<<=1,y-=E[w],y<0)return-1;if(y>0&&(0===t||1!==g))return-1;for(R[1]=0,w=1;w<_e;w++)R[w+1]=R[w]+E[w];for(m=0;m<i;m++)0!==e[a+m]&&(r[R[e[a+m]]++]=m);if(0===t?(A=D=r,u=20):1===t?(A=fe,D=ce,u=257):(A=ue,D=we,u=0),z=0,m=0,w=b,c=s,k=p,v=0,_=-1,x=1<<p,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){Z=w-v,r[m]+1<u?(U=0,S=r[m]):r[m]>=u?(U=D[r[m]-u],S=A[r[m]-u]):(U=96,S=0),h=1<<w-v,d=1<<k,b=d;do{d-=h,n[c+(z>>v)+d]=Z<<24|U<<16|S|0}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,m++,0==--E[w]){if(w===g)break;w=e[a+r[m]]}if(w>p&&(z&f)!==_){for(0===v&&(v=p),c+=b,k=w-v,y=1<<k;k+v<g&&(y-=E[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=p<<24|k<<16|c-s|0}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),o.bits=p,0};const{Z_FINISH:be,Z_BLOCK:ge,Z_TREES:pe,Z_OK:ke,Z_STREAM_END:ve,Z_NEED_DICT:ye,Z_STREAM_ERROR:xe,Z_DATA_ERROR:ze,Z_MEM_ERROR:Ae,Z_BUF_ERROR:Ee,Z_DEFLATED:Re}=K,Ze=16180,Ue=16190,Se=16191,De=16192,Te=16194,Oe=16199,Ie=16200,Fe=16206,Le=16209,Ne=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Be(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Ce=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.mode<Ze||e.mode>16211?1:0},Me=t=>{if(Ce(t))return xe;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=Ze,e.last=0,e.havedict=0,e.flags=-1,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,ke},He=t=>{if(Ce(t))return xe;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Me(t)},je=(t,e)=>{let a;if(Ce(t))return xe;const i=t.state;return e<0?(a=0,e=-e):(a=5+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?xe:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,He(t))},Ke=(t,e)=>{if(!t)return xe;const a=new Be;t.state=a,a.strm=t,a.window=null,a.mode=Ze;const i=je(t,e);return i!==ke&&(t.state=null),i};let Pe,Ye,Ge=!0;const Xe=t=>{if(Ge){Pe=new Int32Array(512),Ye=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(me(1,t.lens,0,288,Pe,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;me(2,t.lens,0,32,Ye,0,t.work,{bits:5}),Ge=!1}t.lencode=Pe,t.lenbits=9,t.distcode=Ye,t.distbits=5},We=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var qe={inflateReset:He,inflateReset2:je,inflateResetKeep:Me,inflateInit:t=>Ke(t,15),inflateInit2:Ke,inflate:(t,e)=>{let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(Ce(t)||!t.output||!t.input&&0!==t.avail_in)return xe;a=t.state,a.mode===Se&&(a.mode=De),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,_=o,f=l,x=ke;t:for(;;)switch(a.mode){case Ze:if(0===a.wrap){a.mode=De;break}for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(2&a.wrap&&35615===h){0===a.wbits&&(a.wbits=15),a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0),h=0,d=0,a.mode=16181;break}if(a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=Le;break}if((15&h)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits&&(a.wbits=y),y>15||y>a.wbits){t.msg="invalid window size",a.mode=Le;break}a.dmax=1<<a.wbits,a.flags=0,t.adler=a.check=1,a.mode=512&h?16189:Se,h=0,d=0;break;case 16181:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.flags=h,(255&a.flags)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=Le;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16182;case 16182:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=H(a.check,A,4,0)),h=0,d=0,a.mode=16183;case 16183:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16184;case 16184:if(1024&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0}else a.head&&(a.head.extra=null);a.mode=16185;case 16185:if(1024&a.flags&&(c=a.length,c>o&&(c=o),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=16186;case 16186:if(2048&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=16187;case 16187:if(4096&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=16188;case 16188:if(512&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=Le;break}h=0,d=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=Se;break;case 16189:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}t.adler=a.check=Ne(h),h=0,d=0,a.mode=Ue;case Ue:if(0===a.havedict)return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,ye;t.adler=a.check=1,a.mode=Se;case Se:if(e===ge||e===pe)break t;case De:if(a.last){h>>>=7&d,d-=7&d,a.mode=Fe;break}for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=16193;break;case 1:if(Xe(a),a.mode=Oe,e===pe){h>>>=2,d-=2;break t}break;case 2:a.mode=16196;break;case 3:t.msg="invalid block type",a.mode=Le}h>>>=2,d-=2;break;case 16193:for(h>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=Le;break}if(a.length=65535&h,h=0,d=0,a.mode=Te,e===pe)break t;case Te:a.mode=16195;case 16195:if(c=a.length,c){if(c>o&&(c=o),c>l&&(c=l),0===c)break t;n.set(i.subarray(s,s+c),r),o-=c,s+=c,l-=c,r+=c,a.length-=c;break}a.mode=Se;break;case 16196:for(;d<14;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=Le;break}a.have=0,a.mode=16197;case 16197:for(;a.have<a.ncode;){for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=me(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=Le;break}a.have=0,a.mode=16198;case 16198:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(g<16)h>>>=m,d-=m,a.lens[a.have++]=g;else{if(16===g){for(R=m+2;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(h>>>=m,d-=m,0===a.have){t.msg="invalid bit length repeat",a.mode=Le;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2}else if(17===g){for(R=m+3;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=3+(7&h),h>>>=3,d-=3}else{for(R=m+7;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=11+(127&h),h>>>=7,d-=7}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=Le;break}for(;c--;)a.lens[a.have++]=y}}if(a.mode===Le)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=Le;break}if(a.lenbits=9,E={bits:a.lenbits},x=me(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=Le;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=me(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=Le;break}if(a.mode=Oe,e===pe)break t;case Oe:a.mode=Ie;case Ie:if(o>=6&&l>=258){t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,de(t,f),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,a.mode===Se&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(b&&0==(240&b)){for(p=m,k=b,v=g;z=a.lencode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,a.length=g,0===b){a.mode=16205;break}if(32&b){a.back=-1,a.mode=Se;break}if(64&b){t.msg="invalid literal/length code",a.mode=Le;break}a.extra=15&b,a.mode=16201;case 16201:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=16202;case 16202:for(;z=a.distcode[h&(1<<a.distbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(0==(240&b)){for(p=m,k=b,v=g;z=a.distcode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,64&b){t.msg="invalid distance code",a.mode=Le;break}a.offset=g,a.extra=15&b,a.mode=16203;case 16203:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=Le;break}a.mode=16204;case 16204:if(0===l)break t;if(c=f-l,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=Le;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window}else w=n,u=r-a.offset,c=a.length;c>l&&(c=l),l-=c,a.length-=c;do{n[r++]=w[u++]}while(--c);0===a.length&&(a.mode=Ie);break;case 16205:if(0===l)break t;n[r++]=a.length,l--,a.mode=Ie;break;case Fe:if(a.wrap){for(;d<32;){if(0===o)break t;o--,h|=i[s++]<<d,d+=8}if(f-=l,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,r-f):C(a.check,n,f,r-f)),f=l,4&a.wrap&&(a.flags?h:Ne(h))!==a.check){t.msg="incorrect data check",a.mode=Le;break}h=0,d=0}a.mode=16207;case 16207:if(a.wrap&&a.flags){for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=Le;break}h=0,d=0}a.mode=16208;case 16208:x=ve;break t;case Le:x=ze;break t;case 16210:return Ae;default:return xe}return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<Le&&(a.mode<Fe||e!==be))&&We(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,t.next_out-f):C(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(a.mode===Se?128:0)+(a.mode===Oe||a.mode===Te?256:0),(0===_&&0===f||e===be)&&x===ke&&(x=Ee),x},inflateEnd:t=>{if(Ce(t))return xe;let e=t.state;return e.window&&(e.window=null),t.state=null,ke},inflateGetHeader:(t,e)=>{if(Ce(t))return xe;const a=t.state;return 0==(2&a.wrap)?xe:(a.head=e,e.done=!1,ke)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return Ce(t)?xe:(i=t.state,0!==i.wrap&&i.mode!==Ue?xe:i.mode===Ue&&(n=1,n=C(n,e,a,0),n!==i.check)?ze:(s=We(t,e,a,a),s?(i.mode=16210,Ae):(i.havedict=1,ke)))},inflateInfo:"pako inflate (from Nodeca project)"};var Je=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const Qe=Object.prototype.toString,{Z_NO_FLUSH:Ve,Z_FINISH:$e,Z_OK:ta,Z_STREAM_END:ea,Z_NEED_DICT:aa,Z_STREAM_ERROR:ia,Z_DATA_ERROR:na,Z_MEM_ERROR:sa}=K;function ra(t){this.options=jt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=qe.inflateInit2(this.strm,e.windowBits);if(a!==ta)throw new Error(j[a]);if(this.header=new Je,qe.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=Gt(e.dictionary):"[object ArrayBuffer]"===Qe.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=qe.inflateSetDictionary(this.strm,e.dictionary),a!==ta)))throw new Error(j[a])}function oa(t,e){const a=new ra(e);if(a.push(t),a.err)throw a.msg||j[a.err];return a.result}ra.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,o;if(this.ended)return!1;for(r=e===~~e?e:!0===e?$e:Ve,"[object ArrayBuffer]"===Qe.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=qe.inflate(a,r),s===aa&&n&&(s=qe.inflateSetDictionary(a,n),s===ta?s=qe.inflate(a,r):s===na&&(s=aa));a.avail_in>0&&s===ea&&a.state.wrap>0&&0!==t[a.next_in];)qe.inflateReset(a),s=qe.inflate(a,r);switch(s){case ia:case na:case aa:case sa:return this.onEnd(s),this.ended=!0,!1}if(o=a.avail_out,a.next_out&&(0===a.avail_out||s===ea))if("string"===this.options.to){let t=Wt(a.output,a.next_out),e=a.next_out-t,n=Xt(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n)}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==ta||0!==o){if(s===ea)return s=qe.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return!0},ra.prototype.onData=function(t){this.chunks.push(t)},ra.prototype.onEnd=function(t){t===ta&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var la={Inflate:ra,inflate:oa,inflateRaw:function(t,e){return(e=e||{}).raw=!0,oa(t,e)},ungzip:oa,constants:K};const{Deflate:ha,deflate:da,deflateRaw:_a,gzip:fa}=le,{Inflate:ca,inflate:ua,inflateRaw:wa,ungzip:ma}=la;var ba=ha,ga=da,pa=_a,ka=fa,va=ca,ya=ua,xa=wa,za=ma,Aa=K,Ea={Deflate:ba,deflate:ga,deflateRaw:pa,gzip:ka,Inflate:va,inflate:ya,inflateRaw:xa,ungzip:za,constants:Aa};t.Deflate=ba,t.Inflate=va,t.constants=Aa,t.default=Ea,t.deflate=ga,t.deflateRaw=pa,t.gzip=ka,t.inflate=ya,t.inflateRaw=xa,t.ungzip=za,Object.defineProperty(t,"__esModule",{value:!0})}));
const vhighlight={};
vhighlight.highlight=function({
element=null,language=null,line_numbers=null,animate=false,delay=25,is_func=false}){
if(language==null){
language=element.getAttribute("language");
}
if(language==""||language==null){
return;
}
if(line_numbers==null){
line_numbers=element.getAttribute('line_numbers')=="true";
}
if(delay==null){
delay=25;
}
let code;
let loader;
let line_numbers_div;
let line_numbers_divider;
let code_pre;
if(element.children.length<=1){
element.style.display='flex';
element.style.height="auto";
if(element.style.fontFamily==""){
element.style.fontFamily="'Menlo', 'Consolas', monospace";
}
code=element.textContent;
element.innerHTML="";
loader=document.createElement("div");
loader.style.display="flex";
loader.className="vhighlight_loader";
for(let i=0;i<4;i++){
let child=document.createElement("div");
child.style.border="4px solid "+element.style.color;
child.style.borderColor=element.style.color+" transparent transparent transparent";
loader.appendChild(child);
}
element.appendChild(loader);
line_numbers_div=document.createElement("pre");
line_numbers_div.style.padding='0px';
line_numbers_div.style.margin='0px';
element.appendChild(line_numbers_div);
line_numbers_divider=document.createElement("div");
line_numbers_divider.className="token_line_number_divider";
line_numbers_divider.style.minWidth="0.5px";
line_numbers_divider.style.width="0.5px";
line_numbers_divider.style.padding='0px';
line_numbers_divider.style.margin="0px 10px 0px 10px";
element.appendChild(line_numbers_divider);
code_pre=document.createElement("pre");
code_pre.style.padding="0px";
code_pre.style.margin="0px";
code_pre.style.whiteSpace="pre";
code_pre.style.overflowX="auto";
element.appendChild(code_pre);
}
else{
console.log(element.children);
loader=element.children[0];
line_numbers_div=element.children[1];
line_numbers_divider=element.children[2];
code_pre=element.children[3];
code=code_pre.textContent;
console.log("CODE PRE: ",code_pre);
console.log("CODE: ",code);
}
function show_loader(){
element.style.justifyContent="center";
element.style.alignItems="center";
loader.style.display="flex";
line_numbers_div.style.display="none";
line_numbers_divider.style.display="none";
code_pre.style.display="none";
}
function hide_loader(){
element.style.justifyContent="start";
element.style.alignItems="stretch";
loader.style.display="none";
if(line_numbers){
line_numbers_div.style.display="block";
line_numbers_divider.style.display="block";
}
code_pre.style.display="block";
}
function animate_writing(highlighted_code){
code_pre.innerHTML="";
function add_char(index){
if(index<highlighted_code.length){
if(highlighted_code[index]=='<'){
let span_index;
let span_open="";
let span_close="";
let span_code="";
let open=true;
let first=true;
for(span_index=index;span_index<highlighted_code.length;span_index++){
const char=highlighted_code[span_index];
if(char=='<'||open){
open=true;
if(first){
span_open+=char;
}else{
span_close+=char;
}
if(char=='>'){
open=false;
if(first){
first=false;
continue;
}
let before=code_pre.innerHTML;
let added_span_code="";
function add_span_code(index){
if(index<span_code.length){
added_span_code+=span_code[index]
let add=before;
add+=span_open;
add+=added_span_code;
add+=span_close;
code_pre.innerHTML=add;
setTimeout(()=>add_span_code(index+1),delay);
}else{
setTimeout(()=>add_char(span_index+1),delay);
}
}
add_span_code(0)
break;
}
}
else{
span_code+=char;
}
}
}
else{
code_pre.innerHTML+=highlighted_code.charAt(index);
setTimeout(()=>add_char(index+1),delay);
}
}
else{
code_pre.innerHTML=highlighted_code;
}
}
add_char(0);
}
show_loader();
setTimeout(()=>{
let highlighted_code;
if(language=="cpp"||language=="c++"||language=="c"){
highlighted_code=vhighlight.cpp.highlight(code,{is_func:is_func});
}else if(language=="markdown"||language=="md"){
highlighted_code=vhighlight.md.highlight(code);
}else if(language=="js"||language=="javascript"){
highlighted_code=vhighlight.js.highlight(code);
}else if(language=="json"){
highlighted_code=vhighlight.json.highlight(code);
}else if(language=="python"){
highlighted_code=vhighlight.python.highlight(code);
}else{
console.error("Unsupported language \""+language+"\" for syntax highlighting.");
return;
}
if(line_numbers==false){
hide_loader();
if(animate==true){
animate_writing(highlighted_code);
}else{
code_pre.innerHTML=highlighted_code;
}
return;
}
element.style.justifyContent="start";
element.style.alignItems='stretch';
if(element.style.height==='undefined'||element.style.height=="100%"){
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
line_numbers_div.innerHTML="";
for(var i=0;i<lines;i++){
let span=document.createElement("span");
span.className="token_line_number";
span.textContent=(i+1)+"\n";
line_numbers_div.appendChild(span);
}
hide_loader();
if(animate==true){
animate_writing(highlighted_code);
}else{
code_pre.innerHTML=highlighted_code;
}
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
vhighlight.cpp.highlight=function(code,options={is_func:false,reformat:true}){
if(options.reformat){code=code.replaceAll("<","&lt;");
code=code.replaceAll(">","&gt;");
}
if(!options.is_func){code=code.replace(vhighlight.cpp.comment_regex,'<span class="token_comment">$&</span>');code=code.replace(vhighlight.cpp.string_regex,'<span class="token_string">$&</span>');}
let code_blocks=[];
if(!options.is_func){
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
if(pstart==0&&(code[index]==" "||code[index]=="\t")&&code[index+1]!="("&&code[index+1]!=" "){
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
if(pstart!=0&&depth==0){
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
else if(bstart==0&&code[index]==";"){
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
if(bstart!=0&&depth==0){
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
highlighted+=this.highlight(func_code,{is_func:true,reformat:false});
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
if(options.is_func){
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
vhighlight.cpp.highlight_type=function(block){
highlighted="";
batch="";
function append_batch(highlight=true){
if(highlight&&keywords.includes(batch)){
highlighted+="<span class='token_keyword'>";
highlighted+=batch;
highlighted+="</span>";
}
else if(highlight&&batch!='&'&&batch!='*'&&batch!='.'&&batch!=':'){
highlighted+="<span class='token_type'>";
highlighted+=batch;
highlighted+="</span>";
}
else{
highlighted+=batch;
}
batch="";
};
for(let i=0;i<block.length;i++){
c=block[i];
switch(c){
case '*':
case '&':
case '.':
case ':':
append_batch();
batch+=c;
append_batch(false);
break;
case '<':
append_batch();
batch+="&lt;";
append_batch(false);
break;
case '>':
append_batch();
batch+="&gt;";
append_batch(false);
break;
case ' ':
append_batch();
batch+=c;
append_batch(false);
break;
default:
batch+=c;
break;
}
}
append_batch();
return highlighted;
}
vhighlight.json={};
vhighlight.json.keywords=[
"true",
"false",
"null",
];
vhighlight.json.exclude_span="(?!(?:[^<]|<(?!/?span[^>]*>))*?<\\/span>)";vhighlight.json.html_open="(?<!<[^>]*)";vhighlight.json.html_close="(?![^<]*>)";
vhighlight.json.comment_regex=/(\/\/.*|\/\*[\s\S]*?\*\/)(?!\S)/g;
vhighlight.json.string_regex=new RegExp(`(${vhighlight.json.exclude_span}${vhighlight.json.html_open})(['"\`/]{1})(.*?)\\2${vhighlight.json.html_close}`,'gms');
vhighlight.json.numeric_regex=new RegExp(`${vhighlight.json.exclude_span}\\b-?\\d+(?:\\.\\d+)?\\b`,'g');
vhighlight.json.keyword_regex=new RegExp(`${vhighlight.json.exclude_span}\\b(${vhighlight.json.keywords.join('|')})\\b`,'gm');
vhighlight.json.highlight=function(code){
code=code.replaceAll("<","&lt;");
code=code.replaceAll(">","&gt;");
code=code.replace(vhighlight.json.comment_regex,'<span class="token_comment">$&</span>');
code=code.replace(vhighlight.json.string_regex,'<span class="token_string">$&</span>');
code=code.replace(vhighlight.json.keyword_regex,'<span class="token_keyword">$&</span>');code=code.replace(vhighlight.json.numeric_regex,'<span class="token_numeric">$&</span>');
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
if(string_char==null&&(code[index]=='"'||code[index]=="'"||code[index]=='`')){
string_char=code[index];
}
else if(string_char!=null&&code[index]==string_char){
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
"start":start,
"end":end,
"data":code.substr(start,end-start),
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
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config',google_tag);
}
vweb.user={};
vweb.user.uid=function(){
const i=vweb.utils.cookie("UserID");
if(i==-1){
return null;
}
return i;
}
vweb.user.username=function(){
const i=vweb.utils.cookie("UserName");
if(i==""){
return null;
}
return i;
}
vweb.user.email=function(){
const i=vweb.utils.cookie("UserEmail");
if(i==""){
return null;
}
return i;
}
vweb.user.first_name=function(){
const i=vweb.utils.cookie("UserFirstName");
if(i==""){
return null;
}
return i;
}
vweb.user.last_name=function(){
const i=vweb.utils.cookie("UserLastName");
if(i==""){
return null;
}
return i;
}
vweb.user.authenticated=function(){
return vweb.user.uid()!=null;
}
vweb.user.activated=function(){
if(vweb.utils.cookie("UserActivated")=="true"){
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
method:"GET",
url:"/backend/user/",
success:success,
error:error,
before:before,
});
}
vweb.user.set=function({
user,
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method:"POST",
url:"/backend/user/",
data:user,
success:success,
error:error,
before:before,
});
}
vweb.user.activate=function({
code="",
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method:"POST",
url:"/backend/auth/activate",
data:{
"2fa":code,
},
success:success,
error:error,
before:before,
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
method:"POST",
url:"/backend/user/change_password",
data:{
current_password:current_password,
password:password,
verify_password:verify_password,
},
success:success,
error:error,
before:before,
});
}
vweb.user.generate_api_key=function({
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method:"POST",
url:"/backend/user/api_key",
success:success,
error:error,
before:before,
});
}
vweb.user.revoke_api_key=function({
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method:"DELETE",
url:"/backend/user/api_key",
success:success,
error:error,
before:before,
});
}
vweb.user.load=function({
path="",
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method:"GET",
url:"/backend/user/data",
data:{
path:path,
},
success:success,
error:error,
before:before,
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
method:"POST",
url:"/backend/user/data",
data:{
path:path,
data:data,
},
success:success,
error:error,
before:before,
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
method:"POST",
url:"/backend/auth/signin",
data:{
email:email,
username:username,
password:password,
"2fa":code,
},
success:success,
error:error,
before:before,
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
method:"POST",
url:"/backend/auth/signup",
data:{
username:username,
email:email,
first_name:first_name,
last_name:last_name,
password:password,
verify_password:verify_password,
},
success:success,
error:error,
before:before,
});
}
vweb.auth.sign_out=function({
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method:"POST",
url:"/backend/auth/signout",
success:success,
error:error,
before:before,
});
}
vweb.auth.send_2fa=function({
email="",
success=null,
error=null,
before=null
}){
return vweb.utils.request({
method:"GET",
url:"/backend/auth/2fa",
data:{
email:email,
},
success:success,
error:error,
before:before,
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
method:"GET",
url:"/backend/auth/forgot_password",
data:{
email:email,
"2fa":code,
password:password,
verify_password:verify_password,
},
success:success,
error:error,
before:before,
});
}
vweb.utils={};
vweb.utils.is_string=function(value){
return typeof value==='string'||value instanceof String;
}
vweb.utils.is_numeric=function(value){
return typeof value==='number'&&Number.isFinite(value);
}
vweb.utils.is_int=function(value){
return typeof value==='number'&&Number.isInteger(value);
}
vweb.utils.is_float=function(value){
return typeof value==='number'&&!Number.isNaN(value)&&!Number.isInteger(value);
}
vweb.utils.is_func=function(value){
return typeof value==='function';
}
vweb.utils.is_array=function(value){
return Array.isArray(value);
}
vweb.utils.is_obj=function(value){
return typeof value==='object';
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
vweb.utils.device_width=function(){
return(window.innerWidth>0)? window.innerWidth:screen.width;
}
vweb.utils.device_height=function(){
return(window.innerHeight>0)? window.innerHeight:screen.height;
}
vweb.utils.endpoint=function(){
endpoint=window.location.href.replace("https://","").replace("http://","");
endpoint=endpoint.substr(endpoint.indexOf('/'),endpoint.length);
return endpoint;
}
vweb.utils.cookie=function(name){
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
if(forced||vweb.utils.endpoint()!=url){
window.location.href=url;
}
}
vweb.utils.delay=function(mseconds,func){
setTimeout(()=>func(),mseconds);
}
vweb.utils.url_param=function(name,def=null){
const params=new URLSearchParams(window.location.search);
const param=params.get(name);
if(param==null||param==""){
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
if(data!=null&&!vweb.utils.is_string(data)){
data=JSON.stringify(data);
}
if(before!=null){
before();
}
$.ajax({
url:url,
data:data,
type:method,
credentials:"true",
mimeType:"application/json",
contentType:"application/json",
dataType:"json",
success:function(response,status,xhr){
if(success==null){return null;}
return success(xhr.status,response);
},
error:function(xhr,status,e){
if(error==null){return null;}
let response;
try{
response=JSON.parse(xhr.responseText);
}catch(e){
response={"error":xhr.responseText==null ? e:xhr.responseText};
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
vweb.utils.compress=function(data,options={level:9}){
if(vweb.utils.is_array(data)||vweb.utils.is_obj(data)){
data=JSON.stringify(data);
}
return pako.gzip(data,options);
};
vweb.utils.decompress=function(data,type="string"){
let decompressed=pako.gzip(data,opts);
if(type=="array"||type=="object"){
return JSON.parse(decompressed);
}
return decompressed;
};
