import { useEffect } from "react";
import { useQuery } from "react-query";
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
    isLoading: isQueryLoading,
    error,
  } = useQuery("images", fetchImages);

  useEffect(() => {
    if (isQueryLoading) return console.log("로딩중");
    if (error) {
      return console.log(error.message);
    }
  }, [error, isQueryLoading]);

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
