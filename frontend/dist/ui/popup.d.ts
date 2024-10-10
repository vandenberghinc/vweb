import { MutexType } from "../modules/mutex";
import { HStackElement, VStackElement } from "./stack";
import { TextElement } from "./text";
import { TitleElement } from "./title";
import { LoaderButtonElement } from "./button";
import { ImageMaskElement } from "./image";
export declare class PopupElement extends VStackElement {
    p_mutex: MutexType;
    p_auto_hide: boolean;
    p_auto_remove: boolean;
    p_animation_duration: number;
    p_blur: number;
    p_on_no_handler: ((element: PopupElement) => Promise<any> | void);
    p_on_yes_handler: ((element: PopupElement) => Promise<any> | void);
    p_on_popup_handler: ((element: PopupElement) => Promise<any> | void);
    p_escape_handler: any;
    image: ImageMaskElement;
    title: TitleElement;
    text: TextElement;
    no_button: LoaderButtonElement;
    yes_button: LoaderButtonElement;
    buttons: HStackElement;
    content: VStackElement;
    widget: VStackElement;
    constructor({ title, text, no, yes, image, image_color, content, auto_hide, auto_remove, animation_duration, // in ms.
    blur, on_no, on_yes, on_popup, }: {
        title: string;
        text: string;
        no: string;
        yes: string;
        image: boolean;
        image_color: string;
        content: any[];
        auto_hide: boolean;
        auto_remove: boolean;
        animation_duration: number;
        blur: number;
        on_no: ((element: PopupElement) => Promise<any> | void);
        on_yes: ((element: PopupElement) => Promise<any> | void);
        on_popup: ((element: PopupElement) => Promise<any> | void);
    });
    set_default(): this;
    await(): Promise<void>;
    remove_animation(): Promise<void>;
    hide_animation(): Promise<void>;
    close(): Promise<void>;
    image_color(): string;
    image_color(value: string): this;
    popup({ title, text, image, image_color, content, on_no, on_yes, }?: {
        title?: string;
        text?: string;
        no?: string;
        yes?: string;
        image?: boolean;
        image_color?: string;
        content?: any[];
        on_no?: ((element: PopupElement) => Promise<any> | void);
        on_yes?: ((element: PopupElement) => Promise<any> | void);
    }): Promise<void>;
}
export declare const Popup: (...args: any[]) => any;
