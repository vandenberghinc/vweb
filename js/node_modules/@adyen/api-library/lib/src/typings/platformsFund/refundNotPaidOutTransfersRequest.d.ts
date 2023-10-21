export declare class RefundNotPaidOutTransfersRequest {
    /**
    * The code of the account from which to perform the refund(s).
    */
    'accountCode': string;
    /**
    * The code of the Account Holder which owns the account from which to perform the refund(s).
    */
    'accountHolderCode': string;
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
