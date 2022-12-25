const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new ESLintPlugin({ extensions: ['ts', 'js'] }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: '/node_modules',
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]',
                },
            },
            {
                test: /\.(gif|svg|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/icons/[name][hash][ext]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][hash][ext]',
                },
            },
        ],
    },
};
