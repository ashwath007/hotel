import { API } from "../../backend"


export const signPasscode = admin => {
    console.log(API);
    return fetch(`${API}/admin/signinpass`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(admin)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
};

export const adminauthenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};