
import { ALL_PRODUCT_REQUEST, 
            ALL_PRODUCT_SUCESS, 
            ALL_PRODUCT_FAIL, 
            PRODUCT_DETAIL_SUCESS,
            PRODUCT_DETAIL_REQUEST,
            PRODUCT_DETAIL_FAIL,
            CLEAR_ERROR } from "../constant/productConstant";

            const initialState = {
                loading: false,
                product: []
              };

export const productReducer = (state = {product :[]}, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:

            return {
                
                ...state,
                loading: true,
               
                
            }
        case ALL_PRODUCT_SUCESS:
            return {
                ...state,
                loading: false,
                
                product: action.payload.product,
                productsCount: action.payload.productsCount,
                
            }
        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }

};

export const productDetailReducer = (state = { product : {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:

            return {
                loading: true,
                ...state,
            }
        case PRODUCT_DETAIL_SUCESS:
            return {
                loading: false,
                products: action.payload.products,
                
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }

};