// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Include library.
#include "../include/vweb/vweb.h"

// Shortcuts.
using namespace vlib::types::shortcuts;
using namespace vweb::shortcuts;
using namespace vweb::ui::shortcuts;

// Include backend endpoints.
#include "backend/sign_in.h"
#include "backend/sign_out.h"

// Include ui endpoints.
#include "ui/defaults.h"
#include "ui/sign_in.h"
#include "ui/home.h"
    
// Main.
#if DEBUG == 1
int main() {
    
    // Setting default styling.
    Text::default_style = Text().color("black").style();
    
    // Initialize server.
    Path base = Path(__FILE__).base();
    Server server ({
        .port = 8000,
        .cert = base.join("certs/cert.pem"),
        .key = base.join("certs/key.pem"),
        .pass = "HelloWorld!",
        .statics = base.join("static"),
        .database = base.join("database"),
    });
    
    // Add endpoints.
    server.add_endpoints(
        home(),
        signin(),
        backend::signin(),
        backend::signout()
    );
    
    // Start.
    server.start();
    
}
#endif
