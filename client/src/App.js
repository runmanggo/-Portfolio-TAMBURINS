import React, { Fragment, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Routers from "./routers/Routers";
import Footer from "./components/Footer/Footer";
import CartPopup from "./components/Cart/CartPopup";

import { login, logout } from "./redux/authSlice";

import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

import { useLocation } from "react-router-dom";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [cartIsShown, setCartIsShown] = useState(false);
  const location = useLocation();

  // 로그인 상태 감지 및 유지 로직
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const showCartHandler = () => {
    setCartIsShown((prev) => !prev);
  };

  const closeCartHandler = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      closeCartHandler();
    };
    handleRouteChange();
  }, [location]);

  return (
    <Fragment>
      <CartPopup show={cartIsShown} closeCartHandler={closeCartHandler} />
      <Header
        cartIsShown={cartIsShown}
        showCartHandler={showCartHandler}
        closeCartHandler={closeCartHandler}
      />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
