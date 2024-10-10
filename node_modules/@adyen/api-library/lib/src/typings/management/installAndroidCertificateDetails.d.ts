export declare class InstallAndroidCertificateDetails {
    /**
    * The unique identifier of the certificate to be installed.
    */
    'certificateId'?: string;
    /**
    * Type of terminal action: Install an Android certificate.
    */
    'type'?: InstallAndroidCertificateDetails.TypeEnum;
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
export declare namespace InstallAndroidCertificateDetails {
    enum TypeEnum {
        InstallAndroidCertificate = "InstallAndroidCertificate"
    }
}
