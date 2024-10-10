export declare class Contact {
    /**
    * The individual\'s email address.
    */
    'email'?: string;
    /**
    * The individual\'s first name.
    */
    'firstName'?: string;
    /**
    * The infix in the individual\'s name, if any.
    */
    'infix'?: string;
    /**
    * The individual\'s last name.
    */
    'lastName'?: string;
    /**
    * The individual\'s phone number, specified as 10-14 digits with an optional `+` prefix.
    */
    'phoneNumber'?: string;
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
