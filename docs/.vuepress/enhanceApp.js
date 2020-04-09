/**
 * 扩展 VuePress 应用
 */
// import VueHighlightJS from 'vue-highlight.js';
// import 'highlight.js/styles/atom-one-dark.css';
import Vue from 'vue'
import Element from 'element-ui'
import { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 
import './public/css/index.css' //组件css文件

import './public/js/request'

const api = {
  
  commodity: {
    category: 'pms-web/pms/inner/commodity/categoryList',
    list: '/pms-web/pms/inner/commodity/commodityList',
  },
}

Vue.prototype.api = api;
Vue.prototype.getLoading = (target) => {
  var config = {
    lock: true,
    text: '请稍等...',
    background: 'rgba(0, 0, 0, 0.7)'
  }
  if (target) {
    config.target = target
  }
  return Loading.service(config)
}
Vue.prototype.jsonToParams = (json) => {
  if (json) {
    return Object.keys(json).filter(key => json[key] !== undefined && json[key] !== null && json[key] !== '')
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key])).join('&')
  }
  return ''
}
 
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  // options, // 附加到根实例的一些选项
  // router, // 当前应用的路由实例
  // siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
  // Vue.use(VueHighlightJS)
  Vue.use(Element)
}
 