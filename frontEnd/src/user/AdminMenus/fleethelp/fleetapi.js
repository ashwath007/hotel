import { API } from "../../../backend"
export const addFleet = (deliveryBoy) => {
    console.log(deliveryBoy);

    return fetch(`${API}/fleets/addfleets`, {
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

export const allFleet = () => {

    return fetch(`${API}/fleets/allfleets`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}