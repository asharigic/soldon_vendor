//actions.js

import {
    GET_SELLINGLIST,
    GET_SELLINGLIST_SUCCESS,
    GET_SELLINGLIST_FAIL,
    GET_RETURNORDERLIST,
    GET_RETURNORDERLIST_SUCCESS,
    GET_RETURNORDERLIST_FAIL,
    SHOW_RETURNORDERLIST,
    SHOW_RETURNORDERLIST_SUCCESS,
    SHOW_RETURNORDERLIST_FAIL,
    CREATE_SHIPMENT_ORDER,
    CREATE_SHIPMENT_ORDER_SUCCESS,
    CREATE_SHIPMENT_ORDER_FAIL

} from "./actionType";

//Get sellingproducts
export const getSellingList = (seachproduct, page) => ({
    type: GET_SELLINGLIST,
    payload: { seachproduct, page }
})

export const getSellingListSuccess = (seachproduct) => ({
    type: GET_SELLINGLIST_SUCCESS,
    payload: seachproduct,
})

export const getSellingListFail = (error) => ({
    type: GET_SELLINGLIST_FAIL,
    payload: error,
})

//Get return orderproducts
export const getretunorderList = (seachproduct, page) => ({
    type: GET_RETURNORDERLIST,
    payload: { seachproduct, page }
})

export const getretunorderListSuccess = (seachproduct) => ({
    type: GET_RETURNORDERLIST_SUCCESS,
    payload: seachproduct,
})

export const getretunorderListFail = (error) => ({
    type: GET_RETURNORDERLIST_FAIL,
    payload: error,
})

//SHOW RETURN ORDER BY ID

export const showretunorderList = (orderid) => ({
    type: SHOW_RETURNORDERLIST,
    payload: orderid
})

export const showretunorderListSuccess = (product) => ({
    type: SHOW_RETURNORDERLIST_SUCCESS,
    payload: product,
})

export const showretunorderListFail = (error) => ({
    type: SHOW_RETURNORDERLIST_FAIL,
    payload: error,
})

//RETURN BUYING ORDER
export const createshipmentorder = (orderId) => {
    return {
      type: CREATE_SHIPMENT_ORDER,
      payload: orderId,
    }
  }
  
  export const createshipmentorderSuccess = (orderId) => ({
    type: CREATE_SHIPMENT_ORDER_SUCCESS,
    payload: orderId,
  })
  
  export const createshipmentorderFail = (error) => ({
    type: CREATE_SHIPMENT_ORDER_FAIL,
    payload: error,
  })