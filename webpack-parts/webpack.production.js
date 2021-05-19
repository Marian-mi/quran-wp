const path = require('path');

/** @type { import('webpack').Configuration } */

exports.production = () => ({
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.js',
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use:['postcss-loader'],
            },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 8080,
    }
})