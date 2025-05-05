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
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        autoplay={{
          delay: 2000, // 3 seconds between slides
          disableOnInteraction: true, // keeps autoplay running after user interacts
        }}
        slidesPerGroup={1}
        className="!relative z-0 w-full overflow-hidden"
      >
        {carouselItems.map((item) => (
          <div>
            onClick={() => navigate(`/collection/${item.handle}`)}
            className="cursor-pointer"
            <SwiperSlide key={item.id}>
              <div className="flex flex-col md:flex-row items-center justify-center min-h-[250px]">
                {/* Image */}
                <div className="relative max-h-[600px] rounded-sm overflow-hidden flex flex-col md:flex-row items-center justify-center gap-4 mt-10 md:mt-0">
                  <img
                    src={item.imageLeft}
                    alt="Left"
                    className="rounded-xl shadow-md object-cover object-center w-full h-full"
                  />
                </div>
                {/* Text */}
                <div className="text-center md:text-left md:ml-14 lg:ml-20">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    New Arrival
                  </p>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 leading-tight">
                    {item.title}
                    <br />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.subtitle}
                    </span>
                  </h1>
                  {/* <button className="mt-6 px-8 py-4 border text-lg border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white">
                    SHOP NOW
                  </button> */}
                  <Button className="mt-6">SHOP NOW</Button>
                </div>
              </div>
            </SwiperSlide>
          </div>
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
          :root {
          --swiper-navigation-size: 25px !important;
          }
		  .swiper-slide img {
			display: block;
			width: 100% !important;
			object-fit: cover;
		}
      .swiper-slide{padding: 0 40px;}
      .swiper{padding-bottom: 45px;}
        .dark:root{
          --swiper-pagination-bullet-inactive-color: #fff;
        }
        .dark .swiper-button-next, .dark .swiper-button-prev{
          color: #fff;
        }
          @media only screen and (max-width: 575px){
            .swiper-slide{padding: 0 20px;}
            .swiper-button-next {
              right: 5px;
            }
            .swiper-button-prev { 
              left: 5px;
            }
              :root {
              --swiper-navigation-size: 15px !important;
              }
          }
      `}</style>
    </>
  );
}
