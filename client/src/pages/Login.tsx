import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { FcGoogle } from "react-icons/fc";
import handball from "../assets/hand4.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@heroui/alert";
import { useAuth } from "@/context/useAuth";

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
  const { loginUser } = useAuth();

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
      await loginUser(payload);
      navigate("/");
    } catch (error: any) {
      console.log("AXIOS ERROR:", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Image Section - Hidden on mobile, or shown as a top banner */}
      <div className="hidden lg:block lg:w-3/5 xl:w-2/3 h-screen overflow-hidden">
        <img
          src={handball}
          alt="login-image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-2/5 xl:w-1/3 items-center justify-center flex flex-col p-6 md:p-12">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
            Login
          </h1>
          <p className="text-gray-500 font-medium">
            Login to Munger Handball Association
          </p>
        </div>

        {/* Responsive Form Container */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
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
              <label htmlFor="" className="font-normal mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                placeholder="enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-normal mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex flex-col mt-1">
              <div className="w-full flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <input type="checkbox" className="cursor-pointer" />
                  <h4 className="text-sm">Remember Me</h4>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-orange-400 text-sm font-medium cursor-pointer"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full mt-2 transition duration-200 bg-orange-400 text-white font-semibold"
                isLoading={isLoading}
              >
                {isLoading ? "Logging in" : "Login"}
              </Button>

              <h1 className="text-gray-400 text-sm mt-4 cursor-pointer flex flex-wrap justify-center items-center">
                Not registered yet?{" "}
                <Link href="/register" className="text-orange-400 ml-2">
                  Create an account
                </Link>
              </h1>
            </div>
          </form>
          {error && (
            <Alert color="danger" title={`${error}`} className="mt-4" />
          )}
        </div>
      </div>
    </div>
  );
}
