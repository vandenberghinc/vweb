"use strict";
/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2024 Daan van den Bergh.
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
exports.compile = compile;
const ts = __importStar(require("typescript"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/*
 * Preprocesses the input text, replacing non-string numeric literals
 * suffixed with units and hex color codes with string literals.
 */
function preprocess(input) {
    // Regex to match numbers followed by units (%, em, rem, px, vh, vw)
    // - $1: The prefix (start of line or non-quote character)
    // - "$2$4": The captured number and unit, enclosed in quotes
    input = input.replace(/(^|[^"'])\b(\d+(\.\d+)?)(em|rem|px|vh|vw|%)\b/g, '$1"$2$4"');
    // Regex to match hex color codes
    // - $1: The prefix (start of line or non-quote character)
    // - "$&": The entire matched hex color, enclosed in quotes
    input = input.replace(/(^|[^"'])#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g, '$1"$&"');
    // Response.
    return input;
}
/*
 * Compiles TypeScript files after preprocessing them to replace non-string
 * literals with units and hex color codes into string literals.
 */
function compile(source) {
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
    files.forEach(file => {
        const sourceText = fs.readFileSync(file, 'utf-8');
        const transformedText = preprocess(sourceText);
        processedFiles[file] = transformedText;
    });
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
    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    let hasError = false;
    allDiagnostics.forEach(diagnostic => {
        let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        if (diagnostic.file && diagnostic.start !== undefined) {
            const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            const fileName = path.relative(srcDir, diagnostic.file.fileName);
            console.error(`${fileName} (${line + 1},${character + 1}): ${message}`);
        }
        else {
            console.error(message);
        }
        if (diagnostic.category === ts.DiagnosticCategory.Error) {
            hasError = true;
        }
    });
    if (emitResult.emitSkipped || hasError) {
        console.error('TypeScript compilation failed.');
        process.exit(1);
    }
    else {
        console.log('TypeScript compilation succeeded.');
    }
}
// Exports.
module.exports = {
    preprocess,
    compile,
};
