import { API } from "../../../backend"


export const createCategory = category => {
    return fetch(`${API}/admin/create/category`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category)
        }).then(response => {
            return response.json();
        })
        .catch(err => console.log(err));

}

export const getallCategory = () => {
    return fetch(`${API}/admin/show/category`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(response => {
            return response.json();
        })
        .catch(err => console.log(err));

}

export const getaCategory = (cateId) => {
    return fetch(`${API}/category/${cateId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(response => {
            return response.json();
        })
        .catch(err => console.log(err));

}
export const deleteCategory = (cateId) => {
    return fetch(`${API}/category/delete/${cateId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",

            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateCategory = (cateId, category) => {
    console.log("updateCategory");

    return fetch(`${API}/category/${cateId}/update`, { ///category/:categoryId/update
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category)

        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// export const createaProduct = (product) => {
//     console.log(product)
//     return fetch(`${API}/admin/product/create`, { //admin/product/create
//             method: "POST",
//             headers: {
//                 Accept: "application/json",

//             },
//             body: product
//         })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };

export const createaProduct = (product) => {
    return fetch(`${API}/product/create`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: product
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getProducts = () => {
    return fetch(`${API}/products`, { method: "GET" })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteaProduct = (productId) => {
    return fetch(`${API}/product/${productId}/admin`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",

            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getOrdersAdminAll = () => {
    return fetch(`${API}/order/admin/allusers`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }


        )
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getUserOrderTakeOrder = (req, res) => {
    return fetch(`${API}/order/admin/allusers`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }


        )
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


//Here we are taking user data order status 
export const getUserDataFromOrder = (orderId) => {
    return fetch(`${API}/order/admin/userdata/order/${orderId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}