export declare class UninstallAndroidCertificateDetails {
    /**
    * The unique identifier of the certificate to be uninstalled.
    */
    'certificateId'?: string;
    /**
    * Type of terminal action: Uninstall an Android certificate.
    */
    'type'?: UninstallAndroidCertificateDetails.TypeEnum;
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
export declare namespace UninstallAndroidCertificateDetails {
    enum TypeEnum {
        UninstallAndroidCertificate = "UninstallAndroidCertificate"
    }
}
