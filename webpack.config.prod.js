var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var cssnano = require('cssnano');
var path = require('path');

var basePath = "base/";

module.exports = {
  mode: 'production',
  devtool: 'hidden-source-map',

  entry: [
    'babel-polyfill',
    'eventsource-polyfill',
    './client/index.js',
 ],

  output: {
    path: __dirname + '/dist/client/',
    filename: '[name].[chunkhash].js',
    publicPath: basePath,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'client'),
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
                camelCase: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              }
            },
            'postcss-loader',
            'sass-loader'
          ],
        }),
      }, {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new ExtractTextPlugin('app.[chunkhash].css', { allChunks: true }),
    new ManifestPlugin({
      basePath: basePath,
      publicPath: ""
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
  ],
};
