import { DocumentDetail } from './documentDetail';
export declare class UploadDocumentRequest {
    /**
    * The content of the document, in Base64-encoded string format.  To learn about document requirements, refer to [Verification checks](https://docs.adyen.com/marketplaces-and-platforms/classic/verification-checks).
    */
    'documentContent': string;
    'documentDetail': DocumentDetail;
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
