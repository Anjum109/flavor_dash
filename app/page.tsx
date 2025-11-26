import Image from "next/image";
import Navbar from "./components/Navbar";
import Banner from "./components/Homepage/Banner";

export default function Home() {
  return (
    <div>
      <div className="home_top_background ">
        <Navbar />
        <Banner />
      </div>
    </div>
  );
}
