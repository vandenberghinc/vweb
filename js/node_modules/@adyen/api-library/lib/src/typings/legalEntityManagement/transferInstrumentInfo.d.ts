import { BankAccountInfo } from './bankAccountInfo';
export declare class TransferInstrumentInfo {
    'bankAccount': BankAccountInfo;
    /**
    * The unique identifier of the [legal entity](https://docs.adyen.com/api-explorer/legalentity/latest/post/legalEntities#responses-200-id) that owns the transfer instrument.
    */
    'legalEntityId': string;
    /**
    * The type of transfer instrument.  Possible value: **bankAccount**.
    */
    'type': TransferInstrumentInfo.TypeEnum;
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
export declare namespace TransferInstrumentInfo {
    enum TypeEnum {
        BankAccount = "bankAccount",
        RecurringDetail = "recurringDetail"
    }
}
