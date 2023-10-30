/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// The vweb on render observer.
// let vweb_on_render_observer;
// if (typeof window !== "undefined" && typeof document !== "undefined") {
// 	vweb_on_render_observer = new ResizeObserver((entries) => {
// 		for (let i = 0; i < entries.length; i++) {
// 			const element = entries[i].target;
// 		    const rect = element.getBoundingClientRect();
// 		    if (rect.top && rect.left && rect.width && rect.height) {
// 		        if (element.element_type !== undefined) {
// 					element._rendered = true;
// 					if (element._on_render_callback != null) {
// 						element._on_render_callback(element);
// 					}
// 				}
// 				vweb_on_render_observer.unobserve(element);
// 		    }
// 		}
// 	})
// }