import { LinksElement } from './linksElement';
export declare class ApiCredentialLinks {
    'allowedOrigins'?: LinksElement;
    'company'?: LinksElement;
    'generateApiKey'?: LinksElement;
    'generateClientKey'?: LinksElement;
    'merchant'?: LinksElement;
    'self': LinksElement;
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
