#!/bin/sh

mkdir -p ./config
printf "{\n" > ./config/default.json
printf "\"logEnvironment\": \"${LOG_LEVEL}\",\n" >> ./config/default.json
printf "\"serverPort\": 9000,\n" >> ./config/default.json

printf "\"sessionSecret\": \"${SESSION_SECRET}\",\n" >> ./config/default.json
printf "\"sessionCookieSecure\": ${SESSION_COOKIE_SECURE},\n" >> ./config/default.json

printf "\"oidc\": {\n" >> ./config/default.json
printf "\"issuer\": \"${OIDC_ISSUER}\",\n" >> ./config/default.json
printf "\"clientID\": \"${OIDC_CLIENT_ID}\",\n" >> ./config/default.json
printf "\"clientSecret\": \"${OIDC_CLIENT_SECRET}\",\n" >> ./config/default.json
printf "\"authorizationEndpoint\": \"${OIDC_AUTH_URL}\",\n" >> ./config/default.json
printf "\"tokenEndpoint\": \"${OIDC_TOKEN_URL}\",\n" >> ./config/default.json
printf "\"userInfoURL\": \"${OIDC_USERINFO_URL}\",\n" >> ./config/default.json
printf "\"callbackURL\": \"${OIDC_CALLBACK_URL}\",\n" >> ./config/default.json
printf "\"scope\": \"${OIDC_SCOPE}\"\n" >> ./config/default.json
printf "}\n" >> ./config/default.json
printf "}" >> ./config/default.json

yarn start:prod