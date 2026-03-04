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
      setError("");
      setSuccess(null);
      await requestPasswordReset({ email });
      setSuccess(true);
      setEmail("");
    } catch (error: any) {
      setError(error.response?.data.message || "Error in forgot password");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 p-4 md:p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-[2rem] overflow-hidden transition-all">
        {/* Alerts Section - Absolute or Relative positioning based on design */}
        <div className="px-6 pt-6">
          {error && (
            <Alert
              variant="flat"
              color="danger"
              title="Error"
              description={error}
              className="mb-2"
            />
          )}
          {success === true && (
            <Alert
              variant="flat"
              color="success"
              title="Check your email"
              description="If an account exists, you will receive a reset link shortly."
              className="mb-2"
            />
          )}
        </div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col space-y-2 mb-8 text-center">
            <h1 className="font-black text-orange-500 uppercase text-3xl md:text-4xl tracking-tighter">
              Forgot <br className="sm:hidden" /> Password?
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              Enter the email address you used to register, and we'll send you a
              recovery link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                className="w-full bg-slate-50 border-2 border-slate-50 px-5 py-3 md:py-4 rounded-2xl transition duration-300 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 text-slate-700 font-medium"
              />
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 pt-2">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-7 rounded-2xl shadow-xl shadow-orange-100 transition-all active:scale-95"
              >
                {loading ? "Sending..." : "Reset Password"}
              </Button>

              <p className="text-slate-500 font-medium text-sm">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-orange-500 font-bold hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
