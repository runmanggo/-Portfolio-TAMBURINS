import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import classes from "./banner.module.css";

const fetchBanners = async (category) => {
  try {
    const response = await axios.get("http://localhost:8000/categories");
    const banners = response.data;
    const filteredBanners = category
      ? banners.filter((item) => item.category === category)
      : banners;
    return filteredBanners;
  } catch (error) {
    throw new Error(error.message);
  }
};

const Banner = () => {
  const { category } = useParams();

  const {
    data: banners,
    isLoading,
    error,
  } = useQuery(["banners", category], () => fetchBanners(category));

  if (isLoading) return console.log("로딩중");
  if (error) return console.log(error.message);

  return (
    <>
      {banners.map((item) => (
        <section key={item._id} className={classes.banner__container}>
          <div className={classes.banner__inner}>
            {item.bannerImg && <img src={item.bannerImg} alt="" />}
            {item.bannerVideo && (
              <video loop muted autoPlay>
                <source src={item.bannerVideo} type="video/mp4" />
                <source src={item.bannerVideo} type="video/webm" />
              </video>
            )}
          </div>
          <div className={classes.banenr__context}>
            <div className={classes.banner__title}>{item.bannerTitle}</div>
            <div className={classes.banner_text}>{item.bannerContent}</div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Banner;
