// profileReducer.js
import {

  SHOW_PROFILE,
  SHOW_PROFILE_SUCCESS,
  SHOW_PROFILE_FAIL,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from './actionTypes';

const INIT_STATE = {
  profile: [],
  profileerror: null,
  profileloading: false,
  loading: false,
  profilesuccess: false,
  profileupdate:null
};

const profileReducer = (state = INIT_STATE, action) => {


  switch (action.type) {
    case SHOW_PROFILE:
      return {
        ...state,
        loading: true,
        profilesuccess: false,
        profileerror: null,
      };
    case SHOW_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        profilesuccess: true,
        profileerror: null,
      };
    case SHOW_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        profilesuccess: false,
        profileerror: action.payload,

      };
    case EDIT_PROFILE:
      return { ...state, profileloading: true };

    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profileloading: false,
        profileupdate: action.payload,   // Store the fetched terms
        profilesuccess: true
      };

    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        profileloading: false,
        error: action.payload,
        profilesuccess: false,
      };

    default:
      return state;
  }
};

export default profileReducer;
