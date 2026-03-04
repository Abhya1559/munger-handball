import api from "../api/axiosInstance";

export const login = (data: any) => api.post("/login", data);
export const register = (data: any) => api.post("/register", data);
export const refreshToken = () => api.post("/refresh");
export const getMe = () => api.get("/me", { withCredentials: true });
export const requestPasswordReset = (data: any) =>
  api.post("/requestPasswordReset", data);
export const resetPassword = (
  id: string,
  token: string,
  data: { password: string },
) => api.post(`/resetpassword/${id}/${token}`, data);
export const logout = () => api.post("/logout");
export const profile = () => api.get("/profile");
