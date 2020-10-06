import React from 'react'
import { Link } from 'react-router-dom'
import "./MenuBar.css"
import { FaHome ,FaUser} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
export default function MenuBar({

}) {
    return (
        <div>
                <div className="fixed-bottom">
                    <div className="card pt-2 mx-auto shadow-lg">
                        <div className="row menuboxs">
                            <div className="col-4">
                                    <Link to="/">
                         
                                        <FaHome color="#3C40C6" size="20px"/>
                                        <p className="menutxt">Home</p>

                                       
                                    </Link>
                            </div>
                            <div className="col-4">
                            <Link to="/order">
                         
                         <MdRestaurantMenu color="#3C40C6" size="20px"/>
                         <p className="menutxt">Order</p>
                         
                     </Link>
                            </div>
                            <div className="col-4">
                            <Link to="/profile">
                         
                         <FaUser color="#3C40C6" size="18px"/>
                         <p className="menutxt">Profile</p>
                         
                     </Link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
