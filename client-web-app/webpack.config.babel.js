const ExtractTextPlugin = require('extract-text-webpack-plugin');

export default {
  output: {
    filename: 'client-bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          'css?sourceMap!sass?sourceMap'),
        exclude: [/node_modules/, /dist/],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', 'scss'],
  },
};
