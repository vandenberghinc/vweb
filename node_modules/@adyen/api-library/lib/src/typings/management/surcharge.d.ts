import { Configuration } from './configuration';
export declare class Surcharge {
    /**
    * Show the surcharge details on the terminal, so the shopper can confirm.
    */
    'askConfirmation'?: boolean;
    /**
    * Surcharge fees or percentages for specific payment methods, funding sources (credit or debit), and currencies.
    */
    'configurations'?: Array<Configuration>;
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
