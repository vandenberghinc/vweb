export declare class OrderItem {
    /**
    * The unique identifier of the product.
    */
    'id'?: string;
    /**
    * The number of installments for the specified product `id`.
    */
    'installments'?: number;
    /**
    * The name of the product.
    */
    'name'?: string;
    /**
    * The number of items with the specified product `id` included in the order.
    */
    'quantity'?: number;
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
