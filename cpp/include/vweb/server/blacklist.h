/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 Daan van den Bergh.
 */

// Header.
#ifndef VWEB_SERVER_BLACKLIST_H
#define VWEB_SERVER_BLACKLIST_H

// Namespace vweb.
namespace vweb {

// ---------------------------------------------------------
// Blacklisted ips.

struct BlackList {
    
// Private.
private:
    
    // ---------------------------------------------------------
    // Definitions.
    
    using   This =      BlackList;
    
    // ---------------------------------------------------------
    // Attributes.
    
    Array<LLong> m_blacklist;
    
    // ---------------------------------------------------------
    // Private functions.
    
    // Load blacklists.
    constexpr
    void    load() {
        
        // Lists.
        struct List {
            int mode;
            String url;
        };
        Array<List> lists = {
            {0, "https://raw.githubusercontent.com/LittleJake/ip-blacklist/main/all_blacklist.txt"},
            {0, "https://raw.githubusercontent.com/opsxcq/ipblacklist-database/master/list"},
            {1, "https://raw.githubusercontent.com/ArditDulemata/blacklist-from-honeypot/main/detailed-blacklist.txt"},
        };
        Array<String> ips = {
            "68.1.19.59",
        };
        
        // Pull lists.
        for (auto& list: lists) {
            
            // Pull.
            vlib::http::Response response = vlib::https::request({
                .method = vlib::http::method::get,
                .url = list.url,
                .headers = {
                    {"Accept-Encoding", "gzip"},
                },
                .timeout = 5000,
            });
            String& data = response.body();
            
            // Vars.
            ullong found_ips = 0, pos;
            
            // Parse and append ip.
            auto parse_ip = [&](const char* data, const ullong& len) {
                
                // Get line.
                String line = String(data, len);
                
                // Parse from line.
                if (list.mode == 1) {
                    pos = line.find('|');
                    if (pos == NPos::npos) { return ; } // some lines do not contain ips.
                    // print(line);
                    ++pos;
                    line.slice_r(pos, line.find('|', pos));
                    line.replace_start_r(" ");
                    line.replace_end_r(" ");
                    if (line == "IP") { return; } // header line.
                }
                
                // Clean.
                line.replace_r("sshd: ", "");
                if ((pos = line.find('/')) != NPos::npos) {
                    line.slice_r(0, pos);
                }
                
                // Skip ipv6.
                if (line.contains(':')) {
                    return ;
                }
                
                // Convert.
                if (line.len() > 0) {
                    LLong ip = vlib::Socket<>::Info::numeric_ip(line);
                    if (ip != 0 && !m_blacklist.contains(ip)) {
                        ++found_ips;
                        m_blacklist.append(ip);
                    }
                }
                
            };
            
            // Parse.
            data.iterate_lines(0, 0, parse_ip);
            
        }
        
        // Add direct ips.
        for (auto& i: ips) {
            LLong ip = vlib::Socket<>::Info::numeric_ip(i);
            if (ip != 0 && !m_blacklist.contains(ip)) {
                m_blacklist.append(ip);
            }
        }
        
    }
    

// Public.
public:
    
    // ---------------------------------------------------------
    // Constructors.
    
    // Default constructor.
    BlackList()
    {
		// if (vweb_production) {
		// 	load();
		// }
    }
    
    // ---------------------------------------------------------
    // Functions.
    
    // Append ip to blacklist.
    constexpr
    This&   append(const String& ip) {
        return append(vlib::Socket<>::Info::numeric_ip(ip));
    }
    constexpr
    This&   append(const LLong& ip) {
        m_blacklist.append(ip);
        return *this;
    }
    
    // Verify that the ip is not blacklisted.
    Bool    verify(const String& ip) {
        return verify(vlib::Socket<>::Info::numeric_ip(ip));
    }
    Bool    verify(const LLong& ip) {
        return m_blacklist.find(ip) == NPos::npos;
    }
    
};

// Global var.
BlackList blacklist;

// ---------------------------------------------------------
// End.

};         // End namespace vweb.
#endif     // End header.

