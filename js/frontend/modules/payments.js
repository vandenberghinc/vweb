/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Payments module.
vweb.payments = {};
vweb.payments.shopping_cart = [];

// Initialize stipe.
vweb.payments._initialize_stripe = function() {
	if (this.stripe === undefined) {
		if (this.publishable_key == null) {
			throw Error("Define the \"vweb.payments.publishable_key\" attribute with your stripe publishable key.");
		}
		this.stripe = Stripe(this.publishable_key);
	}
}

// Initialize the strip elements object.
vweb.payments._initialize_elements = function() {
	if (this._elements == null) {
		if (this._client_secret == null) {
			throw Error("No payment intent was created using \"vweb.payments.charge()\" or the shopping cart has been edited after the initial charge.");
		}
		this._elements = this.stripe.elements({
			clientSecret: this._client_secret,
		});
	}
}

// Reset the charge objects after a shopping cart edit.
vweb.payments._reset = function() {
	this._client_secret = null;
	this._elements = null;
	if (this._address_element != null) {
		this._address_element.stripe_element.destroy();
	}
	this._address_element = null;
	if (this._payment_element != null) {
		this._payment_element.stripe_element.destroy();
	}
	this._payment_element = null;
	this._payment_intent_id = null;
}

// Fetch the payment products.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Payment Products
 *	@description: Get the backend defined payment products asynchronously.
 *	@type: array[object]
 *	@return: Returns the backend defined payment products.
 */
vweb.payments.get_products = async function() {
	return new Promise((resolve, reject) => {
		if (this._products !== undefined) {
			return this._products;
		}
		vweb.utils.request({
			method: "GET",
			url: "/vweb/backend/payments/products",
		})
		.then((products) => {
			this._products = products;
			resolve(this._products);
		})
		.catch((err) => {
			reject(err);
		})
	})
}

// Fetch a payment product by id.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Get Payment Product
 *	@description: Get the backend defined payment product by id asynchronously.
 *	@type: object
 *	@return: Returns the backend defined payment product.
 */
vweb.payments.get_product = async function(id) {
	return new Promise(async (resolve, reject) => {
		const products = await this.get_products();
		let product;
		products.iterate((p) => {
			if (p.id === id) {
				product = p;
				return true;
			}
			if (p.is_subscription) {
				return p.plans.iterate((plan) => {
					if (plan.id === id) {
						product = plan;
						return true;
					}
				});
			}
		})
		if (product === undefined) {
			return reject(`Product "${id}" does not exist.`);
		}
		resolve(product);
	})
}

// Create a payment element.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Has Pending Charge
 *	@description: Check if there is a pending charge payment intent. This can be used to detect if a new charge request should be made in order to initialize the payment elements.
 */
vweb.payments.has_pending_charge = function() {
	return this._client_secret != null;
}

// Charge the shopping cart.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Charge Shopping Cart
 *	@description: 
 *		Create a payment intent to charge the shopping cart asynchronously.
 *		The charge must still be confirmed using `vweb.payment.confirm_charge()`.
 *
 *		Throws an error when no products are added to the shopping cart.
 */
vweb.payments.charge = async function() {
	return new Promise(async (resolve, reject) => {
		// Reset vars.
		this._client_secret = null;
		this._return_url = null;
		this._elements = null;

		// Get the cart.
		vweb.payments.cart.refresh();
		
		// Check shopping cart.
		if (vweb.payments.cart.items.length === 0) {
			throw Error("No products were added to the shopping cart.");
		}

		// Create a backend request.
		try {
			const result = await vweb.utils.request({
				method: "POST",
				url: "/vweb/backend/payments/charge",
				data: {
					cart: vweb.payments.cart.items,
				}
			})
			this._client_secret = result.client_secret;
			this._return_url = result.return_url;
			resolve();
		} catch (error) {
			return reject(error);
		}
	})
}

// Charge the shopping cart.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Confirm Charge Shopping Cart
 *	@description: 
 *		Confirm the charge of the shopping cart asynchronously.
 */
