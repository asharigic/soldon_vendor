import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  VERIFY_CODE,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_ERROR,
  RESET_CODE,
  RESET_CODE_SUCCESS,
  RESET_CODE_ERROR,
  API_ERROR,
  LOGIN_ERROR
} from "./actionTypes"

const initialState = {
  loginError: null,
  loading: false,
  success: false,
  user: [],
  forgotpassword: [],
  verifycode: null,
  loading: false,
  forgetError: null,
  forgetSuccessMsg: false,
  resetcode: null
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {

        ...state,
        loading: true,
        success: false,
        loginError: null,

      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isUserLogout: false,
        user: action.payload,
        success: true,
        loginError: null,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        loginError: action.payload,
      }
    case LOGOUT_USER:
      return {
        ...state, user: null,
        loading: false,
        success: false,
        loginError: action.payload,
      }
    //verify code const
    case VERIFY_CODE:
      return {
        ...state,
        loading: true
      }

    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        verifycode: action.payload,
        forgetSuccessMsg: true
      }

    case VERIFY_CODE_ERROR:
      return {
        ...state,
        loading: false,
        forgetSuccessMsg: false,
        forgetError: action.payload,
      }

    // reset password

    //verify code const
    case RESET_CODE:
      return {
        ...state,
        loading: true
      }

    case RESET_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        resetcode: action.payload,
        forgetSuccessMsg: true
      }

    case RESET_CODE_ERROR:
      return {
        ...state,
        loading: false,
        forgetSuccessMsg: false,
        forgetError: action.payload,
      }
    case API_ERROR:
      return { ...state, error: action.payload, loading: false, isUserLogout: false, }

    default:
      state = { ...state }
      break
  }
  return state
}

export default login
