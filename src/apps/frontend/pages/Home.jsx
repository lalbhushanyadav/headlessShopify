import React, { useEffect, useState } from "react";
import HeroCarousel from "../../../shared/components/Carousal";
import Navbar from "../components/navbar";

export default function Home() {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const newItems = Array.from({ length: 3 }).map((_, i) => ({
      id: i + 1,
      title: `Featured Item ${i + 1}`,
      subtitle: `Category ${i + 1}`,
      imageLeft: `https://picsum.photos/seed/left${i}/1200/1200`,
    }));
    setCarouselItems(newItems);
  }, []);

  return (
    <div>
      <Navbar />
      <HeroCarousel carouselItems={carouselItems} />
    </div>
  );
}
