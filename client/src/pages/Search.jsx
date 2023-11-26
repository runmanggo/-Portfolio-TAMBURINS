import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, NavLink } from "react-router-dom";

import Filter from "../components/Filter/Filter";
import Slider from "../components/Slider/Slider";
import ItemCard from "../components/UI/ItemCard";
import Results from "../components/UI/Results";

import { CtgLsitContainer } from "../components/StyledComponents/ctgLsitContainer";
import { fetchProducts } from "../services/fetchProducts";

const Search = () => {
  const [activeImage, setActiveImage] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const { data, isLoading, error } = useQuery(["products", query], () =>
    fetchProducts(query)
  );

  const products = data?.products;
  const count = data?.count;

  if (isLoading) {
    return "로딩중";
  }

  if (error) {
    return "에러";
  }

  return (
    <div>
      <Slider activeImage={activeImage} setActiveImage={setActiveImage} />
      <Filter title="검색 결과" quantity={count ? count : 0} />
      {count > 0 ? (
        <CtgLsitContainer>
          {products?.map((item, index) =>
            item.itemId !== 602 ? (
              <NavLink key={index} to={`/shop/${item.category}/${item.itemId}`}>
                <ItemCard item={item} />
              </NavLink>
            ) : (
              <ItemCard key={index} item={item} />
            )
          )}
        </CtgLsitContainer>
      ) : (
        <Results />
      )}
    </div>
  );
};

export default Search;
