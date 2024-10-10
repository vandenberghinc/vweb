const fs = require('fs');
const path = require('path');
const axios = require('axios');
const vlib = require(`${process.env.PERSISTANCE}/private/dev/vinc/vlib/js/vlib.js`);

// Data.
const DATA = new vlib.Path(`${__dirname}/data.ts`).load_sync();

// Your OpenAI API key
const API_KEY = process.env.OPENAI_API_KEY;

// Cached transformations.
const CACHED_TRANSFORMATIONS = JSON.parse(new vlib.Path(`${__dirname}/cached.json`).load_sync());
const CACHED_TRANSFORMATIONS_MUTEX = new vlib.Mutex();

const SYSTEM_MESSAGE = `
Act as my typescript developer employee. The user sends you typescript/javascript code and you convert it to typescript code.

You only respond with raw code, no text whatsoever only raw code. Do not put the code inside a \`\`\` codeblock, just respond with raw code.

Convert all TypeScript functions where multiple overloads suit better, for instance for a getter with no args and a setter with args, make sure that most params accept more types than only strings. In the following "Before" function the same function is used for a get return "string" and set with return "this" supporting chaining. Convert these functions to a different get and set overload as shown below.

Before:
    content(value) {
        if (value == null) {
            return this.style.content ?? "";
        }
        this.style.content = value.toString();
        return this;
    }

After:  
    /**
     * @docs:
     * @title: Content
     * @desc: Set the content of a pseudo element.
     * @param:
     *     @name: value
     *     @description The value of the content to set.
     *     @type string, number, null
     * @return:
     *     @type: this
     *     @description When an argument is passed this function returns the instance of the element for chaining. Otherwise it returns the already set value of the requested content.
     * @funcs: 2
     */
    content(): string;
    content(value: string | number): this;
    content(value?: string | number | null): string | this {
        if (value == null) {
            return this.style.content ?? "";
        }
        this.style.content = value.toString();
        return this;
    }

When creating overload funcs make sure the first overload returns the requested type, mostly string. The second overload func where an arg is present always returns "this" and the third real function must have an optional "value?: ..." parameter, dont forget the ? there.

Keep all the comments.

If no documentation @docs block exists, than create a documentation section with a title description and description per parameter, dont create empty @docs blocks make sure to describe the function as well. 

When creating multiple overload funcs make sure to add @funcs: 2 to the documentation @docs block, again here make sure to add more info to the @docs block if nothing else is already added.

Make sure every function has a @docs block, also the non converted functions.

Make sure the @title blocks are very compact, and make sure the @descr are somewhat more detailed, preferably around 2 to 3 lines. However for @param/@return nested @descr can be 1 to 2 lines.

@docs blocks are structured like this:

/**
 * @docs:
 * @title: Border Button
 * @desc: Initializes the BorderButton element with the provided text.
 * @param:
 *     @name: data
 *     @descr: Some description for data.
 *     @type: object
 *     @attr:
 *         @name: text
 *         @description Some description for the \`data.text\` attribute.
 * @return:
 *     @type: this
 *     @description Returns the instance of the element for chaining.
 */

Make sure to convert all the given next functions to the requested format.  Make sure to convert all functions and not skip any functions, or create any new functions, just convert these functions to the requested mulitple overload funcs and and convert JS to TS. Dont convert part of the functions and tell me continue converting the functions like this, i am explicitly asking you to convert them all for me so i dont have to.

Also only respond with a TS codeblock dont provide any other text in the response.
`;

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

    // process.exit(1)
    // console.log("--------------------\n")
    // let token_data = "";
    // let  i = 0;
    // for (const token of tokens) {
    //     token_data += token.data;
    //     ++i;
    //     if (i > 10) break
    // }
    // console.log(token_data)
    // process.exit(1)

    return tokens;
};

// Send code to OpenAI for transformation
const transform_code = async (code) => {
    try {
        const hash = vlib.utils.hash(code);
        if (CACHED_TRANSFORMATIONS[hash] != null) {
            console.log("Using cached transformation " + hash + ".");
            return CACHED_TRANSFORMATIONS[hash];
        }
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4o-mini",
            messages: [
                { role: 'system', content: SYSTEM_MESSAGE },
                { role: 'user', content: code },
            ],
            max_tokens: 2048,
            temperature: 0.5,
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        
        // Extract the code block from the assistant's response
        let transformed = response.data.choices[0].message.content.trim();

        // add same whitespace.
        for (let i = 0; i < code.length; i++) {
            let c;
            if ((c = code.charAt(i)) === "\n" || c === " " || c === "\t") { transformed = c + transformed }
            else { break; }
        }
        for (let i = code.length - 1; i >= 0; i++) {
            let c;
            if ((c = code.charAt(i)) === "\n" || c === " " || c === "\t") { transformed += c }
            else { break; }
        }

        CACHED_TRANSFORMATIONS[hash] = transformed;
        await CACHED_TRANSFORMATIONS_MUTEX.lock();
        new vlib.Path(`${__dirname}/cached.json`).save_sync(JSON.stringify(CACHED_TRANSFORMATIONS));
        CACHED_TRANSFORMATIONS_MUTEX.unlock();

        return transformed;

    } catch (error) {
        console.error('Error transforming code:', error.response ? error.response.data : error.message);
        return null;
    }
};

// Process and update the file with transformed functions
const process_data = async () => {
    // try {

        // Step 2: Extract functions
        const functions = extract_functions(DATA);
        if (functions.length === 0) {
            console.log('No functions found in the file.');
            return;
        }

        // Transform all functions.
        // let loader = new vlib.ProgressLoader({message: `Processing ${functions.length} functions`, steps: functions.length / 2, width: 50})
        // const divided = functions.divide(functions.length / 2);
        // for (let x = 0; x < divided.length; x++) {
        //     const functions = divided[x];
        //     await Promise.all(divided[x].iterate_append(item => transform_code(item.data)));
        //     loader.next();
        // }

        // Step 3: Process each function
        let transformed = "";
        let loader = new vlib.ProgressLoader({message: `Bundling the transformed code`, steps: functions.length, width: 50})
        for (const item of functions) {
            if (item.is_func) {
                const x = await transform_code(item.data);
                console.log("=======================")
                console.log(item.data)
                console.log("-----------------------")
                console.log(x)
                transformed += x;
                // break;
                // transformed += await transform_code(item.data);
            } else {
                transformed += item.data;
            }
            loader.next();
        }

        // Step 4: Write the updated data back to the file
        new vlib.Path(`${__dirname}/data.out.ts`).save_sync(transformed)
        console.log(`Saved output to ${__dirname}/data.out.ts.`);

    // } catch (error) {
    //     console.error('Error processing the file:', error);
    // }
};

// Run the script
process_data();
