import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import "./MenuCard.css"
import CartCardBtn from "./CartCardBtn";

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { RiRestaurantFill } from "react-icons/ri";
import DoneIcon from '@material-ui/icons/Done';
import ImageHelper from './helper/ImageHelper';
import { addItemToCart ,removeItemFromCart} from './helper/cartHelper';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        marginBottom: theme.spacing(2),
      },
      '& .MuiBadge-root': {
        marginRight: theme.spacing(4),
      },
    },
  }));

const MenuCard = ({
    product,
    addtoCart = true,
    removeFromCart = false,
}) => {
  const [redirect, setRedirect] = useState(false);
    const [count, setCount] = React.useState(0);
    const [invisible, setInvisible] = React.useState(false);
    const [total,setTotal] = React.useState(0);
    const [plus,setPlus] = React.useState(0);
    const [minus,setMinus] = React.useState(0);
    const [totalcount,setTotalcount] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0); 
    const handleBadgeVisibility = () => {
      setInvisible(!invisible);
    };
    
//   const [count, setCount] = useState(product.count);    
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";
  const cartType = product ? product.type : "DEFAULT";
  const productId = product ? product._id : null;
  const classes = useStyles();

const showContBtn = () => {
  if(count>0){
    return (
      <Button className="boxs">
      <span className="itemcen pt-1 boxtxt"><h6>{count}</h6></span>
      </Button>
    );
  }
  
}
//TODO:Here we are updating the count 
const onCountUpdate = (productId) =>{
  let cart = [];
  let TOTOAL = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    // console.log(cart)
    // console.log(cart[4]._id)
    if(productId){
      console.log("product >>>> ",productId);
      cart.map((pro,id)=>{
        if(pro != null){
          if(pro._id === productId){
            TOTOAL = TOTOAL + 1;
           
          }  
        }
           
})
    }
   
    console.log("TOTAL : ",TOTOAL);
    setCount(TOTOAL)
    autoCountBtn()
} }

useEffect(() => {
  onCountUpdate(productId);
  autoCountBtn()
}, [])
   
//TODO  :  we need to see this issue
                  setTimeout(() => {
                    onCountUpdate(productId)
                  }, 500);

const addToCart = () => {

  addItemToCart(product, () => setRedirect(true));
  onCountUpdate(productId)
  autoCountBtn()
};


const showRemoveFromCart = removeFromCart => {
    removeFromCart && (
     
          removeItemFromCart(product)
     
      
  );
  onCountUpdate(productId)
  autoCountBtn()

};

// const showAddToCart = addtoCart => {
//   return (
//     addtoCart && (
//       <button
//         onClick={addToCart}
//         className="btn btn-block btn-outline-success mt-2 mb-2"
//       >
//         Add to Cart
//       </button>
//     )
//   );
// };
const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;
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
const cartSection = () => {
  if(count>0){
      
    return (
      <Link to="/cart/purchase">

<div className="card cartcard btmm fixed-bottom">
        <div className="row mb-1">
          <div className="col-6">
          <h6 className="mt-3 ml-3 carttxt">{totalcount} item | &#8377;{totalPrice}</h6>
          
          </div>
          
          <div className="col-6 mb-1 ">
          <h6 className="mt-3 carttxt rr">
          VIEW CART <RiRestaurantFill width="40" height="40"/>
          </h6>
          </div>
        </div>
        
           
        </div>
      </Link>
   
      
        );
  }
 
}
    return (
       <div className="mx-auto">
           
        <div class="card-body">
            <div class="row">
                <div class="col-4"><div className="imgbotbox">
                  <ImageHelper product={product}/>
                  </div></div>
                <div class="col-3  boxtxts"> {cartTitle} <br/>&#8377;{cartPrice}<br/>
                <div className="typeboxs">
                  <h6 className="typetxt">Veg</h6>
                </div>
                </div>
                <div className="col-4 countbtn"> 
                <ButtonGroup className="btnbox">
          <Button
            className="boxs"
            aria-label="reduce"
            onClick={
              
              showRemoveFromCart
              

            }
          >
            <RemoveIcon fontSize="small" />
          </Button>
          {showContBtn()}
          <Button
          className="boxs boxtxt"  
            aria-label="increase"
            onClick={
                addToCart
         

            }
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup></div>
            </div>
    </div>
           {cartSection()}
       </div>
            
                

    )
}
export default MenuCard