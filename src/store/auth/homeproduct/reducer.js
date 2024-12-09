import {
    GET_HOME_PRODUCTLIST,
    GET_HOME_PRODUCTLIST_SUCCESS,
    GET_HOME_PRODUCTLIST_FAIL

} from "./actionTypes";

const initialState = {
    homeproducts: [],
    homeproductloading: false,
    homeerror: null,
    homesuccessproduct: false
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
                homesuccessproduct:true
            };

        case GET_HOME_PRODUCTLIST_FAIL:
            return {
                ...state,
                homeerror: action.payload,
                homeproductloading: false
            };
        default:
            state = { ...state }
    }
    return state
};

export default HomeProductsReducer;