import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import classes from "./slider.module.css";

import { useFetchData } from "../../services/useFetchData";
import { API } from "../../services/api.config";

const Slider = (props) => {
  const fetchImages = useFetchData(API.CATEGORIES);
  const {
    data: images,
    isLoading,
    error,
  } = useQuery({ queryKey: ["images"], queryFn: fetchImages });

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      return;
    }
  }, [error, isLoading]);

  const handleImageClick = (id) => {
    props.setActiveImage(id);
  };

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={"auto"}
      className={classes.swiper__container}
    >
      {images &&
        images.map((image) => (
          <SwiperSlide
            key={image._id}
            className={`${classes.swiper__slide} ${
              props.activeImage === image.category ? classes.active : ""
            }`}
          >
            <div className={classes.swiper__innerContainer}>
              <Link
                to={
                  image.category === "viewAll"
                    ? "/shop"
                    : `/shop/${image.category}`
                }
              >
                <img
                  src={image.sliderImg}
                  alt={`Slide ${image._id}`}
                  onClick={() => handleImageClick(image.category)}
                />
                <span>{image.sliderTitle}</span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
