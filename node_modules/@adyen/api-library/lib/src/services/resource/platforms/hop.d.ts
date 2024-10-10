import Service from "../../../service";
import Resource from "../../resource";
type Endpoints = "/getOnboardingUrl" | "/getPciQuestionnaireUrl";
declare class PlatformsHostedOnboardingPage extends Resource {
    constructor(service: Service, endpoint: Endpoints);
}
export default PlatformsHostedOnboardingPage;
