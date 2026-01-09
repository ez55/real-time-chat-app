import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === DEVELOPMENT ? "http://localhost:6001/api" : "url/api",
    withCredentials: true
})