export declare class ThemeClass {
    active_id?: string;
    active?: Record<string, any>;
    _theme_ids: string[];
    _attrs: string[];
    _css_vars: Record<string, string | String>;
    _id: string;
    _on_activate_callback?: ((element: ThemeClass, theme: string) => void);
    constructor(id: string, themes?: Record<string, any>);
    _add_attr(id: string, theme?: string): void;
    set(theme: string, key: string, value: any): this;
    get id(): string;
    initialize(id?: string): this;
    value(id: any): any;
    opacity(id: string, opacity?: number): string | String;
    activate(id: string, apply_theme_update?: boolean): this;
    on_activate(): ((element: ThemeClass, theme: string) => void) | undefined;
    on_activate(callback: ((element: ThemeClass, theme: string) => void)): this;
    get_active_id_cached(): string;
    toggle(apply_theme_update?: boolean): this;
}
export declare const Theme: (...args: any[]) => any;