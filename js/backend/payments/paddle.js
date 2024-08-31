/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Imports.
const https = require("https");
const fs = require("fs");
// const blobstream = require('blob-stream');
const PDFDocument = require("pdfkit");
const libcrypto = require("crypto");
const {vlib} = require("../vinc.js");
const utils = require("../utils.js");
const logger = require("../logger.js");
const Status = require("../status.js");
const {FrontendError} = utils;

// The paddle payments class.
// @todo check if a user can subscribe twice to a sub, should not be allowed for system logic.
// @todo still need to manage the reactivation of a subscription after a chargeback has been reversed.
// @todo still check if a subscription is automatically cancelled by paddle when it is refunded.
/*  @docs:
    @nav: Backend
    @chapter: Payments
    @title: Paddle
    @description: 
        The paddle payments class.

        Sandbox env: https://sandbox-vendors.paddle.com
    @param:
        @name: api_key
        @type: string
        @description: Your paddle api key.
        @required: true
    @param:
        @name: client_key
        @type: string
        @description: Your paddle client key.
        @required: true
    @param:
        @name: sandbox
        @type: boolean
        @description: Enable the sandbox environment.
    @param:
        @name: inclusive_tax
        @type: boolean
        @description: Enable when prices are inclusive tax. 
    @param:
        @name: products
        @type: object
        @warning: The payment product objects are accessable by anyone through the backend rest api so they should not contain any sensitive data.
        @attributes_type: ProductObject
        @attribute:
            @name: id
            @type: string
            @required: true
            @desc: The id of product
            @warning: The id can not be changed
            @warning: The id must be unique across all your products.
        @attribute:
            @name: name
            @type: string
            @required: true
            @desc: The name of the product.
        @attribute:
            @name: price
            @type: number
            @required: true
            @desc: The price of the product, digits after the decimal are the minor units (e.g. cents).
        @attribute:
            @name: currency
            @type: string
            @required: true
            @desc: The ISO currency code of the price.
        @attribute:
            @name: tax_category
            @type: string
            @required: true
            @desc: The tax category https://developer.paddle.com/api-reference/products/create-product.
        @attribute:
            @name: icon
            @type: string
            @desc: The icon url of the product, may also be an endpoint url of your website.
        @attribute:
            @name: frequency
            @type: number
            @desc: The recurring frequency, when this is defined a product will become a subscription product.
        @attribute:
            @name: interval
            @type: string
            @desc: The recurring interval, when this is defined a product will become a subscription product.
            @enum:
                @value: "day"
                @desc: Use this value to create a subscription product that renews at a daily interval.
            @enum:
                @value: "week"
                @desc: Use this value to create a subscription product that renews at a weekly interval.
            @enum:
                @value: "month"
                @desc: Use this value to create a subscription product that renews at a monthly interval.
            @enum:
                @value: "year"
                @desc: Use this value to create a subscription product that renews at a yearly interval.
        @attribute:
            @name: trial
            @type: null, object
            @desc: The trial settings for this product. Leave undefined to disable a trialing period. This attribute will be ignored for one-time payments.
            @attribute:
                @name: frequency
                @type: number
                @desc: The trial frequency.
            @attribute:
                @name: interval
                @type: string
                @desc: The trial interval.
                @enum:
                    @value: "day"
                    @desc: Daily interval.
                @enum:
                    @value: "week"
                    @desc: Weekly interval.
                @enum:
                    @value: "month"
                    @desc: Monthly interval.
                @enum:
                    @value: "year"
                    @desc: Yearly interval.
        @attribute:
            @name: plans
            @type: array[ProductObject]
            @desc: The plans for this subscription product. Every item is a product object. However, attributes `currency`, `frequency`, `interval`, `tax_category` and `icon` can either be defined in the subscription product or on each individual plan.
    @parameter:
        @name: _server
        @ignore: true
*/

class Paddle {
    constructor({
        api_key,        // your private api key.
        client_key,     // your public client key.
        sandbox = false,
        products = [],
        inclusive_tax = false,
        _server = null,
    }) {

        // Verify args.
        vlib.scheme.verify({object: arguments[0], check_unknown: true, parent: "payments", scheme: {
            type: {type: "string", default: "paddle"},
            api_key: "string",
            client_key: "string",
            sandbox: {type: "boolean", default: false},
            inclusive_tax: {type: "boolean", default: false},
            products: "array",
            _server: "object",
        }});

        // Attributes.
        this.type = "paddle";
        this.client_key = client_key;
        this.sandbox = sandbox;
        this.inclusive_tax = inclusive_tax;
        this.products = products;
        this.server = _server;

        // Request headers.
        this._host = this.sandbox ? "sandbox-api.paddle.com" : "api.paddle.com";
        this._headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + api_key,
        }

        // Extend the csp.
        this.server.csp["default-src"] += " https://*.paddle.com/";
        this.server.csp["script-src"] += " https://*.paddle.com/ https://*.payments-amazon.com https://*.paypal.com https://*.google.com";
        this.server.csp["style-src"] += " https://*.paddle.com/ https://*.media-amazon.com https://*.paypal.com https://*.google.com";
        this.server.csp["img-src"] += " https://*.paddle.com/ https://*.media-amazon.com https://*.paypal.com https://*.google.com";

