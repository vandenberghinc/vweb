import { AdditionalSettings } from './additionalSettings';
export declare class UpdateCompanyWebhookRequest {
    /**
    * Indicates if expired SSL certificates are accepted. Default value: **false**.
    */
    'acceptsExpiredCertificate'?: boolean;
    /**
    * Indicates if self-signed SSL certificates are accepted. Default value: **false**.
    */
    'acceptsSelfSignedCertificate'?: boolean;
    /**
    * Indicates if untrusted SSL certificates are accepted. Default value: **false**.
    */
    'acceptsUntrustedRootCertificate'?: boolean;
    /**
    * Indicates if the webhook configuration is active. The field must be **true** for us to send webhooks about events related an account.
    */
    'active'?: boolean;
    'additionalSettings'?: AdditionalSettings;
    /**
    * Format or protocol for receiving webhooks. Possible values: * **soap** * **http** * **json**
    */
    'communicationFormat'?: UpdateCompanyWebhookRequest.CommunicationFormatEnum;
    /**
    * Your description for this webhook configuration.
    */
    'description'?: string;
    /**
    * SSL version to access the public webhook URL specified in the `url` field. Possible values: * **TLSv1.3** * **TLSv1.2** * **HTTP** - Only allowed on Test environment.  If not specified, the webhook will use `sslVersion`: **TLSv1.2**.
    */
    'encryptionProtocol'?: UpdateCompanyWebhookRequest.EncryptionProtocolEnum;
    /**
    * Shows how merchant accounts are filtered when configuring the webhook. Possible values: * **includeAccounts**: The webhook is configured for the merchant accounts listed in `filterMerchantAccounts`. * **excludeAccounts**: The webhook is not configured for the merchant accounts listed in `filterMerchantAccounts`. * **allAccounts**: Includes all merchant accounts, and does not require specifying `filterMerchantAccounts`.
    */
    'filterMerchantAccountType'?: UpdateCompanyWebhookRequest.FilterMerchantAccountTypeEnum;
    /**
    * A list of merchant account names that are included or excluded from receiving the webhook. Inclusion or exclusion is based on the value defined for `filterMerchantAccountType`.  Required if `filterMerchantAccountType` is either: * **includeAccounts** * **excludeAccounts**  Not needed for `filterMerchantAccountType`: **allAccounts**.
    */
    'filterMerchantAccounts'?: Array<string>;
    /**
    * Network type for Terminal API notification webhooks. Possible values: * **public** * **local**  Default Value: **public**.
    */
    'networkType'?: UpdateCompanyWebhookRequest.NetworkTypeEnum;
    /**
    * Password to access the webhook URL.
    */
    'password'?: string;
    /**
    * Indicates if the SOAP action header needs to be populated. Default value: **false**.  Only applies if `communicationFormat`: **soap**.
    */
    'populateSoapActionHeader'?: boolean;
    /**
    * Public URL where webhooks will be sent, for example **https://www.domain.com/webhook-endpoint**.
    */
    'url'?: string;
    /**
    * Username to access the webhook URL.
    */
    'username'?: string;
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
export declare namespace UpdateCompanyWebhookRequest {
    enum CommunicationFormatEnum {
        Http = "http",
        Json = "json",
        Soap = "soap"
    }
    enum EncryptionProtocolEnum {
        Http = "HTTP",
        Tlsv12 = "TLSv1.2",
        Tlsv13 = "TLSv1.3"
    }
    enum FilterMerchantAccountTypeEnum {
        AllAccounts = "allAccounts",
        ExcludeAccounts = "excludeAccounts",
        IncludeAccounts = "includeAccounts"
    }
    enum NetworkTypeEnum {
        Local = "local",
        Public = "public"
    }
}
