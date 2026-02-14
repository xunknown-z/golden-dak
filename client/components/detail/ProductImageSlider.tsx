'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

interface ProductImageSliderProps {
  images: string[];
  productName: string;
}

export default function ProductImageSlider({ images, productName }: ProductImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative bg-gray-100">
      <Swiper
        modules={[Pagination]}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
        className="w-full aspect-square"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-6xl text-gray-300">
                {productName.charAt(0)}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}
