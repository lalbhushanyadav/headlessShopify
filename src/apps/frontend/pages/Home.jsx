import React, { useEffect, useState } from "react";
import HeroCarousel from "../../../shared/components/Carousal";
import SkeletonLoader from "../../../shared/components/SkeletonLoader";
import blogImg1 from "../../../assets/blog-img-1.jpg";
import blogImg2 from "../../../assets/blog-img-2.jpg";
import blogImg3 from "../../../assets/blog-img-3.jpg";
import bannerBg from "../../../assets/home-banner-bg.png";
import SectionDescription from "../components/SectionDescription";
import TextSection from "../components/TextSection";
import BlogContent from "../components/BlogContent";
// import shopifyClient from "../../../api/shopifyClient";

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
    // this is for the homepageCarousal
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
        setTimeout(() => setCarousalLoading(false), 2000);
      }
    };
    fetchCarousel();

    // this is for the collections in homepage
    const storedCategories = localStorage.getItem("shop_collections");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

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
  const collectionText = {
    subtitle: "",
    title: "OUR Collections",
    description: ``,
  };
  const blogs = [
    {
      title: "Blog 1",
      updatedBy: "By Admin",
      img: blogImg1,
    },
    {
      title: "Blog 2",
      updatedBy: "By Admin",
      img: blogImg2,
    },
    {
      title: "Blog 3",
      updatedBy: "By Admin",
      img: blogImg3,
    },
  ];
  return (
    <div className="bg-blue-100 dark:bg-gray-900">
      {/* Carousal  */}

      <div className="container mx-auto px-4 mt-8">
        <div
          className="pt-8 bg-blue-300 rounded"
          style={{ background: `url(${bannerBg}) no-repeat center` }}
        >
          <div className="w-full mx-auto relative">
            {carousalLoading ? (
              <SkeletonLoader
                type="homepagecarousel"
                count={1}
                isLoading={carousalLoading}
              />
            ) : (
              <HeroCarousel carouselItems={carouselItems} />
            )}
          </div>
        </div>
      </div>
      <TextSection {...welcomeText} className="pb-12 pt-20" />
      <TextSection {...collectionText} className="pb-0 pt-15" />
      <SectionDescription
        sections={categories}
        isCarousel={true}
        className="pt-3"
      />
      {/* <BlogContent title="Welcome To Blog" /> */}
      <TextSection {...blogText} className="pb-6" />

      {blogs.length > 0 && (
        <div className="container mx-auto px-4 pb-28">
          <div className="flex -mx-4">
            {blogs.map((blog, index) => (
              <div className="w-1/3 px-4 relative" key={index}>
                <BlogContent
                  image={blog.img}
                  title={blog.title}
                  updatedBy={blog.updatedBy}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
