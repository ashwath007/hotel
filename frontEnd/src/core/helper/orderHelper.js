import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ order: orderData })
        })
        .then(reponse => {
            return Response.json();
        })
        .catch(err => console.log(err));
};


export const getallUserOrder = (userId, token) => {
    return fetch(`${API}/order/get/allusers/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            // body: JSON.stringify({ order: orderData })
        })
        .then(reponse => {
            return reponse.json();
        })
        .catch(err => console.log(err));
}