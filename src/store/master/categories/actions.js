//actions.js

import {
    GET_DROP_DOWN_CATEGORY_LIST,
    GET_DROP_DOWN_CATEGORY_LIST_SUCCESS,
    GET_DROP_DOWN_CATEGORY_LIST_FAIL,
    ADD_NEW_CATEGORY,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAIL,
  } from "./actionTypes";
  
//Get Categories List in Drop Down
export const getCategoryDropDownList = () => ({
  type: GET_DROP_DOWN_CATEGORY_LIST,
})

export const getCategoryDropDownListSuccess = (categories) => ({
  type: GET_DROP_DOWN_CATEGORY_LIST_SUCCESS,
  payload: categories,
})

export const getCategoryDropDownListFail = (error) => ({
  type: GET_DROP_DOWN_CATEGORY_LIST_FAIL,
  payload: error,
})

//Add Category
export const addNewCategory = (category, navigate) => {
  return {
    type: ADD_NEW_CATEGORY,
    payload: { category, navigate },
  }
}

export const addCategorySuccess = (category) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: category,
  }
}

export const addCategoryFail = (error) => {
  return {
    type: ADD_CATEGORY_FAIL,
    payload: error,
  }
}