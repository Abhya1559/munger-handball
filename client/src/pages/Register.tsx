import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { registerPlayer } from "../services/playerServices";
import { Spinner } from "../components/ui/spinner";

interface FormData {
  name: string;
  email: string;
  phone: number;
  gender: string;
  age: number;
  password: string;
  position: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: 0,
    gender: "",
    age: 0,
    password: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const data = await registerPlayer(formData);
      console.log("REGISTER SUCCESS:", data);
      alert("Registration successful!");
      navigate("/login");

      setFormData({
        name: "",
        email: "",
        phone: 0,
        gender: "",
        age: 0,
        password: "",
        position: "",
      });
    } catch (error: any) {
      console.error("REGISTER ERROR:", error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-dvh px-4 overflow-hidden">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name..."
                  onChange={handleChange}
                  name="name"
                  value={formData.name}
                  required
                />
              </div>
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
              </div>
              <div className="flex justify-between items-center w-full gap-2">
                <div className="w-full">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    onChange={handleChange}
                    name="age"
                    value={formData.age}
                    placeholder="Enter your age"
                    className="mt-2 w-full border shadow"
                  />
                </div>
                <div className="w-full">
                  {" "}
                  <Label htmlFor="Gender">Gender</Label>
                  <select
                    name="gender"
                    id="gender"
                    onChange={handleChange}
                    value={formData.gender}
                    className="border p-2 rounded-md mt-2 w-full shadow"
                  >
                    <option value="" disabled hidden>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-center w-full gap-2">
                <div className="w-full">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your number"
                    className="mt-2 w-full border shadow"
                  />
                </div>
                <div className="w-full">
                  {" "}
                  <Label htmlFor="position">Position</Label>
                  <select
                    name="position"
                    id="position"
                    onChange={handleChange}
                    value={formData.position}
                    className="border p-2 rounded-md mt-2 w-full shadow"
                  >
                    <option value="" disabled hidden>
                      Position
                    </option>
                    <option value="left-wing">Left Wing</option>
                    <option value="right-wing">Right Wing</option>
                    <option value="center">Center</option>
                    <option value="right-forward">Right Forward</option>
                    <option value="left-forward">Left Forward</option>
                    <option value="pivot">Pivot Player</option>
                    <option value="goalkeeper">Goalkeeper</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full cursor-pointer mt-5 ">
              {loading ? <Spinner /> : <h1>Register</h1>}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link to={"/login"} className="hover:underline hover:text-blue-800">
            Already Have an account?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
