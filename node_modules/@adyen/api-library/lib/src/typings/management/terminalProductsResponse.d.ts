import { TerminalProduct } from './terminalProduct';
export declare class TerminalProductsResponse {
    /**
    * Terminal products that can be ordered.
    */
    'data'?: Array<TerminalProduct>;
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
