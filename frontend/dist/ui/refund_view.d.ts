export class RefundViewElement {
    static default_style: any;
    constructor({ green, red, bg, sub_bg, title_fg, text_fg, subtext_fg, theme_fg, theme_gradient, border_radius, check_image, error_image, no_refundable_payments_image, auto_advance, }?: {
        green?: string | undefined;
        red?: string | undefined;
        bg?: string | undefined;
        sub_bg?: string | undefined;
        title_fg?: string | undefined;
        text_fg?: string | undefined;
        subtext_fg?: string | undefined;
        theme_fg?: string | undefined;
        theme_gradient?: null | undefined;
        border_radius?: number | undefined;
        check_image?: string | undefined;
        error_image?: string | undefined;
        no_refundable_payments_image?: string | undefined;
        auto_advance?: boolean | undefined;
    });
    element_type: string;
    all_payments: any[];
    menu_buttons: any[];
    payments: any;
    set_default(): any;
}
export const RefundView: (...args: any[]) => any;
