import React, { useEffect, useState } from "react";
import { isAutheticated } from "../auth/helper";
import { getAllUserOrders } from "./helper/userapicalls";
import Menu from "../core/Menu";
import Card from "../core/Card";
import dashboardIllustration from "../images/dashboard.svg";
import styled from "styled-components";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import COLORS from "../assets/colors";
import background from "../images/background.svg";

const UserDashBoard = () => {
  // install Swiper components
  SwiperCore.use(Pagination);

  const { user, token } = isAutheticated();
  const [reload, setReload] = useState(false);

  const [products, setProducts] = useState();
  const [error, setError] = useState([]);

  const loadOrders = () => {
    getAllUserOrders(user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };

  let itemsToRender;
  products
    ? (itemsToRender = products.purchases.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="userDashboard__card">
              <Card
                product={item}
                removeFromCart={false}
                addtoCart={false}
                setReload={setReload}
                reload={reload}
                showImage={false}
              />
            </div>
          </SwiperSlide>
        );
      }))
    : (itemsToRender = "Loading...");

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserDashboardTag>
      <Menu />
      <div className="userDashboard">
        <div className="text-center">
          <img src={dashboardIllustration} alt="" />
          <h1 className="text-center">Your ordered Products</h1>
        </div>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {itemsToRender}
        </Swiper>
      </div>
    </UserDashboardTag>
  );
};

export default UserDashBoard;

const UserDashboardTag = styled.div`
  .userDashboard {
    background: url(${background});
    min-height: 100vh;
    img {
      margin: 100px 0 30px 0;
      width: 40vh;
    }
    h1 {
      color: ${COLORS.secondaryBackgroundColor};
      font-size: 35px;
    }
    &__card {
      margin: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 1024px) {
    .userDashboard {
      &__card {
        .card {
          margin: 0px;
        }
      }
    }
  }
`;
