import React from 'react';
import{Link} from "react-router-dom";

import ReactStars from "react-rating-stars-component";




const Product = ({products}) => {

  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 20 :25,
    value:2.5,
    isHalf:true


}
if (!products) {
  return <div>Loading...</div>; // or some other fallback UI if products is undefined
}

  return (
    <Link className='productCard' to={products._id}>
       
         <img src={products.images[0].url} alt={products.name} /> 
      
        
        <p>{products.name}</p>
        <div>
            <ReactStars {...options} /><span>( 256 Reviews)</span> 
        </div>
       < span>₹ { products.price }</span>
    
    
    </Link>
    
  )
}

export default Product
