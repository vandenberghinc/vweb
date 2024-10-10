export declare class Counterparty {
    /**
    * The identifier of the receiving account holder. The payout will default to the primary balance account of this account holder if no `balanceAccountId` is provided.
    */
    'accountHolderId'?: string;
    /**
    * The identifier of the balance account that belongs to the receiving account holder.
    */
    'balanceAccountId'?: string;
    /**
    * The identifier of the transfer instrument that belongs to the legal entity of the account holder.
    */
    'transferInstrumentId'?: string;
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
