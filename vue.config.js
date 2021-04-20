/*
 * @Date: 2021-04-15 16:33:33
 * @Author: zb.lin
 * @Email: lin302010@qq.com
 * @LastEditTime: 2021-04-20 06:50:55
 */
const webpack = require('webpack');
module.exports = {

    publicPath: process.env.NODE_ENV == "production" ? '/dist/' : process.env.VUE_APP_TEMPLATE_URL,
    // publicPath: '/dist/',
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