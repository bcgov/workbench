const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

const outPath = path.resolve(__dirname, 'dist');

var basePath = "";

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',

  entry: './index.ts',

  output: {
    path: outPath,
    filename: '[name].[chunkhash].js',
    publicPath: basePath,
  },

  module: {
    rules: [
      {
        test: /\.(s)?css$/,
        include: [path.resolve(__dirname, 'node_modules/react-virtualized')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(s)?css$/,
        include: [
          path.resolve(__dirname, 'node_modules/bootstrap'),
          path.resolve(__dirname, 'client'),
        ],
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              camelCase: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new ManifestPlugin({
      basePath: basePath,
      publicPath: ""
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
  ],
});
