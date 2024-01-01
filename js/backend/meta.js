/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Meta information.

/*  @docs:
 *  @nav: Backend
    @title: Meta
    @description: The js view meta information class.
    @parameter:
        @name: author
        @description: The author's name.
        @type: string
    @parameter:
        @name: title
        @description: The page's title.
        @type: string
    @parameter:
        @name: description
        @description: The page's description.
        @type: string
    @parameter:
        @name: image
        @description: The page's image source.
        @type: string
    @parameter:
        @name: robots
        @description: The robots rules.
        @type: string
    @parameter:
        @name: charset
        @description: The used charset.
        @type: string
    @parameter:
        @name: viewport
        @description: The viewport settings.
        @type: string
    @parameter:
        @name: favicon
        @description: The url to the favicon.
        @type: string
 */
class Meta {
    constructor({
        author = null,
        title = null,
        description = null,
        image = null,
        robots = "index, follow",
        charset = "UTF-8",
        viewport = "width=device-width, initial-scale=1",
        favicon = "/favicon.ico",
    } = {}) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.image = image;
        this.robots = robots;
        this.charset = charset;
        this.viewport = viewport;
        this.favicon = favicon;
    }

    // Copy.
    /* @docs:
     * @title: Copy
     * @description: Create a copy of the current meta object without any references.
     */
    copy(override = {}) {
        return new Meta({
            author: this.author,
            title: this.title,
            description: this.description,
            image: this.image,
            robots: this.robots,
            charset: this.charset,
            viewport: this.viewport,
            favicon: this.favicon,
            ...override,
        })
    }

    /* @docs:
     * @title: Set value
     * @description: Set value funcs that return the current object.
     * @return: Returns the current <type>Meta</type> object.
     * @type: Meta
     * @funcs: 8
     */
    set_author(value) { this.author = value; return this; }
    set_title(value) { this.title = value; return this; }
    set_description(value) { this.description = value; return this; }
    set_image(value) { this.image = value; return this; }
    set_robots(value) { this.robots = value; return this; }
    set_charset(value) { this.charset = value; return this; }
    set_viewport(value) { this.viewport = value; return this; }
    set_favicon(value) { this.favicon = value; return this; }
}

// ---------------------------------------------------------
// Exports.

module.exports = Meta;
