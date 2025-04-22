// http/index.js
import axios from 'axios'
import { getCurrentUser } from '@/utils/auth';
import {
    ElLoading,
    ElMessage
} from 'element-plus';
//创建axios的一个实例
var instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, //接口统一域名
    timeout: 6000, //设置超时
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;',
    }
})
let loading;
//正在请求的数量
let requestCount = 0
//显示loading
const showLoading = () => {
    if (requestCount === 0 && !loading) {
        loading = ElLoading.service({
            text: "Loading  ",
            background: 'rgba(0, 0, 0, 0.7)',
            spinner: 'el-icon-loading',
        })
    }
    requestCount++;
}
//隐藏loading
const hideLoading = () => {
    requestCount--
    if (requestCount == 0) {
        loading.close()
    }
}

//请求拦截器 
instance.interceptors.request.use((config) => {
        showLoading()
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        //若请求方式为post，则将data参数转为JSON字符串
        if (config.method === 'POST') {
            config.data = JSON.stringify(config.data);
        }
        const userInfo = getCurrentUser();
        const token = userInfo ? userInfo.token || '' : '';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) =>
    // 对请求错误做些什么
    Promise.reject(error));

//响应拦截器
instance.interceptors.response.use((response) => {
    hideLoading()
    if (!response.data.success) {
        let message = response.data.message || response.data.msg || '请求异常';
        ElMessage.error(message);
        return Promise.reject(response.data);
    } else {
        //响应成功
        return response.data;
    }


}, (error) => {
    // 请求失败也应该取消Loading
    hideLoading()

    let message = ""
    //响应错误
    if(error.response && error.response.status){
        const status = error.response.status
        
        // 检查后端是否返回了详细错误信息
        if (error.response.data && error.response.data.message) {
            // 使用后端返回的具体错误信息
            message = error.response.data.message;
        } else {
            // 如果没有具体错误信息，使用默认提示
            switch (status) {
                case 400:
                    message = '请求错误';
                    break;
                case 401:
                    message = '请求错误';
                    break;
                case 403:
                    message = '未授权, 需要更高的权限';
                    break;
                case 404:
                    message = '请求地址出错';
                    break;
                case 408:
                    message = '请求超时';
                    break;
                case 500:
                    message = '服务器内部错误!';
                    break;
                case 501:
                    message = '服务未实现!';
                    break;
                case 502:
                    message = '网关错误!';
                    break;
                case 503:
                    message = '服务不可用!';
                    break;
                case 504:
                    message = '网关超时!';
                    break;
                case 505:
                    message = 'HTTP版本不受支持';
                    break;
                default:
                    message = '请求失败'
            }
        }
        
        ElMessage.error(message);
        return Promise.reject(error);
    }
    return Promise.reject(error);
});


export default instance;