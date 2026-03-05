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
      console.log(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* FORM SECTION */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center lg:text-left">
            {error && (
              <Alert
                color="danger"
                className="mb-4"
                title={`Registration error: ${error}`}
              />
            )}

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
              Create Account
            </h1>

            <p className="text-gray-500 font-medium">
              Register for Munger Handball Association
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-6 md:gap-8"
          >
            {/* Name & Email */}
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
              <div className="flex w-full flex-col">
                <label className="font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                  placeholder="enter your name"
                />
              </div>

              <div className="flex w-full flex-col">
                <label className="font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                  placeholder="enter your email"
                />
              </div>
            </div>

            {/* Position & Secret Key */}
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
              <div className="flex w-full flex-col">
                <label className="font-medium mb-1">Position</label>

                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="border-2 border-gray-200 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
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

              <div className="flex w-full flex-col">
                <label className="font-medium mb-1">Secret code</label>

                <input
                  type="password"
                  name="secretKey"
                  value={form.secretKey}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                  placeholder="enter secret code"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1">House Number</label>

                <input
                  type="text"
                  name="address.house"
                  value={form.address.house}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                  placeholder="House #"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="font-medium mb-1">Mohalla</label>

                <input
                  type="text"
                  name="address.mohalla"
                  value={form.address.mohalla}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                  placeholder="Mohalla"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="font-medium mb-1">Landmark</label>

                <input
                  type="text"
                  name="address.landmark"
                  value={form.address.landmark}
                  onChange={handleChange}
                  className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                  placeholder="Landmark"
                />
              </div>
            </div>

            {/* Aadhar */}
            <div className="flex flex-col w-full">
              <label className="font-medium mb-1">Aadhar Number</label>

              <input
                type="text"
                name="aadhar"
                value={form.aadhar}
                onChange={handleChange}
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                placeholder="XXXX XXXX XXXX"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-full">
              <label className="font-medium mb-1">Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                placeholder="enter password"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col w-full">
              <label className="font-medium mb-1">Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2 rounded-lg w-full"
                placeholder="confirm password"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-4 w-full mt-4">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full h-12 bg-orange-400 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition-all"
              >
                {loading ? "Creating Account..." : "Register"}
              </Button>

              <Button className="w-full h-12 flex items-center justify-center gap-2 border border-gray-300 bg-white rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                <FcGoogle className="text-xl" />
                <span>Sign up with Google</span>
              </Button>

              <p className="text-gray-400 text-center mt-2">
                Already have an account?{" "}
                <Link href="/login" className="text-orange-400 font-bold ml-1">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0">
        <img
          src={handball}
          alt="handball-player"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
