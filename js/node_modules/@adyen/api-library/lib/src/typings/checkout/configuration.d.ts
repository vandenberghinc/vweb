import { Avs } from './avs';
import { InstallmentsNumber } from './installmentsNumber';
import { ShopperInput } from './shopperInput';
export declare class Configuration {
    'avs'?: Avs;
    /**
    * Determines whether the cardholder name should be provided or not.  Permitted values: * NONE * OPTIONAL * REQUIRED
    */
    'cardHolderName'?: Configuration.CardHolderNameEnum;
    'installments'?: InstallmentsNumber;
    'shopperInput'?: ShopperInput;
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
export declare namespace Configuration {
    enum CardHolderNameEnum {
        None = "NONE",
        Optional = "OPTIONAL",
        Required = "REQUIRED"
    }
}
