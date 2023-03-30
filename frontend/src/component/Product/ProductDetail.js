import React, { Fragment, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../action/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";


const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail.product);


  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,


  };

  console.log(product, "product1");
  if (Array.isArray(product)) {
    console.log('product is an array');
  } else {
    console.log('product is not an array');
  }

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id]);





  return (
    <Fragment>
      <div className='ProductDetails'>
        <div>

          {
            product.images && product.images.map((item, i) => (
              <img className='CarouseImage'
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}


              />
            ))
          }


        </div>
        <div>
          <div className='detailsBlock-1'>
            <h2>{product.name}</h2>
            <p>Product #{product._id}</p>
          </div>
          <div className='detailsBlock-2'>
            <ReactStars {...options} /><span>( {product.numOfRewies} Reviews)</span>

          </div>


          <div className='detailsBlock-3'>
            <h2>{`₹ ${product.price}`}</h2>
            <div className='detailsBlock-3-1'>
              <div className='detailsBlock-3-1-1'>
                <button>-</button>
                <input type="number"></input>
                <button>+</button>


              </div>{" "}
              <button>Add To Cart</button>
            </div>

            <p>
              Status:{""}
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>


          </div>
          <div className='detailsBlock-4'>
            Description :<p>{product.description}</p>

          </div>
          <button className='submitReview'>Submit Reviews</button>

        </div>

      </div>

      <h3 className='reviewsHeading'>Reviews</h3>

      
      {product.reviews && product.reviews[0] ? (
        <div className='reviews'>
        {
          product.reviews &&
          product.reviews.map((review) =>
            <ReviewCard key={review._id} review={review} />)
        }

      </div>
        

        


      ) : (
        <p className='noReviews'> NO Reviews Yet</p>

        // <div className='reviews'>
        //   {
        //     product.reviews &&
        //     product.reviews.map((review) =>
        //       <ReviewCard key={review._id} review={review} />)
        //   }

        // </div>
      )}


    </Fragment>
  )
}

export default ProductDetail
