/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_STRIPE_H
#define VWEB_STRIPE_H

// Namespace vweb.
namespace vweb {

// Stripe error.
struct StripeError; CREATE_EXCEPTION(StripeError, "StripeError");

// Stripe payments.
// Docs: https://stripe.com/docs/api/
struct Stripe {
	
	// ---------------------------------------------------------
	// Structs.
	
	// A product object.
	struct Product {
		String 	id;						// stripe product id, should be assigned and unique accross your stripe account.
		String 	price_id;				// stripe price id.
		String	name;					// name for users.
		String 	description;			// description for users.
		String	currency;				// three letter ISO currency code.
		Float	price;	 				// can use cents.
		Bool	recurring = false;		// enable for recurring subscriptions.
		String	interval = "day";		// interval for subscriptions.
		Int		interval_count = 30;	// interval count for subscriptions.
		
		constexpr
		Json	json() const {
			return Json {
				{"id", id},
				{"price_id", price_id},
				{"name", name},
				{"description", description},
				{"currency", currency},
				{"price", price},
				{"recurring", recurring},
				{"interval", interval},
				{"interval_count", interval_count},
			};
		}
	};
	
	// A payment method object.
	struct PaymentMethod {
		String	id; 			// does not need to be assigned.
		String	type; 			// should be "card" when using the "card_x" attributes.
		String 	card_number;	// card number.
		Int 	card_exp_month;	// card expiration month (MM).
		Int 	card_exp_year;	// card expiration year (YYYY)
		Int 	card_cvc;		// card cvc.
		
		// Parse from json.
		SICE
		PaymentMethod parse(const Json& json) {
			PaymentMethod method {
				.id = json.value("id", 2).ass(),
				.type = json.value("type", 4).ass(),
			};
			if (method.type.eq("card", 4)) {
				Json& card = json.value("card", 4).asj();
				method.card_number.fill_r(12, '*');
				method.card_number << card.value("last4", 4).ass();
				method.card_exp_month = card.value("exp_month", 9).asi();
				method.card_exp_year = card.value("exp_year", 8).asi();
				method.card_cvc = card.value("cvc", 3).asi();
			}
			return method;
		}
	};
	
	// A charge object.
	struct ChargeProduct {
		String 	id;
		Int		quantity = 1;
	};
	struct Charge {
		String 					payment_type; 			// should be "card" when using the "card_x" attributes.
		String 					card_number;			// card number.
		String 					card_exp_month;			// card expiration month (MM).
		String 					card_exp_year;			// card expiration year (YYYY)
		String 					card_cvc;				// card cvc.
		String 					customer; 				// the customer id.
		Array<ChargeProduct>	products; 				// the product ids.
		Array<String> 			discounts; 				// array with discount ids.
		Int 					trial_period = 0; 		// trial period in days for subscriptions.
		Bool 					automatic_tax = true; 	// let stripe compute the tax automatically.
	};
	
	// ---------------------------------------------------------
	// Aliases.
	
	using Response = vlib::http::Response;
	using Client = vlib::https::Client<
		vlib::sockets::family::ipv4,
		vlib::sockets::type::stream,
		vlib::sockets::protocol::undefined,
		1024,
		false,
		vlib::tls::version::any, // the minimum tls version.
		vlib::http::version::v1_1 // the http version.
	>;
	
	// ---------------------------------------------------------
	// Attributes.
	
	String 			m_secret_key;
	String 			m_publishable_key;
	Client			m_client;
	Array<Product> 	m_products;
	
	// ---------------------------------------------------------
	// Constructor.
	
	// Default constructor.
	constexpr Stripe() :
	m_client({
		.host = "https://api.stripe.com",
		.sni = "api.stripe.com",
		.headers = {
			{"Host", "api.stripe.com"},
		},
		.query = true,
	})
	{}
	
	// Constructor.
	constexpr Stripe(const String& secret_key, const String& publishable_key) :
	m_secret_key(secret_key),
	m_publishable_key(publishable_key),
	m_client({
		.host = "https://api.stripe.com",
		.sni = "api.stripe.com",
		.headers = {
			{"Host", "api.stripe.com"},
			{"Authorization", to_str("Bearer ", secret_key)},
		},
		.query = true,
	})
	{}
	
