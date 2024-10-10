import { TerminalProductPrice } from './terminalProductPrice';
export declare class TerminalProduct {
    /**
    * Information about items included and integration options.
    */
    'description'?: string;
    /**
    * The unique identifier of the product.
    */
    'id'?: string;
    /**
    * A list of parts included in the terminal package.
    */
    'itemsIncluded'?: Array<string>;
    /**
    * The descriptive name of the product.
    */
    'name'?: string;
    'price'?: TerminalProductPrice;
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
