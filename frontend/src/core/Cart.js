import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Card from "./Card";
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
      return <h3>No Items in Cart</h3>;
    }
  };

  return (
    <div>
      <Menu />
      <div className="cartpage">
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
      <div className="checkout text-center">
        <StripeCheckout products={products} setReload={setReload} />
        <img src={paymentIllustration} alt="" />
      </div>
    </div>
  );
};

export default Cart;
