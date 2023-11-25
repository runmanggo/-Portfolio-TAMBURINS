import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchBanners } from "../../services/fetchBanners";

import classes from "./banner.module.css";

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
    <Fragment>
      {banners.map((item) => (
        <section key={item._id} className={classes.banner__container}>
          <div className={classes.banner__inner}>
            {item.bannerImg && (
              <img
                src={item.bannerImg}
                alt=""
                className={
                  item.category === "tubeHand" ? classes.banner__tubeHand : ""
                }
              />
            )}
            {item.bannerVideo && (
              <video loop muted autoPlay>
                <source src={item.bannerVideo} type="video/mp4" />
                <source src={item.bannerVideo} type="video/webm" />
              </video>
            )}
          </div>
          {item.bannerTitle && (
            <div className={classes.banner__context}>
              <div className={classes.banner__title}>{item.bannerTitle}</div>
              {item.bannerContent && (
                <div className={classes.banner_text}>{item.bannerContent}</div>
              )}
            </div>
          )}
        </section>
      ))}
    </Fragment>
  );
};

export default Banner;
