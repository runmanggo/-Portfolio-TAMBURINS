import React from "react";
import classes from "../style/shop.module.css";

import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";

const Shop = () => {
  return (
    <div>
      <Slider />
      <Filter />
    </div>
  );
};

export default Shop;
