import { Amount } from './amount';
export declare class MerchantRiskIndicator {
    /**
    * Whether the chosen delivery address is identical to the billing address.
    */
    'addressMatch'?: boolean;
    /**
    * Indicator regarding the delivery address. Allowed values: * `shipToBillingAddress` * `shipToVerifiedAddress` * `shipToNewAddress` * `shipToStore` * `digitalGoods` * `goodsNotShipped` * `other`
    */
    'deliveryAddressIndicator'?: MerchantRiskIndicator.DeliveryAddressIndicatorEnum;
    /**
    * The delivery email address (for digital goods).
    */
    'deliveryEmail'?: string;
    /**
    * For Electronic delivery, the email address to which the merchandise was delivered. Maximum length: 254 characters.
    */
    'deliveryEmailAddress'?: string;
    /**
    * The estimated delivery time for the shopper to receive the goods. Allowed values: * `electronicDelivery` * `sameDayShipping` * `overnightShipping` * `twoOrMoreDaysShipping`
    */
    'deliveryTimeframe'?: MerchantRiskIndicator.DeliveryTimeframeEnum;
    'giftCardAmount'?: Amount;
    /**
    * For prepaid or gift card purchase, total count of individual prepaid or gift cards/codes purchased.
    */
    'giftCardCount'?: number;
    /**
    * For prepaid or gift card purchase, [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) three-digit currency code of the gift card, other than those listed in Table A.5 of the EMVCo 3D Secure Protocol and Core Functions Specification.
    */
    'giftCardCurr'?: string;
    /**
    * For pre-order purchases, the expected date this product will be available to the shopper.
    */
    'preOrderDate'?: Date;
    /**
    * Indicator for whether this transaction is for pre-ordering a product.
    */
    'preOrderPurchase'?: boolean;
    /**
    * Indicates whether Cardholder is placing an order for merchandise with a future availability or release date.
    */
    'preOrderPurchaseInd'?: string;
    /**
    * Indicator for whether the shopper has already purchased the same items in the past.
    */
    'reorderItems'?: boolean;
    /**
    * Indicates whether the cardholder is reordering previously purchased merchandise.
    */
    'reorderItemsInd'?: string;
    /**
    * Indicates shipping method chosen for the transaction.
    */
    'shipIndicator'?: string;
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
export declare namespace MerchantRiskIndicator {
    enum DeliveryAddressIndicatorEnum {
        ShipToBillingAddress = "shipToBillingAddress",
        ShipToVerifiedAddress = "shipToVerifiedAddress",
        ShipToNewAddress = "shipToNewAddress",
        ShipToStore = "shipToStore",
        DigitalGoods = "digitalGoods",
        GoodsNotShipped = "goodsNotShipped",
        Other = "other"
    }
    enum DeliveryTimeframeEnum {
        ElectronicDelivery = "electronicDelivery",
        SameDayShipping = "sameDayShipping",
        OvernightShipping = "overnightShipping",
        TwoOrMoreDaysShipping = "twoOrMoreDaysShipping"
    }
}
