FROM keymetrics/pm2:10-alpine

# Setup directory structure
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy files
COPY package.json .
COPY package-lock.json .
COPY yarn.lock .
COPY ecosystem.config.js .

# Get production environment settings going
ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn
ENV NPM_CONFIG_PRODUCTION false
RUN yarn install

COPY . .
RUN yarn run build

# OpenShift specific permissions
# RUN chmod -R 744 /usr/src/app

EXPOSE 9000
ENTRYPOINT ["./entrypoint.sh"]
