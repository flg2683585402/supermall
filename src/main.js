import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from './components/common/toast'
//引入FastClick,这个是为了减少300ms延迟用的
import FastClick from 'fastclick'
//引入图片懒加载
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//安装插件
Vue.use(toast)
//开始使用FastClick
FastClick.attach(document.body)
//开始使用图片懒加载
Vue.use(VueLazyLoad,{
  loading: require('../111.jpg')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
