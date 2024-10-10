export declare class InternalCategoryData {
    /**
    * The capture\'s merchant reference included in the transfer.
    */
    'modificationMerchantReference'?: string;
    /**
    * The capture reference included in the transfer.
    */
    'modificationPspReference'?: string;
    /**
    * **internal**
    */
    'type'?: InternalCategoryData.TypeEnum;
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
export declare namespace InternalCategoryData {
    enum TypeEnum {
        Internal = "internal"
    }
}
