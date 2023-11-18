/**
 * Terminal API
 * Definition of Terminal API Schema
 *
 */
import { SaleToPOIResponse } from './saleToPOIResponse';
import { SaleToPOIRequest } from "./saleToPOIRequest";
export declare class TerminalApiResponse {
    'SaleToPOIResponse'?: SaleToPOIResponse;
    'SaleToPOIRequest'?: SaleToPOIRequest;
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
