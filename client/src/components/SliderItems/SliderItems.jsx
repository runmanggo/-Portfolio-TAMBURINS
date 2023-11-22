import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import classes from "./SliderItem.module.css";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import shortid from "shortid";

const fetchDetail = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/detail/${id}`);
    const details = response.data;

    const matchedId = details.find((detail) => detail.itemId === Number(id));

    return matchedId;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const SliderItems = () => {
  const { id } = useParams();

  const {
    data: detail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery(["detail", id], () => fetchDetail(id));

  useEffect(() => {
    if (isLoadingDetail) {
      return console.log("로딩중");
    }

    if (detailError) {
      return console.log("Error:", detailError.message);
    }
  }, []);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '" style="background-color: var(--black)">' +
        (index + 1) +
        "</span>"
      );
    },
    dynamicBullets: true,
  };

  return (
    <>
      {detail && (
        <>
          <Swiper
            loop={true}
            pagination={pagination}
            modules={[Pagination]}
            className={classes.swiper__items}
          >
            {Array.isArray(detail.mainImg) ? (
              detail.mainImg.map((mainImg, index) => (
                <SwiperSlide key={shortid.generate()}>
                  {mainImg === detail.mainVideo ? (
                    <video>
                      <source src={mainImg} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={mainImg} alt={`mainImg ${index}`} />
                  )}
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                {detail.mainImg === detail.mainVideo || !detail.mainImg ? (
                  <video loop muted autoPlay>
                    <source src={detail.mainVideo} type="video/mp4" />
                  </video>
                ) : (
                  <img src={detail.mainImg} alt="mainImg" />
                )}
              </SwiperSlide>
            )}
          </Swiper>
        </>
      )}
    </>
  );
};

export default SliderItems;
