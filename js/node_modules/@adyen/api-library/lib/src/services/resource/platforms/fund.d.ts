import Service from "../../../service";
import Resource from "../../resource";
type Endpoints = "/accountHolderBalance" | "/accountHolderTransactionList" | "/payoutAccountHolder" | "/transferFunds" | "/refundFundsTransfer" | "/setupBeneficiary" | "/refundNotPaidOutTransfers" | "/debitAccountHolder";
declare class PlatformsFund extends Resource {
    constructor(service: Service, endpoint: Endpoints);
}
export default PlatformsFund;
