import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 3000
})


// 请求拦截器
service.interceptors.request.use(
    (config) => {
        console.log("Request made with:", config)
        return config;
    }, (error) => {
        console.log('Request error:', error)
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        console.log('Response received: ', response);
        // 检查响应状态码
        if (response.status === 200) {
            // 成功返回数据
            return response.data;
        } else {
            // 处理非 200 的响应状态
            console.error('HTTP 错误:', response.status);
            return Promise.reject(new Error(`HTTP 错误: ${response.status}`));
        }
    },
    (error) => {
        // 处理请求错误
        console.error('Response error: ', error);

        // 判断错误类型，进行不同的处理
        if (error.response) {
            // 服务器响应了状态码，但状态码超出了 2xx 的范围
            console.error('服务器返回的错误:', error.response.data);
            return Promise.reject(new Error(`服务器错误: ${error.response.status}`));
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.error('请求未收到响应:', error.request);
            return Promise.reject(new Error('请求未收到响应'));
        } else {
            // 其他错误
            console.error('请求错误:', error.message);
            return Promise.reject(new Error(error.message));
        }
    }
);

export default service;
