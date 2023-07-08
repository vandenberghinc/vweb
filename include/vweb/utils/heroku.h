/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_UTILS_HEROKU_H
#define VWEB_UTILS_HEROKU_H


// Namespace vweb.
namespace vweb {

// Namespace utils.
namespace utils {

// ---------------------------------------------------------
// Exceptions.

struct HerokuError; CREATE_EXCEPTION(HerokuError, "HerokuError");

// ---------------------------------------------------------
// Heroku.

struct Heroku {
    
    // Public.
public:
    
    // ---------------------------------------------------------
    // Attributes.
    
    String                  m_app;              // must match the heroku app name.
    Path                    m_source;           // source path.
    String                  m_compiler_flags;   // compiler flags for g++.
    Array<Path>             m_dependencies;     // denepdency paths.
    Dict<String, String>    m_env;              // environment variables.
    
    // Public.
public:
    
    // ---------------------------------------------------------
    // Functions.
    
    // Deploy.
    void deploy(const Bool& forced = true) {
        
        // Recreate compiler flags to keep linked libraries at the end.
        String compiler_flags;
        
        // Create buildpack dir.
        Path buildpack = m_source.join(".buildpack");
        if (!buildpack.exists()) {
            buildpack.mkdir();
        }
        
        // Install dependencies.
        Path dependencies = buildpack.join("dependencies");
        if (!dependencies.exists()) {
            dependencies.mkdir();
        }
        for (auto& path: m_dependencies) {
            
            // Skip unexisting to support multiple locations for a dependency.
            if (!path.exists()) {
                print("Skipping unexisting dependency \"", path, "\".");
                continue;
            }
            
            // Copy dependency.
            String& full_name = path.full_name();
            print("Installing dependency \"", path, "\".");
            Path dest = dependencies.join(full_name);
            path.sync(dest, { .del = true, .overwrite = true});
            Path::remove(dest.join(".git"));
            Path::remove(dest.join(".DS_Store"));
            Path::remove(dest.join(to_str(full_name, ".xcodeproj")));
            
            // Add include path to compiler flags.
            if (dest.join("include").exists()) {
                compiler_flags << "-I./.buildpack/dependencies/" << full_name << "/include/ ";
            }
            
            // Add library path to compiler flags.
            if (dest.join("lib").exists()) {
                compiler_flags << "-L./.buildpack/dependencies/" << full_name << "/lib/ ";
            }
        }
        
        // Save compiler flags.
        compiler_flags << m_compiler_flags;
        buildpack.join("compiler_flags").save(compiler_flags);
        
        // Create proc file.
        m_source.join("Procfile").save("web: ./start");
        
        // Set remote.
        Proc proc {.timeout = 60 * 5 * 1000};
        if (proc.execute(to_str("/opt/homebrew/bin/heroku git:remote -a ", m_app)) != 0) {
            throw HerokuError("Failed to set the heroku git remote of app \"", m_app, "\".");
        } else if (proc.exit_status() != 0) {
            throw HerokuError("Failed to set the heroku git remote of app \"", m_app, "\": \n", proc.err_or_out());
        }
        
        // Set buildpack.
        if (proc.execute("/opt/homebrew/bin/heroku buildpacks:set https://github.com/vandenberghinc/vweb-buildpack.git") != 0) {
            throw HerokuError("Failed to deploy \"", m_app, "\".");
        } else if (proc.exit_status() != 0) {
            String output = proc.err_or_out();
            if (!output.contains("is already set")) {
                throw HerokuError("Failed to set the buildpack of app \"", m_app, "\": \n", output);
            }
        }
        
        // Set HEROKU env variable.
        String env_str;
        if (m_env > 0) {
            print("Setting environment:");
        }
        for (auto& index: m_env.indexes()) {
            env_str << m_env.key(index) << '=' << m_env.value(index) << ' ';
            print(" * ", m_env.key(index), " = ", m_env.value(index));
        }
        env_str << " IP=\"*\" HEROKU=true ";
        if (proc.execute(to_str("/opt/homebrew/bin/heroku config:set ", env_str)) != 0) {
            throw HerokuError("Failed to deploy \"", m_app, "\".");
        } else if (proc.exit_status() != 0) {
            throw HerokuError("Failed to set the environment variables of app \"", m_app, "\": \n", proc.err_or_out());
        }
        
        // Push.
        proc.log = true;
        if (proc.execute(to_str("cd ", m_source, " && git add -A && git commit -am \"Automatic deploy\" && git push heroku HEAD:master", (forced ? " -f" : ""))) != 0) {
            throw HerokuError("Failed to deploy \"", m_app, "\".");
        }
        
    }
};

// ---------------------------------------------------------
// End.

};         // End namespace utils.
};         // End namespace vweb.
#endif     // End header.

