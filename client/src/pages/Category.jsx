import React from "react";
import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";
import Banner from "../components/Banner/Banner";

import classes from "../style/category.module.css";
import Imggg from "../assets/image/PLP_perfume_chamo_50ml.jpg";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import axios from "axios";

const fetchTitle = async (category) => {
  try {
    const response = await axios.get("http://localhost:8000/categories");
    const titles = response.data;

    const matchedTitle = titles.filter((title) => title.category === category);

    return matchedTitle.length > 0 ? matchedTitle[0].sliderTitle : "";
  } catch (error) {
    throw new Error(error.message);
  }
};

const Category = () => {
  const { category } = useParams();
  const {
    data: title,
    isLoading,
    error,
  } = useQuery(["title", category], () => fetchTitle(category));

  if (isLoading) return console.log("로딩중");
  if (error) return console.log(error.message);

  return (
    <div>
      <Slider />
      <Banner />
      <Filter title={title} />
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

          {/* 확인용 */}
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

          {/* 확인용 */}
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
    </div>
  );
};

export default Category;
