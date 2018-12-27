var webpack = require('webpack');
var path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');
var args = require('yargs').argv;
var commonConfig = require('./webpack.common.js');
var outpath = path.resolve(__dirname, '../dist');
var devconfig = require('./devconfig.js');
var webpackConfig = {
    devtool: 'cheap-module-eval-source-map',
    //输出配置
    output: {
        path: outpath,
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].chunk.js',
        hotUpdateChunkFilename: 'assets/js/[id].js',
        publicPath: '/'
    }
}

webpackConfig = Object.assign(commonConfig, webpackConfig);
//如果是mock环境添加mock数据 
var env = args.env || 'dev';
console.log(args);
if (env == 'mock' || env == 'mockp2r') {
    var srcMockDir = path.resolve(__dirname, '../src/mock');
    webpackConfig.entry = Object.assign(webpackConfig.entry, helpers.getEntry(srcMockDir + "/**/*.js", 'mockData'));
    console.log("带mock的列表：" + JSON.stringify(webpackConfig.entry));
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias, helpers.getEntry(srcMockDir + "/**/*.js"));
    console.log("指向" + JSON.stringify(webpackConfig.resolve.alias));
} else if (env == 'mockhot' || env == 'mockp2rhot') {
    var srcMockDir = path.resolve(__dirname, '../src/mock');
    webpackConfig.entry = Object.assign(webpackConfig.entry, helpers.getEntry(srcMockDir + "/**/*.js", 'mockData'));
    console.log("带mock的列表：" + JSON.stringify(webpackConfig.entry));
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias, helpers.getEntry(srcMockDir + "/**/*.js"));
    console.log("指向" + JSON.stringify(webpackConfig.resolve.alias));

    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
} else if (env == 'hot') {
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}
console.log("dev文件列表：" + JSON.stringify(webpackConfig.entry));
if (env == 'mockp2r' || env == 'mockp2rhot') {
    webpackConfig.plugins.push(
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    // return [precss, autoprefixer({
                    //     browers: ['last 2 versions', 'ie >= 9', '> 5% in CN']
                    // })];
                    return [px2rem({
                        remUnit: 75
                    }), autoprefixer({
                        browers: ['last 2 versions', 'ie >= 9', '> 5% in CN']
                    })];
                },
                htmlLoader: {
                    ignoreCustomFragments: [/\{\{.*?}}/],
                    root: path.resolve(__dirname, 'src'),
                    attrs: ['img:src', 'link:href']
                }
            }
        })
    )
} else {
    webpackConfig.plugins.push(
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [precss, autoprefixer({
                        browers: ['last 2 versions', 'ie >= 9', '> 5% in CN']
                    })];
                    // return [px2rem({
                    //     remUnit: 75
                    // }), autoprefixer({
                    //     browers: ['last 2 versions', 'ie >= 9', '> 5% in CN']
                    // })];
                },
                htmlLoader: {
                    ignoreCustomFragments: [/\{\{.*?}}/],
                    root: path.resolve(__dirname, 'src'),
                    attrs: ['img:src', 'link:href']
                }
            }
        })
    )
}
//输出css配置
webpackConfig.plugins.push(new ExtractTextPlugin('assets/css/[name].css'));
//输出字体文件
webpackConfig.module.loaders.push({
    test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9]+)?$/,
    loader: 'url-loader?limit=10240&name=assets/font/[name].[ext]'
});
//输出图片
webpackConfig.module.loaders.push({
    test: /\.(png|jpg|gif)(\?[a-z0-9]+)?$/,
    loader: 'url-loader?limit=10240&name=assets/img/[name].[ext]'
});
for (var item in webpackConfig.entry) {
    console.log("检查入口是否需要排除" + item);
    if (devconfig.excludes && devconfig.excludes.length > 0 && devconfig.excludes.contains(item)) {
        console.log("需要排除入口" + item);
        delete webpackConfig.entry[item];
    }
}
console.log("排除后的入口列表" + JSON.stringify(webpackConfig.entry));
var appPageDir = path.resolve(__dirname, '../src/apps');
var pages = Object.keys(helpers.getEntry(appPageDir + '/*/*.php'));
pages.forEach(function (pathname) {
    console.log("模板文件" + pathname);
    console.log("检查模板是否需要排除" + item);
    if (devconfig.excludes && devconfig.excludes.length > 0 && devconfig.excludes.contains(pathname)) {
        console.log("需要排除模板" + item);
        return false;
    }
    var conf = {
        filename: pathname + '.php', //生成的html存放路径，相对于path
        template: appPageDir + '/' + pathname + '/' + pathname + '.php', //html模板路径
        inject: false, //js插入的位置，true/'head'/'body'/false
        publicPath:webpackConfig.output.publicPath
    };
    if (pathname in webpackConfig.entry) {
        conf.inject = 'body';
        
        var _chunks = ['vendors'];
        if (env == 'mock' || env == 'mockhot' || env == 'mockp2r' || env == 'mockp2rhot') {
            _chunks.push('mockData');
        }
        _chunks.push(pathname);
        conf.chunks = _chunks;
        // conf.chunksSortMode = 'dependency';
        conf.chunksSortMode = function (chunk1, chunk2) {
            var orders = conf.chunks;
            var order1 = orders.indexOf(chunk1.names[0]);
            var order2 = orders.indexOf(chunk2.names[0]);
            if (order1 > order2) {
                return 1;
            } else if (order1 < order2) {
                return -1;
            } else {
                return 0;
            }
        }
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});
webpackConfig = Object.assign(webpackConfig, {
    devServer: {
        contentBase: path.join(__dirname, "../dist"), //本地服务器所加载的页面所在的目录
        compress: true,
        publicPath: '/',
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true,
        host: 's.ahaschool.com',
        port: 8081,
        disableHostCheck: true,
        noInfo: true,
        proxy: {
            '*': {
                target: 'http://s.ahaschool.com',
                secure: false,
            }
        }
    }
});
module.exports = webpackConfig;