import { BankAccountInfo } from './bankAccountInfo';
import { CapabilityProblem } from './capabilityProblem';
import { DocumentReference } from './documentReference';
import { SupportingEntityCapability } from './supportingEntityCapability';
export declare class TransferInstrument {
    'bankAccount': BankAccountInfo;
    /**
    * List of capabilities for this transfer instrument.
    */
    'capabilities'?: {
        [key: string]: SupportingEntityCapability;
    };
    /**
    * List of documents uploaded for the transfer instrument.
    */
    'documentDetails'?: Array<DocumentReference>;
    /**
    * The unique identifier of the transfer instrument.
    */
    'id': string;
    /**
    * The unique identifier of the [legal entity](https://docs.adyen.com/api-explorer/legalentity/latest/post/legalEntities#responses-200-id) that owns the transfer instrument.
    */
    'legalEntityId': string;
    /**
    * The verification errors related to capabilities for this transfer instrument.
    */
    'problems'?: Array<CapabilityProblem>;
    /**
    * The type of transfer instrument.  Possible value: **bankAccount**.
    */
    'type': TransferInstrument.TypeEnum;
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
export declare namespace TransferInstrument {
    enum TypeEnum {
        BankAccount = "bankAccount",
        RecurringDetail = "recurringDetail"
    }
}
