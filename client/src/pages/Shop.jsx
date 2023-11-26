import React, { useEffect, useState } from "react";

import ItemCard from "../components/UI/ItemCard";
import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";

import { CtgLsitContainer } from "../components/StyledComponents/ctgLsitContainer";
import { AllBtn } from "../components/StyledComponents/shopBtn";
import { BtnBox } from "../components/StyledComponents/shopBtn";
import { chunk } from "lodash";

import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../services/api.config";
import { useFetchData } from "../services/useFetchData";

import shortid from "shortid";

const Shop = () => {
  // slider 해당 페이지 border 효과 주기 위해
  const [activeImage, setActiveImage] = useState("");

  const fetchAll = useFetchData(API.ALL);
  const {
    data: allItems,
    isLoading: isLoadingAllItems,
    error: allItemsError,
  } = useQuery("allItems", fetchAll);

  const fetchTitle = useFetchData(API.CATEGORIES);
  const {
    data: categoryItems,
    isLoading: isLoadingCategoryItems,
    error: categoryItemsError,
  } = useQuery("categoryItems", fetchTitle);

  useEffect(() => {
    if (isLoadingAllItems || isLoadingCategoryItems) {
      return;
    }
    if (allItemsError || categoryItemsError) {
      return;
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
