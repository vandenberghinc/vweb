declare function mergeDeep<T>(target: T, source: Record<string, unknown> | any): T;
export default mergeDeep;
