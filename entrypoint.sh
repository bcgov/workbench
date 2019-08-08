#!/bin/sh

mkdir -p ./config
printf '{
    "logEnvironment": "'${LOG_LEVEL}'",
    "serverPort": 9000,
    "serverPath": "'${SERVER_PATH}'",

    "sessionSecret": "'${SESSION_SECRET}'",
    "sessionCookieSecure": '${SESSION_COOKIE_SECURE:-true}',

    "oidc": {
        "issuer": "'${OIDC_ISSUER}'",
        "host": "'${OIDC_HOST}'",
        "userInfoPath": "'${OIDC_USERINFO_PATH}'",
        "clientID": "'${OIDC_CLIENT_ID}'",
        "clientSecret": "'${OIDC_CLIENT_SECRET}'",
        "authorizationEndpoint": "'${OIDC_AUTH_URL}'",
        "tokenEndpoint": "'${OIDC_TOKEN_URL}'",
        "userInfoURL": "'${OIDC_USERINFO_URL}'",
        "callbackURL": "'${OIDC_CALLBACK_URL}'",
        "scope": "'"${OIDC_SCOPE}"'"
    },

    "links": {
        "ocwa": "'${LINK_TO_OCWA}'",
        "ocwadl": "'${LINK_TO_OCWADL}'",
        "projectsc: "'${LINK_TO_PROJECTSC}'",
        "selfserve": "'${LINK_TO_SELFSERVE}'"
    }
}' > ./config/default.json

yarn start:prod