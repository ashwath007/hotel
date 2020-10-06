import React,{useState,useEffect} from 'react'
import { isAutheticated } from '../auth/helper'
import UserBase from '../user/UserBase'
import { getallUserOrder } from './helper/orderHelper'
import MenuBar from './MenuBar'

export default function Order() {
    const [userUId, setuserUId] = useState(0)
    const [orders,setOrders] = useState([]);
    const [name,setName] = useState([]);
    const [price,setPrice] = useState([]);
    const [total,setTotal] = useState([]);

    const [qty,setQty] = useState([]);
    const [status,setstatus] = useState([]);

    
    const loadUserOrders = userID =>{
        console.log(userID);
        getallUserOrder(userID,token).then((res)=>{
            console.log("Res",res.Pname);
            console.log("Res",res.Status);
            console.log("Res",res.Pprice);
            console.log("Res",res.Ptotal);

            
            setstatus(res.Status)
            console.log("Res",typeof(res.Pname));
            setPrice(res.Pprice)
            setOrders(res.Pname)
            setQty(res.Pqty)
            setQty(res.Pqty)
            setTotal(res.Ptotal)
        })
        .catch(err=>{
            console.log(err);
        })
    }
 
    const userId = isAutheticated().user._id;
    const token = isAutheticated().token;
    useEffect(() => {
        loadUserOrders(userId)
        
    }, [])

  
    return (
        <div>
            <UserBase/>
            {/* {renderNames()} */}
            <h1>Orders</h1>
            <div className="container mb-5">
            {Object.keys(orders).map((key,index)=>{
                return(
                    <div key={index}>
                    <h6><strong>Item</strong> {orders[key]}</h6>
                <h6><strong>Status</strong> {status[index]}</h6>
                <h6>{price[index]}</h6>
                <h6>{qty[index]}</h6>
                <h5>TOTAL :{total[index]}</h5>

                    <hr/>
                
                </div>
                )
            })}
           

           
              {/* {Object.keys(orders).map(function(key, index) {
                  
                return(
                    <h6>{key}</h6>
                )
            // console.log(orders[key].productprice[0])
            // console.log(key)

            // Object.keys(orders[key].productprice[0]).map(function(keys,index){
            //     console.log(orders[key].productprice[0][keys])
            // })
            // Object.keys(orders[key].productname[0]).map(function(keys,index){
            //     console.log(orders[key].productname[0][keys])
            //     console.log(typeof(orders[key].productname[0][keys]))
            //     // UU.push(orders[key].productname[0][keys])
            // })
            // Object.keys(orders[key].productqty[0]).map(function(keys,index){
            //     console.log(orders[key].productqty[0][keys])
            // })
          })} */}
         
       
  

            
            </div>
            
            <MenuBar/>
        </div>
    )
}
