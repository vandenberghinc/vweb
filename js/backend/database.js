/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */


// ---------------------------------------------------------
// Imports.

const libproc = require("child_process");
const {MongoClient, ObjectID} = require('mongodb');
const {vlib} = require("./vinc.js");

// ---------------------------------------------------------
// Collection.
// Path based collection, so "myfile", "mydir/myfile".

// @warning: THE DATABASE COLLECTION SHOULD ALSO ACCEPT OBJECTS FOR PATHS.
/*  @docs:
    @nav: Backend
    @chapter: Database
    @title: Collection
    @desc: The database collection class.
    @note: The document attribute `_path` is a reserved index attribute for the path of the document.
*/
class Collection {
    constructor(collection, uid_based = false) {
        this.col = collection;
        this.uid_based = uid_based;
        if (uid_based) {
            this.col.createIndex({ _path: 1, _uid: 1 });
        } else {
            this.col.createIndex({_path: 1});
        }
    }

    // Handle file response.
    _process_doc(doc) {
        if (doc == null) { return null; }
        else if (doc._content != null) {
            return doc._content;
        }
        return doc;
    }

    // Find.
    /*  @docs:
     *  @title: Find
     *  @description: Find a document by a query.
     *  @return:
     *      Returns the document that was found or `null` when no document is found.
     *  @parameter:
     *      @name: query
     *      @desc: The query options.
     *      @type: object
     */
    async find(query) {
        try {
            return this._process_doc(await this.col.findOne(query));
        } catch (error) {
            console.error(error);
            throw new Error('Encountered an error while finding the document.');
        }
    }

