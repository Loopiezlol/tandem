//eslint-disable-next-line
import webpack from 'webpack';
import path from 'path';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

export default {
  entry: path.resolve(__dirname, 'app/app.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'client-bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 3001,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: ['react-hot-loader', 'babel-loader'],
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.js?$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!sass-loader?sourceMap',
        }),
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', 'scss', 'css'],
  },
};
