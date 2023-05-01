const {  SOURCE_DIRECTORY, BUILD_DIRECTORY, SOURCE_DIRECTORY_ASSETS,  BUILD_DIRECTORY_ASSETS, indexHTML } = require('./constants');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = () => {
    return {
        entry: {
            main: SOURCE_DIRECTORY,
        },
        output: {
            path: BUILD_DIRECTORY,
            filename: 'bundle.js',
        },   
        devServer: {
            hot: true,
            open: true,
            watchFiles: path.resolve(__dirname, '../src'),
        },
        module: {
            rules: [
              {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules',
              },
              {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader,
                  {
                    loader: "css-loader", 
                    options: {
                      url: false,
                    },
                  },
                  {
                    loader: "postcss-loader",
                    options:{
                      postcssOptions: {
                        config: path.resolve(__dirname, 'postcss.config.js')
                      }
                    }   
                  },
                  {
                    loader: "sass-loader",
                  }],
              },
              {
                test: /\.(png|jpe?g|gif|svg|mp4|webm|webp)$/i,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                },
              }
            ],
          },
        externalsType: "script",
        externals: {
          ymaps: ["https://api-maps.yandex.ru/2.1/?apikey=3267801e-10a9-43c9-a80b-90a4076a908b&lang=ru-RU", "ymaps"]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: indexHTML,
            }), 
            new MiniCssExtractPlugin({
                filename: 'styles/style.css',
            }),
            new CopyPlugin({
                patterns: [
                  {
                    from: SOURCE_DIRECTORY_ASSETS,
                    to: BUILD_DIRECTORY_ASSETS,
                  },],
            }),
        ],
        
    }
}

