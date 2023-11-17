import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Category from "../pages/Category";
import ItemDetails from "../pages/ItemDetails";
import MyPage from "../pages/MyPage";
import Cart from "../pages/Cart";
import Signup from "../pages/Signup";
import Store from "../pages/Store";
import Login from "../pages/Login";
import Search from "../pages/Search";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:category" element={<Category />} />
      <Route path="shop/:category/:id" element={<ItemDetails />} />
      <Route path="store" element={<Store />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="shop/search" element={<Search />} />
    </Routes>
  );
};

export default Routers;
