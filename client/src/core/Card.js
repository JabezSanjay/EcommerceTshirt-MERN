import React from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemtoCart, removeItemsFromCart } from "./helper/cartHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import COLORS from "../assets/colors";
import styled from "styled-components";

const Card = ({
  product,
  addtoCart = false,
  removeFromCart = false,
  showImage = true,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const addToCart = () => {
    addItemtoCart(product);
    toast.success(`${product.name} has been added to the cart`, {
      autoClose: 2000,
      position: "bottom-right",
    });
  };

  const showAddToCart = () => {
    return (
      addtoCart && (
        // eslint-disable-next-line
        <a onClick={addToCart} className="btn btn-outline-success btn-sm">
          Add to Cart
        </a>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        // eslint-disable-next-line
        <a
          className="btn btn-outline-danger btn-sm"
          onClick={() => {
            removeItemsFromCart(product._id);
            setReload(!reload);
          }}
        >
          Remove from Cart
        </a>
      )
    );
  };

  const showImageInCard = () => {
    return (
      showImage && <ImageHelper product={product} className="card-img-top" />
    );
  };

  const cartName = product.name;
  const cartDescription = product.description;
  const cartPrice = product.price || product.amount;
  return (
    <div className="col-lg-4 mb-4">
      <ToastContainer autoClose={2000} position="bottom-right" />
      <CardTag>
        <div className="card">
          <div className="card__image">{showImageInCard(showImage)}</div>
          <div className="card-body text-center">
            <h5 className="card-title">{cartName}</h5>
            <p className="card-text">{cartDescription}</p>
            <p className="card-text">Rs.{cartPrice}</p>
            {showRemoveFromCart(removeFromCart)}
            {showAddToCart(addtoCart)}
          </div>
        </div>
      </CardTag>
    </div>
  );
};

export default Card;

const CardTag = styled.div`
  .card {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 10px 50px rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    .card-title {
      font-weight: 800;
      font-size: 20px;
      color: ${COLORS.secondaryBackgroundColor};
    }
    .card-text {
      font-family: "Poppins", sans-serif;
    }
  }

  @media (max-width: 1024px) {
    .card {
      margin: 30px;
      .card-title {
        font-size: 19px;
      }
    }
  }
`;
