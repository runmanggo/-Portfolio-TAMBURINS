import React, { useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./SliderItems.module.css";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchDetail } from "../../services/fetchDetail";

import shortid from "shortid";

const SliderItems = () => {
  const { id } = useParams();

  const {
    data: detail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery(["detail", id], () => fetchDetail(id));

  useEffect(() => {
    if (isLoadingDetail) {
      return;
    }
    if (detailError) {
      return;
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
            detail.mainImg.map((mainImg) => (
              <div key={shortid.generate()} className={classes.slick__slide}>
                {mainImg === detail.mainVideo ? (
                  <video>
                    <source src={mainImg} type="video/mp4" />
                  </video>
                ) : (
                  <img src={mainImg} alt={`mainImg ${mainImg.itemId}`} />
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
