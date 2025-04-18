// CategorySection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SectionDescription = ({ sections, isCarousel = false }) => {
  return (
    <div className="bg-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {isCarousel ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {sections.map((cat, index) => (
              <SwiperSlide key={index}>
                <div className="text-center bg-white p-6 rounded-lg shadow-sm h-full">
                  <div className="flex items-center justify-center h-40">
                    {cat.image && cat.title && (
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="max-h-full object-contain"
                      />
                    )}
                  </div>
                  {cat.count > 0 && (
                    <p className="mt-4 text-sm text-gray-600">
                      {cat.count} Products
                    </p>
                  )}
                  {cat.title && (
                    <h3 className="text-lg font-semibold mt-1">{cat.title}</h3>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((cat, index) => (
              <div
                key={index}
                className="text-center bg-white p-6 rounded-lg shadow-sm"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="mx-auto h-40 object-contain"
                />
                <p className="mt-4 text-sm text-gray-600">
                  {cat.count} Products
                </p>
                <h3 className="text-lg font-semibold mt-1">{cat.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionDescription;
