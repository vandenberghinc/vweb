"use strict";
/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ---------------------------------------------------------
// Libraries.
const libfs = require("fs");
const libpath = require("path");
const libproc = require("child_process");
const { vlib } = require("./vinc.js");
const BrowserPreview = require("./plugins/browser.js");
// ---------------------------------------------------------
// Static endpoints file watcher watcher only used for checking static files with reloads.
class StaticFileWatcher {
    constructor(server) {
        this.server = server;
        this.mtimes = new Map();
        this.endpoints = new Map();
        if (process.argv.includes("--preview")) {
            this.preview = new BrowserPreview();
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.preview) {
                yield this.preview.start();
                yield this.preview.navigate(this.server.full_domain);
            }
            // Set interval.
            this.interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                // Changed endpoints.
                const changed_endpoints = [];
                let changed_aspect_ratio = false;
                // Check file paths.
                for (const endpoint of this.endpoints.values()) {
                    if (endpoint._path) {
                        const path = new vlib.Path(endpoint._path);
                        if (path.mtime !== this.mtimes.get(endpoint._path)) {
                            if (this.mtimes.get(endpoint._path) != null) {
                                console.log(`${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - Refreshing endpoint ${endpoint.method}:${endpoint.endpoint}.`);
                                // Image.
                                if (endpoint.is_image_endpoint) {
                                    endpoint._clear_cache();
                                    const aspect_ratio = yield endpoint.get_aspect_ratio();
                                    if (aspect_ratio && this.server.statics_aspect_ratios[endpoint.endpoint] !== aspect_ratio) {
                                        changed_aspect_ratio = true;
                                        this.server.statics_aspect_ratios[endpoint.endpoint] = aspect_ratio;
                                    }
                                }
                                // Static file.
                                else {
                                    endpoint._load_data_by_path(this.server);
                                    changed_endpoints.push(endpoint.endpoint);
                                }
                                // Refresh browser.
                                if (this.preview) {
                                    this.preview.refresh(endpoint.endpoint);
                                }
                            }
                            this.mtimes.set(endpoint._path, path.mtime);
                        }
                    }
                }
                // Iterate all endpoints using view to check if any included scripts have changed.
                for (const endpoint of this.endpoints.values()) {
                    if (endpoint.view) {
                        let changed = changed_aspect_ratio;
                        if (!changed && changed_endpoints.length > 0) {
                            changed = endpoint.view._embedded_sources.iterate(url => {
                                if (changed_endpoints.includes(url)) {
                                    return true;
                                }
                            });
                        }
                        if (changed) {
                            console.log(`${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - Refreshing endpoint ${endpoint.method}:${endpoint.endpoint}.`);
                            endpoint._refresh(this.server);
                            if (this.preview) {
                                this.preview.refresh(endpoint.endpoint);
                            }
                        }
                    }
                }
            }), 500);
        });
    }
    add(endpoint) {
        if (endpoint._path) {
            this.mtimes.set(endpoint._path, new vlib.Path(endpoint._path).mtime);
        }
        this.endpoints.set(endpoint.endpoint, endpoint);
    }
    has(endpoint) {
        return this.endpoints.has(endpoint);
    }
    stop() {
        clearInterval(this.interval);
    }
}
// ---------------------------------------------------------
// File watcher wathing entire files and restarting when needed.
/*  @docs:
 *  @nav: Backend
    @chapter: Server
    @title: FileWatcher
    @description:
        Used to watch all included files and restart the server when any changes have been made.

    @parameter:
        @name: source
        @description: The path to the source directory to watch.
        @type: string
    @parameter:
        @name: config
        @description: The path to the server's configuration file.
        @type: string
    @parameter:
        @name: interval
        @description: The interval in milliseconds between file change checks.
        @type: number
    @parameter:
        @name: start_file
        @description: The optional start js file to start the server.
        @type: string
 */
