const vweb = {};
/* DO NOT EDIT THIS FILE IT IS LOCATED AT /Users/administrator/persistance//private/dev/vinc/vlib/js/include/types/global/scheme.js. */
vweb.scheme = {};
vweb.scheme.value_type = function (value) {
    if (value == null) {
        return "null";
    }
    else if (typeof value === "object" && Array.isArray(value)) {
        return "array";
    }
    else {
        return typeof value;
    }
};
vweb.scheme.init_scheme_item = (scheme_item, scheme = undefined, scheme_key = undefined) => {
    if (typeof scheme_item === "string") {
        scheme_item = { type: scheme_item };
        if (scheme !== undefined && scheme_key !== undefined) {
            scheme[scheme_key] = scheme_item;
        }
    }
    else {
        if (scheme_item.def !== undefined) {
            scheme_item.default = scheme_item.def;
            delete scheme_item.def;
        }
        if (scheme_item.attrs !== undefined) {
            scheme_item.scheme = scheme_item.attrs;
            delete scheme_item.attrs;
        }
        else if (scheme_item.attributes !== undefined) {
            scheme_item.scheme = scheme_item.attributes;
            delete scheme_item.attributes;
        }
        if (scheme_item.enumerate !== undefined) {
            scheme_item.enum = scheme_item.enumerate;
            delete scheme_item.enumerate;
        }
    }
    return scheme_item;
};
vweb.scheme.type_error_str = (scheme_item, prefix = " of type ") => {
    let type_error_str = "";
    if (Array.isArray(scheme_item.type)) {
        type_error_str = prefix;
        for (let i = 0; i < scheme_item.type.length; i++) {
            if (typeof scheme_item.type[i] === "function") {
                try {
                    type_error_str += `"${scheme_item.type[i].name}"`;
                }
                catch (e) {
                    type_error_str += `"${scheme_item.type[i]}"`;
                }
            }
            else {
                type_error_str += `"${scheme_item.type[i]}"`;
            }
            if (i === scheme_item.type.length - 2) {
                type_error_str += " or ";
            }
            else if (i < scheme_item.type.length - 2) {
                type_error_str += ", ";
            }
        }
    }
    else {
        type_error_str = `${prefix}"${scheme_item.type}"`;
    }
    return type_error_str;
};
vweb.scheme.verify = function ({ object = {}, scheme = {}, value_scheme = null, check_unknown = false, parent = "", error_prefix = "", err_prefix = null, throw_err = true, }) {
    if (err_prefix !== null) {
        error_prefix = err_prefix;
    }
    const throw_err_h = (e, field) => {
        const invalid_fields = {};
        invalid_fields[field] = e;
        if (throw_err === false) {
            return { error: e, invalid_fields, object: null };
        }
        const error = new Error(e);
        error.json = { error: e, invalid_fields, object: null };
        throw error;
    };
    const check_type = (object, obj_key, scheme_item, type) => {
        if (typeof type === "function") {
            return object[obj_key] instanceof type;
        }
        switch (type) {
            case "null":
                return object[obj_key] == null;
            case "array": {
                if (Array.isArray(object[obj_key]) === false) {
                    return false;
                }
                if (scheme_item.scheme || scheme_item.value_scheme) {
                    try {
                        object[obj_key] = vweb.scheme.verify({
                            object: object[obj_key],
                            scheme: scheme_item.scheme,
                            value_scheme: scheme_item.value_scheme,
                            check_unknown,
                            parent: `${parent}${obj_key}.`,
                            error_prefix,
                            throw_err: true,
                        });
                    }
                    catch (e) {
                        if (!throw_err && e.json) {
                            return e.json;
                        }
                        else {
                            throw e;
                        }
                    }
                }
                if (typeof scheme_item.min_length === "number" && object[obj_key].length < scheme_item.min_length) {
                    const field = `${parent}${obj_key}`;
                    return throw_err_h(`${error_prefix}Attribute "${field}" has an invalid array length [${object[obj_key].length}], the minimum length is [${scheme_item.min_length}].`, field);
                }
                if (typeof scheme_item.max_length === "number" && object[obj_key].length > scheme_item.max_length) {
                    const field = `${parent}${obj_key}`;
                    return throw_err_h(`${error_prefix}Attribute "${field}" has an invalid array length [${object[obj_key].length}], the maximum length is [${scheme_item.max_length}].`, field);
                }
                return true;
            }
            case "object": {
                if (typeof object[obj_key] !== "object" || object[obj_key] == null) {
                    return false;
                }
                if (scheme_item.scheme || scheme_item.value_scheme) {
                    try {
                        object[obj_key] = vweb.scheme.verify({
                            object: object[obj_key],
                            scheme: scheme_item.scheme,
                            value_scheme: scheme_item.value_scheme,
                            check_unknown,
                            parent: `${parent}${obj_key}.`,
                            error_prefix,
                            throw_err: true,
                        });
                    }
                    catch (e) {
                        if (!throw_err && e.json) {
                            return e.json;
                        }
                        else {
                            throw e;
                        }
                    }
                }
                return true;
            }
            case "string": {
                if (typeof object[obj_key] !== "string" && !(object[obj_key] instanceof String)) {
                    return false;
                }
                if (scheme_item.allow_empty !== true && object[obj_key].length === 0) {
                    return 1;
                }
                if (typeof scheme_item.min_length === "number" && object[obj_key].length < scheme_item.min_length) {
                    const field = `${parent}${obj_key}`;
                    return throw_err_h(`${error_prefix}Attribute "${field}" has an invalid string length [${object[obj_key].length}], the minimum length is [${scheme_item.min_length}].`, field);
                }
                if (typeof scheme_item.max_length === "number" && object[obj_key].length > scheme_item.max_length) {
                    const field = `${parent}${obj_key}`;
                    return throw_err_h(`${error_prefix}Attribute "${field}" has an invalid string length [${object[obj_key].length}], the maximum length is [${scheme_item.max_length}].`, field);
                }
            }
            default:
                if (type !== typeof object[obj_key]) {
                    return false;
                }
                if (type === "string" && scheme_item.allow_empty !== true && object[obj_key].length === 0) {
                    return 1;
                }
                return true;
        }
    };
    const verify_value_scheme = (scheme_item, key, object, value_scheme_key = undefined) => {
        if (typeof scheme_item.preprocess === "function") {
            const res = scheme_item.preprocess(object[key], object, key);
            if (res !== undefined) {
                object[key] = res;
            }
        }
        if (scheme_item.type && scheme_item.type !== "any") {
            const is_required = scheme_item.required ?? true;
            if (scheme_item.default === null && object[key] == null) {
            }
            else if (Array.isArray(scheme_item.type)) {
                let correct_type = false;
                let is_empty = false;
                for (let i = 0; i < scheme_item.type.length; i++) {
                    const res = check_type(object, key, scheme_item, scheme_item.type[i]);
                    if (typeof res === "object") {
                        return res;
                    }
                    else if (res === true) {
                        correct_type = true;
                        break;
                    }
                    else if (res === 1) {
                        correct_type = true;
                        is_empty = true;
                        break;
                    }
                }
                if (correct_type === false) {
                    const field = `${parent}${value_scheme_key || key}`;
                    const current_type = vweb.scheme.value_type(object[key]);
                    return throw_err_h(`${error_prefix}Attribute "${field}" has an invalid type "${current_type}", the valid type is ${vweb.scheme.type_error_str(scheme_item, "")}.`, field);
                }
                else if (is_empty && is_required && scheme_item.default !== "") {
                    const field = `${parent}${value_scheme_key || key}`;
                    return throw_err_h(`${error_prefix}Attribute "${field}" is an empty string.`, field);
                }
            }
            else {
                const res = check_type(object, key, scheme_item, scheme_item.type);
                if (typeof res === "object") {
                    return res;
                }
                else if (res === false) {
                    const field = `${parent}${value_scheme_key || key}`;
                    const current_type = vweb.scheme.value_type(object[key]);
                    return throw_err_h(`${error_prefix}Attribute "${field}" has an invalid type "${current_type}", the valid type is ${vweb.scheme.type_error_str(scheme_item, "")}.`, field);
                }
                else if (res === 1 && is_required && scheme_item.default !== "") {
                    const field = `${parent}${value_scheme_key || key}`;
                    return throw_err_h(`${error_prefix}Attribute "${field}" is an empty string.`, field);
                }
            }
        }
        if (scheme_item.enum) {
            if (!scheme_item.enum.includes(object[key])) {
                const field = `${parent}${value_scheme_key || key}`;
                const joined = scheme_item.enum.map(item => {
                    if (item == null) {
                        return 'null';
                    }
                    else if (typeof item !== "string" && !(item instanceof String)) {
                        return item.toString();
                    }
                    return `"${item.toString()}"`;
                }).join(", ");
                return throw_err_h(`${error_prefix}Attribute "${field}" must be one of the following enumerated values [${joined}].`, field);
            }
        }
        if (typeof scheme_item.verify === "function") {
            const err = scheme_item.verify(object[key], object, key);
            if (err) {
                return throw_err_h(`${error_prefix}${err}`, `${parent}${value_scheme_key || key}`);
            }
        }
        if (typeof scheme_item.callback === "function") {
            let stack = new Error("SPLIT-AFTER").stack.split("SPLIT-AFTER\n")[1].split('\n');
            let last = -1;
            for (let i = 0; i < stack.length; i++) {
                if (stack[i].includes('at vweb.scheme.verify ')) {
                    last = i;
                }
            }
            if (last !== -1) {
                stack = stack.slice(last);
            }
            console.warn(`${"[0m"}[vweb.scheme.verify] ${"[33m"}Warning${"[0m"}: Attribute "callback" is deprecated and replaced by attribute "verify" and will be removed in future versions.\n${stack.join('\n')}`);
            const err = scheme_item.callback(object[key], object, key);
            if (err) {
                return throw_err_h(`${error_prefix}${err}`, `${parent}${value_scheme_key || key}`);
            }
        }
        if (typeof scheme_item.postprocess === "function") {
            const res = scheme_item.postprocess(object[key], object, key);
            if (res !== undefined) {
                object[key] = res;
            }
        }
    };
    if (Array.isArray(object)) {
        scheme = value_scheme;
        if (scheme != null) {
            const scheme_item = vweb.scheme.init_scheme_item(scheme);
            for (let index = 0; index < object.length; index++) {
                const err = verify_value_scheme(scheme_item, index, object);
                if (err) {
                    return err;
                }
            }
        }
    }
    else {
        if (value_scheme != null) {
            const scheme_item = vweb.scheme.init_scheme_item(value_scheme);
            const keys = Object.keys(object);
            for (let i = 0; i < keys.length; i++) {
                const err = verify_value_scheme(scheme_item, keys[i], object);
                if (err) {
                    return err;
                }
            }
        }
        else {
            if (check_unknown) {
                const object_keys = Object.keys(object);
                for (let x = 0; x < object_keys.length; x++) {
                    if (object_keys[x] in scheme === false) {
                        const field = `${parent}${object_keys[x]}`;
                        return throw_err_h(`${error_prefix}Attribute "${field}" is not a valid attribute name.`, field);
                    }
                }
            }
            const scheme_keys = Object.keys(scheme);
            for (let scheme_index = 0; scheme_index < scheme_keys.length; scheme_index++) {
                const scheme_key = scheme_keys[scheme_index];
                let scheme_item = vweb.scheme.init_scheme_item(scheme[scheme_key], scheme, scheme_key);
                if (typeof scheme_item.alias === "string") {
                    scheme_item = vweb.scheme.init_scheme_item(scheme[scheme_item.alias], scheme, scheme_item.alias);
                }
                if (scheme_key in object === false) {
                    if (scheme_item.default !== undefined) {
                        if (typeof scheme_item.default === "function") {
                            object[scheme_key] = scheme_item.default(object);
                        }
                        else {
                            object[scheme_key] = scheme_item.default;
                        }
                    }
                    else {
                        if (scheme_item.required === false) {
                            continue;
                        }
                        else if (typeof scheme_item.required === "function") {
                            const required = scheme_item.required(object);
                            if (required) {
                                const field = `${parent}${scheme_key}`;
                                return throw_err_h(`${error_prefix}Attribute "${field}" should be a defined value${vweb.scheme.type_error_str(scheme_item)}.`, field);
                            }
                        }
                        else {
                            const field = `${parent}${scheme_key}`;
                            return throw_err_h(`${error_prefix}Attribute "${field}" should be a defined value${vweb.scheme.type_error_str(scheme_item)}.`, field);
                        }
                    }
                    continue;
                }
                const err = verify_value_scheme(scheme_item, scheme_key, object);
                if (err) {
                    return err;
                }
            }
        }
    }
    if (throw_err === false) {
        return { error: null, invalid_fields: {}, object };
    }
    return object;
};
vweb.scheme._type_string = function (type = [], prefix = "") {
    if (typeof type === "string") {
        return `${prefix}"${type}"`;
    }
    if (Array.isArray(type) && type.length > 0) {
        let str = prefix;
        for (let i = 0; i < type.length; i++) {
            if (typeof type[i] === "function") {
                try {
                    str += `"${type[i].name}"`;
                }
                catch (e) {
                    str += `"${type[i]}"`;
                }
            }
            else {
                str += `"${type[i]}"`;
            }
            if (i === type.length - 2) {
                str += " or ";
            }
            else if (i < type.length - 2) {
                str += ", ";
            }
        }
        return str;
    }
    return "";
};
vweb.scheme.throw_undefined = function (name, type, throw_err = true) {
    if (typeof name === "object" && name != null) {
        ({
            name,
            type = [],
            throw_err = true,
        } = name);
    }
    const err = `Argument "${name}" should be a defined value${vweb.scheme._type_string(type, " of type ")}.`;
    if (throw_err) {
        throw new Error(err);
    }
    return err;
};
vweb.scheme.throw_invalid_type = function (name, value, type = [], throw_err = true) {
    if (typeof name === "object" && name != null) {
        ({
            name,
            value,
            type = [],
            throw_err = true,
        } = name);
    }
    const err = `Invalid type "${vweb.scheme.value_type(value)}" for argument "${name}"${vweb.scheme._type_string(type, ", the valid type is ")}.`;
    if (throw_err) {
        throw new Error(err);
    }
    return err;
};
const Scheme = vweb.Scheme;
export { Scheme };