vweb.payments.confirm_charge = async function() {
	return new Promise(async (resolve, reject) => {

		// Checks.
		if (this._client_secret == null) {
			throw Error("No payment intent was created using \"vweb.payments.charge()\" or the shopping cart has been edited after the initial charge.");
		}
		if (this._return_url == null) {
			throw Error("No payment intent was created using \"vweb.payments.charge()\".");
		}
		// Check the elements object.
		if (this._elements === undefined) {
			throw Error("No payment object was created using \"vweb.payments.create_payment_element()\".");
		}

		// Initialize stripe.
		this._initialize_stripe();

		// Submit the elements.
		let result = await this._elements.submit();
		if (result.error) {
			return reject(result.error.message);
		}

		// Confirm the payment intent.
		result = await this.stripe.confirmPayment({
			elements: this._elements,
			clientSecret: this._client_secret,
			redirect: "always",
			confirmParams: {
				return_url: this._return_url,
			},
		});

		// Handle error.
		if (result.error) {
			return reject(result.error.message);
		}

		// Clear the cart and charge session.
		this.cart.clear();

		// Resolve.
		resolve();
	})
}

// Get the status of the payment intent.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Charge Status
 *	@description: 
 *		Get the status of the payment intent.
 *
 *		The client secret of the payment intent can be retrieved from query parameter `payment_intent_client_secret` on the endpoint of the specified `return_url`.
 *	@param:
 * 		@title: client_secret
 *		@description: The client secret of the payment intent.
 *	@type: Promise
 *	@return:
 *		A promise will be returned with a rejected error message or a resolved response object.
 *
 *		The resolved response object will have the following attributes:
 *		```js
 *		{
 *			status: <string>,			// the status of the payment intent, possible status values are ["requires_payment_method", "requires_confirmation", "requires_action", "processing", "requires_capture", "canceled", "succeeded"].
 *			charged: <boolean>,			// a boolean indiciating whether the payment has successfully been charged.
 *			cancelled: <boolean>,		// a boolean indiciating whether the payment has been cancelled.
 *			processing: <boolean>,		// a boolean indiciating whether the payment is still proceessing.
 *			message: <string>,			// the message string of the status.
 *			payment_intent: <object>,	// the payment intent object.
 *		}
 *		```
 */
vweb.payments.charge_status = async function(client_secret) {
	return new Promise(async (resolve, reject) => {

		// Initialize stripe.
		this._initialize_stripe();

		// Get the payment intent.
		const result = await this.stripe.retrievePaymentIntent(client_secret);
		if (result.error) {
			return reject(response.error);
		}

		// Create the message.
		let message, charged = false, cancelled = false, processing = false;
		switch (result.paymentIntent.status) {
			case "requires_payment_method":
				message = "The payment requires a payment method.";
				break;
			case "requires_confirmation":
				message = "The payment requires confirmation.";
				break;
			case "requires_action":
				message = "The payment requires action.";
				break;
			case "processing":
				processing = true;
				message = "The payment is still processing.";
				break;
			case "requires_capture":
				message = "The payment requires capture.";
				break;
			case "canceled":
				cancelled = true;
				message = "The payment has been cancelled.";
				break;
			case "succeeded":
				charged = true;
				message = "The payment has succeeded.";
				break;
		}

		// Resolve.
		resolve({
			status: result.paymentIntent.status,
			charged: charged,
			cancelled: cancelled,
			processing: processing,
			message: message,
			payment_intent: result.paymentIntent,
		});
	})
}

// Create a payment element.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Create Payment Element
 *	@description: Create a payment element to collect the payment details.
 *	@warning: This element should be created each time the page renders or updated after a shopping cart update. This function automatically returns the cached element when this function has been called twice without any updates to the shopping cart.
 */
vweb.payments.create_payment_element = function() {

	// Return the already created object.
	if (this._payment_element != null) {
		return this._payment_element;
	}

	// Initialize stripe.
	this._initialize_stripe();

	// Initialize the elements.
	this._initialize_elements();

	// Create the stack and mount the stripe object.
	const element = VStack();
	element.stripe_element = this._elements.create("payment");
	element.stripe_element.mount(element);

	// Return the mounted element.
	return element;
}

// Create a address element.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Create Address Element
 *	@description: Create an address element to collect the payment's address details.
 *	@warning: This element should be created each time the page renders or updated after a shopping cart update. This function automatically returns the cached element when this function has been called twice without any updates to the shopping cart.
 *	@param:
 * 		@name: client_secret
 *		@description: The client secret from the backend's payment intent.
 */
vweb.payments.create_address_element = function(client_secret, mode = "billing") {

	// Return the already created object.
	if (this._address_element != null) {
		return this._address_element;
	}

	// Initialize stripe.
	this._initialize_stripe();

	// Initialize the elements.
	this._initialize_elements();

	// Create the stack and mount the stripe object.
	const element = VStack();
	element.stripe_element = this._elements.create("address", {
		mode: mode,
	});
	element.stripe_element.mount(element);

	// Return the mounted element.
	return element;
}

