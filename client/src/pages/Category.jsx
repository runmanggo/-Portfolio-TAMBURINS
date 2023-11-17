import React, { useState, useEffect } from "react";
import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";
import Banner from "../components/Banner/Banner";
import ItemCard from "../components/UI/ItemCard";

import { CtgLsitContainer } from "../style/StyledComponents";

import { useParams, NavLink } from "react-router-dom";
import { useQuery } from "react-query";

import axios from "axios";

//필터 컴포넌트 category에 해당되는 title 호출
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

// 각 조건에 맞게 데이터 받아오기
const fetchItems = async (category) => {
  try {
    let response;

    if (category === "bestSellers") {
      response = await axios.get("http://localhost:8000/items/best");
    } else if (category === "giftSet") {
      response = await axios.get("http://localhost:8000/items/gift");
    } else {
      response = await axios.get(`http://localhost:8000/items/category`, {
        params: {
          category: category,
        },
      });
    }

    let isItemRemoved = false;

    const filteredItems = response.data.filter((item) => {
      if (isItemRemoved || item.ctgId !== 13 || item.itemId !== 307) {
        return true;
      }

      isItemRemoved = true;
      return false;
    });

    return filteredItems;
  } catch (error) {
    throw new Error(error.message);
  }
};

const Category = () => {
  const [activeImage, setActiveImage] = useState("");
  const { category } = useParams();
  const {
    data: title,
    isLoading: isLoadingTitle,
    error: titleError,
  } = useQuery(["title", category], () => fetchTitle(category));

  const {
    data: mainItems,
    isLoading: itemsIsLoading,
    error: itemsError,
  } = useQuery(["items", category], () => fetchItems(category));

  if (itemsIsLoading || isLoadingTitle) return;
  if (itemsError || titleError) return;

  return (
    <div>
      <Slider activeImage={activeImage} setActiveImage={setActiveImage} />
      <Banner />
      <Filter title={title} />
      <CtgLsitContainer>
        {mainItems.map((item, index) => (
          <NavLink key={index} to={`/shop/${item.category}/${item.itemId}`}>
            <ItemCard item={item} />
          </NavLink>
        ))}
      </CtgLsitContainer>
    </div>
  );
};

export default Category;
