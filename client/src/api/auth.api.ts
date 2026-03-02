import api from "../api/axiosInstance";

export const login = (data: any) => api.post("/players/login", data);
export const register = (data: any) => api.post("/players/register", data);
export const refreshToken = () => api.post("/players/refresh");
export const getMe = () => api.get("/players/me", { withCredentials: true });
export const logout = () => api.post("/players/logout");
