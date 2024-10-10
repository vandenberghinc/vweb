import { Address } from './address';
import { BirthData } from './birthData';
import { IdentificationData } from './identificationData';
import { Name } from './name';
import { PhoneNumber } from './phoneNumber';
import { TaxInformation } from './taxInformation';
import { WebData } from './webData';
export declare class Individual {
    'birthData'?: BirthData;
    /**
    * The email address of the legal entity.
    */
    'email'?: string;
    'identificationData'?: IdentificationData;
    'name': Name;
    /**
    * The individual\'s nationality.
    */
    'nationality'?: string;
    'phone'?: PhoneNumber;
    'residentialAddress': Address;
    /**
    * The tax information of the individual.
    */
    'taxInformation'?: Array<TaxInformation>;
    'webData'?: WebData;
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
