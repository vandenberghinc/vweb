/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_UTILS_FILEWATCHER_H
#define VWEB_UTILS_FILEWATCHER_H


// Namespace vweb.
namespace vweb {

// Namespace utils.
namespace utils {

// ---------------------------------------------------------
// File Watcher.

struct FileWatcher {

// Public.
public:
    
    // ---------------------------------------------------------
    // Attributes.
    
    Path                        m_source;       // root path to source.
    Path                        m_config_path;  // path to config file.
    Json                        m_build_config; // build config.
    Array<Path>                 m_paths;        // watching paths.
    Dict<Path, String>          m_files;        // watching file data.
    
    // ---------------------------------------------------------
    // Private functions.
    
    // Parse include paths.
    void parse_includes(const Path& source) {
        m_paths.append(source);
        String data = source.load();
        Path base = source.base();
        ullong pos = 0, end_pos = 0;
        while ((pos = data.find("#include \"", pos)) != NPos::npos) {
            pos += 10;
            if ((end_pos = data.find('"', pos)) != NPos::npos && end_pos > pos) {
                Path path = data.slice(pos, end_pos);
                if (path.first() != '/') {
                    path = base.join(path);
                }
                if (path.exists() && !m_paths.contains(path)) {
                    parse_includes(path);
                }
            }
            ++pos;
        }
    }
	
	// Parse js includes.
	void parse_js_includes(const Path& source) {
		for (auto& path: source.paths(true)) {
			if (path.extension() == "js") {
				m_paths.append(path);
			}
		}
	}

// Public.
public:
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Constructor.
    constexpr
    FileWatcher(const Path& source, const Path& config_path, const Json& build_config) :
    m_source(source),
    m_config_path(config_path),
    m_build_config(build_config)
    {
        m_build_config["input"] = m_source.join("start.cpp").str();
    }
    
    // ---------------------------------------------------------
    // Functions.
    
    // Start server.
    static int child_pid;
    static
    void* start_server(const String& source_dir, const String& config_path, Json build_config) {
        try {
            
            // Assign child pid.
            child_pid = -1;
            
            // Env settings.
            vlib::env::del("OS_ACTIVITY_DT_MODE"); // to ignore the apple warning "Failed to open macho file ... too many levels of symbolic links"
            
            // Compile.
            String output = to_str("/tmp/vweb_build_", getuid(), "_", String::random(12));
            build_config["output"] = output;
            vlib::compile(build_config, source_dir, config_path);
            
            // Execute.
            Proc proc { .timeout = 60 * 5 * 1000, .async = true, .log = true };
            if (proc.execute(output.c_str(), output.c_str(), "--no-file-watcher", NULL) != 0) {
                throw vlib::StartError("Encountered an error while running the webserver.");
            }
            child_pid = proc.pid();
            proc.join();
            if (proc.has_err()) {
				::kill(child_pid, SIGKILL);
				child_pid = -1;
                throw vlib::StartError("Encountered an error while running the webserver: \n", proc.err().replace_end_r("\n"));
            } else if (proc.has_out()) {
				::kill(child_pid, SIGKILL);
				child_pid = -1;
                throw vlib::StartError("Encountered an error while running the webserver: \n", proc.out().replace_end_r("\n"));
            } else if (proc.exit_status() != 0) {
				::kill(child_pid, SIGKILL);
				child_pid = -1;
                throw vlib::StartError("Encountered an error while running the webserver [", proc.exit_status(), "].");
            }
            
        } catch (vlib::Exception& e) {
			if (child_pid != -1) {
				::kill(child_pid, SIGKILL);
			}
            e.dump();
        }
        return NULL;
    }
    
    // Start.
    void start() {
        
        // Log.
        print_marker("[FileWatcher] Starting file watcher.");
        
		// Add defaults.
		const Path base = Path(__FILE__).base(2);
		m_paths.append(base.join("ui/js/vweb.js"));
		m_paths.append(base.join("ui/css/vweb.css"));
		m_paths.append(base.join("ui/css/vhighlight.css"));
		
        // Parse includes.
        parse_includes(m_source.join("start.cpp"));
		
		// Parse js includes.
		parse_js_includes(m_source);
        
        // Load all files.
        for (auto& path: m_paths) {
            m_files[path] = path.load();
        }
        
        // Thread.
        vlib::Thread thread;
        thread.start(start_server, m_source, m_config_path, m_build_config);
        
        // Start loop.
        while (true) {
            for (auto& index: m_files.indexes()) {
                Path& path = m_files.key(index);
                String& data = m_files.value(index);
                String current_data;
                for (auto& i: Range<>(3)) {
                    if (i < 2) {
                        try {
                            current_data = path.load();
                            break;
                        } catch(...) {}
                    } else {
                        current_data = path.load();
                    }
                }
                if (current_data != data) {
                    print("[FileWatcher] Restarting webserver.");
                    data = current_data;
                    if (child_pid != -1) {
                        ::kill(child_pid, SIGKILL);
                    }
                    thread.kill();
                    thread.start(start_server, m_source, m_config_path, m_build_config);
                    break;
                }
            }
            vlib::sleep::msec(100);
        }
    }
};

int FileWatcher::child_pid = -1;

// ---------------------------------------------------------
// End.

};         // End namespace utils.
};         // End namespace vweb.
#endif     // End header.

