const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    client: './src/client/client.js',
    host: './src/client/host.js'
  },
  target: 'web',
  output: {
    filename: '[name].js',
    globalObject: 'window',
    library: 'main'
  },
  devServer: {
    hot: true
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
