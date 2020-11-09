import React from "react";
import "./scss/Card.modules.scss";
import cardImage from "../images/Blue-Sleeve.JPG";

const Card = () => {
  return (
    <div>
      <section id="gallery">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card">
                <img src={cardImage} alt="" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Sunset</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                    eum similique repellat a laborum.
                  </p>
                  <a href="/" className="btn btn-outline-success btn-sm">
                    Read More
                  </a>
                  <a href="/" className="btn btn-outline-danger btn-sm">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card">
                <img src={cardImage} alt="" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Sunset</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                    eum similique repellat a laborum.
                  </p>
                  <a href="/" className="btn btn-outline-success btn-sm">
                    Read More
                  </a>
                  <a href="/" className="btn btn-outline-danger btn-sm">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card">
                <img src={cardImage} alt="" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Sunset</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                    eum similique repellat a laborum.
                  </p>
                  <a href="/" className="btn btn-outline-success btn-sm">
                    Read More
                  </a>
                  <a href="/" className="btn btn-outline-danger btn-sm">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
