/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
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
let res=null;
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
let tokens=[];let batch ="";let line=0;let newline_index=0;let last_folded_line=null;let is_comment=false;let is_str=false;let is_regex=false;let curly_depth=0;let parenth_depth=0;let opening_parenth_curly_depth=0;let class_depth=null;let func_def_parenth_depth=null;let func_def_curly_depth=null;let next_token=null;let last_param_was_assignment=false;
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
