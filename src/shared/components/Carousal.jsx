import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroCarousel({ carouselItems = [] }) {
  if (carouselItems.length < 2) {
    return <div>Not enough items for carousel</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto  relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        slidesPerGroup={1}
        className="!relative z-0 w-full overflow-hidden"
      >
        {carouselItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col md:flex-row items-center justify-between bg-blue-100 px-6 md:px-20 ">
              {/* Text */}
              <div className="w-full md:w-1/2 text-center md:text-left max-w-xl">
                <p className="text-sm text-gray-600 mb-2">New Arrival</p>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                  {item.title}
                  <br />
                  <span className="text-gray-700">{item.subtitle}</span>
                </h1>
                <button className="mt-6 px-8 py-4 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all text-lg">
                  SHOP NOW
                </button>
              </div>

              {/* Images */}
              <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-center gap-4 mt-10 md:mt-0">
                <img
                  src={item.imageLeft}
                  alt="Left"
                  className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-xl shadow-md"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Nav Arrow Style Fix */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #1f2937; /* Tailwind's gray-800 */
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }

        .swiper-button-next {
          right: 10px;
        }

        .swiper-button-prev {
          left: 10px;
        }
      `}</style>
    </div>
  );
}
