import React from 'react'
import adminlogo from "../src/alogo@2x.png"
import "./AdminShajiDash.css"
const AdminShajiDash = ({
   
    children
}) =>  {
    return (
        <div className="back">
        
<nav className="navbar navbar-light bg-white shadow-lg fixed-top">
  <a className="navbar-brand" href="#">
    <img src={adminlogo} width="40" height="40" alt="" loading="lazy"/>
  </a>
</nav>
<div className="adminmenu text-white fixed-top">
<ul className="nav justify-content-center">
  <li className="nav-item">
    <a className="nav-link active text-white" href="/admin/shaji/dashboard/menu">Menu</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-white" href="/admin/shaji/dashboard/orders">Orders</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-white" href="#">Order Manage</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-white" href="#">Delivery</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-white" href="#">Account</a>
  </li>  <li className="nav-item">
    <a className="nav-link text-white" href="#">Manage Business</a>
  </li>
</ul>

        <div className="container">
          
        </div>
</div>
<div className="menucenter">
{children}

</div>
        </div>
    )
}
export default AdminShajiDash;