var AwesomeTSLoader = require('awesome-typescript-loader');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: {
    app: [
      'babel-polyfill',
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      './client/index.js',
    ],
  },

  output: {
    crossOriginLoading: 'anonymous',
    filename: 'app.js',
    path: __dirname,
    publicPath: '/dist/client',
  },

  resolve: {
    // alias: {
    //   src: path.resolve(__dirname, 'client'),
    // },
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'client'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        // include: [path.resolve(__dirname, 'node_modules/bootstrap')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
                camelCase: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new AwesomeTSLoader.CheckerPlugin(),
    new ExtractTextPlugin('app.css'),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity,
    //   filename: 'vendor.js',
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
