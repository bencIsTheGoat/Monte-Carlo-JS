const path = require('path');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        compress: true,
        port: 9000,
        hot: true,
        open: true
    },
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};