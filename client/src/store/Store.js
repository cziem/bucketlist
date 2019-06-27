import React, { createContext } from 'react'

export const Store = createContext()

const initialState = {
  user: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }

    default:
      return state;
  }
}

export const StoreProvider = (props) => <Store.Provider value="data from store">{props.children}</Store.Provider>