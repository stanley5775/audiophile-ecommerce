
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedZX9 from "./components/FeaturedZX9";
import FeaturedZX7 from "./components/FeaturedZX7";
import FeaturedYX1 from "./components/FeaturedYX1";
import BestGear from "./components/BestGear";
export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedZX9 />
      <FeaturedZX7 />
      <FeaturedYX1 />
      <BestGear />
    </div>
  );
}
