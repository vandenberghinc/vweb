import { Amount } from './amount';
export declare class ReturnTransferRequest {
    'amount': Amount;
    /**
    * Your internal reference for the return. If you don\'t provide this in the request, Adyen generates a unique reference. This reference is used in all communication with you about the instruction status.  We recommend using a unique value per instruction. If you need to provide multiple references for a transaction, separate them with hyphens (\"-\").
    */
    'reference'?: string;
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
