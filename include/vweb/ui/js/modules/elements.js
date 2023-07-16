/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Elements module.
vweb.elements = {};

// All vweb elements.
vweb.elements.all_elements = [];

// Get by id.
// Can only be used for vweb elements.
// Not for elements that are not created by the vweb api.
vweb.elements.get = function(id) {
	for (let i = 0; i < vweb.elements.all_elements.length; i++) {
		const item = vweb.elements.all_elements[i];
		if (item.element.id == id) {
			return item;
		}
	}
	return null;
}
vweb.elements.get_by_id = function(id) {
	return vweb.elements.get(id)
}
