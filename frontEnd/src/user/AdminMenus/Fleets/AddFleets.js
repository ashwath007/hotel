import React,{useState} from 'react'
import "./AddFleets.css"
import deli from "../src/deli.png"
import { Link, Redirect } from 'react-router-dom';

import {addFleet} from "../fleethelp/fleetapi"
export default function AddFleets() {
    const [value,setValue] =useState({
        name:"",
        phone:""
    })
    const [redirect, setredirect] = useState(false)
    const {name,phone} = value
    const onDataHandler = name => event => {
        setValue({...value,[name]:event.target.value})
    }
    const onAddDelivery = event => {
        event.preventDefault()
        addFleet({name,phone}).then(res => {
            console.log(res);   
        setValue({name:"",phone:""})
        setredirect(true)

        })
        .catch(err => {
            console.log(err);
        })

    }
    const redirecttoHome = () => {
        if(redirect){
            return <Redirect to="/admin/shaji/dashboard/menu"/>
        }
    }
    return (
        <div>
            <div className="addftxt container text-center addfleetstxt">
            <h3>Add Fleets</h3>
            <hr/>
            </div>
            {redirecttoHome()}
            <div className="container mt-5">
            <div class="media">
  <div class="media-body">
    <h5 class="mt-0 mb-5">Add Delivery Here</h5>
    Note that when you add the delivery boy,  you should povide his/her phone number {name} {phone}
    <div className="mt-3">
        <div className="row">
            <div className="col-7">
            <form>
  <div class="form-group mt-5">
    <label for="exampleInputEmail1">Name of Delivery Person</label>
    <input onChange={onDataHandler("name")} type="text" class="form-control"/>
    <small id="emailHelp" class="form-text text-muted">Please enter the current phone number</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Phone</label>
    <input onChange={onDataHandler("phone")} type="number" class="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button onClick={onAddDelivery} type="submit" class="btn btn-primary">Submit</button>
</form>
            </div>
            <div className="col-5">
            <img src={deli} class="img-fluid" alt="Responsive image"/>
            </div>
        </div>
    </div>
    <div class="media mt-3">
      <a class="mr-3" href="#">
      </a>
      <div class="media-body">
        <h5 class="mt-0">Media heading</h5>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </div>
    </div>
  </div>
</div>
            </div>
        </div>
    )
}
