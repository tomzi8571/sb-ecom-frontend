import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    // Means I want to send the cookies with the request
    withCredentials: true,
})

export default api;