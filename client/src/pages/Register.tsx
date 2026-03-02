import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { FcGoogle } from "react-icons/fc";
import handball from "../assets/hand.jpeg";
import { useState } from "react";
import { Alert } from "@heroui/alert";
import { register } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  position: string;
  secretKey: string;
  aadhar: string;
  address: {
    house: string;
    mohalla: string;
    landmark: string;
  };
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "",
    secretKey: "",
    aadhar: "",
    address: {
      house: "",
      mohalla: "",
      landmark: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const payload = { ...form };
      delete (payload as any).confirmPassword;
      await register(payload);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex m-4 flex-col items-center justify-center">
        <div className="mb-6 text-center lg:text-left">
          {error && (
            <Alert
              color="danger"
              className="top-0 right-1"
              title={`Login error ${error}`}
            />
          )}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
            Create Account
          </h1>
          <p className="text-gray-500 font-medium">
            Register for Munger Handball Association
          </p>
        </div>
        <div className="max-w-full flex flex-col gap-4">
          <form
            action=""
            onSubmit={handleRegister}
            className="flex flex-col gap-8"
          >
            <div className="flex w-full justify-between items-center space-x-8">
              <div className="flex  w-full items-start justify-center flex-col">
                <label htmlFor="" className="font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                  placeholder="enter your name"
                />
              </div>
              <div className="flex flex-col w-full items-start justify-center">
                <label htmlFor="" className="font-medium">
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
            </div>
            <div className="flex w-full justify-between items-center space-x-8">
              <div className="flex w-full flex-col gap-1">
                <label htmlFor="position" className="font-medium">
                  Position
                </label>
                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="border-2 border-gray-200 px-4 py-2 rounded-lg w-full
             focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Select position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Left Wing">Left Wing</option>
                  <option value="Right Wing">Right Wing</option>
                  <option value="Right Forward">Right Forward</option>
                  <option value="Left Forward">Left Forward</option>
                  <option value="Center">Center</option>
                  <option value="Pivot">Pivot</option>
                </select>
              </div>
              <div className="flex flex-col w-full items-start justify-center">
                <label htmlFor="" className="font-medium">
                  Secret code
                </label>
                <input
                  type="password"
                  name="secretKey"
                  value={form.secretKey}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                  placeholder="enter secret code"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-center space-x-8">
              <div className="flex flex-col w-full items-start justify-center">
                <label htmlFor="" className="font-medium">
                  House Number
                </label>
                <input
                  type="text"
                  name="address.house"
                  value={form.address.house}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                  placeholder="enter House number"
                />
              </div>
              <div className="flex flex-col w-full items-start justify-center">
                <label htmlFor="" className="font-medium">
                  Mohalla
                </label>
                <input
                  type="text"
                  name="address.mohalla"
                  value={form.address.mohalla}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                  placeholder="enter Mohalla"
                />
              </div>{" "}
              <div className="flex flex-col w-full items-start justify-center">
                <label htmlFor="" className="font-medium">
                  Landmark
                </label>
                <input
                  type="text"
                  name="address.landmark"
                  value={form.address.landmark}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                  placeholder="enter landmark"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-6 w-full">
              <div className="flex flex-col w-full items-start justify-center">
                <label htmlFor="" className="font-medium">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  name="aadhar"
                  value={form.aadhar}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                  placeholder="XXXX XXXX XXXX"
                />
              </div>
              <div className="flex flex-col w-full items-start justify-center">
                <label htmlFor="" className="font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                  placeholder="enter password"
                />
              </div>
              <div className="flex flex-col w-full items-start justify-center">
                <label htmlFor="" className="font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
                  placeholder="enter password"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full space-y-8">
              <div className="flex flex-col space-y-4 w-full">
                <Button
                  type="submit"
                  className="w-full mt-2 h-11 transition duration-200 bg-orange-400 text-white font-semibold"
                >
                  {loading ? "Loading..." : "Register"}
                </Button>{" "}
                <Button
                  className="w-full h-11 mb-5 flex items-center justify-center gap-2
                             border border-gray-300 bg-transparent
                            rounded-lg font-semibold text-gray-500"
                >
                  <FcGoogle className="text-lg" />
                  <span>Login with Google</span>
                </Button>
                <h1 className="text-gray-400 mt-2 cursor-pointer flex justify-center items-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-orange-400 ml-2">
                    Login
                  </Link>
                </h1>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-screen overflow-hidden">
        <img
          src={handball}
          alt="login-image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
