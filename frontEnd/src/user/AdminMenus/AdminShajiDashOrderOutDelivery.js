import React,{useEffect,useState} from 'react'
import Map from "mapmyindia-react";
import { Link,Redirect } from 'react-router-dom';

import "./AdminShajiDashOrderOutDelivery.css"
import {loadOrderAndUserdata,assignorderToUser} from "./help/orderstatushelper"
export default function AdminShajiDashOrderOutDelivery({match}) {
    const [orders, setorders] = useState([])
    const [fleets, setfleets] = useState([])
    const [redirect, setredirect] = useState(false)
    const [value,setValue] = useState({
        name:"",
        phone:"",
        address:"",
        location:[],
        latitude:"",
        longitude:"",
        userId:""

    })
    const isRedirected = () => {
        if(redirect){
            return <Redirect to="/admin/shaji/dashboard/menu"/>
        }
    }
    const {name,phone,address,location,longitude,latitude,userId} = value;
    const onLoad = (orderId) => {
        loadOrderAndUserdata(orderId).then(res => {
            console.log(res)
            console.log(res.fleets)
            setorders(res.order)
            setfleets(res.fleets)
            setValue({...value,name:res.userdata.name,phone:res.userdata.phone,address:res.userdata.address,location:res.userdata.location.coordinates,latitude:res.userdata.location.coordinates[0],longitude:res.userdata.location.coordinates[1],userId:res.userdata._id})
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        onLoad(match.params.orderId)
    }, [])
    const showUserMap = () => {
        if(longitude && latitude){
            return(
                <Map
            markers={[
              {
                position: [latitude, longitude],

                draggable: true,
                title: "User Location",
                onClick: e => {
                  console.log("clicked ");
                },
                onDragend: e => {
                  console.log("dragged");
                }
              }
            ]}
        center={[latitude, longitude]}

          />
            )
        }
    }
  
    const userDatails = () => {
        if(name && phone && address){
            return (
                <div>
                    <div className="alert alert-danger" role="alert">
  <h6>{name}</h6>
            <p>{phone}</p>
            <div className="alert alert-light text-left">
            <p>
                <strong>Address : </strong>
                {address}
            

            </p>
            
</div>
</div>
                </div>
            )
        }
    }
    const assignOrder = (orderId,fleetsId) => {
        assignorderToUser(orderId,fleetsId).then(res => {
            console.log(res)
            if(res.error){
                console.log(res.error)
            }
            setredirect(true)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <div className="mt-5 text-center">
            <h3>Delivery order</h3>
            <Link to={`/admin/shaji/dashboard/orders`}>
                <button className="btn btn-warning">
            Back
                </button>
            </Link>
            <div className="container delpick">
{userDatails()}
{Object.keys(fleets).map((F,I)=>{
                        return(
                            <div className="mb-4 text-left">
                                <div className="card">
                                    {isRedirected()}
                                    <div className="p-3 pb-1 pr-3 pl-3">
                                    <p>
                                Name: {fleets[F].name}
                                </p>
                                <p>
                                Phone: {fleets[F].phone}
                                </p>
                                        </div>
                                <div className="text-right">
                                   
                                    <button onClick={()=>{assignOrder(match.params.orderId,fleets[F]._id)}} className="btn btn-info">
                                        Assign to {fleets[F].name}
                                    </button>
                            
                                   
                                    </div>
                                    </div>
                               
    
      
   
                         </div>

                        )
                    })}
{showUserMap()}
            </div>
            </div>
        </div>
    )
}
