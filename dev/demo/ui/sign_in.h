// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Sign In.
Endpoint signin() {
    return Endpoint {
        "/signin",
        View {
            Background(),
            TopBar(),
            MenuView(),
            VStack {
                
                // Login widget.
                VStack {
                    // VStack {
                    Title("Sign In")
                        .color("#FFFFFF")
                        .font_size(32)
                        .font_weight(400)
                        .margin_top(25)
                        .margin_bottom(25)
                        .drop_shadow(1, 1, 2, "#00000050"),
                    HStack {
                        Image ("username.png")
                            .width(15)
                            .height(15)
                            .margin(1, 5, 0, 5),
                        Input("Email")
                            .id("email")
                    }
                    .padding(5)
                    .color("black")
                    .border_radius(10)
                    .background("#F5F7F9")
                    .margin_bottom(10)
                    .shadow(1, 1, 2, "#00000075"),
                    HStack {
                        Image ("password.png")
                            .width(15)
                            .height(15)
                            .margin(1, 5, 0, 5),
                        PasswordInput("Password")
                            .id("password")
                    }
                    .padding(5)
                    .color("black")
                    .border_radius(10)
                    .background("#F5F7F9")
                    .shadow(1, 1, 2, "#00000075"),
                    Variable("error", false),
                    IfVariableEq("error", true, VStack {
                        Text("")
                            .id("error")
                            .color("#74140C")
                            .margin_top(15)
                            .align("center")
                    }),
                    Button("Sign In")
                        .color("#FFFFFF")
                        .background("#74140C")
                        .margin_top(25)
                        .padding_top(10)
                        .padding_bottom(10)
                        .shadow(1, 1, 2, "#00000075")
                        .on_click(Request {
                            "GET",
                            "/backend/signin",
                            RequestBody {
                                {"email", GetElementById("email").get_value()},
                                {"password", GetElementById("password").get_value()},
                            },
                            Event {
                                Redirect("/"),
                            },
                            Event {
                                SetVariable("error", true),
                                GetElementById("error").text(JavaScript("response.error")),
                            }
                        }),
                }
                .max_height(400)
                .width(275)
                .margin_bottom(300)
                //     .padding_bottom(25)
                //     .width(250),
                // }
                // .shadow(1, 1, 5, "#00000050")
                // .min_width(500)
                // .max_width(600)
                // .min_height(300)
                // .margin_bottom(200)
                // .border_radius(15)
                // .color("black")
                // .background_blur(25)
                // .align("center")
                // .vertical_align("center"),
                
            }
            .height("95%")
            .align("center")
            .vertical_align("center")
        }
        .meta_title("Ski Shop - Sign In")
        .font_family("Avenir Next")
        .color("#222222")
        
    };
}
