import { Item } from './item';
import { SubInputDetail } from './subInputDetail';
export declare class InputDetail {
    /**
    * Configuration parameters for the required input.
    */
    'configuration'?: {
        [key: string]: string;
    };
    /**
    * Input details can also be provided recursively.
    */
    'details'?: Array<SubInputDetail>;
    /**
    * Input details can also be provided recursively (deprecated).
    */
    'inputDetails'?: Array<SubInputDetail>;
    /**
    * In case of a select, the URL from which to query the items.
    */
    'itemSearchUrl'?: string;
    /**
    * In case of a select, the items to choose from.
    */
    'items'?: Array<Item>;
    /**
    * The value to provide in the result.
    */
    'key'?: string;
    /**
    * True if this input value is optional.
    */
    'optional'?: boolean;
    /**
    * The type of the required input.
    */
    'type'?: string;
    /**
    * The value can be pre-filled, if available.
    */
    'value'?: string;
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
