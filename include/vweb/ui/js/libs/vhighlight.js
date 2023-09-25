/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
const vhighlight={};
vhighlight.highlight=function({
element=null,code=null,language=null,line_numbers=null,animate=false,delay=25,return_tokens=false,}){
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
if(language=="cpp"||language=="c++"||language=="c"){
return vhighlight.cpp.highlight(code,return_tokens);
}else if(language=="markdown"||language=="md"){
return vhighlight.md.highlight(code,return_tokens);
}else if(language=="js"||language=="javascript"){
return vhighlight.js.highlight(code,return_tokens);
}else if(language=="json"){
return vhighlight.json.highlight(code,return_tokens);
}else if(language=="python"){
return vhighlight.python.highlight(code,return_tokens);
}else if(language=="css"){
return vhighlight.css.highlight(code,return_tokens);
}else if(language=="bash"||language=="sh"||language=="zsh"||language=="shell"){
return vhighlight.bash.highlight(code,return_tokens);
}else{
return null;
}
}
else if(element.tagName=="PRE"){
return_tokens=false;
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
}else if(language=="css"){
highlighted_code=vhighlight.css.highlight(code);
}else if(language=="bash"||language=="sh"||language=="zsh"||language=="shell"){
highlighted_code=vhighlight.bash.highlight(code);
}else{
return null;
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
return_tokens=false;
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
}else if(language=="css"){
highlighted_code=vhighlight.css.highlight(code);
}else if(language=="bash"||language=="sh"||language=="zsh"||language=="shell"){
highlighted_code=vhighlight.bash.highlight(code);
}else{
return null;
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
vhighlight.Tokens=class Tokens extends Array{
constructor(){
super();
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
end=this.length;
}
for(let i=start;i<end;i++){
const res=handler(this[i]);
if(res!=null){
return res;
}
}
return null;
};
iterate_reversed(start,end,handler){
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
if(res!=null){
return res;
}
}
return null;
};
iterate_tokens(start,end,handler){
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
const tokens=this[i];
for(let i=0;i<tokens.length;i++){
const res=handler(tokens[i]);
if(res!=null){
return res;
}
}
}
return null;
};
iterate_tokens_reversed(start,end,handler){
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
const tokens=this[i];
for(let i=tokens.length-1;i>=0;i--){
const res=handler(tokens[i]);
if(res!=null){
return res;
}
}
}
return null;
};
}
vhighlight.Tokenizer=class Tokenizer{
constructor({
keywords=[],
type_def_keywords=[],
type_keywords=[],
operators=[],
special_string_prefixes=[],
single_line_comment_start=false,
multi_line_comment_start=false,
multi_line_comment_end=false,
allow_strings=true,
allow_numerics=true,
allow_preprocessors=false,
allow_slash_regexes=false,
scope_seperators=[
";",
"{",
"}",
],
allow_string_scope_seperator=false,
allow_comment_scope_seperator=false,
allow_regex_scope_seperator=false,
allow_preprocessor_scope_seperator=false,
}){
this.code=null;this.keywords=keywords;this.type_def_keywords=type_def_keywords;this.type_keywords=type_keywords;this.operators=operators;this.special_string_prefixes=special_string_prefixes;this.single_line_comment_start=single_line_comment_start;this.multi_line_comment_start=multi_line_comment_start;this.multi_line_comment_end=multi_line_comment_end;this.allow_strings=allow_strings;this.allow_numerics=allow_numerics;this.allow_preprocessors=allow_preprocessors;this.allow_slash_regexes=allow_slash_regexes;this.scope_seperators=scope_seperators;this.allow_string_scope_seperator=allow_string_scope_seperator;this.allow_comment_scope_seperator=allow_comment_scope_seperator;this.allow_regex_scope_seperator=allow_regex_scope_seperator;this.allow_preprocessor_scope_seperator=allow_preprocessor_scope_seperator;
this.word_boundaries=[
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
this.alphabet="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
this.numerics="0123456789";
this.excluded_word_boundary_joinings=["{","}","[","]","(",")"].concat(this.scope_seperators);this.excluded_word_boundary_joinings=this.excluded_word_boundary_joinings.reduce((accumulator,val)=>{if(!accumulator.includes(val)){
accumulator.push(val);
}
return accumulator;
},[]);
this.callback=function(){return false;}
this.reset();
}
reset(){
this.tokens=new vhighlight.Tokens();this.added_tokens=0;this.index=null;this.prev_char=null;this.next_char=null;this.batch ="";this.line=0;this.is_comment=false;this.is_str=false;this.is_regex=false;this.is_preprocessor=false;this.is_comment_keyword=false;this.is_comment_codeblock=false;this.parenth_depth=0;this.bracket_depth=0;this.curly_depth=0;this.next_token=null;this.str_id=0;this.comment_id=0;this.regex_id=0;this.preprocessor_id=0;this.offset=0;
this.class_depth=null;
}
get_prev_token(index,exclude=[" ","\t","\n"],exclude_comments=false){
return this.tokens.iterate_tokens_reversed((token)=>{
if(token.index<=index){
if(exclude_comments&&token.token==="token_comment"){
return null;
}
if(!exclude.includes(token.data)){
return token;
}
}
})
}
str_includes_word_boundary(str){
for(let i=0;i<this.word_boundaries.length;i++){
if(str.includes(this.word_boundaries[i])){
return true;
}
}
return false;
}
is_linebreak_whitespace_char(x=null){
if(x!=null){
return x==" "||x=="\t"||x=="\n";
}else{
return this.batch==" "||this.batch=="\t"||this.batch=="\n";
}
}
get_closing_parentheses(index){
return this.get_closing_template(index,"(",")");
}
get_closing_curly(index){
return this.get_closing_template(index,"{","}");
}
get_closing_bracket(index){
return this.get_closing_template(index,"[","]");
}
get_closing_template(index,open,close){
let depth=1;
const info_obj={index:null,str_id:0,comment_id:null,regex_id:null,preprocessor_id:0};
return this.iterate_code(info_obj,index+1,null,(char,is_str,is_comment,is_multi_line_comment,is_regex)=>{
if(!is_str&&!is_comment&&!is_multi_line_comment&&!is_regex){
if(char==open){
++depth;
}else if(char==close){
--depth;
if(depth==0){
return info_obj.index;
}
}
}
});
}
get_first_non_whitespace(index,skip_line_breaks=false){
if(index==null){
return null;
}
let end;
for(end=index;end<this.code.length;end++){
const c=this.code.charAt(end);
if(c!=" "&&c!="\t"&&(skip_line_breaks||c!="\n")){
return end;
}
}
return null;
}
get_first_word_boundary(index){
if(index==null){
return null;
}
for(let i=index;i<this.code.length;i++){
if(this.word_boundaries.includes(this.code.charAt(i))){
return i;
}
}
return this.code.length;
}
is_whitespace(char){
return char==" "||char=="\t";
}
is_alphabetical(char){
return this.alphabet.includes(char);
}
is_numerical(char){
return this.numerics.includes(char);
}
is_escaped(index,str=null){
if(str==null){
if(this.code.charAt(index-1)=="\\"){
if(this.code.charAt(index-2)=="\\"){
return this.is_escaped(index-2);
}
return true;
}
}else{
if(str.charAt(index-1)=="\\"){
if(str.charAt(index-2)=="\\"){
return this.is_escaped(index-2,str);
}
return true;
}
}
return false;
}
append_forward_lookup_batch(token,data){
if(this.batch.length>0){
this.append_batch();
}
this.batch="";
for(let i=0;i<data.length;i++){
const c=data.charAt(i);
if(c=="\n"&&!this.is_escaped(i,data)){
this.append_batch(token);
this.batch="\n";
this.append_batch("token_line");
++this.line;
}else{
this.batch+=c;
}
}
this.append_batch(token);
}
resume_on_index(index){
this.index=index;
}
append_token(token=null,is_word_boundary=null){
const obj={
data:this.batch,
index:this.added_tokens,
line:this.line,
offset:this.offset,
};
if(token!=null){
obj.token=token;
}
if(
(is_word_boundary===true)||
(
this.batch.length===1&&
(token===null||token==="token_operator")&&this.word_boundaries.includes(this.batch)
)
){
obj.is_word_boundary=true;
}
this.offset+=this.batch.length;
if(token===null&&obj.is_word_boundary===true){
const line_tokens=this.tokens[this.line];
if(line_tokens!==undefined){
const last=line_tokens.last();
if(
last!==undefined&&
last.is_word_boundary===true&&
(last.data.length>1||!this.excluded_word_boundary_joinings.includes(last.data))&&
!this.excluded_word_boundary_joinings.includes(obj.data)
){
last.data+=obj.data;
return null;}
}
}
++this.added_tokens;
switch(token){
case "token_string":
obj.str_id=this.str_id;
break;
case "token_comment":
obj.comment_id=this.comment_id;
break;
case "token_regex":
obj.regex_id=this.regex_id;
break;
case "token_preprocessor":
obj.preprocessor_id=this.preprocessor_id;
break;
case "token_line":
obj.is_line_break=true;
if(this.is_str){
obj.str_id=this.str_id;
}
else if(this.is_comment){
obj.comment_id=this.comment_id;
}
else if(this.is_regex){
obj.regex_id=this.regex_id;
}
else if(this.is_preprocessor){
obj.preprocessor_id=this.preprocessor_id;
}
break;
default:
break;
}
if(this.tokens[this.line]===undefined){
this.tokens[this.line]=[obj];
}else{
this.tokens[this.line].push(obj);
}
}
append_batch(token=null,is_word_boundary=null){
if(this.batch.length==0){
return;
}
if(token==false){
this.append_token(null,is_word_boundary);
}
else if(token!=null){
this.append_token(token,is_word_boundary);
}
else if(this.next_token!=null){
if(this.is_linebreak_whitespace_char()){
this.append_token(null,is_word_boundary);
}
else if(is_word_boundary===true||this.word_boundaries.includes(this.batch)){
this.append_token(null,true);
this.next_token=null;
}
else if(this.keywords.includes(this.batch)){
this.append_token("token_keyword");
this.next_token=null;
}
else{
this.append_token(this.next_token,is_word_boundary);
this.next_token=null;
}
}
else{
if(this.keywords.includes(this.batch)){
if(this.type_def_keywords.includes(this.batch)){
this.next_token="token_type_def"
this.class_depth=this.curly_depth+1;}
else if(this.type_keywords.includes(this.batch)){
this.next_token="token_type";
}
this.append_token("token_keyword");
}
else if(this.operators.includes(this.batch)){
this.append_token("token_operator",true);
}
else if(this.allow_numerics&&/^-?\d+(\.\d+)?$/.test(this.batch)){
this.append_token("token_numeric");
}
else{
this.append_token(null,is_word_boundary);
}
}
this.batch="";
}
iterate_code(info_obj={index:0,prev_char:null,next_char:null},start=null,end=null,callback){
if(start==null){
start=0;
}
if(end==null){
end=this.code.length;
}
let is_comment=false;
let is_multi_line_comment=false;
let string_char=null;
let is_regex=false;let is_preprocessor=false;let prev_non_whitespace_char=null;
const eq_first=(substr,start_index=0)=>{
if(start_index+substr.length>this.code.length){
return false;
}
const end=start_index+substr.length;
let y=0;
for(let x=start_index;x<end;x++){
if(this.code.charAt(x)!=substr.charAt(y)){
return false;
}
++y;
}
return true;
}
for(info_obj.index=start;info_obj.index<end;info_obj.index++){
const char=this.code.charAt(info_obj.index);
info_obj.prev_char=this.code.charAt(info_obj.index-1);
info_obj.next_char=this.code.charAt(info_obj.index+1);
if(info_obj.prev_char!=" "&&info_obj.prev_char!="\t"){
prev_non_whitespace_char=info_obj.prev_char;
}
const is_escaped=this.is_escaped(info_obj.index);
if(
this.allow_preprocessors&&
!is_preprocessor&&
(prev_non_whitespace_char=="\n"||info_obj.index===0)&&
char=="#"
){
++info_obj.preprocessor_id;
is_preprocessor=true;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
else if(
is_preprocessor&&
(
(char=="\n"&&prev_non_whitespace_char!="\\")||
info_obj.index==this.code.length-1
)
){
is_preprocessor=false;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
if(
this.allow_strings&&
!is_escaped&&
!is_comment&&
!is_multi_line_comment&&
!is_regex&&
string_char==null&&
(
char=='"'||
char=="'"||
char=='`'
)
){
++info_obj.str_id;
string_char=char;
const res=callback(char,true,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
else if(
!is_escaped&&
string_char!=null&&
char==string_char
){
string_char=null;
const res=callback(char,true,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
else if(string_char!=null){
const res=callback(char,true,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
if(
!is_escaped&&
!is_comment&&
!is_multi_line_comment&&
!is_regex
){
const comment_start=this.single_line_comment_start;
if(comment_start.length===1&&char===comment_start){
++info_obj.comment_id;
is_comment=true;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
else if(comment_start.length!==1&&eq_first(comment_start,info_obj.index)){
++info_obj.comment_id;
is_comment=true;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
const mcomment_start=this.multi_line_comment_start;
if(mcomment_start===false){
}
else if(mcomment_start.length!==1&&eq_first(mcomment_start,info_obj.index)){
++info_obj.comment_id;
is_multi_line_comment=true;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
}
else if(
is_comment&&
(
(!is_escaped&&char=="\n")||
info_obj.index==this.code.length-1
)
){
is_comment=false;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
else if(
is_multi_line_comment&&
!is_escaped
){
const mcomment_end=this.multi_line_comment_end;
if(mcomment_end.length==2&&info_obj.prev_char+char==mcomment_end){
is_multi_line_comment=false;
const res=callback(char,false,is_comment,true,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
}
else if(is_comment||is_multi_line_comment){
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
if(this.allow_slash_regexes&&!is_escaped&&!is_regex&&char=="/"){
let prev=null;
for(let p=info_obj.index-1;p>=0;p--){
const c=this.code.charAt(p);
if(c!=" "&&c!="\t"){
prev=c;
break;
}
}
if(
prev!=null&&
(
prev=="\n"||prev==","||prev=="("||
prev=="["||prev=="{"||prev==":"||
this.operators.includes(prev)
)
){
++info_obj.regex_id;
is_regex=true;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
}
else if(is_regex){
if(char=='/'&&!is_escaped){
is_regex=false;
}
const res=callback(char,false,is_comment,is_multi_line_comment,true,is_escaped,is_preprocessor);if(res!=null){return res;}
continue;
}
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
}
return null;
};
tokenize(return_tokens=false){
this.reset();
const append_comment_codeblock_batch=()=>{
if(this.multi_line_comment_start==="/*"){
let i,separate=false;
for(i=0;i<this.batch.length;i++){
const c=this.batch.charAt(i);
if(c==="*"){
separate=true;
const next=this.batch.charAt(i+1);
if(next===" "||next==="\t"){
i+=2;
}
break;
}
else if(c===" "||c==="\t"){
continue;
}
else{
break;
}
}
if(separate){
const after=this.batch.substr(i);
this.batch=this.batch.substr(0,i);
this.append_batch("token_comment");
this.batch=after;
}
}
this.append_batch("token_comment_codeblock");
}
const auto_append_batch_switch=(default_append=true)=>{
if(this.is_comment_keyword){
this.append_batch("token_comment_keyword");
}else if(this.is_comment_codeblock){
append_comment_codeblock_batch();
}else if(this.is_comment){
this.append_batch("token_comment");
}else if(this.is_str){
this.append_batch("token_string");
}else if(this.is_regex){
this.append_batch("token_string");
}else if(this.is_preprocessor){
this.append_batch("token_preprocessor");
}else{
if(default_append){
this.append_batch();
}else{
return false;
}
}
return true;
}
this.iterate_code(this,null,null,(char,local_is_str,local_is_comment,is_multi_line_comment,local_is_regex,is_escaped,is_preprocessor)=>{
if(!is_escaped&&char=="\n"){
auto_append_batch_switch();
if(!local_is_str){
this.is_str=false;
}
if(!local_is_comment&&!is_multi_line_comment){
this.is_comment=false;
this.is_comment_keyword=false;
}
if(!local_is_regex){
this.is_regex=false;
}
if(this.is_preprocessor&&!is_preprocessor){
this.is_preprocessor=false;
this.is_str=false;}
this.batch+=char;
this.append_batch("token_line");
++this.line;
}
else if(local_is_comment||is_multi_line_comment){
if(!this.is_comment){
auto_append_batch_switch();
this.is_comment=true;
this.batch+=char;
}
else{
if(this.is_comment_codeblock&&char==="`"&&this.next_char!=="`"){
this.batch+=char;
auto_append_batch_switch();
this.is_comment_codeblock=false;
}
else if(!this.is_comment_codeblock&&char==="`"){
auto_append_batch_switch();
this.is_comment_codeblock=true;
this.batch+=char;
}
else if(!this.is_comment_codeblock&&char==="@"&&!is_escaped){
auto_append_batch_switch();
this.is_comment_keyword=true;
this.batch+=char;
}
else if(this.is_comment_keyword&&this.word_boundaries.includes(char)){
auto_append_batch_switch();
this.is_comment_keyword=false;
this.batch+=char;
}
else{
this.batch+=char;
}
}
}
else if(local_is_str){
if(!this.is_str){
if(auto_append_batch_switch(false)===false){
if(this.special_string_prefixes.includes(this.batch)){
this.append_batch("token_keyword");
}else{
this.append_batch();
}
}
this.is_str=true;
}
this.batch+=char;
}
else if(local_is_regex){
if(!this.is_regex){
auto_append_batch_switch();
this.is_regex=true;
}
this.batch+=char;
}
else if(is_preprocessor){
if(!this.is_preprocessor){
auto_append_batch_switch();
this.is_preprocessor=true;
}
if(char=="<"&&this.batch.replaceAll(" ","").replaceAll("\t","")=="#include"){
auto_append_batch_switch();
this.is_str=true;
this.batch+=char;
}else if(char==">"&&this.is_str){
this.batch+=char;
auto_append_batch_switch();
this.is_str=false;
}
else{
this.batch+=char;
}
}
else{
if(char=="["){
++this.bracket_depth;
}else if(char=="]"){
--this.bracket_depth;
}
if(char=="{"){
++this.curly_depth;
}else if(char=="}"){
--this.curly_depth;
if(this.class_depth!=null&&this.curly_depth<this.class_depth){
this.class_depth=null;
}
}
if(char=="("){
++this.parenth_depth;
}else if(char==")"){
--this.parenth_depth;
}
if(this.is_comment_keyword){
this.append_batch("token_comment_keyword");
this.is_comment_keyword=false;
}
else if(this.is_comment_codeblock){
append_comment_codeblock_batch();
this.is_comment_codeblock=false;
}
else if(this.is_comment){
this.append_batch("token_comment");
this.is_comment=false;
this.is_comment_keyword=false;
this.is_comment_codeblock=false;
}
else if(this.is_str){
this.append_batch("token_string");
this.is_str=false;
}
else if(this.is_regex){
this.append_batch("token_string");
this.is_regex=false;
}
else if(this.is_preprocessor){
this.append_batch("token_preprocessor");
this.is_preprocessor=false;
}
if(!this.callback(char,is_escaped,this.is_preprocessor)){
if(this.word_boundaries.includes(char)){
this.append_batch();
this.batch+=char;
this.append_batch(null,true);}
else{
this.batch+=char;
}
}
}
return null;
});
auto_append_batch_switch();
const last_line=this.tokens[this.tokens.length-1];
if(last_line===undefined||(last_line.length>0&&last_line[last_line.length-1].is_line_break)){
this.tokens.push([]);
}
if(return_tokens){
return this.tokens;
}
else{
return this.build_tokens();
}
}
partial_tokenize({
edits_start=null,
edits_end=null,
line_additions=0,
tokens=[],
}){
if(line_additions===undefined||isNaN(line_additions)){
line_additions=0;
}
let scope_start=0;let scope_start_offset=0;let scope_end=null;let scope_end_offset=0;let now;
if(edits_start!==0){
let is_id=null;
let is_string=false;
let is_comment=false;
let is_regex=false;
let is_preprocessor=false;
let stop_on_line=null;
tokens.iterate_tokens_reversed(0,edits_start+1,(token)=>{
if(token.line===stop_on_line){
scope_start_offset=token.offset+token.data.length;
return false;
}
else if(is_string){
if(token.str_id!==is_id){
is_string=false;
if(this.allow_string_scope_seperator){
scope_start=token.line;
stop_on_line=token.line-1;
}
}
}
else if(is_comment){
if(token.comment_id!==is_id){
is_comment=false;
if(this.allow_comment_scope_seperator){
scope_start=token.line;
stop_on_line=token.line-1;
}
}
}
else if(is_regex){
if(token.regex_id!==is_id){
is_regex=false;
if(this.allow_regex_scope_seperator){
scope_start=token.line;
stop_on_line=token.line-1;
}
}
}
else if(is_preprocessor){
if(token.preprocessor_id!==is_id){
is_preprocessor=false;
if(this.allow_preprocessor_scope_seperator){
scope_start=token.line;
stop_on_line=token.line-1;
}
}
}
else{
switch(token.token){
case "token_string":
is_string=true;
is_id=token.str_id;
stop_on_line=null;
break;
case "token_comment":
is_comment=true;
is_id=token.comment_id;
stop_on_line=null;
break;
case "token_regex":
is_regex=true;
is_id=token.regex_id;
stop_on_line=null;
break;
case "token_preprocessor":
is_preprocessor=true;
is_id=token.preprocessor_id;
stop_on_line=null;
break;
case null:
if(token.data.length==1&&this.scope_seperators.includes(token.data)){
scope_start=token.line;
stop_on_line=token.line-1;
scope_start_offset=token.offset;
}
break;
default:
break;
}
}
})
}
const get_scope_end_by_old_tokens=()=>{
let scope_end=null;let scope_end_offset=0;
const max_end=edits_end;
let is_id=null;
let is_string=false;
let is_comment=false;
let is_regex=false;
let is_preprocessor=false;
let stop_on_line=null;
tokens.iterate_tokens(edits_start,null,(token)=>{
if(token.line===stop_on_line){
return false;
}
else if(is_string){
if(token.str_id!==is_id){
is_string=false;
if(this.allow_string_scope_seperator&&token.line>max_end){
scope_end=token.line;
stop_on_line=token.line+1;
}
}
}
else if(is_comment){
if(token.comment_id!==is_id){
is_comment=false;
if(this.allow_comment_scope_seperator&&token.line>max_end){
scope_end=token.line;
stop_on_line=token.line+1;
}
}
}
else if(is_regex){
if(token.regex_id!==is_id){
is_regex=false;
if(this.allow_regex_scope_seperator&&token.line>max_end){
scope_end=token.line;
stop_on_line=token.line+1;
}
}
}
else if(is_preprocessor){
if(token.preprocessor_id!==is_id){
is_preprocessor=false;
if(this.allow_preprocessor_scope_seperator&&token.line>max_end){
scope_end=token.line;
stop_on_line=token.line+1;
}
}
}
else{
switch(token.token){
case "token_string":
is_string=true;
is_id=token.str_id;
stop_on_line=null;
break;
case "token_comment":
is_comment=true;
is_id=token.comment_id;
stop_on_line=null;
break;
case "token_regex":
is_regex=true;
is_id=token.regex_id;
stop_on_line=null;
break;
case "token_preprocessor":
is_preprocessor=true;
is_id=token.preprocessor_id;
stop_on_line=null;
break;
case null:
if(token.line>max_end&&token.data.length==1&&this.scope_seperators.includes(token.data)){
scope_end=token.line;
stop_on_line=token.line+1;
}
break;
default:
break;
}
}
})
let line=scope_start>0 ? scope_start-1:scope_start;this.iterate_code(this,scope_start_offset,null,(char,l_is_str,l_is_comment,l_is_multi_line_comment,l_is_regex,is_escaped,l_is_preprocessor)=>{
if(char=="\n"&&!is_escaped){
++line;
if(line==scope_end){
scope_end_offset=this.index;
return false;
}
}
})
return{line:scope_end,offset:scope_end_offset};
}
const get_scope_end_by_new_code=()=>{
let scope_end=null;let scope_end_offset=0;
let line=scope_start;
let is_string=false;
let is_comment=false;
let is_regex=false;
let is_preprocessor=false;
let stop_on_line=null;
this.iterate_code(this,scope_start_offset,null,(char,l_is_str,l_is_comment,l_is_multi_line_comment,l_is_regex,is_escaped,l_is_preprocessor)=>{
let line_break=false;
if(char=="\n"&&!is_escaped){
line_break=true;
++line;
}
if(line_break&&line==stop_on_line){
scope_end_offset=this.index;
return false;
}
if(this.index==this.code.length-1){
scope_end_offset=this.index;
scope_end=line;
return false;
}
l_is_comment=l_is_comment||l_is_multi_line_comment;
if(line>edits_end){
if(is_string){
if(!l_is_str){
is_string=false;
if(this.allow_string_scope_seperator){
scope_end=line;
stop_on_line=line+1;
}
}
}else if(is_comment){
if(!l_is_comment){
is_comment=false;
if(this.allow_comment_scope_seperator){
scope_end=line;
stop_on_line=line+1;
}
}
}else if(is_regex){
if(!l_is_regex){
is_regex=false;
if(this.allow_regex_scope_seperator){
scope_end=line;
stop_on_line=line+1;
}
}
}else if(is_preprocessor){
if(!l_is_preprocessor){
is_preprocessor=false;
if(this.allow_preprocessor_scope_seperator){
scope_end=line;
stop_on_line=line+1;
}
}
}
else if(l_is_str){
is_string=true;
stop_on_line=null;
}
else if(l_is_comment){
is_comment=true;
stop_on_line=null;
}
else if(l_is_regex){
is_regex=true;
stop_on_line=null;
}
else if(l_is_preprocessor){
is_preprocessor=true;
stop_on_line=null;
}
else if(this.scope_seperators.includes(char)){
scope_end=line;
stop_on_line=line+1;
}
}
else{
if(is_string&&!l_is_str){
is_string=false;
}
else if(is_comment&&!l_is_comment){
is_comment=false;
}
else if(is_regex&&!l_is_regex){
is_regex=false;
}
else if(is_preprocessor&&!l_is_preprocessor){
is_preprocessor=false;
}
else if(l_is_str){
is_string=true;
}
else if(l_is_comment){
is_comment=true;
}
else if(l_is_regex){
is_regex=true;
}
else if(l_is_preprocessor){
is_preprocessor=true;
}
}
})
return{line:scope_end,offset:scope_end_offset};
}
const old_scope_end=get_scope_end_by_old_tokens();
const new_scope_end=get_scope_end_by_new_code();
if(
(new_scope_end.offset===this.code.length)||(new_scope_end.line===edits_end&&edits_start===edits_end&&line_additions<0)){
scope_end=new_scope_end.line;
scope_end_offset=new_scope_end.offset;
}
else if(new_scope_end.line>=old_scope_end.line){
scope_end=new_scope_end.line;
scope_end_offset=new_scope_end.offset;
}
else{
scope_end=old_scope_end.line;
scope_end_offset=old_scope_end.offset;
}
this.code=this.code.substr(scope_start_offset,(scope_end_offset-scope_start_offset)+1);
const insert_tokens=this.tokenize(true);
if(insert_tokens.length>0&&insert_tokens.last().length===0){
--insert_tokens.length;
}
let combined_tokens=new vhighlight.Tokens();
let insert=true;
let line_count=0,token_index=0,offset=0;;
let insert_end=scope_end-line_additions;
for(let line=0;line<tokens.length;line++){
if(insert&&line==scope_start){
insert=false;
insert_tokens.iterate((line_tokens)=>{
line_tokens.iterate((token)=>{
token.line=line_count;
token.index=token_index;
token.offset=offset;
offset+=token.data.length;
++token_index;
});
++line_count;
combined_tokens.push(line_tokens);
})
}
else if(line<scope_start||line>insert_end){
const line_tokens=tokens[line];
line_tokens.iterate((token)=>{
token.line=line_count;
token.index=token_index;
token.offset=offset;
offset+=token.data.length;
++token_index;
});
++line_count;
combined_tokens.push(line_tokens);
}
}
const last_line=combined_tokens[combined_tokens.length-1];
if(last_line===undefined||(last_line.length>0&&last_line[last_line.length-1].is_line_break)){
combined_tokens.push([]);
}
return combined_tokens;
}
build_tokens(reformat=true){
let html="";
tokens.iterate((line_tokens)=>{
line_tokens.iterate((token)=>{
if(token.token===undefined){
if(reformat){
html+=token.data.replaceAll("<","&lt;").replaceAll(">","&gt;");
}else{
html+=token.data;
}
}else{
if(reformat){
html+=`<span class='${token.token}'>${token.data.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</span>`
}else{
html+=`<span class='${token.token}'>${token.data}</span>`
}
}
})
})
return html;
}
}
vhighlight.Bash=class Bash{
constructor(){
this.tokenizer=new vhighlight.Tokenizer({
keywords:[
"if",
"then",
"else",
"elif",
"fi",
"case",
"esac",
"while",
"do",
"done",
"for",
"select",
"until",
"function",
"in",
"return",
"continue",
"break",
"readonly",
"declare",
"local",
"typeset",
"true",
"false",
],
type_def_keywords:[
"function",
],
operators:[
'+','-','*','/','%','=','!=','!','-o','-a','-eq','-ne','-lt','-le','-gt','-ge','-e','-f','-d','-s','-r','-w','-x','&','|','^','~','<<','>>','$',
],
single_line_comment_start:"#",
multi_line_comment_start:false,
multi_line_comment_end:false,
});
this.reset();
this.tokenizer.callback=(char,is_escaped)=>{
const tokenizer=this.tokenizer;
const is_whitespace=tokenizer.is_whitespace(char);
let start_of_line=false;
if(this.current_line!=tokenizer.line&&!is_whitespace){
start_of_line=true;
this.current_line=tokenizer.line;
}
if(char=="-"){
let batch=null;
if(tokenizer.operators.includes(char+tokenizer.next_char)){
batch=char+tokenizer.next_char;
}else if(tokenizer.operators.includes(char+tokenizer.next_char+tokenizer.code.charAt(tokenizer.index+2))){
batch=char+tokenizer.next_char+tokenizer.code.charAt(tokenizer.index+2);
}
if(batch!=null){
tokenizer.append_batch();
tokenizer.append_forward_lookup_batch("token_operator",batch);
tokenizer.resume_on_index(tokenizer.index+batch.length-1);
return true;
}
}
else if(char=="$"){
let batch="$";
let index=tokenizer.index+1;
while(true){
const c=tokenizer.code.charAt(index);
if(tokenizer.is_numerical(c)){
batch+=c;
}else{
break;
}
++index;
}
if(batch.length==1&&(tokenizer.next_char=="#"||tokenizer.next_char=="@"||tokenizer.next_char=="?")){
batch+=tokenizer.next_char
}
if(batch.length>1){
tokenizer.append_batch();
tokenizer.append_forward_lookup_batch("token_keyword",batch);
tokenizer.resume_on_index(tokenizer.index+batch.length-1);
return true;
}
}
else if(char=="("){
tokenizer.append_batch();
let is_func_def=false;
for(let i=tokenizer.index+1;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c=="{"){
is_func_def=true;
}
else if(c!=")"&&c!="\n"&&c!="\t"&&c!=" "){
break;
}
}
if(is_func_def){
const prev=tokenizer.get_prev_token(tokenizer.added_tokens-1,[" ","\t","\n"]);
prev.token="token_type_def";
}
}
else if(start_of_line&&tokenizer.is_alphabetical(char)){
let finished=false;
let passed_whitespace=false;
let word="";
let end_index=null;
for(let i=tokenizer.index;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c==" "||c=="\t"){
passed_whitespace=true;
}else if(!passed_whitespace&&(tokenizer.is_alphabetical(c)||tokenizer.is_numerical(c))){
word+=c;
end_index=i;
}else if(passed_whitespace&&(char=="\\"||!tokenizer.operators.includes(char))){
finished=true;
break;
}else{
break;
}
}
if(finished&&!tokenizer.keywords.includes(word)){
tokenizer.append_batch();
tokenizer.append_forward_lookup_batch("token_type",word);
tokenizer.resume_on_index(end_index);
return true;
}
}
else if(start_of_line&&char==":"){
let style=null;
let start_index=null;let end_index=null;
for(let i=tokenizer.index+1;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c==" "||c=="\t"){
continue;
}else if(c=="<"){
if(tokenizer.code.charAt(i+1)=="<"){
start_index=i+2;
style=1;
}
break;
}else if(c=="'"||c=='"'){
start_index=i+1;
style=2;
}else{
break;
}
}
if(style==1){
let close_sequence="";
let found_close_sequence=false;
const eq_first=(start_index)=>{
if(start_index+close_sequence.length>tokenizer.code.length){
return false;
}
const end=start_index+close_sequence.length;
let y=0;
for(let x=start_index;x<end;x++){
if(tokenizer.code.charAt(x)!=close_sequence.charAt(y)){
return false;
}
++y;
}
return true;
}
for(let i=start_index;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(!found_close_sequence){
if(tokenizer.is_whitespace(c)){
continue;
}else if(
c=='"'||
c=="'"||
c=="_"||
c=="-"||
tokenizer.is_numerical(c)||
tokenizer.is_alphabetical(c)
){
close_sequence+=c;
}else{
found_close_sequence=true;
if(close_sequence!='"'&&close_sequence!='""'&&close_sequence!="'"&&close_sequence!="''"){
const start_char=close_sequence.charAt(0);
if(start_char=="'"||start_char=='"'){
close_sequence=close_sequence.substr(1);
}
const end_char=close_sequence.charAt(close_sequence.length-1);
if(end_char=="'"||end_char=='"'){
close_sequence=close_sequence.substr(0,close_sequence.length-1);
}
}
}
}else{
if(eq_first(i)){
end_index=i+close_sequence.length-1;
break;
}
}
}
}
else if(style==2){
const closing_char=tokenizer.code.charAt(start_index-1);
for(let i=start_index;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(!is_escaped&&c==closing_char){
end_index=i;
break;
}
}
}
if(end_index!=null){
tokenizer.append_batch();
tokenizer.append_forward_lookup_batch("token_comment",tokenizer.code.substr(tokenizer.index,end_index-tokenizer.index+1));
tokenizer.resume_on_index(end_index);
return true;
}
}
return false;
}
}
reset(){
this.current_line=null;}
highlight(code=null,return_tokens=false){
this.reset();
if(code!==null){
this.tokenizer.code=code;
}
return this.tokenizer.tokenize(return_tokens);
}
partial_highlight({
code=null,
edits_start=null,
edits_end=null,
insert_start=null,
insert_end=null,
tokens=[],
update_offsets=true,
}){
if(code!==null){
this.tokenizer.code=code;
}
this.reset();
return this.tokenizer.partial_tokenize({
edits_start:edits_start,
edits_end:edits_end,
insert_start:insert_start,
insert_end:insert_end,
tokens:tokens,
update_offsets:update_offsets,
})
}
}
vhighlight.bash=new vhighlight.Bash();
vhighlight.JS=class JS{
constructor(){
this.tokenizer=new vhighlight.Tokenizer({
keywords:[
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
"async",
"await",
"process",
"module",
"exports",
],
type_def_keywords:[
"class"
],
type_keywords:[
"extends",
],
operators:[
"+","-","*","/","%","**","=","+=","-=","*=","/=","%=","**=",
"==","!=","===","!==",">","<",">=","<=","&&","||","!","&","|",
"^","~","<<",">>",">>>","++","--","?",
],
single_line_comment_start:"//",
multi_line_comment_start:"/*",
multi_line_comment_end:"*/",
allow_slash_regexes:true,
});
this.reset();
this.tokenizer.callback=(char)=>{
if(char=="("){
this.tokenizer.append_batch();
const prev=this.tokenizer.get_prev_token(this.tokenizer.added_tokens-1,[" ","\t","\n"]);
if(prev==null){
return false;
}
let prev_token_is_function_keyword=false;
if(prev.token=="token_keyword"){
if(prev.data=="function"){
prev_token_is_function_keyword=true;
}else if(prev.data!="async"){
return false;
}
}else if(prev.token!==undefined&&prev.token!="token_operator"){
return false;
}
const closing_parentheses=this.tokenizer.get_closing_parentheses(this.tokenizer.index);
if(closing_parentheses==null){
return false;
}
const after_parenth=this.tokenizer.get_first_non_whitespace(closing_parentheses+1,true);
const c=this.tokenizer.code.charAt(after_parenth);
if(c=="{"){
if(prev_token_is_function_keyword){
const token=this.tokenizer.get_prev_token(prev.index-1,[" ","\t","\n","=",":","async"]);
if(this.tokenizer.str_includes_word_boundary(token.data)){
return false;
}
token.token="token_type_def";
}
else if(!this.tokenizer.str_includes_word_boundary(prev.data)){
prev.token="token_type_def";
}
}
else if(c=="="&&this.tokenizer.code.charAt(after_parenth+1)==">"){
const token=this.tokenizer.get_prev_token(prev.index-1,[" ","\t","\n","=",":","async"]);
if(this.tokenizer.str_includes_word_boundary(token.data)){
return false;
}
token.token="token_type_def";
}
else if(!this.tokenizer.str_includes_word_boundary(prev.data)){
prev.token="token_type";
}
return false;
}
else if(
(this.tokenizer.class_depth==this.tokenizer.curly_depth&&
(
(this.tokenizer.parenth_depth==1&&((char==','&&!this.last_param_was_assignment)||(char=='='&&this.tokenizer.next_char!='>')))||
(this.tokenizer.parenth_depth==0&&char==')')
))||
(
this.func_def_curly_depth==this.tokenizer.curly_depth&&(
(this.tokenizer.parenth_depth==this.func_def_parenth_depth&&((char==','&&!this.last_param_was_assignment)||(char=='='&&this.tokenizer.next_char!='>')))||
(this.tokenizer.parenth_depth==this.func_def_parenth_depth-1&&char==')')
)
)||
(
this.opening_parenth_curly_depth==this.tokenizer.curly_depth&&this.tokenizer.parenth_depth>0&&char=='='&&
this.tokenizer.code.charAt(this.tokenizer.index+1)!='>'
)
){
if(char==')'){
if(this.func_def_parenth_depth!=null&&this.tokenizer.parenth_depth<this.func_def_parenth_depth){
this.func_def_parenth_depth=null;
}
if(this.last_param_was_assignment){
this.last_param_was_assignment=false;
this.tokenizer.append_batch();
this.tokenizer.batch+=char;
this.tokenizer.append_batch();
return true;
}
}
if(char=='='){
this.last_param_was_assignment=true;
}else{
this.last_param_was_assignment=false;
}
if(this.tokenizer.is_linebreak_whitespace_char(this.tokenizer.prev_char)){
const prev=this.tokenizer.get_prev_token(this.tokenizer.added_tokens-1,[" ","\t","\n"]);
prev.token="token_parameter";
this.tokenizer.append_batch();
}else{
this.tokenizer.append_batch("token_parameter");
}
this.tokenizer.batch+=char;
this.tokenizer.append_batch();
return true;
}
return false;
}
}
reset(){
this.opening_parenth_curly_depth=0;this.func_def_parenth_depth=null;this.func_def_curly_depth=null;this.last_param_was_assignment=false;}
highlight(code=null,return_tokens=false){
this.reset();
if(code!==null){
this.tokenizer.code=code;
}
return this.tokenizer.tokenize(return_tokens);
}
partial_highlight({
code=null,
edits_start=null,
edits_end=null,
line_deletions=0,
line_additions=0,
tokens=[],
update_offsets=true,
}){
if(code!==null){
this.tokenizer.code=code;
}
this.reset();
return this.tokenizer.partial_tokenize({
edits_start:edits_start,
edits_end:edits_end,
line_deletions:line_deletions,
line_additions:line_additions,
tokens:tokens,
update_offsets:update_offsets,
})
}
}
vhighlight.js=new vhighlight.JS();
vhighlight.CPP=class CPP{
constructor(){
this.tokenizer=new vhighlight.Tokenizer({
keywords:[
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
],
type_def_keywords:[
"namespace",
"struct",
"class",
"enum",
"union",
],
type_keywords:[
"const",
"constexpr",
"static",
"volatile",
"mutable",
],
operators:[
"&&","||","!","==","!=",">","<",">=","<=","+","-","*","/","%",
"=","+=","-=","*=","/=","%=","++","--","<<",">>","&","|","^","~",
"?",
],
special_string_prefixes:[
"L",
"u",
"U",
"R",
"u8",
],
single_line_comment_start:"//",
multi_line_comment_start:"/*",
multi_line_comment_end:"*/",
allow_preprocessors:true,
scope_seperators:[
"{",
"}",
],
allow_string_scope_seperator:false,
allow_comment_scope_seperator:false,
allow_regex_scope_seperator:false,
allow_preprocessor_scope_seperator:false,
});
this.reset();
const find_opening_template_token=(index)=>{
let depth=1;
for(let i=index-1;i>=0;i--){
const token=this.tokenizer.tokens[i];
if(token.data=="<"){
--depth;
if(depth==0){
return i;
}
}else if(token.data==">"){
++depth;
}
}
return null;
}
this.tokenizer.callback=(char)=>{
const tokenizer=this.tokenizer;
if(this.inside_func&&tokenizer.index>this.inside_func_closing_curly){
this.inside_func=false;
}
if(
(this.last_line_type!=tokenizer.line&&char!=" "&&char!="\t")||(tokenizer.prev_char=="("||(tokenizer.parenth_depth>0&&tokenizer.prev_char==","))){
this.last_line_type=tokenizer.line;
tokenizer.append_batch();
let is_type=false;
let hit_template=0;
let word="";
let words=0;
let append_to_batch=[];
let last_index,last_append_index;
for(let index=tokenizer.index;index<tokenizer.code.length;index++){
const c=tokenizer.code.charAt(index);
if(hit_template==2){
if(c==" "||c=="\t"||c=="*"||c=="&"||c=="\n"){
continue;
}
else if(tokenizer.is_alphabetical(c)){
if(words==1){
is_type=true;
break;
}
break;
}
else{
break;
}
}
else if(hit_template==1){
if(c==">"){
hit_template=2;
}
}
else{
if(c==" "||c=="\t"||c==":"||c=="*"||c=="&"||(words==0&&c=="<")){
if(c=="<"){
hit_template=1;
}
if(word.length>0){
if(tokenizer.keywords.includes(word)){append_to_batch.push(["token_keyword",word]);
}else{
if(c!=":"||tokenizer.code.charAt(index+1)!=":"){++words;
}
append_to_batch.push(["token_type",word]);
}
last_index=index;
last_append_index=append_to_batch.length-1;
word="";
}
if(c=="*"||c=="&"){
append_to_batch.push(["token_operator",c]);
}else{
append_to_batch.push([null,c]);}
}
else if(tokenizer.is_alphabetical(c)||(word.length>0&&tokenizer.is_numerical(c))){
if(words==1){
is_type=true;
break;
}
word+=c;
}
else{
break;
}
}
}
if(is_type){
for(let i=0;i<=last_append_index;i++){
tokenizer.append_forward_lookup_batch(append_to_batch[i][0],append_to_batch[i][1]);
}
tokenizer.resume_on_index(last_index-1);
return true;
}
}
else if(char=="("){
tokenizer.append_batch();
const closing=tokenizer.get_closing_parentheses(tokenizer.index);
const non_whitespace_after=tokenizer.get_first_non_whitespace(closing+1);
if(closing!=null&&non_whitespace_after!=null){
let prev=tokenizer.get_prev_token(tokenizer.added_tokens-1,[" ","\t","\n","*","&"]);
const prev_prev_is_colon=tokenizer.get_prev_token(prev.index-1).data==":";
if(
(prev.token===undefined&&prev.data!="]")||(prev.token=="token_type"&&prev_prev_is_colon)){
const lookup=tokenizer.code.charAt(non_whitespace_after);
if(
(lookup==";"&&!this.inside_func)||lookup=="{"||lookup=="c"||lookup=="v"||lookup=="n"||lookup=="o"||lookup=="f"||lookup=="r"	){
prev.token="token_type_def";
let token=prev;
while(true){
token=tokenizer.get_prev_token(token.index-1,[":"]);
if(tokenizer.str_includes_word_boundary(token.data)){
break;
}
token.token="token_type_def";
}
let opening=null;
for(let i=closing;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c==";"){
break;
}
else if(c=="{"){
opening=i;
break;
}
}
if(opening!=null){
this.inside_func=true;
this.inside_func_closing_curly=tokenizer.get_closing_curly(opening);
}
}
else{
if(prev.data==">"){
const opening_token_index=find_opening_template_token(prev.index);
if(opening_token_index!=null){
prev=tokenizer.get_prev_token(opening_token_index-1,[" ","\t","\n"]);
}
}
let prev_prev=tokenizer.get_prev_token(prev.index-1,[" ","\t","\n","*","&"]);
if(prev_prev.data==">"){
const opening_token_index=find_opening_template_token(prev_prev.index);
if(opening_token_index!=null){
prev_prev=tokenizer.get_prev_token(opening_token_index-1,[" ","\t","\n"]);
}
}
if(prev_prev.token!="token_type"){
prev.token="token_type";
}
}
}
}
}
else if(char=="{"){
tokenizer.append_batch();
let prev=tokenizer.get_prev_token(tokenizer.added_tokens-1,[" ","\t","\n","&","*"]);
if(prev.data==">"){
const opening_token_index=find_opening_template_token(prev.index);
if(opening_token_index!=null){
prev=tokenizer.tokens[opening_token_index-1];
}
}
let prev_prev=tokenizer.get_prev_token(prev.index-1,[" ","\t","\n","&","*"]);
if(prev_prev.data==">"){
const opening_token_index=find_opening_template_token(prev_prev.index);
if(opening_token_index!=null){
prev_prev=tokenizer.tokens[opening_token_index-1];
}
}
if(prev_prev.token!="token_type"&&prev.token===undefined&&prev.data!=")"){
prev.token="token_type";
}
}
else if(char=="<"){
tokenizer.append_batch();
let is_template=false;
let depth=1;
let word="";
let append_to_batch=[[false,char]];
let index;
let first_word_in_seperator=true;
for(index=tokenizer.index+1;index<tokenizer.code.length;index++){
const c=tokenizer.code.charAt(index);
if(c=="<"){
append_to_batch.push([false,c]);
++depth;
}else if(c==">"){
if(word.length>0){
if(tokenizer.keywords.includes(word)){
append_to_batch.push(["token_keyword",word]);
}else if(first_word_in_seperator){
append_to_batch.push(["token_type",word]);
}else{
append_to_batch.push([false,word]);
}
word="";
}
append_to_batch.push([false,c]);
--depth;
if(depth==0){
is_template=true;
break;
}
}
else if(tokenizer.is_whitespace(c)||c==","||c==":"||c=="*"||c=="&"||c=="\n"){
if(word.length>0){
if(tokenizer.keywords.includes(word)){
append_to_batch.push(["token_keyword",word]);
}else if(first_word_in_seperator){
append_to_batch.push(["token_type",word]);
}else{
append_to_batch.push([false,word]);
}
word="";
if(c==" "){
first_word_in_seperator=false;
}else if(c==","){
first_word_in_seperator=true;
}
}
append_to_batch.push([false,c]);
}
else if(tokenizer.is_alphabetical(c)||tokenizer.is_numerical(c)){
word+=c;
}
else{
break;
}
}
if(is_template){
for(let i=0;i<append_to_batch.length;i++){
tokenizer.append_forward_lookup_batch(append_to_batch[i][0],append_to_batch[i][1]);
}
tokenizer.resume_on_index(index);
return true;
}
}
else if(char==":"&&tokenizer.prev_char==":"){
tokenizer.append_batch();
tokenizer.batch+=char;
tokenizer.append_batch(false);
tokenizer.next_token="token_type";
let prev=tokenizer.get_prev_token(tokenizer.added_tokens-1,[":"]);
if(prev.data==">"){
let depth=1;
for(let i=prev.index-1;i>=0;i--){
const token=tokenizer.tokens[i];
if(token.data=="<"){
--depth;
if(depth==0){
prev=tokenizer.tokens[i-1];
break;
}
}else if(token.data==">"){
++depth;
}
}
}
if(prev==null){
return false;
}
if(
(prev.token===undefined||prev.token=="token_type_def")&&!tokenizer.str_includes_word_boundary(prev.data)){
prev.token="token_type";
}
return true;
}
return false;
}
}
reset(){
this.last_line_type=null;
this.inside_func=false;
this.inside_func_closing_curly=null;
}
highlight(code=null,return_tokens=false){
this.reset();
if(code!==null){
this.tokenizer.code=code;
}
return this.tokenizer.tokenize(return_tokens);
}
}
vhighlight.cpp=new vhighlight.CPP();
vhighlight.Json=class Json{
constructor(){
this.tokenizer=new vhighlight.Tokenizer({
keywords:[
"true",
"false",
"null",
],
single_line_comment_start:"//",
multi_line_comment_start:"/*",
multi_line_comment_end:"*/",
});
}
highlight(code=null,return_tokens=false){
if(code!==null){
this.tokenizer.code=code;
}
return this.tokenizer.tokenize(return_tokens);
}
partial_highlight({
code=null,
edits_start=null,
edits_end=null,
insert_start=null,
insert_end=null,
tokens=[],
update_offsets=true,
}){
if(code!==null){
this.tokenizer.code=code;
}
return this.tokenizer.partial_tokenize({
edits_start:edits_start,
edits_end:edits_end,
insert_start:insert_start,
insert_end:insert_end,
tokens:tokens,
update_offsets:update_offsets,
})
}
}
vhighlight.json=new vhighlight.Json();
vhighlight.utils={};
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
vhighlight.CSS=class CSS{
constructor(){
this.tokenizer=new vhighlight.Tokenizer({
keywords:[
'ease',
'ease-in',
'ease-out',
'ease-in-out',
'linear',
'step-start',
'step-end',
'ease-in-quad',
'ease-in-cubic',
'ease-in-quart',
'ease-in-quint',
'ease-in-sine',
'ease-in-expo',
'ease-in-circ',
'ease-in-back',
'ease-out-quad',
'ease-out-cubic',
'ease-out-quart',
'ease-out-quint',
'ease-out-sine',
'ease-out-expo',
'ease-out-circ',
'ease-out-back',
'ease-in-out-quad',
'ease-in-out-cubic',
'ease-in-out-quart',
'ease-in-out-quint',
'ease-in-out-sine',
'ease-in-out-expo',
'ease-in-out-circ',
'ease-in-out-back',
'none',
'forwards',
'backwards',
'both',
'paused',
'running',
'linear-gradient',
'radial-gradient',
'conic-gradient',
'rgb',
'rgba',
'hsl',
'hsla',
'url',
'from',
'to',
'infinite',
'alternate',
'alternate-reverse',
],
single_line_comment_start:false,
multi_line_comment_start:"/*",
multi_line_comment_end:"*/",
});
this.reset();
const numeric_suffixes=[
'px',
'em',
'rem',
'ex',
'ch',
'vw',
'vh',
'vmin',
'vmax',
'%',
'in',
'cm',
'mm',
'pt',
'pc',
'fr',
'deg',
'grad',
'rad',
'turn',
'ms',
's',
'Hz',
'kHz',
'dpi',
'dpcm',
'dppx',
'x'
].join("|");
this.numeric_regex=new RegExp(`^-?\\d+(\\.\\d+)?(${numeric_suffixes})*$`);
this.tokenizer.callback=(char,is_escaped)=>{
const tokenizer=this.tokenizer;
if(char=="@"){
const end=tokenizer.get_first_word_boundary(tokenizer.index+1);
tokenizer.append_batch();
tokenizer.append_forward_lookup_batch("token_keyword",tokenizer.code.substr(tokenizer.index,end-tokenizer.index));
tokenizer.resume_on_index(end-1);
return true;
}
if(tokenizer.batch==""&&char=="#"){
const end=tokenizer.get_first_word_boundary(tokenizer.index+1);
tokenizer.append_batch();
tokenizer.append_forward_lookup_batch("token_string",tokenizer.code.substr(tokenizer.index,end-tokenizer.index));
tokenizer.resume_on_index(end-1);
return true;
}
else if(char=="{"){
tokenizer.append_batch();
let index=tokenizer.added_tokens-1;
while(true){
const prev=tokenizer.get_prev_token(index,[" ",",","\t",":"]);
if(prev==null||prev.data=="\n"){
break;
}
else if(
(prev.token=="token_string")||(prev.token=="token_keyword"&&prev.data.charAt(0)!="@")||
(prev.token===undefined&&
(
prev.data=="#"||
prev.data=="."||
prev.data=="*"||
prev.data=="-"||
tokenizer.is_alphabetical(prev.data.charAt(0))
)
)
){
const pprev=tokenizer.tokens[prev.index-1];
if(pprev!=null&&pprev.data==":"){
prev.token="token_keyword";
}else{
prev.token="token_type_def";
}
}
index=prev.index-1;
}
}
else if(char=="("){
tokenizer.append_batch();
const prev=tokenizer.get_prev_token(tokenizer.added_tokens-1,[" ","\t","\n"]);
if(prev!=null&&prev.token===undefined){
prev.token="token_type";
}
}
else if(tokenizer.curly_depth>0&&char==":"){
tokenizer.append_batch();
let index=tokenizer.added_tokens-1;
let edits=[];
let finished=false;
while(true){
const prev=tokenizer.get_prev_token(index,[" ","\t"]);
if(prev==null){
break;
}
else if(prev.data=="\n"||prev.data==";"){
finished=true;
break;
}
else if(prev.token===undefined){
edits.push(prev);
}
index=prev.index-1;
}
if(finished){
for(let i=0;i<edits.length;i++){
edits[i].token="token_keyword";
}
this.style_start=tokenizer.index;
for(let i=tokenizer.index+1;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c=="\n"){
this.style_start=null;
break;
}else if(c==";"){
this.style_end=i;
break;
}
}
}
}
else if(char=="%"&&this.numeric_regex.test(tokenizer.batch+char)){
tokenizer.batch+=char;
tokenizer.append_batch("token_numeric");
return true;
}
else if(tokenizer.word_boundaries.includes(char)&&this.numeric_regex.test(tokenizer.batch)){
tokenizer.append_batch("token_numeric");
}
else if(this.style_end!=null&&tokenizer.index>=this.style_end){
tokenizer.append_batch();
let index=tokenizer.added_tokens-1;
let finished=false;
const edits=[];
while(true){
const prev=tokenizer.get_prev_token(index,[" ","\t"]);
if(prev==null||prev=="\n"){
break;
}
else if(prev.data==":"){
finished=true;
break;
}
else if(prev.token===undefined&&!tokenizer.str_includes_word_boundary(prev.data)){
edits.push(prev);
}
index=prev.index-1;
}
if(finished){
for(let i=0;i<edits.length;i++){
edits[i].token="token_keyword";
}
}
this.style_end=null;
}
return false;
}
}
reset(){
this.style_start=null;
this.style_end=null;
}
highlight(code=null,return_tokens=false){
this.reset();
if(code!==null){
this.tokenizer.code=code;
}
return this.tokenizer.tokenize(return_tokens);
}
partial_highlight({
code=null,
edits_start=null,
edits_end=null,
insert_start=null,
insert_end=null,
tokens=[],
update_offsets=true,
}){
if(code!==null){
this.tokenizer.code=code;
}
this.reset();
return this.tokenizer.partial_tokenize({
edits_start:edits_start,
edits_end:edits_end,
insert_start:insert_start,
insert_end:insert_end,
tokens:tokens,
update_offsets:update_offsets,
})
}
}
vhighlight.css=new vhighlight.CSS();
vhighlight.Python=class Python{
constructor(){
this.tokenizer=new vhighlight.Tokenizer({
keywords:[
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
],
type_def_keywords:[
"def",
"class",
],
type_keywords:[],
operators:[
"==","!=","<",">","<=",">=","+","-","*","/","%","**","//","=","!","?","&","|",
"^","~","<<",">>",
],
special_string_prefixes:[
"f",
"r",
"u",
"b",
],
single_line_comment_start:"#",
multi_line_comment_start:false,
multi_line_comment_end:false,
});
this.tokenizer.callback=(char)=>{
const tokenizer=this.tokenizer;
if(char=="("){
tokenizer.append_batch();
const prev=tokenizer.get_prev_token(tokenizer.added_tokens-1,[" ","\t","\n"]);
if(prev!=null&&prev.token===undefined&&!tokenizer.str_includes_word_boundary(prev.data)){
prev.token="token_type";
}
}
else if(tokenizer.parenth_depth>0&&(char=="="||char==")"||char==",")){
tokenizer.append_batch();
let opening_index=null;
let depth=0;
for(let i=tokenizer.added_tokens-1;i>=0;i--){
const token=tokenizer.tokens[i];
if(token.token===undefined&&token.data=="("){
--depth;
if(depth<=0){
opening_index=i;
break;
}
}else if(token.token===undefined&&token.data==")"){
++depth;
}
}
if(opening_index==null){
return false;
}
let preceding=tokenizer.get_prev_token(opening_index-1,[" ","\t","\n"]);
if(
preceding==null||
(
preceding.token!="token_type_def"&&
preceding.token!="token_type"
)
){
return false;
}
const func_def=preceding.token=="token_type_def";
if(!func_def&&char==","){
return false;
}
const prev=tokenizer.get_prev_token(tokenizer.added_tokens-1,[" ","\t","\n","=",")",","]);
if(prev==null){
return false;
}
const prev_prev=tokenizer.get_prev_token(prev.index-1,[" ","\t","\n"],true);
if(
prev.token===undefined&&
prev_prev!=null&&
prev_prev.token===undefined&&
(prev_prev.data=="("||prev_prev.data==",")
){
prev.token="token_parameter";
}
}
return false;
}
}
highlight(code=null,return_tokens=false){
if(code!==null){
this.tokenizer.code=code;
}
return this.tokenizer.tokenize(return_tokens);
}
partial_highlight({
code=null,
edits_start=null,
edits_end=null,
insert_start=null,
insert_end=null,
tokens=[],
update_offsets=true,
}){
if(code!==null){
this.tokenizer.code=code;
}
return this.tokenizer.partial_tokenize({
edits_start:edits_start,
edits_end:edits_end,
insert_start:insert_start,
insert_end:insert_end,
tokens:tokens,
update_offsets:update_offsets,
})
}
}
vhighlight.python=new vhighlight.Python();
vhighlight.Markdown=class Markdown{
constructor(){
this.tokenizer=new vhighlight.Tokenizer({
multi_line_comment_start:"<!--",
multi_line_comment_end:"-->",
allow_strings:false,
allow_numerics:false,
});
this.reset();
this.tokenizer.callback=(char)=>{
const tokenizer=this.tokenizer;
let start_of_line=false;
if(this.current_line!=tokenizer.line&&!tokenizer.is_whitespace(char)){
start_of_line=true;
this.current_line=tokenizer.line;
}
if(start_of_line&&char=="#"){
tokenizer.append_batch();
const add=[];
let last_index=null;
let at_start=true;
let word="";
for(let i=tokenizer.index;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c=="\n"){
if(word.length>0){
add.push(["token_bold",word]);
}
last_index=i-1;
break;
}
else if(c==" "||c=="\t"){
if(word.length>0){
add.push(["token_bold",word]);
word="";
}
add.push([false,c]);
}
else if(at_start&&c=="#"){
add.push(["token_keyword",c]);
}
else if(tokenizer.word_boundaries.includes(c)){
at_start=false;
if(word.length>0){
add.push(["token_bold",word]);
word="";
}
add.push([false,c]);
}
else{
at_start=false;
word+=c;
}
}
if(add.length>0){
if(last_index==null){
last_index=tokenizer.code.length;
}
for(let i=0;i<add.length;i++){
tokenizer.append_forward_lookup_batch(add[i][0],add[i][1]);
}
tokenizer.resume_on_index(last_index);
return true;
}
}
else if(
(
(char=="*"&&tokenizer.next_char=="*")||
(char=="_"&&tokenizer.next_char=="_")
)&&
!tokenizer.is_whitespace(tokenizer.index+2)
){
let closing_index=null;
for(let i=tokenizer.index+2;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c==char){
closing_index=i;
break;
}
}
if(closing_index==null){return false;}
tokenizer.append_batch();
tokenizer.append_forward_lookup_batch("token_keyword",char+char);
tokenizer.append_forward_lookup_batch("token_bold",tokenizer.code.substr(tokenizer.index+2,closing_index-(tokenizer.index+2)));
tokenizer.append_forward_lookup_batch("token_keyword",char+char);
tokenizer.resume_on_index(closing_index+1);
return true;
}
else if(
(char=="*"||char=="_")&&
!tokenizer.is_whitespace(tokenizer.next_char)
){
let closing_index=null;
for(let i=tokenizer.index+1;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c==char){
closing_index=i;
break;
}
}
if(closing_index==null){return false;}
tokenizer.append_batch();
tokenizer.append_forward_lookup_batch("token_keyword",char);
tokenizer.append_forward_lookup_batch("token_italic",tokenizer.code.substr(tokenizer.index+1,closing_index-(tokenizer.index+1)));
tokenizer.append_forward_lookup_batch("token_keyword",char);
tokenizer.resume_on_index(closing_index);
return true;
}
else if(start_of_line&&char==">"){
tokenizer.append_batch();
tokenizer.batch=char;
tokenizer.append_batch("token_keyword");
return true;
}
else if(
start_of_line&&
(char=="-"||char=="*"||char=="+")&&
tokenizer.is_whitespace(tokenizer.next_char)
){
tokenizer.append_batch();
tokenizer.batch=char;
tokenizer.append_batch("token_keyword");
return true;
}
else if(start_of_line&&tokenizer.is_numerical(char)){
let batch=char;
let finished=false;
let last_index=null;
for(let i=tokenizer.index+1;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c=="\n"){
break;
}else if(c=="."){
batch+=c;
finished=true;
last_index=i;
break;
}else if(tokenizer.is_numerical(c)){
batch+=c;
}else{
break;
}
}
if(finished){
tokenizer.append_batch();
tokenizer.append_forward_lookup_batch("token_keyword",batch);
tokenizer.resume_on_index(last_index);
return true;
}
}
else if(char=="["){
tokenizer.append_batch();
const opening_bracket=tokenizer.index;
const closing_bracket=tokenizer.get_closing_bracket(opening_bracket);
if(closing_bracket==null){return false;}
let opening_parentheses=null;
for(let i=closing_bracket+1;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c==" "||c=="\t"){
continue;
}else if(c=="("){
opening_parentheses=i;
break;
}else{
break;
}
}
if(opening_parentheses==null){return false;}
const closing_parentheses=tokenizer.get_closing_parentheses(opening_parentheses);
if(closing_parentheses==null){return false;}
const prev=tokenizer.get_prev_token(tokenizer.added_tokens-1,[" ","\t"]);
const is_image=prev.data=="!";
if(is_image){
prev.token="token_keyword";
}
tokenizer.append_forward_lookup_batch("token_keyword","[");
tokenizer.append_forward_lookup_batch("token_string",tokenizer.code.substr(opening_bracket+1,(closing_bracket-1)-(opening_bracket+1)+1));
tokenizer.append_forward_lookup_batch("token_keyword","]");
tokenizer.append_forward_lookup_batch("token_keyword","(");
tokenizer.append_forward_lookup_batch("token_string",tokenizer.code.substr(opening_parentheses+1,(closing_parentheses-1)-(opening_parentheses+1)+1));
tokenizer.append_forward_lookup_batch("token_keyword",")");
tokenizer.resume_on_index(closing_parentheses);
return true;
}
else if(char=="`"&&tokenizer.next_char!="`"&&tokenizer.prev_char!="`"){
let closing_index=null;
for(let i=tokenizer.index+1;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
if(c=="`"){
closing_index=i;
break;
}
}
if(closing_index==null){return false;}
tokenizer.append_forward_lookup_batch("token_codeblock",tokenizer.code.substr(tokenizer.index,closing_index-tokenizer.index+1));
tokenizer.resume_on_index(closing_index);
return true;
}
else if(char=="`"&&tokenizer.next_char=="`"&&tokenizer.code.charAt(tokenizer.index+2)=="`"){
let closing_index=null;
let do_language=true;
let language="";
for(let i=tokenizer.index+3;i<tokenizer.code.length;i++){
const c=tokenizer.code.charAt(i);
const is_whitespace=tokenizer.is_whitespace(c);
if(c=="`"&&tokenizer.code.charAt(i+1)=='`'&&tokenizer.code.charAt(i+2)=="`"){
closing_index=i+2;
break;
}else if(do_language&&language.length>0&&(is_whitespace||c=="\n")){
do_language=false;
}else if(do_language&&language.length==0&&!is_whitespace&&!tokenizer.is_alphabetical(c)){
do_language=false;
}else if(do_language&&!is_whitespace&&c!="\n"){
language+=c;
}
}
if(closing_index==null){return false;}
const start=tokenizer.index+3+language.length;
const code=tokenizer.code.substr(start,(closing_index-3)-start+1);
let result=null;
if(language!=""){
result=vhighlight.highlight({
language:language,
code:code,
return_tokens:true,
})
}
tokenizer.append_forward_lookup_batch("token_keyword","```");
if(result==null){
tokenizer.append_forward_lookup_batch("token_codeblock",language+code);
}else{
tokenizer.append_forward_lookup_batch("token_keyword",language);
for(let i=0;i<result.tokens.length;i++){
const token=result.tokens[i];
token.line+=tokenizer.line;
tokenizer.tokens.push(token);
}
tokenizer.line+=result.line_count;
}
tokenizer.append_forward_lookup_batch("token_keyword","```");
tokenizer.resume_on_index(closing_index);
return true;
}
return false;
}
}
reset(){
this.current_line=null;}
highlight(code=null,return_tokens=false){
this.reset();
if(code!==null){
this.tokenizer.code=code;
}
return this.tokenizer.tokenize(return_tokens);
}
}
vhighlight.md=new vhighlight.Markdown();
