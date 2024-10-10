import { TerminalReassignmentTarget } from './terminalReassignmentTarget';
export declare class TerminalAssignment {
    /**
    * The unique identifier of the company account to which terminal is assigned.
    */
    'companyId': string;
    /**
    * The unique identifier of the merchant account to which terminal is assigned.
    */
    'merchantId'?: string;
    'reassignmentTarget'?: TerminalReassignmentTarget;
    /**
    * The status of the reassignment. Possible values:   * `reassignmentInProgress`: the terminal was boarded and is now scheduled to remove the configuration. Wait for the terminal to synchronize with the Adyen platform.  * `deployed`: the terminal is deployed and reassigned.   * `inventory`: the terminal is in inventory and cannot process transactions.   * `boarded`: the terminal is boarded to a store, or a merchant account representing a store, and can process transactions.
    */
    'status': TerminalAssignment.StatusEnum;
    /**
    * The unique identifier of the store to which terminal is assigned.
    */
    'storeId'?: string;
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
export declare namespace TerminalAssignment {
    enum StatusEnum {
        Boarded = "boarded",
        Deployed = "deployed",
        Inventory = "inventory",
        ReassignmentInProgress = "reassignmentInProgress"
    }
}
