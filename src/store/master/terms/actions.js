// actions.js
import {
  GET_TERM_DROP_DOWN_LIST,
  GET_TERM_DROP_DOWN_LIST_SUCCESS,
  GET_TERM_DROP_DOWN_LIST_FAIL,
  ADD_TERM,
  ADD_TERM_SUCCESS,
  ADD_TERM_FAIL,
} from './actionTypes';


export const getTermDropDownList = () => ({
  type: GET_TERM_DROP_DOWN_LIST,
})

export const getTermDropDownListSuccess = (tags) => ({
  type: GET_TERM_DROP_DOWN_LIST_SUCCESS,
  payload: tags,
})

export const getTermDropDownListFail = (error) => ({
  type: GET_TERM_DROP_DOWN_LIST_FAIL,
  payload: error,
})


//add TERMS 
export const addNewTerm = (term, navigate) => {
  return {
    type: ADD_TERM,
    payload: { term, navigate },
  }
}

export const addTermSuccess = term => {
  return {
    type: ADD_TERM_SUCCESS,
    payload: term,
  }
}

export const addTermFail = error => {
  return {
    type: ADD_TERM_FAIL,
    payload: error,
  }
}