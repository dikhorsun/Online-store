const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index'),
    output: {
        filename: 'index.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/images/[name][ext]',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(sc|sa|c)ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: '/node_modules',
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src/'),
        },
        extensions: ['.ts', '.js', '.json'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            favicon: './src/assets/icons/favicon.ico',
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets', 'images'),
                    to: 'assets/images',
                },
                {
                    from: './src/json-data/goods.json',
                    to: 'json-data',
                },
            ],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
