import { AULocalAccountIdentification } from './aULocalAccountIdentification';
import { BRLocalAccountIdentification } from './bRLocalAccountIdentification';
import { CALocalAccountIdentification } from './cALocalAccountIdentification';
import { CZLocalAccountIdentification } from './cZLocalAccountIdentification';
import { DKLocalAccountIdentification } from './dKLocalAccountIdentification';
import { HKLocalAccountIdentification } from './hKLocalAccountIdentification';
import { HULocalAccountIdentification } from './hULocalAccountIdentification';
import { IbanAccountIdentification } from './ibanAccountIdentification';
import { NOLocalAccountIdentification } from './nOLocalAccountIdentification';
import { NZLocalAccountIdentification } from './nZLocalAccountIdentification';
import { NumberAndBicAccountIdentification } from './numberAndBicAccountIdentification';
import { PLLocalAccountIdentification } from './pLLocalAccountIdentification';
import { PartyIdentification } from './partyIdentification';
import { SELocalAccountIdentification } from './sELocalAccountIdentification';
import { SGLocalAccountIdentification } from './sGLocalAccountIdentification';
import { UKLocalAccountIdentification } from './uKLocalAccountIdentification';
import { USLocalAccountIdentification } from './uSLocalAccountIdentification';
export declare class BankAccountV3 {
    'accountHolder': PartyIdentification;
    /**
    * Contains the bank account details. The fields required in this object depend on the country of the bank account and the currency of the transfer.
    */
    'accountIdentification': AULocalAccountIdentification | BRLocalAccountIdentification | CALocalAccountIdentification | CZLocalAccountIdentification | DKLocalAccountIdentification | HKLocalAccountIdentification | HULocalAccountIdentification | IbanAccountIdentification | NOLocalAccountIdentification | NZLocalAccountIdentification | NumberAndBicAccountIdentification | PLLocalAccountIdentification | SELocalAccountIdentification | SGLocalAccountIdentification | UKLocalAccountIdentification | USLocalAccountIdentification;
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
