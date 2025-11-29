import axiosInstance from "../api/axiosInstance.ts";

export const getPlayer = async (id: number) => {
  const response = await axiosInstance.get(`/player/${id}`);
  return response.data;
};
export const getAllPlayers = async () => {
  const response = await axiosInstance.get("/playerslist");
  return response.data;
};

export const updateById = async (data: { id: number; updatedData: any }) => {
  const response = await axiosInstance.put(
    `/update-player/${data.id}`,
    data.updatedData
  );
  return response.data;
};
export const deleteById = async (id: number) => {
  const response = await axiosInstance.delete(`/delete-player/${id}`);
  return response.data;
};

export const registerPlayer = async (formData: any) => {
  const response = await axiosInstance.post("/register", formData);
  return response.data;
};
export const loginPlayer = async (credentials: any) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Login API error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Server error",
    };
  }
};
export const logout = async () => {
  return axiosInstance.post("/logout", {}, { withCredentials: true });
};
export const forgotPassword = async (data: { email: string; name: string }) => {
  const response = await axiosInstance.post("/forgot-password", data);
  return response.data;
};
export const resetPassword = async (data: {
  playerId: string;
  token: string;
  password: string;
}) => {
  const response = await axiosInstance.post(
    `/reset-password/${data.playerId}/${data.token}`,
    { password: data.password }
  );
  return response.data;
};
