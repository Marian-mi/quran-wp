const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
/** @type { import('webpack').Configuration } */

exports.Common = () => ({
    entry: './src/main.tsx',
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g)$/,
                type: "asset",
                parser: { dataUrlCondition: { maxSize: 15000 } },
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: "asset/resource",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
    ]
})
