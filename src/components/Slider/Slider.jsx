import { useState } from "react";

import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { Link } from "react-router-dom";

import classes from "./slider.module.css";

//파이어베이스
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase.config";
import { storage } from "../../firebase.config";

const fetchImages = async () => {
  // id 오름차순으로 데이터 불러오기
  const querySnapshot = await getDocs(
    query(collection(db, "categoryList"), orderBy("id", "asc"))
  );

  //Firebase Storage에서 이미지의 다운로드 URL을 가져오기
  const imageList = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data(); // 모든 문서 가져오기
      const imgPath = data.img;
      const imgUrl = await getDownloadURL(ref(storage, imgPath));
      return {
        id: data.id,
        url: imgUrl,
        title: data.title,
        category: data.category,
      };
    })
  );
  return imageList;
};

const Slider = () => {
  const { data: images } = useQuery("images", fetchImages);
  const [activeImage, setActiveImage] = useState(null);

  const handleImageClick = (id) => {
    setActiveImage(id);
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
            key={image.id}
            className={`${classes.swiper__slide} ${
              activeImage === image.category ? classes.active : ""
            }`}
          >
            {/* 전체보기 router /shop 으로 설정 */}
            <div className={classes.swiper__innerContainer}>
              <Link
                to={
                  image.category === "ViewAll"
                    ? "/shop"
                    : `/shop/${image.category}`
                }
              >
                <img
                  src={image.url}
                  alt={`Slide ${image.id}`}
                  onClick={() => handleImageClick(image.category)}
                />
                <span>{image.title}</span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
export default Slider;
