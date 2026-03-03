import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/gallery" />
      <Route element={<PricingPage />} path="/about" />
      <Route element={<BlogPage />} path="/contact" />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<ForgotPassword />} path="/forgot-password" />
      <Route element={<ResetPassword />} path="/reset-password/:id/:token" />
    </Routes>
  );
}

export default App;
