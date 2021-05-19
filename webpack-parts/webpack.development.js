const path = require('path');

exports.Development = () => ({
    devServer: {
        contentBase: path.join(__dirname,'src'),
        port: 3000,
    }
})