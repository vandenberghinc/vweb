export declare class DocumentPage {
    'pageName'?: string;
    'pageNumber'?: number;
    'type'?: DocumentPage.TypeEnum;
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
export declare namespace DocumentPage {
    enum TypeEnum {
        Back = "BACK",
        Front = "FRONT",
        Undefined = "UNDEFINED"
    }
}
