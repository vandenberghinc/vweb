export declare class PhoneNumber {
    /**
    * The full phone number, including the country code. For example, **+3112345678**.
    */
    'number': string;
    /**
    * The type of phone number.  Possible values: **mobile**, **landline**, **sip**, **fax.**
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
