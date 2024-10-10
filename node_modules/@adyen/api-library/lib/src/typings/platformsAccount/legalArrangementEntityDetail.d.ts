import { BusinessDetails } from './businessDetails';
import { IndividualDetails } from './individualDetails';
import { ViasAddress } from './viasAddress';
import { ViasPhoneNumber } from './viasPhoneNumber';
export declare class LegalArrangementEntityDetail {
    'address'?: ViasAddress;
    'businessDetails'?: BusinessDetails;
    /**
    * The e-mail address of the entity.
    */
    'email'?: string;
    /**
    * The phone number of the contact provided as a single string.  It will be handled as a landline phone. **Examples:** \"0031 6 11 22 33 44\", \"+316/1122-3344\", \"(0031) 611223344\"
    */
    'fullPhoneNumber'?: string;
    'individualDetails'?: IndividualDetails;
    /**
    * Adyen-generated unique alphanumeric identifier (UUID) for the entry, returned in the response when you create a legal arrangement entity. Use only when updating an account holder. If you include this field when creating an account holder, the request will fail.
    */
    'legalArrangementEntityCode'?: string;
    /**
    * Your reference for the legal arrangement entity.
    */
    'legalArrangementEntityReference'?: string;
    /**
    * An array containing the roles of the entity in the legal arrangement.  The possible values depend on the legal arrangement `type`.  - For `type` **Association**: **ControllingPerson** and **Shareholder**.  - For `type` **Partnership**: **Partner** and **Shareholder**.  - For `type` **Trust**: **Trustee**, **Settlor**, **Protector**, **Beneficiary**,  and **Shareholder**.
    */
    'legalArrangementMembers'?: Array<LegalArrangementEntityDetail.LegalArrangementMembersEnum>;
    /**
    * The legal entity type.  Possible values: **Business**, **Individual**, **NonProfit**, **PublicCompany**, or **Partnership**.
    */
    'legalEntityType'?: LegalArrangementEntityDetail.LegalEntityTypeEnum;
    'phoneNumber'?: ViasPhoneNumber;
    /**
    * The URL of the website of the contact.
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
export declare namespace LegalArrangementEntityDetail {
    enum LegalArrangementMembersEnum {
        Beneficiary = "Beneficiary",
        ControllingPerson = "ControllingPerson",
        Partner = "Partner",
        Protector = "Protector",
        Settlor = "Settlor",
        Shareholder = "Shareholder",
        Trustee = "Trustee"
    }
    enum LegalEntityTypeEnum {
        Business = "Business",
        Individual = "Individual",
        NonProfit = "NonProfit",
        Partnership = "Partnership",
        PublicCompany = "PublicCompany"
    }
}
