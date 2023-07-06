/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_H
#define VWEB_H

// Third party includes.
#if __has_include("/Volumes/persistance/private/vinc/vlib/include/vlib/types.h")
    #include "/Volumes/persistance/private/vinc/vlib/include/vlib/types.h"
    #include "/Volumes/persistance/private/vinc/vlib/include/vlib/compression.h"
    #include "/Volumes/persistance/private/vinc/vlib/include/vlib/crypto.h"
    #include "/Volumes/persistance/private/vinc/vlib/include/vlib/sockets/tls.h"
    #include "/Volumes/persistance/private/vinc/vlib/include/vlib/sockets/https.h"
    #include "/Volumes/persistance/private/vinc/vlib/include/vlib/sockets/smtp.h"
    #include "/Volumes/persistance/private/vinc/vlib/include/vlib/cli.h"
#elif __has_include("/Users/administrator/persistance/private/vinc/vlib/include/vlib/types.h")
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/types.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/compression.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/crypto.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/sockets/tls.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/sockets/https.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/sockets/smtp.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/cli.h"
#elif __has_include("/home/administrator/persistance/private/vinc/vlib/include/vlib/types.h")
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/types.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/compression.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/crypto.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/sockets/tls.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/sockets/https.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/sockets/smtp.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/cli.h"
#else
    #include <vlib/types.h>
    #include <vlib/compression.h>
    #include <vlib/crypto.h>
    #include <vlib/sockets/tls.h>
    #include <vlib/sockets/https.h>
    #include <vlib/sockets/smtp.h>
    #include <vlib/cli.h>
#endif

// Shortcuts.
namespace vweb {
using namespace vlib::types::shortcuts;
}

// SEO warnings.
#ifndef vweb_seo_warnings
#define vweb_seo_warnings true
#endif

// Production mode.
#ifndef vweb_production
#define vweb_production true
#endif

// Includes.
#include "html/html_builder.h"
#include "ui/_include.h"
#include "server/_include.h"
#include "utils/_include.h"

// End header.
#endif
