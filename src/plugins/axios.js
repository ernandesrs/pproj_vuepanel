import axios from 'axios';
import token from './../services/token';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';

axios.interceptors.request.use(function (config) {
    let apiToken = token.get();
    if (apiToken) {
        config.headers.Authorization = apiToken;
    }
    return config;
});

export default {
    request: (action, data, method = 'get') => {
        return axios.request({
            method: method,
            url: action,
            data: data
        });
    }
};