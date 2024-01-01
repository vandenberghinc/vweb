// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Enable stacktrace.
#define vlib_trace true

// Includes.
#include <vweb/vweb.h>
using namespace vweb;

// Config.
struct Config {
    
    // Attributes.
    Path        path;
    Path        source;
    Json        json;
    vlib::CLI*  cli;
    
    // Get value.
    JsonValue   null;
    JsonValue& get(const String& key, const Int& type, const Bool& required = true) {
        return get(json, key, type, required);
    }
    JsonValue& get(const Json& json, const String& key, const Int& type, const Bool& required = true) {
        ullong index;
        if ((index = json.find(key)) == NPos::npos) {
            if (!required) {
                return null;
            }
            cli->throw_error(to_str(
                 "Configuration file \"", path,
                 "\" does not contain required key \"",
                 key, "\"."
             ));
        }
        auto& value = json.value(index);
        if (value.type() != type) {
            cli->throw_error(to_str(
                "Configuration file \"",
                path, "\": the type of key \"",
                key, "\" should be \"",
                vlib::json::strtype(type.value()), "\" not \"",
                vlib::json::strtype(value.type()), "\"."
            ));
        }
        return value;
    };
    
    // Compile.
    void    compile() {
        
        // Log.
        print_marker("Compiling.");
        
        // Compile.
        Json& info = get("build", vlib::json::types::json).asj();
        
        // Check bin directory.
        Path bin = source.join("bin");
        if (!bin.exists()) {
            bin.mkdir();
        }
        
        // Set output.
        info["input"] = source.join("start.cpp").str();
        info["output"] = bin.join("start").str();
        
        // Compile.
        vlib::compile(info, path, source);
        
    }
    
};