        /* @performance */ this.performance = new vlib.Performance("Payments performance");
    }

    // ---------------------------------------------------------
    // Products and prices (private).

    // ---------------------------------------------------------
    // Utils (private).

    async _req(method, endpoint, params = null) {
        const promise = new Promise((resolve, reject) => {
            
            // Options.
            const options = {
                method: method,
                hostname: this._host,
                path: method === "GET" && params != null ? `${endpoint}?${new URLSearchParams(params).toString()}`: endpoint,
                port: 443,
                headers: this._headers,
            };

            // Make the HTTP request
            const request = https.request(options, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        try {
                            resolve(JSON.parse(data));
                        } catch (error) {
                            reject(new Error('Failed to parse response data'));
                        }
                    } else {
                        if (data == null || data === "") {
                            const err = new Error(`${method}:${endpoint}: Request failed [${response.statusCode}].`)
                            err.status_code = response.statusCode;
                            return reject(err);
                        }
                        try {
                            data = JSON.parse(data);
                        } catch (e) {
                            const err = new Error(`${method}:${endpoint}: Request failed [${response.statusCode}].`)
                            err.status_code = response.statusCode;
                            return reject(err);
                        }
                        if (data.error == null) {
                            const err = new Error(`${method}:${endpoint}: Request failed [${response.statusCode}].`)
                            err.status_code = response.statusCode;
                            return reject(err);
                        }
                        data = data.error;
                        let errs = "";
                        if (data.errors) {
                            errs += ". ";
                            data.errors.iterate((item) => {
                                errs += `Field: "${item.field}" ${item.message}. `;
                            })
                            errs = errs.substr(0, errs.length - 2);
                        }
                        const err = new Error(`${method}:${endpoint}: ${data.detail} [${response.statusCode}]${errs}.`);
                        err.status_code = response.statusCode;
                        reject(err);
                    }
                });
            });

            // Write body params.
            if (params != null) {
                // request.write(JSON.stringify(params));
                const requestBody = JSON.stringify(params);
                request.setHeader('Content-Length', Buffer.byteLength(requestBody));
                request.write(requestBody);
            }

            // On error.
            request.on('error', (error) => {
                reject(error);
            });

            // End.
            request.end();
        });

        // So the traceback still includes the call function of _req.
        try {
            return await promise;
        } catch (e) {
            throw new Error(e);
        }
    }

    // ---------------------------------------------------------
    // Database (private).

    // Add or remove a subscription to the user's active subscriptions.
    async _add_subscription(uid, prod_id, sub_id) {
        await this._active_sub_db.save(uid, prod_id, {prod_id, sub_id});
    }
    async _delete_subscription(uid, prod_id) {
        await this._active_sub_db.delete(uid, prod_id);
    }
    async _check_subscription(uid, prod_id, load_data = true) {
        const doc = await this._active_sub_db.load(uid, prod_id);
        let exists = false, sub_id;
        if (doc == null) {
            if (load_data) {
                return {exists, sub_id};
            } else {
                return exists;
            }
        }
        exists = true;
        sub_id = doc.sub_id;
        if (load_data) {
            return {exists, sub_id};
        } else {
            return exists;
        }
    }
    async _get_active_subscriptions(uid, detailed = false) {
        const list = await this._active_sub_db.list_query({_uid: uid});
        if (detailed) { return list; }
        const products = [];
        list.iterate((doc) => {
            products.push(doc.prod_id);
        })
        return products;
    }
    async _save_subscription(subscription) {
        await this._sub_db.save(subscription.uid == null ? "unauth" : subscription.uid, subscription.id, subscription);
    }
    async _load_subscription(id) {
        const subscription = await this._sub_db.find(null, {_path: id});
        if (subscription == null) {
            throw Error(`Unable to find subscription "${id}".`);
        }
        return subscription;
    }
    async _get_subscriptions(uid) {
        if (uid === "unauth" || uid == null) { return []; }
        const list = await this._sub_db.list_query({_uid: uid});
        return list;
    }

    // Save and delete payments, all failed payments should be deleted from the database.
    async _save_payment(payment) {
        await this._pay_db.save(payment.uid == null ? "unauth" : payment.uid, payment.id, payment);
    }
    async _load_payment(id) {
        const uid = id.split("_")[1];
        const payment = await this._pay_db.load(uid, id);
        if (payment == null) {
            throw Error(`Unable to find payment "${id}".`);
        }
        if (uid == null || uid == "unauth") {
            delete payment.billing_details;
        }
        return payment;
    }
    async _load_payment_by_transaction(id) {
        const payment = await this._pay_db.find(null, {tran_id: id});
        if (payment == null) {
            throw Error(`Unable to find the payment by transaction id "${id}".`);
        }
        if (payment.uid == null || payment.uid == "unauth") {
            delete payment.billing_details;
        }
        return payment;
    }
    async _delete_payment(id) {
        const uid = id.split("_")[1];
        await this._pay_db.delete(uid, id);
    }

    // Delete all info of a user.
    async _delete_user(uid) {
        await this._sub_db.delete_all(uid);
        await this._active_sub_db.delete_all(uid);
        await this._pay_db.delete_all(uid);
        await this._inv_db.delete_all(uid);
    }

    // List all active subscriptions.
    async _get_all_active_subscriptions() {
        return await this._active_sub_db.list_query({});
    }

    // ---------------------------------------------------------
    // Overall (private).

    // Get product by paddle product id.
    _get_product_by_paddle_prod_id(id, throw_err = false) {
        const product = this.products.iterate((p) => {
            if (p.is_subscription) {
                return p.plans.iterate((plan) => {
                    if (plan.paddle_prod_id === id) {
                        return plan;
                    }
                })
            }
            else if (p.paddle_prod_id === id) {
                return p;
            }
        })
        if (product == null && throw_err) {
            throw Error(`Unable to find product "${id}".`);
        }
        return product;
    }

    // Get all active products.
    async _get_products() {
        let response, next = null;
        let items = [];
        while (true) {
            if (next === null) {
                response = await this._req("GET", "/products", {status: ["active"], per_page: 100});
            } else {
                response = await this._req("GET", next);
            }
            items = items.concat(response.data);
            if (response.meta.has_more) {
                next = response.meta.next;
            } else {
                break;
            }
        }
        return items;
    }

    // Get all active prices.
    async _get_prices() {
        let response, next = null;
        let items = [];
        while (true) {
            if (next === null) {
                response = await this._req("GET", "/prices", {status: ["active"], per_page: 100});
            } else {
                response = await this._req("GET", next);
            }
            items = items.concat(response.data);
            if (response.meta.has_more) {
                next = response.meta.next;
            } else {
                break;
            }
        }
        return items;
    }

    // Create or update a product, when existing product is undefined a new product and price will be created.
    async _check_product(product, existing_products = [], existing_prices = []) {

        // Check create product permission.
        const has_create_products_permission = async () => {
            if (process.argv.includes("--no-payment-edits")) {
                return false;
            }
            if (this._has_create_products_permission) {
                return true;
            }
            const input = await vlib.prompt("Some paddle products have to be edited, do you wish to make these changes? [y/n]: ")
            if (["y", "yes", "ok"].includes(input.toLowerCase())) {
                this._has_create_products_permission = true;
            } else {
                this._has_create_products_permission = false;
            }
            return this._has_create_products_permission;
        }

        // Find existing product.
        const existing_product = existing_products.iterate((item) => {
            if (item.custom_data.id === product.id) {
                return item;
            }
        })
        
        // No existing product so create.
        if (existing_product == null) {

            // Check permission.
            if (!await has_create_products_permission()) {
                return ;
            }
        
            // Create product.
            logger.log(0, `Creating product ${product.name}.`);
            const created_product = await this._req("POST", "/products", {
                name: product.name,
                description: product.description,
                image_url: product.icon,
                tax_category: product.tax_category,
                custom_data: {id: product.id},
            })
            product.paddle_prod_id = created_product.data.id;

            // Create price.
            logger.log(0, `Creating a price for product ${product.name}.`);
            const created_price = await this._req("POST", "/prices", {
                product_id: product.paddle_prod_id,
                name: product.name,
                description: product.description,
                unit_price: {amount: parseInt(product.price * 100).toString(), currency_code: product.currency},
                billing_cycle: product.is_subscription ? {interval: product.interval, frequency: product.frequency} : null,
                trial_period: product.trial,
                tax_mode: this.inclusive_tax ? "internal" : "external",
            })
            product.price_id = created_price.data.id;
        }

        // Passed an existing product so check.
        else {

            // Vars.
            product.paddle_prod_id = existing_product.id;
            const has_trial = product.trial != null;

            // Check if the product should be updated.
            const update_product = (
                existing_product.name !== product.name ||
                existing_product.description !== product.description ||
                existing_product.image_url !== product.icon ||
                existing_product.tax_category !== product.tax_category ||
                existing_product.status !== "active"
            );

            // Update product.
            if (update_product) {
                if (!await has_create_products_permission()) {
                    return ;
                }
                logger.log(0, `Updating product ${product.name}.`);
                await this._req("PATCH", `/products/${product.paddle_prod_id}`, {
                    name: product.name,
                    description: product.description,
                    image_url: product.icon,
                    tax_category: product.tax_category,
                    custom_data: {id: product.id},
                    status: "active",
                })
            }

            // Fetch the attached price.
            const existing_price = existing_prices.iterate((item) => {
                if (item.product_id === product.paddle_prod_id) {
                    return item;
                }
            })

            // Create price.
            if (existing_price == null) {
                if (!await has_create_products_permission()) {
                    return ;
                }
                logger.log(0, `Creating a price for product ${product.name}.`);
                const price = await this._req("POST", "/prices", {
                    product_id: product.paddle_prod_id,
                    name: product.name,
                    description: product.description,
                    unit_price: {amount: parseInt(product.price * 100).toString(), currency_code: product.currency},
                    billing_cycle: product.is_subscription ? {interval: product.interval, frequency: product.frequency} : null,
                    trial_period: product.trial,
                    tax_mode: this.inclusive_tax ? "internal" : "external",
                })
                product.price_id = price.data.id;
            }

            // Update price.
            else {

                // Set id.
                product.price_id = existing_price.id;
                
                // Update price.
                const update_price = (
                    existing_price.product_id !== product.paddle_prod_id ||
                    existing_price.name !== product.name ||
                    existing_price.description !== product.description ||
                    existing_price.tax_mode !== (this.inclusive_tax ? "internal" : "external") ||
                    existing_price.unit_price == null ||
                    existing_price.unit_price.amount !== parseInt(product.price * 100).toString() ||
                    existing_price.unit_price.currency_code !== product.currency ||
                    (product.is_subscription && (
                        existing_price.billing_cycle == null ||
                        existing_price.billing_cycle.interval !== product.interval ||
                        existing_price.billing_cycle.frequency !== product.frequency
                    )) ||
                    (has_trial && (
                        existing_price.trial_period == null ||
                        existing_price.trial_period.interval !== product.trial.interval ||
                        existing_price.trial_period.frequency !== product.trial.frequency
                    )) ||
                    existing_price.status !== "active"
                )
                
                // Update price.
                if (update_price) {
                    if (!await has_create_products_permission()) {
                        return ;
                    }
                    logger.log(0, `Updating the price of product ${product.name}.`);
                    await this._req("PATCH", `/prices/${product.price_id}`, {
                        // product_id: product.id, // not allowed.
                        name: product.name,
                        description: product.description,
                        unit_price: {amount: parseInt(product.price * 100).toString(), currency_code: product.currency},
                        billing_cycle: product.is_subscription ? {interval: product.interval, frequency: product.frequency} : null,
                        trial_period: product.trial,
                        tax_mode: this.inclusive_tax ? "internal" : "external",
                        status: "active",
                    })
                }
            }
        }
    }

    // Cancel subscription by subscription id.
    async _cancel_subscription(id, immediate = false) {
        if (id == null) {
            throw Error(`Define parameter \"id\".`);
        }

        // Load subscription object.
        const subscription = await this._load_subscription(id);
        if (subscription == null) {
            throw Error(`Unable to find subscription "${id}".`);   
        }

        // Cancel.
        if (subscription.status !== "active") {
            throw new FrontendError(`This subscription does not contain any cancellable items, the subscription is likely already cancelled.`, Status.bad_request);
        }
        await this._req("POST", `/subscriptions/${subscription.id}/cancel`, {
            effective_from: immediate ? "immediately" : null,
        });

        // Update subscription.
        subscription.status = "cancelling";
        await this._save_subscription(subscription);
    }

    // async _cancel_subscription(payment) {
    //     if (typeof payment === "string") {
    //         payment = await this._load_payment(payment);
    //     }
    //     if (payment.cus_id == null) {
    //         throw Error(`Payment "${payment.id}" does not have an assigned customer id attribute.`);
    //     }
    //     if (payment.sub_id == null) {
    //         throw Error(`Payment "${payment.id}" does not have an assigned subscription id attribute, it may not be a subscription payment.`);
    //     }
    //     if (payment.line_items.length == 0) {
    //         throw Error(`Payment "${payment.id}" does not contain any line items.`);
    //     }

    //     // Cancel.
    //     const cancellable = [];
    //     let all_cancelled = null;
    //     payment.line_items.iterate((item) => {
    //         const product = this.get_product_sync(item.product);
    //         if (product.is_subscription) {
    //             if (item.status === "cancelled" || item.status === "cancelling") {
    //                 if (all_cancelled === null) {
    //                     all_cancelled = true;
    //                 }
    //             } else if (item.status === "paid" || item.status === "refunding" || item.status === "refunded") {
    //                 all_cancelled = false;
    //                 cancellable.push(item);
    //             }

    //         }
    //     })
    //     if (all_cancelled) {
    //         throw new FrontendError(`This subscription is already cancelled and will become inactive at the end of the billing period.`, Status.bad_request);
    //     }
    //     if (cancellable.length === 0) {
    //         throw new FrontendError(`This subscription does not contain any cancellable items, the subscription is likely already cancelled or refunded.`, Status.bad_request);
    //     }
    //     await this._req("POST", `/subscriptions/${payment.sub_id}/cancel`, {
    //         // effective_from: "immediately",
    //     });

    //     // Update payment.
    //     cancellable.iterate((item) => {
    //         if (item.status === "paid") {
    //             item.status = "cancelling";
    //         }
    //     })
    //     await this._save_payment(payment);

    //     /* V1 cancel per product but since the webhook subscription event does not show which sub items are cancelled, this is not possible.

    //     // Update the subscription items.
    //     const sub = await this._req("GET", `/subscriptions/${payment.sub_id}`);
    //     const items = [];
    //     const cancelled_line_items = [];
    //     let edits = 0;
    //     sub.data.items.iterate((sub_item) => {

    //         // Only for active subscription items.
    //         if (sub_item.recurring && (sub_item.status === "active" || sub_item.status === "trailing")) {

    //             // Recurring items.
    //             const item = payment.line_items.iterate((item) => {
    //                 if (item.paddle_prod_id === sub_item.price.product_id) {
    //                     return item;
    //                 }
    //             })

    //             // Item not found, so cancel but do not update status since it is not found.
    //             if (item == null) {
    //                 console.error(`Unable to find subscription item "${sub_item.price.product_id}" while cancelling. Items: ${JSON.stringify(payment.line_items)}`)
    //                 ++edits;
    //             }

    //             // Already cancelling.
    //             // else if (item.status === "cancelling") {
    //             //     items.push({
    //             //         price_id: sub_item.price.id,
    //             //         quantity: sub_item.quantity,
    //             //     })
    //             // }

    //             // Cancel item.
    //             else if (products == null || products.includes(item.id)) {
    //                 item.status = "cancelling";
    //                 ++edits;
    //                 cancelled_line_items.push(item);
    //             }

    //             // Keep item.
    //             else {
    //                 items.push({
    //                     price_id: sub_item.price.id,
    //                     quantity: sub_item.quantity,
    //                 })
    //             }
    //         }

    //         // Keep all non recurring.
    //         else if (sub_item.recurring === false) {
    //             items.push({
    //                 price_id: sub_item.price.id,
    //                 quantity: sub_item.quantity,
    //             })
    //         }
    //     })

    //     // No edits.
    //     if (edits === 0) {
    //         throw Error("This payment does not contain any cancellable subscriptions.");
    //     }

    //     // Catch certain error.
    //     try {
        
    //         // Delete the subscription.
    //         if (items.length === 0) {
    //             await this._req("POST", `/subscriptions/${payment.sub_id}/cancel`, {});
    //         }

    //         // Update the subscription.
    //         else {
    //             await this._req("PATCH", `/subscriptions/${payment.sub_id}`, {
    //                 items: items,
    //                 scheduled_change: null,
    //                 proration_billing_mode: "full_next_billing_period",
    //             });
    //         }
    //     } catch (error) {
    //         if (error.message.indexOf("cannot update subscription, pending scheduled changes") === -1) {
    //             throw error;
    //         }
    //     }

    //     // Update payment.
    //     cancelled_line_items.iterate((item) => {
    //         item.status = "cancelling";
    //     })
    //     await this._save_payment(payment);
    //     */
    // }

    // Initialize all products.
    async _initialize_products() {
        const file_watcher_restart = process.argv.includes("--file-watcher-restart");

        /* @performance */ let now = this.performance.start();

        // Extend and initialize all products.
        // Check a payment product / plan product.
        const product_ids = [];
        let product_index = 0;
        const initialize_product = (product) => {
            ++product_index;

            // Check if the product has a name.
            if (product.id == null || product.id === "") {
                throw Error(`Product ${product_index} does not have an assigned "id" attribute (string).`);
            }
            else if (product_ids.includes(product.id)) {
                throw Error(`Product ${product_index} has a non unique name "${product.id}".`);
            }
            product_ids.push(product.id);

            // Set the icon absolute url.
            if (typeof product.icon === "string" && product.icon.charAt(0) === "/") {
                product.icon = `${this.server.full_domain}/${product.icon}`;
            }

            // Check attributes.
            if (typeof product.id !== "string" || product.id === "") {
                throw Error(`Product "${product_index}" does not have an assigned "id" attribute (string).`);
            }
            if (typeof product.name !== "string" || product.name === "") {
                throw Error(`Product "${product.id}" does not have an assigned "name" attribute (string).`);
            }
            if (typeof product.description !== "string" || product.description === "") {
                throw Error(`Product "${product.id}" does not have an assigned "description" attribute (string).`);
            }
            if (typeof product.currency !== "string" || product.currency === "") {
                throw Error(`Product "${product.id}" does not have an assigned "currency" attribute (string).`);
            }
            if (typeof product.price !== "number") {
                throw Error(`Product "${product.id}" does not have an assigned "price" attribute (number).`);
            }
            if (typeof product.tax_category !== "string") {
                throw Error(`Product "${product.id}" does not have an assigned "tax_category" attribute (number).`);
            }
            if (product.is_subscription && typeof product.frequency !== "number") {
                throw Error(`Product "${product.id}" does not have an assigned "frequency" attribute (number).`);   
            }
            if (product.is_subscription && typeof product.interval !== "string") {
                throw Error(`Product "${product.id}" does not have an assigned "interval" attribute (string).`);   
            }
        }

        // Expand the payment products.
        let sub_products = 0;
        this.products.iterate((product) => {
            if (product.plans != null) {

                // Check plans.
                if (product.plans != null && Array.isArray(product.plans) === false) {
                    throw Error(`Product "${product_index}" has an incorrect value type for attribute "plans", the valid type is "array".`);
                }

                // Generate sub id.
                product.id = `sub_${sub_products}`
                if (product_ids.includes(product.id)) {
                    throw Error(`Another product has a reserved name "${product.id}".`);
                }
                product_ids.push(product.id);
                ++sub_products;

                // Attributes.
                product.is_subscription = true;

                // Expand plan attributes.
                product.plans.iterate((plan) => {
                    plan.is_subscription = true;
                    plan.subscription_id = product.id;
                    if (plan.description == null ) { plan.description = product.description; }
                    if (plan.currency == null ) { plan.currency = product.currency; }
                    if (plan.frequency == null ) { plan.frequency = product.frequency; }
                    if (plan.interval == null ) { plan.interval = product.interval; }
                    if (plan.tax_category == null ) { plan.tax_category = product.tax_category; }
                    if (plan.icon == null ) { plan.icon = product.icon; }
                    initialize_product(plan);
                })
            }
            else if (product.frequency != null || product.interval != null) {
                throw Error(`Subscription products should be nested as plans of a subscription "{... plans: [...]}". Not as a direct product without a subscription parent.`);
            }
            else {
                product.is_subscription = false;
                initialize_product(product);
            }
        })

        /* @performance */ now = this.performance.end("init-products", now);

        // Check registered products.
        const last_products = await this._settings_db.load(`last_products${this.server.production ? "" : "_demo"}`);
        if (Object.eq(last_products, this.products)) {
            const product_ids = await this._settings_db.load(`product_ids${this.server.production ? "" : "_demo"}`);
            product_ids.iterate((item) => {
                const product = this.get_product_sync(item.id);
                if (product != null) {
                    product.paddle_prod_id = item.paddle_prod_id;
                    product.price_id = item.price_id;
                }
            })
            /* @performance */ now = this.performance.end("assign-product-ids", now);
        }
        else if (this.server.offline === false) {

            // Get all products and prices.
            const existing_products = await this._get_products();
            const existing_prices = await this._get_prices();
            /* @performance */ now = this.performance.end("get-prices-and-products", now);

            // Check all products.
            const product_ids = [];
            await this.products.iterate_async_await(async (product) => {
                if (product.plans != null) {
                    await product.plans.iterate_async_await(async (plan) => {
                        await this._check_product(plan, existing_products, existing_prices)
                        product_ids.append({
                            id: plan.id,
                            paddle_prod_id: plan.paddle_prod_id,
                            price_id: plan.price_id,
                        })
                    });
                } else {
                    await this._check_product(product, existing_products, existing_prices)
                    product_ids.append({
                        id: product.id,
                        paddle_prod_id: product.paddle_prod_id,
                        price_id: product.price_id,
                    })
                }
            });
            /* @performance */ now = this.performance.end("check-products", now);

            // Save last products.
            await this._settings_db.save(`last_products${this.server.production ? "" : "_demo"}`, Object.delete_recursively(Object.deep_copy(this.products), ["paddle_prod_id", "price_id"]));

            // Save price ids.
            await this._settings_db.save(`product_ids${this.server.production ? "" : "_demo"}`, product_ids);

            /* @performance */ now = this.performance.end("save-products-to-db", now);
        }
    }

    // Initialize the payments.
    async _initialize() {
        /* @performance */ this.performance.start();

        const file_watcher_restart = process.argv.includes("--file-watcher-restart");

        // Create database collections.
        this._settings_db = this.server.db.create_collection("_payment_settings");
        this._sub_db = this.server.db.create_uid_collection("_subscriptions");
        this._active_sub_db = this.server.db.create_uid_collection("_active_subscriptions");
        this._pay_db = this.server.db.create_uid_collection("_payments");
        this._inv_db = this.server.db.create_uid_collection("_invoices");
        /* @performance */ this.performance.end("init-db");


        // Initialize products.
        await this._initialize_products();
        /* @performance */ let now = this.performance.start();

        // Add endpoints.
        this.server.endpoint(
            
            // Initialize and verify an order, check if the user is authenticated when subscriptions are present and check if the user is not already subscribed to the same item.
            {
                method: "POST",
                endpoint: "/vweb/payments/init",
                content_type: "application/json",
                rate_limit: "global",
                params: {
                    items: "array",
                },
                callback: async (stream, params) => {

                    // Check items.
                    if (params.items.length === 0) {
                        return stream.error({status: Status.bad_request, data: {error: "Shopping cart is empty."}})
                    }
                    let sub_plan_count = {};
                    const error = await params.items.iterate_async_await(async (item) => {
                        if (item.product.is_subscription) {
                            if (stream.uid == null) {
                                return "You must be signed-in to purchase a subscription.";
                            }
                            if (item.quantity != null && item.quantity > 1) {
                                return "Subscriptions have a max quantity of 1.";
                            }
                            if (sub_plan_count[item.product.subscription_id] == null) {
                                sub_plan_count[item.product.subscription_id] = 1;
                            } else {
                                return "You can not charge two different subscription plans from the same subscription product.";   
                            }
                            if (await this._check_subscription(stream.uid, item.product.id, false)) {
                                return `You are already subscribed to product "${item.product.name}".`;
                            }
                        }
                    })
                    if (error) {
                        return stream.error({status: Status.bad_request, data: {error}})
                    }

                    // Success.
                    return stream.success();
                }
            },

            // Get products.
            {
                method: "GET",
                endpoint: "/vweb/payments/products",
                content_type: "application/json",
                rate_limit: "global",
                callback: (stream) => {
                    return stream.success({data: this.products});
                }
            },

            // Get payment by id.
            {
                method: "GET",
                endpoint: "/vweb/payments/payment",
                content_type: "application/json",
                rate_limit: "global",
                params: {
                    id: "string",
                },
                callback: async (stream, params) => {
                    return stream.success({data: (await this._load_payment(params.id))});
                }
            },

            // Get payments.
            {
                method: "GET",
                endpoint: "/vweb/payments/payments",
                content_type: "application/json",
                authenticated: true,
                rate_limit: "global",
                params: {
                    days: {type: "number", default: 30},
                    limit: {type: "number", default: null},
                    status: {type: "string", default: null},
                },
                callback: async (stream, params) => {
                    const result = await this.get_payments({
                        uid: stream.uid,
                        days: params.days,
                        limit: params.limit,
                        status: params.status,
                    })
                    return stream.success({data: result});
                }
            },

            // Get refundable payments.
            {
                method: "GET",
                endpoint: "/vweb/payments/payments/refundable",
                content_type: "application/json",
                authenticated: true,
                rate_limit: "global",
                params: {
                    days: {type: "number", default: 30},
                    limit: {type: ["null", "number"], default: null},
                    status: {type: ["null", "string"], default: null},
                },
                callback: async (stream, params) => {
                    const result = await this.get_refundable_payments({
                        uid: stream.uid,
                        days: params.days,
                        limit: params.limit,
                    })
                    return stream.success({data: result});
                }
            },

            // Get refunded payments.
            {
                method: "GET",
                endpoint: "/vweb/payments/payments/refunded",
                content_type: "application/json",
                authenticated: true,
                rate_limit: "global",
                params: {
                    days: {type: "number", default: 30},
                    limit: {type: ["null", "number"], default: null},
                },
                callback: async (stream, params) => {
                    const result = await this.get_refunded_payments({
                        uid: stream.uid,
                        days: params.days,
                        limit: params.limit,
                    })
                    return stream.success({data: result});
                }
            },

            // Get refunding payments.
            {
                method: "GET",
                endpoint: "/vweb/payments/payments/refunding",
                content_type: "application/json",
                authenticated: true,
                rate_limit: "global",
                params: {
                    days: {type: ["null", "number"], default: null},
                    limit: {type: ["null", "number"], default: null},
                },
                callback: async (stream, params) => {
                    const result = await this.get_refunding_payments({
                        uid: stream.uid,
                        days: params.days,
                        limit: params.limit,
                    })
                    return stream.success({data: result});
                }
            },

            // Create a refund.
            {
                method: "POST",
                endpoint: "/vweb/payments/refund",
                content_type: "application/json",
                rate_limit: "global",
                params: {
                    payment: {type: ["string", "object"]},
                    line_items: {type: ["array", "null"], default: null},
                    reason: {type: "string", default: "refund"},
                },
                callback: async (stream, params) => {
                    await this.create_refund(params.payment, params.line_items, params.reason);
                    return stream.success();
                }
            },

            // Cancel a subscription.
            {
                method: "DELETE",
                endpoint: "/vweb/payments/subscription",
                content_type: "application/json",
                authenticated: true,
                rate_limit: "global",
                params: {
                    product: "string",
                },
                callback: async (stream, params) => {
                    await this.cancel_subscription(stream.uid, params.product);
                    return stream.success();
                }
            },

            // Cancel a subscription by payment.
            // {
            //     method: "DELETE",
            //     endpoint: "/vweb/payments/subscription_by_payment",
            //     content_type: "application/json",
            //     authenticated: true,
            //     rate_limit: "global",
            //     params: {
            //         payment: {type: ["string", "object"]},
            //     },
            //     callback: async (stream, params) => {
            //         await this.cancel_subscription_by_payment(params.payment);
            //         return stream.success();
            //     }
            // },

            // Get active subscriptions.
            {
                method: "GET",
                endpoint: "/vweb/payments/active_subscriptions",
                content_type: "application/json",
                authenticated: true,
                rate_limit: "global",
                authenticated: true,
                callback: async (stream, params) => {
                    return stream.success({
                        data: {subscriptions: (await this.get_active_subscriptions(stream.uid))},
                    });
                }
            },

            // Is subscribed
            {
                method: "GET",
                endpoint: "/vweb/payments/subscribed",
                content_type: "application/json",
                authenticated: true,
                rate_limit: "global",
                params: {
                    product: "string",
                },
                callback: async (stream, params) => {
                    return stream.success({
                        data: {is_subscribed: (await this.is_subscribed(stream.uid, params.product))}
                    });
                }
            },

            // Webhook.
            this.server.offline ? null : (await this._create_webhook()),

        );
        /* @performance */ now = this.performance.end("init-endpoints", now);
        // /* @performance */ this.performance.dump();
    }

    // ---------------------------------------------------------
    // Webhook (private).

    // Execute a webhook user defined callback.
    async _exec_user_callback(callback, args) {
        if (callback != null) {
            try {
                const res = callback(args);
                if (res instanceof Promise) { res = await res; }
            } catch (error) {
                console.error(error);
            }
        }
    }

    // Send a payment mail.
    // async _send_payment_mail({payment, subject, attachments = [], mail}) {
    //     await this.server.send_mail({
    //         recipients: [payment.billing_details.name === null ? payment.billing_details.email : [payment.billing_details.name, payment.billing_details.email]],
    //         subject,
    //         body: mail.html(),
    //         attachments,
    //     })
    // }

    // On a successfull payment webhook event.
    async _payment_webhook(data) {

        // ---------------------------------------------------------
        // Get the transaction.
        // Only used in the paid webhook, other parts use the saved payment object.
        // This is required to manage the statuses of payments.

        // Make request.
        let obj = (await this._req("GET", `/transactions/${data.id}`, {include: ["address", "adjustment", "business", "customer"]})).data;

        // Initialize.
        const id = `pay_${obj.custom_data.uid == null ? "unauth" : obj.custom_data.uid}_${String.random(4)}${Date.now()}`
        const payment = {
            id: id,                         // payment id.
            uid: obj.custom_data.uid,       // user id,
            cus_id: obj.customer_id,        // customer id.
            tran_id: obj.id,                // transaction id.
            timestamp: Date.now(),
            status: null,                   // payment status, possible values are "open" or "paid".
            line_items: [],                 // cart line items as {quantity: 1, product: "prod_xxx"}.
            billing_details: {
                name: null,
                email: null,
                business: null,
                vat_id: null,
                address: null,
                city: null,
                postal_code: null,
                province: null,
                country: null,
            },
        }

        // Set business details.
        if (obj.business != null) {
            const b = obj.business;
            if (b != null && b.name != null && b.name.length > 0) {
                payment.billing_details.business = b.name;
            }
            if (b.name != null && b.name.length > 0) {
                payment.billing_details.tax_identifier = b.tax_identifier;
            }
            if (b.contacts.length > 0) {
                const contact = b.contacts[0];
                payment.billing_details.name = contact.name;
                payment.billing_details.email = contact.email;
            }
        }

        // Set email when not already set.
        if (payment.email == null && obj.customer != null && obj.customer.email != null && obj.customer.email.length > 0) {
            payment.billing_details.email = obj.customer.email;
        }

        // Set name when not already set.
        if (payment.name == null && obj.custom_data.customer_name != null && obj.custom_data.customer_name != null && obj.custom_data.customer_name.length > 0) {
            payment.billing_details.name = obj.custom_data.customer_name;
        }

        // Set address details.
        if (obj.address != null) {
            const a = obj.address;
            if (a.first_line != null && a.first_line.length > 0) {
                payment.billing_details.address = a.first_line;
            }
            if (a.city != null && a.city.length > 0) {
                payment.billing_details.city = a.city;
            }
            if (a.postal_code != null && a.postal_code.length > 0) {
                payment.billing_details.postal_code = a.postal_code;
            }
            if (a.region != null && a.region.length > 0) {
                payment.billing_details.province = a.region;
            }
            if (a.country_code != null && a.country_code.length > 0) {
                payment.billing_details.country = a.country_code;
            }
        }

        // Set the status.
        switch (obj.status) {
            case "draft":
            case "ready":
                payment.status = "open"; break;
            case "billed":
            case "paid":
            case "completed":
                payment.status = "paid"; break;
            case "past_due":
                payment.status = "past_due"; break;
            default:
                logger.error("Payment Webhook: ", `Unknown payment status "${obj.status}".`);
                payment.status = "unkown";
                break;
        }

        // Set line items.
        obj.details.line_items.iterate((item) => {
            payment.line_items.push({
                product: item.product.custom_data.id, // product id, keep as id since we do not want to save the product object to the database since this can change.
                item_id: item.id, // transaction item id.
                paddle_prod_id: item.product.id, // paddle product id.
                quantity: item.quantity,
                tax_rate: parseFloat(item.tax_rate),
                tax: parseFloat(item.totals.tax / 100), // should not be changed to unit totals, since mails and invoices depend on this behaviour, just divide by quantity.
                discount: parseFloat(item.totals.discount / 100), // should not be changed to unit totals, since mails and invoices depend on this behaviour, just divide by quantity.
                subtotal: parseFloat(item.totals.subtotal / 100), // should not be changed to unit totals, since mails and invoices depend on this behaviour, just divide by quantity.
                total: parseFloat(item.totals.total / 100), // should not be changed to unit totals, since mails and invoices depend on this behaviour, just divide by quantity.
                status: "paid", // can be "paid", "refunded", "refunding".
            })
        })

        // Parse refunds.
        if (obj.adustments != null) {
            obj.adustments.iterate((adj) => {
                switch (adj.action) {
                    case "refund":
                    case "cargeback":
                    case "cargeback_warning":
                        adj.items.iterate((adj_item) => {
                            payment.line_items.iterate((item) => {
                                if (adj_item.item_id === item.item_id) {
                                    item.status = "refunded";
                                    return false;
                                }
                            })
                        })
                        break;
                    default:
                        break;
                }
            })
        }

        // Save the payment object in the database.
        await this._save_payment(payment);

        // ---------------------------------------------------------
        // Process the payment.
        const {uid, cus_id} = payment;

        // Check the payment line items.
        await payment.line_items.iterate_async_await(async (item) => {
            const product = this.get_product_sync(item.product, false);

            // @todo REFUND PAYMENT SINCE PRODUCT WAS NOT FOUND SO NO WAY OF DELIVERY.
            // Refund the payment since there is no way of delivery.
            // 1) Product not found.
            // 2) No subscription id found from the webhook data.
            if (product == null) {
                return null;
            }

            // Subscription.
            else if (product.is_subscription) {

                // No need to activate the sub, this is already handled by the sub activated webhook.
                //

                // Cancel the other subscriptions plans that are part of this product.
                // The `create_payment()` function makes sure there are not multiple subscription plans of the same subscription product charged in a single request.
                const subscription = await this.get_product(product.subscription_id, true);
                await subscription.plans.iterate_async_await(async (plan) => {
                    if (plan.id != product.id) {
                        const {exists, sub_id} = await this._check_subscription(uid, plan.id);
                        if (exists) {
                            logger.log(0, `Cancelling subscription "${plan.id}" due too downgrade/upgrade to "${product.id}" of user "${payment.uid}".`)
                            // @todo cancel sub by sub id.
                            await this._cancel_subscription(sub_id);
                        }
                    }
                })

                // No need to execute the callback, this is already handled by the sub activated webhook.
                //
            }

            // One time payment.
            else {

                // Execute callback.
                await this._exec_user_callback(this.server.on_payment, {product, payment});
            }
        })

        // Send an email to the user.
        // try {
        //     await this._send_payment_mail({
        //         payment, 
        //         subject: "Payment Successful",
        //         mail: this.server.on_payment_mail({payment}),
        //         attachments: [this.generate_invoice_sync(payment)],
        //     });
        // } catch (error) {
        //     console.error(error);
        // }
    }

    // On subscription activated webhook event.
    // Even though the payment webhook could take care of this, still keep it seperated for customization, and possibly a new activation in certain scenerario's perhaps past due invoice, not sure just in case.
    async _subscription_webhook(data) {

        // Vars.
        const uid = data.custom_data.uid;
        const subscription = {
            uid,
            id: data.id,
            cus_id: data.customer_id,    // customer id.
            status: "active",           // can be "active", "cancelling", "cancelled".
            plans: [],
        }

        // Check the subscription line items.
        await data.items.iterate_async_await(async (item) => {
            const product = this._get_product_by_paddle_prod_id(item.price.product_id, false)

            // Product not found or no sub id found, nothing to do here, the payment webhook already handles this scenario.
            if (product == null) {
                logger.error(`Subscription webhook [#sub1]: Unable to find product with id ${item.price.product_id}. This is a serious error which causes a non activated subscription for a paid transaction. You should manually cancel the subscription. Event: ${JSON.stringify(data, null, 4)}.`);
                return null;
            }

            // Subscription.
            else if (product.is_subscription) {

                // Add to plans.
                subscription.plans.append(product.id);

                // Active the user's subscription in the database.
                logger.log(0, `Activating subscription "${product.id}" of user "${subscription.uid}".`)
                await this._add_subscription(uid, product.id, subscription.id);

                // No need to cancel other subs, this is already handled by the payment webhook.

                // Execute callback.
                await this._exec_user_callback(this.server.on_susbcription, {product, subscription});
            }
        })

        // Save subscription.
        await this._save_subscription(subscription);

        // No need to send mail, payment webhook already handles this.
    }

    // On a subscription cancelled webhook event.
    async _subscription_cancelled_webhook(data) {

        // Vars.
        const subscription = await this._load_subscription(data.id);

        // Delete subscriptions made by this subscription.
        await subscription.plans.iterate_async_await(async (plan_id) => {
            await this._delete_subscription(subscription.uid, plan_id);
            logger.log(0, `Deactivating subscription "${plan_id}" of user "${subscription.uid}".`)
        })

        // Update database.
        subscription.status = "cancelled";
        await this._save_subscription(subscription);

        // Execute callback.
        await this._exec_user_callback(this.server.on_cancellation, {subscription});

        // Send an email to the user.
        // try {
        //     await this._send_payment_mail({
        //         payment, 
        //         subject: "Cancellation Successful",
        //         mail: this.server.on_cancellation_mail({payment, line_items}),
        //     });
        // } catch (error) {
        //     console.error(error);
        // }
    }

    // On a adjustment (refunds) updated webhook event.
    async _adjustment_webhook(data) {

        // Refund or chageback.
        const is_refund = data.action === "refund";
        const is_chargeback = data.action === "chargeback";
        if (is_refund || is_chargeback) {
            if (data.status === "pending_approval") {
                return 
            }
            const is_approved = data.status === "approved";

            // Vars.
            const payment = await this._load_payment_by_transaction(data.transaction_id);

            // Get and update line items.
            const line_items = [], cancel_products = [];
            data.items.iterate((adj_item) => {
                payment.line_items.iterate((item) => {
                    if (item.item_id === adj_item.item_id) {
                        item.status = is_approved ? "refunded" : "paid";
                        cancel_products.push(item.product);
                        line_items.push(item);
                        return false;
                    }
                })
            })

            // Manage subscriptions.
            if (payment.sub_id != null && is_approved) {
                await this._cancel_subscription(payment.sub_id, true);
            }

            // Update database.
            if (line_items.length > 0) {
                await this._save_payment(payment);
            }

            // Execute callback.
            if (is_approved) {
                logger.log(0, `Refunded items of payment "${payment.id}" of user "${payment.uid}".`)
                await this._exec_user_callback(
                    is_refund ? this.server.on_refund : this.server.on_chargeback, 
                    {payment, line_items}
                );
                // try {
                //     await this._send_payment_mail({
                //         payment, 
                //         subject: "Successful " + (is_refund ? "Refund" : "Chargeback"),
                //         mail: is_refund ? this.server.on_refund_mail({payment, line_items}) : this.server.on_chargeback_mail({payment, line_items}),
                //     });
                // } catch (error) {
                //     console.error(error);
                // }
            } else {
                logger.log(0, `Refund denied for items of payment ${payment.id} of user "${payment.uid}".`)
                await this._exec_user_callback(
                    is_refund ? this.server.on_failed_refund : this.server.on_failed_chargeback, 
                    {payment, line_items}
                );
                // try {
                //     await this._send_payment_mail({
                //         payment, 
                //         subject: "Failed " + (is_refund ? "Refund" : "Chargeback"),
                //         mail: is_refund ? this.server.on_failed_refund_mail({payment, line_items}) : this.server.on_failed_chargeback_mail({payment, line_items}),
                //     });
                // } catch (error) {
                //     console.error(error);
                // }
            }
        }

        // Chargeback reversal.
        else if (data.action === "chargeback_reverse" && data.status === "reversed") {

            // Vars.
            const payment = await this._load_payment_by_transaction(data.transaction_id);

            // Log reactivation subscriptions on chargeback reverse.
            if (payment.sub_id != null) {
                logger.log(0, `Chargeback reversed for payment ${payment.id} from user "${payment.uid}".`)
                // @todo.
            }

            // Get and update line items.
            let line_items = [];
            data.items.iterate((adj_item) => {
                payment.line_items.iterate((item) => {
                    if (item.item_id === adj_item.item_id) {
                        item.status = "paid"
                        line_items.push(item);
                    }
                })
            })

            // Update database.
            if (line_items.length > 0) {
                await this._save_payment(payment);
            }
        }
    }

    // Create and register the webhook endpoint.
    async _create_webhook() {
        const file_watcher_restart = process.argv.includes("--file-watcher-restart");

        // Register the webhook.
        const webhook_doc = await this._settings_db.load(`webhook${this.server.production ? "" : "_demo"}`);
        const webhook_settings = {
            description: "vweb webhook",
            destination: `${this.server.full_domain}/vweb/payments/webhook`,
            type: "url",
            subscribed_events: [
                // "transaction.billed",
                // "transaction.canceled",
                // "transaction.completed",
                // "transaction.created",
                "transaction.paid",
                // "transaction.past_due",
                // "transaction.payment_failed",
                // "transaction.ready",
                // "transaction.updated",
                "subscription.activated",
                "subscription.canceled",
                // "subscription.created",
                // "subscription.imported",
                // "subscription.past_due",
                "subscription.paused",
                "subscription.resumed",
                "subscription.trialing",
                // "subscription.updated",
                "adjustment.updated",
            ],
        };

        // Register webhook.
        const register_webhook = async () => {
            logger.log(0, "Registering payments webhook.");
            const response = await this._req("POST", "/notification-settings", webhook_settings)
            this.webhook_key = response.data.endpoint_secret_key;
            await this._settings_db.save(`webhook${this.server.production ? "" : "_demo"}`, {
                id: response.data.id,
                key: this.webhook_key,
            });
        }

        // Webhook registered.
        if (webhook_doc != null) {
            this.webhook_key = webhook_doc.key;

            // Check update required.
            const last_webhook = await this._settings_db.load(`last_webhook${this.server.production ? "" : "_demo"}`);
            if (JSON.stringify(last_webhook) !== JSON.stringify(webhook_settings) && file_watcher_restart === false) {

                // Check update required.
                const webhook_id = webhook_doc.id;
                let registered
                try {
                    registered = await this._req("GET", `/notification-settings/${webhook_id}`);
                } catch (error) {
                    if (error.status === 404) {
                        registered = undefined;
                        await register_webhook();
                    } else {
                        throw error;
                    }
                }
                if (registered) {
                    const item = registered.data;
                    const patch = (() => {
                        if (
                            item.active !== true ||
                            item.destination !== webhook_settings.destination ||
                            item.type !== webhook_settings.type ||
                            item.description !== webhook_settings.description ||
                            item.subscribed_events.length != webhook_settings.subscribed_events.length
                        ) {
                            return true;
                        }
                        return webhook_settings.subscribed_events.iterate((x) => {
                            const found = item.subscribed_events.iterate((y) => {
                                if (x === y.name) {
                                    return true;
                                }
                            })
                            if (found === false) {
                                return true;
                            }
                        })
                    })();

                    // Update.
                    if (patch === true) {
                        logger.log(0, "Updating payments webhook.");
                        await this._req("PATCH", `/notification-settings/${webhook_id}`, {...webhook_settings, active: true});
                    }

                    // Save.
                    await this._settings_db.save(`last_webhook${this.server.production ? "" : "_demo"}`, webhook_settings);
                }
            }
        }

        // Register webhook.
        else {
            await register_webhook();
        }

        // Ip whitelist.
        const ip_whitelist = [
            // Live.
            "34.232.58.13",
            "34.195.105.136",
            "34.237.3.244",
            "35.155.119.135",
            "52.11.166.252",
            "34.212.5.7",
            // Sandbox.
            "34.194.127.46",
            "54.234.237.108",
            "3.208.120.145",
            "44.226.236.210",
            "44.241.183.62",
            "100.20.172.113",
        ];

        // Create the endpoint.
        return  {
            method: "POST",
            endpoint: "/vweb/payments/webhook",
            rate_limit: false,
            callback: async (stream) => {

                // Ip whitelist.
                if (ip_whitelist.includes(stream.ip) === false) {
                    logger.log(0, `POST:/vweb/payments/webhook: Warning: Blocking non whitelisted ip "${stream.ip}".`);
                    return stream.error({status: Status.unauthorized});
                }
                
                // Verify.
                const full_signature = stream.headers["paddle-signature"];
                if (full_signature == null) {
                    logger.log(0, "POST:/vweb/payments/webhook: Error: No paddle signature found in the request headers.");
                    return stream.error({status: Status.unauthorized, data: {error: "Webhook signature verification failed."}});
                }
                const ts_index = full_signature.indexOf(";");
                const ts = full_signature.substr(3, ts_index - 3);
                const signature = full_signature.substr(ts_index + 4);
                const digest = libcrypto.createHmac("sha256", this.webhook_key).update(`${ts}:${stream.body}`).digest("hex");
                if (libcrypto.timingSafeEqual(Buffer.from(digest, "hex"), Buffer.from(signature, "hex")) !== true) {
                    logger.log(0, "POST:/vweb/payments/webhook: Error: Webhook signature verification failed.");
                    return stream.error({status: Status.unauthorized, data: {error: "Webhook signature verification failed."}});
                }

                // Process items.
                const event = JSON.parse(stream.body);
                switch (event.event_type) {

                    // Paid transaction.
                    // https://developer.paddle.com/webhooks/transactions/transaction-paid
                    case "transaction.paid": 
                        await this._payment_webhook(event.data);
                        break;

                    // Subscription activated.
                    // https://developer.paddle.com/webhooks/subscriptions/subscription-activated
                    case "subscription.activated": 
                    case "subscription.trialing": 
                    case "subscription.resumed": 
                        await this._subscription_webhook(event.data);
                        break;

                    // Subscription canceled.
                    // https://developer.paddle.com/webhooks/subscriptions/subscription-canceled
                    case "subscription.canceled": 
                    case "subscription.paused": 
                        await this._subscription_cancelled_webhook(event.data);
                        break;

                    // Adjustment updated (refunds).
                    // https://developer.paddle.com/webhooks/subscriptions/subscription-canceled
                    case "adjustment.updated": 
                        await this._adjustment_webhook(event.data);
                        break;

                    // Default.
                    default: break;
                }

                // Success.
                stream.success({data: {message: "OK"}});

            },
        };
    }

    // ---------------------------------------------------------
    // Public.

    // Get a product by id.
    // Use async to keep it persistent with other functions.
    /*  @docs
     *  @title: Get Product
     *  @description:
     *      Get a product by id.
     *  @parameter:
     *      @name: id
     *      @description: The id of the product to retrieve. The id may either be the id of a product or a the id from a plan of a subscription product.
     *      @type: string
     *  @parameter:
     *      @name: throw_err
     *      @type: boolean
     *      @description: Throw an error when the product was not found.
     *  @type: object.
     *  @return: Returns the product object.
     *  @usage:
     *      ...
     *      const product = server.get_product("prod_basic");
     *  @funcs: 2
     */
    async get_product(id, throw_err = false) {
        return this.get_product_sync(
            id,
            throw_err
        );
    }
    get_product_sync(id, throw_err = false) {
        const product = this.products.iterate((p) => {
            if (p.is_subscription) {
                if (p.id === id) {
                    return p;
                }
                return p.plans.iterate((plan) => {
                    if (plan.id === id) {
                        return plan;
                    }
                })
            }
            else if (p.id === id) {
                return p;
            }
        })
        if (product == null && throw_err) {
            throw Error(`Unable to find product "${id}".`);
        }
        return product;
    }

    // Get a payment by id.
    /*  @docs:
        @title: Get Payment.
        @desc: Get a payment by id.
        @param:
            @name: id
            @required: true
            @type: string
            @desc: The id of the payment.
    */
    async get_payment(id) {
        return await this._load_payment(id);
    }

    // Get payments.
    /*  @docs:
        @title: Get Refunded Payments.
        @desc:
            Get all payments.

            All failed payments are no longer stored in the database.
        @param:
            @name: uid
            @cached: Users:uid:param
        @param:
            @name: days
            @type: number
            @desc: Retrieve payments from the last amount of days.
        @param:
            @name: limit
            @type: number
            @desc: Limit the amount of response payment objects.
        @param:
            @name: status
            @type: string, array[string]
            @desc: Filter the payments by status. Be aware that the line items of a payment also have a status with possible values of `open`, `cancelled`, `refunding` or `refunded.`
            @enum:
                @value: "open"
                @desc: Payments that are still open and unpaid.
            @enum:
                @value: "paid"
                @desc: Payments that are paid.
    */
    async get_payments({
        uid,  
        days = 30,
        limit = null,
        status = null,
    }) {

        // Get path.
        const list = await this._pay_db.list_query({_uid: uid});

        // Get the since time.
        let since = null;
        if (days != null) {
            since = new Date();
            since.setHours(0, 0, 0, 0)
            since = Math.floor(since.getTime() - (3600 * 24 * 1000 * days));
        }

        // Iterate list.
        const payments = [];
        const status_is_array = Array.isArray(status);
        list.iterate((payment) => {
            if ((since == null || payment.timestamp >= since)) {
                if (
                    status == null ||
                    (status_is_array === false && status === payment.status) ||
                    (status_is_array && status.includes(payment.status))
                ) {
                    payments.append(payment);
                }
            }
            if (limit != null && limit != -1 && payments.length >= limit) {
                return false;
            }
        })

        // Sort.
        payments.sort((a, b) => b.timestamp - a.timestamp);

        // Response.
        return payments;
    }

    // Get all refundable payments.
    /*  @docs:
        @title: Get Refundable Payments.
        @desc: Get all payments that are refundable.
        @param:
            @name: uid
            @cached: Users:uid:param
        @param:
            @name: days
            @type: number
            @desc: Retrieve payments from the last amount of days.
        @param:
            @name: limit
            @type: number
            @desc: Limit the amount of response payment objects.
    */
    async get_refundable_payments({
        uid,  
        days = 30,
        limit = null,
    }) {
        const payments = [];
        const all_payments = await this.get_payments({uid, days, limit, status: "paid"});
        all_payments.iterate((payment) => {
            const line_items = [];
            payment.line_items.iterate((item) => {
                if (item.status === "paid" && item.total > 0) { // skip total 0 for free trial.
                    line_items.push(item);
                }
            })
            if (line_items.length > 0) {
                payment.line_items = line_items;
                payments.push(payment);
            }
        })
        return payments;
    }

    // Get all refunded payments.
    /*  @docs:
        @title: Get Refunded Payments.
        @desc: Get all payments that are successfully refunded.
        @param:
            @name: uid
            @cached: Users:uid:param
        @param:
            @name: days
            @type: number
            @desc: Retrieve payments from the last amount of days.
        @param:
            @name: limit
            @type: number
            @desc: Limit the amount of response payment objects.
    */
    async get_refunded_payments({
        uid,  
        days = 30,
        limit = null,
    }) {
        const payments = [];
        const all_payments = await this.get_payments({uid, days, limit, status: "paid"});
        all_payments.iterate((payment) => {
            const line_items = [];
            payment.line_items.iterate((item) => {
                if (item.status === "refunded") {
                    line_items.push(item);
                }
            })
            if (line_items.length > 0) {
                payment.line_items = line_items;
                payments.push(payment);
            }
        })
        return payments;
    }

    // Get all payments that are currently in the refunding process.
    /*  @docs:
        @title: Get Refunding Payments.
        @desc: Get all payments that are currently in the refunding process.
        @param:
            @name: uid
            @cached: Users:uid:param
        @param:
            @name: days
            @type: number
            @desc: Retrieve payments from the last amount of days.
        @param:
            @name: limit
            @type: number
            @desc: Limit the amount of response payment objects.
    */
    async get_refunding_payments({
        uid,  
        days = null,
        limit = null,
    }) {
        const payments = [];
        const all_payments = await this.get_payments({uid, days, limit, status: "paid"});
        all_payments.iterate((payment) => {
            const line_items = [];
            payment.line_items.iterate((item) => {
                if (item.status === "refunding") {
                    line_items.push(item);
                }
            })
            if (line_items.length > 0) {
                payment.line_items = line_items;
                payments.push(payment);
            }
        })
        return payments;
    }

    // Refund a payment.
    /*  @docs:
        @title: Refund Payment.
        @desc: Refund a payment based on the payment id.
        @warning: Refunding a subscription will also cancel all other subscriptions that were created by the same payment request.
        @param:
            @name: payment
            @required: true
            @type: number
            @desc: The id of the payment object or the payment object itself.
        @param:
            @name: line_items
            @type: array[object]
            @desc: The line items to refund, these must be retrieved from the original payment line items otherwise it may cause undefined behaviour. When undefined the entire payment will be refunded.
        @param:
            @name: reason
            @type: string
            @desc: The refund reason for internal analytics.
    */
    async create_refund(payment, line_items = null, reason = "refund") {

        // Load payment.
        // The payment must be loaded from the database in case the line items or anything were edited by the user, such as dropping all non refundable line items.
        if (typeof payment === "string") {
            payment = await this._load_payment(payment);
        } else {
            payment = await this._load_payment(payment.id);
        }

        // When no line items are defined than refund everything.
        if (line_items == null) {
            line_items = payment.line_items;
        }

        // Check empty line items.
        if (line_items.length === 0) {
            throw Error("No refund line items array is empty.")
        }

        // Parse line items.
        const items = [];
        const item_ids = [];
        line_items.iterate((item) => {

            // Skip when the item is already being refunded.
            if (item.status === "refunded" || item.status === "refunding") { //  || item.status === "cancelled" || item.status === "cancelling"
                return null;
            }

            // Add to structured line items.
            item_ids.push(item.item_id);
            items.push({
                item_id: item.item_id,
                type: "full", // partial refudings are not supported per line item since there is no convenient way to keep track of how much is refunded.
            })
        })

        // Check empty line items.
        if (items.length === 0) {
            throw Error("This payment no longer has any refundable line items.")
        }

        // Make request.
        const response = await this._req("POST", `/adjustments`, {
            action: "refund",
            transaction_id: payment.tran_id,
            reason,
            items,
            custom_data: {
                uid: payment.uid,
            }
        });
        if (response.data.status === "rejected") {
            throw Error("This payment is no longer refundable.");
        } else if (response.data.status === "approved") {
            payment.line_items.iterate((item) => {
                if (line_items.find((i) => i.item_id === item.item_id)) {
                    item.status = "refunded";
                }
            })
        } else {
            payment.line_items.iterate((item) => {
                if (line_items.find((i) => i.item_id === item.item_id)) {
                    item.status = "refunding";
                }
            })
        }

        // Update the payment object.
        await this._save_payment(payment);
    }

    // Cancel a subscription.
    /*  @docs:
        @title: Cancel Subscription.
        @desc: Cancel a subscription based on the retrieved payment object or id.
        @warning: Cancelling a subscription will also cancel all other subscriptions that were created by the same payment request.
        @param:
            @name: uid
            @cached: Users:uid:param
        @param:
            @name: products
            @required: true
            @type: string, array[string, object]
            @desc: The product to cancel, the product ids to cancel or the product objects to cancel.
    */
    async cancel_subscription(uid, products, _throw_no_cancelled_err = true) {
        if (products == null) {
            throw new Error("Parameter \"products\" should be a defined value of type \"array[string, object]\".");
        }
        if (typeof products === "string") {
            products = [products];
        }
        let cancelled = [];
        await products.iterate_async_await(async (product) => {
            if (typeof product === "object") {
                product = product.id;
            }
            const {exists, sub_id} = await this._check_subscription(uid, product);
            if (exists && cancelled.includes(sub_id) === false) {
                await this._cancel_subscription(sub_id);
                cancelled.push(sub_id)
            }
        });
        if (_throw_no_cancelled_err && cancelled.length === 0) {
            throw new FrontendError("No cancellable subscriptions found.", Status.bad_request);
        }
    }

    // Cancel subscription by subscription id.
    /*  @docs:
        @title: Cancel subscription by subscription id.
        @desc: Cancel a subscription based on the retrieved subscription object or id.
        @warning: Cancelling a subscription will also cancel all other subscriptions that were created by the same payment request.
        @param:
            @name: subscription
            @required: true
            @type: string, object
            @desc: The retrieved subscription object or the subscription's id.
        @param:
            @name: immediate
            @type: boolean
            @desc: Immediately cancel the subscription, or wait till the end of the billing cycle.
    */
    async cancel_subscription_by_id(subscription, immediate = false) {
        if (typeof subscription === "object") {
            subscription = subscription.id;
        }
        return await this._cancel_subscription(subscription, immediate);
    }

    // Get subscriptioms.
    /*  @docs:
        @title: Get active subscriptions
        @desc: Get the active subscriptions of a user.
        @param:
            @name: uid
            @cached: Users:uid:param
    */
    async get_active_subscriptions(uid) {
        return await this._get_active_subscriptions(uid);
    }
    /*  @docs:
        @title: Get all subscriptions
        @desc: Get all subscriptions of a user, active and inactive.
        @param:
            @name: uid
            @cached: Users:uid:param
    */
    async get_subscriptions(uid) {
        return await this._get_subscriptions(uid);
    }

    // Is subscribed.
    /*  @docs:
        @title: Is Subscribed
        @desc: Check if a user is subscribed to a product.
        @param:
            @name: uid
            @cached: Users:uid:param
        @param:
            @name: product
            @required: true
            @type: string
            @desc: The product id.
    */
    async is_subscribed(uid, product) {
        return await this._check_subscription(uid, product, false);
    }

    // Generate an invoice.
    /*  @docs:
        @title: Generate Invoice
        @desc:
            Generate an invoice for a paid payment.

            By default an invoice is already generated when a payment has been paid.
        @param:
            @name: payment
            @required: true
            @type: object
            @desc: The payment object.
        @return:
            @type: Promise
            @desc: This function returns a promise to the invoice pdf in bytes.
    */
    async generate_invoice(payment) {

        // Check arg..
        if (payment == null || typeof payment !== "object") {
            throw Error(`Parameter "payment" should be a defined value of type "object".`);
        }

        // Vars.
        let currency = null;
        let subtotal = 0;
        let subtotal_tax = 0;
        let total = 0;
        payment.line_items.iterate((item) => {
            if (typeof item.product === "string") {
                item.product = this.get_product_sync(item.product);
            }
            if (currency == null) {
                currency = utils.get_currency_symbol(item.product.currency);
            }
            subtotal += item.subtotal;
            subtotal_tax += item.tax;
            total += item.total;
        })
        let total_due = payment.status === "open" ? total : 0;
        let doc = new PDFDocument({ size: "A4", margin: 50 });

        /* Doc vars. */
        let top_offset = 57;
        let spacing = 10;

        // Wrapper func.
        const gen_text = (text, x, y = null, opts = null, _spacing = null) => {
            if (y == null) {
                y = top_offset;
            } else {
                top_offset = y;
            }
            if (_spacing == null) {
                _spacing = spacing;
            }
            doc.text(text, x, y, opts);
            top_offset += doc.heightOfString(text, x, y, opts) + (_spacing == null ? spacing : _spacing);
        }
        const gen_col_text = (text, x, opts = null, is_last = false, _spacing = 2) => {
            doc.text(text, x, top_offset, opts);
            if (is_last) {
                top_offset += doc.heightOfString(text, x, top_offset, opts) + (_spacing == null ? spacing : _spacing);
            } else {
                return doc.heightOfString(text, x, top_offset, opts);
            }
        }
        const gen_divider = (_spacing = null) => {
            doc
                .strokeColor("#aaaaaa")
                .lineWidth(1)
                .moveTo(50, top_offset)
                .lineTo(550, top_offset)
                .stroke();
            top_offset += 1 + (_spacing == null ? spacing : _spacing);
        }
        const gen_line_item = ({name = "", desc = "", unit_cost = "", quantity = "", total_cost = ""}) => {
            const items = [
                [0.25, name],
                [0.35, desc],
                [0.4 / 3, unit_cost],
                [0.4 / 3, quantity],
                [0.4 / 3, total_cost],
            ];

            let x = 50;
            let max_height = 0;
            const full_width = (550 - 50) - (10 * 4);

            // Get max height.
            items.iterate((item) => {
                max_height = Math.max(max_height, doc.heightOfString(item[1], x, top_offset, { width: full_width * item[0], align: "left" }));
                x += (full_width * item[0]) + 10;
            })

            // Check if a new page should be added.
            if (top_offset + max_height + 10 > doc.page.height - 50) {
                doc.addPage();
                top_offset = 50;
            }

            // Add items.
            x = 50;
            items.iterate((item) => {
                gen_col_text(item[1], x, { width: full_width * item[0], align: "left" })
                x += (full_width * item[0]) + 10;
            })

            // Add top offset.
            top_offset += max_height + spacing;
        }
        const format_date = (date) => {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }

        // Header.
        doc.fillColor("#444444")
        doc.fontSize(20)
        if (this.server.company.stroke_icon_path != null) {
            doc.image(this.server.company.stroke_icon_path, 50, top_offset - 2, { width: 60 })
        } else {
            if (this.server.company.icon_path != null) {
                doc.image(this.server.company.icon_path, 50, top_offset - 2, { width: 18 })
            }
            gen_text(this.server.company.legal_name, 50 + 18 + 10)
        }
        top_offset += 15;

        // From (left).
        const start_top_offset = top_offset;
        doc.fillColor("#444444")
        doc.fontSize(10)
        doc.font("Helvetica-Bold")
        gen_text("From", 50, null, null, 3);
        doc.font("Helvetica")
        gen_text(this.server.company.legal_name, 50, null, { align: "left" }, 2)
        gen_text(`${this.server.company.address}, ${this.server.company.postal_code}`, 50, null, { align: "left" }, 2)
        gen_text(`${this.server.company.city}, ${this.server.company.province}, ${this.server.company.country}`, 50, null, { align: "left" }, 2)
        gen_text(`VAT ID: ${this.server.company.tax_id}`, 50, null, { align: "left" }, 2)
        const left_top_offset = top_offset;

        // Invoice details (right).
        top_offset = start_top_offset
        doc.fillColor("#444444")
        doc.fontSize(10)
        doc.font("Helvetica-Bold")
        gen_text("Invoice details", 550 - (150 + 10 + 80), null, null, 3);
        doc.font("Helvetica");
        [
            ["Invoice:", payment.id],
            ["Date of issue:", format_date(new Date())],
        ].iterate((item) => {
            gen_col_text(item[0], 550 - (150 + 10 + 80), {width: 80})
            gen_col_text(item[1], 550 - 150, {width: 150}, true)
        })

        // Go down.
        top_offset = Math.max(top_offset, left_top_offset) + 25;

        // Billing details.
        doc.fillColor("#444444")
        doc.fontSize(10)
        doc.font("Helvetica-Bold")
        gen_text("Billing Details", 50, null, null, 3);
        doc.font("Helvetica")
        if (payment.billing_details.business != null) {
            gen_text(`${payment.billing_details.business}`, 50, null, { align: "left" }, 2);    
        } else {
            gen_text(`${payment.billing_details.name}`, 50, null, { align: "left" }, 2);
        }
        gen_text(payment.billing_details.email, 50, null, { align: "left" }, 2);
        gen_text(`${payment.billing_details.address}`, 50, null, { align: "left" }, 2);
        gen_text(`${payment.billing_details.city}, ${payment.billing_details.province}, ${payment.billing_details.country}`, 50, null, { align: "left" }, 2);
        if (payment.billing_details.vat_id != null) {
            gen_text(`${payment.billing_details.vat_id}`, 50, null, { align: "left" }, 2);
        }

        // Go down.
        top_offset += 35;

        // Line items.
        doc.font("Helvetica-Bold");
        gen_line_item({
            name: "Item",
            desc: "Description",
            unit_cost: "Unit Cost",
            quantity: "Quantity",
            total_cost: "Line Total",
        });
        top_offset -= spacing * 0.5;
        doc.font("Helvetica");
        gen_divider();
        payment.line_items.iterate((item) => {
            gen_line_item({
                name: item.product.name,
                desc: item.product.description,
                unit_cost: `${currency} ${(item.subtotal / item.total.quantity).toFixed(2)}`,
                quantity: item.quantity.toString(),
                total_cost: `${currency} ${item.total.toFixed(2)}`,
            });
            top_offset += 10;
            gen_divider();
        });
        gen_line_item({unit_cost: "Subtotal:", total_cost: `${currency} ${subtotal.toFixed(2)}`});
        top_offset -= (spacing - 3);
        gen_line_item({unit_cost: "Taxes:", total_cost: `${currency} ${subtotal_tax.toFixed(2)}`});
        top_offset -= (spacing - 3);
        gen_line_item({unit_cost: "Total:", total_cost: `${currency} ${total.toFixed(2)}`});
        top_offset -= (spacing - 3);
        doc.font("Helvetica-Bold");
        gen_line_item({unit_cost: "Total Due:", total_cost: `${currency} ${total_due.toFixed(2)}`});
        top_offset -= (spacing - 3);

        // Write to file.
        // doc.end();
        // doc.pipe(fs.createWriteStream(path.str()));
        // return path;

        // Get as bytes.
        const stream = doc.pipe(blobstream());
        doc.end();
        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                const bytes = stream.toBuffer();
                resolve(bytes);
            });
            stream.on('error', (error) => {
                reject(error);
            });
        });
    }

    // ---------------------------------------------------------
    // Development.

    // Cancel all subscriptions to clear development environment.
    async dev_cancel_all_subscriptions() {

        // Fetch.
        let subs = [], after = null;
        while (true) {
            const response = await this._req("GET", "/subscriptions", after == null ? {per_page: 100} : {per_page: 100, after});
            subs = subs.concat(response.data);
            if (!response.meta.has_more) {
                break;
            }
            after = subs.last().id;
        }

        // Cancel.
        await subs.iterate_async_await(async (sub) => {
            if (sub.status === "active") {
                console.log("Cancelling subscription", sub.id);
                await this._req("POST", `/subscriptions/${sub.id}/cancel`, {
                    effective_from: "immediately",
                });
            }
        })
    }
    
}

// Exports.
module.exports = Paddle;
