/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./dist/client/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./dist/client/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  require('./dist/server.bundle.js');
} else {
  require('./server/server');
}
