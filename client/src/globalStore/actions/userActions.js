import axios from "axios";
import setAuthToken from '../../utils/setAuthToken'
import { LOGIN, SIGNUP, SET_ERRORS, LOGOUT } from '../types/types';

export const login = async (dispatch, userData) => {
  axios
    .post('/auth/login', userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)

      setAuthToken(`Bearer ${token}`)

      return dispatch({
        type: LOGIN,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    });
};

export const signup = (dispatch, payload) => {
  axios
    .post('/auth/signup', payload)
    .then(res => {
      return dispatch({
        type: SIGNUP,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const logoutUser = (dispatch) => {
  localStorage.removeItem('jwtToken')

  setAuthToken(false)

  return dispatch({
    type: LOGOUT
  })
} 
