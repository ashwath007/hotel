import React,{useState} from 'react'
import adminlogo from "../src/alogo@2x.png"
import "./MenuBase.css"
const MenuBase = ({
  product,
  addtoCart = true,
  removeFromCart = false,
    children
}) =>  {
  const [redirect, setRedirect] = useState(false);
  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";
    return (
 <div className="row">
   
   <div className="col">{cartTitle}</div>
    <div className="col">{cartDescrption}</div>

 </div>



      
    )
}
export default MenuBase;