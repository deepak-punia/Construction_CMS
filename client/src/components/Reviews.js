import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Testimonial from './Testimonial';
import './reviews.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper';
import { useSelector } from "react-redux";


const Reviews = () => {
    const reviews = useSelector(
        (state) => state?.settings?.data?.reviews
    );
  return (
    <div>
      <div className="review-container">
        <Swiper
          effect={'flip'}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews && reviews.length > 0 ? reviews.map((review, index) => {
            return (
              <SwiperSlide key={index}>
                <Testimonial data={review} />
              </SwiperSlide>
            );
          }) : <></>}
        </Swiper>
      </div>
    </div>
  );
};
export default Reviews;
