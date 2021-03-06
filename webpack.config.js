const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ["react", "react-dom"],
    app: "./index.tsx"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    port: 9000,
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "BWS-Demo",
      template: './index.html'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "src/assets"),
      to: path.resolve(__dirname, "dist/assets")
    }])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@stores": path.resolve(__dirname, "./src/store")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:8]', 'sass-loader']
      },
      {
        test: /\.css$/,
        exclude: /assets\/css/,
        loader: ['style-loader', 'css-loader?modules&localIdentName=[hash:base64:12]']
      },
      {
        test: /\.css$/,
        include: /assets\/css/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
};
