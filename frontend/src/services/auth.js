import axiosInstance from "./axiosInstance";

const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/users/login', credentials);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const register = async (credentials) => {
    try {
        const response = await axiosInstance.post('/users/register', credentials);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export { login, register };