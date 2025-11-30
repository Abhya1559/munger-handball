import axios from "axios";
import { createContext, useState, useEffect, type ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  age?: number;
  position?: string;
}
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoadingAuth: boolean;
  setIsLoadingAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoadingAuth: true,
  setIsLoadingAuth: () => {},
});
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/me", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoadingAuth(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoadingAuth,
        setIsLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
