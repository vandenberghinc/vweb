// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Backend endpoints.
namespace backend {

// Sign out.
Endpoint signout () {
    return Endpoint {
        "GET", "/backend/signout",
        "application/json",
        [](Server& server, const Len& uid) {
            return server.sign_out(uid);
        }
    };
}

// End namespace backend.
}
