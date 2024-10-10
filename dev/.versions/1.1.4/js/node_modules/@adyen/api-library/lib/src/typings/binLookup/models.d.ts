export * from './amount';
export * from './binDetail';
export * from './cardBin';
export * from './costEstimateAssumptions';
export * from './costEstimateRequest';
export * from './costEstimateResponse';
export * from './dSPublicKeyDetail';
export * from './merchantDetails';
export * from './recurring';
export * from './serviceError';
export * from './threeDS2CardRangeDetail';
export * from './threeDSAvailabilityRequest';
export * from './threeDSAvailabilityResponse';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
