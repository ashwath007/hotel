import React,{useState,useEffect} from 'react'
import UserBase from '../user/UserBase'
import "./Bill.css"
import { loadCartBill } from './helper/cartHelper'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

export default function Bill() {
 
  
 
  
    const [totalPrice,setTotalPrice] = useState(0); 
    const [totalcount,setTotalcount] = useState(0);
    useEffect(() => {
        autoCountBtn()
    }, [])
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
    const showProductQty = () => {
        const PRODUCTS  = loadCartBill();
        console.log("--->>>",PRODUCTS);
        const y = contQty(PRODUCTS)
        console.log("--->>> y ",y);

          return(
              <div>
                    {PRODUCTS.map((pro,I)=>{
                return(
                    <div className="container card">
                        <div className="row">
                            <div className="col-4">
                                <p className="">{pro}</p>
                            </div>
                            <div className="col-4">
                            <p className="">{y[I]}</p>

                            </div>
                        </div>
                    </div>
                )
            })

              }
              </div>
              
          )
       
        
      }
    return (
        <div>
            <UserBase/>
            <div className="googlem container mt-4">
           
    
            </div>
            <div className="container mt-4 box">
                {showProductQty()}
                <div className="my-4 mb-5">
                        <h3 className="mt-4 text-center">
                          TOTAL   &#8377; {totalPrice}
                        </h3>
                    </div>
            </div>

            <div className="container">
               
                    <Link>
                        <button className="btn btn-outline-success btn-block rounded">
                            Pay with card
                        </button>
                    </Link>
                        <br/>
                    <Link to="/cart/bill/cod">
                    <button type="button" class="btn btn-success btn-block rounded">Cash on Delivery</button>

                    </Link>
            </div>
        </div>
    )
}
