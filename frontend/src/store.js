import { legacy_createStore as createStore } from 'redux'
import { combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from './reducer/productReduce';

const reducer = combineReducers({
  
  products:productReducer,


});

let inintalState = {};
const middleWare = [thunk];
const store = createStore(reducer, inintalState, composeWithDevTools(applyMiddleware(...middleWare)));
export default store