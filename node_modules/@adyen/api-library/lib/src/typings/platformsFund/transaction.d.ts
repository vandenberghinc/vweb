import { Amount } from './amount';
import { BankAccountDetail } from './bankAccountDetail';
export declare class Transaction {
    'amount'?: Amount;
    'bankAccountDetail'?: BankAccountDetail;
    /**
    * The merchant reference of a related capture.
    */
    'captureMerchantReference'?: string;
    /**
    * The psp reference of a related capture.
    */
    'capturePspReference'?: string;
    /**
    * The date on which the transaction was performed.
    */
    'creationDate'?: Date;
    /**
    * A description of the transaction.
    */
    'description'?: string;
    /**
    * The code of the account to which funds were credited during an outgoing fund transfer.
    */
    'destinationAccountCode'?: string;
    /**
    * The psp reference of the related dispute.
    */
    'disputePspReference'?: string;
    /**
    * The reason code of a dispute.
    */
    'disputeReasonCode'?: string;
    /**
    * The merchant reference of a transaction.
    */
    'merchantReference'?: string;
    /**
    * The psp reference of the related authorisation or transfer.
    */
    'paymentPspReference'?: string;
    /**
    * The psp reference of the related payout.
    */
    'payoutPspReference'?: string;
    /**
    * The psp reference of a transaction.
    */
    'pspReference'?: string;
    /**
    * The code of the account from which funds were debited during an incoming fund transfer.
    */
    'sourceAccountCode'?: string;
    /**
    * The status of the transaction. >Permitted values: `PendingCredit`, `CreditFailed`, `CreditClosed`, `CreditSuspended`, `Credited`, `Converted`, `PendingDebit`, `DebitFailed`, `Debited`, `DebitReversedReceived`, `DebitedReversed`, `ChargebackReceived`, `Chargeback`, `ChargebackReversedReceived`, `ChargebackReversed`, `Payout`, `PayoutReversed`, `FundTransfer`, `PendingFundTransfer`, `ManualCorrected`.
    */
    'transactionStatus'?: Transaction.TransactionStatusEnum;
    /**
    * The transfer code of the transaction.
    */
    'transferCode'?: string;
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
export declare namespace Transaction {
    enum TransactionStatusEnum {
        BalanceNotPaidOutTransfer = "BalanceNotPaidOutTransfer",
        BalancePlatformSweep = "BalancePlatformSweep",
        BalancePlatformSweepReturned = "BalancePlatformSweepReturned",
        Chargeback = "Chargeback",
        ChargebackCorrection = "ChargebackCorrection",
        ChargebackCorrectionReceived = "ChargebackCorrectionReceived",
        ChargebackReceived = "ChargebackReceived",
        ChargebackReversed = "ChargebackReversed",
        ChargebackReversedCorrection = "ChargebackReversedCorrection",
        ChargebackReversedCorrectionReceived = "ChargebackReversedCorrectionReceived",
        ChargebackReversedReceived = "ChargebackReversedReceived",
        Converted = "Converted",
        CreditClosed = "CreditClosed",
        CreditFailed = "CreditFailed",
        CreditReversed = "CreditReversed",
        CreditReversedReceived = "CreditReversedReceived",
        CreditSuspended = "CreditSuspended",
        Credited = "Credited",
        DebitFailed = "DebitFailed",
        DebitReversedReceived = "DebitReversedReceived",
        Debited = "Debited",
        DebitedReversed = "DebitedReversed",
        DepositCorrectionCredited = "DepositCorrectionCredited",
        DepositCorrectionDebited = "DepositCorrectionDebited",
        Fee = "Fee",
        FundTransfer = "FundTransfer",
        FundTransferReversed = "FundTransferReversed",
        InvoiceDeductionCredited = "InvoiceDeductionCredited",
        InvoiceDeductionDebited = "InvoiceDeductionDebited",
        ManualCorrected = "ManualCorrected",
        ManualCorrectionCredited = "ManualCorrectionCredited",
        ManualCorrectionDebited = "ManualCorrectionDebited",
        MerchantPayin = "MerchantPayin",
        MerchantPayinReversed = "MerchantPayinReversed",
        Payout = "Payout",
        PayoutReversed = "PayoutReversed",
        PendingCredit = "PendingCredit",
        PendingDebit = "PendingDebit",
        PendingFundTransfer = "PendingFundTransfer",
        ReCredited = "ReCredited",
        ReCreditedReceived = "ReCreditedReceived",
        SecondChargeback = "SecondChargeback",
        SecondChargebackCorrection = "SecondChargebackCorrection",
        SecondChargebackCorrectionReceived = "SecondChargebackCorrectionReceived",
        SecondChargebackReceived = "SecondChargebackReceived"
    }
}
