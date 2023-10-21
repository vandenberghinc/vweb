import { TerminalOrder } from './terminalOrder';
export declare class TerminalOrdersResponse {
    /**
    * List of orders for payment terminal packages and parts.
    */
    'data'?: Array<TerminalOrder>;
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
