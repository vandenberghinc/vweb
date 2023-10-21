export declare class AccountInfo {
    /**
    * Indicator for the length of time since this shopper account was created in the merchant\'s environment. Allowed values: * notApplicable * thisTransaction * lessThan30Days * from30To60Days * moreThan60Days
    */
    'accountAgeIndicator'?: AccountInfo.AccountAgeIndicatorEnum;
    /**
    * Date when the shopper\'s account was last changed.
    */
    'accountChangeDate'?: Date;
    /**
    * Indicator for the length of time since the shopper\'s account was last updated. Allowed values: * thisTransaction * lessThan30Days * from30To60Days * moreThan60Days
    */
    'accountChangeIndicator'?: AccountInfo.AccountChangeIndicatorEnum;
    /**
    * Date when the shopper\'s account was created.
    */
    'accountCreationDate'?: Date;
    /**
    * Indicates the type of account. For example, for a multi-account card product. Allowed values: * notApplicable * credit * debit
    */
    'accountType'?: AccountInfo.AccountTypeEnum;
    /**
    * Number of attempts the shopper tried to add a card to their account in the last day.
    */
    'addCardAttemptsDay'?: number;
    /**
    * Date the selected delivery address was first used.
    */
    'deliveryAddressUsageDate'?: Date;
    /**
    * Indicator for the length of time since this delivery address was first used. Allowed values: * thisTransaction * lessThan30Days * from30To60Days * moreThan60Days
    */
    'deliveryAddressUsageIndicator'?: AccountInfo.DeliveryAddressUsageIndicatorEnum;
    /**
    * Shopper\'s home phone number (including the country code).
    */
    'homePhone'?: string;
    /**
    * Shopper\'s mobile phone number (including the country code).
    */
    'mobilePhone'?: string;
    /**
    * Date when the shopper last changed their password.
    */
    'passwordChangeDate'?: Date;
    /**
    * Indicator when the shopper has changed their password. Allowed values: * notApplicable * thisTransaction * lessThan30Days * from30To60Days * moreThan60Days
    */
    'passwordChangeIndicator'?: AccountInfo.PasswordChangeIndicatorEnum;
    /**
    * Number of all transactions (successful and abandoned) from this shopper in the past 24 hours.
    */
    'pastTransactionsDay'?: number;
    /**
    * Number of all transactions (successful and abandoned) from this shopper in the past year.
    */
    'pastTransactionsYear'?: number;
    /**
    * Date this payment method was added to the shopper\'s account.
    */
    'paymentAccountAge'?: Date;
    /**
    * Indicator for the length of time since this payment method was added to this shopper\'s account. Allowed values: * notApplicable * thisTransaction * lessThan30Days * from30To60Days * moreThan60Days
    */
    'paymentAccountIndicator'?: AccountInfo.PaymentAccountIndicatorEnum;
    /**
    * Number of successful purchases in the last six months.
    */
    'purchasesLast6Months'?: number;
    /**
    * Whether suspicious activity was recorded on this account.
    */
    'suspiciousActivity'?: boolean;
    /**
    * Shopper\'s work phone number (including the country code).
    */
    'workPhone'?: string;
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
export declare namespace AccountInfo {
    enum AccountAgeIndicatorEnum {
        NotApplicable = "notApplicable",
        ThisTransaction = "thisTransaction",
        LessThan30Days = "lessThan30Days",
        From30To60Days = "from30To60Days",
        MoreThan60Days = "moreThan60Days"
    }
    enum AccountChangeIndicatorEnum {
        ThisTransaction = "thisTransaction",
        LessThan30Days = "lessThan30Days",
        From30To60Days = "from30To60Days",
        MoreThan60Days = "moreThan60Days"
    }
    enum AccountTypeEnum {
        NotApplicable = "notApplicable",
        Credit = "credit",
        Debit = "debit"
    }
    enum DeliveryAddressUsageIndicatorEnum {
        ThisTransaction = "thisTransaction",
        LessThan30Days = "lessThan30Days",
        From30To60Days = "from30To60Days",
        MoreThan60Days = "moreThan60Days"
    }
    enum PasswordChangeIndicatorEnum {
        NotApplicable = "notApplicable",
        ThisTransaction = "thisTransaction",
        LessThan30Days = "lessThan30Days",
        From30To60Days = "from30To60Days",
        MoreThan60Days = "moreThan60Days"
    }
    enum PaymentAccountIndicatorEnum {
        NotApplicable = "notApplicable",
        ThisTransaction = "thisTransaction",
        LessThan30Days = "lessThan30Days",
        From30To60Days = "from30To60Days",
        MoreThan60Days = "moreThan60Days"
    }
}
