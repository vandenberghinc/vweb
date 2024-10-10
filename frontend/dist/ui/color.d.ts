export class ColorRangeClass {
    constructor(start: any, end: any);
    start: any;
    end: any;
    array_to_rgba(array: any): {
        r: any;
        g: any;
        b: any;
        a: number | number[];
    };
    interpolate(percent?: number, alpha?: number): any;
}
export const ColorRange: (...args: any[]) => any;
