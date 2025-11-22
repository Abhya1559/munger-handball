import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useContext, useState } from "react";
import { loginPlayer } from "../services/playerServices";
import { Spinner } from "../components/ui/spinner";
import { AuthContext } from "../context/AuthContext";

interface FormData {
  email: string;
  password: string;
}
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginPlayer(formData);
      // setAuth({ accessToken: res.accessToken });
      console.log("Login response:", res);

      if (res.success) {
        alert("Login successful");
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert("Login failed: " + res.message);
      }
    } catch (error: any) {
      console.error("Login server error", error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-dvh px-4 overflow-hidden">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to={"/register"}>Sign Up</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-5 cursor-pointer">
              {loading ? <Spinner /> : <h1>Login</h1>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
function setAuth(arg0: { accessToken: any }) {
  throw new Error("Function not implemented.");
}
