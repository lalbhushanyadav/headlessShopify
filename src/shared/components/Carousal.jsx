import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Button from "./Button";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroCarousel({ carouselItems = [] }) {
  return (
    <>
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
            <div className="flex flex-col md:flex-row items-center justify-between bg-blue-100 dark:bg-blue-950 px-6 md:px-20 py-8 md:py-10 lg:py-15 min-h-[400px]">
              {/* Text */}
              <div className="w-full md:w-1/2 text-center md:text-left max-w-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">New Arrival</p>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 leading-tight">
                  {item.title}
                  <br />
                  <span className="text-gray-700 dark:text-white">{item.subtitle}</span>
                </h1>
                {/* <button className="mt-6 px-8 py-4 border text-lg border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white">
                  SHOP NOW
                </button> */}
                <Button className="mt-6">SHOP NOW</Button>
              </div>

              {/* Image */}
              <div className="w-full md:w-1/2 max-h-[600px] rounded overflow-hidden flex flex-col md:flex-row items-center justify-center gap-4 mt-10 md:mt-0">
                <img
                  src={item.imageLeft}
                  alt="Left"
                  className="rounded-xl shadow-md object-cover object-center w-full h-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #1f2937;
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
		  .swiper-slide img {
			display: block;
			width: 100% !important;
			object-fit: cover;
		}
      `}</style>
    </>
  );
}
