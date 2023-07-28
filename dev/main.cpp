// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

#include "../include/vweb/vweb.h"
int main() {
	
	vweb::Stripe stripe("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");
	// vweb::Stripe stripe("c2tfdGVzdF9PWTJrc1F2ZnhPR3FGYXhlRlJwNW5UU2MwMFd0T1BPbXBMOg==");
	
	const vweb::Stripe::Product product = {
		.id = "vdocs_test_product",
		.name = "Test product",
		.description = "Test product description.",
		.currency = "eur",
		.price = 4.99,
	};
	const vlib::String customer = "cus_OLUlDhjfdkBlYt";
	const vweb::Stripe::PaymentMethod payment_method {
		.type = "ideal",
	};
	
	stripe.charge(customer, payment_method, {product.id});
	
	// stripe.check_products({product});
}

// #include "generate_element_funcs.cpp"
// #include "bundle_js.cpp"

// #include "../files/hello_world/start.cpp"
// #include "../main/vweb.cpp"

// #include "/Volumes/persistance/private/vinc/vlib/include/vlib/types.h"
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
