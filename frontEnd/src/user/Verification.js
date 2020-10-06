import React,{useState} from 'react'
import "./Verification.css"
import verifylogo from "./src/card@2x.png"
import { verifyCode,authenticate } from './helper/userapicalls'
import { Redirect } from 'react-router-dom'


export default function Verification({match}) {

    const [code, setcode] = useState("")
    const [values, setValues] = useState({
        error: "",
        loading: false,
        didRedirect: false
      });
    const onChangeHandler =  event => {
        setcode(event.target.value)
    }
    const {didRedirect} = values
    const performRedirect = () => {
      if (didRedirect) {
        return <Redirect to="/loc" />;

        // if (isAutheticated()) {
        //   return <Redirect to="/" />;
        // }
        // if (user && user.role === 0) {
        // } else {
        //   return <Redirect to="/user/dashboard" />;
        // }
        
      }
     
    };
    console.log(match.params.uId);
    const onSubmit = event => {
            event.preventDefault();
            const UID = match.params.uId
            verifyCode({UID,code}).then(data => {
                if(data.error){
                    console.log(data.error);
                 setValues({ ...values, error: data.error, loading: false });

                }
                else{
                        console.log(data);
                        authenticate(data, () => {
                            setValues({
                              ...values,
                              didRedirect: true
                            });
                          });
                }
            })

    }
    return (
        <div>
<div className="verifi">
  {performRedirect()}
            <div className="container cardverify">
            <div class="shadow mt-5 card cardverify">
  <div class="card-body verifytxt">
      <p><strong>We will send a verification code to your phone number</strong></p>

  </div>
</div>
            </div>
        </div>
        <div className="container mt-5">
        <img src={verifylogo} class="rounded mx-auto d-block cardbox"/>
        </div>
<div className="container mt-5">
<form >
  <div class="form-group">
    <label style={{color:"#ffffff"}}>Enter Code</label>
    <input required onChange={e => onChangeHandler(e)} type="text" class="form-control" placeholder="Enter the code"/>
  </div>
  
  <button onClick={onSubmit} type="submit" class="btn btn-warning btn-block rounded">Verify</button>
</form>
</div>
        
        </div>
        
    )
}
 