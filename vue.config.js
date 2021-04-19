/*
 * @Date: 2021-04-15 16:33:33
 * @Author: zb.lin
 * @Email: lin302010@qq.com
 * @LastEditTime: 2021-04-19 08:03:52
 */
const webpack = require('webpack');
module.exports = {

    // publicPath: process.env.VUE_APP_TEMPLATE_URL,
    publicPath: '/dist/',
    //支持jquery
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "快乐星球"
                return args
            })
    }

}