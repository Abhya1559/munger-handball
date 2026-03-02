import api from "../api/axiosInstance";

export const login = (data: any) => api.post("/players/login", data);
export const register = (data: any) => api.post("/players/register", data);
export const logout = () => api.post("/players/logout");
