import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  API_ERROR,
  VERIFY_CODE,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_ERROR,
  RESET_CODE,
  RESET_CODE_SUCCESS,
  RESET_CODE_ERROR
} from "./actionTypes"


export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: { user },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}
export const loginError = user => {
  return {
    type: LOGIN_ERROR,
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


//VERIFY CODE
export const verifycodePassword = (verifycode) => {
  return {
    type: VERIFY_CODE,
    payload: { verifycode },
  }
}

export const verifycodePasswordSuccess = verifycode => {
  return {
    type: VERIFY_CODE_SUCCESS,
    payload: verifycode,
  }
}

export const verifycodePasswordError = verifycode => {
  return {
    type: VERIFY_CODE_ERROR,
    payload: verifycode,
  }
}


//RESERT CODE
export const resetcodePassword = (resetcode) => {
  return {
    type: RESET_CODE,
    payload: { resetcode },
  }
}

export const resetcodePasswordSuccess = resetcode => {
  return {
    type: RESET_CODE_SUCCESS,
    payload: resetcode,
  }
}

export const resetcodePasswordError = message => {
  return {
    type: RESET_CODE_ERROR,
    payload: message,
  }
}
