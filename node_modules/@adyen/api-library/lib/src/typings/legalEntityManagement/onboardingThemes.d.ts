import { OnboardingTheme } from './onboardingTheme';
export declare class OnboardingThemes {
    /**
    * The next page. Only present if there is a next page.
    */
    'next'?: string;
    /**
    * The previous page. Only present if there is a previous page.
    */
    'previous'?: string;
    /**
    * List of onboarding themes.
    */
    'themes': Array<OnboardingTheme>;
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