    // Load.
    /*  @docs:
     *  @title: Load
     *  @description: Load data by path.
     *  @return:
     *      Returns the loaded document.
     *
     *      Returns the `def` parameter when the data does not exist, keep in mind that when parameter `def` is an object it could be a reference to a defined variable.
     *  @parameter:
     *      @name: path
     *      @description: The database path to the document.
     *      @type: string
     *  @parameter:
     *      @name: def
     *      @description:
     *          The default data to be returned when the data does not exist.
     *
     *          When the type of parameter `def` is `object` then the keys that do not exist in the loaded object, but do exist in the default object will be inserted into the loaded object.
     *      @type: null, object
     */
    async load(path, def = undefined) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        try {
            const doc = this._process_doc(await this.col.findOne(typeof path === "object" ? path : {_path: path}));
            if (doc == null) {
                if (def !== undefined) { return def; }
                return null;
            }
            if (typeof def === "object" && def !== null && Array.isArray(def) === false) {
                Object.keys(def).iterate((key) => {
                    if (doc[key] === undefined) {
                        doc[key] = def[key];
                    }
                })
            }
            return doc;
        } catch (error) {
            console.error(error);
            throw new Error('Encountered an error while loading the document.');
        }
    }

    // Save.
    /*  @docs:
     *  @title: Save
     *  @description: Save data by path.
     *  @parameter:
     *      @name: path
     *      @description: The database path to the document.
     *      @type: string
     *  @parameter:
     *      @name: data
     *      @description: The data to save.
     *      @type: null, boolean, number, string, array, object
     */
    async save(path, content) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        let doc;
        if (typeof path === "object") {
            doc = path;
        } else {
            doc = {_path: path};
        }
        if (typeof content === "object" && Array.isArray(content) == false && content !== null) {
            Object.expand(doc, content);
        } else {
            doc._content = content;
        }
        try {
            const response = await this.col.insertOne(doc);
        } catch (error) {
            console.error(error);
            throw new Error('Encountered an error while saving the document.');
        }
    }

    // Update.
    /*  @docs:
     *  @title: Update
     *  @description: Update data by path.
     *  @return:
     *      Returns the updated document.
     *  @parameter:
     *      @name: path
     *      @description: The database path to the document.
     *      @type: string
     *  @parameter:
     *      @name: data
     *      @description: The data to save.
     *      @type: null, boolean, number, string, array, object
     *  @parameter:
     *      @name: auto_create
     *      @description: Automatically create the document when it does not exist.
     *      @type: boolean
     */
    async update(path, content, auto_create = false) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        try {
            let set;
            if (typeof content === "object" && Array.isArray(content) == false && content !== null) {
                delete content._id;
                delete content._path;
                delete content._uid;
                set = content;
            } else {
                set = {_content: content};
            }
            const doc = await this.col.findOneAndUpdate(
                typeof path === "object" ? path : {_path: path},
                {$set: set},
                {returnDocument: 'after'}
            );
            if (auto_create && doc == null) {
                return await this.save(path, content);
            }
            else if (doc != null && doc._content != null) {
                return doc._content;
            }
            return doc;
        } catch (error) {
            console.error(error);
            throw new Error('Encountered an error while updating the document.');
        }
    }

    // List.
    /*  @docs:
     *  @title: List
     *  @description: List all child documents of directory path.
     *  @parameter:
     *      @name: path
     *      @description: The database directory path.
     *      @type: string
     *  @parameter:
     *      @name: options
     *      @description: List options.
     *      @type: object
     *      @attribute:
     *          @name: process
     *          @description: Process the document. By default saved non object data will be stored under `_content`. Processing checks this attribute and uses that content instead when it is detected.
     *          @type: boolean
     *          @default: true
     *      @attribute:
     *          @name: projection
     *          @description: The data attributes to retrieve, when left undefined all attributes are retrieved.
     *          @type: object
     *          @default: undefined
     */
    async list(path, options = {}) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        if (typeof path === "sting") {
            while (path.length > 0 && path.charAt(path.length - 1) === "/") {
                path = path.substr(0, path.length - 1);
            }
            if (path.length == 0) {
                throw Error("Invalid path.");
            }
            path = {_path: {$regex: `^${path}/`}};
        } else if (path._path) {
            const _path = path._path;
            while (_path.length > 0 && _path.charAt(_path.length - 1) === "/") {
                _path = path.substr(0, _path.length - 1);
            }
            if (_path.length == 0) {
                throw Error("Invalid path.");
            }
            path._path = {$regex: `^${path}/`};
        }
        try {
            const docs = await this.col.find(path, {projection: options.projection}).toArray();
            if (options.process === false) {
                return docs;
            }
            const result = docs.iterate_append((doc) => this._process_doc(doc)) // list as array since the user might have used a path object width different attributes so dict is not reliable.
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Encountered an error while listing all documents.');
        }
    }

    // List query.
    /*  @docs:
     *  @title: List Query
     *  @description: List all documents of the collection based on a query.
     *  @parameter:
     *      @name: query
     *      @desc: The query options.
     *      @type: object
     *  @parameter:
     *      @name: options
     *      @description: List options.
     *      @type: object
     *      @attribute:
     *          @name: process
     *          @description: Process the document. By default saved non object data will be stored under `_content`. Processing checks this attribute and uses that content instead when it is detected.
     *          @type: boolean
     *          @default: true
     *      @attribute:
     *          @name: projection
     *          @description: The data attributes to retrieve, when left undefined all attributes are retrieved.
     *          @type: object
     *          @default: undefined
     */
    async list_query(query = {}, options = {}) {
        try {
            const docs = await this.col.find(query, {projection: options.projection}).toArray();
            if (options.process === false) { return docs; }
            const result = docs.iterate_append((doc) => this._process_doc(doc)) // list as array since the user might have used a path object width different attributes so dict is not reliable.
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Encountered an error while listing all documents.');
        }
    }

    // List all document ids.
    /*  @docs:
     *  @title: List All
     *  @description: List all documents of the collection, optionally per uid.
     *  @parameter:
     *      @name: query
     *      @ignore: true
     *  @parameter:
     *      @name: options
     *      @description: List options.
     *      @type: object
     *      @attribute:
     *          @name: process
     *          @description: Process the document. By default saved non object data will be stored under `_content`. Processing checks this attribute and uses that content instead when it is detected.
     *          @type: boolean
     *          @default: true
     *      @attribute:
     *          @name: projection
     *          @description: The data attributes to retrieve, when left undefined all attributes are retrieved.
     *          @type: object
     *          @default: undefined
     */
    async list_all(query = {}, options = {}) {
        let docs;
        if (this.uid_based) {
            docs = await this.col.find(query, {projection: options.projection}).toArray();
        } else {
            docs = await this.col.find(query, {projection: options.projection}).toArray();
        }
        if (options.process === false) {
            return docs;
        }
        return docs.iterate_append((doc) => this._process_doc(doc)) // list as array since the user might have used a path object width different attributes so dict is not reliable.
    }

    // Delete.
    /*  @docs:
     *  @title: Delete
     *  @description: Delete a document of the collection by path.
     *  @parameter:
     *      @name: path
     *      @description: The database path to the document.
     *      @type: string
     */
    async delete(path) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        try {
            await this.col.deleteOne(typeof path === "object" ? path : {_path: path},);
        } catch (error) {
            console.error(error);
            throw new Error('Encountered an error while deleting.');
        }
    }

    // Delete.
    /*  @docs:
     *  @title: Delete Query
     *  @description: Delete a document of the collection by query.
     *  @parameter:
     *      @name: query
     *      @description: The query object.
     *      @type: object
     */
    async delete_query(query = {}) {
        if (typeof query !== "object" || query === null || Object.keys(query).length === 0) {
            throw Error(`Parameter "query" has an invalid type "${typeof query}", the valid type is "object".`);
        }
        if (Object.keys(query).length === 0) {
            throw Error(`Parameter "query" is an empty object.`);
        }
        return await this.col.deleteMany(query)
    }

    // Delete all.
    async delete_all(path) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        try {
            await this.col.deleteMany(typeof path === "object" ? path : {_path: path});
        } catch (error) {
            console.error(error);
            throw new Error('Encountered an error while deleting.');
        }
    }

    // Delete recursive, meant for subpath style deletion of a dir, so dir "mydir/" to delete everything inside the dir "mydir/file" etc.
    /*  @docs:
     *  @title: Delete Recursive
     *  @description: Delete all the documents inside a directory of a uid from the collection.
     *  @parameter:
     *      @name: path
     *      @description: The database directory path.
     *      @type: string
     *  @parameter:
     *      @name: uid
     *      @ignore: true
     */
    async delete_recursive(path, uid = null) {
        if (typeof path !== "string") { // this func only accept string path's.
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        if (this.uid_based && typeof uid !== "string") {
            throw Error(`Parameter "uid" has an invalid type "${typeof uid}", the valid type is "string".`);
        }
        while (path.length > 0 && path.charAt(path.length - 1) === "/") {
            path = path.substr(0, path.length - 1);
        }
        if (path.length == 0) {
            throw Error("Invalid path.");
        }
        const args = {
            _path: {$regex: `^${path}/`}
        }
        if (uid != null) {
            args._uid = uid;
        }
        try {
            return await this.col.deleteMany(args);
        } catch (error) {
            console.error(error);
            throw new Error('Encountered an error while deleting.');
        }
    }

    // Delete collection.
    /*  @docs:
     *  @title: Delete Collection
     *  @description: Delete all documents of from the collection.
     */
    async delete_collection() {
        await this.col.deleteMany()
        await this.col.drop();
    }

    // Clean a document from all system attributes.
    clean(doc) {
        delete doc._id;
        delete doc._path;
        if (this.uid_based) {
            delete doc._uid;
        }
        return doc;
    }
}

