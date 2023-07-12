// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

#include "/Volumes/persistance/private/vinc/vlib/include/vlib/vlib.h"

using namespace vlib::types::shortcuts;

// Add js.
constexpr void add_data_to_js(String& js, const Code& data) {
	for (auto& i: data.iterate()) {
		if (
			i.is_comment() ||
			(i.is_code() && (
				(js.last() == '\n' && i.character() == '\n') ||
				(js.last() == ' ' && i.character() == ' ') ||
				(i.character() == '\t') ||
				((i.character() == ' ' || i.character() == '\t') && i.next() == '\n')
			))
		) {
			continue;
		} else {
			js.append(i.character());
		}
	}
}

int main() {
	
	// Init js.
	String js;
	js <<
	"/*" "\n"
	" * Author: Daan van den Bergh" "\n"
	" * Copyright: © 2022 - 2023 Daan van den Bergh." "\n"
	" */" "\n";
	
	// Dir.
	Path dir = Path(__FILE__).base(2).join("include/vweb/js");
	Array<Path> paths;
	
	// Define paths in order.
	for (auto& path: Array<Path>{
		dir.join("ui/element.js"),
	}) {
		paths.append(path);
		Code data = path.load();
		add_data_to_js(js, data);
	}
	
	// Parse.
	for (auto& path: dir.paths(true)) {
		if (path.full_name() != "vweb.js" && path.extension() == "js") {
			if (paths.contains(path)) {
				continue;
			}
			paths.append(path);
			Code data = path.load();
			add_data_to_js(js, data);
		}
	}
	js.save(dir.join("vweb.js"));
	print("Bundled into ", dir.join("vweb.js"), ".");
}
