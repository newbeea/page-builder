import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus';

const ConfigBaseURL = import.meta.env.VITE_API_SERVER ? import.meta.env.VITE_API_SERVER : '';

let loadingInstance: any = null; // 这里是loading
// 使用create方法创建axios实例
export const Request = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: `${ConfigBaseURL}/api`,
});
// 添加请求拦截器
Request.interceptors.request.use((config) => {
  loadingInstance = ElLoading.service({
    lock: true,
    text: 'loading...',
  });
  return config;
});
// 添加响应拦截器
Request.interceptors.response.use((response) => {
  setTimeout(() => {
    loadingInstance.close();
  }, 0);
  // console.log(response)
  return response.data;
}, (error) => {
  console.log('TCL: error', error);
  const msg = error.Message !== undefined ? error.Message : '';
  ElMessage({
    message: `网络错误${msg}`,
    type: 'error',
    duration: 3 * 1000,
  });
  loadingInstance.close();
  return Promise.reject(error);
});
