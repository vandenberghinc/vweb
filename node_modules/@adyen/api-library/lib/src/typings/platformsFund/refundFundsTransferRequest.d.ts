import { Amount } from './amount';
export declare class RefundFundsTransferRequest {
    'amount': Amount;
    /**
    * A value that can be supplied at the discretion of the executing user in order to link multiple transactions to one another.
    */
    'merchantReference'?: string;
    /**
    * A PSP reference of the original fund transfer.
    */
    'originalReference': string;
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
