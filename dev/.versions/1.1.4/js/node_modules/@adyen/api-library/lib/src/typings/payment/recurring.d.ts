export declare class Recurring {
    /**
    * The type of recurring contract to be used. Possible values: * `ONECLICK` – Payment details can be used to initiate a one-click payment, where the shopper enters the [card security code (CVC/CVV)](https://docs.adyen.com/payments-fundamentals/payment-glossary#card-security-code-cvc-cvv-cid). * `RECURRING` – Payment details can be used without the card security code to initiate [card-not-present transactions](https://docs.adyen.com/payments-fundamentals/payment-glossary#card-not-present-cnp). * `ONECLICK,RECURRING` – Payment details can be used regardless of whether the shopper is on your site or not. * `PAYOUT` – Payment details can be used to [make a payout](https://docs.adyen.com/online-payments/online-payouts).
    */
    'contract'?: Recurring.ContractEnum;
    /**
    * A descriptive name for this detail.
    */
    'recurringDetailName'?: string;
    /**
    * Date after which no further authorisations shall be performed. Only for 3D Secure 2.
    */
    'recurringExpiry'?: Date;
    /**
    * Minimum number of days between authorisations. Only for 3D Secure 2.
    */
    'recurringFrequency'?: string;
    /**
    * The name of the token service.
    */
    'tokenService'?: Recurring.TokenServiceEnum;
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
export declare namespace Recurring {
    enum ContractEnum {
        Oneclick = "ONECLICK",
        Recurring = "RECURRING",
        Payout = "PAYOUT"
    }
    enum TokenServiceEnum {
        Visatokenservice = "VISATOKENSERVICE",
        Mctokenservice = "MCTOKENSERVICE",
        Amextokenservice = "AMEXTOKENSERVICE",
        TokenSharing = "TOKEN_SHARING"
    }
}
