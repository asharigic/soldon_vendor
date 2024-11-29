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

const initialState = {

  forgotpassword: [],
  verifyforgotcode: null,
  loading: false,
  forgetpasswordError: null,
  
  forgetpasswordSuccessMsg: false,

  resetforgotcode: null

}

const forgetPasswordRedure = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      return {
        ...state,

        loading: true
      }

    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotpassword: action.payload,
        forgetpasswordSuccessMsg: true,
        // forgetpasswordError:false
      }

    case FORGET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgetpasswordSuccessMsg: false,
        forgetpasswordError: action.payload,

      }

    //verify code const
    case VERIFY_FORGOT_CODE:
      return {
        ...state,
        loading: true
      }

    case VERIFY_FORGOT_SUCCESS:
      return {
        ...state,
        loading: false,
        verifyforgotcode: action.payload,
        forgetpasswordSuccessMsg: true,
        // forgetpasswordError:false
      }

    case VERIFY_FORGOT_ERROR:
      return {
        ...state,
        loading: false,
        forgetpasswordSuccessMsg: false,
        forgetpasswordError: action.payload,
      }

    // reset password

    //verify code const
    case RESET_FORGOT_CODE:
      return {
        ...state,
        loading: true
      }

    case RESET_FORGOT_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        resetforgotcode: action.payload,
        forgetpasswordSuccessMsg: true,
        // forgetpasswordError:false
      }

    case RESET_FORGOT_CODE_ERROR:
      return {
        ...state,
        loading: false,
        forgetpasswordSuccessMsg: false,
        forgetpasswordError: action.payload,
      }
    default:
      return state;
  }

}

export default forgetPasswordRedure
