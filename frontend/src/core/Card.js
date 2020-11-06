import React from "react";
import "./scss/Card.modules.scss";
import cardImage from "../images/Blue-Sleeve.JPG";

const Card = () => {
  return (
    <div>
      <div className="row" id="ads">
        <div className="col-md-4">
          <div className="card rounded">
            <div className="card-image">
              <img className="img-fluid" src={cardImage} alt="" />
            </div>
            <div className="card-image-overlay m-auto">
              <span className="card-detail-badge">Used</span>
              <span className="card-detail-badge">$28,000.00</span>
              <span className="card-detail-badge">13000 Kms</span>
            </div>
            <div className="card-body text-center">
              <div className="ad-title m-auto">
                <h5>Honda Accord LX</h5>
              </div>
              <a className="ad-btn" href="/">
                View
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card rounded">
            <div className="card-image">
              <img className="img-fluid" src={cardImage} alt="" />
            </div>
            <div className="card-image-overlay m-auto">
              <span className="card-detail-badge">Used</span>
              <span className="card-detail-badge">$28,000.00</span>
              <span className="card-detail-badge">13000 Kms</span>
            </div>
            <div className="card-body text-center">
              <div className="ad-title m-auto">
                <h5>Honda Accord LX</h5>
              </div>
              <a className="ad-btn" href="/">
                View
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card rounded">
            <div className="card-image">
              <img className="img-fluid" src={cardImage} alt="" />
            </div>
            <div className="card-image-overlay m-auto">
              <span className="card-detail-badge">Used</span>
              <span className="card-detail-badge">$28,000.00</span>
              <span className="card-detail-badge">13000 Kms</span>
            </div>
            <div className="card-body text-center">
              <div className="ad-title m-auto">
                <h5>Honda Accord LX</h5>
              </div>
              <a className="ad-btn" href="/">
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
