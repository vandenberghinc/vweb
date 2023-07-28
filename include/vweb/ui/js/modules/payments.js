/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Payments module.
vweb.payments = {};

// Initialize stripe.
vweb.payments.stripe = {};

/* The products.
 * A product object looks like: 
 * {
 *     id: "my_product",
 *     name: "My product",
 *     description: "My product description",
 *     price: 0.00,
 *     currency: "",
 *     recurring: false,
 *     interval: "day",
 *     interval_count: 30,
 * }
*/
vweb.payments.products = [];
vweb.payments.selected_products = [];

// Find a product by id.
vweb.payments.find_product = function(product_id) {
	for (let i = 0; i < vweb.payments.products.length; i++) {
		const p = vweb.payments.products[i];
		if (e.id == product_id) {
			return p;
		}
	}
	console.error("Product \"", product_id, "\" does not exist.");
	return null;
}

// Add a product to the selected products.
vweb.payments.add_product = function(product_id) {
	vweb.payments.selected_products.push(vweb.payments.products.find_product(product_id));
}

// Remove a product from the selected products.
vweb.payments.remove_product = function(product_id) {
	new_products = [];
	for (let i = 0; i < vweb.payments.selected_products.length; i++) {
		const p = vweb.payments.selected_products[i];
		if (e.id != product_id) {
			new_products.push(p);;
		}
	}
	vweb.payments.selected_products = new_products;
}

// Charge the currently selected products.
// Sources:
// - https://stripe.com/docs/js/payment_intents/confirm_payment
vweb.payments.charge = function({
	return_url = window.location.href, 
	success = null, 
	error = null,
}) {

	// Make a charge request to the backend.
	product_ids = [];
	for (let i = 0; i < vweb.payments.selected_products.length; i++) {
		product_ids.push(vweb.payments.selected_products[i].id);
	}
	vweb.utils.request({
		method: "POST",
		url: "/backend/payments/charge",
		data: {
			products: product_ids,
		},
		success: function(status, response) {

			// Confirm the payment intent with stripe.
			if (response.client_secret != null) {
				vweb.payments.stripe.confirmPayment({
					clientSecret: response.client_secret,
					confirmParams: {
						return_url: return_url,
						payment_method: repsonse.payment_method_id,
					},
				})
			}

			// Handler.
			if (success != null) {
				success();
			}
		},
		error: error,
	});
}
