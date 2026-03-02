import { createContext, ReactNode, useState } from "react";
import { login, logout } from "@/api/auth.api";

interface User {
  id: string;
  name: string;
  email: string;
  position?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loginUser: (data: LoginPayload) => Promise<void>;
  logoutUser: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const loginUser = async (data: LoginPayload) => {
    const res = await login(data);
    setUser(res.data.player);
  };
  const logoutUser = async () => {
    await logout();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
