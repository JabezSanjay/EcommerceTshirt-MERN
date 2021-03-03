import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Card from "./Card";
import { Link } from "react-router-dom";
import StripeCheckout from "./StripeCheckout";
import { loadCartItems } from "./helper/cartHelper";
import cartIllustration from "../assets/images/cart.svg";
import emptyCartIllustration from "../assets/images/emptyCart.svg";
import paymentIllustration from "../assets/images/payment.svg";
import styled from "styled-components";
import COLORS from "../assets/colors";
import background from "../assets/images/background.svg";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCartItems());
  }, [reload]);

  const loadProducts = () => {
    if (
      window.localStorage.cart !== undefined &&
      window.localStorage.cart.length !== 2
    ) {
      return (
        <div>
          {products.map((product, index) => {
            return (
              <div key={index}>
                <Card
                  product={product}
                  removeFromCart={true}
                  addtoCart={false}
                  setReload={setReload}
                  reload={reload}
                  showImage={false}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="m-5">
          <h3 className="text-white ">No Items in Cart</h3>
          <Link to="/" className="btn btn-success btn-sm">
            Back To Shopping
          </Link>
        </div>
      );
    }
  };

  return (
    <CartTag>
      <Menu />
      <div
        className={
          window.localStorage.cart !== undefined &&
          window.localStorage.cart.length !== 2
            ? "cartpage"
            : "cartpage-alternative"
        }
      >
        <img
          src={
            window.localStorage.cart !== undefined &&
            window.localStorage.cart.length !== 2
              ? cartIllustration
              : emptyCartIllustration
          }
          alt=""
        />
        <div className="container">
          <div className="cartpage__products">{loadProducts()}</div>
        </div>
      </div>
      {window.localStorage.cart !== undefined &&
      window.localStorage.cart.length !== 2 ? (
        <div className="checkout text-center">
          <StripeCheckout products={products} setReload={setReload} />
          <img src={paymentIllustration} alt="" />
        </div>
      ) : (
        <div></div>
      )}
    </CartTag>
  );
};

export default Cart;
const CartTag = styled.div`
  .cartpage {
    background-image: url(${background});
    min-height: 65vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    &__products {
      width: 100%;
      margin-left: 20rem;
      margin-top: 7rem;
    }
    img {
      width: 50vh;
      margin: 7rem 1rem 5rem 20rem;
    }
  }
  .cartpage-alternative {
    background: radial-gradient(
      ${COLORS.primaryBackgroundColor},
      ${COLORS.secondaryBackgroundColor}
    );
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    &__products {
      width: 100%;
      margin-left: 20rem;
      margin-top: 7rem;
    }
    img {
      width: 50vh;
      margin: 7rem 1rem 5rem 20rem;
    }
  }

  .checkout {
    background-image: url(${background});

    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 4rem;
    h2 {
      font-size: 30px;
      color: ${COLORS.secondaryBackgroundColor};
    }
    img {
      width: 60vh;
    }
  }

  @media (max-width: 1024px) {
    .cartpage {
      flex-direction: column;
      &__products {
        margin-left: 0;
        margin-top: 1rem;
        .card {
          margin: 0px;
        }
      }
      img {
        width: 30vh;
        margin: 5rem 0 0 0;
      }
    }
    .cartpage-alternative {
      flex-direction: column;
      justify-content: center;
      &__products {
        margin-left: 0;
        margin-top: 1rem;
      }
      img {
        width: 30vh;
        margin: 5rem 0 0 0;
      }
    }
    .checkout {
      margin-top: 50px;
      margin-top: 3rem;
      display: flex;
      align-items: center;
      justify-self: center;
      float: right;
      flex-direction: column;
      h2 {
        font-size: 28px;
        color: ${COLORS.secondaryBackgroundColor};
        float: left;
      }
      img {
        width: 40vh;
      }
    }
  }
`;
