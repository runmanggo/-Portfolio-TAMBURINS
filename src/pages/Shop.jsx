import React from "react";
import classes from "../style/shop.module.css";

import Slider from "../components/Slider/Slider";
import Filter from "../components/Filter/Filter";
import Banner from "../components/Banner/Banner";

const Shop = () => {
  return (
    <div>
      <Slider />
      <Banner />
      <Filter />
    </div>
  );
};

export default Shop;
