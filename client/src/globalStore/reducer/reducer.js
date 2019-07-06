import { LOGIN, SIGNUP, SET_ERRORS, CLEAR_ERRORS, LOGOUT } from "../types/types";

export const initialState = {
  isLoggedIn: false,
  user: {},
  errors: {}
}

export const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload, isLoggedIn: true }

    case SIGNUP:
      return { ...state, user: action.payload, isLoggedIn: true }

    case LOGOUT:
      return { ...state, user: {} }

    case SET_ERRORS:
      return action.payload

    case CLEAR_ERRORS:
      return {}

    default:
      return state;
  }
}