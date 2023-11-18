export declare class StoreDetailResponse {
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
    * The token which you can use later on for submitting the payout.
    */
    'recurringDetailReference': string;
    /**
    * The result code of the transaction. `Success` indicates that the details were stored successfully.
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
