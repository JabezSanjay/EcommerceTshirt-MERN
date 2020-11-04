import React from "react";
import Menu from "./Menu";
import "./scss/Home.modules.scss";
import illustration from "../images/main-page-illustration.png";

const Home = () => {
  return (
    <div>
      <Menu />
      <div className="homescreen">
        <div className="homescreen__text">
          <h1>Your Striking Online Store</h1>
        </div>
        <img src={illustration} alt="" />
      </div>
    </div>
  );
};

export default Home;
