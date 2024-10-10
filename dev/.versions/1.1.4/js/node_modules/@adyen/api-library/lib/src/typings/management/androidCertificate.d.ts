export declare class AndroidCertificate {
    /**
    * The description that was provided when uploading the certificate.
    */
    'description'?: string;
    /**
    * The file format of the certificate, as indicated by the file extension. For example, **.cert** or **.pem**.
    */
    'extension'?: string;
    /**
    * The unique identifier of the certificate.
    */
    'id': string;
    /**
    * The file name of the certificate. For example, **mycert**.
    */
    'name'?: string;
    /**
    * The date when the certificate stops to be valid.
    */
    'notAfter'?: Date;
    /**
    * The date when the certificate starts to be valid.
    */
    'notBefore'?: Date;
    /**
    * The status of the certificate.
    */
    'status'?: string;
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
