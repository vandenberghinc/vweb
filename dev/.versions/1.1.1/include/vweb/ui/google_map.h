/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_GOOGLE_MAP_H
#define VWEB_UI_GOOGLE_MAP_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// ---------------------------------------------------------
// Derived elements.
// Google map.

String google_cloud_api_key = "";

struct GoogleMap : public Element {
    GoogleMap(const String& location) :
    Element("GoogleMap", "iframe")
    {
        String mode = "place";
        Json params = {
            {"q", location.replace(' ', '+')},
        };
        this->style({
            {"border", "none"}
        });
        this->attr({
            {"width", "100%"},
            {"height", "100%"},
            {"frameborder", "0"},
            {"style", "border:0"},
            {"referrerpolicy", "no-referrer-when-downgrade"},
            {"src", toString("https://www.google.com/maps/embed/v1/", mode, "?key=", google_cloud_api_key, "&", vlib::url_encode(params))},
            {"allowfullscreen", ""},
        });
    }
};

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

