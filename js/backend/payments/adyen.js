/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 *
 * DEPRECATED
 *
 * Drop in integration: https://docs.adyen.com/online-payments/build-your-integration/?platform=Web&integration=Components&tab=embed_script_and_stylesheet_2
 * Cancellation and refunds: https://docs.adyen.com/online-payments/modify-payments
 * API Docs: https://docs.adyen.com/api-explorer/
 */

// Imports.
const { Client, CheckoutAPI } = require('@adyen/api-library');

// The adyen class.
class Adyen {
    constructor({
        api_key,
        account_name,
        company = null,
        return_url,
        payment_products,
        production = false,
    }) {

        // Attributes.
        this.payment_products = payment_products;
        this.return_url = return_url;
        this.account_name = account_name;
        this.company = company == null ? account_name : company;
        this.production = production;

        // Initialize api.
        this.client = new Client({apiKey: api_key, environment: production ? "LIVE" : "TEST"}); // @todo test live string.
        this.checkout = new CheckoutAPI(this.client);
        console.log(this.checkout);
    }

    // Create a checkout session for the drop-in integration.
    async create_session({
        id,
        ip,
        country = "NL",
    }) {
        if (id == null) {
            id = `ses_${String.random(4)}_${Date.now()}`
        }
        return await this.checkout.sessions({
            amount: { currency: "EUR", value: 1000 },
            reference: id,
            returnUrl: this.return_url,
            merchantAccount: this.account_name,
            countryCode: country,
            shopperIP: ip,
        });

        /*

        // Vars.
        let id = ...;
        let user = ...;
        let product = ...;
        let country = ...;
        let recurringProcessingModel = ;

        // Arguments.
        const args = {
            reference: id,
            returnUrl: this.return_url,
            merchantAccount: this.account_name,
            company: this.company,
            channel: "web",
            countryCode: country,
            shopperName: `${user.email} ${user.last_name}`,
            shopperEmail: user.email,
            shopperIP: ip,
            shopperStatement: product.statement_descriptor,
            shopperReference: uid,
            billingAddress: {
                city: "",
                country: "",
                houseNumberOrName: "",
                postalCode: "",
                stateOrProvince: "",
                street: "",
            },
            deliveryAddress: {
                city: "",
                country: "",
                firstName: "",
                houseNumberOrName: "",
                lastName: "",
                postalCode: "",
                stateOrProvince: "",
                street: "",
            },
        }

        // Recurring.
        if (product.recurring) {
            args.enableRecurring = true;
            args.recurringProcessingModel = "Subscription";
            args.mandate = {
                amount: parseInt(product.amount * 100).toString(),
                amountRule: "exact", // Exact price.
                billingAttemptsRule: "on", // On exact date.
                billingDay: 1, // First day of the month.
                endsAt: "", // End date of the billing plan, in YYYY-MM-DD format.
                frequency: product.recurring.frequency, // The frequency with which a shopper should be charged. Possible values: daily, weekly, biWeekly, monthly, quarterly, halfYearly, yearly.
            };
        }

        // Non recurring.
        else {
            args.amount = {
                currency: "",
                value: parseInt(product.amount * 100)
            }
        }
        */
    }
}

// Exports.
module.exports = Adyen;
