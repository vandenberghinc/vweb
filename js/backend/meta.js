/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Meta information.

/*  @docs: {
    @title: Meta
    @description: The js view meta information class.
    @parameter: {
        @name: author
        @description: The author's name.
        @type: string
    }
    @parameter: {
        @name: title
        @description: The page's title.
        @type: string
    }
    @parameter: {
        @name: description
        @description: The page's description.
        @type: string
    }
    @parameter: {
        @name: image
        @description: The page's image source.
        @type: string
    }
    @parameter: {
        @name: robots
        @description: The robots rules.
        @type: string
    }
    @parameter: {
        @name: charset
        @description: The used charset.
        @type: string
    }
    @parameter: {
        @name: viewport
        @description: The viewport settings.
        @type: string
    }
    @parameter: {
        @name: favicon
        @description: The url to the favicon.
        @type: string
    }
 } */
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
}

// ---------------------------------------------------------
// Exports.

module.exports = Meta;
