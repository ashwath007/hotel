import { API } from "../../backend";


export const verifyCode = smscode => {
    console.log("SMS Code : ", smscode);
    return fetch(`${API}/user/verify/sms`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(smscode)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => { console.log(err) });
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

// export const saveLocation = (usedata) => {
//     // if (typeof window == "undefined") {
//     //     return false;
//     // }
//     // if (localStorage.getItem("jwt")) {
//     //     return JSON.parse(localStorage.getItem("jwt"));
//     // } else {
//     //     return false;
//     // }
//     console.log(usedata);
//     console.log(typeof(usedata));

//     // const USER_ID = usedata.userId._id;
//     // const USER_ADD = usedata.ulocation;
//     // const loc = usedata.loc;
//     // const lat = usedata.loc.latitude;
//     // const long = usedata.loc.longitude;

//     // console.log(USER_ID, USER_ADD, loc);
//     return fetch(`${API}/loc/user/save/address`, {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",

//             },
//             body: JSON.stringify(usedata)
//         })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => { console.log(err) });

// };



export const saveLocation = user => {
    return fetch(`${API}/loc/user/save/address`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//http://localhost:8000/api/loc/user/5f7ac6b77484b826d0766e91/loc/lat/10.904488/long/76.9978105/save/address/Prakash%20Complex,%20Pollachi%20Road,%20Malumichampatti,%20Tamil%20Nadu.%2036%20m%20from%20Sai%20Auto%20Electricals%20pin-641050%20(India)


export const getAllDataOfUser = user => {
    return fetch(`${API}/user/alldatas/all`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};