import { ViasAddress } from './viasAddress';
import { ViasName } from './viasName';
import { ViasPersonalData } from './viasPersonalData';
import { ViasPhoneNumber } from './viasPhoneNumber';
export declare class SignatoryContact {
    'address'?: ViasAddress;
    /**
    * The e-mail address of the person.
    */
    'email'?: string;
    /**
    * The phone number of the person provided as a single string.  It will be handled as a landline phone. Examples: \"0031 6 11 22 33 44\", \"+316/1122-3344\", \"(0031) 611223344\"
    */
    'fullPhoneNumber'?: string;
    /**
    * Job title of the signatory.  Example values: **Chief Executive Officer**, **Chief Financial Officer**, **Chief Operating Officer**, **President**, **Vice President**, **Executive President**, **Managing Member**, **Partner**, **Treasurer**, **Director**, or **Other**.
    */
    'jobTitle'?: string;
    'name'?: ViasName;
    'personalData'?: ViasPersonalData;
    'phoneNumber'?: ViasPhoneNumber;
    /**
    * The unique identifier (UUID) of the signatory. >**If, during an Account Holder create or update request, this field is left blank (but other fields provided), a new Signatory will be created with a procedurally-generated UUID.**  >**If, during an Account Holder create request, a UUID is provided, the creation of the Signatory will fail while the creation of the Account Holder will continue.**  >**If, during an Account Holder update request, a UUID that is not correlated with an existing Signatory is provided, the update of the Signatory will fail.**  >**If, during an Account Holder update request, a UUID that is correlated with an existing Signatory is provided, the existing Signatory will be updated.**
    */
    'signatoryCode'?: string;
    /**
    * Your reference for the signatory.
    */
    'signatoryReference'?: string;
    /**
    * The URL of the person\'s website.
    */
    'webAddress'?: string;
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
