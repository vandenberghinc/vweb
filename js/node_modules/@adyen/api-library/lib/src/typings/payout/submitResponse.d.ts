export declare class SubmitResponse {
    /**
    * This field contains additional data, which may be returned in a particular response.
    */
    'additionalData'?: {
        [key: string]: string;
    };
    /**
    * A new reference to uniquely identify this request.
    */
    'pspReference': string;
    /**
    * In case of refusal, an informational message for the reason.
    */
    'refusalReason'?: string;
    /**
    * The response: * In case of success, it is `payout-submit-received`. * In case of an error, an informational message is returned.
    */
    'resultCode': string;
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
