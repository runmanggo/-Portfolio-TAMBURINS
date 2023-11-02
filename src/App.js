import { Fragment } from "react";
import Header from "./components/Header/Header";
import Routers from "./routers/Routers";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
