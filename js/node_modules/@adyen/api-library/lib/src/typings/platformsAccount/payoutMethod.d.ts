export declare class PayoutMethod {
    /**
    * The [`merchantAccount`](https://docs.adyen.com/api-explorer/#/CheckoutService/latest/post/payments__reqParam_merchantAccount) you used in the `/payments` request when you [saved the account holder\'s card details](https://docs.adyen.com/marketplaces-and-platforms/classic/payouts/manual-payout/payout-to-cards#check-and-store).
    */
    'merchantAccount': string;
    /**
    * Adyen-generated unique alphanumeric identifier (UUID) for the payout method, returned in the response when you create a payout method. Required when updating an existing payout method in an `/updateAccountHolder` request.
    */
    'payoutMethodCode'?: string;
    /**
    * Your reference for the payout method.
    */
    'payoutMethodReference'?: string;
    /**
    * The [`recurringDetailReference`](https://docs.adyen.com/api-explorer/#/CheckoutService/latest/post/payments__resParam_additionalData-ResponseAdditionalDataCommon-recurring-recurringDetailReference)  returned in the `/payments` response when you [saved the account holder\'s card details](https://docs.adyen.com/marketplaces-and-platforms/classic/payouts/manual-payout/payout-to-cards#check-and-store).
    */
    'recurringDetailReference': string;
    /**
    * The [`shopperReference`](https://docs.adyen.com/api-explorer/#/CheckoutService/latest/post/payments__reqParam_shopperReference) you sent in the `/payments` request when you [saved the account holder\'s card details](https://docs.adyen.com/marketplaces-and-platforms/classic/payouts/manual-payout/payout-to-cards#check-and-store).
    */
    'shopperReference': string;
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
