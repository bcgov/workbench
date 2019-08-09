const compression = require('compression');
const Express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const proxy = require('express-http-proxy');
const config = require('config');
const logger = require('morgan');
// Auth packages
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const OpenIDConnectStrategy = require('passport-openidconnect');
const helmet = require('helmet');
const get = require('lodash/get');

// Initialize the Express App
const app = new Express();


const exit = () => process.exit();
process.on('SIGINT', exit);
process.on('SIGTERM', exit);

const isProduction = process.env.NODE_ENV === 'production';
// Run Webpack dev server in development mode

if (process.env.NODE_ENV === 'development') {
  // Webpack Requirements
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.dev');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);
  const options = {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
  };
  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(compiler));
}

// Import required modules
// const dummyData = require('./dummyData');
const serverConfig = require('./config');

// Set native promises as mongoose promise
// mongoose.Promise = global.Promise;

// MongoDB Connection
// mongoose.connect(serverConfig.mongoURL, error => {
//   if (error) {
//     console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
//     throw error;
//   }

//   // feed some dummy data in DB. // dummyData();
// });

const checkAuth = function(req, res, next) {
  if (!req.user || !req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('login');
  }

  next();
};

// Apply body Parser and server public assets and routes
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
// log only 4xx and 5xx responses to console
app.use(
  logger('dev', {
    skip: function(req, res) {
      return res.statusCode < 400;
    },
  })
);

// log all requests to access.log
app.use(
  logger('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'sre-webapp.log'), {
      flags: 'a',
    }),
  })
);
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(cookieParser(config.get('sessionSecret')));

// app.use('/api', posts);
/*
app.use(
  '/user',
  proxy(config.get('azureUserInfo').host, {
    https: true,
    proxyReqPathResolver() {
      return config.get('azureUserInfo').path;
    },
  })
);
*/
// Auth Middleware
app.use(
  session({
    secret: config.get('sessionSecret'),
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: true,
    name: 'sessionId',
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: config.get('sessionCookieSecure'),
    },
  })
);

passport.use(
  new OpenIDConnectStrategy(
    {
      issuer: config.get('oidc').issuer,
      authorizationURL: config.get('oidc').authorizationEndpoint,
      tokenURL: config.get('oidc').tokenEndpoint,
      clientID: config.get('oidc').clientID,
      callbackURL: config.get('oidc').callbackURL,
      clientSecret: config.get('oidc').clientSecret,
      userInfoURL: config.get('oidc').userInfoURL,
      passReqToCallback: true,
      scope: config.get('oidc').scope,
    },
    function(
      req,
      iss,
      sub,
      profile,
      jwtClaims,
      accessToken,
      refreshToken,
      params,
      verified
    ) {
      // NOTE: There is a lot of missing, commented out code from here. If groups are
      // back up and working, reinsert it.
      // console.log('jwt', jwtClaims);
      // console.log('iss', iss);
      // console.log('sub', sub);
      // console.log('profile', profile);
      // console.log('at', accessToken);
      // console.log('rt', refreshToken);
      // console.log('params', params);
      // console.log(jwtClaims);
      // console.log('qcode', req.query.code);

      const email = get(jwtClaims, 'emails[0]');
      const user = {
        username: email,
        email,
        groups: jwtClaims.groups,
        idToken: jwtClaims.idtok,
        accessToken: accessToken,
        expires: jwtClaims.exp,
        authTime: jwtClaims.auth_time,
      };

      req.user = user;

      return verified(null, user, null);
    }
  )
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

router = Express.Router()

router.use(Express.static(path.resolve(__dirname, '../dist')));

router.use('/assets', Express.static(path.resolve(__dirname, 'assets')));

router.use(
  '/user',
  proxy(config.get('oidc').host, {
    https: true,
    userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
      headers['Authorization'] = "Bearer: " + userReq.user.accessToken;
      return headers;
    },    
    proxyReqPathResolver() {
      return config.get('oidc').userInfoPath;
    },
  })
);

// Start a mock api that uses some hardcoded ids to point to files
router.get('/api/', (req, res) => {
  res.send('Nothing to see here...');
});

router.get('/api/projects/:projectId', (req, res) => {
  res.type('json');
  res.sendFile(__dirname + `/api/${req.params.projectId}/project.json`);
});

router.get('/api/projects/:projectId/datasets/:datasetId/samples', (req, res) => {
  res.type('json');
  res.sendFile(
    __dirname +
      `/api/${req.params.projectId}/datasets/${
        req.params.datasetId
      }/samples.json`
  );
});

router.get('/api/datasets/:datasetId/schemas', (req, res) => {
  res.type('json');
  res.sendFile(
    __dirname + `/api/1/datasets/${req.params.datasetId}/schema.json`
  );
});

// Auth routes
router.get('/authenticate', (req, res, next) => {
  passport.authenticate('openidconnect', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!req.user) {
      return res.redirect('login');
    }

    req.logIn(req.user, loginError => {
      if (loginError) {
        return next(loginError);
      }
      return res.redirect(config.get('serverPath'));
    });
  })(req, res, next);
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/debug', checkAuth, (req, res) => {
  const user = req.user || {};
  res.render('debug', {
    user,
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(config.get('oidc').logoutURL)
});

router.get('/callback', (req, res, next) => {
  passport.authenticate('openidconnect', err => {
    if (err) {
      return next(err);
    }

    if (!req.user) {
      if (req.query.state) {
        console.log('no user', req);
      }
      return res.redirect('login');
    }

    req.logIn(req.user, loginError => {
      if (err) {
        return next(loginError);
      }
      return res.redirect(config.get('serverPath'));
    });
  })(req, res, next);
});

router.get(config.get('serverPath'), (req, res) => {
  res.redirect(config.get('serverPath') + "/login")
});


// Redirect all other traffic over to the SPA
// TODO: Use safer JSON stringify
// script.
// console.log(!{stringify(variable)})
// pug.renderFile('template.pug', {stringify: require('js-stringify')});
router.get('*', checkAuth, (req, res, next) => {
  const assetsManifest = isProduction ? require('../dist/manifest.json') : {};
  const cssURL = isProduction
    ? assetsManifest['main.css']
    : '/dist/client/app.css';
  const jsURL = isProduction
    ? assetsManifest['main.js']
    : '/dist/client/app.js';

  res.render('index', {
    assetsManifest: assetsManifest,
    cssURL: cssURL,
    jsURL: jsURL,
    env: process.env.NODE_ENV,
    serverPath: config.get('serverPath'),
    links: config.get("links"),
    user: req.user || {},
  });
});

app.use(config.get('serverPath'), router)

// start app
app.listen(config.get('serverPort'), error => {
  if (!error) {
    console.log(`SRE is running on port: ${config.get('serverPort')} at path ${config.get('serverPath')}...`); // eslint-disable-line
  }
});

module.exports = app;
