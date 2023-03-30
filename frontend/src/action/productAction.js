import axios from "axios";

import { ALL_PRODUCT_REQUEST,
         ALL_PRODUCT_SUCESS, 
         ALL_PRODUCT_FAIL, 
         PRODUCT_DETAIL_SUCESS,
         PRODUCT_DETAIL_REQUEST,
         PRODUCT_DETAIL_FAIL,
         
         
         CLEAR_ERROR } from "../constant/productConstant";

 
export const  getProducts =( )=> async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let link=`/api/v1/Product`;
        const { data } = await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,    
        })

    }
}




export const getProductDetails =(id)=> async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const { data } = await axios.get(`/api/v1/Products/${id}`);
        dispatch({
            type:PRODUCT_DETAIL_SUCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message,    
        })

    }
}

export const clearError =()=> async (dispatch) => {
    dispatch ({
        type:CLEAR_ERROR,
    })
}