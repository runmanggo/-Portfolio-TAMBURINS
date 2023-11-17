import React, { Fragment } from "react";
import Header from "./components/Header/Header";
import Routers from "./routers/Routers";
import Footer from "./components/Footer/Footer";
import CartPopup from "./components/Cart/CartPopup";

import "./App.css";

function App() {
  return (
    <Fragment>
      <CartPopup />
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
