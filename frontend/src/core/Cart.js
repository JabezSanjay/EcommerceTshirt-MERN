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
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

const Cart = () => {
  SwiperCore.use(Pagination);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCartItems());
  }, [reload]);

  let itemsToRender;
  window.localStorage.cart.length !== 2
    ? (itemsToRender = products.map((item) => {
        return (
          <SwiperSlide>
            <div className="cartpage__products">
              <Card
                product={item}
                removeFromCart={true}
                addtoCart={false}
                setReload={setReload}
                reload={reload}
                showImage={true}
              />
            </div>
          </SwiperSlide>
        );
      }))
    : (itemsToRender = (
        <div className="m-5">
          <h3 className="text-white">No Items in Cart</h3>
          <Link to="/" className="btn btn-success btn-sm p-2 m-3">
            Back To Shopping
          </Link>
        </div>
      ));

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
          className="cartpage__image"
          src={
            window.localStorage.cart.length !== 2
              ? cartIllustration
              : emptyCartIllustration
          }
          alt=""
        />

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {itemsToRender}
        </Swiper>
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
