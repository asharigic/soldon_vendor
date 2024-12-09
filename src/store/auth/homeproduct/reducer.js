import {
    GET_HOME_PRODUCTLIST,
    GET_HOME_PRODUCTLIST_SUCCESS,
    GET_HOME_PRODUCTLIST_FAIL,
    CLONE_PRODUCT,
    CLONE_PRODUCT_SUCCESS,
    CLONE_PRODUCT_FAIL
} from "./actionTypes";

const initialState = {
    homeproducts: [],
    homeproductloading: false,
    homeerror: null,
    homesuccessproduct: false,
    cloneproduct:null
}

const HomeProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        //Get Product List
        case GET_HOME_PRODUCTLIST:
            return {
                ...state,
                homeproducts: action.payload,
                homeproductloading: true,
                homeerror: null,
            };
        case GET_HOME_PRODUCTLIST_SUCCESS:
            return {
                ...state,
                homeproductloading: false,
                homeproducts: action.payload,
                homesuccessproduct: true
            };

        case GET_HOME_PRODUCTLIST_FAIL:
            return {
                ...state,
                homeerror: action.payload,
                homeproductloading: false
            };
        //clone Product
        case CLONE_PRODUCT:
            return {
                ...state,
                homeproductloading: false,
            };

        case CLONE_PRODUCT_SUCCESS:
            return {
                ...state,
                homeproductloading: false,
                cloneproduct: action.payload.homeproducts,
                homesuccessproduct: true
            };

        case CLONE_PRODUCT_FAIL:
            return {
                ...state,
                homeproductloading: false,
                homeerror: action.payload,
                homesuccessproduct: false
            };

        default:
            state = { ...state }
    }
    return state
};

export default HomeProductsReducer;