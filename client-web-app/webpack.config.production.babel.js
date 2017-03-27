import path from 'path';
// eslint-disable-next-line
import webpack from 'webpack';
// eslint-disable-next-line
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: path.resolve(__dirname, 'app/app.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'index_bundle.js',
  },
  devtool: 'cheap-module-source-map',
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
          'image-webpack-loader?bypassOnDebug',
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: '../common/templates/index.template.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', 'scss', 'css'],
  },
};
