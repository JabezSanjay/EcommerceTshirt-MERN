import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { getOrders } from "./helper/adminapicall";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { user, token } = isAutheticated();
    const preload = () => {
      getOrders(user._id, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setOrders(data);
        }
      });
    };

    preload();
  }, []);

  let itemsToRender;
  if (orders) {
    itemsToRender = orders.map((order) => {
      return (
        <div className="m-4 text-center " key={order.id}>
          {order.status} - Rs.{order.amount}
        </div>
      );
    });
  } else {
    itemsToRender = "Loading...";
  }

  return (
    <Base title="Manage Orders">
      <h6>{itemsToRender}</h6>
    </Base>
  );
};

export default Orders;
