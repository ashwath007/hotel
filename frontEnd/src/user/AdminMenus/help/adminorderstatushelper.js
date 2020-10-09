import { API } from "../../../backend";



export const nowCooking = (user) => {
    console.log(user);
    return fetch(`${API}/admin/nowcooking`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

export const nowDone = (user) => {
    console.log(user);
    return fetch(`${API}/admin/nowDone`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

export const nowDelivery = (user) => {
    console.log(user);
    return fetch(`${API}/admin/nowDelivery`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

export const nowDelivered = (user) => {
    console.log(user);
    return fetch(`${API}/admin/nowDelivered`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}