import { ViasAddress } from './viasAddress';
import { ViasPhoneNumber } from './viasPhoneNumber';
export declare class StoreDetail {
    'address': ViasAddress;
    /**
    * The phone number of the store provided as a single string.  It will be handled as a landline phone.  Examples: \"0031 6 11 22 33 44\", \"+316/1122-3344\", \"(0031) 611223344\"
    */
    'fullPhoneNumber'?: string;
    /**
    * Store logo for payment method setup.
    */
    'logo'?: string;
    /**
    * The merchant account to which the store belongs.
    */
    'merchantAccount': string;
    /**
    * The merchant category code (MCC) that classifies the business of the account holder.
    */
    'merchantCategoryCode': string;
    /**
    * Merchant house number for payment method setup.
    */
    'merchantHouseNumber'?: string;
    'phoneNumber'?: ViasPhoneNumber;
    /**
    * The sales channel. Possible values: **Ecommerce**, **POS**.
    */
    'shopperInteraction'?: StoreDetail.ShopperInteractionEnum;
    /**
    * The unique reference for the split configuration, returned when you configure splits in your Customer Area. When this is provided, the `virtualAccount` is also required. Adyen uses the configuration and the `virtualAccount` to split funds between accounts in your platform.
    */
    'splitConfigurationUUID'?: string;
    /**
    * The status of the store. Possible values: **Pending**, **Active**, **Inactive**, **InactiveWithModifications**, **Closed**.
    */
    'status'?: StoreDetail.StatusEnum;
    /**
    * Adyen-generated unique alphanumeric identifier (UUID) for the store, returned in the response when you create a store. Required when updating an existing store in an `/updateAccountHolder` request.
    */
    'store'?: string;
    /**
    * The name of the account holder\'s store. This value is shown in shopper statements.  * Length: Between 3 to 22 characters   * The following characters are *not* supported: **:;}{$#@!|<>%^*+=\\\\**
    */
    'storeName'?: string;
    /**
    * Your unique identifier for the store. The Customer Area also uses this value for the store description.   * Length: Between 3 to 128 characters  * The following characters are *not* supported: **:;}{$#@!|<>%^*+=\\\\**
    */
    'storeReference'?: string;
    /**
    * The account holder\'s `accountCode` where the split amount will be sent. Required when you provide the `splitConfigurationUUID`.
    */
    'virtualAccount'?: string;
    /**
    * URL of the ecommerce store.
    */
    'webAddress'?: string;
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
export declare namespace StoreDetail {
    enum ShopperInteractionEnum {
        Ecommerce = "Ecommerce",
        Pos = "POS"
    }
    enum StatusEnum {
        Active = "Active",
        Closed = "Closed",
        Inactive = "Inactive",
        InactiveWithModifications = "InactiveWithModifications",
        Pending = "Pending"
    }
}
