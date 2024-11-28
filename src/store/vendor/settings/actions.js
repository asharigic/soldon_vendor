//settingsactions.js
import {
  GET_SETTINGS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAIL,
  EDIT_SETTINGS,
  EDIT_SETTINGS_SUCCESS,
  EDIT_SETTINGS_FAIL
} from "./actionTypes";

// Get Settings
export const getSettings = () => ({
  type: GET_SETTINGS,
});

export const getSettingsSuccess = (profile) => ({
  type: GET_SETTINGS_SUCCESS,
  payload: profile,
});

export const getSettingsFail = (error) => ({
  type: GET_SETTINGS_FAIL,
  payload: error,
});

// Update Settings
export const editSettings = (settings) => {
  return {
    type: EDIT_SETTINGS,
    payload: settings,
  }
}

export const editSettingsSuccess = (settings) => ({
  type: EDIT_SETTINGS_SUCCESS,
  payload: settings,
})

export const editSettingsFail = (error) => ({
  type: EDIT_SETTINGS_FAIL,
  payload: error,
})