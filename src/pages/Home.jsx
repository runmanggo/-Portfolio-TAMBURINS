import React, { useEffect, useState } from "react";

import leftImg from "../assets/image/pc_mainHero_left.jpg";
import rightImg from "../assets/image/pc_mainHero_right.jpg";

import classes from "../style/home.module.css";

import Footer from "../components/Footer/Footer";

const Home = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (windowWidth < 1204 && window.scrollY > windowHeight) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowHeight, windowWidth]);

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
        <div
          className={
            isFixed
              ? `${classes.mainPage__content} ${classes.fixed}`
              : classes.mainPage__content
          }
        >
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
