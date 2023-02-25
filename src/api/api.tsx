import axios, { AxiosInstance } from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export default api;