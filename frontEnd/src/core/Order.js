import React,{useState,useEffect} from 'react'
import { isAutheticated } from '../auth/helper'
import UserBase from '../user/UserBase'
import { getallUserOrder } from './helper/orderHelper'
import MenuBar from './MenuBar'
// import "./Order.css"
export default function Order() {
    const [userUId, setuserUId] = useState(0)
    const [orders,setOrders] = useState([]);
    const [name,setName] = useState([]);
    const [price,setPrice] = useState([]);
    const [total,setTotal] = useState([]);

    const [qty,setQty] = useState([]);
    const [loading,setLoading] = useState([]);

    const [status,setstatus] = useState([]);
    const [cardcolor,setcardcolor] = useState("");

    const spinnerloading = () => {
        if(loading){
            return(
                <div class="d-flex justify-content-center">
  <div class="spinner-border text-warning" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
            )
        }
    }
    
    const loadUserOrders = userID =>{
        console.log(userID);
        setLoading(true)

        getallUserOrder(userID,token).then((res)=>{
            console.log("Res",res.Pname);
            console.log("Res length",res.Pname.length);

            console.log("Res",res.Status);
            console.log("Res",res.Pprice);
            console.log("Res",res.Ptotal);
          
            
            setstatus(res.Status)
            console.log("Res",typeof(res.Pname));
            setPrice(res.Pprice)
            setOrders(res.Pname)
            setQty(res.Pqty)
            setQty(res.Pqty)
            setLoading(false)
            setTotal(res.Ptotal)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const shownoOrderMessage = () => {
        console.log("oh",);
        if(status.length === 0){
            return(
                <div class="alert alert-warning text-center" role="alert">
                  Please wait , let's load your orders !!!
                </div>
                        )
        }
     

    }
    const userId = isAutheticated().user._id;
    const token = isAutheticated().token;
    useEffect(() => {
        setInterval(() => {
        loadUserOrders(userId)
            
        }, 5000);
        
    }, [])

    const colorGenerator = () => {
        var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    setcardcolor(bgColor)
    }
    return (
        <div>
            <UserBase/> 
            {/* {renderNames()} */}
            <div className="container ordercont mb-5">
                {shownoOrderMessage()}
                <div className="text-center mb-3 mt-2">
                    Gonna Have !!!
                </div>
                {spinnerloading()}
            {Object.keys(orders).reverse().map((key,index)=>{ 
                console.log(status[index])
                let len = status.length;
                console.log("length : ",status.length)

                if(status[index] === "Ordered "){
                    return(
                        <div>
                            {/* {colorGenerator()} */}
                        
                        <div className="card shadow ordercard mb-4" key={index} style={{backgroundColor:"#7CEC9F"}}>
                            <div className="pr-3 pl-3 pt-3 pb-2">
                            <h6><strong>Item</strong> {orders[index]}</h6>
                            <h6><strong>Qty</strong> {qty[index]}</h6>
                            <h6><strong>Price</strong> {price[index]}</h6>
    
                            <div>
                            <h6><strong>Status</strong> {status[index]}</h6>
    
    
                            </div>
                    <div className="text-center">
                    <h5>TOTAL :{total[index]}</h5>
    
                        </div>
                                </div>
                        
    
                    
                    </div>
                    </div>
    
                    )
                }
                else if(status[index] === "Cooking "){
                    return(
                        <div>
                            {/* {colorGenerator()} */}
    
                        <div className="card shadow-lg ordercard mb-4" key={index} style={{backgroundColor:"#FF4848",}}>
                            <div className="pr-3 pl-3 pt-3 pb-2" style={{color:"white"}}>
                            <h6><strong>Item</strong> {orders[index]}</h6>
                            <h6><strong>Qty</strong> {qty[index]}</h6>
                            <h6><strong>Price</strong> {price[index]}</h6>
    
                            <div>
                            <h6><strong>Status</strong> {status[index]}</h6>
    
    
                            </div>
                    <div className="text-center">
                    <h5>TOTAL :{total[index]}</h5>
    
                        </div>
                                </div>
                        
    
                    
                    </div>
                    </div>
    
                    )
                }
                else if(status[index] === "Done Cooking "){
                    return(
                        <div>
                            {/* {colorGenerator()} */}
    
                        <div className="card shadow ordercard mb-4" key={index} style={{backgroundColor:"#4834DF",}}>
                            <div className="pr-3 pl-3 pt-3 pb-2" style={{color:"white"}}>
                            <h6><strong>Item</strong> {orders[index]}</h6>
                            <h6><strong>Qty</strong> {qty[index]}</h6>
                            <h6><strong>Price</strong> {price[index]}</h6>
    
                            <div>
                            <h6><strong>Status</strong> {status[index]}</h6>
    
    
                            </div>
                    <div className="text-center">
                    <h5>TOTAL :{total[index]}</h5>
    
                        </div>
                                </div>
                        
    
                    
                    </div>
                    </div>
    
                    )
                }
                else if(status[index] === "Out for Delivery "){
                    return(
                        <div>
                            {/* {colorGenerator()} */}
    
                        <div className="card shadow ordercard mb-4" key={index} style={{backgroundColor:"#F3B431",}}>
                            <div className="pr-3 pl-3 pt-3 pb-2" style={{color:"white"}}>
                            <h6><strong>Item</strong> {orders[index]}</h6>
                            <h6><strong>Qty</strong> {qty[index]}</h6>
                            <h6><strong>Price</strong> {price[index]}</h6>
    
                            <div>
                            <h6><strong>Status</strong> {status[index]}</h6>
    
    
                            </div>
                    <div className="text-center">
                    <h5>TOTAL :{total[index]}</h5>
    
                        </div>
                                </div>
                        
    
                    
                    </div>
                    </div>
    
                    )
                }
                else if(status[index] === " "){
                    return(
                        <div>
                            {/* {colorGenerator()} */}
    
                        <div className="card shadow-lg ordercard mb-4" key={index} style={{backgroundColor:"#FF4848",}}>
                            <div className="pr-3 pl-3 pt-3 pb-2" style={{color:"white"}}>
                            You have not ordered yet
                                </div>
                        
    
                    
                    </div>
                    </div>
    
                    )
                }
                else if(status[index] === "Hold Order "){
                    return(
                        <div>
                            {/* {colorGenerator()} */}
    
                        <div className="card shadow ordercard mb-4" key={index} style={{backgroundColor:"#AE1438",}}>
                            <div className="pr-3 pl-3 pt-3 pb-2" style={{color:"white"}}>
                            <h6><strong>Item</strong> {orders[index]}</h6>
                            <h6><strong>Qty</strong> {qty[index]}</h6>
                            <h6><strong>Price</strong> {price[index]}</h6>
    
                            <div>
                            <h6><strong>Status</strong> {status[index]}</h6>
    
    
                            </div>
                    <div className="text-center">
                    <h5>TOTAL :{total[index]}</h5>
                        <div>
                        <div class="alert alert-light" role="alert">
  Currently we are holding your order, Please wait we will respond soon !!
</div>
                            </div>
                        </div>
                                </div>
                        
    
                    
                    </div>
                    </div>
    
                    )
                }
                else if(status[index] === "Rejected Order "){
                    return(
                        <div>
                            {/* {colorGenerator()} */}
    
                        <div className="card shadow ordercard mb-4" key={index} style={{backgroundColor:"#2C3335",}}>
                            <div className="pr-3 pl-3 pt-3 pb-2" style={{color:"white"}}>
                            <h6><strong>Item</strong> {orders[index]}</h6>
                            <h6><strong>Qty</strong> {qty[index]}</h6>
                            <h6><strong>Price</strong> {price[index]}</h6>
    
                            <div>
                            <h6><strong>Status</strong> {status[index]}</h6>
    
    
                            </div>
                    <div className="text-center">
                    <h5>TOTAL :{total[index]}</h5>
                        <div>
                        <div class="alert alert-danger" role="alert">
  We are rejecting your order, May be some problem or the hotel is closed
</div>
                            </div>
                        </div>
                                </div>
                        
    
                    
                    </div>
                    </div>
    
                    )
                }
                
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
         
       
          <div>
          <div className="text-center mb-3 mt-2">
                    You Had !!
                </div>
              {spinnerloading()}

              {Object.keys(orders).reverse().map((key,index)=>{ 
                console.log(status[index])
                let len = status.length;
                console.log("length : ",status.length)

                if(status[index] === "Delivered "){
                    return(
                        <div>
                            {/* {colorGenerator()} */}
    
                        <div className="card shadow ordercard mb-4" key={index} style={{backgroundColor:"#2C3335",color:'white'}}>
                            <div className="pr-3 pl-3 pt-3 pb-2">
                            <h6><strong>Item</strong> {orders[index]}</h6>
                            <h6><strong>Qty</strong> {qty[index]}</h6>
                            <h6><strong>Price</strong> {price[index]}</h6>
    
                            <div>
                            <h6><strong>Status</strong> {status[index]}</h6>
    
    
                            </div>
                    <div className="text-center">
                    <h5>TOTAL :{total[index]}</h5>
    
                        </div>
                                </div>
                        
    
                    
                    </div>
                    </div>
    
                    )
                }})}
          </div>

            
            </div>
            
            <MenuBar/>
        </div>
    )
}
