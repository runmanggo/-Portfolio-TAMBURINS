import React, { Fragment, useState } from "react";
import Header from "./components/Header/Header";
import Routers from "./routers/Routers";
import Footer from "./components/Footer/Footer";
import CartPopup from "./components/Cart/CartPopup";

import "./App.css";

// const cartIcon = [Cart, Close];

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown((prev) => !prev);
  };

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
