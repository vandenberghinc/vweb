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
            String output = toString("/tmp/vweb_build_", getuid(), "_", String::random(12));
            build_config["output"] = output;
            vpackage::Package::build(source_dir, config_path, build_config);
            
            // Execute.
            String cmd = output << " --file-watcher";
            Proc proc { .timeout = 60 * 5 * 1000, .log = true, .async = true };
            if (proc.execute(cmd) != 0) {
                throw StartError("vweb::utils::FileWatcher", toString("Encountered an error while running the webserver."));
            }
            child_pid = proc.pid();
            proc.join();
            if (proc.has_err()) {
                throw StartError("vweb::utils::FileWatcher", toString("Encountered an error while running the webserver: \n", proc.err().replace_end_r("\n")));
            } else if (proc.has_out()) {
                throw StartError("vweb::utils::FileWatcher", toString("Encountered an error while running the webserver: \n", proc.out().replace_end_r("\n")));
            } else if (proc.exit_status() != 0) {
                throw StartError("vweb::utils::FileWatcher", toString("Encountered an error while running the webserver [", proc.exit_status(), "]."));
            }
            
        } catch (Exception& e) {
            e.dump();
        }
        return NULL;
    }
    
    // Start.
    void start() {
        
        // Log.
        print_marker("[FileWatcher] Starting file watcher.");
        
        // Parse includes.
        parse_includes(m_source.join("start.cpp"));
        
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
                        ::kill(child_pid, SIGINT);
                    }
                    thread.kill();
                    thread.start(start_server, m_source, m_config_path, m_build_config);
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

