import Image from "next/image";
import Navbar from "./components/Navbar";
import Banner from "./components/Homepage/Banner";
import MovingWord from "./components/Homepage/MovingWord";
import Searchbar from "./components/Homepage/Searchbar";

export default function Home() {
  return (
    <div>
      <div className="home_top_background ">
        <Searchbar />
        <Navbar />
        <Banner />
      </div>
      <MovingWord />
    </div>
  );
}
