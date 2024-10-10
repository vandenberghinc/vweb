export declare class AdditionalDataRisk {
    /**
    * The data for your custom risk field. For more information, refer to [Create custom risk fields](https://docs.adyen.com/risk-management/configure-custom-risk-rules#step-1-create-custom-risk-fields).
    */
    'riskdata__customFieldName'?: string;
    /**
    * The price of item in the basket, represented in [minor units](https://docs.adyen.com/development-resources/currency-codes).
    */
    'riskdata_basket_item_itemNr_amountPerItem'?: string;
    /**
    * Brand of the item.
    */
    'riskdata_basket_item_itemNr_brand'?: string;
    /**
    * Category of the item.
    */
    'riskdata_basket_item_itemNr_category'?: string;
    /**
    * Color of the item.
    */
    'riskdata_basket_item_itemNr_color'?: string;
    /**
    * The three-character [ISO currency code](https://en.wikipedia.org/wiki/ISO_4217).
    */
    'riskdata_basket_item_itemNr_currency'?: string;
    /**
    * ID of the item.
    */
    'riskdata_basket_item_itemNr_itemID'?: string;
    /**
    * Manufacturer of the item.
    */
    'riskdata_basket_item_itemNr_manufacturer'?: string;
    /**
    * A text description of the product the invoice line refers to.
    */
    'riskdata_basket_item_itemNr_productTitle'?: string;
    /**
    * Quantity of the item purchased.
    */
    'riskdata_basket_item_itemNr_quantity'?: string;
    /**
    * Email associated with the given product in the basket (usually in electronic gift cards).
    */
    'riskdata_basket_item_itemNr_receiverEmail'?: string;
    /**
    * Size of the item.
    */
    'riskdata_basket_item_itemNr_size'?: string;
    /**
    * [Stock keeping unit](https://en.wikipedia.org/wiki/Stock_keeping_unit).
    */
    'riskdata_basket_item_itemNr_sku'?: string;
    /**
    * [Universal Product Code](https://en.wikipedia.org/wiki/Universal_Product_Code).
    */
    'riskdata_basket_item_itemNr_upc'?: string;
    /**
    * Code of the promotion.
    */
    'riskdata_promotions_promotion_itemNr_promotionCode'?: string;
    /**
    * The discount amount of the promotion, represented in [minor units](https://docs.adyen.com/development-resources/currency-codes).
    */
    'riskdata_promotions_promotion_itemNr_promotionDiscountAmount'?: string;
    /**
    * The three-character [ISO currency code](https://en.wikipedia.org/wiki/ISO_4217).
    */
    'riskdata_promotions_promotion_itemNr_promotionDiscountCurrency'?: string;
    /**
    * Promotion\'s percentage discount. It is represented in percentage value and there is no need to include the \'%\' sign.  e.g. for a promotion discount of 30%, the value of the field should be 30.
    */
    'riskdata_promotions_promotion_itemNr_promotionDiscountPercentage'?: string;
    /**
    * Name of the promotion.
    */
    'riskdata_promotions_promotion_itemNr_promotionName'?: string;
    /**
    * Reference number of the risk profile that you want to apply to the payment. If not provided or left blank, the merchant-level account\'s default risk profile will be applied to the payment. For more information, see [dynamically assign a risk profile to a payment](https://docs.adyen.com/risk-management/create-and-use-risk-profiles#dynamically-assign-a-risk-profile-to-a-payment).
    */
    'riskdata_riskProfileReference'?: string;
    /**
    * If this parameter is provided with the value **true**, risk checks for the payment request are skipped and the transaction will not get a risk score.
    */
    'riskdata_skipRisk'?: string;
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
