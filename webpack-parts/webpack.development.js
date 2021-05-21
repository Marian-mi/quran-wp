const path = require('path');

exports.Development = () => ({
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
    devServer: {
        host: '0.0.0.0',
        contentBase: path.join(__dirname,'../public'),
        watchContentBase: true,
        port: 3000,
        hot: true,
        quiet: true,
        historyApiFallback: true,
    }
})