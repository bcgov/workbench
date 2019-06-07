ARG BASE_IMAGE=keymetrics/pm2:8-alpine
FROM $BASE_IMAGE

ARG ENV=prod
ARG NODE_ENV=production
ARG NPM_CONFIG_LOGLEVEL=warn
ARG NPM_CONFIG_PRODUCTION=false

# Setup directory structure
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy files
COPY --chown=node:node . .

# Get production environment settings going
ENV ENV="$ENV" \
    NODE_ENV="$NODE_ENV" \
    NPM_CONFIG_LOGLEVEL="$NPM_CONFIG_LOGLEVEL" \
    NPM_CONFIG_PRODUCTION="$NPM_CONFIG_PRODUCTION"

RUN apk add --no-cache --virtual .gyp \
        curl \
        python \
        make \
        g++ \
    && yarn install \
    && if [ "${ENV}" != "dev" ]; then \
        echo "Test: $ENV" \
        && yarn run build \
        # Removes dev dependencies
        && yarn install --production; \
    else \
        echo "Test: $ENV" \
        # Config specific to the dev environment
        && yarn global add typescript \
        && mkdir -p server \
        && touch server/sre-webapp.log \
        && chmod 777 server/sre-webapp.log; \
    fi \
    # OpenShift specific permissions
    && chmod -R 777 /usr/src/app \
    && yarn cache clean \
    && rm -r $HOME/.node-gyp \
    && apk del .gyp

USER node

EXPOSE 9000
CMD ["sh", "-c", "./entrypoint.sh"]
