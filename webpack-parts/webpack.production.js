const path = require('path');
const webpack = require('webpack');
const wpCopyPlugin = require('copy-webpack-plugin');
const miniCssPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');


/** @type { import('webpack').Configuration } */

exports.production = () => ({
    entry: './main.tsx',
    cache: {
        type: 'filesystem'
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    devtool: false,
    module: {
        rules: [
            cssLoaders(),
        ]
    },
    plugins: [
        new wpCopyPlugin(wpCopyPluginOptions),
        new miniCssPlugin({
            filename: './static/css/[contenthash:8].[name].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: 'static/js/[name].[contenthash:8].js.map',
        }),
        new CleanWebpackPlugin(),
        new InjectManifest({
            swSrc: '../public/serviceWorker.js',
        })
    ],
    devServer: {
        contentBase: path.resolve(process.cwd(), 'bulid'),
        watchContentBase: true,
        port: 8080,
        hot: true,
        historyApiFallback: true,
        compress: true,
    }
})

const cssLoaders = () => ({
    test: /\.(s?css)$/,
    use: [
        {
            loader: miniCssPlugin.loader,
            options: {
                publicPath: '../../'
            }
        },
        {
            loader: 'css-loader',
        },
        {
            loader: 'resolve-url-loader',
            options: {
                root: path.resolve(process.cwd(), 'src')
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
            },
        },
        'postcss-loader'
    ],
    sideEffects: true,
})

const wpCopyPluginOptions = {
    patterns: [
        {
            from: path.resolve(process.cwd(), 'public/logo1.jpg'),
        },
        {
            from: path.resolve(process.cwd(), 'public/logo2.png'),
        },
        {
            from: path.resolve(process.cwd(), 'public/manifest.json'),
        }
    ],
}