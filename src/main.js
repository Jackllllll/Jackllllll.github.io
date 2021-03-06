/*
 * @Date: 2021-04-15 15:43:07
 * @Author: zb.lin
 * @Email: lin302010@qq.com
 * @LastEditTime: 2021-04-20 07:49:01
 */

import './assets/css/base.css';
import './assets/css/style.css';
import "./assets/js/TweenMax.min";
import './assets/css/animate.css';
import WOW from 'wow.js';
import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/css/element-variables.scss'
const app = createApp(App).use(store).use(router)
new WOW({
    live: false
}).init();
app.use(ElementPlus);
app.mount('#app');