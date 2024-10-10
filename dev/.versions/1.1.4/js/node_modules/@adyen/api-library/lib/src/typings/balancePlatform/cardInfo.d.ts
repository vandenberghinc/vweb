import { Authentication } from './authentication';
import { CardConfiguration } from './cardConfiguration';
import { DeliveryContact } from './deliveryContact';
export declare class CardInfo {
    'authentication'?: Authentication;
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
    'deliveryContact'?: DeliveryContact;
    /**
    * The form factor of the card. Possible values: **virtual**, **physical**.
    */
    'formFactor': CardInfo.FormFactorEnum;
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
export declare namespace CardInfo {
    enum FormFactorEnum {
        Physical = "physical",
        Unknown = "unknown",
        Virtual = "virtual"
    }
}
