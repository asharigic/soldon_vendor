import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

const initialState = {
  user: null,
  loading: false,
  registrationError: null,
  success: false,

}

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        // user: action.payload,
        loading: true,
        // registrationError: null,
      }

    case REGISTER_USER_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
      }

    case REGISTER_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        // user: null,
        registrationError: action.payload,


      }

    default:
      state = { ...state }

  }
  return state
}

export default account
