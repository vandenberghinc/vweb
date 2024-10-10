export declare class GetUploadedDocumentsRequest {
    /**
    * The code of the Account Holder for which to retrieve the documents.
    */
    'accountHolderCode': string;
    /**
    * The code of the Bank Account for which to retrieve the documents.
    */
    'bankAccountUUID'?: string;
    /**
    * The code of the Shareholder for which to retrieve the documents.
    */
    'shareholderCode'?: string;
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
