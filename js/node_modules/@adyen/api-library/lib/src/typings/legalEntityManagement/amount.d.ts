export declare class Amount {
    /**
    * The type of currency. Must be EUR (or EUR equivalent)
    */
    'currency'?: string;
    /**
    * Total value of amount. Must be >= 0
    */
    'value'?: number;
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
