const path = require('path');

module.exports = {
    entry: './build/web/script/main.js',
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};