	// Assign.
	constexpr
	void	assign(const String& secret_key, const String& publishable_key) {
		m_secret_key = secret_key,
		m_publishable_key = publishable_key,
		m_client.m_headers["Authorization"] = to_str("Bearer ", secret_key);
	}
	
	// Is defined.
	constexpr bool is_defined() { return m_secret_key.is_defined(); }
	
	// Is undefined.
	constexpr bool is_undefined() { return m_secret_key.is_undefined(); }
	
	// ---------------------------------------------------------
	// Utils.
	
	// Make a request.
	Response	request(short method, const String& endpoint) {
		return handle_response(m_client.request(method, endpoint, 10000));
	}
	Response	request(short method, const String& endpoint, const String& body) {
		return handle_response(m_client.request(method, endpoint, body, 10000));
	}
	Response	request(short method, const String& endpoint, const Json& body) {
		return handle_response(m_client.request(method, endpoint, vlib::url_encode(body), 10000));
	}
	Response	handle_response(const Response& response) {
		if (response.status() != 200) {
			Json json;
			try {
				json = response.json();
			} catch (...) {
				throw StripeError(response.body());
			}
			ullong index;
			if ((index = json.find("error", 5)) != NPos::npos) {
				Json& error = json.value(index).asj();
				if ((index = error.find("message", 7)) != NPos::npos) {
					print(error.value(index).ass().ensure_end_padding_r('.', 1));
					throw StripeError(error.value(index).ass().ensure_end_padding_r('.', 1));
				}
			}
		}
		return response;
	}
	
	// ---------------------------------------------------------
	// Products.
	
	// Get the stripe products array.
	// Should be assigned with all products.
	constexpr auto& products() { return m_products; }
	constexpr auto& products() const { return m_products; }
	
	// Create a product.
	// Required for all subscriptions and products.
	Product	create_product(const Product& product) {
		String body;
		body << "id=" << product.id <<
		"&name=" << vlib::url_encode(product.name) <<
		"&description=" << vlib::url_encode(product.description) <<
		"&default_price_data[currency]=" << product.currency <<
		"&default_price_data[unit_amount_decimal]=" << product.price.round(2) * 100;
		if (product.recurring) {
			body <<
			"&default_price_data[recurring][interval]=" << product.interval <<
			"&default_price_data[recurring][interval_count]=" << product.interval_count;
		}
		Json response = request(vlib::http::method::post, "/v1/products", body).json();
		Product p = product;
		p.id = response.value("id", 2).ass();
		return p;
	}
	
	// Check products.
	// - Checks if the products array also exists in stripe.
	// - The id's should be assigned or an exception will be thrown.
	//   The id's should be unique accross your entire stripe account.
	void	check_products() {
		check_products(m_products);
	}
	void	check_products(const Array<Product>& products) {
		Array<Product> current_products = fetch_products();
		for (auto& product: products) {
			if (product.id.is_undefined()) {
				throw StripeError("The product id should be defined.");
			}
			bool found = false;
			for (auto& current_product: current_products) {
				if (product.id == current_product.id) {
					found = true;
					break;
				}
			}
			if (!found) {
				create_product(product);
			}
		}
	}
	
