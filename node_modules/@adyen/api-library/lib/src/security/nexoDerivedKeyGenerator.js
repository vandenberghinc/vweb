"use strict";
/*
 *                       ######
 *                       ######
 * ############    ####( ######  #####. ######  ############   ############
 * #############  #####( ######  #####. ######  #############  #############
 *        ######  #####( ######  #####. ######  #####  ######  #####  ######
 * ###### ######  #####( ######  #####. ######  #####  #####   #####  ######
 * ###### ######  #####( ######  #####. ######  #####          #####  ######
 * #############  #############  #############  #############  #####  ######
 *  ############   ############  #############   ############  #####  ######
 *                                      ######
 *                               #############
 *                               ############
 * Adyen NodeJS API Library
 * Copyright (c) 2020 Adyen B.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const nexoConstants_1 = require("../constants/nexoConstants");
class NexoDerivedKeyGenerator {
    static deriveKeyMaterial(passphrase) {
        const pass = Buffer.from(passphrase, "binary");
        const salt = Buffer.from("AdyenNexoV1Salt", "binary");
        const iterations = 4000;
        const keylen = nexoConstants_1.NexoEnum.CIPHER_KEY_LENGTH + nexoConstants_1.NexoEnum.HMAC_KEY_LENGTH + nexoConstants_1.NexoEnum.IV_LENGTH;
        const key = (0, crypto_1.pbkdf2Sync)(pass, salt, iterations, keylen * 8, "sha1");
        return NexoDerivedKeyGenerator.readKeyData(key);
    }
    static readKeyData(key) {
        return {
            cipherKey: key.slice(nexoConstants_1.NexoEnum.HMAC_KEY_LENGTH, nexoConstants_1.NexoEnum.HMAC_KEY_LENGTH + nexoConstants_1.NexoEnum.CIPHER_KEY_LENGTH),
            hmacKey: key.slice(0, nexoConstants_1.NexoEnum.HMAC_KEY_LENGTH),
            iv: key.slice(nexoConstants_1.NexoEnum.HMAC_KEY_LENGTH + nexoConstants_1.NexoEnum.CIPHER_KEY_LENGTH, nexoConstants_1.NexoEnum.CIPHER_KEY_LENGTH + nexoConstants_1.NexoEnum.HMAC_KEY_LENGTH + nexoConstants_1.NexoEnum.IV_LENGTH),
        };
    }
}
exports.default = NexoDerivedKeyGenerator;
//# sourceMappingURL=nexoDerivedKeyGenerator.js.map