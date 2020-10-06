import React from 'react'
import adminlogo from "./src/alogo@2x.png"
import "./UserBase.css"
const UserBase = ({
    chidren
}) => {
    return (
        <div className="userbase">
            <nav className="navbar navbar-light bg-white shadow-lg">
  <a className="navbar-brand" href="#">
    <img src={adminlogo} width="40" height="40" alt="" loading="lazy"/>
  </a>
</nav>

<div className="container">
    {chidren}
</div>
        </div>
    )
}

export default UserBase;