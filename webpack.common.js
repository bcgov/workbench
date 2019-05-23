const path = require('path');
const AwesomeTSLoader = require('awesome-typescript-loader');
const webpack = require('webpack');

const projectPackage = require('./package.json');

const sourcePath = path.join(__dirname, './client');

module.exports = {
  context: sourcePath,
  mode: 'web',

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    alias: { '@src': sourcePath },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules', 'client'],
  },

  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          silent: true,
          transpileOnly: true,
        },
      },
    ],
  },

  plugins: [
    new AwesomeTSLoader.CheckerPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(projectPackage.version),
    }),
  ],

  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
  },
};
