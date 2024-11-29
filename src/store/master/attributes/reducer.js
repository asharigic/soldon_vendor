// termsReducer.js
import {

  GET_ATTRIBUTE_DROP_DOWN,
  GET_ATTRIBUTE_DROP_DOWN_SUCCESS,
  GET_ATTRIBUTE_DROP_DOWN_FAIL,
  ADD_ATTRIBUTE,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAIL,
} from './actionTypes';

const INIT_STATE = {
  attributes: [],
  error: null,
  attributeloading: false,
  successattribute: true,
  addattributes: null,
};

const attributesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    //Get Attributes Drop Down List
    case GET_ATTRIBUTE_DROP_DOWN:
      return {
        ...state,
        attributes: action.payload,
        attributeloading: true
      };
    case GET_ATTRIBUTE_DROP_DOWN_SUCCESS:
      return {
        ...state,
        attributes: action.payload,
        attributeloading: false
      };

    case GET_ATTRIBUTE_DROP_DOWN_FAIL:
      return {
        ...state,
        error: action.payload,
        attributeloading: false
      };
    // ADD_ATTRIBUTE
    case ADD_ATTRIBUTE:
      return { ...state, attributeloading: true };

    case ADD_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        attributeloading: false,
        successattribute: true,
        addattributes: action.payload.attributes,   // Store the fetched terms
      };

    case ADD_ATTRIBUTE_FAIL:
      return {
        ...state,
        attributeloading: false,
        successattribute: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default attributesReducer;
