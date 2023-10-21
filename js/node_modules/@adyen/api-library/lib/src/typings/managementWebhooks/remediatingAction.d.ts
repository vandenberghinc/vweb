export declare class RemediatingAction {
    /**
    * The remediating action code.
    */
    'code'?: string;
    /**
    * A description of how you can resolve the verification error.
    */
    'message'?: string;
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
