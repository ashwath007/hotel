import { API } from "../../../backend"
export const fleetSignup = (deliveryBoy) => {
    console.log(deliveryBoy);

    return fetch(`${API}/fleets/signuptowork`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(deliveryBoy)
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}
export const getFleetsId = () => {

    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("fleets")) {
        return localStorage.getItem("fleets")
    } else {
        return false;
    }
};

// export const allFleet = () => {

//     return fetch(`${API}/fleets/allfleets`, {
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",

//         },
//     }).then(res => {
//         return res.json();
//     }).catch(err => console.log(err));
// }

// export const getMyOrders = (fId) => {
//     console.log(fId)
//     return fetch(`${API}/getTheOrders/fleets/${fId}`, {
//         method: "GET",
//     }).then(res => {
//         return res.json();
//     }).catch(err => console.log(err));
// }

export const getMyOrders = (fId) => {
    return fetch(`${API}/getTheOrders/fleets/${fId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(reponse => {
            return reponse.json();
        })
        .catch(err => console.log(err));
}