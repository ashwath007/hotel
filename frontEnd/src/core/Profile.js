import React,{useEffect,useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import { API } from '../backend'



import UserBase from '../user/UserBase'
import { getUser } from './helper/profileHelper'
import MenuBar from './MenuBar'

export default function Profile() { 
    const signoutLink = API + "/api/signout"
    const userId = isAutheticated().user._id;
    const token = isAutheticated().token;
    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [isRedirect,setisRedirect] = useState(false)
    const signoutUser = () => {
        console.log("************signoutprofile************");
       
                setisRedirect(true,()=>{
                    console.log("************signoutprofile************",isRedirect);
                    console.log("************setisredirect************",isRedirect);
            
            
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

        console.log("************isRedirectHomeE************");
        console.log("************isRedirectHomeE************",{isRedirect});

        if(isRedirect){
        localStorage.clear();

            console.log("************USER SIGNINGOUT HERE************");
          return <Redirect to="/"/>
        }
      }
    useEffect(() => {
        getUser(userId,token).then((res)=>{
                    console.log(res);
                    setname(res.name)
                    setphone(res.phone)
                    setaddress(res.address)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])
    return (
        <div>
            <UserBase/>
            <div className="container mt-5">
                <h6>{name}</h6>
                <h6>{phone}</h6>
                <div className="alert alert-secondary mt-4" role="alert">
  {address}
</div>
            </div>
            {isRedirectHome()}

            <div className="container">
            <button className="btn btn-block btn-rounded btn-warning">
                    Edit
            </button>
            </div>
           
            <div className="container mt-5">
    
                <button onClick={signoutUser} className="btn btn-block btn-info">
                        Signout
                    </button>
               
                    
            </div>
            <MenuBar/>
        </div>
    )
}
