import Image from "next/image";
import Navbar from "./components/Navbar";
import Banner from "./components/Homepage/Banner";
import MovingWord from "./components/Homepage/MovingWord";
import Searchbar from "./components/Homepage/Searchbar";
import Restaurent from "./components/Homepage/Restaurent/Restaurent";
import AIChat from "./components/Homepage/AIChat";

export default function Home() {
  return (
    <div>
      <div className="home_top_background ">
        <Searchbar />
        <Navbar />
        <Banner />

      </div>

      <MovingWord />
      <Restaurent />
      <AIChat />
    </div>
  );
}
