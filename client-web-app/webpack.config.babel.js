import path from 'path';

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
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
