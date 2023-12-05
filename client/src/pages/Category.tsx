import React, { useState } from "react";
import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";
import Banner from "../components/Banner/Banner";
import ItemCard from "../components/UI/ItemCard";

import { CtgLsitContainer } from "../components/StyledComponents/ctgLsitContainer";

import { useParams, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//필터 컴포넌트 category에 해당되는 title 호출
import { fetchTitle } from "../services/fetchTitle";

// 각 조건에 맞게 데이터 받아오기
import { fetchItems } from "../services/fetchItems";
import { MainItems } from "../model/mainItems";

const Category = () => {
  const [activeImage, setActiveImage] = useState<string>("");
  const { category } = useParams() as { category: string };
  const {
    data: title,
    isLoading: isLoadingTitle,
    error: titleError,
  } = useQuery<string, Error>({
    queryKey: ["title", category],
    queryFn: () => fetchTitle(category),
  });

  const {
    data: mainItems,
    isLoading: itemsIsLoading,
    error: itemsError,
  } = useQuery<MainItems[], Error>({
    queryKey: ["items", category],
    queryFn: () => fetchItems(category),
  });

  if (itemsIsLoading || isLoadingTitle) return;
  if (itemsError || titleError) return;

  return (
    <div>
      <Slider activeImage={activeImage} setActiveImage={setActiveImage} />
      <Banner />
      <Filter title={title || ""} quantity={mainItems?.length} />
      <CtgLsitContainer>
        {/* 토일렛 증정품만 상세페이지 넘어가지 않게 */}
        {mainItems?.map((item) =>
          item.itemId !== 602 ? (
            <NavLink
              key={item._id}
              to={`/shop/${item.category}/${item.itemId}`}
            >
              <ItemCard item={item} />
            </NavLink>
          ) : (
            <ItemCard key={item._id} item={item} />
          )
        )}
      </CtgLsitContainer>
    </div>
  );
};

export default Category;
