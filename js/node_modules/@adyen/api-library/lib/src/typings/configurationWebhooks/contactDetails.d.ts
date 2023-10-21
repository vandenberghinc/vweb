import { Address } from './address';
import { Phone } from './phone';
export declare class ContactDetails {
    'address': Address;
    /**
    * The email address of the account holder.
    */
    'email': string;
    'phone': Phone;
    /**
    * The URL of the account holder\'s website.
    */
    'webAddress'?: string;
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
