import React,{useEffect,useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import { API } from '../backend'
// import "./Profile.css"
import Map from "mapmyindia-react";


import UserBase from '../user/UserBase'
import { getUser } from './helper/profileHelper'
import MenuBar from './MenuBar'

export default function Profile() { 
    const signoutLink = API + "/api/signout";
    const userId = isAutheticated().user._id;
    const token = isAutheticated().token;
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [isRedirect,setisRedirect] = useState(false);
    const [latitude,setLatitude] = useState("");
    const [longitude,setLongitude] = useState("");

    const signoutUser = () => {
  
       
                setisRedirect(true,()=>{
                   
            
            
                })

        //
  
        // return <Redirect to="/"/>
    }
    const redirectHome = () => {
        if(isRedirect){
           return <Redirect to="/"/>
        }
    }
    const isRedirectHome = () =>{

       

        if(isRedirect){
        localStorage.clear();

          return <Redirect to="/"/>
        }
      }
    useEffect(() => {
        getUser(userId,token).then((res)=>{
                    setLatitude(res.location.coordinates[0])
                    setLongitude(res.location.coordinates[1])

                    setname(res.name)
                    setphone(res.phone)
                    setaddress(res.address)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])
    const userMap = () => {
        if(latitude!="" && longitude!=""){
            return(
                <div >
                     <Map width="100%" height="150px"
        markers={[
          {
            position: [latitude, longitude],
            draggable: true,
            title: name,
            onClick: e => {
              console.log("clicked ");
            },
            onDragend: e => {
              console.log("dragged");
            }
          }
        ]}
        center={[latitude,longitude]}
      />
                </div>
            )
        }
    }
    return (
        <div>
            <UserBase/>
            {/* <div className="shadebox text-center mb-5"> */}
          {/* {userMap()} */}
                {/* </div> */}
            <div className="container mt-5 text-center">
                
                <h6>{name}</h6>
                <h6>{phone}</h6>
                <div className="card pt-2 pb-2 pr-2 pl-2 mb-4 mt-2 text-left addcardbox shadow-lg" role="alert">
  {address}
</div>
            </div>
            {isRedirectHome()}

            <div className="container mb-1">
                <Link to="profileedit">
                <button className="btn btn-block btn-rounded btn-warning">
                    Edit
            </button>
                </Link>

            
            </div>
           
            <div className="container mb-5">
    
                <button onClick={signoutUser} className="btn btn-block btn-info">
                        Signout
                    </button>
               
                    
            </div>
            <div className="container mb-5">
            <div className="card">
            <div class="alert alert-light" role="alert">
              <div className="text-center">
          <p><strong>Terms & Conditions</strong> </p>
              </div>
  <p>These terms of use (the "Terms of Use") govern your use of our website www.swiggy.com (the "Website") and our "Swiggy" application for mobile and handheld devices (the "App"). The Website and the App are jointly referred to as the "Platform". Please read these Terms of Use carefully before you use the services. If you do not agree to these Terms of Use, you may not use the services on the Platform, and we request you to uninstall the App. By installing, downloading or even merely using the Platform, you shall be contracting with Swiggy and you signify your acceptance to this Terms of Use and other Swiggy policies (including but not limited to the Cancellation & Refund Policy, Privacy Policy and Take Down Policy) as posted on the Platform and amended from time to time, which takes effect on the date on which you download, install or use the Platform, and create a legally binding arrangement to abide by the same.</p>
</div>
            </div>
            </div>
            
            <MenuBar/>
        </div>
    )
}
