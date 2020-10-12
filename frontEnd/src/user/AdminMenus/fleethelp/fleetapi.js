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


export const loadeditFleets = (fleetsId) => {
    console.log(fleetsId)
    return fetch(`${API}/fleets/loadeditfleets/${fleetsId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

export const saveeditFleets = (fletsData) => {
    console.log(fletsData);

    return fetch(`${API}/fleets/editfleetsave`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(fletsData)
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}


export const deleteFleet = (fletsData) => {
    return fetch(`${API}/fleets/deletefleetsave/${fletsData}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}