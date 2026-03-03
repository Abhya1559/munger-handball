import { resetPassword } from "@/api/auth.api";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { id, token } = useParams<{ id: string; token: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setSuccess(false);
      return;
    }
    if (!id || !token) {
      setError("Invalid or expired reset link");
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setSuccess(null);
      const payload = { ...form };
      await resetPassword(id, token, payload);
      setForm({ password: "", confirmPassword: "" });
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error: any) {
      setError(error.response?.data.message || "reset password failed");
    } finally {
      setLoading(false);
      setSuccess(null);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-500">
      <div className="flex items-center justify-center h-screen ">
        <div className="bg-white shadow-2xl p-12 rounded-2xl">
          {error && <Alert color="danger" title={`error ${error}`}></Alert>}
          <div className="flex flex-col space-y-1 mb-6 text-center mt-2">
            {success === true && (
              <Alert color="success" title={"password reset successfully"} />
            )}
            {success === false && (
              <Alert color="danger" title={"password reset failed"} />
            )}
            <h1 className="font-bold text-orange-400 uppercase text-2xl">
              Reset your password
            </h1>
            <p>Enter password keep the password strong</p>
          </div>

          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label htmlFor="" className="font-normal mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
              />
            </div>{" "}
            <div className="flex flex-col">
              <label htmlFor="" className="font-normal mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Enter password"
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Button
                type="submit"
                className="w-full bg-orange-400 text-white text-lg font-semibold"
              >
                {loading ? "Loading" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
