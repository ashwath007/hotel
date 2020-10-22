import React,{useState,useEffect} from 'react'
import "./Bill.css"
import { v4 as uuidv4 } from 'uuid';

import { loadCart,loadCartBill,findQty } from './helper/cartHelper';
import { isAutheticated } from "../auth/helper/index";
import { confirmOrders } from './helper/coreapicalls';
import { Redirect } from 'react-router-dom';
import {getUserAddress} from "./helper/locationhelper"
import { getAllDataOfUser } from '../user/helper/userapicalls';


export default function Cod() {
  const [cartproducts, setcartproducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [totalcount,setTotalcount] = useState(0);
  const [redireact,setredireact] = useState(false);

  const [totalPrice,setTotalPrice] = useState(0); 
  const [loading,setLoading] = useState(false);
  const [thisProduct,setthisProduct] = useState(0); 
  const [thisNameProducts,setthisNameProducts] = useState(0); 
  const [userids,setuserids] = useState(""); 
  const [useraddress,setuseraddress] = useState(""); 
  const [usercoord,setusercoord] = useState([]); 

const showUserDelAddres  = () => {
  if(useraddress && usercoord){
    return(
      <div class="alert alert-light" role="alert">
        {useraddress}
</div>
    )
  }
}
 const loadAllUserDatas = () => {
   if(userids){
     getAllDataOfUser({userids}).then(res => {
       console.log(res);
       setuseraddress(res.address)
       setusercoord(res.coord)
       setuserids("")
     })
     .catch(err => {
       console.log(err);
     })
   }
 }
  useEffect(() => {
    setcartproducts(loadCart());
    setthisProduct(loadCartBill())
    setthisNameProducts(loadCartBill());
    autoCountBtn()
    setuserids(isAutheticated().user._id)
  
  }, []);
    const [latitude,setLatitude] = useState("");
    const [longitude,setLongitude] = useState("");

    const [location, setlocation] = useState(0)
    const locationUser = event => {
        setlocation(event.target.value) //Location done
    }

    const getGLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates,handleLocationError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
    const getCoordinates = (position) => {
      console.log(position.coords.latitude)
      setLatitude(position.coords.latitude)
      console.log(position.coords.longitude)
      setLongitude(position.coords.longitude)

    }
    const autoCountBtn = () => {
      let cart = [];
      let TCOUNT = 0;
      let TOTAL_PRICE = 0;
    
      if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }
      
            cart.map((PRODUCT,INDEX)=>{
              if(PRODUCT != null){
                TCOUNT = TCOUNT + 1;
                TOTAL_PRICE =TOTAL_PRICE + PRODUCT  .price;
              }
            })
        setTotalcount(TCOUNT)
        setTotalPrice(TOTAL_PRICE);
    
        TCOUNT=0
        }
      }
    const userId = isAutheticated().user;
    const token = isAutheticated().token;
    const isRedirectHome = () =>{
      if(redireact){
        return <Redirect to="/"/>
      }
    }
    const confirmOrder = (event) => {
        event.preventDefault();
        setLoading(true)
        const PRODUCTS  = loadCartBill();
        console.log("S o ",PRODUCTS);
        const names = contQty(PRODUCTS)
        console.log("S o  names ",names);
        const price = contPrice(PRODUCTS)
        console.log("S o  price ",price);
        localStorage.setItem("orderID", uuidv4()  );
      
        console.log("location : ",useraddress);
        console.log("userId : ",userId,token);
        console.log("totalPrice : ",totalPrice);
        console.log("cartproducts : S o ",cartproducts);
        const ORDERID  =   localStorage.getItem("orderID");
       
        confirmOrders({PRODUCTS,names,cartproducts,price,location,totalPrice,userId,token},userId,token,ORDERID)
        .then((responce)=>{
            console.log("resdd . . . ",responce);
            console.log("PRODUCTS : ",PRODUCTS);

            PRODUCTS.map((pName,index)=>{
              console.log("pNAme",pName);
              window.localStorage.removeItem(pName);
              

            })
            window.localStorage.removeItem("cart");
            window.localStorage.removeItem("orderID");
            setredireact(true)

        })
        .catch((err)=>{
          console.log(err);

        })




    }
    const showTheAddressBar = () => {

    }
  const isLoading = () => {
    if(loading){
      return (
        <div class="spinner-border text-warning" role="status">
  <span class="sr-only">Loading...</span>
</div>
      )
    }
  }
  const handleLocationError  =(error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
        default:
          alert("An unknown error accurder type ur address manually");
    }
  }
    const contQty = (product) =>{
      let cart = [];
      let yy = [];
      console.log("--->>> y product ",product);
  
      let TOTOAL = 0;
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        product.map((pro,I)=>{
          cart.map((cpor,cI)=>{
              if(cpor!=null &&  pro === cpor.name){
                  TOTOAL = TOTOAL + 1;
              }
          })
          yy.push(TOTOAL)
          TOTOAL=0;
      })
      }
   
    }
   return yy;
          }
    
          
          const contPrice = (product) =>{
            let cart = [];
            let yy = [];
            let curentProduct = [];
            console.log("--->>> y product ",product);
        
            let TOTOAL = 0;
          if (typeof window !== undefined) {
            if (localStorage.getItem("cart")) {
              cart = JSON.parse(localStorage.getItem("cart"));
              product.map((pro,I)=>{
                cart.map((cpor,cI)=>{
                    if(cpor!=null &&  pro === cpor.name){
                        TOTOAL = TOTOAL + 1;
                yy.push(cpor.price)

                    }
                })
                TOTOAL=0;
            })
            }
         
          }
          curentProduct = [...new Set(yy)];
         return curentProduct;
                }
      

const shoemap  = () => {
  if(latitude && longitude){
    const loc = {"latitude":latitude,"longitude":longitude}
    getUserAddress(loc).then(res => {
      // console.log(res);
    })
    .catch(err => {
      // console.log(err);
    })
}
}
    return (
        <div>
            
   
    <div className="container">
  {shoemap()}
    </div>
            <div className="container codbox">
            <div class="alert alert-primary" role="alert">
 <a href="#" class="alert-link">         {useraddress}
</a>
</div>
            <form>
  <div class="form-group">
    <label>Your Address</label>
    <input placeholder="Enter the address" onChange={(e)=>{locationUser(e)}} value={useraddress} type="text" class="form-control" required/>
  </div>
      {isRedirectHome()}
    {loadAllUserDatas()}

      {showUserDelAddres()}
  <button onClick={confirmOrder} type="submit" class="btn btn-primary btn-block mt-5">Confirm Address</button>


</form>

            </div>
        </div>
    )
}