// Get the currency symbol for a product currency.
// Returns `null` when the currency is not supported.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Get Currency Symbol
 *	@description: Get the currency symbol for a product currency.
 *	@type: string, null
 *	@return: Returns the currency symbol when the currency is supported, otherwise `null`
 *	@param:
 * 		@name: currency
 *		@description: The currency from the product object.
 */
vweb.payments.get_currency_symbol = function(currency) {
	switch (currency.toLowerCase()) {
		case "aed": return "د.إ";
    	case "afn": return "Af";
    	case "all": return "L";
    	case "amd": return "֏";
    	case "ang": return "ƒ";
    	case "aoa": return "Kz";
    	case "ars": return "$";
    	case "aud": return "$";
    	case "awg": return "ƒ";
    	case "azn": return "₼";
    	case "bam": return "KM";
    	case "bbd": return "Bds$";
    	case "bdt": return "৳";
    	case "bgn": return "лв";
    	case "bhd": return ".د.ب";
    	case "bif": return "FBu";
    	case "bmd": return "BD$";
    	case "bnd": return "B$";
    	case "bob": return "Bs";
    	case "brl": return "R$";
    	case "bsd": return "B$";
    	case "btn": return "Nu.";
    	case "bwp": return "P";
    	case "byn": return "Br";
    	case "bzd": return "BZ$";
    	case "cad": return "$";
    	case "cdf": return "FC";
    	case "chf": return "Fr";
    	case "clf": return "UF";
    	case "clp": return "$";
    	case "cny": return "¥";
    	case "cop": return "$";
    	case "crc": return "₡";
    	case "cuc": return "CUC$";
    	case "cup": return "CUP$";
    	case "cve": return "$";
    	case "czk": return "Kč";
    	case "djf": return "Fdj";
    	case "dkk": return "kr";
    	case "dop": return "RD$";
    	case "dzd": return "دج";
    	case "egp": return "E£";
    	case "ern": return "Nfk";
    	case "etb": return "Br";
    	case "eur": return "€";
    	case "fjd": return "FJ$";
    	case "fkp": return "£";
    	case "fok": return "F$";
    	case "gbp": return "£";
    	case "gel": return "₾";
    	case "ghc": return "₵";
    	case "gip": return "£";
    	case "gmd": return "D";
    	case "gnf": return "FG";
    	case "gtq": return "Q";
    	case "gyd": return "GY$";
    	case "hkd": return "HK$";
    	case "hnl": return "L";
    	case "hrk": return "kn";
    	case "htg": return "G";
    	case "huf": return "Ft";
    	case "idr": return "Rp";
    	case "ils": return "₪";
    	case "inr": return "₹";
    	case "iqd": return "د.ع";
    	case "irr": return "﷼";
    	case "isk": return "kr";
    	case "jmd": return "J$";
    	case "jod": return "JD";
    	case "jpy": return "¥";
    	case "kes": return "Ksh";
    	case "kgs": return "с";
    	case "khr": return "៛";
    	case "kmf": return "CF";
    	case "kpw": return "₩";
    	case "krw": return "₩";
    	case "kwd": return "KD";
    	case "kyd": return "CI$";
    	case "kzt": return "₸";
    	case "lak": return "₭";
    	case "lbp": return "L£";
    	case "lkr": return "Rs";
    	case "lrd": return "L$";
    	case "lsl": return "L";
    	case "lyd": return "ل.د";
    	case "mad": return "د.م.";
    	case "mdl": return "L";
    	case "mnt": return "₮";
    	case "mop": return "MOP$";
    	case "mur": return "Rs";
    	case "mvr": return "Rf";
    	case "mwk": return "MK";
    	case "mxn": return "$";
    	case "myr": return "RM";
    	case "mzn": return "MTn";
    	case "nad": return "N$";
    	case "ngn": return "₦";
    	case "nio": return "C$";
    	case "nok": return "kr";
    	case "npr": return "रू";
    	case "nzd": return "$";
    	case "omr": return "ر.ع.";
    	case "pab": return "B/.";
    	case "pen": return "S/.";
    	case "pgk": return "K";
    	case "php": return "₱";
    	case "pkr": return "Rs";
    	case "pln": return "zł";
    	case "pyg": return "₲";
    	case "qar": return "ر.ق";
    	case "ron": return "lei";
    	case "rsd": return "din.";
    	case "rub": return "₽";
    	case "rwf": return "FRw";
    	case "sar": return "ر.س";
    	case "sbd": return "SI$";
    	case "scr": return "Sr";
    	case "sdg": return "ج.س.";
    	case "sek": return "kr";
    	case "sgd": return "S$";
    	case "shp": return "£";
    	case "sll": return "Le";
    	case "sos": return "S";
    	case "srd": return "SRD$";
    	case "ssp": return "£";
    	case "std": return "Db";
    	case "sek": return "kr";
    	case "syp": return "S£";
    	case "szl": return "L";
    	case "thb": return "฿";
    	case "tjs": return "ЅМ";
    	case "tmt": return "m";
    	case "tnd": return "د.ت";
    	case "top": return "T$";
    	case "try": return "₺";
    	case "ttd": return "TT$";
    	case "twd": return "NT$";
    	case "tzs": return "TSh";
    	case "uah": return "₴";
    	case "ugx": return "USh";
    	case "usd": return "$";
    	case "uyu": return "$U";
    	case "uzs": return "лв";
    	case "ves": return "Bs.S.";
    	case "vnd": return "₫";
    	case "vuv": return "VT";
    	case "wst": return "WS$";
    	case "xaf": return "FCFA";
    	case "xcd": return "EC$";
    	case "xof": return "CFA";
    	case "xpf": return "CFP";
    	case "yer": return "﷼";
    	case "zar": return "R";
    	case "zmw": return "ZK";
	}
	return null;
}

