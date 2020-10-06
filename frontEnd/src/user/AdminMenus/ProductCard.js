import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
// import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const ProductCard = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f,
    //   function(f){return f}
    reload = undefined
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cartTitle = product ? product.name : "A photo from pexels";
    const cartDescrption = product ? product.description : "Default description";
    const cartPrice = product ? product.price : "DEFAULT";






    return ( <
        div className = "card text-white bg-dark border border-info " >
        <
        div className = "card-header lead" > { cartTitle } < /div> <
        div className = "card-body" > { getARedirect(redirect) } <
        ImageHelper product = { product }
        /> <
        p className = "lead bg-success font-weight-normal text-wrap" > { cartDescrption } <
        /p> <
        p className = "btn btn-success rounded  btn-sm px-4" > $ { cartPrice } < /p> <
        div className = "row" >
        <
        div className = "col-12" > { showAddToCart(addtoCart) } < /div> <
        div className = "col-12" > { showRemoveFromCart(removeFromCart) } < /div> <
        /div> <
        /div> <
        /div>
    );
};

export default ProductCard;