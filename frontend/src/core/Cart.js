import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Card from "./Card";
import { Link } from "react-router-dom";
import StripeCheckout from "./StripeCheckout";
import { loadCartItems } from "./helper/cartHelper";
import "./scss/Cart.modules.scss";
import cartIllustration from "../images/cart.svg";
import emptyCartIllustration from "../images/emptyCart.svg";
import paymentIllustration from "../images/payment.svg";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCartItems());
  }, [reload]);

  const loadProducts = () => {
    if (window.localStorage.cart.length !== 2) {
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
    <div>
      <Menu />
      <div
        className={
          window.localStorage.cart.length !== 2
            ? "cartpage"
            : "cartpage-alternative"
        }
      >
        <img
          src={
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
      {window.localStorage.cart.length !== 2 ? (
        <div className="checkout text-center">
          <StripeCheckout products={products} setReload={setReload} />
          <img src={paymentIllustration} alt="" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Cart;
