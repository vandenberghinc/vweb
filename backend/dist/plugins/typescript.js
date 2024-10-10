"use strict";
/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2024 Daan van den Bergh.
 *
 * Frontend Typescript compiler with some mini additional options.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const { vhighlight } = require("../vinc.js");
const tslib = {
    /*
     * Preprocesses the input text, replacing non-string numeric literals
     * suffixed with units and hex color codes with string literals.
     */
    preprocess(path, input) {
        // Regex to match numbers followed by units (%, em, rem, px, vh, vw)
        // - $1: The prefix (start of line or non-quote character)
        // - "$2$4": The captured number and unit, enclosed in quotes
        // input = input.replace(/(^|[^"'])\b(\d+(\.\d+)?)(em|rem|px|vh|vw|%)\b/g, '$1"$2$4"');
        // Regex to match hex color codes
        // - $1: The prefix (start of line or non-quote character)
        // - "$&": The entire matched hex color, enclosed in quotes
        // input = input.replace(/(^|[^"'])#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g, '$1"$&"');
        // Response.
        // return input;
        // Regular expression to match string literals (handles both single and double quotes)
        const str_regex = /(['"])(?:\\.|[^\\])*?\1/g;
        let last_index = 0;
        let result = '';
        let match;
        // Iterate over all string literals in the input
        while ((match = str_regex.exec(input)) !== null) {
            const start = match.index;
            const end = str_regex.lastIndex;
            const before = input.slice(last_index, start);
            last_index = end;
            // Process the 'before' part (outside strings)
            const processed = before
                // Replace numbers with units outside strings
                .replace(/\b(\d+(\.\d+)?)(em|rem|px|vh|vw|%)(?=\W|$)/g, '"$&"')
                // Replace hex color codes outside strings
                .replace(/#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g, '"$&"');
            if (path.includes("tabs.js") && /(?!<")50%/g.test(processed)) {
                console.log("======================== - Before:");
                console.log(before);
                console.log("------------------------");
                console.log(processed);
            }
            // Append the processed 'before' part and the untouched string literal
            result += processed + match[0];
        }
        // Process the remaining part after the last string literal
        const after = input.slice(last_index);
        const processed = after
            // Replace numbers with units outside strings
            .replace(/\b(\d+(\.\d+)?)(em|rem|px|vh|vw|%)(?=\W|$)/g, '"$&"')
            // Replace hex color codes outside strings
            .replace(/#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g, '"$&"');
        if (path.includes("checkbox.js") && processed.includes("50%")) {
            console.log("======================== - After:");
            console.log(after);
            console.log("------------------------");
            console.log(processed);
        }
        result += processed;
        return result;
    },
    /*
     * Extract all #macro statements.
     */
    _extract_macro_statements(path, data) {
        let output = [], is_preprocessor = null;
        const macros = {};
        const iterator = new vhighlight.Iterator({
            language: "ts",
            code: data,
            allow_preprocessors: true,
            callback(state) {
                // End of preprocessor.
                if (is_preprocessor !== undefined && !state.is_preprocessor) {
                    // Extract name & value.
                    let type = "", name = "", value = "", full = "";
                    let s = is_preprocessor, mode = 0;
                    while (s != null && s != state) {
                        if (mode === 0) {
                            if (s.is_whitespace) {
                                mode = 1;
                            }
                            else {
                                type += s.char;
                            }
                        }
                        else if (mode === 1 && !s.is_whitespace) {
                            mode = 2;
                            name += s.char;
                        }
                        else if (mode === 2) {
                            if (s.is_whitespace &&
                                s.curly_depth === is_preprocessor.curly_depth &&
                                s.parenth_depth === is_preprocessor.parenth_depth &&
                                s.bracket_depth === is_preprocessor.bracket_depth) {
                                mode = 3;
                            }
                            else {
                                name += s.char;
                            }
                        }
                        else if (mode === 3) {
                            if (s.char === "\\" && s.next?.is_line_break) {
                                // skip.
                            }
                            else {
                                value += s.char;
                            }
                        }
                        full += s.char;
                        s = s.next;
                    }
                    if (type === "#macro") {
                        macros[name.trim()] = value.trim();
                    }
                    is_preprocessor = undefined;
                }
                // Start of preprocessor.
                else if (state.is_preprocessor) {
                    if (is_preprocessor === undefined) {
                        is_preprocessor = state;
                    }
                    return; // dont add to new data.
                }
                output.push(state.char);
            },
        });
        iterator.iterate();
        return [output.join(""), macros];
    },
    /*
     * Fill all #macro statements.
     */
    _fill_macro_statements(path, data, macros) {
        let output = [];
        let buff = [];
        // Construct regex to match preprocessor variables
        const regex = new RegExp(`\\b(${Object.keys(macros).join("|")})\\b`, 'g');
        // Iterator that processes the code
        const iterator = new vhighlight.Iterator({
            language: "ts",
            code: data,
            allow_preprocessors: true,
            callback(state) {
                // Accumulate real code into the buffer
                if (!state.is_string && !state.is_regex && !state.is_comment && !state.is_multi_line_comment) {
                    buff.push(state.char);
                }
                else {
                    // Process code buff.
                    if (buff.length > 0) {
                        output.push(buff
                            .join('')
                            .replace(regex, (match) => macros[match] || match));
                        buff = [];
                    }
                    // Push non-code characters directly to output (strings, comments, etc.)
                    output.push(state.char);
                }
            },
        });
        // Run the iterator to process the code
        iterator.iterate();
        // Process code buff.
        if (buff.length > 0) {
            output.push(buff
                .join('')
                .replace(regex, (match) => macros[match] || match));
        }
        // Return the processed output as a joined string
        return output.join('');
    },
    /*
     * Compiles TypeScript files after preprocessing them to replace non-string
     * literals with units and hex color codes into string literals.
     */
    async compile({ source, error_limit = 25, max_line_length = 250, debug_single_file = false, target_file = undefined, preprocess = undefined, enable_macros = true, }) {
        const srcDir = path.resolve(source);
        const tsconfigPath = path.join(srcDir, 'tsconfig.json');
        if (!fs.existsSync(tsconfigPath)) {
            console.error(`tsconfig.json not found in the source directory: ${srcDir}`);
            process.exit(1);
        }
        // Read and parse tsconfig.json
        const tsconfig = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
        if (tsconfig.error) {
            const message = ts.flattenDiagnosticMessageText(tsconfig.error.messageText, '\n');
            console.error(`Error reading tsconfig.json: ${message}`);
            process.exit(1);
        }
        const parsedTsConfig = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, srcDir);
        if (parsedTsConfig.errors.length > 0) {
            parsedTsConfig.errors.forEach(error => {
                const message = ts.flattenDiagnosticMessageText(error.messageText, '\n');
                console.error(`tsconfig.json error: ${message}`);
            });
            process.exit(1);
        }
        // Get all TypeScript files based on tsconfig's include/exclude
        const files = parsedTsConfig.fileNames;
        // Read and preprocess each file
        const processedFiles = {};
        let preprocessor_definitions = {};
        for (const file of files) {
            processedFiles[file] = this.preprocess(file, fs.readFileSync(file, 'utf-8'));
            // Macros
            if (enable_macros) {
                const [data, definitions] = this._extract_macro_statements(file, processedFiles[file]);
                processedFiles[file] = this._fill_macro_statements(file, data, definitions);
            }
            // User defined preprocess.
            if (preprocess) {
                let res = preprocess(file.substr(srcDir.length + 1), processedFiles[file]);
                if (res instanceof Promise) {
                    res = await res;
                }
                if (typeof res === "string") {
                    processedFiles[file] = res;
                }
            }
        }
        ;
        // Create a custom CompilerHost
        const compilerHost = {
            fileExists: (fileName) => {
                if (processedFiles[fileName]) {
                    return true;
                }
                return fs.existsSync(fileName);
            },
            directoryExists: ts.sys.directoryExists,
            getCurrentDirectory: ts.sys.getCurrentDirectory,
            getDirectories: ts.sys.getDirectories,
            getCanonicalFileName: ts.sys.useCaseSensitiveFileNames
                ? (fileName) => fileName
                : (fileName) => fileName.toLowerCase(),
            getNewLine: () => ts.sys.newLine,
            getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
            getSourceFile: (fileName, languageVersion, onError) => {
                if (processedFiles[fileName]) {
                    return ts.createSourceFile(fileName, processedFiles[fileName], languageVersion, true);
                }
                if (!fs.existsSync(fileName)) {
                    if (onError)
                        onError(`File not found: ${fileName}`);
                    return undefined;
                }
                const sourceText = fs.readFileSync(fileName, 'utf-8');
                return ts.createSourceFile(fileName, sourceText, languageVersion, true);
            },
            readFile: (fileName) => {
                if (processedFiles[fileName]) {
                    return processedFiles[fileName];
                }
                return fs.readFileSync(fileName, 'utf-8');
            },
            useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
            writeFile: ts.sys.writeFile,
        };
        // Create the TypeScript program
        const program = ts.createProgram({
            rootNames: files,
            options: parsedTsConfig.options,
            host: compilerHost,
        });
        // Emit the compiled JavaScript
        const emitResult = program.emit();
        // Collect and display diagnostics
        let allDiagnostics = ts
            .getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics);
        let hasError = false;
        // Map errors per file.
        const error_map = {};
        for (const item of allDiagnostics) {
            if (item.file?.fileName) {
                if (error_map[item.file.fileName] === undefined) {
                    error_map[item.file.fileName] = 0;
                }
                error_map[item.file.fileName] += 1;
            }
        }
        // Filter by target.
        if (target_file != null) {
            let filtered = [];
            let file_names = [];
            for (const item of allDiagnostics) {
                if (item.file?.fileName == target_file) {
                    filtered.push(item);
                }
                if (item.file?.fileName && !file_names.includes(item.file?.fileName)) {
                    file_names.push(item.file?.fileName);
                }
            }
            if (filtered.length == 0) {
                throw new Error(`Unable to find target file "${target_file}", files: "${file_names.join('", "')}".`);
            }
            allDiagnostics = filtered;
        }
        // Debug single file.
        if (debug_single_file) {
            let filtered = [], file = null;
            for (const item of allDiagnostics) {
                if (item.file) {
                    if (file == null) {
                        // if (item.file.fileName.includes("loaders.js")) {
                        file = item.file.fileName;
                        // }
                    }
                    else if (file != null && file !== item.file.fileName) {
                        break;
                    }
                }
                if (file != null) {
                    filtered.push(item);
                }
            }
            allDiagnostics = filtered;
        }
        // Limit the number of diagnostics if `error_limit` is provided
        const total_errors = allDiagnostics.length;
        const diagnosticsToShow = error_limit !== null ? allDiagnostics.slice(0, error_limit) : allDiagnostics;
        // Check if there are any errors
        if (diagnosticsToShow.length > 0) {
            hasError = true;
        }
        // Truncate very long messages.
        // for (const item of diagnosticsToShow) {
        //     if (typeof item.length === "number" && item.length > 180) {
        //         item.length = 180;
        //         item.end = item.start + item.length;
        //         console.log("Limit!")
        //     }
        //     // Searching.
        //     const refset = new WeakSet();
        //     const check = (obj) => {
        //         refset.add(obj)
        //         const values = Object.values(obj);
        //         for (const i of values) {
        //             if (typeof i === "string" && i.includes("!function(t,e){\"object\"==t")) {
        //                 return true;
        //             } else if (i != null && typeof i === "object" && !refset.has(i)) {
        //                 let res;
        //                 if ((res = check(i)) != null) {
        //                     return res;
        //                 }
        //             }
        //         }
        //     }
        //     if (check(item)) {
        //         console.log(item)
        //         process.exit(1)
        //     }
        // }
        // Format the diagnostics with colors and context similar to `tsc`
        const formattedDiagnostics = ts.formatDiagnosticsWithColorAndContext(diagnosticsToShow, {
            getCurrentDirectory: () => process.cwd(),
            getCanonicalFileName: (fileName) => path.resolve(fileName),
            getNewLine: () => '\n',
        });
        const split = formattedDiagnostics.split("\n");
        for (let i = 0; i < split.length; i++) {
            if (!split[i].includes(" - \x1B[91merror\x1B[0m\x1B[90m TS") && split[i].length > max_line_length) {
                split[i] = split[i].substr(0, max_line_length - 3) + "...";
            }
        }
        console.error(split.join("\n"));
        // Log error map.
        console.log(`\nErrors per file:`);
        for (const [path, errors] of Object.entries(error_map)) {
            console.log(` - ${path}: ${errors}`);
        }
        console.log("");
        // If errors were truncated, log a message indicating so
        if (error_limit !== null && allDiagnostics.length > error_limit) {
            console.log(`Displayed the first ${error_limit} errors out of ${allDiagnostics.length}.`);
        }
        else {
            console.log(`Encountered ${allDiagnostics.length} errors.`);
        }
        if (emitResult.emitSkipped || hasError) {
            console.log('TypeScript compilation failed.');
            return false;
        }
        else {
            console.log('TypeScript compilation succeeded.');
            return true;
        }
    },
};
// Check if the current file is the main module
if (require.main === module) {
    let source = "", error_limit = 25, debug_single_file = false, target_file = undefined;
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] === "--source") {
            source = process.argv[i + 1] ?? "";
            ++i;
        }
        else if (process.argv[i] === "--error-limit") {
            error_limit = parseInt(process.argv[i + 1]);
            if (isNaN(error_limit)) {
                error_limit = null;
            }
            ++i;
        }
        else if (process.argv[i] === "--target-file") {
            target_file = process.argv[i + 1];
            ++i;
        }
        else if (process.argv[i] === "--debug-single-file") {
            debug_single_file = true;
        }
    }
    if (source === "") {
        throw new Error("Define argument --source.");
    }
    tslib.compile({ source, error_limit, debug_single_file, target_file });
}
// const data = `
// #include <stdio.h>
// #define MAX_SIZE 1024
// #define MIN_VALUE 0
// #define PI 3.14159
// #define DEBUG
// #define MULTI_LINE_MACRO(a, b) \\
//     ((a) > (b) ? (a) : (b))
// int main() {
//     // code here
//     const int valid_size = 0 <= MAX_SIZE;
//     return 0;
// }
// `;
// const [d, definitions] = tslib._extract_macro_statements("test.ts", data);
// // console.log(d)
// console.log(definitions);
// console.log("============\n"+tslib._fill_macro_statements("test.ts", d, definitions));
// process.exit(1)
// Exports.
module.exports = tslib;
