import { Authentication } from './authentication';
import { CardConfiguration } from './cardConfiguration';
import { DeliveryContact } from './deliveryContact';
import { Expiry } from './expiry';
export declare class Card {
    'authentication'?: Authentication;
    /**
    * The bank identification number (BIN) of the card number.
    */
    'bin'?: string;
    /**
    * The brand of the physical or the virtual card. Possible values: **visa**, **mc**.
    */
    'brand': string;
    /**
    * The brand variant of the physical or the virtual card. For example, **visadebit** or **mcprepaid**. >Reach out to your Adyen contact to get the values relevant for your integration.
    */
    'brandVariant': string;
    /**
    * The name of the cardholder.  Maximum length: 26 characters.
    */
    'cardholderName': string;
    'configuration'?: CardConfiguration;
    /**
    * The CVC2 value of the card. > The CVC2 is not sent by default. This is only returned in the `POST` response for single-use virtual cards.
    */
    'cvc'?: string;
    'deliveryContact'?: DeliveryContact;
    'expiration'?: Expiry;
    /**
    * The form factor of the card. Possible values: **virtual**, **physical**.
    */
    'formFactor': Card.FormFactorEnum;
    /**
    * Last last four digits of the card number.
    */
    'lastFour'?: string;
    /**
    * The primary account number (PAN) of the card. > The PAN is masked by default and returned only for single-use virtual cards.
    */
    'number': string;
    /**
    * Allocates a specific product range for either a physical or a virtual card. Possible values: **fullySupported**, **secureCorporate**. >Reach out to your Adyen contact to get the values relevant for your integration.
    */
    'threeDSecure'?: string;
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
export declare namespace Card {
    enum FormFactorEnum {
        Physical = "physical",
        Unknown = "unknown",
        Virtual = "virtual"
    }
}
