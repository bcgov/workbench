const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sourcePath = path.join(__dirname, './client');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'development',

  entry: {
    app: ['webpack-hot-middleware/client', './index.ts'],
  },

  output: {
    crossOriginLoading: 'anonymous',
    filename: 'app.js',
    path: __dirname,
    publicPath: '/dist/client',
  },

  module: {
    rules: [
      {
        test: /\.(s)?css$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'client')],
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
              camelCase: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              namedExport: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(s)?css$/,
        include: [
          path.resolve(__dirname, 'node_modules/bootstrap'),
          path.resolve(__dirname, 'node_modules/react-virtualized'),
        ],
        use: [
          'style-loader',
          'typings-for-css-modules-loader',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: true,
    }),
  ],

  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
  },

  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
  },
});
