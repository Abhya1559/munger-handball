import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import { Navbar } from "@/components/navbar";
// import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}
