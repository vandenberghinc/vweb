export declare class AdditionalBankIdentification {
    /**
    * The value of the additional bank identification.
    */
    'code'?: string;
    /**
    * The type of additional bank identification, depending on the country.  Possible values:   * **gbSortCode**: The 6-digit [UK sort code](https://en.wikipedia.org/wiki/Sort_code), without separators or spaces  * **usRoutingNumber**: The 9-digit [routing number](https://en.wikipedia.org/wiki/ABA_routing_transit_number), without separators or spaces.
    */
    'type'?: AdditionalBankIdentification.TypeEnum;
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
export declare namespace AdditionalBankIdentification {
    enum TypeEnum {
        GbSortCode = "gbSortCode",
        UsRoutingNumber = "usRoutingNumber"
    }
}
