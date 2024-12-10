//actions.js

import {
  GET_HOME_PRODUCTLIST,
  GET_HOME_PRODUCTLIST_SUCCESS,
  GET_HOME_PRODUCTLIST_FAIL,
  CLONE_PRODUCT,
  CLONE_PRODUCT_SUCCESS,
  CLONE_PRODUCT_FAIL,
  SHOW_HOME_PRODUCTLIST,
  SHOW_HOME_PRODUCTLIST_SUCCESS,
  SHOW_HOME_PRODUCTLIST_FAIL
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

//clone product 
export const cloneProduct = (id) => {
  return {
    type: CLONE_PRODUCT,
    payload: { id },
  }
}

export const cloneProductSuccess = (products) => {
  return {
    type: CLONE_PRODUCT_SUCCESS,
    payload: { products },
  }
}

export const cloneProductFail = (error) => {
  return {
    type: CLONE_PRODUCT_FAIL,
    payload: error,
  }
}


//Show product 
export const showHomeProduct = (id) => {
  return {
    type: SHOW_HOME_PRODUCTLIST,
    payload: { id },
  }
}

export const showHomeProductSuccess = (products) => {
  return {
    type: SHOW_HOME_PRODUCTLIST_SUCCESS,
    payload: { products },
  }
}

export const showHomeProductFail = (error) => {
  return {
    type: SHOW_HOME_PRODUCTLIST_FAIL,
    payload: error,
  }
}