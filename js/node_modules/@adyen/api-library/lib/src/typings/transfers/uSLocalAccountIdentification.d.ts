export declare class USLocalAccountIdentification {
    /**
    * The bank account number, without separators or whitespace.
    */
    'accountNumber': string;
    /**
    * The bank account type.  Possible values: **checking** or **savings**. Defaults to **checking**.
    */
    'accountType'?: USLocalAccountIdentification.AccountTypeEnum;
    /**
    * The 9-digit [routing number](https://en.wikipedia.org/wiki/ABA_routing_transit_number), without separators or whitespace.
    */
    'routingNumber': string;
    /**
    * **usLocal**
    */
    'type': USLocalAccountIdentification.TypeEnum;
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
export declare namespace USLocalAccountIdentification {
    enum AccountTypeEnum {
        Checking = "checking",
        Savings = "savings"
    }
    enum TypeEnum {
        UsLocal = "usLocal"
    }
}
