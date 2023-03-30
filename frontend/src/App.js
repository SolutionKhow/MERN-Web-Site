
import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom"
import webFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import Loader from './component/layout/Loader/Loader';
import ProductDetail from "./component/Product/ProductDetail.js";


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

      </Routes>
      

      <Footer />

    </Router>
  );
}

export default App;
