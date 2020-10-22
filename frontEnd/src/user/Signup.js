import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../auth/helper";
import { v4 as uuidv4 } from 'uuid';
import UserBase from "./UserBase";
import "./auth.css"
import "./UserBase.css"
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    error: "",
    uid:"",
    location:"",
    isRedirect:false,
    userAlready:false,
    success: false,
    loading:false
  });
  const [code, setcode] = useState("")
  const { name, phone, error, success ,loading,location,isRedirect,uid,userAlready} = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onRedirected = () => {
    if(isRedirect){
      const Path = "/verification/"+uid
      return <Redirect to={Path}/>
    }
  }

  const alredyAUser = () =>{

    if(userAlready){
      return <Redirect/>
    }
  }
  const showLoading = () => {
    if(loading){
      return(
        <div class="spinner-border text-primary spin" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      )
    
    }
  }
  const onSubmit = event => {
    const CODE = uuidv4().substr(1, 4);
    setcode(CODE)
    console.log("CODE : ",code);

    event.preventDefault();
    setValues({ ...values, error: false,code:CODE,loading:true });
    signup({ name, phone,code })
      .then(data => {
        if (data.error) { 
          setValues({ ...values, error: data.error, success: false });
        } else {
          console.log(data);
          if(data.userAlready){
              setValues({
                ...values,
                userAlready:true,
                loading:false
              })
          }
          console.log("user Id : ",data.id);

          setValues({
            ...values,
            name: "",
            phone: "",
            error: "",
            uid:data.id,
            isRedirect:true,
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
             <Link to="/signin">Login Here</Link> 
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="userbase">
      {successMessage()}
      {onRedirected()}
    <UserBase/>
      <div className="mt-5">
        <div className="container mt-5">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input onChange={handleChange("name")} type="text" class="form-control"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Phone</label>
    <input onChange={handleChange("phone")} type="number" class="form-control"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Confirm Location</label>
    <select onChange={handleChange("location")} class="form-control" id="exampleFormControlSelect1">
      <option>Near Pollachi Main Road, Malumichampatty, Coimbatore, Tamil Nadu 641050</option>
      <option>Near Chettipalayam Rd, Guruvayur Nagar, Malumichampatti, Tamil Nadu 641050</option>
      <option>Near Chettipalayam Rd, Guruvayur Nagar, Malumichampatti, Tamil Nadu 641050</option>
      <option>No Near Malumichampatti</option>
    </select>
  </div>
  <div>
    
  <button type="submit" onClick={onSubmit} class="btn btn-warning btn-block rounded">Submit</button>
  <p className="alreadyuser mt-4"><small>If use are already a user, please sigin below</small> </p>
  <div className="signinbtn">
    <Link to="/signin">

    <button className="btn btn-info rounded">
      Signin
    </button> 
    </Link><br/>
    {showLoading()}
 
  </div>
    
  </div>
</form>
        </div>
      
      </div>
  
    </div>
  );
};

export default Signup;
