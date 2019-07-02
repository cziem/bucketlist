import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { initialState, reducer } from '../reducer/reducer'

export const Store = createContext(initialState)

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  // Check whats up with the state
  useEffect(() => console.log({ newState: state }), [state])

  return <Store.Provider value={value}>{props.children}</Store.Provider >
}

export const useStore = store => {
  const { state, dispatch } = useContext(Store)
  return { state, dispatch }
}