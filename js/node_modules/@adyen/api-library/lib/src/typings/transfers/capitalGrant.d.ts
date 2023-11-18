import { Amount } from './amount';
import { CapitalBalance } from './capitalBalance';
import { Counterparty } from './counterparty';
import { Fee } from './fee';
import { Repayment } from './repayment';
export declare class CapitalGrant {
    'amount'?: Amount;
    'balances': CapitalBalance;
    'counterparty'?: Counterparty;
    'fee'?: Fee;
    /**
    * The identifier of the grant account used for the grant.
    */
    'grantAccountId': string;
    /**
    * The identifier of the grant offer that has been selected and from which the grant details will be used.
    */
    'grantOfferId': string;
    /**
    * The identifier of the grant reference.
    */
    'id': string;
    'repayment'?: Repayment;
    /**
    * The current status of the grant. Possible values: **Pending**, **Active**, **Repaid**.
    */
    'status': CapitalGrant.StatusEnum;
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
export declare namespace CapitalGrant {
    enum StatusEnum {
        Pending = "Pending",
        Active = "Active",
        Repaid = "Repaid"
    }
}
