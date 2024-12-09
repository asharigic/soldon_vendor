//actions.js

import {
  GET_HOME_PRODUCTLIST,
  GET_HOME_PRODUCTLIST_SUCCESS,
  GET_HOME_PRODUCTLIST_FAIL
  
} from "./actionTypes";

//Get products
export const getHomeProductsList = (seachproduct, page) => ({
  type: GET_HOME_PRODUCTLIST,
  payload: { seachproduct, page }
})

export const getHomeProductsListSuccess = (seachproduct) => ({
  type: GET_HOME_PRODUCTLIST_SUCCESS,
  payload: seachproduct,
})

export const getHomeProductsListFail = (error) => ({
  type: GET_HOME_PRODUCTLIST_FAIL,
  payload: error,
})

