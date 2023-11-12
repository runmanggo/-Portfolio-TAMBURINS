import React from "react";

import ItemCard from "../components/UI/ItemCard";
import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";

import { CtgLsitContainer } from "../style/StyledComponents";
import { AllBtn } from "../style/StyledComponents";
import { BtnBox } from "../style/StyledComponents";
import { chunk } from "lodash";

import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const fetchAll = async () => {
  try {
    const response = await axios.get("http://localhost:8000/items/all");
    const data = response.data;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchTitle = async () => {
  try {
    const response = await axios.get("http://localhost:8000/categories");
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const Shop = () => {
  const {
    data: allItems,
    isLoading: isLoadingAllItems,
    error: allItemsError,
  } = useQuery("allItems", fetchAll);
  const {
    data: categoryItems,
    isLoading: isLoadingCategoryItems,
    error: categoryItemsError,
  } = useQuery("categoryItems", fetchTitle);

  if (isLoadingAllItems || isLoadingCategoryItems) return console.log("로딩중");
  if (allItemsError || categoryItemsError)
    return console.log(allItemsError?.message || categoryItemsError?.message);

  return (
    <div>
      <Slider />
      <Filter title={"전체 보기"} />
      {chunk(allItems, 4).map((itemGroup, index) => (
        <React.Fragment key={index}>
          <CtgLsitContainer>
            {itemGroup.map((item) => (
              <NavLink
                key={item._id}
                to={`/shop/${item.category}/${item.itemId}`}
              >
                <ItemCard item={item} />
              </NavLink>
            ))}
          </CtgLsitContainer>
          {categoryItems.some(
            (category) => category.ctgId === itemGroup[0].ctgId
          ) && (
            <NavLink
              to={`/shop/${
                categoryItems.find(
                  (category) => category.ctgId === itemGroup[0].ctgId
                ).category
              }`}
            >
              <BtnBox>
                <AllBtn>
                  {
                    categoryItems.find(
                      (category) => category.ctgId === itemGroup[0].ctgId
                    ).sliderTitle
                  }
                  &nbsp;모두보기
                </AllBtn>
              </BtnBox>
            </NavLink>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Shop;