// ---------------------------------------------------------
// UID based collection.

// @warning: THE DATABASE COLLECTION SHOULD ALSO ACCEPT OBJECTS FOR PATHS.
/*  @docs:
    @nav: Backend
    @chapter: Database
    @title: UID Collection
    @desc: The UID based database collection class.
    @note: The document attribute `_uid` is a reserved index attribute for the user id of the document.
    @note: The document attribute `_path` is a reserved index attribute for the path of the document.
*/
class UIDCollection {
    constructor(collection) {
        this._col = new Collection(collection, true);
        this.col = this._col; // keep as `this.col` so user can interact with it in the same way as in `Collection`.
    }

    // Find.
    /*  @docs:
     *  @title: Find
     *  @description: Find a document by a query.
     *  @return:
     *      Returns the document that was found or `null` when no document is found.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *      @required: false
     *  @parameter:
     *      @name: query
     *      @desc: The query options.
     *      @type: object
     */
    async find(uid = null, query = {}) {
        if (uid != null) {
            query._uid = uid;
        }
        return await this._col.find(query);
    }

    // Load.
    /*  @docs:
     *  @title: Load
     *  @description: Load data by user id and path.
     *  @return:
     *      Returns the loaded document.
     *
     *      Returns the `def` parameter when the data does not exist, keep in mind that when parameter `def` is an object it could be a reference to a defined variable.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: path
     *      @description: The database path to the document.
     *      @type: string, object
     *  @parameter:
     *      @name: def
     *      @description:
     *          The default data to be returned when the data does not exist.
     *
     *          When the type of parameter `def` is `object` then the keys that do not exist in the loaded object, but do exist in the default object will be inserted into the loaded object.
     *      @type: null, object
     */
    async load(uid, path, def = undefined) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        if (typeof uid !== "string") {
            throw Error(`Parameter "uid" has an invalid type "${typeof uid}", the valid type is "string".`);
        }
        if (typeof path === "object") {
            return await this._col.load({...path, _uid: uid}, def);
        } else {
            return await this._col.load({_path: path, _uid: uid}, def);
        }
    }

    // Save.
    /*  @docs:
     *  @title: Save
     *  @description: Save data by user id and path.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: path
     *      @description: The database path to the document.
     *      @type: string, object
     *  @parameter:
     *      @name: data
     *      @description: The data to save.
     *      @type: null, boolean, number, string, array, object
     */
    async save(uid, path, content) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        if (typeof uid !== "string") {
            throw Error(`Parameter "uid" has an invalid type "${typeof uid}", the valid type is "string".`);
        }
        if (typeof path === "object") {
            return await this._col.save({...path, _uid: uid}, content);
        } else {
            return await this._col.save({_path: path, _uid: uid}, content);
        }
    }

    // Update.
    /*  @docs:
     *  @title: Update
     *  @description: Update data by user id and path.
     *  @return:
     *      Returns the updated document.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: path
     *      @description: The database path to the document.
     *      @type: string, object
     *  @parameter:
     *      @name: data
     *      @description: The data to save.
     *      @type: null, boolean, number, string, array, object
     *  @parameter:
     *      @name: auto_create
     *      @description: Automatically create the document when it does not exist.
     *      @type: boolean
     */
    async update(uid, path, content, auto_create = false) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        if (typeof uid !== "string") {
            throw Error(`Parameter "uid" has an invalid type "${typeof uid}", the valid type is "string".`);
        }
        if (typeof path === "object") {
            return await this._col.update({...path, _uid: uid}, content, auto_create);
        } else {
            return await this._col.update({_path: path, _uid: uid}, content, auto_create);
        }
    }

    // List.
    /*  @docs:
     *  @title: List
     *  @description: List all child documents of directory path.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: path
     *      @description: The database directory path.
     *      @type: string, object
     *  @parameter:
     *      @name: options
     *      @description: List options.
     *      @type: object
     *      @attribute:
     *          @name: process
     *          @description: Process the document. By default saved non object data will be stored under `_content`. Processing checks this attribute and uses that content instead when it is detected.
     *          @type: boolean
     *          @default: true
     *      @attribute:
     *          @name: projection
     *          @description: The data attributes to retrieve, when left undefined all attributes are retrieved.
     *          @type: object
     *          @default: undefined
     */
    async list(uid, path, options = {}) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        if (typeof uid !== "string") {
            throw Error(`Parameter "uid" has an invalid type "${typeof uid}", the valid type is "string".`);
        }
        if (typeof path === "object") {
            return await this._col.list({...path, _uid: uid}, options)
        } else {
            return await this._col.list({_path: path, _uid: uid}, options)
        }
    }

    // List query.
    /*  @docs:
     *  @title: List Query
     *  @description: List all documents of the collection based on a query.
     *  @parameter:
     *      @name: query
     *      @desc: The query options.
     *      @type: object
     *  @parameter:
     *      @name: options
     *      @description: List options.
     *      @type: object
     *      @attribute:
     *          @name: process
     *          @description: Process the document. By default saved non object data will be stored under `_content`. Processing checks this attribute and uses that content instead when it is detected.
     *          @type: boolean
     *          @default: true
     *      @attribute:
     *          @name: projection
     *          @description: The data attributes to retrieve, when left undefined all attributes are retrieved.
     *          @type: object
     *          @default: undefined
     */
    async list_query(query = {}, options = {}) {
        return await this._col.list_query(query, options);
    }

    // List all.
    /*  @docs:
     *  @title: List All
     *  @description: List all documents of the collection, optionally per uid.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: options
     *      @description: List options.
     *      @type: object
     *      @attribute:
     *          @name: process
     *          @description: Process the document. By default saved non object data will be stored under `_content`. Processing checks this attribute and uses that content instead when it is detected.
     *          @type: boolean
     *          @default: true
     *      @attribute:
     *          @name: projection
     *          @description: The data attributes to retrieve, when left undefined all attributes are retrieved.
     *          @type: object
     *          @default: undefined
     */
    async list_all(uid = null, options = {}) {
        if (uid == null) {
            return await this._col.list_all({}, options)
        } else {
            return await this._col.list_all({_uid: uid}, options);
        }
    }

    // Delete.
    /*  @docs:
     *  @title: Delete
     *  @description: Delete a document of the collection by uid and path.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: path
     *      @description: The database path to the document.
     *      @type: string, object
     */
    async delete(uid, path) {
        if (typeof path !== "string" && (typeof path !== "object" || path === null)) {
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        if (typeof uid !== "string") {
            throw Error(`Parameter "uid" has an invalid type "${typeof uid}", the valid type is "string".`);
        }
        if (typeof path === "object") {
            return await this._col.delete({...path, _uid: uid})
        } else {
            return await this._col.delete({_path: path, _uid: uid})
        }
    }

    // Delete.
    /*  @docs:
     *  @title: Delete Query
     *  @description: Delete a document of the collection by query.
     *  @parameter:
     *      @name: query
     *      @description: The query object.
     *      @type: object
     */
    async delete_query(query) {
        if (typeof query !== "object" || query === null || Object.keys(query).length === 0) {
            throw Error(`Parameter "query" has an invalid type "${typeof query}", the valid type is "object".`);
        }
        if (Object.keys(query).length === 0) {
            throw Error(`Parameter "query" is an empty object.`);
        }
        return await this._col.delete_query(query)
    }

    // Delete all.
    /*  @docs:
     *  @title: Delete All
     *  @description: Delete all documents of a uid from the collection.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: path
     *      @description: The optional database path query.
     *      @type: null, string, object
     */
    async delete_all(uid, path = null) {
        if (typeof uid !== "string") {
            throw Error(`Parameter "uid" has an invalid type "${typeof uid}", the valid type is "string".`);
        }
        if (path == null) {
            return await this._col.delete_all({_uid: uid})
        }
        else if (typeof path === "object") {
            return await this._col.delete_all({...path, _uid: uid})
        } else {
            return await this._col.delete_all({_path: path, _uid: uid})
        }
    }

    // Delete recursive, meant for subpath style deletion of a dir, so dir "mydir/" to delete everything inside the dir "mydir/document" etc.
    /*  @docs:
     *  @title: Delete Recursive
     *  @description: Delete all the documents inside a directory of a uid from the collection.
     *  @parameter:
     *      @name: uid
     *      @cached: Users:uid:param
     *  @parameter:
     *      @name: path
     *      @description: The database directory path.
     *      @type: string
     */
    async delete_recursive(uid, path) {
        if (typeof path !== "string") { // must always be a string.
            throw Error(`Parameter "path" has an invalid type "${typeof path}", the valid type is "string".`);
        }
        if (typeof uid !== "string") {
            throw Error(`Parameter "uid" has an invalid type "${typeof uid}", the valid type is "string".`);
        }
        return await this._col.delete_recursive(path, uid)
    }

    // Delete collection.
    /*  @docs:
     *  @title: Delete Collection
     *  @description: Delete all documents of from the collection.
     */
    async delete_collection() {
        await this._col.delete_collection()
    }

    // Clean a document from all system attributes.
    clean(doc) {
        return this._col.clean(doc);
    }
}


