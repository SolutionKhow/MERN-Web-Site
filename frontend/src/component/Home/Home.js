import React, { Fragment } from 'react';
import { DiApple } from "react-icons/di";
import "./Home.css";
import ProductCard from "./ProductCard.js"
import Metadata from '../layout/Metadata';
const product = {
  name: "Blue Tshirt",
  images:[{url:"https://i.ibb.co./DRST11n/1.webp"}],
  price: 3000,
  _id: "yogesh"
}

const Home = () => {
  return (
    <Fragment>
      <Metadata title="E COMMERCE"/>
      <div className='banner'>
        <p>Welcome to E Commerce</p>
        <h1>Find Amazing Product Below</h1>
        <a href='#container' >
          <button>Scroll <DiApple />

          </button>

        </a>

      </div>

      <h2 className='homeHeading' > Features Product</h2>


      <div className="container" id='container'>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      <ProductCard product={product}></ProductCard>
      </div>
    </Fragment>

  )
}

export default Home

