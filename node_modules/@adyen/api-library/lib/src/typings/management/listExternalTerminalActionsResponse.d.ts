import { ExternalTerminalAction } from './externalTerminalAction';
export declare class ListExternalTerminalActionsResponse {
    /**
    * The list of terminal actions.
    */
    'data'?: Array<ExternalTerminalAction>;
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
