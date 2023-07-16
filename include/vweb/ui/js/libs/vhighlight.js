/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
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
if(head !=null){
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
if(body !=null){
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
if(pstart==0 &&(code[index]==" " || code[index]=="\t")&& code[index+1] !="(" && code[index+1] !=" "){
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
if(pstart !=0 && depth==0){
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
if(bstart !=0 && depth==0){
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
if(bend !=0){
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
else if(string_char !=null && code[index]==string_char){
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
if(result !=null){
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
