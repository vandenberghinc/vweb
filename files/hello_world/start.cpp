
// Preprocessor statements.
#define vlib_enable_trace true
#define vweb_seo_warnings true
#define vweb_production false

// Include libraries.
#include <vlib/vlib.h>
#include <vweb/vweb.h>
                                            
// Shortcuts.
using namespace vlib::types::shortcuts;
using namespace vweb::shortcuts;
using namespace vweb::ui::shortcuts;

// Include endpoints.
#include "ui/hello_world.h"

// Main.
int main(int argc, char** argv) {
	
	// Enable file watcher.
	const Bool file_watcher = false;
	
	// Source path.
	const Path source = vlib::env::get("SOURCE").is_defined() ? Path(vlib::env::get("SOURCE")) : Path(__FILE__).base();
	
	// Start without file watcher.
	if (!file_watcher) {
		
		// Initialize server.
		Server server = vweb::server::Config::load(source.join(".vweb"));
		
		// Add endpoints.
		server.add_endpoints({
			hello_world(),
		});
		
		// Start.
		server.start();
	}
    
    // File watcher.
    else {
        vweb::utils::FileWatcher watcher (
            source,
            source.join(".vweb"),
            Json::load(source.join(".vweb"))["build"].asj()
        );
		watcher.start();
    }
	
	return 0;
}
        
            
