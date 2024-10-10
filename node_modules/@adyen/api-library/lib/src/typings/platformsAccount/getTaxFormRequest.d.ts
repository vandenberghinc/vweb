export declare class GetTaxFormRequest {
    /**
    * The account holder code you provided when you created the account holder.
    */
    'accountHolderCode': string;
    /**
    * Type of the requested tax form. For example, 1099-K.
    */
    'formType': string;
    /**
    * Applicable tax year in the YYYY format.
    */
    'year': number;
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
