import api from "../api/axiosInstance";

export const login = (data: any) => api.post("/players/login", data);
export const register = (data: any) => api.post("/players/register", data);
export const refreshToken = () => api.post("/players/refresh");
export const getMe = () => api.get("/players/me", { withCredentials: true });
export const requestPasswordReset = (data: any) =>
  api.post("/players/requestPasswordReset", data);
export const resetPassword = (
  id: string,
  token: string,
  data: { password: string },
) => api.post(`/players/resetpassword/${id}/${token}`, data);
export const logout = () => api.post("/players/logout");
export const profile = () => api.get("/profile");
