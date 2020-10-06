import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
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

    useEffect(() => {
        getUser(userId,token).then((res)=>{
                    console.log(res);
                    setname(res.name)
                    setphone(res.phone)
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

            </div>
            <div className="container mt-5">
                <Link to={signoutLink}>
                <button className="btn btn-block btn-info">
                        Signout
                    </button>
                </Link>
                    
            </div>
            <MenuBar/>
        </div>
    )
}
