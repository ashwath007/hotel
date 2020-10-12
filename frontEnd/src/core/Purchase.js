import React,{useState,useEffect} from 'react'
import UserBase from '../user/UserBase'
import { loadCart,loadCartBill,findQty } from './helper/cartHelper';
import MenuCard from './MenuCard';
import "./Purchase.css"
import cookGIF from "./src/cook.gif"
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Link } from 'react-router-dom';

export default function Purchase() {
    const [cartproducts, setcartproducts] = useState([]);
    const [reload, setReload] = useState(false);
    const [totalcount,setTotalcount] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0); 
    const [thisProduct,setthisProduct] = useState(0); 
    const [thisNameProducts,setthisNameProducts] = useState(0); 


    useEffect(() => {
        setcartproducts(loadCart());
        setthisProduct(loadCartBill())
        setthisNameProducts(loadCartBill());
autoCountBtn()
        
      }, [reload]);

      const showPurchase = (name,price) =>{
        console.log(name);

         
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
                    <div className="container card mb-2">
                        <div className="row">
                            <div className="col-4">
                                <p className="txtcol">{pro}</p>
                            </div>
                            <div className="col-4">
                              <p className="txtcol"><strong>Qty</strong> </p>
                            <p className="txtcol"> {y[I]}</p>

                            </div>
                        </div>
                    </div>
                )
            })

              }
              </div>
              
          )
       
        
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
        const itemName = () => {
            
        }
      const loadAllProducts = () => {
        return (
          <div>
            {cartproducts.map((product, index) => {
              if(product!=null){
                return(
                    <div className="ml-4">
                        <div className="row">
                            <div className="col-4 ">
                            <h6>{product.name}</h6>

                            </div>
                            <div className="col-4">
                            <h6>{product.price}</h6>

                            </div>
                            <div className="col-4">
                          

                            </div>
                           
                        </div>
                    </div>
                  )
              }
      })}
          </div>
        );
      };
    return (
        <div className="">
        <UserBase/>

        <div className="cart shadow-lg pb-1 pt-2">
        {/* <ul class="nav navbar-light backoffer justify-content-center ">
  <li class="nav-item ">
    <a class="nav-link text-white" href="#">Order</a>
  </li>
  <li class="nav-item">
    <a class="nav-link text-white" href="#">Offers</a>
  </li>
  
</ul> */}
<div className="container">
    <div className="gifbox">
    {/* <img src={cookGIF} className="gifimg" alt="..."/> */}
    </div>
<h6 className="mt-5">Bill Details</h6>
<div className="card cartpage">
<div className="container mt-4 mb-3 jji">
        {showProductQty()}  
        </div>
        <div className="container">
        <hr/>

        </div>
{loadAllProducts()}
<div className="card text-center">
<h6 className="ml-4  txtcol">Total : &#8377;{totalPrice}</h6>
</div>
</div>
<div className="">
    <Link to="/">
    <button className="btn edtbtn btn-block rounded mt-4 mb-5">
        Edit Order
    </button>
    </Link>
    <div>
 

    </div>
</div>
</div>


        </div>
        <div className="">
          
        </div>
        <Link to="/cart/bill">
            <button className="btn billbtn btn-block fixed-bottom">
               &#8377;{totalPrice} MAKE PAYMENT
            </button>
        </Link>
   
        </div>
    )
}
