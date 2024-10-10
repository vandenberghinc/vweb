export * from './collectInformation';
export * from './errorFieldType';
export * from './fieldType';
export * from './getOnboardingUrlRequest';
export * from './getOnboardingUrlResponse';
export * from './getPciUrlRequest';
export * from './getPciUrlResponse';
export * from './serviceError';
export * from './showPages';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
