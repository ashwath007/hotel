import React,{useEffect,useState} from 'react'
import "./FleetHome.css"
import { Link, Redirect } from "react-router-dom";

import {getMyOrders,getFleetsId} from "./help/fleethlepauth"
export default function FleetHome() {
    const [Fid, setFid] = useState("")
    const FID = getFleetsId()
    const loadFid = () => {
        
    }
    useEffect(() => {
        getMyOrders(FID).then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    return (
        
        <div>
            <div className="text-center mt-5">
            <h4>Now Order</h4>
            <div>
            </div>

            </div>
            <div>

            </div>
            <div className="fixed-bottom text-center">
                <hr/>
            <div className="row pt-4 pb-4">
                <div className="col-6">
                <button className="btn now">
                    Now
                </button>
                </div>
                <div className="col-6">
                <button className="btn profile">
                    Profile
                </button>
                </div>
            </div>
            </div>

        </div>
    )
}
