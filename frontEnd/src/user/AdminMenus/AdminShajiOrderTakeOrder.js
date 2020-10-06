import React,{useEffect,useState} from 'react'
import UserBase from '../UserBase';
import AdminShajiDash from './AdminShajiDash';
import { getUserDataFromOrder } from './help/AddCategory'
import "./AdminShajiOrderTakeOrder.css"
import { Link } from 'react-router-dom';
export default function AdminShajiOrderTakeOrder({match}) {
    const [user, setuser] = useState("");
    const [userphone, setuserphone] = useState("");
    const [userloc, setuserloc] = useState("");
    const [total, settotal] = useState("");
    const [status, setstatus] = useState("");

    const [productName, setproductName] = useState([]);
    const [productQty, setproductQty] = useState([]);
    const [productRate, setproductRate] = useState([]);

    const perLoadUserOrders = () => {
            
    }
    const cooking = () => {

    }
    const done = () => {
        
    }  
    const delivery = () => {
        
    }
    const onLoad = (userId) => {
        getUserDataFromOrder(userId).then(data => {
            if(data.error){
                console.log(data.error);
            }
            console.log(data.order);
            console.log(data.user);
            console.log("USER {{{ ",data.order.userid);

            setuser(data.user.name);
            setuserphone(data.user.phone);
            setuserloc(data.user.address);
            settotal(data.order.total);
            setstatus(data.order.orderstatus);
            setproductName(data.order.productname);
            setproductQty(data.order.productqty);
            setproductRate(data.order.productprice);
        })
    }
    useEffect(() => {
        onLoad(match.params.userId)
    }, [])
    return (
        <AdminShajiDash>
        <div className="fromtop mt-5 container">
       

       

     
            <div class="alert alert-success" role="alert">
  <h4 className="alert-heading fromtop">Take Order</h4>
  <p>{user}</p>
  
  <p>{userphone}</p>
  <hr/>
</div>
   
    <div class="alert alert-success" role="alert">
  Delivery <strong>{userloc}</strong>
</div>
<button className="btn btn-block btn-info mt-2 mb-3">View Map</button>
    <div class="alert alert-dark" role="alert">
  Order Status :  <strong>{status}</strong>
</div>
    {Object.keys(productRate).map((pro,ind)=>{
        return(

            <div key={ind} className="container card">
                <div className="row">
                    <div className="col-4">
                    <p>Item</p>
                    <hr/>
                    {productName[ind].map((X,I)=>{
                    return (
                        <div key={I}>
                            <h6>{X}</h6>
                            </div>
                    )
                })}
                    </div>
                    <div className="col-4">
                    <p>Qty</p>
                    <hr/>

                    {productQty[ind].map((X,I)=>{
                    return (
                        <div key={I}>
                            <h6>{X}</h6>
                            </div>
                    )
                })}
                    </div>
                    <div className="col-4">
                        <p>Rate</p>
                    <hr/>

                    {productRate[ind].map((X,I)=>{
                    return (
                        <div key={I}>
                            <h6>&#x20B9;{X}</h6>
                            </div>
                    )
                })}
                    </div>
                </div>
            
               <div className="card cen">
            <h3>&#x20B9;{total}</h3>
               </div>
               
    </div>
        )
     
    })}
    <div className="mt-5 cen">
        <h5>Update Status</h5>
       
        <button onClick={cooking} className="btn btn-info btn-block rounded">
                    Cooking
                </button>
   <br/> 
              <Link>
              <button className="btn btn-danger btn-block rounded">
                    Done
                </button>
   <br/> 
              </Link>
                <Link>
                <button className="btn btn-success btn-block rounded">
                    Delivery
                </button>
                </Link>
   <br/> 
                
    </div>
        </div>
        </AdminShajiDash>
    )
}
