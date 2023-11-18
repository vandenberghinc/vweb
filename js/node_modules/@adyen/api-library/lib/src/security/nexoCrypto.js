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
 * Copyright (c) 2021 Adyen B.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const nexoCryptoException_1 = __importDefault(require("../services/exception/nexoCryptoException"));
const invalidSecurityKeyException_1 = __importDefault(require("./exception/invalidSecurityKeyException"));
const nexoDerivedKeyGenerator_1 = __importDefault(require("./nexoDerivedKeyGenerator"));
const nexoConstants_1 = require("../constants/nexoConstants");
var Modes;
(function (Modes) {
    Modes[Modes["ENCRYPT"] = 0] = "ENCRYPT";
    Modes[Modes["DECRYPT"] = 1] = "DECRYPT";
})(Modes || (Modes = {}));
class NexoCrypto {
    static encrypt(messageHeader, saleToPoiMessageJson, securityKey) {
        const derivedKey = nexoDerivedKeyGenerator_1.default.deriveKeyMaterial(securityKey.Passphrase);
        const saleToPoiMessageByteArray = Buffer.from(saleToPoiMessageJson, "utf-8");
        const ivNonce = NexoCrypto.generateRandomIvNonce();
        const encryptedSaleToPoiMessage = NexoCrypto.crypt(saleToPoiMessageByteArray, derivedKey, ivNonce, Modes.ENCRYPT);
        const encryptedSaleToPoiMessageHmac = NexoCrypto.hmac(saleToPoiMessageByteArray, derivedKey);
        const securityTrailer = {
            AdyenCryptoVersion: securityKey.AdyenCryptoVersion,
            Hmac: encryptedSaleToPoiMessageHmac.toString("base64"),
            KeyIdentifier: securityKey.KeyIdentifier,
            KeyVersion: securityKey.KeyVersion,
            Nonce: ivNonce.toString("base64"),
        };
        return {
            MessageHeader: messageHeader,
            NexoBlob: encryptedSaleToPoiMessage.toString("base64"),
            SecurityTrailer: securityTrailer,
        };
    }
    decrypt(saleToPoiSecureMessage, securityKey) {
        NexoCrypto.validateSecurityKey(securityKey);
        const encryptedSaleToPoiMessageByteArray = Buffer.from(saleToPoiSecureMessage.NexoBlob, "base64");
        const derivedKey = nexoDerivedKeyGenerator_1.default.deriveKeyMaterial(securityKey.Passphrase);
        const ivNonce = Buffer.from(saleToPoiSecureMessage.SecurityTrailer.Nonce, "base64");
        const decryptedSaleToPoiMessageByteArray = NexoCrypto.crypt(encryptedSaleToPoiMessageByteArray, derivedKey, ivNonce, Modes.DECRYPT);
        const receivedHmac = Buffer.from(saleToPoiSecureMessage.SecurityTrailer.Hmac, "base64");
        this.validateHmac(receivedHmac, decryptedSaleToPoiMessageByteArray, derivedKey);
        return decryptedSaleToPoiMessageByteArray.toString("utf-8");
    }
    static validateSecurityKey(securityKey) {
        const isValid = securityKey
            && securityKey.Passphrase
            && securityKey.KeyIdentifier
            && !isNaN(securityKey.KeyVersion)
            && !isNaN(securityKey.AdyenCryptoVersion);
        if (!isValid) {
            throw new invalidSecurityKeyException_1.default("Invalid Security Key");
        }
    }
    static crypt(bytes, dk, ivNonce, mode) {
        const actualIV = Buffer.alloc(nexoConstants_1.NexoEnum.IV_LENGTH);
        for (let i = 0; i < nexoConstants_1.NexoEnum.IV_LENGTH; i++) {
            actualIV[i] = dk.iv[i] ^ ivNonce[i];
        }
        const cipher = mode === Modes.ENCRYPT
            ? (0, crypto_1.createCipheriv)("aes-256-cbc", dk.cipherKey, actualIV)
            : (0, crypto_1.createDecipheriv)("aes-256-cbc", dk.cipherKey, actualIV);
        let encrypted = cipher.update(bytes);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted;
    }
    static hmac(bytes, derivedKey) {
        const mac = (0, crypto_1.createHmac)("sha256", derivedKey.hmacKey);
        return mac.update(bytes).digest();
    }
    static generateRandomIvNonce() {
        return (0, crypto_1.randomBytes)(nexoConstants_1.NexoEnum.IV_LENGTH);
    }
    validateHmac(receivedHmac, decryptedMessage, derivedKey) {
        const hmac = NexoCrypto.hmac(decryptedMessage, derivedKey);
        if (!(0, crypto_1.timingSafeEqual)(hmac, receivedHmac)) {
            throw new nexoCryptoException_1.default("Hmac validation failed");
        }
    }
}
exports.default = NexoCrypto;
//# sourceMappingURL=nexoCrypto.js.map