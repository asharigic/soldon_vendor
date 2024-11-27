import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  API_ERROR,
} from "./actionTypes"


export const loginUser = (user, navigate) => {
  return {
    type: LOGIN_USER,
    payload: { user, navigate },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

