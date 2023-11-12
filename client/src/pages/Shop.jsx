import React from "react";

import ItemCard from "../components/UI/ItemCard";
import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";

import { CtgLsitContainer } from "../style/StyledComponents";
import { AllBtn } from "../style/StyledComponents";
import { chunk } from "lodash";

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

const Shop = () => {
  const { data: allItems, isLoading, error } = useQuery("allItems", fetchAll);

  if (isLoading) return console.log("로딩중");
  if (error) return console.log(error.message);

  return (
    <div>
      <Slider />
      <Filter />
      {chunk(allItems, 4).map((itemGroup, index) => (
        <React.Fragment key={index}>
          <CtgLsitContainer>
            {itemGroup.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </CtgLsitContainer>
          <AllBtn>{allItems[index].category} 모두보기</AllBtn>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Shop;
