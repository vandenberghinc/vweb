// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

#include "/Volumes/persistance/private/dev/vinc/vlib/include/vlib/vlib.h"
// #include "/Users/administrator/persistance/private/dev/vinc/vlib/include/vlib/vlib.h"
#include "../include/vweb/vweb.h"

using namespace vlib::types::shortcuts;

int main() {
	// String cause_err = ""
	// String cause_err = ""
		// aaaaa	aaa	
	// Array<Int> x;
	// auto y = x[0];
		
	// Global 240
	Path vweb = Path(__FILE__).base(2);
	Path vinc = Path(__FILE__).base(3);
	
	// Vars.
	Path js = vweb.join("js/frontend");
	Path css = vweb.join("js/frontend/css");
	
	// Include vhighlight.
	// vinc.join("vhighlight/css/vhighlight.css").cp(css.join("vhighlight.cs"));
	// vinc.join("vhighlight/vhighlight.js").cp(js.join("libs/vhighlight.js"));
	
	// Bundle js dir.
	Code bundled = vlib::JavaScript::bundle({
		.source = js,
		.include_order = {
			"modules/wrapper.js",
			"modules/utils.js",
			"modules/elements.js",
			"ui/on_render.js",
			"ui/mutex.js",
			"ui/element.js",
			"ui/vstack.js", // since this is inherited.
			"ui/hstack.js", // since this is inherited.
		},
		.exclude = {
			"vweb.js",
			"css",
			// "libs/pako.min.js",
		},
		.header = to_str(
			"/*" "\n"
			" * Author: Daan van den Bergh" "\n"
			" * Copyright: © 2022 - ", Date::now().year(), " Daan van den Bergh." "\n"
			" */" "\n"
		),
		.newlines = true,
		.double_newlines = false,
		.whitespace = false,
		.comments = false,
	});
	
	vweb::Server::fill_vweb_decorators(bundled, "");
	
	bundled.save(js.join("vweb.js"));
	print_marker("Bundled to ", js.join("vweb.js"), ".");
}
