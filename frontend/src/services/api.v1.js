import axios from "axios";

const api = axios.create({
  baseURL: "https://techedu-wb83.onrender.com/api/v1",
  withCredentials: true, // IMPORTANT for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
