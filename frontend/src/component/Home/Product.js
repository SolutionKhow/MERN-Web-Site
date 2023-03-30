import React from 'react';
import{Link} from "react-router-dom";

import ReactStars from "react-rating-stars-component";




const Product = ({products}) => {

  const options = {
    value: products.ratings,
    readOnly: true,
    precision: 0.5,
  };
if (!products) {
  return <div>Loading...</div>; // or some other fallback UI if products is undefined
}

  return (
    <Link className='productCard' to={`/product/${products._id}`}>
       
         <img src={products.images[0].url} alt={products.name} /> 
      
        
        <p>{products.name}</p>
        <div>
            <ReactStars {...options} /><span>( {products.numOfRewies} Reviews)</span> 
        </div>
       < span>₹ { products.price }</span>
    
    
    </Link>
    
  )
}

export default Product
