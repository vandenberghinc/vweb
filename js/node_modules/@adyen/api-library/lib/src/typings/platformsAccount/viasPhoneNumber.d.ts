export declare class ViasPhoneNumber {
    /**
    * The two-character country code of the phone number. >The permitted country codes are defined in ISO-3166-1 alpha-2 (e.g. \'NL\').
    */
    'phoneCountryCode'?: string;
    /**
    * The phone number. >The inclusion of the phone number country code is not necessary.
    */
    'phoneNumber'?: string;
    /**
    * The type of the phone number. >The following values are permitted: `Landline`, `Mobile`, `SIP`, `Fax`.
    */
    'phoneType'?: ViasPhoneNumber.PhoneTypeEnum;
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
export declare namespace ViasPhoneNumber {
    enum PhoneTypeEnum {
        Fax = "Fax",
        Landline = "Landline",
        Mobile = "Mobile",
        Sip = "SIP"
    }
}
