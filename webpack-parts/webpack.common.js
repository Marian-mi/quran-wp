const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const mode = process.env.NODE_ENV;
/** @type { import('webpack').Configuration } */


exports.Common = () => ({
    context: path.resolve(__dirname, '../src'),

    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'static/media/[contenthash:8][ext][query]',
        clean: true,
        publicPath: '/',
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
                            plugins: [
                                ["@babel/plugin-transform-runtime",
                                    {
                                        "regenerator": true
                                    }
                                ],
                                mode === 'development'
                                && require.resolve('react-refresh/babel'),
                            ].filter(Boolean),
                            sourceMaps: true,
                            inputSourceMap: true,
                        },
                    }
                ],
            },
            {
                test: /\.(png|jpe?g)$/,
                type: "asset/resource",
                parser: { dataUrlCondition: { maxSize: 15000 } },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true,
                        },
                    },
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: "asset/resource",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
    ]
})
