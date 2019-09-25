//basic vars
const path = require('path');
const webpack = require('webpack');

//additional plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

//module settings
module.exports = {
    //basic path to project
    // context: path.resolve(__dirname, 'src'),

    //точки входа js
    entry: {
        //main file of app
        app: './src/js/app.js'
    },

    //путь для собранных файлов
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '../'
    },

    module: {
        rules: [
            //scss
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true}
                        }
                    ],
                    fallback: 'style-loader',
                }),
            },
            //image
            {
                test: /\.(svg)$/,
                loaders: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].[ext]'
                        }
                    },
                    'img-loader',
                ],
            },
            //fonts
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../fonts/',
                            outputPath: './fonts/'
                        }
                    },
                ]
            },
            //svg converter
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
           $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery'

        }),
        new ExtractTextPlugin(
            './css/[name].css'
        ),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'app/index.html'
        }),
    ],
};
