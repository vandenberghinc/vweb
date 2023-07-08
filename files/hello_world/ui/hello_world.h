
// Hello world view.
Endpoint hello_world() {
	return Endpoint {
		"/",
		View {
			Title("Hello World!"),
		}
		.meta_title("Hello World!")
		.meta_description("This is a hello world web page.")
	};
}
