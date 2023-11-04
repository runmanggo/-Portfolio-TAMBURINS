import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import classes from "./slider.module.css";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase.config";

const Slider = () => {
  const [images, setImages] = useState([]);
  const storage = getStorage(); // Firebase Storage 초기화

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "categoryList"));

      // Firebase Storage에서 이미지의 다운로드 URL을 가져옵니다.
      const imageList = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imgPath = data.img;
          const imgUrl = await getDownloadURL(ref(storage, imgPath));
          return { url: imgUrl, title: data.title };
        })
      );

      setImages(imageList);
    };

    fetchData();
  }, []);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={"auto"}
      className={classes.swiper__container}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} style={{ width: "100px", height: "100px" }}>
          <img src={image.url} alt={`Slide ${index + 1}`} />
          <span>{image.title}</span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
