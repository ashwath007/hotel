import React,{useState} from 'react'
import {fleetSignup} from "./help/fleethlepauth"
import BOY from "../src/boy.png"
import "./FleetsMenu.css"
import { Link, Redirect } from 'react-router-dom';

export default function FleetsDignin() {
    const [value,setValue] =useState({
        code:"",
        phone:""
    })
    const {code,phone} = value

    const [redirect, setredirect] = useState(false)
    const onDataHandler = name => event => {
        setValue({...value,[name]:event.target.value})
    }
    const auth = event => {
        event.preventDefault()
        fleetSignup({code,phone}).then(res => {
            console.log(res);  
            if(res.done){
                localStorage.setItem("fleets",res.done._id);
                setValue({code:"",phone:""})
                setredirect(true)
            } 
            if(res.err){
                return(
                    <div class="alert alert-secondary" role="alert">
                        {res.err}
</div>
                )
            }
           

        })
        .catch(err => {
            console.log(err);
        })

    }
    const redirecttoHome = () => {
        if(redirect){
            return <Redirect to="/fleets/allorders"/>
        }
    }
    return (
        <div>
            <div className="container">
            <div className="text-center htxt pt-5">
            <h4>Fleets Signup</h4>
            <br/>
            <hr/>
            <div className="text-left">
            <form>
                {redirecttoHome()}
  <div className="form-group">
    <label for="exampleInputEmail1">Phone</label>
    <input onChange={onDataHandler("phone")} type="email" className="form-control"/>
    <small id="emailHelp" className="form-text text-muted">Enter the correct phone number</small>
  </div>
  <div class="form-group">
    <label>Password</label>
    <input onChange={onDataHandler("code")} type="number" className="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button onClick={auth} type="submit" className="btn btn-primary">Submit</button>
</form>
            </div>
            </div>
            </div>
            
        </div>
    )
}
