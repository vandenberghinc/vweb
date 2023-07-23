// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

#include "/Volumes/persistance/private/vinc/vlib/include/vlib/vlib.h"

using namespace vlib::types::shortcuts;

int main() {
	
	// Vars.
	Path js = Path(__FILE__).base(2).join("include/vweb/ui/js");
	Path css = Path(__FILE__).base(2).join("include/vweb/ui/css");
	
	// Include vhighlight.
	Path vinc = Path(__FILE__).base(3);
	vinc.join("vhighlight/include/vhighlight/js/vhighlight.js").cp(js.join("libs/vhighlight.js"));
	vinc.join("vhighlight/include/vhighlight/css/vhighlight.css").cp(css.join("vhighlight.css"));
	
	// Bundle js dir.
	vlib::JavaScript::bundle({
		.source = js,
		.include_order = {
			"modules/wrapper.js",
			"ui/element.js",
		},
		.exclude = {
			"vweb.js",
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
	})
	.save(js.join("vweb.js"));
	print_marker("Bundled.");
}
