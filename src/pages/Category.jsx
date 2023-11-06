import React from "react";
import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";
import Banner from "../components/Banner/Banner";

import classes from "../style/category.module.css";
import Imggg from "../assets/image/PLP_perfume_chamo_50ml.jpg";

const Category = () => {
  return (
    <div>
      <Slider />
      <Banner />
      <Filter />
      <div className={classes.ctgList__container}>
        <div className={classes.ctgList__inner}>
          <div className={classes.ctgLis__productBox}>
            <div className={classes.ctgLis__img}>
              <img src={Imggg} alt="" />
            </div>
            <div className={classes.ctgLis__info}>
              <div className={classes.ctgLis__info__itemDesc}>
                진득한 카모마일 | 부드러운 나무결 | 머스크
              </div>
              <div className={classes.ctgLis__info__title}>퍼퓸 카모 </div>
              <div className={classes.ctgLis__info__price}>
                <span className={classes.ctgLis__price}>139,000 원 </span>
                <span className={classes.ctgLis__capacity}>50mL</span>
              </div>

              <span className={classes.ctgList__size}>
                +<strong>3</strong> Sizes
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 확인용 */}
      <div className={classes.ctgList__inner}>
        <div className={classes.ctgLis__productBox}>
          <div className={classes.ctgLis__img}>
            <img src={Imggg} alt="" />
          </div>
          <div className={classes.ctgLis__info}>
            <div className={classes.ctgLis__info__itemDesc}>
              진득한 카모마일 | 부드러운 나무결 | 머스크
            </div>
            <div className={classes.ctgLis__info__title}>퍼퓸 카모 </div>
            <div className={classes.ctgLis__info__price}>
              <span className={classes.ctgLis__price}>139,000 원 </span>
              <span className={classes.ctgLis__capacity}>50mL</span>
            </div>

            <span className={classes.ctgList__size}>
              +<strong>3</strong> Sizes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
