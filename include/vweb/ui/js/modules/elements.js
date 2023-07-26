/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Elements module.
vweb.elements = {};

// Get by id.
vweb.elements.get = function(id) {
	return document.getElementById(id);
}
vweb.elements.get_by_id = function(id) {
	return vweb.elements.get(id)
}

// Click an element by id.
vweb.elements.click = function(id) {
	document.getElementById(id).click();
}

// Register a custom type.
// Parameter "tag" is optional.
vweb.elements.register = function(type, tag) {

	// Prefer type.name here since that also supports inherited classes.
	customElements.define("v-" + type.name.toLowerCase(), type, {extends: tag || type.element_tag});

}