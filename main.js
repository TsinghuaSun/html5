// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
import{$http}from '@escook/request-miniprogram'

uni.$http=$http
$http.baseUrl='http://localhost'
$http.beforeRequest=function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
  //判断当前请求的是否是有权限的接口
  if(options.url.indexOf('/post/')!==-1){
    options.header={
      Authorization:store.state.m_user.token
    }
  }
}
$http.afterRequest=function(){
  uni.hideLoading()
}
uni.$showMsg=function(title='数据请求失败!',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif