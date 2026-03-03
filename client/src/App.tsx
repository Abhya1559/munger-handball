import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoutes from "./components/PublicRoute";
import Achievements from "./pages/Achievements";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<Gallery />} path="/gallery" />
      <Route element={<About />} path="/about" />
      <Route element={<Contact />} path="/contact" />
      <Route
        element={
          <PublicRoutes>
            <Login />s
          </PublicRoutes>
        }
        path="/login"
      />
      <Route element={<Register />} path="/register" />
      <Route element={<ForgotPassword />} path="/forgot-password" />
      <Route element={<ResetPassword />} path="/reset-password/:id/:token" />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/achievements"
        element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/notification"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
