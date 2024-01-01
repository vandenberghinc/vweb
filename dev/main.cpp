// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// #include "generate_element_funcs.cpp"
#include "bundle_js.cpp"

/*
#include "../include/vweb/vweb.h"
int main() {
	
	// vweb::Stripe stripe("XXX");
	vweb::Stripe stripe ("XXX");
	
	const vweb::Stripe::Product product = {
		.id = "vdocs_test_product_1",
		.name = "Test product",
		.description = "Test product description.",
		.currency = "eur",
		.price = 0.5,
	};
	const vweb::Stripe::PaymentMethod payment_method {
		.type = "ideal",
	};
	// const vlib::String customer = "cus_OLUlDhjfdkBlYt"; // live.
	const vlib::String customer = "cus_OLqFAhvjpsg4TE"; // test.
	
	stripe.products() = {product};
	stripe.check_products();
	vlib::Json response = stripe.charge(customer, payment_method, {product.id}, "https://mywebsite.com/checkout/success");
	print(response.dump());
	
	// stripe.check_products({product});
}
*/

// #include "../files/hello_world/start.cpp"
// #include "../main/vweb.cpp"

// #include "/Volumes/persistance/private/dev/vinc/vlib/include/vlib/types.h"
// void* read_thread(void*) {
//     while (true) {
//         vlib::String data = vlib::String::load("/tmp/test");
//         if (data == "Hello World!") {
//             print("[", data, ']');
//         }
//     }
// }
// void* write_thread(void*) {
//     while (true) {
//         vlib::Path::save("/tmp/test", "Hello World!");
//     }
// }
// int main() {
//     vlib::Thread t1, t2;
//     t1.start(read_thread);
//     t2.start(write_thread);
//     t1.join();
//     t2.join();
//     return 0;
// }
