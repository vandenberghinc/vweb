"use strict";
/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ---------------------------------------------------------
// Blacklist.
class Blacklist {
    constructor({ api_key = null, _server, }) {
        // Checks.
        vlib.scheme.verify({ object: arguments[0], check_unknown: true, scheme: {
                api_key: "string",
            } });
        // Arguments.
        this.api_key = api_key;
        // Attributes.
        this.cache = new Map();
    }
    // Verify, returns true on allowed and false on not allowed.
    verify(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("VERIFY", ip);
            if (this.cache.has(ip)) {
                return this.cache.get(ip);
            }
            let result;
            yield new Promise((resolve) => {
                dns.resolveTxt(`${this.honey_pot_key}.${ip.split('.').reverse().join('.')}.dnsbl.httpbl.org`, (error, records) => {
                    if (error) {
                        result = true;
                        console.error(error);
                    }
                    else {
                        result = true;
                        console.log(records);
                    }
                    resolve();
                });
            });
            this.cache.set(ip, result);
            return result;
        });
    }
}
// ---------------------------------------------------------
// Exports.
module.exports = Blacklist;
