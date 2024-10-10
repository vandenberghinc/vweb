import { TransferRoute } from './transferRoute';
export declare class TransferRouteResponse {
    /**
    * List of available priorities for a transfer, along with requirements. Use this information to initiate a transfer.
    */
    'transferRoutes'?: Array<TransferRoute>;
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
