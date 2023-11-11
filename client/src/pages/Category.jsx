import React from "react";
import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";
import Banner from "../components/Banner/Banner";

import classes from "../style/category.module.css";

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

const fetchItems = async (category) => {
  try {
    const response = await axios.get(`http://localhost:8000/items/category`, {
      params: {
        category: category,
      },
    });
    return response.data;
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

  const {
    data: mainItems,
    isLoading: itemsIsLoading,
    error: itemsError,
  } = useQuery(["items", category], () => fetchItems(category));

  if (itemsIsLoading) return console.log("items 로딩중");
  if (itemsError) return console.log(itemsError.message);

  if (isLoading) return console.log("로딩중");
  if (error) return console.log(error.message);

  return (
    <div>
      <Slider />
      <Banner />
      <Filter title={title} />
      <div className={classes.ctgList__container}>
        <div className={classes.ctgList__inner}>
          {mainItems.map((item) => {
            return (
              <div className={classes.ctgLis__productBox} key={item._id}>
                <div className={classes.ctgLis__img}>
                  <img src={item.img} alt="" />
                </div>
                <div className={classes.ctgLis__info}>
                  <div className={classes.ctgLis__info__itemDesc}>
                    {item.desc[0]} | {item.desc[1]} | {item.desc[2]}
                  </div>
                  <div className={classes.ctgLis__info__title}>{item.name}</div>
                  <div className={classes.ctgLis__info__price}>
                    <span className={classes.ctgLis__price}>
                      {item.price} 원
                    </span>
                    <span className={classes.ctgLis__capacity}>
                      {item.capacity}
                    </span>
                  </div>
                  <span className={classes.ctgList__size}>
                    +<strong>{item.quantity}</strong> Sizes
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
