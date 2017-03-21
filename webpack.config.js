const webpack   = require('webpack');
const path      = require('path');
const merge     = require('webpack-merge');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Constans
const ENV = process.env.NODE_ENV;
const PATHS = {
    dist: path.join(__dirname, 'build')
};

const common = {
    entry : path.join(__dirname, 'src/main.js'),

    output: {
        path: PATHS.dist,
        filename: 'bundle.js'
    },

    module : {
      loaders : [
        // 处理es6, babel配置请查看.babelrc
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        // 处理iconfont
        { test: /\.woff(\?.*)?$/,  loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /\.woff2(\?.*)?$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
        { test: /\.otf(\?.*)?$/,   loader: 'file?limit=10000&mimetype=font/opentype' },
        { test: /\.ttf(\?.*)?$/,   loader: 'url?limit=10000&mimetype=application/octet-stream' },
        { test: /\.eot(\?.*)?$/,   loader: 'file?limit=10000' },
        { test: /\.svg(\?.*)?$/,   loader: 'url?limit=10000&mimetype=image/svg+xml' },
        { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
      ]
    },

    // css 前缀处理
    postcss: [ autoprefixer({ browsers: ['>0.5%','last 2 versions'] }) ],

    resolve: {
        root : path.join(__dirname, 'src'),
        extensions: ['', '.js', '.less'],
        alias: {
            
        }
    },

    plugins : [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            hash: false,
            filename: 'index.html',
            inject: true,
            minify: {
              collapseWhitespace: true
            }
        })
    ]
};


//@开发模式

if( ENV === 'development' || !ENV){
    module.exports = merge(common, {
        module : {
            loaders : [
                {
                    test : /\.css$/,
                    exclude : /node_modules/,
                    loader : 'style!css?modules!postcss'
                },
                {
                    test : /\.less$/,
                    exclude : /node_modules/,
                    loader : 'style!css?modules!postcss!less'
                },
                {
                    test : /\.css$/,
                    include : /node_modules/,
                    loader : 'style!css'
                }
            ]
        },

        devtool: 'eval-source-map',

        devServer : {
            contentBase : PATHS.dist,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            // Display only errors to reduce the amount of output.
            stats: 'errors-only',
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT || '8080'
        },

        plugins : [
            new webpack.HotModuleReplacementPlugin()
        ]
    })     
}



//@部署模式

if( ENV === 'production' ){
    module.exports = merge(common, {
        module : {
            loaders : [
                {
                    test : /\.css$/,
                    exclude : /node_modules/,
                    loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
                }
            ]
        },

        plugins : [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),

            new ExtractTextPlugin('[name].css'),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            })
        ]
    })
}
