//actions.js

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
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  APPROVE_PRODUCT,
  APPROVE_PRODUCT_SUCCESS,
  APPROVE_PRODUCT_FAIL,
  

} from "./actionTypes";

//Get products
export const getProductsList = (seachproduct, page) => ({
  type: GET_PRODUCTLIST,
  payload: { seachproduct, page }
})

export const getProductsListSuccess = (seachproduct) => ({
  type: GET_PRODUCTLIST_SUCCESS,
  payload: seachproduct,
})

export const getProductsListFail = (error) => ({
  type: GET_PRODUCTLIST_FAIL,
  payload: error,
})

//Add product 
export const addNewProduct = (product) => {
  return {
    type: ADD_NEW_PRODUCT,
    payload: { product },
  }
}

export const addProductSuccess = (product) => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload: product,
  }
}

export const addProductFail = (error) => {
  return {
    type: ADD_PRODUCT_FAIL,
    payload: error,
  }
}

//Show product 
export const showProduct = (id) => {
  return {
    type: SHOW_PRODUCT,
    payload: { id },
  }
}

export const showProductSuccess = (products) => {
  return {
    type: SHOW_PRODUCT_SUCCESS,
    payload: { products },
  }
}

export const showProductFail = (error) => {
  return {
    type: SHOW_PRODUCT_FAIL,
    payload: error,
  }
}

//Edit product 
export const editProduct = (id, product, navigate) => {
  return {
    type: EDIT_PRODUCT,
    payload: { id, product, navigate },
  }
}

export const editProductSuccess = (product) => {
  return {
    type: EDIT_PRODUCT_SUCCESS,
    payload: product,
  }
}

export const editProductFail = (error) => {
  return {
    type: EDIT_PRODUCT_FAIL,
    payload: error,
  }
}

//Delete product 
export const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  payload: { product },
})

export const deleteProductSuccess = (product) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: product,
})

export const deleteProductFail = (error) => ({
  type: DELETE_PRODUCT_FAIL,
  payload: error,
})



//APPROVE product 
export const approveProduct = (id) => {
  return {
    type: APPROVE_PRODUCT,
    payload: { id },
  }
}

export const approveProductSuccess = (id) => {
  return {
    type: APPROVE_PRODUCT_SUCCESS,
    payload: id,
  }
}

export const approveProductFail = (error) => {
  return {
    type: APPROVE_PRODUCT_FAIL,
    payload: error,
  }
}

