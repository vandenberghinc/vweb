/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
const vweb={}
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
endpoint=endpoint.replaceAll("//","/");
if(endpoint.length==0){
return '/'
}else{
while(endpoint.length>1&&endpoint[endpoint.length-1]=='/'){
endpoint=endpoint.substr(0,endpoint.length-1);
}
}
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
async=true,
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
async:async,
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
document.body.appendChild(e);
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
vweb.elements={};
vweb.elements.get=function(id){
return document.getElementById(id);
}
vweb.elements.get_by_id=function(id){
return vweb.elements.get(id)
}
vweb.elements.click=function(id){
document.getElementById(id).click();
}
vweb.elements.register=function(type,tag){
customElements.define("v-"+type.name.toLowerCase(),type,{extends:tag||type.element_tag});
}
vweb.elements.elements_with_width_attribute=[
'CANVAS',
'EMBED',
'IFRAME',
'IMG',
'OBJECT',
'PROGRESS',
'VIDEO',
];
function CreateVElementClass({
type="VElement",
tag="div",
default_style=null,
default_attributes=null,
default_events=null,
}){
let Base;
switch(tag){
case "a":
Base=HTMLAnchorElement;
break;
case "area":
Base=HTMLAreaElement;
break;
case "audio":
Base=HTMLAudioElement;
break;
case "base":
Base=HTMLBaseElement;
break;
case "blockquote":
Base=HTMLQuoteElement;
break;
case "body":
Base=HTMLBodyElement;
break;
case "br":
Base=HTMLBRElement;
break;
case "button":
Base=HTMLButtonElement;
break;
case "canvas":
Base=HTMLCanvasElement;
break;
case "caption":
Base=HTMLTableCaptionElement;
break;
case "col":
Base=HTMLTableColElement;
break;
case "data":
Base=HTMLDataElement;
break;
case "datalist":
Base=HTMLDataListElement;
break;
case "dl":
Base=HTMLDListElement;
break;
case "dir":
Base=HTMLDirectoryElement;
break;
case "div":
Base=HTMLDivElement;
break;
case "html":
Base=HTMLHtmlElement;
break;
case "embed":
Base=HTMLEmbedElement;
break;
case "fieldset":
Base=HTMLFieldSetElement;
break;
case "form":
Base=HTMLFormElement;
break;
case "h1":
Base=HTMLHeadingElement;
break;
case "h2":
Base=HTMLHeadingElement;
break;
case "h3":
Base=HTMLHeadingElement;
break;
case "h4":
Base=HTMLHeadingElement;
break;
case "h5":
Base=HTMLHeadingElement;
break;
case "h6":
Base=HTMLHeadingElement;
break;
case "head":
Base=HTMLHeadElement;
break;
case "hr":
Base=HTMLHRElement;
break;
case "img":
Base=HTMLImageElement;
break;
case "input":
Base=HTMLInputElement;
break;
case "ins":
Base=HTMLModElement;
break;
case "label":
Base=HTMLLabelElement;
break;
case "legend":
Base=HTMLLegendElement;
break;
case "li":
Base=HTMLLIElement;
break;
case "link":
Base=HTMLLinkElement;
break;
case "map":
Base=HTMLMapElement;
break;
case "meta":
Base=HTMLMetaElement;
break;
case "meter":
Base=HTMLMeterElement;
break;
case "object":
Base=HTMLObjectElement;
break;
case "ol":
Base=HTMLOListElement;
break;
case "optgroup":
Base=HTMLOptGroupElement;
break;
case "option":
Base=HTMLOptionElement;
break;
case "output":
Base=HTMLOutputElement;
break;
case "p":
Base=HTMLParagraphElement;
break;
case "param":
Base=HTMLParamElement;
break;
case "picture":
Base=HTMLPictureElement;
break;
case "pre":
Base=HTMLPreElement;
break;
case "progress":
Base=HTMLProgressElement;
break;
case "q":
Base=HTMLQuoteElement;
break;
case "script":
Base=HTMLScriptElement;
break;
case "select":
Base=HTMLSelectElement;
break;
case "slot":
Base=HTMLSlotElement;
break;
case "source":
Base=HTMLSourceElement;
break;
case "span":
Base=HTMLSpanElement;
break;
case "table":
Base=HTMLTableElement;
break;
case "thead":
Base=HTMLTableSectionElement;
break;
case "tbody":
Base=HTMLTableSectionElement;
break;
case "tfoot":
Base=HTMLTableSectionElement;
break;
case "th":
Base=HTMLTableCellElement;
break;
case "td":
Base=HTMLTableCellElement;
break;
case "template":
Base=HTMLTemplateElement;
break;
case "textarea":
Base=HTMLTextAreaElement;
break;
case "time":
Base=HTMLTimeElement;
break;
case "title":
Base=HTMLTitleElement;
break;
case "tr":
Base=HTMLTableRowElement;
break;
case "track":
Base=HTMLTrackElement;
break;
case "ul":
Base=HTMLUListElement;
break;
case "style":
class B{
constructor(){
this.style={};
}
}
Base=B;
break;
default:
Base=HTMLElement;
break;
};
class E extends Base{
static element_tag=tag;static default_style=default_style;
static default_attributes=default_attributes;
static default_events=default_events;
constructor(){
super();
this.element_type=type;this.element_display="block";
if(E.default_style!=null){
this.styles(E.default_style);
}
if(E.default_attributes!=null){
this.attrs(E.default_attributes);
}
if(E.default_events!=null){
this.events(E.default_events);
}
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
if(filter==null){
return to;
}
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
if(filter==null){
return to;
}
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
if(child.element_type!=null){
if(
child.element_type=="ForEach"||
child.element_type=="If"||
child.element_type=="IfDeviceWith"
){
child.append_children_to(this);
}else{
this.appendChild(child);
}
}
else if(vweb.utils.is_func(child)){
this.append(child());
}
else if(child instanceof Node){
this.appendChild(child);
}
else if(vweb.utils.is_string(child)){
this.appendChild(document.createTextNode(child));
}
}
}
return this;
}
zstack_append(...children){
for(let i=0;i<children.length;i++){
const child=children[i];
if(child!=null){
if(child.element_type!=null){
child.style.gridArea="1 / 1 / 2 / 2";
if(
child.element_type=="ForEach"||
child.element_type=="If"||
child.element_type=="IfDeviceWith"
){
child.append_children_to(this);
}else{
this.appendChild(child);
}
}
else if(vweb.utils.is_func(child)){
this.append(child());
}
else if(child instanceof Node){
child.style.gridArea="1 / 1 / 2 / 2";
this.appendChild(child);
}
else if(vweb.utils.is_string(child)){
this.appendChild(document.createTextNode(child));
}
}
}
return this;
}
append_to(parent){
parent.appendChild(this);
return this;
}
append_children_to(parent){
while(this.firstChild){
parent.appendChild(this.firstChild)
}
return this;
}
remove_child(child){
if(child.element_type!=null){
this.removeChild(child);
}else if(child instanceof Node){
this.removeChild(child);
}else if(vweb.utils.is_string(child)){
this.removeChild(document.getElementById(child));
}else{
console.error("Invalid parameter type for function \"remove_child()\".");
}
return this;
}
remove_children(){
if(this.scrollbar){
this.scrollbar.remove_from_target(this);
}
this.inner_html("");
if(this.scrollbar){
this.scrollbar.add_to_target(this);
}
return this;
}
child(index){
return this.children[index];
}
add_scrollbar(scrollbar){
this.scrollbar=scrollbar;
this.scrollbar.add_to_target(this);
return this;
}
remove_scrollbar(scrollbar=null){
if(scrollbar==null){
this.scrollbar.remove_from_target(this);
}else{
scrollbar.remove_from_target(this);
}
return this;
}
text(value){
if(value==null){
return this.textContent;
}
this.textContent=value;
return this;
}
width(value,check_attribute=true){
if(check_attribute&&vweb.elements.elements_with_width_attribute.includes(this.tagName)){
if(value==null){
return this.getAttribute("width");
}
this.setAttribute("width",value);
}else{
if(value==null){
return this.style.width;
}
this.style.width=this.pad_numeric(value);
}
return this;
}
height(value){
if(vweb.elements.elements_with_width_attribute.includes(this.tagName)){
if(value==null){
return this.getAttribute("height");
}
this.setAttribute("height",value);
}else{
if(value==null){
return this.style.height;
}
this.style.height=this.pad_numeric(value);
}
return this;
}
width_by_columns(columns){
let margin_left=this.style.marginLeft;
let margin_right=this.style.marginRight;
if(margin_left==null){
margin_left="0px";
}
if(margin_right==null){
margin_right="0px";
}
if(columns==null){
columns=1;
}
this.style.flexBasis="calc(100% / "+columns+" - ("+margin_left+" + "+margin_right+"))";
this.style.overflow="hidden";
return this;
}
offset_width(){
return this.offsetWidth;
}
offset_height(){
return this.offsetHeight;
}
client_width(){
return this.clientWidth;
}
client_height(){
return this.clientHeight;
}
x(){
return this.offsetLeft;
}
y(){
return this.offsetTop;
}
frame(width,height){
if(width!=null){
this.width(width);
}
if(height!=null){
this.height(height);
}
return this;
}
padding(...values){
if(values.length===0){
return this.style.padding;
}else if(values.length===1){
this.style.padding=this.pad_numeric(values[0]);
}else if(values.length===2){
if(values[0]!=null){
this.style.paddingTop=this.pad_numeric(values[0]);
}
if(values[1]!=null){
this.style.paddingRight=this.pad_numeric(values[1]);
}
if(values[0]!=null){
this.style.paddingBottom=this.pad_numeric(values[0]);
}
if(values[1]!=null){
this.style.paddingLeft=this.pad_numeric(values[1]);
}
}else if(values.length===4){
this.style.paddingTop=this.pad_numeric(values[0]);
if(values[1]!=null){
this.style.paddingRight=this.pad_numeric(values[1]);
}
if(values[2]!=null){
this.style.paddingBottom=this.pad_numeric(values[2]);
}
if(values[3]!=null){
this.style.paddingLeft=this.pad_numeric(values[3]);
}
}else{
console.error("Invalid number of arguments for function \"padding()\".");
}
return this;
}
margin(...values){
if(values.length===0){
return this.style.margin;
}else if(values.length===1){
this.style.margin=this.pad_numeric(values[0]);
}else if(values.length===2){
this.style.marginTop=this.pad_numeric(values[0]);
if(values[1]!=null){
this.style.marginRight=this.pad_numeric(values[1]);
}
if(values[0]!=null){
this.style.marginBottom=this.pad_numeric(values[0]);
}
if(values[1]!=null){
this.style.marginLeft=this.pad_numeric(values[1]);
}
}else if(values.length===4){
this.style.marginTop=this.pad_numeric(values[0]);
if(values[1]!=null){
this.style.marginRight=this.pad_numeric(values[1]);
}
if(values[2]!=null){
this.style.marginBottom=this.pad_numeric(values[2]);
}
if(values[3]!=null){
this.style.marginLeft=this.pad_numeric(values[3]);
}
}else{
console.error("Invalid number of arguments for function \"margin()\".");
}
return this;
}
position(...values){
if(values.length===0){
return this.style.position;
}else if(values.length===1){
this.style.position=values[0];
}else if(values.length===4){
this.style.position="absolute";
if(values[0]!=null){
this.style.top=this.pad_numeric(values[0]);
}
if(values[1]!=null){
this.style.right=this.pad_numeric(values[1]);
}
if(values[2]!=null){
this.style.bottom=this.pad_numeric(values[2]);
}
if(values[3]!=null){
this.style.left=this.pad_numeric(values[3]);
}
}else{
console.error("Invalid number of arguments for function \"position()\".");
}
return this;
}
stretch(value){
if(value==true){
this.style.flex=1;
}else{
this.style.flex=0;
}
return this;
}
wrap(value){
if(value==true){
this.style.whiteSpace="wrap";
}else if(value==false){
this.style.whiteSpace="nowrap";
}else{
this.style.whiteSpace=value;
}
switch(this.tagName){
case "DIV":
if(value==true){
this.style.flexFlow="wrap";
}else if(value==false){
this.style.flexFlow="nowrap";
}else{
this.style.flexFlow=value;
}
break;
default:
if(value==true){
this.style.textWrap="wrap";
this.style.overflowWrap="break-word";
}else if(value==false){
this.style.textWrap="nowrap";
this.style.overflowWrap="normal";
}else{
this.style.textWrap=value;
}
break;
}
return this;
}
z_index(value){
this.style.zIndex=value;
return this;
}
align(value){
switch(this.element_type){
case "HStack":
case "ZStack":
this.style.justifyContent=value;
return this;
case "VStack":
case "Scroller":
this.style.alignItems=value;
return this;
default:
this.style.textAlign=value;
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
this.style.alignItems=value;
return this;
case "VStack":
case "Scroller":
this.style.justifyContent=value;
return this;
default:
this.style.textAlign=value;
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
if(value==null){return this.style.color;}
if(value instanceof GradientType){
this.style.backgroundImage=value.gradient;
this.style.backgroundClip="text";
this.style["-webkit-background-clip"]="text";
this.style.color="transparent";
}else{
this.style.color=value;
}
return this;
}
border(...values){
if(values.length===1){
this.style.border=values[0];
}else if(values.length===2){
this.style.border=this.pad_numeric(values[0])+" solid "+values[1];
}else if(values.length===3){
this.style.border=this.pad_numeric(values[0])+" ",values[1]+" "+values[2];
}else{
console.error("Invalid number of arguments for function \"border()\".");
}
return this;
}
shadow(...values){
if(values.length===1){
return this.box_shadow(this.pad_numeric(values[0]));
}else if(values.length===4){
return this.box_shadow(
this.pad_numeric(values[0])+" "+
this.pad_numeric(values[1])+" "+
this.pad_numeric(values[2])+" "+
values[3]
);
}else{
console.error("Invalid number of arguments for function \"shadow()\".");
}
}
drop_shadow(...values){
if(values.length===0||values.length===1&&values[0]==null){
return this.filter();
}else if(values.length===1){
return this.filter("drop-shadow("+this.pad_numeric(values[0])+") ");
}else if(values.length===4){
return this.filter(
"drop-shadow("+
this.pad_numeric(values[0])+" "+
this.pad_numeric(values[1])+" "+
this.pad_numeric(values[2])+" "+
values[3]+") "
);
}else{
console.error("Invalid number of arguments for function \"drop_shadow()\".");
}
}
greyscale(value){
if(value==null){
return this.filter();
}else{
return this.filter("grayscale("+this.pad_percentage(value,"")+") ");
}
}
opacity(value){
switch(this.element_type){
case "Style":
if(value==null){
return this.filter(this.edit_filter_wrapper(this.style.filter,"opacity",value));
}else{
if(value<=1.0){
value*=100;
}
return this.filter(this.edit_filter_wrapper(this.style.filter,"opacity","opacity("+value+") "));
}
default:
this.style.opacity=value;
return this;
}
}
toggle_opacity(value=0.25){
if(typeof this.style.opacity==="undefined"||this.style.opacity==""||this.style.opacity==1.0){
this.style.opacity=value;
}else{
this.style.opacity=1.0;
}
return this;
}
blur(value){
if(value==null){
return this.filter(this.edit_filter_wrapper(this.style.filter,"blur",value));
}else{
return this.filter(this.edit_filter_wrapper(this.style.filter,"blur","blur("+this.pad_numeric(value)+") "));
}
}
toggle_blur(value=10){
return this.filter(this.toggle_filter_wrapper(this.style.filter,"blur","blur("+this.pad_numeric(value)+") "));
}
background_blur(value){
if(value==null){
return this.backdrop_filter(this.edit_filter_wrapper(this.style.backdropFilter,"blur",value));
}else{
return this.backdrop_filter(this.edit_filter_wrapper(this.style.backdropFilter,"blur","blur("+this.pad_numeric(value)+") "));
}
}
toggle_background_blur(value=10){
return this.backdrop_filter(this.toggle_filter_wrapper(this.style.backdropFilter,"blur","blur("+this.pad_numeric(value)+") "));
}
brightness(value){
if(value==null){
return this.filter(this.edit_filter_wrapper(this.style.filter,"brightness",value));
}else{
return this.filter(this.edit_filter_wrapper(this.style.filter,"brightness","brightness("+this.pad_percentage(value,"%")+") "));
}
}
toggle_brightness(value=0.5){
return this.filter(this.toggle_filter_wrapper(this.style.filter,"brightness","brightness("+this.pad_percentage(value,"%")+") "));
}
background_brightness(value){
if(value==null){
return this.backdrop_filter(this.edit_filter_wrapper(this.style.backdropFilter,"brightness",value));
}else{
return this.backdrop_filter(this.edit_filter_wrapper(this.style.backdropFilter,"brightness","brightness("+this.pad_percentage(value,"%")+") "));
}
}
toggle_background_brightness(value=10){
return this.backdrop_filter(this.toggle_filter_wrapper(this.style.backdropFilter,"brightness","brightness("+this.pad_percentage(value,"%")+") "));
}
delay(value){
this.style.delay=value;
return this;
}
duration(value){
this.style.duration=value;
return this;
}
display(value){
if(value!=null&&value!="none"){
this.element_display=value;
}
this.style.display=value;
return this;
}
hide(){
this.style.display="none";
return this;
}
show(){
this.style.display=this.element_display;
return this;
}
is_hidden(){
return this.style.display=="none"||typeof this.style.display==="undefined";
}
toggle_visibility(){
if(this.is_hidden()){
this.show();
}else{
this.hide();
}
return this;
}
inner_html(value){
if(value==null){
return this.innerHTML;
}
this.innerHTML=value;
return this;
}
outer_html(value){
if(value==null){
return this.outerHTML;
}
this.outerHTML=value;
return this;
}
styles(css_attr){
if(css_attr==null){
let dict={};
for(let property in this.style){
if(this.style.hasOwnProperty(property)){
if(!(/^\d+$/).test(property)&&this.style[property]!=''&&typeof this.style[property]!=='function'){
dict[property]=this.style[property];
}
else{
const key=this.style[property];
const value=this.style[key];
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
if(
i==="display"&&value!=null&&value!=="none"
){
this.element_display=value;
}
this.style[i]=value;
}
return this;
}
attr(key,value=null){
if(value==null){
return this.getAttribute(key);
}
this.setAttribute(key,value);
return this;
}
attrs(html_attr){
for(let i in html_attr){
this.setAttribute(i,html_attr[i]);
}
return this;
}
event(key,value=null){
if(value==null){
return this[key];
}
this[key]=value;
return this;
}
events(html_events){
for(let i in html_events){
this[i]=html_events[i];
}
return this;
}
class(value){
if(value==null){return this.class;}
this.className=value;
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
default_animate(...args){
super.animate(...args);
return this;
}
animate({
keyframes=[],delay=0,duration=0,repeat=false,persistent=false,on_finish=null,easing="ease-in-out",}){
const e=this;
const convert=[
"width",
"height",
"top",
"right",
"bottom",
"left",
"margin",
"margin-top",
"margin-right",
"margin-bottom",
"margin-left",
"padding",
"padding-top",
"padding-right",
"padding-bottom",
"padding-left",
"border-width",
"border-top-width",
"border-right-width",
"border-bottom-width",
"border-left-width",
"min-width",
"min-height",
"max-width",
"max-height",
"outline-width",
"column-width",
"column-gap",
"row-gap",
"marginTop",
"marginRight",
"marginBottom",
"marginLeft",
"paddingTop",
"paddingRight",
"paddingBottom",
"paddingLeft",
"borderWidth",
"borderTopWidth",
"borderRightWidth",
"borderBottomWidth",
"borderLeftWidth",
"minWidth",
"minHeight",
"maxWidth",
"maxHeight",
"outlineWidth",
"columnWidth",
"columnGap",
"rowGap",
];
for(let i=0;i<keyframes.length;i++){
if(keyframes[i] instanceof StyleElement){
keyframes[i]=keyframes[i].styles();
}
for(let key in keyframes[i]){
if(vweb.utils.is_numeric(keyframes[i][key])&&convert.includes(key)){
keyframes[i][key]=this.pad_numeric(keyframes[i][key]);
}
}
}
function do_animation(index){
if(index+1<keyframes.length){
const from=keyframes[index];
const to=keyframes[index+1];
let opts={
duration:duration,
};
if(from.duration!=null){
opts.duration=from.duration;
}
if(
(index+2==keyframes.length&&persistent&&!repeat)||(to.delay!=null&&to.delay>0)){
opts.fill="forwards";
}
e.default_animate(
[from,to],
opts,
);
if(to.delay!=null&&to.delay>0){
clearTimeout(e.animate_timeout);
e.animate_timeout=setTimeout(()=>do_animation(index+1),(from.duration||duration)+(to.delay||0));
}else{
clearTimeout(e.animate_timeout);
e.animate_timeout=setTimeout(()=>do_animation(index+1),from.duration||duration);
}
}
else if(repeat){
if(delay>0){
clearTimeout(e.animate_timeout);
e.animate_timeout=setTimeout(()=>do_animation(0),delay);
}
else{
const delay=keyframes[keyframes.length-1].duration||duration;
clearTimeout(e.animate_timeout);
e.animate_timeout=setTimeout(()=>do_animation(0),delay);
}
}
else if(on_finish!=null){
on_finish(e);
}
}
if(this.animate_timeout!=null){
clearTimeout(this.animate_timeout);
}
this.animate_timeout=setTimeout(()=>do_animation(0),delay||0);
return this;
}
on_click(callback){
if(callback==null){
return this.onclick;
}
this.style.cursor="pointer";
const e=this;
this.onclick=(t)=>callback(e,t);
return this;
}
on_scroll({callback,delay=25}){
if(callback==null){return this.onscroll;}
let timer;
const e=this;
this.onscroll=function(t){
clearTimeout(timer);
setTimeout(()=>callback(e,t),delay);
}
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
on_attachment_drop({callback,compress=false}){
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
callback(file.name,vweb.utils.compress(event.target.result),file);
}else{
callback(file.name,event.target.result,file);
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
observer.observe(this);
return this;
}
on_enter(callback){
const e=this;
super.onkeypress=function(event){
if(event.keyCode===13){
callback(e,event);
}
}
return this;
}
first_child(){
return this.firstChild;
}
last_child(){
return this.lastChild;
}
set_default(Type){
if(Type==null){
return this.set_default(E);
}
Type.default_style=this.styles();
return this;
}
assign(name,value){
this[name]=value;
return this;
}
extend(obj){
for(let name in obj){
this.assign(name,obj[name]);
}
return this;
}
parent(value){
if(value==null){
if(this.parent_e==null||this.parent_e===undefined){
return this.parentElement;
}
return this.parent_e;
}
this.parent_e=value;
return this;
}
toString(){
return this.outerHTML;
}
accent_color(value){
if(value==null){return this.style.accentColor;}
this.style.accentColor=value;
return this;
}
align_content(value){
if(value==null){return this.style.alignContent;}
this.style.alignContent=value;
this.style.msAlignContent=value;
this.style.webkitAlignContent=value;
this.style.MozAlignContent=value;
this.style.OAlignContent=value;
return this;
}
align_items(value){
if(value==null){return this.style.alignItems;}
this.style.alignItems=value;
this.style.msAlignItems=value;
this.style.webkitAlignItems=value;
this.style.MozAlignItems=value;
this.style.OAlignItems=value;
return this;
}
align_self(value){
if(value==null){return this.style.alignSelf;}
this.style.alignSelf=value;
this.style.msAlignSelf=value;
this.style.webkitAlignSelf=value;
this.style.MozAlignSelf=value;
this.style.OAlignSelf=value;
return this;
}
all(value){
if(value==null){return this.style.all;}
this.style.all=value;
return this;
}
animation(value){
if(value==null){return this.style.animation;}
this.style.animation=value;
this.style.msAnimation=value;
this.style.webkitAnimation=value;
this.style.MozAnimation=value;
this.style.OAnimation=value;
return this;
}
animation_delay(value){
if(value==null){return this.style.animationDelay;}
this.style.animationDelay=value;
this.style.msAnimationDelay=value;
this.style.webkitAnimationDelay=value;
this.style.MozAnimationDelay=value;
this.style.OAnimationDelay=value;
return this;
}
animation_direction(value){
if(value==null){return this.style.animationDirection;}
this.style.animationDirection=value;
this.style.msAnimationDirection=value;
this.style.webkitAnimationDirection=value;
this.style.MozAnimationDirection=value;
this.style.OAnimationDirection=value;
return this;
}
animation_duration(value){
if(value==null){return this.style.animationDuration;}
this.style.animationDuration=value;
this.style.msAnimationDuration=value;
this.style.webkitAnimationDuration=value;
this.style.MozAnimationDuration=value;
this.style.OAnimationDuration=value;
return this;
}
animation_fill_mode(value){
if(value==null){return this.style.animationFillMode;}
this.style.animationFillMode=value;
this.style.msAnimationFillMode=value;
this.style.webkitAnimationFillMode=value;
this.style.MozAnimationFillMode=value;
this.style.OAnimationFillMode=value;
return this;
}
animation_iteration_count(value){
if(value==null){return this.style.animationIterationCount;}
this.style.animationIterationCount=value;
this.style.msAnimationIterationCount=value;
this.style.webkitAnimationIterationCount=value;
this.style.MozAnimationIterationCount=value;
this.style.OAnimationIterationCount=value;
return this;
}
animation_name(value){
if(value==null){return this.style.animationName;}
this.style.animationName=value;
this.style.msAnimationName=value;
this.style.webkitAnimationName=value;
this.style.MozAnimationName=value;
this.style.OAnimationName=value;
return this;
}
animation_play_state(value){
if(value==null){return this.style.animationPlayState;}
this.style.animationPlayState=value;
this.style.msAnimationPlayState=value;
this.style.webkitAnimationPlayState=value;
this.style.MozAnimationPlayState=value;
this.style.OAnimationPlayState=value;
return this;
}
animation_timing_function(value){
if(value==null){return this.style.animationTimingFunction;}
this.style.animationTimingFunction=value;
this.style.msAnimationTimingFunction=value;
this.style.webkitAnimationTimingFunction=value;
this.style.MozAnimationTimingFunction=value;
this.style.OAnimationTimingFunction=value;
return this;
}
aspect_ratio(value){
if(value==null){return this.style.aspectRatio;}
this.style.aspectRatio=value;
return this;
}
backdrop_filter(value){
if(value==null){return this.style.backdropFilter;}
this.style.backdropFilter=value;
this.style.msBackdropFilter=value;
this.style.webkitBackdropFilter=value;
this.style.MozBackdropFilter=value;
this.style.OBackdropFilter=value;
return this;
}
backface_visibility(value){
if(value==null){return this.style.backfaceVisibility;}
this.style.backfaceVisibility=value;
this.style.msBackfaceVisibility=value;
this.style.webkitBackfaceVisibility=value;
this.style.MozBackfaceVisibility=value;
this.style.OBackfaceVisibility=value;
return this;
}
background(value){
if(value==null){return this.style.background;}
this.style.background=value;
return this;
}
background_attachment(value){
if(value==null){return this.style.backgroundAttachment;}
this.style.backgroundAttachment=value;
return this;
}
background_blend_mode(value){
if(value==null){return this.style.backgroundBlendMode;}
this.style.backgroundBlendMode=value;
return this;
}
background_clip(value){
if(value==null){return this.style.backgroundClip;}
this.style.backgroundClip=value;
this.style.msBackgroundClip=value;
this.style.webkitBackgroundClip=value;
this.style.MozBackgroundClip=value;
this.style.OBackgroundClip=value;
return this;
}
background_color(value){
if(value==null){return this.style.backgroundColor;}
this.style.backgroundColor=value;
return this;
}
background_image(value){
if(value==null){return this.style.backgroundImage;}
this.style.backgroundImage=value;
return this;
}
background_origin(value){
if(value==null){return this.style.backgroundOrigin;}
this.style.backgroundOrigin=value;
this.style.msBackgroundOrigin=value;
this.style.webkitBackgroundOrigin=value;
this.style.MozBackgroundOrigin=value;
this.style.OBackgroundOrigin=value;
return this;
}
background_position(value){
if(value==null){return this.style.backgroundPosition;}
this.style.backgroundPosition=value;
return this;
}
background_position_x(value){
if(value==null){return this.style.backgroundPositionX;}
this.style.backgroundPositionX=value;
return this;
}
background_position_y(value){
if(value==null){return this.style.backgroundPositionY;}
this.style.backgroundPositionY=value;
return this;
}
background_repeat(value){
if(value==null){return this.style.backgroundRepeat;}
this.style.backgroundRepeat=value;
return this;
}
background_size(value){
if(value==null){return this.style.backgroundSize;}
this.style.backgroundSize=this.pad_numeric(value);
this.style.msBackgroundSize=this.pad_numeric(value);
this.style.webkitBackgroundSize=this.pad_numeric(value);
this.style.MozBackgroundSize=this.pad_numeric(value);
this.style.OBackgroundSize=this.pad_numeric(value);
return this;
}
block_size(value){
if(value==null){return this.style.blockSize;}
this.style.blockSize=this.pad_numeric(value);
return this;
}
border_block(value){
if(value==null){return this.style.borderBlock;}
this.style.borderBlock=value;
return this;
}
border_block_color(value){
if(value==null){return this.style.borderBlockColor;}
this.style.borderBlockColor=value;
return this;
}
border_block_end_color(value){
if(value==null){return this.style.borderBlockEndColor;}
this.style.borderBlockEndColor=value;
return this;
}
border_block_end_style(value){
if(value==null){return this.style.borderBlockEndStyle;}
this.style.borderBlockEndStyle=value;
return this;
}
border_block_end_width(value){
if(value==null){return this.style.borderBlockEndWidth;}
this.style.borderBlockEndWidth=this.pad_numeric(value);
return this;
}
border_block_start_color(value){
if(value==null){return this.style.borderBlockStartColor;}
this.style.borderBlockStartColor=value;
return this;
}
border_block_start_style(value){
if(value==null){return this.style.borderBlockStartStyle;}
this.style.borderBlockStartStyle=value;
return this;
}
border_block_start_width(value){
if(value==null){return this.style.borderBlockStartWidth;}
this.style.borderBlockStartWidth=this.pad_numeric(value);
return this;
}
border_block_style(value){
if(value==null){return this.style.borderBlockStyle;}
this.style.borderBlockStyle=value;
return this;
}
border_block_width(value){
if(value==null){return this.style.borderBlockWidth;}
this.style.borderBlockWidth=this.pad_numeric(value);
return this;
}
border_bottom(value){
if(value==null){return this.style.borderBottom;}
this.style.borderBottom=this.pad_numeric(value);
return this;
}
border_bottom_color(value){
if(value==null){return this.style.borderBottomColor;}
this.style.borderBottomColor=value;
return this;
}
border_bottom_left_radius(value){
if(value==null){return this.style.borderBottomLeftRadius;}
this.style.borderBottomLeftRadius=this.pad_numeric(value);
return this;
}
border_bottom_right_radius(value){
if(value==null){return this.style.borderBottomRightRadius;}
this.style.borderBottomRightRadius=this.pad_numeric(value);
return this;
}
border_bottom_style(value){
if(value==null){return this.style.borderBottomStyle;}
this.style.borderBottomStyle=value;
return this;
}
border_bottom_width(value){
if(value==null){return this.style.borderBottomWidth;}
this.style.borderBottomWidth=this.pad_numeric(value);
return this;
}
border_collapse(value){
if(value==null){return this.style.borderCollapse;}
this.style.borderCollapse=value;
return this;
}
border_color(value){
if(value==null){return this.style.borderColor;}
this.style.borderColor=value;
return this;
}
border_image(value){
if(value==null){return this.style.borderImage;}
this.style.borderImage=value;
this.style.msBorderImage=value;
this.style.webkitBorderImage=value;
this.style.MozBorderImage=value;
this.style.OBorderImage=value;
return this;
}
border_image_outset(value){
if(value==null){return this.style.borderImageOutset;}
this.style.borderImageOutset=value;
return this;
}
border_image_repeat(value){
if(value==null){return this.style.borderImageRepeat;}
this.style.borderImageRepeat=value;
return this;
}
border_image_slice(value){
if(value==null){return this.style.borderImageSlice;}
this.style.borderImageSlice=value;
return this;
}
border_image_source(value){
if(value==null){return this.style.borderImageSource;}
this.style.borderImageSource=value;
return this;
}
border_image_width(value){
if(value==null){return this.style.borderImageWidth;}
this.style.borderImageWidth=this.pad_numeric(value);
return this;
}
border_inline(value){
if(value==null){return this.style.borderInline;}
this.style.borderInline=value;
return this;
}
border_inline_color(value){
if(value==null){return this.style.borderInlineColor;}
this.style.borderInlineColor=value;
return this;
}
border_inline_end_color(value){
if(value==null){return this.style.borderInlineEndColor;}
this.style.borderInlineEndColor=value;
return this;
}
border_inline_end_style(value){
if(value==null){return this.style.borderInlineEndStyle;}
this.style.borderInlineEndStyle=value;
return this;
}
border_inline_end_width(value){
if(value==null){return this.style.borderInlineEndWidth;}
this.style.borderInlineEndWidth=this.pad_numeric(value);
return this;
}
border_inline_start_color(value){
if(value==null){return this.style.borderInlineStartColor;}
this.style.borderInlineStartColor=value;
return this;
}
border_inline_start_style(value){
if(value==null){return this.style.borderInlineStartStyle;}
this.style.borderInlineStartStyle=value;
return this;
}
border_inline_start_width(value){
if(value==null){return this.style.borderInlineStartWidth;}
this.style.borderInlineStartWidth=this.pad_numeric(value);
return this;
}
border_inline_style(value){
if(value==null){return this.style.borderInlineStyle;}
this.style.borderInlineStyle=value;
return this;
}
border_inline_width(value){
if(value==null){return this.style.borderInlineWidth;}
this.style.borderInlineWidth=this.pad_numeric(value);
return this;
}
border_left(value){
if(value==null){return this.style.borderLeft;}
this.style.borderLeft=this.pad_numeric(value);
return this;
}
border_left_color(value){
if(value==null){return this.style.borderLeftColor;}
this.style.borderLeftColor=value;
return this;
}
border_left_style(value){
if(value==null){return this.style.borderLeftStyle;}
this.style.borderLeftStyle=value;
return this;
}
border_left_width(value){
if(value==null){return this.style.borderLeftWidth;}
this.style.borderLeftWidth=this.pad_numeric(value);
return this;
}
border_radius(value){
if(value==null){return this.style.borderRadius;}
this.style.borderRadius=this.pad_numeric(value);
this.style.msBorderRadius=this.pad_numeric(value);
this.style.webkitBorderRadius=this.pad_numeric(value);
this.style.MozBorderRadius=this.pad_numeric(value);
this.style.OBorderRadius=this.pad_numeric(value);
return this;
}
border_right(value){
if(value==null){return this.style.borderRight;}
this.style.borderRight=this.pad_numeric(value);
return this;
}
border_right_color(value){
if(value==null){return this.style.borderRightColor;}
this.style.borderRightColor=value;
return this;
}
border_right_style(value){
if(value==null){return this.style.borderRightStyle;}
this.style.borderRightStyle=value;
return this;
}
border_right_width(value){
if(value==null){return this.style.borderRightWidth;}
this.style.borderRightWidth=this.pad_numeric(value);
return this;
}
border_spacing(value){
if(value==null){return this.style.borderSpacing;}
this.style.borderSpacing=value;
return this;
}
border_style(value){
if(value==null){return this.style.borderStyle;}
this.style.borderStyle=value;
return this;
}
border_top(value){
if(value==null){return this.style.borderTop;}
this.style.borderTop=this.pad_numeric(value);
return this;
}
border_top_color(value){
if(value==null){return this.style.borderTopColor;}
this.style.borderTopColor=value;
return this;
}
border_top_left_radius(value){
if(value==null){return this.style.borderTopLeftRadius;}
this.style.borderTopLeftRadius=this.pad_numeric(value);
return this;
}
border_top_right_radius(value){
if(value==null){return this.style.borderTopRightRadius;}
this.style.borderTopRightRadius=this.pad_numeric(value);
return this;
}
border_top_style(value){
if(value==null){return this.style.borderTopStyle;}
this.style.borderTopStyle=value;
return this;
}
border_top_width(value){
if(value==null){return this.style.borderTopWidth;}
this.style.borderTopWidth=this.pad_numeric(value);
return this;
}
border_width(value){
if(value==null){return this.style.borderWidth;}
this.style.borderWidth=this.pad_numeric(value);
return this;
}
bottom(value){
if(value==null){return this.style.bottom;}
this.style.bottom=this.pad_numeric(value);
return this;
}
box_decoration_break(value){
if(value==null){return this.style.boxDecorationBreak;}
this.style.boxDecorationBreak=value;
return this;
}
box_reflect(value){
if(value==null){return this.style.boxReflect;}
this.style.boxReflect=value;
return this;
}
box_shadow(value){
if(value==null){return this.style.boxShadow;}
this.style.boxShadow=value;
this.style.msBoxShadow=value;
this.style.webkitBoxShadow=value;
this.style.MozBoxShadow=value;
this.style.OBoxShadow=value;
return this;
}
box_sizing(value){
if(value==null){return this.style.boxSizing;}
this.style.boxSizing=value;
this.style.msBoxSizing=value;
this.style.webkitBoxSizing=value;
this.style.MozBoxSizing=value;
this.style.OBoxSizing=value;
return this;
}
break_after(value){
if(value==null){return this.style.breakAfter;}
this.style.breakAfter=value;
return this;
}
break_before(value){
if(value==null){return this.style.breakBefore;}
this.style.breakBefore=value;
return this;
}
break_inside(value){
if(value==null){return this.style.breakInside;}
this.style.breakInside=value;
return this;
}
caption_side(value){
if(value==null){return this.style.captionSide;}
this.style.captionSide=value;
return this;
}
caret_color(value){
if(value==null){return this.style.caretColor;}
this.style.caretColor=value;
return this;
}
clear(value){
if(value==null){return this.style.clear;}
this.style.clear=value;
return this;
}
clip(value){
if(value==null){return this.style.clip;}
this.style.clip=value;
return this;
}
column_count(value){
if(value==null){return this.style.columnCount;}
this.style.columnCount=value;
this.style.msColumnCount=value;
this.style.webkitColumnCount=value;
this.style.MozColumnCount=value;
this.style.OColumnCount=value;
return this;
}
column_fill(value){
if(value==null){return this.style.columnFill;}
this.style.columnFill=value;
return this;
}
column_gap(value){
if(value==null){return this.style.columnGap;}
this.style.columnGap=value;
this.style.msColumnGap=value;
this.style.webkitColumnGap=value;
this.style.MozColumnGap=value;
this.style.OColumnGap=value;
return this;
}
column_rule(value){
if(value==null){return this.style.columnRule;}
this.style.columnRule=value;
this.style.msColumnRule=value;
this.style.webkitColumnRule=value;
this.style.MozColumnRule=value;
this.style.OColumnRule=value;
return this;
}
column_rule_color(value){
if(value==null){return this.style.columnRuleColor;}
this.style.columnRuleColor=value;
this.style.msColumnRuleColor=value;
this.style.webkitColumnRuleColor=value;
this.style.MozColumnRuleColor=value;
this.style.OColumnRuleColor=value;
return this;
}
column_rule_style(value){
if(value==null){return this.style.columnRuleStyle;}
this.style.columnRuleStyle=value;
this.style.msColumnRuleStyle=value;
this.style.webkitColumnRuleStyle=value;
this.style.MozColumnRuleStyle=value;
this.style.OColumnRuleStyle=value;
return this;
}
column_rule_width(value){
if(value==null){return this.style.columnRuleWidth;}
this.style.columnRuleWidth=this.pad_numeric(value);
this.style.msColumnRuleWidth=this.pad_numeric(value);
this.style.webkitColumnRuleWidth=this.pad_numeric(value);
this.style.MozColumnRuleWidth=this.pad_numeric(value);
this.style.OColumnRuleWidth=this.pad_numeric(value);
return this;
}
column_span(value){
if(value==null){return this.style.columnSpan;}
this.style.columnSpan=value;
return this;
}
column_width(value){
if(value==null){return this.style.columnWidth;}
this.style.columnWidth=this.pad_numeric(value);
this.style.msColumnWidth=this.pad_numeric(value);
this.style.webkitColumnWidth=this.pad_numeric(value);
this.style.MozColumnWidth=this.pad_numeric(value);
this.style.OColumnWidth=this.pad_numeric(value);
return this;
}
columns(value){
if(value==null){return this.style.columns;}
this.style.columns=value;
return this;
}
content(value){
if(value==null){return this.style.content;}
this.style.content=value;
return this;
}
counter_increment(value){
if(value==null){return this.style.counterIncrement;}
this.style.counterIncrement=value;
return this;
}
counter_reset(value){
if(value==null){return this.style.counterReset;}
this.style.counterReset=value;
return this;
}
cursor(value){
if(value==null){return this.style.cursor;}
this.style.cursor=value;
return this;
}
direction(value){
if(value==null){return this.style.direction;}
this.style.direction=value;
return this;
}
empty_cells(value){
if(value==null){return this.style.emptyCells;}
this.style.emptyCells=value;
return this;
}
filter(value){
if(value==null){return this.style.filter;}
this.style.filter=value;
this.style.msFilter=value;
this.style.webkitFilter=value;
this.style.MozFilter=value;
this.style.OFilter=value;
return this;
}
flex(value){
if(value==null){return this.style.flex;}
this.style.flex=value;
this.style.msFlex=value;
this.style.webkitFlex=value;
this.style.MozFlex=value;
this.style.OFlex=value;
return this;
}
flex_basis(value){
if(value==null){return this.style.flexBasis;}
this.style.flexBasis=value;
this.style.msFlexBasis=value;
this.style.webkitFlexBasis=value;
this.style.MozFlexBasis=value;
this.style.OFlexBasis=value;
return this;
}
flex_direction(value){
if(value==null){return this.style.flexDirection;}
this.style.flexDirection=value;
this.style.msFlexDirection=value;
this.style.webkitFlexDirection=value;
this.style.MozFlexDirection=value;
this.style.OFlexDirection=value;
return this;
}
flex_flow(value){
if(value==null){return this.style.flexFlow;}
this.style.flexFlow=value;
this.style.msFlexFlow=value;
this.style.webkitFlexFlow=value;
this.style.MozFlexFlow=value;
this.style.OFlexFlow=value;
return this;
}
flex_grow(value){
if(value==null){return this.style.flexGrow;}
this.style.flexGrow=value;
this.style.msFlexGrow=value;
this.style.webkitFlexGrow=value;
this.style.MozFlexGrow=value;
this.style.OFlexGrow=value;
return this;
}
flex_shrink(value){
if(value==null){return this.style.flexShrink;}
this.style.flexShrink=value;
this.style.msFlexShrink=value;
this.style.webkitFlexShrink=value;
this.style.MozFlexShrink=value;
this.style.OFlexShrink=value;
return this;
}
flex_wrap(value){
if(value==null){return this.style.flexWrap;}
this.style.flexWrap=value;
this.style.msFlexWrap=value;
this.style.webkitFlexWrap=value;
this.style.MozFlexWrap=value;
this.style.OFlexWrap=value;
return this;
}
float(value){
if(value==null){return this.style.float;}
this.style.float=value;
return this;
}
font(value){
if(value==null){return this.style.font;}
this.style.font=value;
return this;
}
font_family(value){
if(value==null){return this.style.fontFamily;}
this.style.fontFamily=value;
return this;
}
font_feature_settings(value){
if(value==null){return this.style.fontFeatureSettings;}
this.style.fontFeatureSettings=value;
return this;
}
font_kerning(value){
if(value==null){return this.style.fontKerning;}
this.style.fontKerning=value;
return this;
}
font_language_override(value){
if(value==null){return this.style.fontLanguageOverride;}
this.style.fontLanguageOverride=value;
return this;
}
font_size(value){
if(value==null){return this.style.fontSize;}
this.style.fontSize=this.pad_numeric(value);
return this;
}
font_size_adjust(value){
if(value==null){return this.style.fontSizeAdjust;}
this.style.fontSizeAdjust=value;
return this;
}
font_stretch(value){
if(value==null){return this.style.fontStretch;}
this.style.fontStretch=value;
return this;
}
font_style(value){
if(value==null){return this.style.fontStyle;}
this.style.fontStyle=value;
return this;
}
font_synthesis(value){
if(value==null){return this.style.fontSynthesis;}
this.style.fontSynthesis=value;
return this;
}
font_variant(value){
if(value==null){return this.style.fontVariant;}
this.style.fontVariant=value;
return this;
}
font_variant_alternates(value){
if(value==null){return this.style.fontVariantAlternates;}
this.style.fontVariantAlternates=value;
return this;
}
font_variant_caps(value){
if(value==null){return this.style.fontVariantCaps;}
this.style.fontVariantCaps=value;
return this;
}
font_variant_east_asian(value){
if(value==null){return this.style.fontVariantEastAsian;}
this.style.fontVariantEastAsian=value;
return this;
}
font_variant_ligatures(value){
if(value==null){return this.style.fontVariantLigatures;}
this.style.fontVariantLigatures=value;
return this;
}
font_variant_numeric(value){
if(value==null){return this.style.fontVariantNumeric;}
this.style.fontVariantNumeric=value;
return this;
}
font_variant_position(value){
if(value==null){return this.style.fontVariantPosition;}
this.style.fontVariantPosition=value;
return this;
}
font_weight(value){
if(value==null){return this.style.fontWeight;}
this.style.fontWeight=value;
return this;
}
gap(value){
if(value==null){return this.style.gap;}
this.style.gap=value;
return this;
}
grid(value){
if(value==null){return this.style.grid;}
this.style.grid=value;
return this;
}
grid_area(value){
if(value==null){return this.style.gridArea;}
this.style.gridArea=value;
return this;
}
grid_auto_columns(value){
if(value==null){return this.style.gridAutoColumns;}
this.style.gridAutoColumns=value;
return this;
}
grid_auto_flow(value){
if(value==null){return this.style.gridAutoFlow;}
this.style.gridAutoFlow=value;
return this;
}
grid_auto_rows(value){
if(value==null){return this.style.gridAutoRows;}
this.style.gridAutoRows=value;
return this;
}
grid_column(value){
if(value==null){return this.style.gridColumn;}
this.style.gridColumn=value;
return this;
}
grid_column_end(value){
if(value==null){return this.style.gridColumnEnd;}
this.style.gridColumnEnd=value;
return this;
}
grid_column_gap(value){
if(value==null){return this.style.gridColumnGap;}
this.style.gridColumnGap=value;
return this;
}
grid_column_start(value){
if(value==null){return this.style.gridColumnStart;}
this.style.gridColumnStart=value;
return this;
}
grid_gap(value){
if(value==null){return this.style.gridGap;}
this.style.gridGap=value;
return this;
}
grid_row(value){
if(value==null){return this.style.gridRow;}
this.style.gridRow=value;
return this;
}
grid_row_end(value){
if(value==null){return this.style.gridRowEnd;}
this.style.gridRowEnd=value;
return this;
}
grid_row_gap(value){
if(value==null){return this.style.gridRowGap;}
this.style.gridRowGap=value;
return this;
}
grid_row_start(value){
if(value==null){return this.style.gridRowStart;}
this.style.gridRowStart=value;
return this;
}
grid_template(value){
if(value==null){return this.style.gridTemplate;}
this.style.gridTemplate=value;
return this;
}
grid_template_areas(value){
if(value==null){return this.style.gridTemplateAreas;}
this.style.gridTemplateAreas=value;
return this;
}
grid_template_columns(value){
if(value==null){return this.style.gridTemplateColumns;}
this.style.gridTemplateColumns=value;
return this;
}
grid_template_rows(value){
if(value==null){return this.style.gridTemplateRows;}
this.style.gridTemplateRows=value;
return this;
}
hanging_punctuation(value){
if(value==null){return this.style.hangingPunctuation;}
this.style.hangingPunctuation=value;
return this;
}
hyphens(value){
if(value==null){return this.style.hyphens;}
this.style.hyphens=value;
return this;
}
image_rendering(value){
if(value==null){return this.style.imageRendering;}
this.style.imageRendering=value;
return this;
}
inline_size(value){
if(value==null){return this.style.inlineSize;}
this.style.inlineSize=this.pad_numeric(value);
return this;
}
inset(value){
if(value==null){return this.style.inset;}
this.style.inset=value;
return this;
}
inset_block(value){
if(value==null){return this.style.insetBlock;}
this.style.insetBlock=value;
return this;
}
inset_block_end(value){
if(value==null){return this.style.insetBlockEnd;}
this.style.insetBlockEnd=value;
return this;
}
inset_block_start(value){
if(value==null){return this.style.insetBlockStart;}
this.style.insetBlockStart=value;
return this;
}
inset_inline(value){
if(value==null){return this.style.insetInline;}
this.style.insetInline=value;
return this;
}
inset_inline_end(value){
if(value==null){return this.style.insetInlineEnd;}
this.style.insetInlineEnd=value;
return this;
}
inset_inline_start(value){
if(value==null){return this.style.insetInlineStart;}
this.style.insetInlineStart=value;
return this;
}
isolation(value){
if(value==null){return this.style.isolation;}
this.style.isolation=value;
return this;
}
justify_content(value){
if(value==null){return this.style.justifyContent;}
this.style.justifyContent=value;
this.style.msJustifyContent=value;
this.style.webkitJustifyContent=value;
this.style.MozJustifyContent=value;
this.style.OJustifyContent=value;
return this;
}
justify_items(value){
if(value==null){return this.style.justifyItems;}
this.style.justifyItems=value;
return this;
}
justify_self(value){
if(value==null){return this.style.justifySelf;}
this.style.justifySelf=value;
return this;
}
left(value){
if(value==null){return this.style.left;}
this.style.left=this.pad_numeric(value);
return this;
}
letter_spacing(value){
if(value==null){return this.style.letterSpacing;}
this.style.letterSpacing=value;
return this;
}
line_break(value){
if(value==null){return this.style.lineBreak;}
this.style.lineBreak=value;
return this;
}
line_height(value){
if(value==null){return this.style.lineHeight;}
this.style.lineHeight=this.pad_numeric(value);
return this;
}
list_style(value){
if(value==null){return this.style.listStyle;}
this.style.listStyle=value;
return this;
}
list_style_image(value){
if(value==null){return this.style.listStyleImage;}
this.style.listStyleImage=value;
return this;
}
list_style_position(value){
if(value==null){return this.style.listStylePosition;}
this.style.listStylePosition=value;
return this;
}
list_style_type(value){
if(value==null){return this.style.listStyleType;}
this.style.listStyleType=value;
return this;
}
margin_block(value){
if(value==null){return this.style.marginBlock;}
this.style.marginBlock=value;
return this;
}
margin_block_end(value){
if(value==null){return this.style.marginBlockEnd;}
this.style.marginBlockEnd=value;
return this;
}
margin_block_start(value){
if(value==null){return this.style.marginBlockStart;}
this.style.marginBlockStart=value;
return this;
}
margin_bottom(value){
if(value==null){return this.style.marginBottom;}
this.style.marginBottom=this.pad_numeric(value);
return this;
}
margin_inline(value){
if(value==null){return this.style.marginInline;}
this.style.marginInline=value;
return this;
}
margin_inline_end(value){
if(value==null){return this.style.marginInlineEnd;}
this.style.marginInlineEnd=value;
return this;
}
margin_inline_start(value){
if(value==null){return this.style.marginInlineStart;}
this.style.marginInlineStart=value;
return this;
}
margin_left(value){
if(value==null){return this.style.marginLeft;}
this.style.marginLeft=this.pad_numeric(value);
return this;
}
margin_right(value){
if(value==null){return this.style.marginRight;}
this.style.marginRight=this.pad_numeric(value);
return this;
}
margin_top(value){
if(value==null){return this.style.marginTop;}
this.style.marginTop=this.pad_numeric(value);
return this;
}
mask(value){
if(value==null){return this.style.mask;}
this.style.mask=value;
this.style.msMask=value;
this.style.webkitMask=value;
this.style.MozMask=value;
this.style.OMask=value;
return this;
}
mask_clip(value){
if(value==null){return this.style.maskClip;}
this.style.maskClip=value;
return this;
}
mask_composite(value){
if(value==null){return this.style.maskComposite;}
this.style.maskComposite=value;
this.style.msMaskComposite=value;
this.style.webkitMaskComposite=value;
this.style.MozMaskComposite=value;
this.style.OMaskComposite=value;
return this;
}
mask_image(value){
if(value==null){return this.style.maskImage;}
this.style.maskImage=value;
return this;
}
mask_mode(value){
if(value==null){return this.style.maskMode;}
this.style.maskMode=value;
return this;
}
mask_origin(value){
if(value==null){return this.style.maskOrigin;}
this.style.maskOrigin=value;
return this;
}
mask_position(value){
if(value==null){return this.style.maskPosition;}
this.style.maskPosition=value;
return this;
}
mask_repeat(value){
if(value==null){return this.style.maskRepeat;}
this.style.maskRepeat=value;
return this;
}
mask_size(value){
if(value==null){return this.style.maskSize;}
this.style.maskSize=this.pad_numeric(value);
return this;
}
mask_type(value){
if(value==null){return this.style.maskType;}
this.style.maskType=value;
return this;
}
max_height(value){
if(value==null){return this.style.maxHeight;}
this.style.maxHeight=this.pad_numeric(value);
return this;
}
max_width(value){
if(value==null){return this.style.maxWidth;}
this.style.maxWidth=this.pad_numeric(value);
return this;
}
max_block_size(value){
if(value==null){return this.style.maxBlockSize;}
this.style.maxBlockSize=this.pad_numeric(value);
return this;
}
max_inline_size(value){
if(value==null){return this.style.maxInlineSize;}
this.style.maxInlineSize=this.pad_numeric(value);
return this;
}
min_block_size(value){
if(value==null){return this.style.minBlockSize;}
this.style.minBlockSize=this.pad_numeric(value);
return this;
}
min_inline_size(value){
if(value==null){return this.style.minInlineSize;}
this.style.minInlineSize=this.pad_numeric(value);
return this;
}
min_height(value){
if(value==null){return this.style.minHeight;}
this.style.minHeight=this.pad_numeric(value);
return this;
}
min_width(value){
if(value==null){return this.style.minWidth;}
this.style.minWidth=this.pad_numeric(value);
return this;
}
mix_blend_mode(value){
if(value==null){return this.style.mixBlendMode;}
this.style.mixBlendMode=value;
return this;
}
object_fit(value){
if(value==null){return this.style.objectFit;}
this.style.objectFit=value;
return this;
}
object_position(value){
if(value==null){return this.style.objectPosition;}
this.style.objectPosition=value;
return this;
}
offset(value){
if(value==null){return this.style.offset;}
this.style.offset=value;
return this;
}
offset_anchor(value){
if(value==null){return this.style.offsetAnchor;}
this.style.offsetAnchor=value;
return this;
}
offset_distance(value){
if(value==null){return this.style.offsetDistance;}
this.style.offsetDistance=value;
return this;
}
offset_path(value){
if(value==null){return this.style.offsetPath;}
this.style.offsetPath=value;
return this;
}
offset_rotate(value){
if(value==null){return this.style.offsetRotate;}
this.style.offsetRotate=value;
return this;
}
order(value){
if(value==null){return this.style.order;}
this.style.order=value;
this.style.msOrder=value;
this.style.webkitOrder=value;
this.style.MozOrder=value;
this.style.OOrder=value;
return this;
}
orphans(value){
if(value==null){return this.style.orphans;}
this.style.orphans=value;
return this;
}
outline(value){
if(value==null){return this.style.outline;}
this.style.outline=value;
return this;
}
outline_color(value){
if(value==null){return this.style.outlineColor;}
this.style.outlineColor=value;
return this;
}
outline_offset(value){
if(value==null){return this.style.outlineOffset;}
this.style.outlineOffset=value;
return this;
}
outline_style(value){
if(value==null){return this.style.outlineStyle;}
this.style.outlineStyle=value;
return this;
}
outline_width(value){
if(value==null){return this.style.outlineWidth;}
this.style.outlineWidth=this.pad_numeric(value);
return this;
}
overflow(value){
if(value==null){return this.style.overflow;}
this.style.overflow=value;
return this;
}
overflow_anchor(value){
if(value==null){return this.style.overflowAnchor;}
this.style.overflowAnchor=value;
return this;
}
overflow_wrap(value){
if(value==null){return this.style.overflowWrap;}
this.style.overflowWrap=value;
return this;
}
overflow_x(value){
if(value==null){return this.style.overflowX;}
this.style.overflowX=value;
return this;
}
overflow_y(value){
if(value==null){return this.style.overflowY;}
this.style.overflowY=value;
return this;
}
overscroll_behavior(value){
if(value==null){return this.style.overscrollBehavior;}
this.style.overscrollBehavior=value;
return this;
}
overscroll_behavior_block(value){
if(value==null){return this.style.overscrollBehaviorBlock;}
this.style.overscrollBehaviorBlock=value;
return this;
}
overscroll_behavior_inline(value){
if(value==null){return this.style.overscrollBehaviorInline;}
this.style.overscrollBehaviorInline=value;
return this;
}
overscroll_behavior_x(value){
if(value==null){return this.style.overscrollBehaviorX;}
this.style.overscrollBehaviorX=value;
return this;
}
overscroll_behavior_y(value){
if(value==null){return this.style.overscrollBehaviorY;}
this.style.overscrollBehaviorY=value;
return this;
}
padding_block(value){
if(value==null){return this.style.paddingBlock;}
this.style.paddingBlock=value;
return this;
}
padding_block_end(value){
if(value==null){return this.style.paddingBlockEnd;}
this.style.paddingBlockEnd=value;
return this;
}
padding_block_start(value){
if(value==null){return this.style.paddingBlockStart;}
this.style.paddingBlockStart=value;
return this;
}
padding_bottom(value){
if(value==null){return this.style.paddingBottom;}
this.style.paddingBottom=this.pad_numeric(value);
return this;
}
padding_inline(value){
if(value==null){return this.style.paddingInline;}
this.style.paddingInline=value;
return this;
}
padding_inline_end(value){
if(value==null){return this.style.paddingInlineEnd;}
this.style.paddingInlineEnd=value;
return this;
}
padding_inline_start(value){
if(value==null){return this.style.paddingInlineStart;}
this.style.paddingInlineStart=value;
return this;
}
padding_left(value){
if(value==null){return this.style.paddingLeft;}
this.style.paddingLeft=this.pad_numeric(value);
return this;
}
padding_right(value){
if(value==null){return this.style.paddingRight;}
this.style.paddingRight=this.pad_numeric(value);
return this;
}
padding_top(value){
if(value==null){return this.style.paddingTop;}
this.style.paddingTop=this.pad_numeric(value);
return this;
}
page_break_after(value){
if(value==null){return this.style.pageBreakAfter;}
this.style.pageBreakAfter=value;
return this;
}
page_break_before(value){
if(value==null){return this.style.pageBreakBefore;}
this.style.pageBreakBefore=value;
return this;
}
page_break_inside(value){
if(value==null){return this.style.pageBreakInside;}
this.style.pageBreakInside=value;
return this;
}
paint_order(value){
if(value==null){return this.style.paintOrder;}
this.style.paintOrder=value;
return this;
}
perspective(value){
if(value==null){return this.style.perspective;}
this.style.perspective=value;
this.style.msPerspective=value;
this.style.webkitPerspective=value;
this.style.MozPerspective=value;
this.style.OPerspective=value;
return this;
}
perspective_origin(value){
if(value==null){return this.style.perspectiveOrigin;}
this.style.perspectiveOrigin=value;
this.style.msPerspectiveOrigin=value;
this.style.webkitPerspectiveOrigin=value;
this.style.MozPerspectiveOrigin=value;
this.style.OPerspectiveOrigin=value;
return this;
}
place_content(value){
if(value==null){return this.style.placeContent;}
this.style.placeContent=value;
return this;
}
place_items(value){
if(value==null){return this.style.placeItems;}
this.style.placeItems=value;
return this;
}
place_self(value){
if(value==null){return this.style.placeSelf;}
this.style.placeSelf=value;
return this;
}
pointer_events(value){
if(value==null){return this.style.pointerEvents;}
this.style.pointerEvents=value;
return this;
}
quotes(value){
if(value==null){return this.style.quotes;}
this.style.quotes=value;
return this;
}
resize(value){
if(value==null){return this.style.resize;}
this.style.resize=value;
return this;
}
right(value){
if(value==null){return this.style.right;}
this.style.right=this.pad_numeric(value);
return this;
}
rotate(value){
if(value==null){return this.style.rotate;}
this.style.rotate=value;
return this;
}
row_gap(value){
if(value==null){return this.style.rowGap;}
this.style.rowGap=value;
return this;
}
scale(value){
if(value==null){return this.style.scale;}
this.style.scale=value;
return this;
}
scroll_behavior(value){
if(value==null){return this.style.scrollBehavior;}
this.style.scrollBehavior=value;
return this;
}
scroll_margin(value){
if(value==null){return this.style.scrollMargin;}
this.style.scrollMargin=value;
return this;
}
scroll_margin_block(value){
if(value==null){return this.style.scrollMarginBlock;}
this.style.scrollMarginBlock=value;
return this;
}
scroll_margin_block_end(value){
if(value==null){return this.style.scrollMarginBlockEnd;}
this.style.scrollMarginBlockEnd=value;
return this;
}
scroll_margin_block_start(value){
if(value==null){return this.style.scrollMarginBlockStart;}
this.style.scrollMarginBlockStart=value;
return this;
}
scroll_margin_bottom(value){
if(value==null){return this.style.scrollMarginBottom;}
this.style.scrollMarginBottom=this.pad_numeric(value);
return this;
}
scroll_margin_inline(value){
if(value==null){return this.style.scrollMarginInline;}
this.style.scrollMarginInline=value;
return this;
}
scroll_margin_inline_end(value){
if(value==null){return this.style.scrollMarginInlineEnd;}
this.style.scrollMarginInlineEnd=value;
return this;
}
scroll_margin_inline_start(value){
if(value==null){return this.style.scrollMarginInlineStart;}
this.style.scrollMarginInlineStart=value;
return this;
}
scroll_margin_left(value){
if(value==null){return this.style.scrollMarginLeft;}
this.style.scrollMarginLeft=this.pad_numeric(value);
return this;
}
scroll_margin_right(value){
if(value==null){return this.style.scrollMarginRight;}
this.style.scrollMarginRight=this.pad_numeric(value);
return this;
}
scroll_margin_top(value){
if(value==null){return this.style.scrollMarginTop;}
this.style.scrollMarginTop=this.pad_numeric(value);
return this;
}
scroll_padding(value){
if(value==null){return this.style.scrollPadding;}
this.style.scrollPadding=value;
return this;
}
scroll_padding_block(value){
if(value==null){return this.style.scrollPaddingBlock;}
this.style.scrollPaddingBlock=value;
return this;
}
scroll_padding_block_end(value){
if(value==null){return this.style.scrollPaddingBlockEnd;}
this.style.scrollPaddingBlockEnd=value;
return this;
}
scroll_padding_block_start(value){
if(value==null){return this.style.scrollPaddingBlockStart;}
this.style.scrollPaddingBlockStart=value;
return this;
}
scroll_padding_bottom(value){
if(value==null){return this.style.scrollPaddingBottom;}
this.style.scrollPaddingBottom=this.pad_numeric(value);
return this;
}
scroll_padding_inline(value){
if(value==null){return this.style.scrollPaddingInline;}
this.style.scrollPaddingInline=value;
return this;
}
scroll_padding_inline_end(value){
if(value==null){return this.style.scrollPaddingInlineEnd;}
this.style.scrollPaddingInlineEnd=value;
return this;
}
scroll_padding_inline_start(value){
if(value==null){return this.style.scrollPaddingInlineStart;}
this.style.scrollPaddingInlineStart=value;
return this;
}
scroll_padding_left(value){
if(value==null){return this.style.scrollPaddingLeft;}
this.style.scrollPaddingLeft=this.pad_numeric(value);
return this;
}
scroll_padding_right(value){
if(value==null){return this.style.scrollPaddingRight;}
this.style.scrollPaddingRight=this.pad_numeric(value);
return this;
}
scroll_padding_top(value){
if(value==null){return this.style.scrollPaddingTop;}
this.style.scrollPaddingTop=this.pad_numeric(value);
return this;
}
scroll_snap_align(value){
if(value==null){return this.style.scrollSnapAlign;}
this.style.scrollSnapAlign=value;
return this;
}
scroll_snap_stop(value){
if(value==null){return this.style.scrollSnapStop;}
this.style.scrollSnapStop=value;
return this;
}
scroll_snap_type(value){
if(value==null){return this.style.scrollSnapType;}
this.style.scrollSnapType=value;
return this;
}
scrollbar_color(value){
if(value==null){return this.style.scrollbarColor;}
this.style.scrollbarColor=value;
return this;
}
tab_size(value){
if(value==null){return this.style.tabSize;}
this.style.tabSize=value;
this.style.msTabSize=value;
this.style.webkitTabSize=value;
this.style.MozTabSize=value;
this.style.OTabSize=value;
return this;
}
table_layout(value){
if(value==null){return this.style.tableLayout;}
this.style.tableLayout=value;
return this;
}
text_align(value){
if(value==null){return this.style.textAlign;}
this.style.textAlign=value;
return this;
}
text_align_last(value){
if(value==null){return this.style.textAlignLast;}
this.style.textAlignLast=value;
return this;
}
text_combine_upright(value){
if(value==null){return this.style.textCombineUpright;}
this.style.textCombineUpright=value;
return this;
}
text_decoration(value){
if(value==null){return this.style.textDecoration;}
this.style.textDecoration=value;
return this;
}
text_decoration_color(value){
if(value==null){return this.style.textDecorationColor;}
this.style.textDecorationColor=value;
return this;
}
text_decoration_line(value){
if(value==null){return this.style.textDecorationLine;}
this.style.textDecorationLine=value;
return this;
}
text_decoration_style(value){
if(value==null){return this.style.textDecorationStyle;}
this.style.textDecorationStyle=value;
return this;
}
text_decoration_thickness(value){
if(value==null){return this.style.textDecorationThickness;}
this.style.textDecorationThickness=value;
return this;
}
text_emphasis(value){
if(value==null){return this.style.textEmphasis;}
this.style.textEmphasis=value;
return this;
}
text_indent(value){
if(value==null){return this.style.textIndent;}
this.style.textIndent=value;
return this;
}
text_justify(value){
if(value==null){return this.style.textJustify;}
this.style.textJustify=value;
return this;
}
text_orientation(value){
if(value==null){return this.style.textOrientation;}
this.style.textOrientation=value;
return this;
}
text_overflow(value){
if(value==null){return this.style.textOverflow;}
this.style.textOverflow=value;
return this;
}
text_shadow(value){
if(value==null){return this.style.textShadow;}
this.style.textShadow=value;
return this;
}
text_transform(value){
if(value==null){return this.style.textTransform;}
this.style.textTransform=value;
return this;
}
text_underline_position(value){
if(value==null){return this.style.textUnderlinePosition;}
this.style.textUnderlinePosition=value;
return this;
}
top(value){
if(value==null){return this.style.top;}
this.style.top=this.pad_numeric(value);
return this;
}
transform(value){
if(value==null){return this.style.transform;}
this.style.transform=value;
this.style.msTransform=value;
this.style.webkitTransform=value;
this.style.MozTransform=value;
this.style.OTransform=value;
return this;
}
transform_origin(value){
if(value==null){return this.style.transformOrigin;}
this.style.transformOrigin=value;
this.style.msTransformOrigin=value;
this.style.webkitTransformOrigin=value;
this.style.MozTransformOrigin=value;
this.style.OTransformOrigin=value;
return this;
}
transform_style(value){
if(value==null){return this.style.transformStyle;}
this.style.transformStyle=value;
this.style.msTransformStyle=value;
this.style.webkitTransformStyle=value;
this.style.MozTransformStyle=value;
this.style.OTransformStyle=value;
return this;
}
transition(value){
if(value==null){return this.style.transition;}
this.style.transition=value;
this.style.msTransition=value;
this.style.webkitTransition=value;
this.style.MozTransition=value;
this.style.OTransition=value;
return this;
}
transition_delay(value){
if(value==null){return this.style.transitionDelay;}
this.style.transitionDelay=value;
this.style.msTransitionDelay=value;
this.style.webkitTransitionDelay=value;
this.style.MozTransitionDelay=value;
this.style.OTransitionDelay=value;
return this;
}
transition_duration(value){
if(value==null){return this.style.transitionDuration;}
this.style.transitionDuration=value;
this.style.msTransitionDuration=value;
this.style.webkitTransitionDuration=value;
this.style.MozTransitionDuration=value;
this.style.OTransitionDuration=value;
return this;
}
transition_property(value){
if(value==null){return this.style.transitionProperty;}
this.style.transitionProperty=value;
this.style.msTransitionProperty=value;
this.style.webkitTransitionProperty=value;
this.style.MozTransitionProperty=value;
this.style.OTransitionProperty=value;
return this;
}
transition_timing_function(value){
if(value==null){return this.style.transitionTimingFunction;}
this.style.transitionTimingFunction=value;
this.style.msTransitionTimingFunction=value;
this.style.webkitTransitionTimingFunction=value;
this.style.MozTransitionTimingFunction=value;
this.style.OTransitionTimingFunction=value;
return this;
}
translate(value){
if(value==null){return this.style.translate;}
this.style.translate=value;
return this;
}
unicode_bidi(value){
if(value==null){return this.style.unicodeBidi;}
this.style.unicodeBidi=value;
return this;
}
user_select(value){
if(value==null){return this.style.userSelect;}
this.style.userSelect=value;
this.style.msUserSelect=value;
this.style.webkitUserSelect=value;
this.style.MozUserSelect=value;
this.style.OUserSelect=value;
return this;
}
visibility(value){
if(value==null){return this.style.visibility;}
this.style.visibility=value;
return this;
}
white_space(value){
if(value==null){return this.style.whiteSpace;}
this.style.whiteSpace=value;
return this;
}
widows(value){
if(value==null){return this.style.widows;}
this.style.widows=value;
return this;
}
word_break(value){
if(value==null){return this.style.wordBreak;}
this.style.wordBreak=value;
return this;
}
word_spacing(value){
if(value==null){return this.style.wordSpacing;}
this.style.wordSpacing=value;
return this;
}
word_wrap(value){
if(value==null){return this.style.wordWrap;}
this.style.wordWrap=value;
return this;
}
writing_mode(value){
if(value==null){return this.style.writingMode;}
this.style.writingMode=value;
return this;
}
accept(value){
if(value==null){return super.accept;}
super.accept=value;
return this;
}
accept_charset(value){
if(value==null){return super.accept_charset;}
super.accept_charset=value;
return this;
}
action(value){
if(value==null){return super.action;}
super.action=value;
return this;
}
alt(value){
if(value==null){return super.alt;}
super.alt=value;
return this;
}
async(value){
if(value==null){return super.async;}
super.async=value;
return this;
}
auto_complete(value){
if(value==null){return super.autocomplete;}
super.autocomplete=value;
return this;
}
auto_focus(value){
if(value==null){return super.autofocus;}
super.autofocus=value;
return this;
}
auto_play(value){
if(value==null){return super.autoplay;}
super.autoplay=value;
return this;
}
charset(value){
if(value==null){return super.charset;}
super.charset=value;
return this;
}
checked(value){
if(value==null){return super.checked;}
super.checked=value;
return this;
}
cite(value){
if(value==null){return super.cite;}
super.cite=value;
return this;
}
cols(value){
if(value==null){return super.cols;}
super.cols=value;
return this;
}
colspan(value){
if(value==null){return super.colspan;}
super.colspan=value;
return this;
}
content(value){
if(value==null){return super.content;}
super.content=value;
return this;
}
content_editable(value){
if(value==null){return super.contenteditable;}
super.contenteditable=value;
return this;
}
controls(value){
if(value==null){return super.controls;}
super.controls=value;
return this;
}
coords(value){
if(value==null){return super.coords;}
super.coords=value;
return this;
}
data(value){
if(value==null){return super.data;}
super.data=value;
return this;
}
datetime(value){
if(value==null){return super.datetime;}
super.datetime=value;
return this;
}
default(value){
if(value==null){return super.default;}
super.default=value;
return this;
}
defer(value){
if(value==null){return super.defer;}
super.defer=value;
return this;
}
dir(value){
if(value==null){return super.dir;}
super.dir=value;
return this;
}
dirname(value){
if(value==null){return super.dirname;}
super.dirname=value;
return this;
}
disabled(value){
if(value==null){return super.disabled;}
super.disabled=value;
return this;
}
download(value){
if(value==null){return super.download;}
super.download=value;
return this;
}
draggable(value){
if(value==null){return super.draggable;}
super.draggable=value;
return this;
}
enctype(value){
if(value==null){return super.enctype;}
super.enctype=value;
return this;
}
for(value){
if(value==null){return super.for;}
super.for=value;
return this;
}
form(value){
if(value==null){return super.form;}
super.form=value;
return this;
}
form_action(value){
if(value==null){return super.formaction;}
super.formaction=value;
return this;
}
headers(value){
if(value==null){return super.headers;}
super.headers=value;
return this;
}
high(value){
if(value==null){return super.high;}
super.high=value;
return this;
}
href(value){
if(value==null){return super.href;}
super.href=value;
return this;
}
href_lang(value){
if(value==null){return super.hreflang;}
super.hreflang=value;
return this;
}
http_equiv(value){
if(value==null){return super.http_equiv;}
super.http_equiv=value;
return this;
}
id(value){
if(value==null){return super.id;}
super.id=value;
return this;
}
is_map(value){
if(value==null){return super.ismap;}
super.ismap=value;
return this;
}
kind(value){
if(value==null){return super.kind;}
super.kind=value;
return this;
}
label(value){
if(value==null){return super.label;}
super.label=value;
return this;
}
lang(value){
if(value==null){return super.lang;}
super.lang=value;
return this;
}
list(value){
if(value==null){return super.list;}
super.list=value;
return this;
}
loop(value){
if(value==null){return super.loop;}
super.loop=value;
return this;
}
low(value){
if(value==null){return super.low;}
super.low=value;
return this;
}
max(value){
if(value==null){return super.max;}
super.max=value;
return this;
}
max_length(value){
if(value==null){return super.maxlength;}
super.maxlength=value;
return this;
}
method(value){
if(value==null){return super.method;}
super.method=value;
return this;
}
min(value){
if(value==null){return super.min;}
super.min=value;
return this;
}
multiple(value){
if(value==null){return super.multiple;}
super.multiple=value;
return this;
}
muted(value){
if(value==null){return super.muted;}
super.muted=value;
return this;
}
no_validate(value){
if(value==null){return super.novalidate;}
super.novalidate=value;
return this;
}
open(value){
if(value==null){return super.open;}
super.open=value;
return this;
}
optimum(value){
if(value==null){return super.optimum;}
super.optimum=value;
return this;
}
pattern(value){
if(value==null){return super.pattern;}
super.pattern=value;
return this;
}
placeholder(value){
if(value==null){return super.placeholder;}
super.placeholder=value;
return this;
}
poster(value){
if(value==null){return super.poster;}
super.poster=value;
return this;
}
preload(value){
if(value==null){return super.preload;}
super.preload=value;
return this;
}
readonly(value){
if(value==null){return super.readonly;}
super.readonly=value;
return this;
}
rel(value){
if(value==null){return super.rel;}
super.rel=value;
return this;
}
required(value){
if(value==null){return super.required;}
super.required=value;
return this;
}
reversed(value){
if(value==null){return super.reversed;}
super.reversed=value;
return this;
}
rows(value){
if(value==null){return super.rows;}
super.rows=value;
return this;
}
row_span(value){
if(value==null){return super.rowspan;}
super.rowspan=value;
return this;
}
sandbox(value){
if(value==null){return super.sandbox;}
super.sandbox=value;
return this;
}
scope(value){
if(value==null){return super.scope;}
super.scope=value;
return this;
}
selected(value){
if(value==null){return super.selected;}
super.selected=value;
return this;
}
shape(value){
if(value==null){return super.shape;}
super.shape=value;
return this;
}
size(value){
if(value==null){return super.size;}
super.size=value;
return this;
}
sizes(value){
if(value==null){return super.sizes;}
super.sizes=value;
return this;
}
span(value){
if(value==null){return super.span;}
super.span=value;
return this;
}
spell_check(value){
if(value==null){return super.spellcheck;}
super.spellcheck=value;
return this;
}
src(value){
if(value==null){return super.src;}
super.src=value;
return this;
}
src_doc(value){
if(value==null){return super.srcdoc;}
super.srcdoc=value;
return this;
}
src_lang(value){
if(value==null){return super.srclang;}
super.srclang=value;
return this;
}
rrsrc_set(value){
if(value==null){return super.srcset;}
super.srcset=value;
return this;
}
start(value){
if(value==null){return super.start;}
super.start=value;
return this;
}
step(value){
if(value==null){return super.step;}
super.step=value;
return this;
}
tab_index(value){
if(value==null){return super.tabindex;}
super.tabindex=value;
return this;
}
target(value){
if(value==null){return super.target;}
super.target=value;
return this;
}
title(value){
if(value==null){return super.title;}
super.title=value;
return this;
}
translate(value){
if(value==null){return super.translate;}
super.translate=value;
return this;
}
type(value){
if(value==null){return super.type;}
super.type=value;
return this;
}
use_map(value){
if(value==null){return super.usemap;}
super.usemap=value;
return this;
}
value(value){
if(value==null){return super.value;}
super.value=value;
return this;
}
on_after_print(callback){
if(callback==null){return this.onafterprint;}
const e=this;
this.onafterprint=(t)=>callback(e,t);
return this;
}
on_before_print(callback){
if(callback==null){return this.onbeforeprint;}
const e=this;
this.onbeforeprint=(t)=>callback(e,t);
return this;
}
on_before_unload(callback){
if(callback==null){return this.onbeforeunload;}
const e=this;
this.onbeforeunload=(t)=>callback(e,t);
return this;
}
on_error(callback){
if(callback==null){return this.onerror;}
const e=this;
this.onerror=(t)=>callback(e,t);
return this;
}
on_hash_change(callback){
if(callback==null){return this.onhashchange;}
const e=this;
this.onhashchange=(t)=>callback(e,t);
return this;
}
on_load(callback){
if(callback==null){return this.onload;}
const e=this;
this.onload=(t)=>callback(e,t);
return this;
}
on_message(callback){
if(callback==null){return this.onmessage;}
const e=this;
this.onmessage=(t)=>callback(e,t);
return this;
}
on_offline(callback){
if(callback==null){return this.onoffline;}
const e=this;
this.onoffline=(t)=>callback(e,t);
return this;
}
on_online(callback){
if(callback==null){return this.ononline;}
const e=this;
this.ononline=(t)=>callback(e,t);
return this;
}
on_page_hide(callback){
if(callback==null){return this.onpagehide;}
const e=this;
this.onpagehide=(t)=>callback(e,t);
return this;
}
on_page_show(callback){
if(callback==null){return this.onpageshow;}
const e=this;
this.onpageshow=(t)=>callback(e,t);
return this;
}
on_popstate(callback){
if(callback==null){return this.onpopstate;}
const e=this;
this.onpopstate=(t)=>callback(e,t);
return this;
}
on_resize(callback){
if(callback==null){return this.onresize;}
const e=this;
this.onresize=(t)=>callback(e,t);
return this;
}
on_storage(callback){
if(callback==null){return this.onstorage;}
const e=this;
this.onstorage=(t)=>callback(e,t);
return this;
}
on_unload(callback){
if(callback==null){return this.onunload;}
const e=this;
this.onunload=(t)=>callback(e,t);
return this;
}
on_blur(callback){
if(callback==null){return this.onblur;}
const e=this;
this.onblur=(t)=>callback(e,t);
return this;
}
on_change(callback){
if(callback==null){return this.onchange;}
const e=this;
this.onchange=(t)=>callback(e,t);
return this;
}
on_context_menu(callback){
if(callback==null){return this.oncontextmenu;}
const e=this;
this.oncontextmenu=(t)=>callback(e,t);
return this;
}
on_focus(callback){
if(callback==null){return this.onfocus;}
const e=this;
this.onfocus=(t)=>callback(e,t);
return this;
}
on_input(callback){
if(callback==null){return this.oninput;}
const e=this;
this.oninput=(t)=>callback(e,t);
return this;
}
on_before_input(callback){
if(callback==null){return this.onbeforeinput;}
const e=this;
this.onbeforeinput=(t)=>callback(e,t);
return this;
}
on_invalid(callback){
if(callback==null){return this.oninvalid;}
const e=this;
this.oninvalid=(t)=>callback(e,t);
return this;
}
on_reset(callback){
if(callback==null){return this.onreset;}
const e=this;
this.onreset=(t)=>callback(e,t);
return this;
}
on_search(callback){
if(callback==null){return this.onsearch;}
const e=this;
this.onsearch=(t)=>callback(e,t);
return this;
}
on_select(callback){
if(callback==null){return this.onselect;}
const e=this;
this.onselect=(t)=>callback(e,t);
return this;
}
on_submit(callback){
if(callback==null){return this.onsubmit;}
const e=this;
this.onsubmit=(t)=>callback(e,t);
return this;
}
on_key_down(callback){
if(callback==null){return this.onkeydown;}
const e=this;
this.onkeydown=(t)=>callback(e,t);
return this;
}
on_key_press(callback){
if(callback==null){return this.onkeypress;}
const e=this;
this.onkeypress=(t)=>callback(e,t);
return this;
}
on_key_up(callback){
if(callback==null){return this.onkeyup;}
const e=this;
this.onkeyup=(t)=>callback(e,t);
return this;
}
on_dbl_click(callback){
if(callback==null){return this.ondblclick;}
const e=this;
this.ondblclick=(t)=>callback(e,t);
return this;
}
on_mouse_down(callback){
if(callback==null){return this.onmousedown;}
const e=this;
this.onmousedown=(t)=>callback(e,t);
return this;
}
on_mouse_move(callback){
if(callback==null){return this.onmousemove;}
const e=this;
this.onmousemove=(t)=>callback(e,t);
return this;
}
on_mouse_out(callback){
if(callback==null){return this.onmouseout;}
const e=this;
this.onmouseout=(t)=>callback(e,t);
return this;
}
on_mouse_over(callback){
if(callback==null){return this.onmouseover;}
const e=this;
this.onmouseover=(t)=>callback(e,t);
return this;
}
on_mouse_up(callback){
if(callback==null){return this.onmouseup;}
const e=this;
this.onmouseup=(t)=>callback(e,t);
return this;
}
on_mouse_wheel(callback){
if(callback==null){return this.onmousewheel;}
const e=this;
this.onmousewheel=(t)=>callback(e,t);
return this;
}
on_wheel(callback){
if(callback==null){return this.onwheel;}
const e=this;
this.onwheel=(t)=>callback(e,t);
return this;
}
on_drag(callback){
if(callback==null){return this.ondrag;}
const e=this;
this.ondrag=(t)=>callback(e,t);
return this;
}
on_drag_end(callback){
if(callback==null){return this.ondragend;}
const e=this;
this.ondragend=(t)=>callback(e,t);
return this;
}
on_drag_enter(callback){
if(callback==null){return this.ondragenter;}
const e=this;
this.ondragenter=(t)=>callback(e,t);
return this;
}
on_drag_leave(callback){
if(callback==null){return this.ondragleave;}
const e=this;
this.ondragleave=(t)=>callback(e,t);
return this;
}
on_drag_over(callback){
if(callback==null){return this.ondragover;}
const e=this;
this.ondragover=(t)=>callback(e,t);
return this;
}
on_drag_start(callback){
if(callback==null){return this.ondragstart;}
const e=this;
this.ondragstart=(t)=>callback(e,t);
return this;
}
on_drop(callback){
if(callback==null){return this.ondrop;}
const e=this;
this.ondrop=(t)=>callback(e,t);
return this;
}
on_copy(callback){
if(callback==null){return this.oncopy;}
const e=this;
this.oncopy=(t)=>callback(e,t);
return this;
}
on_cut(callback){
if(callback==null){return this.oncut;}
const e=this;
this.oncut=(t)=>callback(e,t);
return this;
}
on_paste(callback){
if(callback==null){return this.onpaste;}
const e=this;
this.onpaste=(t)=>callback(e,t);
return this;
}
on_abort(callback){
if(callback==null){return this.onabort;}
const e=this;
this.onabort=(t)=>callback(e,t);
return this;
}
on_canplay(callback){
if(callback==null){return this.oncanplay;}
const e=this;
this.oncanplay=(t)=>callback(e,t);
return this;
}
on_canplay_through(callback){
if(callback==null){return this.oncanplaythrough;}
const e=this;
this.oncanplaythrough=(t)=>callback(e,t);
return this;
}
on_cue_change(callback){
if(callback==null){return this.oncuechange;}
const e=this;
this.oncuechange=(t)=>callback(e,t);
return this;
}
on_duration_change(callback){
if(callback==null){return this.ondurationchange;}
const e=this;
this.ondurationchange=(t)=>callback(e,t);
return this;
}
on_emptied(callback){
if(callback==null){return this.onemptied;}
const e=this;
this.onemptied=(t)=>callback(e,t);
return this;
}
on_ended(callback){
if(callback==null){return this.onended;}
const e=this;
this.onended=(t)=>callback(e,t);
return this;
}
on_error(callback){
if(callback==null){return this.onerror;}
const e=this;
this.onerror=(t)=>callback(e,t);
return this;
}
on_loaded_data(callback){
if(callback==null){return this.onloadeddata;}
const e=this;
this.onloadeddata=(t)=>callback(e,t);
return this;
}
on_loaded_metadata(callback){
if(callback==null){return this.onloadedmetadata;}
const e=this;
this.onloadedmetadata=(t)=>callback(e,t);
return this;
}
on_load_start(callback){
if(callback==null){return this.onloadstart;}
const e=this;
this.onloadstart=(t)=>callback(e,t);
return this;
}
on_pause(callback){
if(callback==null){return this.onpause;}
const e=this;
this.onpause=(t)=>callback(e,t);
return this;
}
on_play(callback){
if(callback==null){return this.onplay;}
const e=this;
this.onplay=(t)=>callback(e,t);
return this;
}
on_playing(callback){
if(callback==null){return this.onplaying;}
const e=this;
this.onplaying=(t)=>callback(e,t);
return this;
}
onprogress(callback){
if(callback==null){return this.onprogress;}
const e=this;
this.onprogress=(t)=>callback(e,t);
return this;
}
on_rate_change(callback){
if(callback==null){return this.onratechange;}
const e=this;
this.onratechange=(t)=>callback(e,t);
return this;
}
on_seeked(callback){
if(callback==null){return this.onseeked;}
const e=this;
this.onseeked=(t)=>callback(e,t);
return this;
}
on_seeking(callback){
if(callback==null){return this.onseeking;}
const e=this;
this.onseeking=(t)=>callback(e,t);
return this;
}
on_stalled(callback){
if(callback==null){return this.onstalled;}
const e=this;
this.onstalled=(t)=>callback(e,t);
return this;
}
on_suspend(callback){
if(callback==null){return this.onsuspend;}
const e=this;
this.onsuspend=(t)=>callback(e,t);
return this;
}
on_time_update(callback){
if(callback==null){return this.ontimeupdate;}
const e=this;
this.ontimeupdate=(t)=>callback(e,t);
return this;
}
on_volume_change(callback){
if(callback==null){return this.onvolumechange;}
const e=this;
this.onvolumechange=(t)=>callback(e,t);
return this;
}
on_waiting(callback){
if(callback==null){return this.onwaiting;}
const e=this;
this.onwaiting=(t)=>callback(e,t);
return this;
}
on_toggle(callback){
if(callback==null){return this.ontoggle;}
const e=this;
this.ontoggle=(t)=>callback(e,t);
return this;
}
};
customElements.define("v-base-"+type.toLowerCase(),E,{extends:tag});
return E;
};

const VElementElement=CreateVElementClass({type:"VElement",tag:"div"});
function VElement(...args){return new VElementElement(...args);}

const StyleElement=CreateVElementClass({type:"Style",tag:"style"});
function Style(...args){return new StyleElement(...args);}


class RingLoaderElement extends CreateVElementClass({
type:"RingLoader",
tag:"div",
default_style:{
"width":"80px",
"height":"80px",
"--child-background":"black",
"display":"inline-block",
"position":"relative",
},
}){
constructor(){
super();
this.update();
}
background(value){
if(value==null){return this.style["--child-background"];}
this.style["--child-background"]=value;
return this;
}
update(){
this.remove_children();
const width=parseFloat(this.style.width.replace("px",""));
const height=parseFloat(this.style.height.replace("px",""));
const background=this.style["--child-background"];
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
vweb.elements.register(RingLoaderElement);
function RingLoader(...args){return new RingLoaderElement(...args);}

const DividerElement=CreateVElementClass({
type:"Divider",
tag:"div",
default_style:{
"margin":"0px",
"padding":"0px",
"width":"100%",
"height":"1px",
"min-height":"1px",
"background":"black",
},
});
function Divider(...args){return new DividerElement(...args);}


class ScrollerElement extends CreateVElementClass({
type:"ScollerX",
tag:"div",
default_style:{
"position":"relative","margin":"0px",
"padding":"0px",
"display":"flex","overflow":"visible",
"align-content":"flex-start","flex-direction":"column",
"scroll-behavior":"smooth",
"overscroll-behavior":"none","height":"fit-content","content-visibility":"auto","align-content":"flex-start","align-items":"flex-start",
},
}){
constructor(...children){
super();
if(this.position()!="absolute"){
this.position("relative");}
this.content=VStack(...children)
.class("hide_scrollbar")
.parent(this)
.position("relative").frame("100%","100%")
.flex("1 1 0").overflow("scroll")
this.thumb=VStack()
.parent(this)
.position(0,0,null,0)
.height(30)
.border_radius(10)
.background("red")
.overflow("visible").background_color("#CCCCCC")
.opacity(0)
.transition("opacity 0.3s linear")
.box_shadow("0 0 5px #00000050")
this.track=VStack(this.thumb)
.parent(this)
.position(0,0,0,null)
.width(10)
.background_color("transparent")
.border_radius(10)
.transition("background-color 0.3s linear")
.assign("background_value","#28292E")
super.append(this.content,this.track);
this.m_delay=1000;
this.track.__background__=this.track.background;
this.track.__background_color__=this.background_color;
this.track.background=function(value){
if(value!=null){
this.__background_value__=value;
}
return this;
}
this.track.background_color=function(value){
if(value!=null){
this.__background_value__=value;
}
return this;
}
this.track.addEventListener("mouseenter",(event)=>{
this.track.style.backgroundColor=this.track.__background_value__;
clearTimeout(this.fadeout_timeout);
this.thumb.style.opacity=1;})
this.track.addEventListener("mouseleave",(event)=>{
if(!this.thumb.dragging){
this.track.style.backgroundColor="transparent";
this.thumb.style.opacity=0;}
})
this.content.addEventListener("scroll",(event)=>{
const height=this.content.clientHeight;
const thumb_height=this.thumb.clientHeight;
const scroll_height=this.content.scrollHeight;
const scroll_top=this.content.scrollTop;
let relative_top;
if(scroll_top>=scroll_height-height){
relative_top=height-thumb_height;
}else{
relative_top=height*(scroll_top/(scroll_height-height))-thumb_height/2;
if(relative_top+thumb_height>=height){
relative_top=height-thumb_height-3;
}
}
if(relative_top<0){
relative_top=0;
}
this.thumb.style.transform=`translateY(${relative_top}px)`;
clearTimeout(this.fadeout_timeout);
this.thumb.style.opacity=1;
clearTimeout(this.fadeout_timeout);
this.fadeout_timeout=setTimeout(()=>{
this.track.style.backgroundColor="transparent";this.thumb.style.opacity=0;
},this.m_delay)
})
let start_y,old_user_select;
const mouse_up_handler=(event)=>{
this.thumb.dragging=false;
this.style.userSelect=old_user_select;
document.body.removeEventListener("mouseup",mouse_up_handler);
};
this.thumb.onmousedown=(event)=>{
start_y=this.content.getBoundingClientRect().top;
old_user_select=this.content.style.userSelect;
this.style.userSelect="none";
this.thumb.dragging=true;
this.track.style.backgroundColor=this.track.__background_value__;
clearTimeout(this.fadeout_timeout);
this.thumb.style.opacity=1;
document.body.addEventListener("mouseup",mouse_up_handler);
}
this.addEventListener("mousemove",(event)=>{
if(this.thumb.dragging){
const y=Math.max(0,event.clientY-start_y);
let y_percentage=utils.round(y/this.content.clientHeight,2);const computed=window.getComputedStyle(this.content);
const max_scroll_top=(
this.content.scrollHeight-
this.content.clientHeight+
parseFloat(computed.paddingTop)+
parseFloat(computed.paddingBottom)
);
const scroll_top=Math.round(max_scroll_top*y_percentage);
this.content.scrollTop=scroll_top;
}
});
this.track.onclick=(event)=>{
const start_y=this.content.getBoundingClientRect().top;
const y=Math.max(0,event.clientY-start_y);
let y_percentage=utils.round(y/this.content.clientHeight,2);const computed=window.getComputedStyle(this.content);
const max_scroll_top=(
this.content.scrollHeight-
this.content.clientHeight+
parseFloat(computed.paddingTop)+
parseFloat(computed.paddingBottom)
);
const scroll_top=Math.round(max_scroll_top*y_percentage);
this.content.scrollTop=scroll_top;};
}
remove_children(){
this.content.remove_children();
return this;
}
append(...children){
this.content.append(...children);
return this;
}
overflow(value){
if(value==null){
return this.content.overflow();
}
this.content.overflow(value);
return this;
}
overflow_x(value){
if(value==null){
return this.content.overflow_x();
}
this.content.overflow_x(value);
return this;
}
overflow_y(value){
if(value==null){
return this.content.overflow_y();
}
this.content.overflow_y(value);
return this;
}
delay(msec){
if(msec==null){
return this.m_delay;
}
this.m_delay=msec;
return this;
}
scroll_top(value){
if(value==null){
return this.content.scrollTop;
}
this.content.scrollTop=value;
return this;
}
scroll_left(value){
if(value==null){
return this.content.scrollLeft;
}
this.content.scrollLeft=value;
return this;
}
scroll_height(){
return this.content.scrollHeight;
}
scroll_width(){
return this.content.scrollWidth;
}
on_scroll(handler){
this.content.addEventListener("scroll",handler);
return this;
}
}
vweb.elements.register(ScrollerElement);
function Scroller(...args){return new ScrollerElement(...args);}


class HStackElement extends CreateVElementClass({
type:"HStack",
tag:"div",
default_style:{
"margin":"0px",
"padding":"0px",
"overflow-x":"visible",
"overflow-y":"visible",
"display":"flex",
"flex-direction":"row",
"align-items":"flex-start","border":"0px",
},
}){
constructor(...children){
super();
this.append(...children);
}
}
vweb.elements.register(HStackElement);
function HStack(...args){return new HStackElement(...args);}

class GradientType{
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
}
function Gradient(...args){return new GradientType(...args);};

const SpacerElement=CreateVElementClass({
type:"Spacer",
tag:"div",
default_style:{
"margin":"0px",
"padding":"0px",
"flex":"1",
"flex-grow":"1",
"background":"#00000000",
"filter":"opacity(0)",
"justify-content":"stretch",
},
});
function Spacer(...args){return new SpacerElement(...args);}


class ForEachElement extends CreateVElementClass({
type:"ForEach",
tag:"section",
default_style:{
"border":"none",
"outline":"none",
"background":"transparent",
},
}){
constructor(items,func){
super();
for(let i=0;i<items.length;i++){
this.append(func(items[i]));
}
}
}
vweb.elements.register(ForEachElement);
function ForEach(...args){return new ForEachElement(...args);}


class CodeBlockElement extends CreateVElementClass({
type:"CodeBlock",
tag:"code",
default_style:{
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
},
}){
constructor(code){
super();
if(code!=null){
while(code.length>0&&code[code.length-1]=="\n"){
code=code.slice(-code.length,-1);
}
this.text(code.replaceAll("<","&lt;").replaceAll(">","&gt;"));
}
}
language(value){
this.attr("language",value);
return this;
}
line_numbers(value){
this.attr("line_numbers",value);
return this;
}
highlight(options={}){
options.element=this;
vhighlight.highlight(options);
return this;
}
}
vweb.elements.register(CodeBlockElement);
function CodeBlock(...args){return new CodeBlockElement(...args);}


class CodePreElement extends CreateVElementClass({
type:"CodePre",
tag:"pre",
default_style:{
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
},
}){
constructor(code){
super();
if(code!=null){
while(code.length>0&&code[code.length-1]=="\n"){
code=code.slice(-code.length,-1);
}
this.text(code.replaceAll("<","&lt;").replaceAll(">","&gt;"));
}
}
}
vweb.elements.register(CodePreElement);
function CodePre(...args){return new CodePreElement(...args);}


class CodeLineElement extends CreateVElementClass({
type:"CodeLine",
tag:"span",
default_style:{
"font-family":"\"Menlo\", \"Consolas\", monospace",
"font-size":"inherit",
"font-style":"italic",
"background":"#000000",
"color":"#FFFFFF",
"border-radius":"10px",
"padding":"2.5px 7.5px 2.5px 7.5px",
},
}){
constructor(text,href){
super();
this.text(text);
}
}
vweb.elements.register(CodeLineElement);
function CodeLine(...args){return new CodeLineElement(...args);}


class LinkElement extends CreateVElementClass({
type:"Link",
tag:"a",
default_style:{
"font-family":"inherit",
"color":"rgb(85, 108, 214)",
"text-decoration":"underline",
"text-underline-position":"auto",
"cursor":"pointer",
},
}){
constructor(text,href){
super();
this.text(text);
this.href(href);
}
}
vweb.elements.register(LinkElement);
function Link(...args){return new LinkElement(...args);}


class VStackElement extends CreateVElementClass({
type:"VStack",
tag:"div",
default_style:{
"margin":"0px",
"padding":"0px",
"display":"flex","overflow":"visible",
"align-content":"flex-start","flex-direction":"column",
},
}){
constructor(...children){
super();
this.append(...children);
}
}
vweb.elements.register(VStackElement);
function VStack(...args){return new VStackElement(...args);}


class ZStackElement extends CreateVElementClass({
type:"ZStack",
tag:"div",
default_style:{
"margin":"0px",
"padding":"0px",
"display":"grid",
},
}){
constructor(...children){
super();
this.zstack_append(...children);
}
append(...children){
return this.zstack_append(...children);
}
}
vweb.elements.register(ZStackElement);
function ZStack(...args){return new ZStackElement(...args);}


class TitleElement extends CreateVElementClass({
type:"Title",
tag:"h1",
default_style:{
"margin":"0px 0px 0px 0px",
"color":"inherit",
"white-space":"wrap",
"text-align":"inherit",
},
}){
static default_style={
};
constructor(text){
super();
this.inner_html(text);
}
}
vweb.elements.register(TitleElement);
function Title(...args){return new TitleElement(...args);}


class IfElement extends CreateVElementClass({
type:"If",
tag:"section",
}){
constructor(...args){
super();
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
vweb.elements.register(IfElement);
function If(...args){return new IfElement(...args);}


class CanvasElement extends CreateVElementClass({
type:"Canvas",
tag:"canvas",
}){
constructor(){
super();
this.ctx_2d=this.getContext("2d");
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
if(!(gradient instanceof GradientType)){
console.error("Invalid usage, parameter \"gradient\" should be type \"GradientType\".");
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
if(fill instanceof GradientType){
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
if(dots.color instanceof GradientType){
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
this.ctx_2d.clearRect(0,0,this.width,this.height);
return this;
}
}
vweb.elements.register(CanvasElement);
function Canvas(...args){return new CanvasElement(...args);};


class ImageElement extends CreateVElementClass({
type:"Image",
tag:"img",
default_style:{
"margin":"0px",
"padding":"0px",
"object-fit":"cover",
},
}){
constructor(src){
super();
this.src(src);
}
}
vweb.elements.register(ImageElement);
function Image(...args){return new ImageElement(...args);}


class ImageMaskElement extends CreateVElementClass({
type:"ImageMask",
tag:"div",
default_style:{
"margin":"0px",
"padding":"0px",
"object-fit":"cover",
"display":"inline-block",
},
}){
constructor(src){
super();
this.append(
new VStack()
.width("100%")
.height("100%")
.background("black")
.mask("url('"+src+"') no-repeat center/contain")
);
this.src(src);
}
mask_color(value){
this.firstChild.style.background=value;
return this;
}
src(value){
this.firstChild.style.mask="url('"+value+"') no-repeat center/contain";
return this;
}
mask(value){
this.firstChild.style.mask=value;
return this;
}
}
vweb.elements.register(ImageMaskElement);
function ImageMask(...args){return new ImageMaskElement(...args);}
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


class SpanElement extends CreateVElementClass({
type:"Span",
tag:"span",
default_style:{},
}){
constructor(inner_html){
super();
this.inner_html(inner_html);
}
}
vweb.elements.register(SpanElement);
function Span(...args){return new SpanElement(...args);}


class ButtonElement extends CreateVElementClass({
type:"Button",
tag:"a",
default_style:{
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
},
default_events:{
"onmousedown":function(){this.style.filter="brightness(80%)";},
"onmouseover":function(){this.style.filter="brightness(90%)";},
"onmouseup":function(){this.style.filter="brightness(100%)";},
"onmouseout":function(){this.style.filter="brightness(100%)";},
},
}){
constructor(text){
super();
this.inner_html(text);
}
}
vweb.elements.register(ButtonElement);
function Button(...args){return new ButtonElement(...args);}


class BorderButtonElement extends CreateVElementClass({
type:"BorderButton",
tag:"a",
default_style:{
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
},
default_events:{
"onmousedown":function(){this.style.filter="brightness(80%)";},
"onmouseover":function(){this.style.filter="brightness(90%)";},
"onmouseup":function(){this.style.filter="brightness(100%)";},
"onmouseout":function(){this.style.filter="brightness(100%)";},
},
}){
constructor(text){
super();
this.border_e=VElement()
.content("")
.position("absolute")
.z_index(-1)
.inset(0)
.padding(BorderButtonElement.default_style["--child-border-width"])
.border_radius(BorderButtonElement.default_style["--child-border-radius"])
.background(BorderButtonElement.default_style["--child-background"])
.mask("linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)")
.mask_composite("exclude")
.styles({
"-webkit-mask":"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
"-webkit-mask-composite":"exclude",})
this.text_e=VElement()
.color(BorderButtonElement.default_style["--child-color"])
.append(text);
if(BorderButtonElement.default_style["--child-color"]=="transparent"){
this.text_e.style.backgroundImage=BorderButtonElement.default_style["--child-background-image"];
this.text_e.style.backgroundClip=BorderButtonElement.default_style["--child-background-clip"];
this.text_e.style["-webkit-background-clip"]=BorderButtonElement.default_style["--child-webkit-background-clip"];
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
styles(style_dict){
if(style_dict==null){
let styles=super.styles(null);
styles["--child-background"]=this.border_e.background();
styles["--child-border-width"]=this.border_e.padding();
styles["--child-border-radius"]=this.border_e.border_radius();
styles["--child-color"]=this.text_e.color();
styles["--child-background-image"]=this.text_e.style.backgroundImage;
styles["--child-background-clip"]=this.text_e.style.backgroundClip;
styles["--child-webkit-background-clip"]=this.text_e.style["-webkit-background-clip"];
return styles;
}else{
return super.styles(style_dict);
}
}
}
vweb.elements.register(BorderButtonElement);
function BorderButton(...args){return new BorderButtonElement(...args);}


class LoaderButtonElement extends HStackElement{
static default_style=Object.assign({},HStackElement.default_style,{
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
});
constructor(text="",loader=RingLoader()){
super();
this.styles(LoaderButtonElement.default_style);
this.wrap(false);
this.center();
this.center_vertical()
this.loader=loader
.frame(LoaderButtonElement.default_style["--loader-width"],LoaderButtonElement.default_style["--loader-height"])
.margin_right(LoaderButtonElement.default_style["--loader-margin-right"])
.margin_top(LoaderButtonElement.default_style["--loader-margin-top"])
.background(THEME.button_txt)
.update()
.hide();
this.loader.parent(this);
this.text_e=VElement().text(text)
.margin(0)
.padding(0);
this.text_e.parent(this);
this.padding_e=new VStack()
.padding(0)
.margin(0)
.frame(25,1);
this.padding_e.parent(this);
this.append(this.loader,this.text_e);
}
show_loader(){
this.padding_e.frame(this.loader.style.width);
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
styles(style_dict){
if(style_dict==null){
let styles=super.styles();
styles["--loader-width"]=this.loader.style.width;
styles["--loader-height"]=this.loader.style.height;
styles["--loader-margin-right"]=this.loader.margin_right();
styles["--loader-margin-top"]=this.loader.margin_top();
return styles;
}else{
return super.styles(style_dict);
}
}
set_default(){
return super.set_default(LoaderButtonElement);
}
}
vweb.elements.register(LoaderButtonElement);
function LoaderButton(...args){return new LoaderButtonElement(...args);}


class ViewElement extends CreateVElementClass({
type:"View",
tag:"div",
default_style:{
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
"display":"flex","align-content":"flex-start","flex-direction":"column",
},
}){
constructor(...children){
super();
this.append(...children);
}
}
vweb.elements.register(ViewElement);
function View(...args){return new ViewElement(...args);}


class GoogleMapElement extends CreateVElementClass({
type:"GoogleMap",
tag:"iframe",
default_style:{
"border":"0",
},
default_attributes:{
"width":"100%",
"height":"100%",
"frameborder":"0",
"style":"border:0",
"referrerpolicy":"no-referrer-when-downgrade",
"allowfullscreen":"true",
},
}){
constructor(location,mode="place"){
super();
this.src("https://www.google.com/maps/embed/v1/"+mode+"?key="+google_cloud_api_key+"&"+vweb.utils.url_encode({"q":location.replaceAll(' ','+')}));
}
update(){
this.remove_children();
const children_style={
"width":"calc("+this.style.width+" * (64.0px / 80.0px))",
"height":"calc("+this.style.height+" * (64.0px / 80.0px))",
"margin":"calc("+this.style.width+" * (8.0px / 80.0px))",
"border":"calc("+this.style.width+" * (8.0px / 80.0px)) solid "+this.style.background,
"border-color":this.style.background+" transparent transparent transparent",
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
vweb.elements.register(GoogleMapElement);
function GoogleMap(...args){return new GoogleMapElement(...args);}


class TextElement extends CreateVElementClass({
type:"Text",
tag:"p",
default_style:{
"margin":"0px 0px 0px 0px",
"padding":"2.5px",
"padding":"2.5px",
"font-size":"20px",
"color":"inherit",
"text-align":"inherit",
"white-space":"wrap",
},
}){
constructor(text){
super();
this.inner_html(text);
}
}
vweb.elements.register(TextElement);
function Text(...args){return new TextElement(...args);}


class InputElement extends CreateVElementClass({
type:"Input",
tag:"input",
default_style:{
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
},
}){
constructor(placeholder){
super();
this.type("text");
this.placeholder(placeholder);
}
}
vweb.elements.register(InputElement);
function Input(...args){return new InputElement(...args);}


class PasswordInputElement extends CreateVElementClass({
type:"PasswordInput",
tag:"input",
default_style:{
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
},
}){
constructor(placeholder){
super();
this.type("password");
this.placeholder(placeholder);
}
}
vweb.elements.register(PasswordInputElement);
function PasswordInput(...args){return new PasswordInputElement(...args);}


class EmailInputElement extends CreateVElementClass({
type:"EmailInput",
tag:"input",
default_style:{
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
},
}){
constructor(placeholder){
super();
this.type("email");
this.placeholder(placeholder);
}
}
vweb.elements.register(EmailInputElement);
function EmailInput(...args){return new EmailInputElement(...args);}


class PhoneNumberInputElement extends CreateVElementClass({
type:"PhoneNumberInput",
tag:"input",
default_style:{
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
},
}){
constructor(placeholder){
super();
this.type("tel");
this.placeholder(placeholder);
}
}
vweb.elements.register(PhoneNumberInputElement);
function PhoneNumberInput(...args){return new PhoneNumberInputElement(...args);}


class InputBoxElement extends CreateVElementClass({
type:"InputBox",
tag:"textarea",
default_style:{
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
},
}){
constructor(placeholder){
super();
this.placeholder(placeholder);
}
}
vweb.elements.register(InputBoxElement);
function InputBox(...args){return new InputBoxElement(...args);}


class SelectOptionInputElement extends CreateVElementClass({
type:"SelectOptionInput",
tag:"select",
default_style:{
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
},
}){
constructor(placeholder){
super();
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
vweb.elements.register(SelectOptionInputElement);
function SelectOptionInput(...args){return new SelectOptionInputElement(...args);}!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={})}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,i=286,n=30,s=15,r=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),o=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);e(d);const _=new Array(60);e(_);const f=new Array(512);e(f);const c=new Array(256);e(c);const u=new Array(29);e(u);const w=new Array(n);function m(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}let b,g,p;function k(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(w);const v=t=>t<256?f[t]:f[256+(t>>>7)],y=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},x=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,y(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},z=(t,e,a)=>{x(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const i=new Array(16);let n,r,o=0;for(n=1;n<=s;n++)o=o+a[n-1]<<1,i[n]=o;for(r=0;r<=e;r++){let e=t[2*r+1];0!==e&&(t[2*r]=A(i[e]++,e))}},R=t=>{let e;for(e=0;e<i;e++)t.dyn_ltree[2*e]=0;for(e=0;e<n;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.sym_next=t.matches=0},Z=t=>{t.bi_valid>8?y(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},U=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},S=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&U(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!U(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i},D=(t,e,i)=>{let n,s,l,h,d=0;if(0!==t.sym_next)do{n=255&t.pending_buf[t.sym_buf+d++],n+=(255&t.pending_buf[t.sym_buf+d++])<<8,s=t.pending_buf[t.sym_buf+d++],0===n?z(t,s,e):(l=c[s],z(t,l+a+1,e),h=r[l],0!==h&&(s-=u[l],x(t,s,h)),n--,l=v(n),z(t,l,i),h=o[l],0!==h&&(n-=w[l],x(t,n,h)))}while(d<t.sym_next);z(t,256,e)},T=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,r=e.stat_desc.elems;let o,l,h,d=-1;for(t.heap_len=0,t.heap_max=573,o=0;o<r;o++)0!==a[2*o]?(t.heap[++t.heap_len]=d=o,t.depth[o]=0):a[2*o+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=d<2?++d:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,n&&(t.static_len-=i[2*h+1]);for(e.max_code=d,o=t.heap_len>>1;o>=1;o--)S(t,a,o);h=r;do{o=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),l=t.heap[1],t.heap[--t.heap_max]=o,t.heap[--t.heap_max]=l,a[2*h]=a[2*o]+a[2*l],t.depth[h]=(t.depth[o]>=t.depth[l]?t.depth[o]:t.depth[l])+1,a[2*o+1]=a[2*l+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,o=e.stat_desc.extra_bits,l=e.stat_desc.extra_base,h=e.stat_desc.max_length;let d,_,f,c,u,w,m=0;for(c=0;c<=s;c++)t.bl_count[c]=0;for(a[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=a[2*a[2*_+1]+1]+1,c>h&&(c=h,m++),a[2*_+1]=c,_>i||(t.bl_count[c]++,u=0,_>=l&&(u=o[_-l]),w=a[2*_],t.opt_len+=w*(c+u),r&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==m){do{for(c=h-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[h]--,m-=2}while(m>0);for(c=h;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>i||(a[2*f+1]!==c&&(t.opt_len+=(c-a[2*f+1])*a[2*f],a[2*f+1]=c),_--)}})(t,e),E(a,d,t.bl_count)},O=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++o<l&&n===r||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):o<=10?t.bl_tree[34]++:t.bl_tree[36]++,o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4))},I=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++o<l&&n===r)){if(o<h)do{z(t,n,t.bl_tree)}while(0!=--o);else 0!==n?(n!==s&&(z(t,n,t.bl_tree),o--),z(t,16,t.bl_tree),x(t,o-3,2)):o<=10?(z(t,17,t.bl_tree),x(t,o-3,3)):(z(t,18,t.bl_tree),x(t,o-11,7));o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4)}};let F=!1;const L=(t,e,a,i)=>{x(t,0+(i?1:0),3),Z(t),y(t,a),y(t,~a),a&&t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a};var N=(t,e,i,n)=>{let s,r,o=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),T(t,t.l_desc),T(t,t.d_desc),o=(t=>{let e;for(O(t,t.dyn_ltree,t.l_desc.max_code),O(t,t.dyn_dtree,t.d_desc.max_code),T(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),s=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=s&&(s=r)):s=r=i+5,i+4<=s&&-1!==e?L(t,e,i,n):4===t.strategy||r===s?(x(t,2+(n?1:0),3),D(t,d,_)):(x(t,4+(n?1:0),3),((t,e,a,i)=>{let n;for(x(t,e-257,5),x(t,a-1,5),x(t,i-4,4),n=0;n<i;n++)x(t,t.bl_tree[2*h[n]+1],3);I(t,t.dyn_ltree,e-1),I(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,o+1),D(t,t.dyn_ltree,t.dyn_dtree)),R(t),n&&Z(t)},B={_tr_init:t=>{F||((()=>{let t,e,a,h,k;const v=new Array(16);for(a=0,h=0;h<28;h++)for(u[h]=a,t=0;t<1<<r[h];t++)c[a++]=h;for(c[a-1]=h,k=0,h=0;h<16;h++)for(w[h]=k,t=0;t<1<<o[h];t++)f[k++]=h;for(k>>=7;h<n;h++)for(w[h]=k<<7,t=0;t<1<<o[h]-7;t++)f[256+k++]=h;for(e=0;e<=s;e++)v[e]=0;for(t=0;t<=143;)d[2*t+1]=8,t++,v[8]++;for(;t<=255;)d[2*t+1]=9,t++,v[9]++;for(;t<=279;)d[2*t+1]=7,t++,v[7]++;for(;t<=287;)d[2*t+1]=8,t++,v[8]++;for(E(d,287,v),t=0;t<n;t++)_[2*t+1]=5,_[2*t]=A(t,5);b=new m(d,r,257,i,s),g=new m(_,o,0,n,s),p=new m(new Array(0),l,0,19,7)})(),F=!0),t.l_desc=new k(t.dyn_ltree,b),t.d_desc=new k(t.dyn_dtree,g),t.bl_desc=new k(t.bl_tree,p),t.bi_buf=0,t.bi_valid=0,R(t)},_tr_stored_block:L,_tr_flush_block:N,_tr_tally:(t,e,i)=>(t.pending_buf[t.sym_buf+t.sym_next++]=e,t.pending_buf[t.sym_buf+t.sym_next++]=e>>8,t.pending_buf[t.sym_buf+t.sym_next++]=i,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(c[i]+a+1)]++,t.dyn_dtree[2*v(e)]++),t.sym_next===t.sym_end),_tr_align:t=>{x(t,2,3),z(t,256,d),(t=>{16===t.bi_valid?(y(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var C=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const M=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var H=(t,e,a,i)=>{const n=M,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},j={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},K={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:P,_tr_stored_block:Y,_tr_flush_block:G,_tr_tally:X,_tr_align:W}=B,{Z_NO_FLUSH:q,Z_PARTIAL_FLUSH:J,Z_FULL_FLUSH:Q,Z_FINISH:V,Z_BLOCK:$,Z_OK:tt,Z_STREAM_END:et,Z_STREAM_ERROR:at,Z_DATA_ERROR:it,Z_BUF_ERROR:nt,Z_DEFAULT_COMPRESSION:st,Z_FILTERED:rt,Z_HUFFMAN_ONLY:ot,Z_RLE:lt,Z_FIXED:ht,Z_DEFAULT_STRATEGY:dt,Z_UNKNOWN:_t,Z_DEFLATED:ft}=K,ct=258,ut=262,wt=42,mt=113,bt=666,gt=(t,e)=>(t.msg=j[e],e),pt=t=>2*t-(t>4?9:0),kt=t=>{let e=t.length;for(;--e>=0;)t[e]=0},vt=t=>{let e,a,i,n=t.w_size;e=t.hash_size,i=e;do{a=t.head[--i],t.head[i]=a>=n?a-n:0}while(--e);e=n,i=e;do{a=t.prev[--i],t.prev[i]=a>=n?a-n:0}while(--e)};let yt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const xt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},zt=(t,e)=>{G(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,xt(t.strm)},At=(t,e)=>{t.pending_buf[t.pending++]=e},Et=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Rt=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=C(t.adler,e,n,a):2===t.state.wrap&&(t.adler=H(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},Zt=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,o=t.nice_match;const l=t.strstart>t.w_size-ut?t.strstart-(t.w_size-ut):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+ct;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=ct-(f-s),s=f-ct,i>r){if(t.match_start=e,r=i,i>=o)break;c=h[s+r-1],u=h[s+r]}}}while((e=_[e&d])>l&&0!=--n);return r<=t.lookahead?r:t.lookahead},Ut=t=>{const e=t.w_size;let a,i,n;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ut)&&(t.window.set(t.window.subarray(e,e+e-i),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,t.insert>t.strstart&&(t.insert=t.strstart),vt(t),i+=e),0===t.strm.avail_in)break;if(a=Rt(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=a,t.lookahead+t.insert>=3)for(n=t.strstart-t.insert,t.ins_h=t.window[n],t.ins_h=yt(t,t.ins_h,t.window[n+1]);t.insert&&(t.ins_h=yt(t,t.ins_h,t.window[n+3-1]),t.prev[n&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=n,n++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ut&&0!==t.strm.avail_in)},St=(t,e)=>{let a,i,n,s=t.pending_buf_size-5>t.w_size?t.w_size:t.pending_buf_size-5,r=0,o=t.strm.avail_in;do{if(a=65535,n=t.bi_valid+42>>3,t.strm.avail_out<n)break;if(n=t.strm.avail_out-n,i=t.strstart-t.block_start,a>i+t.strm.avail_in&&(a=i+t.strm.avail_in),a>n&&(a=n),a<s&&(0===a&&e!==V||e===q||a!==i+t.strm.avail_in))break;r=e===V&&a===i+t.strm.avail_in?1:0,Y(t,0,0,r),t.pending_buf[t.pending-4]=a,t.pending_buf[t.pending-3]=a>>8,t.pending_buf[t.pending-2]=~a,t.pending_buf[t.pending-1]=~a>>8,xt(t.strm),i&&(i>a&&(i=a),t.strm.output.set(t.window.subarray(t.block_start,t.block_start+i),t.strm.next_out),t.strm.next_out+=i,t.strm.avail_out-=i,t.strm.total_out+=i,t.block_start+=i,a-=i),a&&(Rt(t.strm,t.strm.output,t.strm.next_out,a),t.strm.next_out+=a,t.strm.avail_out-=a,t.strm.total_out+=a)}while(0===r);return o-=t.strm.avail_in,o&&(o>=t.w_size?(t.matches=2,t.window.set(t.strm.input.subarray(t.strm.next_in-t.w_size,t.strm.next_in),0),t.strstart=t.w_size,t.insert=t.strstart):(t.window_size-t.strstart<=o&&(t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,t.insert>t.strstart&&(t.insert=t.strstart)),t.window.set(t.strm.input.subarray(t.strm.next_in-o,t.strm.next_in),t.strstart),t.strstart+=o,t.insert+=o>t.w_size-t.insert?t.w_size-t.insert:o),t.block_start=t.strstart),t.high_water<t.strstart&&(t.high_water=t.strstart),r?4:e!==q&&e!==V&&0===t.strm.avail_in&&t.strstart===t.block_start?2:(n=t.window_size-t.strstart,t.strm.avail_in>n&&t.block_start>=t.w_size&&(t.block_start-=t.w_size,t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,n+=t.w_size,t.insert>t.strstart&&(t.insert=t.strstart)),n>t.strm.avail_in&&(n=t.strm.avail_in),n&&(Rt(t.strm,t.window,t.strstart,n),t.strstart+=n,t.insert+=n>t.w_size-t.insert?t.w_size-t.insert:n),t.high_water<t.strstart&&(t.high_water=t.strstart),n=t.bi_valid+42>>3,n=t.pending_buf_size-n>65535?65535:t.pending_buf_size-n,s=n>t.w_size?t.w_size:n,i=t.strstart-t.block_start,(i>=s||(i||e===V)&&e!==q&&0===t.strm.avail_in&&i<=n)&&(a=i>n?n:i,r=e===V&&0===t.strm.avail_in&&a===i?1:0,Y(t,t.block_start,a,r),t.block_start+=a,xt(t.strm)),r?3:1)},Dt=(t,e)=>{let a,i;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a)),t.match_length>=3)if(i=X(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=yt(t,t.ins_h,t.window[t.strstart+1]);else i=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2},Tt=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a),t.match_length<=5&&(t.strategy===rt||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=X(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(zt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=X(t,0,t.window[t.strstart-1]),i&&zt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=X(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2};function Ot(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}const It=[new Ot(0,0,0,0,St),new Ot(4,4,8,4,Dt),new Ot(4,5,16,8,Dt),new Ot(4,6,32,32,Dt),new Ot(4,4,16,16,Tt),new Ot(8,16,32,32,Tt),new Ot(8,16,128,128,Tt),new Ot(8,32,128,256,Tt),new Ot(32,128,258,1024,Tt),new Ot(32,258,258,4096,Tt)];function Ft(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ft,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),kt(this.dyn_ltree),kt(this.dyn_dtree),kt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),kt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),kt(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Lt=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.status!==wt&&57!==e.status&&69!==e.status&&73!==e.status&&91!==e.status&&103!==e.status&&e.status!==mt&&e.status!==bt?1:0},Nt=t=>{if(Lt(t))return gt(t,at);t.total_in=t.total_out=0,t.data_type=_t;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=2===e.wrap?57:e.wrap?wt:mt,t.adler=2===e.wrap?0:1,e.last_flush=-2,P(e),tt},Bt=t=>{const e=Nt(t);var a;return e===tt&&((a=t.state).window_size=2*a.w_size,kt(a.head),a.max_lazy_match=It[a.level].max_lazy,a.good_match=It[a.level].good_length,a.nice_match=It[a.level].nice_length,a.max_chain_length=It[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ct=(t,e,a,i,n,s)=>{if(!t)return at;let r=1;if(e===st&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==ft||i<8||i>15||e<0||e>9||s<0||s>ht||8===i&&1!==r)return gt(t,at);8===i&&(i=9);const o=new Ft;return t.state=o,o.strm=t,o.status=wt,o.wrap=r,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.sym_buf=o.lit_bufsize,o.sym_end=3*(o.lit_bufsize-1),o.level=e,o.strategy=s,o.method=a,Bt(t)};var Mt={deflateInit:(t,e)=>Ct(t,e,ft,15,8,dt),deflateInit2:Ct,deflateReset:Bt,deflateResetKeep:Nt,deflateSetHeader:(t,e)=>Lt(t)||2!==t.state.wrap?at:(t.state.gzhead=e,tt),deflate:(t,e)=>{if(Lt(t)||e>$||e<0)return t?gt(t,at):at;const a=t.state;if(!t.output||0!==t.avail_in&&!t.input||a.status===bt&&e!==V)return gt(t,0===t.avail_out?nt:at);const i=a.last_flush;if(a.last_flush=e,0!==a.pending){if(xt(t),0===t.avail_out)return a.last_flush=-1,tt}else if(0===t.avail_in&&pt(e)<=pt(i)&&e!==V)return gt(t,nt);if(a.status===bt&&0!==t.avail_in)return gt(t,nt);if(a.status===wt&&0===a.wrap&&(a.status=mt),a.status===wt){let e=ft+(a.w_bits-8<<4)<<8,i=-1;if(i=a.strategy>=ot||a.level<2?0:a.level<6?1:6===a.level?2:3,e|=i<<6,0!==a.strstart&&(e|=32),e+=31-e%31,Et(a,e),0!==a.strstart&&(Et(a,t.adler>>>16),Et(a,65535&t.adler)),t.adler=1,a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(57===a.status)if(t.adler=0,At(a,31),At(a,139),At(a,8),a.gzhead)At(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(a.gzhead.extra?4:0)+(a.gzhead.name?8:0)+(a.gzhead.comment?16:0)),At(a,255&a.gzhead.time),At(a,a.gzhead.time>>8&255),At(a,a.gzhead.time>>16&255),At(a,a.gzhead.time>>24&255),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,255&a.gzhead.os),a.gzhead.extra&&a.gzhead.extra.length&&(At(a,255&a.gzhead.extra.length),At(a,a.gzhead.extra.length>>8&255)),a.gzhead.hcrc&&(t.adler=H(t.adler,a.pending_buf,a.pending,0)),a.gzindex=0,a.status=69;else if(At(a,0),At(a,0),At(a,0),At(a,0),At(a,0),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,3),a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt;if(69===a.status){if(a.gzhead.extra){let e=a.pending,i=(65535&a.gzhead.extra.length)-a.gzindex;for(;a.pending+i>a.pending_buf_size;){let n=a.pending_buf_size-a.pending;if(a.pending_buf.set(a.gzhead.extra.subarray(a.gzindex,a.gzindex+n),a.pending),a.pending=a.pending_buf_size,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex+=n,xt(t),0!==a.pending)return a.last_flush=-1,tt;e=0,i-=n}let n=new Uint8Array(a.gzhead.extra);a.pending_buf.set(n.subarray(a.gzindex,a.gzindex+i),a.pending),a.pending+=i,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex=0}a.status=73}if(73===a.status){if(a.gzhead.name){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.name.length?255&a.gzhead.name.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),a.gzindex=0}a.status=91}if(91===a.status){if(a.gzhead.comment){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.comment.length?255&a.gzhead.comment.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i))}a.status=103}if(103===a.status){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size&&(xt(t),0!==a.pending))return a.last_flush=-1,tt;At(a,255&t.adler),At(a,t.adler>>8&255),t.adler=0}if(a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(0!==t.avail_in||0!==a.lookahead||e!==q&&a.status!==bt){let i=0===a.level?St(a,e):a.strategy===ot?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Ut(t),0===t.lookahead)){if(e===q)return 1;break}if(t.match_length=0,a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):a.strategy===lt?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=ct){if(Ut(t),t.lookahead<=ct&&e===q)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+ct;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=ct-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=X(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):It[a.level].func(a,e);if(3!==i&&4!==i||(a.status=bt),1===i||3===i)return 0===t.avail_out&&(a.last_flush=-1),tt;if(2===i&&(e===J?W(a):e!==$&&(Y(a,0,0,!1),e===Q&&(kt(a.head),0===a.lookahead&&(a.strstart=0,a.block_start=0,a.insert=0))),xt(t),0===t.avail_out))return a.last_flush=-1,tt}return e!==V?tt:a.wrap<=0?et:(2===a.wrap?(At(a,255&t.adler),At(a,t.adler>>8&255),At(a,t.adler>>16&255),At(a,t.adler>>24&255),At(a,255&t.total_in),At(a,t.total_in>>8&255),At(a,t.total_in>>16&255),At(a,t.total_in>>24&255)):(Et(a,t.adler>>>16),Et(a,65535&t.adler)),xt(t),a.wrap>0&&(a.wrap=-a.wrap),0!==a.pending?tt:et)},deflateEnd:t=>{if(Lt(t))return at;const e=t.state.status;return t.state=null,e===mt?gt(t,it):tt},deflateSetDictionary:(t,e)=>{let a=e.length;if(Lt(t))return at;const i=t.state,n=i.wrap;if(2===n||1===n&&i.status!==wt||i.lookahead)return at;if(1===n&&(t.adler=C(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(kt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size}const s=t.avail_in,r=t.next_in,o=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Ut(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=yt(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++}while(--e);i.strstart=t,i.lookahead=2,Ut(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=o,t.avail_in=s,i.wrap=n,tt},deflateInfo:"pako deflate (from Nodeca project)"};const Ht=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var jt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Ht(a,e)&&(t[e]=a[e])}}return t},Kt=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length}return a};let Pt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Pt=!1}const Yt=new Uint8Array(256);for(let t=0;t<256;t++)Yt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Yt[254]=Yt[254]=1;var Gt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,i,n,s,r=t.length,o=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),o+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(o),s=0,n=0;s<o;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},Xt=(t,e)=>{const a=e||t.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(t.subarray(0,e));let i,n;const s=new Array(2*a);for(n=0,i=0;i<a;){let e=t[i++];if(e<128){s[n++]=e;continue}let r=Yt[e];if(r>4)s[n++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<a;)e=e<<6|63&t[i++],r--;r>1?s[n++]=65533:e<65536?s[n++]=e:(e-=65536,s[n++]=55296|e>>10&1023,s[n++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Pt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,n)},Wt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Yt[t[a]]>e?a:e};var qt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Jt=Object.prototype.toString,{Z_NO_FLUSH:Qt,Z_SYNC_FLUSH:Vt,Z_FULL_FLUSH:$t,Z_FINISH:te,Z_OK:ee,Z_STREAM_END:ae,Z_DEFAULT_COMPRESSION:ie,Z_DEFAULT_STRATEGY:ne,Z_DEFLATED:se}=K;function re(t){this.options=jt({level:ie,method:se,chunkSize:16384,windowBits:15,memLevel:8,strategy:ne},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=Mt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==ee)throw new Error(j[a]);if(e.header&&Mt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Gt(e.dictionary):"[object ArrayBuffer]"===Jt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Mt.deflateSetDictionary(this.strm,t),a!==ee)throw new Error(j[a]);this._dict_set=!0}}function oe(t,e){const a=new re(e);if(a.push(t,!0),a.err)throw a.msg||j[a.err];return a.result}re.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?te:Qt,"string"==typeof t?a.input=Gt(t):"[object ArrayBuffer]"===Jt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===Vt||s===$t)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=Mt.deflate(a,s),n===ae)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=Mt.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===ee;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},re.prototype.onData=function(t){this.chunks.push(t)},re.prototype.onEnd=function(t){t===ee&&(this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var le={Deflate:re,deflate:oe,deflateRaw:function(t,e){return(e=e||{}).raw=!0,oe(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,oe(t,e)},constants:K};const he=16209;var de=function(t,e){let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),o=E.dmax,l=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,m=(1<<E.lenbits)-1,b=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=u[f&m];e:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,0===p)A[n++]=65535&g;else{if(!(16&p)){if(0==(64&p)){g=u[(65535&g)+(f&(1<<p)-1)];continue e}if(32&p){E.mode=16191;break t}t.msg="invalid literal/length code",E.mode=he;break t}k=65535&g,p&=15,p&&(c<p&&(f+=z[a++]<<c,c+=8),k+=f&(1<<p)-1,f>>>=p,c-=p),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=w[f&b];a:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,!(16&p)){if(0==(64&p)){g=w[(65535&g)+(f&(1<<p)-1)];continue a}t.msg="invalid distance code",E.mode=he;break t}if(v=65535&g,p&=15,c<p&&(f+=z[a++]<<c,c+=8,c<p&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<p)-1,v>o){t.msg="invalid distance too far back",E.mode=he;break t}if(f>>>=p,c-=p,p=n-s,v>p){if(p=v-p,p>h&&E.sane){t.msg="invalid distance too far back",E.mode=he;break t}if(y=0,x=_,0===d){if(y+=l-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}else if(d<p){if(y+=l+d-p,p-=d,p<k){k-=p;do{A[n++]=_[y++]}while(--p);if(y=0,d<k){p=d,k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}}else if(y+=d-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]))}else{y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]))}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c};const _e=15,fe=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),ce=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),ue=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),we=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var me=(t,e,a,i,n,s,r,o)=>{const l=o.bits;let h,d,_,f,c,u,w=0,m=0,b=0,g=0,p=0,k=0,v=0,y=0,x=0,z=0,A=null;const E=new Uint16Array(16),R=new Uint16Array(16);let Z,U,S,D=null;for(w=0;w<=_e;w++)E[w]=0;for(m=0;m<i;m++)E[e[a+m]]++;for(p=l,g=_e;g>=1&&0===E[g];g--);if(p>g&&(p=g),0===g)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(b=1;b<g&&0===E[b];b++);for(p<b&&(p=b),y=1,w=1;w<=_e;w++)if(y<<=1,y-=E[w],y<0)return-1;if(y>0&&(0===t||1!==g))return-1;for(R[1]=0,w=1;w<_e;w++)R[w+1]=R[w]+E[w];for(m=0;m<i;m++)0!==e[a+m]&&(r[R[e[a+m]]++]=m);if(0===t?(A=D=r,u=20):1===t?(A=fe,D=ce,u=257):(A=ue,D=we,u=0),z=0,m=0,w=b,c=s,k=p,v=0,_=-1,x=1<<p,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){Z=w-v,r[m]+1<u?(U=0,S=r[m]):r[m]>=u?(U=D[r[m]-u],S=A[r[m]-u]):(U=96,S=0),h=1<<w-v,d=1<<k,b=d;do{d-=h,n[c+(z>>v)+d]=Z<<24|U<<16|S|0}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,m++,0==--E[w]){if(w===g)break;w=e[a+r[m]]}if(w>p&&(z&f)!==_){for(0===v&&(v=p),c+=b,k=w-v,y=1<<k;k+v<g&&(y-=E[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=p<<24|k<<16|c-s|0}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),o.bits=p,0};const{Z_FINISH:be,Z_BLOCK:ge,Z_TREES:pe,Z_OK:ke,Z_STREAM_END:ve,Z_NEED_DICT:ye,Z_STREAM_ERROR:xe,Z_DATA_ERROR:ze,Z_MEM_ERROR:Ae,Z_BUF_ERROR:Ee,Z_DEFLATED:Re}=K,Ze=16180,Ue=16190,Se=16191,De=16192,Te=16194,Oe=16199,Ie=16200,Fe=16206,Le=16209,Ne=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Be(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Ce=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.mode<Ze||e.mode>16211?1:0},Me=t=>{if(Ce(t))return xe;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=Ze,e.last=0,e.havedict=0,e.flags=-1,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,ke},He=t=>{if(Ce(t))return xe;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Me(t)},je=(t,e)=>{let a;if(Ce(t))return xe;const i=t.state;return e<0?(a=0,e=-e):(a=5+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?xe:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,He(t))},Ke=(t,e)=>{if(!t)return xe;const a=new Be;t.state=a,a.strm=t,a.window=null,a.mode=Ze;const i=je(t,e);return i!==ke&&(t.state=null),i};let Pe,Ye,Ge=!0;const Xe=t=>{if(Ge){Pe=new Int32Array(512),Ye=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(me(1,t.lens,0,288,Pe,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;me(2,t.lens,0,32,Ye,0,t.work,{bits:5}),Ge=!1}t.lencode=Pe,t.lenbits=9,t.distcode=Ye,t.distbits=5},We=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var qe={inflateReset:He,inflateReset2:je,inflateResetKeep:Me,inflateInit:t=>Ke(t,15),inflateInit2:Ke,inflate:(t,e)=>{let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(Ce(t)||!t.output||!t.input&&0!==t.avail_in)return xe;a=t.state,a.mode===Se&&(a.mode=De),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,_=o,f=l,x=ke;t:for(;;)switch(a.mode){case Ze:if(0===a.wrap){a.mode=De;break}for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(2&a.wrap&&35615===h){0===a.wbits&&(a.wbits=15),a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0),h=0,d=0,a.mode=16181;break}if(a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=Le;break}if((15&h)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits&&(a.wbits=y),y>15||y>a.wbits){t.msg="invalid window size",a.mode=Le;break}a.dmax=1<<a.wbits,a.flags=0,t.adler=a.check=1,a.mode=512&h?16189:Se,h=0,d=0;break;case 16181:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.flags=h,(255&a.flags)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=Le;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16182;case 16182:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=H(a.check,A,4,0)),h=0,d=0,a.mode=16183;case 16183:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16184;case 16184:if(1024&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0}else a.head&&(a.head.extra=null);a.mode=16185;case 16185:if(1024&a.flags&&(c=a.length,c>o&&(c=o),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=16186;case 16186:if(2048&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=16187;case 16187:if(4096&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=16188;case 16188:if(512&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=Le;break}h=0,d=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=Se;break;case 16189:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}t.adler=a.check=Ne(h),h=0,d=0,a.mode=Ue;case Ue:if(0===a.havedict)return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,ye;t.adler=a.check=1,a.mode=Se;case Se:if(e===ge||e===pe)break t;case De:if(a.last){h>>>=7&d,d-=7&d,a.mode=Fe;break}for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=16193;break;case 1:if(Xe(a),a.mode=Oe,e===pe){h>>>=2,d-=2;break t}break;case 2:a.mode=16196;break;case 3:t.msg="invalid block type",a.mode=Le}h>>>=2,d-=2;break;case 16193:for(h>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=Le;break}if(a.length=65535&h,h=0,d=0,a.mode=Te,e===pe)break t;case Te:a.mode=16195;case 16195:if(c=a.length,c){if(c>o&&(c=o),c>l&&(c=l),0===c)break t;n.set(i.subarray(s,s+c),r),o-=c,s+=c,l-=c,r+=c,a.length-=c;break}a.mode=Se;break;case 16196:for(;d<14;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=Le;break}a.have=0,a.mode=16197;case 16197:for(;a.have<a.ncode;){for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=me(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=Le;break}a.have=0,a.mode=16198;case 16198:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(g<16)h>>>=m,d-=m,a.lens[a.have++]=g;else{if(16===g){for(R=m+2;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(h>>>=m,d-=m,0===a.have){t.msg="invalid bit length repeat",a.mode=Le;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2}else if(17===g){for(R=m+3;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=3+(7&h),h>>>=3,d-=3}else{for(R=m+7;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=11+(127&h),h>>>=7,d-=7}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=Le;break}for(;c--;)a.lens[a.have++]=y}}if(a.mode===Le)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=Le;break}if(a.lenbits=9,E={bits:a.lenbits},x=me(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=Le;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=me(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=Le;break}if(a.mode=Oe,e===pe)break t;case Oe:a.mode=Ie;case Ie:if(o>=6&&l>=258){t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,de(t,f),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,a.mode===Se&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(b&&0==(240&b)){for(p=m,k=b,v=g;z=a.lencode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,a.length=g,0===b){a.mode=16205;break}if(32&b){a.back=-1,a.mode=Se;break}if(64&b){t.msg="invalid literal/length code",a.mode=Le;break}a.extra=15&b,a.mode=16201;case 16201:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=16202;case 16202:for(;z=a.distcode[h&(1<<a.distbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(0==(240&b)){for(p=m,k=b,v=g;z=a.distcode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,64&b){t.msg="invalid distance code",a.mode=Le;break}a.offset=g,a.extra=15&b,a.mode=16203;case 16203:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=Le;break}a.mode=16204;case 16204:if(0===l)break t;if(c=f-l,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=Le;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window}else w=n,u=r-a.offset,c=a.length;c>l&&(c=l),l-=c,a.length-=c;do{n[r++]=w[u++]}while(--c);0===a.length&&(a.mode=Ie);break;case 16205:if(0===l)break t;n[r++]=a.length,l--,a.mode=Ie;break;case Fe:if(a.wrap){for(;d<32;){if(0===o)break t;o--,h|=i[s++]<<d,d+=8}if(f-=l,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,r-f):C(a.check,n,f,r-f)),f=l,4&a.wrap&&(a.flags?h:Ne(h))!==a.check){t.msg="incorrect data check",a.mode=Le;break}h=0,d=0}a.mode=16207;case 16207:if(a.wrap&&a.flags){for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=Le;break}h=0,d=0}a.mode=16208;case 16208:x=ve;break t;case Le:x=ze;break t;case 16210:return Ae;default:return xe}return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<Le&&(a.mode<Fe||e!==be))&&We(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,t.next_out-f):C(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(a.mode===Se?128:0)+(a.mode===Oe||a.mode===Te?256:0),(0===_&&0===f||e===be)&&x===ke&&(x=Ee),x},inflateEnd:t=>{if(Ce(t))return xe;let e=t.state;return e.window&&(e.window=null),t.state=null,ke},inflateGetHeader:(t,e)=>{if(Ce(t))return xe;const a=t.state;return 0==(2&a.wrap)?xe:(a.head=e,e.done=!1,ke)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return Ce(t)?xe:(i=t.state,0!==i.wrap&&i.mode!==Ue?xe:i.mode===Ue&&(n=1,n=C(n,e,a,0),n!==i.check)?ze:(s=We(t,e,a,a),s?(i.mode=16210,Ae):(i.havedict=1,ke)))},inflateInfo:"pako inflate (from Nodeca project)"};var Je=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const Qe=Object.prototype.toString,{Z_NO_FLUSH:Ve,Z_FINISH:$e,Z_OK:ta,Z_STREAM_END:ea,Z_NEED_DICT:aa,Z_STREAM_ERROR:ia,Z_DATA_ERROR:na,Z_MEM_ERROR:sa}=K;function ra(t){this.options=jt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=qe.inflateInit2(this.strm,e.windowBits);if(a!==ta)throw new Error(j[a]);if(this.header=new Je,qe.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=Gt(e.dictionary):"[object ArrayBuffer]"===Qe.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=qe.inflateSetDictionary(this.strm,e.dictionary),a!==ta)))throw new Error(j[a])}function oa(t,e){const a=new ra(e);if(a.push(t),a.err)throw a.msg||j[a.err];return a.result}ra.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,o;if(this.ended)return!1;for(r=e===~~e?e:!0===e?$e:Ve,"[object ArrayBuffer]"===Qe.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=qe.inflate(a,r),s===aa&&n&&(s=qe.inflateSetDictionary(a,n),s===ta?s=qe.inflate(a,r):s===na&&(s=aa));a.avail_in>0&&s===ea&&a.state.wrap>0&&0!==t[a.next_in];)qe.inflateReset(a),s=qe.inflate(a,r);switch(s){case ia:case na:case aa:case sa:return this.onEnd(s),this.ended=!0,!1}if(o=a.avail_out,a.next_out&&(0===a.avail_out||s===ea))if("string"===this.options.to){let t=Wt(a.output,a.next_out),e=a.next_out-t,n=Xt(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n)}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==ta||0!==o){if(s===ea)return s=qe.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return!0},ra.prototype.onData=function(t){this.chunks.push(t)},ra.prototype.onEnd=function(t){t===ta&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var la={Inflate:ra,inflate:oa,inflateRaw:function(t,e){return(e=e||{}).raw=!0,oa(t,e)},ungzip:oa,constants:K};const{Deflate:ha,deflate:da,deflateRaw:_a,gzip:fa}=le,{Inflate:ca,inflate:ua,inflateRaw:wa,ungzip:ma}=la;var ba=ha,ga=da,pa=_a,ka=fa,va=ca,ya=ua,xa=wa,za=ma,Aa=K,Ea={Deflate:ba,deflate:ga,deflateRaw:pa,gzip:ka,Inflate:va,inflate:ya,inflateRaw:xa,ungzip:za,constants:Aa};t.Deflate=ba,t.Inflate=va,t.constants=Aa,t.default=Ea,t.deflate=ga,t.deflateRaw=pa,t.gzip=ka,t.inflate=ya,t.inflateRaw=xa,t.ungzip=za,Object.defineProperty(t,"__esModule",{value:!0})}));
const vhighlight={};
vhighlight.highlight=function({
element=null,code=null,language=null,line_numbers=null,animate=false,delay=25,is_func=false,vide=false,}){
if(language==null&&element!=null){
language=element.getAttribute("language");
}
if(line_numbers==null&&element!=null){
line_numbers=element.getAttribute('line_numbers')=="true";
}
if(delay==null){
delay=25;
}
if(code!=null){
let res;
if(language=="cpp"||language=="c++"||language=="c"){
res=vhighlight.cpp.highlight(code,{is_func:is_func,vide:vide});
}else if(language=="markdown"||language=="md"){
res=vhighlight.md.highlight(code);
}else if(language=="js"||language=="javascript"||language=="json"){
res=vhighlight.js.highlight(code,{vide:vide});
}else if(language=="python"){
res=vhighlight.python.highlight(code);
}
if(vide&&typeof res==='string'){
return{
code:code,
tokens:null,
line_count:null,
};
}
return res;
}
else if(element.tagName=="PRE"){
code=element.innerText.replaceAll(">","&gt;").replaceAll("<","&lt;");
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
return;
}
element.innerHTML=highlighted_code;
return;
}
if(language==""||language==null){
return;
}
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
loader=element.children[0];
line_numbers_div=element.children[1];
line_numbers_divider=element.children[2];
code_pre=element.children[3];
code=code_pre.textContent;
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
vhighlight.js.highlight=function(
code,
options={
vide:false,},
){
let tokens=[];let batch="";let line=0;let newline_index=0;let last_folded_line=null;let is_comment=false;let is_str=false;let is_regex=false;let curly_depth=0;let parenth_depth=0;let opening_parenth_curly_depth=0;let class_depth=null;let func_def_parenth_depth=null;let func_def_curly_depth=null;let next_token=null;let last_param_was_assignment=false;
const word_boundaries=vhighlight.utils.word_boundaries;
const keywords=vhighlight.js.keywords;
const operators=vhighlight.utils.operators;
function prev_batch(index,exclude=[" ","\t","\n"]){
for(let i=index;i>=0;i--){
const item=tokens[i];
if(!exclude.includes(item.data)){
return item;
}
}
return null;
}
function str_includes_word_boundary(str){
for(let i=0;i<word_boundaries.length;i++){
if(str.includes(word_boundaries[i])){
return true;
}
}
return false;
}
function append_token(token=null){
tokens.push({token:token,data:batch,index:tokens.length,line:line});
}
function append_batch(token){
if(batch.length==0){
return;
}
if(token==false){
append_token();
}
else if(token!=null){
append_token(token);
}
else if(next_token!=null){
if(batch==" "||batch=="\t"||batch=="\n"){
append_token();
}else{
append_token(next_token);
next_token=null;
}
}
else{
if(keywords.includes(batch)){
if(batch=="class"){
next_token="token_type_def"
class_depth=curly_depth+1;
}
else if(batch=="extends"){
next_token="token_type";
}
append_token("token_keyword");
}
else if(operators.includes(batch)){
append_token("token_operator");
}
else if(/^-?\d+(\.\d+)?$/.test(batch)){
append_token("token_numeric");
}
else{
append_token(null);
}
}
batch="";
}
vhighlight.utils.iterate_code({
code:code,
language:"js",
callback:(index,char,local_is_str,local_is_comment,is_multi_line_comment,local_is_regex,is_escaped)=>{
if(!is_escaped&&char=="\n"){
if(is_comment){
append_batch("token_comment");
}else if(is_str){
append_batch("token_string");
}else if(is_regex){
append_batch("token_string");
}else{
append_batch();
}
++line;
batch+=char;
append_batch("token_line");
}
else if(local_is_comment||is_multi_line_comment){
if(!is_comment){
append_batch();
is_comment=true;
}
batch+=char;
}
else if(local_is_str){
if(!is_str){
append_batch();
is_str=true;
}
batch+=char;
}
else if(local_is_regex){
if(!is_regex){
append_batch();
is_regex=true;
}
batch+=char;
}
else{
if(char=="{"){
++curly_depth;
}else if(char=="}"){
--curly_depth;
if(class_depth!=null&&curly_depth<class_depth){
class_depth=null;
}
}
if(char=="("){
++parenth_depth;
}else if(char==")"){
--parenth_depth;
}
if(is_comment){
append_batch("token_comment");
is_comment=false;
}
else if(is_str){
append_batch("token_string");
is_str=false;
}
else if(is_regex){
append_batch("token_string");
is_regex=false;
}
if(char=="("){
const prev_char=code.charAt(index-1);
if(parenth_depth==1){
opening_parenth_curly_depth=curly_depth;
last_param_was_assignment=false;
}
if(class_depth==curly_depth&&parenth_depth==1){
if(prev_char==" "||prev_char=="\t"||prev_char=="\n"||batch==" "||batch=="\t"||batch=="\n"){
const prev=prev_batch(tokens.length-1,[" ","\t","\n"]);
prev.token="token_type_def";
append_batch(false)
}else{
append_batch("token_type_def")
}
batch+=char;
append_batch(false);
return null;
}
if(batch=="function"){
const prev=prev_batch(tokens.length-1,[" ","\t","\n","=",":"]);
prev.token="token_type_def";
append_batch("token_keyword");
batch+=char;
append_batch(false);
func_def_parenth_depth=parenth_depth;
func_def_curly_depth=curly_depth;
return null;
}
const prev=prev_batch(tokens.length-1,[" ","\t","\n"]);
if(prev.data=="function"){
append_batch("token_type_def");
batch+=char;
append_batch(false);
func_def_parenth_depth=parenth_depth;
func_def_curly_depth=curly_depth;
return null;
}
const prev_prev=prev_batch(prev.index-1,[" ","\t","\n"])
if(prev_prev!=null&&batch.length==0&&(prev.data=="="||prev.data==":")){
prev_prev.token="token_type_def";
func_def_parenth_depth=parenth_depth;
func_def_curly_depth=curly_depth;
}
else if(prev_prev!=null&&prev_prev.data=="function"){
prev.token="token_type_def"
func_def_parenth_depth=parenth_depth;
func_def_curly_depth=curly_depth;
}
else{
if(prev_char==" "||prev_char=="\t"||prev_char=="\n"||batch==" "||batch=="\t"||batch=="\n"){
if(prev.token==null&&!str_includes_word_boundary(prev.data)){
prev.token="token_type";
}
append_batch(false);
}
else{
if(keywords.includes(batch)){
append_batch("token_keyword");
opening_parenth_curly_depth=null;}else{
append_batch("token_type");
}
}
}
batch+=char;
append_batch(false);
}
else if(
(class_depth==curly_depth&&
(
(parenth_depth==1&&((char==','&&!last_param_was_assignment)||(char=='='&&code.charAt(index+1)!='>')))||
(parenth_depth==0&&char==')')
))||
(
func_def_curly_depth==curly_depth&&(
(parenth_depth==func_def_parenth_depth&&((char==','&&!last_param_was_assignment)||(char=='='&&code.charAt(index+1)!='>')))||
(parenth_depth==func_def_parenth_depth-1&&char==')')
)
)||
(
opening_parenth_curly_depth==curly_depth&&parenth_depth>0&&char=='='&&
code.charAt(index+1)!='>'
)
){
if(char==')'){
if(func_def_parenth_depth!=null&&parenth_depth<func_def_parenth_depth){
func_def_parenth_depth=null;
}
if(last_param_was_assignment){
last_param_was_assignment=false;
append_batch();
batch+=char;
append_batch();
return null;
}
}
if(char=='='){
last_param_was_assignment=true;
}else{
last_param_was_assignment=false;
}
const prev_char=code.charAt(index-1);
if(prev_char==" "||prev_char=="\t"||prev_char=="\n"){
const prev=prev_batch(tokens.length-1,[" ","\t","\n"]);
prev.token="token_parameter";
append_batch();
}else{
append_batch("token_parameter");
}
batch+=char;
append_batch();
}
else if(word_boundaries.includes(char)){
append_batch();
batch+=char;
append_batch();
}
else{
batch+=char;
}
}
},
});
append_batch();
if(options.vide){
return{
tokens:tokens,
line_count:line,
}
}
else{
return vhighlight.utils.build_tokens(tokens);
}
}
vhighlight.cpp={};
vhighlight.cpp.language="cpp";
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
vhighlight.cpp.type_keywords=[
"const",
"constexpr",
"static",
"volatile",
"mutable",
];
vhighlight.cpp.exclude_span="(?!(?:[^<]|<(?!/?span[^>]*>))*?<\\/span>)";vhighlight.cpp.template_params="(?:&lt;(?:[^&]|&[^g]|&g[^t])*?&gt;)?";vhighlight.cpp.html_open="(?<!<[^>]*)";vhighlight.cpp.html_close="(?![^<]*>)";
vhighlight.cpp.comment_regex=/(\/\/.*|\/\*[\s\S]*?\*\/)(?!\S)/g;
vhighlight.cpp.string_regex=new RegExp(`${vhighlight.cpp.exclude_span}${vhighlight.cpp.html_open}(["'])(?:\\\\.|(?![\\1])[^\\\\\\n])*?\\1${vhighlight.cpp.html_close}`,'g');
vhighlight.cpp.sys_include_regex=new RegExp(`${vhighlight.cpp.exclude_span}(\\s*#\\s*include\\s*)((&lt;|")[\\s\\S]*?(&gt;|"))`,'g');
vhighlight.cpp.bool_regex=new RegExp(`${vhighlight.cpp.exclude_span}\\b(true|false)\\b`,'g');
vhighlight.cpp.numeric_regex=new RegExp(`${vhighlight.cpp.exclude_span}\\b-?\\d+(?:\\.\\d+)?\\b`,'g');
vhighlight.cpp.keyword_regex=new RegExp(`${vhighlight.cpp.exclude_span}${vhighlight.cpp.html_open}\\b(${vhighlight.cpp.keywords.join('|')})\\b${vhighlight.cpp.html_close}`,'g');
vhighlight.cpp.typedef_regex=new RegExp(`${vhighlight.cpp.exclude_span}\\b(${vhighlight.cpp.typedef_keywords.join('|')})\\b(\\s*[A-Za-z0-9_]*)\\b(.*{)`,'g');
vhighlight.cpp.preprocessor_regex=new RegExp(`${vhighlight.cpp.exclude_span}(\\s*#(?:[\\s\\S]*?(?=(?<!\\\\)\\n)))`,'g');
vhighlight.cpp.func_regex=new RegExp(`${vhighlight.cpp.exclude_span}(\\w+)\\s*${vhighlight.cpp.template_params}\\s*(\\w+\\s*\\([\\s\\S]*)[{|;]`,"g");
vhighlight.cpp.param_type_regex=new RegExp(`${vhighlight.cpp.exclude_span}([\\n,(]\\s*)(${vhighlight.cpp.type_keywords.join('\\s+|') + '\\s+'})*([A-Za-z0-9_|:]*${vhighlight.cpp.template_params})`,'g');
vhighlight.cpp.constructor_regex=new RegExp(`${vhighlight.cpp.exclude_span}([A-Za-z0-9_]+${vhighlight.cpp.template_params}\\s+)([A-Za-z0-9_]+)(\\s*[\\(|\\{])`,'g');
vhighlight.cpp.call_regex=new RegExp(`${vhighlight.cpp.exclude_span}\\b([A-Za-z0-9_]+${vhighlight.cpp.template_params})(\\s*[\\(\\{])`,'g');
vhighlight.cpp.type_regex=new RegExp(`${vhighlight.cpp.exclude_span}${vhighlight.cpp.html_open}(?<=\\b)(${vhighlight.cpp.keywords.join('\\s+|') + '\\s+'})*([A-Za-z0-9_]+${vhighlight.cpp.template_params})([&*]*\\s+(?!&gt;|&lt;)[A-Za-z0-9_&*]+)${vhighlight.cpp.html_close}`,'gm');
vhighlight.cpp.namespace_regex=new RegExp(`${vhighlight.cpp.exclude_span}([A-Za-z0-9_]*)(::)([A-Za-z0-9_]+${vhighlight.cpp.template_params})`,'g');
vhighlight.cpp.recorrect_regex=/(<span class="token_type">[^$2|<]*)(,|::|&lt;|&gt;)([^<]*<\/span>)/g;
vhighlight.cpp.highlight=function(
code,
options={
is_func:false,
reformat:true,
vide:false,
}
){
const og_code=code;
if(options.reformat){code=code.replaceAll("<","&lt;");
code=code.replaceAll(">","&gt;");
}
if(!options.is_func){code=code.replace(vhighlight.cpp.comment_regex,'<span class="token_comment">$&</span>');code=code.replace(vhighlight.cpp.sys_include_regex,'<span class="token_preprocessor">$1</span><span class="token_string">$2</span>');code=code.replace(vhighlight.cpp.string_regex,'<span class="token_string">$&</span>');}
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
const char=code.charAt(index);
if(pstart==0&&(char==" "||char=="\t")&&code[index+1]!="("&&code[index+1]!=" "){
last_space=index;
}
if(pend==0){
if(char=="("){
if(depth==0){
pstart=index;
}
depth++;
}
else if(char==")"){
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
else if(bstart==0&&char==";"){
end_index=index+1;
break;
}
else if(char=="{"){
bstart=index;
const result=vhighlight.utils.slice_curly_brackets({code:code,start_index:bstart,include:true,language:vhighlight.cpp.language});
if(result==null){break;
}
bend=result.end;
end_index=result.end;
func_code=result.data.trim();
break;
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
if(end_index==0){
console.log(func_name," - ",func_type);
regex.lastIndex=match.index+1;
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
code=code.replace(vhighlight.cpp.numeric_regex,'<span class="token_numeric">$&</span>');
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
if(options.vide){
let code_folding=[];
let insertions=[];
let lines=[];
let last_line=-1;
let line=0;
let indent="";
let newline_index=0;
vhighlight.utils.iterate_code({
code:code,
language:vhighlight.cpp.language,
callback:(index,char,is_str,is_comment,is_multi_line_comment,is_escaped)=>{
if(!is_escaped&&char=="\n"){
++line;
newline_index=index+1;
lines.push(newline_index);
}
if(!is_str&&!is_comment&&!is_multi_line_comment){
if(line!=last_line){if(char=="{"){
last_line=line;
indent="";
for(let i=newline_index;i<index;i++){
const c=code.charAt(i);
if(c==" "||c=="\t"){
indent+=c;
}else{
break;
}
}
insertions.push([index+1,`<span id='token_foldable_${line}' class='token_foldable'>`]);
code_folding.push({
start:true,
line:line,
id:`token_foldable_${line}`,
indent:indent,
});
}else if(char=="}"){
insertions.push([index,"</span>"]);
code_folding.push({
start:false,
line:line,
});
}
}
}
},
});
let offset=0;
for(let i=0;i<insertions.length;i++){
const insert=insertions[i];
code=vhighlight.utils.insert_str(code,insert[0]+offset,insert[1]);
offset+=insert[1].length;
}
return{
code:code,
line_count:line,
lines:lines,
code_folding:code_folding,
};
}
return code;
}
vhighlight.cpp.highlight_params=function(code){
code=code.replace(vhighlight.cpp.comment_regex,'<span class="token_comment">$&</span>');code=code.replace(vhighlight.cpp.typedef_regex,'<span class="token_keyword">$1</span><span class="token_type_def">$2</span>$3');code=code.replace(vhighlight.cpp.string_regex,'<span class="token_string">$&</span>');code=code.replace(vhighlight.cpp.numeric_regex,'<span class="token_numeric">$&</span>');
code=code.replace(vhighlight.cpp.bool_regex,'<span class="token_bool">$&</span>');
code=code.replace(vhighlight.cpp.param_type_regex,(match,g1,g2,g3)=>{
if(g2==null){
g2="";
}
if(vhighlight.cpp.keywords.includes(g3)){
return `${g1}${g2}<span class="token_keyword">${g3}</span>`;
}else{
return `${g1}${g2}<span class="token_type">${g3}</span>`;
}
});
code=code.replace(vhighlight.cpp.namespace_regex,'<span class="token_type">$1</span>$2<span class="token_type">$3</span>');code=code.replace(vhighlight.cpp.preprocessor_regex,'<span class="token_keyword">$&</span>');code=code.replace(vhighlight.cpp.keyword_regex,'<span class="token_keyword">$&</span>');
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
vhighlight.utils.word_boundaries=[
' ',
'\t',
'\n',
'\r',
'.',
',',
'!',
'?',
';',
':',
'-',
'/',
'\\',
'|',
'(',
')',
'[',
']',
'{',
'}',
'<',
'>',
'=',
'+',
'*',
'&',
'%',
'$',
'#',
'@',
'`',
'~',
'"',
"'",
'\u2019','\u2018','\u201d','\u201c',];
vhighlight.utils.operators=Array.from(new Set([
"+","-","*","/","%","**","=","+=","-=","*=","/=","%=","**=",
"==","!=","===","!==",">","<",">=","<=","&&","||","!","&","|",
"^","~","<<",">>",">>>","++","--","?",
"&&","||","!","==","!=",">","<",">=","<=","+","-","*","/","%",
"=","+=","-=","*=","/=","%=","++","--","<<",">>","&","|","^","~",
"?",
"==","!=","<",">","<=",">=","+","-","*","/","%","**","//","&","|",
"^","~","<<",">>","and","or","not","is","in","not in",
"==","!=","<",">","<=",">=","+","-","*","/","%","&&","||","!","&","|",
"^","~","<<",">>",">>>","instanceof","instanceof",
"==","!=","<",">","<=",">=","+","-","*","/","%","&&","||","!","&","|",
"^","~","<<",">>","==","!=","<=",">=","+=","-=","*=","/=","%=","&=","|=",
"^=","<<=",">>=",
"==","!=","<",">","<=",">=","+","-","*","/","%","**","&","|","^","~",
"<<",">>","&&","||","!","and","or","not",
"==","!=","<",">","<=",">=","+","-","*","/","%","&","|","^","~",
"<<",">>","&&","||","!","is","as","in",
"==","!=","<",">","<=",">=","+","-","*","/","%","&","|","^","~",
"<<",">>","&&","||","!","===","!==","instanceof",
"==","!=","<",">","<=",">=","+","-","*","/","%","&","|","^","~",
"<<",">>","&&","||","!","&^",
]));
vhighlight.utils.build_tokens=function(tokens,options={is_line:false,reformat:true}){
let html="";
const is_line=options.is_line!=false;
const reformat=options.reformat!=false;
function build_token(token){
const type=token.token;
if(reformat){
token.data=token.data.replaceAll("<","&lt;").replaceAll(">","&gt;");
}
if(type==null){
html+=token.data;
}else if(type=="token_foldable"){
if(token.data=="{"){
html+=`<span id='token_foldable_${token.line}' class='token_foldable'>{`;
}else{
html+="</span>}";
}
}else if(is_line==false||type!="token_line"){
html+=`<span class='${type}'>${token.data}</span>`
}
}
if(Array.isArray(tokens[0])){
for(let x=0;x<tokens.length;x++){
const arr=tokens[x];
for(let y=0;y<arr.length;y++){
build_token(arr[y]);
}
}
}
else{
for(let i=0;i<tokens.length;i++){
build_token(tokens[i]);
}
}
return html;
}
vhighlight.utils.replace_by_index=function(str,start,end,substr){
let replaced=str.substr(0,start);
replaced+=substr;
replaced+=str.substr(end,str.length-end);
return replaced;
}
vhighlight.utils.is_escaped=function(code,index){
if(code.charAt(index-1)=="\\"){
if(code.charAt(index-2)=="\\"){
return vhighlight.utils.is_escaped(code,index-2);
}
return true;
}
return false;
}
vhighlight.utils.insert_str=function(str,start,insert){
let inserted=str.substr(0,start);
inserted+=insert;
inserted+=str.substr(start);
return inserted;
}
vhighlight.utils.single_line_comment_start={
"python":"#",
"js":"//",
"cpp":"//",
}
vhighlight.utils.multi_line_comment_start={
"python":false,
"js":"/*",
"cpp":"/*",
}
vhighlight.utils.multi_line_comment_end={
"python":false,
"js":"*/",
"cpp":"*/",
}
vhighlight.utils.iterate_code=function({
code="",
callback=null,
start=0,
end=null,
language="cpp",
}){
function is_escaped_func(index){
if(code.charAt(index-1)=="\\"){
if(code.charAt(index-2)=="\\"){
return is_escaped_func(index-2);
}
return true;
}
return false;
}
if(end==null){
end=code.length;
}
let result=null;
let is_comment=false;
let is_multi_line_comment=false;
let string_char=null;
let is_regex=false;for(let index=start;index<end;index++){
const char=code.charAt(index);
const is_escaped=is_escaped_func(index);
if(
!is_escaped&&
!is_comment&&
!is_multi_line_comment&&
!is_regex&&
string_char==null&&
(char=='"'||char=="'"||char=='`')
){
string_char=char;
result=callback(index,char,true,is_comment,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}
else if(
!is_escaped&&
string_char!=null&&
char==string_char
){
string_char=null;
result=callback(index,char,true,is_comment,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}
else if(string_char!=null){
result=callback(index,char,true,is_comment,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}
if(
!is_escaped&&
!is_comment&&
!is_multi_line_comment&&
!is_regex
){
const comment_start=vhighlight.utils.single_line_comment_start[language];
if(comment_start==null){
console.error("Unsupported language \"",language,"\".");
}else if(comment_start.length==1&&char==comment_start){
is_comment=true;
result=callback(index,char,false,is_comment,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}else if(comment_start.length==2&&char+code.charAt(index+1)==comment_start){
is_comment=true;
result=callback(index,char,false,is_comment,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}
const mcomment_start=vhighlight.utils.multi_line_comment_start[language];
if(mcomment_start==null){
console.error("Unsupported language \"",language,"\".");
}else if(mcomment_start==false){
}else if(mcomment_start.length==2&&char+code.charAt(index+1)==mcomment_start){
is_multi_line_comment=true;
result=callback(index,char,false,is_comment,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}
}
else if(
is_comment&&
!is_escaped&&
char=="\n"
){
is_comment=false;
result=callback(index,char,false,true,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}
else if(
is_multi_line_comment&&
!is_escaped
){
const mcomment_end=vhighlight.utils.multi_line_comment_end[language];
if(mcomment_end.length==2&&code.charAt(index-1)+char==mcomment_end){
is_multi_line_comment=false;
result=callback(index,char,false,is_comment,true,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}
}
else if(is_comment||is_multi_line_comment){
result=callback(index,char,false,is_comment,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}
if(!is_escaped&&!is_regex&&char=="/"&&language=="js"){
let prev=null;
for(let p=index-1;p>=0;p--){
const prev_char=code.charAt(p);
if(prev_char!=" "&&prev_char!="\t"){
prev=prev_char;
break;
}
}
if(
prev!=null&&
(
prev=="\n"||prev==","||prev=="("||
prev=="["||prev=="{"||prev==":"||
vhighlight.utils.operators.includes(prev)
)
){
is_regex=true;
result=callback(index,char,false,is_comment,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
continue;
}
}
else if(is_regex){
if(char=='/'&&!is_escaped){
is_regex=false;
}
result=callback(index,char,false,is_comment,is_multi_line_comment,true,is_escaped);if(result!=null){
return result;
}
continue;
}
result=callback(index,char,false,is_comment,is_multi_line_comment,is_regex,is_escaped);
if(result!=null){
return result;
}
}
return null;
};
vhighlight.utils.slice_template=function(
code,
start_index,
start_char,
end_char,
include=false,
language="cpp"
){
let depth=0;
let start=-1;
let end=-1;
return vhighlight.utils.iterate_code({
code:code,
start:start_index,
language:language,
callback:(
index,
char,
is_str,
is_comment,
is_multi_line_comment,
)=>{
if(!is_str&&!is_comment&&!is_multi_line_comment){
if(char==start_char){
if(depth==0){
start=index;
}
++depth;
}else if(char==end_char){
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
start:start,
end:end,
data:code.substr(start,end-start),
}
}
}
}
}
});
}
vhighlight.utils.slice_curly_brackets=function({code,start_index,include=false,language="cpp"}){
return vhighlight.utils.slice_template(code,start_index,'{','}',include,language);
}
vhighlight.utils.slice_parentheses=function({code,start_index,include=false,language="cpp"}){
return vhighlight.utils.slice_template(code,start_index,'(',')',include,language);
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
let result=vhighlight.utils.slice_parentheses({code:code,start_index:match.index,include:false,language:"python"});
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
method:"POST",
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
vweb.payments={};
vweb.payments.stripe={};
vweb.payments.products=[];vweb.payments.selected_products=[];
vweb.payments.find_product=function(product_id){
for(let i=0;i<vweb.payments.products.length;i++){
const p=vweb.payments.products[i];
if(e.id==product_id){
return p;
}
}
console.error("Product \"",product_id,"\" does not exist.");
return null;
}
vweb.payments.add_product=function(product_id){
vweb.payments.selected_products.push(vweb.payments.products.find_product(product_id));
}
vweb.payments.remove_product=function(product_id){
new_products=[];
for(let i=0;i<vweb.payments.selected_products.length;i++){
const p=vweb.payments.selected_products[i];
if(e.id!=product_id){
new_products.push(p);;
}
}
vweb.payments.selected_products=new_products;
}
vweb.payments.charge=function({
return_url=window.location.href,
success=null,
error=null,
}){
product_ids=[];
for(let i=0;i<vweb.payments.selected_products.length;i++){
product_ids.push(vweb.payments.selected_products[i].id);
}
vweb.utils.request({
method:"POST",
url:"/backend/payments/charge",
data:{
products:product_ids,
payment_type:"ideal",
card_number:null,
card_exp_month:null,
card_exp_year:null,
card_cvc:null,
return_url:return_url,
},
success:function(status,response){
if(response.client_secret!=null){
vweb.payments.stripe.confirmPayment({
clientSecret:response.client_secret,
confirmParams:{
return_url:return_url,
payment_method:repsonse.payment_method_id,
},
})
}
if(success!=null){
success();
}
},
error:error,
});
}
