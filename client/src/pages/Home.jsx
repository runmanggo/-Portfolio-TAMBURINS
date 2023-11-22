import React, { useEffect, useState } from "react";

import leftImg from "../assets/image/pc_mainHero_left.jpg";
import rightImg from "../assets/image/pc_mainHero_right.jpg";

import classes from "../style/home.module.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFixed, setIsFixed] = useState(false);

  // 사용자 창 사이즈와 메인 이미지와 동일하게 나오는 로직
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 메인 화면 모바일 버전 스크롤 이벤트
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
          <NavLink to="/shop/toiletFragrance">
            <button className={classes.mainPage__btn}> 신제품보기</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
