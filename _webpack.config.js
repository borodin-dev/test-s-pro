//basic vars
const path = require('path');
const webpack = require('webpack');

//additional plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = JSON.stringify(process.env.WEBPACK_MODE === 'production');

//module settings
module.exports = {
    //basic path to project
    context: path.resolve(__dirname, 'src'),

    //точки входа js
    entry: {
        //main file of app
        app: [
            './js/app.js',
            './scss/style.scss'
        ],
    },

    //путь для собранных файлов
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../'
    },

    //dev-server configuration
    devServer: {
        contentBase: './app'
    },

    devtool: (isProduction) ? '' : 'inline-source-map',

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
                test: /\.(png|gif|jpe?g|svg)$/,
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
                test: /\.(woff|woff2|ttf|otf)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[path][name].[ext]'
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
        new ExtractTextPlugin(
            './css/[name].css'
        ),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
                { from: './img', to: 'img'}
            ],
            {
                ignore: [
                    {glob:'svg/*'},
                ]
            }
        )
    ],
};

//PRODUCTION ONLY
if(isProduction){
    module.exports.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        }),
    );
    module.exports.plugins.push(
        new ImageminPlugin({
            test: /\.(png|gif|jpe?g|svg)$/i
        }),
    );
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    );
}