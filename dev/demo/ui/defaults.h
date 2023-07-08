// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Top bar button.
auto TopBarButton(const String& text, const String& redirect, const Bool& underline = true) {
    return VStack {
        Text(text)
            .color("#FFFFFF")
            .padding(0)
            .margin(0)
            .drop_shadow(1, 1, 2, "#00000095"),
        IfEndpointEq(redirect, Divider()
                     .background("#FFFFFF")
                     .margin(2.5, 0.0, 0.0, 0.0)
                     .height(underline ? 2 : 0)
                     .shadow(1, 1, 2, "#00000050")
        )
    }
    .padding(2.5, 12.5, 2.5, 12.5)
    .margin_right(10)
    .align("center")
    .on_click(Redirect(redirect))
    .move();
}
    
// Top Bar.
VStack TopBar() {
    return VStack {
        
        // Vars.
        SetVariable("mobile_menu_open", false),
        
        // Desktop.
        IfDeviceWidthGreaterEq(650,
            HStack {
                Image("/icon.png")
                    .width(25)
                    .height(25)
                    .margin_top(0)
                    .margin_right(10),
                TopBarButton("SkiShop", "/", false),
                Spacer(),
                TopBarButton("Home", "/"),
                TopBarButton("Store", "/store"),
                TopBarButton("About Us", "/about_us"),
                TopBarButton("Contact", "/contact"),
            }
            .padding(20, 15, 10, 15)
        )
		.id("DesktopTopBar"),
            
        // Mobile.
        IfDeviceWidthLesser(650,
            HStack {
                Spacer(),
                Image("menu.white.png")
                    .width(25)
                    .height(25)
                    .margin_top(10)
                    .margin_right(15)
                    .drop_shadow(1, 1, 5, "#00000050")
                    .on_click(Event {
                        ToggleVariable("mobile_menu_open"),
                    }),
            }
            .padding(10, 15, 15, 15)
        ),
    }
    .move();
}
        
// Menu view button.
HStack MenuViewButton(const String& text, const String& redirect) {
    return HStack {
        Text(text)
            .margin(0)
            .padding(0)
            .align(alignment::leading)
            .stretch(true),
        Image("arrow.red.png")
            .width(15)
            .height(15)
    }
    .margin_top(15)
    .on_click(Redirect(redirect))
    .move();
}

// Menu view for small devices.
IfVariableEq MenuView() {
    return IfVariableEq("mobile_menu_open", true,
        VStack {
            MenuViewButton("Home", "/"),
            Divider()
                .margin_top(10)
                .opacity(10),
            
            MenuViewButton("Store", "/store"),
            Divider()
                .margin_top(10)
                .opacity(10),
            
            MenuViewButton("About Us", "/about_us"),
            Divider()
                .margin_top(10)
                .opacity(10),
            
            MenuViewButton("Contact", "/contact"),
            Divider()
                .margin_top(10)
                .opacity(10),
            
            Spacer(),
            
            VStack {
                Image("/icon.png")
                    .width(30)
                    .height(30)
                    // .margin_top(10)
                    // .margin_right(15)
                    .margin_bottom(25)
                    .border_radius(5)
                    .overflow("hidden")
            }
            .align(alignment::center)
            .vertical_align(alignment::trailing)
        }
        .height("100%")
    )
    .padding(15)
    .background("#FFFFFF")
    .shadow(1, 1, 5, "#00000050")
    .width("70%")
    .height("100%")
    .position("absolute")
    .top(0)
    .left(0)
    .bottom(0)
    .z_index(1000)
    .animate(animations::in, "SlideRight", 0.5)
    .animate(animations::out, "SlideLeft", 0.5)
    .move();
}

// Background.
// Image Background() {
//     return Image ("background_1.jpg")
//         .blur(5)
//         .position("absolute")
//         .top(0)
//         .right(0)
//         .bottom(0)
//         .left(0)
//         .brightness(65)
//         .move();
// }
VStack Background() {
    return VStack ()
        .position("absolute")
        .top(0)
        .right(0)
        .bottom(0)
        .left(0)
        .background(RadialGradient(180, "red", 0.0, "yellow", 0.5, "green", 1.0))
        .move();
}

