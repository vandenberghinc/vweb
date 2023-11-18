import { LinksElement } from './linksElement';
export declare class CompanyLinks {
    'apiCredentials'?: LinksElement;
    'self': LinksElement;
    'users'?: LinksElement;
    'webhooks'?: LinksElement;
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
