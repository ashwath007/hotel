import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import AdminShajiDash from './AdminShajiDash'
import { getOrdersAdminAll } from './help/AddCategory'
import "./AdminShajiDashOrders.css"
import { API } from '../../backend'
import { holdOrders,rejectOrder } from './help/orderstatushelper'

export default function AdminShajiDashOrders() {
    const [error, seterror] = useState(false)
    const [orders,setOrders] = useState([]);

    const [price,setPrice] = useState([]);
    const [total,setTotal] = useState([]);
    const [orderID,setorderID] = useState([]);

    const [userid,setUserid] = useState([]);
    const [username,setUsername] = useState([]);

    const [userphone,setUserphone] = useState([]);
    const [userloc,setUserloc] = useState([]);

    const [status,setstatus] = useState([]);

    const [qty,setQty] = useState([]);
    const errorHandler = () => {
        if(error){
            return(
                <div className="alert alert-danger" role="alert">
                Sorry Admin some error happened !!!
              </div>
            )
          
        }
    }
    useEffect(() => {
        setInterval(() => {
        allOrdersToday()
            
        }, 5000);
    }, [])

    // setTimeout(() => {
    //     allOrdersToday()
        
    // }, 23000);
    
    const allOrdersToday = () => {
        getOrdersAdminAll().then(res => {
            if(res.error){
                seterror(true)
                
            }
            console.log("Res",res.Pname);
            console.log("Res",res.Status);
            console.log("Res",res.Pprice);
            console.log("Res",res.Ptotal);
            
            console.log("Res Order : ID",res.orderId);
            setorderID(res.orderId)
            setstatus(res.Status)
            console.log("Res",typeof(res.Pname));
            setPrice(res.Pprice)
            setOrders(res.Pname)
            setQty(res.Pqty)
            setQty(res.Pqty)
            setTotal(res.Ptotal)
            console.log(res.User_Id);
            setUserid(res.User_Id)
            setUsername(res.USER_NAME)
            setUserphone(res.USER_PHONE)
            setUserloc(res.USER_LOCATION)
        })
    }
    const holdOrdersuser = (orderID) => {
        holdOrders(orderID).then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const rejectOrderuser = (orderID) => {
        rejectOrder(orderID).then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <AdminShajiDash>
            {errorHandler()}
            <div className="container ordertop">
            {Object.keys(orders).map((key,index)=>{
                if(total[index] && orders[index]){
                    return(
                        <div key={index} className="card pt-3 pb-3 pr-2 pl-2 mb-4">
                            <p>{index+1}</p>
                        <h6><strong>Item</strong> {orders[index+1]}</h6>
                    <h6><strong>Status</strong> {status[index+1]}</h6>
                    <h6>{price[index+1]}</h6>
                    <h6>{qty[index+1]}</h6>
                    <h5>TOTAL :{total[index]}</h5>
    

                    <div className="card cardback">
                    <div className="row">
                        <div className="col-4">
                            <Link to={`/admin/shaji/dashboard/orders/takeorder/${orderID[index]}`}>
                            <button className="btn btn-success">
                                Take Order
                            </button>
                            </Link>
                            
                        </div>
                        <div className="col-4">
                            {/* <Link to={`${API}/admin/shaji/dashboard/orders/holdorders/${orderID[index]}`}> */}
                            <button onClick={()=>{holdOrdersuser(orderID[index])}} className="btn btn-warning">
                                Hold Order
                            </button>
                            {/* </Link> */}
                         
                        </div>
                        <div className="col-4">
                            <button onClick={()=>{rejectOrderuser(orderID[index])}} className="btn btn-danger">
                                Reject Order
                            </button>
                        </div>
                    </div>
                </div>
                    </div>
                    )
                }
                
            })}
          
            </div>
        </AdminShajiDash>
    )
}
