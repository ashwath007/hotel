import React, { useState, useEffect } from "react";
import "../styles.css";
import MenuBar from "./MenuBar"
import { API } from "../backend";
import Base from "./Base";
import Badge from '@material-ui/core/Badge';  
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import UserBase from "../user/AdminMenus/UserBase";
import { makeStyles } from '@material-ui/core/styles';
import PrimarySearchAppBar from "./AppBar";
import CartBase from "../user/AdminMenus/CartBase";
import MenuCard from "./MenuCard";
// import Skeleton from '@material-ui/lab/Skeleton';
import adminlogo from "../user/src/alogo@2x.png"
import CartCardBtn from "./CartCardBtn";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading,setLoding] = useState(false)
  const useStyles = makeStyles({
    root: {
      width: 500,
    },
  });
  
 
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const loadAllProduct = () => {
    setLoding(true)
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoding(true)
        setProducts(data);
        setLoding(false)
      }
    });
  };

const isLoading = () => {
  if(loading){
    return(
      <div className="d-flex justify-content-center">
        <div class="spinner-border text-primary"  role="status">
  <span class="sr-only">Loading...</span>
</div>
      </div>
    );
  }
  
}
  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    
<div>
      
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
        <nav className="navbar navbar-light bg-white shadow">
  <a className="navbar-brand" href="#">
    <img src={adminlogo} width="40" height="40" alt="" loading="lazy"/>
  </a>
</nav>

    {/* <div className="fixed-bottom frombto menu">
      <button className="btn menubtn">
      <i src="menulogo.png"></i>
      Menu
      </button>
    </div> */}
      {/* <PrimarySearchAppBar/>
      <CartBase/> */}

  <div className="container menubox btmmbtmm">
  <div className="mt-4 mb-5">
    <br/>
  <h6 className="">Recommended</h6>
      <hr/>
    {products.map((product, index) => {
            return (
              <div key={index} className="">
                {/* <Card product={product} /> */}
                <MenuCard product={product}/>
              </div>
            );
          })}
    </div>

  </div>
  
    
        
          
        <div className="spinnercen">
    {isLoading()}

        </div>
    <MenuBar/>

        </div>
  
    
      
      
    


    
      
    
  );
}
