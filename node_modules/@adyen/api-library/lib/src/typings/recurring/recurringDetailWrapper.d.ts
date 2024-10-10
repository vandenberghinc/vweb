import { RecurringDetail } from './recurringDetail';
export declare class RecurringDetailWrapper {
    'RecurringDetail'?: RecurringDetail;
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
