import { IdName } from './idName';
export declare class TerminalModelsResponse {
    /**
    * The terminal models that the API credential has access to.
    */
    'data'?: Array<IdName>;
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
