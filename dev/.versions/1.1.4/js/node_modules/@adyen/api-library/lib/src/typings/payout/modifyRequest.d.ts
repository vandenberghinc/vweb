export declare class ModifyRequest {
    /**
    * This field contains additional data, which may be required for a particular payout request.
    */
    'additionalData'?: {
        [key: string]: string;
    };
    /**
    * The merchant account identifier, with which you want to process the transaction.
    */
    'merchantAccount': string;
    /**
    * The PSP reference received in the `/submitThirdParty` response.
    */
    'originalReference': string;
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