// ---------------------------------------------------------
// Database.

/*  @docs:
    @nav: Backend
    @chapter: Database
    @title: Database
    @desc: 
        The MongoDB database class, accessable under `Server.db`.

        The database class can be utilized in two ways.

        1. You only provide the `uri` parameter to access an already running mongodb database.

        2. You provide parameters `config`, `source` and `start_args` to start and optionally create the database.
    @param:
        @name: uri
        @desc: The mongodb server uri.
        @type: string
    @param:
        @name: preview
        @desc: Enable the database preview endpoint `/vweb/db/preview` (only available when `Server.production` is `false`).
        @type: string
    @param:
        @name: config
        @desc: The json data for the mongodb config file. This file will be saved to the `$source/mongod.json` file when it is defined. Parameter `source` is required when this parameter is defined.
        @type: null, string
    @param:
        @name: source
        @desc: The path to the database directory. This parameter is required when parameter `config` is defined.
        @type: null, string
    @param:
        @name: start_args
        @desc: The mongod database start command arguments.
        @type: null, array[string]
    @param:
        @name: _server
        @ignore: true
 */
class Database {
    constructor({
        uri = null, //'mongodb://localhost:27017/main',
        preview = true,
        source = null,
        config = null,
        start_args = null,
        _server,
    }) {

        // Checks.
        if (config != null || source != null || start_args != null) {
            const response = vlib.utils.verify_params({params: arguments[0], check_unknown: true, info: {
                uri: {type: "string", default: null},
                source: "string",
                config: {type: "object", default: {}},
                start_args: {type: "array", default: []},
                _server: "object",
            }});
            ({uri, config, start_args} = response);
        }

        // Arguments.
        this.uri = uri;
        this.preview = preview;
        this.config = config;
        this.source = source == null ? source : new vlib.Path(source);
        this.start_args = start_args;
        this.server = _server;

        // Attributes.
        this.client = null;
        this.collections = {};
    }

