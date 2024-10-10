import { LinksElement } from './linksElement';
export declare class MerchantLinks {
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
