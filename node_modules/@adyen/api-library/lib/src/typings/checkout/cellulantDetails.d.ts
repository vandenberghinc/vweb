export declare class CellulantDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The Cellulant issuer.
    */
    'issuer'?: string;
    /**
    * **Cellulant**
    */
    'type'?: CellulantDetails.TypeEnum;
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
export declare namespace CellulantDetails {
    enum TypeEnum {
        Cellulant = "cellulant"
    }
}
