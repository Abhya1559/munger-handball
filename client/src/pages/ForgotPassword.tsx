import { Link } from "react-router-dom";
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
import { useState } from "react";
import { forgotSchema } from "../utils/schema";

import type z from "zod";
import { forgotPassword } from "../services/playerServices";
import { Spinner } from "../components/ui/spinner";

type ForgotPasswordErrors = z.inferFlattenedErrors<
  typeof forgotSchema
>["fieldErrors"];
interface FormData {
  name: string;
  email: string;
}
export default function ForgotPassword() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = forgotSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }
    setErrors({});
    try {
      const resetUserPassword = await forgotPassword(result.data);
      console.log(resetUserPassword);
      alert("Check your email");
      setMessage(resetUserPassword.message);
    } catch (error: any) {
      console.error("ERROR:", error);
      alert(error.response?.data?.message || "Credentials are wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh px-4 overflow-visible">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your email and name below to reset to your password
          </CardDescription>
          <CardAction>
            <Link to={"/login"}>Login</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="m@example.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                {loading ? <Spinner /> : <h1>Reset Password</h1>}
              </Button>
            </div>
          </form>
          {message && (
            <p className="text-green-900 border bg-white px-4 mt-3">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
