import { Links } from './links';
import { Name } from './name';
export declare class User {
    '_links'?: Links;
    /**
    * The list of [account groups](https://docs.adyen.com/account/account-structure#account-groups) associated with this user.
    */
    'accountGroups'?: Array<string>;
    /**
    * Indicates whether this user is active.
    */
    'active'?: boolean;
    /**
    * Set of apps available to this user
    */
    'apps'?: Array<string>;
    /**
    * The email address of the user.
    */
    'email': string;
    /**
    * The unique identifier of the user.
    */
    'id': string;
    'name'?: Name;
    /**
    * The list of [roles](https://docs.adyen.com/account/user-roles) for this user.
    */
    'roles': Array<string>;
    /**
    * The [tz database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) of the time zone of the user. For example, **Europe/Amsterdam**.
    */
    'timeZoneCode': string;
    /**
    * The username for this user.
    */
    'username': string;
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
