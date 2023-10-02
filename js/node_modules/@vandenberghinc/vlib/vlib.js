const libfs=require('fs');
const libfsextra=require('fs-extra');
const libos=require('os');
const libpath=require('path');
const libproc=require("child_process");
const vlib={};
String.prototype.first=function(){
return this[0];
};
String.prototype.last=function(){
return this[this.length-1];
};
String.prototype.first_non_whitespace=function(line_break=false){
for (let i=0;i<this.length;i++){
const char=this.charAt(i);
if (char!=" "&&char!="\t"&&(line_break==false||char!="\n")){
return char;
}
}
return null;
};
String.prototype.last_non_whitespace=function(line_break=false){
for (let i=this.length-1;i>=0;i--){
const char=this.charAt(i);
if (char!=" "&&char!="\t"&&(line_break==false||char!="\n")){
return char;
}
}
return null;
};
String.prototype.first_not_of=function(exclude=[],start_index=0){
for (let i=start_index;i<this.length;i++){
if (!exclude.includes(this.charAt(i))){
return i;
}
}
return null;
};
String.prototype.first_index_not_of=function(exclude=[],start_index=0){
for (let i=start_index;i<this.length;i++){
if (!exclude.includes(this.charAt(i))){
return this.charAt(i);
}
}
return null;
};
String.prototype.last_not_of=function(exclude=[],start_index=null){
if (start_index===null){
start_index=this.length-1;
}
for (let i=start_index;i>=0;i--){
if (!exclude.includes(this.charAt(i))){
return i;
}
}
return null;
};
String.prototype.last_index_not_of=function(exclude=[],start_index=null){
if (start_index===null){
start_index=this.length-1;
}
for (let i=start_index;i>=0;i--){
if (!exclude.includes(this.charAt(i))){
return this.charAt(i);
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
String.prototype.eq_first=function(substr,start_index=0){
if (start_index+substr.length>this.length){
return false;
}
const end=start_index+substr.length;
let y=0;
for (let x=start_index;x<end;x++){
if (this.charAt(x)!=substr.charAt(y)){
return false;
}
++y;
}
return true;
}
String.prototype.eq_last=function(substr){
if (substr.length>this.length){
return false;
}
let y=0;
for (let x=this.length-substr.length;x<this.length;x++){
if (this.charAt(x)!=substr.charAt(y)){
return false;
}
++y;
}
return true;
}
String.prototype.capitalize_word=function(){
if ("abcdefghijklmopqrstuvwxyz".includes(this.charAt(0))){
return this.charAt(0).toUpperCase()+this.substr(1);
}
return this;
}
String.prototype.reverse=function(){
let reversed="";
for (let i=this.length-1;i>=0;i--){
reversed+=this.charAt(i);
}
return reversed;
}
String.prototype.is_integer_string=function(){
const chars='0123456789';
for (let i=0;i<this.length;i++){
if (chars.indexOf(this.charAt(i))===-1){
return false;
}
}
return true;
}
String.prototype.is_floating_string=function(){
const chars='0123456789';
let decimal=false;
for (let i=0;i<this.length;i++){
const char=this.charAt(i);
if (char==='.'){
if (decimal){ return false;}
decimal=true;
} else if (chars.indexOf(char)===-1){
return false;
}
}
return decimal;
}
String.prototype.is_numeric_string=function(info=false){
const chars='0123456789';
let decimal=false;
for (let i=0;i<this.length;i++){
const char=this.charAt(i);
if (char==='.'){
if (decimal){ return false;}
decimal=true;
} else if (chars.indexOf(char)===-1){
if (info){
return {integer:false,floating:false};
}
return false;
}
}
if (info){
return {integer:decimal===false,floating:decimal===true};
}
return true;
}
String.prototype.unquote=function(){
if ((this.startsWith('"')&&this.endsWith('"'))||(this.startsWith("'")&&this.endsWith("'"))){
return this.slice(1,-1);
}
return this;
}
String.prototype.quote=function(){
if ((this.startsWith('"')&&this.endsWith('"'))||(this.startsWith("'")&&this.endsWith("'"))){
return this;
}
return `"${this}"`;
}
Array.prototype.first=function(){
return this[0];
};
Array.prototype.last=function(){
return this[this.length-1];
};
Array.prototype.iterate=function(start,end,handler){
if (typeof start==="function"){
handler=start;
start=null;
}
if (start==null){
start=0;
}
if (end==null){
end=this.length;
}
for (let i=start;i<end;i++){
const res=handler(this[i]);
if (res!=null&&!(res instanceof Promise)){
return res;
}
}
return null;
};
Array.prototype.iterate_reversed=function(start,end,handler){
if (handler==null&&start!=null){
handler=start;
start=null;
}
if (start==null){
start=0;
}
if (end==null){
end=this.length;
}
for (let i=end-1;i>=start;i--){
const res=handler(this[i]);
if (res!=null&&!(res instanceof Promise)){
return res;
}
}
return null;
};
Array.prototype.drop=function(item){
const dropped=new this.constructor();
for (let i=0;i<this.length;i++){
if (this[i]!=item){
dropped.push(this[i])
}
}
return dropped;
};
Array.prototype.drop_index=function(index){
const dropped=new this.constructor();
for (let i=0;i<this.length;i++){
if (i!=index){
dropped.push(this[i])
}
}
return dropped;
};
Array.prototype.drop_duplicates=function(){
return this.reduce((accumulator,val)=>{
if (!accumulator.includes(val)){
accumulator.push(val);
}
return accumulator;
},[]);
}
Array.prototype.limit_from_end=function(limit){
let limited=[];
if (this.length>limit){
for (let i=this.length-limit;i<this.length;i++){
limited.push(this[i]);
}
} else {
for (let i=0;i<this.length;i++){
limited.push(this[i]);
}
}
return limited;
}
Array.prototype.remove=function(item){
let removed=[];
this.iterate((i)=>{
if (i!=item){
removed.push(i);
}
})
return removed;
};
vlib.utils={};
vlib.utils.edit_obj_keys=(obj={},rename=[["old","new"]],remove=[])=>{
remove.iterate((key)=>{
delete obj[key];
})
rename.iterate((key)=>{
obj[key[1]]=obj[key[0]];
delete obj[key[0]];
})
return obj;
}
vlib.colors={
black:"\u001b[30m",
red:"\u001b[31m",
green:"\u001b[32m",
yellow:"\u001b[33m",
blue:"\u001b[34m",
magenta:"\u001b[35m",
cyan:"\u001b[36m",
gray:"\u001b[37m",
bold:"\u001b[1m",
italic:"\u001b[3m",
end:"\u001b[0m",
enable:function(){
this.black="\u001b[30m";
this.red="\u001b[31m";
this.green="\u001b[32m";
this.yellow="\u001b[33m";
this.blue="\u001b[34m";
this.magenta="\u001b[35m";
this.cyan="\u001b[36m";
this.gray="\u001b[37m";
this.bold="\u001b[1m";
this.italic="\u001b[3m";
this.end="\u001b[0m";
},
disable:function(){
this.black="";
this.red="";
this.green="";
this.yellow="";
this.blue="";
this.magenta="";
this.cyan="";
this.gray="";
this.bold="";
this.italic="";
this.end="";
},
}
vlib.print=function(...args){
console.log(args.join(""));
}
vlib.printe=function(...args){
console.error(args.join(""));
}
vlib.print_marker=function(...args){
vlib.print(vlib.colors.blue,">>> ",vlib.colors.end,...args);
}
vlib.print_warning=function(...args){
vlib.print(vlib.colors.yellow,">>> ",vlib.colors.end,...args);
}
vlib.print_error=function(...args){
vlib.printe(vlib.colors.red,">>> ",vlib.colors.end,...args);
}
vlib.Path=class Path{
constructor(path,clean=true){
if (path==null){
throw Error(`Invalid path "${path}".`);
}
else if (path instanceof vlib.Path){
this._path=path._path;
} else {
if (clean){
this._path="";
const max_i=path.length-1;
for (let i=0;i<path.length;i++){
const c=path.charAt(i);
if (c==="/"&&(this._path.charAt(this._path.length-1)==="/"||i==max_i)){
continue;
}
else if (c==="."&&path.charAt(i-1)==="/"&&path.charAt(i+1)==="/"){
continue;
} else {
this._path+=c;
}
}
} else {
this._path=path;
}
}
}
trim(){
const start=0,end=this._path.length;
for (let i=0;i<this._path.length;i++){
const c=this._path.charAt(i);
if (c==" "||c=="\t"){
++start;
} else {
break;
}
}
for (let i=end-1;i>=0;i--){
const c=this._path.charAt(i);
if (c==" "||c=="\t"){
--end;
} else {
break;
}
}
if (start!=0||end!=this._path.length){
this._path=this._path.susbtr(start,end-start);
}
if (this._path.length===0){
throw Error(`Invalid path "${this._path}".`);
}
}
toString(){
return this._path;
}
str(){
return this._path;
}
static home(){
return new Path(libos.homedir());
}
get length(){
return this._path.length;
}
get len(){
return this._path.length;
}
get stat(){
if (this._stat!==undefined){
return this._stat;
}
this._stat=vlib.utils.edit_obj_keys(
libfs.statSync(this._path),
[
["atimeMs","atime"],
["mtimeMs","mtime"],
["ctimeMs","ctime"],
["birthtimeMs","birthtime"],
],
[
"atime",
"mtime",
"ctime",
"birthtime",
]
);
return this._stat;
}
get dev(){
return this.stat.dev;
}
get ino(){
return this.stat.ino;
}
get mode(){
return this.stat.mode;
}
get nlink(){
return this.stat.nlink;
}
get uid(){
return this.stat.uid;
}
get gid(){
return this.stat.gid;
}
get rdev(){
return this.stat.rdev;
}
get size(){
return this.stat.size;
}
get blksize(){
return this.stat.blksize;
}
get blocks(){
return this.stat.blocks;
}
get atime(){
return this.stat.atime;
}
get mtime(){
return this.stat.mtime;
}
get ctime(){
return this.stat.ctime;
}
get birthtime(){
return this.stat.birthtime;
}
reset(){
this._stat=undefined;
this._name=undefined;
this._extension=undefined;
this._base=undefined;
this._abs=undefined;
return this;
}
is_dir(){
return this.stat.isDirectory();
}
exists(){
return libfs.existsSync(this._path);
}
name(){
if (this._name!==undefined){ return this._name;}
this._name="";
for (let i=this._path.length-1;i>=0;i--){
const c=this._path.charAt(i);
if (c==="/"){
break;
}
this._name+=c;
}
this._name=this._name.reverse();
return this._name;
}
extension(){
if (this._extension!==undefined){ return this._extension;}
if (this._name===undefined){ this.name();}
this._extension="";
for (let i=this._name.length-1;i>=0;i--){
const c=this._name.charAt(i);
this._extension+=c;
if (c==="."){
this._extension=this._extension.reverse();
return this._extension;
}
}
this._extension="";
}
base(back=1){
if (back===1&&this._base!==undefined){ return this._base;}
let count=0,end=0;
for (end=this._path.length-1;end>=0;end--){
const c=this._path.charAt(end);
if (c==="/"){
++count;
if (back===count){
break;
}
}
}
if (end===0){
return null;
}
if (back===1){
this._base=new Path(this._path.substr(0,end));
return this._base;
} else {
return new Path(this._path.substr(0,end));
}
}
abs(){
if (this._abs!==undefined){ return this._abs;}
this._abs=new Path(libpath.resolve(this._path));
return this._abs;
}
join(subpath,clean=true){
return new Path(`${this._path}/${subpath}`,clean);
}
async cp(destination){
return new Promise(async (resolve,reject)=>{
if (libfs.existsSync(destination)){
return reject("Destination path already exists.");
}
try {
const data=await this.load();
const dest=new Path(destination)
await dest.save(data);
} catch (err){
return reject(err);
}
resolve();
})
}
async mv(destination){
return new Promise((resolve,reject)=>{
if (libfs.existsSync(destination)){
return reject("Destination path already exists.");
}
libfsextra.move(this._path,destination,(err)=>{
if (err){
reject(err);
} else {
this._stat=undefined;
resolve();
}
});
})
}
async del(){
return new Promise((resolve,reject)=>{
if (this.exists()){
if (this.is_dir()){
libfs.rmdir(this._path,(err)=>{
if (err){
reject(err);
} else {
this._stat=undefined;
resolve();
}
});
} else {
libfs.unlink(this._path,(err)=>{
if (err){
reject(err);
} else {
this._stat=undefined;
resolve();
}
});
}
}
})
}
del_sync(){
if (this.exists()){
if (this.is_dir()){
libfs.rmdirSync(this._path);
} else {
libfs.unlinkSync(this._path);
}
}
return this;
}
async trash(){
return new Promise(async (resolve,reject)=>{
const name=this.name();
let trash;
switch (libos.platform()){
case 'darwin':
trash=libpath.join(libos.homedir(),'.Trash');
break;
case 'linux':
const xdgDataHome=process.env.XDG_DATA_HOME||libpath.join(libos.homedir(),'.local','share');
trash=libpath.join(xdgDataHome,'Trash');
break;
default:
return reject("Unsupported platform.");
}
if (trash==null){
return reject("Unsupported platform.");
}
let destination;
try {
destination=`${trash}/${name}`;
let counts=0;
while (libfs.existsSync(destination)){
++counts;
destination=`${trash}/${name}-${counts}`
}
await this.mv(destination);
} catch (err){
return reject(err);
}
resolve();
})
}
async mkdir(){
return new Promise((resolve,reject)=>{
if (this.exists()){
return resolve();
}
libfs.mkdir(this._path,{recursive:true },(err)=>{
if (err){
reject(err);
} else {
this._stat=undefined;
resolve();
}
});
});
}
mkdir_sync(){
if (this.exists()){
return ;
}
libfs.mkdirSync(this._path,{recursive:true })
return this;
}
async touch(){
return this.save("");
}
async load(encoding=null){
return new Promise((resolve,reject)=>{
libfs.readFile(this._path,encoding,(err,data)=>{
if (err){
reject(err);
} else {
resolve(data.toString());
}
});
});
}
load_sync(encoding=null){
const data=libfs.readFileSync(this._path,encoding);
return data.toString();
}
async save(data){
return new Promise((resolve,reject)=>{
libfs.writeFile(this._path,data,(err)=>{
if (err){
reject(err);
} else {
this._stat=undefined;
resolve();
}
});
});
}
save_sync(data){
libfs.writeFileSync(this._path,data);
return this;
}
async paths(data,recursive=false){
return new Promise(async (resolve,reject)=>{
if (!this.is_dir()){
return reject(`Path "${this._path}" is not a directory.`);
}
if (recursive===false){
libfs.readdir(this._path,(err,files)=>{
if (err){
reject(err);
} else {
resolve(files.map((name)=>(this.join(name))));
}
});
} else {
const files=[];
const traverse=(path)=>{
return new Promise((resolve,reject)=>{
libfs.readdir(path, async (err,files)=>{
if (err){
reject(err);
} else {
let err=null;
for (let i=0;i<files.length;i++){
const child=path.join(files[i]);
files.push(child);
if (child.is_dir()){
try {
await traverse(child);
} catch (e){
err=e;
return false;
}
}
}
if (err===null){
resolve();
} else {
reject(err);
}
}
});
})
}
try {
await traverse(this);
} catch (err){
return reject(err);
}
resolve(files);
}
});
}
paths_sync(data,recursive=false){
if (!this.is_dir()){
throw Error(`Path "${this._path}" is not a directory.`);
}
if (recursive===false){
return libfs.readdirSync(this._path).map((name)=>(this.join(name)));
} else {
const files=[];
const traverse=(path)=>{
libfs.readdirSync(path).iterate((name)=>{
const child=path.join(name);
files.push(child);
if (child.is_dir()){
traverse(child);
}
});
}
traverse(this);
return files;
}
}
}
vlib.Proc=class Proc{
constructor({debug=false}={}){
this.debug=debug;
this.proc=null;
this.promise=null;
this.err=null;
this.out="";
this.exit_status=null;
}
on_output(data){
this.out+=data;
}
start({
command="",
args=[],
working_directory=null,
interactive=true,
detached=false,
env=null,
}){
this.promise=new Promise((resolve)=>{
if (this.debug){
console.log(`Start: ${command} ${args.join(" ")}`);
}
const opts={
cwd:working_directory,
stdio:[interactive?"pipe":"ignore","pipe","pipe"],
shell:interactive,
detached:detached,
}
if (env!=null){
opts.env=env;
}
this.proc=libproc.spawn(
command,
args,
opts,
);
let closed=0;
this.proc.stdout.on('data',(data)=>{
if (this.debug){
console.log("OUT:",data.toString());
}
if (this.on_output!==undefined){
this.on_output(data.toString())
}
})
this.proc.stderr.on('data',(data)=>{
data=data.toString();
if (this.debug){
console.log("ERR:",data);
}
this.err+=data;
if (this.on_error!==undefined){
this.on_error(data);
}
});
this.proc.on('exit',(code,status)=>{
if (this.debug&&closed===1){
console.log(`Child process exited with code ${code}.`);
}
this.exit_status=code;
if (code!==0&&(this.err==null||this.err.length===0)){
this.err=`Child process exited with code ${code}.`;
}
if (this.on_exit!==undefined){
this.on_exit(code,status);
}
++closed;
if (closed==2){
resolve();
}
});
this.proc.on('close',(code,status)=>{
if (this.debug&&closed===1){
console.log(`Child process exited with code ${code}.`);
}
++closed;
if (closed==2){
resolve();
}
});
});
return this.promise;
}
write(data){
if (this.proc!==null){
this.proc.stdin.write(data);
}
return this;
}
async join(){
return new Promise(async (resolve)=>{
await this.promise;
resolve();
})
}
kill(signal="SIGINT"){
if (this.proc==null){ return this;}
this.proc.kill(signal);
return this;
}
}
vlib.CLI=class CLI{
constructor({
name=null,
version=null,
commands=[],
start_index=2,
}){
this.name=name;
this.version=version;
this.commands=commands;
this.start_index=start_index;
}
_cast(value,type){
if (type==null){
return value;
}
else if (type==="string"){
if (typeof value!=="string"){
value=value.toString();
}
return value;
}
else if (type==="number"){
if (typeof value!=="number"){
const new_value=parseFloat(value);
if (isNaN(new_value)){
throw Error(`Unable to cast "${value}" to a "number".`);
}
return new_value;
}
return value;
}
else if (type==="array"){
if (!Array.isArray(value)){
value=value.split(",");
}
return value;
}
else {
throw Error(`Unsupported cast type "${type}".`);
}
}
get({id,index=null,type=null,def=null,exclude_args=true}){
if (index!=null){
const value=process.argv[this.start_index+index];
if (value===undefined){
return {found:false,value:def};
}
return {found:true,value:this._cast(value,type)};
}
const is_array=Array.isArray(id);
for (let i=this.start_index;i<process.argv.length;i++){
if ((is_array&&id.includes(process.argv[i]))||(is_array===false&&process.argv[i]===id)){
const value=process.argv[i+1];
if (value===undefined||(exclude_args&&value.charAt(0)==="-")){
return {found:true,value:def};
}
return {found:true,value:this._cast(value,type)};
}
}
return {found:false,value:def};
}
present(id){
const is_array=Array.isArray(id);
for (let i=this.start_index;i<process.argv.length;i++){
if ((is_array&&id.includes(process.argv[i]))||(is_array===false&&process.argv[i]===id)){
return true;
}
}
return false;
}
error(...err){
err=err.join("").toString();
if (err.eq_first("Error: ")||err.eq_first("error: ")){
err=err.substr(7).trim();
}
console.log(`${vlib.colors.red}Error${vlib.colors.end}: ${err}`)
}
throw_error(...err){
this.error(...err);
process.exit(1);
}
docs(obj=null){
if (obj==null){
obj=this.commands;
}
let docs="";
if (this.name!=null){
docs+=this.name;
}
if (this.version!=null){
docs+=` v${this.version}`;
}
if (docs.length>0){
docs+=".\n";
}
const add_keys_and_values=(list)=>{
let max_length=0;
list.iterate((item)=>{
if (item[0].length>max_length){
max_length=item[0].length;
}
})
list.iterate((item)=>{
while (item[0].length<max_length+4){
item[0]+=" ";
}
docs+=item[0]+item[1];
})
}
if (Array.isArray(obj)){
docs+=`Usage: $ ${this.name} [mode] [options]\n`;
let index=0;
let list=[];
obj.iterate((command)=>{
const list_item=[];
if (Array.isArray(command.id)){
list_item[0]=`    ${command.id.join(", ")}`;
} else {
list_item[0]=`    ${command.id}`;
}
if (command.description!=null){
list_item[1]=command.description;
}
list_item[1]+="\n";
list.push(list_item);
})
list.push([
"    --help, -h",
"Show the overall documentation or when used in combination with a command, show the documentation for a certain command.",
])
add_keys_and_values(list);
}
else {
docs+=`Usage: $ ${this.name} ${obj.id} [options]\n`;
if (obj.description){
docs+=`\n`;
docs+=obj.description;
docs+=`\n`;
}
if (obj.args.length>0){
docs+=`\nOptions:\n`;
let arg_index=0;
const list=[];
obj.args.iterate((arg)=>{
const list_item=[];
if (arg.id==null){
list_item[0]=`    argument ${arg_index}`;
}
else if (Array.isArray(arg.id)){
list_item[0]=`    ${arg.id.join(", ")}`;
} else {
list_item[0]=`    ${arg.id}`;
}
if (arg.type!=null&&arg.type!=="bool"&&arg.type!=="boolean"){
list_item[0]+=` <${arg.type}>`;
}
if (arg.required===true){
list_item[0]+=" (required)";
}
if (arg.description!=null){
list_item[1]=arg.description;
}
list_item[1]+="\n";
list.push(list_item);
++arg_index;
})
add_keys_and_values(list);
}
if (obj.examples!=null){
docs+=`\nExamples:\n`;
if (typeof obj.examples==="string"){
if (obj.examples.charAt(0)==="$"){
docs+=`    ${vlib.colors.italic}${obj.examples}${vlib.colors.end}\n`;
} else {
docs+=`    ${vlib.colors.italic}$ ${obj.examples}${vlib.colors.end}\n`;
}
}
else if (Array.isArray(obj.examples)){
obj.examples.iterate((item)=>{
if (item.charAt(0)==="$"){
docs+=`    ${vlib.colors.italic}${item}${vlib.colors.end}\n`;
} else {
docs+=`    ${vlib.colors.italic}$ ${item}${vlib.colors.end}\n`;
}
})
}
else if (typeof obj.examples==="object"){
const descs=Object.keys(obj.examples);
const list=[];
descs.iterate((desc)=>{
const list_item=[`    ${desc}:`];
const example=obj.examples[desc];
if (example.charAt(0)==="$"){
list_item[1]=`${vlib.colors.italic}${example}${vlib.colors.end}\n`;
} else {
list_item[1]=`${vlib.colors.italic}$ ${example}${vlib.colors.end}\n`;
}
list.push(list_item);
})
add_keys_and_values(list);
}
}
if (docs.charAt(docs.length-1)==="\n"){
docs=docs.substr(0,docs.length-1);
}
}
console.log(docs);
}
async start(){
const help=this.present(["-h","--help"])
let matched=false;
for (let i=0;i<this.commands.length;i++){
const command=this.commands[i];
if (this.present(command.id)){
if (help){
this.docs(command);
return true;
}
const callback_args={};
let arg_index=0;
const err=command.args.iterate((arg)=>{
try {
let id_name;
if (arg.id==null){
id_name=`arg${arg_index}`;
} else {
id_name=arg.id;
if (Array.isArray(id_name)){
id_name=id_name[0];
}
while (id_name.length>0&&id_name[0]=="-"){
id_name=id_name.substr(1);
}
id_name=id_name.replaceAll("-","_");
if (id_name==""){
return `Invalid argument id "${arg.id}".`;
}
}
if (arg.type==="bool"||arg.type==="boolean"){
callback_args[id_name]=this.present(arg.id)
}
else {
let {found,value}=this.get({
id:arg.id,
index:arg.id==null?arg_index:null,
type:arg.type,
def:undefined,
});
if (found===false&&arg.required===true){
return `Define parameter "${arg.id}".`;
}
if (found===true&&value==null&&arg.default!==undefined){
value=arg.default;
}
if (value!=null){
callback_args[id_name]=value;
}
}
}
catch (err){
return err;
}
++arg_index;
})
if (err){
this.docs(command);
this.error(err);
return true;
}
try {
const res=command.callback(callback_args);
if (res instanceof Promise){
await res;
}
} catch (err){
this.docs(command);
this.error(err);
process.exit(1);
}
matched=true;
break;
}
}
if (!matched&&help){
this.docs();
return true;
}
if (!matched){
this.docs();
this.error("Invalid mode.");
return false;
}
return true;
}
}
module.exports=vlib;
