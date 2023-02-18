import axios from 'axios';
import token from './../services/token';
import alerts from './../services/alerts';

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
    },
    req: (config = {
        action: null,
        method: 'get',
        data: null,
        success: null,
        fail: null,
        finally: null
    }) => {
        return axios.request({
            url: config?.action,
            method: config?.method,
            data: config?.data
        }).then((response) => {
            if (config?.success) {
                config.success(response);
            }
        }).catch((response) => {
            alerts.addError(response.response?.data?.error);

            if (config?.fail) {
                config.fail(response);
            }
        }).then(() => {
            if (config?.finally) {
                config.finally();
            }
        })
    }
};