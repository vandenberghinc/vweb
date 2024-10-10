export declare class Url {
    /**
    * Indicates if the message sent to this URL should be encrypted.
    */
    'encrypted'?: boolean;
    /**
    * The password for authentication of the notifications.
    */
    'password'?: string;
    /**
    * The URL in the format: http(s)://domain.com.
    */
    'url'?: string;
    /**
    * The username for authentication of the notifications.
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
