import React, { useEffect, useState } from "react";
import HeroCarousel from "../../../shared/components/Carousal";
import SkeletonLoader from "../../../shared/components/SkeletonLoader";

import SectionDescription from "../components/SectionDescription";
import TextSection from "../components/TextSection";
import shopifyClient from "../../../api/shopifyClient";

const dummyImages = (seed, count, size = 300) =>
  Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/seed/${seed}${i}/${size}/${size}`
  );

export default function Home() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [carousalLoading, setCarousalLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCollections = async () => {
      const collections = await shopifyClient.fetchCollections();
      //   console.log("Collections:", collections);
      const transformed = collections.map((item, idx) => ({
        title: item.title,
        image: item.image?.url || "", // replace with real image if needed
      }));
      setCategories(transformed);
      console.log("Categories:", categories);
    };

    loadCollections();
    const fetchCarousel = async () => {
      try {
        const items = Array.from({ length: 3 }, (_, i) => ({
          id: i + 1,
          title: `Featured Item ${i + 1}`,
          subtitle: `Category ${i + 1}`,
          imageLeft: dummyImages("left", 3)[i],
        }));
        setCarouselItems(items);
      } catch (err) {
        console.error("Error loading carousel:", err);
      } finally {
        setTimeout(() => setCarousalLoading(false), 1000);
      }
    };

    fetchCarousel();
  }, []);

  //

  const brands = dummyImages("left", 5, 50).map((image) => ({ image }));

  const blogs = categories.slice(0, 3);

  const welcomeText = {
    subtitle: "Who Are We",
    title: "Welcome To Demo.",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt labor et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat irure.`,
  };

  const blogText = {
    subtitle: "",
    title: "OUR BLOG",
    description: `Lorem ipsum dolor sit amet...`,
  };

  return (
    <div>
      {/* Carousal  */}
      <div className="w-full mx-auto relative">
        {carousalLoading.isLoading ? (
          <SkeletonLoader
            type="homepagecarousel"
            count={1}
            isLoading={carousalLoading}
          />
        ) : (
          <HeroCarousel carouselItems={carouselItems} />
        )}
      </div>

      <SectionDescription sections={categories} isCarousel={true} />
      <TextSection {...welcomeText} />
      <SectionDescription sections={brands} isCarousel={true} />
      <TextSection {...blogText} />
      <SectionDescription sections={blogs} isCarousel={false} />
    </div>
  );
}
