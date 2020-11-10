import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import StripeCheckoutPopup from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder, emptyCart } from "./helper/orderHelper";

const stripeKey = process.env.REACT_APP_STRIPE_FRONTEND;

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  // eslint-disable-next-line
  const [data, setData] = useState({
    success: false,
    loading: false,
    address: "",
    error: "",
  });
  // eslint-disable-next-line
  const authToken = isAutheticated() && isAutheticated().token;
  // eslint-disable-next-line
  const userId = isAutheticated() && isAutheticated().user._id;

  const loadTotalPrice = () => {
    let amount = 0;
    // eslint-disable-next-line
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        emptyCart(() => {
          const orderData = {
            products: products,
            amount: loadTotalPrice(),
          };
          createOrder(userId, authToken, orderData);
        });
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const loadPaymentButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutPopup
        token={makePayment}
        stripeKey={`${stripeKey}`}
        shippingAddress
        billingAddress
        amount={loadTotalPrice() * 100}
        currency="INR"
      >
        <button className="btn btn-outline-success">Pay with Stripe</button>
      </StripeCheckoutPopup>
    ) : (
      <Link to="signin">
        <button className="btn btn-outline-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div className="text-center">
      <h2>Stripe Checkout Rs.{loadTotalPrice()}</h2>
      {loadPaymentButton()}
      <h5 className="m-5">Do not use your original card number. Instead use</h5>
      <h6>Account Number : 4242 4242 4242 </h6>
      <h6>Expiry date : Any future date </h6>
      <h6>CVV : Any 3 numbers </h6>
    </div>
  );
};

export default StripeCheckout;
