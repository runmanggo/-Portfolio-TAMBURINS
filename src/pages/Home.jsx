import React from "react";
import { NavLink } from "react-router-dom";

import leftImg from "../assets/image/pc_mainHero_left.jpg";
import rightImg from "../assets/image/pc_mainHero_right.jpg";

import classes from "../style/home.module.css";

const Home = () => {
  return (
    <div className={classes.mainPage}>
      <div className={classes.mainPage__inner}>
        <div className={classes.left__img}>
          <img src={leftImg} alt="" />
        </div>
        <div className={classes.right__img}>
          <img src={rightImg} alt="" />
        </div>
      </div>
      <div className={classes.mainPage__content}>
        <div className={classes.mainPage__title}>TOILET FRAGRANCE</div>
        <button className={classes.mainPage__btn}>
          <NavLink to="/shop/:category">신제품보기</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Home;
