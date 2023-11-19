import React, { Fragment, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Routers from "./routers/Routers";
import Footer from "./components/Footer/Footer";
import CartPopup from "./components/Cart/CartPopup";

import { useLocation } from "react-router-dom";

import "./App.css";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const location = useLocation();

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

  useEffect(() => {
    const checkOutsideClick = (e) => {
      const path = e.composedPath();
      if (!path.includes(document.getElementById("cart"))) {
        closeCartHandler();
      }
    };
    document.addEventListener("mousedown", checkOutsideClick);

    return () => {
      document.removeEventListener("mousedown", checkOutsideClick);
    };
  }, []);

  return (
    <Fragment>
      <CartPopup show={cartIsShown} />
      <Header cartIsShown={cartIsShown} showCartHandler={showCartHandler} />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
