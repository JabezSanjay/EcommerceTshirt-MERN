import { API } from "../../backend";

export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  next();
};

export const createOrder = (userId, authToken, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(orderData),
  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => console.log(err));
};
