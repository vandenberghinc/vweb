import { AndroidApp } from './androidApp';
export declare class AndroidAppsResponse {
    /**
    * Apps uploaded for Android payment terminals.
    */
    'data'?: Array<AndroidApp>;
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
