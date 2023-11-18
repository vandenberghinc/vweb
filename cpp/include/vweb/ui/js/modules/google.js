/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Google wrapper module.
vweb.google = {}

// Initialize google tag.
vweb.google.init_gtag = function(google_tag) {
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', google_tag);
}