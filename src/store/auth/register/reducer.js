import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

const initialState = {
  user: null,
  loading: false,
  message: null,
  success: false,
  registrationError: null,
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        user: action.payload,
        loading: true,
        registrationError: null,
      }
      break
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
      }
      break
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        user:null,
        registrationError: action.payload,
        loading: false,       
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default account
