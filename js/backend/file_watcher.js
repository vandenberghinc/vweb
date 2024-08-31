/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Libraries.

const libfs = require("fs");
const libpath = require("path");
const libproc = require("child_process");
const {vlib} = require("./vinc.js");

// ---------------------------------------------------------
// Endpoint.

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
    constructor({
        source = null,
        config = null,
        interval = 750,
        excluded = [],
        additional_paths = [],
        start_file = null,
    }) {

        // Arguments.
        this.source = source == null ? source : new vlib.Path(source).abs();
        this.config = config;
        this.interval = interval;
        this.excluded = excluded.iterate_append(path => new vlib.Path(path).abs().str())
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
                console.log(`${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - ${vlib.colors.red}Warning${vlib.colors.end}: Excluded file watcher path ${path} does not exist.`);
            }
        })

        // Attributes.
        this.additional_paths = additional_paths;
        this.args = [];
        this.mtimes = {};
        this.promise = new Promise(() => {});
    }

    // Start.
    async start() {

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
            process.exit(0)
        });
        process.on('SIGINT', () => {
            this.proc.kill("SIGINT");
            process.exit(0)
        });
        
        // Spawn process.
        this.scan_files();
        this.has_changed = false;
        this.spawn_process();
        this.args.push("--file-watcher-restart")

        // Start scan loop.
        await this.scan();
    }

    // Scan.
    async scan() {
        this.scan_files()
        let interval = this.interval;
        if (this.has_changed) {
            interval += 250;
            await new Promise((resolve) => {
                setTimeout(async () => {
                    this.scan_files()
                    this.has_changed = false;
                    await this.restart_process();
                    resolve();
                }, 250)
            })
        }
        setTimeout(() => this.scan(), interval);
    }

    // Scan files.
    scan_files() {
        const scan_files = (dir) => {
            libfs.readdirSync(dir).iterate((name) => scan_file(libpath.join(dir, name)));    
        }
        const scan_file = (path) => {
            if (this.excluded.includes(path)) {
                return null;
            }
            let stat;
            try {
                stat = libfs.statSync(path);
            } catch (e) {
                delete this.mtimes[path]; // a file was deleted.
                return ;    
            }
            if (this.mtimes[path] != stat.mtimeMs) {
                // console.log(`${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - Source file ${path} changed.`);
                this.has_changed = true;
            }
            this.mtimes[path] = stat.mtimeMs;
            if (stat.isDirectory()) {
                scan_files(path)
            }
        }
        scan_files(this.source);
        this.additional_paths.iterate((path) => scan_file(path));
    }

    // Spawn process.
    spawn_process() {
        if (this._com_file === undefined) {
            this._com_file = new vlib.Path(`/tmp/${String.random(12)}`);
        }
        // console.log("SOURCE", this.source, this.args)
        if (this.config == null && this.start_file == null) {
            throw new Error("The server must be started using `$ vweb --start` in order to use the file watcher.");
        }
        const args = [];
        if (this.start_file) {
            args.append(
                "node",
                [this.start_file, ...this.args, ...process.argv],
            )
        } else {
            args.append(
                "vweb",
                ["--start", "--config", this.config, ...this.args, ...process.argv],
            )
        }
        args.append(
            {
                cwd: this.source,
                stdio: "inherit",
                env: {
                     ...process.env,
                    "VWEB_FILE_WATCHER": "1",
                    "VWEB_STARTED_FILE": this._com_file.str(),
                },
            },
        )
        this.proc = libproc.spawn(...args)
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
            } else {
                process.exit(code);
            }
        })
        this.proc.on("error", (e) => {
            console.log(e)
            process.exit(1);
        })
    }

    // Spawn process.
    async restart_process() {
        console.log(`${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - Restarting server due to file changes.`); // @warning if you change this running on text you should update vide::BuildSystem since that depends on this log line.
        this._com_file.save_sync("0");
        this.has_changed = false;
        this.proc.kill("SIGINT");
        await new Promise ((resolve) => {
            const loop = () => {
                if (this._com_file.load_sync() === "1") {
                    return resolve();
                }
                setTimeout(loop, 150)
            }
            loop();
        })
    }
}

// ---------------------------------------------------------
// Exports.

module.exports = FileWatcher;
