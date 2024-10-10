export declare class PhoneNumber {
    /**
    * The two-character ISO-3166-1 alpha-2 country code of the phone number. For example, **US** or **NL**.
    */
    'phoneCountryCode'?: string;
    /**
    * The phone number. The inclusion of the phone number country code is not necessary.
    */
    'phoneNumber'?: string;
    /**
    * The type of the phone number. Possible values: **Landline**, **Mobile**, **SIP**, **Fax**.
    */
    'phoneType'?: PhoneNumber.PhoneTypeEnum;
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
export declare namespace PhoneNumber {
    enum PhoneTypeEnum {
        Fax = "Fax",
        Landline = "Landline",
        Mobile = "Mobile",
        Sip = "SIP"
    }
}
