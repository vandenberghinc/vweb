export declare class CancelOrderResponse {
    /**
    * A unique reference of the cancellation request.
    */
    'pspReference': string;
    /**
    * The result of the cancellation request.  Possible values:  * **Received** – Indicates the cancellation has successfully been received by Adyen, and will be processed.
    */
    'resultCode': CancelOrderResponse.ResultCodeEnum;
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
export declare namespace CancelOrderResponse {
    enum ResultCodeEnum {
        Received = "Received"
    }
}