	// Get all products.
	Array<Product> fetch_products() {
		
		// Result var.
		Array<Product> products;
		
		// Fetch all products, supports pagination.
		String body;
		body << "limit=100"; // max.
		String* starting_after = NULL;
		ullong index = 0;
		Json response;
		for (int i = 0; i < 10000; ++i) {
			
			// Request.
			if (starting_after == NULL) {
				response = request(vlib::http::method::get, "/v1/products", body).json();
			} else {
				response = request(vlib::http::method::get, "/v1/products", to_str(body, "&starting_after=", *starting_after)).json();
			}
			if ((index = response.find("data", 4)) == NPos::npos) {
				throw StripeError("Product response does not contain a data array.");
			}
			
			// Append and parse products.
			for (auto& x: response.value(index).asa()) {
				Json& j = x.asj();
				Product product {
					.id = move(j.value("id", 2).ass()),
				};
				JsonValue& val = j.value("default_price", 13);
				if (val.iss()) {
					product.price_id = move(val.ass());
				}
				val = j.value("name", 4);
				if (val.iss()) {
					product.name = move(val.ass());
				}
				val = j.value("description", 11);
				if (val.iss()) {
					product.description = move(val.ass());
				}
				products.append(vlib::move(product));
			}
			
			// Stop if not any more.
			if ((index = response.find("has_more", 8)) != NPos::npos &&
				response.value(index).isb() &&
				response.value(index).asb() == false
			) {
				break;
			}
			
			// Set starting after.
			if (products.len() == 0) {
				break;
			}
			starting_after = &products.last().id;
			
		}
		
		// Expand the price objects and fill the products array.
		for (auto& product: products) {
			if (product.price_id.is_undefined()) {
				// Some products no longer have a price object, for example archived products.
				continue;
				// throw StripeError("Price id is undefined.");
			}
			Json price = request(vlib::http::method::get, to_str("/v1/prices/", product.price_id)).json();
			JsonValue& val = price.value("currency", 8);
			if (val.iss()) {
				product.currency = move(val.ass());
			}
			// val = price.value("unit_amount", 11);
			// if (val.isi()) {
			// 	product.price = val.asi();
			// }
			val = price.value("unit_amount_decimal", 19);
			if (val.iss()) {
				product.price = (val.ass().as<Float>() / 100).round_r(2);
			}
			val = price.value("recurring", 9);
			if (val.isj()) {
				Json& recurring = val.asj();
				JsonValue& rval = recurring.value("interval", 8);
				if (rval.iss()) {
					product.interval = move(rval.ass());
				}
				rval = recurring.value("interval_count", 14);
				if (rval.isi()) {
					product.interval_count = rval.asi();
				}
			}
		}
		return products;
	}
	
	// ---------------------------------------------------------
	// Customers.
	
	// Create a customer.
	// Required to charge a quote.
	// Returns the customer id.
	String	create_customer() {
		Json response = request(vlib::http::method::post, "/v1/customers").json();
		JsonValue& customer_id = response.value("id", 2);
		if (!customer_id.iss()) {
			throw StripeError("Stripe customer id is not a string.");
		}
		return customer_id.ass();
	}
	
	// Delete a customer.
	// Required to charge a quote.
	// Returns the customer id.
	void	delete_customer(const String& customer_id) {
		Json response = request(vlib::http::method::del, to_str("/v1/customers/", customer_id)).json();
		if (!response.value("deleted", 7).asb()) {
			throw StripeError("Failed to delete stripe customer \"", customer_id, "\".");
		}
	}
	
	// ---------------------------------------------------------
	// Payment methods.
	
	// Create a payment method.
	PaymentMethod	create_payment_method(
		const String& 	type,
		const String& 	card_number, 	// requires "type" to be "card".
		const Int& 		card_exp_month, // requires "type" to be "card".
		const Int& 		card_exp_year, 	// requires "type" to be "card".
		const Int& 		card_cvc 		// requires "type" to be "card".
	) {
		PaymentMethod payment_method {
			.type = type,
			.card_number = card_number,
			.card_exp_month = card_exp_month,
			.card_exp_year = card_exp_year,
			.card_cvc = card_cvc,
		};
		create_payment_method(payment_method);
		return payment_method;
	}
	void	create_payment_method(PaymentMethod& payment_method) {
		String body;
		body << "type=" << payment_method.type;
		if (payment_method.type == "card") {
			body <<
			"&card[number]=" << payment_method.card_number <<
			"&card[exp_month]=" << payment_method.card_exp_month <<
			"&card[exp_year]=" << payment_method.card_exp_year <<
			"&card[cvc]=" << payment_method.card_cvc;
		}
		Json response = request(vlib::http::method::post, "/v1/payment_methods", body).json();
		ullong index;
		if ((index = response.find("id", 2)) == NPos::npos) {
			throw StripeError("Stripe response does not contain an id.");
		}
		payment_method.id = response.value(index).ass();
	}
	
