// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Home.
Endpoint home() {
    return Endpoint {
        "GET", "/",
        {
            // .auth = Endpoint::authenticated
        },
        View {
            Background(),
            TopBar(),
            MenuView(),
            Scroller {
                
                // Header.
                VStack {
                    VStack {
                        Title("Ski Shop")
                            .color("#FFFFFF")
                            .font_size(38)
                            .font_weight(500)
                            .margin_top(25)
                            .margin_bottom(25)
                            .drop_shadow(1, 1, 2, "#00000095"),
                        Text("Shi Shop helps you to enjoy the snow with the best gear available.")
                            .color("#FFFFFF")
                            .font_size(18)
                            .font_weight(400)
                            .margin_top(15)
                            .align(alignment::center)
                            .wrap(true)
                            .drop_shadow(1, 1, 2, "#00000095"),
                        Button("Store")
                            .color("#FFFFFF")
                            .border_radius(25)
                            .background("#74140C")
                            .margin_top(35)
                            .padding_top(10)
                            .padding_bottom(10)
                            .width(200)
                            .shadow(1, 1, 2, "#00000075"),
                    }
                    .padding_bottom(25)
                    .max_width(600)
                    .align(alignment::center),
                }
                .color("black")
                .min_height(350)
                .align(alignment::center)
                .vertical_align(alignment::center),
                
                // Content.
                VStack {
                    
                    // Categories.
                    VStack {
                        HStack {
                            ForEach(Array<String>{"Snowboarding", "Skiing", "Hiking", "Ice Skating", "Climbing"}, [](const String& item) {
                                return ZStack {
                                    Image(item.variable_name() << ".jpg")
                                        .height("100%"),
                                    VStack {
                                        Text(item)
                                            .font_size(18)
                                            .font_weight(500)
                                            .color("#FFFFFF")
                                            .align(alignment::center),
                                        Button("Shop")
                                            .color("#FFFFFF")
                                            .border_radius(25)
                                            .border(2, "#FFFFFF")
                                            .margin_top(30)
                                            .align(alignment::center),
                                        
                                    }
                                    .padding(40, 30, 40, 30)
                                    // .position(0, 0, 0, 0)
                                    .background("#74140C99")
                                    .vertical_align(alignment::center)
                                }
								.margin(10)
                                .border_radius(10)
                                .overflow("hidden")
                                .stretch(true)
                                .min_width(200)
                                .shadow(1, 1, 5, "#00000050");
                            })
                        }
                        .width("100%")
                        .max_width(1600)
                    }
                    .margin_top(25)
                    .padding(20, 15, 20, 15)
                    .background("#FFFFFF")
                    .shadow(1, 1, 5, "#00000050")
                    .align(alignment::center),
                    
                    // Popular products.
                    VStack {
                        Title("Popular products")
                            .margin_top(0),
                        VStack {
                            HStack {
                                ForEach(Array<Array<String>>{
                                    {"Armada Reliance 82 TI Skis", "499,-"},
                                    {"Atomic Maverick 100 TI Skis", "499,-"},
                                    {"Dynastat Free 90 TI Skis", "499,-"},
                                    {"Elan Ripstick 94 TI Skis", "499,-"},
                                    {"K2 Mindbender 89 TI Skis", "499,-"},
                                    {"Rossingol Rallybird 92 TI Skis", "499,-"},
                                    {"Rossingol Sender 90 PRO Skis", "499,-"},
                                    {"Salomon MNT 86 PRO Skis", "499,-"},
                                    {"Salomon Stance 90 Skis", "499,-"},
                                }, [](const Array<String>& item) {
                                    return VStack {
                                        Image(to_str("products/", item[0], ".png"))
                                            .margin_top(25),
                                        Text(item[0])
                                            .font_size(18)
                                            .font_weight(500)
                                            .color("#222222")
											.margin_top(25)
                                            .align(alignment::center),
                                        Text(to_str("$", item[1]))
                                            .font_size(18)
                                            .font_weight(500)
                                            .color("#74140C")
											.margin_top(5)
                                            .align(alignment::center),
                                    }
                                    .id(item[0])
									.padding(20)
                                    .margin(0, 10, 20, 10)
									.border_radius(10)
									.background("#FFFFFF") // required for filters from button activity set by on_click.
									.width_by_columns(5)
                                    .on_click(Redirect("/"));
                                }),
                                ForEach(Array<String>{
                                    "Armada Reliance 82 TI Skis",
                                    "Atomic Maverick 100 TI Skis",
                                    "Dynastat Free 90 TI Skis",
                                    "Elan Ripstick 94 TI Skis",
                                    "K2 Mindbender 89 TI Skis",
                                    "Rossingol Rallybird 92 TI Skis",
                                    "Rossingol Sender 90 PRO Skis",
                                    "Salomon MNT 86 PRO Skis",
                                    "Salomon Stance 90 Skis",
                                }, [](const String& item) {
                                    return VStack {
                                        IfDeviceWidthGreaterEq(1200, GetElementById(item).width_by_columns(5)),
										IfDeviceWidthLesser(1200, GetElementById(item).width_by_columns(4)),
										IfDeviceWidthLesser(1000, GetElementById(item).width_by_columns(3)),
                                        IfDeviceWidthLesser(800, GetElementById(item).width_by_columns(2)),
                                        IfDeviceWidthLesser(600, GetElementById(item).width_by_columns(1)),
                                    };
                                }),
                            }
                            .wrap(true)
                            .width("100%")
                        }
                        .margin_top(25)
                        .width("100%")
                        .max_width(1600)
                        .align(alignment::center),
                    }
                    .margin_top(25)
                    .padding(50, 15, 50, 15)
                    .background("#FFFFFF")
                    .shadow(1, 1, 5, "#00000050")
                    .align(alignment::center),
                        
                    // Spacer().height(400).width("100%"),
                }
                .background("none")
                .padding_bottom(100)
            }
            // .fade_out_top(1)
            // .fade_out_bottom(1.5)
            .height("100%")
        }
        .meta_title("Ski Shop - Home")
        .meta_description("Welcome to Ski Shop.")
        .meta_image("icon.png")
        .font_family("Avenir Next")
        .color("#222222")
    };
}
