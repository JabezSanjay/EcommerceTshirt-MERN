import React from "react";
import "./scss/Card.modules.scss";
import ImageHelper from "./helper/ImageHelper";
import { addItemtoCart, removeItemsFromCart } from "./helper/cartHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const cartPrice = product.price;
  return (
    <div className="col-lg-4 mb-4">
      <ToastContainer autoClose={2000} />
      <div className="card">
        {showImageInCard(showImage)}
        <div className="card-body text-center">
          <h5 className="card-title">{cartName}</h5>
          <p className="card-text">{cartDescription}</p>
          <p className="card-text">Rs.{cartPrice}</p>
          {showRemoveFromCart(removeFromCart)}
          {showAddToCart(addtoCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
