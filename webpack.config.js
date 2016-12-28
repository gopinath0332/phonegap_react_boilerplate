var debug = process.env.NODE_ENV !== "production";
// var debug = false;
var webpack = require('webpack');
var path = require('path');
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'www'),
};
module.exports = {
    context: PATHS.app,
    devtool: debug ? "inline-sourcemap" : null,
    entry: PATHS.app + "/js/Demo.jsx",
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.(js|jsx)?$/,
            include: PATHS.app,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
            }
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            loader: 'url'
        }]
    },
    output: {
        // path: __dirname + "/src/",
        path: PATHS.build + "/js",
        filename: "app.js"
    },
    plugins: debug ? [new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        }),
    ],
};
