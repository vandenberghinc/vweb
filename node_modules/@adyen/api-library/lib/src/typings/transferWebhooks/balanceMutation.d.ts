export declare class BalanceMutation {
    /**
    * The amount in the payment\'s currency that is debited or credited on the balance accounting register.
    */
    'balance'?: number;
    /**
    * The three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes).
    */
    'currency'?: string;
    /**
    * The amount in the payment\'s currency that is debited or credited on the received accounting register.
    */
    'received'?: number;
    /**
    * The amount in the payment\'s currency that is debited or credited on the reserved accounting register.
    */
    'reserved'?: number;
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