class FileWatcher {
    constructor({ source = null, config = null, interval = 750, excluded = [], additional_paths = [], start_file = null, }) {
        // Arguments.
        this.source = source == null ? source : new vlib.Path(source).abs();
        this.config = config;
        this.interval = interval;
        this.excluded = excluded !== null && excluded !== void 0 ? excluded : [];
        this.excluded = this.excluded.iterate_append(path => new vlib.Path(path).abs().str());
        this.start_file = start_file;
        // Check source.
        if (this.source instanceof vlib.Path) {
            this.source = this.source.str();
        }
        if (this.source == null) {
            throw Error("Define argument: source.");
        }
        // Check if the excluded paths exist for user mistakes, these happen often.
        this.excluded.iterate(path => {
            if (!new vlib.Path(path).exists()) {
                console.log(`[StaticFileWatcher] ${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - ${vlib.colors.yellow}Warning${vlib.colors.end}: Excluded file watcher path ${path} does not exist.`);
            }
        });
        // Attributes.
        this.additional_paths = additional_paths.iterate_append(path => new vlib.Path(path).abs().str());
        this.args = [];
        this.mtimes = {};
        this.promise = new Promise(() => { });
    }
    // Add path.
    add_path(path) {
        try {
            path = new vlib.Path(path).abs().str();
            // console.log("Add file watcher exclude", path)
            this.additional_paths.append(path);
        }
        catch (e) {
            console.log(`[StaticFileWatcher] ${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - ${vlib.colors.yellow}Warning${vlib.colors.end}: Additional file watcher path ${path} does not exist.`);
        }
    }
    // Add exclude.
    add_exclude(path) {
        try {
            path = new vlib.Path(path).abs().str();
            // console.log("Add file watcher exclude", path)
            this.excluded.append(path);
        }
        catch (e) {
            console.log(`[StaticFileWatcher] ${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - ${vlib.colors.yellow}Warning${vlib.colors.end}: Excluded file watcher path ${path} does not exist.`);
        }
    }
    // Start.
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop all additional files that are part of the source directory.
            // let additional_paths = [];
            // this.additional_paths.iterate((path) => {
            //     if (path.eq_first(this.source) === false) {
            //         additional_paths.push(path);
            //     }
            // })
            // this.additional_paths = additional_paths;
            // Scan initial files.
            this.scan_files();
            process.on('SIGTERM', () => {
                this.proc.kill("SIGTERM");
                process.exit(0);
            });
            process.on('SIGINT', () => {
                this.proc.kill("SIGINT");
                process.exit(0);
            });
            // Spawn process.
            this.scan_files();
            this.has_changed = false;
            this.spawn_process();
            this.args.push("--file-watcher-restart");
            // Start scan loop.
            yield this.scan();
        });
    }
    // Scan.
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            this.scan_files();
            let interval = this.interval;
            if (this.has_changed) {
                interval += 250;
                yield new Promise((resolve) => {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        this.scan_files();
                        this.has_changed = false;
                        yield this.restart_process();
                        resolve();
                    }), 250);
                });
            }
            setTimeout(() => this.scan(), interval);
        });
    }
    // Scan files.
    scan_files() {
        const scan_files = (dir) => {
            libfs.readdirSync(dir).iterate((name) => scan_file(libpath.join(dir, name)));
        };
        const scan_file = (path) => {
            if (this.excluded.includes(path)) {
                return null;
            }
            let stat;
            try {
                stat = libfs.statSync(path);
            }
            catch (e) {
                delete this.mtimes[path]; // a file was deleted.
                return;
            }
            if (this.mtimes[path] != stat.mtimeMs) {
                if (this.mtimes[path] != null) {
                    console.log(`[FileWatcher] ${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - Source file ${path} changed.`);
                }
                this.has_changed = true;
            }
            this.mtimes[path] = stat.mtimeMs;
            if (stat.isDirectory()) {
                scan_files(path);
            }
        };
        scan_files(this.source);
        this.additional_paths.iterate((path) => scan_file(path));
    }
    // Spawn process.
    spawn_process() {
        if (this._com_file === undefined) {
            this._com_file = new vlib.Path(`/tmp/${String.random(12)}`);
        }
        if (this.config == null && this.start_file == null) {
            throw new Error("The server must be started using `$ vweb --start` in order to use the file watcher.");
        }
        const args = [];
        if (this.start_file) {
            args.append("node", [this.start_file, ...this.args, ...process.argv]);
        }
        else {
            args.append("vweb", ["--start", "--config", this.config, ...this.args, ...process.argv]);
        }
        args.append({
            cwd: this.source,
            stdio: "inherit",
            env: Object.assign(Object.assign({}, process.env), { "VWEB_FILE_WATCHER": "1", "VWEB_STARTED_FILE": this._com_file.str() }),
        });
        this.proc = libproc.spawn(...args);
        // this.proc = libproc.spawn(
        //     "node",
        //     this.args,
        //     {
        //         cwd: this.source,
        //         stdio: "inherit",
        //         env: {
        //              ...process.env,
        //             "VWEB_FILE_WATCHER": "1",
        //             "VWEB_STARTED_FILE": this._com_file.str(),
        //         },
        //     },
        // )
        // this.proc.on("vweb_running", () => { this._started = true; })
        this.proc.on("exit", (code, signal) => {
            if (code == 0) {
                this.scan_files(); // scan again so any subsequent file changes will be updated as well.
                this.has_changed = false;
                this.spawn_process();
            }
            else {
                process.exit(code);
            }
        });
        this.proc.on("error", (e) => {
            console.error(e);
            process.exit(1);
        });
    }
    // Spawn process.
    restart_process() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - Restarting server due to file changes.`); // @warning if you change this running on text you should update vide::BuildSystem since that depends on this log line.
            this._com_file.save_sync("0");
            this.has_changed = false;
            this.proc.kill("SIGINT");
            yield new Promise((resolve) => {
                const loop = () => {
                    if (this._com_file.load_sync() === "1") {
                        return resolve();
                    }
                    setTimeout(loop, 150);
                };
                loop();
            });
        });
    }
}
// ---------------------------------------------------------
// Exports.
module.exports = { StaticFileWatcher, FileWatcher };