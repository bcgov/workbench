#!/bin/sh

mkdir -p ./config
printf '{
    "logEnvironment": "'${LOG_LEVEL}'",
    "serverPort": 9000,

    "sessionSecret": "'${SESSION_SECRET}'",
    "sessionCookieSecure": '${SESSION_COOKIE_SECURE:-true}',

    "oidc": {
        "issuer": "'${OIDC_ISSUER}'",
        "clientID": "'${OIDC_CLIENT_ID}'",
        "clientSecret": "'${OIDC_CLIENT_SECRET}'",
        "authorizationEndpoint": "'${OIDC_AUTH_URL}'",
        "tokenEndpoint": "'${OIDC_TOKEN_URL}'",
        "userInfoURL": "'${OIDC_USERINFO_URL}'",
        "callbackURL": "'${OIDC_CALLBACK_URL}'",
        "scope": "'${OIDC_SCOPE}'"
    }
}' > ./config/default.json

yarn start:prod