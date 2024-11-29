// termsReducer.js
import {
  GET_TERM_DROP_DOWN_LIST,
  GET_TERM_DROP_DOWN_LIST_SUCCESS,
  GET_TERM_DROP_DOWN_LIST_FAIL,
  ADD_TERM,
  ADD_TERM_SUCCESS,
  ADD_TERM_FAIL,
} from './actionTypes';

const INIT_STATE = {
  terms: [],
  termerror: null,
  termloading: false,
  successterm: false
};

const termsReducer = (state = INIT_STATE, action) => {


  switch (action.type) {
    //Get Term List
  
    //Get Terms Drop Down List
    case GET_TERM_DROP_DOWN_LIST:
      return {
        ...state,
        terms: action.payload,
        termloading: true
      };
    case GET_TERM_DROP_DOWN_LIST_SUCCESS:
      return {
        ...state,
        terms: action.payload,
        termloading: false
      };

    case GET_TERM_DROP_DOWN_LIST_FAIL:
      return {
        ...state,
        termerror: action.payload,
        termloading: false
      };
        //ADD term
    case ADD_TERM:
      return { ...state, termloading: true };

    case ADD_TERM_SUCCESS:
      return {
        ...state,
        termloading: false,
        addterms: action.payload.terms,   // Store the fetched terms
        successterm: true
      };

    case ADD_TERM_FAIL:
      return {
        ...state,
        termloading: false,
        successterm: false,
        termerror: action.payload
      };
    default:
      return state;
  }
};

export default termsReducer;
