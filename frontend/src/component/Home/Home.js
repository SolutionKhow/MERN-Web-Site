import React, { Fragment, useEffect } from 'react';
import { DiApple } from "react-icons/di";
import "./Home.css";
import Product from "./Product.js"
import Metadata from '../layout/Metadata';
import { getProducts } from "../../action/productAction";
import { useSelector, useDispatch } from "react-redux";

//import { useAlert }  from "react-alert";

// const product={
//   name:"Bule Shirt",
//    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
//   price:3000,
//   _id:"Abhishek "

// }




const Home = () => {


  //const alert = useAlert();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.product);
 
 

  console.log(product, "product");
  if (Array.isArray(product)) {
    console.log('product is an array');
  } else {
    console.log('product is not an array');
  }

  // const renderList=product.map((myproduct)=>{
  //   const {price,name}=myproduct;
  //   return(<div>
  //     <div>{price}</div>
  //     <div>{name}</div>
  //   </div>);

  // });



  useEffect(() => {

    dispatch(getProducts());
  }, [dispatch]);


  return <Fragment>

    

     
      <Fragment>
        <Metadata title="E COmmerce Web Site" ></Metadata>
        <div className='banner'>
          <p>Wel Come to E commerce</p>
          <h1>Find Amazing Product</h1>
          <a href='#container'>
            <button>
              Scroll<DiApple />
            </button>
          </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>


        <div className="container" id='container'>




          { product.map((products) => (
            <Product key={products._id} products={products} />
          ))}




 
        </div>
      </Fragment>


  </Fragment>




};

export default Home

