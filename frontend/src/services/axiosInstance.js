import axios from 'axios';

const token = localStorage.getItem('token');
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 5000,
    headers: {
        Authorization: token ? 'Bearer ' + token : '',
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export default axiosInstance;