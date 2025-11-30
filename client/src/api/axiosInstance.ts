import axios from "axios";

// const getToken = () => {
//   const tokenCookie = document.cookie
//     .split(";")
//     .find((c) => c.trim().startsWith("jwt"));
//   if (tokenCookie) {
//     return tokenCookie.trim().substring(4);
//   }
//   return null;
// };

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/players",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = getToken();
//   console.log(token);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosInstance;
