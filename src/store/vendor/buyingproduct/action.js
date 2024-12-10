//actions.js

import {
  GET_BUYINGHLIST,
  GET_BUYINGHLIST_SUCCESS,
  GET_BUYINGHLIST_FAIL,
  SHOW_BUYINGHPRODUCT,
  SHOW_BUYINGHPRODUCT_SUCCESS,
  SHOW_BUYINGHPRODUCT_FAIL,
  RETURN_BUYINGPRODUCT,
  RETURN_BUYINGPRODUCT_SUCCESS,
  RETURN_BUYINGPRODUCT_FAIL

} from "./actionType";

//Get products
export const getBuyingList = (seachproduct, page) => ({
  type: GET_BUYINGHLIST,
  payload: { seachproduct, page }
})

export const getBuyingListSuccess = (seachproduct) => ({
  type: GET_BUYINGHLIST_SUCCESS,
  payload: seachproduct,
})

export const getBuyingListFail = (error) => ({
  type: GET_BUYINGHLIST_FAIL,
  payload: error,
})

//Show buying product 
export const showBuyingProduct = (id) => {
  return {
    type: SHOW_BUYINGHPRODUCT,
    payload: { id },
  }
}

export const showBuyingProductSuccess = (products) => {
  return {
    type: SHOW_BUYINGHPRODUCT_SUCCESS,
    payload: { products },
  }
}

export const showBuyingProductFail = (error) => {
  return {
    type: SHOW_BUYINGHPRODUCT_FAIL,
    payload: error,
  }
}
//RETURN BUYING ORDER
export const returnbuyingproduct = (orderId) => {
  return {
    type: RETURN_BUYINGPRODUCT,
    payload: orderId,
  }
}

export const returnbuyingproductSuccess = (orderId) => ({
  type: RETURN_BUYINGPRODUCT_SUCCESS,
  payload: orderId,
})

export const returnbuyingproductFail = (error) => ({
  type: RETURN_BUYINGPRODUCT_FAIL,
  payload: error,
})