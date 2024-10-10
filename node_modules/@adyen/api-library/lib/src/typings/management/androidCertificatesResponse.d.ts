import { AndroidCertificate } from './androidCertificate';
export declare class AndroidCertificatesResponse {
    /**
    * Uploaded Android certificates for Android payment terminals.
    */
    'data'?: Array<AndroidCertificate>;
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
