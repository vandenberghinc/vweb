export class ContextMenuElement {
    constructor(content: any);
    element_type: string;
    remove_child_callback: () => void;
    set_default(): any;
    popup(event: any): void;
    close(): void;
    remove(): void;
}
export const ContextMenu: (...args: any[]) => any;
