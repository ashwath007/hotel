import React from 'react'
import adminlogo from "../src/alogo@2x.png"
import "./MenuBase.css"
const MenuBase = ({
   
    children
}) =>  {
    return (
        <div className="back">
        
<nav className="navbar navbar-light bg-white shadow-lg">
  <a className="navbar-brand" href="#">
    <img src={adminlogo} width="40" height="40" alt="" loading="lazy"/>
  </a>
</nav>
<div className="adminmenu text-white fixed-top">


        <div className="container">
          
        </div>
</div>
<div className="menucenter">
{children}

</div>
        </div>
    )
}
export default MenuBase;