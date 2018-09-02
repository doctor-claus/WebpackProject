//when webpack-dev-server is used, dist folder is stored in memory and you cannot access it through hard rive
//when npm run build is used, dist folder is automatically created and files bundle and vendor files are stored in hardrive

var webpack = require('webpack');
var path = require('path');
const VENDOR_LIBS = [
  'faker', 'lodash', 'redux', 'react-redux', 'react-dom', 'redux-thunk', 'react', 'react-input-range', 'react-router', 'redux-form'
];
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // name replaced by entry keys chunkhash will change if any character changes in the file
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/ // exclude babel from node_modules due to waste of resources
      },
      {
        loader: ["style-loader", "css-loader"],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'] // duplicate modules added to vendor.js manifest prevents reload of vendor.js everytime
    }),
    new HtmlWebpackPlugin({ // automatically add script tags to html page
      template: 'src/index.html'  
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) 
    })
  ]
};
