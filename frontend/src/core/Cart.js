import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Card from "./Card";
import StripeCheckout from "./StripeCheckout";
import { loadCartItems } from "./helper/cartHelper";
import "./scss/Cart.modules.scss";
import cartIllustration from "../images/cart.svg";
import paymentIllustration from "../images/payment.svg";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCartItems());
  }, [reload]);

  const loadProducts = () => {
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
  };

  return (
    <div>
      <Menu />
      <div className="cartpage">
        <div className="cartpage__products">{loadProducts()}</div>
        <img src={cartIllustration} alt="" />
      </div>
      <div className="checkout">
        <img src={paymentIllustration} alt="" />
        <StripeCheckout products={products} setReload={setReload} />
      </div>
    </div>
  );
};

export default Cart;
