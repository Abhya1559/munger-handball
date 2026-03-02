import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { FcGoogle } from "react-icons/fc";
import handball from "../assets/hand4.jpg";
import { useState } from "react";
import { login } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
import { Alert } from "@heroui/alert";
interface Form {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = { ...form };

      await login(payload);
      window.location.href = "/";
      navigate("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
      setError("");
    }
  };

  return (
    <div className="flex min-h-screen">
      {error && <Alert color="danger" title={`Login error ${error}`} />}
      <div className="w-5/6 h-screen overflow-hidden">
        <img
          src={handball}
          alt="login-image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 items-center justify-center flex flex-col">
        <div className="mb-6 text-center lg:text-left">
          <h1 className="text-4xl text-center font-extrabold tracking-tight text-gray-900 mb-3">
            Login
          </h1>
          <p className="text-gray-500 font-medium">
            Login to Munger Handball Association
          </p>
        </div>
        <div className="flex flex-col gap-4 w-96">
          <Button
            className="w-full mb-5 flex items-center justify-center gap-2
             border border-gray-300 bg-transparent
            rounded-lg font-semibold text-gray-500"
          >
            <FcGoogle className="text-lg" />
            <span>Login with Google</span>
          </Button>
          <form
            action=""
            onSubmit={handleLogin}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col">
              <label htmlFor="" className="font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                placeholder="enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex flex-col mt-1">
              <div className="w-full flex items-start justify-between">
                <div className="flex space-x-1">
                  <input type="checkbox" />
                  <h4>Remember Me</h4>
                </div>
                <Link className="text-orange-400 font-medium cursor-pointer">
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full mt-2 transition duration-200 bg-orange-400 text-white font-semibold"
              >
                {isLoading ? "Logging in" : "Login"}
              </Button>
              <h1 className="text-gray-400 mt-4 cursor-pointer flex justify-center items-center">
                Not registered yet?{" "}
                <Link href="/register" className="text-orange-400 ml-2">
                  Create an account
                </Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
