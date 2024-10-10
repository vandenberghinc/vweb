import { Profile } from './profile';
import { Settings } from './settings';
export declare class WifiProfiles {
    /**
    * List of remote Wi-Fi profiles.
    */
    'profiles'?: Array<Profile>;
    'settings'?: Settings;
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
