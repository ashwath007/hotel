import { API } from "../../../backend";


export const holdOrders = (orderId) => {
    return fetch(`${API}/admin/shaji/dashboard/orders/holdorders/${orderId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}


export const rejectOrder = (orderId) => {
    return fetch(`${API}/admin/shaji/dashboard/orders/rejectOrder/${orderId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}