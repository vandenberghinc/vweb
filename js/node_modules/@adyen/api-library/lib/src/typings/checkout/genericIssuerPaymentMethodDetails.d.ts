export declare class GenericIssuerPaymentMethodDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The issuer id of the shopper\'s selected bank.
    */
    'issuer': string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'recurringDetailReference'?: string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'storedPaymentMethodId'?: string;
    /**
    * **genericissuer**
    */
    'type': GenericIssuerPaymentMethodDetails.TypeEnum;
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
export declare namespace GenericIssuerPaymentMethodDetails {
    enum TypeEnum {
        OnlineBankingPl = "onlineBanking_PL",
        Eps = "eps",
        OnlineBankingSk = "onlineBanking_SK",
        OnlineBankingCz = "onlineBanking_CZ"
    }
}
