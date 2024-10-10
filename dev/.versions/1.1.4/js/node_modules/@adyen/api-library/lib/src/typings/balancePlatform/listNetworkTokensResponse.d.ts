import { NetworkToken } from './networkToken';
export declare class ListNetworkTokensResponse {
    /**
    * List of network tokens.
    */
    'networkTokens'?: Array<NetworkToken>;
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
