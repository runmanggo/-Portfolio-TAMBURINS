import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchBanners } from "../../services/fetchBanners";

import classes from "./banner.module.css";
import shortid from "shortid";

const Banner = () => {
  const { category } = useParams();

  const {
    data: banners,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["banners", category],
    queryFn: () => fetchBanners(category),
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (error) {
      return;
    }
  }, [isLoading, error]);

  return (
    <Fragment>
      {banners &&
        banners.map((item) => (
          <section
            key={shortid.generate()}
            className={classes.banner__container}
          >
            <div className={classes.banner__inner}>
              {item.bannerImg && (
                <img
                  src={`data:image/jpeg;base64,${item.bannerImg}`}
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
                  <div className={classes.banner_text}>
                    {item.bannerContent}
                  </div>
                )}
              </div>
            )}
          </section>
        ))}
    </Fragment>
  );
};

export default Banner;
