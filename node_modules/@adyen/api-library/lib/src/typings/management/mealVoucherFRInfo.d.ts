export declare class MealVoucherFRInfo {
    /**
    * Meal Voucher conecsId. Format: digits only
    */
    'conecsId': string;
    /**
    * Meal Voucher siret. Format: 14 digits.
    */
    'siret': string;
    /**
    * The list of additional payment methods. Allowed values: **mealVoucher_FR_edenred**, **mealVoucher_FR_groupeup**, **mealVoucher_FR_natixis**, **mealVoucher_FR_sodexo**.
    */
    'subTypes': Array<string>;
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
