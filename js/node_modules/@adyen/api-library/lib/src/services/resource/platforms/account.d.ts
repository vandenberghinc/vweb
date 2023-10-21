import Service from "../../../service";
import Resource from "../../resource";
type AccountHoldersEndpoints = "/createAccountHolder" | "/getAccountHolder" | "/updateAccountHolder" | "/updateAccountHolderState" | "/suspendAccountHolder" | "/unSuspendAccountHolder" | "/closeAccountHolder" | "/getTaxForm";
type VerificationEndpoints = "/uploadDocument" | "/getUploadedDocuments" | "/deleteBankAccounts" | "/deletePayoutMethods" | "/deleteShareholders" | "/checkAccountHolder";
type AccountsEndpoints = "/createAccount" | "/updateAccount" | "/closeAccount";
export declare enum AccountTypesEnum {
    AccountHolders = "AccountHolders",
    Accounts = "Accounts",
    Verification = "Verification"
}
export interface AccountTypes {
    [AccountTypesEnum.AccountHolders]: AccountHoldersEndpoints;
    [AccountTypesEnum.Accounts]: AccountsEndpoints;
    [AccountTypesEnum.Verification]: VerificationEndpoints;
}
declare class PlatformsAccount<T extends AccountTypesEnum> extends Resource {
    constructor(service: Service, endpoint: AccountTypes[T]);
}
export default PlatformsAccount;
