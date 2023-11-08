import { useState } from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import classes from "./slider.module.css";
import axios from "axios";

const fetchImages = async () => {
  try {
    const response = await axios.get("http://localhost:8000/categories");
    return response.data;
  } catch (error) {
    throw new Error("이미지 데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

const Slider = () => {
  const { data: images, isLoading, error } = useQuery("images", fetchImages);
  const [activeImage, setActiveImage] = useState([]);

  const handleImageClick = (id) => {
    setActiveImage(id);
  };

  if (isLoading) return console.log("로딩중");
  if (error) return console.log(error.message);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={"auto"}
      className={classes.swiper__container}
    >
      {images.map((image) => (
        <SwiperSlide
          key={image._id}
          className={`${classes.swiper__slide} ${
            activeImage === image.category ? classes.active : ""
          }`}
        >
          <div className={classes.swiper__innerContainer}>
            <Link
              to={
                image.category === "ViewAll"
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
