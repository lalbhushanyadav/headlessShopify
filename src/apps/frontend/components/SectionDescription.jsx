// CategorySection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const SectionDescription = ({ sections, isCarousel = false }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto">
          {isCarousel ? (
            <Swiper
              spaceBetween={0}
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
                <SwiperSlide key={cat.handle}>
                  <div
                    onClick={() => navigate(`/collection/${cat.handle}`)}
                    className="cursor-pointer rounded-lg overflow-hidden"
                  >
                    <div className="text-center bg-white shadow-sm h-full">
                      <div className="flex items-center justify-center h-70">
                        {cat.image && cat.title && (
                          <img
                            src={cat.image}
                            alt={cat.title}
                            className="max-h-full object-contain"
                          />
                        )}
                      </div>
                      {cat.count > 0 && (
                        <p className="py-2 text-sm text-gray-600">
                          {cat.count} Products
                        </p>
                      )}
                      {cat.title && (
                        <h3 className="text-lg font-semibold py-4">
                          {cat.title}
                        </h3>
                      )}
                    </div>
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
