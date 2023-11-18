export declare class PaymentMethodGroup {
    /**
    * The name of the group.
    */
    'name'?: string;
    /**
    * Echo data to be used if the payment method is displayed as part of this group.
    */
    'paymentMethodData'?: string;
    /**
    * The unique code of the group.
    */
    'type'?: string;
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
