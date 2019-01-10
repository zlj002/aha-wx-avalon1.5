var webpack = require('webpack');
var path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//入口目录文件夹
var srcEntrysDir = path.resolve(__dirname, '../src/apps');
//多个单页应用入口
var entrys = helpers.getEntry(srcEntrysDir + '/*/*.js');
//第三方库
var srcVendorsDir = path.resolve(__dirname, '../src/vendors');
entrys = Object.assign(
    entrys,
    helpers.getEntry(srcVendorsDir + '/**/*.js', 'vendors')
);
// console.log("文件列表：" + JSON.stringify(entrys));
var srcComponentsDir = path.resolve(__dirname, '../src/components');
module.exports = {
    devtool: 'source-map',
    //页面入口文件配置
    entry: entrys,
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        alias: {
            jquery: srcVendorsDir + '/jquery',
            avalon: srcVendorsDir + '/avalon.shim.min',
            mmPromise: srcVendorsDir + '/mmRouter/mmPromise',
            mmRouter: srcVendorsDir + '/mmRouter/mmRouter',
            mmState: srcVendorsDir + '/mmRouter/mmState',
            mmHistory: srcVendorsDir + '/mmRouter/mmHistory',
            util: srcVendorsDir + '/util',
            env: srcComponentsDir + '/sys/env',
            user: srcComponentsDir + '/sys/user',
            sys: srcComponentsDir + '/sys/sys',
            toastr: srcComponentsDir + '/toastr/main',
            loading: srcComponentsDir + '/loading/main',
            ajax: srcComponentsDir + '/ajax/main',
            iosSelect: srcComponentsDir + '/iosSelect/iosSelect',
            areaData: srcComponentsDir + '/fixedData/areaData_v2',
            cache: srcComponentsDir + '/cache/cache',
            draw: srcComponentsDir + '/drawRing/drawRing',
            wechat: srcComponentsDir + '/wechat/main',
            modal: srcComponentsDir + '/modal/modal',
            countdown: srcComponentsDir + '/countdown/main',
            gif: srcComponentsDir + '/gif/main',
            calculate: srcComponentsDir + '/calculate/main'
            // ,
            // 'audio5': srcComponentsDir + '/audio5js/js/audio5'
        }
    },
    module: {
        loaders: [
            {
                //解析 .ejs
                test: /\.php$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                exclude: /vendors/,
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$|\.htm$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$|\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?minimize!postcss-loader!less-loader'
                    // use: "css-loader!postcss-loader!less-loader"
                })
            }
        ]
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //   options: {
        //     postcss: function () {
        //       // return [precss, autoprefixer({
        //       //   browers: ['last 2 versions', 'ie >= 9', '> 5% in CN']
        //       // })];
        //       return [px2rem({
        //         remUnit: 75
        //       }), autoprefixer({
        //         browers: ['last 2 versions', 'ie >= 9', '> 5% in CN']
        //       })];
        //     },
        //     htmlLoader: {
        //       ignoreCustomFragments: [/\{\{.*?}}/],
        //       root: path.resolve(__dirname, 'src'),
        //       attrs: ['img:src', 'link:href']
        //     }
        //   }
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            avalon: 'avalon',
            // Mock: 'mockjs',
            Util: 'util',
            Env: 'env',
            User: 'user'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors'],
            minChunks: Infinity
        }),
        new UglifyJsPlugin({
            //压缩代码
            mangle: false,
            beautify: false,
            // beautify: true,
            // 删除所有的注释
            comments: false,
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/externals'),
                to: path.resolve(__dirname, '../dist')
            }
        ])
    ]
};
