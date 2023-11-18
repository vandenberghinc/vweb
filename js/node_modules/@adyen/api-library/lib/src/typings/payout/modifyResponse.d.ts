export declare class ModifyResponse {
    /**
    * This field contains additional data, which may be returned in a particular response.
    */
    'additionalData'?: {
        [key: string]: string;
    };
    /**
    * Adyen\'s 16-character string reference associated with the transaction. This value is globally unique; quote it when communicating with us about this response.
    */
    'pspReference': string;
    /**
    * The response: * In case of success, it is either `payout-confirm-received` or `payout-decline-received`. * In case of an error, an informational message is returned.
    */
    'response': string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
