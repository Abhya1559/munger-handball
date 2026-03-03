import { createContext, ReactNode, useEffect, useState } from "react";
import { getMe, login, logout, refreshToken } from "@/api/auth.api";

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
  loading: boolean;
  loginUser: (data: LoginPayload) => Promise<void>;
  logoutUser: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshToken();
        const res = await getMe();
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);
  const loginUser = async (data: LoginPayload) => {
    const res = await login(data);
    setUser(res.data.isPlayer);
  };
  const logoutUser = async () => {
    await logout();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
