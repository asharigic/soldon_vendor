//actions.js

import {
  GET_TAGS_DROP_DOWN_LIST,
  GET_TAGS_DROP_DOWN_LIST_SUCCESS,
  GET_TAGS_DROP_DOWN_LIST_FAIL,
  ADD_NEW_TAG,
  ADD_TAG_SUCCESS,
  ADD_TAG_FAIL,
} from "./actionTypes";


//Get Tags Drop Down List
export const getTagDropDownList = () => ({
  type: GET_TAGS_DROP_DOWN_LIST,
})

export const getTagDropDownListSuccess = (tags) => ({
  type: GET_TAGS_DROP_DOWN_LIST_SUCCESS,
  payload: tags,
})

export const getTagDropDownListFail = (error) => ({
  type: GET_TAGS_DROP_DOWN_LIST_FAIL,
  payload: error,
})

//Add Tag 
export const addNewTag = (tag, navigate) => {
  return {
    type: ADD_NEW_TAG,
    payload: { tag, navigate },
  }
}

export const addTagSuccess = (tag) => {
  return {
    type: ADD_TAG_SUCCESS,
    payload: tag,
  }
}

export const addTagFail = (error) => {
  return {
    type: ADD_TAG_FAIL,
    payload: error,
  }
}