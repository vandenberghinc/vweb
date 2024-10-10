import { LinksElement } from './linksElement';
export declare class PaginationLinks {
    'first': LinksElement;
    'last': LinksElement;
    'next'?: LinksElement;
    'prev'?: LinksElement;
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
