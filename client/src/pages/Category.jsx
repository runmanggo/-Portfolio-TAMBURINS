import React from "react";
import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";
import Banner from "../components/Banner/Banner";
import ItemCard from "../components/UI/ItemCard";

import { CtgLsitContainer } from "../style/StyledComponents";

import { useParams } from "react-router-dom";
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
      <CtgLsitContainer>
        {mainItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </CtgLsitContainer>
    </div>
  );
};

export default Category;
