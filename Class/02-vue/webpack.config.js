const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var paths = {                   //路径配置配置
  src: "./src",//源码目录
  output: "./public"//输出到public目录
}
module.exports = {          //页面入口文件配置
  context: path.resolve(__dirname, paths.src),//引入src根目录
  entry: {
    app : './js/app.js'// 入口文件app.js
  },
  output: {                         //入口文件输出配置 出口是public文件夹
    path: path.resolve(__dirname, paths.output),
    filename: './dist/js/[name].js' //
  },
  module: {                       //加载器配置 如何处理html js css等所有的资源文件
    loaders: [
      { test:/\.css$/, 
        loader: ExtractTextPlugin.extract({ use: 'css-loader' })//加载css文件
      },
      { test: /\.vue$/, loader: 'vue-loader'},//加载vue文件 将vue转换成.js
      { test: /\.js$/, 
        use: [{
          loader: 'babel-loader',//编译js
          options: { presets: ['es2015'] }//转换为es5的语法 兼容所有浏览器
        }], 
      },
      { test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: true }//压缩html
        }]
      },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},//scss 是一种带有语法的css
      { test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("dist/css/app.css"),
    new webpack.optimize.CommonsChunkPlugin(
      { name: 'vendor', filename: 'dist/js/vendor.js', minChunks: 2, }//框架插件所规定的语法代码 单独处理 因为不会随着业务逻辑代码改变而改变
    ),
    new HtmlWebpackPlugin(
      { template: path.resolve(__dirname, './src/index.html') }
    )
  ]
};