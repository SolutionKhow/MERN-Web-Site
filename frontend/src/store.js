import {  createStore } from 'redux'
import { combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer,productDetailReducer } from './reducer/productReducer';

const reducer = combineReducers({
  
  products:productReducer,
  productDetail:productDetailReducer,


});

let inintalState = {};
const middleWare = [thunk];
const store = createStore(reducer, inintalState, composeWithDevTools(applyMiddleware(...middleWare)));
export default store