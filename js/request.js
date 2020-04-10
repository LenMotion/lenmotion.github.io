import axios from 'axios'
import Vue from 'vue'

// 设置请求默认地址和首部信息
axios.defaults.baseURL = 'http://preadmin.ylfood.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 20000;

axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
});

/*拦截器*/
axios.interceptors.response.use(response => {
  // dataAxios 是 axios 返回数据中的 data
  const dataAxios = response.data
  // 这个状态码是和后端约定的
  const { code } = dataAxios
  // 根据 code 进行判断
  if (code === undefined) {
    return dataAxios
  } else {
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    switch (code) {
      // [ 示例 ] code === 0 代表没有错误
      case 0:
        return Promise.resolve(dataAxios.data)
      case 403:
        vm.$message.error(response.data.msg+'2秒后跳转到登录页.');
        setTimeout(()=>{
          location.href='http://preadmin.ylfood.com/uiashtml'
        },2000)
        return Promise.reject(response.data.msg)
      default:
        // 提示错误信息
        vm.$message.error(response.data.msg)
        return Promise.reject(response.data.msg)
    }
  }
}, error => {
  console.error(error)
  if (error.toString().indexOf("Network Error") != -1) {
    vm.$message.error("请求地址错误,未连网!");
  } else if (error.response > 500 && error.response.status) {
    vm.$message.error('服务端错误!');
  } else if (error.response && error.response.status == 408) {
    vm.$message.error('请求超时,请稍后重试');
  } else if (error.response && error.response.status == 404) {
    vm.$message.error('网络异常');
  } else if (error.response && error.response.status == 401) {
    vm.$message.error('对不起你没有权限,2秒后跳转至登录!');
  } else if(error.message && error.message.indexOf("timeout") != -1) {
    vm.$message.error('请求超时!');
  }
  return Promise.reject(error)
})

Vue.prototype.axios = axios