import { Amount } from './amount';
export declare class ForexQuote {
    /**
    * The account name.
    */
    'account'?: string;
    /**
    * The account type.
    */
    'accountType'?: string;
    'baseAmount'?: Amount;
    /**
    * The base points.
    */
    'basePoints': number;
    'buy'?: Amount;
    'interbank'?: Amount;
    /**
    * The reference assigned to the forex quote request.
    */
    'reference'?: string;
    'sell'?: Amount;
    /**
    * The signature to validate the integrity.
    */
    'signature'?: string;
    /**
    * The source of the forex quote.
    */
    'source'?: string;
    /**
    * The type of forex.
    */
    'type'?: string;
    /**
    * The date until which the forex quote is valid.
    */
    'validTill': Date;
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
