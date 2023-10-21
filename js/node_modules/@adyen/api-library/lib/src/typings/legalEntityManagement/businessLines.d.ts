import { BusinessLine } from './businessLine';
export declare class BusinessLines {
    /**
    * List of business lines.
    */
    'businessLines': Array<BusinessLine>;
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
