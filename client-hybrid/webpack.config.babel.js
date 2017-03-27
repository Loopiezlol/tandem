import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
  entry: path.resolve(__dirname, 'app/app.jsx'),
  output: {
    path: path.resolve(__dirname, '.dist'),
    filename: 'index_bundle.js',
  },
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    port: 3002,
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
        loader: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
        exclude: [/node_modules/, /dist/],
      },
    ],
    {
       test: /\.(jpe?g|png|gif|svg)$/i,
       loaders: [
         'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
         'image-webpack-loader?bypassOnDebug',
       ],
       exclude: [/node_modules/, /dist/],
     },
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
