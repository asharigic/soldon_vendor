// settingsReducer.js
import {
  GET_SETTINGS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAIL,
  EDIT_SETTINGS,
  EDIT_SETTINGS_SUCCESS,
  EDIT_SETTINGS_FAIL
} from './actionTypes';

const INIT_STATE = {
  settings: [],
  settingserror: null,
  settingsloading: false,
  settingssuccess: false,
  settingsupdate: null
};

const settingsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    // Get Settings
    case GET_SETTINGS:
      return {
        ...state,
        settingsloading: true,
        settingssuccess: false,
        settingserror: null,
      };
    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settingsloading: false,
        settings: action.payload,
        settingssuccess: true,
        settingserror: null,
      };
    case GET_SETTINGS_FAIL:
      return {
        ...state,
        settingsloading: false,
        settingssuccess: false,
        settingserror: action.payload,
      };

    // Edit Settings
    case EDIT_SETTINGS:
      return {
        ...state,
        settingsloading: true
      };

    case EDIT_SETTINGS_SUCCESS:
      return {
        ...state,
        settingsloading: false,
        settingsupdate: action.payload,
        settingssuccess: true
      };

    case EDIT_SETTINGS_FAIL:
      return {
        ...state,
        settingsloading: false,
        error: action.payload,
        settingssuccess: false,
      };

    default:
      return state;
  }
};

export default settingsReducer;