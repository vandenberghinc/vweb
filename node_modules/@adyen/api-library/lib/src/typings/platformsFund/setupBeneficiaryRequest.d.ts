export declare class SetupBeneficiaryRequest {
    /**
    * The destination account code.
    */
    'destinationAccountCode': string;
    /**
    * A value that can be supplied at the discretion of the executing user.
    */
    'merchantReference'?: string;
    /**
    * The benefactor account.
    */
    'sourceAccountCode': string;
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
