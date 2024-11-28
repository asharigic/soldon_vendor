import {

  SHOW_PROFILE,
  SHOW_PROFILE_SUCCESS,
  SHOW_PROFILE_FAIL,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from "./actionTypes"


export const getProfile = () => ({
  type: SHOW_PROFILE,
});

// Action dispatched when terms are successfully fetched
export const getProfileSuccess = (profile) => ({
  type: SHOW_PROFILE_SUCCESS,
  payload: profile,
});

// Action dispatched when terms fetching fails
export const getProfileFail = (error) => ({
  type: SHOW_PROFILE_FAIL,
  payload: error,
});

//PROFILE ACTIONS
export const editProfile = (user) => {
  return {
    type: EDIT_PROFILE,
    payload: user,
  }
}

export const editProfileSuccess = user => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: user,
})

export const editProfileFail = error => ({
  type: EDIT_PROFILE_FAIL,
  payload: error,
})
