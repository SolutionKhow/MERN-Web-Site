import axios from "axios";
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCESS, ALL_PRODUCT_FAIL, CLEAR_ERROR } from "../constant/productConstant";


export const getProduct =( )=> async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        const { data } = await axios.get('/api/v1/products');
        dispatch({
            type:ALL_PRODUCT_SUCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.respose.data.message,
        })

    }
}
export const clearError =()=> async (dispatch) => {
    dispatch ({
        type:CLEAR_ERROR,
    })
}