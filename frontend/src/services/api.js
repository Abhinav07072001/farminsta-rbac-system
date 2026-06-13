import axios from "axios";

const api = axios.create({
    baseURL: "https://farminsta-backend.onrender.com/api",
});

export default api;