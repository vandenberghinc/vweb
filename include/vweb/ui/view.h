/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UI_VIEW_H
#define VWEB_UI_VIEW_H


// Namespace vweb.
namespace vweb {

// Namespace ui.
namespace ui {

// google tag id.
static String 	google_tag;

// JS View.
// @TODO rename to View.
struct JSView {
	
	// ---------------------------------------------------------
	// Attributes.
	
	String 			source; 		// javascript source.
	Array<String> 	includes; 		// javascript includes.
	Array<String>	css_includes; 	// css includes.
	
	// ---------------------------------------------------------
	// Meta attributes.
	
	String	meta_author; 		// meta author.
	String  meta_title; 		// meta title.
	String  meta_description; 	// meta description.
	String  meta_image; 		// meta image's url.
	String  meta_robots; 		// meta robots content.
	
	// ---------------------------------------------------------
	// Functions.
	
	// Is defined.
	constexpr
	bool 	is_defined() const {
		return source.is_defined();
	}
	
	// Build.
	constexpr
	String 	build() const {
		String data;
		
		// Doctype.
		data << "<!DOCTYPE html><html>";
		
		// Headers.
		data << "<head>";
		
		// Default meta data.
		data << "<meta charset='UTF-8'>" << "\n";
		data << "<meta name='viewport' content='width=device-width, initial-scale=1' />" << "\n";
		
		// Meta author.
		data << "<meta name='author' content='" << meta_author << "' />" << "\n";
		
		// Meta title.
		data << "<title>" << meta_title << "</title>" << "\n";
		data << "<meta property='og::title' content='" << meta_title << "' />" << "\n";
		data << "<meta property='twitter::title' content='" << meta_title << "' />" << "\n";
		
		// Meta description.
		data << "<meta name='description' content='" << meta_description << "' />" << "\n";
		data << "<meta property='og::description' content='" << meta_description << "' />" << "\n";
		
		// Meta image.
		data << "<meta property='og::image' content='" << meta_image << "' />" << "\n";
		
		// Meta robots.
		data << "<meta name='robots' content='" << meta_robots.def("index, follow") << "'>" << "\n";
		
		// Favicon.
		data << "<link rel='icon' href='/favicon.ico' type='image/x-icon' />" << "\n";
		
		// Stylesheet.
		data << "<link rel=\"stylesheet\" href=\"/vweb/vweb.css\">" << "\n";
		data << "<link rel=\"stylesheet\" href=\"/vweb/vhighlight.css\">" << "\n";
		for (auto& src: css_includes) {
			data << "<link rel=\"stylesheet\" href=\"" << src << "\">" << "\n";
		}
		
		// End headers.
		data << "</head>\n";
		
		// Google tag.
		if (google_tag.is_defined()) {
			data <<
			"<script async src='https://www.googletagmanager.com/gtag/js?id=" << google_tag << "'></script>";
		}
		
		// JS includes.
		data << "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js'></script>" << "\n";
		data << "<script src='/vweb/vweb.js'></script>" << "\n";
		for (auto& src: includes) {
			data << "<script src='" << src << "'></script>" << "\n";
		}
		
		// JS source.
		data << "<script src='" << source << "'></script>" << "\n";
		
		// Body.
		data << "<body id='body'></body>\n";
		
		// End.
		data << "</html>" << "\n";
		
		// Handler.
		return data;
	}
};

// ---------------------------------------------------------
// End.

};         // End namespace ui.
};         // End namespace vweb.
#endif     // End header.

