import axios from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
// import { updateById } from "../services/playerServices";
// import { updateSchema } from "../utils/schema";

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  age?: number;
  position?: string;
}
interface UpdateDataType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}
export const UpdateContext = createContext<UpdateDataType>({
  user: null,
  setUser: () => {},
});

export default function updateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  useEffect(() => {
    axios
      .put("http://localhost:5000/api/players/update-player/:id")
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  }, []);
  return (
    <UpdateContext.Provider value={{ user, setUser }}>
      {children}
    </UpdateContext.Provider>
  );
}