	// Set the customers payment method.
	void	set_payment_method(const String& customer_id, const PaymentMethod& payment_method) {
		
		// Remove all current payment methods.
		Array<PaymentMethod> methods = get_payment_methods(customer_id);
		for (auto& m: methods) {
			delete_payment_method(m.id);
		}
		
		// Check id.
		if (payment_method.id.is_undefined()) {
			throw StripeError("The id of the payment method is undefined, use \"create_payment_method()\" to create the payment method.");
		}
		
		// Attach to customer.
		request(
			vlib::http::method::get,
			to_str("/v1/payment_methods/", payment_method.id, "/attach"),
			to_str("customer=", customer_id)
		).json();
		
	}
	
	// Get payment methods for a customer.
	Array<PaymentMethod> get_payment_methods(const String& customer_id) {
		Array<PaymentMethod> methods;
		Json response = request(vlib::http::method::get, to_str("/v1/customers/", customer_id, "/payment_methods")).json();
		for (auto& i: response.value("data", 4).asa()) {
			methods.append(PaymentMethod::parse(i.asj()));
		}
		return methods;
	}
	
	// Delete a payment method for a customer.
	void	delete_payment_method(const String& payment_method_id) {
		request(vlib::http::method::get, to_str("/v1/payment_method/", payment_method_id, "/detach")).json();
	}
	
	// ---------------------------------------------------------
	// Payment intents.
	// Used for one-off payments.
	
	// Create a payment indent.
	// - Can only charge a single product.
	// - Returns the payment intent's client secret.
	// - The id of the payment method should be assigned.
	// - Sources:
	//   * https://stripe.com/docs/api/payment_intents/create
	//   * https://stripe.com/docs/payments/accept-a-payment-synchronously
	//   * https://stripe.com/docs/payments/payment-intents/verifying-status
	String	charge_payment_intent(
		const String& 			customer_id,
		const PaymentMethod& 	payment_method,
		const String& 			description,
		const Float& 			price,
		const String& 			currency,
		const String& 			return_url
	) {
		
		// Check id.
		if (payment_method.id.is_undefined()) {
			throw StripeError("The id of the payment method is undefined, use \"create_payment_method()\" to create the payment method.");
		}
		
		// Make request.
		String body;
		body << "amount=" << Int(price.round(2) * 100) <<
		"&currency=" << currency <<
		"&description=" << description <<
		"&customer=" << customer_id <<
		"&payment_method=" << payment_method.id <<
		"&payment_method_types[0]=" << payment_method.type <<
		"&return_url=" << return_url <<
		"&confirm=true";
		Json response = request(vlib::http::method::post, "/v1/payment_intents", body).json();
		print("PAYMENT INTENT: ", response.dump());
		
		// Fetch id.
		ullong index;
		if ((index = response.find("client_secret", 13)) == NPos::npos) {
			throw StripeError("Stripe response does not contain a client secret.");
		}
		return response.value(index).ass();
		
	}
	String	charge_payment_intent(
		const String& 			customer_id,
		const PaymentMethod& 	payment_method,
		const String& 			product_id,
		const String& 			return_url
	) {
		Product* product = NULL;
		for (auto& i: m_products) {
			if (i.id == product_id) {
				product = &i;
				break;
			}
		}
		if (product == NULL) {
			throw StripeError("Product \"", product_id, "\" does not exist.");
		}
		return charge_payment_intent(
			customer_id,
			payment_method,
			product->description,
			product->price,
			product->currency,
			return_url
		);
	}
	
	// Confirm a payment intent.
	// - Should be used when a new payment intent is created by the frontend when the old one requires an auth action.
	void	confirm_payment_intent(const String& payment_intent_id) {
		request(vlib::http::method::post, to_str("/v1/payment_intents/", payment_intent_id, "/confirm"));
	}
	
	// ---------------------------------------------------------
	// Subscriptions.
	
	// ---------------------------------------------------------
	// Charges.
	
