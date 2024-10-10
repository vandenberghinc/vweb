import { TestOutput } from './testOutput';
export declare class TestWebhookResponse {
    /**
    * List with test results. Each test webhook we send has a list element with the result.
    */
    'data'?: Array<TestOutput>;
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
