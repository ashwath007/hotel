import React,{useState} from 'react'
import UserBase from "./UserBase";
import { Link, Redirect } from "react-router-dom";

import Map from "mapmyindia-react";
import "./UserBase.css"
import {getUserAddress} from "./helper/lochelper"
import {saveLocation } from "./helper/userapicalls"
import { isAutheticated } from "../auth/helper/index";
export default function SignupLoc() {
    const userId = isAutheticated().user._id;
    const token = isAutheticated().token;
    const onLoadMap = () => {
      if(latitude =="" && longitude=="")
        return(
            <Map
        markers={[
          {
            position: [10.9006464, 76.996596],
            draggable: true,
            title: "Shaji Dhaba",
            onClick: e => {
              console.log("clicked ");
            },
            onDragend: e => {
              console.log("dragged");
            }
          }
        ]}
      />
        )
    }
    const onLoadMapUserLoc = () => {
      if(latitude && longitude)
        return(
            <Map
        markers={[
          {
            position: [latitude, longitude],
            zoomControl: true,
            draggable: true,
            title: "Your Location",
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
    const [latitude,setLatitude] = useState("");
    const [longitude,setLongitude] = useState("");
  
    const [ulocation, setulocation] = useState("");
    const [isredirect, setisredirectn] = useState(false);

    const getGLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates,handleLocationError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
    const getCoordinates = (position) => {
      console.log(position.coords.latitude)
      setLatitude(position.coords.latitude)
      console.log(position.coords.longitude)
      setLongitude(position.coords.longitude)
  
    }
    const handleLocationError  =(error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.")
          break;
          default:
            alert("An unknown error accurder type ur address manually");
      }
    }
    const shoemap  = () => {
      if(latitude && longitude){
        const loc = {"latitude":latitude,"longitude":longitude}
        getUserAddress(loc).then(res => {
          console.log("DATA _> ",res);
          // setValues({...values,location:res.loc})
          setulocation(res.loc)
        })
        .catch(err => {
          // console.log(err);
        })
    }
    }



















    const onSubmit = (event) => {
    
    event.preventDefault();

        saveLocation({userId,latitude,longitude,ulocation}).then(res => {
            console.log(res);
            setisredirectn(true)
        })
        .catch(err => {
            console.log(err);

        })
    }

const moveToHome = () => {
  if(isredirect){
    return <Redirect to="/"/>
  }
}




    
    const changeLocHandler = (event) => {

    }
    return (
        <div className="mb-5">
            <UserBase/>
      <div>
      {shoemap()}
        <div className="container mt-5">
            <div>
  <button type="submit" onClick={getGLocation} className="btn btn-info btn-block rounded">Get My Location</button>

            </div>
        <form>
  
  {onLoadMap()}
  {onLoadMapUserLoc()}
  {moveToHome()}
  <div className="form-group mt-4">
    <label for="exampleFormControlSelect1">Confirm Location</label>
    <input  type="text" value={ulocation} className="form-control" id="exampleFormControlSelect1"/>
    
  </div>
  <div>
    
  <button type="submit" onClick={onSubmit} className="btn btn-warning btn-block rounded">Set Location</button>
  <p className="alreadyuser mt-4"><small>If use are near coimbatore, sorry we are not providing service</small> </p>
  <div className="signinbtn">
    <Link to="/signin">

    <button className="btn btn-info rounded">
      Exit
    </button> 
    </Link>
 
  </div>
    
  </div>
</form>
<div></div>
</div>
</div></div>
        
    )
}
