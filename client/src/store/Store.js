import React, { createContext, useReducer } from 'react'

export const Store = createContext()

const initialState = {
  isLoggedIn: false,
  user: {},
  errors: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(action, 'store')
      return { ...state, user: action.payload, isLoggedIn: true }

    case 'SIGNUP':
      return { ...state, user: action.payload, isLoggedIn: true }

    case 'LOGOUT':
      return { ...state, user: {} }

    case 'GET_ERRORS':
      return action.payload

    case 'CLEAR_ERRORS':
      return {}

    default:
      return state;
  }
}

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider >
}