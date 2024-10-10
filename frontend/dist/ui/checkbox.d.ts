export class CheckBoxElement {
    static default_style: any;
    constructor(text_or_obj?: {
        text: string;
        required: boolean;
        id: null;
    });
    element_type: string;
    _border_color: any;
    _inner_bg: any;
    _focus_color: any;
    _missing_color: any;
    _missing: boolean;
    circle: any;
    text: any;
    content: any;
    error: any;
    border_color(val: any): any;
    inner_bg(val: any): any;
    styles(style_dict: any): any;
    set_default(): any;
    toggle(): this;
    value(to?: null): any;
    required(to?: null): any;
    _required: any;
    focus_color(val: any): any;
    missing_color(val: any): any;
    missing(to?: boolean): boolean | this;
    submit(): any;
}
export const CheckBox: (...args: any[]) => any;
