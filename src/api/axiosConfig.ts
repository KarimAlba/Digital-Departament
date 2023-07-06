import axios from "axios";

const baseUrl = 'http://94.26.229.117:3000';

axios.defaults.baseURL = baseUrl;

const token = localStorage.getItem('token');
if (token)  {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const axiosConfig = axios;

export default axiosConfig;
