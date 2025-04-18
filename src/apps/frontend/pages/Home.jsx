import React, { useEffect, useState } from "react";
import HeroCarousel from "../../../shared/components/Carousal";
import Navbar from "../components/navbar";
import SkeletonLoader from "../../../shared/components/SkeletonLoader";
import shopifyClient from "../../../api/shopifyClient";
import backendClient from "../../../api/backendClient";
import { useAuth } from "../../../features/auth/context/AuthContext"; // Update path if needed
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [carousalLoading, setCarousalLoading] = useState({
    type: "homepagecarousal",
    isLoading: true,
  });
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    dispatch({
      type: "LOGIN",
      payload: {
        user: { name: userType === "admin" ? "Admin User" : "Customer User" },
        userType,
      },
    });

    // Redirect after login
    if (userType === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/myaccount/dashboard");
    }
  };

  const handleLogout = (userType) => {
    dispatch({ type: "LOGOUT" });

    // Redirect after logout
    if (userType === "admin") {
      navigate("/admin/login");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // // 1. Fetch both APIs in parallel
        // const [shopifyRes, backendRes] = await Promise.all([
        //   shopifyClient.get("/products.json"), // adjust endpoint
        //   backendClient.get("/carousel-items"), // your backend API
        // ]);

        // Example: merging with local dummy data
        const fallbackItems = Array.from({ length: 3 }).map((_, i) => ({
          id: i + 1,
          title: `Featured Item ${i + 1}`,
          subtitle: `Category ${i + 1}`,
          imageLeft: `https://picsum.photos/seed/left${i}/300/300`,
        }));

        // // Decide what to set based on your API structure
        // const formattedShopifyData = shopifyRes.data.products.map(
        //   (item, index) => ({
        //     id: item.id,
        //     title: item.title,
        //     subtitle: item.product_type || `Category ${index + 1}`,
        //     imageLeft: item.image?.src || fallbackItems[index]?.imageLeft,
        //   })
        // );

        setCarouselItems(fallbackItems);

        // Delay just for demo/transition
        setTimeout(() => {
          setCarousalLoading((prev) => ({ ...prev, isLoading: false }));
        }, 5000);
      } catch (err) {
        console.error("Error loading APIs:", err);
        setCarousalLoading((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-4 my-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => handleLogin("frontend")}
        >
          Login as Customer
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => handleLogin("admin")}
        >
          Login as Admin
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleLogout("frontend")}
        >
          Logout Customer
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded"
          onClick={() => handleLogout("admin")}
        >
          Logout Admin
        </button>
      </div>

      <Navbar />
      {/* Carousal  */}
      <div className="w-full max-w-7xl mx-auto relative">
        {carousalLoading.isLoading ? (
          <SkeletonLoader
            type="homepagecarousel"
            count={1}
            isLoading={carousalLoading.isLoading}
          />
        ) : (
          <HeroCarousel carouselItems={carouselItems} />
        )}
      </div>
    </div>
  );
}