    // Database preview.
    _initialize_db_preview() {
        if (this.preview && this.server.production === false) {
            this.server.endpoint(

                // Database previe.
                {
                    method: "GET"   ,
                    endpoint: "/vweb/db/preview",
                    view: {
                        callback: () => {
                            vweb.utils.on_load(async () => {
                                
                                // Style theme.   
                                const style = {
                                    // bg: "#151721",
                                    // sub_bg: "#191B28",
                                    // tag_bg: "#1C203A",
                                    // div_bg: "#282B40",
                                    // fg: "#FFFFFF",
                                    // sub_fg: "#FFFFFF99",
                                    // tag_fg: "#FFFFFF",

                                    bg: "#F6F8F8",
                                    sub_bg: "#FFFFFF",
                                    tag_bg: "#F6F8F8",
                                    div_bg: "#00000010",
                                    fg: "#32334F",
                                    sub_fg: "#31344599",
                                    tag_fg: "#313445",
                                };

                                // List all collections.
                                const collections = (await vweb.utils.request({url: "/vweb/db/collections"})).collections;

                                // Render a list.
                                const prev_lists = [];
                                function RenderList ({
                                    title, 
                                    list, 
                                    doc = null,
                                    add_prev = true,
                                }) {
                                    if (add_prev) {
                                        prev_lists.append({title, list, doc});
                                    }

                                    // Object view.
                                    const obj_view = VStack();
                                    const refresh_obj_view = () => {
                                        obj_view.inner_html("");
                                        let index = 0;
                                        obj_view.append(
                                            ForEach(list, (key, value) => {
                                                ++index;
                                                let current_key = key;
                                                let value_type = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
                                                if (Array.isArray(value)) {
                                                    value = JSON.stringify(value, null, 4)
                                                }

                                                // Key input.
                                                const key_input = Input("key")
                                                    .value(key)
                                                    .font_family("'Menlo', 'Consolas', monospace")
                                                    .color(style.sub_fg)
                                                    .font_size(14)
                                                    .padding(0)
                                                    .readonly(key === "_path" || key === "_uid" || key === "uid")
                                                    .on_mouse_over(e => e.color(style.fg))
                                                    .on_mouse_out(e => e.color(style.sub_fg))
                                                    .on_render((e) => e.width(e.text_width(key)))
                                                    .on_input((e) => {
                                                        if (key != current_key) {
                                                            list[e.value()] = list[current_key];
                                                            delete list[current_key];
                                                            current_key = e.value();
                                                        }
                                                        e.width(e.text_width(current_key));
                                                    });

                                                // Value input.
                                                const value_input = Input("value")
                                                        .value(value == null ? "null" : value)
                                                        .font_family("'Menlo', 'Consolas', monospace")
                                                        .color(style.sub_fg)
                                                        .display("inline-block")
                                                        .width("fit-content")
                                                        .font_size(14)
                                                        .readonly(key === "_path" || key === "_uid")
                                                        .stretch(true)
                                                        .on_mouse_over(e => e.color(style.fg))
                                                        .on_mouse_out(e => e.color(style.sub_fg))
                                                        .on_input(() => {
                                                            clearTimeout(value_input.timeout)
                                                            value_input.timeout = setTimeout(update_value, 500);
                                                        })

                                                // Type select.
                                                const type_select = ExtendedSelect({items: ["null", "boolean", "number", "string", "array", "object"]})
                                                    .center()
                                                    .margin(0)
                                                    .max_width(73)
                                                    .color(style.sub_fg)
                                                    .font_size(14)
                                                    .border_radius(10)
                                                    .background(style.tag_bg)
                                                    .border_color(style.div_bg)
                                                    .value(value_type)
                                                    .container
                                                        .padding(2.5, 5)
                                                        .parent();

                                                // Update the list after edits.
                                                const update_value = () => {
                                                    const type = type_select.value();
                                                    const value = value_input.value();
                                                    if (type === "null") {
                                                        list[current_key] = null;
                                                        value_input.value(list[current_key].toString());
                                                    }
                                                    else if (type === "boolean") {
                                                        list[current_key] = value == "true" || value == "True" || value == "TRUE" || value == "1";
                                                        value_input.value(list[current_key].toString());
                                                    }
                                                    else if (type === "number") {
                                                        if (value.indexOf(".") === -1) {
                                                            list[current_key] = paseInt(value);
                                                        } else {
                                                            list[current_key] = paseFloat(value);
                                                        }
                                                        if (isNaN(list[key_input.key])) {
                                                            list[current_key] = 0;
                                                        }
                                                        value_input.value(list[current_key].toString());
                                                    }
                                                    else if (type === "string") {
                                                        list[current_key] = value;
                                                    }
                                                    else if (type === "object") {
                                                        list[current_key] = JSON.parse(value);
                                                    }
                                                }
                                                
                                                // Row.
                                                const row = HStack(
                                                    key_input,
                                                    Text(" : ")
                                                        .white_space("pre")
                                                        .font_family("'Menlo', 'Consolas', monospace")
                                                        .color(style.sub_fg)
                                                        .font_size(14),
                                                    value_input,
                                                    type_select,

                                                    index < Object.keys(list).length ? null : VStack("add")
                                                        .background(style.tag_bg)
                                                        .padding(5, 12.5)
                                                        .border_radius(10)
                                                        .font_size(13)
                                                        .color("#3B8553")
                                                        .margin_left(10)
                                                        .border(1, style.div_bg)
                                                        .on_click(() => {
                                                            list["_new"] = "";
                                                            refresh_obj_view();
                                                        }),

                                                    VStack("delete")
                                                        .background(style.tag_bg)
                                                        .color("#B2321E")
                                                        .padding(5, 12.5)
                                                        .border_radius(10)
                                                        .font_size(13)
                                                        .margin_left(10)
                                                        .border(1, style.div_bg)
                                                        .on_click(async () => {
                                                        }),
                                                )
                                                .center_vertical()
                                                .padding(7.5, 0)
                                                if (vweb.utils.is_obj(value)) {
                                                    row.on_click(() => RenderList({title: `${title}.${key}`, list: value}));
                                                }
                                                return [
                                                    row,
                                                    Divider().background(style.div_bg),
                                                ]
                                            })
                                        );
                                    }

                                    // Add.
                                    preview.inner_html("");
                                    preview.append(
                                        Scroller(
                                            VStack(
                                                HStack(
                                                    Title("Database")
                                                        .font_family("'Menlo', 'Consolas', monospace")
                                                        .font_size(12)
                                                        .color(style.tag_fg)
                                                        .background(style.tag_bg)
                                                        .padding(5, 12.5)
                                                        .border_radius(10)
                                                        .margin(0, 0, 0, 0)
                                                        .border(1, style.div_bg)
                                                        .width("fit-content"),

                                                    Spacer(),

                                                    doc == null ? null : Button("Update")
                                                        .background(style.tag_bg)
                                                        .color("#3B8553")
                                                        .padding(5, 12.5)
                                                        .margin_right(10)
                                                        .border_radius(10)
                                                        .border(1, style.div_bg)
                                                        .on_click(() => {
                                                            // --prev_lists.length;
                                                            // const last = prev_lists[prev_lists.length - 1];
                                                            // RenderList({...last, add_prev: false})
                                                        }),

                                                    doc == null ? null : Button("Delete")
                                                        .background(style.tag_bg)
                                                        .color("#B2321E")
                                                        .padding(5, 12.5)
                                                        .margin_right(10)
                                                        .border_radius(10)
                                                        .border(1, style.div_bg)
                                                        .on_click(async () => {
                                                            vweb.utils.request({
                                                                method: "DELETE",
                                                                url: "/vweb/db/document",
                                                                data: doc,
                                                            })
                                                            --prev_lists.length;
                                                            const last = prev_lists[prev_lists.length - 1];

                                                            const __name = doc.uid != null ? `${doc.uid}:${doc.id}` : doc.id
                                                            const filtered_list = [];
                                                            last.list.iterate((item) => {
                                                                if (item.__name !== __name) {
                                                                    filtered_list.append(item);
                                                                }
                                                            })
                                                            last.list = filtered_list;
                                                            RenderList({...last, add_prev: false})
                                                        }),

                                                    prev_lists.length == 1 ? null : Button("Prev")
                                                        .background(style.tag_bg)
                                                        .color(style.tag_fg)
                                                        .padding(5, 12.5)
                                                        .border_radius(10)
                                                        .border(1, style.div_bg)
                                                        .on_click(() => {
                                                            --prev_lists.length;
                                                            const last = prev_lists[prev_lists.length - 1];
                                                            RenderList({...last, add_prev: false})
                                                        }),
                                                ),

                                                Title(title)
                                                    .font_family("'Menlo', 'Consolas', monospace")
                                                    .font_size(18)
                                                    .color(style.fg)
                                                    .margin(15, 0),

                                                Divider().background(style.div_bg),

                                                Array.isArray(list)
                                                    ? ForEach(list, (item) => {
                                                        return [
                                                            VStack(
                                                                Text(item.__name)
                                                                    .font_family("'Menlo', 'Consolas', monospace")
                                                                    .color(style.sub_fg)
                                                                    .font_size(14)
                                                                    .on_mouse_over(e => e.color(style.fg))
                                                                    .on_mouse_out(e => e.color(style.sub_fg))
                                                            )
                                                            .padding(7.5, 0)
                                                            .on_click(item.__click),

                                                            Divider().background(style.div_bg),
                                                        ]
                                                    })
                                                    : () => {refresh_obj_view(); return obj_view}
                                            )
                                            .margin(25, 50)
                                            .padding(25, 25)
                                            .background(style.sub_bg)
                                            .border_radius(10)
                                            .box_shadow("0px 0px 5px #00000090")
                                        )
                                        .font_family("Helvetica, sans-serif")
                                        .background(style.bg)
                                        .frame("100%", "100%")
                                    )
                                }

                                // Render the collections.
                                const RenderCollections = () => {
                                    RenderList({title: "/", list: collections.iterate_append((item) => {
                                        return {
                                            __name: `${item}/`,
                                            __click: () => RenderCollection(item),
                                        }
                                    })})
                                }

                                // Render a collection.
                                const RenderCollection = async (collection) => {
                                    const documents = (await vweb.utils.request({url: "/vweb/db/documents", data: {collection}})).documents;
                                    RenderList({title: `${collection}/`, list: documents.iterate_append((item) => {
                                        return {
                                            __name: item._uid != null ? `${item._uid}:${item._path}` : item._path,
                                            __click: () => RenderDocument(collection, item._path, item._uid),
                                        }
                                    })})
                                }

                                // Render a document.
                                const RenderDocument = async (collection, path, uid = null) => {
                                    let doc = (await vweb.utils.request({url: "/vweb/db/document", data: {collection, path, uid}})).document
                                    if (Array.isArray(doc)) {
                                        doc = {_content: doc};
                                        // console.log(doc);
                                    }
                                    console.log(doc);
                                    RenderList({
                                        title: uid != null ? `${collection}/${uid}:${path}` : `${collection}/${path}`, 
                                        list: doc,
                                        doc: {collection, uid, path},
                                    })
                                }

                                // Stack.
                                const preview = VStack()
                                    .position(0, 0, 0, 0);

                                // Render all collections.
                                RenderCollections();

                                // Response.
                                return preview;

                            });
                        }
                    }
                },

                // Get collections.
                {
                    method: "GET",
                    endpoint: "/vweb/db/collections",
                    content_type: "application/json",
                    rate_limit: 100,
                    rate_limit_duration: 60,
                    callback: async (request, response) => {

                        // Sign in.
                        return response.success({data: {
                            message: "Successfully retrieved all collections.",
                            collections: await this.get_collections(),
                        }});
                    }
                },

                // Get collection documents.
                {
                    method: "GET",
                    endpoint: "/vweb/db/documents",
                    content_type: "application/json",
                    rate_limit: 100,
                    rate_limit_duration: 60,
                    params: {
                        collection: "string",
                    },
                    callback: async (request, response, params) => {

                        // Check collection.
                        let col;
                        if ((col = this.collections[params.collection]) == null) {
                            return response.error({data: {error: `Invalid collection "${params.collection}".`}})
                        }

                        // Load docs.
                        let docs = await col.list_all();

                        // Sign in.
                        return response.success({data: {
                            message: "Successfully loaded the document.",
                            documents: docs,
                        }});
                    }
                },

                // Get document.
                {
                    method: "GET",
                    endpoint: "/vweb/db/document",
                    content_type: "application/json",
                    rate_limit: 100,
                    rate_limit_duration: 60,
                    params: {
                        collection: "string",
                        path: ["string", "object"],
                        uid: {type: ["string", "null"], default: null},
                    },
                    callback: async (request, response, params) => {

                        // Check collection.
                        let col;
                        if ((col = this.collections[params.collection]) == null) {
                            return response.error({data: {error: `Invalid collection "${params.collection}".`}})
                        }

                        // Load doc.
                        let doc;
                        if (params.uid == null) {
                            doc = await col.load(params.path);
                        } else {
                            doc = await col.load(params.uid, params.path);
                        }

                        // Sign in.
                        return response.success({data: {
                            message: "Successfully loaded the document.",
                            document: doc,
                        }});
                    }
                },

                // Delete document.
                {
                    method: "DELETE",
                    endpoint: "/vweb/db/document",
                    content_type: "application/json",
                    rate_limit: 100,
                    rate_limit_duration: 60,
                    params: {
                        collection: "string",
                        path: ["string", "object"],
                        uid: {type: ["string", "null"], default: null},
                    },
                    callback: async (request, response, params) => {

                        // Check collection.
                        let col;
                        if ((col = this.collections[params.collection]) == null) {
                            return response.error({data: {error: `Invalid collection "${params.collection}".`}})
                        }

                        // Load doc.
                        let doc;
                        if (params.uid == null) {
                            doc = await col.delete(params.path);
                        } else {
                            doc = await col.delete(params.uid, params.path);
                        }

                        // Sign in.
                        return response.success({data: {
                            message: "Successfully deleted the document.",
                        }});
                    }
                },

                // Update document.
                {
                    method: "PATCH",
                    endpoint: "/vweb/db/document",
                    content_type: "application/json",
                    rate_limit: 100,
                    rate_limit_duration: 60,
                    params: {
                        collection: "string",
                        path: ["string", "object"],
                        uid: {type: ["string", "null"], default: null},
                        content: "object",
                    },
                    callback: async (request, response, params) => {

                        // Check collection.
                        let col;
                        if ((col = this.collections[params.collection]) == null) {
                            return response.error({data: {error: `Invalid collection "${params.collection}".`}})
                        }

                        // Load doc.
                        let doc;
                        if (params.uid == null) {
                            doc = await col.update(params.path, params.content);
                        } else {
                            doc = await col.update(params.uid, params.path, params.content);
                        }

                        // Sign in.
                        return response.success({data: {
                            message: "Successfully updated the document.",
                        }});
                    }
                },
            )
        }
    }

