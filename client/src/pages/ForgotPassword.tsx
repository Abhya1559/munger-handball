import { requestPasswordReset } from "@/api/auth.api";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccess(null);
      await requestPasswordReset({ email });
      setSuccess(true);
      setEmail("");
    } catch (error: any) {
      console.log(error.response?.data.message);
      setError(error.response?.data.message || "Error in forgot password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-500">
      <div className="flex items-center justify-center h-screen ">
        <div className="bg-white shadow-2xl p-12 rounded-2xl">
          <div className="flex flex-col space-y-1 mb-6 text-center">
            {error && (
              <Alert
                color="danger"
                title={`forgot error ${error}`}
                className="top-0"
              />
            )}
            {success === true && (
              <Alert
                color="success"
                title="Check your email"
                className="mt-4"
              />
            )}

            {success === false && (
              <Alert color="danger" title="Error" className="mt-4" />
            )}
            <h1 className="font-bold text-orange-400 uppercase text-2xl">
              Forgot password
            </h1>
            <p>Enter the email address you used to register with</p>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label htmlFor="" className="font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="border-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-200 px-4 py-2  rounded-lg w-full"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Button
                type="submit"
                className="w-full bg-orange-400 text-white text-lg font-semibold"
              >
                {loading ? "Submitting" : "Submit"}
              </Button>
              <h1 className="text-medium mt-2 font-normal">
                Back to{" "}
                <Link href="/login" className="text-orange-400">
                  Login
                </Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
