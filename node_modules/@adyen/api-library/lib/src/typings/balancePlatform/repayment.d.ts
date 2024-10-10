import { RepaymentTerm } from './repaymentTerm';
import { ThresholdRepayment } from './thresholdRepayment';
export declare class Repayment {
    /**
    * The repayment that is deducted daily from incoming net volume, in [basis points](https://www.investopedia.com/terms/b/basispoint.asp).
    */
    'basisPoints': number;
    'term'?: RepaymentTerm;
    'threshold'?: ThresholdRepayment;
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
