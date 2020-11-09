import React from "react";
import Menu from "./Menu";
import Card from "./Card";
import "./scss/Home.modules.scss";
import illustration from "../images/main-page-illustration.png";
import ScrollToTop from "react-scroll-up";

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
      <div className="productpage">
        <Card />
        <ScrollToTop showUnder={100}>
          <span>
            <i className="fa fa-arrow-up" aria-hidden="true">
              {" "}
              Back To Top
            </i>
          </span>
        </ScrollToTop>
      </div>
    </div>
  );
};

export default Home;
