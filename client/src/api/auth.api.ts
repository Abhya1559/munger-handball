import api from "../api/axiosInstance";

export const login = (data: any) => api.post("/api/players/login", data);
export const register = (data: any) => api.post("/api/players/register", data);
export const refreshToken = () => api.post("/api/players/refresh");
export const getMe = () =>
  api.get("/api/players/me", { withCredentials: true });
export const requestPasswordReset = (data: any) =>
  api.post("/api/players/requestPasswordReset", data);
export const resetPassword = (
  id: string,
  token: string,
  data: { password: string },
) => api.post(`/api/players/resetpassword/${id}/${token}`, data);
export const logout = () => api.post("/api/players/logout");
export const profile = () => api.get("/profile");
