import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';

export default {
    request: (action, data, method = 'get') => {
        return axios.request({
            method: method,
            url: action,
            data: data
        });
    }
};