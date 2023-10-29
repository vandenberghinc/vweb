/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
const vweb={};
if(typeof module!=='undefined'&&typeof module.exports!=='undefined'){
module.exports={...this};
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
vweb.utils.is_even=function(number){
return number%2===0;
}
vweb.utils.make_immutable=(object)=>{
if(Array.isArray(object)){
Object.freeze(object);
for(let i=0;i<object.length;i++){
if(object[i]!==null&&typeof object[i]==="object"){
object[i]=vweb.utils.make_immutable(object[i])
}
}
}
else if(object!==null&&typeof object==="object"){
Object.freeze(object);
Object.keys(object).iterate((key)=>{
if(object[key]!==null&&typeof object[key]==="object"){
object[key]=vweb.utils.make_immutable(object[key])
}
})
}
}
vweb.utils.round=function(value,decimals){
const factor=10**decimals;
return Math.round(value*factor)/factor;
}
vweb.utils.device_width=function(){
return(window.innerWidth>0)? window.innerWidth:screen.width;
}
vweb.utils.device_height=function(){
return(window.innerHeight>0)? window.innerHeight:screen.height;
}
vweb.utils.endpoint=function(url){
if(url==null){
return vweb.utils.endpoint(window.location.href);
}else{
let endpoint=url.replace("https://","").replace("http://","");
endpoint=endpoint.substr(endpoint.indexOf('/'),endpoint.length);
let end;
if((end=endpoint.indexOf("?"))!==-1){
endpoint=endpoint.substr(0,end);
}
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
}
vweb.utils.cookies_parse_required=function(){
return document.cookie!==this._last_cookies;
}
vweb.utils.cookies=function(){
if(this.cookies_parse_required()===false){
return this._cookies;
}
this._cookies={};
this._last_cookies=document.cookie;
let is_key=true,is_str=null;
let key="",value="";
const append=()=>{
if(key.length>0){
this._cookies[key]=value;
}
value="";
key="";
is_key=true;
is_str=null;
}
for(let i=0;i<document.cookie.length;i++){
const c=document.cookie.charAt(i);
if(is_key){
if(c===" "||c==="\t"){
continue;
}
else if(c==="="){
is_key=false;
}else{
key+=c;
}
}
else{
if(is_str!=null&&is_str===c){
value=value.substr(1,value.length-1);
append();
}
else if(c===";"){
append();
}
else{
if(value.length===0&&(c==="\""||c==="'")){
is_str=c;
}
value+=c;
}
}
}
append();
return this._cookies;
}
vweb.utils.cookie=function(name){
return vweb.utils.cookies()[name];
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
Object.keys(params).iterate((key)=>{
const encodedKey=encodeURIComponent(key);
const encodedValue=encodeURIComponent(params[key]);
encodedParams.push(`${encodedKey}=${encodedValue}`);
});
return encodedParams.join('&');
}
vweb.utils.copy_to_clipboard=async function(text){
return new Promise((resolve,reject)=>{
navigator.clipboard.writeText(text)
.then((args)=>{
resolve(args)
})
.catch((err)=>{
reject(err)
});
});
}
vweb.utils.request=function({
method="GET",url=null,data=null,json=true,credentials="true",
}){
if(data!=null&&!vweb.utils.is_string(data)){
data=JSON.stringify(data);
}
return new Promise((resolve,reject)=>{
$.ajax({
type:method,
url:url,
data:data,
dataType:json ? "json":null,
mimeType:json ? "application/json":"text/plain",
contentType:"application/json",
credentials:credentials,
async:true,
success:function(data,_,xhr){
resolve(data,xhr.status,xhr);
},
error:function(xhr,status,e){
let response;
try{
response=JSON.parse(xhr.responseText);
if(response.status===undefined){
response.status=xhr.status;
}
}catch(err){
response={error:xhr.responseText==null ? e:xhr.responseText,status:xhr.status};
}
reject(response)
}
})
});
}
vweb.utils.on_load=function(func){
document.addEventListener("DOMContentLoaded",async()=>{
let e=func();
if(e instanceof Promise){
try{
e=await e;
}catch(err){
console.error(err);
return null;
}
}
if(e!=null){
document.body.appendChild(e);
}
});
}
vweb.utils.unix_to_date=function(unix,mseconds=false){
const date=new Date(mseconds ? unix:unix*1000);
const lang=navigator.language||navigator.userLanguage;
const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
let options={
year:"numeric",
month:"2-digit",
day:"2-digit",
timeZone:tz,
};
const date_format=new Intl.DateTimeFormat(lang,options).format(date);
options={
hour:"2-digit",
minute:"2-digit",
second:"2-digit",
hour12:lang.toLowerCase().includes("en"),
timeZone:tz,
}
const time_format=new Intl.DateTimeFormat(lang,options).format(date);
return `${date_format} ${time_format}`;
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
vweb.utils.fuzzy_search=({
query,
targets=[],
limit=25,
case_match=false,
allow_exceeding_chars=true,
get_matches=false,
key=null,
nested_key=null,
})=>{
if(query==null){
throw Error("Define parameter \"query\".");
}
const is_obj=targets.length>0&&typeof targets[0]==="object";
const is_array=targets.length>0&&Array.isArray(targets[0]);
if(is_obj&&key==null){key="query";}
const is_key_array=Array.isArray(key);
const results=[];
if(case_match===false){query=query.toLowerCase();}
const calc_sims=(targets=[])=>{
for(let i=0;i<targets.length;i++){
let match;
if(is_array){
if(targets[i]==null){continue;}
match=vweb.utils.fuzzy_match(
query,
case_match ? targets[i]:targets[i].toLowerCase(),
allow_exceeding_chars
);
}else if(is_obj){
const target=targets[i];
if(is_key_array){
let min_match=null;
for(let k=0;k<key.length;k++){
if(target[key[k]]==null){continue;}
match=vweb.utils.fuzzy_match(
query,
case_match ? target[key[k]]:target[key[k]].toLowerCase(),
allow_exceeding_chars
);
if(match!=null&&(min_match===null||match<min_match)){
min_match=match;
}
}
match=min_match;
}else{
if(target[key]==null){continue;}
match=vweb.utils.fuzzy_match(
query,
case_match ? target[key]:target[key].toLowerCase(),
allow_exceeding_chars
);
}
if(nested_key!==null&&target[nested_key]!=null){
calc_sims(target[nested_key]);
}
}else{
match=vweb.utils.fuzzy_match(
query,
case_match ? targets[i][0]:targets[i][0].toLowerCase(),
allow_exceeding_chars
);
}
if(match!==null){
results.push([match,targets[i]]);
}
}
}
calc_sims(targets);
results.sort((a,b)=>b[0]-a[0]);
if(limit!==null&&limit>=0&&results.length>limit){
results.length=limit;
}
if(get_matches===false){
let converted=[];
results.iterate((item)=>{
converted.push(item[1]);
})
return converted;
}
return results;
}
vweb.utils.fuzzy_match=(search,target,allow_exceeding_chars=true)=>{
if(allow_exceeding_chars===false){
if(search.length>target.length){
return null;
}
let text_count={};
for(let i=0;i<target.length;i++){
const c=target.charAt(i);
if(text_count[c]==null){
text_count[c]=1;
}else{
++text_count[c];
}
}
let query_count={};
for(let i=0;i<search.length;i++){
const c=search.charAt(i);
if(query_count[c]==null){
query_count[c]=1;
}else{
++query_count[c];
}
if(text_count[c]==null||query_count[c]>text_count[c]){
return null;
}
}
}
const get_search_code=(index)=>{
if(index>=0&&index<search.length){
return search.charCodeAt(index);
}
return-1;
};
const get_target_code=(index)=>{
if(index>=0&&index<target.length){
return target.charCodeAt(index);
}
return-1;
};
var prepareBeginningIndexes=(target)=>{
var targetLen=target.length
var beginningIndexes=[];var beginningIndexesLen=0
var wasUpper=false
var wasAlphanum=false
for(var i=0;i<targetLen;++i){
var targetCode=target.charCodeAt(i)
var isUpper=targetCode>=65&&targetCode<=90
var isAlphanum=isUpper||targetCode>=97&&targetCode<=122||targetCode>=48&&targetCode<=57
var isBeginning=isUpper&&!wasUpper||!wasAlphanum||!isAlphanum
wasUpper=isUpper
wasAlphanum=isAlphanum
if(isBeginning)beginningIndexes[beginningIndexesLen++]=i
}
return beginningIndexes
}
var prepareNextBeginningIndexes=(target)=>{
var targetLen=target.length
var beginningIndexes=prepareBeginningIndexes(target)
var nextBeginningIndexes=[];var lastIsBeginning=beginningIndexes[0]
var lastIsBeginningI=0
for(var i=0;i<targetLen;++i){
if(lastIsBeginning>i){
nextBeginningIndexes[i]=lastIsBeginning
}else{
lastIsBeginning=beginningIndexes[++lastIsBeginningI]
nextBeginningIndexes[i]=lastIsBeginning===undefined ? targetLen:lastIsBeginning
}
}
return nextBeginningIndexes
}
let searchI=0;
let searchLen=search.length;
let searchCode=get_search_code(searchI);
let searchLower=search.toLowerCase();
let targetI=0;
let targetLen=target.length;
let targetCode=get_target_code(targetI);
let targetLower=target.toLowerCase();
let matchesSimple=[];
let matchesSimpleLen=0;
let successStrict=false
let matchesStrict=[];
let matchesStrictLen=0
for(;;){
var isMatch=searchCode===get_target_code(targetI)
if(isMatch){
matchesSimple[matchesSimpleLen++]=targetI
++searchI;
if(searchI===searchLen)break
searchCode=get_search_code(searchI)
}
++targetI;
if(targetI>=targetLen){
return null
}}
searchI=0
targetI=0
nextBeginningIndexes=prepareNextBeginningIndexes(target);
var firstPossibleI=targetI=matchesSimple[0]===0 ? 0:nextBeginningIndexes[matchesSimple[0]-1];
var backtrackCount=0
if(targetI!==targetLen){
for(;;){
if(targetI>=targetLen){
if(searchI<=0)break
++backtrackCount;if(backtrackCount>200)break
--searchI
var lastMatch=matchesStrict[--matchesStrictLen]
targetI=nextBeginningIndexes[lastMatch]
}else{
var isMatch=get_search_code(searchI)===get_target_code(targetI)
if(isMatch){
matchesStrict[matchesStrictLen++]=targetI
++searchI;if(searchI===searchLen){successStrict=true;break}
++targetI
}else{
targetI=nextBeginningIndexes[targetI]
}
}
}
}
var substringIndex=targetLower.indexOf(searchLower,matchesSimple[0]);var isSubstring=~substringIndex;
if(isSubstring&&!successStrict){for(var i=0;i<matchesSimpleLen;++i){
matchesSimple[i]=substringIndex+i
}
}
var isSubstringBeginning=false;
if(isSubstring){
isSubstringBeginning=nextBeginningIndexes[substringIndex-1]===substringIndex
}
{
if(successStrict){var matchesBest=matchesStrict;var matchesBestLen=matchesStrictLen}
else{var matchesBest=matchesSimple;var matchesBestLen=matchesSimpleLen}
var score=0
var extraMatchGroupCount=0
for(var i=1;i<searchLen;++i){
if(matchesBest[i]-matchesBest[i-1]!==1){
score-=matchesBest[i];
++extraMatchGroupCount
}
}
var unmatchedDistance=matchesBest[searchLen-1]-matchesBest[0]-(searchLen-1)
score-=(12+unmatchedDistance)*extraMatchGroupCount
if(matchesBest[0]!==0)score-=matchesBest[0]*matchesBest[0]*.2
if(!successStrict){
score*=1000
}else{
var uniqueBeginningIndexes=1
for(var i=nextBeginningIndexes[0];i<targetLen;i=nextBeginningIndexes[i]){
++uniqueBeginningIndexes
}
if(uniqueBeginningIndexes>24)score*=(uniqueBeginningIndexes-24)*10 }
if(isSubstring)score/=1+searchLen*searchLen*1;if(isSubstringBeginning)score/=1+searchLen*searchLen*1;
score-=targetLen-searchLen;
return score
}
}
vweb.elements={};
vweb.elements.get=function(id){
const e=document.getElementById(id);
if(e==null){
throw Error(`Unable to find element with id "${id}".`)
}
return e;
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
let vweb_on_render_observer;
if(typeof window!=="undefined"&&typeof document!=="undefined"){
vweb_on_render_observer=new ResizeObserver((entries)=>{
for(let i=0;i<entries.length;i++){
const element=entries[i].target;
const rect=element.getBoundingClientRect();
if(rect.top&&rect.left&&rect.width&&rect.height){
if(element.element_type!==undefined){
element._rendered=true;
if(element._on_render_handler!=null){
element._on_render_handler(element);
}
}
vweb_on_render_observer.unobserve(element);
}
}
})
}

class MutexElement{
constructor(){
this.locked=false;
this.queue=[];
}
async lock(){
if(!this.locked){
this.locked=true;
return Promise.resolve();
}else{
return new Promise((resolve)=>{
this.queue.push(resolve);
});
}
}
unlock(){
if(this.queue.length>0){
const nextResolve=this.queue.shift();
nextResolve();
}else{
this.locked=false;
}
}
}
function Mutex(...args){return new MutexElement(...args);}
vweb.elements.elements_with_width_attribute=[
'CANVAS',
'EMBED',
'IFRAME',
'IMG',
'OBJECT',
'PROGRESS',
'VIDEO',
];
vweb.utils.on_appear_observer=new IntersectionObserver(
(entries,observer)=>{
entries.forEach(entry=>{
if(
entry.isIntersecting&&
(entry.target._on_appear_threshold==null||entry.intersectionRatio>=entry.target._on_appear_threshold)&&
(entry.target._on_appear_repeat===true||entry.target._on_appear_called!==true)
){
const traverse=(element)=>{
if(element._on_appear_callback!=null){
element._on_appear_callback(element);
if(element._on_appear_repeat!==true){
entry.target._on_appear_called=true;
observer.unobserve(element);
}
}
if(element.children!=null&&element.children.length>0){
for(let i=0;i<element.children.length;i++){
traverse(element.children[i]);
}
}
}
traverse(entry.target);
}
else if(entry.isIntersecting){
observer.unobserve(entry.target);
observer.observe(entry.target);
}
});
},
);
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
this.element_type=type;this.base_element_type=type;this.element_display="block";
this.remove_focus=super.blur;
this._rendered=false;
this._on_render_handler=null;
if(this.hasAttribute("created_by_html")){
this._rendered=false;
}
else{
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
}
clone(clone_children=true){
const clone=new this.constructor();
if(clone.element_type!==undefined){
clone.inner_html("");
}
const styles=window.getComputedStyle(this);
clone.style.cssText=Array.from(styles).reduce((str,property)=>{
return `${str}${property}:${styles.getPropertyValue(property)};`;
},'');
const auto_keys=[
"width",
"minWidth",
"maxWidth",
"height",
"minHeight",
"maxHeight",
];
for(let i=0;i<auto_keys.length;i++){
if(this.style[auto_keys[i]]=="auto"||this.style[auto_keys[i]]==""){
clone.style[auto_keys[i]]="auto";
}
}
for(const attr of this.getAttributeNames()){
if(attr!="style"){
clone.setAttribute(attr,this.getAttribute(attr));
}
}
for(const prop in this){
if(this.hasOwnProperty(prop)||typeof this[prop]==="function"){
clone[prop]=this[prop];
}
}
if(clone_children&&this.childNodes!=undefined){
for(let i=0;i<this.childNodes.length;i++){
const child=this.childNodes[i];
if(child.element_type===undefined){
clone.appendChild(child.cloneNode(true));
}else{
clone.appendChild(child.clone());
}
}
}
return clone;
}
pad_numeric(value,padding="px"){
if(vweb.utils.is_numeric(value)){
return value+padding;
}
return value;
}
pad_percentage(value,padding="%"){
if(vweb.utils.is_float(value)&&value<=1.0){
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
let child=children[i];
if(child!=null){
if(Array.isArray(child)){
this.append(...child);
}
else if(child.element_type!=null){
if(
child.element_type=="ForEach"||
child.element_type=="If"||
child.element_type=="IfDeviceWith"
){
child.append_children_to(this);
}else{
if(child._assign_to_parent_as!==undefined){
this[child._assign_to_parent_as]=child;
}
this.appendChild(child);
}
}
else if(vweb.utils.is_func(child)){
child=child();
if(child._assign_to_parent_as!==undefined){
this[child._assign_to_parent_as]=child;
}
this.append(child);
}
else if(child instanceof Node){
if(child._assign_to_parent_as!==undefined){
this[child._assign_to_parent_as]=child;
}
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
let child=children[i];
if(child!=null){
if(Array.isArray(child)){
this.zstack_append(...child);
}
else if(child.element_type!=null){
child.style.gridArea="1 / 1 / 2 / 2";
if(
child.element_type=="ForEach"||
child.element_type=="If"||
child.element_type=="IfDeviceWith"
){
child.append_children_to(this);
}else{
if(child._assign_to_parent_as!==undefined){
this[child._assign_to_parent_as]=child;
}
this.appendChild(child);
}
}
else if(vweb.utils.is_func(child)){
child=child();
if(child._assign_to_parent_as!==undefined){
this[child._assign_to_parent_as]=child;
}
this.append(child);
}
else if(child instanceof Node){
child.style.gridArea="1 / 1 / 2 / 2";
if(child._assign_to_parent_as!==undefined){
this[child._assign_to_parent_as]=child;
}
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
if(this._assign_to_parent_as!==undefined){
parent[this._assign_to_parent_as]=this;
}
parent.appendChild(this);
return this;
}
append_children_to(parent){
if(this.base_element_type=="VirtualScoller"){
for(let i=0;i<parent.children.length;i++){
parent.v_children.push(parent.children[i]);
}
this.innerHTML="";
}else{
while(this.firstChild){
if(this.firstChild._assign_to_parent_as!==undefined){
parent[this.firstChild._assign_to_parent_as]=this;
}
parent.appendChild(this.firstChild)
}
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
this.inner_html("");
return this;
}
child(index){
return this.children[index];
}
get(index){
if(index<0||index>=this.children.length){
return undefined;
}
return this.children[index];
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
if(!margin_left){
margin_left="0px";
}
if(!margin_right){
margin_right="0px";
}
if(columns==null){
columns=1;
}
this.style.flexBasis="calc(100% / "+columns+" - ("+margin_left+" + "+margin_right+"))";
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
min_frame(width,height){
if(width!=null){
this.min_width(width);
}
if(height!=null){
this.min_height(height);
}
return this;
}
max_frame(width,height){
if(width!=null){
this.max_width(width);
}
if(height!=null){
this.max_height(height);
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
side_by_side({
columns=2,
hspacing=10,
vspacing=10,
hide_dividers=false,
}){
if(this.element_type!=="HStack"){
throw Error("This function os only supported for element \"HStackElement\".");
}
let col_children=[];
let row_width=0;
let row=0;
this.box_sizing("border-box")
const flex_basis=(child,basis,margin)=>{
child.width(`calc(${basis*100}% - ${margin}px)`);
child.min_width(`calc(${basis*100}% - ${margin}px)`);
child.max_width(`calc(${basis*100}% - ${margin}px)`);
}
const set_flex=()=>{
let index=0;
let margin=0;
col_children.iterate((i)=>{
const child=i[0];
if(index>0){
child.margin_left(hspacing);
margin+=hspacing;
}
++index;
});
col_children.iterate((i)=>{
const child=i[0];
child.overflow("hidden")
flex_basis(
child,
i[1]==null ? 1/col_children.length:i[1],
margin/col_children.length,
);
})
}
const is_last_non_divider=(child)=>{
if(child.nextElementSibling==null){
return true;
}else if(child.nextElementSibling.element_type!=="Divider"){
return false;
}else{
return is_last_non_divider(child.nextElementSibling);
}
}
this.iterate((child)=>{
if(child.element_type==="Divider"){
if(col_children.length>0&&hide_dividers){
child.hide();
}else{
child.show();
child.margin_top(vspacing)
child.margin_bottom(0)
flex_basis(child,1.0,0);
}
}
else{
const is_last_node=is_last_non_divider(child)
const child_custom_basis=child._side_by_side_basis;
const basis=child_custom_basis==null ? 1/columns:child_custom_basis;
child.stretch(true);
child.box_sizing("border-box")
child.margin_left(0);if(row>0){
child.margin_top(vspacing);
}else{
child.margin_top(0);}
if(row_width+basis>1){
console.log(child,"overflow");
set_flex();
++row;
row_width=0;
col_children=[];
col_children.push([child,child_custom_basis]);
}
else if(row_width+basis===1||is_last_node){
col_children.push([child,child_custom_basis]);
set_flex();
++row;
row_width=0;
col_children=[];
}
else{
col_children.push([child,child_custom_basis]);
row_width+=basis;
}
}
})
return this;
}
side_by_side_basis(basis){
this._side_by_side_basis=basis;
return this;
}
ellipsis_overflow(to=true){
if(to===null){
return this.style.textOverflow==="ellipsis";
}else if(to===true){
this.style.textOverflow="ellipsis";
this.style.whiteSpace="nowrap";
this.style.overflow="hidden";
this.style.textWrap="wrap";
this.style.overflowWrap="break-word";
}else if(to===false){
this.style.textOverflow="default";
this.style.whiteSpace="default";
this.style.overflow="default";
this.style.textWrap="default";
this.style.overflowWrap="default";
}
return this;
}
align(value){
switch(this.base_element_type){
case "HStack":
case "ZStack":
this.style.justifyContent=value;
return this;
case "VStack":
case "Scroller":
case "View":
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
switch(this.base_element_type){
case "HStack":
case "ZStack":
this.style.alignItems=value;
return this;
case "VStack":
case "Scroller":
case "View":
this.style.justifyContent=value;
return this;
case "Text":
if(this.style.display==null||!this.style.display.includes("flex")){
this.display("flex");
}
this.style.alignItems=value;
return this;
default:
this.style.justifyContent=value;
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
}else if(value.eq_first("linear-gradient(")||value.eq_first("radial-gradient(")){
this.style.backgroundImage=value;
this.style.backgroundClip="text";
this.style["-webkit-background-clip"]="text";
this.style.color="transparent";
}else{
this.style.color=value;
}
return this;
}
border(...values){
if(values.length===0){
return this.style.border;
}else if(values.length===1){
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
if(values.length===0){
return this.style.boxShadow;
}
else if(values.length===1){
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
switch(this.base_element_type){
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
if(value==null){return this.style.opacity;}
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
rotate(value){
if(value==null){
return this.transform(this.edit_filter_wrapper(this.style.transform,"rotate",value));
}else{
let degree;
if(value.charAt(value.length-1)==="%"){
degree=Math.round(360*parseFloat(value.substr(0,value.length-1)/100));
}else if(vweb.utils.is_float(value)){
degree=Math.round(360*value);
}else{
degree=value;
}
return this.transform(this.edit_filter_wrapper(this.style.transform,"rotate",`rotate(${degree}deg) `));
}
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
let value=this.style[property];
if(
this.style.hasOwnProperty(property)
){
const is_index=(/^\d+$/).test(property);
if(property[0]=="-"&&is_index===false&&value!=''&&typeof value!=='function'){
dict[property]=value;
}
else if(is_index){
const key=this.style[property];
const value=this.style[key];
if(
key!==''&&key!==undefined&&typeof key!=='function'&&
value!==''&&value!==undefined&&typeof value!=='function'
){
dict[key]=value;
}
}
else if(this.element_type==="Style"){
dict[property]=value;
}
}
else if(
typeof value==='string'&&
value!==undefined&&
value.startsWith("var(")
){
dict[property]=value;
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
themes(...themes){
if(themes.length===1&&Array.isArray(themes[0])){
themes=themes[0];
for(let i=0;i<themes.length;i++){
themes[i].element=this;
vweb.themes.theme_elements.push(themes[i]);
}
}else{
for(let i=0;i<themes.length;i++){
themes[i].element=this;
vweb.themes.theme_elements.push(themes[i]);
}
}
return this;
}
hover_brightness(mouse_down_brightness=null,mouse_over_brightness=0.9){
if(mouse_down_brightness===false){
this.onmousedown=null;
this.onmouseover=null;
this.onmouseup=null;
this.onmouseout=null;
return this;
}
else if(mouse_down_brightness===true||typeof mouse_down_brightness==="number"){
if(mouse_down_brightness===true){
mouse_down_brightness=0.8;
}
this.onmousedown=function(){this.style.filter=`brightness(${mouse_down_brightness*100}%)`;}
this.onmouseover=function(){this.style.filter=`brightness(${mouse_over_brightness*100}%)`;}
this.onmouseup=function(){this.style.filter="brightness(100%)";}
this.onmouseout=function(){this.style.filter="brightness(100%)";}
return this;
}
else{
return this.onmousedown!=null;
}
}
media(media_query,true_handler,false_handler){
const e=this;
const query={
list:null,
callback:(query)=>{
if(query.matches){
true_handler(e);
}else if(false_handler!=null){
false_handler(e);
}
}
}
if(this.media_queries===undefined){
this.media_queries={};
}else if(this.media_queries[media_query]!==undefined){
this.media_queries[media_query].list.removeListener(this.media_queries[media_query].callback);
}
query.list=window.matchMedia(media_query);
query.callback(query.list);query.list.addListener(query.callback);
this.media_queries[media_query]=query;
return this;
}
remove_media(media_query){
if(this.media_queries!==undefined&&this.media_queries[media_query]!==undefined){
this.media_queries[media_query].list.removeListener(this.media_queries[media_query].callback);
}
return this;
}
remove_all_media(){
if(this.media_queries!==undefined){
Object(this.media_queries).values((query)=>{
query.list.removeListener(query.callback);
})
}
return this;
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
}else{
for(let key in keyframes[i]){
if(vweb.utils.is_numeric(keyframes[i][key])&&convert.includes(key)){
keyframes[i][key]=this.pad_numeric(keyframes[i][key]);
}
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
clearTimeout(this.animate_timeout);
this.animate_timeout=setTimeout(()=>do_animation(0),delay||0);
return this;
}
stop_animation(){
clearTimeout(this.animate_timeout);
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
on_scroll(opts_or_callback={callback:null,delay:null}){
if(opts_or_callback==null){return this.onscroll;}
if(vweb.utils.is_func(opts_or_callback)){
const e=this;
this.onscroll=(event)=>opts_or_callback(e,event);
}else{
if(opts_or_callback.delay==null){
this.onscroll=opts_or_callback.callback;
}else{
let timer;
const e=this;
this.onscroll=function(t){
clearTimeout(timer);
setTimeout(()=>opts_or_callback.callback(e,t),opts_or_callback.delay);
}
}
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
on_attachment_drop({callback,read=true,compress=false,on_start=()=>{}}){
this.ondragover=(event)=>{
event.preventDefault();
event.dataTransfer.dropEffect="copy";
on_start(event);
};
this.ondrop=(event)=>{
event.preventDefault();
const items=event.dataTransfer.items;
for(let i=0;i<items.length;i++){
const item=items[i];
if(item.kind==='file'){
const file=item.getAsFile();
if(file){
const args={
name:file.name,
path:file.path,
is_dir:false,
data:null,
compressed:false,
file:file,
};
if(item.webkitGetAsEntry){
const entry=item.webkitGetAsEntry();
if(entry&&entry.isDirectory){
args.is_dir=true;
}
}
if(args.is_dir===false&&read){
const reader=new FileReader();
reader.onload=(event)=>{
if(compress){
args.data=vweb.utils.compress(event.target.result);
args.compressed=true;
}else{
args.data=event.target.result;
args.compressed=false;
}
callback(args);
};
reader.readAsText(file);
}else{
callback(args);
}
}
}
}
}
return this;
}
on_appear(callback_or_opts={callback:null,repeat:false,threshold:null}){
let is_called=false;
let callback=callback_or_opts,repeat=false,threshold=null;
if(typeof callback_or_opts==="object"){
callback=callback_or_opts.callback;
if(callback_or_opts.repeat!==undefined){
repeat=callback_or_opts.repeat;
}
if(callback_or_opts.threshold!==undefined){
threshold=callback_or_opts.threshold;
}
}
this._on_appear_callback=callback;
this._on_appear_repeat=repeat;
this._on_appear_threshold=threshold;
vweb.utils.on_appear_observer.observe(this);
return this;
}
on_enter(callback){
const e=this;
super.onkeypress=function(event){
if(event.key==="Enter"){
callback(e,event);
}
}
return this;
}
on_escape(callback){
const e=this;
super.onkeypress=function(event){
if(event.key==="Escape"){
callback(e,event);
}
}
return this;
}
on_theme_update(callback){
if(callback==null){
return this._on_theme_update;
}
const found=vweb.themes.theme_elements.iterate((item)=>{
if(item.element===this){
return true;
}
})
if(found!==true){
vweb.themes.theme_elements.push({
element:this,
is_empty_theme:true,
});
}
this._on_theme_update=callback;
return this;
}
on_render(callback){
if(callback==null){
return this._on_render_handler;
}
if(this._on_render_handler===null){
vweb_on_render_observer.observe(this);
}
this._on_render_handler=callback;
return this;
}
on_shortcut(shortcuts=[]){
const is_match=(key,event,shortcut)=>{
if(typeof shortcut.match==="function"){
return shortcut.match(event,key,shortcut);
}
else if(shortcut.key!==undefined){
if(key!==shortcut.key){
return false;
}
}
else if(shortcut.keys!==undefined){
const keys=shortcut.keys;
const or=shortcut.or===undefined ? true:shortcut.or;
if(or){
let found=false;
for(let i=0;i<keys.length;i++){
if(keys[i]===key){
found=true;
break;
}
}
if(found===false){return false;}
}else{
const duration=shortcut.duration||150;
if(
this._on_shortcut_time===null||
Date.now()-this._on_shortcut_time>duration
){
return false;
}
if(!(
(this.on_shortcut_key===keys[0]&&key===keys[1])||
(this.on_shortcut_key===keys[1]&&key===keys[0])
)){
return false;
}
}
}
else if(shortcut.keycode!==undefined){
if(event.keyCode!==shortcut.keycode){
return false;
}
}
else if(shortcut.keycodes!==undefined){
const keys=shortcut.keycodes;
const or=shortcut.or===undefined ? true:shortcut.or;
if(or){
let found=false;
for(let i=0;i<keys.length;i++){
if(keys[i]===event.keyCode){
found=true;
break;
}
}
if(found===false){return false;}
}else{
const duration=shortcut.duration||150;
if(
this._on_shortcut_time===null||
Date.now()-this._on_shortcut_time>duration
){
return false;
}
if(!(
this.on_shortcut_keycode===keys[0]&&event.keyCode===keys[1]||
this.on_shortcut_keycode===keys[1]&&event.keyCode===keys[0]
)){
return false;
}
}
}
else{
console.error("At least one of the following shortcut attributes must be defined: [key, keys, keycode, keycodes].");
return false;
}
const allow_other_modifiers=shortcut.allow_other_modifiers===undefined ? false:shortcut.allow_other_modifiers;
const shift=shortcut.shift===undefined ? false:shortcut.shift;
const alt=shortcut.alt===undefined ? false:shortcut.alt;
const ctrl=shortcut.ctrl===undefined ? false:shortcut.ctrl;
if(event.shiftKey!==shift&&(shift||allow_other_modifiers===false)){
return false;
}
if(event.altKey!==alt&&(alt||allow_other_modifiers===false)){
return false;
}
if((event.ctrlKey||event.metaKey)!==ctrl&&(ctrl||allow_other_modifiers===false)){
return false;
}
return true;
}
if(this.hasAttribute("tabindex")===false){
this.setAttribute("tabindex","0");
this.outline("none");
this.border("none");
}
this.onkeydown=(event)=>{
const key=event.key.toLowerCase();
const matched=shortcuts.iterate((shortcut)=>{
if(is_match(key,event,shortcut)){
shortcut.callback(this,event);
return true;
}
});
if(matched!==true){
this.on_shortcut_time=Date.now();
this.on_shortcut_key=event.key;
this.on_shortcut_keycode=event.keyCode;
}
}
}
on_context_menu(callback){
if(callback==null){
if(this._context_menu!==undefined){
return this._context_menu;
}else{
return this.oncontextmenu;
}
}
if(callback instanceof ContextMenuElement||callback.element_type==="ContextMenu"){
this._context_menu=callback;
const _this_=this;
this.oncontextmenu=(event)=>{
this._context_menu.popup(event);
};
}else if(Array.isArray(callback)){
this._context_menu=callback;
const _this_=this;
this.oncontextmenu=(event)=>{
ContextMenu(callback).popup(event);
};
}else{
const _this_=this;
this.oncontextmenu=(event)=>callback(_this_,event);
}
return this;
}
first_child(){
return this.firstChild;
}
last_child(){
return this.lastChild;
}
iterate(start,end,handler){
if(typeof start==="function"){
handler=start;
start=null;
}
if(start==null){
start=0;
}
if(end==null){
end=this.children.length;
}
for(let i=start;i<end;i++){
const res=handler(this.children[i],i);
if(res!=null){
return res;
}
}
return null;
};
iterate_nodes(start,end,handler){
if(typeof start==="function"){
handler=start;
start=null;
}
if(start==null){
start=0;
}
if(end==null){
end=this.childNodes.length;
}
for(let i=start;i<end;i++){
const res=handler(this.childNodes[i],i);
if(res!=null){
return res;
}
}
return null;
};
set_default(Type){
if(Type==null){
Type=E;
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
select(overwrite=true){
if(super.select!=undefined){
super.select();
return this;
}
this.focus();
const range=document.createRange();
range.selectNodeContents(this);
const selection=window.getSelection();
if(overwrite){
selection.removeAllRanges();
}
selection.addRange(range);
console.log(range);
console.log(selection);
return this;
}
focusable(value){
if(value==null){
return this.getAttribute("tabindex")!=="-1";
}else if(value===true){
this.setAttribute('tabindex','-1');
this.style.outline="none";
}else{
this.setAttribute('tabindex','-1');
this.style.outline="none";
}
return this;
}
alt(value){
if(value==null){return this.getAttribute("alt");}
this.setAttribute("alt",value)
return this;
}
parent(value){
if(value==null){
if(this._parent==null||this._parent===undefined){
return this.parentElement;
}
return this._parent;
}
this._parent=value;
return this;
}
abs_parent(value){
if(value==null){
return this._abs_parent;
}
this._abs_parent=value;
return this;
}
assign_to_parent_as(name){
this._assign_to_parent_as=name;
return this;
}
exec(callback){
callback(this);
return this;
}
toString(){
this.setAttribute("created_by_html","true");
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
this.style.msMaskImage=value;
this.style.webkitMaskImage=value;
this.style.MozMaskImage=value;
this.style.OMaskImage=value;
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
if(value==null){return super.readOnly;}
super.readOnly=value;
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
"flex:":"1 1 auto",},
}){
constructor(...children){
super();
this.append(...children);
}
}
vweb.elements.register(HStackElement);
function HStack(...args){return new HStackElement(...args);}


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
this.element_type="RingLoader";
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
},
});
function Divider(...args){return new DividerElement(...args);}


class ScrollerElement extends CreateVElementClass({
type:"Scoller",
tag:"div",
default_style:{
"position":"relative","margin":"0px",
"padding":"0px",
"display":"flex","overflow":"hidden",
"align-content":"flex-start","flex-direction":"column",
"scroll-behavior":"smooth",
"overscroll-behavior":"none","height":"fit-content","content-visibility":"auto","align-content":"flex-start","align-items":"flex-start",},
}){
constructor(...children){
super();
if(this.position()!="absolute"){
this.position("relative");}
super.overflow("hidden");this.class("hide_scrollbar")
this.styles({
"content-visibility":"auto",
})
this.content=VStack(...children)
.parent(this)
.class("hide_scrollbar")
.position("relative").frame("100%","100%")
.flex("1 1 0").overflow("scroll")
.overscroll_behavior("none")
.styles({
"content-visibility":"auto",
})
this.thumb=VStack()
.parent(this)
.position(0,0,null,0)
.height(30)
.border_radius(10)
.overflow("visible").background_color("#CCCCCC")
.opacity(0)
.transition("opacity 0.3s linear")
.box_shadow("0px 0px 5px #00000005")
this.track=VStack(this.thumb)
.parent(this)
.class("hide_scrollbar")
.position(5,5,5,null)
.width(10)
.background_color("transparent")
.border_radius(10)
.transition("background-color 0.3s linear")
.assign("background_value","#28292E")
.overflow("visible")
super.append(this.content,this.track);
this.on_scroll_callbacks=[];
this.iterate=this.content.iterate.bind(this.content);
this.iterate_nodes=this.content.iterate_nodes.bind(this.content);
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
if(!this.is_scrollable()){
return null;
}
this.track.style.backgroundColor=this.track.__background_value__;
clearTimeout(this.fadeout_timeout);
this.thumb.style.opacity=1;})
this.track.addEventListener("mouseleave",(event)=>{
if(!this.is_scrollable()){
return null;
}
if(!this.thumb.dragging){
this.track.style.backgroundColor="transparent";
this.thumb.style.opacity=0;}
})
this.content.addEventListener("scroll",(event)=>{
const height=this.content.clientHeight;
const relative_height=this.track.clientHeight;const thumb_height=this.thumb.clientHeight;
const scroll_height=this.content.scrollHeight;
const scroll_top=this.content.scrollTop;
let relative_top;
if(scroll_top>=scroll_height-height){
relative_top=relative_height-thumb_height;
}else{
relative_top=relative_height*(scroll_top/(scroll_height-height))-thumb_height/2;
if(relative_top+thumb_height>=relative_height){
relative_top=relative_height-thumb_height-3;
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
if(!this.is_scrollable()){
return null;
}
start_y=this.content.getBoundingClientRect().top+parseFloat(window.getComputedStyle(this.track).marginTop);
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
const height=this.content.clientHeight;
const y=Math.max(0,event.clientY-start_y);
let y_percentage=vweb.utils.round(y/height,2);const computed=window.getComputedStyle(this.content);
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
if(!this.is_scrollable()){
return null;
}
const height=this.content.clientHeight;
const start_y=this.content.getBoundingClientRect().top+parseFloat(window.getComputedStyle(this.track).marginTop);
const y=Math.max(0,event.clientY-start_y);
let y_percentage=vweb.utils.round(y/height,2);const computed=window.getComputedStyle(this.content);
const max_scroll_top=(
this.content.scrollHeight-
this.content.clientHeight+
parseFloat(computed.paddingTop)+
parseFloat(computed.paddingBottom)
);
const scroll_top=Math.round(max_scroll_top*y_percentage);
this.content.scrollTop=scroll_top;};
}
is_scrollable(){
return this.content.scrollHeight>this.content.clientHeight||this.content.scrollWidth>this.content.clientWidth;
}
remove_children(){
this.content.inner_html("");
return this;
}
append(...children){
this.content.append(...children);
return this;
}
child(index){
return this.content.child(index);
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
super_overflow_x(value){
if(value==null){
return super.overflow_x();
}
super.overflow_x(value);
return this;
}
overflow_y(value){
if(value==null){
return this.content.overflow_y();
}
this.content.overflow_y(value);
return this;
}
super_overflow_y(value){
if(value==null){
return super.overflow_y();
}
super.overflow_y(value);
return this;
}
show_overflow(){
super.overflow("visible");
this.content.overflow("visible");
return this;
}
hide_overflow(){
super.overflow("hidden");
this.content.overflow("auto");
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
on_scroll(opts_or_callback={callback:null,delay:null}){
if(opts_or_callback==null){return this.on_scroll_callbacks;}
let callback;
if(vweb.utils.is_func(opts_or_callback)){
const e=this;
callback=(event)=>opts_or_callback(e,event);
this.on_scroll_callbacks.push({callback,user_callback:opts_or_callback});
}else{
if(opts_or_callback.delay==null){
callback=opts_or_callback.callback;
}else{
let timer;
const e=this;
callback=function(t){
clearTimeout(timer);
setTimeout(()=>opts_or_callback.callback(e,t),opts_or_callback.delay);
}
}
this.on_scroll_callbacks.push({callback,user_callback:opts_or_callback.callback});
}
this.content.addEventListener("scroll",callback);
return this;
}
remove_on_scroll(callback){
let dropped=[];
this.on_scroll_callbacks.iterate((item)=>{
if(item.user_callback===callback){
this.content.removeEventListener("scroll",item.callback);
}else{
dropped.push(item);
}
})
this.on_scroll_callbacks=dropped;
return this;
}
set_scroll_top_without_event(top){
return this.set_scroll_position_without_event(top);
}
set_scroll_left_without_event(left){
return this.set_scroll_position_without_event(null,left);
}
set_scroll_position_without_event(top=null,left=null){
this.on_scroll_callbacks.iterate((item)=>{
this.content.removeEventListener("scroll",item.callback);
});
if(top!=null){
this.scroll_top(top);
}
if(left!=null){
this.scroll_left(left);
}
this.on_scroll_callbacks.iterate((item)=>{
this.content.addEventListener("scroll",item.callback);
});
return this;
}
}
vweb.elements.register(ScrollerElement);
function Scroller(...args){return new ScrollerElement(...args);}


class VirtualScrollerElement extends ScrollerElement{
constructor(...children){
super();
this.element_type="VirtualScoller";
this.v_children=[];
this.top_diff=0;
this.scroll_top_value=0;
this.last_v_children=0;
this.append(...children);
this.visible_container=VStack()
.position("relative")
.overflow_x("visible")
.overflow_y("hidden")
.styles({
"content-visibility":"auto",
})
this.content.append(this.visible_container)
this.height_measurer=Span()
.visibility("hidden")
this.content.append(this.height_measurer)
this.render(true);
this.content.addEventListener("scroll",()=>this.render())
}
set_default(){
return super.set_default(VirtualScrollerElement);
}
overflow(value){
if(value==null){
return this.content.overflow();
}
this.content.overflow(value);
this.visible_container.overflow_x(value.split(" ")[0]);
return this;
}
overflow_x(value){
if(value==null){
return this.content.overflow_x();
}
this.content.overflow_x(value);
this.visible_container.overflow_x(value);
return this;
}
remove_children(){
this.v_children=[];
this.visible_container.min_height(0);
this.visible_container.max_height(0);
this.visible_container.inner_html("");
return this;
}
render(){
const last_scroll_top=this.scroll_top_value;
this.scroll_top_value=this.content.scrollTop;
const last_v_children=this.last_v_children;
this.last_v_children=this.v_children.length;
let scrolling_down=true;
if(this.scroll_top_value>last_scroll_top){
scrolling_down=true;
}else if(this.scroll_top_value<last_scroll_top){
scrolling_down=false;
}
const start_y=this.content.scrollTop;
const end_y=start_y+this.content.offsetHeight+this.top_diff;
let is_first=true;
let is_visible=false;
let total_height=0;
let visible_height=0;
this.v_children.iterate((child)=>{
const height=child.v_height!==undefined ? child.v_height:this.get_height(child);
if(height==0){
return null;}
const child_start_y=total_height;
const child_end_y=total_height+height;total_height+=height;
if(is_first&&child_end_y>=start_y){
child.transform(`translateY(${child_start_y}px)`);visible_height+=height;
is_first=false;
is_visible=true;
if(!child.rendered){
if(scrolling_down){
this.visible_container.appendChild(child);
}else{
this.visible_container.insertBefore(child,this.visible_container.firstChild);
}
child.rendered=true;
}
}
else if(is_visible&&child_start_y>=end_y){
child.transform(`translateY(${child_start_y - visible_height}px)`);visible_height+=height;
is_visible=false;
if(!child.rendered){
if(scrolling_down){
this.visible_container.appendChild(child);
}else{
this.visible_container.insertBefore(child,this.visible_container.firstChild);
}
child.rendered=true;
}
}
else if(is_visible){
child.transform(`translateY(${child_start_y - visible_height}px)`);visible_height+=height;
if(!child.rendered){
if(scrolling_down){
this.visible_container.appendChild(child);
}else{
this.visible_container.insertBefore(child,this.visible_container.firstChild);
}
child.rendered=true;
}
}
else if(child.rendered){
child.remove();
child.rendered=false;
}
})
this.visible_container.min_height(total_height);
this.visible_container.max_height(total_height);
return this;
}
update_heights(){
this.v_children.iterate((child)=>{
child.v_height=this.get_height(child,false);
})
}
update_height(child){
child.v_height=this.get_height(child,false);
}
get_height(element,fixed=true){
let height;
if(fixed){
height=parseFloat(element.style.height);
if(isNaN(height)){
console.error("Every element in the virtual scroller must have a fixed height, ignoring element: "+element);
element.style.display="none";
return 0;
}
}
else{
element.rendered=false;this.height_measurer.appendChild(element);
height=element.offsetHeight;
this.height_measurer.removeChild(element);
}
const margin_top=parseFloat(element.style.marginTop);
if(!isNaN(margin_top)){
height+=margin_top;
}
const margin_bottom=parseFloat(element.style.marginBottom);
if(!isNaN(margin_bottom)){
height+=margin_bottom;
}
return height;
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
this.v_children.push(child);
}
}
else if(vweb.utils.is_func(child)){
this.append(child());
}
else if(child instanceof Node){
this.v_children.push(child);
}
else if(vweb.utils.is_string(child)){
this.v_children.push(document.createTextNode(child));
}
}
}
return this;
}
}
vweb.elements.register(VirtualScrollerElement);
function VirtualScroller(...args){return new VirtualScrollerElement(...args);}

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


class ContextMenuElement extends VStackElement{
constructor(content){
super();
this.element_type="ContextMenu";
content.iterate((item)=>{
if(item==null){
return null;
}
else if(typeof item==="object"){
const button=Button(item.label)
.padding(5,10,5,10)
.margin(0)
.font_size(12)
.leading()
.background("#FFFFFF15")
.border_radius(0)
if(typeof item.on_click==="function"){
button.on_click((element,event)=>item.on_click(element,event,this));
}
if(typeof item.on_render==="function"){
button.on_render((element)=>item.on_render(element));
}
this.append(button);
}else{
this.append(item);
}
})
this
.z_index(2).padding(5,0,5,0)
.color("white")
.background("gray")
.box_shadow("0px 0px 10px #00000050")
.border_radius(10)
.min_width(150)
this.remove_child_callback=()=>{
if(!this.contains(event.target)){
this.remove();
}
document.body.removeEventListener("mousedown",this.remove_child_callback);
}
}
set_default(){
return super.set_default(ContextMenuElement);
}
popup(event){
event.preventDefault();
super.show();
this.position(event.clientY,null,null,event.clientX)
document.body.appendChild(this);
document.body.addEventListener("mousedown",this.remove_child_callback);
}
close(){
super.remove();
document.body.removeEventListener("mousedown",this.remove_child_callback);
}
remove(){
super.remove();
document.body.removeEventListener("mousedown",this.remove_child_callback);
}
}
vweb.elements.register(ContextMenuElement);
function ContextMenu(...args){return new ContextMenuElement(...args);}

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


class PopupElement extends VStackElement{
constructor({
title="",
text="",
no="No",
yes="Yes",
image=false,
image_color="white",
content=[],
on_no=()=>{},
on_yes=()=>{},
on_popup=()=>{},
}){
super();
this.element_type="Popup";
this.mutex=new Mutex();
this.on_no_handler=on_no;
this.on_yes_handler=on_yes;
this.on_popup_handler=on_popup;
this.escape_handler=(event)=>{
if(event.key=="Escape"){
this.close();
}
};
this.image=ImageMask(image)
.mask_color(image_color)
.frame(35,35)
.position(-17.5,"calc(50% - 17.5px)",null,null);
if(image===false){
this.image.hide();
}
this.title_e=Title().append(title)
.font_family("inherit")
.font_weight(500)
.font_size(34)
.abs_parent(this)
this.title(title);
this.text_e=Text()
.font_family("inherit")
.font_size(16)
.line_height(22)
.max_width(300)
.margin(15,20,0,20)
.wrap(true)
.abs_parent(this)
this.text(text);
this.no_button=Button(no)
.padding(10,10,10,10)
.stretch(true)
.margin_right(5)
.abs_parent(this)
.on_click(()=>{
this.close();
})
this.yes_button=Button(yes)
.padding(10,10,10,10)
.stretch(true)
.margin_left(5)
.abs_parent(this)
.on_click(()=>{
this.hide();
document.body.removeEventListener("keydown",this.escape_handler);
this.on_yes_handler(this);
this.mutex.unlock();
});
this.buttons=HStack(this.no_button,this.yes_button)
.width("100%")
.margin_top(30)
.abs_parent(this)
this.content=VStack(...content)
.abs_parent(this);
this.widget=VStack(
this.image,
this.title_e,
this.text_e,
this.content,
this.buttons,
)
.position("relative")
.text_center()
.padding(40,20,20,20)
.max_width(400)
.border_radius(10)
.background("black")
.border(1,"gray")
.box_shadow("0px 0px 10px #00000050")
.abs_parent(this)
this.append(this.widget)
this.hide()
this.position(0,0,0,0)
this.background("#00000060")
this.center()
this.center_vertical()
this.z_index(10000)
}
set_default(){
return super.set_default(PopupElement);
}
async await(){
await this.mutex.lock();
this.mutex.unlock();
}
close(){
this.hide();
document.body.removeEventListener("keydown",this.escape_handler);
this.on_no_handler(this);
this.mutex.unlock();
}
title(data){
if(data==null){
return this.title_e.textContent;
}
if(typeof data==="string"){
this.title_e.inner_html(data);
}
else if(Array.isArray(data)){
data.iterate((item)=>{
this.title_e.append();
});
}
else{
this.title_e.append(data);
}
return this;
}
text(data){
if(data==null){
return this.text_e.textContent;
}
if(typeof data==="string"){
this.text_e.inner_html(data);
}
else if(Array.isArray(data)){
data.iterate((item)=>{
this.text_e.append();
});
}
else{
this.text_e.append(data);
}
return this;
}
image_color(value){
if(value==null){
return this.image.mask_color();
}
this.image.mask_color(value);
return this;
}
async popup({
title=null,
text=null,
image=null,
image_color=null,
content=null,
on_no=null,
on_yes=null,
}={}){
this.on_popup_handler(this);
if(title!==null){
this.title(title);
}
if(text!==null){
this.text(text);
}
if(image!==null){
this.image.src(image);
this.image.show();
}
if(image_color!==null){
this.image.mask_color(image_color);
}
if(on_no!==null){
this.on_no_handler=on_no;
}
if(on_yes!==null){
this.on_yes_handler=on_yes;
}
await this.mutex.lock();
if(content!==null){
this.content.inner_html("");
this.content.append(...content);
}
this.show();
this.focus();
document.body.addEventListener("keydown",this.escape_handler);}
}
vweb.elements.register(PopupElement);
function Popup(...args){return new PopupElement(...args);}
vweb.elements.register(Popup);


class SwitchElement extends VStackElement{
constructor(enabled=false){
super();
this.element_type="Switch";
this.slider=VStack()
.background("white")
.frame(35,12.5)
.border_radius(10)
.overflow("visible")
.box_shadow(`0px 0px 2px #00000030`)
.parent(this)
this.button=VStack()
.border_radius("50%")
.frame(17.5,17.5)
.background("gray")
.position("absolute")
.left(0)
.transition("left 0.15s ease-out")
.box_shadow(`0px 0px 2px #00000060`)
.on_click(()=>this.toggle())
.parent(this)
this.append(this.slider,this.button);
this.position("relative")
this.width(35)
this.flex_shrink(0)
this.center_vertical()
this.on_change_handler=()=>{};
this._enabled=enabled;
this._enabled_color="green";
this._disabled_color="gray";
this.enabled=this.value;
this.value(enabled,false);
this.on_theme_update(()=>{
this.value(this._enabled,false);
})
}
set_default(){
return super.set_default(SwitchElement);
}
width(value){
if(value==null){
return super.width();
}
super.width(value);
this.slider.width(value);
return this;
}
min_width(value){
if(value==null){
return super.min_width();
}
super.min_width(value);
this.slider.min_width(value);
return this;
}
max_width(value){
if(value==null){
return super.max_width();
}
super.max_width(value);
this.slider.max_width(value);
return this;
}
height(value){
if(value==null){
return super.height();
}
super.height(value);
this.slider.height(value/2);
return this;
}
min_height(value){
if(value==null){
return super.min_height();
}
super.min_height(value);
this.slider.min_height(value/2);
return this;
}
max_height(value){
if(value==null){
return super.max_height();
}
super.max_height(value);
this.slider.max_height(value/2);
return this;
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
min_frame(width,height){
if(width!=null){
this.min_width(width);
}
if(height!=null){
this.min_height(height);
}
return this;
}
max_frame(width,height){
if(width!=null){
this.max_width(width);
}
if(height!=null){
this.max_height(height);
}
return this;
}
enabled_color(value){
if(value==null){
return this._enabled_color;
}
this._enabled_color=value;
return this;
}
disabled_color(value){
if(value==null){
return this._disabled_color;
}
this._disabled_color=value;
return this;
}
toggle(){
return this.value(!this._enabled);
}
value(value,animate=true){
if(value==null){
return this._enabled;
}
else if(value===true){
this._enabled=value;
if(animate){
clearTimeout(this.timeout);
this.timeout=setTimeout(()=>this.button.background(this._enabled_color),140);
}else{
this.button.background(this._enabled_color);
}
const slider_width=this.slider.getBoundingClientRect().width;
const button_width=this.button.getBoundingClientRect().width;
if(slider_width&&button_width){
this.button.style.left=`${slider_width - button_width}px`;
this.button.style.right="auto";
}else{
this.button.style.left="auto";
this.button.style.right="0px";
}
this.on_change_handler(this,this._enabled);
}
else if(value===false){
this._enabled=value;
if(animate){
clearTimeout(this.timeout);
this.timeout=setTimeout(()=>this.button.background(this._disabled_color),140);
}else{
this.button.background(this._disabled_color);
}
const slider_width=this.slider.getBoundingClientRect().width;
const button_width=this.button.getBoundingClientRect().width;
if(slider_width&&button_width){
if(this.button.style.left==="auto"){this.button.style.left=`${slider_width - button_width}px`;
setTimeout(()=>{
this.button.style.right="auto";
this.button.style.left="0px";
},10)
}else{
this.button.style.right="auto";
this.button.style.left="0px";
}
}else{
this.button.style.left="0px";
this.button.style.right="auto";
}
this.on_change_handler(this,this._enabled);
}
return this;
}
on_change(handler){
if(handler==null){
return this.on_change_handler;
}
this.on_change_handler=handler;
return this;
}
}
vweb.elements.register(SwitchElement);
function Switch(...args){return new SwitchElement(...args);}


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
if(Array.isArray(items)){
for(let i=0;i<items.length;i++){
this.append(func(items[i],i));
}
}else if(typeof items==="object"){
let index=0;
Object.keys(items).iterate((key)=>{
this.append(func(key,items[key],index));
++index;
})
}else{
throw Error(`Parameter "items" has an invalid value type, the valid value types are "array" or "object".`);
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
vhighlight.tokenize(options);
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
"white-space":"pre",
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
highlight(options={}){
options.element=this;
vhighlight.tokenize(options);
return this;
}
}
vweb.elements.register(CodePreElement);
function CodePre(...args){return new CodePreElement(...args);}


class CodeLineElement extends CreateVElementClass({
type:"CodeLine",
tag:"span",
default_style:{
"font-family":"\"Menlo\", \"Consolas\", monospace",
"font-size":"0.90em",
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
constructor(text){
super();
this.inner_html(text);
}
}
vweb.elements.register(TitleElement);
function Title(...args){return new TitleElement(...args);}


class SubtitleElement extends CreateVElementClass({
type:"Subtitle",
tag:"h2",
default_style:{
"margin":"0px 0px 0px 0px",
"color":"inherit",
"white-space":"wrap",
"text-align":"inherit",
},
}){
constructor(text){
super();
this.inner_html(text);
}
}
vweb.elements.register(SubtitleElement);
function Subtitle(...args){return new SubtitleElement(...args);}


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


class RefundViewElement extends VStackElement{
static default_style={
...VStackElement.default_style,
};
constructor({
green="green",
red="red",
bg="white",
sub_bg="gray",
title_fg="black",
text_fg="black",
subtext_fg="#6D6E77",
theme_fg="blue",
theme_gradient=null,
border_radius=10,
check_image="/static/icons/check.sign.png",
error_image="/static/icons/warning.white.png",
no_refundable_payments_image="/static/icons/sad.png",
auto_advance=true,}={}){
super();
this.base_element_type="RefundView";
this.styles(ExtendedInputElement.default_style);
if(theme_gradient==null){
theme_gradient=theme_fg;
}
this.all_payments=[];
const _this_=this;
this.width("100%")
function Widget(...children){
return VStack(...children)
.background(bg)
.padding(25)
.border_radius(border_radius)
.stretch(true)
}
function WidgetTitle(text){
return Title(text)
.color(title_fg)
.font_size(20)
.flex_shrink(0)
.margin(0,0,5,0)
.padding(0)
.wrap(false)
.overflow("hidden")
.text_overflow("ellipsis")
}
function WidgetText(text){
return Text(text)
.color(text_fg)
.font_size(16)
.line_height(18)
.flex_shrink(0)
.margin(0,0,5,0)
.padding(0)
.wrap(true)
}
function CircledImage(src,background=green){
return ImageMask(src)
.padding(7.5)
.frame(30,30)
.mask_color(bg)
.background(background)
.border_radius("50%")
}
this.menu_buttons=[];
this.payments=Widget(
HStack(
ForEach([
"Refundable",
"Refunded",
],(item,index)=>{
const id=item.toLowerCase().replace(" ","_");
return VStack(
WidgetText(item)
.id(id)
.font_size(12)
.color(index===0 ? theme_gradient:title_fg)
.padding(0)
.margin(0)
.exec((element)=>{
_this_.menu_buttons.push(element);
})
)
.margin_right(15)
.border_radius(25)
.background(sub_bg)
.padding(5,10)
.on_click(()=>{
_this_.payments.show_view(id)
})
})
)
.margin_bottom(15),
WidgetTitle("Refundable Payments")
.margin(0)
.assign_to_parent_as("title"),
Divider()
.margin(25,0,25,0),
VStack(
WidgetTitle("Processing")
.font_size(18),
WidgetText("Retrieving all refundable payments, please wait.")
.font_size(14)
.margin(0,0,0,0)
.center(),
RingLoader()
.background(theme_fg)
.frame(30,30)
.update()
.margin_top(20),
)
.padding(10,0,10,0)
.center()
.center_vertical()
.frame("100%","100%")
.assign_to_parent_as("processing"),
VStack(
WidgetTitle("Error")
.font_size(18),
WidgetText("Encountered an error while retrieving the refundable payments.")
.font_size(14)
.margin(0,0,0,0)
.center(),
CircledImage(error_image,red)
.margin_top(20),
)
.hide()
.center()
.center_vertical()
.frame("100%","100%")
.assign_to_parent_as("error"),
VStack()
.hide()
.assign_to_parent_as("refundable")
.extend({
render:function(){
this.inner_html("");
let index=0;
let count=0;
let last_divider;
_this_.all_payments.iterate((item)=>{
if(item.refund!=null){
return null;
}
++count;
const currency_symbol=vweb.payments.get_currency_symbol(item.product.currency);
const error_element=WidgetText("Some error has occurred.")
.hide()
.margin_top(10)
.font_size(16)
.color(red)
.opacity(0)
.transition("opacity 0.2s ease-in-out")
.extend({
popup:function(text){
if(text instanceof Error){
text=text.message;
}else if(typeof text==="object"&&text.error){
text=text.error;
}
this.text(text);
this.show();
setTimeout(()=>this.opacity(1),10);
return this;
},
});
this.append(
HStack(
item.product.icon==null ? null:
Image(item.product.icon)
.frame(30,30)
.flex_shrink(0)
.margin(0,25,0,0),
VStack(
WidgetTitle(item.product.name)
.font_size(16)
.margin(0,10,0,0),
WidgetText(item.product.description)
.color(subtext_fg)
.font_size(14)
.line_height(16)
.margin(10,10,0,0)
.wrap(true)
.padding(0),
WidgetText(`Quantity: ${item.quantity}`)
.color(subtext_fg)
.font_size(14)
.margin(0)
.margin_top(10)
.padding(0)
.flex_shrink(0)
.wrap(true),
WidgetText(`Purchased at ${vweb.utils.unix_to_date(item.timestamp)}.`)
.color(subtext_fg)
.font_size(14)
.margin(0)
.margin_top(10)
.padding(0)
.flex_shrink(0)
.wrap(true),
error_element,
)
.stretch(true),
VStack(
VStack(
WidgetTitle(`${currency_symbol} ${item.amount.toFixed(2)}`)
.font_size(16)
.margin(0)
.padding(0),
WidgetText(`${currency_symbol} ${item.product.price} per item`)
.color(subtext_fg)
.font_size(12)
.margin(5,0,0,0)
.padding(0)
.flex_shrink(0)
.wrap(false)
.overflow("hidden")
.text_overflow("ellipsis"),
)
.leading(),
LoaderButton("Refund")
.max_width(120)
.width("100%")
.margin_top(20)
.padding(7.5,15,7.5,15)
.font_size(14)
.loader
.frame(18,18)
.update()
.parent()
.on_click((element)=>{
console.log(item);
element.show_loader()
vweb.payments.create_refund({payment:item,auto_advance:auto_advance})
.then((response)=>{
_this_.payments.render("refunded")
.then(()=>element.hide_loader())
.catch(()=>element.hide_loader())
}).catch((error)=>{
error_element.popup(error);
element.hide_loader()
})
}),
)
.center()
.min_width(120)
.max_width(120)
.height("100%")
)
.width("100%"),
(last_divider=Divider()
.margin(20,0,20,0)),
)
++index;
});
if(last_divider!=null){
last_divider.remove();
}
if(count===0){
this.inner_html("");
this.append(
VStack(
WidgetTitle("No Refundable Payments")
.font_size(18),
WidgetText("Unfortunately no refundable payments were found.")
.font_size(14)
.margin(0,0,0,0)
.center(),
CircledImage(no_refundable_payments_image,red)
.margin_top(20),
)
.padding(12.5,0,12.5,0)
.center()
.center_vertical()
.frame("100%","100%")
);
}
return this;
},
}),
VStack()
.hide()
.assign_to_parent_as("refunded")
.extend({
render:function(){
this.inner_html("");
let index=0;
let count=0;
let last_divider;
_this_.all_payments.iterate((item)=>{
if(item.refund==null){
return null;
}
++count;
const currency_symbol=vweb.payments.get_currency_symbol(item.product.currency);
let refund_status,refund_failure;
switch(item.refund.status){
case "succeeded":
refund_status=VStack(
HStack(
WidgetTitle("Refunded")
.font_size(15)
.margin(0),
CircledImage(check_image,green)
.frame(17.5,17.5)
.padding(4)
.margin(0,0,0,10),
)
.center_vertical(),
WidgetText(item.refund.description)
.font_style("italic")
.color(subtext_fg)
.font_size(14)
.line_height(14)
.margin_top(10)
.wrap(true),
)
.center_vertical()
break;
case "canceled":
refund_status=VStack(
HStack(
WidgetTitle("Cancelled")
.font_size(15)
.margin(0),
CircledImage(check_image,green)
.frame(17.5,17.5)
.padding(4)
.margin(0,0,0,10),
)
.center_vertical(),
WidgetText(item.refund.description)
.font_style("italic")
.color(subtext_fg)
.font_size(14)
.line_height(14)
.margin_top(10)
.wrap(true),
)
.center_vertical()
break;
case "processing":
refund_status=VStack(
HStack(
WidgetTitle("Processing")
.font_size(15)
.margin(0),
RingLoader()
.background(theme_fg)
.frame(17.5,17.5)
.update()
.margin_left(10),
)
.center_vertical(),
WidgetText(item.refund.description)
.font_style("italic")
.color(subtext_fg)
.font_size(14)
.line_height(14)
.margin_top(10)
.wrap(true),
)
.center_vertical()
break;
case "failed":
refund_status=VStack(
HStack(
WidgetTitle("Failed")
.font_size(15)
.margin(0),
CircledImage(error_image,red)
.frame(17.5,17.5)
.padding(4)
.margin(0,0,0,10),
)
.center_vertical(),
WidgetText(item.refund.description)
.font_style("italic")
.color(subtext_fg)
.font_size(14)
.line_height(14)
.margin_top(10)
.wrap(true),
)
break;
case "requires_action":
refund_status=VStack(
HStack(
WidgetTitle("Requires Action")
.font_size(15)
.margin(0),
CircledImage(error_image,red)
.frame(17.5,17.5)
.padding(4)
.margin(0,0,0,10),
)
.center_vertical(),
WidgetText(item.refund.description)
.font_style("italic")
.color(subtext_fg)
.font_size(14)
.line_height(14)
.margin_top(10)
.wrap(true),
)
break;
default:
console.error("Unknown refund status: "+item.refund.status);
break;
}
this.append(
HStack(
item.product.icon==null ? null:
Image(item.product.icon)
.frame(30,30)
.flex_shrink(0)
.margin(0,25,0,0),
VStack(
WidgetTitle(item.product.name)
.font_size(18)
.margin(0,10,0,0),
WidgetText(item.product.description)
.color(subtext_fg)
.font_size(14)
.line_height(16)
.margin(10,10,0,0)
.wrap(true)
.padding(0),
WidgetText(`Purchased at ${vweb.utils.unix_to_date(item.timestamp)}.`)
.color(subtext_fg)
.font_size(14)
.margin(10,0,0,0)
.padding(0)
.flex_shrink(0)
.wrap(true),
refund_status
.margin_top(20),
)
.stretch(true),
VStack(
WidgetTitle(`${currency_symbol} ${item.amount.toFixed(2)}`)
.font_size(16)
.margin(0)
.padding(0),
WidgetText(`${currency_symbol} ${item.product.price} per item`)
.color(subtext_fg)
.font_size(12)
.margin(5,0,0,0)
.padding(0)
.flex_shrink(0)
.wrap(false)
.overflow("hidden")
.text_overflow("ellipsis"),
)
)
.width("100%"),
(last_divider=Divider()
.margin(20,0,20,0)),
)
++index;
});
if(last_divider!=null){
last_divider.remove();
}
if(count===0){
this.inner_html("");
this.append(
VStack(
WidgetTitle("No Refunded Payments")
.font_size(18),
WidgetText("No refunded payments were found.")
.font_size(14)
.margin(0,0,0,0)
.center(),
)
.padding(25,0,25,0)
.center()
.center_vertical()
.frame("100%","100%")
);
}
return this;
},
}),
)
.parent(this)
.width("100%")
.extend({
show_view:function(id){
const views={
"processing":"Refundable Payments",
"error":"Refundable Payments",
"refundable":"Refundable Payments",
"refunded":"Refunded Payments",
}
Object.keys(views).iterate((key)=>{
if(key===id){
this[key].show();
this.title.text(views[key]);
}else{
this[key].hide();
}
});
_this_.menu_buttons.iterate((element)=>{
if(element.id()===id){
element.color(theme_gradient)
}else{
element.color(title_fg)
}
})
},
render:async function(show_view="refundable"){
return new Promise((resolve)=>{
vweb.payments.get_refundable_payments()
.then((payments)=>{
_this_.all_payments=payments;
this.refundable.render();
this.refunded.render();
this.show_view(show_view);
resolve();
})
.catch((error)=>{
console.error(error);
this.show_view("error");
resolve();
})
})
}
})
this.payments.render();
this.append(
this.menu,
this.payments,
)
}
set_default(){
return super.set_default(ExtendedInputElement);
}
}
vweb.elements.register(RefundViewElement);
function RefundView(...args){return new RefundViewElement(...args);}


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
this.mask_child=VStack()
.width("100%")
.height("100%")
.background("black")
if(src!=null){
this.mask_child.mask("url('"+src+"') no-repeat center/contain");
}
this.append(this.mask_child);
this.src(src);
}
mask_color(value){
if(value==null){
return this.mask_child.style.background;
}
this.mask_child.style.background=value;
return this;
}
src(value){
if(value==null){
return this._src;
}
this.mask_child.mask("url('"+value+"') no-repeat center/contain");
this._src=value;
return this;
}
mask(value){
if(value==null){
return this.mask_child.mask();
}
this.mask_child.mask(value);
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
tag:"div",
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
"background":"none",
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
.inset(0)
.padding(BorderButtonElement.default_style["--child-border-width"])
.border_radius(BorderButtonElement.default_style["--child-border-radius"])
.background(BorderButtonElement.default_style["--child-background"])
.mask("linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)")
.mask_composite("exclude")
.styles({
"-webkit-mask":"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
"-webkit-mask-composite":navigator.userAgent.includes("Firefox")? "exclude":"xor",
})
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
static default_style={
...HStackElement.default_style,
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
constructor(text="",loader=RingLoader){
super();
this.element_type="LoaderButton";
this.styles(LoaderButtonElement.default_style);
this.wrap(false);
this.center();
this.center_vertical()
this.loader=loader()
.frame(LoaderButtonElement.default_style["--loader-width"],LoaderButtonElement.default_style["--loader-height"])
.margin_right(LoaderButtonElement.default_style["--loader-margin-right"])
.margin_top(LoaderButtonElement.default_style["--loader-margin-top"])
.background("white")
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
styles["--loader-width"]=this.loader.style.width||"25px";
styles["--loader-height"]=this.loader.style.height||"25px";
styles["--loader-margin-right"]=this.loader.margin_right()||"15px";
styles["--loader-margin-top"]=this.loader.margin_top()||"-2px";
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


class SliderElement extends VStackElement{
constructor(value=0.0){
super();
this.element_type="Slider";
this._type="SliderElement";
this._value=value;
this._enabled_color="green";
this._disabled_color="none";
this.slider=VStack(
VStack()
.position(0,null,0,0)
.background(this._enabled_color)
.transition("right 0.05s ease-out"),
VStack()
.position(0,0,0,0)
.background(this._disabled_color)
.transition("left 0.05s ease-out"),
)
.background("white")
.position("relative")
.frame("100%",5)
.border_radius(10)
.overflow("hidden")
.box_shadow(`0px 0px 2px #00000030`)
.on_click((element,event)=>this.slider_on_mouse_down_handler(event))
.parent(this)
.abs_parent(this)
this.button=VStack()
.border_radius("50%")
.frame(15,15)
.background("gray")
.position("absolute")
.left(0)
.top(0)
.transition("left 0.05s ease-out")
.box_shadow(`0px 0px 2px #00000060`)
.cursor("pointer")
.on_mouse_down(()=>this.on_mouse_down_handler())
.parent(this)
.abs_parent(this)
this.append(this.slider,this.button)
this.min_height(15)
this.position("relative")
this.flex_shrink(0)
this.center_vertical()
this.height("fit-content")
this.slider_on_mouse_down_handler=(event)=>{
this.rect=this.getBoundingClientRect();
this.button_rect=this.button.getBoundingClientRect();
const min=this.rect.left;
const max=this.rect.left+this.rect.width;
const x=Math.max(min,Math.min(event.clientX,max));
this.value((x-min)/(max-min));
}
this.on_mouse_down_handler=()=>{
this.dragging=true;
this.rect=this.getBoundingClientRect();
this.button_rect=this.button.getBoundingClientRect();
document.body.addEventListener("mouseup",this.on_mouse_up_handler);
document.body.addEventListener("mousemove",this.on_mouse_move_handler);
}
this.on_mouse_move_handler=(event)=>{
this.rect=this.getBoundingClientRect();
this.button_rect=this.button.getBoundingClientRect();
const min=this.rect.left;
const max=this.rect.left+this.rect.width;
const x=Math.max(min,Math.min(event.clientX,max));
this.value((x-min)/(max-min));
}
this.on_mouse_up_handler=()=>{
this.dragging=false;
document.body.removeEventListener("mouseup",this.on_mouse_up_handler);
document.body.removeEventListener("mousemove",this.on_mouse_move_handler);
}
this.on_change_handler=()=>{};
if(value!=0.0){
this.on_render(()=>{
this.value(value);
})
}
}
set_default(){
return super.set_default(SliderElement);
}
enabled_color(value){
if(value==null){
return this._enabled_color;
}
this._enabled_color=value;
this.slider.child(0).background(this._enabled_color);
return this;
}
disabled_color(value){
if(value==null){
return this._disabled_color;
}
this._disabled_color=value;
this.slider.child(1).background(this.disabled_color);
return this;
}
on_change(handler){
if(handler==null){
return this.on_change_handler;
}
this.on_change_handler=handler;
return this;
}
value(value){
if(value==null){
return this._value;
}
this._value=Math.max(0.0,Math.min(1.0,value));
this.rect=this.getBoundingClientRect();
this.button_rect=this.button.getBoundingClientRect();
this.slider_rect=this.slider.getBoundingClientRect();
const left=Math.min(
this.rect.width-this.button_rect.width,
Math.max(
0,
(this._value*this.rect.width)-(this.button_rect.width/2)
)
);
this.button.style.left=`${left}px`
this.slider.child(0).right(this.slider_rect.width-left);
this.slider.child(1).left(left);
this.on_change_handler(this,this._value)
return this;
}
}
vweb.elements.register(SliderElement);
function Slider(...args){return new SliderElement(...args);}


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
default_attributes:{
"spellcheck":"false",
"autocorrect":"off",
"autocapitalize":"none",
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


class ExtendedInputElement extends VStackElement{
static default_style={
...VStackElement.default_style,
"color":"inherit",
"font-size":"16px",
"--input-padding":"12px",
"--input-border-radius":"5px",
"--input-border":"1px solid gray",
"--focus-color":"#8EB8EB",
};
constructor({
placeholder="Input",
readonly=false,
type=Input,
}={}){
super();
this.base_element_type="LabeledInput";
this._focus_color=ExtendedInputElement.default_style["--focus-color"];
this.styles(ExtendedInputElement.default_style);
this.input=type(placeholder)
.parent(this)
.color("inherit")
.readonly(readonly)
.font_size("inherit")
.padding(ExtendedInputElement.default_style["--input-padding"])
.margin(0)
.border_radius(ExtendedInputElement.default_style["--input-border-radius"])
.border(ExtendedInputElement.default_style["--input-border"])
.width("100%")
.stretch(true)
.transition("outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out")
.on_focus((element)=>{
element.outline(`1px solid ${this._focus_color}`)
element.box_shadow(`0 0 0 4px ${this._focus_color}80`)
})
.on_blur((element)=>{
element.outline("none")
element.box_shadow(`none`)
})
this.append(this.input);
}
styles(style_dict){
if(style_dict==null){
let styles=super.styles();
styles["--input-padding"]=this.input.padding();
styles["--input-border-radius"]=this.input.border_radius();
styles["--input-border"]=this.input.border();
styles["--focus-color"]=this._focus_color;
return styles;
}else{
return super.styles(style_dict);
}
}
set_default(){
return super.set_default(ExtendedInputElement);
}
focus_color(val){
if(val==null){return this._focus_color;}
this._focus_color=val;
return this;
}
value(val){if(val==null){return this.input.value();}this.input.value(val);return this;}
text(val){if(val==null){return this.input.text();}this.input.text(val);return this;}
on_enter(val){if(val==null){return this.input.on_enter();}this.input.on_enter(val);return this;}
on_input(val){if(val==null){return this.input.on_input();}this.input.on_input(val);return this;}
border(val){if(val==null){return this.input.border();}this.input.border(val);return this;}
border_radius(val){if(val==null){return this.input.border_radius();}this.input.border_radius(val);return this;}
border_color(val){if(val==null){return this.input.border_color();}this.input.border_color(val);return this;}
border_width(val){if(val==null){return this.input.border_width();}this.input.border_width(val);return this;}
border_style(val){if(val==null){return this.input.border_style();}this.input.border_style(val);return this;}
}
vweb.elements.register(ExtendedInputElement);
function ExtendedInput(...args){return new ExtendedInputElement(...args);}


class LabeledInputElement extends VStackElement{
static default_style={
...VStackElement.default_style,
"color":"inherit",
"font-size":"16px",
"--input-padding":"12px",
"--input-border-radius":"5px",
"--input-border":"1px solid gray",
"--focus-color":"#8EB8EB",
};
constructor({
label="Label",
placeholder="Input",
readonly=false,
type=Input,
}={}){
super();
this.base_element_type="LabeledInput";
this._focus_color=LabeledInputElement.default_style["--focus-color"];
this.styles(LabeledInputElement.default_style);
this.label=Text(label)
.parent(this)
.font_size("inherit")
.margin_bottom(5)
.color("inherit");
this.input=type(placeholder)
.parent(this)
.color("inherit")
.readonly(readonly)
.font_size("inherit")
.padding(LabeledInputElement.default_style["--input-padding"])
.margin(0)
.border_radius(LabeledInputElement.default_style["--input-border-radius"])
.border(LabeledInputElement.default_style["--input-border"])
.width("100%")
.stretch(true)
.transition("outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out")
.on_focus((element)=>{
element.outline(`1px solid ${this._focus_color}`)
element.box_shadow(`0 0 0 4px ${this._focus_color}80`)
})
.on_blur((element)=>{
element.outline("none")
element.box_shadow(`none`)
})
this.append(this.label,this.input);
}
styles(style_dict){
if(style_dict==null){
let styles=super.styles();
styles["--input-padding"]=this.input.padding();
styles["--input-border-radius"]=this.input.border_radius();
styles["--input-border"]=this.input.border();
styles["--focus-color"]=this._focus_color;
return styles;
}else{
return super.styles(style_dict);
}
}
set_default(){
return super.set_default(LabeledInputElement);
}
focus_color(val){
if(val==null){return this._focus_color;}
this._focus_color=val;
return this;
}
value(val){if(val==null){return this.input.value();}this.input.value(val);return this;}
text(val){if(val==null){return this.input.text();}this.input.text(val);return this;}
on_enter(val){if(val==null){return this.input.on_enter();}this.input.on_enter(val);return this;}
on_input(val){if(val==null){return this.input.on_input();}this.input.on_input(val);return this;}
border(val){if(val==null){return this.input.border();}this.input.border(val);return this;}
border_radius(val){if(val==null){return this.input.border_radius();}this.input.border_radius(val);return this;}
border_color(val){if(val==null){return this.input.border_color();}this.input.border_color(val);return this;}
border_width(val){if(val==null){return this.input.border_width();}this.input.border_width(val);return this;}
border_style(val){if(val==null){return this.input.border_style();}this.input.border_style(val);return this;}
}
vweb.elements.register(LabeledInputElement);
function LabeledInput(...args){return new LabeledInputElement(...args);}


class ImageInputElement extends HStackElement{
static default_style={
...HStackElement.default_style,
"margin":"0px",
"padding":"12px",
"border-radius":"5px",
"border":"1px solid gray",
"color":"inherit",
"font-size":"16px",
"--image-mask-color":"#000",
"--image-size":"20px",
"--image-margin-right":"10px",
"--image-margin-left":"5px",
"--image-alt":"VWeb",
"--focus-color":"#8EB8EB",
};
constructor({
image="",
placeholder="Input",
readonly=false,
type=Input,
alt="",
}={}){
super();
this.base_element_type="ImageInput";
this._focus_color=ImageInputElement.default_style["--focus-color"];
this.styles(ImageInputElement.default_style);
this.image=ImageMask(image)
.parent(this)
.mask_color(ImageInputElement.default_style["--image-mask-color"])
.frame(ImageInputElement.default_style["--image-size"],ImageInputElement.default_style["--image-size"])
.margin(0,ImageInputElement.default_style["--image-margin-right"],0,ImageInputElement.default_style["--image-margin-left"])
.alt(alt!=="" ? alt:ImageInputElement.default_style["--image-alt"]);
this.input=type(placeholder)
.parent(this)
.color("inherit")
.readonly(readonly)
.font_size("inherit")
.margin(0)
.stretch(true)
.on_focus((element)=>{
this.outline(`1px solid ${this._focus_color}`)
this.box_shadow(`0 0 0 4px ${this._focus_color}80`)
})
.on_blur((element)=>{
this.outline("none")
this.box_shadow(`none`)
})
this.transition("outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out")
this.append(this.image,this.input);
}
styles(style_dict){
if(style_dict==null){
let styles=super.styles();
styles["--image-mask-color"]=this.image.mask_color();
styles["--image-size"]=this.image.width();
styles["--image-margin-right"]=this.image.margin_right();
styles["--image-margin-left"]=this.image.margin_left();
styles["--image-alt"]=this.image.alt()||"VWeb";
styles["--focus-color"]=this._focus_color;
return styles;
}else{
return super.styles(style_dict);
}
}
set_default(){
return super.set_default(ImageInputElement);
}
focus_color(val){
if(val==null){return this._focus_color;}
this._focus_color=val;
return this;
}
value(val){if(val==null){return this.input.value();}this.input.value(val);return this;}
text(val){if(val==null){return this.input.text();}this.input.text(val);return this;}
on_enter(val){if(val==null){return this.input.on_enter();}this.input.on_enter(val);return this;}
on_input(val){if(val==null){return this.input.on_input();}this.input.on_input(val);return this;}
mask_color(val){if(val==null){return this.image.mask_color();}this.image.mask_color(val);return this;}
}
vweb.elements.register(ImageInputElement);
function ImageInput(...args){return new ImageInputElement(...args);}


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
constructor(){
super();
for(let i=0;i<arguments.length;i++){
let e=document.createElement("option");
e.style.font="inherit";
e.value=arguments[i];
e.textContent=arguments[i];
if(i==0){
e.selected=true;
}
this.append(e);
}
}
}
vweb.elements.register(SelectOptionInputElement);
function SelectOptionInput(...args){return new SelectOptionInputElement(...args);}!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={})}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,i=286,n=30,s=15,r=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),o=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);e(d);const _=new Array(60);e(_);const f=new Array(512);e(f);const c=new Array(256);e(c);const u=new Array(29);e(u);const w=new Array(n);function m(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}let b,g,p;function k(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(w);const v=t=>t<256?f[t]:f[256+(t>>>7)],y=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},x=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,y(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},z=(t,e,a)=>{x(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const i=new Array(16);let n,r,o=0;for(n=1;n<=s;n++)o=o+a[n-1]<<1,i[n]=o;for(r=0;r<=e;r++){let e=t[2*r+1];0!==e&&(t[2*r]=A(i[e]++,e))}},R=t=>{let e;for(e=0;e<i;e++)t.dyn_ltree[2*e]=0;for(e=0;e<n;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.sym_next=t.matches=0},Z=t=>{t.bi_valid>8?y(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},U=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},S=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&U(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!U(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i},D=(t,e,i)=>{let n,s,l,h,d=0;if(0!==t.sym_next)do{n=255&t.pending_buf[t.sym_buf+d++],n+=(255&t.pending_buf[t.sym_buf+d++])<<8,s=t.pending_buf[t.sym_buf+d++],0===n?z(t,s,e):(l=c[s],z(t,l+a+1,e),h=r[l],0!==h&&(s-=u[l],x(t,s,h)),n--,l=v(n),z(t,l,i),h=o[l],0!==h&&(n-=w[l],x(t,n,h)))}while(d<t.sym_next);z(t,256,e)},T=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,r=e.stat_desc.elems;let o,l,h,d=-1;for(t.heap_len=0,t.heap_max=573,o=0;o<r;o++)0!==a[2*o]?(t.heap[++t.heap_len]=d=o,t.depth[o]=0):a[2*o+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=d<2?++d:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,n&&(t.static_len-=i[2*h+1]);for(e.max_code=d,o=t.heap_len>>1;o>=1;o--)S(t,a,o);h=r;do{o=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),l=t.heap[1],t.heap[--t.heap_max]=o,t.heap[--t.heap_max]=l,a[2*h]=a[2*o]+a[2*l],t.depth[h]=(t.depth[o]>=t.depth[l]?t.depth[o]:t.depth[l])+1,a[2*o+1]=a[2*l+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,o=e.stat_desc.extra_bits,l=e.stat_desc.extra_base,h=e.stat_desc.max_length;let d,_,f,c,u,w,m=0;for(c=0;c<=s;c++)t.bl_count[c]=0;for(a[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=a[2*a[2*_+1]+1]+1,c>h&&(c=h,m++),a[2*_+1]=c,_>i||(t.bl_count[c]++,u=0,_>=l&&(u=o[_-l]),w=a[2*_],t.opt_len+=w*(c+u),r&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==m){do{for(c=h-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[h]--,m-=2}while(m>0);for(c=h;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>i||(a[2*f+1]!==c&&(t.opt_len+=(c-a[2*f+1])*a[2*f],a[2*f+1]=c),_--)}})(t,e),E(a,d,t.bl_count)},O=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++o<l&&n===r||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):o<=10?t.bl_tree[34]++:t.bl_tree[36]++,o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4))},I=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++o<l&&n===r)){if(o<h)do{z(t,n,t.bl_tree)}while(0!=--o);else 0!==n?(n!==s&&(z(t,n,t.bl_tree),o--),z(t,16,t.bl_tree),x(t,o-3,2)):o<=10?(z(t,17,t.bl_tree),x(t,o-3,3)):(z(t,18,t.bl_tree),x(t,o-11,7));o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4)}};let F=!1;const L=(t,e,a,i)=>{x(t,0+(i?1:0),3),Z(t),y(t,a),y(t,~a),a&&t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a};var N=(t,e,i,n)=>{let s,r,o=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),T(t,t.l_desc),T(t,t.d_desc),o=(t=>{let e;for(O(t,t.dyn_ltree,t.l_desc.max_code),O(t,t.dyn_dtree,t.d_desc.max_code),T(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),s=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=s&&(s=r)):s=r=i+5,i+4<=s&&-1!==e?L(t,e,i,n):4===t.strategy||r===s?(x(t,2+(n?1:0),3),D(t,d,_)):(x(t,4+(n?1:0),3),((t,e,a,i)=>{let n;for(x(t,e-257,5),x(t,a-1,5),x(t,i-4,4),n=0;n<i;n++)x(t,t.bl_tree[2*h[n]+1],3);I(t,t.dyn_ltree,e-1),I(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,o+1),D(t,t.dyn_ltree,t.dyn_dtree)),R(t),n&&Z(t)},B={_tr_init:t=>{F||((()=>{let t,e,a,h,k;const v=new Array(16);for(a=0,h=0;h<28;h++)for(u[h]=a,t=0;t<1<<r[h];t++)c[a++]=h;for(c[a-1]=h,k=0,h=0;h<16;h++)for(w[h]=k,t=0;t<1<<o[h];t++)f[k++]=h;for(k>>=7;h<n;h++)for(w[h]=k<<7,t=0;t<1<<o[h]-7;t++)f[256+k++]=h;for(e=0;e<=s;e++)v[e]=0;for(t=0;t<=143;)d[2*t+1]=8,t++,v[8]++;for(;t<=255;)d[2*t+1]=9,t++,v[9]++;for(;t<=279;)d[2*t+1]=7,t++,v[7]++;for(;t<=287;)d[2*t+1]=8,t++,v[8]++;for(E(d,287,v),t=0;t<n;t++)_[2*t+1]=5,_[2*t]=A(t,5);b=new m(d,r,257,i,s),g=new m(_,o,0,n,s),p=new m(new Array(0),l,0,19,7)})(),F=!0),t.l_desc=new k(t.dyn_ltree,b),t.d_desc=new k(t.dyn_dtree,g),t.bl_desc=new k(t.bl_tree,p),t.bi_buf=0,t.bi_valid=0,R(t)},_tr_stored_block:L,_tr_flush_block:N,_tr_tally:(t,e,i)=>(t.pending_buf[t.sym_buf+t.sym_next++]=e,t.pending_buf[t.sym_buf+t.sym_next++]=e>>8,t.pending_buf[t.sym_buf+t.sym_next++]=i,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(c[i]+a+1)]++,t.dyn_dtree[2*v(e)]++),t.sym_next===t.sym_end),_tr_align:t=>{x(t,2,3),z(t,256,d),(t=>{16===t.bi_valid?(y(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var C=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const M=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var H=(t,e,a,i)=>{const n=M,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},j={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},K={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:P,_tr_stored_block:Y,_tr_flush_block:G,_tr_tally:X,_tr_align:W}=B,{Z_NO_FLUSH:q,Z_PARTIAL_FLUSH:J,Z_FULL_FLUSH:Q,Z_FINISH:V,Z_BLOCK:$,Z_OK:tt,Z_STREAM_END:et,Z_STREAM_ERROR:at,Z_DATA_ERROR:it,Z_BUF_ERROR:nt,Z_DEFAULT_COMPRESSION:st,Z_FILTERED:rt,Z_HUFFMAN_ONLY:ot,Z_RLE:lt,Z_FIXED:ht,Z_DEFAULT_STRATEGY:dt,Z_UNKNOWN:_t,Z_DEFLATED:ft}=K,ct=258,ut=262,wt=42,mt=113,bt=666,gt=(t,e)=>(t.msg=j[e],e),pt=t=>2*t-(t>4?9:0),kt=t=>{let e=t.length;for(;--e>=0;)t[e]=0},vt=t=>{let e,a,i,n=t.w_size;e=t.hash_size,i=e;do{a=t.head[--i],t.head[i]=a>=n?a-n:0}while(--e);e=n,i=e;do{a=t.prev[--i],t.prev[i]=a>=n?a-n:0}while(--e)};let yt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const xt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},zt=(t,e)=>{G(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,xt(t.strm)},At=(t,e)=>{t.pending_buf[t.pending++]=e},Et=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Rt=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=C(t.adler,e,n,a):2===t.state.wrap&&(t.adler=H(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},Zt=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,o=t.nice_match;const l=t.strstart>t.w_size-ut?t.strstart-(t.w_size-ut):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+ct;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=ct-(f-s),s=f-ct,i>r){if(t.match_start=e,r=i,i>=o)break;c=h[s+r-1],u=h[s+r]}}}while((e=_[e&d])>l&&0!=--n);return r<=t.lookahead?r:t.lookahead},Ut=t=>{const e=t.w_size;let a,i,n;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ut)&&(t.window.set(t.window.subarray(e,e+e-i),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,t.insert>t.strstart&&(t.insert=t.strstart),vt(t),i+=e),0===t.strm.avail_in)break;if(a=Rt(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=a,t.lookahead+t.insert>=3)for(n=t.strstart-t.insert,t.ins_h=t.window[n],t.ins_h=yt(t,t.ins_h,t.window[n+1]);t.insert&&(t.ins_h=yt(t,t.ins_h,t.window[n+3-1]),t.prev[n&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=n,n++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ut&&0!==t.strm.avail_in)},St=(t,e)=>{let a,i,n,s=t.pending_buf_size-5>t.w_size?t.w_size:t.pending_buf_size-5,r=0,o=t.strm.avail_in;do{if(a=65535,n=t.bi_valid+42>>3,t.strm.avail_out<n)break;if(n=t.strm.avail_out-n,i=t.strstart-t.block_start,a>i+t.strm.avail_in&&(a=i+t.strm.avail_in),a>n&&(a=n),a<s&&(0===a&&e!==V||e===q||a!==i+t.strm.avail_in))break;r=e===V&&a===i+t.strm.avail_in?1:0,Y(t,0,0,r),t.pending_buf[t.pending-4]=a,t.pending_buf[t.pending-3]=a>>8,t.pending_buf[t.pending-2]=~a,t.pending_buf[t.pending-1]=~a>>8,xt(t.strm),i&&(i>a&&(i=a),t.strm.output.set(t.window.subarray(t.block_start,t.block_start+i),t.strm.next_out),t.strm.next_out+=i,t.strm.avail_out-=i,t.strm.total_out+=i,t.block_start+=i,a-=i),a&&(Rt(t.strm,t.strm.output,t.strm.next_out,a),t.strm.next_out+=a,t.strm.avail_out-=a,t.strm.total_out+=a)}while(0===r);return o-=t.strm.avail_in,o&&(o>=t.w_size?(t.matches=2,t.window.set(t.strm.input.subarray(t.strm.next_in-t.w_size,t.strm.next_in),0),t.strstart=t.w_size,t.insert=t.strstart):(t.window_size-t.strstart<=o&&(t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,t.insert>t.strstart&&(t.insert=t.strstart)),t.window.set(t.strm.input.subarray(t.strm.next_in-o,t.strm.next_in),t.strstart),t.strstart+=o,t.insert+=o>t.w_size-t.insert?t.w_size-t.insert:o),t.block_start=t.strstart),t.high_water<t.strstart&&(t.high_water=t.strstart),r?4:e!==q&&e!==V&&0===t.strm.avail_in&&t.strstart===t.block_start?2:(n=t.window_size-t.strstart,t.strm.avail_in>n&&t.block_start>=t.w_size&&(t.block_start-=t.w_size,t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,n+=t.w_size,t.insert>t.strstart&&(t.insert=t.strstart)),n>t.strm.avail_in&&(n=t.strm.avail_in),n&&(Rt(t.strm,t.window,t.strstart,n),t.strstart+=n,t.insert+=n>t.w_size-t.insert?t.w_size-t.insert:n),t.high_water<t.strstart&&(t.high_water=t.strstart),n=t.bi_valid+42>>3,n=t.pending_buf_size-n>65535?65535:t.pending_buf_size-n,s=n>t.w_size?t.w_size:n,i=t.strstart-t.block_start,(i>=s||(i||e===V)&&e!==q&&0===t.strm.avail_in&&i<=n)&&(a=i>n?n:i,r=e===V&&0===t.strm.avail_in&&a===i?1:0,Y(t,t.block_start,a,r),t.block_start+=a,xt(t.strm)),r?3:1)},Dt=(t,e)=>{let a,i;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a)),t.match_length>=3)if(i=X(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=yt(t,t.ins_h,t.window[t.strstart+1]);else i=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2},Tt=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a),t.match_length<=5&&(t.strategy===rt||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=X(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(zt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=X(t,0,t.window[t.strstart-1]),i&&zt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=X(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2};function Ot(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}const It=[new Ot(0,0,0,0,St),new Ot(4,4,8,4,Dt),new Ot(4,5,16,8,Dt),new Ot(4,6,32,32,Dt),new Ot(4,4,16,16,Tt),new Ot(8,16,32,32,Tt),new Ot(8,16,128,128,Tt),new Ot(8,32,128,256,Tt),new Ot(32,128,258,1024,Tt),new Ot(32,258,258,4096,Tt)];function Ft(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ft,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),kt(this.dyn_ltree),kt(this.dyn_dtree),kt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),kt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),kt(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Lt=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.status!==wt&&57!==e.status&&69!==e.status&&73!==e.status&&91!==e.status&&103!==e.status&&e.status!==mt&&e.status!==bt?1:0},Nt=t=>{if(Lt(t))return gt(t,at);t.total_in=t.total_out=0,t.data_type=_t;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=2===e.wrap?57:e.wrap?wt:mt,t.adler=2===e.wrap?0:1,e.last_flush=-2,P(e),tt},Bt=t=>{const e=Nt(t);var a;return e===tt&&((a=t.state).window_size=2*a.w_size,kt(a.head),a.max_lazy_match=It[a.level].max_lazy,a.good_match=It[a.level].good_length,a.nice_match=It[a.level].nice_length,a.max_chain_length=It[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ct=(t,e,a,i,n,s)=>{if(!t)return at;let r=1;if(e===st&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==ft||i<8||i>15||e<0||e>9||s<0||s>ht||8===i&&1!==r)return gt(t,at);8===i&&(i=9);const o=new Ft;return t.state=o,o.strm=t,o.status=wt,o.wrap=r,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.sym_buf=o.lit_bufsize,o.sym_end=3*(o.lit_bufsize-1),o.level=e,o.strategy=s,o.method=a,Bt(t)};var Mt={deflateInit:(t,e)=>Ct(t,e,ft,15,8,dt),deflateInit2:Ct,deflateReset:Bt,deflateResetKeep:Nt,deflateSetHeader:(t,e)=>Lt(t)||2!==t.state.wrap?at:(t.state.gzhead=e,tt),deflate:(t,e)=>{if(Lt(t)||e>$||e<0)return t?gt(t,at):at;const a=t.state;if(!t.output||0!==t.avail_in&&!t.input||a.status===bt&&e!==V)return gt(t,0===t.avail_out?nt:at);const i=a.last_flush;if(a.last_flush=e,0!==a.pending){if(xt(t),0===t.avail_out)return a.last_flush=-1,tt}else if(0===t.avail_in&&pt(e)<=pt(i)&&e!==V)return gt(t,nt);if(a.status===bt&&0!==t.avail_in)return gt(t,nt);if(a.status===wt&&0===a.wrap&&(a.status=mt),a.status===wt){let e=ft+(a.w_bits-8<<4)<<8,i=-1;if(i=a.strategy>=ot||a.level<2?0:a.level<6?1:6===a.level?2:3,e|=i<<6,0!==a.strstart&&(e|=32),e+=31-e%31,Et(a,e),0!==a.strstart&&(Et(a,t.adler>>>16),Et(a,65535&t.adler)),t.adler=1,a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(57===a.status)if(t.adler=0,At(a,31),At(a,139),At(a,8),a.gzhead)At(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(a.gzhead.extra?4:0)+(a.gzhead.name?8:0)+(a.gzhead.comment?16:0)),At(a,255&a.gzhead.time),At(a,a.gzhead.time>>8&255),At(a,a.gzhead.time>>16&255),At(a,a.gzhead.time>>24&255),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,255&a.gzhead.os),a.gzhead.extra&&a.gzhead.extra.length&&(At(a,255&a.gzhead.extra.length),At(a,a.gzhead.extra.length>>8&255)),a.gzhead.hcrc&&(t.adler=H(t.adler,a.pending_buf,a.pending,0)),a.gzindex=0,a.status=69;else if(At(a,0),At(a,0),At(a,0),At(a,0),At(a,0),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,3),a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt;if(69===a.status){if(a.gzhead.extra){let e=a.pending,i=(65535&a.gzhead.extra.length)-a.gzindex;for(;a.pending+i>a.pending_buf_size;){let n=a.pending_buf_size-a.pending;if(a.pending_buf.set(a.gzhead.extra.subarray(a.gzindex,a.gzindex+n),a.pending),a.pending=a.pending_buf_size,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex+=n,xt(t),0!==a.pending)return a.last_flush=-1,tt;e=0,i-=n}let n=new Uint8Array(a.gzhead.extra);a.pending_buf.set(n.subarray(a.gzindex,a.gzindex+i),a.pending),a.pending+=i,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex=0}a.status=73}if(73===a.status){if(a.gzhead.name){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.name.length?255&a.gzhead.name.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),a.gzindex=0}a.status=91}if(91===a.status){if(a.gzhead.comment){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.comment.length?255&a.gzhead.comment.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i))}a.status=103}if(103===a.status){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size&&(xt(t),0!==a.pending))return a.last_flush=-1,tt;At(a,255&t.adler),At(a,t.adler>>8&255),t.adler=0}if(a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(0!==t.avail_in||0!==a.lookahead||e!==q&&a.status!==bt){let i=0===a.level?St(a,e):a.strategy===ot?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Ut(t),0===t.lookahead)){if(e===q)return 1;break}if(t.match_length=0,a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):a.strategy===lt?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=ct){if(Ut(t),t.lookahead<=ct&&e===q)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+ct;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=ct-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=X(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):It[a.level].func(a,e);if(3!==i&&4!==i||(a.status=bt),1===i||3===i)return 0===t.avail_out&&(a.last_flush=-1),tt;if(2===i&&(e===J?W(a):e!==$&&(Y(a,0,0,!1),e===Q&&(kt(a.head),0===a.lookahead&&(a.strstart=0,a.block_start=0,a.insert=0))),xt(t),0===t.avail_out))return a.last_flush=-1,tt}return e!==V?tt:a.wrap<=0?et:(2===a.wrap?(At(a,255&t.adler),At(a,t.adler>>8&255),At(a,t.adler>>16&255),At(a,t.adler>>24&255),At(a,255&t.total_in),At(a,t.total_in>>8&255),At(a,t.total_in>>16&255),At(a,t.total_in>>24&255)):(Et(a,t.adler>>>16),Et(a,65535&t.adler)),xt(t),a.wrap>0&&(a.wrap=-a.wrap),0!==a.pending?tt:et)},deflateEnd:t=>{if(Lt(t))return at;const e=t.state.status;return t.state=null,e===mt?gt(t,it):tt},deflateSetDictionary:(t,e)=>{let a=e.length;if(Lt(t))return at;const i=t.state,n=i.wrap;if(2===n||1===n&&i.status!==wt||i.lookahead)return at;if(1===n&&(t.adler=C(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(kt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size}const s=t.avail_in,r=t.next_in,o=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Ut(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=yt(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++}while(--e);i.strstart=t,i.lookahead=2,Ut(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=o,t.avail_in=s,i.wrap=n,tt},deflateInfo:"pako deflate (from Nodeca project)"};const Ht=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var jt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Ht(a,e)&&(t[e]=a[e])}}return t},Kt=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length}return a};let Pt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Pt=!1}const Yt=new Uint8Array(256);for(let t=0;t<256;t++)Yt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Yt[254]=Yt[254]=1;var Gt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,i,n,s,r=t.length,o=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),o+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(o),s=0,n=0;s<o;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},Xt=(t,e)=>{const a=e||t.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(t.subarray(0,e));let i,n;const s=new Array(2*a);for(n=0,i=0;i<a;){let e=t[i++];if(e<128){s[n++]=e;continue}let r=Yt[e];if(r>4)s[n++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<a;)e=e<<6|63&t[i++],r--;r>1?s[n++]=65533:e<65536?s[n++]=e:(e-=65536,s[n++]=55296|e>>10&1023,s[n++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Pt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,n)},Wt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Yt[t[a]]>e?a:e};var qt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Jt=Object.prototype.toString,{Z_NO_FLUSH:Qt,Z_SYNC_FLUSH:Vt,Z_FULL_FLUSH:$t,Z_FINISH:te,Z_OK:ee,Z_STREAM_END:ae,Z_DEFAULT_COMPRESSION:ie,Z_DEFAULT_STRATEGY:ne,Z_DEFLATED:se}=K;function re(t){this.options=jt({level:ie,method:se,chunkSize:16384,windowBits:15,memLevel:8,strategy:ne},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=Mt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==ee)throw new Error(j[a]);if(e.header&&Mt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Gt(e.dictionary):"[object ArrayBuffer]"===Jt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Mt.deflateSetDictionary(this.strm,t),a!==ee)throw new Error(j[a]);this._dict_set=!0}}function oe(t,e){const a=new re(e);if(a.push(t,!0),a.err)throw a.msg||j[a.err];return a.result}re.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?te:Qt,"string"==typeof t?a.input=Gt(t):"[object ArrayBuffer]"===Jt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===Vt||s===$t)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=Mt.deflate(a,s),n===ae)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=Mt.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===ee;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},re.prototype.onData=function(t){this.chunks.push(t)},re.prototype.onEnd=function(t){t===ee&&(this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var le={Deflate:re,deflate:oe,deflateRaw:function(t,e){return(e=e||{}).raw=!0,oe(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,oe(t,e)},constants:K};const he=16209;var de=function(t,e){let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),o=E.dmax,l=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,m=(1<<E.lenbits)-1,b=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=u[f&m];e:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,0===p)A[n++]=65535&g;else{if(!(16&p)){if(0==(64&p)){g=u[(65535&g)+(f&(1<<p)-1)];continue e}if(32&p){E.mode=16191;break t}t.msg="invalid literal/length code",E.mode=he;break t}k=65535&g,p&=15,p&&(c<p&&(f+=z[a++]<<c,c+=8),k+=f&(1<<p)-1,f>>>=p,c-=p),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=w[f&b];a:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,!(16&p)){if(0==(64&p)){g=w[(65535&g)+(f&(1<<p)-1)];continue a}t.msg="invalid distance code",E.mode=he;break t}if(v=65535&g,p&=15,c<p&&(f+=z[a++]<<c,c+=8,c<p&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<p)-1,v>o){t.msg="invalid distance too far back",E.mode=he;break t}if(f>>>=p,c-=p,p=n-s,v>p){if(p=v-p,p>h&&E.sane){t.msg="invalid distance too far back",E.mode=he;break t}if(y=0,x=_,0===d){if(y+=l-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}else if(d<p){if(y+=l+d-p,p-=d,p<k){k-=p;do{A[n++]=_[y++]}while(--p);if(y=0,d<k){p=d,k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}}else if(y+=d-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]))}else{y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]))}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c};const _e=15,fe=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),ce=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),ue=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),we=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var me=(t,e,a,i,n,s,r,o)=>{const l=o.bits;let h,d,_,f,c,u,w=0,m=0,b=0,g=0,p=0,k=0,v=0,y=0,x=0,z=0,A=null;const E=new Uint16Array(16),R=new Uint16Array(16);let Z,U,S,D=null;for(w=0;w<=_e;w++)E[w]=0;for(m=0;m<i;m++)E[e[a+m]]++;for(p=l,g=_e;g>=1&&0===E[g];g--);if(p>g&&(p=g),0===g)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(b=1;b<g&&0===E[b];b++);for(p<b&&(p=b),y=1,w=1;w<=_e;w++)if(y<<=1,y-=E[w],y<0)return-1;if(y>0&&(0===t||1!==g))return-1;for(R[1]=0,w=1;w<_e;w++)R[w+1]=R[w]+E[w];for(m=0;m<i;m++)0!==e[a+m]&&(r[R[e[a+m]]++]=m);if(0===t?(A=D=r,u=20):1===t?(A=fe,D=ce,u=257):(A=ue,D=we,u=0),z=0,m=0,w=b,c=s,k=p,v=0,_=-1,x=1<<p,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){Z=w-v,r[m]+1<u?(U=0,S=r[m]):r[m]>=u?(U=D[r[m]-u],S=A[r[m]-u]):(U=96,S=0),h=1<<w-v,d=1<<k,b=d;do{d-=h,n[c+(z>>v)+d]=Z<<24|U<<16|S|0}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,m++,0==--E[w]){if(w===g)break;w=e[a+r[m]]}if(w>p&&(z&f)!==_){for(0===v&&(v=p),c+=b,k=w-v,y=1<<k;k+v<g&&(y-=E[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=p<<24|k<<16|c-s|0}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),o.bits=p,0};const{Z_FINISH:be,Z_BLOCK:ge,Z_TREES:pe,Z_OK:ke,Z_STREAM_END:ve,Z_NEED_DICT:ye,Z_STREAM_ERROR:xe,Z_DATA_ERROR:ze,Z_MEM_ERROR:Ae,Z_BUF_ERROR:Ee,Z_DEFLATED:Re}=K,Ze=16180,Ue=16190,Se=16191,De=16192,Te=16194,Oe=16199,Ie=16200,Fe=16206,Le=16209,Ne=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Be(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Ce=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.mode<Ze||e.mode>16211?1:0},Me=t=>{if(Ce(t))return xe;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=Ze,e.last=0,e.havedict=0,e.flags=-1,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,ke},He=t=>{if(Ce(t))return xe;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Me(t)},je=(t,e)=>{let a;if(Ce(t))return xe;const i=t.state;return e<0?(a=0,e=-e):(a=5+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?xe:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,He(t))},Ke=(t,e)=>{if(!t)return xe;const a=new Be;t.state=a,a.strm=t,a.window=null,a.mode=Ze;const i=je(t,e);return i!==ke&&(t.state=null),i};let Pe,Ye,Ge=!0;const Xe=t=>{if(Ge){Pe=new Int32Array(512),Ye=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(me(1,t.lens,0,288,Pe,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;me(2,t.lens,0,32,Ye,0,t.work,{bits:5}),Ge=!1}t.lencode=Pe,t.lenbits=9,t.distcode=Ye,t.distbits=5},We=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var qe={inflateReset:He,inflateReset2:je,inflateResetKeep:Me,inflateInit:t=>Ke(t,15),inflateInit2:Ke,inflate:(t,e)=>{let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(Ce(t)||!t.output||!t.input&&0!==t.avail_in)return xe;a=t.state,a.mode===Se&&(a.mode=De),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,_=o,f=l,x=ke;t:for(;;)switch(a.mode){case Ze:if(0===a.wrap){a.mode=De;break}for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(2&a.wrap&&35615===h){0===a.wbits&&(a.wbits=15),a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0),h=0,d=0,a.mode=16181;break}if(a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=Le;break}if((15&h)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits&&(a.wbits=y),y>15||y>a.wbits){t.msg="invalid window size",a.mode=Le;break}a.dmax=1<<a.wbits,a.flags=0,t.adler=a.check=1,a.mode=512&h?16189:Se,h=0,d=0;break;case 16181:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.flags=h,(255&a.flags)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=Le;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16182;case 16182:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=H(a.check,A,4,0)),h=0,d=0,a.mode=16183;case 16183:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16184;case 16184:if(1024&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0}else a.head&&(a.head.extra=null);a.mode=16185;case 16185:if(1024&a.flags&&(c=a.length,c>o&&(c=o),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=16186;case 16186:if(2048&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=16187;case 16187:if(4096&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=16188;case 16188:if(512&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=Le;break}h=0,d=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=Se;break;case 16189:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}t.adler=a.check=Ne(h),h=0,d=0,a.mode=Ue;case Ue:if(0===a.havedict)return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,ye;t.adler=a.check=1,a.mode=Se;case Se:if(e===ge||e===pe)break t;case De:if(a.last){h>>>=7&d,d-=7&d,a.mode=Fe;break}for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=16193;break;case 1:if(Xe(a),a.mode=Oe,e===pe){h>>>=2,d-=2;break t}break;case 2:a.mode=16196;break;case 3:t.msg="invalid block type",a.mode=Le}h>>>=2,d-=2;break;case 16193:for(h>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=Le;break}if(a.length=65535&h,h=0,d=0,a.mode=Te,e===pe)break t;case Te:a.mode=16195;case 16195:if(c=a.length,c){if(c>o&&(c=o),c>l&&(c=l),0===c)break t;n.set(i.subarray(s,s+c),r),o-=c,s+=c,l-=c,r+=c,a.length-=c;break}a.mode=Se;break;case 16196:for(;d<14;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=Le;break}a.have=0,a.mode=16197;case 16197:for(;a.have<a.ncode;){for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=me(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=Le;break}a.have=0,a.mode=16198;case 16198:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(g<16)h>>>=m,d-=m,a.lens[a.have++]=g;else{if(16===g){for(R=m+2;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(h>>>=m,d-=m,0===a.have){t.msg="invalid bit length repeat",a.mode=Le;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2}else if(17===g){for(R=m+3;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=3+(7&h),h>>>=3,d-=3}else{for(R=m+7;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=11+(127&h),h>>>=7,d-=7}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=Le;break}for(;c--;)a.lens[a.have++]=y}}if(a.mode===Le)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=Le;break}if(a.lenbits=9,E={bits:a.lenbits},x=me(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=Le;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=me(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=Le;break}if(a.mode=Oe,e===pe)break t;case Oe:a.mode=Ie;case Ie:if(o>=6&&l>=258){t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,de(t,f),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,a.mode===Se&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(b&&0==(240&b)){for(p=m,k=b,v=g;z=a.lencode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,a.length=g,0===b){a.mode=16205;break}if(32&b){a.back=-1,a.mode=Se;break}if(64&b){t.msg="invalid literal/length code",a.mode=Le;break}a.extra=15&b,a.mode=16201;case 16201:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=16202;case 16202:for(;z=a.distcode[h&(1<<a.distbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(0==(240&b)){for(p=m,k=b,v=g;z=a.distcode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,64&b){t.msg="invalid distance code",a.mode=Le;break}a.offset=g,a.extra=15&b,a.mode=16203;case 16203:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=Le;break}a.mode=16204;case 16204:if(0===l)break t;if(c=f-l,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=Le;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window}else w=n,u=r-a.offset,c=a.length;c>l&&(c=l),l-=c,a.length-=c;do{n[r++]=w[u++]}while(--c);0===a.length&&(a.mode=Ie);break;case 16205:if(0===l)break t;n[r++]=a.length,l--,a.mode=Ie;break;case Fe:if(a.wrap){for(;d<32;){if(0===o)break t;o--,h|=i[s++]<<d,d+=8}if(f-=l,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,r-f):C(a.check,n,f,r-f)),f=l,4&a.wrap&&(a.flags?h:Ne(h))!==a.check){t.msg="incorrect data check",a.mode=Le;break}h=0,d=0}a.mode=16207;case 16207:if(a.wrap&&a.flags){for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=Le;break}h=0,d=0}a.mode=16208;case 16208:x=ve;break t;case Le:x=ze;break t;case 16210:return Ae;default:return xe}return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<Le&&(a.mode<Fe||e!==be))&&We(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,t.next_out-f):C(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(a.mode===Se?128:0)+(a.mode===Oe||a.mode===Te?256:0),(0===_&&0===f||e===be)&&x===ke&&(x=Ee),x},inflateEnd:t=>{if(Ce(t))return xe;let e=t.state;return e.window&&(e.window=null),t.state=null,ke},inflateGetHeader:(t,e)=>{if(Ce(t))return xe;const a=t.state;return 0==(2&a.wrap)?xe:(a.head=e,e.done=!1,ke)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return Ce(t)?xe:(i=t.state,0!==i.wrap&&i.mode!==Ue?xe:i.mode===Ue&&(n=1,n=C(n,e,a,0),n!==i.check)?ze:(s=We(t,e,a,a),s?(i.mode=16210,Ae):(i.havedict=1,ke)))},inflateInfo:"pako inflate (from Nodeca project)"};var Je=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const Qe=Object.prototype.toString,{Z_NO_FLUSH:Ve,Z_FINISH:$e,Z_OK:ta,Z_STREAM_END:ea,Z_NEED_DICT:aa,Z_STREAM_ERROR:ia,Z_DATA_ERROR:na,Z_MEM_ERROR:sa}=K;function ra(t){this.options=jt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=qe.inflateInit2(this.strm,e.windowBits);if(a!==ta)throw new Error(j[a]);if(this.header=new Je,qe.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=Gt(e.dictionary):"[object ArrayBuffer]"===Qe.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=qe.inflateSetDictionary(this.strm,e.dictionary),a!==ta)))throw new Error(j[a])}function oa(t,e){const a=new ra(e);if(a.push(t),a.err)throw a.msg||j[a.err];return a.result}ra.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,o;if(this.ended)return!1;for(r=e===~~e?e:!0===e?$e:Ve,"[object ArrayBuffer]"===Qe.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=qe.inflate(a,r),s===aa&&n&&(s=qe.inflateSetDictionary(a,n),s===ta?s=qe.inflate(a,r):s===na&&(s=aa));a.avail_in>0&&s===ea&&a.state.wrap>0&&0!==t[a.next_in];)qe.inflateReset(a),s=qe.inflate(a,r);switch(s){case ia:case na:case aa:case sa:return this.onEnd(s),this.ended=!0,!1}if(o=a.avail_out,a.next_out&&(0===a.avail_out||s===ea))if("string"===this.options.to){let t=Wt(a.output,a.next_out),e=a.next_out-t,n=Xt(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n)}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==ta||0!==o){if(s===ea)return s=qe.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return!0},ra.prototype.onData=function(t){this.chunks.push(t)},ra.prototype.onEnd=function(t){t===ta&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var la={Inflate:ra,inflate:oa,inflateRaw:function(t,e){return(e=e||{}).raw=!0,oa(t,e)},ungzip:oa,constants:K};const{Deflate:ha,deflate:da,deflateRaw:_a,gzip:fa}=le,{Inflate:ca,inflate:ua,inflateRaw:wa,ungzip:ma}=la;var ba=ha,ga=da,pa=_a,ka=fa,va=ca,ya=ua,xa=wa,za=ma,Aa=K,Ea={Deflate:ba,deflate:ga,deflateRaw:pa,gzip:ka,Inflate:va,inflate:ya,inflateRaw:xa,ungzip:za,constants:Aa};t.Deflate=ba,t.Inflate=va,t.constants=Aa,t.default=Ea,t.deflate=ga,t.deflateRaw=pa,t.gzip=ka,t.inflate=ya,t.inflateRaw=xa,t.ungzip=za,Object.defineProperty(t,"__esModule",{value:!0})}));
vweb.google={}
vweb.google.init_gtag=function(google_tag){
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config',google_tag);
}
vweb.user={};
vweb.user._reset=function(){
this._uid=undefined;
this._username=undefined;
this._email=undefined;
this._first_name=undefined;
this._last_name=undefined;
this._is_authenticated=undefined;
this._is_activated=undefined;
}
vweb.user.uid=function(){
if(vweb.utils.cookies_parse_required()){
this._reset();
}
else if(this._uid!==undefined){
return this._uid;
}
this._uid=vweb.utils.cookie("UserID");
if(this._uid=="-1"){
this._uid=null;
}
else if(this._uid!==null){
this._uid=parseInt(this._uid);
if(isNaN(this._uid)){
this._uid=null;
}
}
return this._uid;
}
vweb.user.username=function(){
if(vweb.utils.cookies_parse_required()){
this._reset();
}
else if(this._username!==undefined){
return this._username;
}
this._username=vweb.utils.cookie("UserName");
if(this._username==""){
this._username=null;
}
return this._username;
}
vweb.user.email=function(){
if(vweb.utils.cookies_parse_required()){
this._reset();
}
else if(this._email!==undefined){
return this._email;
}
this._email=vweb.utils.cookie("UserEmail");
if(this._email==""){
this._email=null;
}
return this._email;
}
vweb.user.first_name=function(){
if(vweb.utils.cookies_parse_required()){
this._reset();
}
else if(this._first_name!==undefined){
return this._first_name;
}
this._first_name=vweb.utils.cookie("UserFirstName");
if(this._first_name==""){
this._first_name=null;
}
return this._first_name;
}
vweb.user.last_name=function(){
if(vweb.utils.cookies_parse_required()){
this._reset();
}
else if(this._last_name!==undefined){
return this._last_name;
}
this._last_name=vweb.utils.cookie("UserLastName");
if(this._last_name==""){
this._last_name=null;
}
return this._last_name;
}
vweb.user.is_authenticated=function(){
if(vweb.utils.cookies_parse_required()){
this._reset();
}
else if(this._is_authenticated!==undefined){
return this._is_authenticated;
}
this._is_authenticated=this.uid()!=null;
return this._is_authenticated;
}
vweb.user.is_activated=function(){
if(vweb.utils.cookies_parse_required()){
this._reset();
}
else if(this._is_activated!==undefined){
return this._is_activated;
}
this._is_activated=vweb.utils.cookie("UserActivated")==="true";
return this._is_activated;
}
vweb.user.get=function(){
return vweb.utils.request({
method:"GET",
url:"/vweb/backend/user/",
});
}
vweb.user.set=function(user){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/user/",
data:user,
});
}
vweb.user.activate=function(code=""){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/auth/activate",
data:{
"2fa":code,
},
});
}
vweb.user.change_password=function({
current_password="",
password="",
verify_password="",
}){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/user/change_password",
data:{
current_password:current_password,
password:password,
verify_password:verify_password,
},
});
}
vweb.user.generate_api_key=function(){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/user/api_key",
});
}
vweb.user.revoke_api_key=function(){
return vweb.utils.request({
method:"DELETE",
url:"/vweb/backend/user/api_key",
});
}
vweb.user.load=function(path,def=""){
return vweb.utils.request({
method:"GET",
url:"/vweb/backend/user/data",
data:{
path:path,
def:"",
},
});
}
vweb.user.save=function(path="",data={}){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/user/data",
data:{
path:path,
data:data,
},
});
}
vweb.user.load_protected=function(path,def=""){
return vweb.utils.request({
method:"GET",
url:"/vweb/backend/user/data/protected",
data:{
path:path,
def:def,
},
});
}
vweb.auth={};
vweb.auth.sign_in=function({
email="",
username="",
password="",
code="",
}){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/auth/signin",
data:{
email:email,
username:username,
password:password,
"2fa":code,
},
});
}
vweb.auth.sign_up=function({
username="",
email="",
first_name="",
last_name="",
password="",
verify_password="",
}){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/auth/signup",
data:{
username:username,
email:email,
first_name:first_name,
last_name:last_name,
password:password,
verify_password:verify_password,
},
});
}
vweb.auth.sign_out=function(){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/auth/signout",
});
}
vweb.auth.send_2fa=function(email=""){
return vweb.utils.request({
method:"GET",
url:"/vweb/backend/auth/2fa",
data:{
email:email,
},
});
}
vweb.auth.forgot_password=function({
email="",
code="",
password="",
verify_password="",
}){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/auth/forgot_password",
data:{
email:email,
"2fa":code,
password:password,
verify_password:verify_password,
},
});
}
vweb.themes={};
vweb.themes.theme_elements=[];
vweb.themes.set=function(theme_id){
vweb.themes.theme_elements.iterate((theme)=>{
if(theme.id===theme_id&&theme.is_empty_theme!==true){
const e=theme.element;
Object.keys(theme).iterate((key)=>{
if(key!=="id"&&key!=="element"){
if(e[key]===undefined){
console.error(`"${key}()" is not a valid function of type "${e.element_type}"`);
return null;
}
if(Array.isArray(theme[key])){
e[key](...theme[key]);
}else{
e[key](theme[key]);
}
}
})
if(e.element_type==="RingLoader"){
e.update(e);
}
if(typeof e._on_theme_update==="function"){
e._on_theme_update(e);
}
}
})
}
vweb.themes.apply_theme_update=function(){
vweb.themes.theme_elements.iterate((theme)=>{
const e=theme.element;
if(e!==undefined&&typeof e._on_theme_update==="function"){
e._on_theme_update(e);
}
})
}
vweb.payments={};
vweb.payments._initialize_stripe=function(){
if(this.stripe===undefined){
if(this.publishable_key==null){
throw Error("Define the \"vweb.payments.publishable_key\" attribute with your stripe publishable key.");
}
this.stripe=Stripe(this.publishable_key);
}
}
vweb.payments._initialize_address_elements=function(appearance={}){
if(this._address_elements==null){
if(this.cart.items.length===0){
throw Error("The shopping cart does not contain any items.");
}
let price=0,currency;
this.cart.items.iterate((item)=>{
price+=parseInt(item.product.price*100)*item.quantity;
if(currency===undefined){
currency=item.product.currency;
}else if(currency!=item.product.currency){
throw Error("Products with different currencies can not be charged in a single request.");
}
})
this._address_elements=this.stripe.elements({
mode:"payment",
amount:price,
currency:currency,
appearance:appearance,
});
}
}
vweb.payments._initialize_payment_elements=function(appearance={}){
if(this._payment_elements==null){
if(this._client_secret==null){
throw Error("No payment intent was created using \"vweb.payments.charge()\" or the shopping cart has been edited after the initial charge.");
}
this._payment_elements=this.stripe.elements({
clientSecret:this._client_secret,
appearance:appearance,
});
}
}
vweb.payments._reset=function(){
this._client_secret=null;
this._address=null;
this._address_elements=null;
if(this._address_element!=null){
this._address_element.stripe_element.destroy();
}
this._address_element=null;
this._payment_elements=null;
if(this._payment_element!=null){
this._payment_element.stripe_element.destroy();
}
this._payment_element=null;
}
vweb.payments.get_currency_symbol=function(currency){
switch(currency.toLowerCase()){
case "aed":return "د.إ";
case "afn":return "Af";
case "all":return "L";
case "amd":return "֏";
case "ang":return "ƒ";
case "aoa":return "Kz";
case "ars":return "$";
case "aud":return "$";
case "awg":return "ƒ";
case "azn":return "₼";
case "bam":return "KM";
case "bbd":return "Bds$";
case "bdt":return "৳";
case "bgn":return "лв";
case "bhd":return ".د.ب";
case "bif":return "FBu";
case "bmd":return "BD$";
case "bnd":return "B$";
case "bob":return "Bs";
case "brl":return "R$";
case "bsd":return "B$";
case "btn":return "Nu.";
case "bwp":return "P";
case "byn":return "Br";
case "bzd":return "BZ$";
case "cad":return "$";
case "cdf":return "FC";
case "chf":return "Fr";
case "clf":return "UF";
case "clp":return "$";
case "cny":return "¥";
case "cop":return "$";
case "crc":return "₡";
case "cuc":return "CUC$";
case "cup":return "CUP$";
case "cve":return "$";
case "czk":return "Kč";
case "djf":return "Fdj";
case "dkk":return "kr";
case "dop":return "RD$";
case "dzd":return "دج";
case "egp":return "E£";
case "ern":return "Nfk";
case "etb":return "Br";
case "eur":return "€";
case "fjd":return "FJ$";
case "fkp":return "£";
case "fok":return "F$";
case "gbp":return "£";
case "gel":return "₾";
case "ghc":return "₵";
case "gip":return "£";
case "gmd":return "D";
case "gnf":return "FG";
case "gtq":return "Q";
case "gyd":return "GY$";
case "hkd":return "HK$";
case "hnl":return "L";
case "hrk":return "kn";
case "htg":return "G";
case "huf":return "Ft";
case "idr":return "Rp";
case "ils":return "₪";
case "inr":return "₹";
case "iqd":return "د.ع";
case "irr":return "﷼";
case "isk":return "kr";
case "jmd":return "J$";
case "jod":return "JD";
case "jpy":return "¥";
case "kes":return "Ksh";
case "kgs":return "с";
case "khr":return "៛";
case "kmf":return "CF";
case "kpw":return "₩";
case "krw":return "₩";
case "kwd":return "KD";
case "kyd":return "CI$";
case "kzt":return "₸";
case "lak":return "₭";
case "lbp":return "L£";
case "lkr":return "Rs";
case "lrd":return "L$";
case "lsl":return "L";
case "lyd":return "ل.د";
case "mad":return "د.م.";
case "mdl":return "L";
case "mnt":return "₮";
case "mop":return "MOP$";
case "mur":return "Rs";
case "mvr":return "Rf";
case "mwk":return "MK";
case "mxn":return "$";
case "myr":return "RM";
case "mzn":return "MTn";
case "nad":return "N$";
case "ngn":return "₦";
case "nio":return "C$";
case "nok":return "kr";
case "npr":return "रू";
case "nzd":return "$";
case "omr":return "ر.ع.";
case "pab":return "B/.";
case "pen":return "S/.";
case "pgk":return "K";
case "php":return "₱";
case "pkr":return "Rs";
case "pln":return "zł";
case "pyg":return "₲";
case "qar":return "ر.ق";
case "ron":return "lei";
case "rsd":return "din.";
case "rub":return "₽";
case "rwf":return "FRw";
case "sar":return "ر.س";
case "sbd":return "SI$";
case "scr":return "Sr";
case "sdg":return "ج.س.";
case "sek":return "kr";
case "sgd":return "S$";
case "shp":return "£";
case "sll":return "Le";
case "sos":return "S";
case "srd":return "SRD$";
case "ssp":return "£";
case "std":return "Db";
case "sek":return "kr";
case "syp":return "S£";
case "szl":return "L";
case "thb":return "฿";
case "tjs":return "ЅМ";
case "tmt":return "m";
case "tnd":return "د.ت";
case "top":return "T$";
case "try":return "₺";
case "ttd":return "TT$";
case "twd":return "NT$";
case "tzs":return "TSh";
case "uah":return "₴";
case "ugx":return "USh";
case "usd":return "$";
case "uyu":return "$U";
case "uzs":return "лв";
case "ves":return "Bs.S.";
case "vnd":return "₫";
case "vuv":return "VT";
case "wst":return "WS$";
case "xaf":return "FCFA";
case "xcd":return "EC$";
case "xof":return "CFA";
case "xpf":return "CFP";
case "yer":return "﷼";
case "zar":return "R";
case "zmw":return "ZK";
}
return null;
}
vweb.payments.get_products=async function(){
return new Promise((resolve,reject)=>{
if(this._products!==undefined){
return resolve(this._products);
}
vweb.utils.request({
method:"GET",
url:"/vweb/backend/payments/products",
})
.then((products)=>{
this._products=products;
resolve(this._products);
})
.catch((err)=>{
reject(err);
})
})
}
vweb.payments.get_product=async function(id){
return new Promise(async(resolve,reject)=>{
const products=await this.get_products();
let product;
products.iterate((p)=>{
if(p.id===id){
product=p;
return true;
}
if(p.is_subscription){
return p.plans.iterate((plan)=>{
if(plan.id===id){
product=plan;
return true;
}
});
}
})
if(product==null){
return reject(`Product "${id}" does not exist.`);
}
resolve(product);
})
}
vweb.payments.get_payments=function({status="paid",days=30,refunded=null,limit=null}={}){
return vweb.utils.request({
method:"GET",
url:"/vweb/backend/payments/payments",
data:{
status:status,
days:days,
refunded:refunded,
limit:limit,
},
});
}
vweb.payments.get_subscriptions=function(){
return vweb.utils.request({
method:"GET",
url:"/vweb/backend/payments/subscriptions",
});
}
vweb.payments.is_subscribed=function(id){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/payments/subscribed",
data:{
product:id,
}
});
}
vweb.payments.cancel_subscription=function(id){
return vweb.utils.request({
method:"DELETE",
url:"/vweb/backend/payments/subscription",
data:{
product:id,
}
});
}
vweb.payments.get_refundable_payments=function({days=30,refunded=null,limit=null}={}){
return vweb.utils.request({
method:"GET",
url:"/vweb/backend/payments/refundable",
data:{
days:days,
refunded:refunded,
limit:limit,
},
});
}
vweb.payments.create_refund=function({payment,auto_advance=true}){
return vweb.utils.request({
method:"POST",
url:"/vweb/backend/payments/refund",
data:{
payment:payment,
auto_advance:auto_advance,
},
});
}
vweb.payments.create_address_element=function(mode="billing"){
if(this._address_element!=null){
return this._address_element;
}
this._initialize_stripe();
this._initialize_address_elements();
this._address_element=VStack();
this._address_element.stripe_element=this._address_elements.create("address",{
mode:mode,
});
this._address_element.stripe_element.mount(this._address_element);
return this._address_element;
}
vweb.payments.create_payment_element=function(){
if(this._payment_element!=null){
return this._payment_element;
}
this._initialize_stripe();
this._initialize_payment_elements();
this._payment_element=VStack();
this._payment_element.stripe_element=this._payment_elements.create("payment");
this._payment_element.stripe_element.mount(this._payment_element);
return this._payment_element;
}
vweb.payments.has_pending_charge=function(){
return this._client_secret!=null;
}
vweb.payments.charge=async function(){
return new Promise(async(resolve,reject)=>{
this._client_secret=null;
this._return_url=null;
this._payment_elements=null;
this._payment_element=null;
if(vweb.payments.cart.items.length===0){
return reject(new Error("No products were added to the shopping cart."));
}
if(this._address_elements==null){
return reject(new Error("No address element was created using \"vweb.payments.create_address_element()\"."));
}
const{error}=await this._address_elements.submit();
if(error){
return reject(error);
}
const address_info=await this._address_element.stripe_element.getValue();
this._address=address_info.value;
if(address_info.complete!==true){
return reject(new Error("Incomplete address information."));
}
try{
const result=await vweb.utils.request({
method:"POST",
url:"/vweb/backend/payments/charge",
data:{
cart:vweb.payments.cart.items,
name:this._address.name,
phone:this._address.phone,
address:this._address.address,
}
})
this._client_secret=result.client_secret;
this._return_url=result.return_url;
resolve();
}catch(error){
return reject(error);
}
})
}
vweb.payments.confirm_charge=async function(){
return new Promise(async(resolve,reject)=>{
if(this._client_secret==null){
return reject(new Error("No payment intent was created using \"vweb.payments.charge()\" or the shopping cart has been edited after the initial charge."));
}
if(this._return_url==null){
return reject(new Error("No payment intent was created using \"vweb.payments.charge()\"."));
}
if(this._payment_element==null){
return reject(new Error("No payment element was created using \"vweb.payments.create_payment_element()\"."));
}
if(this._address==null){
return reject(new Error("No address element was defined using \"vweb.payments.create_payment_element()\"."));
}
this._initialize_stripe();
const{error}=await this._payment_elements.submit();
if(error){
return reject(error);
}
let result=await this.stripe.confirmPayment({
elements:this._payment_elements,
clientSecret:this._client_secret,
shipping:{
name:this._address.name,
phone:this._address.phone,
address:this._address.address,
},
redirect:"always",
confirmParams:{
return_url:this._return_url,
},
});
if(result.error){
return reject(result.error.message);
}
this.cart.clear();
resolve();
})
}
vweb.payments.charge_status=async function(client_secret){
return new Promise(async(resolve,reject)=>{
this._initialize_stripe();
const result=await this.stripe.retrievePaymentIntent(client_secret);
if(result.error){
return reject(response.error);
}
let message,charged=false,cancelled=false,processing=false;
switch(result.paymentIntent.status){
case "requires_payment_method":
message="The payment requires a payment method.";
break;
case "requires_confirmation":
message="The payment requires confirmation.";
break;
case "requires_action":
message="The payment requires action.";
break;
case "processing":
processing=true;
message="The payment is still processing.";
break;
case "requires_capture":
message="The payment requires capture.";
break;
case "canceled":
cancelled=true;
message="The payment has been cancelled.";
break;
case "succeeded":
charged=true;
message="The payment has succeeded.";
break;
}
resolve({
status:result.paymentIntent.status,
charged:charged,
cancelled:cancelled,
processing:processing,
message:message,
payment_intent:result.paymentIntent,
});
})
}
vweb.payments.cart={};
vweb.payments.cart.refresh=function(){
try{
this.items=JSON.parse(localStorage.getItem("vweb_shopping_cart"))||[];
}catch(err){
this.items=[];
}
vweb.payments._reset();
}
vweb.payments.cart.refresh();
vweb.payments.cart.save=function(cart){
localStorage.setItem("vweb_shopping_cart",JSON.stringify(this.items));
vweb.payments._reset();
}
vweb.payments.cart.add=async function(id,quantity=1){
this.refresh();const found=this.items.iterate((item)=>{
if(item.product.id===id){
item.quantity+=quantity;
return true;
}
})
if(found!==true){
const product=await vweb.payments.get_product(id);
this.items.push({
product:product,
quantity:quantity,
});
}
this.save();
}
vweb.payments.cart.remove=async function(id,quantity=1){
this.refresh();let new_cart=[];
this.items.iterate((item)=>{
if(item.product.id===id){
if(quantity==="all"){
item.quantity=0;
}else{
item.quantity-=quantity;
}
}
if(item.quantity>0){
new_cart.push(item);
}
})
this.items.length=0;
new_cart.iterate((item)=>{
this.items.push(item);
})
this.save();
}
vweb.payments.cart.clear=async function(id,quantity=1){
this.items=[];
this.save();
}
Array.prototype.append=Array.prototype.push;
Array.prototype.first=function(){
return this[0];
};
Array.prototype.last=function(){
return this[this.length-1];
};
Array.prototype.iterate=function(start,end,handler){
if(typeof start==="function"){
handler=start;
start=null;
}
if(start==null){
start=0;
}
if(end==null){
end=this.length;
}
for(let i=start;i<end;i++){
const res=handler(this[i]);
if(res!=null&&!(res instanceof Promise)){
return res;
}
}
return null;
};
Array.prototype.iterate_async=function(start,end,handler){
if(typeof start==="function"){
handler=start;
start=null;
}
if(start==null){
start=0;
}
if(end==null){
end=this.length;
}
let promises=[];
for(let i=start;i<end;i++){
const res=handler(this[i]);
if(res!=null&&res instanceof Promise){
promises.push(res);
}
}
return promises;
};
Array.prototype.iterate_async_await=async function(start,end,handler){
if(typeof start==="function"){
handler=start;
start=null;
}
if(start==null){
start=0;
}
if(end==null){
end=this.length;
}
for(let i=start;i<end;i++){
const res=handler(this[i]);
if(res!=null&&res instanceof Promise){
const pres=await res;
if(pres!=null){
return pres;
}
}
}
return null;
};
Array.prototype.iterate_reversed=function(start,end,handler){
if(handler==null&&start!=null){
handler=start;
start=null;
}
if(start==null){
start=0;
}
if(end==null){
end=this.length;
}
for(let i=end-1;i>=start;i--){
const res=handler(this[i]);
if(res!=null&&!(res instanceof Promise)){
return res;
}
}
return null;
};
Array.prototype.iterate_reversed_async=function(start,end,handler){
if(handler==null&&start!=null){
handler=start;
start=null;
}
if(start==null){
start=0;
}
if(end==null){
end=this.length;
}
let promises=[];
for(let i=end-1;i>=start;i--){
const res=handler(this[i]);
if(res!=null&&res instanceof Promise){
promises.push(res);
}
}
return promises;
};
Array.prototype.iterate_reversed_async_await=async function(start,end,handler){
if(handler==null&&start!=null){
handler=start;
start=null;
}
if(start==null){
start=0;
}
if(end==null){
end=this.length;
}
for(let i=end-1;i>=start;i--){
const res=handler(this[i]);
if(res!=null&&res instanceof Promise){
const pres=await res;
if(pres!=null){
return pres;
}
}
}
return null;
};
Array.prototype.drop=function(item){
const dropped=new this.constructor();for(let i=0;i<this.length;i++){
if(this[i]!=item){
dropped.push(this[i])
}
}
return dropped;
};
Array.prototype.drop_index=function(index){
const dropped=new this.constructor();for(let i=0;i<this.length;i++){
if(i!=index){
dropped.push(this[i])
}
}
return dropped;
};
Array.prototype.drop_duplicates=function(){
return this.reduce((accumulator,val)=>{
if(!accumulator.includes(val)){
accumulator.push(val);
}
return accumulator;
},[]);
}
Array.prototype.limit_from_end=function(limit){
let limited=[];
if(this.length>limit){
for(let i=this.length-limit;i<this.length;i++){
limited.push(this[i]);
}
}else{
for(let i=0;i<this.length;i++){
limited.push(this[i]);
}
}
return limited;
}
Array.prototype.remove=function(item){
let removed=[];
this.iterate((i)=>{
if(i!=item){
removed.push(i);
}
})
return removed;
};
Array.prototype.eq=function(x=null,y=null){
const eq=(x,y)=>{
if(Array.isArray(x)){
if(
Array.isArray(y)===false||
x.length!==y.length
){
return false;
}
for(let i=0;i<x.length;i++){
if(typeof x[i]==="object"||typeof y[i]==="object"){
const result=eq(x[i],y[i]);
if(result===false){
return false;
}
}else if(x[i]!==y[i]){
return false;
}
}
return true;
}
else if(typeof x==="object"){
if(
typeof y!=="object"||
Array.isArray(y)
){
return false;
}
const x_keys=Object.keys(x);
const y_keys=Object.keys(y);
if(eq(x_keys,y_keys)===false){
return false;
}
for(let i=0;i<x_keys.length;i++){
if(typeof x[x_keys[i]]==="object"||typeof y[y_keys[i]]==="object"){
const result=eq(x[x_keys[i]],y[y_keys[i]]);
if(result===false){
return false;
}
}else if(x[x_keys[i]]!==y[y_keys[i]]){
return false;
}
}
return true;
}
else if(typeof x!==typeof y){return false;}
return x===y;
}
if(y==null){
y=x;
x=this;
}
return eq(x,y);
}
String.prototype.first=function(){
return this[0];
};
String.prototype.last=function(){
return this[this.length-1];
};
String.prototype.first_non_whitespace=function(line_break=false){
for(let i=0;i<this.length;i++){
const char=this.charAt(i);
if(char!=" "&&char!="\t"&&(line_break==false||char!="\n")){
return char;
}
}
return null;
};
String.prototype.last_non_whitespace=function(line_break=false){
for(let i=this.length-1;i>=0;i--){
const char=this.charAt(i);
if(char!=" "&&char!="\t"&&(line_break==false||char!="\n")){
return char;
}
}
return null;
};
String.prototype.first_not_of=function(exclude=[],start_index=0){
for(let i=start_index;i<this.length;i++){
if(!exclude.includes(this.charAt(i))){
return this.charAt(i);
}
}
return null;
};
String.prototype.first_index_not_of=function(exclude=[],start_index=0){
for(let i=start_index;i<this.length;i++){
if(!exclude.includes(this.charAt(i))){
return i;
}
}
return null;
};
String.prototype.last_not_of=function(exclude=[],start_index=null){
if(start_index===null){
start_index=this.length-1;
}
for(let i=start_index;i>=0;i--){
if(!exclude.includes(this.charAt(i))){
return this.charAt(i);
}
}
return null;
};
String.prototype.last_index_not_of=function(exclude=[],start_index=null){
if(start_index===null){
start_index=this.length-1;
}
for(let i=start_index;i>=0;i--){
if(!exclude.includes(this.charAt(i))){
return i;
}
}
return null;
};
String.prototype.insert=function(index,substr){
let edited=this.substr(0,index);
edited+=substr;
edited+=this.substr(index);
return edited;
};
String.prototype.remove_indices=function(start,end){
let edited=this.substr(0,start);
edited+=this.substr(end);
return edited;
};
String.prototype.replace_indices=function(substr,start,end){
let edited=this.substr(0,start);
edited+=substr;
edited+=this.substr(end);
return edited;
};
String.prototype.eq_first=function(substr,start_index=0){
if(start_index+substr.length>this.length){
return false;
}
const end=start_index+substr.length;
let y=0;
for(let x=start_index;x<end;x++){
if(this.charAt(x)!=substr.charAt(y)){
return false;
}
++y;
}
return true;
}
String.prototype.eq_last=function(substr){
if(substr.length>this.length){
return false;
}
let y=0;
for(let x=this.length-substr.length;x<this.length;x++){
if(this.charAt(x)!=substr.charAt(y)){
return false;
}
++y;
}
return true;
}
String.prototype.ensure_last=function(ensure_last){
if(ensure_last.indexOf(this.charAt(this.length-1))===-1){
return this+ensure_last.charAt(0);
}
return this;
}
String.prototype.is_uppercase=function(allow_digits=false){
let uppercase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
if(allow_digits){
uppercase+="0123456789";
}
for(let i=0;i<this.length;i++){
if(uppercase.indexOf(this.charAt(i))===-1){
return false;
}
}
return true;
}
String.prototype.capitalize_word=function(){
if("abcdefghijklmopqrstuvwxyz".includes(this.charAt(0))){
return this.charAt(0).toUpperCase()+this.substr(1);
}
return this;
}
String.prototype.capitalize_words=function(){
let batch="";
let capitalized="";
for(let i=0;i<this.length;i++){
const c=this.charAt(i);
if(c===" "||c==="\t"||c==="\n"){
capitalized+=batch.capitalize_word();
batch="";
capitalized+=c;
}else{
batch+=c;
}
}
capitalized+=batch.capitalize_word();
return capitalized;
}
String.prototype.drop=function(char){
const is_array=Array.isArray(char);
let dropped="";
for(let i=0;i<this.length;i++){
const c=this.charAt(i);
if(is_array){
if(char.includes(c)===false){
dropped+=c;
}
}else{
if(char!==c){
dropped+=c;
}
}
}
return dropped;
}
String.prototype.reverse=function(){
let reversed="";
for(let i=this.length-1;i>=0;i--){
reversed+=this.charAt(i);
}
return reversed;
}
String.prototype.random=function(length=32){
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let result="";
for(let i=0;i<length;i++){
result+=chars.charAt(Math.floor(Math.random()*chars.length));
}
return result;
}
String.prototype.is_integer_string=function(){
const chars='0123456789';
for(let i=0;i<this.length;i++){
if(chars.indexOf(this.charAt(i))===-1){
return false;
}
}
return true;
}
String.prototype.is_floating_string=function(){
const chars='0123456789';
let decimal=false;
for(let i=0;i<this.length;i++){
const char=this.charAt(i);
if(char==='.'){
if(decimal){return false;}
decimal=true;
}else if(chars.indexOf(char)===-1){
return false;
}
}
return decimal;
}
String.prototype.is_numeric_string=function(info=false){
const chars='0123456789';
let decimal=false;
for(let i=0;i<this.length;i++){
const char=this.charAt(i);
if(char==='.'){
if(decimal){return false;}
decimal=true;
}else if(chars.indexOf(char)===-1){
if(info){
return{integer:false,floating:false};
}
return false;
}
}
if(info){
return{integer:decimal===false,floating:decimal===true};
}
return true;
}
String.prototype.unquote=function(){
if((this.startsWith('"')&&this.endsWith('"'))||(this.startsWith("'")&&this.endsWith("'"))){
return this.slice(1,-1);
}
return this;
}
String.prototype.quote=function(){
if((this.startsWith('"')&&this.endsWith('"'))||(this.startsWith("'")&&this.endsWith("'"))){
return this;
}
return `"${this}"`;
}