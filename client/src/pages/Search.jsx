import React from "react";
import { useQuery } from "react-query";
import { useLocation, NavLink } from "react-router-dom";
import axios from "axios";

import Filter from "../components/Filter/Filter";
import Slider from "../components/Slider/Slider";
import ItemCard from "../components/UI/ItemCard";

import { CtgLsitContainer } from "../style/StyledComponents";

const fetchProducts = async (query) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/items?query=${query}`
    );

    const filteredProducts = response.data.filter(
      (product) =>
        product.name.includes(query) ||
        (Array.isArray(product.desc) &&
          product.desc.some((desc) => desc.includes(query)))
    );

    return { products: filteredProducts, count: filteredProducts.length };
  } catch (error) {
    throw new Error(error.message);
  }
};

const Search = () => {
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
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <Slider />
      <Filter title={`검색 결과  (${count})`} />
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
    </div>
  );
};

export default Search;