import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";

function Layout() {
  const location = useLocation();

  const hiddenNavBarOn = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password/:playerId/:token",
  ];
  const shouldHideNavbar = hiddenNavBarOn.includes(location.pathname);

  return (
    <AuthProvider>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/reset-password/:playerId/:token"
          element={<ResetPassword />}
        />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
