import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/gallery" />
      <Route element={<PricingPage />} path="/about" />
      <Route element={<BlogPage />} path="/contact" />
    </Routes>
  );
}

export default App;
