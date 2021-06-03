const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackDevClientEntry = require.resolve('webpack-dev-server/client');
exports.Development = () => ({
    entry: [
        webpackDevClientEntry,
        './main.tsx'
    ],
    module: {
        rules: [
            {
                test: /\.(s?css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
        ],
    },
    plugins: [
        new ReactRefreshWebpackPlugin({}),
    ],
    devtool: false,
    devServer: {
        contentBase: path.join(__dirname, '../public'),
        publicPath: '/',
        watchContentBase: true,
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        historyApiFallback: true,
        compress: true,
    }
})