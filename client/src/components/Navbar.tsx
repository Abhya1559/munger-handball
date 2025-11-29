import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../services/playerServices";

export default function Navbar() {
  const { user, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      // window.location.reload();
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav className="border p-4 shadow-lg rounded">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <Link to={"/"} className="font-bold text-4xl">
              Logo
            </Link>
          </div>
          <ul className="hidden md:flex items-center justify-center font-medium gap-4">
            <Link to="/">Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/gallery"}>Gallery</Link>
          </ul>
          <div className="hidden md:flex items-center justify-center space-x-10">
            {!isLoggedIn ? (
              <div className="space-x-10">
                {" "}
                <Button
                  onClick={() => navigate("/login")}
                  variant={"default"}
                  className="cursor-pointer"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  variant={"secondary"}
                  className="cursor-pointer"
                >
                  Register
                </Button>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-10">
                {" "}
                <p className="text-lg">
                  Hello,{" "}
                  <Link to={"/profile"} className="font-semibold">
                    {" "}
                    {user?.name}
                  </Link>
                </p>
                <Button onClick={handleLogout} className="cursor-pointer">
                  Logout
                </Button>
              </div>
            )}
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <div
          className={`md:hidden mt-3 transition-all duration-300 overflow-hidden ${
            open ? "max-h-64" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-3 font-medium p-2">
            <li className="cursor-pointer hover:text-blue-600">Home</li>
            <li className="cursor-pointer hover:text-blue-600">About</li>
            <li className="cursor-pointer hover:text-blue-600">Gallery</li>
          </ul>

          <div className="flex flex-col gap-3 p-2">
            {!isLoggedIn ? (
              <div className="space-x-10">
                {" "}
                <Button
                  onClick={() => navigate("/login")}
                  variant={"default"}
                  className="cursor-pointer"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  variant={"secondary"}
                  className="cursor-pointer"
                >
                  Register
                </Button>
              </div>
            ) : (
              <Button onClick={handleLogout} className="cursor-pointer">
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