    // Connect.
    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db();
        } catch (error) {
            console.error(error);
            throw new Error('Error connecting to the database');
        }
    }

    // Start.
    /*
    async start() {
        return new Promise((resolve) => {

            // Is remote.
            if (this.remote) { 
                
                return resolve();
            }

            // Check config file.
            const set_defaults = (config, defaults) => {
                let edits = 0;
                Object.keys(defauls).iterate((key) => {
                    if (config[key] == null) {
                        ++edits;
                        config[key] = defaults[key];
                    } else if (typeof config[key] == "object" && Array.isArray(config[key]) === false) {
                        edits += set_defaults(config[key], defaults[key]);
                    }
                })
                return edits;
            }
            const config_path = new vlib.Path(this.path+"/mongod.conf");
            let config = {};
            if (config_path.exists()) {
                config = config_path.load_sync({type: "object"});
            }
            const edits = set_defaults(config, {
                "systemLog": {
                    "destination": "file",
                    "path": `${this.path}/mongod.log`,
                    "logAppend": true,
                    "logRotate": "reopen",
                    "verbosity": 1
                },
                "storage": {
                    "dbPath": `${this.path}/db`,
                    "journal": {
                        "enabled": true
                    }
                },
                "processManagement": {
                    "fork": true,
                    "pidFilePath": `${this.path}/mongod.pid`
                },
                "net": {
                    "port": 27017,
                    "bindIp": "127.0.0.1"//,server-ip
                    // "ssl": {
                    //     "mode": "requireSSL",
                    //     "PEMKeyFile": this.ssl_key,
                    //     "CAFile": this.ssl_ca,
                    //     "clusterFile": this.ssl_cluster,
                    //     "allowInvalidCertificates": false
                    // }
                },
                "security": {
                    "authorization": "enabled",
                    // "keyFile": "/path/to/mongodb-keyfile"
                },
                // "replication": {
                //     "replSetName": "yourReplSetName"
                // }
            })
            if (edits > 0) {
                config_path.save_sync(JSON.stringify(config));
            }

            // Start the mongodb server.
            this.proc = libproc.spawn(
                "mongod",
                ["--config", config_path.str()],
                {
                    // cwd: this.source,
                    stdio: "inherit",
                    detached: true,
                    env: {...process.env},
                },
            )
            this.proc.stdout.on('data', (data) => {
                console.log(data.toString());
            })
            this.proc.stderr.on('data', (data) => {
                console.error(data.toString());
            })
            this.proc.on("error", (code, signal) => {
                console.error(`MongoDB exited with error signal ${signal}.`);
                process.exit(code);
            })
            this.proc.on("exit", (code, signal) => {
                console.error(`MongoDB exited with signal ${signal}.`);
                process.exit(code);
            })

            // Wait one sec then connect.
            setTimeout(() => {

                resolve();
            }, 1000)
        })  
    }
    */

    // Initialize.
    async initialize() {

        // Mode 2.
        if (this.source != null) {

            // Create the database.
            if (!this.source.exists()) {
                this.source.mkdir_sync();
            }

            // Set defaults.
            if (this.config.systemLog === undefined) { this.config.systemLog = {}; }
            this.config.systemLog.path = this.source.join("mongod.log").str()
            if (this.config.systemLog.destination === undefined) {
                this.config.systemLog.destination = "file";
            }
            if (this.config.systemLog.logAppend === undefined) {
                this.config.systemLog.logAppend = true;
            }
            if (this.config.systemLog.logRotate === undefined) {
                this.config.systemLog.logRotate = "reopen";
            }
            if (this.config.systemLog.verbosity === undefined) {
                this.config.systemLog.verbosity = 1;
            }

            if (this.config.storage === undefined) { this.config.storage = {}; }
            this.config.storage.dbPath = this.source.join("db").str()

            if (this.config.processManagement === undefined) { this.config.processManagement = {}; }
            this.config.processManagement.pidFilePath = this.source.join("mongod.pid").str()

            if (this.config.net === undefined) { this.config.net = {}; }
            if (this.config.net.port === undefined) { this.config.net.port = 27017; }
            if (this.config.net.bindIp === undefined) { this.config.net.bindIp = "127.0.0.1"; }

            // Set the uri.
            if (this.uri == null) {
                this.uri = `mongodb://${this.config.net.bindIp}:${this.config.net.port}/main`
            }

            // Save the config.
            const config_path = this.source.join("mongod.json");
            config_path.save_sync(JSON.stringify(this.config));

            // Start the database.
            this.proc = libproc.spawn(
                "mongod",
                ["--config", config_path.str(), ...this.start_args],
                {
                    // cwd: this.source,
                    stdio: "pipe",
                    detached: true,
                    env: {...process.env},
                },
            )
            this.proc.stdout.on('data', (data) => {
                console.log(data.toString());
            })
            this.proc.stderr.on('data', (data) => {
                console.error(data.toString());
            })
            this.proc.on("error", (code, signal) => {
                console.error(`MongoDB crashed with error signal ${signal}.`);
                process.exit(code);
            })

        }

        // Initialize client.
        this.client = new MongoClient(this.uri);

        // Connect.
        await this.connect();
    }

    // Close.
    async close() {
        await this.client.close();
    }

    // Create a uid collection.
    /*  @docs:
        @title: Create Collection
        @desc: Create a database collection.
        @param:
            @name: id
            @desc: The id of the collection.
            @type: string
     */
    create_collection(id) {
        const col = new Collection(this.db.collection(id));
        this.collections[id] = col;
        return col;
    }

    // Create a uid collection.
    /*  @docs:
        @title: Create UID Based Collection
        @desc: Create a UID based database collection.
        @param:
            @name: id
            @desc: The id of the collection.
            @type: string
     */
    create_uid_collection(id) {
        const col = new UIDCollection(this.db.collection(id));
        this.collections[id] = col;
        return col;
    }

    // Get collections.
    /*  @docs:
        @title: Get Collections
        @desc: Get the names of the initializated database collections.
     */
    async get_collections() {
        const created = Object.keys(this.collections);
        const database = (await this.db.listCollections().toArray()).iterate_append((item) => { return item.name});
        return created.concat(database).drop_duplicates().sort((a, b) => {
            const result = a.toLowerCase().localeCompare(b.toLowerCase());
            if (a.startsWith('_') && b.startsWith('_')) { return result; }
            if (a.startsWith('_')) { return 1; }
            if (b.startsWith('_')) { return -1; }
            return result;
        });
    }

}


// ---------------------------------------------------------
// Exports.

module.exports = Database;