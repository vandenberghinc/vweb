export declare class StringMatch {
    /**
    * The type of string matching operation. Possible values:  **startsWith**, **endsWith**, **isEqualTo**, **contains**,
    */
    'operation'?: StringMatch.OperationEnum;
    /**
    * The string to be matched.
    */
    'value'?: string;
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
export declare namespace StringMatch {
    enum OperationEnum {
        Contains = "contains",
        EndsWith = "endsWith",
        IsEqualTo = "isEqualTo",
        StartsWith = "startsWith"
    }
}
