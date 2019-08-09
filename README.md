# SRE Workbench

## Installation

All installs require an instance of mongodb available.

### Prerequisites

- MongoDB 4.0 or newer
- Docker 18.09.1 or newer

### Bare Metal Install


### Docker Install

Run `docker build . -t sae-workbench` to build the docker container and the following commands to run it

``` sh
hostip=$(ifconfig en0 | awk '$1 == "inet" {print $2}')
docker run -e LOG_LEVEL=info -e SESSION_SECRET="s3cr3t" -e SESSION_COOKIE_SECURE=true \
   -e SERVER_PATH="/" \
   -e OIDC_HOST="https://oidc" \
   -e OIDC_ISSUER="https://oidc/auth/realms/myrealm" \
   -e OIDC_CLIENT_ID=workbench -e OIDC_CLIENT_SECRET=s3c3rt \
   -e OIDC_AUTH_URL="https://oidc/auth/realms/myrealm/protocol/openid-connect/auth" \
   -e OIDC_TOKEN_URL="https://oidc/auth/realms/myrealm/protocol/openid-connect/token" \
   -e OIDC_USERINFO_PATH="/auth/realms/myrealm/protocol/openid-connect/userinfo" \
   -e OIDC_USERINFO_URL="https://oidc/auth/realms/myrealm/protocol/openid-connect/userinfo" \
   -e OIDC_LOGOUT_URL="https://oidc/auth/realms/myrealm/protocol/openid-connect/logout?redirect_uri=http://localhost:9000/" \
   -e OIDC_CALLBACK_URL="http://localhost:9000/callback" \
   -e OIDC_SCOPE="openid offline_access" \
   --add-host=docker:$hostip -p LOCALPORT:8000 sae-workbench
```


This web application uses MERN boiler plate, for additional documentation see [mern.io](http://mern.io/).
## Quickstart

```
  npm install
  npm start
```

## Available Commands

1. `npm run start` - starts the development server with hot reloading enabled

2. `npm run bs` - bundles the code and starts the production server

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

5. `npm run cover` - generates test coverage report

6. `npm run lint` - runs linter to check for lint errors
