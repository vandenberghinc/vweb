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
const apiConstants_1 = require("../constants/apiConstants");
class HmacValidator {
    calculateHmac(data, key) {
        const dataString = typeof data !== "string" ? this.getDataToSign(data) : data;
        const rawKey = Buffer.from(key, "hex");
        return (0, crypto_1.createHmac)(HmacValidator.HMAC_SHA256_ALGORITHM, rawKey).update(dataString, "utf8").digest("base64");
    }
    validateBankingHMAC(hmacKey, hmacSign, notification) {
        const expectedSign = (0, crypto_1.createHmac)(HmacValidator.HMAC_SHA256_ALGORITHM, Buffer.from(hmacSign, "hex")).update(notification, "utf8").digest("base64");
        if ((hmacKey === null || hmacKey === void 0 ? void 0 : hmacKey.length) === expectedSign.length) {
            return (0, crypto_1.timingSafeEqual)(Buffer.from(expectedSign, "base64"), Buffer.from(hmacKey, "base64"));
        }
        return false;
    }
    validateHMAC(notificationRequestItem, key) {
        var _a, _b;
        if ((_a = notificationRequestItem.additionalData) === null || _a === void 0 ? void 0 : _a[apiConstants_1.ApiConstants.HMAC_SIGNATURE]) {
            const expectedSign = this.calculateHmac(notificationRequestItem, key);
            const merchantSign = (_b = notificationRequestItem.additionalData) === null || _b === void 0 ? void 0 : _b[apiConstants_1.ApiConstants.HMAC_SIGNATURE];
            if ((merchantSign === null || merchantSign === void 0 ? void 0 : merchantSign.length) === expectedSign.length) {
                return (0, crypto_1.timingSafeEqual)(Buffer.from(expectedSign, "base64"), Buffer.from(merchantSign, "base64"));
            }
            return false;
        }
        throw Error(`Missing ${apiConstants_1.ApiConstants.HMAC_SIGNATURE}`);
    }
    isNotificationRequestItem(item) {
        return !Object.values(item).every((value) => typeof value === "string");
    }
    getDataToSign(notificationRequestItem) {
        if (this.isNotificationRequestItem(notificationRequestItem)) {
            const signedDataList = [];
            signedDataList.push(notificationRequestItem.pspReference);
            signedDataList.push(notificationRequestItem.originalReference);
            signedDataList.push(notificationRequestItem.merchantAccountCode);
            signedDataList.push(notificationRequestItem.merchantReference);
            signedDataList.push(notificationRequestItem.amount.value);
            signedDataList.push(notificationRequestItem.amount.currency);
            signedDataList.push(notificationRequestItem.eventCode);
            signedDataList.push(notificationRequestItem.success);
            return signedDataList.join(HmacValidator.DATA_SEPARATOR);
        }
        else {
            const keys = [];
            const values = [];
            const replacer = (str) => str.replace(/\\/g, "\\\\").replace(/:/g, "\\:");
            Object.entries(notificationRequestItem).sort().forEach(([key, value]) => {
                keys.push(replacer(key));
                values.push(replacer(value));
            });
            return [...keys, ...values].join(HmacValidator.DATA_SEPARATOR);
        }
    }
}
HmacValidator.HMAC_SHA256_ALGORITHM = "sha256";
HmacValidator.DATA_SEPARATOR = ":";
exports.default = HmacValidator;
//# sourceMappingURL=hmacValidator.js.map