module.exports = {
  apps: [
    {
      name: 'ido/workbench',
      script: './server/server.js',
      env: {
        BABEL_ENV: 'development',
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'production',
        BABEL_ENV: 'production',
        // A work around to load a config file in the production environment, but not production
        NODE_APP_INSTANCE: 1,
        // This allows us to run development libraries in the production environment
        NPM_CONFIG_PRODUCTION: false,
      },
      env_production: {
        BABEL_ENV: 'production',
        NODE_ENV: 'production',
        NPM_CONFIG_PRODUCTION: false,
      },
    },
  ],
};
