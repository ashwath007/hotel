import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper";
import UserBase from "./UserBase";

const Signin = () => {
  const [values, setValues] = useState({
    phone:"",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { phone, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ phone })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      // if (isAutheticated()) {
      //   return <Redirect to="/" />;
      // }
      if (user && user.role === 0) {
        return <Redirect to="/" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
      
    }
   
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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
            <Link to="/signup">
            <button className="btn btn-info btn-block">
              Signup
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div>
   <UserBase/>
 {performRedirect()}
 {errorMessage()}
 {loadingMessage()}
    <div className="container mt-5">
    <form className="mt-5">
  <div class="form-group">
    <label for="exampleInputEmail1">Phone</label>
    <input onChange={handleChange("phone")} placeholder="Enter the phone number" type="number" class="form-control"/>
  </div>
  
  <button type="submit" onClick={onSubmit} class="btn btn-primary btn-block rounded">Submit</button>
</form>
    </div>
    <div className="container mt-5">
    
      <div className="text-center mt-5">
        <hr/>
    <p>If you are new here, please signup</p>
    <Link to="/signup">
    <button className="btn btn-info rounded">
        Signup
      </button>
    </Link>
     
      </div>
    </div>
    </div>
  );
};

export default Signin;
