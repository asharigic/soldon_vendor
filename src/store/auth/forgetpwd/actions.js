import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  VERIFY_FORGOT_CODE,
  VERIFY_FORGOT_SUCCESS,
  VERIFY_FORGOT_ERROR,
  RESET_FORGOT_CODE,
  RESET_FORGOT_CODE_SUCCESS,
  RESET_FORGOT_CODE_ERROR
} from "./actionTypes"

export const userForgetPassword = (user, history) => {
  return {
    type: FORGET_PASSWORD,
    payload: { user, history },
  }
}

export const userForgetPasswordSuccess = message => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message,
  }
}

export const userForgetPasswordError = message => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message,
  }
}
//VERIFY CODE
export const verifyforgotcodePassword = (verifyforgotcode) => {
  return {
    type: VERIFY_FORGOT_CODE,
    payload: { verifyforgotcode },
  }
}

export const verifyforgotcodePasswordSuccess = verifyforgotcode => {
  return {
    type: VERIFY_FORGOT_SUCCESS,
    payload: verifyforgotcode,
  }
}

export const verifyforgotcodePasswordError = error => {
  return {
    type: VERIFY_FORGOT_ERROR,
    payload: error,
  }
}


//RESERT CODE
export const resetforgotcodePassword = (resetforgotcode) => {
  return {
    type: RESET_FORGOT_CODE,
    payload: { resetforgotcode },
  }
}

export const resetforgotcodePasswordSuccess = resetforgotcode => {
  return {
    type: RESET_FORGOT_CODE_SUCCESS,
    payload: resetforgotcode,
  }
}

export const resetforgotcodePasswordError = error => {
  return {
    type: RESET_FORGOT_CODE_ERROR,
    payload: error,
  }
}
