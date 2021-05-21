const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const miniCssPlugin = require('mini-css-extract-plugin');

/** @type { import('webpack').Configuration } */

exports.production = () => ({
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'static/media/[contenthash:8][ext][query]',
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    },
    devtool: false,
    module: {
        rules: [
            cssLoaders(),
        ]
    },
    plugins: [
        new CopyPlugin(copyPlgOPts),
        new miniCssPlugin({
            filename: './static/css/[contenthash:8].[name].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: 'static/js/[name].[contenthash:8].js.map',
        }),
    ],
    devServer: {
        contentBase: path.resolve(process.cwd(), 'bulid'),
        port: 8080,
    }
})

const copyPlgOPts = {
    patterns: [
        {
            from: path.resolve(__dirname, "../public/manifest.json"),
        },
        {
            from: path.resolve(__dirname, "../public/RCserviceworker.js"),
        },
    ],
}

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