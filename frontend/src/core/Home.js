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
          <p>This is a project website created using MERN stack</p>
        </div>
        <img src={illustration} alt="" />
      </div>
      <div className="productpage"></div>
    </div>
  );
};

export default Home;
