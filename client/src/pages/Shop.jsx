import React, { useEffect, useState } from "react";

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

import shortid from "shortid";

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
  const [activeImage, setActiveImage] = useState("");
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

  useEffect(() => {
    if (isLoadingAllItems || isLoadingCategoryItems) {
      console.log("로딩중");
    }
    if (allItemsError || categoryItemsError) {
      console.log(allItemsError?.message || categoryItemsError?.message);
    }
  }, [
    isLoadingAllItems,
    isLoadingCategoryItems,
    allItemsError,
    categoryItemsError,
  ]);

  return (
    <div>
      <Slider activeImage={activeImage} setActiveImage={setActiveImage} />
      <Filter title={"전체 보기"} quantity={allItems ? allItems.length : 0} />
      {chunk(allItems, 4).map((itemGroup) => (
        <React.Fragment key={shortid.generate()}>
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
          {itemGroup.length > 0 &&
            categoryItems &&
            categoryItems.some(
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
