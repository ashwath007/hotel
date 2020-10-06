import React,{useState} from 'react'
import { Redirect } from 'react-router-dom';
import Base from '../core/Base';
import { signPasscode ,adminauthenticate} from './helper/adminentryapi';
const AdminHome = () => {

    const [values, setValues] = useState({
        passcode:"",
        error:"",
        role:1,
        isRedireact:false
    })
    const onHandler = name => event => {
        setValues({...values,[name]:event.target.value})
    }
    const {passcode,error,isRedireact,role} = values
    const onSubmit = event => {
    event.preventDefault();

        signPasscode({passcode,isRedireact,role}).then(res => {
            console.log(res)
            if(res.error){
                setValues({...values,error:res.error})
            }
            else{
                adminauthenticate(res, ()=>{
                    setValues({
                        ...values,
                        error:"",
                        isRedireact:true
                    })
                })
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    }
    const isAdminHome = () => {

        if(isRedireact){
           return <Redirect to="/admin/shaji/dashboard"/>
        }
    }
    return (
        <Base title="Shaji Admin" description="Here you can create menu and update">
            <h1 className="text-white">{passcode}</h1>
            {isAdminHome()}
            <div className="container">
      <form action="" className="">
      <div className="form-group">
    <label className="text-white">Passcode</label>
    <input type="password" onChange={onHandler("passcode")} className="form-control" placeholder="Enter the correct passcode"/>
    <br/>
    <button className="btn btn-info btn-block rounded" onClick={onSubmit}>
      Enter
    </button>
  </div>

      </form>
    </div>
        
        </Base>
    )
}
export default AdminHome;