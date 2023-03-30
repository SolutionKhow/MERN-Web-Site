import React, { Fragment, useEffect } from 'react'
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProducts } from "../../action/productAction";
import Product from "../Home/Product";
import { useParams } from 'react-router-dom';


const Products = () => {
    const dispatch = useDispatch();
    const producting = useSelector((state) => state.products.product);
    

    //const keyword=match.param.keyword;
  
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    return (
        <Fragment>
         <h2 className="productsHeading">Products</h2>
         <div className='products'>
         {  producting.map((products) => (
            <Product key={products._id} products={products} />
          ))}


         </div>


        </Fragment>
    )
}

export default Products
