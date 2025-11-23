import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { resetSchema } from "../utils/schema";
import type z from "zod";
import { resetPassword } from "../services/playerServices";
import { Spinner } from "../components/ui/spinner";
import { useNavigate, useParams } from "react-router-dom";
// import { resetPassword } from "../services/playerServices";
type ResetErrors = z.inferFlattenedErrors<typeof resetSchema>["fieldErrors"];

interface FormData {
  password: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const { playerId, token } = useParams();
  const [formData, setFormData] = useState<FormData>({
    password: "",
  });
  const [errors, setErrors] = useState<ResetErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = resetSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }
    setErrors({});
    try {
      await resetPassword({
        password: formData.password,
        playerId: playerId as string,
        token: token as string,
      });
      alert("password reset successful");
      navigate("/login");
    } catch (error: any) {
      console.error("ERROR:", error);
      alert(error.response?.data?.message || "Credentials are wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-dvh px-4 overflow-visible">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your Password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  type="password"
                  required
                />
                {errors && <p className="text-red-600">{errors.password}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full mt-5 cursor-pointer">
              {loading ? <Spinner /> : <h1>Reset Password</h1>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
