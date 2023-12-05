import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, NavLink } from "react-router-dom";

import Filter from "../components/Filter/Filter";
import Slider from "../components/Slider/Slider";
import ItemCard from "../components/UI/ItemCard";
import Results from "../components/UI/Results";

import { CtgLsitContainer } from "../components/StyledComponents/ctgLsitContainer";
import { fetchProducts } from "../services/fetchProducts";

import { MainItems } from "model/mainItems";

interface Data {
  products: MainItems[];
  count: number | undefined;
}

const Search = () => {
  const [activeImage, setActiveImage] = useState<string>("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query: string | null = queryParams.get("query");

  const { data, isLoading, error } = useQuery<Data, Error>({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query as string),
  });

  const products = data?.products;
  const count = data?.count;

  if (isLoading) {
    return;
  }

  if (error) {
    return;
  }

  return (
    <div>
      <Slider activeImage={activeImage} setActiveImage={setActiveImage} />
      <Filter title="검색 결과" quantity={count ? count : 0} />
      {count && count > 0 ? (
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