	// Charge products (subscription / one-off).
	// - The id of the payment method does not have to be assigned.
	// - Returns a json object with the "client_secret" and the "payment_method_id" for the frontend.
	Json	charge(
		const String& 		 	customer_id,
		const PaymentMethod& 	payment_method,
		const Array<String>& 	product_ids,
		const String& 			return_url
	) {
		
		// Zero products.
		if (product_ids.len() == 0) {
			throw StripeError("No products were specified.");
		}
		
		// Load products.
		Array<Product*> products;
		for (auto& id: product_ids) {
			bool found = false;
			for (auto& product: m_products) {
				if (product.id == id) {
					products.append(&product);
					found = true;
					break;
				}
			}
			if (!found) {
				throw StripeError("Product \"", id, "\" does not exist.");
			}
		}
		
		// Create the payment method when the id is undefined.
		if (payment_method.id.is_undefined()) {
			create_payment_method(const_cast<PaymentMethod&>(payment_method));
		}
		
		// Create the subscriptions.
		// Requires a credit-card payment method.
		// @TODO.
		
		// Combine the prices of the one-off products.
		String& currency = products.first()->currency;
		Float one_off_price = 0;
		for (auto& product: products) {
			if (!product->recurring) {
				one_off_price += product->price;
				if (product->currency != currency) {
					throw StripeError("Can not charge multiple products with a different currency.");
				}
			}
		}
		
		// Charge the payment intent.
		JsonValue client_secret; // required for the frontend.
		if (one_off_price > 0) {
			client_secret = charge_payment_intent(
				customer_id,
				payment_method,
				"",
				one_off_price,
				currency,
				return_url
			);
		}
		
		// Return the response.
		return Json {
			{"payment_method_id", payment_method.id},
			{"client_secret", client_secret},
		};
		
	}
	
	
	// Charge a product (subscription / one-off) with a quote.
	// - Use a quote since this does not require seperate functions for subscriptions vs one-off payments.
	// - First all payment methods should be removed and the payment method should be added.
	// - A quote needs to be: drafted -> finalized -> accepted.
	// - Sources:
	//   * https://stripe.com/docs/api/quotes
	//   * https://stripe.com/docs/quotes/overview
	/*
	void	charge(const Charge& charge) {
		
		// Set payment method.
		
		
		// Create the quote.
		String quote;
		ullong index;
		
		// Add customer.
		// Should be first for the "&".
		quote << "customer=" << charge.customer;
		
		// Add products.
		index = 0;
		for (auto& i: charge.products) {
			quote << '&' << "line_items[" << index << "][price]=" << i.id;
			quote << '&' << "line_items[" << index << "][amount]=" << i.quantity;
			++index;
		}
		
		// Add discounts.
		index = 0;
		for (auto& i: charge.discounts) {
			quote << '&' << "discounts[" << index << "][discount]=" << i;
			++index;
		}
		
		// Trial period.
		if (charge.trial_period != 0) {
			quote << '&' << "subscription_data[trial_period_days]=" << charge.trial_period;
		}
		
		// - Enable "automatic_tax" to let strip compute the tax.
		quote << '&' << "automatic_tax[enabled]=" << charge.automatic_tax;
		
		// - Enable "collection_method charge_automatically".
		quote << '&' << "collection_method=charge_automatically";
	
		// - Enable "auto_advance" otherwise one-off payments that have failed ...
		//   Will remain the "open" status.
		
		// - Enable "payment_behaviour.allow_incomplete" since this ...
		//   Will set the status to "incomplete" for failed one-off payments.
		
		// - Disable "payment_behaviour.default_incomplete" since this ...
		//   Creates a start status of "incomplete" and another request is requered to confirm.
		
		// Create the quote.
		Json response = request(vlib::http::method::post, "/v1/quotes", quote).json();
		JsonValue& id_value = response.value("id", 2);
		if (!id_value.iss()) {
			throw StripeError("Stripe quote id is not a string.");
		}
		String& id = id_value.ass();
		
		// Finalize.
		request(vlib::http::method::post, to_str("/v1/quotes/", id, "/finalize"));
		
		// Accept.
		request(vlib::http::method::post, to_str("/v1/quotes/", id, "/accept"));
		
	}
	*/
	
};

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.
