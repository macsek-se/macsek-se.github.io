import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function MySwiper() {
  return (
    <div className="swiper-container">
   <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide><img className="test" src="/photos/0-1.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/0-2.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/0-4.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/0-5.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/0-6.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/0-8.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/1.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/2.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/3.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/4.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/9.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/11.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/14.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/17.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/18.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/19.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/21.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/22.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/23.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/25.jpeg"></img></SwiperSlide>
      <SwiperSlide><img className="test" src="/photos/26.jpeg"></img></SwiperSlide>
    </Swiper>
    </div>
  );
}
