import { Address } from './address';
import { Card } from './card';
import { Name } from './name';
export declare class FundSource {
    /**
    * A map of name-value pairs for passing additional or industry-specific data.
    */
    'additionalData'?: {
        [key: string]: string;
    };
    'billingAddress'?: Address;
    'card'?: Card;
    /**
    * Email address of the person.
    */
    'shopperEmail'?: string;
    'shopperName'?: Name;
    /**
    * Phone number of the person
    */
    'telephoneNumber'?: string;
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
