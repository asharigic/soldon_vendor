import {
    GET_DROP_DOWN_CATEGORY_LIST,
    GET_DROP_DOWN_CATEGORY_LIST_SUCCESS,
    GET_DROP_DOWN_CATEGORY_LIST_FAIL,
    ADD_NEW_CATEGORY,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAIL,
} from "./actionTypes";

const initialState = {
    categories: [],
    categoryloading: false,
    categoryerror: null,
    successcategory: false,
}

const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DROP_DOWN_CATEGORY_LIST:
            return {
                ...state,
                categories: action.payload,
                categoryloading: true
            };
        case GET_DROP_DOWN_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                categoryloading: false
            };

        case GET_DROP_DOWN_CATEGORY_LIST_FAIL:
            return {
                ...state,
                categoryerror: action.payload,
                categoryloading: false
            };
        //Add Category
        case ADD_NEW_CATEGORY:
            return {
                ...state,
                categoryloading: true,
            };

        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryloading: false,
                showcategories: action.payload.categories,
                successcategory: true
            };

        case ADD_CATEGORY_FAIL:
            return {
                ...state,
                categoryloading: false,
                successcategory: false,
                categoryerror: action.payload,
            };

        default:
            state = { ...state }
    }
    return state
};

export default CategoriesReducer;