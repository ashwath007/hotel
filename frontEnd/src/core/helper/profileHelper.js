import { API } from "../../backend"


export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(reponse => {
            return reponse.json();
        })
        .catch(err => console.log(err));
}