// The shopping cart object.
vweb.payments.cart = {};

// Refresh the shopping cart.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Refresh Cart
 *	@description: Refresh the shopping cart.
 */
vweb.payments.cart.refresh = function() {

	// Load from local storage.
	try {
		this.items = JSON.parse(localStorage.getItem("vweb_shopping_cart")) || [];
	} catch(err) {
		this.items = [];
	}

	// Reset the charge objects.
	vweb.payments._reset();
}
vweb.payments.cart.refresh();

// Get the shopping cart.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Save Cart
 *	@description: Save the shopping cart in the local storage.
 */
vweb.payments.cart.save = function(cart) {

	// Save to local storage.
	localStorage.setItem("vweb_shopping_cart", JSON.stringify(this.items));

	// Reset the charge objects.
	vweb.payments._reset();
}

// Add a product to the shopping cart.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Add to Cart
 *	@description: 
 *		Add a product to the shopping cart.
 *
 *		When the product was already added to the shopping cart only the quantity will be incremented.
 *
 *		An error will be thrown the product id does not exist.
 *	@parameter:
 * 		@name: id
 *		@description: The product's id.
 * 		@type: string
 *	@parameter:
 * 		@name: quantity
 *		@description: The quantity to add.
 * 		@type: number
 */
vweb.payments.cart.add = async function(id, quantity = 1) {
	this.refresh(); // update for if another window has updated the cart.
	const found = this.items.iterate((item) => {
		if (item.product.id === id) {
			item.quantity += quantity;
			return true;
		}
	})
	if (found !== true) {
		const product = await vweb.payments.get_product(id);
		this.items.push({
			product: product,
			quantity: quantity,
		});
	}
	this.save();
}

// Remove a product from the shopping cart.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Add to Cart
 *	@description: 
 *		Remove a product from the shopping cart.
 *
 *		Does not throw an error when the product was not added to the shopping cart.
 *	@parameter:
 * 		@name: id
 *		@description: The product's id.
 * 		@type: string
 *	@parameter:
 * 		@name: quantity
 *		@description: The quantity to remove. When the quantity value is "all" entire product will be removed from the shopping cart.
 * 		@type: number, string
 */
vweb.payments.cart.remove = async function(id, quantity = 1) {
	this.refresh(); // update for if another window has updated the cart.
	let new_cart = [];
	this.items.iterate((item) => {
		if (item.product.id === id) {
			if (quantity === "all") {
				item.quantity = 0;
			} else {
				item.quantity -= quantity;
			}
		}
		if (item.quantity > 0) {
			new_cart.push(item);
		}
	})
	this.items.length = 0;
	new_cart.iterate((item) => {
		this.items.push(item);
	})
	this.save();
}

// Clear the shopping cart.
/* 	@docs:
 * 	@chapter: Client
 * 	@title: Clear Cart
 *	@description: 
 *		Clear the shopping cart.
 *
 *		Will automatically be called if `vweb.payments.confirm_charge()` finished without any errors.
 */
vweb.payments.cart.clear = async function(id, quantity = 1) {
	this.items = [];
	this.save();
}