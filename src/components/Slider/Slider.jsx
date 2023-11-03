import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./slider.css";

import bestsellerImage from "../../assets/image/swiper_menu/category_bestseller.png";
import chainHandImage from "../../assets/image/swiper_menu/category_chain-hand_v2.png";
import giftsetImage from "../../assets/image/swiper_menu/category_giftset.png";
import handWash from "../../assets/image/swiper_menu/category_handWash.png";
import multiFragrance from "../../assets/image/swiper_menu/category_multi-fragrance.png";
import OAcandle from "../../assets/image/swiper_menu/category_OAcandle.png";
import sampleKit from "../../assets/image/swiper_menu/category_sample-kit.png";
import sanitizer from "../../assets/image/swiper_menu/category_sanitizer.png";
import shwry from "../../assets/image/swiper_menu/category_shwry.png";
import viewall from "../../assets/image/swiper_menu/category_viewall.png";
import balm from "../../assets/image/swiper_menu/ctgry_balm.png";
import bloomingcandle from "../../assets/image/swiper_menu/ctgry_bloomingcandle.png";
import harvestsoap3 from "../../assets/image/swiper_menu/ctgry_harvestsoap3.png";
import perfume from "../../assets/image/swiper_menu/ctgry_perfume.png";
import shellX from "../../assets/image/swiper_menu/ctgry_shellX.png";
import toiletFragranceV2 from "../../assets/image/swiper_menu/ctgry_toiletfragrance_v2.png";

const Slider = () => {
  const images = [
    bestsellerImage,
    chainHandImage,
    giftsetImage,
    handWash,
    multiFragrance,
    OAcandle,
    sampleKit,
    sanitizer,
    shwry,
    viewall,
    balm,
    bloomingcandle,
    harvestsoap3,
    perfume,
    shellX,
    toiletFragranceV2,
  ];

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={"auto"}
      className="swiper-container"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} style={{ width: "100px", height: "100px" }}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
