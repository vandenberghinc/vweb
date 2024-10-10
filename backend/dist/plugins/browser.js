"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { chromium, firefox } = require('playwright');
class BrowserPreview {
    /**
     * Initializes the browser_controller with the specified browser type.
     * @param {string} browser - The browser to launch ('chrome' or 'firefox').
     */
    constructor(browser = 'chrome') {
        this.browser_type = browser.toLowerCase();
        this.browser = null;
        this.context = null;
        this.page = null;
    }
    /**
     * Starts the browser and opens a new page.
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.browser_type === 'chrome') {
                    // Launch Chromium with Chrome channel for Chrome-specific features
                    this.browser = yield chromium.launch({
                        headless: false, // Set to true if you don't need to see the browser
                        channel: 'chrome', // Ensure Chrome is installed on your system
                        args: [
                            '--ignore-certificate-errors',
                            '--allow-insecure-localhost',
                        ],
                    });
                }
                else if (this.browser_type === 'firefox') {
                    this.browser = yield firefox.launch({
                        headless: false, // Set to true if you don't need to see the browser
                    });
                }
                else {
                    throw new Error(`Unsupported browser type: ${this.browser_type}`);
                }
                this.context = yield this.browser.newContext({
                    ignoreHTTPSErrors: true,
                    viewport: null,
                });
                this.page = yield this.context.newPage();
                console.log(`${this.browser_type} browser launched successfully.`);
            }
            catch (error) {
                console.error(`Error launching browser: ${error.message}`);
            }
        });
    }
    /**
     * Stops the browser and cleans up resources.
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.browser) {
                    yield this.browser.close();
                    console.log(`${this.browser_type} browser closed successfully.`);
                }
            }
            catch (error) {
                console.error(`Error closing browser: ${error.message}`);
            }
        });
    }
    /**
     * Refreshes the active tab if its URL matches the specified endpoint.
     * @param {string} endpoint - The server endpoint URL to check against the active tab.
     */
    refresh(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            if (!this.page) {
                console.warn('No page is open. Please call start() first.');
                return;
            }
            let current_endpoint = this.page.url().replace(/http[s]*:\/\//g, "");
            const index = current_endpoint.indexOf("/");
            if (index !== -1) {
                current_endpoint = current_endpoint.substr(index);
            }
            // Normalize URLs for comparison
            current_endpoint = this._normalize_url(current_endpoint);
            if (typeof endpoint === "string") {
                endpoint = this._normalize_url(endpoint);
            }
            if ((typeof endpoint === "string" && current_endpoint === endpoint) ||
                (endpoint instanceof RegExp && endpoint.test(current_endpoint))) {
                // Capture the current scroll position
                const scrollPosition = yield this.page.evaluate(() => {
                    const scrollableElement = document.scrollingElement;
                    if (scrollableElement) {
                        return {
                            x: scrollableElement.scrollLeft,
                            y: scrollableElement.scrollTop
                        };
                    }
                    else {
                        // Fallback to window scroll if scrollingElement not found
                        return {
                            x: window.scrollX,
                            y: window.scrollY
                        };
                    }
                });
                // Reload the page
                yield this.page.reload();
                // console.log(`Page reloaded because it matches the endpoint: ${endpoint}`);
                // Restore the scroll position after reload
                yield this.page.evaluate(({ x, y }) => {
                    const scrollableElement = document.scrollingElement;
                    if (scrollableElement) {
                        scrollableElement.scrollTo(x, y);
                    }
                    else {
                        window.scrollTo(x, y);
                    }
                }, { x: scrollPosition.x, y: scrollPosition.y });
                console.log(`Scroll position restored to x: ${scrollPosition.x}, y: ${scrollPosition.y}`);
            }
            else {
                // console.log(
                //     `Active tab URL (${current_endpoint}) does not match the endpoint (${endpoint}). No action taken.`
                // );
            }
            // } catch (error) {
            //     console.error(`Error in refresh: ${error.message}`);
            // }
        });
    }
    /**
     * Opens the specified endpoint in the browser.
     * @param {string} endpoint - The URL to navigate to.
     */
    navigate(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.page) {
                    console.warn('No page is open. Please call start() first.');
                    return;
                }
                yield this.page.goto(endpoint);
                console.log(`Navigated to ${endpoint}`);
            }
            catch (error) {
                console.error(`Error navigating to ${endpoint}: ${error.message}`);
            }
        });
    }
    /**
     * Normalizes URLs by removing trailing slashes and converting to lowercase.
     * @param {string} url - The URL to normalize.
     * @returns {string} - The normalized URL.
     */
    _normalize_url(url) {
        if (/http[s]*:\/\//.test(url)) {
            url = url.replace(/http[s]*:\/\//g, "");
            const index = url.indexOf("/");
            if (index !== -1) {
                url = url.substr(index);
            }
        }
        let index;
        if ((index = url.indexOf("#")) !== -1) {
            url = url.substr(0, index);
        }
        while (url.includes("//")) {
            url = url.replaceAll("//", "/");
        }
        while (url.first() === "/") {
            url = url.slice(1);
        }
        while (url.last() === "/") {
            url = url.slice(0, -1);
        }
        return url.toLowerCase();
    }
}
module.exports = BrowserPreview;
