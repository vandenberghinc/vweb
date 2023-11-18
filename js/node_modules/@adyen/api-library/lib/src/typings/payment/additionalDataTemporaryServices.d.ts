export declare class AdditionalDataTemporaryServices {
    /**
    * The customer code, if supplied by a customer. * Encoding: ASCII * maxLength: 25
    */
    'enhancedSchemeData_customerReference'?: string;
    /**
    * The name or ID of the person working in a temporary capacity. * maxLength: 40.   * Must not be all spaces.  *Must not be all zeros.
    */
    'enhancedSchemeData_employeeName'?: string;
    /**
    * The job description of the person working in a temporary capacity. * maxLength: 40  * Must not be all spaces.  *Must not be all zeros.
    */
    'enhancedSchemeData_jobDescription'?: string;
    /**
    * The amount paid for regular hours worked, [minor units](https://docs.adyen.com/development-resources/currency-codes). * maxLength: 7 * Must not be empty * Can be all zeros
    */
    'enhancedSchemeData_regularHoursRate'?: string;
    /**
    * The hours worked. * maxLength: 7 * Must not be empty * Can be all zeros
    */
    'enhancedSchemeData_regularHoursWorked'?: string;
    /**
    * The name of the person requesting temporary services. * maxLength: 40 * Must not be all zeros * Must not be all spaces
    */
    'enhancedSchemeData_requestName'?: string;
    /**
    * The billing period start date. * Format: ddMMyy * maxLength: 6
    */
    'enhancedSchemeData_tempStartDate'?: string;
    /**
    * The billing period end date. * Format: ddMMyy * maxLength: 6
    */
    'enhancedSchemeData_tempWeekEnding'?: string;
    /**
    * The total tax amount, in [minor units](https://docs.adyen.com/development-resources/currency-codes). For example, 2000 means USD 20.00 * maxLength: 12
    */
    'enhancedSchemeData_totalTaxAmount'?: string;
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
