FROM keymetrics/pm2:10-alpine

# Setup directory structure
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy files
COPY package.json .
COPY yarn.lock .
COPY ecosystem.config.js .
COPY . .

# Get production environment settings going
ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn
ENV NPM_CONFIG_PRODUCTION false
RUN yarn install
RUN yarn run build

# OpenShift specific permissions
RUN chmod -R 777 /usr/src/app

EXPOSE 8000
CMD ["yarn", "start:prod"]
