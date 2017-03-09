import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
  entry: path.resolve(__dirname, 'app/app.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'index_bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 3001,
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
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
        loader: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
        exclude: [/node_modules/, /dist/],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', 'scss', 'css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../common/templates/index.template.html',
    }),
  ],
};
