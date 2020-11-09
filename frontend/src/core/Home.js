import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Card from "./Card";
import "./scss/Home.modules.scss";
import illustration from "../images/main-page-illustration.png";
import ScrollToTop from "react-scroll-up";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState([]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <h1>Products</h1>
        <div className="container">
          <div className="row">
            {products.map((product, index) => {
              return <Card product={product} addtoCart={true} key={index} />;
            })}
          </div>
        </div>
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
