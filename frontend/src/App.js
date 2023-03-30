
import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route,Routes,Switch} from "react-router-dom"
import webFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";

import ProductDetail from "./component/Product/ProductDetail.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js"


function App() {

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      }
    });
  });



  return (
    <Router>

      <Header />
      <Routes>
      <Route exact path='/' element={< Home />}></Route>
      <Route exact path='/product/:id' element={< ProductDetail/>}></Route>
      <Route exact path='/products' element={< Products/>}></Route>

      <Route path='/products/:keyword' element={< Products/>}></Route>
       
      <Route exact path='/Search' element={< Search/>}></Route>

      </Routes>
      

      <Footer />

    </Router>
  );
}

export default App;
