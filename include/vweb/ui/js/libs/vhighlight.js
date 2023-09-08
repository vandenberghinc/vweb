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
}else if(language=="bash"||language=="sh"||language=="zsh"){
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
}else if(language=="bash"||language=="sh"||language=="zsh"){
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
}else if(language=="bash"||language=="sh"||language=="zsh"){
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
vhighlight.bash={};
vhighlight.bash.tokenizer_opts={
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
}
vhighlight.bash.highlight=function(code,return_tokens=false){
const tokenizer=new Tokenizer(vhighlight.bash.tokenizer_opts);
tokenizer.code=code;
let current_line=null;
tokenizer.callback=function(char,is_escaped){
const is_whitespace=this.is_whitespace(char);
let start_of_line=false;
if(current_line!=this.line&&!is_whitespace){
start_of_line=true;
current_line=this.line;
}
if(char=="-"){
let batch=null;
if(this.operators.includes(char+this.next_char)){
batch=char+this.next_char;
}else if(this.operators.includes(char+this.next_char+this.code.charAt(this.index+2))){
batch=char+this.next_char+this.code.charAt(this.index+2);
}
if(batch!=null){
this.append_batch();
this.batch=batch;
this.append_batch("token_operator");
this.resume_on_index(this.index+batch.length-1);
return true;
}
}
else if(char=="$"){
let batch="$";
let index=this.index+1;
while(true){
c=this.code.charAt(index);
if(this.is_numerical(c)){
batch+=c;
}else{
break;
}
++index;
}
if(batch.length==1&&(this.next_char=="#"||this.next_char=="@"||this.next_char=="?")){
batch+=this.next_char
}
if(batch.length>1){
this.append_batch();
this.batch=batch;
this.append_batch("token_keyword");
this.resume_on_index(this.index+batch.length-1);
return true;
}
}
else if(char=="("){
this.append_batch();
let is_func_def=false;
for(let i=this.index+1;i<this.code.length;i++){
const c=this.code.charAt(i);
if(c=="{"){
is_func_def=true;
}
else if(c!=")"&&c!="\n"&&c!="\t"&&c!=" "){
break;
}
}
if(is_func_def){
const prev=this.get_prev_token(this.tokens.length-1,[" ","\t","\n"]);
prev.token="token_type_def";
}
}
else if(start_of_line&&this.is_alphabetical(char)){
let finished=false;
let passed_whitespace=false;
let word="";
let end_index=null;
for(let i=this.index;i<this.code.length;i++){
const c=this.code.charAt(i);
if(c==" "||c=="\t"){
passed_whitespace=true;
}else if(!passed_whitespace&&(this.is_alphabetical(c)||this.is_numerical(c))){
word+=c;
end_index=i;
}else if(passed_whitespace&&(char=="\\"||!this.operators.includes(char))){
finished=true;
break;
}else{
break;
}
}
if(finished&&!this.keywords.includes(word)){
this.append_batch();
this.batch=word;
this.append_batch("token_type");
this.resume_on_index(end_index);
return true;
}
}
else if(start_of_line&&char==":"){
let style=null;
let start_index=null;let end_index=null;
for(let i=this.index+1;i<this.code.length;i++){
const c=this.code.charAt(i);
if(c==" "||c=="\t"){
continue;
}else if(c=="<"){
if(this.code.charAt(i+1)=="<"){
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
if(start_index+close_sequence.length>this.code.length){
return false;
}
const end=start_index+close_sequence.length;
let y=0;
for(let x=start_index;x<end;x++){
if(this.code.charAt(x)!=close_sequence.charAt(y)){
return false;
}
++y;
}
return true;
}
for(let i=start_index;i<this.code.length;i++){
const c=this.code.charAt(i);
if(!found_close_sequence){
if(this.is_whitespace(c)){
continue;
}else if(
c=='"'||
c=="'"||
c=="_"||
c=="-"||
this.is_numerical(c)||
this.is_alphabetical(c)
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
const closing_char=this.code.charAt(start_index-1);
for(let i=start_index;i<this.code.length;i++){
const c=this.code.charAt(i);
if(!is_escaped&&c==closing_char){
end_index=i;
break;
}
}
}
if(end_index!=null){
this.append_batch();
this.batch=this.code.substr(this.index,end_index-this.index+1);
console.log(this.batch);
this.append_batch("token_comment");
this.resume_on_index(end_index);
return true;
}
}
return false;
}
return tokenizer.tokenize(return_tokens);
}
vhighlight.js={};
vhighlight.js.tokenizer_opts={
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
"=>",
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
};
vhighlight.js.highlight=function(code,return_tokens=false){
const tokenizer=new Tokenizer(vhighlight.js.tokenizer_opts);
tokenizer.code=code;
let opening_parenth_curly_depth=0;let func_def_parenth_depth=null;let func_def_curly_depth=null;let last_param_was_assignment=false;
tokenizer.callback=function(char){
if(char=="("){
if(this.parenth_depth==1){
opening_parenth_curly_depth=this.curly_depth;
last_param_was_assignment=false;
}
if(this.class_depth==this.curly_depth&&this.parenth_depth==1){
if(this.is_linebreak_whitespace_char(this.prev_char)||this.is_linebreak_whitespace_char()){
const prev=this.get_prev_token(this.tokens.length-1,[" ","\t","\n"]);
prev.token="token_type_def";
this.append_batch(false)
}else{
this.append_batch("token_type_def")
}
this.batch+=char;
this.append_batch(false);
return true;
}
if(this.batch=="function"){
const prev=this.get_prev_token(this.tokens.length-1,[" ","\t","\n","=",":"]);
prev.token="token_type_def";
this.append_batch("token_keyword");
this.batch+=char;
this.append_batch(false);
func_def_parenth_depth=this.parenth_depth;
func_def_curly_depth=this.curly_depth;
return true;
}
const prev=this.get_prev_token(this.tokens.length-1,[" ","\t","\n"]);
if(prev.data=="function"){
this.append_batch("token_type_def");
this.batch+=char;
this.append_batch(false);
func_def_parenth_depth=this.parenth_depth;
func_def_curly_depth=this.curly_depth;
return true;
}
const prev_prev=this.get_prev_token(prev.index-1,[" ","\t","\n"])
if(prev_prev!=null&&this.batch.length==0&&(prev.data=="="||prev.data==":")){
prev_prev.token="token_type_def";
func_def_parenth_depth=this.parenth_depth;
func_def_curly_depth=this.curly_depth;
}
else if(prev_prev!=null&&prev_prev.data=="function"){
prev.token="token_type_def"
func_def_parenth_depth=this.parenth_depth;
func_def_curly_depth=this.curly_depth;
}
else{
if(this.is_linebreak_whitespace_char(this.prev_char)||this.is_linebreak_whitespace_char()){
if(prev.token==null&&!this.str_includes_word_boundary(prev.data)){
prev.token="token_type";
}
this.append_batch(false);
}
else{
if(this.keywords.includes(this.batch)){
this.append_batch("token_keyword");
opening_parenth_curly_depth=null;}else{
this.append_batch("token_type");
}
}
}
this.batch+=char;
this.append_batch(false);
return true;
}
else if(
(this.class_depth==this.curly_depth&&
(
(this.parenth_depth==1&&((char==','&&!last_param_was_assignment)||(char=='='&&this.next_char!='>')))||
(this.parenth_depth==0&&char==')')
))||
(
func_def_curly_depth==this.curly_depth&&(
(this.parenth_depth==func_def_parenth_depth&&((char==','&&!last_param_was_assignment)||(char=='='&&this.next_char!='>')))||
(this.parenth_depth==func_def_parenth_depth-1&&char==')')
)
)||
(
opening_parenth_curly_depth==this.curly_depth&&this.parenth_depth>0&&char=='='&&
code.charAt(this.index+1)!='>'
)
){
if(char==')'){
if(func_def_parenth_depth!=null&&this.parenth_depth<func_def_parenth_depth){
func_def_parenth_depth=null;
}
if(last_param_was_assignment){
last_param_was_assignment=false;
this.append_batch();
this.batch+=char;
this.append_batch();
return true;
}
}
if(char=='='){
last_param_was_assignment=true;
}else{
last_param_was_assignment=false;
}
if(this.is_linebreak_whitespace_char(this.prev_char)){
const prev=this.get_prev_token(tokens.length-1,[" ","\t","\n"]);
prev.token="token_parameter";
this.append_batch();
}else{
this.append_batch("token_parameter");
}
this.batch+=char;
this.append_batch();
return true;
}
return false;
}
return tokenizer.tokenize(return_tokens);
}
vhighlight.cpp={};
vhighlight.cpp.tokenizer_opts={
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
};
vhighlight.cpp.highlight=function(code,return_tokens=false){
const tokenizer=new Tokenizer(vhighlight.cpp.tokenizer_opts);
tokenizer.code=code;
let last_line_type=null;
inside_func=false;
inside_func_closing_curly=null;
const find_opening_template_token=(index)=>{
let depth=1;
for(let i=index-1;i>=0;i--){
const token=tokenizer.tokens[i];
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
tokenizer.callback=function(char){
if(inside_func&&this.index>inside_func_closing_curly){
inside_func=false;
}
if(
(last_line_type!=this.line&&char!=" "&&char!="\t")||(this.prev_char=="("||(this.parenth_depth>0&&this.prev_char==","))){
last_line_type=this.line;
this.append_batch();
let is_type=false;
let hit_template=0;
let word="";
let words=0;
let append_to_batch=[];
let last_index,last_append_index;
for(let index=this.index;index<this.code.length;index++){
const c=this.code.charAt(index);
if(hit_template==2){
if(c==" "||c=="\t"||c=="*"||c=="&"||c=="\n"){
continue;
}
else if(this.is_alphabetical(c)){
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
if(this.keywords.includes(word)){append_to_batch.push(["token_keyword",word]);
}else{
if(c!=":"||this.code.charAt(index+1)!=":"){++words;
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
append_to_batch.push([false,c]);
}
}
else if(this.is_alphabetical(c)||(word.length>0&&this.is_numerical(c))){
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
const append=append_to_batch[i];
const type=append[0];
this.batch=append[1];
this.append_batch(append[0]);
}
this.resume_on_index(last_index-1);
return true;
}
}
else if(char=="("){
this.append_batch();
const closing=this.get_closing_parentheses(this.index);
const non_whitespace_after=this.get_first_non_whitespace(closing+1);
if(closing!=null&&non_whitespace_after!=null){
let prev=this.get_prev_token(this.tokens.length-1,[" ","\t","\n","*","&"]);
const prev_prev_is_colon=this.get_prev_token(prev.index-1).data==":";
if(
(prev.token==null&&prev.data!="]")||(prev.token=="token_type"&&prev_prev_is_colon)){
const lookup=this.code.charAt(non_whitespace_after);
if(
(lookup==";"&&!inside_func)||lookup=="{"||lookup=="c"||lookup=="v"||lookup=="n"||lookup=="o"||lookup=="f"||lookup=="r"	){
prev.token="token_type_def";
let token=prev;
while(true){
token=this.get_prev_token(token.index-1,[":"]);
if(this.str_includes_word_boundary(token.data)){
break;
}
token.token="token_type_def";
}
let opening=null;
for(let i=closing;i<this.code.length;i++){
const c=this.code.charAt(i);
if(c==";"){
break;
}
else if(c=="{"){
opening=i;
break;
}
}
if(opening!=null){
inside_func=true;
inside_func_closing_curly=this.get_closing_curly(opening);
}
}
else{
if(prev.data==">"){
const opening_token_index=find_opening_template_token(prev.index);
if(opening_token_index!=null){
prev=this.get_prev_token(opening_token_index-1,[" ","\t","\n"]);
}
}
let prev_prev=this.get_prev_token(prev.index-1,[" ","\t","\n","*","&"]);
if(prev_prev.data==">"){
const opening_token_index=find_opening_template_token(prev_prev.index);
if(opening_token_index!=null){
prev_prev=this.get_prev_token(opening_token_index-1,[" ","\t","\n"]);
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
this.append_batch();
let prev=this.get_prev_token(this.tokens.length-1,[" ","\t","\n","&","*"]);
if(prev.data==">"){
const opening_token_index=find_opening_template_token(prev.index);
if(opening_token_index!=null){
prev=this.tokens[opening_token_index-1];
}
}
let prev_prev=this.get_prev_token(prev.index-1,[" ","\t","\n","&","*"]);
if(prev_prev.data==">"){
const opening_token_index=find_opening_template_token(prev_prev.index);
if(opening_token_index!=null){
prev_prev=this.tokens[opening_token_index-1];
}
}
if(prev_prev.token!="token_type"&&prev.token==null&&prev.data!=")"){
prev.token="token_type";
}
}
else if(char=="<"){
this.append_batch();
let is_template=false;
let depth=1;
let word="";
let append_to_batch=[[false,char]];
let index;
let first_word_in_seperator=true;
for(index=this.index+1;index<this.code.length;index++){
const c=this.code.charAt(index);
if(c=="<"){
append_to_batch.push([false,c]);
++depth;
}else if(c==">"){
if(word.length>0){
if(this.keywords.includes(word)){
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
else if(this.is_whitespace(c)||c==","||c==":"||c=="*"||c=="&"||c=="\n"){
if(word.length>0){
if(this.keywords.includes(word)){
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
else if(this.is_alphabetical(c)||this.is_numerical(c)){
word+=c;
}
else{
if(this.line==15){
console.log("STOP BY CHAR ",{x:c});
}
break;
}
}
if(is_template){
for(let i=0;i<append_to_batch.length;i++){
const append=append_to_batch[i];
const type=append[0];
this.batch=append[1];
this.append_batch(append[0]);
}
this.resume_on_index(index);
return true;
}
}
else if(char==":"&&this.prev_char==":"){
this.append_batch();
this.batch+=char;
this.append_batch(false);
this.next_token="token_type";
let prev=this.get_prev_token(this.tokens.length-1,[":"]);
if(prev.data==">"){
let depth=1;
for(let i=prev.index-1;i>=0;i--){
const token=this.tokens[i];
if(token.data=="<"){
--depth;
if(depth==0){
prev=this.tokens[i-1];
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
(prev.token==null||prev.token=="token_type_def")&&!this.str_includes_word_boundary(prev.data)){
prev.token="token_type";
}
return true;
}
return false;
}
return tokenizer.tokenize(return_tokens);
}
vhighlight.json={};
vhighlight.json.tokenizer_opts={
keywords:[
"true",
"false",
"null",
],
single_line_comment_start:"//",
multi_line_comment_start:"/*",
multi_line_comment_end:"*/",
}
vhighlight.json.highlight=function(code,return_tokens=false){
const tokenizer=new Tokenizer(vhighlight.json.tokenizer_opts);
tokenizer.code=code;
return tokenizer.tokenize(return_tokens);
}
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
class Tokenizer{
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
}){
this.code=null;this.keywords=keywords;this.type_def_keywords=type_def_keywords;this.type_keywords=type_keywords;this.operators=operators;this.special_string_prefixes=special_string_prefixes;this.single_line_comment_start=single_line_comment_start;this.multi_line_comment_start=multi_line_comment_start;this.multi_line_comment_end=multi_line_comment_end;this.allow_strings=allow_strings;this.allow_numerics=allow_numerics;this.allow_preprocessors=allow_preprocessors;this.allow_slash_regexes=allow_slash_regexes;
this.tokens=[];this.index=null;this.prev_char=null;this.next_char=null;this.batch ="";this.line=0;this.is_comment=false;this.is_str=false;this.is_regex=false;this.is_preprocessor=false;this.parenth_depth=0;this.bracket_depth=0;this.curly_depth=0;this.next_token=null;
this.class_depth=null;
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
this.callback=function(){return false;}
}
get_prev_token(index,exclude=[" ","\t","\n"],exclude_comments=false){
for(let i=index;i>=0;i--){
const item=this.tokens[i];
if(exclude_comments&&item.token=="token_comment"){
continue;
}
if(!exclude.includes(item.data)){
return item;
}
}
return null;
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
const info_obj={index:null};
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
get_first_non_whitespace(index){
if(index==null){
return null;
}
let end;
for(end=index;end<this.code.length;end++){
const c=this.code.charAt(end);
if(c!=" "&&c!="\t"){
return end;
}
}
return null;
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
is_escaped(index){
if(this.code.charAt(index-1)=="\\"){
if(this.code.charAt(index-2)=="\\"){
return this.is_escaped(index-2);
}
return true;
}
return false;
}
resume_on_index(index){
const info_obj={index:null,prev_char:null,next_char:null};
this.iterate_code(info_obj,this.index,index+1,(char,is_str,is_comment,is_multi_line_comment,is_regex,is_escaped)=>{
if(!is_escaped&&char=="\n"){
++this.line;
}
})
this.index=index;
}
append_token(token=null){
this.tokens.push({token:token,data:this.batch,index:this.tokens.length,line:this.line});
}
append_batch(token=null){
if(this.batch.length==0){
return;
}
if(token==false){
this.append_token();
}
else if(token!=null){
this.append_token(token);
}
else if(this.next_token!=null){
if(this.is_linebreak_whitespace_char()){
this.append_token();
}
else if(this.word_boundaries.includes(this.batch)){
this.append_token();
this.next_token=null;
}
else if(this.keywords.includes(this.batch)){
this.append_token("token_keyword");
this.next_token=null;
}
else{
this.append_token(this.next_token);
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
this.append_token("token_operator");
}
else if(this.allow_numerics&&/^-?\d+(\.\d+)?$/.test(this.batch)){
this.append_token("token_numeric");
}
else{
this.append_token(null);
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
for(info_obj.index=start;info_obj.index<end;info_obj.index++){
const char=this.code.charAt(info_obj.index);
info_obj.prev_char=this.code.charAt(info_obj.index-1);
info_obj.next_char=this.code.charAt(info_obj.index+1);
if(info_obj.prev_char!=" "&&info_obj.prev_char!="\t"){
prev_non_whitespace_char=info_obj.prev_char;
}
const is_escaped=this.is_escaped(info_obj.index);
if(this.allow_preprocessors&&!is_preprocessor&&prev_non_whitespace_char=="\n"&&char=="#"){
is_preprocessor=true;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}else if(is_preprocessor&&char=="\n"&&prev_non_whitespace_char!="\\"){
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
if(comment_start.length==1&&char==comment_start){
is_comment=true;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}else if(comment_start.length==2&&char+info_obj.next_char==comment_start){
is_comment=true;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
const mcomment_start=this.multi_line_comment_start;
if(mcomment_start==false){
}else if(mcomment_start.length==2&&char+info_obj.next_char==mcomment_start){
is_multi_line_comment=true;
const res=callback(char,false,is_comment,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
if(res!=null){return res;}
continue;
}
}
else if(
is_comment&&
!is_escaped&&
char=="\n"
){
is_comment=false;
const res=callback(char,false,true,is_multi_line_comment,is_regex,is_escaped,is_preprocessor);
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
const auto_append_batch_switch=()=>{
if(this.is_comment){
this.append_batch("token_comment");
}else if(this.is_str){
this.append_batch("token_string");
}else if(this.is_regex){
this.append_batch("token_string");
}else if(this.is_preprocessor){
this.append_batch("token_preprocessor");
}else{
this.append_batch();
}
}
this.iterate_code(this,null,null,(char,local_is_str,local_is_comment,is_multi_line_comment,local_is_regex,is_escaped,is_preprocessor)=>{
if(!is_escaped&&char=="\n"){
auto_append_batch_switch();
if(!local_is_str){
this.is_str=false;
}
if(!local_is_comment&&!is_multi_line_comment){
this.is_comment=false;
}
if(!local_is_regex){
this.is_regex=false;
}
if(!is_preprocessor){
this.is_preprocessor=false;
this.is_str=false;}
++this.line;
this.batch+=char;
this.append_batch("token_line");
}
else if(local_is_comment||is_multi_line_comment){
if(!this.is_comment){
auto_append_batch_switch();
this.is_comment=true;
}
this.batch+=char;
}
else if(local_is_str){
if(!this.is_str){
if(this.is_comment){
this.append_batch("token_comment");
}else if(this.is_str){
this.append_batch("token_string");
}else if(this.is_regex){
this.append_batch("token_string");
}else if(this.is_preprocessor){
this.append_batch("token_preprocessor");
}else{
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
if(this.is_comment){
this.append_batch("token_comment");
this.is_comment=false;
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
this.append_batch();}
else{
this.batch+=char;
}
}
}
return null;
});
this.append_batch();
if(return_tokens){
return{
tokens:this.tokens,
line_count:this.line,
}
}
else{
return this.build_tokens();
}
}
build_tokens(reformat=true){
let html="";
for(let i=0;i<this.tokens.length;i++){
const token=this.tokens[i];
if(token.token==null){
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
}
return html;
}
}
vhighlight.python={};
vhighlight.python.tokenizer_opts={
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
}
vhighlight.python.highlight=function(code,return_tokens=false){
const tokenizer=new Tokenizer(vhighlight.python.tokenizer_opts);
tokenizer.code=code;
tokenizer.callback=function(char){
if(char=="("){
this.append_batch();
const prev=this.get_prev_token(this.tokens.length-1,[" ","\t","\n"]);
if(prev!=null&&prev.token==null&&!this.str_includes_word_boundary(prev.data)){
prev.token="token_type";
}
}
else if(this.parenth_depth>0&&(char=="="||char==")"||char==",")){
this.append_batch();
let opening_index=null;
let depth=0;
for(let i=this.tokens.length-1;i>=0;i--){
const token=this.tokens[i];
if(token.token==null&&token.data=="("){
--depth;
if(depth<=0){
opening_index=i;
break;
}
}else if(token.token==null&&token.data==")"){
++depth;
}
}
if(opening_index==null){
return false;
}
let preceding=this.get_prev_token(opening_index-1,[" ","\t","\n"]);
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
const prev=this.get_prev_token(this.tokens.length-1,[" ","\t","\n","=",")",","]);
if(prev==null){
return false;
}
const prev_prev=this.get_prev_token(prev.index-1,[" ","\t","\n"],true);
if(
prev.token==null&&
prev_prev!=null&&
prev_prev.token==null&&
(prev_prev.data=="("||prev_prev.data==",")
){
prev.token="token_parameter";
}
}
return false;
}
return tokenizer.tokenize(return_tokens);
}
vhighlight.md={};
vhighlight.md.tokenizer_opts={
multi_line_comment_start:"<!--",
multi_line_comment_end:"-->",
allow_strings:false,
allow_numerics:false,
}
vhighlight.md.highlight=function(code,return_tokens=false){
const tokenizer=new Tokenizer(vhighlight.md.tokenizer_opts);
tokenizer.code=code;
let current_line=null;
tokenizer.callback=function(char){
let start_of_line=false;
if(current_line!=this.line&&!this.is_whitespace(char)){
start_of_line=true;
current_line=this.line;
}
if(start_of_line&&char=="#"){
this.append_batch();
const add=[];
let last_index=null;
let at_start=true;
let word="";
for(let i=this.index;i<this.code.length;i++){
const c=this.code.charAt(i);
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
else if(this.word_boundaries.includes(c)){
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
last_index=this.code.length;
}
for(let i=0;i<add.length;i++){
this.batch=add[i][1];
this.append_batch(add[i][0]);
}
this.resume_on_index(last_index);
return true;
}
}
else if(
(
(char=="*"&&this.next_char=="*")||
(char=="_"&&this.next_char=="_")
)&&
!this.is_whitespace(this.index+2)
){
let closing_index=null;
for(let i=this.index+2;i<this.code.length;i++){
const c=this.code.charAt(i);
if(c==char){
closing_index=i;
break;
}
}
if(closing_index==null){return false;}
this.append_batch();
this.batch=char+char;
this.append_batch("token_keyword");
this.batch=this.code.substr(this.index+2,closing_index-(this.index+2));
this.append_batch("token_bold");
this.batch=char+char;
this.append_batch("token_keyword");
this.resume_on_index(closing_index+1);
return true;
}
else if(
(char=="*"||char=="_")&&
!this.is_whitespace(this.next_char)
){
let closing_index=null;
for(let i=this.index+1;i<this.code.length;i++){
const c=this.code.charAt(i);
if(c==char){
closing_index=i;
break;
}
}
if(closing_index==null){return false;}
this.append_batch();
this.batch=char;
this.append_batch("token_keyword");
this.batch=this.code.substr(this.index+1,closing_index-(this.index+1));
this.append_batch("token_italic");
this.batch=char;
this.append_batch("token_keyword");
this.resume_on_index(closing_index);
return true;
}
else if(start_of_line&&char==">"){
this.append_batch();
this.batch=char;
this.append_batch("token_keyword");
return true;
}
else if(
start_of_line&&
(char=="-"||char=="*"||char=="+")&&
this.is_whitespace(this.next_char)
){
this.append_batch();
this.batch=char;
this.append_batch("token_keyword");
return true;
}
else if(start_of_line&&this.is_numerical(char)){
let batch=char;
let finished=false;
let last_index=null;
for(let i=this.index+1;i<this.code.length;i++){
const c=this.code.charAt(i);
if(c=="\n"){
break;
}else if(c=="."){
batch+=c;
finished=true;
last_index=i;
break;
}else if(this.is_numerical(c)){
batch+=c;
}else{
break;
}
}
if(finished){
this.append_batch();
this.batch=batch;
this.append_batch("token_keyword");
this.resume_on_index(last_index);
return true;
}
}
else if(char=="["){
this.append_batch();
const opening_bracket=this.index;
const closing_bracket=this.get_closing_bracket(opening_bracket);
if(closing_bracket==null){return false;}
let opening_parentheses=null;
for(let i=closing_bracket+1;i<this.code.length;i++){
const c=this.code.charAt(i);
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
const closing_parentheses=this.get_closing_parentheses(opening_parentheses);
if(closing_parentheses==null){return false;}
const prev=this.get_prev_token(this.tokens.length-1,[" ","\t"]);
const is_image=prev.data=="!";
if(is_image){
prev.token="token_keyword";
}
this.batch="[";
this.append_batch("token_keyword");
this.batch=this.code.substr(opening_bracket+1,(closing_bracket-1)-(opening_bracket+1)+1);
this.append_batch("token_string");
this.batch="]";
this.append_batch("token_keyword");
this.batch="(";
this.append_batch("token_keyword");
this.batch=this.code.substr(opening_parentheses+1,(closing_parentheses-1)-(opening_parentheses+1)+1);
this.append_batch("token_string");
this.batch=")";
this.append_batch("token_keyword");
this.resume_on_index(closing_parentheses);
return true;
}
else if(char=="`"&&this.next_char!="`"&&this.prev_char!="`"){
let closing_index=null;
for(let i=this.index+1;i<this.code.length;i++){
const c=this.code.charAt(i);
if(c=="`"){
closing_index=i;
break;
}
}
if(closing_index==null){return false;}
this.batch=this.code.substr(this.index,closing_index-this.index+1);
this.append_batch("token_codeblock");
this.resume_on_index(closing_index);
return true;
}
else if(char=="`"&&this.next_char=="`"&&this.code.charAt(this.index+2)=="`"){
let closing_index=null;
let do_language=true;
let language="";
for(let i=this.index+3;i<this.code.length;i++){
const c=this.code.charAt(i);
const is_whitespace=this.is_whitespace(c);
if(c=="`"&&this.code.charAt(i+1)=='`'&&this.code.charAt(i+2)=="`"){
closing_index=i+2;
break;
}else if(do_language&&language.length>0&&(is_whitespace||c=="\n")){
do_language=false;
}else if(do_language&&language.length==0&&!is_whitespace&&!this.is_alphabetical(c)){
do_language=false;
}else if(do_language&&!is_whitespace&&c!="\n"){
language+=c;
}
}
if(closing_index==null){return false;}
const start=this.index+3+language.length;
const code=this.code.substr(start,(closing_index-3)-start+1);
let result=null;
if(language!=""){
result=vhighlight.highlight({
language:language,
code:code,
return_tokens:true,
})
}
this.batch="```";
this.append_batch("token_keyword");
if(result==null){
this.batch=language+code;
this.append_batch("token_codeblock");
}else{
this.batch=language;
this.append_batch("token_keyword");
this.line+=result.line_count;
for(let i=0;i<result.tokens.length;i++){
this.tokens.push(result.tokens[i]);
}
}
this.batch="```";
this.append_batch("token_keyword");
this.resume_on_index(closing_index);
return true;
}
return false;
}
return tokenizer.tokenize(return_tokens);
}
