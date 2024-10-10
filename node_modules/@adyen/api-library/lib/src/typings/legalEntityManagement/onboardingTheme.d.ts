export declare class OnboardingTheme {
    /**
    * The creation date of the theme.
    */
    'createdAt': Date;
    /**
    * The description of the theme.
    */
    'description'?: string;
    /**
    * The unique identifier of the theme.
    */
    'id': string;
    /**
    * The properties of the theme.
    */
    'properties': {
        [key: string]: string;
    };
    /**
    * The date when the theme was last updated.
    */
    'updatedAt'?: Date;
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
