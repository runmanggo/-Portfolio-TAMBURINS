import React, { useEffect, useState } from "react";

import leftImg from "../assets/image/pc_mainHero_left.jpg";
import rightImg from "../assets/image/pc_mainHero_right.jpg";

import classes from "../style/home.module.css";

const Home = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  //창 켰을때 메인이미지만 보이게
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.mainPage} style={{ height: `${windowHeight}px` }}>
      <div className={classes.mainPage__inner}>
        <div className={classes.mainPage__visual}>
          <div
            className={classes.left__img}
            style={{ height: `${windowHeight}px` }}
          >
            <img src={leftImg} alt="" />
          </div>
          <div className={classes.right__img}>
            <img src={rightImg} alt="" />
          </div>
        </div>
        <div className={classes.mainPage__content}>
          <div className={classes.mainPage__title}>TOILET FRAGRANCE</div>
          <button href="/shop/:category" className={classes.mainPage__btn}>
            신제품보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
