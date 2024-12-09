import {
    GET_PRODUCTLIST,
    GET_PRODUCTLIST_SUCCESS,
    GET_PRODUCTLIST_FAIL,
    ADD_NEW_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    SHOW_PRODUCT,
    SHOW_PRODUCT_SUCCESS,
    SHOW_PRODUCT_FAIL,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    APPROVE_PRODUCT,
    APPROVE_PRODUCT_SUCCESS,
    APPROVE_PRODUCT_FAIL,

} from "./actionTypes";

const initialState = {
    products: [],
    showproducts: null,
    productloading: false,
    approveproduct:null,
    error: null,
    successproduct: false,
}

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        //Get Product List
        case GET_PRODUCTLIST:
            return {
                ...state,
                products: action.payload,
                productloading: true,
                error: null,
            };
        case GET_PRODUCTLIST_SUCCESS:
            return {
                ...state,
                productloading: false,
                products: action.payload,
            };

        case GET_PRODUCTLIST_FAIL:
            return {
                ...state,
                error: action.payload,
                productloading: false
            };

        //Approve product
        case APPROVE_PRODUCT:
            return {
                ...state,
                productloading: true,
            };

        case APPROVE_PRODUCT_SUCCESS:
            return {
                ...state,
                productloading: false,
                approveproduct: action.payload.products,
                successproduct: true
            };

        case APPROVE_PRODUCT_FAIL:
            return {
                ...state,
                productloading: false,
                successproduct: false,
                error: action.payload,
            };
        //Add Tag
        case ADD_NEW_PRODUCT:
            return {
                ...state,
                productloading: true,
            };

        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                productloading: false,
                showproducts: action.payload.products,
                successproduct: true
            };

        case ADD_PRODUCT_FAIL:
            return {
                ...state,
                productloading: false,
                successproduct: false,
                error: action.payload,
            };

        //Show Tag
        case SHOW_PRODUCT:
            return {
                ...state,
                productloading: false,
            };

        case SHOW_PRODUCT_SUCCESS:
            return {
                ...state,
                productloading: false,
                showproducts: action.payload.products
            };

        case SHOW_PRODUCT_FAIL:
            return {
                ...state,
                productloading: false,
                error: action.payload,
            };

        //Edit Tag
        case EDIT_PRODUCT:
            return {
                ...state,
                productloading: true,
            };

        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                productloading: false,
                showproducts: action.payload.products,
                successproduct: true
            };

        case EDIT_PRODUCT_FAIL:
            return {
                ...state,
                productloading: false,
                error: action.payload,
                successproduct: false,
            };

        //Delete Tag
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                tag: [action.payload, ...state.products],
            };

        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        
        default:
            state = { ...state }
    }
    return state
};

export default ProductsReducer;