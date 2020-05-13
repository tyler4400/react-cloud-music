import axios from 'axios';

// const baseUrl = 'http://47.98.159.95'; // 三元作者的
const baseUrl = 'http://127.0.0.1:4000';

// axios的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网络错误");
  }
);

export {
    baseUrl,
  axiosInstance
};
