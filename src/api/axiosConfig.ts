import axios from "axios";

const baseUrl = 'http://192.168.160.130:3000';

axios.defaults.baseURL = baseUrl;

const token = localStorage.getItem('token');
if (token)  {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const axiosConfig = axios;

export default axiosConfig;