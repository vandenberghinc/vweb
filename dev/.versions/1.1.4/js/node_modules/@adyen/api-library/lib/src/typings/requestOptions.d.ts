/// <reference types="node" />
/// <reference types="node" />
import * as https from "https";
import { URLSearchParams } from "url";
export declare namespace IRequest {
    type QueryString = ConstructorParameters<typeof URLSearchParams>[0];
    export type Options = https.RequestOptions & {
        idempotencyKey?: string;
        params?: QueryString;
    };
    export {};
}
