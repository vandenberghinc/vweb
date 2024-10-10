const fs = require('fs');
const path = require('path');
const axios = require('axios');
const vlib = require(`${process.env.PERSISTANCE}/private/dev/vinc/vlib/js/vlib.js`);

// Data.
const DATA = new vlib.Path(`${__dirname}/data.ts`).load_sync();

// Extract functions from the file content
const extract_functions = (data) => {

    // Split.
    const lines = data.split("\n");

    // Iterate.
    let is_mcomment = false, is_func = false, func_indent_length = null;
    let prev_func_start = 0, last_added_token = 0;
    const tokens = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        const indent = line.match(/^(\s*)/)[1];
        let indent_length = 0;
        for (const c of indent) {
            if (c === " ") {
                indent_length += 1;
            } else if (c === "\t") {
                indent_length += 4 - (indent_length % 4)
            }
        }

        // Comments.
        if (is_mcomment && /^\s*\*\//.test(line)) {
            is_mcomment = false;
        }
        else if (is_mcomment) {
            continue;
        }
        else if (!is_mcomment && /^\s*\/\*/.test(line)) {
            is_mcomment = true;
        }
        else if (/^\s*\/\//.test(line)) {
            // is comment.
            continue;
        }

        // Function.
        else if (is_func && func_indent_length === indent_length && /^\s*}\s*$/.test(line)) {
            tokens.push({
                is_func: false,
                data: lines.slice(last_added_token, prev_func_start).join("\n") + "\n",
            });
            tokens.push({
                is_func: true,
                data: lines.slice(prev_func_start, i + 1).join("\n") + "\n",
            });
            // console.log("<-------------------->\n"+tokens.last().data)
            is_func = false;
            last_added_token = prev_func_start = i + 1;
        }
        else if (is_func) {
            continue;
        }
        else if (!is_func && indent_length === 0 && /^\s*[a-zA-Z]+/.test(line)) {
            func_indent_length = indent_length;
            is_func = true;
        }

        // White space only line.
        else if (/^\s*$/.test(line)) {
            prev_func_start = i + 1;
        }
    }

    // Add last.
    if (last_added_token < lines.length) {
        tokens.push({
            is_func: false,
            data: lines.slice(last_added_token).join("\n") + "\n",
        });
    }

    return tokens;
};

// Transform code.
const transform_code = async (code) => {
    try {

        // Add a `?` to the value arg of the 3rd overload func of velement.
        // let matches = [0, ""];
        // const lines = code.split("\n");
        // let index = -1;
        // for (const line of lines) {
        //     ++index;
        //     if (
        //         /^\s*$/.test(line) ||
        //         /^\s*\*/.test(line) ||
        //         /^\s*\/\//.test(line)
        //     ) {
        //         continue;
        //     }
        //     const match = line.match(/^([a-zA-Z0-9_]+)\(/);
        //     if (match) {
        //         if (matches[1] === match[1]) {
        //             matches[0] += 1;
        //         } else {
        //             matches = [1, match[1]];
        //         }
        //         if (matches[0] === 3) {
        //             lines[index] = line.replace(
        //                 /^([a-zA-Z0-9_]+\()([a-zA-Z0-9_]+)(?!\?)(: )/,
        //                 '$1$2?$3'
        //             );
        //             // if (lines[index] == line) matches[0] = 0; // @debug
        //             break;
        //         }
        //     }
        // }
        // if (matches[0] === 3) {
        //     console.log("<-------------------->\nPRE:\n"+code)
        //     console.log("<-------------------->\nPOST:\n"+lines.join("\n"))
        // }
        // return lines.join("\n");

        // Remove `| null` from value args in 2nd and 3rd overload.
        let matches = [0, ""];
        const lines = code.split("\n");
        let index = -1;
        let edited = false;
        for (const line of lines) {
            ++index;
            if (
                /^\s*$/.test(line) ||
                /^\s*\*/.test(line) ||
                /^\s*\/\//.test(line)
            ) {
                continue;
            }
            const match = line.match(/^([a-zA-Z0-9_]+)\(/);
            if (match) {
                if (matches[1] === match[1]) {
                    matches[0] += 1;
                } else {
                    matches = [1, match[1]];
                }
                if (matches[0] >= 2) {
                    // console.log(line)
                    lines[index] = line.replace(
                        /^([a-zA-Z0-9_]*\([a-zA-Z0-9_]+\?: [a-zA-Z0-9_| ]*) \| null/,
                        '$1'
                    );
                    if (!edited) {
                        if (lines[index] !== line) console.log("==============\n" + line + "\n" + lines[index])
                        edited = lines[index] === line;
                    }
                }
                if (matches[0] >= 3) {
                    break;
                }
            }
        }
        if (edited) {
            // console.log(`<-------------------->\nPRE:${index+1}:\n${code}`)
            // console.log(`<-------------------->\nPOST:${index+1}:\n${lines.join("\n")}`)
        }
        return lines.join("\n");

    } catch (error) {
        console.error('Error transforming code:', error.response ? error.response.data : error.message);
        return null;
    }
};

// Process and update the file with transformed functions
const process_data = async () => {

    // Extract functions
    const functions = extract_functions(DATA);
    if (functions.length === 0) {
        console.log('No functions found in the file.');
        return;
    }

    // Process each function
    let transformed = "";
    let loader = new vlib.ProgressLoader({message: `Transforming code`, steps: functions.length, width: 50})
    for (const item of functions) {
        if (item.is_func) {
            transformed += await transform_code(item.data);
        } else {
            transformed += item.data;
        }
        loader.next();
    }

    // Write the updated data back to the file
    new vlib.Path(`${__dirname}/data.out.ts`).save_sync(transformed)
    console.log(`Saved output to ${__dirname}/data.out.ts.`);

};

// Run the script
process_data();
