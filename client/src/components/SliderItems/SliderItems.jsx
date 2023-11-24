import React, { useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  }, [isLoadingDetail, detailError]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {detail && (
        <Slider {...settings} className={classes.slick__slider}>
          {Array.isArray(detail.mainImg) ? (
            detail.mainImg.map((mainImg, index) => (
              <div key={shortid.generate()} className={classes.slick__slide}>
                {mainImg === detail.mainVideo ? (
                  <video>
                    <source src={mainImg} type="video/mp4" />
                  </video>
                ) : (
                  <img src={mainImg} alt={`mainImg ${index}`} />
                )}
              </div>
            ))
          ) : (
            <div className="slick-slide">
              {detail.mainImg === detail.mainVideo || !detail.mainImg ? (
                <video loop muted autoPlay>
                  <source src={detail.mainVideo} type="video/mp4" />
                </video>
              ) : (
                <img src={detail.mainImg} alt="mainImg" />
              )}
            </div>
          )}
        </Slider>
      )}
    </>
  );
};

export default SliderItems;
