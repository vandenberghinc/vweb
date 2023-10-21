export declare class UpdateNetworkTokenRequest {
    /**
    * The new status of the network token. Possible values: **active**, **suspended**, **closed**. The **closed** status is final and cannot be changed.
    */
    'status'?: UpdateNetworkTokenRequest.StatusEnum;
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
export declare namespace UpdateNetworkTokenRequest {
    enum StatusEnum {
        Active = "active",
        Suspended = "suspended",
        Closed = "closed"
    }
}
