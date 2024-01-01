/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_SERVER_CONFIG_H
#define VWEB_SERVER_CONFIG_H


// Namespace vweb.
namespace vweb {

// ---------------------------------------------------------
// Server.

/* @docs {
    @chapter: server
    @title: Config
    @description:
        Website server config.
} */
struct ServerConfig {
    String  ip;                 // webserver ip.
    Int     port;               // webserver port.
    String  cert;               // path to the certificate.
    String  key;                // path to the certificate key.
    String  pass;               // the password of the certificate.
    Path    statics;            // path to static directory.
    Path    database;           // path to database.
    Int     max_threads = 25;   // max serve clients threads.
    Int     log_level = 1;      // log level [0...2].
    vlib::smtp::Client::ConstructArgs smtp; // the smtp client args.
};

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

