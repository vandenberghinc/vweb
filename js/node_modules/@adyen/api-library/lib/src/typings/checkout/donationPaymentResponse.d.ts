import { Amount } from './amount';
import { PaymentResponse } from './paymentResponse';
export declare class DonationPaymentResponse {
    'amount'?: Amount;
    /**
    * The Adyen account name of your charity. We will provide you with this account name once your chosen charity has been [onboarded](https://docs.adyen.com/online-payments/donations#onboarding).
    */
    'donationAccount'?: string;
    /**
    * Your unique resource identifier.
    */
    'id'?: string;
    /**
    * The merchant account identifier, with which you want to process the transaction.
    */
    'merchantAccount'?: string;
    'payment'?: PaymentResponse;
    /**
    * The reference to uniquely identify a payment. This reference is used in all communication with you about the payment status. We recommend using a unique value per payment; however, it is not a requirement. If you need to provide multiple references for a transaction, separate them with hyphens (\"-\"). Maximum length: 80 characters.
    */
    'reference'?: string;
    /**
    * The status of the donation transaction.  Possible values: * **completed** * **pending** * **refused**
    */
    'status'?: DonationPaymentResponse.StatusEnum;
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
export declare namespace DonationPaymentResponse {
    enum StatusEnum {
        Completed = "completed",
        Pending = "pending",
        Refused = "refused"
    }
}
