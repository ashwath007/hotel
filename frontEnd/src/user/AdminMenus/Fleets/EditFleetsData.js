import React,{useEffect,useState} from 'react'
import {loadeditFleets,saveeditFleets} from "../fleethelp/fleetapi"
import { Link,Redirect } from 'react-router-dom';

export default function EditFleetsData({match}) {

    const [values,setValues] = useState({
        name:"",
        phone:"",
        code:"",
        fleetId:"",
        redirect:false
    })
    const {name,phone,code,redirect} = values
    useEffect(() => {
        onLoad(match.params.fleetId);
      }, []);
      const onLoad = (fleetId) =>{
        loadeditFleets(fleetId).then(res => {
            console.log(res);
            setValues({...values,name:res.name,phone:res.phone,code:res.fid,fleetId:res._id})

        })
        .catch(err => {
            console.log(err)
        })
      }
      const onEditHandler =name => event => {
        setValues({...values,[name]:event.target.value})
   
      }
      const isReloaded = () => {
          if(redirect){
              return <Redirect to="/admin/shaji/dashboard/menu"/>
          }
      }
      const onSubmit = (event) => {
        //   event.preventDefault();
        event.preventDefault();

        saveeditFleets(values).then(res =>{
            console.log(res)
            setValues({...values,redirect:true})
            
        })
        .catch(err => {
            console.log(err)
        })
      }
    return (
        <div>
            <div className="text-center">
                <h3 className="mt-5">
                    Fleets Edit 
                </h3>
                <hr/>
                <div className="mt-5">
                <form className="container text-left">
  <div className="form-group">
      {isReloaded()}
    <label for="exampleInputEmail1">Delivery Boy name</label>
    <input type="text" onChange={onEditHandler("name")} value={name} className="form-control" />
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Code</label>
    <input type="text" onChange={onEditHandler("code")} value={code} className="form-control"/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Phone Number</label>
    <input type="text" onChange={onEditHandler("phone")} value={phone} className="form-control"/>
  </div>
  <button onClick={onSubmit} type="submit" className="btn btn-primary">Submit</button>
</form>
                </div>
            </div>
        </div>
    )
}
