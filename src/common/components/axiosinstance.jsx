import axios from 'axios';
import cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    params: {
        api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
        language: "ko-KR",
    },
    headers: {
        'Authorization': cookies.get('Authorization'),
    }
});



axiosInstance.interceptors.request.use(

    (config) => {
        //요청 보내기 전에 수행 로직
        return config;
    },
    (err) => {

        return Promise.reject(err);
    }
);

//응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        //응답에 대한 로직
        const res = response.data;
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosInstance;