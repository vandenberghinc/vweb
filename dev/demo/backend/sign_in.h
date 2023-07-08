// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Backend endpoints.
namespace backend {

// Sign in.
Endpoint signin () {
    return Endpoint {
        "GET", "/backend/signin",
        "application/json",
        {
            .rate_limit = 10,
            .rate_limit_duration = 60,
        },
        [](Server& server, const Json& params) {
            return server.sign_in(params);
        }
    };
}

// End namespace backend.
}

