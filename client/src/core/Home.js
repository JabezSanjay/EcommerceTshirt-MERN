import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Card from "./Card";
import illustration from "../assets/images/main-page-illustration.png";
import ScrollToTop from "react-scroll-up";
import { getProducts } from "./helper/coreapicalls";
import styled from "styled-components";
import COLORS from "../assets/colors";
import background from "../assets/images/background.svg";

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
    <HomeTag>
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
    </HomeTag>
  );
};

export default Home;

const HomeTag = styled.div`
  .homescreen {
    min-height: 100vh;
    display: flex;
    background: radial-gradient(
      ${COLORS.primaryBackgroundColor},
      ${COLORS.secondaryBackgroundColor}
    );
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    &__text {
      display: flex;
      flex-direction: column;
      text-align: center;
      h1 {
        font-size: 2.5rem;
        color: ${COLORS.whiteColor};
        letter-spacing: 2px;
      }
      p {
        color: ${COLORS.whiteColor};
      }
    }
    img {
      width: 90vh;
    }
  }

  .productpage {
    min-height: 100vh;
    background-image: url(${background});
    h1 {
      font-size: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${COLORS.secondaryBackgroundColor};
      margin: 4.5rem;
    }
    span {
      color: #fff;
      background-color: ${COLORS.secondaryBackgroundColor};
      padding: 10px;
      border-radius: 99px;
    }
  }

  @media (max-width: 1024px) {
    .homescreen {
      flex-direction: column;
      justify-content: space-around;
      img {
        width: 45vh;
      }
      &__text {
        h1 {
          font-size: 2rem;
          margin-top: 150px;
        }
      }
    }
  }
`;
