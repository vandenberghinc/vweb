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
    #include "/Volumes/persistance/private/vinc/vlib/include/vlib/sockets/smtp.h"
    #include "/Volumes/persistance/private/vinc/vlib/include/vlib/cli.h"
    #include "/Volumes/persistance/private/vinc/vpackage/include/vpackage/vpackage.h"
#elif __has_include("/Users/administrator/persistance/private/vinc/vlib/include/vlib/types.h")
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/types.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/compression.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/crypto.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/sockets/tls.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/sockets/smtp.h"
    #include "/Users/administrator/persistance/private/vinc/vlib/include/vlib/cli.h"
    #include "/Users/administrator/persistance/private/vinc/vpackage/include/vpackage/vpackage.h"
#elif __has_include("/home/administrator/persistance/private/vinc/vlib/include/vlib/types.h")
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/types.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/compression.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/crypto.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/sockets/tls.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/sockets/smtp.h"
    #include "/home/administrator/persistance/private/vinc/vlib/include/vlib/cli.h"
    #include "/home/administrator/persistance/private/vinc/vpackage/include/vpackage/vpackage.h"
#else
    #include <vlib/types.h>
    #include <vlib/compression.h>
    #include <vlib/crypto.h>
    #include <vlib/sockets/tls.h>
    #include <vlib/sockets/smtp.h>
    #include <vlib/cli.h>
    #include <vpackage/vpackage.h>
#endif

// Shortcuts.
using namespace vlib::shortcuts::types;
using namespace vlib::exceptions;

// Includes.
#include "ui/_include.h"
#include "html/html.h"
#include "server/_include.h"
#include "utils/_include.h"

// End header.
#endif
