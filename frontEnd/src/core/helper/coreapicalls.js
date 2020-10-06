import { API } from "../../backend";

export const getProducts = () => {
    return fetch(`${API}/products`, { method: "GET" })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const confirmOrders = (user, userId, token, orderId) => {
    console.log("user", userId, orderId);

    return fetch(`${API}/order/create/${userId._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};