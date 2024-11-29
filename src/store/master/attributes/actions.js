// actions.js
import {

  GET_ATTRIBUTE_DROP_DOWN,
  GET_ATTRIBUTE_DROP_DOWN_SUCCESS,
  GET_ATTRIBUTE_DROP_DOWN_FAIL,
  ADD_ATTRIBUTE,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAIL,
} from './actionTypes';


// Attributes Drop Down List
export const getAttributeDropDown = () => ({
  type: GET_ATTRIBUTE_DROP_DOWN,
});

export const getAttributeDropDownSuccess = (searchattribute) => ({
  type: GET_ATTRIBUTE_DROP_DOWN_SUCCESS,
  payload: searchattribute,
});

export const getAttributeDropDownFail = (error) => ({
  type: GET_ATTRIBUTE_DROP_DOWN_FAIL,
  payload: error,
});

//add attributes 
export const addNewAttribute = (attribute, navigate) => {
  return {
    type: ADD_ATTRIBUTE,
    payload: { attribute, navigate },
  }
}

export const addAttributeSuccess = attribute => {
  return {
    type: ADD_ATTRIBUTE_SUCCESS,
    payload: attribute,
  }
}

export const addAttributeFail = error => {
  return {
    type: ADD_ATTRIBUTE_FAIL,
    payload: error,
  }
}

