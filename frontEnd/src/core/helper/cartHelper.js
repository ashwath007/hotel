const uuidv1 = require("uuid/v1");

export const addItemToCart = (item, next) => {
    let cart = [];
    let PRODUCTS = [];
    let total = 1;
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
            window.localStorage.removeItem('cart');
        }
        console.log(item);
        cart.map((P, I) => {
            if (P != null) {
                if (P.name === item.name) {
                    total = total + 1

                }
            }
        })


        cart.push({
            ...item,
            count: total,
            // uid: uuidv1()
        });


        localStorage.setItem("cart", JSON.stringify(cart));

        if (typeof window !== undefined) {
            if (localStorage.getItem(item.name)) {
                PRODUCTS = JSON.parse(localStorage.getItem(item.name));
            }
            PRODUCTS.map((P, I) => {
                if (P != null) {
                    if (P.name === item.name) {
                        total = total + 1
                    }
                }
            })
            PRODUCTS.push({
                ...item,
                count: total,
                // uid: uuidv1()
            });
            localStorage.setItem(item.name, JSON.stringify(PRODUCTS));
        }
        next();
    }
};

export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }

    }
};

export const removeItemFromCart = product => {
    let cart = [];
    let removeProduct = [];
    let Products = [];
    let rProducts = [];
    console.log("Product uid : ", product.name);
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
            console.log("Cart : ", cart);
        }


        cart.map((p, i) => {
            if (p != null) {
                if (p.name === product.name) {
                    // cart.splice(i, 1);

                    removeProduct.push(p)
                }
            }

        });
        console.log("REMOVE PRODUCT : ", removeProduct);

        cart.map((p, i) => {
            if (p != null) {
                if (p.name === product.name) {
                    console.log(p.name);
                    delete cart[i];

                    // removeProduct.push(p)
                }
            }

        });
        // cart.append(p)
        console.log("Updated List : ", cart);
        removeProduct.pop();
        console.log("Updated RemoveProduct : ", removeProduct);
        removeProduct.map((P, I) => {
            if (P != null) {
                cart.push(P);
            }
        })
        if (typeof window !== undefined) {
            if (localStorage.getItem(product.name)) {
                Products = JSON.parse(localStorage.getItem(product.name));
                console.log("Products : ", Products);
            }
            Products.map((P, I) => {
                if (P != null) {
                    rProducts.push(P);
                }
            })
            rProducts.pop();

            localStorage.setItem(product.name, JSON.stringify(rProducts));

        }
        console.log("Final cart   : ", cart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
};

export const loadCartBill = () => {
    let cart = [];
    let bill = [];
    if (typeof window !== undefined) {
        let cart = [];
        let TCOUNT = 0;
        let TOTAL_PRICE = 0;
        let curentProduct = [];
        if (typeof window !== undefined) {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((PRODUCT, INDEX) => {
                if (PRODUCT != null) {
                    curentProduct.push(PRODUCT.name)
                }
            })


            curentProduct = [...new Set(curentProduct)];
            console.log("curentProduct : ", curentProduct);
            return curentProduct
        }


    };

    // const loadCartBill = (bill) => {

}

export const calculateBill = (billitems) => {

    console.log("BILL  >>>: ", billitems);


    return billitems

}


export const findQty = (bills) => {
    let cart = [];
    console.log("totalPricez : ", bills);

    let TCOUNT = 0;
    let TOTAL_QTY = [];
    let curentProduct = [];
    if (typeof window !== undefined) {
        bills.map((PP, II) => {
            if (localStorage.getItem(PP)) {
                cart = JSON.parse(localStorage.getItem(PP));
            }
            TOTAL_QTY.push(cart.length)

        })

        console.log("TOTAL_QTY : ", TOTAL_QTY);
        return TOTAL_QTY

    }
}

export const getThat = (cartproducts) => {
    let cart = [];
    let Qty = [];
    const productList = cartproducts;
    if (typeof window !== undefined) {
        productList.map((P, I) => {
            if (localStorage.getItem(P)) {
                cart = JSON.parse(localStorage.getItem(P));
                Qty.push(cart.length)
            }
        })
        console.log("Qty : ", Qty);
        return Qty
    }


}