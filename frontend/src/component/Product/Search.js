import React from 'react';
import { Fragment, useState } from 'react';
import "./Search.css"

const Search = ({ history}) => {

  const [keyword, setKeyword] = useState("");


  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if(keyword){
       // history.push(`/products/${keyword}`);
        console.log(history)
    }else{
       // history.push("/products");
        console.log("Notttttttt");
    }
  }

  return (
  <Fragment>
    <form className='searchBox' onSubmit={searchSubmitHandler}>
      <input
        type="text"
        placeholder='Search Product'
        onChange={(e) => setKeyword(e.target.value)}

      />
      <input type="submit" value="Search" />

    </form>

  </Fragment>
  );
}

export default Search
