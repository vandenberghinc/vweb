import { CollectInformation } from './collectInformation';
import { ShowPages } from './showPages';
export declare class GetOnboardingUrlRequest {
    /**
    * The account holder code you provided when you created the account holder.
    */
    'accountHolderCode': string;
    'collectInformation'?: CollectInformation;
    /**
    * Indicates if editing checks is allowed even if all the checks have passed.
    */
    'editMode'?: boolean;
    /**
    * The URL to which the account holder is redirected after completing an OAuth authentication with a bank through Trustly/PayMyBank.
    */
    'mobileOAuthCallbackUrl'?: string;
    /**
    * The platform name which will show up in the welcome page.
    */
    'platformName'?: string;
    /**
    * The URL where the account holder will be redirected back to after they complete the onboarding, or if their session times out. Maximum length of 500 characters. If you don\'t provide this, the account holder will be redirected back to the default return URL configured in your platform account.
    */
    'returnUrl'?: string;
    /**
    * The language to be used in the page, specified by a combination of a language and country code. For example, **pt-BR**.   If not specified in the request or if the language is not supported, the page uses the browser language. If the browser language is not supported, the page uses **en-US** by default.  For a list of supported languages, refer to [Change the page language](https://docs.adyen.com/marketplaces-and-platforms/classic/hosted-onboarding-page/customize-experience#change-page-language).
    */
    'shopperLocale'?: string;
    'showPages'?: ShowPages;
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