// Main.
int main(int argc, char** argv) {
    try {
        
        // Set compression level.
        vlib::compression::level = vlib::compression::best_compression;
        
        // Sync cli.
        vlib::CLI cli(argc, argv);
        
        // Create docs.
        cli.add_docs(
                     vlib::null,
                     "vweb <mode> <options>" "\n"
					 "  --create: </path/to/destination/>	Create a hello world vweb website at the specified destination path."
                     "  --start:                            Start the web server in demo mode." "\n"
                     "  --service:                 			Control the service daemon." "\n"
                     "      --start:                        Start the service daemon." "\n"
                     "      --stop:                         Stop the service daemon." "\n"
                     "      --restart:                      Restart the service daemon." "\n"
                     "      --update:                       Update the service daemon." "\n"
                     "      --tail:                         Dump the logs of the service daemon." "\n"
                     "  --generate-csr:                     Generate a CSR, requires key \"tls\" in the vweb config file." "\n"
                     "Options:" "\n"
                     "  --source </path/to/source>:         Define the source path, when unspecified the source \"./\" will be used." "\n"
                     "Notes:" "\n"
                     "  - A configuration file named \".vweb\" is required to manage the website." "\n"
                     
                     // "  --deploy <source>:                  Deploy the website to heroku either using a \".deploy\" file or by arguments." "\n"
                     // "      --app <name>:                   The app name, must match the app name on heroku." "\n"
                     // "      --compiler-flags <name>:        The compiler flags for g++." "\n"
                     // "      --depencencies <path,path>:     The depencencies array with source paths." "\n"
                     // "Options:" "\n"
                     // "  --debug                    Enable debugging mode." "\n"
                     );
        
       
        // Colors.
        if (cli.present("--disable-colors")) {
            vlib::colors::disable();
        }
        
        // Initialize the config file.
        Config config {
            .path = ".vweb",
            .source = "./",
            .cli = &cli,
        };
        if (cli.present("--source")) {
            config.source = cli.get("--source");
            config.path = config.source.join(".vweb");
            if (!config.path.exists()) {
                cli.throw_error(to_str("Configuration file \"", config.path, "\" does not exist."));
            }
        }
		// config.source = "/Volumes/persistance/private/dev/vinc/vweb/files/";
		// config.path = "/Volumes/persistance/private/dev/vinc/vweb/files/.vweb";
        if (config.path.exists()) {
            config.json = Json::load(config.path);
        }
        
        // Help.
        if (cli.present({"-h", "--h"})) {
            vlib::print(cli.docs());
        }
        
        // Create service.
        else if (cli.present("--service")) {
            
            // Check root permission.
            if (getuid() != 0) {
                cli.throw_error("Mode \"--service\" should be run with root privileges.");
            }
            
            // Load config variables.
            Json& info = config.get("service", vlib::json::types::json).asj();
            String& name = config.get(info, "name", vlib::json::types::string).ass();
            JsonValue& description = config.get(info, "description", vlib::json::types::string, false);
            JsonValue& logs_path = config.get(info, "logs", vlib::json::types::string, false);
            JsonValue& err_path = config.get(info, "errors", vlib::json::types::string, false);
            JsonValue& j_arguments = config.get(info, "arguments", vlib::json::types::array, false);
            Array<String> arguments = {"--no-file-watcher"};
            if (j_arguments.isa()) {
                for (auto& i: j_arguments.asa()) {
                    arguments.append(i.str());
                }
            }
            
            // Initialize the daemon.
            vlib::Daemon daemon ({
                .name = name,
                .user = "root",
                .group = vlib::null,
                .command = config.source.join("bin/start").abs(),
                .args = arguments,
                .env = {
                    {"SOURCE", config.source.abs()},
                },
                .desc = description.isn() ? "VWeb service daemon." : description.ass(),
                .auto_restart = true,
                .auto_restart_limit = -1,
                .auto_restart_delay = 5,
                .logs = logs_path.isn() ? vlib::null : logs_path.ass(),
                .errors = err_path.isn() ? vlib::null : err_path.ass(),
            });
            if (!daemon.exists()) {
                print_marker("Creating service ", daemon.name(), ".");
                daemon.create();
            }
            
            // Allow multiple args.
            Bool found_arg = false;
            
            // Update daemon.
            if (cli.present("--update")) {
                found_arg = true;
                print_marker("Updating service ", daemon.name(), ".");
                daemon.update();
            }
            
            // Start daemon.
            if (cli.present("--start")) {
                found_arg = true;
                config.compile();
                print_marker("Starting service ", daemon.name(), ".");
                daemon.start();
            }
            
            // Start daemon.
            if (cli.present("--stop")) {
                found_arg = true;
                print_marker("Stopping service ", daemon.name(), ".");
                daemon.stop();
            }
            
            // Start daemon.
            if (cli.present("--restart")) {
                found_arg = true;
                config.compile();
                print_marker("Restarting service ", daemon.name(), ".");
                daemon.restart();
            }
            
            // Tail daemon.
            if (cli.present("--tail")) {
                found_arg = true;
                print_marker("Tailing service ", daemon.name(), ".");
                print(daemon.tail(cli.get<Int>("--lines", 100)));
            }
            
            // Invalid.
            if (!found_arg) {
                print(cli.docs());
                cli.throw_invalid();
            }
            
        }
        
        // Start in demo mode.
        else if (cli.present("--start")) {
            vweb::utils::FileWatcher file_watcher (
                config.source,
                config.path,
                config.get("build", vlib::json::types::json).asj()
            );
            file_watcher.start();
        }
        
		// Create.
		else if (cli.present("--create")) {
			Path dest = cli.get("--create");
			if (dest.exists()) {
				cli.throw_error(to_str("Destination path \"", dest, "\" already exists."));
			}
			Path src = Path(__FILE__).base_r(2).join_r("files/hello_world");
			src.sync(dest);
			print_marker("Successfully created a website at \"", dest, "\".");
		}
		
        // Generate a tls csr.
        else if (cli.present("--generate-csr")) {
            print_marker("Generating CSR.");
            
            // Vars.
            Json& info = config.get("tls", vlib::json::types::json).asj();
            String& country_code = config.get(info, "country_code", vlib::json::types::string).ass();
            String& state = config.get(info, "state", vlib::json::types::string).ass();
            String& locality = config.get(info, "locality", vlib::json::types::string).ass();
            String& organization = config.get(info, "organization", vlib::json::types::string).ass();
            String& organization_unit = config.get(info, "organization_unit", vlib::json::types::string).ass();
            String& common_name = config.get(info, "common_name", vlib::json::types::string).ass();
            
            // Create dirs.
            Path csr_path = config.source.join(".tls");
            if (!csr_path.exists()) {
                csr_path.mkdir();
            }
            csr_path = csr_path.join("csr_test");
            if (!csr_path.exists()) {
                csr_path.mkdir();
            }
            
            // Generate.
            String cmd = to_str(
                "openssl req -newkey ec:<(openssl genpkey -genparam -algorithm ec -pkeyopt ec_paramgen_curve:P-256) -keyout ",
                csr_path.join("key.key"),
                " -out ",
                csr_path.join("csr.csr"),
                " -subj \"",
                "/C=", country_code,
                "/ST=", state,
                "/L=", locality,
                "/O=", organization,
                "/OU=", organization_unit,
                "/CN=", common_name,
                "\""
            );
            Proc proc { .timeout = 60 * 5 * 1000, .log = false };
            if (proc.execute(cmd) != 0) {
                cli.throw_error("Encoutered an error while generating the CSR.");
            } else if (proc.exit_status() != 0) {
                String err = proc.err_or_out();
                if (err.is_defined()) {
                    cli.throw_error(to_str("Encoutered an error while generating the CSR: ", err));
                } else {
                    cli.throw_error("Encoutered an error while generating the CSR.");
                }
            }
        }
        
        // Deploy to heroku.
        /*
        else if (cli.present("--deploy")) {
            
            // Vars.
            String app, source, compiler_flags;
            Array<Path> dependencies; // do not include openssl, heroku has that installed already.
            Dict<String, String> env;
            Path path = cli.get("--deploy", "");
            
            // Deploy by args.
            if (cli.present("--app") && cli.present("--compiler-flags") && cli.present("--dependencies")) {
                app = cli.get("--app");
                source = path;
                compiler_flags = cli.get("--compiler-flags");
                dependencies = cli.get<Array<Path>>("--dependencies");
            }
            
            // Deploy by source path.
            else {
            
                // Check if deploy is source path.
                if (path.is_defined() && path.join(".deploy").exists()) {
                    path.join_r(".deploy");
                }
                
                // Path does not end with .deploy so reset.
                else if (path.is_defined() && path.name() != ".deploy") {
                    path = "";
                }
                
                // Check if local file .deploy exists.
                else if (path.is_undefined() && Path::exists(".deploy")) {
                    path = ".deploy";
                }
                
                // No path found.
                if (!path.exists()) {
                    cli.dump_docs();
                    throw vlib::ConfigError("vweb", "Define build arguments or create a \".deploy\" file.");
                }
                
                // Load config.
                Path base = Path(path).base().abs_r();
                Json info = Json::load(path);
                
                // Get value.
                auto get_value = [&](const String& key, const Int& type) -> JsonValue& {
                    ullong index;
                    if ((index = info.find(key)) == NPos::npos) {
                        throw vlib::ConfigError(to_str(
                            "Configuration file \"", path,
                            "\" does not contain required key \"",
                            key, "\"."
                        ));
                    }
                    auto& value = info.value(index);
                    if (value.type() != type) {
                        throw vlib::ConfigError(to_str(
                            "Configuration file \"",
                            path, "\": the type of key \"",
                            key, "\" should be \"",
                            vlib::json::strtype(type.value()), "\" not \"",
                            vlib::json::strtype(value.type()), "\"."
                        ));
                    }
                    return value;
                };
                
                // Get app.
                JsonValue& value = get_value("app", vlib::json::types::string);
                app = move(value.ass().replace_r("$BASE", base));
                
                // Get source.
                value = get_value("source", vlib::json::types::string);
                source = move(value.ass().replace_r("$BASE", base));
                
                // Get compiler flags.
                value = get_value("compiler_flags", vlib::json::types::string);
                compiler_flags = move(value.ass().replace_r("$BASE", base));
                
                // Get dependencies.
                value = get_value("dependencies", vlib::json::types::array);
                for (auto& i: value.asa()) {
                    if (!i.iss()) {
                        throw vlib::ConfigError(to_str(
                            "Configuration file \"",
                            path, "\": the children type of array \"dependencies\" should be \"String\" not \"",
                            vlib::json::strtype(i.type()), "\"."
                        ));
                    }
                    dependencies.append(i.ass().replace_r("$BASE", base));
                }
                
                // Get environment.
                Json jenv = get_value("environment", vlib::json::types::json).asj();
                for (auto& index: env.indexes()) {
                    env.append(jenv.key(index), jenv.value(index).str());
                }
                
            }
            
            // Deploy.
            vweb::utils::Heroku heroku{
                .m_app = app,
                .m_source = source,
                .m_compiler_flags = compiler_flags,
                .m_dependencies = dependencies,
                .m_env = env,
            };
            heroku.deploy();
        }
         */
        
        // Invalid mode.
        else {
            print(cli.docs());
            cli.throw_invalid();
        }
        
        return 0;
    } catch (vlib::Exception& e) {
        e.dump();
        return 1;
    }
}
