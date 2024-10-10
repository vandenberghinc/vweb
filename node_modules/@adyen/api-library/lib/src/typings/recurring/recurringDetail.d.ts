import { Address } from './address';
import { BankAccount } from './bankAccount';
import { Card } from './card';
import { Name } from './name';
import { TokenDetails } from './tokenDetails';
export declare class RecurringDetail {
    /**
    * This field contains additional data, which may be returned in a particular response.  The additionalData object consists of entries, each of which includes the key and value.
    */
    'additionalData'?: {
        [key: string]: string;
    };
    /**
    * The alias of the credit card number.  Applies only to recurring contracts storing credit card details
    */
    'alias'?: string;
    /**
    * The alias type of the credit card number.  Applies only to recurring contracts storing credit card details.
    */
    'aliasType'?: string;
    'bank'?: BankAccount;
    'billingAddress'?: Address;
    'card'?: Card;
    /**
    * Types of recurring contracts.
    */
    'contractTypes'?: Array<string>;
    /**
    * The date when the recurring details were created.
    */
    'creationDate'?: Date;
    /**
    * The `pspReference` of the first recurring payment that created the recurring detail.
    */
    'firstPspReference'?: string;
    /**
    * An optional descriptive name for this recurring detail.
    */
    'name'?: string;
    /**
    * Returned in the response if you are not tokenizing with Adyen and are using the Merchant-initiated transactions (MIT) framework from Mastercard or Visa.  This contains either the Mastercard Trace ID or the Visa Transaction ID.
    */
    'networkTxReference'?: string;
    /**
    * The  type or sub-brand of a payment method used, e.g. Visa Debit, Visa Corporate, etc. For more information, refer to [PaymentMethodVariant](https://docs.adyen.com/development-resources/paymentmethodvariant).
    */
    'paymentMethodVariant'?: string;
    /**
    * The reference that uniquely identifies the recurring detail.
    */
    'recurringDetailReference': string;
    'shopperName'?: Name;
    /**
    * A shopper\'s social security number (only in countries where it is legal to collect).
    */
    'socialSecurityNumber'?: string;
    'tokenDetails'?: TokenDetails;
    /**
    * The payment method, such as “mc\", \"visa\", \"ideal\", \"paypal\".
    */
    'variant': string;
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
